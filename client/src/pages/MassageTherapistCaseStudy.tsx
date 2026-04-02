/*
 * OPS BY NOELL — Massage Therapist Case Study
 * Route: /case-study/massage-therapist
 * SEO: "massage therapist AI automation case study", "Ops by Noell results"
 * Primary case study page linked from homepage and massage landing page
 */

import { ArrowRight, Check, X } from 'lucide-react';
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
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: '99px', border: '1px solid #E5E5E5', background: '#FAFAF8', fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#0CA2A2' }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0CA2A2', display: 'inline-block' }} />
      {children}
    </span>
  );
}

const gaps = [
  { label: 'No website', detail: 'Zero online presence. New clients had no way to find her or learn about her services.' },
  { label: 'No online booking', detail: 'Booking required a phone call during business hours, or a text that might go unanswered.' },
  { label: 'Calls going to voicemail', detail: 'Missed calls meant missed clients. No system existed to follow up with callers automatically.' },
  { label: 'No appointment reminders', detail: 'No-shows happened regularly. Clients forgot. There was no automated reminder system in place.' },
  { label: 'No review system', detail: '25 years of exceptional work, with almost no online reviews to show for it.' },
  { label: 'No follow-up', detail: 'Once a client left, the relationship was over until they decided to call again, if they remembered.' },
];

const built = [
  { item: 'Missed call text-back', detail: 'Every missed call now triggers an instant, personalized text response. The lead stays warm and is guided toward online booking while the therapist is still in session.' },
  { item: '24/7 online booking', detail: 'Clients book themselves from any device at any time. The booking integrates directly with her calendar with no manual confirmation required.' },
  { item: 'Automated appointment reminders', detail: 'Text and email reminders go out at 48 hours and 2 hours before each appointment. No-shows dropped from an average of 4 per week to less than 1.' },
  { item: 'Review generation', detail: 'Post-appointment review requests go out automatically after each session. 5-star reviews started building consistently within 30 days of launch.' },
  { item: 'Repeat client re-engagement', detail: 'Clients who haven\'t returned in 30, 60, or 90 days receive a natural, personal-feeling outreach. Lapsed clients re-book without any manual follow-up.' },
];

const beforeItems = [
  'No website or online presence',
  'Booking by phone call only',
  'Missed calls meant lost clients permanently',
  'No appointment reminders',
  'No-shows averaging 4+ per week with no recovery',
  'Zero online reviews despite 25 years of excellent work',
  'No follow-up with past clients',
  'New clients only through personal word of mouth',
];

const afterItems = [
  'Professional website live and indexed on Google',
  '24/7 online booking from any device',
  'Every missed call gets an instant text response (under 10 seconds)',
  'Automated text + email reminders before every appointment',
  'No-shows dropped from ~4/week to less than 1/week',
  'Consistent 5-star review generation from day 30 onward',
  'Automated re-engagement for lapsed clients at 30/60/90 days',
  'New client pipeline running on autopilot without advertising',
];

