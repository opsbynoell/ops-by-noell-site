/**
 * Telegram notification helper — Ops by Noell
 *
 * Requires:
 *   TELEGRAM_BOT_TOKEN  — from @BotFather
 *   TELEGRAM_CHAT_ID    — personal or channel ID
 *
 * Message types supported:
 *   🚨 HOT LEAD     — pricing/demo/strong intent detected
 *   💬 ACTIVE CONVO — ongoing chat, warm interest
 *   🙋 HUMAN REQUEST — visitor explicitly asked for a person
 *   👤 TAKEOVER ACTIVE — admin is handling the conversation
 *   ⏰ NEEDS RESPONSE  — no reply after threshold (escalation)
 *
 * All messages:
 *   - disable link preview (clean text-first)
 *   - follow portable formatting (no Telegram-only features)
 *   - are scannable in under 2 seconds
 */

const TELEGRAM_API = "https://api.telegram.org";

// ─── Lead Intent Classification ──────────────────────────────────────────────

const HOT_KEYWORDS = [
  'how much', 'pricing', 'price', 'cost', 'cost?', 'costs',
  'sign up', 'sign me up', 'ready to start', 'let\'s do it',
  'i want this', 'i need this', 'i\'m interested', 'i am interested',
  'interested', 'demo', 'book', 'schedule', 'when can we', 'call me',
  'can you help', 'can you help me', 'how does this work for',
  'no-show', 'no shows', 'losing leads', 'missing calls', 'revenue',
  'what\'s the investment', 'what is the investment',
];

const WARM_KEYWORDS = [
  'what do you do', 'how does it work', 'tell me more',
  'services', 'what you offer', 'how long', 'what\'s included',
  'remind me', 'follow up', 'review', 'appointment',
  'med spa', 'salon', 'massage', 'dental', 'chiropractor',
  'how does', 'what is', 'explain', 'curious',
];

export type LeadIntent = 'hot' | 'warm' | 'low';

export function classifyIntent(message: string): LeadIntent {
  const lower = message.toLowerCase();
  if (HOT_KEYWORDS.some(kw => lower.includes(kw))) return 'hot';
  if (WARM_KEYWORDS.some(kw => lower.includes(kw))) return 'warm';
  return 'low';
}

// ─── Core Send Function ───────────────────────────────────────────────────────

export async function sendTelegram(
  message: string,
  options?: { disableLinkPreview?: boolean }
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping.");
    return false;
  }

  const url = `${TELEGRAM_API}/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        // Always disable link previews — keeps messages clean and scannable
        link_preview_options: { is_disabled: true },
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(`[Telegram] Failed (${response.status}): ${detail}`);
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Telegram] Network error:", error);
    return false;
  }
}

// ─── Formatted Alert Builders ─────────────────────────────────────────────────

type AlertPayload = {
  sessionId: string;
  visitorName?: string;
  visitorLocation?: string;
  visitorEmail?: string;
  businessType?: string;
  message: string;
  intent?: LeadIntent;
  inboxUrl?: string;
};

function buildInboxUrl(sessionId: string): string {
  // /admin/open handles auth check first:
  //   - authenticated  → goes straight to /admin/inbox?session=...
  //   - unauthenticated → goes to /admin/login?next=... then returns after login
  // This fixes the loading loop in Telegram's in-app browser.
  return `https://www.opsbynoell.com/admin/open?session=${encodeURIComponent(sessionId)}`;
}

function trimMessage(msg: string, maxLen = 180): string {
  const clean = msg.trim().replace(/\s+/g, ' ');
  return clean.length > maxLen ? clean.slice(0, maxLen - 1) + '…' : clean;
}

function visitorLine(payload: AlertPayload): string {
  const name = payload.visitorName ?? 'Visitor';
  const biz = payload.businessType ? ` · ${payload.businessType}` : '';
  const loc = payload.visitorLocation ? ` (${payload.visitorLocation})` : '';
  return `${name}${biz}${loc}`;
}

