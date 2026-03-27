/*
 * OPS BY NOELL — Case Study Page (NeuraFlas Design System)
 * - Background: #010509, Nicholas headings, Sora body, #A78BFA accent
 * - Client: Santa, licensed massage therapist, Laguna Niguel
 */

import { ArrowRight, X, Check } from 'lucide-react';
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

const gaps = [
  { label: 'No website', detail: 'Zero online presence. New clients had no way to find her or learn about her services.' },
  { label: 'No online booking', detail: 'Booking required a phone call during business hours, or a text that might go unanswered.' },
  { label: 'Calls going to voicemail', detail: 'Missed calls meant missed clients. No system existed to follow up with callers.' },
  { label: 'No appointment reminders', detail: 'No-shows happened regularly. Clients forgot. There was no automated reminder system.' },
  { label: 'No review system', detail: '25 years of exceptional work, with almost no online reviews to show for it.' },
  { label: 'No follow-up', detail: "Once a client left, the relationship was over until they decided to call again, if they remembered." },
];

const built = [
  { item: 'Professional website', detail: 'Clean, mobile-optimized website with service descriptions, booking integration, and SEO foundation.' },
  { item: 'Missed call text-back', detail: 'Every missed call triggers an instant text response, guiding the lead toward booking.' },
  { item: 'Online booking + reminders', detail: '24/7 online booking with automated text and email reminders reducing no-shows.' },
  { item: 'Review generation', detail: 'Post-appointment review requests sent automatically, building her Google presence consistently.' },
  { item: 'Repeat client follow-up', detail: "Automated re-engagement sequences for clients who haven't returned in 30, 60, or 90 days." },
];

