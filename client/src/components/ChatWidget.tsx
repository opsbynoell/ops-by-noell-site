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

// ─── Bot Response Logic ───────────────────────────────────────────────────────
// Approved Q&A responses for Nova

const QA_PAIRS: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['what do you do', 'what is ops by noell', 'what does ops by noell do', 'tell me about', 'what you do', 'services', 'what you offer', 'what can you do'],
    answer: "Good question. We build done-for-you AI systems for service businesses. Things like missed call text-back, automated booking and reminders, review requests, lead follow-up, and an AI voice receptionist. The key thing is we don't just hand you a tool. We build it, we manage it, and it runs in the background while you focus on your clients.",
  },
  {
    keywords: ['how much', 'cost', 'price', 'pricing', 'fee', 'charge', 'rate', 'package', 'tier', 'affordable', 'expensive'],
    answer: "Here's how it works. A Revenue Audit starts at $497 and that's where most clients begin. If you want to move fast, the Activation Sprint is $1,500 flat to get one system live in two weeks. Monthly retainers start at $797/mo for Starter, $1,197/mo for Growth, and $1,497/mo for Scale, which includes the AI voice receptionist. If you start with an Activation Sprint, that setup fee gets credited toward your retainer.",
  },
  {
    keywords: ['who do you work with', 'what type of business', 'what businesses', 'industry', 'industries', 'who is this for', 'med spa', 'salon', 'dental', 'massage', 'chiropractor', 'home service'],
    answer: "We work with appointment-based service businesses. Med spas, massage therapists, salons, dental offices, chiropractors, home service companies, and similar. Basically, if your business runs on bookings and phone calls, we can almost certainly help.",
  },
  {
    keywords: ['how long', 'timeline', 'setup time', 'how soon', 'when will', 'how fast', 'get started', 'onboard'],
    answer: "Faster than most people expect. Most clients are fully live within two weeks of completing their audit. We handle all the setup so there's nothing on your end to figure out.",
  },
  {
    keywords: ['tech', 'technical', 'tech-savvy', 'complicated', 'difficult', 'do i need to', 'hard to use'],
    answer: "Not at all. That's honestly one of the things people appreciate most. We build everything, configure everything, and manage it ongoing. You don't log into dashboards or learn new software. You just see the results.",
  },
  {
    keywords: ['how do i start', 'next step', 'how to begin', 'sign up', 'book', 'schedule', 'call', 'consult', 'audit', 'intro'],
    answer: "The easiest way is to book a free 15-minute intro call at opsbynoell.com/book. It's a quick conversation, no pitch, no pressure. We just want to understand your business and see if we're a good fit.",
  },
  {
    keywords: ['different', 'unique', 'why you', 'why ops by noell', 'what makes you', 'stand out', 'better than', 'compared to', 'versus'],
    answer: "Honestly, the biggest difference is that we don't sell you software. A lot of companies hand you a login and wish you luck. We design your system, build every piece of it, and then stay on to manage it. We also show you the math upfront so you know exactly what your gaps are costing you before you spend anything.",
  },
  {
    keywords: ['missed call', 'missed calls', 'text back', 'call back', 'unanswered'],
    answer: "Every missed call gets an automatic text back within seconds. So even if you're with a client and can't pick up, the person who called gets a message right away and the conversation stays alive. It's one of the fastest ways to stop losing leads.",
  },
  {
    keywords: ['ai voice', 'voice receptionist', 'phone answering', 'answer the phone', 'receptionist', 'front desk'],
    answer: "The AI Voice Receptionist answers calls around the clock, qualifies leads, answers common questions, and books appointments without anyone needing to be on the phone. It's included in the Scale package at $1,497/mo and it's genuinely impressive once it's running.",
  },
  {
    keywords: ['review', 'reviews', 'google review', 'reputation', 'testimonial', 'rating'],
    answer: "We set up automated review requests that go out after every appointment. Happy clients get a gentle follow-up asking them to share their experience on Google. Most clients see a real jump in review volume within the first 30 days.",
  },
  {
    keywords: ['no-show', 'no show', 'cancellation', 'cancel', 'reminder', 'reminders', 'appointment reminder'],
    answer: "We build automated reminder sequences that go out via SMS and email before every appointment. Most clients see no-shows drop by 30 to 50 percent within the first month. It adds up fast.",
  },
  {
    keywords: ['follow up', 'follow-up', 'lead nurture', 'nurture', 'reactivate', 'win back', 'past clients'],
    answer: "We build follow-up sequences that re-engage past clients, stay in touch with new leads, and keep your business top of mind. All of it runs automatically so you're not manually chasing anyone.",
  },
  {
    keywords: ['orange county', 'oc', 'local', 'near me', 'southern california', 'socal', 'california'],
    answer: "We're based in Orange County and most of our clients are in the OC and Southern California area. That said, we work with businesses across the US, so location isn't a barrier.",
  },
  {
    keywords: ['contract', 'commitment', 'lock in', 'cancel anytime', 'month to month', 'long term'],
    answer: "Month-to-month, no long-term contracts. We want to earn your business every month by actually delivering results, not by locking you in.",
  },
  {
    keywords: ['roi', 'return on investment', 'worth it', 'results', 'guarantee', 'proof', 'case study'],
    answer: "We show you the math before you spend anything. The Revenue Audit calculates exactly what missed calls, no-shows, and gaps in follow-up are costing your business each month. You see the numbers. You decide if it makes sense.",
  },
  {
    keywords: ['what is a revenue audit', 'revenue audit', 'audit', 'assessment', 'analysis'],
    answer: "The Revenue Audit is a deep look at your current operations. We map out where you're losing revenue, whether that's missed calls, no-shows, weak follow-up, or lack of reviews, and we put a dollar figure on each gap. It starts at $497 and the fee gets credited if you move forward with a retainer.",
  },
  {
    keywords: ['activation sprint', 'sprint', 'one system', 'quick start', 'fast start'],
    answer: "The Activation Sprint is $1,500 flat to get one automation system built and live in two weeks. It's the fastest way to see results. And if you decide to move to a monthly retainer after that, the setup fee is credited.",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'],
    answer: "Hey! I'm Nova. Nikki and James built me to help answer questions about Ops by Noell. What's on your mind?",
  },
  {
    keywords: ['thank you', 'thanks', 'appreciate', 'helpful', 'great'],
    answer: "Of course, happy to help! If anything else comes up, just ask. And whenever you're ready to take the next step, you can book a free 15-minute call at opsbynoell.com/book.",
  },
];

