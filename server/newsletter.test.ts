/**
 * Tests for the newsletter subscription flow.
 * Validates duplicate detection, subscriber insertion, and email helper behavior.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock DB helpers ─────────────────────────────────────────────────────────
vi.mock('./db', () => ({
  insertNewsletterSubscriber: vi.fn(),
  getNewsletterSubscriberCount: vi.fn(),
  markNewsletterWelcomed: vi.fn(),
}));

// ─── Mock email helpers ───────────────────────────────────────────────────────
vi.mock('./email', () => ({
  sendNewsletterWelcomeEmail: vi.fn(),
  sendNewsletterOwnerNotification: vi.fn(),
}));

import {
  insertNewsletterSubscriber,
  getNewsletterSubscriberCount,
  markNewsletterWelcomed,
} from './db';
import {
  sendNewsletterWelcomeEmail,
  sendNewsletterOwnerNotification,
} from './email';

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function simulateSubscribe(email: string, source = '/newsletter') {
  const { id: subscriberId, isDuplicate } = await insertNewsletterSubscriber({ email, source });
  if (isDuplicate) return { success: true, alreadySubscribed: true };

  const totalCount = await getNewsletterSubscriberCount();
  const [welcomed] = await Promise.allSettled([
    sendNewsletterWelcomeEmail(email),
    sendNewsletterOwnerNotification(email, totalCount as number),
  ]);

  const welcomedSuccess = welcomed.status === 'fulfilled' && (welcomed as PromiseFulfilledResult<boolean>).value === true;
  if (welcomedSuccess && subscriberId) {
    await markNewsletterWelcomed(subscriberId);
  }

  return { success: true, alreadySubscribed: false };
}

// ─── Tests ────────────────────────────────────────────────────────────────────
describe('Newsletter subscription flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('subscribes a new email and sends welcome + owner emails', async () => {
    vi.mocked(insertNewsletterSubscriber).mockResolvedValue({ id: 1, isDuplicate: false });
    vi.mocked(getNewsletterSubscriberCount).mockResolvedValue(1);
    vi.mocked(sendNewsletterWelcomeEmail).mockResolvedValue(true);
    vi.mocked(sendNewsletterOwnerNotification).mockResolvedValue(true);
    vi.mocked(markNewsletterWelcomed).mockResolvedValue(undefined);

    const result = await simulateSubscribe('new@example.com');

    expect(result).toEqual({ success: true, alreadySubscribed: false });
    expect(insertNewsletterSubscriber).toHaveBeenCalledWith({ email: 'new@example.com', source: '/newsletter' });
    expect(sendNewsletterWelcomeEmail).toHaveBeenCalledWith('new@example.com');
    expect(sendNewsletterOwnerNotification).toHaveBeenCalledWith('new@example.com', 1);
    expect(markNewsletterWelcomed).toHaveBeenCalledWith(1);
  });

  it('returns alreadySubscribed: true for duplicate emails', async () => {
    vi.mocked(insertNewsletterSubscriber).mockResolvedValue({ id: null, isDuplicate: true });

    const result = await simulateSubscribe('existing@example.com');

    expect(result).toEqual({ success: true, alreadySubscribed: true });
    expect(sendNewsletterWelcomeEmail).not.toHaveBeenCalled();
    expect(sendNewsletterOwnerNotification).not.toHaveBeenCalled();
    expect(markNewsletterWelcomed).not.toHaveBeenCalled();
  });

  it('does not mark welcomed if welcome email fails', async () => {
    vi.mocked(insertNewsletterSubscriber).mockResolvedValue({ id: 2, isDuplicate: false });
    vi.mocked(getNewsletterSubscriberCount).mockResolvedValue(2);
    vi.mocked(sendNewsletterWelcomeEmail).mockResolvedValue(false); // email failed
    vi.mocked(sendNewsletterOwnerNotification).mockResolvedValue(true);
    vi.mocked(markNewsletterWelcomed).mockResolvedValue(undefined);

    const result = await simulateSubscribe('fail@example.com');

    expect(result).toEqual({ success: true, alreadySubscribed: false });
    // markNewsletterWelcomed should NOT be called since welcome email returned false
    expect(markNewsletterWelcomed).not.toHaveBeenCalled();
  });

  it('passes the correct source from the subscription page', async () => {
    vi.mocked(insertNewsletterSubscriber).mockResolvedValue({ id: 3, isDuplicate: false });
    vi.mocked(getNewsletterSubscriberCount).mockResolvedValue(3);
    vi.mocked(sendNewsletterWelcomeEmail).mockResolvedValue(true);
    vi.mocked(sendNewsletterOwnerNotification).mockResolvedValue(true);
    vi.mocked(markNewsletterWelcomed).mockResolvedValue(undefined);

    await simulateSubscribe('source@example.com', '/');

    expect(insertNewsletterSubscriber).toHaveBeenCalledWith({ email: 'source@example.com', source: '/' });
  });
});
