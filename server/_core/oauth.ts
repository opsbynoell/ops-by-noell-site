import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { ENV } from "./env";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  // Simple password login for admin inbox — no OAuth required
  app.post("/api/admin/login", async (req: Request, res: Response) => {
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
    await db.upsertUser({
      openId: adminOpenId,
      name: "Nikki Noell",
      email: "hello@opsbynoell.com",
      loginMethod: "password",
      lastSignedIn: new Date(),
      role: "admin",
    });

    const sessionToken = await sdk.createSessionToken(adminOpenId, {
      name: "Nikki Noell",
      expiresInMs: ONE_YEAR_MS,
    });

    // Build Set-Cookie header manually to ensure it works in Vercel serverless
    // (res.cookie() can be silently dropped when Express wraps a Vercel response)
    const maxAgeSeconds = Math.floor(ONE_YEAR_MS / 1000);
    const isProduction = process.env.NODE_ENV === "production";
    const cookieValue = [
      `${COOKIE_NAME}=${sessionToken}`,
      `Max-Age=${maxAgeSeconds}`,
      `Path=/`,
      `HttpOnly`,
      `SameSite=Lax`,
      isProduction ? `Secure` : "",
    ].filter(Boolean).join("; ");
    res.setHeader("Set-Cookie", cookieValue);
    res.json({ success: true });
  });
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
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

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
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
