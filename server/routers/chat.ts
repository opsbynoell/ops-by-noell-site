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
import {
  sendTelegram,
  classifyIntent,
  buildNewLeadAlert,
  buildActiveConvoAlert,
  buildHumanRequestAlert,
  buildTakeoverAlert,
  LeadIntent,
} from "../telegram";
import { sendHumanTakeoverEmail } from "../email";
import { invokeLLM } from "../_core/llm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ENV } from "../_core/env";

// ─── SSE Event Emitter ────────────────────────────────────────────────────────
// In-process, per Vercel instance. Works perfectly for single admin use.

type SSEClient = {
  id: string;
  write: (data: string) => void;
};

const sseClients: SSEClient[] = [];

export function broadcastSSE(event: string, payload: unknown) {
  const data = `event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(data);
    } catch {
      // disconnected — cleaned up on close
    }
  }
}

export function addSSEClient(client: SSEClient) {
  sseClients.push(client);
}

export function removeSSEClient(id: string) {
  const idx = sseClients.findIndex(c => c.id === id);
  if (idx !== -1) sseClients.splice(idx, 1);
}

// ─── Handoff Keywords ─────────────────────────────────────────────────────────

const HANDOFF_KEYWORDS = [
  'talk to a person', 'talk to someone', 'speak to a person', 'speak to someone',
  'real person', 'speak to nikki', 'talk to nikki', 'speak to james', 'talk to james',
  'contact you', 'reach you', 'get in touch', 'someone call me', 'call me back',
  'talk to a human', 'speak with someone', 'connect me', 'talk to the noells',
  '[human handoff request]',
];

function isHandoffRequest(msg: string): boolean {
  const lower = msg.toLowerCase();
  return HANDOFF_KEYWORDS.some(kw => lower.includes(kw));
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const chatRouter = router({
  /**
   * Visitor sends a message. Persists it, generates Nova response (or skips if
   * human takeover is active), fires exactly one Telegram alert.
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
      // ── IP + geo lookup ──────────────────────────────────────────────────
      const req = (ctx as any).req;
      const rawIp: string =
        (req?.headers?.['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        (req?.headers?.['x-real-ip'] as string) ||
        req?.socket?.remoteAddress ||
        '';
      const visitorIp = rawIp || undefined;

      let visitorLocation: string | undefined;
      if (visitorIp && visitorIp !== '127.0.0.1' && visitorIp !== '::1') {
        try {
          const geoRes = await fetch(
            `http://ip-api.com/json/${visitorIp}?fields=city,regionName,country,status`,
            { signal: AbortSignal.timeout(2000) }
          );
          if (geoRes.ok) {
            const geo = await geoRes.json() as { status: string; city?: string; regionName?: string; country?: string };
            if (geo.status === 'success') {
              visitorLocation = [geo.city, geo.regionName, geo.country].filter(Boolean).join(', ');
            }
          }
        } catch { /* non-critical */ }
      }

      // ── Intent classification (sales intelligence) ───────────────────────
      const intent: LeadIntent = classifyIntent(input.message);

      // ── Upsert session with priority ─────────────────────────────────────
      await upsertChatSession(input.sessionId, {
        visitorName: input.visitorName,
        visitorEmail: input.visitorEmail,
        businessType: input.businessType,
        visitorIp,
        visitorLocation,
        priority: intent,
      });

      // ── Persist visitor message ──────────────────────────────────────────
      await insertChatMessage(input.sessionId, "visitor", input.message);

      // ── Check human takeover FIRST ───────────────────────────────────────
      const session = await getChatSession(input.sessionId);
      if (session?.humanTakeover) {
        // SSE push
        broadcastSSE('new_message', {
          sessionId: input.sessionId,
          role: 'visitor',
          content: input.message,
          visitorName: input.visitorName,
        });
        broadcastSSE('session_updated', { sessionId: input.sessionId });

        // Single clean Telegram alert — takeover variant
        sendTelegram(buildTakeoverAlert({
          sessionId: input.sessionId,
          visitorName: input.visitorName,
          visitorLocation,
          businessType: input.businessType,
          message: input.message,
        })).catch(() => {});

        return { botReply: null, humanTakeover: true };
      }

      // ── Human handoff request detection ─────────────────────────────────
      if (isHandoffRequest(input.message)) {
        const history = await getSessionMessages(input.sessionId);

        await Promise.allSettled([
          sendTelegram(buildHumanRequestAlert({
            sessionId: input.sessionId,
            visitorName: input.visitorName,
            visitorLocation,
            visitorEmail: input.visitorEmail,
            businessType: input.businessType,
            message: input.message,
          })),
          sendHumanTakeoverEmail({
            visitorName: input.visitorName,
            visitorEmail: input.visitorEmail,
            businessType: input.businessType,
            lastMessage: input.message,
            sessionId: input.sessionId,
            chatHistory: history,
          }),
        ]);

        const handoffReply = "Of course. Let me get James and Nikki on this for you. They'll reach out shortly — you can also book a time directly at opsbynoell.com/book if that's easier.";
        await insertChatMessage(input.sessionId, "bot", handoffReply);

        broadcastSSE('new_message', {
          sessionId: input.sessionId,
          role: 'bot',
          content: handoffReply,
        });
        broadcastSSE('session_updated', { sessionId: input.sessionId });

        return { botReply: handoffReply, humanTakeover: false };
      }

      // ── Standard message: one Telegram alert ────────────────────────────
      // Determine if this is a new lead (only 1 message so far — the one we just inserted)
      const allMessages = await getSessionMessages(input.sessionId);
      const visitorMessageCount = allMessages.filter(m => m.role === 'visitor').length;
      const isNewLead = visitorMessageCount === 1;

      const alertPayload = {
        sessionId: input.sessionId,
        visitorName: input.visitorName,
        visitorLocation,
        businessType: input.businessType,
        message: input.message,
        intent,
      };

      sendTelegram(
        isNewLead
          ? buildNewLeadAlert(alertPayload)
          : buildActiveConvoAlert(alertPayload)
      ).catch(() => {});

      // ── SSE push ─────────────────────────────────────────────────────────
      broadcastSSE('new_message', {
        sessionId: input.sessionId,
        role: 'visitor',
        content: input.message,
        visitorName: input.visitorName,
      });
      broadcastSSE('session_updated', { sessionId: input.sessionId });

      // ── Generate Nova reply (streaming) ──────────────────────────────────
      const botReply = await generateNovaResponseStreaming(
        input.sessionId,
        input.message,
        allMessages,
        { visitorName: input.visitorName, businessType: input.businessType }
      );

      return { botReply, humanTakeover: false };
    }),

  /**
   * Returns all messages for a session. Used by ChatWidget for polling.
   */
  getMessages: publicProcedure
    .input(z.object({ sessionId: z.string().min(1).max(64) }))
    .query(async ({ input }) => {
      return getSessionMessages(input.sessionId);
    }),

  // ─── Admin-only ──────────────────────────────────────────────────────────

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
    .input(z.object({
      sessionId: z.string().min(1).max(64),
      message: z.string().min(1).max(2000),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      await setHumanTakeover(input.sessionId, true);
      await insertChatMessage(input.sessionId, "human", input.message);

      broadcastSSE('new_message', {
        sessionId: input.sessionId,
        role: 'human',
        content: input.message,
      });
      broadcastSSE('session_updated', { sessionId: input.sessionId });

      return { success: true };
    }),

  setTakeover: protectedProcedure
    .input(z.object({
      sessionId: z.string().min(1).max(64),
      active: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      await setHumanTakeover(input.sessionId, input.active);
      broadcastSSE('session_updated', { sessionId: input.sessionId });
      return { success: true };
    }),

  /**
   * Visitor sends a typing event. Broadcasts ephemeral typing state to admin.
   * Not persisted to DB. Draft text is optional but enables live preview.
   */
  visitorTyping: publicProcedure
    .input(z.object({
      sessionId: z.string().min(1).max(64),
      draft: z.string().max(500).optional(),
      isTyping: z.boolean(),
    }))
    .mutation(async ({ input }) => {
      broadcastSSE('visitor_typing', {
        sessionId: input.sessionId,
        isTyping: input.isTyping,
        draft: input.draft ?? '',
      });
      return { ok: true };
    }),
});

