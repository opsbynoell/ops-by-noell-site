import { describe, it, expect } from "vitest";

describe("Telegram Bot Token Validation", () => {
  it("should have TELEGRAM_BOT_TOKEN set in environment", () => {
    expect(process.env.TELEGRAM_BOT_TOKEN).toBeTruthy();
  });

  it("should successfully call Telegram getMe API with the configured token", async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error("TELEGRAM_BOT_TOKEN is not set");
    }

    const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const data = await res.json() as { ok: boolean; result?: { username?: string; first_name?: string } };

    expect(res.ok).toBe(true);
    expect(data.ok).toBe(true);
    expect(data.result).toBeDefined();
    console.log(`[Test] Bot verified: @${data.result?.username} (${data.result?.first_name})`);
  }, 10000);
});
