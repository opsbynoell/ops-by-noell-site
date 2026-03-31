import { eq, sql, gte, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { InsertUser, users, chatLeads, InsertChatLead, botSessions, BotSession, chatSessions, chatMessages, ChatSession, ChatMessage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      });
      _db = drizzle(pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Chat Leads ─────────────────────────────────────────────────────────────
export async function insertChatLead(lead: InsertChatLead): Promise<number | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert chat lead: database not available");
    return null;
  }
  const result = await db.insert(chatLeads).values(lead).returning({ id: chatLeads.id });
  return result[0]?.id ?? null;
}

export async function getAllChatLeads() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatLeads).orderBy(chatLeads.createdAt);
}

// ─── Telegram Bot Sessions ───────────────────────────────────────────────────

export async function getBotSession(telegramUserId: string): Promise<BotSession | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(botSessions)
    .where(eq(botSessions.telegramUserId, telegramUserId))
    .limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function upsertBotSession(
  telegramUserId: string,
  data: Partial<Omit<BotSession, "id" | "telegramUserId" | "createdAt" | "updatedAt">> & {
    telegramUsername?: string | null;
    telegramFirstName?: string | null;
    leadName?: string | null;
  }
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert bot session: database not available");
    return;
  }
  await db
    .insert(botSessions)
    .values({ telegramUserId, ...data })
    .onConflictDoUpdate({
      target: botSessions.telegramUserId,
      set: { ...data, updatedAt: new Date() },
    });
}

// ─── Bot Analytics ───────────────────────────────────────────────────────────

export async function getBotFunnelStats(): Promise<{ step: string; count: number }[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({
      step: botSessions.step,
      count: sql<number>`COUNT(*)`,
    })
    .from(botSessions)
    .groupBy(botSessions.step);
  return rows.map(r => ({ step: r.step, count: Number(r.count) }));
}

export async function getBotDailyStats(days = 30): Promise<{ date: string; count: number }[]> {
  const db = await getDb();
  if (!db) return [];
  const since = new Date();
  since.setDate(since.getDate() - days);

  const rows = await db
    .select({
      date: sql<string>`DATE(${botSessions.createdAt})`,
      count: sql<number>`COUNT(*)`,
    })
    .from(botSessions)
    .where(gte(botSessions.createdAt, since))
    .groupBy(sql`DATE(${botSessions.createdAt})`);

  return rows.map(r => ({ date: r.date, count: Number(r.count) }));
}

export async function getBotInterestStats(): Promise<{ interest: string; count: number }[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({
      interest: botSessions.interest,
      count: sql<number>`COUNT(*)`,
    })
    .from(botSessions)
    .where(eq(botSessions.step, "complete"))
    .groupBy(botSessions.interest);
  return rows.map(r => ({ interest: r.interest ?? "Unknown", count: Number(r.count) }));
}

export async function getBotContactMethodStats(): Promise<{ method: string; count: number }[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({
      method: botSessions.contactMethod,
      count: sql<number>`COUNT(*)`,
    })
    .from(botSessions)
    .where(eq(botSessions.step, "complete"))
    .groupBy(botSessions.contactMethod);
  return rows.map(r => ({ method: r.method ?? "Unknown", count: Number(r.count) }));
}

export async function getBotSourceStats(): Promise<{ source: string; count: number }[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db
    .select({
      source: botSessions.source,
      count: sql<number>`COUNT(*)`,
    })
    .from(botSessions)
    .groupBy(botSessions.source);
  return rows.map(r => ({ source: r.source ?? "direct", count: Number(r.count) }));
}

export async function getRecentBotLeads(limit = 50): Promise<BotSession[]> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(botSessions)
    .where(eq(botSessions.step, "complete"))
    .orderBy(desc(botSessions.updatedAt))
    .limit(limit);
}

// ─── Website Chat Sessions + Messages ───────────────────────────────────────────────────

export async function upsertChatSession(
  sessionId: string,
  data: { visitorName?: string; visitorEmail?: string; businessType?: string; visitorIp?: string; visitorLocation?: string }
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .insert(chatSessions)
    .values({ sessionId, ...data })
    .onConflictDoUpdate({
      target: chatSessions.sessionId,
      set: { ...data, updatedAt: new Date() },
    });
}

export async function getChatSession(sessionId: string): Promise<ChatSession | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId)).limit(1);
  return result[0] ?? null;
}

export async function getAllChatSessions(limit = 100): Promise<ChatSession[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatSessions).orderBy(desc(chatSessions.updatedAt)).limit(limit);
}

export async function insertChatMessage(
  sessionId: string,
  role: 'visitor' | 'bot' | 'human',
  content: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(chatMessages).values({ sessionId, role, content });
  if (role === 'visitor') {
    await db
      .update(chatSessions)
      .set({ unreadCount: sql`${chatSessions.unreadCount} + 1`, updatedAt: new Date() })
      .where(eq(chatSessions.sessionId, sessionId));
  }
}

export async function getSessionMessages(sessionId: string): Promise<ChatMessage[]> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.sessionId, sessionId))
    .orderBy(chatMessages.createdAt);
}

export async function markSessionRead(sessionId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(chatSessions).set({ unreadCount: 0 }).where(eq(chatSessions.sessionId, sessionId));
}

export async function setHumanTakeover(sessionId: string, active: boolean): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(chatSessions).set({ humanTakeover: active ? 1 : 0 }).where(eq(chatSessions.sessionId, sessionId));
}

// ─── Newsletter Subscribers ──────────────────────────────────────────────────
import { newsletterSubscribers, InsertNewsletterSubscriber } from "../drizzle/schema";

export async function insertNewsletterSubscriber(
  data: Pick<InsertNewsletterSubscriber, 'email' | 'source'>
): Promise<{ id: number | null; isDuplicate: boolean }> {
  const db = await getDb();
  if (!db) return { id: null, isDuplicate: false };
  try {
    const result = await db.insert(newsletterSubscribers).values({
      email: data.email,
      source: data.source ?? '/newsletter',
      welcomed: 0,
    }).returning({ id: newsletterSubscribers.id });
    return { id: result[0]?.id ?? null, isDuplicate: false };
  } catch (err: any) {
    if (err?.code === '23505') {
      return { id: null, isDuplicate: true };
    }
    throw err;
  }
}

export async function getNewsletterSubscriberCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql`COUNT(*)` }).from(newsletterSubscribers);
  return Number((result[0] as any)?.count ?? 0);
}

export async function markNewsletterWelcomed(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(newsletterSubscribers).set({ welcomed: 1 }).where(eq(newsletterSubscribers.id, id));
}