export default function CaseStudy() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(120,58,237,0.18) 0%, rgba(139,92,246,0.12) 35%, #010509 72%)',
        }} />
        <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '80px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5.5rem' }}>
          <FadeItem delay={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <SectionBadge>Case Study · Laguna Niguel, CA</SectionBadge>
              <span style={{
                fontFamily: "'Sora', sans-serif", fontSize: '0.625rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#010509',
                background: 'linear-gradient(135deg, #A78BFA, #C4B5FD)',
                padding: '0.3rem 0.875rem', borderRadius: '99px',
              }}>Founding Client Partner</span>
            </div>
          </FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)',
              fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em',
              maxWidth: '860px', marginBottom: '2.5rem',
            }}>
              <span style={{ background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>25 years of expertise.</span>{' '}
              <span style={{ color: '#ffffff' }}>Zero infrastructure.</span>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {[
                { label: 'Industry', value: 'Massage Therapy' },
                { label: 'Location', value: 'Laguna Niguel, CA' },
                { label: 'Experience', value: '25+ Years' },
                { label: 'Timeline', value: '2 Weeks to Live' },
              ].map((item, i) => (
                <div key={i} className="feature-card" style={{ padding: '1rem 1.5rem' }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A78BFA', marginBottom: '0.25rem' }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ─── THE CLIENT ─── */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="lg:grid-cols-2">
            <FadeItem delay={0}>
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <SectionBadge>The Client</SectionBadge>
                </div>
                <h2 style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 700, color: '#ffffff',
                  lineHeight: 1.1, marginBottom: '1.5rem',
                }}>
                  A master of her craft. Invisible to the internet.
                </h2>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  Santa is a licensed massage therapist based in Laguna Niguel with over 25 years of experience. Her clients are loyal. Her work is exceptional. Her reputation, built entirely through word of mouth, is impeccable.
                </p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  But Santa had zero digital infrastructure. No website. No online booking. No automated follow-up. No review system. Every new client had to find her through a personal referral, and even then, they had to navigate a booking process that relied entirely on phone calls and memory.
                </p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.8 }}>
                  She was excellent at her work. Her operations were silently costing her thousands every month in missed opportunities.
                </p>
              </div>
            </FadeItem>

            <FadeItem delay={0.15}>
              <div style={{
                background: 'rgba(167,139,250,0.04)',
                border: '1px solid rgba(167,139,250,0.15)',
                borderLeft: '3px solid #A78BFA',
                borderRadius: '8px',
                padding: '3rem',
              }}>
                <p style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: 'clamp(1.25rem, 2vw, 1.625rem)',
                  fontWeight: 600, color: '#ffffff',
                  lineHeight: 1.5, marginBottom: '1.5rem',
                }}>
                  "25 years of exceptional client work. Zero digital infrastructure. Santa was our founding client partner and the perfect proof of concept for what AI automation could do for a solo service business."
                </p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A78BFA' }}>
                  Ops by Noell Assessment
                </p>
              </div>
            </FadeItem>
          </div>
        </div>
      </section>

      {/* ─── THE GAPS ─── */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '520px', marginBottom: '3.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <SectionBadge>The Gaps</SectionBadge>
              </div>
              <h2 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700, color: '#ffffff',
                lineHeight: 1.1, marginBottom: '1rem',
              }}>
                Six operational gaps. Each one costing revenue daily.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.75 }}>
                When we sat down with Santa, we mapped every gap in her operation and quantified what each one was costing her monthly.
              </p>
            </div>
          </FadeItem>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-2 lg:grid-cols-3">
            {gaps.map((gap, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div className="feature-card" style={{ padding: '2rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '6px',
                      background: 'rgba(255,80,80,0.12)', border: '1px solid rgba(255,80,80,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <X size={12} color="#ff6b6b" />
                    </div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>
                      {gap.label}
                    </h3>
                  </div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#868583', lineHeight: 1.7 }}>
                    {gap.detail}
                  </p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT WE BUILT ─── */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '520px', marginBottom: '3.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <SectionBadge>What We Built</SectionBadge>
              </div>
              <h2 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700, color: '#ffffff',
                lineHeight: 1.1, marginBottom: '1rem',
              }}>
                A complete operational back office. Built in two weeks.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.75 }}>
                We designed and installed every component of Santa's automation system. She didn't configure a single setting. She was live and capturing leads within 14 days of her audit.
              </p>
            </div>
          </FadeItem>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(167,139,250,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
            {built.map((item, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{
                  background: i % 2 === 0 ? 'rgba(167,139,250,0.02)' : 'rgba(167,139,250,0.04)',
                  padding: '1.75rem 2rem',
                  display: 'flex', alignItems: 'flex-start', gap: '1.5rem',
                }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '8px',
                    background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px',
                  }}>
                    <Check size={16} color="#A78BFA" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.375rem' }}>
                      {item.item}
                    </h3>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.7 }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE RESULT ─── */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <SectionBadge>The Result</SectionBadge>
              </div>
              <h2 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                fontWeight: 700, color: '#ffffff',
                lineHeight: 1.1, marginBottom: '1rem',
              }}>
                Before and after.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto' }}>
                The operational transformation: from zero infrastructure to a fully automated business back office.
              </p>
            </div>
          </FadeItem>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', background: 'rgba(167,139,250,0.12)', borderRadius: '12px', overflow: 'hidden' }} className="md:grid-cols-2">
            {/* Before */}
            <FadeItem delay={0}>
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '2.5rem', height: '100%' }}>
                <p style={{
                  fontFamily: "'Sora', sans-serif", fontSize: '0.625rem', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                  marginBottom: '1.5rem', paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                  Before Ops by Noell
                </p>
                {[
                  'No website or online presence',
                  'Booking by phone call only',
                  'Missed calls = lost clients',
                  'No appointment reminders',
                  'No-shows with no recovery',
                  'Zero online reviews',
                  'No follow-up with past clients',
                  'New clients only from word of mouth',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0,
                      background: 'rgba(255,80,80,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <X size={11} color="rgba(255,100,100,0.6)" />
                    </div>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </FadeItem>

            {/* After */}
            <FadeItem delay={0.12}>
              <div style={{
                background: 'rgba(167,139,250,0.04)',
                borderLeft: '2px solid rgba(167,139,250,0.4)',
                padding: '2.5rem', height: '100%',
              }}>
                <p style={{
                  fontFamily: "'Sora', sans-serif", fontSize: '0.625rem', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A78BFA',
                  marginBottom: '1.5rem', paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(167,139,250,0.2)',
                }}>
                  After Ops by Noell
                </p>
                {[
                  'Professional website live and ranking',
                  '24/7 online booking from any device',
                  'Every missed call gets instant text response',
                  'Automated reminders via text + email',
                  'No-shows down from ~4/week to less than 1',
                  'Consistent 5-star review generation',
                  'Automated re-engagement for past clients',
                  'New client pipeline running on autopilot',
                  'Average response time to missed calls: under 10 seconds',
                  'Review generation: from zero to consistent 5-star reviews within 30 days',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0,
                      background: 'rgba(167,139,250,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={11} color="#A78BFA" />
                    </div>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </FadeItem>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ position: 'relative', padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <FadeItem delay={0}>
            <div style={{ marginBottom: '1.5rem' }}>
              <SectionBadge>Your Turn</SectionBadge>
            </div>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em',
              marginBottom: '1.25rem', maxWidth: '600px', margin: '0 auto 1.25rem',
              background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'block',
            }}>
              Ready to close your revenue gaps?
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, maxWidth: '460px', margin: '0 auto 2.5rem' }}>
              30 minutes. Free. No obligation. We map your gaps, show you what we'd build, and tell you what it costs.
            </p>
            <a href="/book" className="btn-gradient" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '1rem', padding: '1rem 2.25rem' }}>
              Book Your Free Intro Call <ArrowRight size={16} />
            </a>
          </FadeItem>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
