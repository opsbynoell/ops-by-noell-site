/**
 * GoHighLevel (GHL) API helper
 * Creates contacts in GHL when visitors submit forms on the website.
 *
 * Requires: GHL_API_KEY environment variable (a GHL Private Integration API key)
 * Docs: https://highlevel.stoplight.io/docs/integrations/
 */

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

function getGHLApiKey(): string | undefined {
  return process.env.GHL_API_KEY;
}

export interface GHLContactInput {
  name: string;
  email: string;
  phone: string;
  source?: string;
  tags?: string[];
}

/**
 * Create or update a contact in GoHighLevel.
 * Silently logs and returns false if the API key is not configured.
 * Uses Promise.allSettled-safe pattern — never throws.
 */
export async function createGHLContact(input: GHLContactInput): Promise<boolean> {
  const apiKey = getGHLApiKey();
  if (!apiKey) {
    console.warn("[GHL] GHL_API_KEY is not set — skipping contact creation.");
    return false;
  }

  const [firstName, ...rest] = input.name.trim().split(" ");
  const lastName = rest.join(" ") || undefined;

  const body: Record<string, unknown> = {
    firstName,
    ...(lastName ? { lastName } : {}),
    email: input.email,
    phone: input.phone,
    source: input.source ?? "Website",
    tags: input.tags ?? ["website-contact-form"],
  };

  try {
    const res = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: GHL_API_VERSION,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "(no body)");
      console.warn(`[GHL] Contact creation failed: ${res.status} ${res.statusText} — ${text}`);
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
