// api/path.ts
import express from "express";
import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? "",
  adminPassword: process.env.ADMIN_PASSWORD ?? ""
};

// server/db.ts
import { eq, sql, gte, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// drizzle/schema.ts
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
var roleEnum = pgEnum("role", ["user", "admin"]);
var notifiedEnum = pgEnum("notified", ["yes", "no"]);
var stepEnum = pgEnum("step", [
  "start",
  "awaiting_name",
  "awaiting_interest",
  "awaiting_contact_method",
  "awaiting_phone",
  "awaiting_email",
  "complete"
]);
var messageRoleEnum = pgEnum("message_role", ["visitor", "bot", "human"]);
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});
var chatLeads = pgTable("chatLeads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  businessType: varchar("businessType", { length: 256 }).notNull(),
  question: text("question"),
  page: varchar("page", { length: 256 }),
  notified: notifiedEnum("notified").default("no").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var botSessions = pgTable("botSessions", {
  id: serial("id").primaryKey(),
  telegramUserId: varchar("telegramUserId", { length: 32 }).notNull().unique(),
  telegramUsername: varchar("telegramUsername", { length: 128 }),
  telegramFirstName: varchar("telegramFirstName", { length: 128 }),
  step: stepEnum("step").default("start").notNull(),
  leadName: varchar("leadName", { length: 128 }),
  interest: varchar("interest", { length: 64 }),
  contactMethod: varchar("contactMethod", { length: 16 }),
  contactValue: varchar("contactValue", { length: 320 }),
  source: varchar("source", { length: 64 }).default("direct"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull()
});
var chatSessions = pgTable("chatSessions", {
  id: serial("id").primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull().unique(),
  visitorName: varchar("visitorName", { length: 128 }),
  visitorEmail: varchar("visitorEmail", { length: 320 }),
  businessType: varchar("businessType", { length: 256 }),
  visitorIp: varchar("visitorIp", { length: 64 }),
  visitorLocation: varchar("visitorLocation", { length: 256 }),
  humanTakeover: integer("humanTakeover").default(0).notNull(),
  unreadCount: integer("unreadCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull()
});
var chatMessages = pgTable("chatMessages", {
  id: serial("id").primaryKey(),
  sessionId: varchar("sessionId", { length: 64 }).notNull(),
  role: messageRoleEnum("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
var newsletterSubscribers = pgTable("newsletterSubscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 128 }),
  source: varchar("source", { length: 256 }).default("/newsletter"),
  welcomed: integer("welcomed").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      });
      _db = drizzle(pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function insertChatLead(lead) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert chat lead: database not available");
    return null;
  }
  const result = await db.insert(chatLeads).values(lead).returning({ id: chatLeads.id });
  return result[0]?.id ?? null;
}
async function getBotSession(telegramUserId) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(botSessions).where(eq(botSessions.telegramUserId, telegramUserId)).limit(1);
  return result.length > 0 ? result[0] : null;
}
async function upsertBotSession(telegramUserId, data) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert bot session: database not available");
    return;
  }
  await db.insert(botSessions).values({ telegramUserId, ...data }).onConflictDoUpdate({
    target: botSessions.telegramUserId,
    set: { ...data, updatedAt: /* @__PURE__ */ new Date() }
  });
}
async function getBotFunnelStats() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({
    step: botSessions.step,
    count: sql`COUNT(*)`
  }).from(botSessions).groupBy(botSessions.step);
  return rows.map((r) => ({ step: r.step, count: Number(r.count) }));
}
async function getBotDailyStats(days = 30) {
  const db = await getDb();
  if (!db) return [];
  const since = /* @__PURE__ */ new Date();
  since.setDate(since.getDate() - days);
  const rows = await db.select({
    date: sql`DATE(${botSessions.createdAt})`,
    count: sql`COUNT(*)`
  }).from(botSessions).where(gte(botSessions.createdAt, since)).groupBy(sql`DATE(${botSessions.createdAt})`);
  return rows.map((r) => ({ date: r.date, count: Number(r.count) }));
}
async function getBotInterestStats() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({
    interest: botSessions.interest,
    count: sql`COUNT(*)`
  }).from(botSessions).where(eq(botSessions.step, "complete")).groupBy(botSessions.interest);
  return rows.map((r) => ({ interest: r.interest ?? "Unknown", count: Number(r.count) }));
}
async function getBotContactMethodStats() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({
    method: botSessions.contactMethod,
    count: sql`COUNT(*)`
  }).from(botSessions).where(eq(botSessions.step, "complete")).groupBy(botSessions.contactMethod);
  return rows.map((r) => ({ method: r.method ?? "Unknown", count: Number(r.count) }));
}
async function getBotSourceStats() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({
    source: botSessions.source,
    count: sql`COUNT(*)`
  }).from(botSessions).groupBy(botSessions.source);
  return rows.map((r) => ({ source: r.source ?? "direct", count: Number(r.count) }));
}
async function getRecentBotLeads(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(botSessions).where(eq(botSessions.step, "complete")).orderBy(desc(botSessions.updatedAt)).limit(limit);
}
async function upsertChatSession(sessionId, data) {
  const db = await getDb();
  if (!db) return;
  await db.insert(chatSessions).values({ sessionId, ...data }).onConflictDoUpdate({
    target: chatSessions.sessionId,
    set: { ...data, updatedAt: /* @__PURE__ */ new Date() }
  });
}
async function getChatSession(sessionId) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId)).limit(1);
  return result[0] ?? null;
}
async function getAllChatSessions(limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatSessions).orderBy(desc(chatSessions.updatedAt)).limit(limit);
}
async function insertChatMessage(sessionId, role, content) {
  const db = await getDb();
  if (!db) return;
  await db.insert(chatMessages).values({ sessionId, role, content });
  if (role === "visitor") {
    await db.update(chatSessions).set({ unreadCount: sql`${chatSessions.unreadCount} + 1`, updatedAt: /* @__PURE__ */ new Date() }).where(eq(chatSessions.sessionId, sessionId));
  }
}
async function getSessionMessages(sessionId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatMessages).where(eq(chatMessages.sessionId, sessionId)).orderBy(chatMessages.createdAt);
}
async function markSessionRead(sessionId) {
  const db = await getDb();
  if (!db) return;
  await db.update(chatSessions).set({ unreadCount: 0 }).where(eq(chatSessions.sessionId, sessionId));
}
async function setHumanTakeover(sessionId, active) {
  const db = await getDb();
  if (!db) return;
  await db.update(chatSessions).set({ humanTakeover: active ? 1 : 0 }).where(eq(chatSessions.sessionId, sessionId));
}
async function insertNewsletterSubscriber(data) {
  const db = await getDb();
  if (!db) return { id: null, isDuplicate: false };
  try {
    const result = await db.insert(newsletterSubscribers).values({
      email: data.email,
      source: data.source ?? "/newsletter",
      welcomed: 0
    }).returning({ id: newsletterSubscribers.id });
    return { id: result[0]?.id ?? null, isDuplicate: false };
  } catch (err) {
    if (err?.code === "23505") {
      return { id: null, isDuplicate: true };
    }
    throw err;
  }
}
async function getNewsletterSubscriberCount() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql`COUNT(*)` }).from(newsletterSubscribers);
  return Number(result[0]?.count ?? 0);
}
async function markNewsletterWelcomed(id) {
  const db = await getDb();
  if (!db) return;
  await db.update(newsletterSubscribers).set({ welcomed: 1 }).where(eq(newsletterSubscribers.id, id));
}

// server/_core/cookies.ts
function getSessionCookieOptions(req) {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    path: "/",
    sameSite: isProduction ? "lax" : "lax",
    secure: isProduction
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId)) {
        console.warn("[Auth] Session payload missing openId");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app2) {
  app2.post("/api/admin/login", async (req, res) => {
    const { password } = req.body;
    const adminPassword = ENV.adminPassword;
    if (!adminPassword) {
      res.status(500).json({ error: "ADMIN_PASSWORD not configured" });
      return;
    }
    if (!password || password !== adminPassword) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }
    const adminOpenId = "admin-opsbynoell";
    await upsertUser({
      openId: adminOpenId,
      name: "Nikki Noell",
      email: "hello@opsbynoell.com",
      loginMethod: "password",
      lastSignedIn: /* @__PURE__ */ new Date(),
      role: "admin"
    });
    const sessionToken = await sdk.createSessionToken(adminOpenId, {
      name: "Nikki Noell",
      expiresInMs: ONE_YEAR_MS
    });
    const maxAgeSeconds = Math.floor(ONE_YEAR_MS / 1e3);
    const isProduction = process.env.NODE_ENV === "production";
    const cookieValue = [
      `${COOKIE_NAME}=${sessionToken}`,
      `Max-Age=${maxAgeSeconds}`,
      `Path=/`,
      `HttpOnly`,
      `SameSite=Lax`,
      isProduction ? `Secure` : ""
    ].filter(Boolean).join("; ");
    res.setHeader("Cache-Control", "private, no-store");
    res.setHeader("Set-Cookie", cookieValue);
    res.json({ success: true });
  });
  app2.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/telegram.ts
