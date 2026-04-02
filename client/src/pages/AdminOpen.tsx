/**
 * OPS BY NOELL — Mobile-safe deep link handler
 *
 * Route: /admin/open?session=SESSION_ID
 *
 * Behavior:
 *   - Authenticated admin  → redirect to /admin/inbox?session=SESSION_ID
 *   - Not authenticated    → redirect to /admin/login?next=/admin/inbox?session=SESSION_ID
 *
 * This is the URL used in all Telegram alerts. It handles the case where
 * Telegram's in-app browser has no auth cookie — instead of looping on the
 * inbox page, we land here first, check auth, then route correctly.
 */

import { useEffect } from 'react';
import { trpc } from '@/lib/trpc';

function getSessionParam(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('session');
}

export default function AdminOpen() {
  const sessionId = getSessionParam();

  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // Wait until we know auth state
    if (meQuery.isLoading) return;

    const inboxUrl = sessionId
      ? `/admin/inbox?session=${encodeURIComponent(sessionId)}`
      : '/admin/inbox';

    if (meQuery.data) {
      // Authenticated — go straight to the conversation
      window.location.replace(inboxUrl);
    } else {
      // Not authenticated — send to login, preserving the inbox destination
      const next = encodeURIComponent(inboxUrl);
      window.location.replace(`/admin/login?next=${next}`);
    }
  }, [meQuery.isLoading, meQuery.data, sessionId]);

  // Show a minimal loading state while auth check runs (~200ms)
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '0.75rem',
    }}>
      <div style={{
        width: 28,
        height: 28,
        border: '2px solid rgba(167,139,250,0.2)',
        borderTopColor: '#0ca2a2',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
      <p style={{
        fontFamily: "'Sora', sans-serif",
        fontSize: '0.75rem',
        color: '#3A3430',
        margin: 0,
      }}>
        Opening conversation...
      </p>
      <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { to { transform: rotate(360deg); } }' }} />
    </div>
  );
}

