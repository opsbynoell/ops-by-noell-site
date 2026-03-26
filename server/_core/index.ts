import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "path";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerTelegramWebhook, registerWebhookWithTelegram } from "../telegramBot";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // 301 redirect: non-www → www (production only)
  // Consolidates SEO authority on www.opsbynoell.com
  app.use((req, res, next) => {
    const host = req.headers.host || "";
    if (
      process.env.NODE_ENV === "production" &&
      !host.startsWith("www.") &&
      host.includes("opsbynoell.com")
    ) {
      const wwwUrl = `https://www.${host}${req.originalUrl}`;
      return res.redirect(301, wwwUrl);
    }
    next();
  });

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Telegram bot webhook
  registerTelegramWebhook(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // Serve static HTML legal pages at clean URLs (crawler-accessible, no JS required)
  app.get("/privacy-policy", (_req, res) => {
    const htmlPath = process.env.NODE_ENV === "production"
      ? path.join(import.meta.dirname, "public", "privacy-policy.html")
      : path.join(import.meta.dirname, "../..", "client", "public", "privacy-policy.html");
    res.sendFile(htmlPath);
  });
  app.get("/terms", (_req, res) => {
    const htmlPath = process.env.NODE_ENV === "production"
      ? path.join(import.meta.dirname, "public", "terms.html")
      : path.join(import.meta.dirname, "../..", "client", "public", "terms.html");
    res.sendFile(htmlPath);
  });

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    // Auto-register Telegram webhook in production using the public domain
    if (process.env.NODE_ENV === "production" && process.env.VITE_APP_ID) {
      // Derive the public URL from the app ID (Manus hosting convention)
      const appId = process.env.VITE_APP_ID;
      const publicUrl = `https://${appId}.manus.space`;
      const webhookUrl = `${publicUrl}/api/telegram/webhook`;
      registerWebhookWithTelegram(webhookUrl).catch(console.error);
    }
  });
}

startServer().catch(console.error);
