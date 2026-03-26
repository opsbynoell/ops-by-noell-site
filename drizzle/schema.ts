import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Chat Leads ─────────────────────────────────────────────────────────────
// Captures every lead that engages with the chat widget before booking
export const chatLeads = mysqlTable("chatLeads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  businessType: varchar("businessType", { length: 256 }).notNull(),
  question: text("question"),          // the initial question they asked
  page: varchar("page", { length: 256 }), // which page they were on
  notified: mysqlEnum("notified", ["yes", "no"]).default("no").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatLead = typeof chatLeads.$inferSelect;
export type InsertChatLead = typeof chatLeads.$inferInsert;

// ─── Telegram Bot Sessions ───────────────────────────────────────────────────
// Stores conversation state for the Telegram bot lead qualification flow.
// One row per Telegram user — upserted on each interaction.
export const botSessions = mysqlTable("botSessions", {
  id: int("id").autoincrement().primaryKey(),
  /** Telegram user ID (numeric, stored as string for safety with large IDs) */
  telegramUserId: varchar("telegramUserId", { length: 32 }).notNull().unique(),
  telegramUsername: varchar("telegramUsername", { length: 128 }),
  telegramFirstName: varchar("telegramFirstName", { length: 128 }),
  /**
   * Current step in the flow:
   *   start          → just started, sent greeting
   *   awaiting_interest → waiting for Agency / Freelance / Other button
   *   awaiting_contact_method → waiting for Phone / Email button
   *   awaiting_phone  → waiting for them to type their phone number
   *   awaiting_email  → waiting for them to type their email address
   *   complete        → flow finished, lead captured
   */
  step: mysqlEnum("step", [
    "start",
    "awaiting_name",
    "awaiting_interest",
    "awaiting_contact_method",
    "awaiting_phone",
    "awaiting_email",
    "complete",
  ]).default("start").notNull(),
  /** Name the user provided when asked */
  leadName: varchar("leadName", { length: 128 }),
  /** What they selected for interest (Agency Services / Freelance Work / Other) */
  interest: varchar("interest", { length: 64 }),
  /** Contact method they chose (phone / email) */
  contactMethod: varchar("contactMethod", { length: 16 }),
  /** Their phone number or email address */
  contactValue: varchar("contactValue", { length: 320 }),
  /** Source that triggered the flow (e.g. "website", "direct") */
  source: varchar("source", { length: 64 }).default("direct"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BotSession = typeof botSessions.$inferSelect;
export type InsertBotSession = typeof botSessions.$inferInsert;

// ─── Website Chat Sessions ───────────────────────────────────────────────────
// One row per visitor chat session on the website widget.
export const chatSessions = mysqlTable("chatSessions", {
  id: int("id").autoincrement().primaryKey(),
  /** Random UUID assigned to the visitor's browser session */
  sessionId: varchar("sessionId", { length: 64 }).notNull().unique(),
  visitorName: varchar("visitorName", { length: 128 }),
  visitorEmail: varchar("visitorEmail", { length: 320 }),
  businessType: varchar("businessType", { length: 256 }),
  /** Visitor IP address captured on first message */
  visitorIp: varchar("visitorIp", { length: 64 }),
  /** Approximate location from IP (e.g. "Los Angeles, CA, US") */
  visitorLocation: varchar("visitorLocation", { length: 256 }),
  /** Whether a human has taken over this conversation */
  humanTakeover: int("humanTakeover").default(0).notNull(), // 0 = bot, 1 = human
  /** Number of unread messages from visitor (for admin badge) */
  unreadCount: int("unreadCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = typeof chatSessions.$inferInsert;

// ─── Website Chat Messages ───────────────────────────────────────────────────
// Every message exchanged in the website chat widget.
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  /** 'visitor' = sent by website user, 'bot' = Nova auto-response, 'human' = admin reply */
  role: mysqlEnum("role", ["visitor", "bot", "human"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// ─── Newsletter Subscribers ──────────────────────────────────────────────────
// Captures every email that subscribes via The Ops Brief newsletter form.
export const newsletterSubscribers = mysqlTable("newsletterSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  /** Optional first name if captured */
  name: varchar("name", { length: 128 }),
  /** Source page (e.g. "/newsletter", "/") */
  source: varchar("source", { length: 256 }).default("/newsletter"),
  /** Whether the welcome email was sent successfully */
  welcomed: int("welcomed").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
