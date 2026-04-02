/*
 * OPS BY NOELL — Blog Post 1
 * Route: /blog/how-laguna-niguel-massage-therapist-cut-no-shows
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
    <span style={{ background: 'linear-gradient(90deg, #0CA2A2 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {children}
    </span>
  );
}

const POST = {
  category: 'Case Study',
  title: 'How a Laguna Niguel Massage Therapist Cut No-Shows by 75% in Two Weeks',
  excerpt: "Santa is a licensed massage therapist in Laguna Niguel. She was losing around $600 a week to no-shows and cancellations. Here's what changed in two weeks — and what the numbers looked like before and after.",
  author: 'Nikki Noell',
  date: 'March 2026',
  readTime: '5 min read',
};

export default function BlogPostLagunaNoShow() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ═══ ARTICLE HERO ═══════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '140px', paddingBottom: '60px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.18) 0%, rgba(139,92,246,0.08) 40%, #010509 70%)' }} />
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.1) 0%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#0CA2A2', textDecoration: 'none', marginBottom: '2rem' }}>
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
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #0CA2A2, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', fontWeight: 700, color: '#ffffff', flexShrink: 0 }}>
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
                Santa is a licensed massage therapist in Laguna Niguel. Six years into her practice, she had a loyal client base and a consistently booked calendar — on paper. In reality, she was hemorrhaging appointments. No-shows were draining close to $600 a week in revenue she'd already earned the right to keep.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#a0a8b8', lineHeight: 1.85, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                Two weeks after we built her reminder sequence, her no-show rate dropped by 75%. Here's the exact problem, the exact fix, and the exact numbers.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                What the data actually showed
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Before we built anything, we pulled Santa's booking history and looked at the 90 days prior. The numbers were stark. In that window, she had 47 no-shows. Of those, 39 had zero communication between booking and appointment — no confirmation, no reminder, nothing. Just a booking that disappeared on the day.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                The average time between booking and appointment was 8 days. That's a long time to keep an appointment top of mind with no follow-up from the business. Life moves fast. People forget. Without a prompt, there's nothing pulling that appointment back into focus before it's too late.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                The no-show rate in that 90-day window was 21%. For a solo practice running 50-plus appointments per month, that number is not a minor inconvenience. It's a structural revenue leak.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                What we built
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                The solution was a three-touch automated sequence triggered at booking. Nothing complicated. No new software Santa had to learn. Just the right messages at the right times.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                <strong style={{ color: '#C4B5FD' }}>Touch 1: Instant booking confirmation.</strong> The moment a client books, they receive a confirmation text with the appointment details and a link to reschedule if they need to. This sets the expectation immediately and gives them an easy out before they become a no-show.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                <strong style={{ color: '#C4B5FD' }}>Touch 2: 48-hour reminder with reschedule link.</strong> Two days before the appointment, the client gets a reminder that includes a direct reschedule option. This is the highest-leverage touch. Clients who need to move their appointment but haven't reached out yet have an easy path to do so — instead of just not showing up.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                <strong style={{ color: '#C4B5FD' }}>Touch 3: Same-day reminder 2 hours out.</strong> A short, warm message the morning of (or two hours before) the appointment. Low friction, just a confirmation of the time and place. By this point, if the client needs to cancel, they've had multiple chances. Most who reach this touch show up.
              </p>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                The results
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Two weeks in, the before-and-after was clear.
              </p>

              {/* Stats comparison */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
                <div style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '12px', padding: '1.5rem' }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#F87171', marginBottom: '1rem' }}>Before</p>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '2.25rem', fontWeight: 800, color: '#ffffff', lineHeight: 1, marginBottom: '0.375rem' }}>21%</p>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#b8b6b3', lineHeight: 1.5, margin: 0 }}>No-show rate — 11 out of 52 appointments</p>
                </div>
                <div style={{ background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '12px', padding: '1.5rem' }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4ADE80', marginBottom: '1rem' }}>After</p>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '2.25rem', fontWeight: 800, color: '#ffffff', lineHeight: 1, marginBottom: '0.375rem' }}>6%</p>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#b8b6b3', lineHeight: 1.5, margin: 0 }}>No-show rate — 3 out of 48 appointments</p>
                </div>
              </div>
              <div style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '12px', padding: '1.5rem', margin: '1.5rem 0' }}>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '2rem', fontWeight: 800, color: '#ffffff', lineHeight: 1, marginBottom: '0.375rem' }}>$960</p>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#b8b6b3', margin: 0 }}>Revenue recovered in two weeks at $120/session</p>
              </div>

              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                A 75% reduction in no-shows. $960 recovered in the first two weeks. And Santa didn't change how she runs her practice — she didn't learn new software, take on new tasks, or add any friction to her workflow.
              </p>

              {/* Pull quote */}
              <blockquote style={{ margin: '2.5rem 0', padding: '1.75rem 2rem', background: 'rgba(167,139,250,0.06)', borderLeft: '3px solid #0CA2A2', borderRadius: '0 12px 12px 0' }}>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.6, margin: '0 0 0.75rem', fontStyle: 'italic' }}>
                  "I used to dread Mondays because there would always be gaps I did not expect. Now I open my calendar and it is just full. The reminders go out and people show up. I do not think about it anymore."
                </p>
                <footer style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#0CA2A2', fontWeight: 600 }}>
                  Santa — Licensed Massage Therapist, Laguna Niguel
                </footer>
              </blockquote>

              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '3rem', marginBottom: '1.25rem' }}>
                Why this works when nothing else does
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Most no-shows aren't malicious. The client who doesn't show up didn't decide to waste your time. They forgot, or something came up and they didn't have an easy way to let you know. The reminder sequence solves both problems simultaneously.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                The 48-hour touch is the critical one. It lands far enough before the appointment that clients who need to reschedule can do so — and the reschedule link makes it zero friction. What would have been a no-show becomes a rescheduled appointment, which means the time slot can be filled.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                If you're running an appointment-based practice in Orange County and no-shows are a consistent drain on your revenue, this is the first system we'd recommend. It's fast to build, fast to show results, and requires nothing from you to maintain once it's running.
              </p>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                A free Revenue Audit is where we start. We look at your actual numbers, put a dollar figure on the gaps, and show you what the fix looks like before you commit to anything.
              </p>

            </div>
          </FadeItem>
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
              See exactly where your practice is <GradientText>losing revenue.</GradientText>
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75, marginBottom: '2rem' }}>
              A free 30-minute call where we map the exact gaps in your client journey and show you the ROI on fixing them.
            </p>
            <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book Free Intro Call <ArrowRight size={16} />
            </a>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#b8b6b3', marginTop: '1rem' }}>
              No commitment. No credit card. Just a real conversation.
            </p>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}


