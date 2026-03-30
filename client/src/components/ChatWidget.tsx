/*
 * OPS BY NOELL — Nova Chat Widget
 * Nova is a full-knowledge support agent for Ops by Noell.
 * Human handoff collects name, phone, business type before routing to Telegram.
 */

import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { MessageCircle, X, Send, ArrowRight, ChevronDown } from 'lucide-react';
import { trpc } from '@/lib/trpc';

function getSessionId(): string {
  let id = sessionStorage.getItem('nova_session_id');
  if (!id) {
    id = `ws_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('nova_session_id', id);
  }
  return id;
}

type MessageRole = 'bot' | 'user';

interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
}

interface LeadInfo {
  name: string;
  email: string;
  businessType: string;
}

interface HandoffInfo {
  name: string;
  phone: string;
  businessType: string;
}

// ─── Nova's Knowledge Base ────────────────────────────────────────────────────
// Comprehensive Q&A covering every aspect of Ops by Noell

const KNOWLEDGE: Array<{ keywords: string[]; answer: string }> = [
  // Greetings
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup', 'what\'s up'],
    answer: "Hey! I'm Nova. I know everything about Ops by Noell and I'm here to help. What's on your mind?",
  },
  // What they do
  {
    keywords: ['what do you do', 'what is ops by noell', 'what does ops by noell do', 'tell me about', 'what you do', 'services', 'what you offer', 'what can you do', 'who are you', 'about you', 'about ops'],
    answer: "Ops by Noell builds done-for-you AI automation systems for service businesses. We handle missed call text-back, AI booking and reminders, review generation, lead follow-up, AI voice receptionist, and custom operations buildouts. The key thing: we don't hand you a tool and wish you luck. We design it, build it, and manage it ongoing. You focus on your clients — we automate everything around it.",
  },
  // Entry package
  {
    keywords: ['entry', 'entry package', 'cheapest', 'lowest', 'starter plan', 'basic plan', 'most affordable', 'cheapest option', 'just get started'],
    answer: "The Entry package is $247/mo with a $297 setup fee. It's the fastest way to stop losing leads to voicemail. You get Missed Call Text-Back and the AI Voice Receptionist — so every call that goes unanswered gets an instant text back, and after hours your AI receptionist picks up, qualifies the caller, and books them directly. Setup is included. Most clients are live in under a week.",
  },
  // Pricing / packages
  {
    keywords: ['how much', 'cost', 'price', 'pricing', 'fee', 'charge', 'rate', 'package', 'packages', 'tier', 'tiers', 'affordable', 'expensive', 'plans', 'plan'],
    answer: "Here's the full breakdown:\n\n• Entry — $247/mo + $297 setup. Missed Call Text-Back + AI Voice Receptionist. Best first step.\n• Starter — $797/mo + $997 setup. Adds AI Booking + Reminder System.\n• Growth — $1,497/mo + $1,497 setup. Full stack: everything in Starter plus Review Generation, Lead Follow-Up, and Marketing Automation.\n• Revenue Audit — $497 one-time. Deep dive into your operation, dollar figure on every revenue leak, custom roadmap. Fee gets credited if you move forward.\n\nAll plans are month-to-month. No contracts.",
  },
  // Revenue Audit
  {
    keywords: ['revenue audit', 'audit', 'assessment', 'analysis', 'what is an audit', 'how does the audit work'],
    answer: "The Revenue Audit is a $497 one-time deep dive into your business. We map exactly where you're losing revenue — missed calls, no-shows, cold leads, lapsed clients — and put a dollar figure on each gap. You walk away with a custom automation roadmap and ROI projections for each system. If you move forward with a monthly plan after the audit, the $497 gets credited toward your first month.",
  },
  // AI Voice Receptionist
  {
    keywords: ['ai voice', 'voice receptionist', 'phone answering', 'answer the phone', 'receptionist', 'front desk', 'after hours', 'voice agent', 'ai receptionist'],
    answer: "The AI Voice Receptionist answers your phone 24/7 — including after hours when you're with clients or off the clock. It qualifies callers, answers common questions, and books appointments directly into your calendar. No voicemail. No missed lead. It's powered by Synthflow AI and it's included in the Entry package starting at $247/mo.",
  },
  // Missed Call Text-Back
  {
    keywords: ['missed call', 'missed calls', 'text back', 'call back', 'unanswered', 'voicemail'],
    answer: "Missed Call Text-Back fires an automatic, personalized text to anyone who calls and doesn't reach you — within seconds. It keeps the conversation alive and guides them toward booking before they call your competitor. 85% of callers who hit voicemail never call back. This fixes that. It's included in every package starting at the Entry level.",
  },
  // Booking + Reminders
  {
    keywords: ['booking', 'book appointments', 'reminder', 'reminders', 'appointment reminder', 'scheduling', 'calendar', 'schedule'],
    answer: "The AI Booking + Reminder System lets clients book 24/7 from your website, texts, or social — no phone tag needed. Automated reminders go out at strategic intervals before each appointment via SMS and email. Most clients see no-shows drop 30–50% in the first month. It's included in the Starter package at $797/mo.",
  },
  // No-shows
  {
    keywords: ['no-show', 'no show', 'cancellation', 'cancel', 'no shows', 'skipping appointments'],
    answer: "No-shows are one of the biggest silent revenue killers — they cost most service businesses 10–15% of annual revenue. Our reminder sequences reduce no-shows by 30–50% within the first month. And when someone does cancel, automated follow-up fills the slot or reschedules them. It's part of the Starter package.",
  },
  // Review generation
  {
    keywords: ['review', 'reviews', 'google review', 'reputation', 'testimonial', 'rating', 'ratings', '5 star', 'five star'],
    answer: "Automated Review Generation sends a review request to every client after their appointment, timed for when they're most likely to respond. One tap takes them straight to your Google profile. 93% of consumers read reviews before choosing a local service provider. Most clients see a real jump in review volume within 30 days. It's part of the Growth package.",
  },
  // Lead follow-up
  {
    keywords: ['follow up', 'follow-up', 'lead nurture', 'nurture', 'reactivate', 'win back', 'past clients', 'lapsed', 'cold leads', 'lead follow'],
    answer: "Lead Follow-Up Automation runs multi-touch sequences that re-engage leads who didn't book, clients who haven't returned, and prospects who went cold. 80% of sales require 5+ follow-up touches — most businesses do one, if that. These sequences run automatically in the background. It's included in the Growth package.",
  },
  // Marketing automation
  {
    keywords: ['marketing', 'marketing automation', 'campaigns', 'promotions', 'birthday', 'win back', 'referral', 'email marketing', 'sms marketing'],
    answer: "Marketing Automation keeps you top of mind between appointments — birthday messages, seasonal promos, win-back sequences, referral requests. It turns your existing client list into a recurring revenue engine. Getting a new client costs 5–7x more than keeping one you already have. This is how you protect that. It's part of the Growth package.",
  },
  // Custom operations
  {
    keywords: ['custom', 'custom operations', 'custom build', 'custom workflow', 'internal', 'team', 'complex', 'unique', 'onboarding', 'automation buildout'],
    answer: "Custom Operations Buildout is for businesses that need something beyond the standard stack — internal team workflows, client onboarding systems, integrations with existing tools, reporting pipelines, anything that's currently manual and repeatable. It starts with a scoping call to map the build, then we price it based on scope. It's the highest-leverage engagement we offer for growing teams.",
  },
  // How it works / process
  {
    keywords: ['how does it work', 'process', 'how do you work', 'what happens', 'next step', 'how to begin', 'how do i start', 'sign up', 'get started', 'onboard', 'intro call', 'free call'],
    answer: "It starts with a free 30-minute intro call at opsbynoell.com/book. No pitch, no pressure — we just want to understand your business. If it makes sense to move forward, the next step is a Revenue Audit where we map your exact gaps and design your system. Then we build it, test it, and hand you the results. You don't touch a single setting.",
  },
  // Timeline
  {
    keywords: ['how long', 'timeline', 'setup time', 'how soon', 'when will', 'how fast', 'how quickly', 'turnaround'],
    answer: "Most clients are fully live within 7–14 days of signing. We handle everything — setup, integrations, testing. You just show up for a 60-minute onboarding call. That's it.",
  },
  // Technical requirements
  {
    keywords: ['tech', 'technical', 'tech-savvy', 'complicated', 'difficult', 'do i need to', 'hard to use', 'software', 'login', 'dashboard', 'learn'],
    answer: "Zero technical knowledge required. We build everything, configure everything, and manage it ongoing. You don't log into dashboards or learn new software. You'll see results — not settings. If you ever want a performance report, we provide clear monthly summaries.",
  },
  // Contracts
  {
    keywords: ['contract', 'commitment', 'lock in', 'cancel anytime', 'month to month', 'long term', 'annual', 'tied in'],
    answer: "Month-to-month, always. No long-term contracts, no lock-in, no penalties for cancelling. We earn your business every month by delivering results. 30 days notice to cancel, that's it.",
  },
  // Who they work with / industries
  {
    keywords: ['who do you work with', 'what type of business', 'what businesses', 'industry', 'industries', 'who is this for', 'med spa', 'salon', 'dental', 'massage', 'chiropractor', 'home service', 'fitness', 'esthetician', 'spa', 'wellness'],
    answer: "We work with appointment-based service businesses — med spas, massage therapists, salons, estheticians, chiropractors, dental offices, fitness studios, home service companies. If your business runs on bookings and phone calls, we can almost certainly help. We're based in Orange County and most of our clients are in Southern California, but we work with businesses across the US.",
  },
  // Location
  {
    keywords: ['orange county', 'oc', 'local', 'near me', 'southern california', 'socal', 'california', 'where are you', 'location', 'based'],
    answer: "We're based in Orange County, CA. Most of our clients are in OC and Southern California, but we work with businesses across the US. All setup and management is done remotely — no in-person requirements.",
  },
  // Results / proof / ROI
  {
    keywords: ['roi', 'return on investment', 'worth it', 'results', 'guarantee', 'proof', 'case study', 'does it work', 'show me', 'example'],
    answer: "Our founding client is Santa, a massage therapist in Laguna Niguel with 25 years of experience. Before working with us she had zero digital infrastructure. Within two weeks, no-shows dropped from 4 per week to less than 1. We show you the math before you spend anything — the Revenue Audit puts a real dollar figure on every gap so you can decide if it makes sense before committing.",
  },
  // Why choose Ops by Noell
  {
    keywords: ['different', 'unique', 'why you', 'why ops by noell', 'what makes you', 'stand out', 'better than', 'compared to', 'versus', 'why not', 'competitor'],
    answer: "Three things: we're local (Orange County, founder-led), we show you the ROI before you spend anything, and we manage everything ongoing. Most automation companies hand you a login and wish you luck. We don't sell software — we sell outcomes. And since our name is on the door, we're accountable to your results in a way a faceless SaaS platform never is.",
  },
  // GHL / platform
  {
    keywords: ['gohighlevel', 'go high level', 'ghl', 'platform', 'what platform', 'what software', 'crm', 'what tools', 'synthflow'],
    answer: "We build on GoHighLevel (white-labeled), which is one of the most powerful all-in-one platforms for service businesses. For AI voice, we use Synthflow AI. For complex automations and integrations, we use Make.com. You don't need to know any of these — we run everything. You just see the results.",
  },
  // Existing tools / integrations
  {
    keywords: ['already use', 'existing', 'integrate', 'integration', 'mindbody', 'jane app', 'acuity', 'calendly', 'hubspot', 'square', 'existing software'],
    answer: "We integrate with the tools you already use — Calendly, Acuity, Jane App, Mindbody, HubSpot, and more. If you already have a CRM or booking system, we build around it rather than replace it. We scope the integration during your free intro call.",
  },
  // Privacy / data
  {
    keywords: ['data', 'privacy', 'sell my info', 'sell my data', 'spam', 'mailing list', 'email list', 'safe', 'secure', 'confidential', 'what do you do with my info', 'what do you do with my data'],
    answer: "We don't sell your data. Ever. We build systems for your business, not a database for ours. Anything you share with us stays between us and is only used to help you. No spam, no lists, no third-party sharing.",
  },
  // Gratitude
  {
    keywords: ['thank you', 'thanks', 'appreciate', 'helpful', 'great', 'awesome', 'perfect', 'amazing'],
    answer: "Happy to help! If anything else comes up, just ask. And whenever you're ready to take the next step, you can book a free 30-minute intro call at opsbynoell.com/book.",
  },
];

const FALLBACK_RESPONSE = "That's a great question and I want to make sure you get a real answer. Let me connect you with James and Nikki directly. They can walk you through exactly how this would work for your business. Want me to grab your contact info so they can reach out, or would you prefer to book a time at opsbynoell.com/book?";

const HUMAN_HANDOFF_KEYWORDS = [
  'talk to a person', 'talk to someone', 'speak to a person', 'speak to someone',
  'real person', 'human', 'speak to nikki', 'talk to nikki', 'speak to james', 'talk to james',
  'speak to the noells', 'talk to the noells', 'contact you',
  'reach you', 'get in touch', 'someone call me', 'call me back', 'talk to a human',
  'speak with someone', 'connect me', 'connect with nikki', 'connect with james',
];

function isHumanHandoffRequest(input: string): boolean {
  return HUMAN_HANDOFF_KEYWORDS.some(kw => input.toLowerCase().includes(kw));
}

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const item of KNOWLEDGE) {
    if (item.keywords.some(kw => lower.includes(kw))) {
      return item.answer;
    }
  }
  return FALLBACK_RESPONSE;
}

const QUICK_QUESTIONS = [
  'What do you actually build?',
  'How does pricing work?',
  'What kinds of businesses do you work with?',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 14px', backgroundColor: '#1A1A1A', borderRadius: '8px', maxWidth: '60px' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A78BFA',
          display: 'inline-block',
          animation: `chatBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [stage, setStage] = useState<'intro' | 'answer' | 'capture' | 'chat' | 'handoff'>('intro');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadInfo, setLeadInfo] = useState<Partial<LeadInfo>>({});
  const [captureStep, setCaptureStep] = useState<'name' | 'email' | 'biz'>('name');
  const [captureInput, setCaptureInput] = useState('');
  const [showQuickQ, setShowQuickQ] = useState(true);
  const [proactiveTriggered, setProactiveTriggered] = useState(false);
  // Human handoff collection
  const [handoffStep, setHandoffStep] = useState<'name' | 'phone' | 'biz' | 'done'>('name');
  const [handoffInfo, setHandoffInfo] = useState<Partial<HandoffInfo>>({});
  const [handoffInput, setHandoffInput] = useState('');
  const [lastUserMessage, setLastUserMessage] = useState('');

  const [location] = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitLead = trpc.leads.submit.useMutation();
  const sendMessageMutation = trpc.chat.sendMessage.useMutation();
  const [sessionId] = useState(() => getSessionId());
  const [lastHumanCount, setLastHumanCount] = useState(0);

  const { data: serverMessages } = trpc.chat.getMessages.useQuery(
    { sessionId },
    { enabled: isOpen && stage === 'chat', refetchInterval: 5000 }
  );

  useEffect(() => {
    if (!serverMessages || serverMessages.length === 0) return;
    const humanMsgs = serverMessages.filter((m: { role: string }) => m.role === 'human');
    if (humanMsgs.length > lastHumanCount) {
      const newMsgs = humanMsgs.slice(lastHumanCount);
      setLastHumanCount(humanMsgs.length);
      newMsgs.forEach((m: { id: number; content: string; createdAt: Date }) => {
        setMessages(prev => {
          if (prev.some(p => p.id === `human_${m.id}`)) return prev;
          return [...prev, { id: `human_${m.id}`, role: 'bot' as const, text: m.content, timestamp: new Date(m.createdAt) }];
        });
      });
    }
  }, [serverMessages, lastHumanCount]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);
  useEffect(() => { if (isOpen && (stage === 'chat' || stage === 'handoff')) setTimeout(() => inputRef.current?.focus(), 300); }, [isOpen, stage]);
  useEffect(() => { const t = setTimeout(() => setHasUnread(true), 3000); return () => clearTimeout(t); }, []);

  // Proactive trigger on key pages
  useEffect(() => {
    const sessionKey = `nova_proactive_${location}`;
    if (proactiveTriggered || sessionStorage.getItem(sessionKey)) return;
    const proactiveMessages: Record<string, string> = {
      '/services': "Trying to figure out which plan makes sense for your business? Happy to help you think it through. What type of business do you run?",
      '/book': "If you have any questions before booking, I'm here. James and Nikki will walk you through exactly where your revenue gaps are on the call. Anything I can answer first?",
    };
    const message = proactiveMessages[location];
    if (!message) return;
    const timer = setTimeout(() => {
      if (isOpen) return;
      sessionStorage.setItem(sessionKey, '1');
      setProactiveTriggered(true);
      setIsOpen(true);
      setHasUnread(false);
      setMessages([{ id: 'proactive_1', role: 'bot', text: message, timestamp: new Date() }]);
      setStage('answer');
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
        text: "Hey! I'm Nova.\n\nI know everything about Ops by Noell and I'm here to help. Ask me anything — pricing, how it works, what we build, all of it.",
        timestamp: new Date(),
      }]);
    }
  }

  function addBotMessage(text: string, delay = 1200) {
    const id = Date.now().toString();
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id, role: 'bot', text, timestamp: new Date() }]);
    }, delay + Math.random() * 400);
  }

  // ─── Human Handoff Flow ───────────────────────────────────────────────────
  function startHandoff(triggerMessage: string) {
    setLastUserMessage(triggerMessage);
    setStage('handoff');
    setHandoffStep('name');
    addBotMessage("Of course. Let me get James and Nikki on this for you.\n\nWhat's your name?");
  }

  function handleHandoffSubmit() {
    if (!handoffInput.trim()) return;
    const value = handoffInput.trim();
    setHandoffInput('');

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: value, timestamp: new Date() }]);

    if (handoffStep === 'name') {
      setHandoffInfo(prev => ({ ...prev, name: value }));
      setHandoffStep('phone');
      setTimeout(() => addBotMessage(`Got it, ${value}. Best phone number for James or Nikki to reach you?`), 400);
    } else if (handoffStep === 'phone') {
      setHandoffInfo(prev => ({ ...prev, phone: value }));
      setHandoffStep('biz');
      setTimeout(() => addBotMessage("And what kind of business do you run?"), 400);
    } else if (handoffStep === 'biz') {
      const completed: HandoffInfo = {
        name: handoffInfo.name ?? '',
        phone: handoffInfo.phone ?? '',
        businessType: value,
      };
      setHandoffInfo(completed);
      setHandoffStep('done');
      setStage('chat');

      // Fire to Telegram via backend
      sendMessageMutation.mutate({
        sessionId,
        message: `[HUMAN HANDOFF]\nName: ${completed.name}\nPhone: ${completed.phone}\nBusiness: ${completed.businessType}\nMessage: "${lastUserMessage}"\nPage: ${typeof window !== 'undefined' ? window.location.pathname : ''}`,
        visitorName: completed.name,
        visitorEmail: leadInfo.email,
        businessType: completed.businessType,
      });

      // Also submit as lead
      submitLead.mutate({
        name: completed.name,
        email: leadInfo.email ?? '',
        businessType: completed.businessType,
        question: lastUserMessage || undefined,
        page: typeof window !== 'undefined' ? window.location.pathname : undefined,
      });

      setTimeout(() => addBotMessage(
        `Perfect, ${completed.name}. I've sent your info to Nikki and she'll reach out to you at ${completed.phone}.\n\nIn the meantime, feel free to ask me anything else or grab a time directly at opsbynoell.com/book.`
      ), 400);
    }
  }

  // ─── Lead Capture Flow ────────────────────────────────────────────────────
  function handleCaptureSubmit() {
    if (!captureInput.trim()) return;
    const value = captureInput.trim();
    setCaptureInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: value, timestamp: new Date() }]);

    if (captureStep === 'name') {
      setLeadInfo(prev => ({ ...prev, name: value }));
      setCaptureStep('email');
      setTimeout(() => addBotMessage(`Nice to meet you, ${value}! What email address should Nikki use to reach you?`), 400);
    } else if (captureStep === 'email') {
      setLeadInfo(prev => ({ ...prev, email: value }));
      setCaptureStep('biz');
      setTimeout(() => addBotMessage("Got it. And what kind of business do you run?"), 400);
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
      setTimeout(() => addBotMessage(
        `Thanks, ${updatedLead.name ?? 'there'}! I've sent your info to Nikki and she'll be in touch. Keep asking questions or grab a time at opsbynoell.com/book whenever you're ready.`
      ), 400);
    }
  }

  function handleQuickQuestion(q: string) {
    setShowQuickQ(false);
    setStage('answer');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: q, timestamp: new Date() }]);
    sessionStorage.setItem('ops_pending_question', q);
    const response = getBotResponse(q);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const answerId = Date.now().toString();
      setMessages(prev => [...prev, { id: answerId, role: 'bot', text: response, timestamp: new Date() }]);
      setTimeout(() => {
        setStage('capture');
        setCaptureStep('name');
        addBotMessage("Before I forget — I'd love to grab your info so Nikki can follow up personally.\n\nWhat's your first name?");
      }, 800);
    }, 1200 + Math.random() * 400);
  }

  function handleSendMessage() {
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text, timestamp: new Date() }]);

    if (stage === 'intro') {
      setShowQuickQ(false);
      setStage('answer');
      sessionStorage.setItem('ops_pending_question', text);

      if (isHumanHandoffRequest(text)) {
        startHandoff(text);
        return;
      }

      const response = getBotResponse(text);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', text: response, timestamp: new Date() }]);
        setTimeout(() => {
          setStage('capture');
          setCaptureStep('name');
          addBotMessage("Before I forget — I'd love to grab your info so Nikki can follow up personally.\n\nWhat's your first name?");
        }, 800);
      }, 1200 + Math.random() * 400);
      return;
    }

    if (isHumanHandoffRequest(text)) {
      startHandoff(text);
      return;
    }

    sendMessageMutation.mutate(
      { sessionId, message: text, visitorName: leadInfo.name, visitorEmail: leadInfo.email, businessType: leadInfo.businessType },
      {
        onSuccess: (data) => {
          if (!data.humanTakeover && data.botReply) {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', text: data.botReply!, timestamp: new Date() }]);
            }, 1000 + Math.random() * 400);
          }
        },
        onError: () => {
          addBotMessage(getBotResponse(text));
        },
      }
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (stage === 'capture') handleCaptureSubmit();
      else if (stage === 'handoff') handleHandoffSubmit();
      else handleSendMessage();
    }
  }

  function scrollToBooking() {
    setIsOpen(false);
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.href = '/book';
  }

  const isCapturing = stage === 'capture';
  const isHandoff = stage === 'handoff' && handoffStep !== 'done';
  const activeInput = isCapturing ? captureInput : isHandoff ? handoffInput : inputValue;
  const setActiveInput = isCapturing
    ? setCaptureInput
    : isHandoff
    ? setHandoffInput
    : setInputValue;
  const handleActiveSubmit = isCapturing
    ? handleCaptureSubmit
    : isHandoff
    ? handleHandoffSubmit
    : handleSendMessage;

  return (
    <>
      {/* ─── Floating Button ─── */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
        {hasUnread && !isOpen && (
          <div
            onClick={openChat}
            style={{
              backgroundColor: '#141414', borderWidth: '1px', borderStyle: 'solid', borderColor: '#2A2A2A',
              padding: '0.875rem 1rem', maxWidth: '220px', borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)', animation: 'chatFadeIn 0.4s ease-out', cursor: 'pointer',
            }}
          >
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#F5F0EC', lineHeight: 1.5, marginBottom: '0.375rem' }}>
              Have a question? I'm Nova — ask me anything.
            </p>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: '#A78BFA', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Ask a question <ArrowRight size={11} />
            </p>
          </div>
        )}

        <button
          onClick={() => isOpen ? setIsOpen(false) : openChat()}
          style={{
            width: '52px', height: '52px', backgroundColor: '#A78BFA', border: 'none',
            borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', boxShadow: '0 4px 24px rgba(167,139,250,0.35)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease', position: 'relative',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 32px rgba(167,139,250,0.5)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 24px rgba(167,139,250,0.35)'; }}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <ChevronDown size={20} color="#0A0A0A" /> : <MessageCircle size={20} color="#0A0A0A" />}
          {hasUnread && !isOpen && (
            <span style={{
              position: 'absolute', top: '6px', right: '6px', width: '10px', height: '10px',
              backgroundColor: '#FF4D4D', borderRadius: '50%', borderWidth: '2px',
              borderStyle: 'solid', borderColor: '#0A0A0A',
            }} />
          )}
        </button>
      </div>

      {/* ─── Chat Panel ─── */}
      <div style={{
        position: 'fixed', bottom: '6rem', right: '2rem', zIndex: 9998,
        width: '360px', maxWidth: 'calc(100vw - 2rem)', backgroundColor: '#0F0F0F',
        borderWidth: '1px', borderStyle: 'solid', borderColor: '#2A2A2A',
        borderRadius: '16px', boxShadow: '0 16px 64px rgba(0,0,0,0.7)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transformOrigin: 'bottom right',
        transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(16px)',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'all' : 'none',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease',
        maxHeight: '520px',
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#141414', padding: '1rem 1.25rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0, borderBottom: '1px solid #2A2A2A',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px', height: '32px', backgroundColor: '#A78BFA',
              borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#0A0A0A', fontWeight: 700 }}>N</span>
            </div>
            <div>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', fontWeight: 700, color: '#F5F0EC', lineHeight: 1.2 }}>Nova</p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#868583' }}>
                Ops by Noell · Replies instantly
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
          flex: 1, overflowY: 'auto', padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
          minHeight: 0, maxHeight: '320px',
          scrollbarWidth: 'thin', scrollbarColor: '#2A2A2A transparent',
        }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', animation: 'chatFadeIn 0.3s ease-out' }}>
              <div style={{
                maxWidth: '82%', padding: '0.625rem 0.875rem',
                backgroundColor: msg.role === 'user' ? '#A78BFA' : '#1A1A1A',
                borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                borderLeft: msg.role === 'bot' ? '2px solid #2A2A2A' : 'none',
              }}>
                <p style={{
                  fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem',
                  color: msg.role === 'user' ? '#0A0A0A' : '#C4B5FD',
                  lineHeight: 1.65, whiteSpace: 'pre-line', margin: 0,
                }}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', animation: 'chatFadeIn 0.3s ease-out' }}>
              <TypingIndicator />
            </div>
          )}

          {/* Quick questions on intro */}
          {showQuickQ && stage === 'intro' && messages.length > 0 && !isTyping && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  style={{
                    textAlign: 'left', backgroundColor: 'transparent',
                    borderWidth: '1px', borderStyle: 'solid', borderColor: '#2A2A2A',
                    borderRadius: '8px', padding: '0.5rem 0.75rem', cursor: 'pointer',
                    fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: '#868583',
                    lineHeight: 1.4, transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
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

          {/* Talk to a person — shown after 3+ user messages in chat stage */}
          {stage === 'chat' && messages.filter(m => m.role === 'user').length >= 3 && !isTyping && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.25rem', animation: 'chatFadeIn 0.4s ease-out' }}>
              <button
                onClick={() => {
                  setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: "I'd like to talk to a person", timestamp: new Date() }]);
                  startHandoff("I'd like to talk to a person");
                }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', color: '#868583',
                  textDecoration: 'underline', textUnderlineOffset: '3px',
                  padding: '0.25rem 0', transition: 'color 0.15s ease',
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
              backgroundColor: '#141414', borderWidth: '1px', borderStyle: 'solid',
              borderColor: '#2A2A2A', borderRadius: '10px', padding: '0.875rem',
              marginTop: '0.25rem', animation: 'chatFadeIn 0.4s ease-out',
            }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: '#868583', marginBottom: '0.625rem', lineHeight: 1.5 }}>
                Want to see exactly where your revenue is leaking?
              </p>
              <button
                onClick={scrollToBooking}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  backgroundColor: '#A78BFA', border: 'none', borderRadius: '6px',
                  padding: '0.5rem 0.875rem', cursor: 'pointer',
                  fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem',
                  fontWeight: 600, color: '#0A0A0A', transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
              >
                Book Free Intro Call <ArrowRight size={11} />
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '0.75rem 1rem', borderTop: '1px solid #2A2A2A',
          display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0,
          backgroundColor: '#0F0F0F',
        }}>
          <input
            ref={inputRef}
            type="text"
            value={activeInput}
            onChange={e => setActiveInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isHandoff && handoffStep === 'name' ? "Your name..." :
              isHandoff && handoffStep === 'phone' ? "Your phone number..." :
              isHandoff && handoffStep === 'biz' ? "Type of business..." :
              isCapturing && captureStep === 'name' ? "Your first name..." :
              isCapturing && captureStep === 'email' ? "Your email..." :
              isCapturing && captureStep === 'biz' ? "Type of business..." :
              "Ask me anything..."
            }
            style={{
              flex: 1, backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A',
              borderRadius: '8px', padding: '0.625rem 0.875rem',
              fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#F5F0EC',
              outline: 'none', transition: 'border-color 0.15s ease',
            }}
            onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor = '#A78BFA'}
            onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor = '#2A2A2A'}
          />
          <button
            onClick={handleActiveSubmit}
            disabled={!activeInput.trim()}
            style={{
              width: '36px', height: '36px', backgroundColor: activeInput.trim() ? '#A78BFA' : '#2A2A2A',
              border: 'none', borderRadius: '8px', cursor: activeInput.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, transition: 'background-color 0.15s ease',
            }}
            aria-label="Send"
          >
            <Send size={14} color={activeInput.trim() ? '#0A0A0A' : '#868583'} />
          </button>
        </div>

        {/* Footer */}
        <div style={{ padding: '0.375rem 1rem 0.625rem', textAlign: 'center', flexShrink: 0 }}>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.625rem', color: '#4A4A4A', letterSpacing: '0.04em' }}>
            Powered by Ops by Noell
          </p>
        </div>
      </div>

      <style>{`
        @keyframes chatFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes chatBounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
      `}</style>
    </>
  );
}
