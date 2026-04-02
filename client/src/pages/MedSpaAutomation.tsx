/*
 * OPS BY NOELL — Med Spa Automation Landing Page
 * Route: /med-spa-automation
 * SEO: "med spa automation", "AI booking for med spas", "AI receptionist med spa"
 */

import { ArrowRight, Check, Phone, X } from 'lucide-react';
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

const stats = [
  { value: '< 10s', label: 'Response to missed calls' },
  { value: '85%', label: 'Of callers never call back after voicemail' },
  { value: '$500–$2K', label: 'Revenue per missed med spa appointment' },
  { value: '2 weeks', label: 'To full automation' },
];

const medSpaIndustryStats = [
  { value: '$2K–$5K', label: 'Lost monthly to missed calls and slow follow-up — per practice' },
  { value: '3–6 weeks', label: 'High-value clients book this far in advance. Reminders are not optional.' },
  { value: '93%', label: 'Of med spa clients check reviews before their first appointment' },
];

const serviceDetails = [
  {
    number: '01',
    title: 'Missed Call Text-Back',
    body: 'A missed call at a med spa is not just a missed call. It is a $300–$1,000 treatment that went to the practice down the street. Automatic text-back within 60 seconds keeps the conversation and the booking with you.',
  },
  {
    number: '02',
    title: 'AI Booking + Reminder System',
    body: 'High-value med spa clients book in advance and forget. Automated reminders 48 hours and 2 hours before every appointment cut no-shows by 30–50% and recover revenue you would otherwise lose silently.',
  },
  {
    number: '03',
    title: 'Automated Review Generation',
    body: 'After every treatment, a review request goes out while the client is still feeling the result. 93% of consumers read reviews before booking. Consistent 5-star reviews are the highest-ROI marketing asset a med spa can build.',
  },
  {
    number: '04',
    title: 'Lead Follow-Up Automation',
    body: 'Clients who inquire but do not book need follow-up. 80% of sales require 5 or more touch points. Automated sequences keep you top of mind without your team lifting a finger.',
  },
];

const problems = [
  { title: 'High-value appointments lost to voicemail', detail: 'A single missed call at a med spa can represent $500–$2,000 in lost revenue. No response within minutes means no booking.' },
  { title: 'No AI receptionist answering after hours', detail: 'Prospects call at 8pm when your team is gone. Without a voice agent picking up, you lose them to whoever answers first.' },
  { title: 'Manual confirmation calls drain staff time', detail: 'Your front desk spends hours confirming appointments by phone — time that should be spent on clients who are already in the building.' },
  { title: 'No automated recall for overdue patients', detail: 'Clients who haven\'t returned in 60 or 90 days get no reminder. They\'re not gone — they just need a prompt.' },
  { title: 'Inconsistent review generation', detail: '93% of consumers read reviews before choosing a med spa. Your results deserve more visibility than you\'re getting.' },
];

const solutions = [
  {
    item: 'AI Voice Receptionist — answers every call, 24/7',
    detail: 'A trained AI agent answers missed calls, books appointments, answers service questions, and collects contact info — at any hour, without staff. Sounds natural. Works instantly.',
    highlight: true,
  },
  { item: 'Instant missed call text-back', detail: 'Every missed call that isn\'t caught by the voice agent triggers an immediate, personalized text. The lead stays warm and is guided toward booking without staff intervention.', highlight: false },
  { item: 'Automated appointment confirmations + reminders', detail: 'Confirmations go out automatically after booking. Reminders follow at 48 hours and 2 hours before — cutting no-shows without a single manual call.', highlight: false },
  { item: 'Online booking 24/7', detail: 'Clients book themselves after hours, on mobile, without calling. High-value appointments fill while your team is focused on in-person care.', highlight: false },
  { item: 'Lapsed client re-engagement', detail: 'Automated sequences reach out at 30, 60, and 90-day intervals with a natural, personal-feeling message. Most re-book within a week.', highlight: false },
  { item: 'Review generation', detail: 'Post-appointment review requests go out at exactly the right moment — capturing satisfied clients while the experience is still fresh.', highlight: false },
];

