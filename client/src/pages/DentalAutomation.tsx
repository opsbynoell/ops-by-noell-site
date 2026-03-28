/*
 * OPS BY NOELL — Dental Automation Landing Page
 * Route: /dental-automation
 * SEO: "dental office automation", "AI for dental practices"
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
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: '99px', border: '1px solid rgba(167,139,250,0.25)', background: 'rgba(167,139,250,0.08)', fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#A78BFA' }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#A78BFA', display: 'inline-block' }} />
      {children}
    </span>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return <span style={{ background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{children}</span>;
}

const problems = [
  { title: 'No-shows drain revenue and staff morale', detail: 'The national average no-show rate for dental practices is 10–15%. Each missed appointment costs $200–$800 in lost production.' },
  { title: 'Recall patients slip through the cracks', detail: 'Patients who are overdue for cleanings or follow-ups don\'t call themselves. Without automated recall, they silently churn.' },
  { title: 'Manual confirmation calls consume front desk time', detail: 'Your team shouldn\'t spend an hour a day calling patients to confirm appointments that software can confirm automatically.' },
  { title: 'Online reviews inconsistent or nonexistent', detail: 'Most patients have a good experience and say nothing online. A simple, well-timed ask changes that completely.' },
];

const solutions = [
  { item: 'Automated appointment reminders', detail: 'Text and email reminders go out at 48 hours and 2 hours before each appointment. No-show rates drop by 30–50% in the first month.' },
  { item: 'Recall automation', detail: 'Patients overdue for cleanings or follow-up care get an automated, personal-feeling outreach at exactly the right interval. Most schedule without staff involvement.' },
  { item: 'Missed call text-back', detail: 'Every missed call triggers an instant text response. Patients can request an appointment by text without waiting on hold.' },
  { item: '24/7 online booking', detail: 'Patients book after hours, on mobile, without calling. New patient inquiries get captured around the clock.' },
  { item: 'Post-visit review requests', detail: 'Automated review requests go out after each appointment while the experience is fresh. Your Google presence builds consistently without staff effort.' },
];

export default function DentalAutomation() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.2) 0%, rgba(139,92,246,0.12) 35%, #010509 72%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5.5rem' }}>
          <FadeItem delay={0}><div style={{ marginBottom: '1.5rem' }}><SectionBadge>Dental Office Automation</SectionBadge></div></FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.75rem, 6.5vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '820px', marginBottom: '1.75rem' }}>
              <GradientText>AI automation</GradientText>{' '}<span style={{ color: '#ffffff' }}>for dental offices. Reduce no-shows. Automate recall.</span>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: '#868583', lineHeight: 1.75, maxWidth: '580px', marginBottom: '2.5rem' }}>
              Dental practices lose thousands monthly to no-shows, lapsed patients, and manual recall processes. We build the systems that recover that revenue automatically — without adding to your front desk's workload.
            </p>
          </FadeItem>
          <FadeItem delay={0.3}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book Free 15-Minute Intro Call <ArrowRight size={16} />
              </a>
              <a href="/services" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>See Pricing</a>
            </div>
          </FadeItem>
        </div>
      </section>

      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>The Problem</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem' }}>
                What's quietly costing your practice every month
              </h2>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {problems.map((p, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{ padding: '2rem', background: 'rgba(255,80,80,0.03)', border: '1px solid rgba(255,80,80,0.12)', borderRadius: '10px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,80,80,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <X size={12} color="#ff6b6b" />
                    </div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', fontWeight: 700, color: '#ffffff' }}>{p.title}</h3>
                  </div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#868583', lineHeight: 1.7 }}>{p.detail}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
              <SectionBadge>The Solution</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Automation that runs your recall and retention on autopilot.
              </h2>
            </div>
          </FadeItem>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(167,139,250,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
            {solutions.map((s, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{ background: i % 2 === 0 ? 'rgba(167,139,250,0.02)' : 'rgba(167,139,250,0.04)', padding: '1.75rem 2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} color="#A78BFA" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.375rem' }}>{s.item}</h3>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.7 }}>{s.detail}</p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <SectionBadge>Get Started</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              Cut no-shows. Automate recall. Keep your schedule full.
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              15 minutes. Free. No obligation. We'll show you exactly what automation can do for your practice.
            </p>
            <a href="/book" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book Free 15-Minute Intro Call <ArrowRight size={17} />
            </a>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}
