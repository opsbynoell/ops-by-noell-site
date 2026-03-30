import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  upsertChatSession,
  getChatSession,
  getAllChatSessions,
  insertChatMessage,
  getSessionMessages,
  markSessionRead,
  setHumanTakeover,
} from "../db";
import { sendTelegram, formatTelegramMessage } from "../telegram";
import { sendHumanTakeoverEmail } from "../email";
import { invokeLLM } from "../_core/llm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const chatRouter = router({
  /**
   * Called by ChatWidget to persist a visitor message and get a bot response.
   * Creates/updates the session and stores both visitor message and bot reply.
   */
  sendMessage: publicProcedure
    .input(
      z.object({
        sessionId: z.string().min(1).max(64),
        message: z.string().min(1).max(2000),
        visitorName: z.string().max(128).optional(),
        visitorEmail: z.string().email().max(320).optional(),
        businessType: z.string().max(256).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Extract visitor IP from request headers (works behind proxies)
      const req = (ctx as any).req;
      const rawIp: string =
        (req?.headers?.['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        (req?.headers?.['x-real-ip'] as string) ||
        req?.socket?.remoteAddress ||
        '';
      const visitorIp = rawIp || undefined;

      // Resolve approximate location from IP (non-blocking, best-effort)
      let visitorLocation: string | undefined;
      if (visitorIp && visitorIp !== '127.0.0.1' && visitorIp !== '::1') {
        try {
          const geoRes = await fetch(`http://ip-api.com/json/${visitorIp}?fields=city,regionName,country,status`, { signal: AbortSignal.timeout(2000) });
          if (geoRes.ok) {
            const geo = await geoRes.json() as { status: string; city?: string; regionName?: string; country?: string };
            if (geo.status === 'success') {
              visitorLocation = [geo.city, geo.regionName, geo.country].filter(Boolean).join(', ');
            }
          }
        } catch {
          // Geo lookup failed silently — not critical
        }
      }

      // Ensure session exists
      await upsertChatSession(input.sessionId, {
        visitorName: input.visitorName,
        visitorEmail: input.visitorEmail,
        businessType: input.businessType,
        visitorIp,
        visitorLocation,
      });

      // Store visitor message
      await insertChatMessage(input.sessionId, "visitor", input.message);

      // Notify owner of every visitor message (fire-and-forget, non-blocking)
      {
        const locationStr = visitorLocation ? ` (${visitorLocation})` : '';
        sendTelegram(
          `<b>Nova Chat</b>\n` +
          `<b>From:</b> ${input.visitorName ?? 'Visitor'}${locationStr}\n` +
          `<b>Message:</b> ${input.message}`
        ).catch(() => {});
      }

      // Check if human has taken over — if so, just store and notify
      const session = await getChatSession(input.sessionId);
      if (session?.humanTakeover) {
        const history = await getSessionMessages(input.sessionId);
        await Promise.allSettled([
          sendTelegram(
            `\u{1F4AC} *Human Takeover Chat — New Message*\n\n` +
            `*From:* ${input.visitorName ?? "Visitor"}\n` +
            `*Message:* ${input.message}\n` +
            `*Session:* ${input.sessionId}\n\n` +
            `Reply from your admin inbox at opsbynoell.com/admin/inbox`
          ),
          sendHumanTakeoverEmail({
            visitorName: input.visitorName,
            visitorEmail: input.visitorEmail,
            businessType: input.businessType,
            lastMessage: input.message,
            sessionId: input.sessionId,
            chatHistory: history,
          }),
        ]);
        return { botReply: null, humanTakeover: true };
      }

      // Detect human handoff request — notify owner immediately
      const HANDOFF_KEYWORDS = [
        'talk to a person', 'talk to someone', 'speak to a person', 'speak to someone',
        'real person', 'speak to nikki', 'talk to nikki', 'speak to james', 'talk to james',
        'contact you', 'reach you', 'get in touch', 'someone call me', 'call me back',
        '[human handoff request]',
      ];
      const msgLower = input.message.toLowerCase();
      const isHandoff = HANDOFF_KEYWORDS.some(kw => msgLower.includes(kw));
      if (isHandoff) {
        const history = await getSessionMessages(input.sessionId);
        await Promise.allSettled([
          sendTelegram(
            `\u{1F64B} *Visitor Wants to Speak to a Person*\n\n` +
            `*Name:* ${input.visitorName ?? 'Unknown'}\n` +
            `*Email:* ${input.visitorEmail ?? 'Not provided'}\n` +
            `*Business:* ${input.businessType ?? 'Not provided'}\n` +
            `*Message:* ${input.message}\n\n` +
            `Reply from your admin inbox at opsbynoell.com/admin/inbox`
          ),
          sendHumanTakeoverEmail({
            visitorName: input.visitorName,
            visitorEmail: input.visitorEmail,
            businessType: input.businessType,
            lastMessage: input.message,
            sessionId: input.sessionId,
            chatHistory: history,
          }),
        ]);
        const handoffReply = "Of course. Let me get James and Nikki on this for you. They'll reach out shortly. You can also book a free 15-minute call directly at opsbynoell.com/book if that's easier.";
        await insertChatMessage(input.sessionId, "bot", handoffReply);
        return { botReply: handoffReply, humanTakeover: false };
      }

      // Fetch full conversation history for LLM context
      const history = await getSessionMessages(input.sessionId);

      // Generate LLM-backed bot response (with keyword fallback)
      const botReply = await generateNovaResponse(input.message, history, {
        visitorName: input.visitorName,
        businessType: input.businessType,
      });
      await insertChatMessage(input.sessionId, "bot", botReply);

      return { botReply, humanTakeover: false };
    }),

  /**
   * Returns all messages for a given session (used by ChatWidget to sync state).
   */
  getMessages: publicProcedure
    .input(z.object({ sessionId: z.string().min(1).max(64) }))
    .query(async ({ input }) => {
      return getSessionMessages(input.sessionId);
    }),

  // ─── Admin-only procedures ───────────────────────────────────────────────

  getSessions: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
    }
    return getAllChatSessions(100);
  }),

  getSessionMessages: protectedProcedure
    .input(z.object({ sessionId: z.string().min(1).max(64) }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      await markSessionRead(input.sessionId);
      return getSessionMessages(input.sessionId);
    }),

  adminReply: protectedProcedure
    .input(
      z.object({
        sessionId: z.string().min(1).max(64),
        message: z.string().min(1).max(2000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      await setHumanTakeover(input.sessionId, true);
      await insertChatMessage(input.sessionId, "human", input.message);
      return { success: true };
    }),

  setTakeover: protectedProcedure
    .input(
      z.object({
        sessionId: z.string().min(1).max(64),
        active: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      await setHumanTakeover(input.sessionId, input.active);
      return { success: true };
    }),
});

// ─── Nova Level 2 — LLM-Backed Response Engine ──────────────────────────────
//
// Nova is the AI assistant for Ops by Noell. Her responses are generated by
// an LLM with a rich system prompt containing all business knowledge.
// The system prompt can be updated without code deploys — just edit NOVA_SYSTEM_PROMPT.
//
// Keyword fallback fires if the LLM call fails (network, quota, etc.).

const NOVA_SYSTEM_PROMPT = `You are Nova, the AI assistant for Ops by Noell — an AI automation agency for appointment-based service businesses in Orange County, California. You are friendly, direct, and knowledgeable. You sound like a real person, not a bot.

Your job: answer questions about Ops by Noell, qualify leads, and guide visitors toward booking a free 15-minute intro call.

ABOUT OPS BY NOELL:
- Founders: James and Nikki Noell, based in Lake Forest, CA. This is a family business. When visitors ask to talk to a human, they want to speak with James and Nikki.
- Website: opsbynoell.com
- Booking link: https://api.leadconnectorhq.com/widget/booking/ko7eXb5zooItceadiV02

SERVICES (done-for-you, fully managed):
1. Missed Call Text-Back — responds to every unanswered call within seconds via automated text. Stops lost leads instantly.
2. AI Booking & Reminders — automated appointment scheduling and reminder sequences. Reduces no-shows 30-50%.
3. Review Generation — automated review request sequences after every appointment. Clients typically see major review volume increases within 30 days.
4. Lead Follow-Up Automation — nurture sequences for new leads and reactivation for past clients.
5. Marketing Automation — email and SMS campaigns that run on autopilot.
6. AI Voice Receptionist — answers calls 24/7, qualifies leads, answers questions, books appointments.
7. Custom Ops — anything beyond the above, built to fit your specific business.

PRICING:
- Revenue Audit: $497 one-time (credited toward any retainer). Deep-dive analysis showing exactly where you're losing revenue.
- Entry package: $997 setup + $197/mo (Missed Call Text-Back only).
- Starter: $997 setup + $797/mo.
- Growth: $1,497 setup + $1,497/mo.
- Activation Sprint: $1,500 flat to implement one system in two weeks. Fee credited toward retainer.
- All retainers are month-to-month, no contracts.

WHO WE WORK WITH:
Appointment-based service businesses. Primary verticals: massage therapists, med spas, salons, estheticians, chiropractors, dental practices. Orange County and Southern California focus, but we work nationally.

KEY STATS WE USE:
- 85% of callers never call back after hitting voicemail.
- No-shows cost 10-15% of annual revenue.
- 93% of consumers read reviews before choosing a local business.
- 80% of sales require 5+ follow-ups — most businesses stop after 1.

FOUNDING CLIENT — SANTA (massage therapist, Laguna Niguel):
- 25 years experience, zero digital infrastructure before Ops by Noell.
- No-shows dropped from 4/week to less than 1 in two weeks of going live.
- This is the kind of result we deliver.

DATA PRIVACY:
We don't sell visitor data. Ever. Anything shared stays between us and is only used to help them. No spam, no lists, no third-party sharing.

COMPETITIVE POSITIONING:
- We don't sell software or hand you a login. We build, install, and manage everything.
- Local OC team. Founder-led. "We're the Noells — our name is on the door."
- We show you the ROI math before you spend a dollar.
- Most clients are live within two weeks.

HOW TO RESPOND:
- Be warm but direct. 1-4 sentences per reply max. Don't lecture.
- No corporate speak, no jargon, no bullet lists in your replies.
- Don't start every message with "Great question!" — vary your openers.
- If you don't know something specific, say so and offer to connect them with James and Nikki.
- Always guide toward the next step: book a call at https://api.leadconnectorhq.com/widget/booking/ko7eXb5zooItceadiV02 or offer to have James and Nikki reach out.
- Never make up pricing, services, or statistics that aren't listed above.
- If a visitor is clearly a business owner with a relevant need, be especially warm and direct — these are the people we serve.
- Keep responses conversational. You're Nova, not a brochure.

WHAT YOU ARE NOT:
- Don't claim to be human if directly asked.
- Don't answer questions unrelated to Ops by Noell or AI automation for service businesses.
- Don't give legal, financial, or medical advice.
- Don't make promises about specific results beyond what's documented above.`;

type ChatMessage = { role: string; content: string; createdAt?: Date | string };

async function generateNovaResponse(
  currentMessage: string,
  history: ChatMessage[],
  context: { visitorName?: string; businessType?: string }
): Promise<string> {
  // Try LLM first
  try {
    // Build message history for LLM — exclude the message we just stored (last item)
    // history already includes the new visitor message we just inserted
    const priorMessages = history.slice(0, -1); // everything before current message

    const llmMessages: Array<{ role: "user" | "assistant"; content: string }> = [];

    for (const msg of priorMessages) {
      if (msg.role === "visitor") {
        llmMessages.push({ role: "user", content: msg.content });
      } else if (msg.role === "bot" || msg.role === "human") {
        llmMessages.push({ role: "assistant", content: msg.content });
      }
    }

    // Add current visitor message
    llmMessages.push({ role: "user", content: currentMessage });

    const result = await invokeLLM({
      messages: [
        { role: "system", content: NOVA_SYSTEM_PROMPT },
        ...llmMessages,
      ],
      maxTokens: 300,
    });

    const responseContent = result.choices?.[0]?.message?.content;
    if (responseContent && typeof responseContent === "string" && responseContent.trim().length > 0) {
      return responseContent.trim();
    }
  } catch (err) {
    // LLM failed — fall through to keyword fallback
    console.error("[Nova] LLM call failed, using keyword fallback:", err);
  }

  // Keyword fallback — always works, no external dependencies
  return generateKeywordFallback(currentMessage);
}

// ─── Keyword Fallback ─────────────────────────────────────────────────────────
// Used when LLM is unavailable. Kept in sync with ChatWidget.tsx KNOWLEDGE array.

const QA_PAIRS: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['what do you do', 'what is ops by noell', 'what does ops by noell do', 'tell me about', 'what you do', 'services', 'what you offer', 'what can you do'],
    answer: "We build done-for-you AI automation systems for service businesses. Missed call text-back, AI booking, automated reminders, review generation, lead follow-up, and AI voice receptionist. We build it, it runs, you get your time back.",
  },
  {
    keywords: ['how much', 'cost', 'price', 'pricing', 'fee', 'charge', 'rate', 'package', 'tier'],
    answer: "We have a few options. A Revenue Audit starts at $497 and gets credited toward any retainer. Monthly plans start at $797/mo for Starter and go up to $1,497/mo for Growth, which includes the AI voice receptionist. Setup fees range from $997 to $1,497 depending on the plan.",
  },
  {
    keywords: ['who do you work with', 'what type of business', 'what businesses', 'industry', 'who is this for', 'med spa', 'salon', 'dental', 'massage', 'chiropractor'],
    answer: "We work with appointment-based service businesses. Med spas, massage therapists, salons, dental practices, chiropractors, and more. If your business runs on bookings and phone calls, we can help.",
  },
  {
    keywords: ['how long', 'timeline', 'setup time', 'how soon', 'how fast', 'get started', 'onboard'],
    answer: "Most clients are fully live within two weeks of their audit.",
  },
  {
    keywords: ['tech', 'technical', 'tech-savvy', 'complicated', 'difficult', 'do i need to', 'hard to use'],
    answer: "None at all. We build, manage, and maintain everything. You see results, not dashboards.",
  },
  {
    keywords: ['how do i start', 'next step', 'how to begin', 'sign up', 'book', 'schedule', 'call', 'consult', 'audit', 'intro'],
    answer: "Book a free 15-minute intro call at opsbynoell.com/book. We will learn about your business and figure out if we are a fit. No pitch, no pressure.",
  },
  {
    keywords: ['different', 'unique', 'why you', 'why ops by noell', 'what makes you', 'stand out', 'better than'],
    answer: "We don't sell software or hand you a login. We build your complete automation system, install every component, and manage it ongoing. We show you the ROI math before you spend a dollar.",
  },
  {
    keywords: ['missed call', 'missed calls', 'text back', 'call back', 'unanswered'],
    answer: "Our Missed Call Text-Back system responds to every unanswered call within seconds, automatically texting the caller to keep the conversation alive. No more lost leads because you were with a client.",
  },
  {
    keywords: ['ai voice', 'voice receptionist', 'phone answering', 'answer the phone', 'receptionist'],
    answer: "Our AI Voice Receptionist answers calls 24/7, qualifies leads, answers common questions, and books appointments without a human on the line.",
  },
  {
    keywords: ['review', 'reviews', 'google review', 'reputation', 'rating'],
    answer: "We automate review requests so every happy client gets a follow-up asking them to leave a Google review. Most clients see a major increase in review volume within the first 30 days.",
  },
  {
    keywords: ['no-show', 'no show', 'cancellation', 'reminder', 'appointment reminder'],
    answer: "Our automated reminder system sends SMS and email reminders before every appointment. Most clients see a 30 to 50 percent reduction in no-shows within the first month.",
  },
  {
    keywords: ['follow up', 'follow-up', 'lead nurture', 'nurture', 'reactivate', 'past clients'],
    answer: "We build automated follow-up sequences that re-engage past clients, nurture new leads, and keep your business top of mind without you lifting a finger.",
  },
  {
    keywords: ['orange county', 'oc', 'local', 'near me', 'southern california'],
    answer: "We are based in Orange County and primarily serve local service businesses in the OC and Southern California area, though we work with clients across the US.",
  },
  {
    keywords: ['contract', 'commitment', 'lock in', 'cancel anytime', 'month to month'],
    answer: "Our monthly retainers are month-to-month with no long-term contracts. We earn your business every month by delivering results.",
  },
  {
    keywords: ['roi', 'return on investment', 'worth it', 'results', 'guarantee', 'proof', 'case study'],
    answer: "We show you the math before you spend a dollar. Our Revenue Audit calculates exactly what missed calls, no-shows, and lack of follow-up are costing your business so you know the ROI before we start.",
  },
  {
    keywords: ['what is a revenue audit', 'revenue audit', 'audit', 'assessment'],
    answer: "A Revenue Audit is a deep-dive into your current operations to identify exactly where you are losing revenue. We look at missed calls, no-show rates, follow-up gaps, and review volume, then show you the dollar amount. It starts at $497 and the fee is credited toward any retainer.",
  },
  {
    keywords: ['data', 'privacy', 'sell my info', 'sell my data', 'spam', 'mailing list', 'safe', 'secure'],
    answer: "We don't sell your data. Ever. Anything you share with us stays between us and is only used to help you. No spam, no lists, no third-party sharing.",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'howdy'],
    answer: "Hey! I'm Nova, your guide to Ops by Noell. We help service businesses automate their operations so they can focus on their clients. What can I help you with today?",
  },
  {
    keywords: ['thank you', 'thanks', 'appreciate', 'helpful', 'great'],
    answer: "Happy to help. If you want to take the next step, you can book a free 15-minute intro call at opsbynoell.com/book. James and Nikki would love to learn about your business.",
  },
];

const FALLBACK_RESPONSE = "Good question. I'd love to connect you with James and Nikki to dig into that. You can book a free 15-minute call at opsbynoell.com/book, or drop your email and they'll reach out directly.";

function generateKeywordFallback(message: string): string {
  const lower = message.toLowerCase();
  for (const qa of QA_PAIRS) {
    if (qa.keywords.some(kw => lower.includes(kw))) {
      return qa.answer;
    }
  }
  return FALLBACK_RESPONSE;
}
