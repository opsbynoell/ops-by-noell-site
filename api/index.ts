import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth.js";
import { appRouter } from "../server/routers.js";
import { createContext } from "../server/_core/context.js";
import { registerTelegramWebhook } from "../server/telegramBot.js";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

registerOAuthRoutes(app);
registerTelegramWebhook(app);

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Serve privacy/terms static pages
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/privacy-policy", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/privacy-policy.html"));
});
app.get("/terms", (_req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/terms.html"));
});

export default app;
