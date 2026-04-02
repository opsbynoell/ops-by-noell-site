/*
 * OPS BY NOELL — Dental Automation Landing Page
 * Route: /dental-automation
 * SEO: "dental office automation", "AI for dental practices"
 */

import { ArrowRight, Check, X, PhoneCall, Calendar, Star } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';

function FadeItem({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn(0.1);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0.7, transform: visible ? 'translateY(0)' : 'translateY(10px)', transition: `opacity 0.3s ease-out ${delay}s, transform 0.3s ease-out ${delay}s`, ...style }}>
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

const services = [
  {
    icon: PhoneCall,
    title: 'Missed Call Text-Back',
    description: 'The moment a call goes unanswered, an automatic text goes out to the caller within 60 seconds. That new patient inquiry gets captured before they pick up the phone and call the practice down the street. 85% of callers never call back if they reach voicemail — this system closes that gap immediately.',
    stat: '85% of callers never call back after voicemail',
  },
  {
    icon: Calendar,
    title: 'AI Booking + Reminder System',
    description: 'Automated appointment confirmations and reminders go out 48 hours and 2 hours before every appointment. Our clients cut no-shows by 30–50%. For a practice running 30+ appointments a week, that is a significant amount of recovered chair time and production every single month.',
    stat: 'Clients cut no-shows by 30–50%',
  },
  {
    icon: Star,
    title: 'Automated Review Generation',
    description: 'After every appointment, a review request goes out automatically while the experience is still fresh. 93% of patients read reviews before choosing a provider. More 5-star reviews on Google means more new patients finding your practice when they search — without any effort from your front desk.',
    stat: '93% of patients check reviews before booking',
  },
];

const stats = [
  { figure: '$500–$2,000', label: 'Lifetime patient value lost per missed new patient call' },
  { figure: '10–15%', label: 'Annual revenue the average dental practice loses to no-shows' },
  { figure: '85%', label: 'Of new patients check Google reviews before booking' },
];

const PACKAGES = [
  {
    name: 'Entry',
    subtitle: 'Missed Call Coverage',
    price: '$197',
    period: '/mo · + $297 setup',
    desc: 'The fastest way to stop losing leads to voicemail. One system, done for you, live in a week. A great first step before committing to a full stack.',
    includes: ['Missed Call Text-Back', 'AI Voice Receptionist (after-hours)', 'Onboarding & setup included', 'Ongoing management & maintenance'],
    cta: 'Book Intro Call',
    featured: false,
  },
  {
    name: 'Starter',
    subtitle: 'Lead Capture + Booking Fix',
    price: '$797',
    period: '/mo · + $997 setup',
    desc: 'The essential foundation for any local service business. Stop losing leads from missed calls and start filling your calendar automatically.',
    includes: ['Missed Call Text-Back', 'AI Booking + Reminder System', 'Onboarding & setup included', 'Ongoing management & maintenance'],
    cta: 'Book Intro Call',
    featured: false,
  },
  {
    name: 'Growth',
    subtitle: 'Full AI Back Office',
    price: '$1,497',
    period: '/mo · + $1,497 setup',
    desc: 'The complete operational transformation. Every system working together to capture, convert, retain, and grow — on autopilot.',
    includes: ['Everything in Starter', 'Automated Review Generation', 'Lead Follow-Up Automation', 'Marketing Automation', 'Priority support & optimization'],
    cta: 'Most Popular',
    featured: true,
  },
  {
    name: 'Revenue Audit',
    subtitle: 'Know exactly where you\'re leaking',
    price: '$497',
    period: 'one-time',
    desc: 'A deep-dive into your current operations to identify every revenue leak, prioritize the highest-impact fixes, and build a custom automation roadmap.',
    includes: ['60-minute operations deep-dive', 'Revenue leak analysis', 'Custom automation roadmap', 'ROI projections per system', 'Credited toward any package'],
    cta: 'Book Revenue Audit',
    featured: false,
  },
];

