/**
 * OPS BY NOELL — Admin Chat Inbox
 * Phases 2–4: SSE real-time, deep linking, mobile-responsive UI
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
  createdAt: Date;
  updatedAt: Date;
};

// ─── Deep link: parse ?session=ID from URL ────────────────────────────────────
function getSessionFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('session');
}

function setSessionInUrl(sessionId: string | null) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (sessionId) {
    url.searchParams.set('session', sessionId);
  } else {
    url.searchParams.delete('session');
  }
  window.history.replaceState(null, '', url.toString());
}

export default function ChatInbox() {
  const { user, loading } = useAuth();
  const [selectedSession, setSelectedSession] = useState<string | null>(() => getSessionFromUrl());
  const [replyText, setReplyText] = useState('');
  const [showThread, setShowThread] = useState<boolean>(() => !!getSessionFromUrl());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // ─── Data fetching (with fallback polling) ────────────────────────────────
  const { data: sessions, refetch: refetchSessions } = trpc.chat.getSessions.useQuery(
    undefined,
    {
      enabled: !!user && user.role === 'admin',
      refetchInterval: 30000, // fallback: 30s polling (SSE handles real-time)
    }
  );

  const { data: messages, refetch: refetchMessages } = trpc.chat.getSessionMessages.useQuery(
    { sessionId: selectedSession! },
    {
      enabled: !!selectedSession,
      refetchInterval: 15000, // fallback polling
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
    },
  });

  // ─── Phase 2: SSE real-time updates ───────────────────────────────────────
  useEffect(() => {
    if (!user || user.role !== 'admin') return;

    let es: EventSource | null = null;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;

    function connect() {
      es = new EventSource('/api/chat-sse');

      es.addEventListener('new_message', (e: MessageEvent) => {
        const payload = JSON.parse(e.data);
        // If this message belongs to the active thread, refetch messages
        if (payload.sessionId === selectedSession) {
          refetchMessages();
        }
        // Always refetch sessions list for unread count + ordering
        refetchSessions();
      });

      es.addEventListener('session_updated', (e: MessageEvent) => {
        refetchSessions();
        const payload = JSON.parse(e.data);
        if (payload.sessionId === selectedSession) {
          refetchMessages();
        }
      });

      es.onerror = () => {
        es?.close();
        // Reconnect after 3s
        retryTimeout = setTimeout(connect, 3000);
      };
    }

    connect();

    return () => {
      es?.close();
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [user, selectedSession, refetchMessages, refetchSessions]);

  // ─── Phase 3: Sync selected session to/from URL ───────────────────────────
  const selectSession = useCallback((sessionId: string | null) => {
    setSelectedSession(sessionId);
    setSessionInUrl(sessionId);
    if (sessionId) setShowThread(true);
  }, []);

  // On load, if URL has a session param, verify it exists after sessions load
  useEffect(() => {
    const urlSession = getSessionFromUrl();
    if (urlSession && sessions && !sessions.find((s: Session) => s.sessionId === urlSession)) {
      // Session not found — clear URL param
      setSessionInUrl(null);
      setSelectedSession(null);
    }
  }, [sessions]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  // ─── Phase 4: Mobile — detect screen width reactively ────────────────────
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  const isMobileView = windowWidth < 768;

  // On mobile: show either list or thread, not both
  // On desktop: show both side by side
  const showList = !isMobileView || !showThread;
  const showThreadPanel = !isMobileView || showThread;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', display: 'flex', flexDirection: 'column' }}>
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
          {/* Mobile: back button when in thread view */}
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
              sessions.map((session: Session) => (
                <div
                  key={session.sessionId}
                  onClick={() => selectSession(session.sessionId)}
                  style={{
                    padding: '0.875rem 1rem',
                    borderBottom: '1px solid #1A1A1A',
                    cursor: 'pointer',
                    backgroundColor: selectedSession === session.sessionId ? '#1A1A1A' : 'transparent',
                    transition: 'background-color 0.15s ease',
                    minHeight: '60px', // better tap target on mobile
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
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.5625rem', color: '#3A3430', marginTop: '0.3rem' }}>
                    {new Date(session.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))
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
                  {/* Takeover toggle — prominent on mobile */}
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
                      minHeight: '36px', // better mobile tap target
                    }}
                  >
                    <UserCheck size={12} />
                    {selectedSessionData?.humanTakeover ? 'Hand back' : 'Take over'}
                  </button>
                </div>

                {/* Takeover status banner */}
                {selectedSessionData?.humanTakeover ? (
                  <div style={{
                    backgroundColor: 'rgba(167,139,250,0.1)',
                    borderBottom: '1px solid rgba(167,139,250,0.2)',
                    padding: '0.5rem 1rem',
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '0.6875rem',
                    color: '#A78BFA',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}>
                    Human takeover active — AI is paused. You are replying as Nova.
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
                              {msg.role === 'human' ? 'You (Nova)' : 'Nova Bot'}
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
