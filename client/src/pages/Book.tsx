/*
 * OPS BY NOELL — Book a Free Intro Call
 * Design: Quiet Editorial Luxury
 * Sections: Compact Centered Hero, GHL Booking (above fold), What to Expect, Santa Testimonial, Final CTA
 */

import { useEffect, useRef } from 'react';
import { ArrowRight, Clock, TrendingDown, Shield } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';
import { trpc } from '@/lib/trpc';

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

const expectations = [
  {
    icon: Clock,
    title: '30 minutes, no pitch',
    detail: 'Video or phone, your choice. Relaxed, conversational, no slides or sales deck. We listen first and ask the right questions.',
  },
  {
    icon: TrendingDown,
    title: 'Revenue leaks identified',
    detail: 'Even in 30 minutes, we can usually identify 2-3 operational gaps costing you the most, and estimate what each one costs per month.',
  },
  {
    icon: Shield,
    title: 'Zero pressure',
    detail: 'This is a diagnostic call, not a sales call. We tell you exactly what we\'d build and why. You leave with clarity regardless of what you decide.',
  },
];

export default function Book() {
  const bookingPageVisit = trpc.notifications.bookingPageVisit.useMutation();
  const bookingIntent = trpc.notifications.bookingIntent.useMutation();
  const visitFired = useRef(false);

  // Fire page-visit notification once on mount
  useEffect(() => {
    if (visitFired.current) return;
    visitFired.current = true;
    bookingPageVisit.mutate({
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBookingCTA = (source: string) => {
    bookingIntent.mutate({ source, page: '/book' });
  };

  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ─── COMPACT CENTERED HERO ─── */}
      <section style={{
        paddingTop: '110px',
        paddingBottom: '2rem',
        backgroundColor: 'transparent',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Free 30-Minute Audit</p>
          </FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 700,
              color: '#F5F0EC',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}>
              Book Your Free 30-Minute Audit
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '1.0625rem',
              color: '#868583',
              lineHeight: 1.75,
            }}>
              No pitch. No slides. We listen first and show you your numbers.
            </p>
          </FadeItem>
        </div>
      </section>

      {/* ─── GHL BOOKING WIDGET (above fold) ─── */}
      <section style={{ paddingBottom: '5rem' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <FadeItem delay={0.3}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(167,139,250,0.15)',
              background: '#ffffff',
              boxShadow: '0 0 0 1px rgba(167,139,250,0.08), 0 24px 48px rgba(0,0,0,0.4)',
            }}>
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/ko7eXb5zooItceadiV02"
                style={{ width: '100%', height: '750px', border: 'none', display: 'block', background: '#ffffff' }}
                scrolling="no"
                title="Book a call with Ops by Noell"
              />
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ─── WHAT TO EXPECT (below fold) ─── */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>What to Expect</p>

            {/* Key bullets */}
            <div style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                '30 minutes, no pitch. We listen first.',
                'You will see the math — exactly what your gaps cost monthly.',
                'No obligation. If it is not the right fit, we will tell you.',
              ].map((bullet, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A78BFA', flexShrink: 0, marginTop: '0.5rem' }} />
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#F5F0EC', lineHeight: 1.6, margin: 0 }}>{bullet}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {expectations.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.25rem',
                    padding: '1.5rem 0',
                    borderBottom: i < expectations.length - 1 ? '1px solid rgba(167,139,250,0.12)' : 'none',
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'rgba(20,20,20,0.55)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <item.icon size={16} color="#A78BFA" />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#F5F0EC',
                      marginBottom: '0.375rem',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#868583', lineHeight: 1.7 }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ─── Santa Testimonial (below fold) ─── */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <div style={{
              background: 'rgba(167,139,250,0.04)',
              border: '1px solid rgba(167,139,250,0.25)',
              borderLeft: '4px solid #A78BFA',
              borderRadius: '12px',
              padding: '2.5rem 3rem',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#A78BFA" style={{ display: 'inline-block' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', fontWeight: 600, color: '#ffffff', lineHeight: 1.65, marginBottom: '1.25rem', fontStyle: 'italic' }}>
                "I used to dread Mondays because there would always be gaps I did not expect. Now I open my calendar and it is just full. The reminders go out and people show up. I do not think about it anymore."
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#A78BFA' }}>
                Santa M. — Licensed Massage Therapist, Laguna Niguel CA
              </p>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Still Have Questions?</p>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: '#F5F0EC',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              maxWidth: '560px',
              margin: '0 auto 1.25rem',
            }}>
              The intro call answers everything. It costs nothing.
            </h2>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '1rem',
              color: '#868583',
              lineHeight: 1.75,
              maxWidth: '420px',
              margin: '0 auto 2.5rem',
            }}>
              Reach out directly at{' '}
              <a href="mailto:hello@opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>
                hello@opsbynoell.com
              </a>
              {' '}or book your free intro call above.
            </p>
            <a href="#top" className="btn-primary" onClick={() => handleBookingCTA('final-cta-choose-a-time')}>
              Choose a Time
              <ArrowRight size={14} />
            </a>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}