const FALLBACK_RESPONSE = "That's a good one. I want to make sure you get a real answer on that, so let me connect you with Nikki directly. You can book a free 15-minute call at opsbynoell.com/book, or drop your email and she'll reach out to you. What works best?";

const HUMAN_HANDOFF_KEYWORDS = [
  'talk to a person', 'talk to someone', 'speak to a person', 'speak to someone',
  'real person', 'human', 'speak to nikki', 'talk to nikki', 'contact you',
  'reach you', 'get in touch', 'someone call me', 'call me back',
];

function isHumanHandoffRequest(input: string): boolean {
  const lower = input.toLowerCase();
  return HUMAN_HANDOFF_KEYWORDS.some(kw => lower.includes(kw));
}

const HUMAN_HANDOFF_RESPONSE = "Totally understand. I'll flag this for Nikki right now and she'll be in touch soon. You're also welcome to grab a time directly at opsbynoell.com/book if that's easier.";

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const qa of QA_PAIRS) {
    if (qa.keywords.some(kw => lower.includes(kw))) {
      return qa.answer;
    }
  }
  return FALLBACK_RESPONSE;
}

// ─── Quick Question Chips ─────────────────────────────────────────────────────

const QUICK_QUESTIONS = [
  'What do you actually build?',
  'How does the process start?',
  'What kinds of businesses do you work with?',
];

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
  const [stage, setStage] = useState<'intro' | 'answer' | 'capture' | 'chat'>('intro');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadInfo, setLeadInfo] = useState<Partial<LeadInfo>>({});
  const [captureStep, setCaptureStep] = useState<'name' | 'email' | 'biz'>('name');
  const [captureInput, setCaptureInput] = useState('');
  const [showQuickQ, setShowQuickQ] = useState(true);
  const [proactiveTriggered, setProactiveTriggered] = useState(false);

  const [location] = useLocation();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitLead = trpc.leads.submit.useMutation();
  const sendMessageMutation = trpc.chat.sendMessage.useMutation();
  const [sessionId] = useState(() => getSessionId());
  const [lastHumanCount, setLastHumanCount] = useState(0);

  // Poll for human replies every 5 seconds when chat is open and in chat stage
  const { data: serverMessages } = trpc.chat.getMessages.useQuery(
    { sessionId },
    { enabled: isOpen && stage === 'chat', refetchInterval: 5000 }
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
    if (isOpen && stage === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, stage]);

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

  function openChat() {
    setIsOpen(true);
    setHasUnread(false);
    if (stage === 'intro') {
      setMessages([{
        id: '1',
        role: 'bot',
        text: `Hey! I'm Nova. Nikki and James set me up to answer questions about Ops by Noell.\n\nWhat's on your mind?`,
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

  function handleQuickQuestion(q: string) {
    setShowQuickQ(false);
    setStage('answer');
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      text: q,
      timestamp: new Date(),
    }]);
    sessionStorage.setItem('ops_pending_question', q);
    // Answer first, then ask for contact info
    const response = getBotResponse(q);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const answerId = Date.now().toString();
      setMessages(prev => [...prev, { id: answerId, role: 'bot', text: response, timestamp: new Date() }]);
      // After answer, transition to capture
      setTimeout(() => {
        setStage('capture');
        setCaptureStep('name');
        addBotMessage(`Before I forget, I'd love to grab your info so Nikki can follow up with you personally.\n\nWhat's your first name?`);
      }, 800);
    }, 1200 + Math.random() * 600);
  }

  function handleCaptureSubmit() {
    if (!captureInput.trim()) return;
    const value = captureInput.trim();
    setCaptureInput('');

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      text: value,
      timestamp: new Date(),
    }]);

    if (captureStep === 'name') {
      setLeadInfo(prev => ({ ...prev, name: value }));
      setCaptureStep('email');
      setTimeout(() => {
        addBotMessage(`Nice to meet you, ${value}! What email address should Nikki use to reach you?`);
      }, 400);
    } else if (captureStep === 'email') {
      setLeadInfo(prev => ({ ...prev, email: value }));
      setCaptureStep('biz');
      setTimeout(() => {
        addBotMessage(`Got it. And what kind of business do you run?`);
      }, 400);
    } else if (captureStep === 'biz') {
      const updatedLead = { ...leadInfo, businessType: value };
      setLeadInfo(updatedLead);
      sessionStorage.setItem('ops_lead', JSON.stringify(updatedLead));
      setStage('chat');

      const pendingQ = sessionStorage.getItem('ops_pending_question') || '';
      submitLead.mutate({
        name: updatedLead.name ?? '',
        email: updatedLead.email ?? '',
        businessType: value,
        question: pendingQ || undefined,
        page: typeof window !== 'undefined' ? window.location.pathname : undefined,
      });

      // Answer was already given before capture — just thank them and invite more questions
      setTimeout(() => {
        addBotMessage(`Thanks, ${updatedLead.name ?? 'there'}! I've sent your info to Nikki and she'll be in touch. In the meantime, feel free to keep asking questions or grab a time at opsbynoell.com/book whenever it works for you.`);
      }, 400);
    }
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

    // If visitor types their own question in the intro stage, answer first then capture
    if (stage === 'intro') {
      setShowQuickQ(false);
      setStage('answer');
      sessionStorage.setItem('ops_pending_question', text);
      const response = getBotResponse(text);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const answerId = Date.now().toString();
        setMessages(prev => [...prev, { id: answerId, role: 'bot', text: response, timestamp: new Date() }]);
        setTimeout(() => {
          setStage('capture');
          setCaptureStep('name');
          addBotMessage(`Before I forget, I'd love to grab your info so Nikki can follow up with you personally.\n\nWhat's your first name?`);
        }, 800);
      }, 1200 + Math.random() * 600);
      return;
    }

    // Detect human handoff request before sending to bot
    if (isHumanHandoffRequest(text)) {
      addBotMessage(HUMAN_HANDOFF_RESPONSE);
      // Notify owner via backend (fire-and-forget)
      sendMessageMutation.mutate({
        sessionId,
        message: `[HUMAN HANDOFF REQUEST] ${text}`,
        visitorName: leadInfo.name,
        visitorEmail: leadInfo.email,
        businessType: leadInfo.businessType,
      });
      return;
    }

    // Persist to backend and get bot response (handles human takeover too)
    sendMessageMutation.mutate(
      {
        sessionId,
        message: text,
        visitorName: leadInfo.name,
        visitorEmail: leadInfo.email,
        businessType: leadInfo.businessType,
      },
      {
        onSuccess: (data) => {
          if (!data.humanTakeover && data.botReply) {
            // Bot responded — show it
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
          // Fallback to local bot response if backend unavailable
          const response = getBotResponse(text);
          addBotMessage(response);
        },
      }
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (stage === 'capture') {
        handleCaptureSubmit();
      } else {
        handleSendMessage();
      }
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

  const isCapturing = stage === 'capture';
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

        {/* Chat toggle button */}
        <button
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
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 32px rgba(167,139,250,0.5)';
          }}
          onMouseLeave={e => {
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
            onClick={() => setIsOpen(false)}
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

          {/* Quick questions — shown once on intro stage, hidden after selection */}
          {showQuickQ && stage === 'intro' && messages.length > 0 && !isTyping && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  style={{
                    textAlign: 'left',
                    backgroundColor: 'transparent',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#2A2A2A',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    cursor: 'pointer',
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '0.75rem',
                    color: '#868583',
                    lineHeight: 1.4,
                    transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(167,139,250,0.08)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#A78BFA';
                    (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EC';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#2A2A2A';
                    (e.currentTarget as HTMLButtonElement).style.color = '#868583';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Still need help? Talk to a person — shown after 3+ exchanges in chat stage */}
          {stage === 'chat' && messages.filter(m => m.role === 'user').length >= 3 && !isTyping && (
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
          {stage === 'chat' && messages.length >= 4 && !isTyping && (
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
            type={isCapturing && captureStep === 'email' ? 'email' : 'text'}
            value={isCapturing ? captureInput : inputValue}
            onChange={e => isCapturing ? setCaptureInput(e.target.value) : setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isCapturing
                ? captureStep === 'name' ? 'Your first name...'
                  : captureStep === 'email' ? 'Your email address...'
                  : 'Type of business...'
                : 'Ask a question...'
            }
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
            onClick={isCapturing ? handleCaptureSubmit : handleSendMessage}
            disabled={isCapturing ? !captureInput.trim() : !inputValue.trim()}
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#A78BFA',
              border: 'none',
              borderRadius: '8px',
              cursor: (isCapturing ? !captureInput.trim() : !inputValue.trim()) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              opacity: (isCapturing ? !captureInput.trim() : !inputValue.trim()) ? 0.4 : 1,
              transition: 'opacity 0.2s ease',
            }}
            aria-label="Send message"
          >
            <Send size={14} color="#0A0A0A" />
          </button>
        </div>

        {/* Consent line — shown only during lead capture */}
        {isCapturing && (
          <div style={{
            padding: '0.375rem 0.75rem 0',
            backgroundColor: '#141414',
            textAlign: 'center',
            flexShrink: 0,
          }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.625rem', color: '#4A4A4A', lineHeight: 1.5 }}>
              By continuing, you agree to our{' '}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#A78BFA', textDecoration: 'underline' }}>Privacy Policy</a>
              {' '}and{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#A78BFA', textDecoration: 'underline' }}>Terms of Service</a>.
            </p>
          </div>
        )}

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
      `}</style>
    </>
  );
}
