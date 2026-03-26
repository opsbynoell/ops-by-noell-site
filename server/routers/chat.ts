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

      // Check if human has taken over — if so, just store and notify
      const session = await getChatSession(input.sessionId);
      if (session?.humanTakeover) {
        // Fetch full chat history to include in email
        const history = await getSessionMessages(input.sessionId);
        // Notify owner via Telegram AND email that a message needs human response
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
        'real person', 'speak to nikki', 'talk to nikki', 'contact you',
        'reach you', 'get in touch', 'someone call me', 'call me back',
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
        const handoffReply = "Of course! I'll let Nikki know you'd like to connect. She'll reach out to you shortly. In the meantime, you're also welcome to book a free 15-minute call directly at opsbynoell.com/book.";
        await insertChatMessage(input.sessionId, "bot", handoffReply);
        return { botReply: handoffReply, humanTakeover: false };
      }

      // Generate bot response based on message content
      const botReply = generateBotResponse(input.message);
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

  /**
   * Returns all chat sessions for the admin inbox.
   */
  getSessions: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
    }
    return getAllChatSessions(100);
  }),

  /**
   * Returns all messages for a session (admin view).
   */
  getSessionMessages: protectedProcedure
    .input(z.object({ sessionId: z.string().min(1).max(64) }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      await markSessionRead(input.sessionId);
      return getSessionMessages(input.sessionId);
    }),

  /**
   * Admin sends a reply as "Nova" (human takeover message).
   */
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
      // Enable human takeover mode for this session
      await setHumanTakeover(input.sessionId, true);
      // Store the human reply
      await insertChatMessage(input.sessionId, "human", input.message);
      return { success: true };
    }),

  /**
   * Toggle human takeover on/off for a session.
   */
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

// ─── Bot Response Engine ─────────────────────────────────────────────────────
// Approved Q&A responses for Nova (server-side mirror of ChatWidget)

const QA_PAIRS: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['what do you do', 'what is ops by noell', 'what does ops by noell do', 'tell me about', 'what you do', 'services', 'what you offer', 'what can you do'],
    answer: "We build done-for-you AI automation systems for service businesses. Missed call text-back, AI booking, automated reminders, review generation, lead follow-up, and AI voice receptionist. We build it, it runs, you get your time back.",
  },
  {
    keywords: ['how much', 'cost', 'price', 'pricing', 'fee', 'charge', 'rate', 'package', 'tier', 'affordable', 'expensive'],
    answer: "We offer several options. A Revenue Audit starts at $497. Our Activation Sprint is a $1,500 flat fee to implement one system in two weeks. Monthly retainers start at $797/mo for Starter, $1,197/mo for Growth, and $1,497/mo for Scale which includes an AI voice receptionist. All setup fees are credited if you start with an Activation Sprint.",
  },
  {
    keywords: ['who do you work with', 'what type of business', 'what businesses', 'industry', 'industries', 'who is this for', 'med spa', 'salon', 'dental', 'massage', 'chiropractor', 'home service'],
    answer: "We work with appointment-based service businesses. Med spas, massage therapists, salons, dental practices, chiropractors, home services, and more. If your business runs on bookings and phone calls, we can help.",
  },
  {
    keywords: ['how long', 'timeline', 'setup time', 'how soon', 'when will', 'how fast', 'get started', 'onboard'],
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
    keywords: ['different', 'unique', 'why you', 'why ops by noell', 'what makes you', 'stand out', 'better than', 'compared to', 'versus'],
    answer: "We do not sell software or hand you a login. We build your complete automation system, install every component, and manage it ongoing. We show you the math first so you know exactly what your gaps are costing you before you spend a dollar.",
  },
  {
    keywords: ['missed call', 'missed calls', 'text back', 'call back', 'unanswered'],
    answer: "Our Missed Call Text-Back system responds to every unanswered call within seconds, automatically texting the caller to keep the conversation alive. No more lost leads because you were with a client.",
  },
  {
    keywords: ['ai voice', 'voice receptionist', 'phone answering', 'answer the phone', 'receptionist', 'front desk'],
    answer: "Our AI Voice Receptionist answers calls 24/7, qualifies leads, answers common questions, and books appointments without a human on the line. It is included in our Scale package at $1,497/mo.",
  },
  {
    keywords: ['review', 'reviews', 'google review', 'reputation', 'testimonial', 'rating'],
    answer: "We automate review requests so every happy client gets a follow-up asking them to leave a Google review. Most clients see a significant increase in review volume within the first 30 days.",
  },
  {
    keywords: ['no-show', 'no show', 'cancellation', 'cancel', 'reminder', 'reminders', 'appointment reminder'],
    answer: "Our automated reminder system sends SMS and email reminders before every appointment. Most clients see a 30 to 50 percent reduction in no-shows within the first month.",
  },
  {
    keywords: ['follow up', 'follow-up', 'lead nurture', 'nurture', 'reactivate', 'win back', 'past clients'],
    answer: "We build automated follow-up sequences that re-engage past clients, nurture new leads, and keep your business top of mind without you lifting a finger.",
  },
  {
    keywords: ['orange county', 'oc', 'local', 'near me', 'southern california', 'socal', 'california'],
    answer: "We are based in Orange County and primarily serve local service businesses in the OC and Southern California area, though we work with clients across the US.",
  },
  {
    keywords: ['contract', 'commitment', 'lock in', 'cancel anytime', 'month to month', 'long term'],
    answer: "Our monthly retainers are month-to-month with no long-term contracts. We earn your business every month by delivering results.",
  },
  {
    keywords: ['roi', 'return on investment', 'worth it', 'results', 'guarantee', 'proof', 'case study'],
    answer: "We show you the math before you spend a dollar. Our Revenue Audit calculates exactly what missed calls, no-shows, and lack of follow-up are costing your business so you know the ROI before we start.",
  },
  {
    keywords: ['what is a revenue audit', 'revenue audit', 'audit', 'assessment', 'analysis'],
    answer: "A Revenue Audit is a deep-dive into your current operations to identify exactly where you are losing revenue. We look at missed calls, no-show rates, follow-up gaps, and review volume, then show you the dollar amount those gaps are costing you. It starts at $497 and the fee is credited toward any retainer.",
  },
  {
    keywords: ['activation sprint', 'sprint', 'one system', 'quick start', 'fast start'],
    answer: "The Activation Sprint is a $1,500 flat fee to implement one automation system in two weeks. It is the fastest way to see results and the setup fee is credited if you move to a monthly retainer.",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'],
    answer: "Hey there! I am Nova, your guide to Ops by Noell. We help service businesses automate their operations so they can focus on their clients. What can I help you with today?",
  },
  {
    keywords: ['thank you', 'thanks', 'appreciate', 'helpful', 'great'],
    answer: "You are welcome! If you have any other questions or want to take the next step, you can book a free 15-minute intro call at opsbynoell.com/book. We would love to learn about your business.",
  },
];

const FALLBACK_RESPONSE = "Great question! I'd love to connect you with Nikki to discuss that in detail. You can book a free 15-minute call at opsbynoell.com/book, or I can have someone reach out to you directly. What's your preferred email or phone number?";

function generateBotResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const qa of QA_PAIRS) {
    if (qa.keywords.some(kw => lower.includes(kw))) {
      return qa.answer;
    }
  }
  return FALLBACK_RESPONSE;
}
