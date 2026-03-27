/*
 * OPS BY NOELL — Book a Free Intro Call
 * Design: Quiet Editorial Luxury
 * Sections: Hero, What to Expect + GHL Booking, Reassurance Strip, Final CTA
 */

import { useEffect, useRef } from 'react';
import { ArrowRight, Clock, TrendingDown, Shield } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';
import { trpc } from '@/lib/trpc';

const STONE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663120940829/n7rBKSsjtvarmxAHpVkZmb/hero-light-motion-m2RtUgSKb9cHxo2CrwfdUd.webp';

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
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{
        paddingTop: '110px',
        paddingBottom: '3rem',
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          backgroundImage: `url(${STONE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, #0A0A0A 60%, transparent 100%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Free 30-Min Intro Call</p>
          </FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              color: '#F5F0EC',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: '680px',
              marginBottom: '1.5rem',
            }}>
              Let's talk. 30 minutes. No pitch. No pressure.
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '1.0625rem',
              color: '#868583',
              lineHeight: 1.75,
              maxWidth: '520px',
            }}>
              Book a free intro call with Nikki. We'll learn about your business, identify where automation can make an immediate difference, and tell you exactly what we'd build. If it's a fit, we'll recommend a Revenue Audit as the next step. If it's not, we'll tell you that too.
            </p>
          </FadeItem>
        </div>
      </section>

      {/* ─── MAIN CONTENT: WHAT TO EXPECT + GHL BOOKING ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent', paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', alignItems: 'start' }} className="lg:grid-cols-[1fr_1.5fr]">

            {/* Left: What to Expect */}
            <FadeItem delay={0}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>What to Expect</p>
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
              </div>
            </FadeItem>

            {/* Right: GHL Booking Widget */}
            <FadeItem delay={0.15}>
              <div id="booking">
                <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Choose a Time</p>
                <iframe
                  src="https://api.leadconnectorhq.com/widget/booking/ko7eXb5zooItceadiV02"
                  style={{ width: '100%', height: '750px', border: 'none', borderRadius: '0.75rem', overflow: 'hidden' }}
                  scrolling="no"
                  title="Book a call with Ops by Noell"
                />
              </div>
            </FadeItem>
          </div>
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
            <a href="#booking" className="btn-primary" onClick={() => handleBookingCTA('final-cta-choose-a-time')}>
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
