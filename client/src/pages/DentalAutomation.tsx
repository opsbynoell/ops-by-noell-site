/*
 * OPS BY NOELL — Dental Automation Landing Page
 * Route: /dental-automation
 * SEO: "dental office automation", "AI for dental practices"
 * Structure: Hero → Stats Bar → Pain+Solution → What We Build → Testimonial → Pricing → Footer
 */

import { ArrowRight, Check, X, PhoneCall, Calendar, Star } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '4px', border: '1px solid #E8E8E8', background: '#FFFFFF', fontFamily: "'Nicholas', serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#0CA2A2' }}>
      {children}
    </span>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return <span style={{ background: 'linear-gradient(90deg, #0CA2A2 0%, #0DCFCF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{children}</span>;
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
    cta: 'Book a Free 30-Minute Audit',
    featured: false,
  },
  {
    name: 'Starter',
    subtitle: 'Lead Capture + Booking Fix',
    price: '$797',
    period: '/mo · + $997 setup',
    desc: 'The essential foundation for any local service business. Stop losing leads from missed calls and start filling your calendar automatically.',
    includes: ['Missed Call Text-Back', 'AI Booking + Reminder System', 'Onboarding & setup included', 'Ongoing management & maintenance'],
    cta: 'Book a Free 30-Minute Audit',
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
    subtitle: "Know exactly where you're leaking",
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
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(2rem, 5vw, 5rem)', paddingBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}><SectionBadge>Dental Office Automation</SectionBadge></div>
          <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.7, letterSpacing: '-0.03em', maxWidth: '820px', marginBottom: '1.75rem', marginLeft: 'auto', marginRight: 'auto' }}>
            <GradientText>Cut no-shows. Automate recall.</GradientText>{' '}<span style={{ color: '#1A1A1A' }}>Fill your schedule.</span>
          </h1>
          <p style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: '#555555', lineHeight: 1.75, maxWidth: '580px', marginBottom: '2.5rem', marginLeft: 'auto', marginRight: 'auto' }}>
            Every missed call, no-show, and overdue recall patient is revenue you've already earned but haven't captured. We build the AI systems that close those gaps — and manage them so you never have to think about it.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book a Free 30-Minute Audit <ArrowRight size={16} />
            </a>
            <a href="#pricing" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 600 }}>See Pricing</a>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ══════════════════════════════════════════════ */}
      <div className="reveal">
      <section style={{ borderTop: '1px solid rgba(12,162,162,0.1)', borderBottom: '1px solid rgba(12,162,162,0.1)', padding: '1.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {stats.map((s, i) => (
              <div key={i}>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600, background: 'linear-gradient(90deg, #0CA2A2 0%, #0DCFCF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>{s.figure}</p>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#555555', lineHeight: 1.7 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* ═══ PAIN + SOLUTION (2-COLUMN) ═════════════════════════════ */}
      <div className="reveal">
      <section style={{ padding: 'clamp(2rem, 4vw, 2.5rem) 0', borderTop: '1px solid #E5E5E5' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(1.25rem, 3vw, 3rem)' }}>
            <SectionBadge>What We Fix</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 4vw, 2.5rem)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.7, letterSpacing: '-0.02em', marginTop: '1rem' }}>
              Every gap is costing you patients.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Problems */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {problems.map((p, i) => (
                  <div key={i} className="reveal" style={{ padding: '1.5rem', background: 'rgba(255,80,80,0.03)', border: '1px solid rgba(255,80,80,0.1)', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.625rem' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(255,80,80,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <X size={11} color="#ff6b6b" />
                      </div>
                      <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 700, color: '#1A1A1A' }}>{p.title}</h3>
                    </div>
                    <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#555555', lineHeight: 1.7, paddingLeft: '2rem' }}>{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Solutions */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', background: '#FAFAF8', border: '1px solid #E8E8E8', borderRadius: '12px', overflow: 'hidden' }}>
                {solutions.map((s, i) => (
                  <div key={i} className="reveal" style={{ padding: '1.25rem 1.5rem', borderBottom: i < solutions.length - 1 ? '1px solid rgba(12,162,162,0.08)' : 'none', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#E5E5E5', border: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Check size={11} color="#0CA2A2" />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.25rem' }}>{s.item}</h3>
                      <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#555555', lineHeight: 1.65 }}>{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* ═══ WHAT WE BUILD ══════════════════════════════════════════ */}
      <div className="reveal">
      <section style={{ padding: 'clamp(2rem, 4vw, 2.5rem) 0', borderTop: '1px solid #E5E5E5', background: '#FAFAF8' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(1.25rem, 3vw, 3rem)' }}>
            <SectionBadge>What We Build For You</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 4vw, 2.5rem)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.7, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
              Three systems. <GradientText>Immediate impact.</GradientText>
            </h2>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', color: '#555555', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Every system is built for your practice, connected to your existing tools, and managed by us. You don't touch a setting.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div key={i} className="reveal">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', padding: '2rem 2.5rem', background: 'rgba(12,162,162,0.03)', border: '1px solid #E8E8E8', borderRadius: '12px', alignItems: 'start', maxWidth: '100%', boxSizing: 'border-box' as const }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.875rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#E5E5E5', border: '1px solid #E5E5E5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={16} color="#0CA2A2" />
                        </div>
                        <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', fontWeight: 700, color: '#1A1A1A' }}>{svc.title}</h3>
                      </div>
                      <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#555555', lineHeight: 1.75, maxWidth: '640px' }}>{svc.description}</p>
                    </div>
                    <div style={{ background: '#F5F5F5', border: '1px solid #E8E8E8', borderRadius: '10px', padding: '1rem 1.25rem', textAlign: 'center' }}>
                      <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.75rem', fontWeight: 600, color: '#0CA2A2', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: '0.5rem' }}>Key Stat</p>
                      <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.7 }}>{svc.stat}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </div>

      {/* ═══ SANTA TESTIMONIAL ══════════════════════════════════════ */}
      <div className="reveal">
      <section style={{ padding: '4rem 0', borderTop: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="reveal" style={{
            background: '#FAFAF8',
            border: '1px solid #E5E5E5',
            borderLeft: '4px solid #0CA2A2',
            borderRadius: '12px',
            padding: '2.5rem 3rem',
            textAlign: 'center',
          }}>
            <div style={{ display: 'flex', gap: '0.25rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
              {[1,2,3,4,5].map((i) => (
                <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#0CA2A2" style={{ display: 'inline-block' }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.65, marginBottom: '1.25rem', fontStyle: 'italic' }}>
              "I used to dread Mondays because there would always be gaps I did not expect. Now I open my calendar and it is just full. The reminders go out and people show up. I do not think about it anymore."
            </p>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#0CA2A2' }}>
              Santa M. — Licensed Massage Therapist, Laguna Niguel CA
            </p>
          </div>
        </div>
      </section>
      </div>

      {/* ═══ PRICING ════════════════════════════════════════════════ */}
      <div className="reveal">
      <section id="pricing" style={{ padding: 'clamp(2rem, 4vw, 2.5rem) 0', borderTop: '1px solid #E5E5E5' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionBadge>Pricing</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.375rem, 4vw, 2.5rem)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.7, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
              Start with what matters most. <GradientText>Scale from there.</GradientText>
            </h2>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', color: '#555555', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Every package is 100% done-for-you. We build it, connect it to your practice, and once it's live, it runs. You don't touch a setting.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
            {PACKAGES.map(({ name, subtitle, price, period, desc, includes, cta, featured }, i) => (
              <div key={name} className="reveal">
                <div className={featured ? 'pricing-card featured' : 'pricing-card'} style={{ padding: '2rem', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {featured && (
                    <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', padding: '0.25rem 1rem', background: 'linear-gradient(90deg, #0CA2A2, #0CA2A2)', borderRadius: '0 0 12px 12px', fontFamily: "'Nicholas', serif", fontSize: '0.75rem', fontWeight: 700, color: '#1A1A1A', whiteSpace: 'nowrap' }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ marginTop: featured ? '1rem' : 0, flex: 1 }}>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.25rem', fontWeight: 700, color: '#1A1A1A', marginBottom: '0.25rem' }}>{name}</h3>
                    <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.75rem', fontWeight: 600, color: '#0CA2A2', letterSpacing: '0.06em', textTransform: 'uppercase' as const, marginBottom: '1rem' }}>{subtitle}</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem', marginBottom: '0.375rem' }}>
                      <span style={{ fontFamily: "'Nicholas', serif", fontSize: '2.25rem', fontWeight: 800, color: '#1A1A1A' }}>{price}</span>
                      <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#555555' }}>{period}</span>
                    </div>
                    <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#555555', lineHeight: 1.6, marginBottom: '1.5rem' }}>{desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1.75rem' }}>
                      {includes.map((item) => (
                        <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                          <Check size={14} style={{ color: '#0CA2A2', flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#555555' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <a href="/book" className={featured ? 'btn-gradient' : 'btn-outline'} style={{ textAlign: 'center', display: 'block', fontWeight: 600 }}>
                    {cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
}
