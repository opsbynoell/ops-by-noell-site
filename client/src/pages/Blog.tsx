/*
 * OPS BY NOELL — Blog Index (NeuraFlas Design System)
 * Lists all published posts; newest first.
 */

import { ArrowRight, Clock, Calendar } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';

function FadeItem({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn(0.1);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: 'linear-gradient(90deg, #0CA2A2 0%, #0DCFCF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {children}
    </span>
  );
}

/* ─── POSTS DATA ─────────────────────────────────────────────────
   Newest first. Add new entries at the top of this array.
   ─────────────────────────────────────────────────────────────── */
const POSTS = [
  {
    slug: '/blog/5-signs-your-salon-needs-automation',
    category: 'Salons',
    title: '5 Signs Your Salon Needs Automation Right Now',
    excerpt: 'Not every salon needs a full tech overhaul. But some problems are costing you thousands per month — and they\'re fixable with systems that run themselves. Here\'s how to tell if you\'re there.',
    date: 'March 2026',
    readTime: '5 min read',
  },
  {
    slug: '/blog/real-cost-of-missed-calls-oc-service-businesses',
    category: 'Revenue Strategy',
    title: 'The Real Cost of Missed Calls for OC Service Businesses',
    excerpt: '85% of callers who reach voicemail at a local business will not call back. For service businesses running on appointments, that number has a very specific dollar value.',
    date: 'March 2026',
    readTime: '6 min read',
  },
  {
    slug: '/blog/how-laguna-niguel-massage-therapist-cut-no-shows',
    category: 'Case Study',
    title: 'How a Laguna Niguel Massage Therapist Cut No-Shows from 4 a Week to Less Than 1',
    excerpt: 'Santa has 25 years of experience and a loyal client base. What she didn\'t have was any digital infrastructure. Here\'s what changed in two weeks.',
    date: 'March 2026',
    readTime: '5 min read',
  },
];

export default function Blog() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* ═══ PAGE HERO ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '140px', paddingBottom: '64px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.15) 0%, rgba(139,92,246,0.06) 45%, #010509 72%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(12,162,162,0.06)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '100px', fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600, color: '#0CA2A2', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.25rem' }}>
              The Ops Blog
            </span>
          </FadeItem>
          <FadeItem delay={0.06}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1.125rem' }}>
              Real strategies. <GradientText>Real numbers.</GradientText> No fluff.
            </h1>
          </FadeItem>
          <FadeItem delay={0.12}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#868583', lineHeight: 1.75, maxWidth: '540px' }}>
              Practical AI automation insights for massage therapists, med spas, salons, and appointment-based businesses in Orange County.
            </p>
          </FadeItem>
        </div>
      </section>

      {/* ═══ POSTS LIST ══════════════════════════════════════════════ */}
      <section style={{ padding: '0 0 6rem' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.5rem' }}>
            {POSTS.map((post, i) => (
              <FadeItem key={post.slug} delay={i * 0.08}>
                <a
                  href={post.slug}
                  style={{ display: 'block', textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).querySelector('.post-card')?.setAttribute('style', 'background: rgba(167,139,250,0.06); border-color: rgba(167,139,250,0.3); border-radius: 16px; padding: 2.25rem; transition: all 0.2s ease;');
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).querySelector('.post-card')?.setAttribute('style', 'background: rgba(167,139,250,0.03); border-color: rgba(167,139,250,0.12); border-radius: 16px; padding: 2.25rem; transition: all 0.2s ease;');
                  }}
                >
                  <div
                    className="post-card"
                    style={{ background: 'rgba(167,139,250,0.03)', border: '1px solid #E8E8E8', borderRadius: '16px', padding: '2.25rem', transition: 'all 0.2s ease' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' as const }}>
                      <span style={{ display: 'inline-block', padding: '0.2rem 0.625rem', background: '#E5E5E5', border: '1px solid rgba(167,139,250,0.22)', borderRadius: '100px', fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600, color: '#0CA2A2', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                        {post.category}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583' }}>
                        <Calendar size={11} /> {post.date}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583' }}>
                        <Clock size={11} /> {post.readTime}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: '680px' }}>
                      {post.excerpt}
                    </p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#0CA2A2' }}>
                      Read post <ArrowRight size={14} />
                    </span>
                  </div>
                </a>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA STRIP ══════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid #E5E5E5', background: 'rgba(167,139,250,0.015)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '620px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Ready to see your numbers?
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, marginBottom: '2rem' }}>
              Run the revenue calculator and find out what your gaps are costing you — then book a free call if you want to talk through the fix.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <a href="/resources/revenue-calculator" className="btn-gradient" style={{ padding: '0.9375rem 1.875rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Get the Calculator <ArrowRight size={15} />
              </a>
              <a href="/book" className="btn-outline" style={{ padding: '0.9375rem 1.875rem', fontSize: '1rem' }}>
                Book Free Intro Call
              </a>
            </div>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}
