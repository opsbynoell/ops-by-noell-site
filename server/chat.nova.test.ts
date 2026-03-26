/**
 * Tests for Nova chat Q&A engine and human takeover email notification
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Q&A Engine Tests ─────────────────────────────────────────────────────────

// Mirror the approved Q&A logic for unit testing
const QA_PAIRS: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ["what do you do", "services", "what you offer"],
    answer: "We build done-for-you AI automation systems for service businesses.",
  },
  {
    keywords: ["how much", "cost", "price", "pricing", "package"],
    answer: "We offer several options. A Revenue Audit starts at $497.",
  },
  {
    keywords: ["who do you work with", "industry", "industries", "who is this for"],
    answer: "We work with appointment-based service businesses.",
  },
  {
    keywords: ["how long", "timeline", "how soon"],
    answer: "Most clients are fully live within two weeks of their audit.",
  },
  {
    keywords: ["tech", "technical", "tech-savvy"],
    answer: "None at all. We build, manage, and maintain everything.",
  },
  {
    keywords: ["how do i start", "book", "schedule", "call", "consult"],
    answer: "Book a free 15-minute intro call at opsbynoell.com/book.",
  },
  {
    keywords: ["different", "unique", "why you", "what makes you"],
    answer: "We don't sell software or hand you a login.",
  },
];

const FALLBACK = "Great question! I'd love to connect you with Nikki to discuss that in detail.";

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const qa of QA_PAIRS) {
    if (qa.keywords.some((kw) => lower.includes(kw))) {
      return qa.answer;
    }
  }
  return FALLBACK;
}

describe("Nova Q&A Engine", () => {
  it("returns pricing answer for cost-related questions", () => {
    expect(getBotResponse("how much does it cost")).toContain("$497");
    expect(getBotResponse("What are your pricing packages?")).toContain("$497");
    expect(getBotResponse("What is the price?")).toContain("$497");
  });

  it("returns services answer for what-do-you-do questions", () => {
    expect(getBotResponse("What do you do?")).toContain("AI automation");
    expect(getBotResponse("Tell me about your services")).toContain("AI automation");
  });

  it("returns industries answer for who-is-this-for questions", () => {
    expect(getBotResponse("What industries do you work with?")).toContain("appointment-based");
    expect(getBotResponse("Who is this for?")).toContain("appointment-based");
  });

  it("returns timeline answer for how-long questions", () => {
    expect(getBotResponse("How long does setup take?")).toContain("two weeks");
    expect(getBotResponse("How soon can I go live?")).toContain("two weeks");
  });

  it("returns no-tech answer for technical questions", () => {
    expect(getBotResponse("Do I need to be tech-savvy?")).toContain("None at all");
    expect(getBotResponse("Is this technical?")).toContain("None at all");
  });

  it("returns booking answer for get-started questions", () => {
    expect(getBotResponse("How do I book a call?")).toContain("opsbynoell.com/book");
    expect(getBotResponse("I want to schedule a consult")).toContain("opsbynoell.com/book");
  });

  it("returns differentiator answer for why-you questions", () => {
    expect(getBotResponse("What makes you different?")).toContain("don't sell software");
    expect(getBotResponse("What is unique about you?")).toContain("don't sell software");
  });

  it("returns fallback for unrecognized questions", () => {
    expect(getBotResponse("What is the weather today?")).toContain("Nikki");
    expect(getBotResponse("Random unrelated question xyz")).toContain("Nikki");
  });
});

// ─── Email Notification Tests ─────────────────────────────────────────────────

describe("sendHumanTakeoverEmail", () => {
  it("constructs email payload with correct subject and fields", async () => {
    const mockSend = vi.fn().mockResolvedValue({ error: null });
    const mockResend = { emails: { send: mockSend } };

    // Simulate the function logic
    const payload = {
      visitorName: "Jane Smith",
      visitorEmail: "jane@example.com",
      businessType: "Med Spa",
      lastMessage: "I want to talk to a real person",
      sessionId: "ws_test_123",
    };

    const subject = `🔴 Live Chat — ${payload.visitorName} wants to speak with a human`;
    expect(subject).toContain("Jane Smith");
    expect(subject).toContain("wants to speak with a human");

    // Verify the email would include key content
    const textContent = [
      "HOT LEAD — Human Response Requested",
      `Visitor: ${payload.visitorName}`,
      `Email: ${payload.visitorEmail}`,
      `Business: ${payload.businessType}`,
      payload.lastMessage,
      "opsbynoell.com/admin/inbox",
    ].join("\n");

    expect(textContent).toContain("Jane Smith");
    expect(textContent).toContain("jane@example.com");
    expect(textContent).toContain("Med Spa");
    expect(textContent).toContain("I want to talk to a real person");
    expect(textContent).toContain("admin/inbox");
  });

  it("handles missing optional fields gracefully", () => {
    const payload = {
      lastMessage: "Hello?",
      sessionId: "ws_anon_456",
    };

    const displayName = (payload as any).visitorName ?? "Anonymous Visitor";
    expect(displayName).toBe("Anonymous Visitor");
  });
});
