/*
 * OPS BY NOELL — Home Page (NeuraFlas Design System)
 * Structure: Nav → Hero → Case Study → Calculator CTA → How It Works → Industries → Final CTA → Footer
 */

import { Star, Zap, ArrowRight } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { RevealSection } from '@/components/RevealSection'
import { SectionDivider } from '@/components/SectionDivider'

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
        fontFamily: "'Nicholas', serif",
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
          <div className="hero-glow" style={{
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
                fontFamily: "'Nicholas', serif",
                fontSize: '0.875rem', fontWeight: 500, color: '#C4B5FD', letterSpacing: '0.02em',
              }}>
                <Zap size={13} style={{ color: '#A78BFA' }} />
                Done-For-You AI Automation
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              fontWeight: 800, color: '#ffffff', overflowWrap: 'break-word', wordBreak: 'break-word',
              lineHeight: 1.7, letterSpacing: '-0.03em', marginBottom: '1.5rem',
            }}>
              You're losing clients <span style={{ whiteSpace: 'nowrap' }}>between appointments.</span>{' '}
              <GradientText>We build the systems that stop that.</GradientText>
            </h1>

            {/* Sub */}
            <p style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1rem, 2vw, 1.175rem)',
              color: '#b8b6b3', lineHeight: 1.75,
              maxWidth: '640px', margin: '0 auto 2.5rem',
            }}>
              Every missed call, every no-show, every slow follow-up is revenue walking out your door. We build AI-powered systems that stop the bleeding, automatically, for massage therapists, dental practices, and local service businesses.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <a href="/resources/revenue-calculator" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                See What You're Losing <ArrowRight size={16} />
              </a>
              <a href="/book" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                Book a Free 30-Minute Audit
              </a>
            </div>

            {/* Trust stats */}
            <div style={{
              background: 'rgba(167,139,250,0.04)',
              borderTop: '1px solid rgba(167,139,250,0.08)',
              borderBottom: '1px solid rgba(167,139,250,0.08)',
              padding: '2.5rem 0',
              margin: '0 -1rem',
            }}>
              <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { value: '40+', label: 'Google reviews generated' },
                  { value: '$960', label: 'Recovered in 14 days' },
                  { value: '75%', label: 'Fewer no-shows' },
                ].map(({ value, label }) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Nicholas', serif", fontSize: '1.625rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.7 }}>{value}</div>
                    <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3', marginTop: '0.25rem' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TRUST STRIP ═══════════════════════════════════════════ */}
        <div style={{
          textAlign: 'center',
          padding: '2rem 0',
          fontFamily: "'Nicholas', serif",
          fontSize: '0.875rem',
          fontWeight: 400,
          color: '#a0a7b4',
          letterSpacing: '0.02em',
        }}>
          Trusted by massage therapists, dental practices, and med spas across Orange County.
        </div>

        <SectionDivider />

        {/* ═══ CASE STUDY ════════════════════════════════════════════ */}
        <RevealSection>
        <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>Client Case Study</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 4vw, 2.5rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, letterSpacing: '-0.02em' }}>
                From zero infrastructure to{' '}<GradientText>fully automated in 14 days.</GradientText>
              </h2>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
              {[
                { value: '4/wk → <1', label: 'No-shows' },
                { value: '40+', label: 'Reviews in 8 weeks' },
                { value: '$960', label: 'Revenue recovered' },
                { value: '2 weeks', label: 'To go live' },
              ].map(({ value, label }) => (
                <div key={label} style={{
                  textAlign: 'center', padding: '1.75rem',
                  background: 'rgba(167,139,250,0.04)',
                  border: '1px solid rgba(167,139,250,0.15)',
                  borderRadius: '10px',
                }}>
                  <div style={{ fontFamily: "'Nicholas', serif", fontSize: '1.625rem', fontWeight: 800, color: '#A78BFA', lineHeight: 1.7, marginBottom: '0.375rem' }}>{value}</div>
                  <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3' }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Santa quote */}
            <div style={{
              background: 'rgba(167,139,250,0.04)',
              border: '1px solid rgba(167,139,250,0.25)',
              borderLeft: '4px solid #A78BFA',
              borderRadius: '12px',
              padding: '2.5rem 3rem',
              marginBottom: '2.5rem',
            }}>
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} style={{ color: '#A78BFA', fill: '#A78BFA' }} />
                ))}
              </div>
              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                fontWeight: 600, color: '#ffffff',
                lineHeight: 1.65, marginBottom: '1.25rem',
                fontStyle: 'italic',
              }}>
                "I went from no website, no booking system, and 4 no-shows a week to a fully automated practice in 14 days. I didn't have to figure out a single thing."
              </p>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#A78BFA' }}>
                Santa M. — Licensed Massage Therapist, Laguna Niguel CA
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <a href="/case-study" className="btn-outline" style={{ padding: '0.875rem 2rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Read the Full Case Study <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>
        </RevealSection>

        <SectionDivider />

        {/* ═══ CALCULATOR CTA ══════════════════════════════════════════ */}
        <RevealSection>
        <section style={{ padding: '6rem 0', background: 'rgba(167,139,250,0.015)', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
          <div className="container" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <SectionBadge>Free Tool</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 2.75rem)', fontWeight: 800, color: '#ffffff', overflowWrap: 'break-word', wordBreak: 'break-word', lineHeight: 1.7, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
              How much are you actually losing?
            </h2>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', color: '#b8b6b3', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2.25rem' }}>
              Most practice owners are shocked by the number. Enter a few inputs and see your exact monthly revenue leak before you spend a dollar on automation.
            </p>
            <a href="/resources/revenue-calculator" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              See My Numbers <ArrowRight size={17} />
            </a>
          </div>
        </section>
        </RevealSection>

        {/* ═══ HOW IT WORKS ══════════════════════════════════════════ */}
        <RevealSection>
        <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <SectionBadge>How It Works</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 4vw, 2.5rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, letterSpacing: '-0.02em' }}>
                From audit to autopilot{' '}<GradientText>in 14 days</GradientText>
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              maxWidth: '900px',
              margin: '0 auto',
            }} className="sm:grid-cols-1">
              {/* Left column */}
              <div style={{
                padding: '2.5rem',
                background: 'rgba(167,139,250,0.04)',
                border: '1px solid rgba(167,139,250,0.15)',
                borderRadius: '12px',
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  marginBottom: '1rem', padding: '0.25rem 0.875rem',
                  background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
                  borderRadius: '100px', fontFamily: "'Nicholas', serif",
                  fontSize: '0.75rem', color: '#C4B5FD', fontWeight: 600,
                }}>
                  Step 1
                </div>
                <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, marginBottom: '1rem', letterSpacing: '-0.015em' }}>
                  We audit your gaps.
                </h3>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75 }}>
                  Every engagement starts with a free 30-minute call where we map every missed call, no-show, and follow-up gap that's costing you revenue. You see the numbers before you commit to anything.
                </p>
              </div>

              {/* Right column */}
              <div style={{
                padding: '2.5rem',
                background: 'rgba(167,139,250,0.04)',
                border: '1px solid rgba(167,139,250,0.15)',
                borderRadius: '12px',
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  marginBottom: '1rem', padding: '0.25rem 0.875rem',
                  background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)',
                  borderRadius: '100px', fontFamily: "'Nicholas', serif",
                  fontSize: '0.75rem', color: '#C4B5FD', fontWeight: 600,
                }}>
                  Step 2
                </div>
                <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, marginBottom: '1rem', letterSpacing: '-0.015em' }}>
                  Then we build and run the fix.
                </h3>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75 }}>
                  We design, build, and manage your entire automation stack — missed call text-back, booking reminders, review generation, lead follow-up. You don't touch a single login.
                </p>
              </div>
            </div>
          </div>
        </section>
        </RevealSection>

        <SectionDivider />

        {/* ═══ INDUSTRIES ════════════════════════════════════════════ */}
        <RevealSection>
        <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>Industries We Serve</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 4vw, 2.5rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                Explore how this works{' '}<GradientText>for your business</GradientText>
              </h2>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#b8b6b3', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
                Every appointment-based business has the same core revenue gaps. We've built the fixes for all of them.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { label: 'Med Spas', href: '/med-spa-automation', desc: 'High-value appointments, zero missed calls' },
                { label: 'Salons', href: '/salon-automation', desc: 'Fill your chair. Keep it full.' },
                { label: 'Massage Therapists', href: '/massage-therapist-automation', desc: 'From zero infrastructure to automated' },
                { label: 'Dental Offices', href: '/dental-automation', desc: 'Reduce no-shows, automate recall' },
                { label: 'Home Services', href: '/home-services-automation', desc: 'Never miss a job request again' },
              ].map(({ label, href, desc }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    display: 'block',
                    padding: '1.75rem',
                    background: 'rgba(167,139,250,0.04)',
                    border: '1px solid rgba(167,139,250,0.15)',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.4)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(167,139,250,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.15)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(167,139,250,0.04)';
                  }}
                >
                  <div style={{ fontFamily: "'Nicholas', serif", fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.375rem' }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3', lineHeight: 1.7 }}>
                    {desc}
                  </div>
                  <div style={{ marginTop: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: "'Nicholas', serif", fontSize: '0.75rem', color: '#A78BFA', fontWeight: 600 }}>
                    Learn more <ArrowRight size={12} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        </RevealSection>

        <SectionDivider />

        {/* ═══ FINAL CTA ══════════════════════════════════════════════ */}
        <RevealSection>
        <section style={{ padding: '8rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.14) 0%, transparent 65%)',
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '720px', margin: '0 auto' }}>
            <SectionBadge>Get Started Today</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 4vw, 2.5rem)', fontWeight: 800, color: '#ffffff', overflowWrap: 'break-word', wordBreak: 'break-word', lineHeight: 1.7, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              Your practice deserves a back office{' '}<GradientText>that never sleeps.</GradientText>
            </h2>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1.125rem', color: '#b8b6b3', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
              We only take on clients we are confident we can help. If your practice is not a fit, we will tell you on the first call.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <img
                src="/images/noell-family.jpg"
                alt="Nikki Noell"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(167,139,250,0.3)',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', fontWeight: 400, textAlign: 'left' }}>
                You'll talk directly with Nikki. 30 minutes. Free. No obligation.
              </span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/book" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book a Free 30-Minute Audit <ArrowRight size={17} />
              </a>
              <a href="/resources/revenue-calculator" className="btn-outline" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                See What You're Losing <ArrowRight size={16} />
              </a>
            </div>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3', marginTop: '1.5rem' }}>
              No commitment. No credit card. Just a conversation.
            </p>
          </div>
        </section>
        </RevealSection>

      </div>
      <Footer />
    </>
  );
}