// ─── Nova Streaming Response ─────────────────────────────────────────────────

async function generateNovaResponseStreaming(
  sessionId: string,
  currentMessage: string,
  history: ChatMessage[],
  context: { visitorName?: string; businessType?: string }
): Promise<string> {
  // Signal typing to admin
  broadcastSSE('nova_typing', { sessionId, isTyping: true });

  try {
    const priorMessages = history.slice(0, -1);
    const llmMessages: Array<{ role: "user" | "assistant"; content: string }> = [];
    for (const msg of priorMessages) {
      if (msg.role === "visitor") llmMessages.push({ role: "user", content: msg.content });
      else if (msg.role === "bot" || msg.role === "human") llmMessages.push({ role: "assistant", content: msg.content });
    }
    llmMessages.push({ role: "user", content: currentMessage });

    const apiKey = ENV.forgeApiKey?.trim() || ENV.anthropicApiKey?.trim();
    const forgeUrl = ENV.forgeApiUrl?.trim();

    if (apiKey) {
      let apiUrl: string;
      let headers: Record<string, string>;
      let bodyPayload: Record<string, unknown>;

      const isAnthropic = !forgeUrl && !!ENV.anthropicApiKey?.trim();

      if (isAnthropic) {
        apiUrl = "https://api.anthropic.com/v1/messages";
        headers = {
          "content-type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        };
        bodyPayload = {
          model: "claude-haiku-4-5-20251001",
          system: NOVA_SYSTEM_PROMPT,
          messages: llmMessages,
          max_tokens: 300,
          stream: true,
        };
      } else {
        apiUrl = forgeUrl
          ? `${forgeUrl.replace(/\/$/, "")}/v1/chat/completions`
          : "https://forge.manus.im/v1/chat/completions";
        headers = {
          "content-type": "application/json",
          "authorization": `Bearer ${apiKey}`,
        };
        bodyPayload = {
          model: "claude-haiku-4-5-20251001",
          messages: [{ role: "system", content: NOVA_SYSTEM_PROMPT }, ...llmMessages],
          max_tokens: 300,
          stream: true,
        };
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(bodyPayload),
      });

      if (response.ok && response.body) {
        let fullText = "";
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              let chunk = "";
              // Anthropic streaming format
              if (parsed.type === "content_block_delta" && parsed.delta?.type === "text_delta") {
                chunk = parsed.delta.text ?? "";
              }
              // OpenAI-compatible streaming format
              else if (parsed.choices?.[0]?.delta?.content) {
                chunk = parsed.choices[0].delta.content;
              }
              if (chunk) {
                fullText += chunk;
                broadcastSSE('nova_stream_chunk', { sessionId, chunk });
              }
            } catch { /* malformed JSON line — skip */ }
          }
        }

        if (fullText.trim()) {
          await insertChatMessage(sessionId, "bot", fullText.trim());
          broadcastSSE('nova_stream_done', { sessionId, content: fullText.trim() });
          broadcastSSE('nova_typing', { sessionId, isTyping: false });
          return fullText.trim();
        }
      }
    }
  } catch (err) {
    console.error("[Nova] Streaming failed, falling back:", err);
  }

  // Fallback: non-streaming
  const reply = await generateNovaResponse(currentMessage, history, context);
  await insertChatMessage(sessionId, "bot", reply);
  // Simulate progressive stream for fallback so admin sees it arrive word by word
  const words = reply.split(" ");
  for (let i = 0; i < words.length; i++) {
    const chunk = (i === 0 ? "" : " ") + words[i];
    broadcastSSE('nova_stream_chunk', { sessionId, chunk });
    await new Promise(r => setTimeout(r, 40));
  }
  broadcastSSE('nova_stream_done', { sessionId, content: reply });
  broadcastSSE('nova_typing', { sessionId, isTyping: false });
  return reply;
}