export default function MassageTherapistCaseStudy() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#FFFFFF',
          /* gradient removed */
           }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5.5rem' }}>
          <FadeItem delay={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <SectionBadge>Case Study · Laguna Niguel, CA</SectionBadge>
              <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF', background: '#FFFFFF',
          /* gradient removed */
          /* _: linear-gradient(135deg, #0CA2A2, #0CA2A2)', padding: '0.3rem 0.875rem', borderRadius: '99px' }}>
                Founding Client Partner
              </span>
            </div>
          </FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em', maxWidth: '860px', marginBottom: '2rem' }}>
              <span style={{ color: '#0CA2A2', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>25 years of expertise.</span>{' '}
              <span style={{ color: '#ffffff' }}>Zero digital infrastructure.</span>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', color: '#555555', lineHeight: 1.75, maxWidth: '560px', marginBottom: '2rem' }}>
              How a solo massage therapist in Laguna Niguel went from no website, no booking system, and 4 no-shows a week to a fully automated practice in 14 days.
            </p>
          </FadeItem>
          <FadeItem delay={0.3}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Industry', value: 'Massage Therapy' },
                { label: 'Location', value: 'Laguna Niguel, CA' },
                { label: 'Experience', value: '25+ Years' },
                { label: 'Timeline', value: '14 Days to Live' },
              ].map((item, i) => (
                <div key={i} className="feature-card" style={{ padding: '1rem 1.5rem' }}>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0CA2A2', marginBottom: '0.25rem' }}>{item.label}</p>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>{item.value}</p>
                </div>
              ))}
            </div>
          </FadeItem>
          <FadeItem delay={0.4}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book Free 30-Minute Intro Call <ArrowRight size={16} />
              </a>
              <a href="/massage-therapist-automation" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                Massage Therapist Automation
              </a>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ─── BEFORE ─── */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid #E5E5E5' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'start' }} className="lg:grid-cols-2">
              <div>
                <div style={{ marginBottom: '1.25rem' }}><SectionBadge>The Client</SectionBadge></div>
                <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                  A master of her craft. Invisible to the internet.
                </h2>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#555555', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  Santa is a licensed massage therapist based in Laguna Niguel with over 25 years of experience. Her clients are loyal. Her work is exceptional. Her reputation, built entirely through word of mouth, is impeccable.
                </p>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#555555', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  But Santa had zero digital infrastructure. No website. No online booking. No automated follow-up. No review system. Every new client had to find her through a personal referral, and even then, they had to navigate a booking process that relied entirely on phone calls.
                </p>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#555555', lineHeight: 1.8 }}>
                  She was excellent at her work. Her operations were silently costing her thousands every month in missed opportunities.
                </p>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderLeft: '3px solid #0CA2A2', borderRadius: '8px', padding: '3rem' }}>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  "25 years of exceptional client work. Zero digital infrastructure. Santa was our founding client partner and the perfect proof of concept for what AI automation could do for a solo service business."
                </p>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0CA2A2' }}>
                  Ops by Noell Assessment
                </p>
              </div>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ─── GAPS ─── */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid #E5E5E5' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '520px', marginBottom: '3.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}><SectionBadge>The Gaps</SectionBadge></div>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '1rem' }}>
                Six operational gaps. Each one costing revenue daily.
              </h2>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#555555', lineHeight: 1.75 }}>
                When we sat down with Santa, we mapped every gap in her operation and quantified what each one was costing per month.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {gaps.map((gap, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div className="feature-card" style={{ padding: '2rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,80,80,0.12)', border: '1px solid rgba(255,80,80,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <X size={12} color="#ff6b6b" />
                    </div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', fontWeight: 700, color: '#ffffff' }}>{gap.label}</h3>
                  </div>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#555555', lineHeight: 1.7 }}>{gap.detail}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT WE BUILT ─── */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid #E5E5E5' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '520px', marginBottom: '3.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}><SectionBadge>What We Built</SectionBadge></div>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '1rem' }}>
                A complete operational back office. Built in two weeks.
              </h2>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#555555', lineHeight: 1.75 }}>
                We designed and installed every component. Santa didn't configure a single setting. She was live and capturing leads within 14 days of her audit.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#F0FAFA', borderRadius: '12px', overflow: 'hidden' }}>
            {built.map((item, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{ background: i % 2 === 0 ? 'rgba(12,162,162,0.02)' : 'rgba(12,162,162,0.04)', padding: '1.75rem 2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(12,162,162,0.15)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={16} color="#0CA2A2" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.375rem' }}>{item.item}</h3>
                    <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#555555', lineHeight: 1.7 }}>{item.detail}</p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid #E5E5E5' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div style={{ marginBottom: '1.25rem' }}><SectionBadge>The Results</SectionBadge></div>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: '1rem' }}>
                Before and after.
              </h2>
            </div>
          </FadeItem>

          {/* Key stats */}
          <FadeItem delay={0}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
              {[
                { value: '~4/week', label: 'No-shows before', color: '#ff6b6b' },
                { value: '<1/week', label: 'No-shows after', color: '#0CA2A2' },
                { value: '<10s', label: 'Missed call response time', color: '#0CA2A2' },
                { value: '14 days', label: 'From zero to fully live', color: '#0CA2A2' },
                { value: '$33,000+', label: 'Annual revenue recovered', color: '#0CA2A2' },
              ].map(({ value, label, color }) => (
                <div key={label} style={{ textAlign: 'center', padding: '2rem', background: '#FFFFFF', border: '1px solid rgba(12,162,162,0.12)', borderRadius: '10px' }}>
                  <div style={{ fontFamily: "'Nicholas', serif", fontSize: '2rem', fontWeight: 800, color, lineHeight: 1.1, marginBottom: '0.5rem' }}>{value}</div>
                  <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.8125rem', color: '#555555' }}>{label}</div>
                </div>
              ))}
            </div>
          </FadeItem>

          {/* Before / After grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', background: 'transparent', borderRadius: '12px', overflow: 'hidden' }} className="md:grid-cols-2">
            <FadeItem delay={0}>
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '2.5rem', height: '100%' }}>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  Before Ops by Noell
                </p>
                {beforeItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0, background: 'rgba(255,80,80,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={11} color="rgba(255,100,100,0.6)" />
                    </div>
                    <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </FadeItem>
            <FadeItem delay={0.12}>
              <div style={{ background: '#FFFFFF', borderLeft: '2px solid rgba(12,162,162,0.4)', padding: '2.5rem', height: '100%' }}>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0CA2A2', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(12,162,162,0.2)' }}>
                  After Ops by Noell
                </p>
                {afterItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={11} color="#0CA2A2" />
                    </div>
                    <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </FadeItem>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ position: 'relative', padding: '7rem 0', borderTop: '1px solid #E5E5E5', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(12,162,162,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <SectionBadge>Your Turn</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginTop: '1.25rem', marginBottom: '1.25rem', color: '#0CA2A2', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'block' }}>
              Ready to close your own revenue gaps?
            </h2>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#555555', lineHeight: 1.75, maxWidth: '460px', margin: '0 auto 2.5rem' }}>
              30 minutes. Free. No obligation. We map your gaps, show you what we'd build, and tell you what it costs.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/book" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book Free 30-Minute Intro Call <ArrowRight size={17} />
              </a>
              <a href="/services" className="btn-outline" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem' }}>
                See Pricing
              </a>
            </div>
          </FadeItem>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
