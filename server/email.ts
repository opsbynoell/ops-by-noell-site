/**
 * OPS BY NOELL — Email helper
 * Uses Resend to send transactional emails to the business owner.
 * All outbound mail goes to noell@opsbynoell.com.
 */

import { Resend } from "resend";

const OWNER_EMAIL = "noell@opsbynoell.com";
const FROM_ADDRESS = "Ops by Noell <noreply@opsbynoell.com>";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[Email] RESEND_API_KEY is not set — email delivery skipped.");
    return null;
  }
  return new Resend(key);
}

export type ChatHistoryMessage = {
  role: 'visitor' | 'bot' | 'human';
  content: string;
  createdAt: Date;
};

export type HumanTakeoverEmailPayload = {
  visitorName?: string;
  visitorEmail?: string;
  businessType?: string;
  lastMessage: string;
  sessionId: string;
  chatHistory?: ChatHistoryMessage[];
};

/**
 * Send an urgent notification email when a website visitor requests a human response.
 * Returns true on success, false on any failure.
 */
export async function sendHumanTakeoverEmail(
  payload: HumanTakeoverEmailPayload
): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const { visitorName, visitorEmail, businessType, lastMessage, sessionId, chatHistory } = payload;
  const displayName = visitorName ?? 'Anonymous Visitor';
  const inboxUrl = 'https://www.opsbynoell.com/admin/inbox';

  // Build chat history HTML block
  const buildChatHistoryHtml = (messages: ChatHistoryMessage[]): string => {
    if (!messages || messages.length === 0) return '';
    const rows = messages.map(msg => {
      const isVisitor = msg.role === 'visitor';
      const isHuman = msg.role === 'human';
      const label = isVisitor ? (visitorName ?? 'Visitor') : isHuman ? 'You (Human)' : 'Nova';
      const bgColor = isVisitor ? '#1E1A16' : isHuman ? '#1A1E2A' : '#141414';
      const borderColor = isVisitor ? '#D4A843' : isHuman ? '#6B8FD4' : '#3A3A3A';
      const labelColor = isVisitor ? '#D4A843' : isHuman ? '#6B8FD4' : '#8A8480';
      const time = new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      return `<div style="margin-bottom: 10px; padding: 12px 16px; background: ${bgColor}; border-left: 3px solid ${borderColor}; border-radius: 4px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: ${labelColor};">${label}</span>
          <span style="font-size: 11px; color: #5A5450;">${time}</span>
        </div>
        <div style="font-size: 14px; color: #C8C0B8; line-height: 1.6;">${msg.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>`;
    }).join('');
    return `<div style="margin-bottom: 28px;">
      <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Full Conversation (${messages.length} messages)</p>
      <div style="background: #0F0F0F; border: 1px solid #2A2A2A; border-radius: 6px; padding: 16px; max-height: 600px; overflow-y: auto;">${rows}</div>
    </div>`;
  };

  const chatHistoryHtml = chatHistory ? buildChatHistoryHtml(chatHistory) : '';

  // Build plain text chat history
  const buildChatHistoryText = (messages: ChatHistoryMessage[]): string => {
    if (!messages || messages.length === 0) return '';
    const lines = messages.map(msg => {
      const label = msg.role === 'visitor' ? (visitorName ?? 'Visitor') : msg.role === 'human' ? 'You (Human)' : 'Nova';
      const time = new Date(msg.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      return `[${time}] ${label}: ${msg.content}`;
    });
    return `\n\nFull Conversation:\n${lines.join('\n')}`;
  };

  const chatHistoryText = chatHistory ? buildChatHistoryText(chatHistory) : '';

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      replyTo: visitorEmail ?? OWNER_EMAIL,
      subject: `🔴 Live Chat — ${displayName} wants to speak with a human`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0EB; border-radius: 8px; overflow: hidden;">
          <div style="background: #D4A843; padding: 24px 32px;">
            <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(0,0,0,0.6);">Ops by Noell — Nova Chat</p>
            <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 700; color: #0A0A0A;">Hot Lead — Human Response Requested</h1>
          </div>
          <div style="padding: 32px;">
            <p style="margin: 0 0 24px; font-size: 15px; color: #C8C0B8; line-height: 1.6;">A visitor on your website is asking to speak with a real person. This is a live prospect — respond quickly.</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 15px; color: #F5F0EB;">${displayName}</td>
              </tr>
              ${visitorEmail ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 15px;"><a href="mailto:${visitorEmail}" style="color: #D4A843; text-decoration: none;">${visitorEmail}</a></td></tr>` : ''}
              ${businessType ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Business</td><td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 15px; color: #F5F0EB;">${businessType}</td></tr>` : ''}
            </table>
            ${chatHistoryHtml}
            <div style="margin-bottom: 28px;">
              <p style="margin: 0 0 10px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Triggering Message</p>
              <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-left: 3px solid #D4A843; border-radius: 6px; padding: 18px 20px; font-size: 15px; color: #C8C0B8; line-height: 1.7;">${lastMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            </div>
            <a href="${inboxUrl}" style="display: inline-block; background: #D4A843; color: #0A0A0A; font-size: 14px; font-weight: 700; padding: 14px 28px; border-radius: 6px; text-decoration: none; margin-right: 12px;">Open Chat Inbox</a>
            ${visitorEmail ? `<a href="mailto:${visitorEmail}" style="display: inline-block; background: transparent; border: 1px solid #D4A843; color: #D4A843; font-size: 14px; font-weight: 600; padding: 13px 24px; border-radius: 6px; text-decoration: none;">Email Directly</a>` : ''}
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid #2A2A2A; font-size: 12px; color: #8A8480;">
            Session ID: ${sessionId} · Triggered from Nova chat widget at opsbynoell.com
          </div>
        </div>
      `,
      text: [
        `HOT LEAD — Human Response Requested`,
        ``,
        `Visitor: ${displayName}`,
        visitorEmail ? `Email: ${visitorEmail}` : '',
        businessType ? `Business: ${businessType}` : '',
        ``,
        `Last Message:`,
        lastMessage,
        ``,
        `Open the chat inbox to reply: ${inboxUrl}`,
        chatHistoryText,
      ].filter(Boolean).join('\n'),
    });

    if (error) {
      console.warn('[Email] Resend returned an error for human takeover email:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.warn('[Email] Failed to send human takeover email:', err);
    return false;
  }
}

// ─── Newsletter Emails ──────────────────────────────────────────────────────

/**
 * Send a welcome email to a new newsletter subscriber.
 * Returns true on success, false on any failure.
 */
export async function sendNewsletterWelcomeEmail(email: string): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: `Welcome to The Ops Brief`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0EB; border-radius: 8px; overflow: hidden;">
          <div style="background: #A78BFA; padding: 24px 32px;">
            <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.75);">Ops by Noell</p>
            <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 700; color: #FFFFFF;">You're in. Welcome to The Ops Brief.</h1>
          </div>
          <div style="padding: 32px;">
            <p style="font-size: 15px; color: #C8C0B8; line-height: 1.75; margin: 0 0 20px;">Hey — thanks for subscribing. I'm Nikki, founder of Ops by Noell.</p>
            <p style="font-size: 15px; color: #C8C0B8; line-height: 1.75; margin: 0 0 20px;">The Ops Brief is a short, practical newsletter for local service business owners who want to understand what AI automation can actually do for their business — without the hype.</p>
            <p style="font-size: 15px; color: #C8C0B8; line-height: 1.75; margin: 0 0 28px;">I send it when there's something worth saying. You won't hear from me on a schedule for the sake of it.</p>
            <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-left: 3px solid #A78BFA; border-radius: 6px; padding: 18px 20px; margin-bottom: 28px;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">What to expect</p>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #C8C0B8; line-height: 1.8;">
                <li>Real automation case studies from local service businesses</li>
                <li>The exact systems we build and how they work</li>
                <li>Pricing breakdowns and ROI math you can apply to your own business</li>
                <li>Honest takes on what AI can and cannot do right now</li>
              </ul>
            </div>
            <p style="font-size: 15px; color: #C8C0B8; line-height: 1.75; margin: 0 0 28px;">In the meantime, if you want to see what's possible for your business specifically, book a free 15-minute intro call — no pitch, no pressure.</p>
            <a href="https://calendly.com/opsbynoell/30-minute-meeting-clone" style="display: inline-block; background: #A78BFA; color: #FFFFFF; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Book a Free Intro Call</a>
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid #2A2A2A; font-size: 12px; color: #8A8480;">
            Ops by Noell · Orange County, CA · <a href="https://www.opsbynoell.com" style="color: #8A8480;">opsbynoell.com</a>
          </div>
        </div>
      `,
      text: [
        `Welcome to The Ops Brief — Ops by Noell`,
        ``,
        `Hey — thanks for subscribing. I'm Nikki, founder of Ops by Noell.`,
        ``,
        `The Ops Brief is a short, practical newsletter for local service business owners who want to understand what AI automation can actually do for their business — without the hype.`,
        ``,
        `I send it when there's something worth saying. You won't hear from me on a schedule for the sake of it.`,
        ``,
        `In the meantime, book a free 15-minute intro call: https://calendly.com/opsbynoell/30-minute-meeting-clone`,
        ``,
        `— Nikki`,
        `Ops by Noell · opsbynoell.com`,
      ].join('\n'),
    });
    if (error) {
      console.warn('[Email] Resend error on welcome email:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Email] Failed to send newsletter welcome email:', err);
    return false;
  }
}