/**
 * NEW LEAD — first message from a session
 */
export function buildNewLeadAlert(payload: AlertPayload): string {
  const intent = payload.intent ?? classifyIntent(payload.message);
  const inboxUrl = payload.inboxUrl ?? buildInboxUrl(payload.sessionId);
  const header = intent === 'hot' ? '🚨 <b>HOT LEAD</b>' : '🔔 <b>NEW LEAD</b>';
  const time = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', hour12: true });

  return [
    header,
    '',
    `<b>From:</b> ${visitorLine(payload)}`,
    `<b>Message:</b> "${trimMessage(payload.message)}"`,
    `<b>Time:</b> ${time} PT`,
    '',
    `<a href="${inboxUrl}">Open in Inbox →</a>`,
  ].join('\n');
}

/**
 * ACTIVE CONVERSATION — subsequent messages
 */
export function buildActiveConvoAlert(payload: AlertPayload): string {
  const intent = payload.intent ?? classifyIntent(payload.message);
  const inboxUrl = payload.inboxUrl ?? buildInboxUrl(payload.sessionId);
  const header = intent === 'hot' ? '🚨 <b>HOT LEAD</b>' : '💬 <b>ACTIVE CONVO</b>';

  return [
    header,
    '',
    `<b>From:</b> ${visitorLine(payload)}`,
    `<b>Message:</b> "${trimMessage(payload.message)}"`,
    '',
    `<a href="${inboxUrl}">Open in Inbox →</a>`,
  ].join('\n');
}

/**
 * HUMAN REQUEST — visitor asked to speak to a real person
 */
export function buildHumanRequestAlert(payload: AlertPayload): string {
  const inboxUrl = payload.inboxUrl ?? buildInboxUrl(payload.sessionId);

  return [
    '🙋 <b>HUMAN REQUEST</b>',
    '',
    `<b>From:</b> ${visitorLine(payload)}`,
    `<b>Email:</b> ${payload.visitorEmail ?? 'Not provided'}`,
    `<b>Message:</b> "${trimMessage(payload.message)}"`,
    '',
    `<a href="${inboxUrl}">Take over conversation →</a>`,
  ].join('\n');
}

/**
 * TAKEOVER ACTIVE — admin is handling; visitor sent a follow-up
 */
export function buildTakeoverAlert(payload: AlertPayload): string {
  const inboxUrl = payload.inboxUrl ?? buildInboxUrl(payload.sessionId);

  return [
    '👤 <b>TAKEOVER — VISITOR REPLIED</b>',
    '',
    `<b>From:</b> ${visitorLine(payload)}`,
    `<b>Message:</b> "${trimMessage(payload.message)}"`,
    '',
    `<a href="${inboxUrl}">Open in Inbox →</a>`,
  ].join('\n');
}

/**
 * ESCALATION — no human response after threshold
 * (Called externally when a session is still unresponded after X minutes)
 */
export function buildEscalationAlert(payload: AlertPayload & { minutesWaiting: number }): string {
  const inboxUrl = payload.inboxUrl ?? buildInboxUrl(payload.sessionId);

  return [
    `⏰ <b>NEEDS RESPONSE</b> — ${payload.minutesWaiting} min with no reply`,
    '',
    `<b>From:</b> ${visitorLine(payload)}`,
    `<b>Last message:</b> "${trimMessage(payload.message)}"`,
    '',
    `<a href="${inboxUrl}">Open in Inbox →</a>`,
  ].join('\n');
}

// Keep legacy export for any remaining callers
export function formatTelegramMessage(
  event: string,
  fields: Record<string, string | undefined>
): string {
  const lines: string[] = [`<b>${event}</b>`, ''];
  for (const [key, value] of Object.entries(fields)) {
    if (value) lines.push(`<b>${key}:</b> ${value}`);
  }
  lines.push('', `<i>${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT</i>`);
  return lines.join('\n');
}
