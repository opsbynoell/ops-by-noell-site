/*
 * OPS BY NOELL — Massage Therapist Automation Landing Page
 * Route: /massage-therapist-automation
 * SEO: "massage therapist automation", "AI booking for massage therapists"
 */

import { ArrowRight, Check, X } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';

function FadeItem({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease-out ${delay}s, transform 0.65s ease-out ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      padding: '0.375rem 1rem', borderRadius: '99px',
      border: '1px solid rgba(167,139,250,0.25)', background: 'rgba(167,139,250,0.08)',
      fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600,
      letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#A78BFA',
    }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#A78BFA', display: 'inline-block' }} />
      {children}
    </span>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {children}
    </span>
  );
}

const problems = [
  { title: 'Missed calls = lost clients', detail: 'You\'re in session. The phone rings. Nobody answers. 85% of callers will never call back — they\'ll book with someone else.' },
  { title: 'Booking requires your time', detail: 'Phone tag and back-and-forth texts to schedule one appointment. That\'s not how a modern practice should run.' },
  { title: 'No-shows drain your revenue', detail: 'A single no-show costs you the session fee. No-shows with no follow-up cost you the client permanently.' },
  { title: 'Clients drift away between visits', detail: 'Nothing happens between sessions. No reminder. No check-in. No re-booking prompt. They just quietly stop coming.' },
];

const solutions = [
  { item: 'Missed call text-back', detail: 'Every missed call triggers an instant text response. The lead stays warm and gets directed to book online — while you\'re still in session.' },
  { item: '24/7 online booking', detail: 'Clients book themselves at 10pm, on their phone, without calling you. Your calendar fills without interrupting your flow.' },
  { item: 'Automated appointment reminders', detail: 'Text and email reminders reduce no-shows by 30–50%. Sent automatically. You configure it once, it runs forever.' },
  { item: 'Re-engagement sequences', detail: 'Clients who haven\'t booked in 30, 60, or 90 days get a personal-feeling nudge to come back. Most do.' },
  { item: 'Review generation', detail: 'After each appointment, an automated review request goes out at the right moment. Your Google presence builds on autopilot.' },
];

export default function MassageTherapistAutomation() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(120,58,237,0.2) 0%, rgba(139,92,246,0.12) 35%, #010509 72%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5.5rem' }}>
          <FadeItem delay={0}>
            <div style={{ marginBottom: '1.5rem' }}>
              <SectionBadge>Massage Therapist Automation</SectionBadge>
            </div>
          </FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(2.75rem, 6.5vw, 5rem)',
              fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em',
              maxWidth: '820px', marginBottom: '1.75rem',
            }}>
              <GradientText>AI automation</GradientText>{' '}
              <span style={{ color: '#ffffff' }}>for massage therapists. Done for you.</span>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: '#868583', lineHeight: 1.75, maxWidth: '580px', marginBottom: '2.5rem' }}>
              You're an expert at what you do. Every minute spent chasing bookings, returning missed calls, and following up with no-shows is a minute wasted. We build the systems that handle all of it — so you can focus on your clients.
            </p>
          </FadeItem>
          <FadeItem delay={0.3}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book Free 15-Minute Intro Call <ArrowRight size={16} />
              </a>
              <a href="/case-study/massage-therapist" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                See Real Results
              </a>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ─── PROOF STRIP ─── */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)', background: 'rgba(167,139,250,0.02)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {[
              { value: '< 10s', label: 'Avg. response time to missed calls' },
              { value: '−42%', label: 'No-show rate reduction' },
              { value: '2 weeks', label: 'From zero to fully automated' },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: '1.75rem', fontWeight: 700, color: '#A78BFA', lineHeight: 1.1 }}>{value}</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', marginTop: '0.25rem', maxWidth: '160px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>The Problem</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem' }}>
                The revenue leaks most therapists don't see
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

      {/* ─── SOLUTION ─── */}
      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
              <SectionBadge>What We Build</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                A complete automation system. Built and managed for you.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75 }}>
                You don't configure anything. We design, build, and manage every system. You're live in two weeks.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(167,139,250,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
            {solutions.map((s, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{ background: i % 2 === 0 ? 'rgba(167,139,250,0.02)' : 'rgba(167,139,250,0.04)', padding: '1.75rem 2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
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

      {/* ─── PROOF / CASE STUDY CALLOUT ─── */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.2)', borderLeft: '3px solid #A78BFA', borderRadius: '10px', padding: '3rem' }}>
              <SectionBadge>Real Proof</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                Our founding client: a 25-year massage therapist in Laguna Niguel.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.8, maxWidth: '680px', marginBottom: '1.5rem' }}>
                Santa had zero digital infrastructure. No website. No online booking. No reminders. No-shows were averaging 4 per week. Two weeks after we built her system, no-shows dropped to less than 1 per week. New client inquiries started coming in without any advertising. Her practice now runs on autopilot.
              </p>
              <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {[
                  { label: 'No-shows (before)', value: '~4/week', neg: true },
                  { label: 'No-shows (after)', value: '<1/week', neg: false },
                  { label: 'Time to live', value: '14 days', neg: false },
                ].map(({ label, value, neg }) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Nicholas', serif", fontSize: '1.5rem', fontWeight: 700, color: neg ? '#ff6b6b' : '#A78BFA' }}>{value}</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: '#868583', marginTop: '0.2rem' }}>{label}</div>
                  </div>
                ))}
              </div>
              <a href="/case-study/massage-therapist" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#A78BFA', textDecoration: 'none' }}>
                Read the full case study <ArrowRight size={14} />
              </a>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ position: 'relative', padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <SectionBadge>Get Started</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              Ready to stop losing clients to missed calls?
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              15 minutes. Free. No obligation. We'll map your gaps, show you what we'd build, and tell you what it costs.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/book" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book Free 15-Minute Intro Call <ArrowRight size={17} />
              </a>
              <a href="/services" className="btn-outline" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem' }}>
                See Pricing
              </a>
            </div>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}
