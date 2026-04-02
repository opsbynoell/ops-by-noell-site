/*
 * OPS BY NOELL — Live Chat Widget
 * Design: Premium Dark — matches site theme (#0A0A0A / #141414 / #A78BFA)
 * Purpose: Capture leads who have questions before booking
 */

import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { MessageCircle, X, Send, ArrowRight, ChevronDown } from 'lucide-react';
import { trpc } from '@/lib/trpc';

// Generate or retrieve a stable session ID for this browser
function getSessionId(): string {
  let id = sessionStorage.getItem('nova_session_id');
  if (!id) {
    id = `ws_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('nova_session_id', id);
  }
  return id;
}

// ─── Types ───────────────────────────────────────────────────────────────────

type MessageRole = 'bot' | 'user';

interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface LeadInfo {
  name: string;
  email: string;
  businessType: string;
}

// ─── Human Handoff ───────────────────────────────────────────────────────────

const HUMAN_HANDOFF_KEYWORDS = [
  'talk to a person', 'talk to someone', 'speak to a person', 'speak to someone',
  'real person', 'human', 'speak to nikki', 'talk to nikki', 'contact you',
  'reach you', 'get in touch', 'someone call me', 'call me back',
];

function isHumanHandoffRequest(input: string): boolean {
  const lower = input.toLowerCase();
  return HUMAN_HANDOFF_KEYWORDS.some(kw => lower.includes(kw));
}

const HUMAN_HANDOFF_RESPONSE = "Of course. Let me get Nikki on this for you. She'll reach out shortly. You can also grab a time directly at opsbynoell.com/book if that's easier.";

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 14px', backgroundColor: '#1A1A1A', borderRadius: '8px', maxWidth: '60px' }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#A78BFA',
            display: 'inline-block',
            animation: `chatBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [stage, setStage] = useState<'chat'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadInfo, setLeadInfo] = useState<Partial<LeadInfo>>({});

  const [proactiveTriggered, setProactiveTriggered] = useState(false);
  // Hover tooltip
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  // Auto-open: track if visitor manually closed with X
  const [hasManuallyClosed, setHasManuallyClosed] = useState(false);
  const [autoOpenTriggered, setAutoOpenTriggered] = useState(false);

  const [location] = useLocation();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);


  const sendMessageMutation = trpc.chat.sendMessage.useMutation();
  const [sessionId] = useState(() => getSessionId());
  const [lastHumanCount, setLastHumanCount] = useState(0);

  // Poll for human replies every 5 seconds when chat is open
  const { data: serverMessages } = trpc.chat.getMessages.useQuery(
    { sessionId },
    { enabled: isOpen, refetchInterval: 5000 }
  );

  // Sync human replies from server into local messages
  useEffect(() => {
    if (!serverMessages || serverMessages.length === 0) return;
    const humanMsgs = serverMessages.filter((m: { role: string }) => m.role === 'human');
    if (humanMsgs.length > lastHumanCount) {
      const newMsgs = humanMsgs.slice(lastHumanCount);
      setLastHumanCount(humanMsgs.length);
      newMsgs.forEach((m: { id: number; content: string; createdAt: Date }) => {
        setMessages(prev => {
          const exists = prev.some(p => p.id === `human_${m.id}`);
          if (exists) return prev;
          return [...prev, {
            id: `human_${m.id}`,
            role: 'bot' as const,
            text: m.content,
            timestamp: new Date(m.createdAt),
          }];
        });
      });
    }
  }, [serverMessages, lastHumanCount]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setHasUnread(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Proactive trigger: auto-open on /services and /book after 45s (once per session)
  useEffect(() => {
    const sessionKey = `nova_proactive_${location}`;
    if (proactiveTriggered) return;
    if (sessionStorage.getItem(sessionKey)) return;

    const proactiveMessages: Record<string, string> = {
      '/services': `Hey! Trying to figure out which plan makes sense for your business? Happy to help you think it through. What type of business do you run?`,
      '/book': `Hey! If you have any questions before booking, I'm here. Nikki will walk you through exactly where your revenue gaps are on the call. Anything I can answer first?`,
      '/nova': `You're checking out Nova — want to see what I'd actually say to someone landing on your business's website? Tell me what kind of business you run.`,
    };

    const message = proactiveMessages[location];
    if (!message) return;

    const timer = setTimeout(() => {
      if (isOpen) return; // don't interrupt if already open
      sessionStorage.setItem(sessionKey, '1');
      setProactiveTriggered(true);
      setIsOpen(true);
      setHasUnread(false);
      setMessages([{
        id: 'proactive_1',
        role: 'bot',
        text: message,
        timestamp: new Date(),
      }]);
    }, 45000);

    return () => clearTimeout(timer);
  }, [location, isOpen, proactiveTriggered]);

  // Auto-open after 45 seconds if all conditions are met
  useEffect(() => {
    if (autoOpenTriggered) return;
    if (hasManuallyClosed) return;
    if (hasOpenedOnce) return;
    if (sessionStorage.getItem('nova_auto_opened')) return;

    const timer = setTimeout(() => {
      // Re-check at fire time (isOpen could have changed)
      setIsOpen(currentlyOpen => {
        if (currentlyOpen) return currentlyOpen; // already open, skip
        setAutoOpenTriggered(true);
        sessionStorage.setItem('nova_auto_opened', '1');
        setHasOpenedOnce(true);
        setHasUnread(false);
        setMessages([{
          id: 'auto_open_1',
          role: 'bot',
          text: `Hey! Quick question — is there something specific going on in your business right now that brought you here, or are you still figuring out if this is the right fit?`,
          timestamp: new Date(),
        }]);
        return true;
      });
    }, 45000);

    return () => clearTimeout(timer);
  }, [autoOpenTriggered, hasManuallyClosed, hasOpenedOnce]);

  // Outside-click: only collapse if the visitor has NOT yet sent a message.
  // Once hasEngaged is true, the widget stays open until the X button is clicked.
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (!isOpen) return;
      const target = e.target as Node;
      const clickedInsidePanel = panelRef.current?.contains(target);
      const clickedToggle = toggleRef.current?.contains(target);
      if (!clickedInsidePanel && !clickedToggle) {
        const engaged = messages.some(m => m.role === 'user');
        if (!engaged) {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, messages]);

  function openChat() {
    setIsOpen(true);
    setHasUnread(false);
    setHasOpenedOnce(true);
    setAutoOpenTriggered(true); // prevent auto-open from firing if visitor opens manually first
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'bot',
        text: `Hey! Quick question — is there something specific going on in your business right now that brought you here, or are you still figuring out if this is the right fit?`,
        timestamp: new Date(),
      }]);
    }
  }

  function addBotMessage(text: string) {
    const id = Date.now().toString();
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id, role: 'bot', text, timestamp: new Date() }]);
    }, 1200 + Math.random() * 600);
  }





  function handleSendMessage() {
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date(),
    }]);

    // Detect human handoff request
    if (isHumanHandoffRequest(text)) {
      addBotMessage(HUMAN_HANDOFF_RESPONSE);
      sendMessageMutation.mutate({
        sessionId,
        message: `[HUMAN HANDOFF REQUEST] ${text}`,
        visitorName: leadInfo.name,
        visitorEmail: leadInfo.email,
        businessType: leadInfo.businessType,
        page: typeof window !== 'undefined' ? window.location.pathname : undefined,
      });
      return;
    }

    // All messages go through backend Claude
    sendMessageMutation.mutate(
      {
        sessionId,
        message: text,
        visitorName: leadInfo.name,
        visitorEmail: leadInfo.email,
        businessType: leadInfo.businessType,
        page: typeof window !== 'undefined' ? window.location.pathname : undefined,
      },
      {
        onSuccess: (data) => {
          if (!data.humanTakeover && data.botReply) {
            const id = Date.now().toString();
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages(prev => [...prev, { id, role: 'bot', text: data.botReply!, timestamp: new Date() }]);
            }, 1000 + Math.random() * 500);
          }
          // If humanTakeover, the polling will pick up the human reply
        },
        onError: () => {
          // If backend fails, show a graceful error
          addBotMessage("I'm having trouble connecting right now. You can reach Nikki directly at hello@opsbynoell.com or book a time at opsbynoell.com/book.");
        },
      }
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }

  function scrollToBooking() {
    setIsOpen(false);
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/book';
    }
  }


  // Once a visitor has sent at least one message, only the X button can close the widget.
  // Clicking the floating toggle or outside the panel should not collapse it.
  const hasEngaged = messages.some(m => m.role === 'user');

  return (
    <>
      {/* ─── Floating Button ─── */}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.75rem',
        }}
      >
        {/* Greeting bubble */}
        {hasUnread && !isOpen && (
          <div
            style={{
              backgroundColor: '#141414',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#2A2A2A',
              padding: '0.875rem 1rem',
              maxWidth: '220px',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              animation: 'chatFadeIn 0.4s ease-out',
              cursor: 'pointer',
            }}
            onClick={openChat}
          >
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.8125rem',
              color: '#F5F0EC',
              lineHeight: 1.5,
              marginBottom: '0.375rem',
            }}>
              Have a question? I'm Nova, ask me anything.
            </p>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.75rem',
              color: '#A78BFA',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}>
              Ask a question <ArrowRight size={11} />
            </p>
          </div>
        )}

        {/* Hover tooltip — shown only before widget has been opened */}
        {isButtonHovered && !isOpen && !hasOpenedOnce && (
          <div
            style={{
              backgroundColor: '#1F1D28',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#A78BFA',
              borderRadius: '10px',
              padding: '0.625rem 0.875rem',
              maxWidth: '210px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              animation: 'chatTooltipFadeIn 0.18s ease-out',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.75rem',
              color: '#F5F0EC',
              margin: 0,
              lineHeight: 1.4,
            }}>
              Chat with Nova — usually replies instantly.
            </p>
          </div>
        )}

        {/* Chat toggle button */}
        <button
          ref={toggleRef}
          onClick={() => isOpen ? (!hasEngaged && setIsOpen(false)) : openChat()}
          style={{
            width: '52px',
            height: '52px',
            backgroundColor: '#A78BFA',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 24px rgba(167,139,250,0.35)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            position: 'relative',
          }}
          onMouseEnter={e => {
            setIsButtonHovered(true);
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 32px rgba(167,139,250,0.5)';
          }}
          onMouseLeave={e => {
            setIsButtonHovered(false);
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(167,139,250,0.35)';
          }}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen
            ? <ChevronDown size={20} color="#0A0A0A" />
            : <MessageCircle size={20} color="#0A0A0A" />
          }
          {/* Unread dot */}
          {hasUnread && !isOpen && (
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '10px',
              height: '10px',
              backgroundColor: '#FF4D4D',
              borderRadius: '50%',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: '#0A0A0A',
            }} />
          )}
        </button>
      </div>

      {/* ─── Chat Panel ─── */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          bottom: '6rem',
          right: '2rem',
          zIndex: 9998,
          width: '360px',
          maxWidth: 'calc(100vw - 2rem)',
          backgroundColor: '#0F0F0F',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#2A2A2A',
          borderRadius: '16px',
          boxShadow: '0 16px 64px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transformOrigin: 'bottom right',
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(16px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease',
          maxHeight: '520px',
        }}
      >
        {/* Header */}
        <div style={{
          backgroundColor: '#141414',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          borderBottom: '1px solid #2A2A2A',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#A78BFA',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#0A0A0A', fontWeight: 700 }}>N</span>
            </div>
            <div>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', fontWeight: 700, color: '#F5F0EC', lineHeight: 1.2 }}>
                Ops by Noell
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#868583' }}>
                Typically replies in minutes
              </p>
            </div>
          </div>
          <button
            onClick={() => { setIsOpen(false); setHasManuallyClosed(true); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#868583', display: 'flex', alignItems: 'center', borderRadius: '4px', transition: 'color 0.15s ease' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EC'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = '#868583'}
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          minHeight: 0,
          maxHeight: '320px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#2A2A2A transparent',
        }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                animation: 'chatFadeIn 0.3s ease-out',
              }}
            >
              <div style={{
                maxWidth: '82%',
                padding: '0.625rem 0.875rem',
                backgroundColor: msg.role === 'user' ? '#A78BFA' : '#1A1A1A',
                borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                borderLeft: msg.role === 'bot' ? '2px solid #2A2A2A' : 'none',
              }}>
                <p style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '0.8125rem',
                  color: msg.role === 'user' ? '#0A0A0A' : '#868583',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                  margin: 0,
                }}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'chatFadeIn 0.3s ease-out' }}>
              <TypingIndicator />
            </div>
          )}



          {/* Still need help? Talk to a person — shown after 3+ exchanges in chat stage */}
          {messages.filter(m => m.role === 'user').length >= 3 && !isTyping && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '0.25rem',
              animation: 'chatFadeIn 0.4s ease-out',
            }}>
              <button
                onClick={() => {
                  setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: 'I\'d like to talk to a person', timestamp: new Date() }]);
                  addBotMessage(HUMAN_HANDOFF_RESPONSE);
                  sendMessageMutation.mutate({
                    sessionId,
                    message: '[HUMAN HANDOFF REQUEST] Still need help, requested human after bot exchanges',
                    visitorName: leadInfo.name,
                    visitorEmail: leadInfo.email,
                    businessType: leadInfo.businessType,
                    page: typeof window !== 'undefined' ? window.location.pathname : undefined,
                  });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '0.6875rem',
                  color: '#868583',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  padding: '0.25rem 0',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#A78BFA'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = '#868583'}
              >
                Still need help? Talk to a person
              </button>
            </div>
          )}

          {/* Book CTA after chat */}
          {messages.length >= 4 && !isTyping && (
            <div style={{
              backgroundColor: '#141414',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#2A2A2A',
              borderRadius: '10px',
              padding: '0.875rem',
              marginTop: '0.25rem',
              animation: 'chatFadeIn 0.4s ease-out',
            }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: '#868583', marginBottom: '0.625rem', lineHeight: 1.5 }}>
                Want to see exactly where your revenue is leaking?
              </p>
              <button
                onClick={scrollToBooking}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  backgroundColor: '#A78BFA',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5rem 0.875rem',
                  cursor: 'pointer',
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#0A0A0A',
                  transition: 'background-color 0.2s ease',
                  width: '100%',
                  justifyContent: 'center',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#c4b0fd'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#A78BFA'}
              >
                Book Your Free Intro Call <ArrowRight size={12} />
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{
          borderTop: '1px solid #2A2A2A',
          padding: '0.75rem',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          flexShrink: 0,
          backgroundColor: '#141414',
        }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."

            style={{
              flex: 1,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#2A2A2A',
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.8125rem',
              color: '#F5F0EC',
              backgroundColor: '#0A0A0A',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#A78BFA'}
            onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#2A2A2A'}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#A78BFA',
              border: 'none',
              borderRadius: '8px',
              cursor: !inputValue.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              opacity: !inputValue.trim() ? 0.4 : 1,
              transition: 'opacity 0.2s ease',
            }}
            aria-label="Send message"
          >
            <Send size={14} color="#0A0A0A" />
          </button>
        </div>



        {/* Footer */}
        <div style={{
          padding: '0.5rem 0.75rem',
          backgroundColor: '#0A0A0A',
          borderTop: '1px solid #1A1A1A',
          textAlign: 'center',
          flexShrink: 0,
        }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.5625rem', color: '#3A3A3A', letterSpacing: '0.08em' }}>
            Ops by Noell · hello@opsbynoell.com
          </p>
        </div>
      </div>

      {/* ─── Keyframe styles ─── */}
      <style>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatTooltipFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