var TELEGRAM_API = "https://api.telegram.org";
async function sendTelegram(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set \u2014 skipping.");
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
        parse_mode: "HTML"
      })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(`[Telegram] Failed to send message (${response.status}): ${detail}`);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Telegram] Network error:", error);
    return false;
  }
}
function formatTelegramMessage(event, fields) {
  const lines = [
    `<b>\u{1F514} Ops by Noell \u2014 ${event}</b>`,
    ""
  ];
  for (const [key, value] of Object.entries(fields)) {
    if (value) {
      lines.push(`<b>${key}:</b> ${value}`);
    }
  }
  lines.push("", `<i>${(/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT</i>`);
  return lines.join("\n");
}

// server/telegramBot.ts
var CALENDLY_URL = "https://calendly.com/opsbynoell/30-minute-meeting-clone?hide_event_type_details=1&hide_gdpr_banner=1";
var TELEGRAM_API2 = "https://api.telegram.org";
function getToken() {
  return process.env.TELEGRAM_BOT_TOKEN ?? "";
}
function getOwnerChatId() {
  return process.env.TELEGRAM_CHAT_ID ?? "";
}
async function sendMessage(chatId, text2, extra = {}) {
  const token = getToken();
  if (!token) return;
  try {
    await fetch(`${TELEGRAM_API2}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text2, parse_mode: "HTML", ...extra })
    });
  } catch (err) {
    console.error("[TelegramBot] sendMessage error:", err);
  }
}
async function sendOwnerNotification(text2) {
  const ownerChatId = getOwnerChatId();
  if (!ownerChatId) return;
  await sendMessage(ownerChatId, text2);
}
function inlineKeyboard(buttons) {
  return { reply_markup: { inline_keyboard: buttons } };
}
async function sendNamePrompt(chatId) {
  await sendMessage(chatId, "Hi! \u{1F44B} Welcome to Ops by Noell.\n\nFirst, what's your name?");
}
async function sendGreeting(chatId, name) {
  await sendMessage(
    chatId,
    `Nice to meet you, ${name}! \u{1F60A}

What brings you here today?`,
    inlineKeyboard([
      [
        { text: "Agency Services", callback_data: "interest:agency" },
        { text: "Freelance Work", callback_data: "interest:freelance" }
      ],
      [{ text: "Other", callback_data: "interest:other" }]
    ])
  );
}
async function sendContactMethodQuestion(chatId) {
  await sendMessage(
    chatId,
    "What's the best way to reach you \u2014 phone or email?",
    inlineKeyboard([
      [
        { text: "\u{1F4DE} Phone", callback_data: "contact:phone" },
        { text: "\u2709\uFE0F Email", callback_data: "contact:email" }
      ]
    ])
  );
}
async function sendPhonePrompt(chatId) {
  await sendMessage(chatId, "What's your phone number?");
}
async function sendEmailPrompt(chatId) {
  await sendMessage(chatId, "What's your email address?");
}
async function sendConfirmation(chatId, name) {
  await sendMessage(
    chatId,
    `Got it, ${name}! I'll be in touch within 2 hours. \u2705

In the meantime, here's my calendar if you'd like to book a call:`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "\u{1F4C5} Book a Call", url: CALENDLY_URL }]
        ]
      }
    }
  );
}
function registerTelegramWebhook(app2) {
  app2.post("/api/telegram/webhook", async (req, res) => {
    res.sendStatus(200);
    try {
      const update = req.body;
      if (update.callback_query) {
        const query = update.callback_query;
        const chatId = query.message?.chat?.id;
        const userId = String(query.from?.id);
        const data = query.data ?? "";
        const firstName = query.from?.first_name ?? "";
        const username = query.from?.username ?? null;
        if (!chatId || !userId) return;
        await fetch(`${TELEGRAM_API2}/bot${getToken()}/answerCallbackQuery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ callback_query_id: query.id })
        });
        const session = await getBotSession(userId);
        if (data.startsWith("interest:")) {
          const interest = data.replace("interest:", "");
          const interestLabel = interest === "agency" ? "Agency Services" : interest === "freelance" ? "Freelance Work" : "Other";
          await upsertBotSession(userId, {
            telegramFirstName: firstName,
            telegramUsername: username,
            step: "awaiting_contact_method",
            interest: interestLabel,
            source: session?.source ?? "direct"
          });
          await sendContactMethodQuestion(chatId);
          return;
        }
        if (data.startsWith("contact:")) {
          const method = data.replace("contact:", "");
          await upsertBotSession(userId, {
            step: method === "phone" ? "awaiting_phone" : "awaiting_email",
            contactMethod: method
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
      if (update.message) {
        const msg = update.message;
        const chatId = msg.chat?.id;
        const userId = String(msg.from?.id);
        const text2 = msg.text ?? "";
        const firstName = msg.from?.first_name ?? "";
        const username = msg.from?.username ?? null;
        if (!chatId || !userId) return;
        if (text2.startsWith("/start")) {
          const source = text2.includes("website") ? "website" : "direct";
          await upsertBotSession(userId, {
            telegramFirstName: firstName,
            telegramUsername: username,
            step: "awaiting_name",
            leadName: void 0,
            interest: void 0,
            contactMethod: void 0,
            contactValue: void 0,
            source
          });
          await sendNamePrompt(chatId);
          return;
        }
        const session = await getBotSession(userId);
        if (!session) {
          await upsertBotSession(userId, {
            telegramFirstName: firstName,
            telegramUsername: username,
            step: "awaiting_name",
            source: "direct"
          });
          await sendNamePrompt(chatId);
          return;
        }
        if (session.step === "awaiting_name") {
          const name = text2.trim();
          if (!name || name.length < 1) {
            await sendMessage(chatId, "Please enter your name so I know who I'm speaking with.");
            return;
          }
          await upsertBotSession(userId, {
            step: "awaiting_interest",
            leadName: name
          });
          await sendGreeting(chatId, name);
          return;
        }
        if (session.step === "awaiting_phone") {
          const phone = text2.trim();
          await upsertBotSession(userId, {
            step: "complete",
            contactValue: phone
          });
          const displayName = session.leadName ?? session.telegramFirstName ?? session.telegramUsername ?? "there";
          await sendConfirmation(chatId, displayName);
          await sendOwnerNotification(
            formatTelegramMessage("\u{1F3AF} New Telegram Lead", {
              Name: session.leadName ?? session.telegramFirstName ?? session.telegramUsername ?? "Unknown",
              Interest: session.interest ?? "Not specified",
              "Contact Method": "Phone",
              Phone: phone,
              Source: session.source ?? "direct"
            })
          );
          return;
        }
        if (session.step === "awaiting_email") {
          const email = text2.trim();
          await upsertBotSession(userId, {
            step: "complete",
            contactValue: email
          });
          const displayName = session.leadName ?? session.telegramFirstName ?? session.telegramUsername ?? "there";
          await sendConfirmation(chatId, displayName);
          await sendOwnerNotification(
            formatTelegramMessage("\u{1F3AF} New Telegram Lead", {
              Name: session.leadName ?? session.telegramFirstName ?? session.telegramUsername ?? "Unknown",
              Interest: session.interest ?? "Not specified",
              "Contact Method": "Email",
              Email: email,
              Source: session.source ?? "direct"
            })
          );
          return;
        }
        if (session.step === "complete") {
          await sendMessage(
            chatId,
            "Thanks again! If you'd like to start a new conversation, just type /start."
          );
          return;
        }
        await upsertBotSession(userId, {
          telegramFirstName: firstName,
          telegramUsername: username,
          step: "awaiting_name",
          source: "direct"
        });
        await sendNamePrompt(chatId);
      }
    } catch (err) {
      console.error("[TelegramBot] Webhook processing error:", err);
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Notification title is required." });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Notification content is required." });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({ code: "BAD_REQUEST", message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.` });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({ code: "BAD_REQUEST", message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.` });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  return sendTelegram(`<b>${title}</b>

${content}`);
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/email.ts
import { Resend } from "resend";
var OWNER_EMAIL = "noell@opsbynoell.com";
var FROM_ADDRESS = "Ops by Noell <noreply@opsbynoell.com>";
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[Email] RESEND_API_KEY is not set \u2014 email delivery skipped.");
    return null;
  }
  return new Resend(key);
}
async function sendHumanTakeoverEmail(payload) {
  const resend = getResend();
  if (!resend) return false;
  const { visitorName, visitorEmail, businessType, lastMessage, sessionId, chatHistory } = payload;
  const displayName = visitorName ?? "Anonymous Visitor";
  const inboxUrl = "https://www.opsbynoell.com/admin/inbox";
  const buildChatHistoryHtml = (messages) => {
    if (!messages || messages.length === 0) return "";
    const rows = messages.map((msg) => {
      const isVisitor = msg.role === "visitor";
      const isHuman = msg.role === "human";
      const label = isVisitor ? visitorName ?? "Visitor" : isHuman ? "You (Human)" : "Nova";
      const bgColor = isVisitor ? "#1E1A16" : isHuman ? "#1A1E2A" : "#141414";
      const borderColor = isVisitor ? "#D4A843" : isHuman ? "#6B8FD4" : "#3A3A3A";
      const labelColor = isVisitor ? "#D4A843" : isHuman ? "#6B8FD4" : "#8A8480";
      const time = new Date(msg.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      return `<div style="margin-bottom: 10px; padding: 12px 16px; background: ${bgColor}; border-left: 3px solid ${borderColor}; border-radius: 4px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: ${labelColor};">${label}</span>
          <span style="font-size: 11px; color: #5A5450;">${time}</span>
        </div>
        <div style="font-size: 14px; color: #C8C0B8; line-height: 1.6;">${msg.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
      </div>`;
    }).join("");
    return `<div style="margin-bottom: 28px;">
      <p style="margin: 0 0 12px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Full Conversation (${messages.length} messages)</p>
      <div style="background: #0F0F0F; border: 1px solid #2A2A2A; border-radius: 6px; padding: 16px; max-height: 600px; overflow-y: auto;">${rows}</div>
    </div>`;
  };
  const chatHistoryHtml = chatHistory ? buildChatHistoryHtml(chatHistory) : "";
  const buildChatHistoryText = (messages) => {
    if (!messages || messages.length === 0) return "";
    const lines = messages.map((msg) => {
      const label = msg.role === "visitor" ? visitorName ?? "Visitor" : msg.role === "human" ? "You (Human)" : "Nova";
      const time = new Date(msg.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      return `[${time}] ${label}: ${msg.content}`;
    });
    return `

Full Conversation:
${lines.join("\n")}`;
  };
  const chatHistoryText = chatHistory ? buildChatHistoryText(chatHistory) : "";
  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      replyTo: visitorEmail ?? OWNER_EMAIL,
      subject: `\u{1F534} Live Chat \u2014 ${displayName} wants to speak with a human`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F5F0EB; border-radius: 8px; overflow: hidden;">
          <div style="background: #D4A843; padding: 24px 32px;">
            <p style="margin: 0; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(0,0,0,0.6);">Ops by Noell \u2014 Nova Chat</p>
            <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 700; color: #0A0A0A;">Hot Lead \u2014 Human Response Requested</h1>
          </div>
          <div style="padding: 32px;">
            <p style="margin: 0 0 24px; font-size: 15px; color: #C8C0B8; line-height: 1.6;">A visitor on your website is asking to speak with a real person. This is a live prospect \u2014 respond quickly.</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 15px; color: #F5F0EB;">${displayName}</td>
              </tr>
              ${visitorEmail ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 15px;"><a href="mailto:${visitorEmail}" style="color: #D4A843; text-decoration: none;">${visitorEmail}</a></td></tr>` : ""}
              ${businessType ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Business</td><td style="padding: 10px 0; border-bottom: 1px solid #2A2A2A; font-size: 15px; color: #F5F0EB;">${businessType}</td></tr>` : ""}
            </table>
            ${chatHistoryHtml}
            <div style="margin-bottom: 28px;">
              <p style="margin: 0 0 10px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #8A8480;">Triggering Message</p>
              <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-left: 3px solid #D4A843; border-radius: 6px; padding: 18px 20px; font-size: 15px; color: #C8C0B8; line-height: 1.7;">${lastMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </div>
            <a href="${inboxUrl}" style="display: inline-block; background: #D4A843; color: #0A0A0A; font-size: 14px; font-weight: 700; padding: 14px 28px; border-radius: 6px; text-decoration: none; margin-right: 12px;">Open Chat Inbox</a>
            ${visitorEmail ? `<a href="mailto:${visitorEmail}" style="display: inline-block; background: transparent; border: 1px solid #D4A843; color: #D4A843; font-size: 14px; font-weight: 600; padding: 13px 24px; border-radius: 6px; text-decoration: none;">Email Directly</a>` : ""}
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid #2A2A2A; font-size: 12px; color: #8A8480;">
            Session ID: ${sessionId} \xB7 Triggered from Nova chat widget at opsbynoell.com
          </div>
        </div>
      `,
      text: [
        `HOT LEAD \u2014 Human Response Requested`,
        ``,
        `Visitor: ${displayName}`,
        visitorEmail ? `Email: ${visitorEmail}` : "",
        businessType ? `Business: ${businessType}` : "",
        ``,
        `Last Message:`,
        lastMessage,
        ``,
        `Open the chat inbox to reply: ${inboxUrl}`,
        chatHistoryText
      ].filter(Boolean).join("\n")
    });
    if (error) {
      console.warn("[Email] Resend returned an error for human takeover email:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Email] Failed to send human takeover email:", err);
    return false;
  }
}
async function sendNewsletterWelcomeEmail(email) {
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
            <p style="font-size: 15px; color: #C8C0B8; line-height: 1.75; margin: 0 0 20px;">Hey \u2014 thanks for subscribing. I'm Nikki, founder of Ops by Noell.</p>
            <p style="font-size: 15px; color: #C8C0B8; line-height: 1.75; margin: 0 0 20px;">The Ops Brief is a short, practical newsletter for local service business owners who want to understand what AI automation can actually do for their business \u2014 without the hype.</p>
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
            <p style="font-size: 15px; color: #C8C0B8; line-height: 1.75; margin: 0 0 28px;">In the meantime, if you want to see what's possible for your business specifically, book a free 15-minute intro call \u2014 no pitch, no pressure.</p>
            <a href="https://calendly.com/opsbynoell/30-minute-meeting-clone" style="display: inline-block; background: #A78BFA; color: #FFFFFF; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 6px; text-decoration: none;">Book a Free Intro Call</a>
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid #2A2A2A; font-size: 12px; color: #8A8480;">
            Ops by Noell \xB7 Orange County, CA \xB7 <a href="https://www.opsbynoell.com" style="color: #8A8480;">opsbynoell.com</a>
          </div>
        </div>
      `,
      text: [
        `Welcome to The Ops Brief \u2014 Ops by Noell`,
        ``,
        `Hey \u2014 thanks for subscribing. I'm Nikki, founder of Ops by Noell.`,
        ``,
        `The Ops Brief is a short, practical newsletter for local service business owners who want to understand what AI automation can actually do for their business \u2014 without the hype.`,
        ``,
        `I send it when there's something worth saying. You won't hear from me on a schedule for the sake of it.`,
        ``,
        `In the meantime, book a free 15-minute intro call: https://calendly.com/opsbynoell/30-minute-meeting-clone`,
        ``,
        `\u2014 Nikki`,
        `Ops by Noell \xB7 opsbynoell.com`
      ].join("\n")
    });
    if (error) {
      console.warn("[Email] Resend error on welcome email:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Email] Failed to send newsletter welcome email:", err);
    return false;
  }
}
async function sendNewsletterOwnerNotification(email, totalCount) {
  const resend = getResend();
  if (!resend) return false;
  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      subject: `New Ops Brief Subscriber \u2014 ${email}`,
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
      text: `New Ops Brief Subscriber

Email: ${email}
Total subscribers: ${totalCount}

A welcome email was sent automatically.`
    });
    if (error) {
      console.warn("[Email] Resend error on owner notification:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[Email] Failed to send newsletter owner notification:", err);
    return false;
  }
}
async function sendContactFormEmail(payload) {
  const resend = getResend();
  if (!resend) return false;
  const { name, email, phone, message } = payload;
  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission \u2014 ${name}`,
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
        `New Contact Form Submission \u2014 Ops by Noell`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        ``,
        `Message:`,
        message,
        ``,
        `Reply directly to ${email} to follow up.`
      ].join("\n")
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

// server/_core/llm.ts
var ensureArray = (value) => Array.isArray(value) ? value : [value];
var normalizeContentPart = (part) => {
  if (typeof part === "string") {
    return { type: "text", text: part };
  }
  if (part.type === "text") {
    return part;
  }
  if (part.type === "image_url") {
    return part;
  }
  if (part.type === "file_url") {
    return part;
  }
  throw new Error("Unsupported message content part");
};
var normalizeMessage = (message) => {
  const { role, name, tool_call_id } = message;
  if (role === "tool" || role === "function") {
    const content = ensureArray(message.content).map((part) => typeof part === "string" ? part : JSON.stringify(part)).join("\n");
    return {
      role,
      name,
      tool_call_id,
      content
    };
  }
  const contentParts = ensureArray(message.content).map(normalizeContentPart);
  if (contentParts.length === 1 && contentParts[0].type === "text") {
    return {
      role,
      name,
      content: contentParts[0].text
    };
  }
  return {
    role,
    name,
    content: contentParts
  };
};
var normalizeToolChoice = (toolChoice, tools) => {
  if (!toolChoice) return void 0;
  if (toolChoice === "none" || toolChoice === "auto") {
    return toolChoice;
  }
  if (toolChoice === "required") {
    if (!tools || tools.length === 0) {
      throw new Error(
        "tool_choice 'required' was provided but no tools were configured"
      );
    }
    if (tools.length > 1) {
      throw new Error(
        "tool_choice 'required' needs a single tool or specify the tool name explicitly"
      );
    }
    return {
      type: "function",
      function: { name: tools[0].function.name }
    };
  }
  if ("name" in toolChoice) {
    return {
      type: "function",
      function: { name: toolChoice.name }
    };
  }
  return toolChoice;
};
var resolveApiUrl = () => {
  if (ENV.forgeApiUrl && ENV.forgeApiUrl.trim().length > 0) {
    return `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions`;
  }
  if (ENV.anthropicApiKey && ENV.anthropicApiKey.trim().length > 0) {
    return "https://api.anthropic.com/v1/messages";
  }
  return "https://forge.manus.im/v1/chat/completions";
};
var resolveApiKey = () => ENV.forgeApiKey && ENV.forgeApiKey.trim().length > 0 ? ENV.forgeApiKey : ENV.anthropicApiKey;
var assertApiKey = () => {
  if (!resolveApiKey()) {
    throw new Error("No API key configured (set ANTHROPIC_API_KEY or BUILT_IN_FORGE_API_KEY)");
  }
};
var normalizeResponseFormat = ({
  responseFormat,
  response_format,
  outputSchema,
  output_schema
}) => {
  const explicitFormat = responseFormat || response_format;
  if (explicitFormat) {
    if (explicitFormat.type === "json_schema" && !explicitFormat.json_schema?.schema) {
      throw new Error(
        "responseFormat json_schema requires a defined schema object"
      );
    }
    return explicitFormat;
  }
  const schema = outputSchema || output_schema;
  if (!schema) return void 0;
  if (!schema.name || !schema.schema) {
    throw new Error("outputSchema requires both name and schema");
  }
  return {
    type: "json_schema",
    json_schema: {
      name: schema.name,
      schema: schema.schema,
      ...typeof schema.strict === "boolean" ? { strict: schema.strict } : {}
    }
  };
};
async function invokeLLM(params) {
  assertApiKey();
  const {
    messages,
    model,
    tools,
    toolChoice,
    tool_choice,
    maxTokens,
    max_tokens,
    outputSchema,
    output_schema,
    responseFormat,
    response_format
  } = params;
  const payload = {
    model: model ?? "claude-haiku-4-5-20251001",
    messages: messages.map(normalizeMessage)
  };
  if (tools && tools.length > 0) {
    payload.tools = tools;
  }
  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }
  payload.max_tokens = maxTokens ?? max_tokens ?? 1024;
  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema
  });
  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }
  const apiUrl = resolveApiUrl();
  const isAnthropic = apiUrl.includes("api.anthropic.com");
  const headers = { "content-type": "application/json" };
  if (isAnthropic) {
    headers["x-api-key"] = resolveApiKey();
    headers["anthropic-version"] = "2023-06-01";
    // Anthropic requires system as top-level param, not a message role
    const systemMsgs = payload.messages.filter(m => m.role === "system");
    const nonSystemMsgs = payload.messages.filter(m => m.role !== "system");
    if (systemMsgs.length > 0) {
      payload.system = systemMsgs.map(m => m.content).join("\n\n");
    }
    payload.messages = nonSystemMsgs;
  } else {
    headers["authorization"] = `Bearer ${resolveApiKey()}`;
  }
  const response = await fetch(apiUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} \u2013 ${errorText}`
    );
  }
  const raw = await response.json();
  // Normalize Anthropic response to OpenAI-compatible shape
  if (isAnthropic && raw.content) {
    return {
      id: raw.id,
      created: Date.now(),
      model: raw.model,
      choices: [{ index: 0, message: { role: "assistant", content: raw.content.map(b => b.text ?? "").join("") }, finish_reason: raw.stop_reason ?? null }],
      usage: raw.usage
    };
  }
  return raw;
}