export default function DentalAutomation() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.2) 0%, rgba(139,92,246,0.12) 35%, #010509 72%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5.5rem' }}>
          <FadeItem delay={0}><div style={{ marginBottom: '1.5rem' }}><SectionBadge>Dental Office Automation</SectionBadge></div></FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.75rem, 6.5vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '820px', marginBottom: '1.75rem' }}>
              <span style={{ color: '#ffffff' }}>Every missed call is a patient</span>{' '}<GradientText>choosing the practice that picked up.</GradientText>
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
                Book Free 30-Minute Intro Call <ArrowRight size={16} />
              </a>
              <a href="#pricing" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>See Pricing</a>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ═══ THE PROBLEM ════════════════════════════════════════════ */}
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

      {/* ═══ THE SOLUTION ═══════════════════════════════════════════ */}
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

      {/* ═══ SERVICE DETAIL ═════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', background: 'rgba(167,139,250,0.015)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <SectionBadge>What We Build For You</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Three systems. <GradientText>Immediate impact.</GradientText>
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#868583', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
                Every system is built for your practice, connected to your existing tools, and managed by us. You don't touch a setting.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <FadeItem key={i} delay={i * 0.1}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', padding: '2.5rem', background: 'rgba(167,139,250,0.03)', border: '1px solid rgba(167,139,250,0.12)', borderRadius: '12px', alignItems: 'start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={17} color="#A78BFA" />
                        </div>
                        <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', fontWeight: 700, color: '#ffffff' }}>{svc.title}</h3>
                      </div>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.75, maxWidth: '640px' }}>{svc.description}</p>
                    </div>
                    <div style={{ flexShrink: 0, background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '10px', padding: '1rem 1.25rem', textAlign: 'center', minWidth: '180px' }}>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#A78BFA', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: '0.5rem' }}>Key Stat</p>
                      <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.4 }}>{svc.stat}</p>
                    </div>
                  </div>
                </FadeItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ STAT BLOCK ═════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>The Numbers</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem' }}>
                The revenue is already in your practice.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', maxWidth: '460px', margin: '1rem auto 0', lineHeight: 1.7 }}>
                You're just not capturing all of it yet.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {stats.map((s, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{ padding: '2.5rem 2rem', background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.15)', borderRadius: '12px', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.75rem' }}>{s.figure}</p>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.65 }}>{s.label}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CASE STUDY ═════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', background: 'rgba(167,139,250,0.015)' }}>
        <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <div style={{ padding: '3rem', background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.18)', borderRadius: '14px' }}>
              <div style={{ marginBottom: '1.5rem' }}><SectionBadge>Client Result</SectionBadge></div>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
                4 no-shows per week down to less than 1 — in two weeks.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Our founding client is a solo practitioner in Laguna Niguel with 25 years of experience and zero digital infrastructure before working with us. Within two weeks of launching our AI booking and reminder system, weekly no-shows dropped from an average of 4 to less than 1. No staff changes. No new software for them to learn. The same result is achievable for any appointment-based practice.
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[{ label: 'No-shows before', value: '~4/week' }, { label: 'No-shows after', value: '<1/week' }, { label: 'Time to results', value: '2 weeks' }].map((item, i) => (
                  <div key={i}>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#A78BFA', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '0.25rem' }}>{item.label}</p>
                    <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1.375rem', fontWeight: 700, color: '#ffffff' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ═══ PRICING ════════════════════════════════════════════════ */}
      
      {/* ─── Santa Testimonial ─── */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
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
        </div>
      </section>

      <section id="pricing" style={{ padding: '6rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <SectionBadge>Pricing</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Start with what matters most. <GradientText>Scale from there.</GradientText>
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#868583', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
                Every package is 100% done-for-you. We build it, connect it to your practice, and once it's live, it runs. You don't touch a setting.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
            {PACKAGES.map(({ name, subtitle, price, period, desc, includes, cta, featured }, i) => (
              <FadeItem key={name} delay={i * 0.1}>
                <div className={featured ? 'pricing-card featured' : 'pricing-card'} style={{ padding: '2rem', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {featured && (
                    <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', padding: '0.25rem 1rem', background: 'linear-gradient(90deg, #A78BFA, #C4B5FD)', borderRadius: '0 0 12px 12px', fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap' }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ marginTop: featured ? '1rem' : 0, flex: 1 }}>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>{name}</h3>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#A78BFA', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: '1rem' }}>{subtitle}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem', marginBottom: '0.375rem' }}>
                      <span style={{ fontFamily: "'Nicholas', serif", fontSize: '2.25rem', fontWeight: 800, color: '#ffffff' }}>{price}</span>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583' }}>{period}</span>
                    </div>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#868583', lineHeight: 1.6, marginBottom: '1.5rem' }}>{desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.75rem' }}>
                      {includes.map((item) => (
                        <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                          <Check size={14} style={{ color: '#A78BFA', flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#868583' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <a href="/book" className={featured ? 'btn-gradient' : 'btn-outline'} style={{ textAlign: 'center', display: 'block', fontWeight: 700 }}>
                    {cta}
                  </a>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOOKING CTA ════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <SectionBadge>Get Started</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              Cut no-shows. Automate recall. Keep your schedule full.
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              30 minutes. Free. No obligation. We'll show you exactly what automation can do for your practice.
            </p>
            <a href="/book" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book Free 30-Minute Intro Call <ArrowRight size={17} />
            </a>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}
