/**
 * Telegram Bot Webhook Handler — Ops by Noell Lead Qualification Flow
 *
 * Flow:
 *   /start → "What's your name?" (free text)
 *   → "What brings you here?" [Agency Services | Freelance Work | Other]
 *   → "Best way to reach you?" [Phone | Email]
 *   → (Phone) "What's your phone number?" (free text)
 *   → (Email) "What's your email?" (free text)
 *   → Confirmation + Calendly link
 *   → Owner notification with lead summary (name, interest, contact)
 */

import type { Express, Request, Response } from "express";
import { getBotSession, upsertBotSession } from "./db";
import { formatTelegramMessage } from "./telegram";

const CALENDLY_URL = "https://calendly.com/opsbynoell/30-minute-meeting-clone?hide_event_type_details=1&hide_gdpr_banner=1";
const TELEGRAM_API = "https://api.telegram.org";

function getToken(): string {
  return process.env.TELEGRAM_BOT_TOKEN ?? "";
}

function getOwnerChatId(): string {
  return process.env.TELEGRAM_CHAT_ID ?? "";
}

// ─── Telegram API helpers ────────────────────────────────────────────────────

async function sendMessage(
  chatId: number | string,
  text: string,
  extra: Record<string, unknown> = {}
): Promise<void> {
  const token = getToken();
  if (!token) return;
  try {
    await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", ...extra }),
    });
  } catch (err) {
    console.error("[TelegramBot] sendMessage error:", err);
  }
}

async function sendOwnerNotification(text: string): Promise<void> {
  const ownerChatId = getOwnerChatId();
  if (!ownerChatId) return;
  await sendMessage(ownerChatId, text);
}

function inlineKeyboard(buttons: { text: string; callback_data: string }[][]): Record<string, unknown> {
  return { reply_markup: { inline_keyboard: buttons } };
}

// ─── Flow steps ──────────────────────────────────────────────────────────────

async function sendNamePrompt(chatId: number | string): Promise<void> {
  await sendMessage(chatId, "Hi! 👋 Welcome to Ops by Noell.\n\nFirst, what's your name?");
}

async function sendGreeting(chatId: number | string, name: string): Promise<void> {
  await sendMessage(
    chatId,
    `Nice to meet you, ${name}! 😊\n\nWhat brings you here today?`,
    inlineKeyboard([
      [
        { text: "Agency Services", callback_data: "interest:agency" },
        { text: "Freelance Work", callback_data: "interest:freelance" },
      ],
      [{ text: "Other", callback_data: "interest:other" }],
    ])
  );
}

async function sendContactMethodQuestion(chatId: number | string): Promise<void> {
  await sendMessage(
    chatId,
    "What's the best way to reach you — phone or email?",
    inlineKeyboard([
      [
        { text: "📞 Phone", callback_data: "contact:phone" },
        { text: "✉️ Email", callback_data: "contact:email" },
      ],
    ])
  );
}

async function sendPhonePrompt(chatId: number | string): Promise<void> {
  await sendMessage(chatId, "What's your phone number?");
}

async function sendEmailPrompt(chatId: number | string): Promise<void> {
  await sendMessage(chatId, "What's your email address?");
}

async function sendConfirmation(chatId: number | string, name: string): Promise<void> {
  await sendMessage(
    chatId,
    `Got it, ${name}! I'll be in touch within 2 hours. ✅\n\nIn the meantime, here's my calendar if you'd like to book a call:`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "📅 Book a Call", url: CALENDLY_URL }],
        ],
      },
    }
  );
}

// ─── Webhook handler ─────────────────────────────────────────────────────────