const packages = [
  {
    name: 'Entry',
    subtitle: 'Start Here',
    price: '$197',
    period: '/mo',
    setup: '+ $297 setup',
    desc: 'The fastest way to stop losing leads to voicemail. One system, live in a week.',
    includes: ['Missed Call Text-Back', 'AI Voice Receptionist (after-hours)', 'Onboarding & setup included', 'Ongoing management & maintenance'],
    cta: 'Book a Free 30-Minute Audit',
    featured: false,
  },
  {
    name: 'Starter',
    subtitle: 'Lead Capture + Booking Fix',
    price: '$797',
    period: '/mo',
    setup: '+ $997 setup',
    desc: 'The essential foundation. Stop losing leads from missed calls and fill your calendar automatically.',
    includes: ['Missed Call Text-Back', 'AI Booking + Reminder System', 'Onboarding & setup included', 'Ongoing management & maintenance'],
    cta: 'Book a Free 30-Minute Audit',
    featured: false,
  },
  {
    name: 'Growth',
    subtitle: 'Full AI Back Office',
    price: '$1,497',
    period: '/mo',
    setup: '+ $1,497 setup',
    desc: 'Every system working together to capture, convert, retain, and grow — on autopilot.',
    includes: ['Everything in Starter', 'Automated Review Generation', 'Lead Follow-Up Automation', 'Marketing Automation', 'Priority support & optimization'],
    cta: 'Most Popular',
    featured: true,
  },
  {
    name: 'Revenue Audit',
    subtitle: 'Know Your Leaks First',
    price: '$497',
    period: 'one-time',
    setup: 'credited toward any package',
    desc: 'A deep-dive into your operation to identify every revenue leak and build your custom automation roadmap.',
    includes: ['60-minute operations deep-dive', 'Revenue leak analysis', 'Custom automation roadmap', 'ROI projections per system'],
    cta: 'Book Revenue Audit',
    featured: false,
  },
];