// ─── Pricing source of truth ─────────────────────────────────────────────────
// Single place to update pricing. Fed into the system prompt and keyword fallback.
const NOVA_PRICING = {
  entry:   { setup: 297,   monthly: 247,   label: "Entry",   includes: "Missed Call Text-Back + AI Voice Receptionist" },
  starter: { setup: 997,   monthly: 797,   label: "Starter", includes: "AI Booking + Reminder System" },
  growth:  { setup: 1497,  monthly: 1497,  label: "Growth",  includes: "full stack — reminders, review generation, lead follow-up, marketing" },
  audit:   { setup: 497,   monthly: null,  label: "Revenue Audit", includes: "one-time deep-dive, credited toward any retainer" },
  nova:    { setup: 497,   monthly: 297,   label: "Nova Support", includes: "AI chat agent, founding client rate, first 5 businesses" },
};

// ─── Nova System Prompt ──────────────────────────────────────────────────────

const NOVA_SYSTEM_PROMPT = `You are Nova, the AI assistant for Ops by Noell — a done-for-you AI automation agency for appointment-based service businesses. You are warm, direct, and consultative. You sound like a sharp, knowledgeable person who genuinely cares about service business owners — not a bot, not a brochure.

YOUR CORE JOB:
Help business owners recognize the cost of their current gaps, understand what's possible, and take the next step — naturally, without pressure. You are a trusted guide, not a closer.

EMPATHY FIRST:
Every response starts from the visitor's reality, not our features. If someone says "I keep missing calls," the first thing you say is not "we have a missed call product" — it's something like "that's the most expensive problem in a service business and most owners don't realize how much it's costing them." Meet them where they are, then move the conversation forward.

ABOUT OPS BY NOELL:
- Founders: James and Nikki Noell, Mission Viejo, CA. Local team. "Our name is on the door."
- Website: opsbynoell.com
- Booking: https://api.leadconnectorhq.com/widget/booking/ko7eXb5zooItceadiV02
- We serve Southern California primarily, but work with businesses US-wide.

WHAT WE BUILD (done-for-you, fully managed):
1. Missed Call Text-Back — responds to unanswered calls via text within seconds. 85% of callers never call back after voicemail. This stops that.
2. AI Booking + Reminders — 24/7 self-booking + automated 3-touch reminder sequences. Reduces no-shows 30-75%.
3. Review Generation — post-appointment review request sequences. Santa went from zero to 40+ Google reviews in 8 weeks.
4. Lead Follow-Up — automated nurture sequences. 80% of sales need 5+ touches. Most businesses stop at 1.
5. Marketing Automation — birthday, win-back, referral, seasonal campaigns. Turns your client list into recurring revenue.
6. AI Voice Receptionist — answers calls 24/7, qualifies leads, books appointments. No voicemail lost.
7. Nova Support — AI chat agent for your website, same system you're talking to right now.
8. Custom Ops — anything beyond the above, scoped and built to fit.

PRICING (all month-to-month, no contracts):
- Entry: $297 setup + $247/mo — Missed Call Text-Back + AI Voice Receptionist. Fast first step.
- Starter: $997 setup + $797/mo — adds AI Booking + Reminder System.
- Growth: $1,497 setup + $1,497/mo — full stack + Review Generation + Lead Follow-Up + Marketing Automation.
- Revenue Audit: $497 one-time — deep-dive into exactly what your gaps cost. Credited toward any retainer.
- Nova Support: $497 setup + $297/mo — AI chat agent for your website (founding client rate, first 5 businesses).

VERTICAL-SPECIFIC CONTEXT:

MASSAGE THERAPISTS:
- 63% of calls go unanswered during sessions. They physically cannot pick up.
- No-shows are the #1 revenue killer. Average solo practice loses $600+/week.
- Santa (Laguna Niguel, 25 years) dropped from 4 no-shows/week to under 1 in 2 weeks.
- Key win: missed call text-back + 3-touch reminder sequence. Live in 2 weeks.

DENTAL PRACTICES:
- Every missed call is a patient choosing the practice that picked up.
- No-show rates average 15-20% without reminders. 5-8% is achievable.
- Recall automation reactivates dormant patients — usually 10-20% response rate.
- Key win: missed call response + appointment reminders + recall sequences.

MED SPAS:
- High-value appointments ($200-$500+) make every no-show especially painful.
- Lead follow-up is critical — consultations that go cold rarely self-convert.
- After-hours inquiries from Instagram/website need instant response.
- Key win: AI voice + lead follow-up + review generation.

SALONS:
- Chairs sit empty because of last-minute cancellations with no fill system.
- Client reactivation ("it's been 6 weeks — ready to rebook?") drives consistent revenue.
- Key win: reminder sequences + reactivation campaigns.

HOME SERVICES:
- 78% of homeowners hire the first contractor who responds.
- Most calls come after hours. Missing them means losing the job.
- Key win: after-hours missed call text-back + automated follow-up.

CONTACT CAPTURE (intent-triggered, never pushy):
- Do NOT ask for name/email in the first 1-2 exchanges. Build trust first.
- Only ask when the conversation has clearly moved toward "let's do this" OR when you've had 3+ substantive exchanges.
- Natural trigger: "If you want, I can have Nikki reach out with specifics — what's a good email?"
- Never use form-style language like "Please enter your email address."
- If they've asked about pricing twice or described their specific situation in detail, that's the moment.

OBJECTION HANDLERS:

"Is this worth it?" / ROI objection:
Ask what their current no-show rate is or how many calls they miss per week. Then calculate the math with them. "If you're losing even 2 bookings a week at $100 each, that's $800/month — more than the cost of the full system."

"I'm not sure I have time to set this up":
"That's actually why we do it done-for-you. You don't touch a setting. We handle the build, the testing, and the ongoing management. Most clients go live in about 2 weeks without doing anything themselves."

"I already tried [something similar]":
"What didn't work about it?" Listen first. Then differentiate based on their specific experience. We're fully managed — most automation tools leave you to figure it out yourself.

"The price feels high":
"The Entry package is $247/month — less than the average single no-show. Most clients see full payback in the first week." Don't apologize for pricing. Anchor to the cost of the problem.

"Let me think about it" / timing objection:
"Of course. One thing I'd say — the cost of waiting is usually the same as the cost of the gap. But no pressure. What's the main thing you're still thinking through?"

HOW TO RESPOND:
- 2-3 sentences max per reply. No exceptions.
- One idea per message. Don't stack multiple offers, CTAs, or packages.
- Sound like a real person texting, not a sales page. No bullet lists, no headers, no bold text.
- Lead with their problem or situation, not our features.
- Ask one follow-up question per reply when it moves things forward. Never ask two.
- Vary your openers. Never start with "Great question!", "Absolutely!", or "Of course!".
- When it's natural, mention booking a free 30-min call at opsbynoell.com/book — once, casually, not as a hard CTA.
- If you're unsure about something, say so and offer to connect them with Nikki directly.
- Never make up pricing, stats, or services beyond what's listed above.

PRICING RULES (critical):
- When someone asks about cost, give a range and ask a qualifying question first.
- Example: "Depends on what you need — most businesses start somewhere between $247 and $797/mo. What's your biggest gap right now?"
- Only share specific package details if they ask for them directly or the conversation clearly calls for it.
- Never invent pricing or mention numbers not listed above.

WHAT YOU ARE NOT:
- Don't claim to be human if asked directly.
- Don't answer questions unrelated to Ops by Noell or AI automation for service businesses.
- Don't give legal, financial, or medical advice.
- Don't promise specific results beyond what's documented above.\`;

type ChatMessage = { role: string; content: string; createdAt?: Date | string };

async function generateNovaResponse(
  currentMessage: string,
  history: ChatMessage[],
  context: { visitorName?: string; businessType?: string }
): Promise<string> {
  try {
    const priorMessages = history.slice(0, -1);

    const llmMessages: Array<{ role: "user" | "assistant"; content: string }> = [];
    for (const msg of priorMessages) {
      if (msg.role === "visitor") {
        llmMessages.push({ role: "user", content: msg.content });
      } else if (msg.role === "bot" || msg.role === "human") {
        llmMessages.push({ role: "assistant", content: msg.content });
      }
    }
    llmMessages.push({ role: "user", content: currentMessage });

    const result = await invokeLLM({
      messages: [
        { role: "system", content: NOVA_SYSTEM_PROMPT },
        ...llmMessages,
      ],
      maxTokens: 280,
    });

    const responseContent = result.choices?.[0]?.message?.content;
    if (responseContent && typeof responseContent === "string" && responseContent.trim().length > 0) {
      return responseContent.trim();
    }
  } catch (err) {
    console.error("[Nova] LLM call failed, using keyword fallback:", err);
  }

  return generateKeywordFallback(currentMessage);
}

// ─── Keyword Fallback ────────────────────────────────────────────────────────

const QA_PAIRS: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['what do you do', 'what is ops by noell', 'what does ops by noell do', 'tell me about', 'what you do', 'services', 'what you offer', 'what can you do'],
    answer: "We build done-for-you AI automation for service businesses — missed call text-back, AI booking and reminders, review generation, lead follow-up, AI voice receptionist. We build it, we manage it. You see the results. What kind of business do you run?",
  },
  {
    keywords: ['how much', 'cost', 'price', 'pricing', 'fee', 'charge', 'rate', 'package', 'tier'],
    answer: `Depends on what you need — most businesses start somewhere between $${NOVA_PRICING.entry.monthly} and $${NOVA_PRICING.starter.monthly}/mo. What's the biggest gap you're trying to fix right now?`,
  },
  {
    keywords: ['who do you work with', 'what type of business', 'what businesses', 'industry', 'who is this for', 'med spa', 'salon', 'dental', 'massage', 'chiropractor'],
    answer: "We work with appointment-based service businesses — med spas, massage therapists, salons, estheticians, chiropractors, dental offices. If your business runs on bookings and you're losing leads or fighting no-shows, we can almost certainly help.",
  },
  {
    keywords: ['how long', 'timeline', 'setup time', 'how soon', 'how fast', 'get started', 'onboard'],
    answer: "Most clients are fully live within 7 to 14 days of signing. We handle everything. You show up for a 60-minute onboarding call. That's it.",
  },
  {
    keywords: ['tech', 'technical', 'tech-savvy', 'complicated', 'difficult', 'do i need to', 'hard to use'],
    answer: "Zero technical knowledge needed. We build it, configure it, and manage it. You won't log into dashboards or learn new software. You'll just see the results.",
  },
  {
    keywords: ['how do i start', 'next step', 'how to begin', 'sign up', 'book', 'schedule', 'call', 'consult', 'audit', 'intro'],
    answer: "Best first step is a free 30-minute intro call at opsbynoell.com/book. We'll learn about your business and figure out where the biggest gaps are. No pitch, no pressure.",
  },
  {
    keywords: ['different', 'unique', 'why you', 'why ops by noell', 'what makes you', 'stand out', 'better than'],
    answer: "We don't sell software. We build your complete system, install every piece, and manage it ongoing. We also show you the ROI math before you spend anything — so you know if it makes sense before you commit.",
  },
  {
    keywords: ['missed call', 'missed calls', 'text back', 'call back', 'unanswered', 'voicemail'],
    answer: "85% of callers who hit voicemail never call back. Our Missed Call Text-Back sends an automatic text within seconds of a missed call — keeping the conversation alive while you're with a client. It's in every package.",
  },
  {
    keywords: ['ai voice', 'voice receptionist', 'phone answering', 'answer the phone', 'receptionist'],
    answer: "The AI Voice Receptionist answers calls 24/7 — qualifies callers, answers common questions, and books appointments directly. No voicemail. No missed lead. Included in the Entry package at $247/mo.",
  },
  {
    keywords: ['review', 'reviews', 'google review', 'reputation', 'rating'],
    answer: "We automate review requests after every appointment. One tap takes the client straight to your Google profile. Most clients see a jump in review volume within the first 30 days. 93% of people read reviews before choosing a local service provider.",
  },
  {
    keywords: ['no-show', 'no show', 'cancellation', 'reminder', 'appointment reminder'],
    answer: "No-shows cost most service businesses 10-15% of annual revenue. Our automated reminder sequences — SMS + email at strategic intervals — reduce no-shows by 30-50% in the first month.",
  },
  {
    keywords: ['follow up', 'follow-up', 'lead nurture', 'nurture', 'reactivate', 'past clients'],
    answer: "We build automated follow-up sequences that re-engage leads, nurture prospects, and reactivate past clients. 80% of sales need 5+ touches. These run automatically in the background.",
  },
  {
    keywords: ['orange county', 'oc', 'local', 'near me', 'southern california'],
    answer: "We're based in Orange County and most of our clients are in Southern California — but we work with businesses across the US.",
  },
  {
    keywords: ['contract', 'commitment', 'lock in', 'cancel anytime', 'month to month'],
    answer: "Month-to-month, always. 30 days notice to cancel. No lock-in, no penalties. We earn your business every month by delivering results.",
  },
  {
    keywords: ['roi', 'return on investment', 'worth it', 'results', 'guarantee', 'proof', 'case study'],
    answer: "Our founding client Santa — massage therapist, 25 years in Laguna Niguel — went from 4 no-shows a week to less than 1 in two weeks. We show you the math before you spend anything. The Revenue Audit calculates exactly what your gaps cost.",
  },
  {
    keywords: ['data', 'privacy', 'sell my info', 'sell my data', 'spam', 'safe', 'secure'],
    answer: "We don't sell your data. Ever. Anything you share stays between us and is only used to help you. No spam, no lists, no third-party sharing.",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'howdy'],
    answer: "Hey! I'm Nova. I can answer anything about Ops by Noell — pricing, how it works, what we build. What's on your mind?",
  },
  {
    keywords: ['thank you', 'thanks', 'appreciate', 'helpful', 'great'],
    answer: "Happy to help. When you're ready to take the next step, opsbynoell.com/book gets you a free 30-minute call with James and Nikki.",
  },
];

const FALLBACK_RESPONSE = "Good question — I want to make sure you get a real answer on that. You can book a free 30-minute intro call at opsbynoell.com/book, or drop your email and James or Nikki will reach out directly. What works better for you?";

function generateKeywordFallback(message: string): string {
  const lower = message.toLowerCase();
  for (const qa of QA_PAIRS) {
    if (qa.keywords.some(kw => lower.includes(kw))) {
      return qa.answer;
    }
  }
  return FALLBACK_RESPONSE;
}