export function registerTelegramWebhook(app: Express): void {
  app.post("/api/telegram/webhook", async (req: Request, res: Response) => {
    // Always respond 200 immediately so Telegram doesn't retry
    res.sendStatus(200);

    try {
      const update = req.body;

      // Handle callback_query (button press)
      if (update.callback_query) {
        const query = update.callback_query;
        const chatId = query.message?.chat?.id;
        const userId = String(query.from?.id);
        const data: string = query.data ?? "";
        const firstName = query.from?.first_name ?? "";
        const username = query.from?.username ?? null;

        if (!chatId || !userId) return;

        // Acknowledge the button press (removes loading indicator)
        await fetch(`${TELEGRAM_API}/bot${getToken()}/answerCallbackQuery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ callback_query_id: query.id }),
        });

        const session = await getBotSession(userId);

        if (data.startsWith("interest:")) {
          const interest = data.replace("interest:", "");
          const interestLabel =
            interest === "agency" ? "Agency Services" :
            interest === "freelance" ? "Freelance Work" : "Other";

          await upsertBotSession(userId, {
            telegramFirstName: firstName,
            telegramUsername: username,
            step: "awaiting_contact_method",
            interest: interestLabel,
            source: session?.source ?? "direct",
          });

          await sendContactMethodQuestion(chatId);
          return;
        }

        if (data.startsWith("contact:")) {
          const method = data.replace("contact:", ""); // "phone" | "email"
          await upsertBotSession(userId, {
            step: method === "phone" ? "awaiting_phone" : "awaiting_email",
            contactMethod: method,
          });

          if (method === "phone") {
            await sendPhonePrompt(chatId);
          } else {
            await sendEmailPrompt(chatId);
          }
          return;
        }

        return;
      }

      // Handle text messages
      if (update.message) {
        const msg = update.message;
        const chatId = msg.chat?.id;
        const userId = String(msg.from?.id);
        const text: string = msg.text ?? "";
        const firstName = msg.from?.first_name ?? "";
        const username = msg.from?.username ?? null;

        if (!chatId || !userId) return;

        // /start command — begin or restart the flow
        if (text.startsWith("/start")) {
          const source = text.includes("website") ? "website" : "direct";
          await upsertBotSession(userId, {
            telegramFirstName: firstName,
            telegramUsername: username,
            step: "awaiting_name",
            leadName: undefined,
            interest: undefined,
            contactMethod: undefined,
            contactValue: undefined,
            source,
          });
          await sendNamePrompt(chatId);
          return;
        }

        const session = await getBotSession(userId);

        if (!session) {
          // No session — prompt them to start with name
          await upsertBotSession(userId, {
            telegramFirstName: firstName,
            telegramUsername: username,
            step: "awaiting_name",
            source: "direct",
          });
          await sendNamePrompt(chatId);
          return;
        }

        // Collect name
        if (session.step === "awaiting_name") {
          const name = text.trim();
          if (!name || name.length < 1) {
            await sendMessage(chatId, "Please enter your name so I know who I'm speaking with.");
            return;
          }
          await upsertBotSession(userId, {
            step: "awaiting_interest",
            leadName: name,
          });
          await sendGreeting(chatId, name);
          return;
        }

        // Collect phone number
        if (session.step === "awaiting_phone") {
          const phone = text.trim();
          await upsertBotSession(userId, {
            step: "complete",
            contactValue: phone,
          });

          const displayName = session.leadName ?? session.telegramFirstName ?? session.telegramUsername ?? "there";
          await sendConfirmation(chatId, displayName);

          // Notify owner
          await sendOwnerNotification(
            formatTelegramMessage("🎯 New Telegram Lead", {
              Name: session.leadName ?? session.telegramFirstName ?? session.telegramUsername ?? "Unknown",
              Interest: session.interest ?? "Not specified",
              "Contact Method": "Phone",
              Phone: phone,
              Source: session.source ?? "direct",
            })
          );
          return;
        }

        // Collect email address
        if (session.step === "awaiting_email") {
          const email = text.trim();
          await upsertBotSession(userId, {
            step: "complete",
            contactValue: email,
          });

          const displayName = session.leadName ?? session.telegramFirstName ?? session.telegramUsername ?? "there";
          await sendConfirmation(chatId, displayName);

          // Notify owner
          await sendOwnerNotification(
            formatTelegramMessage("🎯 New Telegram Lead", {
              Name: session.leadName ?? session.telegramFirstName ?? session.telegramUsername ?? "Unknown",
              Interest: session.interest ?? "Not specified",
              "Contact Method": "Email",
              Email: email,
              Source: session.source ?? "direct",
            })
          );
          return;
        }

        // Flow already complete — offer to restart
        if (session.step === "complete") {
          await sendMessage(
            chatId,
            "Thanks again! If you'd like to start a new conversation, just type /start."
          );
          return;
        }

        // Any other unexpected state — restart from name
        await upsertBotSession(userId, {
          telegramFirstName: firstName,
          telegramUsername: username,
          step: "awaiting_name",
          source: "direct",
        });
        await sendNamePrompt(chatId);
      }
    } catch (err) {
      console.error("[TelegramBot] Webhook processing error:", err);
    }
  });
}

// ─── Webhook registration with Telegram ─────────────────────────────────────

export async function registerWebhookWithTelegram(webhookUrl: string): Promise<boolean> {
  const token = getToken();
  if (!token) {
    console.warn("[TelegramBot] No token — skipping webhook registration");
    return false;
  }

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: webhookUrl, allowed_updates: ["message", "callback_query"] }),
    });
    const data = await res.json() as { ok: boolean; description?: string };
    if (data.ok) {
      console.log(`[TelegramBot] Webhook registered: ${webhookUrl}`);
      return true;
    } else {
      console.warn("[TelegramBot] Webhook registration failed:", data.description);
      return false;
    }
  } catch (err) {
    console.error("[TelegramBot] Error registering webhook:", err);
    return false;
  }
}
