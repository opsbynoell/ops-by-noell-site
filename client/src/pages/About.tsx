/*
 * OPS BY NOELL — About Page
 * Design: Premium Dark · Tech AI Agency
 * Sections: Hero, Who We Are, Why We Built This, Differentiators, Audit CTA
 */

import { ArrowRight, Zap, Shield, Target, TrendingUp } from 'lucide-react';
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

const differentiators = [
  {
    icon: Target,
    number: '01',
    title: 'We build it. It runs. We’re still here.',
    body: 'This isn’t a tool you figure out yourself. We design your system, build every piece, and get it running. After that, the automation does the work, and we stay available when you need us. You never touch a setting.',
  },
  {
    icon: TrendingUp,
    number: '02',
    title: 'Revenue outcomes, not vanity metrics.',
    body: "We don't report on impressions or follower counts. We track what matters: new appointments booked, no-shows prevented, reviews collected, and revenue recovered.",
  },
  {
    icon: Zap,
    number: '03',
    title: 'Custom-built for your business.',
    body: "No generic templates. Every system is scoped around your specific workflows, client journey, and growth objectives, then maintained and optimized as you scale.",
  },
  {
    icon: Shield,
    number: '04',
    title: 'We show you the math first.',
    body: 'Before you spend a dollar, we quantify exactly what your current operational gaps are costing you monthly. You see the numbers. You decide if the investment makes sense. No pressure, no pitch. Just clarity.',
    highlight: true,
  },
];

