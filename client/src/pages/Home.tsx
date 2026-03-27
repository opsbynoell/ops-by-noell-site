/*
 * OPS BY NOELL — Home Page (NeuraFlas Design System)
 * Structure: Nav → Hero → How It Works → Testimonials → CTA → Footer
 */

import { Star, Zap, ArrowRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/* ─── DATA ─────────────────────────────────────────────────────── */


const STEPS = [
  {
    number: '01',
    title: 'Free Intro Call',
    desc: 'A free 30-minute conversation about your business. We learn what\'s working, what isn\'t, and tell you honestly whether automation is the right fit.',
  },
  {
    number: '02',
    title: 'Revenue Audit',
    desc: 'We map every revenue gap, quantify the monthly cost in dollars, and design your complete custom system on paper before you commit to building anything.',
  },
  {
    number: '03',
    title: 'We Build It. We Run It.',
    desc: 'We build your system, test everything before go-live, and manage it from there. You focus on your business. We handle the backend.',
  },
];


const TESTIMONIALS = [
  {
    name: 'Maria S.',
    role: 'Med Spa Owner, Irvine CA',
    text: "We were losing leads every weekend when the front desk wasn't available. Noell set up a missed-call text system and booking automation — we booked 11 new clients in the first 30 days without changing anything else.",
    stars: 5,
  },
  {
    name: 'James K.',
    role: 'HVAC Company, Orange County',
    text: "The follow-up sequences alone paid for the entire setup. Leads that went cold for 2 weeks started booking. We've recaptured thousands in revenue we would have just left on the table.",
    stars: 5,
  },
  {
    name: 'Rachel T.',
    role: 'Dental Practice, San Diego',
    text: "Our no-show rate dropped from 22% to under 10% in the first month. The reminder sequences are exactly what we needed. Setup was seamless and Noell handled everything.",
    stars: 5,
  },
];


/* ─── SHARED BADGE COMPONENT ────────────────────────────────────── */
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
      <span style={{
        display: 'inline-block',
        padding: '0.3rem 0.875rem',
        background: 'rgba(167,139,250,0.1)',
        border: '1px solid rgba(167,139,250,0.25)',
        borderRadius: '100px',
        fontFamily: "'Sora', sans-serif",
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#C4B5FD',
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
      }}>
        {children}
      </span>
    </div>
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

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function Home() {

  return (
    <>
      <Nav />
      <div style={{ backgroundColor: '#010509', minHeight: '100vh', overflowX: 'hidden' }}>

        {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        paddingTop: '160px',
        paddingBottom: '120px',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Vertical gradient backdrop */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(120,58,237,0.28) 0%, rgba(139,92,246,0.18) 35%, #010509 72%)',
        }} />
        {/* Purple orb */}
        <div style={{
          position: 'absolute', top: '5%', left: '50%',
          transform: 'translateX(-50%)',
          width: '700px', height: '700px', pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.16) 0%, rgba(167,139,250,0.06) 40%, transparent 70%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 1rem',
              background: 'rgba(167,139,250,0.12)',
              border: '1px solid rgba(167,139,250,0.3)',
              borderRadius: '100px',
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.8125rem', fontWeight: 500, color: '#C4B5FD', letterSpacing: '0.02em',
            }}>
              <Zap size={13} style={{ color: '#A78BFA' }} />
              Done-For-You AI Automation
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
            fontWeight: 800, color: '#ffffff',
            lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1.5rem',
          }}>
            Your Business Runs{' '}
            <GradientText>24/7.</GradientText>
            <br />Even When You Don't.
          </h1>

          {/* Sub */}
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.175rem)',
            color: '#868583', lineHeight: 1.75,
            maxWidth: '600px', margin: '0 auto 2.5rem',
          }}>
            We build the systems. Automation runs them. You get your time back.<br /><br />Follow-up. Bookings. Reminders. Reviews. AI receptionist and more. We build done-for-you automation systems for service businesses, so you can get back to doing what you do best.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book Free Intro Call <ArrowRight size={16} />
            </a>
            <a href="/services" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              See How It Works
            </a>
          </div>

          {/* Trust stats */}
          <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { value: '< 10s', label: 'Avg. lead response time' },
              { value: '−42%', label: 'No-show rate reduction' },
              { value: '24/7', label: 'Automation uptime' },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: '1.625rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>{value}</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', marginTop: '0.25rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ HOW IT WORKS ══════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: 'rgba(167,139,250,0.015)', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <SectionBadge>How It Works</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              From audit to autopilot{' '}<GradientText>in 14 days</GradientText>
            </h2>
          </div>

          <div>
            {STEPS.map(({ number, title, desc }, i) => (
              <div key={number} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                padding: '3rem 0',
                borderBottom: i < STEPS.length - 1 ? '1px solid rgba(167,139,250,0.08)' : 'none',
              }}>
                {/* Big step number */}
                <div style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', order: i % 2 === 0 ? 0 : 1 }}>
                  <span className="step-number">{number}</span>
                </div>

                {/* Content */}
                <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    marginBottom: '1rem', padding: '0.25rem 0.875rem',
                    background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
                    borderRadius: '100px', fontFamily: "'Sora', sans-serif",
                    fontSize: '0.75rem', color: '#C4B5FD', fontWeight: 600,
                  }}>
                    Step {number}
                  </div>
                  <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.25, marginBottom: '1rem', letterSpacing: '-0.015em' }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, maxWidth: '440px' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ══════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', background: 'rgba(167,139,250,0.015)', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionBadge>Client Results</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Real businesses.{' '}<GradientText>Measurable results.</GradientText>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {TESTIMONIALS.map(({ name, role, text, stars }) => (
              <div key={name} className="testimonial-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={15} style={{ color: '#A78BFA', fill: '#A78BFA' }} />
                  ))}
                </div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.75, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  "{text}"
                </p>
                <div>
                  <div style={{ fontFamily: "'Nicholas', serif", fontWeight: 700, color: '#ffffff', fontSize: '0.9375rem' }}>{name}</div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', marginTop: '0.125rem' }}>{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ══════════════════════════════════════════════ */}
      <section style={{ padding: '8rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.14) 0%, transparent 65%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto' }}>
          <SectionBadge>Get Started Today</SectionBadge>
          <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Stop losing leads to{' '}<GradientText>slow follow-up.</GradientText>
          </h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.125rem', color: '#868583', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            30 minutes. Free. No obligation. We map your gaps, show you what we'd build, and tell you what it costs.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/book" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book Free Intro Call <ArrowRight size={17} />
            </a>
            <a href="/case-study" className="btn-outline" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem' }}>
              See Our Results
            </a>
          </div>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', marginTop: '1.5rem' }}>
            No commitment. No credit card. Just a conversation.
          </p>
        </div>
      </section>

      </div>
      <Footer />
    </>
  );
}
