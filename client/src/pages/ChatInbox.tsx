/**
 * OPS BY NOELL — Admin Chat Inbox
 * Fast polling + simulated Nova typing. No SSE dependency.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { getLoginUrl } from '@/const';
import { MessageSquare, Send, User, Bot, UserCheck, Circle, ArrowLeft } from 'lucide-react';

type Message = {
  id: number;
  sessionId: string;
  role: 'visitor' | 'bot' | 'human';
  content: string;
  createdAt: Date;
};

type Session = {
  id: number;
  sessionId: string;
  visitorName: string | null;
  visitorEmail: string | null;
  businessType: string | null;
  visitorIp: string | null;
  visitorLocation: string | null;
  humanTakeover: number;
  unreadCount: number;
  priority: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// ─── Deep link helpers ────────────────────────────────────────────────────────
function getSessionFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('session');
}

function setSessionInUrl(sessionId: string | null) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (sessionId) url.searchParams.set('session', sessionId);
  else url.searchParams.delete('session');
  window.history.replaceState(null, '', url.toString());
}

// ─── Nova typing simulation ───────────────────────────────────────────────────
// When a new visitor message arrives, we show "Nova is typing…" optimistically
// for a realistic 1.5–3s window, then the actual response appears via polling.
const NOVA_TYPING_DURATION_MS = 2200;

export default function ChatInbox() {
  const { user, loading } = useAuth();
  const [selectedSession, setSelectedSession] = useState<string | null>(() => getSessionFromUrl());
  const [replyText, setReplyText] = useState('');
  const [showThread, setShowThread] = useState<boolean>(() => !!getSessionFromUrl());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // ─── Nova typing simulation state ────────────────────────────────────────
  // Tracks the last visitor message count we've seen per session.
  // When count increases → show typing indicator for NOVA_TYPING_DURATION_MS.
  const prevVisitorCountRef = useRef<Record<string, number>>({});
  const [novaTypingFor, setNovaTypingFor] = useState<string | null>(null);
  const novaTypingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Prospect activity state ──────────────────────────────────────────────
  // updatedAt changes on every message. If session updated < 8s ago and last
  // message was from visitor, we show "Prospect is active…" in session list.
  // No tRPC mutation needed — purely derived from session updatedAt + DB messages.
  const [prospectActiveFor, setProspectActiveFor] = useState<string | null>(null);

  // ─── Polling: sessions every 2s, messages every 1.5s ─────────────────────
  const { data: sessions, refetch: refetchSessions } = trpc.chat.getSessions.useQuery(
    undefined,
    {
      enabled: !!user && user.role === 'admin',
      refetchInterval: 2000,
    }
  );

  const { data: messages, refetch: refetchMessages } = trpc.chat.getSessionMessages.useQuery(
    { sessionId: selectedSession! },
    {
      enabled: !!selectedSession,
      refetchInterval: 1500,
    }
  );

  const adminReply = trpc.chat.adminReply.useMutation({
    onSuccess: () => {
      setReplyText('');
      refetchMessages();
      refetchSessions();
    },
  });

  const setTakeover = trpc.chat.setTakeover.useMutation({
    onSuccess: () => {
      refetchSessions();
      refetchMessages();
    },
  });

  // ─── Nova typing simulation: trigger on new visitor message ──────────────
  useEffect(() => {
    if (!messages || !selectedSession) return;
    const visitorCount = messages.filter((m: Message) => m.role === 'visitor').length;
    const prev = prevVisitorCountRef.current[selectedSession] ?? 0;

    if (visitorCount > prev) {
      // New visitor message arrived — check if Nova hasn't replied yet
      const lastMsg = messages[messages.length - 1];
      const lastIsBotOrHuman = lastMsg?.role === 'bot' || lastMsg?.role === 'human';

      if (!lastIsBotOrHuman) {
        // Nova hasn't replied yet — show typing indicator
        setNovaTypingFor(selectedSession);
        if (novaTypingTimerRef.current) clearTimeout(novaTypingTimerRef.current);
        novaTypingTimerRef.current = setTimeout(() => {
          setNovaTypingFor(null);
        }, NOVA_TYPING_DURATION_MS);
      }
    }

    // If Nova's reply just appeared, clear typing immediately
    if (novaTypingFor === selectedSession) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.role === 'bot' || lastMsg?.role === 'human') {
        if (novaTypingTimerRef.current) clearTimeout(novaTypingTimerRef.current);
        setNovaTypingFor(null);
      }
    }

    prevVisitorCountRef.current[selectedSession] = visitorCount;
  }, [messages, selectedSession]);

  // ─── Prospect active indicator: derive from session updatedAt ────────────
  useEffect(() => {
    if (!sessions || !selectedSession) return;
    const session = sessions.find((s: Session) => s.sessionId === selectedSession);
    if (!session) return;
    const updatedAt = new Date(session.updatedAt).getTime();
    const ageMs = Date.now() - updatedAt;
    // Show "active" if session updated within last 8 seconds
    if (ageMs < 8000) {
      setProspectActiveFor(selectedSession);
      const remaining = 8000 - ageMs;
      const t = setTimeout(() => setProspectActiveFor(null), remaining);
      return () => clearTimeout(t);
    }
  }, [sessions, selectedSession]);

  // ─── URL sync ─────────────────────────────────────────────────────────────
  const selectSession = useCallback((sessionId: string | null) => {
    setSelectedSession(sessionId);
    setSessionInUrl(sessionId);
    if (sessionId) setShowThread(true);
  }, []);

  useEffect(() => {
    const urlSession = getSessionFromUrl();
    if (urlSession && sessions && !sessions.find((s: Session) => s.sessionId === urlSession)) {
      setSessionInUrl(null);
      setSelectedSession(null);
    }
  }, [sessions]);

  // ─── Auto-scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, novaTypingFor]);

  // ─── Mobile width ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#868583', fontFamily: "'Sora', sans-serif" }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (user.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#F5F0EC', fontFamily: "'Sora', sans-serif", textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Access Denied</p>
          <p style={{ color: '#868583', fontSize: '0.875rem' }}>Admin access required.</p>
        </div>
      </div>
    );
  }

  const selectedSessionData = sessions?.find((s: Session) => s.sessionId === selectedSession);
  const totalUnread = sessions?.reduce((sum: number, s: Session) => sum + s.unreadCount, 0) ?? 0;

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedSession) return;
    adminReply.mutate({ sessionId: selectedSession, message: replyText.trim() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  const isMobileView = windowWidth < 768;
  const showList = !isMobileView || !showThread;
  const showThreadPanel = !isMobileView || showThread;

  // Show Nova typing if: indicator is active AND last message isn't already a bot reply
  const lastMsg = messages?.[messages.length - 1];
  const showNovaTyping =
    novaTypingFor === selectedSession &&
    !selectedSessionData?.humanTakeover &&
    lastMsg?.role !== 'bot';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', display: 'flex', flexDirection: 'column' }}>
      {/* CSS keyframes */}
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.85) } 50% { opacity: 1; transform: scale(1.1) } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      {/* Header */}
      <div style={{
        backgroundColor: '#141414',
        borderBottom: '1px solid #2A2A2A',
        padding: '0.875rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          {isMobileView && showThread && (
            <button
              onClick={() => { setShowThread(false); selectSession(null); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A78BFA', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <MessageSquare size={18} color="#A78BFA" />
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: '#F5F0EC', fontSize: '0.9375rem' }}>
            {isMobileView && showThread && selectedSessionData
              ? (selectedSessionData.visitorName ?? 'Visitor')
              : 'Nova Chat Inbox'}
          </span>
          {totalUnread > 0 && (
            <span style={{
              backgroundColor: '#A78BFA',
              color: '#0A0A0A',
              borderRadius: '999px',
              padding: '0.125rem 0.45rem',
              fontSize: '0.625rem',
              fontWeight: 700,
              fontFamily: "'Sora', sans-serif",
            }}>
              {totalUnread}
            </span>
          )}
        </div>
        <a href="/" style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: '#868583', textDecoration: 'none' }}>
          ← Site
        </a>
      </div>

      {/* Main layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', height: 'calc(100vh - 52px)' }}>

        {/* Session list */}
        {showList && (
          <div style={{
            width: isMobileView ? '100%' : '300px',
            flexShrink: 0,
            borderRight: isMobileView ? 'none' : '1px solid #2A2A2A',
            overflowY: 'auto',
            backgroundColor: '#0F0F0F',
            WebkitOverflowScrolling: 'touch',
          }}>
            {!sessions || sessions.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#868583', fontFamily: "'Sora', sans-serif", fontSize: '0.875rem' }}>
                No conversations yet.
              </div>
            ) : (
              sessions.map((session: Session) => {
                const isActive = prospectActiveFor === session.sessionId;
                return (
                  <div
                    key={session.sessionId}
                    onClick={() => selectSession(session.sessionId)}
                    style={{
                      padding: '0.875rem 1rem',
                      borderBottom: '1px solid #1A1A1A',
                      cursor: 'pointer',
                      backgroundColor: selectedSession === session.sessionId ? '#1A1A1A' : 'transparent',
                      transition: 'background-color 0.15s ease',
                      minHeight: '60px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0 }}>
                        {session.humanTakeover ? (
                          <UserCheck size={13} color="#A78BFA" style={{ flexShrink: 0 }} />
                        ) : (
                          <Bot size={13} color="#868583" style={{ flexShrink: 0 }} />
                        )}
                        <span style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: '#F5F0EC',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {session.visitorName ?? 'Anonymous'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                        {session.priority === 'hot' && (
                          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.5rem', fontWeight: 700, color: '#FF6B6B', backgroundColor: 'rgba(255,107,107,0.12)', borderRadius: '999px', padding: '0.1rem 0.375rem', letterSpacing: '0.06em' }}>HOT</span>
                        )}
                        {session.humanTakeover ? (
                          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.5625rem', color: '#A78BFA', fontWeight: 600 }}>YOU</span>
                        ) : null}
                        {session.unreadCount > 0 && (
                          <Circle size={7} fill="#A78BFA" color="#A78BFA" />
                        )}
                      </div>
                    </div>
                    {session.visitorEmail && (
                      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', color: '#868583', margin: '0 0 0.1rem 0' }}>
                        {session.visitorEmail}
                      </p>
                    )}
                    {session.businessType && (
                      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', color: '#5A5450', margin: 0 }}>
                        {session.businessType}
                      </p>
                    )}
                    {/* Prospect active pulse */}
                    {isActive && (
                      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.5625rem', color: '#6EE7B7', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#6EE7B7', display: 'inline-block', animation: 'pulse 1.2s ease-in-out infinite' }} />
                        active
                      </p>
                    )}
                    {!isActive && (
                      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.5625rem', color: '#3A3430', marginTop: '0.3rem' }}>
                        {new Date(session.updatedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Message thread */}
        {showThreadPanel && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', width: isMobileView ? '100%' : 'auto' }}>
            {!selectedSession ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                <MessageSquare size={36} color="#2A2A2A" />
                <p style={{ fontFamily: "'Sora', sans-serif", color: '#4A4440', fontSize: '0.875rem' }}>
                  Select a conversation
                </p>
              </div>
            ) : (
              <>
                {/* Thread header */}
                <div style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #2A2A2A',
                  backgroundColor: '#141414',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                }}>
                  <div style={{ minWidth: 0, flex: 1, marginRight: '0.5rem' }}>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, color: '#F5F0EC', fontSize: '0.8125rem', margin: 0 }}>
                      {selectedSessionData?.visitorName ?? 'Anonymous'}
                    </p>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.625rem', color: '#868583', margin: '0.125rem 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {selectedSessionData?.visitorEmail ?? 'No email'}
                      {selectedSessionData?.businessType ? ` · ${selectedSessionData.businessType}` : ''}
                      {selectedSessionData?.visitorLocation ? ` · 📍 ${selectedSessionData.visitorLocation}` : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => setTakeover.mutate({
                      sessionId: selectedSession,
                      active: !selectedSessionData?.humanTakeover,
                    })}
                    style={{
                      backgroundColor: selectedSessionData?.humanTakeover ? '#A78BFA' : '#2A2A2A',
                      color: selectedSessionData?.humanTakeover ? '#0A0A0A' : '#F5F0EC',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 0.75rem',
                      cursor: 'pointer',
                      fontFamily: "'Sora', sans-serif",
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      flexShrink: 0,
                      minHeight: '36px',
                    }}
                  >
                    <UserCheck size={12} />
                    {selectedSessionData?.humanTakeover ? 'Hand back' : 'Take over'}
                  </button>
                </div>

                {/* Takeover banner */}
                {selectedSessionData?.humanTakeover ? (
                  <div style={{
                    background: 'linear-gradient(90deg, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.06) 100%)',
                    borderBottom: '1px solid rgba(167,139,250,0.25)',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexShrink: 0,
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A78BFA', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', color: '#A78BFA', fontWeight: 600 }}>
                      You have control
                    </span>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', color: 'rgba(167,139,250,0.5)' }}>
                      · Nova is paused
                    </span>
                  </div>
                ) : null}

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', WebkitOverflowScrolling: 'touch' }}>
                  {!messages || messages.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#4A4440', fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', marginTop: '2rem' }}>
                      No messages yet
                    </div>
                  ) : (
                    messages.map((msg: Message) => (
                      <div
                        key={msg.id}
                        style={{
                          display: 'flex',
                          justifyContent: msg.role === 'visitor' ? 'flex-start' : 'flex-end',
                          gap: '0.4rem',
                          alignItems: 'flex-end',
                          animation: 'fadeIn 0.2s ease',
                        }}
                      >
                        {msg.role === 'visitor' && (
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%',
                            backgroundColor: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <User size={12} color="#868583" />
                          </div>
                        )}
                        <div style={{
                          maxWidth: '78%',
                          backgroundColor: msg.role === 'visitor' ? '#1A1A1A' : msg.role === 'human' ? '#A78BFA' : '#2A2A2A',
                          borderRadius: msg.role === 'visitor' ? '12px 12px 12px 3px' : '12px 12px 3px 12px',
                          padding: '0.5rem 0.75rem',
                        }}>
                          {msg.role !== 'visitor' && (
                            <p style={{
                              fontFamily: "'Sora', sans-serif",
                              fontSize: '0.5rem',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: msg.role === 'human' ? 'rgba(10,10,10,0.6)' : '#868583',
                              marginBottom: '0.2rem',
                            }}>
                              {msg.role === 'human' ? 'You' : 'Nova'}
                            </p>
                          )}
                          <p style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: '0.8125rem',
                            color: msg.role === 'human' ? '#0A0A0A' : '#F5F0EC',
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap',
                            margin: 0,
                          }}>
                            {msg.content}
                          </p>
                          <p style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: '0.5rem',
                            color: msg.role === 'human' ? 'rgba(10,10,10,0.4)' : '#3A3430',
                            marginTop: '0.2rem',
                            textAlign: 'right',
                          }}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {msg.role !== 'visitor' && (
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%',
                            backgroundColor: msg.role === 'human' ? '#A78BFA' : '#2A2A2A',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            {msg.role === 'human' ? <UserCheck size={12} color="#0A0A0A" /> : <Bot size={12} color="#868583" />}
                          </div>
                        )}
                      </div>
                    ))
                  )}

                  {/* ── Nova typing indicator ─────────────────────────────── */}
                  {showNovaTyping && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      gap: '0.4rem',
                      animation: 'fadeIn 0.2s ease',
                    }}>
                      <div style={{
                        backgroundColor: '#2A2A2A',
                        borderRadius: '12px 12px 3px 12px',
                        padding: '0.625rem 0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}>
                        <span style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: '0.5625rem',
                          color: '#868583',
                          marginRight: '0.375rem',
                          fontStyle: 'italic',
                        }}>
                          Nova is typing
                        </span>
                        {[0, 1, 2].map(i => (
                          <div key={i} style={{
                            width: '4px', height: '4px', borderRadius: '50%',
                            backgroundColor: 'rgba(167,139,250,0.6)',
                            animation: `pulse 1.1s ease-in-out ${i * 0.18}s infinite`,
                          }} />
                        ))}
                      </div>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        backgroundColor: '#2A2A2A',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <Bot size={12} color="#868583" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Reply input */}
                <div style={{
                  borderTop: '1px solid #2A2A2A',
                  padding: '0.75rem',
                  backgroundColor: '#141414',
                  display: 'flex',
                  gap: '0.625rem',
                  alignItems: 'flex-end',
                  flexShrink: 0,
                }}>
                  <div style={{ flex: 1 }}>
                    <textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={selectedSessionData?.humanTakeover ? 'Reply as Nikki/James...' : 'Take over first, then reply...'}
                      rows={2}
                      style={{
                        width: '100%',
                        backgroundColor: '#0A0A0A',
                        border: '1px solid #2A2A2A',
                        borderRadius: '8px',
                        padding: '0.5rem 0.75rem',
                        fontFamily: "'Sora', sans-serif",
                        fontSize: '0.8125rem',
                        color: '#F5F0EC',
                        resize: 'none',
                        outline: 'none',
                        lineHeight: 1.5,
                        boxSizing: 'border-box',
                        WebkitAppearance: 'none',
                        touchAction: 'manipulation',
                      }}
                      onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#A78BFA'}
                      onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = '#2A2A2A'}
                    />
                  </div>
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim() || adminReply.isPending}
                    style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: replyText.trim() ? '#A78BFA' : '#2A2A2A',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                    aria-label="Send reply"
                  >
                    <Send size={16} color={replyText.trim() ? '#0A0A0A' : '#4A4440'} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
