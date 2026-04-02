/*
 * OPS BY NOELL — Blog Post 2
 * Route: /blog/real-cost-of-missed-calls-oc-service-businesses
 */

import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';
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
    <span style={{ background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {children}
    </span>
  );
}

const POST = {
  category: 'Revenue Strategy',
  title: 'The Real Cost of Missed Calls for OC Service Businesses (And How to Fix It This Week)',
  excerpt: "85% of callers will not call back after reaching voicemail. For appointment-based businesses in Orange County, that number has a very specific dollar value attached to it — and most owners have never calculated it.",
  author: 'Nikki Noell',
  date: 'March 2026',
  readTime: '6 min read',
};

export default function BlogPostMissedCalls() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ═══ ARTICLE HERO ═══════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '140px', paddingBottom: '60px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.18) 0%, rgba(139,92,246,0.08) 40%, #010509 70%)' }} />
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#A78BFA', textDecoration: 'none', marginBottom: '2rem' }}>
              <ArrowLeft size={14} /> Back to Blog
            </a>
          </FadeItem>

          <FadeItem delay={0.05}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '100px', fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600, color: '#C4B5FD', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                {POST.category}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#b8b6b3' }}>
                <Clock size={12} /> {POST.readTime}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#b8b6b3' }}>
                <Calendar size={12} /> {POST.date}
              </span>
            </div>
          </FadeItem>

          <FadeItem delay={0.1}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              {POST.title}
            </h1>
          </FadeItem>

          <FadeItem delay={0.15}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#b8b6b3', lineHeight: 1.75, marginBottom: '2rem' }}>
              {POST.excerpt}
            </p>
          </FadeItem>

          <FadeItem delay={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(167,139,250,0.12)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #A78BFA, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', fontWeight: 700, color: '#ffffff', flexShrink: 0 }}>
                N
              </div>
              <div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>{POST.author}</p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: '#b8b6b3', margin: 0 }}>Ops by Noell</p>
              </div>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ═══ ARTICLE BODY ═══════════════════════════════════════════ */}
      <section style={{ padding: '0 0 6rem' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <div style={{ borderTop: '1px solid rgba(167,139,250,0.08)', paddingTop: '3rem' }}>

              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#a0a8b8', lineHeight: 1.85, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                Every service business in Orange County has a phone. Most of them have voicemail. Very few of them know what that voicemail is actually costing them in real dollars — not just in one missed appointment, but in clients who will never walk through their door.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#a0a8b8', lineHeight: 1.85, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                Let's change that.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                The number you need to know
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                According to research from Hiya, 85% of callers will not call back after reaching voicemail at a local business. They move on. In a market where every salon, med spa, or massage practice in the area is one Google tap away, that moment of unavailability has a permanent cost.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Most business owners understand this conceptually. What they don't have is the actual dollar figure — the amount sitting in their call log right now, invisible, unrecovered.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                The math for a real OC business
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Here's how we run it for a salon owner in Irvine we spoke with recently. Average service: $150. Missed calls per week: 10. Applying the 85% non-callback rate, that's 8–9 permanently lost potential clients every week.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                At $150 per visit, that's $1,275 in first-visit revenue disappearing weekly. But the first visit isn't the whole story. A loyal salon client who returns 8 times a year at $150 is worth $1,200 per year. Eight lost clients per week means $9,600 in annual value lost — every single week. Conservatively, that's $40,000 to $60,000 in lifetime client value gone annually from unanswered calls alone.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                These aren't worst-case numbers. They're what happens at a mid-size service business with a small team trying to stay on top of everything at once.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                The three revenue leaks behind missed calls
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Most businesses think about the phone call as the main problem. In practice, there are three channels where inbound interest dies without automation:
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                <strong style={{ color: '#C4B5FD' }}>Missed phone calls</strong> are the most visible. A call goes to voicemail. The caller hangs up. Eighty-five percent never try again.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                <strong style={{ color: '#C4B5FD' }}>Unanswered website inquiries</strong> carry a similar penalty — and a tighter time window. Research from Lead Connect (2022) found that 78% of customers buy from the first business that responds to their inquiry. Not the best business. Not the cheapest. The first. If your website inquiry form sends leads to an inbox that doesn't trigger an immediate response, you're losing the majority to whoever replies faster.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                <strong style={{ color: '#C4B5FD' }}>Unread DMs</strong> across Instagram, Facebook, and Google Business are the quietest drain. Clients who prefer not to call — which is increasingly most people under 40 — send a message and wait. If there's no response within a few hours, they've already booked somewhere else.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                What actually fixes this
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Three systems, each targeting one of the three leaks:
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                <strong style={{ color: '#C4B5FD' }}>Missed call text-back</strong> fires within 30 seconds of any unanswered call — from the business number, in plain language, with a booking link. We see 40–50% recovery rates on missed calls that would have otherwise been permanently lost. The response is fast enough that the caller is still actively thinking about the appointment.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                <strong style={{ color: '#C4B5FD' }}>Automated website lead response</strong> kicks off within 60 seconds of a form submission. The lead gets an immediate acknowledgment and a way to book or continue the conversation. This single change routinely shifts conversion rates on website leads from single digits to 20–30% or higher.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                <strong style={{ color: '#C4B5FD' }}>A unified inbox</strong> pulls phone, email, website form, Instagram, Facebook, and Google Business messages into a single view. Nothing falls through the cracks because there's no longer a separate inbox to forget to check.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                None of these systems require the business owner to do anything differently after they're built. They run in the background, recovering revenue that was previously disappearing silently every day.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                If you want to see your specific number — what missed calls and inquiries are costing your practice — the Revenue Calculator gives you a real figure in about three minutes. And if you want to talk through the fix, a free audit is where we start.
              </p>

            </div>
          </FadeItem>
        </div>
      </section>

      {/* ═══ INLINE CTA — CALCULATOR ════════════════════════════════ */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '16px', padding: '2.5rem', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' as const }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#A78BFA', marginBottom: '0.75rem' }}>Free Calculator</p>
            <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.2 }}>Find out what your missed calls are costing you</h3>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '460px' }}>Enter your numbers and see your annual revenue leak in under 3 minutes.</p>
            <a href="/resources/revenue-calculator" className="btn-gradient" style={{ padding: '0.875rem 1.75rem', fontSize: '0.9375rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Get the Calculator <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', background: 'rgba(167,139,250,0.015)' }}>
        <div className="container" style={{ maxWidth: '660px', margin: '0 auto', textAlign: 'center' }}>
          <FadeItem delay={0}>
            <span style={{ display: 'inline-block', padding: '0.3rem 0.875rem', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '100px', fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#C4B5FD', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '1.5rem' }}>
              Free Revenue Audit
            </span>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Stop losing revenue to <GradientText>unanswered calls.</GradientText>
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75, marginBottom: '2rem' }}>
              A free 30-minute call where we map your exact gaps and show you the ROI on fixing them.
            </p>
            <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book Free Intro Call <ArrowRight size={16} />
            </a>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}