// server/routers/chat.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
import { z as z2 } from "zod";
var sseClients = [];
function broadcastSSE(event, payload) {
  const data = `event: ${event}
data: ${JSON.stringify(payload)}

`;
  for (const client of sseClients) {
    try {
      client.write(data);
    } catch {
    }
  }
}
function addSSEClient(client) {
  sseClients.push(client);
}
function removeSSEClient(id) {
  const idx = sseClients.findIndex((c) => c.id === id);
  if (idx !== -1) sseClients.splice(idx, 1);
}
var chatRouter = router({
  /**
   * Called by ChatWidget to persist a visitor message and get a bot response.
   * Creates/updates the session and stores both visitor message and bot reply.
   */
  sendMessage: publicProcedure.input(
    z2.object({
      sessionId: z2.string().min(1).max(64),
      message: z2.string().min(1).max(2e3),
      visitorName: z2.string().max(128).optional(),
      visitorEmail: z2.string().email().max(320).optional(),
      businessType: z2.string().max(256).optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const req = ctx.req;
    const rawIp = req?.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() || req?.headers?.["x-real-ip"] || req?.socket?.remoteAddress || "";
    const visitorIp = rawIp || void 0;
    let visitorLocation;
    if (visitorIp && visitorIp !== "127.0.0.1" && visitorIp !== "::1") {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${visitorIp}?fields=city,regionName,country,status`, { signal: AbortSignal.timeout(2e3) });
        if (geoRes.ok) {
          const geo = await geoRes.json();
          if (geo.status === "success") {
            visitorLocation = [geo.city, geo.regionName, geo.country].filter(Boolean).join(", ");
          }
        }
      } catch {
      }
    }
    await upsertChatSession(input.sessionId, {
      visitorName: input.visitorName,
      visitorEmail: input.visitorEmail,
      businessType: input.businessType,
      visitorIp,
      visitorLocation
    });
    await insertChatMessage(input.sessionId, "visitor", input.message);
    const session = await getChatSession(input.sessionId);
    if (session?.humanTakeover) {
      broadcastSSE("new_message", {
        sessionId: input.sessionId,
        role: "visitor",
        content: input.message,
        visitorName: input.visitorName
      });
      broadcastSSE("session_updated", { sessionId: input.sessionId });
      const inboxLink = `https://www.opsbynoell.com/admin/inbox?session=${input.sessionId}`;
      sendTelegram(
        `<b>\u{1F4AC} Nova Inbox \u2014 Human Takeover</b>

<b>From:</b> ${input.visitorName ?? "Visitor"}
<b>Message:</b> ${input.message}

<a href="${inboxLink}">Open conversation \u2192</a>`
      ).catch(() => {
      });
      return { botReply: null, humanTakeover: true };
    }
    {
      const locationStr = visitorLocation ? ` (${visitorLocation})` : "";
      const inboxLink = `https://www.opsbynoell.com/admin/inbox?session=${input.sessionId}`;
      sendTelegram(
        `<b>\u{1F4AC} Nova Chat</b>

<b>From:</b> ${input.visitorName ?? "Visitor"}${locationStr}
<b>Message:</b> ${input.message}

<a href="${inboxLink}">Open in inbox \u2192</a>`
      ).catch(() => {
      });
    }
    broadcastSSE("new_message", {
      sessionId: input.sessionId,
      role: "visitor",
      content: input.message,
      visitorName: input.visitorName
    });
    broadcastSSE("session_updated", { sessionId: input.sessionId });
    const HANDOFF_KEYWORDS = [
      "talk to a person",
      "talk to someone",
      "speak to a person",
      "speak to someone",
      "real person",
      "speak to nikki",
      "talk to nikki",
      "speak to james",
      "talk to james",
      "contact you",
      "reach you",
      "get in touch",
      "someone call me",
      "call me back",
      "[human handoff request]"
    ];
    const msgLower = input.message.toLowerCase();
    const isHandoff = HANDOFF_KEYWORDS.some((kw) => msgLower.includes(kw));
    if (isHandoff) {
      const history2 = await getSessionMessages(input.sessionId);
      const inboxLink = `https://www.opsbynoell.com/admin/inbox?session=${input.sessionId}`;
      await Promise.allSettled([
        sendTelegram(
          `<b>\u{1F64B} Visitor Wants a Person</b>

<b>Name:</b> ${input.visitorName ?? "Unknown"}
<b>Email:</b> ${input.visitorEmail ?? "Not provided"}
<b>Business:</b> ${input.businessType ?? "Not provided"}
<b>Message:</b> ${input.message}

<a href="${inboxLink}">Take over conversation \u2192</a>`
        ),
        sendHumanTakeoverEmail({
          visitorName: input.visitorName,
          visitorEmail: input.visitorEmail,
          businessType: input.businessType,
          lastMessage: input.message,
          sessionId: input.sessionId,
          chatHistory: history2
        })
      ]);
      const handoffReply = "Of course. Let me get James and Nikki on this for you. They'll reach out shortly. You can also book a free 30-minute intro call directly at opsbynoell.com/book if that's easier.";
      await insertChatMessage(input.sessionId, "bot", handoffReply);
      broadcastSSE("new_message", {
        sessionId: input.sessionId,
        role: "bot",
        content: handoffReply
      });
      return { botReply: handoffReply, humanTakeover: false };
    }
    const history = await getSessionMessages(input.sessionId);
    const botReply = await generateNovaResponseStreaming(
      input.sessionId,
      input.message,
      history,
      { visitorName: input.visitorName, businessType: input.businessType }
    );
    return { botReply, humanTakeover: false };
  }),
  /**
   * Returns all messages for a given session (used by ChatWidget to sync state).
   */
  getMessages: publicProcedure.input(z2.object({ sessionId: z2.string().min(1).max(64) })).query(async ({ input }) => {
    return getSessionMessages(input.sessionId);
  }),
  // ─── Admin-only procedures ───────────────────────────────────────────────
  getSessions: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN", message: "Admin only" });
    }
    return getAllChatSessions(100);
  }),
  getSessionMessages: protectedProcedure.input(z2.object({ sessionId: z2.string().min(1).max(64) })).query(async ({ ctx, input }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN", message: "Admin only" });
    }
    await markSessionRead(input.sessionId);
    return getSessionMessages(input.sessionId);
  }),
  adminReply: protectedProcedure.input(
    z2.object({
      sessionId: z2.string().min(1).max(64),
      message: z2.string().min(1).max(2e3)
    })
  ).mutation(async ({ ctx, input }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN", message: "Admin only" });
    }
    await setHumanTakeover(input.sessionId, true);
    await insertChatMessage(input.sessionId, "human", input.message);
    broadcastSSE("new_message", {
      sessionId: input.sessionId,
      role: "human",
      content: input.message
    });
    broadcastSSE("session_updated", { sessionId: input.sessionId });
    return { success: true };
  }),
  setTakeover: protectedProcedure.input(
    z2.object({
      sessionId: z2.string().min(1).max(64),
      active: z2.boolean()
    })
  ).mutation(async ({ ctx, input }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError3({ code: "FORBIDDEN", message: "Admin only" });
    }
    await setHumanTakeover(input.sessionId, input.active);
    broadcastSSE("session_updated", { sessionId: input.sessionId });
    return { success: true };
  }),
  visitorTyping: publicProcedure.input(
    z2.object({
      sessionId: z2.string().min(1).max(64),
      draft: z2.string().max(500).optional(),
      isTyping: z2.boolean()
    })
  ).mutation(async ({ input }) => {
    broadcastSSE("visitor_typing", {
      sessionId: input.sessionId,
      isTyping: input.isTyping,
      draft: input.draft ?? ""
    });
    return { ok: true };
  })
});
var NOVA_SYSTEM_PROMPT = `You are Nova, the AI assistant for Ops by Noell \u2014 an AI automation agency for appointment-based service businesses in Orange County, California. You are friendly, direct, and knowledgeable. You sound like a real person, not a bot.

Your job: answer questions about Ops by Noell, qualify leads, and guide visitors toward booking a free 30-minute intro call.

ABOUT OPS BY NOELL:
- Founders: James and Nikki Noell, based in Lake Forest, CA. This is a family business. When visitors ask to talk to a human, they want to speak with James and Nikki.
- Website: opsbynoell.com
- Booking link: https://api.leadconnectorhq.com/widget/booking/ko7eXb5zooItceadiV02

SERVICES (done-for-you, fully managed):
1. Missed Call Text-Back \u2014 responds to every unanswered call within seconds via automated text. Stops lost leads instantly.
2. AI Booking & Reminders \u2014 automated appointment scheduling and reminder sequences. Reduces no-shows 30-50%.
3. Review Generation \u2014 automated review request sequences after every appointment. Clients typically see major review volume increases within 30 days.
4. Lead Follow-Up Automation \u2014 nurture sequences for new leads and reactivation for past clients.
5. Marketing Automation \u2014 email and SMS campaigns that run on autopilot.
6. AI Voice Receptionist \u2014 answers calls 24/7, qualifies leads, answers questions, books appointments.
7. Custom Ops \u2014 anything beyond the above, built to fit your specific business.

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
- 80% of sales require 5+ follow-ups \u2014 most businesses stop after 1.

FOUNDING CLIENT \u2014 SANTA (massage therapist, Laguna Niguel):
- 25 years experience, zero digital infrastructure before Ops by Noell.
- No-shows dropped from 4/week to less than 1 in two weeks of going live.
- This is the kind of result we deliver.

DATA PRIVACY:
We don't sell visitor data. Ever. Anything shared stays between us and is only used to help them. No spam, no lists, no third-party sharing.

COMPETITIVE POSITIONING:
- We don't sell software or hand you a login. We build, install, and manage everything.
- Local OC team. Founder-led. "We're the Noells \u2014 our name is on the door."
- We show you the ROI math before you spend a dollar.
- Most clients are live within two weeks.

HOW TO RESPOND:
- 2-3 sentences max. Every reply. No exceptions.
- One idea per message. Don't stack multiple offers, CTAs, or packages in one response.
- Sound like a real person texting, not a sales page. No bullet lists, no headers, no bold text.
- Lead with their problem or situation, not our features.
- Ask one follow-up question per reply when it moves things forward. Never ask two.
- Vary your openers. Never start with "Great question!", "Absolutely!", or "Of course!".
- When it's natural, mention booking a free 30-min call at opsbynoell.com/book \u2014 once, casually, not as a hard CTA.
- If you're unsure about something, say so and offer to connect them with James and Nikki directly.
- Never make up pricing, stats, or services beyond what's listed above.

PRICING RULES (critical):
- When someone asks about cost or pricing, do NOT dump the full package list.
- Give a general range and ask a qualifying question first. Example: "Depends on what you need \u2014 most clients start somewhere between $247 and $797/mo. What's your biggest gap right now?"
- Only share specific package details if they ask for them directly or the conversation clearly calls for it.
- If you're not certain what fits their situation, say: "It really depends on your setup \u2014 we'd figure that out together." Do not guess or assume.
- Never invent pricing or mention numbers not listed above.

WHAT YOU ARE NOT:
- Don't claim to be human if directly asked.
- Don't answer questions unrelated to Ops by Noell or AI automation for service businesses.
- Don't give legal, financial, or medical advice.
- Don't make promises about specific results beyond what's documented above.`;
async function generateNovaResponseStreaming(sessionId, currentMessage, history, context) {
  broadcastSSE("nova_typing", { sessionId, isTyping: true });
  try {
    const priorMessages = history.slice(0, -1);
    const llmMessages = [];
    for (const msg of priorMessages) {
      if (msg.role === "visitor") llmMessages.push({ role: "user", content: msg.content });
      else if (msg.role === "bot" || msg.role === "human") llmMessages.push({ role: "assistant", content: msg.content });
    }
    llmMessages.push({ role: "user", content: currentMessage });
    const apiKey = (ENV.forgeApiKey && ENV.forgeApiKey.trim()) || (ENV.anthropicApiKey && ENV.anthropicApiKey.trim());
    const forgeUrl = ENV.forgeApiUrl && ENV.forgeApiUrl.trim();
    if (apiKey) {
      let apiUrl;
      let headers;
      let bodyPayload;
      const isAnthropic = !forgeUrl && !!(ENV.anthropicApiKey && ENV.anthropicApiKey.trim());
      if (isAnthropic) {
        apiUrl = "https://api.anthropic.com/v1/messages";
        headers = { "content-type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" };
        bodyPayload = { model: "claude-haiku-4-5-20251001", system: NOVA_SYSTEM_PROMPT, messages: llmMessages, max_tokens: 300, stream: true };
      } else {
        apiUrl = forgeUrl ? `${forgeUrl.replace(/\/$/, "")}/v1/chat/completions` : "https://forge.manus.im/v1/chat/completions";
        headers = { "content-type": "application/json", "authorization": `Bearer ${apiKey}` };
        bodyPayload = { model: "claude-haiku-4-5-20251001", messages: [{ role: "system", content: NOVA_SYSTEM_PROMPT }, ...llmMessages], max_tokens: 300, stream: true };
      }
      const response = await fetch(apiUrl, { method: "POST", headers, body: JSON.stringify(bodyPayload) });
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
              if (parsed.type === "content_block_delta" && parsed.delta?.type === "text_delta") {
                chunk = parsed.delta.text ?? "";
              } else if (parsed.choices?.[0]?.delta?.content) {
                chunk = parsed.choices[0].delta.content;
              }
              if (chunk) { fullText += chunk; broadcastSSE("nova_stream_chunk", { sessionId, chunk }); }
            } catch { /* malformed line */ }
          }
        }
        if (fullText.trim()) {
          await insertChatMessage(sessionId, "bot", fullText.trim());
          broadcastSSE("nova_stream_done", { sessionId, content: fullText.trim() });
          broadcastSSE("nova_typing", { sessionId, isTyping: false });
          return fullText.trim();
        }
      }
    }
  } catch (err) {
    console.error("[Nova] Streaming failed, falling back:", err);
  }
  // Fallback: non-streaming with simulated word-by-word broadcast
  const reply = await generateNovaResponse(currentMessage, history, context);
  await insertChatMessage(sessionId, "bot", reply);
  const words = reply.split(" ");
  for (let i = 0; i < words.length; i++) {
    const chunk = (i === 0 ? "" : " ") + words[i];
    broadcastSSE("nova_stream_chunk", { sessionId, chunk });
    await new Promise(r => setTimeout(r, 40));
  }
  broadcastSSE("nova_stream_done", { sessionId, content: reply });
  broadcastSSE("nova_typing", { sessionId, isTyping: false });
  return reply;
}
async function generateNovaResponse(currentMessage, history, context) {
  try {
    const priorMessages = history.slice(0, -1);
    const llmMessages = [];
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
        ...llmMessages
      ],
      maxTokens: 300
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
var QA_PAIRS = [
  {
    keywords: ["what do you do", "what is ops by noell", "what does ops by noell do", "tell me about", "what you do", "services", "what you offer", "what can you do"],
    answer: "We build done-for-you AI automation systems for service businesses. Missed call text-back, AI booking, automated reminders, review generation, lead follow-up, and AI voice receptionist. We build it, it runs, you get your time back."
  },
  {
    keywords: ["how much", "cost", "price", "pricing", "fee", "charge", "rate", "package", "tier"],
    answer: "Depends on what you need \u2014 most businesses start somewhere between $247 and $797/mo. What's the biggest gap you're trying to fix right now?"
  },
  {
    keywords: ["who do you work with", "what type of business", "what businesses", "industry", "who is this for", "med spa", "salon", "dental", "massage", "chiropractor"],
    answer: "We work with appointment-based service businesses. Med spas, massage therapists, salons, dental practices, chiropractors, and more. If your business runs on bookings and phone calls, we can help."
  },
  {
    keywords: ["how long", "timeline", "setup time", "how soon", "how fast", "get started", "onboard"],
    answer: "Most clients are fully live within two weeks of their audit."
  },
  {
    keywords: ["tech", "technical", "tech-savvy", "complicated", "difficult", "do i need to", "hard to use"],
    answer: "None at all. We build, manage, and maintain everything. You see results, not dashboards."
  },
  {
    keywords: ["how do i start", "next step", "how to begin", "sign up", "book", "schedule", "call", "consult", "audit", "intro"],
    answer: "Book a free 30-minute intro call at opsbynoell.com/book. We will learn about your business and figure out if we are a fit. No pitch, no pressure."
  },
  {
    keywords: ["different", "unique", "why you", "why ops by noell", "what makes you", "stand out", "better than"],
    answer: "We don't sell software or hand you a login. We build your complete automation system, install every component, and manage it ongoing. We show you the ROI math before you spend a dollar."
  },
  {
    keywords: ["missed call", "missed calls", "text back", "call back", "unanswered"],
    answer: "Our Missed Call Text-Back system responds to every unanswered call within seconds, automatically texting the caller to keep the conversation alive. No more lost leads because you were with a client."
  },
  {
    keywords: ["ai voice", "voice receptionist", "phone answering", "answer the phone", "receptionist"],
    answer: "Our AI Voice Receptionist answers calls 24/7, qualifies leads, answers common questions, and books appointments without a human on the line."
  },
  {
    keywords: ["review", "reviews", "google review", "reputation", "rating"],
    answer: "We automate review requests so every happy client gets a follow-up asking them to leave a Google review. Most clients see a major increase in review volume within the first 30 days."
  },
  {
    keywords: ["no-show", "no show", "cancellation", "reminder", "appointment reminder"],
    answer: "Our automated reminder system sends SMS and email reminders before every appointment. Most clients see a 30 to 50 percent reduction in no-shows within the first month."
  },
  {
    keywords: ["follow up", "follow-up", "lead nurture", "nurture", "reactivate", "past clients"],
    answer: "We build automated follow-up sequences that re-engage past clients, nurture new leads, and keep your business top of mind without you lifting a finger."
  },
  {
    keywords: ["orange county", "oc", "local", "near me", "southern california"],
    answer: "We are based in Orange County and primarily serve local service businesses in the OC and Southern California area, though we work with clients across the US."
  },
  {
    keywords: ["contract", "commitment", "lock in", "cancel anytime", "month to month"],
    answer: "Our monthly retainers are month-to-month with no long-term contracts. We earn your business every month by delivering results."
  },
  {
    keywords: ["roi", "return on investment", "worth it", "results", "guarantee", "proof", "case study"],
    answer: "We show you the math before you spend a dollar. Our Revenue Audit calculates exactly what missed calls, no-shows, and lack of follow-up are costing your business so you know the ROI before we start."
  },
  {
    keywords: ["what is a revenue audit", "revenue audit", "audit", "assessment"],
    answer: "A Revenue Audit is a deep-dive into your current operations to identify exactly where you are losing revenue. We look at missed calls, no-show rates, follow-up gaps, and review volume, then show you the dollar amount. It starts at $497 and the fee is credited toward any retainer."
  },
  {
    keywords: ["data", "privacy", "sell my info", "sell my data", "spam", "mailing list", "safe", "secure"],
    answer: "We don't sell your data. Ever. Anything you share with us stays between us and is only used to help you. No spam, no lists, no third-party sharing."
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "howdy"],
    answer: "Hey! I'm Nova, your guide to Ops by Noell. We help service businesses automate their operations so they can focus on their clients. What can I help you with today?"
  },
  {
    keywords: ["thank you", "thanks", "appreciate", "helpful", "great"],
    answer: "Happy to help. If you want to take the next step, you can book a free 30-minute intro call at opsbynoell.com/book. James and Nikki would love to learn about your business."
  }
];
var FALLBACK_RESPONSE = "Good question. I'd love to connect you with James and Nikki to dig into that. You can book a free 30-minute intro call at opsbynoell.com/book, or drop your email and they'll reach out directly.";
function generateKeywordFallback(message) {
  const lower = message.toLowerCase();
  for (const qa of QA_PAIRS) {
    if (qa.keywords.some((kw) => lower.includes(kw))) {
      return qa.answer;
    }
  }
  return FALLBACK_RESPONSE;
}

