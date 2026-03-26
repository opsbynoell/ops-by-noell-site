import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { chatRouter } from "./routers/chat";
import { insertChatLead, getBotFunnelStats, getBotDailyStats, getBotInterestStats, getBotContactMethodStats, getBotSourceStats, getRecentBotLeads, upsertChatSession, getChatSession, getAllChatSessions, insertChatMessage, getSessionMessages, markSessionRead, setHumanTakeover, insertNewsletterSubscriber, getNewsletterSubscriberCount, markNewsletterWelcomed } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendContactFormEmail, sendNewsletterWelcomeEmail, sendNewsletterOwnerNotification } from "./email";
import { sendTelegram, formatTelegramMessage } from "./telegram";
import { createGHLContact } from "./ghl";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  chat: chatRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Chat Leads ───────────────────────────────────────────────────────────
  leads: router({
    /**
     * Called by ChatWidget after the 3-step lead capture (name → email → biz type).
     * Persists the lead to the database and fires email + Telegram owner notifications.
     */
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(128),
          email: z.string().email().max(320),
          businessType: z.string().min(1).max(256),
          phone: z.string().max(32).optional(),
          question: z.string().max(2000).optional(),
          page: z.string().max(256).optional(),
        })
      )
      .mutation(async ({ input }) => {
        // 1. Persist to database
        const leadId = await insertChatLead({
          name: input.name,
          email: input.email,
          businessType: input.businessType,
          question: input.question ?? null,
          page: input.page ?? null,
          notified: "no",
        });

        const emailContent = [
          `A new lead engaged with the chat widget on the Ops by Noell website.`,
          ``,
          `Name: ${input.name}`,
          `Email: ${input.email}`,
          `Phone: ${input.phone ?? "(not provided)"}`,
          `Business Type: ${input.businessType}`,
          `Question Asked: ${input.question ?? "(none recorded)"}`,
          `Page: ${input.page ?? "unknown"}`,
          ``,
          `Lead ID: ${leadId ?? "pending"}`,
          ``,
          `Reply directly to ${input.email} to follow up.`,
        ].join("\n");

        // 2. Email notification
        const notifySuccess = await notifyOwner({
          title: `New Chat Lead: ${input.name}`,
          content: emailContent,
        });

        // 3. Telegram notification
        await sendTelegram(
          formatTelegramMessage("New Chat Lead", {
            Name: input.name,
            Email: input.email,
            "Business Type": input.businessType,
            "Question": input.question ?? "(none)",
            "Page": input.page ?? "unknown",
          })
        );

        return {
          success: true,
          leadId,
          notified: notifySuccess,
        };
      }),
  }),

  // ─── Notifications ────────────────────────────────────────────────────────
  notifications: router({
    /**
     * Fired when a visitor lands on the /book page.
     */
    bookingPageVisit: publicProcedure
      .input(
        z.object({
          referrer: z.string().max(512).optional(),
          userAgent: z.string().max(512).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const emailContent = [
          `A visitor just landed on the Book a Free Audit page.`,
          ``,
          `Referrer: ${input.referrer ?? "(direct / unknown)"}`,
          ``,
          `They may be considering booking — keep an eye out for a follow-up chat or booking.`,
        ].join("\n");

        await Promise.allSettled([
          notifyOwner({
            title: "👀 Someone is on the Book page",
            content: emailContent,
          }),
          sendTelegram(
            formatTelegramMessage("Book Page Visit", {
              Referrer: input.referrer ?? "(direct)",
            })
          ),
        ]);

        return { success: true };
      }),

    /**
     * Fired when a visitor clicks the booking CTA.
     */
    bookingIntent: publicProcedure
      .input(
        z.object({
          source: z.string().max(256).optional(),
          page: z.string().max(256).optional(),
        })
      )
      .mutation(async ({ input }) => {
        const emailContent = [
          `A visitor clicked a booking CTA on the Ops by Noell website.`,
          ``,
          `Source: ${input.source ?? "unknown"}`,
          `Page: ${input.page ?? "unknown"}`,
          ``,
          `This is a high-intent signal — they are ready to book.`,
        ].join("\n");

        await Promise.allSettled([
          notifyOwner({
            title: "🔥 High-Intent: Booking CTA Clicked",
            content: emailContent,
          }),
          sendTelegram(
            formatTelegramMessage("Booking CTA Clicked 🔥", {
              Source: input.source ?? "unknown",
              Page: input.page ?? "unknown",
            })
          ),
        ]);

        return { success: true };
      }),
  }),

  // ─── Contact Form ──────────────────────────────────────────────────────────
  contact: router({
    /**
     * Called when a visitor submits the contact form on the Book page.
     * Fires owner notification and Telegram alert.
     */
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(128),
          email: z.string().email().max(320),
          phone: z.string().min(7).max(30),
          message: z.string().min(10).max(4000),
        })
      )
      .mutation(async ({ input }) => {
        const emailContent = [
          `A visitor submitted the contact form on the Ops by Noell website.`,
          ``,
          `Name: ${input.name}`,
          `Email: ${input.email}`,
          `Phone: ${input.phone}`,
          ``,
          `Message:`,
          input.message,
          ``,
          `Reply directly to ${input.email} to follow up.`,
        ].join("\n");

        await Promise.allSettled([
          // Direct email to noell@opsbynoell.com via Resend
          sendContactFormEmail({
            name: input.name,
            email: input.email,
            phone: input.phone,
            message: input.message,
          }),
          // Manus platform notification (backup)
          notifyOwner({
            title: `📬 New Contact Form: ${input.name}`,
            content: emailContent,
          }),
          // Telegram alert (backup)
          sendTelegram(
            formatTelegramMessage("New Contact Form 📬", {
              Name: input.name,
              Email: input.email,
              Phone: input.phone,
              Message: input.message.slice(0, 300) + (input.message.length > 300 ? "..." : ""),
            })
          ),
          // GHL contact creation
          createGHLContact({
            name: input.name,
            email: input.email,
            phone: input.phone,
            source: "Website Contact Form",
          }),
        ]);

        return { success: true };
      }),
  }),

  // ─── Newsletter ───────────────────────────────────────────────────────────────────
  newsletter: router({
    /**
     * Subscribe an email to The Ops Brief newsletter.
     * Stores the subscriber, sends a welcome email, and notifies the owner.
     */
    subscribe: publicProcedure
      .input(
        z.object({
          email: z.string().email().max(320),
          source: z.string().max(256).optional(),
        })
      )
      .mutation(async ({ input }) => {
        // 1. Insert subscriber (unique constraint handles duplicates gracefully)
        const { id: subscriberId, isDuplicate } = await insertNewsletterSubscriber({
          email: input.email,
          source: input.source ?? '/newsletter',
        });

        if (isDuplicate) {
          return { success: true, alreadySubscribed: true };
        }

        // 2. Get total count for owner notification
        const totalCount = await getNewsletterSubscriberCount();

        // 3. Fire welcome email + owner notification in parallel
        const [welcomed] = await Promise.allSettled([
          sendNewsletterWelcomeEmail(input.email),
          sendNewsletterOwnerNotification(input.email, totalCount),
        ]);

        // 4. Mark welcomed in DB
        const welcomedSuccess = welcomed.status === 'fulfilled' && welcomed.value === true;
        if (welcomedSuccess && subscriberId) {
          await markNewsletterWelcomed(subscriberId);
        }

        return { success: true, alreadySubscribed: false };
      }),
  }),

  // ─── Bot Analytics ───────────────────────────────────────────────────────────────────
  // All analytics procedures are protected — only the logged-in owner can access them.
  analytics: router({
    /** Conversion funnel: how many sessions are at each step. */
    funnel: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getBotFunnelStats();
    }),

    /** Daily session starts for the last 30 days. */
    daily: protectedProcedure
      .input(z.object({ days: z.number().min(7).max(90).default(30) }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
        }
        return getBotDailyStats(input.days);
      }),

    /** Interest breakdown for completed leads. */
    interests: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getBotInterestStats();
    }),

    /** Contact method split for completed leads. */
    contactMethods: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getBotContactMethodStats();
    }),

    /** Source breakdown — website vs direct. */
    sources: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getBotSourceStats();
    }),

    /** Recent completed leads with full session details. */
    recentLeads: protectedProcedure
      .input(z.object({ limit: z.number().min(1).max(200).default(50) }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
        }
        return getRecentBotLeads(input.limit);
      }),
  }),
});

export type AppRouter = typeof appRouter;