export default function MedSpaAutomation() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.2) 0%, rgba(139,92,246,0.12) 35%, #010509 72%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5.5rem' }}>
          <FadeItem delay={0}><div style={{ marginBottom: '1.5rem' }}><SectionBadge>Med Spa Automation</SectionBadge></div></FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.75rem, 6.5vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '820px', marginBottom: '1.75rem' }}>
              <span style={{ color: '#ffffff' }}>You invested everything in your practice.</span>{' '}<GradientText>Your phone shouldn't be what's costing you clients.</GradientText>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: '#b8b6b3', lineHeight: 1.75, maxWidth: '580px', marginBottom: '2.5rem' }}>
              Med spa appointments are high-value and time-sensitive. A slow response or a missed call doesn't just cost you one booking — it costs you the client. We build the AI systems that ensure you're always the first to respond, day or night.
            </p>
          </FadeItem>
          <FadeItem delay={0.3}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book a Free 30-Minute Audit <ArrowRight size={16} />
              </a>
              <a href="#pricing" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>See Pricing</a>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ borderTop: '1px solid rgba(167,139,250,0.1)', borderBottom: '1px solid rgba(167,139,250,0.1)', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {stats.map((s, i) => (
              <FadeItem key={i} delay={i * 0.07}>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#A78BFA', marginBottom: '0.4rem' }}>{s.value}</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#b8b6b3', lineHeight: 1.5 }}>{s.label}</div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Section */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
              <SectionBadge>What We Build for Med Spas</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Four systems. One practice that runs itself.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75 }}>
                Every system is built specifically for the economics of a med spa, where one missed touchpoint can cost hundreds or thousands of dollars in lost revenue.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {serviceDetails.map((s, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{ padding: '2.25rem', background: 'rgba(167,139,250,0.03)', border: '1px solid rgba(167,139,250,0.12)', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', color: '#A78BFA', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '6px', padding: '0.25rem 0.625rem' }}>
                      {s.number}
                    </div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>{s.title}</h3>
                  </div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.75, flex: 1 }}>{s.body}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* Med Spa Industry Stat Block */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)', background: 'rgba(167,139,250,0.02)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionBadge>Med Spa Reality Check</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
                The numbers most med spa owners never see
              </h2>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            {medSpaIndustryStats.map((s, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{ padding: '2.25rem', background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.18)', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#A78BFA', marginBottom: '0.75rem', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9rem', color: '#a0a0a0', lineHeight: 1.6 }}>{s.label}</div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* Voice AI feature callout */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(167,139,250,0.03) 100%)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '16px', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '780px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={22} color="#A78BFA" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#A78BFA', marginBottom: '0.25rem' }}>New Feature</div>
                  <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    An AI receptionist that answers your phone — every time
                  </h2>
                </div>
              </div>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75 }}>
                Your AI receptionist picks up missed calls, greets callers by name of your practice, answers questions about services and pricing, and books appointments directly into your calendar — 24 hours a day, 7 days a week. No staff required. No voicemail. No lost bookings.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {['Books appointments in real time', 'Answers service and pricing questions', 'Handles after-hours calls automatically', 'Warm handoff to staff when needed'].map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <Check size={14} color="#A78BFA" />
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#e2e2e2' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* Problems */}
      <section style={{ padding: '4rem 0 7rem' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>The Problem</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem' }}>
                The revenue leaks that add up fast at a med spa
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
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#b8b6b3', lineHeight: 1.7 }}>{p.detail}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
              <SectionBadge>The Solution</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Done-for-you automation. We build it. We run it.
              </h2>
            </div>
          </FadeItem>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(167,139,250,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
            {solutions.map((s, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{ background: s.highlight ? 'rgba(167,139,250,0.08)' : (i % 2 === 0 ? 'rgba(167,139,250,0.02)' : 'rgba(167,139,250,0.04)'), padding: '1.75rem 2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', borderLeft: s.highlight ? '2px solid #A78BFA' : 'none' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <Check size={14} color="#A78BFA" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.375rem' }}>{s.item}</h3>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.7 }}>{s.detail}</p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      
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

      <section id="pricing" style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>Pricing</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Simple pricing. No lock-in. Cancel anytime.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto' }}>
                Every plan is month-to-month. We earn your business every month by delivering results.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', maxWidth: '1100px', margin: '0 auto' }}>
            {packages.map((pkg, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{ padding: '2.25rem', background: pkg.featured ? 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.06) 100%)' : 'rgba(167,139,250,0.03)', border: pkg.featured ? '1px solid rgba(167,139,250,0.4)' : '1px solid rgba(167,139,250,0.12)', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {pkg.featured && (
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #A78BFA, #C4B5FD)', borderRadius: '99px', padding: '0.25rem 1rem', fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#0a0010', whiteSpace: 'nowrap' }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontFamily: "'Nicholas', serif", fontSize: '1.375rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>{pkg.name}</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#A78BFA', marginBottom: '1.25rem' }}>{pkg.subtitle}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.375rem' }}>
                      <span style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 800, color: '#ffffff' }}>{pkg.price}</span>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#b8b6b3' }}>{pkg.period}</span>
                    </div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: '#b8b6b3' }}>{pkg.setup}</div>
                  </div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#b8b6b3', lineHeight: 1.7, marginBottom: '1.5rem' }}>{pkg.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', flex: 1 }}>
                    {pkg.includes.map((item, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                        <Check size={14} color="#A78BFA" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#e2e2e2', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a href="/book" className={pkg.featured ? 'btn-gradient' : 'btn-outline'} style={{ padding: '0.875rem 1.5rem', fontSize: '0.9375rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center' as const }}>
                    {pkg.cta} <ArrowRight size={14} />
                  </a>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <SectionBadge>Get Started</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              Stop losing high-value appointments to slow response times.
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              30 minutes. Free. No obligation. We'll map your revenue gaps and show you exactly what we'd build for your practice.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/book" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book a Free 30-Minute Audit <ArrowRight size={17} />
              </a>
              <a href="#pricing" className="btn-outline" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem' }}>
                View Pricing
              </a>
            </div>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}