// server/ghl.ts
var GHL_API_BASE = "https://services.leadconnectorhq.com";
var GHL_API_VERSION = "2021-07-28";
function getGHLApiKey() {
  return process.env.GHL_API_KEY;
}
async function createGHLContact(input) {
  const apiKey = getGHLApiKey();
  if (!apiKey) {
    console.warn("[GHL] GHL_API_KEY is not set \u2014 skipping contact creation.");
    return false;
  }
  const [firstName, ...rest] = input.name.trim().split(" ");
  const lastName = rest.join(" ") || void 0;
  const body = {
    firstName,
    ...lastName ? { lastName } : {},
    email: input.email,
    phone: input.phone,
    source: input.source ?? "Website",
    tags: input.tags ?? ["website-contact-form"]
  };
  try {
    const res = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: GHL_API_VERSION
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const text2 = await res.text().catch(() => "(no body)");
      console.warn(`[GHL] Contact creation failed: ${res.status} ${res.statusText} \u2014 ${text2}`);
      return false;
    }
    const data = await res.json().catch(() => ({}));
    console.info(`[GHL] Contact created: ${data?.contact?.id ?? "(unknown id)"} for ${input.email}`);
    return true;
  } catch (err) {
    console.error("[GHL] Unexpected error creating contact:", err);
    return false;
  }
}

