/*
 * OPS BY NOELL — Massage Therapist Automation Landing Page
 * Route: /massage-therapist-automation
 * SEO: "massage therapist automation", "AI booking for massage therapists", "AI receptionist massage"
 */

import { ArrowRight, Check, Phone, X } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';

function FadeItem({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn(0.1);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.65s ease-out ${delay}s, transform 0.65s ease-out ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: '99px', border: '1px solid rgba(167,139,250,0.25)', background: 'rgba(167,139,250,0.08)', fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#A78BFA' }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#A78BFA', display: 'inline-block' }} />
      {children}
    </span>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return <span style={{ background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{children}</span>;
}

const stats = [
  { value: '< 10s', label: 'Response time to missed calls' },
  { value: '85%', label: 'Of callers never call back after voicemail' },
  { value: '−42%', label: 'No-show rate reduction' },
  { value: '2 weeks', label: 'To full automation' },
];

const problems = [
  { title: 'Missed calls mean lost clients — permanently', detail: '85% of callers who reach voicemail never call back. Every unanswered call while you\'re with a client is a booking that goes to someone else.' },
  { title: 'No one answering after hours', detail: 'Prospects browse and book at night. Without an AI answering your phone after 6pm, you\'re invisible when they\'re ready to commit.' },
  { title: 'No-shows eat your income', detail: 'Four no-shows a week at $120/session is nearly $2,500/month in lost revenue. Most of those are preventable with the right reminders.' },
  { title: 'Clients drift between sessions', detail: 'A client who loved their massage three months ago hasn\'t rebooked — not because they stopped caring, but because no one followed up.' },
];

const solutions = [
  {
    item: 'AI Voice Receptionist — answers every call, 24/7',
    detail: 'A trained AI agent picks up your missed calls, greets callers in your practice\'s name, answers questions about services, and books appointments directly into your calendar — day or night. No voicemail. No lost clients.',
    highlight: true,
  },
  { item: 'Instant missed call text-back', detail: 'Every missed call triggers an immediate, personalized text response that re-engages the caller and guides them toward booking — without you lifting a finger.', highlight: false },
  { item: '24/7 online booking', detail: 'Clients book themselves on mobile, after hours, without calling. Your calendar fills while you\'re focused on the client in front of you.', highlight: false },
  { item: 'Automated appointment reminders', detail: 'Text and email reminders go out automatically at 48 hours and 2 hours before each appointment. No-shows drop. No manual calls needed.', highlight: false },
  { item: 'Re-engagement sequences', detail: 'Clients who haven\'t booked in 30, 60, or 90 days get a natural, personal-feeling follow-up. Most re-book within a week of hearing from you.', highlight: false },
  { item: 'Automated review generation', detail: 'Post-appointment review requests go out at exactly the right moment — when the client is still glowing. More 5-star reviews, on autopilot.', highlight: false },
];

export default function MassageTherapistAutomation() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.2) 0%, rgba(139,92,246,0.12) 35%, #010509 72%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5.5rem' }}>
          <FadeItem delay={0}><div style={{ marginBottom: '1.5rem' }}><SectionBadge>Massage Therapist Automation</SectionBadge></div></FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.75rem, 6.5vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '820px', marginBottom: '1.75rem' }}>
              <GradientText>AI receptionist and automation</GradientText>{' '}<span style={{ color: '#ffffff' }}>for massage therapists. Stop losing clients to voicemail.</span>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: '#868583', lineHeight: 1.75, maxWidth: '580px', marginBottom: '2.5rem' }}>
              You built your practice on your hands, not on following up leads and chasing no-shows. We build the AI systems that handle every call, every reminder, and every re-engagement — so you can stay focused on your clients.
            </p>
          </FadeItem>
          <FadeItem delay={0.3}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book Free 30-Minute Intro Call <ArrowRight size={16} />
              </a>
              <a href="/case-study/massage-therapist" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>See Real Results</a>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ borderTop: '1px solid rgba(167,139,250,0.1)', borderBottom: '1px solid rgba(167,139,250,0.1)', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {stats.map((s, i) => (
              <FadeItem key={i} delay={i * 0.07}>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#A78BFA', marginBottom: '0.4rem' }}>{s.value}</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', lineHeight: 1.5 }}>{s.label}</div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* Voice AI callout */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(167,139,250,0.03) 100%)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '16px', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '780px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={22} color="#A78BFA" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#A78BFA', marginBottom: '0.25rem' }}>New Feature</div>
                  <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    Your practice answers the phone — even when you can't
                  </h2>
                </div>
              </div>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75 }}>
                Your AI receptionist picks up every missed call, greets callers in your practice's name, answers questions about your services, and books appointments directly into your calendar — 24/7. No voicemail. No missed opportunities. Just a full schedule.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {['Books appointments in real time', 'Answers service and pricing questions', 'Handles after-hours calls automatically', 'Sends confirmation texts instantly'].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <Check size={14} color="#A78BFA" />
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#e2e2e2' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* Case study callout */}
      <section style={{ padding: '0 0 7rem' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.15)', borderRadius: '12px', padding: '2.5rem', maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
              <SectionBadge>Real Results</SectionBadge>
              <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                From 4 no-shows a week to less than 1 — in 14 days
              </h3>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Santa, a 25-year massage therapist in Laguna Niguel, had zero digital infrastructure when we started. Two weeks later, her no-show rate had dropped from 4 per week to less than 1, and her calendar was filling without a single manual follow-up call.
              </p>
              <a href="/case-study/massage-therapist" style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', fontWeight: 600, color: '#A78BFA', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                Read the full case study <ArrowRight size={14} />
              </a>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* Problems */}
      <section style={{ padding: '4rem 0 7rem', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>The Problem</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem' }}>
                The revenue leaks in every massage practice
              </h2>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {problems.map((p, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{ padding: '2rem', background: 'rgba(255,80,80,0.03)', border: '1px solid rgba(255,80,80,0.12)', borderRadius: '10px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,80,80,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <X size={12} color="#ff6b6b" />
                    </div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', fontWeight: 700, color: '#ffffff' }}>{p.title}</h3>
                  </div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#868583', lineHeight: 1.7 }}>{p.detail}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
              <SectionBadge>The Solution</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Done-for-you automation. We build it. We run it.
              </h2>
            </div>
          </FadeItem>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(167,139,250,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
            {solutions.map((s, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{ background: s.highlight ? 'rgba(167,139,250,0.08)' : (i % 2 === 0 ? 'rgba(167,139,250,0.02)' : 'rgba(167,139,250,0.04)'), padding: '1.75rem 2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', borderLeft: s.highlight ? '2px solid #A78BFA' : 'none' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} color="#A78BFA" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.375rem' }}>{s.item}</h3>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.7 }}>{s.detail}</p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <SectionBadge>Get Started</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              Your practice deserves a full calendar, not a full voicemail box.
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              30 minutes. Free. No obligation. We'll map your revenue gaps and show you exactly what we'd build.
            </p>
            <a href="/book" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book Free 30-Minute Intro Call <ArrowRight size={17} />
            </a>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}