/**
 * Notify the owner when a new subscriber joins The Ops Brief.
 * Returns true on success, false on any failure.
 */
export async function sendNewsletterOwnerNotification(email: string, totalCount: number): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      subject: `New Ops Brief Subscriber — ${email}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0EB; border-radius: 8px; overflow: hidden;">
          <div style="background: #A78BFA; padding: 24px 32px;">
            <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.75);">The Ops Brief</p>
            <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 700; color: #FFFFFF;">New Subscriber</h1>
          </div>
          <div style="padding: 32px;">
            <p style="font-size: 15px; color: #C8C0B8; line-height: 1.6; margin: 0 0 20px;">Someone just subscribed to The Ops Brief.</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480; width: 140px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 15px;"><a href="mailto:${email}" style="color: #A78BFA; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Total Subscribers</td>
                <td style="padding: 10px 0; font-size: 15px; color: #F5F0EB; font-weight: 700;">${totalCount}</td>
              </tr>
            </table>
            <p style="font-size: 13px; color: #8A8480; margin: 0;">A welcome email has been sent to the subscriber automatically.</p>
          </div>
        </div>
      `,
      text: `New Ops Brief Subscriber\n\nEmail: ${email}\nTotal subscribers: ${totalCount}\n\nA welcome email was sent automatically.`,
    });
    if (error) {
      console.warn('[Email] Resend error on owner notification:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Email] Failed to send newsletter owner notification:', err);
    return false;
  }
}