// server/routers.ts
import { TRPCError as TRPCError4 } from "@trpc/server";
import { z as z3 } from "zod";
var appRouter = router({
  system: systemRouter,
  chat: chatRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  // ─── Chat Leads ───────────────────────────────────────────────────────────
  leads: router({
    /**
     * Called by ChatWidget after the 3-step lead capture (name → email → biz type).
     * Persists the lead to the database and fires email + Telegram owner notifications.
     */
    submit: publicProcedure.input(
      z3.object({
        name: z3.string().min(1).max(128),
        email: z3.string().email().max(320),
        businessType: z3.string().min(1).max(256),
        phone: z3.string().max(32).optional(),
        question: z3.string().max(2e3).optional(),
        page: z3.string().max(256).optional()
      })
    ).mutation(async ({ input }) => {
      const leadId = await insertChatLead({
        name: input.name,
        email: input.email,
        businessType: input.businessType,
        question: input.question ?? null,
        page: input.page ?? null,
        notified: "no"
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
        `Reply directly to ${input.email} to follow up.`
      ].join("\n");
      const notifySuccess = await notifyOwner({
        title: `New Chat Lead: ${input.name}`,
        content: emailContent
      });
      await sendTelegram(
        formatTelegramMessage("New Chat Lead", {
          Name: input.name,
          Email: input.email,
          "Business Type": input.businessType,
          "Question": input.question ?? "(none)",
          "Page": input.page ?? "unknown"
        })
      );
      return {
        success: true,
        leadId,
        notified: notifySuccess
      };
    })
  }),
  // ─── Notifications ────────────────────────────────────────────────────────
  notifications: router({
    /**
     * Fired when a visitor lands on the /book page.
     */
    bookingPageVisit: publicProcedure.input(
      z3.object({
        referrer: z3.string().max(512).optional(),
        userAgent: z3.string().max(512).optional()
      })
    ).mutation(async ({ input }) => {
      const emailContent = [
        `A visitor just landed on the Book a Free Audit page.`,
        ``,
        `Referrer: ${input.referrer ?? "(direct / unknown)"}`,
        ``,
        `They may be considering booking \u2014 keep an eye out for a follow-up chat or booking.`
      ].join("\n");
      await Promise.allSettled([
        notifyOwner({
          title: "\u{1F440} Someone is on the Book page",
          content: emailContent
        }),
        sendTelegram(
          formatTelegramMessage("Book Page Visit", {
            Referrer: input.referrer ?? "(direct)"
          })
        )
      ]);
      return { success: true };
    }),
    /**
     * Fired when a visitor clicks the booking CTA.
     */
    bookingIntent: publicProcedure.input(
      z3.object({
        source: z3.string().max(256).optional(),
        page: z3.string().max(256).optional()
      })
    ).mutation(async ({ input }) => {
      const emailContent = [
        `A visitor clicked a booking CTA on the Ops by Noell website.`,
        ``,
        `Source: ${input.source ?? "unknown"}`,
        `Page: ${input.page ?? "unknown"}`,
        ``,
        `This is a high-intent signal \u2014 they are ready to book.`
      ].join("\n");
      await Promise.allSettled([
        notifyOwner({
          title: "\u{1F525} High-Intent: Booking CTA Clicked",
          content: emailContent
        }),
        sendTelegram(
          formatTelegramMessage("Booking CTA Clicked \u{1F525}", {
            Source: input.source ?? "unknown",
            Page: input.page ?? "unknown"
          })
        )
      ]);
      return { success: true };
    })
  }),
  // ─── Contact Form ──────────────────────────────────────────────────────────
  contact: router({
    /**
     * Called when a visitor submits the contact form on the Book page.
     * Fires owner notification and Telegram alert.
     */
    submit: publicProcedure.input(
      z3.object({
        name: z3.string().min(1).max(128),
        email: z3.string().email().max(320),
        phone: z3.string().min(7).max(30),
        message: z3.string().min(10).max(4e3)
      })
    ).mutation(async ({ input }) => {
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
        `Reply directly to ${input.email} to follow up.`
      ].join("\n");
      await Promise.allSettled([
        // Direct email to noell@opsbynoell.com via Resend
        sendContactFormEmail({
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message
        }),
        // Manus platform notification (backup)
        notifyOwner({
          title: `\u{1F4EC} New Contact Form: ${input.name}`,
          content: emailContent
        }),
        // Telegram alert (backup)
        sendTelegram(
          formatTelegramMessage("New Contact Form \u{1F4EC}", {
            Name: input.name,
            Email: input.email,
            Phone: input.phone,
            Message: input.message.slice(0, 300) + (input.message.length > 300 ? "..." : "")
          })
        ),
        // GHL contact creation
        createGHLContact({
          name: input.name,
          email: input.email,
          phone: input.phone,
          source: "Website Contact Form"
        })
      ]);
      return { success: true };
    })
  }),
  // ─── Newsletter ───────────────────────────────────────────────────────────────────
  newsletter: router({
    /**
     * Subscribe an email to The Ops Brief newsletter.
     * Stores the subscriber, sends a welcome email, and notifies the owner.
     */
    subscribe: publicProcedure.input(
      z3.object({
        email: z3.string().email().max(320),
        source: z3.string().max(256).optional()
      })
    ).mutation(async ({ input }) => {
      const { id: subscriberId, isDuplicate } = await insertNewsletterSubscriber({
        email: input.email,
        source: input.source ?? "/newsletter"
      });
      if (isDuplicate) {
        return { success: true, alreadySubscribed: true };
      }
      const totalCount = await getNewsletterSubscriberCount();
      const [welcomed] = await Promise.allSettled([
        sendNewsletterWelcomeEmail(input.email),
        sendNewsletterOwnerNotification(input.email, totalCount)
      ]);
      const welcomedSuccess = welcomed.status === "fulfilled" && welcomed.value === true;
      if (welcomedSuccess && subscriberId) {
        await markNewsletterWelcomed(subscriberId);
      }
      return { success: true, alreadySubscribed: false };
    })
  }),
  // ─── Bot Analytics ───────────────────────────────────────────────────────────────────
  // All analytics procedures are protected — only the logged-in owner can access them.
  analytics: router({
    /** Conversion funnel: how many sessions are at each step. */
    funnel: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getBotFunnelStats();
    }),
    /** Daily session starts for the last 30 days. */
    daily: protectedProcedure.input(z3.object({ days: z3.number().min(7).max(90).default(30) })).query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getBotDailyStats(input.days);
    }),
    /** Interest breakdown for completed leads. */
    interests: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getBotInterestStats();
    }),
    /** Contact method split for completed leads. */
    contactMethods: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getBotContactMethodStats();
    }),
    /** Source breakdown — website vs direct. */
    sources: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getBotSourceStats();
    }),
    /** Recent completed leads with full session details. */
    recentLeads: protectedProcedure.input(z3.object({ limit: z3.number().min(1).max(200).default(50) })).query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Admin only" });
      }
      return getRecentBotLeads(input.limit);
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// api/path.ts
import { nanoid } from "nanoid";
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
registerOAuthRoutes(app);
registerTelegramWebhook(app);
async function handler(req, res) {
  const rawUrl = req.url ?? "/";
  const urlPath = rawUrl.split("?")[0];
  if (urlPath === "/api/chat-sse") {
    if (req.method !== "GET") {
      res.status(405).end("Method Not Allowed");
      return;
    }
    const clientId = nanoid();
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();
    res.write(": connected\n\n");
    const client = {
      id: clientId,
      write: (data) => {
        if (!res.writableEnded) res.write(data);
      }
    };
    addSSEClient(client);
    const ping = setInterval(() => {
      if (!res.writableEnded) res.write(": ping\n\n");
      else clearInterval(ping);
    }, 2e4);
    req.on("close", () => {
      clearInterval(ping);
      removeSSEClient(clientId);
    });
    return;
  }

  // ─── /api/qualify-lead ────────────────────────────────────────────────────
  if (urlPath === "/api/qualify-lead") {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
    const { sessionId: qlSessionId } = req.body ?? {};
    if (!qlSessionId || typeof qlSessionId !== "string") {
      res.status(400).json({ error: "sessionId is required" });
      return;
    }
    const QL_DB_URL = process.env.DATABASE_URL;
    const QL_ANTHRO = process.env.ANTHROPIC_API_KEY;
    const QL_GHL_KEY = process.env.GHL_API_KEY;
    if (!QL_DB_URL || !QL_ANTHRO) {
      res.status(500).json({ error: "Missing required env vars" });
      return;
    }
    let qlPool;
    try {
      qlPool = new Pool({ connectionString: QL_DB_URL, ssl: { rejectUnauthorized: false } });
      // Fetch session
      const sessResult = await qlPool.query(
        `SELECT "sessionId","visitorName","visitorEmail","businessType" FROM "chatSessions" WHERE "sessionId"=$1 LIMIT 1`,
        [qlSessionId]
      );
      if (sessResult.rows.length === 0) {
        res.status(404).json({ error: "Session not found" });
        return;
      }
      const sess = sessResult.rows[0];
      // Fetch last 15 messages
      const msgsResult = await qlPool.query(
        `SELECT role, content FROM "chatMessages" WHERE "sessionId"=$1 ORDER BY "createdAt" DESC LIMIT 15`,
        [qlSessionId]
      );
      const msgs = msgsResult.rows.reverse();
      if (msgs.length === 0) {
        res.status(200).json({ intent: "low", businessType: null, painPoint: null, contactCaptured: false });
        return;
      }
      const transcript = msgs.map((m) => `[${m.role.toUpperCase()}]: ${m.content}`).join("\n");
      // Call Anthropic
      console.error("[QL-PRE-CALL] About to call Anthropic, transcript length=" + transcript.length + " msgs=" + msgs.length);
      const claudeRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": QL_ANTHRO,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 512,
          system: "You analyze chat transcripts to qualify leads. Respond ONLY with a valid JSON object, no markdown, no explanation.",
          messages: [{
            role: "user",
            content: `Classify the visitor intent and extract key info from this chat transcript.\n\nINTENT:\n- hot: asked about pricing AND mentioned a pain point AND showed intent to move forward\n- warm: described their business or a problem, but has NOT asked about next steps or pricing\n- low: general curiosity, no business context\n\nTRANSCRIPT:\n${transcript}\n\nRespond with ONLY valid JSON. Example: {"intent":"warm","businessType":"med spa","painPoint":"losing clients to no-shows","extractedEmail":null}`
          }]
        })
      });
      const claudeData = await claudeRes.json();
      const rawText = claudeData?.content?.[0]?.text?.trim() ?? "";
      // Debug: return raw response if ?debug=1
      const qlUrlParams = new URL("https://x.com" + (req.url||"")).searchParams;
      if (qlUrlParams.get("debug") === "1") {
        res.status(200).json({ _debug: true, claudeStatus: claudeRes.status, rawText, claudeData: JSON.stringify(claudeData).substring(0, 500) });
        if (qlPool) qlPool.end().catch(()=>{});
        return;
      }
      console.error("[QL-POST-CALL] claudeRes.status=" + claudeRes.status + " rawText=" + rawText.substring(0, 300));
      console.error("[QL-DEBUG] status=" + claudeRes.status + " rawText=" + rawText.substring(0, 400) + " claudeDataKeys=" + Object.keys(claudeData||{}).join(",") + " content0=" + JSON.stringify((claudeData?.content||[])[0]));
      let analysis = { intent: "low", businessType: null, painPoint: null, extractedEmail: null };
      try { const stripped = rawText.replace(/^```(?:json)?\s*/,"").replace(/\s*```$/,"").trim(); analysis = JSON.parse(stripped); } catch {}
      if (!["hot","warm","low"].includes(analysis.intent)) analysis.intent = "low";
      // Resolve email
      const emailRegex = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;
      const allVisitorText = msgs.filter((m) => m.role === "visitor").map((m) => m.content).join(" ");
      const extractedEmail = analysis.extractedEmail || (allVisitorText.match(emailRegex)?.[0] ?? null);
      const resolvedEmail = sess.visitorEmail || extractedEmail;
      const resolvedName = sess.visitorName || "";
      let contactCaptured = false;
      if (resolvedEmail) {
        try {
          await qlPool.query(
            `INSERT INTO "chatLeads" (name, email, "sessionId", "businessType", question, page, notified, intent, "ghlContactId")
             VALUES ($1,$2,$3,$4,$5,$6,'no',$7,NULL)
             ON CONFLICT DO NOTHING`,
            [
              resolvedName,
              resolvedEmail,
              qlSessionId,
              analysis.businessType || sess.businessType || "",
              analysis.painPoint ?? null,
              null,
              analysis.intent
            ]
          );
          contactCaptured = true;
          // Sync to GHL for hot/warm
          if (QL_GHL_KEY && (analysis.intent === "hot" || analysis.intent === "warm")) {
            try {
              const nameParts = resolvedName.trim().split(/\s+/);
              const ghlPayload = {
                firstName: nameParts[0] || "Unknown",
                lastName: nameParts.slice(1).join(" "),
                email: resolvedEmail,
                tags: [`nova-${analysis.intent}`, "nova-support"],
                customField: {
                  lead_source: "NOVA Support",
                  business_type: analysis.businessType || sess.businessType || "",
                  pain_point: analysis.painPoint || "",
                  chat_session_id: qlSessionId,
                  nova_intent: analysis.intent
                }
              };
              console.error("[QL-GHL] About to call GHL, GHL_KEY_present=" + !!QL_GHL_KEY + " email=" + resolvedEmail + " intent=" + analysis.intent);
              const ghlRes = await fetch("https://rest.gohighlevel.com/v1/contacts/", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${QL_GHL_KEY}` },
                body: JSON.stringify(ghlPayload)
              });
              console.error("[QL-GHL] Response status=" + ghlRes.status + " ok=" + ghlRes.ok);
              if (ghlRes.ok) {
                const ghlData = await ghlRes.json();
                const ghlContactId = ghlData?.contact?.id ?? null;
                if (ghlContactId) {
                  await qlPool.query(
                    `UPDATE "chatLeads" SET "ghlContactId"=$1, notified='yes' WHERE email=$2 AND "sessionId"=$3 AND "ghlContactId" IS NULL`,
                    [ghlContactId, resolvedEmail, qlSessionId]
                  );
                }
              } else {
                console.error("GHL sync failed:", ghlRes.status, await ghlRes.text());
              }
            } catch (ghlErr) {
              console.error("ghl-sync inline error:", ghlErr);
            }
          }
        } catch (insertErr) {
          console.error("chatLeads insert error:", insertErr);
          contactCaptured = false;
        }
      }
      res.status(200).json({
        intent: analysis.intent,
        businessType: analysis.businessType || sess.businessType || null,
        painPoint: analysis.painPoint ?? null,
        contactCaptured
      });
    } catch (err) {
      console.error("qualify-lead error:", err);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      if (qlPool) qlPool.end().catch(() => {});
    }
    return;
  }


  if (urlPath.startsWith("/api/trpc")) {
    const trpcPath = urlPath.replace(/^\/api\/trpc\/?/, "");
    return nodeHTTPRequestHandler({
      router: appRouter,
      createContext,
      req,
      res,
      path: trpcPath
    });
  }
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) reject(err);
      else {
        res.status(404).json({ error: "Not found" });
        resolve();
      }
    });
  });
}
export {
  handler as default
};