export default function About() {
  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{
        paddingTop: '110px',
        paddingBottom: '3rem',
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>About Ops by Noell</p>
          </FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              color: '#F5F0EB',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: '720px',
              marginBottom: '1.5rem',
            }}>
              Built by The Noells.{' '}
              <span style={{ color: '#A78BFA', fontWeight: 700 }}>Powered by automation. Backed by people who care.</span>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.0625rem',
              color: '#C8C0B8',
              lineHeight: 1.75,
              maxWidth: '580px',
              marginBottom: '1rem',
            }}>
              We're Nikki and James Noell, and we put our last name on this for a reason.
            </p>
          </FadeItem>
          <FadeItem delay={0.25}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.0625rem',
              color: '#C8C0B8',
              lineHeight: 1.75,
              maxWidth: '580px',
            }}>

            </p>
          </FadeItem>
        </div>
      </section>

      {/* ─── WHO WE ARE ─── */}
      <section className="section-pad" style={{ backgroundColor: 'rgba(20,20,20,0.55)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="lg:grid-cols-2">
            <FadeItem delay={0}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '1rem' }}>Who We Are</p>
                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 700,
                  color: '#F5F0EB',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                }}>
                  We come from operations. We build what actually works.
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#C8C0B8', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  We're Nikki and James Noell, a husband-and-wife team from Lake Forest, California. We’ve spent years inside fast-growing companies building systems, managing operations, and fixing what was broken. That’s just how we’re wired.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#C8C0B8', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  We kept seeing the same thing: talented people running great businesses, losing clients not because of bad service, but because nothing happened after the call. No follow-up. No reminder. No review request. The work was excellent. The systems behind it were nonexistent.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#C8C0B8', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  So we built the fix. And then we built it for everyone else.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#C8C0B8', lineHeight: 1.8 }}>
                  Today, we work with appointment-based service businesses, from wellness practices and salons to dental offices and home services. If your business runs on bookings and phone calls, we build the AI systems that make sure nothing falls through the cracks.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#C8C0B8', lineHeight: 1.8 }}>
                  Ops by Noell is our family name on the door. That means something to us. Every system we build, we build like it's our own business on the line. Because in a way, it is.
                </p>
              </div>
            </FadeItem>

            <FadeItem delay={0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', backgroundColor: '#2A2A2A' }}>
                {[
                  { label: 'Founded', value: '2025', sub: 'Lake Forest, CA' },
                  { label: 'Avg. Time to Live', value: '2 wks', sub: 'From audit to launch' },
                  { label: 'No-Show Reduction', value: '30–50%', sub: 'With automated reminders' },
                  { label: 'Response Time', value: '< 10 sec', sub: 'Missed call text-back' },
                ].map((stat, i) => (
                  <div key={i} style={{ backgroundColor: 'transparent', padding: '2rem 1.5rem' }}>
                    <p style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1,
                      marginBottom: '0.375rem',
                      letterSpacing: '-0.02em',
                    }}>
                      {stat.value}
                    </p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: '#A78BFA',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                    }}>
                      {stat.label}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#8A8480' }}>
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>
            </FadeItem>
          </div>
        </div>
      </section>

      {/* ─── WHY WE BUILT THIS ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Why We Built This</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: '#F5F0EB',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}>
                Most automation stops at the surface. We go deeper.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.0625rem', color: '#C8C0B8', lineHeight: 1.8 }}>
                The automation industry is full of tools, platforms, and consultants who hand you a login and call it done. We built Ops by Noell because we believed businesses deserved something different: a partner who builds the system, manages it ongoing, and is accountable for the results.
              </p>
            </div>
          </FadeItem>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', backgroundColor: '#2A2A2A' }} className="md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Intro Call',
                body: 'A free 15-minute conversation. We learn about your business, you learn about us, and we figure out if automation is the right move. No pitch. No pressure.',
              },
              {
                step: '02',
                title: 'Revenue Audit',
                body: 'A paid deep-dive into your operation. We map every gap, quantify the monthly revenue impact, and design your custom system. You see the full picture before committing to a build.',
              },
              {
                step: '03',
                title: 'Manage',
                body: 'We monitor your systems, optimize what’s working, and adjust as your business grows. And when you have questions, Nova (our AI assistant) is available around the clock. When something needs us directly, we’re here.',
              },
            ].map((item, i) => (
              <FadeItem key={i} delay={i * 0.12}>
                <div style={{ backgroundColor: 'rgba(20,20,20,0.55)', padding: '2.5rem', height: '100%' }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: 'rgba(167,139,250,0.15)',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: '1rem',
                  }}>
                    {item.step}
                  </span>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#F5F0EB',
                    marginBottom: '0.875rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: '#C8C0B8', lineHeight: 1.75 }}>
                    {item.body}
                  </p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIFFERENTIATORS ─── */}
      <section className="section-pad" style={{ backgroundColor: 'rgba(20,20,20,0.55)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '520px', marginBottom: '4rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Why Ops by Noell</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700,
                color: '#F5F0EB',
                lineHeight: 1.1,
              }}>
                Four things that make us different.
              </h2>
            </div>
          </FadeItem>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1px', backgroundColor: '#2A2A2A' }} className="md:grid-cols-2">
            {differentiators.map((d, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{
                  backgroundColor: d.highlight ? '#1A1A1A' : '#0A0A0A',
                  border: d.highlight ? '1px solid #A78BFA' : 'none',
                  padding: '2.5rem',
                  height: '100%',
                  position: 'relative',
                }}>
                  {d.highlight && (
                    <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.5625rem',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#A78BFA',
                        border: '1px solid rgba(167,139,250,0.3)',
                        padding: '0.25rem 0.625rem',
                        backgroundColor: 'rgba(167,139,250,0.08)',
                      }}>
                        Signature Promise
                      </span>
                    </div>
                  )}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <d.icon size={24} color="#A78BFA" />
                  </div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.375rem',
                    fontWeight: 700,
                    color: '#F5F0EB',
                    lineHeight: 1.2,
                    marginBottom: '1rem',
                  }}>
                    {d.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: '#C8C0B8', lineHeight: 1.75 }}>
                    {d.body}
                  </p>
                  {d.highlight && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <a href="/book" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#A78BFA',
                        textDecoration: 'none',
                      }}>
                        Book Free Intro Call <ArrowRight size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Work With Us</p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
              fontWeight: 700,
              color: '#F5F0EB',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              maxWidth: '600px',
              margin: '0 auto 1.25rem',
            }}>
              Let's find out what your gaps are costing you.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#C8C0B8',
              lineHeight: 1.75,
              maxWidth: '460px',
              margin: '0 auto 2.5rem',
            }}>
              15 minutes. Free. No obligation. We learn about your business, you learn about us, and we figure out together if we're the right fit.
            </p>
            <a href="/book" className="btn-primary">
              Book Free Intro Call
              <ArrowRight size={14} />
            </a>
          </FadeItem>
        </div>
      </section>

      <Footer />

      <style>{`
        .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
