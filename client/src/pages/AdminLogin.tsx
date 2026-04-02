/**
 * OPS BY NOELL — Admin Login
 * Password-based login for Nikki/James. Preserves ?next= for deep link return.
 */

import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';

function getNextUrl(): string {
  if (typeof window === 'undefined') return '/admin/inbox';
  const params = new URLSearchParams(window.location.search);
  const next = params.get('next');
  // Only allow relative URLs starting with /admin to prevent open redirect
  if (next && next.startsWith('/admin')) return next;
  return '/admin/inbox';
}

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectTo] = useState(() => getNextUrl());

  // If already authed, skip straight through
  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (meQuery.data) {
      window.location.href = redirectTo;
    }
  }, [meQuery.data, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Cookie is set — redirect to destination
        window.location.href = redirectTo;
      } else {
        setError('Incorrect password.');
        setLoading(false);
      }
    } catch {
      setError('Connection error. Try again.');
      setLoading(false);
    }
  };

  // While checking existing auth, show nothing (avoids flash)
  if (meQuery.isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 24,
          height: 24,
          border: '2px solid rgba(167,139,250,0.2)',
          borderTopColor: '#0ca2a2',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }} />
        <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { to { transform: rotate(360deg); } }' }} />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0A0A0A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '360px',
      }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#0CA2A2',
            marginBottom: '0.5rem',
          }}>
            Ops by Noell
          </p>
          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#F5F0EC',
            margin: 0,
          }}>
            Admin Access
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              autoComplete="current-password"
              style={{
                width: '100%',
                backgroundColor: '#141414',
                border: `1px solid ${error ? '#FF6B6B' : '#2A2A2A'}`,
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.9375rem',
                color: '#F5F0EC',
                outline: 'none',
                boxSizing: 'border-box',
                WebkitAppearance: 'none',
              }}
              onFocus={e => { if (!error) (e.target as HTMLInputElement).style.borderColor = '#0CA2A2'; }}
              onBlur={e => { if (!error) (e.target as HTMLInputElement).style.borderColor = '#2A2A2A'; }}
            />
            {error && (
              <p style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.75rem',
                color: '#FF6B6B',
                margin: '0.375rem 0 0 0.25rem',
              }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password.trim()}
            style={{
              width: '100%',
              backgroundColor: loading || !password.trim() ? '#2A2A2A' : '#0CA2A2',
              color: loading || !password.trim() ? '#4A4440' : '#0A0A0A',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem',
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.9375rem',
              fontWeight: 700,
              cursor: loading || !password.trim() ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s ease',
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: '0.6875rem',
          color: '#3A3430',
          textAlign: 'center',
          marginTop: '1.5rem',
        }}>
          Ops by Noell internal access only
        </p>
      </div>
    </div>
  );
}