export type ContactFormEmailPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

/**
 * Send a contact form submission notification to the business owner.
 * Returns true on success, false on any failure.
 */
export async function sendContactFormEmail(
  payload: ContactFormEmailPayload
): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const { name, email, phone, message } = payload;

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission — ${name}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0EB; border-radius: 8px; overflow: hidden;">
          <div style="background: #A78BFA; padding: 24px 32px;">
            <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.75);">Ops by Noell</p>
            <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 700; color: #FFFFFF;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480; width: 100px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 15px; color: #F5F0EB;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 15px;"><a href="mailto:${email}" style="color: #A78BFA; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 15px;"><a href="tel:${phone}" style="color: #A78BFA; text-decoration: none;">${phone}</a></td>
              </tr>
            </table>
            <div style="margin-bottom: 28px;">
              <p style="margin: 0 0 10px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Message</p>
              <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 6px; padding: 18px 20px; font-size: 15px; color: #C8C0B8; line-height: 1.7; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </div>
            <a href="mailto:${email}?subject=Re: Your inquiry to Ops by Noell" style="display: inline-block; background: #A78BFA; color: #FFFFFF; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Reply to ${name}</a>
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid #2A2A2A; font-size: 12px; color: #8A8480;">
            Submitted via the contact form at opsbynoell.com
          </div>
        </div>
      `,
      text: [
        `New Contact Form Submission — Ops by Noell`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        ``,
        `Message:`,
        message,
        ``,
        `Reply directly to ${email} to follow up.`,
      ].join("\n"),
    });

    if (error) {
      console.warn("[Email] Resend returned an error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.warn("[Email] Failed to send contact form email:", err);
    return false;
  }
}
