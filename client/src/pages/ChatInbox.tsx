/**
 * OPS BY NOELL — Admin Chat Inbox
 * View all website chat conversations and reply as Nova (human takeover)
 */

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { getLoginUrl } from '@/const';
import { MessageSquare, Send, User, Bot, UserCheck, RefreshCw, Circle } from 'lucide-react';

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

export default function ChatInbox() {
  const { user, loading } = useAuth();
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: sessions, refetch: refetchSessions, isLoading: sessionsLoading } = trpc.chat.getSessions.useQuery(
    undefined,
    { enabled: !!user && user.role === 'admin', refetchInterval: 10000 }
  );

  const { data: messages, refetch: refetchMessages } = trpc.chat.getSessionMessages.useQuery(
    { sessionId: selectedSession! },
    { enabled: !!selectedSession, refetchInterval: 5000 }
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#8A8480', fontFamily: "'Inter', sans-serif" }}>Loading...</div>
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
        <div style={{ color: '#F5F0EB', fontFamily: "'Inter', sans-serif", textAlign: 'center' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Access Denied</p>
          <p style={{ color: '#8A8480', fontSize: '0.875rem' }}>Admin access required.</p>
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#141414',
        borderBottom: '1px solid #2A2A2A',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <MessageSquare size={20} color="#A78BFA" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: '#F5F0EB', fontSize: '1rem' }}>
            Nova Chat Inbox
          </span>
          {totalUnread > 0 && (
            <span style={{
              backgroundColor: '#A78BFA',
              color: '#0A0A0A',
              borderRadius: '999px',
              padding: '0.125rem 0.5rem',
              fontSize: '0.6875rem',
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
            }}>
              {totalUnread} unread
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => { refetchSessions(); if (selectedSession) refetchMessages(); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A8480', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <RefreshCw size={14} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem' }}>Refresh</span>
          </button>
          <a href="/" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#8A8480', textDecoration: 'none' }}>
            ← Back to site
          </a>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', height: 'calc(100vh - 60px)' }}>
        {/* Session list */}
        <div style={{
          width: '300px',
          flexShrink: 0,
          borderRight: '1px solid #2A2A2A',
          overflowY: 'auto',
          backgroundColor: '#0F0F0F',
        }}>
          {sessionsLoading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8A8480', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>
              Loading sessions...
            </div>
          ) : !sessions || sessions.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#8A8480', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem' }}>
              No conversations yet.<br />
              <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Chats from the website widget will appear here.</span>
            </div>
          ) : (
            sessions.map((session: Session) => (
              <div
                key={session.sessionId}
                onClick={() => setSelectedSession(session.sessionId)}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid #1A1A1A',
                  cursor: 'pointer',
                  backgroundColor: selectedSession === session.sessionId ? '#1A1A1A' : 'transparent',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (selectedSession !== session.sessionId)
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = '#141414';
                }}
                onMouseLeave={e => {
                  if (selectedSession !== session.sessionId)
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {session.humanTakeover ? (
                      <UserCheck size={14} color="#A78BFA" />
                    ) : (
                      <Bot size={14} color="#8A8480" />
                    )}
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: '#F5F0EB',
                    }}>
                      {session.visitorName ?? 'Anonymous Visitor'}
                    </span>
                  </div>
                  {session.unreadCount > 0 && (
                    <Circle size={8} fill="#A78BFA" color="#A78BFA" />
                  )}
                </div>
                {session.visitorEmail && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#8A8480', marginBottom: '0.125rem' }}>
                    {session.visitorEmail}
                  </p>
                )}
                {session.businessType && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#6A6460' }}>
                    {session.businessType}
                  </p>
                )}
                {session.visitorLocation && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#5A5450', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    📍 {session.visitorLocation}
                  </p>
                )}
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', color: '#4A4440', marginTop: '0.375rem' }}>
                  {new Date(session.updatedAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message thread */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {!selectedSession ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
              <MessageSquare size={40} color="#2A2A2A" />
              <p style={{ fontFamily: "'Inter', sans-serif", color: '#4A4440', fontSize: '0.875rem' }}>
                Select a conversation to view messages
              </p>
            </div>
          ) : (
            <>
              {/* Thread header */}
              <div style={{
                padding: '0.875rem 1.25rem',
                borderBottom: '1px solid #2A2A2A',
                backgroundColor: '#141414',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: '#F5F0EB', fontSize: '0.875rem' }}>
                    {selectedSessionData?.visitorName ?? 'Anonymous Visitor'}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#8A8480' }}>
                    {selectedSessionData?.visitorEmail ?? 'No email'} · {selectedSessionData?.businessType ?? 'Business type unknown'}
                    {selectedSessionData?.visitorLocation && (
                      <span style={{ marginLeft: '0.5rem', color: '#5A5450' }}>· 📍 {selectedSessionData.visitorLocation}</span>
                    )}
                    {selectedSessionData?.visitorIp && (
                      <span style={{ marginLeft: '0.5rem', color: '#3A3430', fontSize: '0.625rem' }}>({selectedSessionData.visitorIp})</span>
                    )}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.6875rem',
                    color: selectedSessionData?.humanTakeover ? '#A78BFA' : '#8A8480',
                  }}>
                    {selectedSessionData?.humanTakeover ? 'Human takeover ON' : 'Bot mode'}
                  </span>
                  <button
                    onClick={() => setTakeover.mutate({
                      sessionId: selectedSession,
                      active: !selectedSessionData?.humanTakeover,
                    })}
                    style={{
                      backgroundColor: selectedSessionData?.humanTakeover ? '#A78BFA' : '#2A2A2A',
                      color: selectedSessionData?.humanTakeover ? '#0A0A0A' : '#F5F0EB',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.375rem 0.75rem',
                      cursor: 'pointer',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                    }}
                  >
                    <UserCheck size={12} />
                    {selectedSessionData?.humanTakeover ? 'Hand back to bot' : 'Take over'}
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {!messages || messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#4A4440', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', marginTop: '2rem' }}>
                    No messages yet
                  </div>
                ) : (
                  messages.map((msg: Message) => (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        justifyContent: msg.role === 'visitor' ? 'flex-start' : 'flex-end',
                        gap: '0.5rem',
                        alignItems: 'flex-end',
                      }}
                    >
                      {msg.role === 'visitor' && (
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          backgroundColor: '#2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <User size={14} color="#8A8480" />
                        </div>
                      )}
                      <div style={{
                        maxWidth: '70%',
                        backgroundColor: msg.role === 'visitor' ? '#1A1A1A' : msg.role === 'human' ? '#A78BFA' : '#2A2A2A',
                        borderRadius: msg.role === 'visitor' ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
                        padding: '0.625rem 0.875rem',
                      }}>
                        {msg.role !== 'visitor' && (
                          <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.5625rem',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: msg.role === 'human' ? '#0A0A0A' : '#8A8480',
                            marginBottom: '0.25rem',
                          }}>
                            {msg.role === 'human' ? 'You (Nova)' : 'Nova Bot'}
                          </p>
                        )}
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.8125rem',
                          color: msg.role === 'human' ? '#0A0A0A' : '#F5F0EB',
                          lineHeight: 1.5,
                          whiteSpace: 'pre-wrap',
                        }}>
                          {msg.content}
                        </p>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.5625rem',
                          color: msg.role === 'human' ? 'rgba(10,10,10,0.5)' : '#4A4440',
                          marginTop: '0.25rem',
                          textAlign: 'right',
                        }}>
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      {msg.role !== 'visitor' && (
                        <div style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          backgroundColor: msg.role === 'human' ? '#A78BFA' : '#2A2A2A',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          {msg.role === 'human' ? <UserCheck size={14} color="#0A0A0A" /> : <Bot size={14} color="#8A8480" />}
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
                padding: '0.875rem 1.25rem',
                backgroundColor: '#141414',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-end',
              }}>
                <div style={{ flex: 1 }}>
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Reply as Nova (human)... Press Enter to send, Shift+Enter for new line"
                    rows={2}
                    style={{
                      width: '100%',
                      backgroundColor: '#0A0A0A',
                      border: '1px solid #2A2A2A',
                      borderRadius: '8px',
                      padding: '0.625rem 0.875rem',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8125rem',
                      color: '#F5F0EB',
                      resize: 'none',
                      outline: 'none',
                      lineHeight: 1.5,
                    }}
                    onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#A78BFA'}
                    onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = '#2A2A2A'}
                  />
                </div>
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim() || adminReply.isPending}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: replyText.trim() ? '#A78BFA' : '#2A2A2A',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background-color 0.2s ease',
                  }}
                  aria-label="Send reply"
                >
                  <Send size={16} color={replyText.trim() ? '#0A0A0A' : '#4A4440'} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
