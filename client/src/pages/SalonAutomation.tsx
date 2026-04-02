/*
 * OPS BY NOELL — Salon Automation Landing Page
 * Route: /salon-automation
 * SEO: "salon automation", "AI booking for salons", "hair salon automation"
 */

import { ArrowRight, Check, X } from 'lucide-react';
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
  { title: 'Empty chairs from last-minute cancellations', detail: 'A cancellation with no waitlist management means lost revenue with no recovery. The chair sits empty. The stylist gets paid anyway.' },
  { title: 'Missed calls go to voicemail and stay there', detail: '85% of callers who hit voicemail will not call back. If your front desk is busy, that inquiry is gone.' },
  { title: 'No-shows with no follow-up', detail: 'A no-show who doesn\'t hear from you is a lost client. A no-show who gets a follow-up is a re-booking opportunity.' },
  { title: 'Clients lapse and never return', detail: 'If a client goes 8 weeks without booking, the odds of them returning drop dramatically. Nobody is reaching out to bring them back.' },
];

const solutions = [
  { item: 'Missed call text-back', detail: 'Every missed call gets an instant text response. The lead stays warm, gets a booking link, and schedules without ever needing to call back.' },
  { item: '24/7 online booking', detail: 'Clients book themselves at night, on weekends, whenever they think of it. Your calendar fills passively while your team is focused on clients in the salon.' },
  { item: 'Automated appointment reminders', detail: 'Text and email reminders reduce no-shows dramatically. Sent at 48 hours and 2 hours before the appointment. No staff action required.' },
  { item: 'Cancellation recovery', detail: 'When a cancellation comes in, an automated message goes to your waitlist contacts to fill the slot — before you even know it\'s empty.' },
  { item: 'Re-booking sequences', detail: 'Clients who haven\'t booked in 6–8 weeks get a natural, personal-feeling outreach. Most re-book. The ones who don\'t? At least you know.' },
  { item: 'Review generation', detail: 'After each appointment, an automated review request captures happy clients at peak satisfaction. Your Google presence builds without manual effort.' },
];

const serviceDetails = [
  {
    title: 'Missed Call Text-Back',
    body: 'Stylists cannot answer the phone when their hands are in someone\'s hair. An automatic text-back within 60 seconds keeps new client inquiries alive. 85% of callers who hit voicemail never call back — this system closes that gap before they call a competitor.',
  },
  {
    title: 'AI Booking + Reminder System',
    body: 'Last-minute cancellations leave chairs empty with no time to fill them. Automated reminders sent 48 hours out give clients a clear window to reschedule, which means you hear about cancellations early enough to fill the slot. Empty chair time drops. Revenue holds.',
  },
  {
    title: 'Automated Review Generation',
    body: 'Salons live and die by Google reviews. Clients leave happy but do not leave reviews unless prompted. Automated review requests go out after every appointment at peak response time — right when client satisfaction is highest and the experience is still fresh.',
  },
  {
    title: 'Client Reactivation',
    body: 'Most salons have hundreds of past clients who came once or twice and disappeared. Automated reactivation sequences bring 10–15% of lapsed clients back with zero ad spend. It is the highest-ROI growth lever most salons are not using.',
  },
];

const salonStats = [
  { value: '$1,200–$2,400', label: 'Lost monthly to missed calls and no-shows in the average salon' },
  { value: '4x', label: 'More likely to leave a review when asked within 2 hours of their appointment' },
  { value: '5–7x', label: 'Less expensive to reactivate a lapsed client than acquire a new one' },
];

const PACKAGES = [
  {
    name: 'Entry',
    subtitle: 'Start Here',
    price: '$197',
    period: '/mo · + $297 setup',
    desc: 'The fastest way to stop losing leads to voicemail. One system, done for you, live in a week.',
    includes: ['Missed Call Text-Back', 'AI Voice Receptionist (after-hours)', 'Onboarding & setup included', 'Ongoing management & maintenance'],
    cta: 'Book a Free 30-Minute Audit',
    featured: false,
  },
  {
    name: 'Starter',
    subtitle: 'Lead Capture + Booking Fix',
    price: '$797',
    period: '/mo · + $997 setup',
    desc: 'The essential foundation. Stop losing leads from missed calls and start filling your calendar automatically.',
    includes: ['Missed Call Text-Back', 'AI Booking + Reminder System', 'Onboarding & setup included', 'Ongoing management & maintenance'],
    cta: 'Book a Free 30-Minute Audit',
    featured: false,
  },
  {
    name: 'Growth',
    subtitle: 'Full AI Back Office',
    price: '$1,497',
    period: '/mo · + $1,497 setup',
    desc: 'Every system working together to capture, convert, retain, and grow — on autopilot.',
    includes: ['Everything in Starter', 'Automated Review Generation', 'Client Reactivation Sequences', 'Lead Follow-Up Automation', 'Priority support & optimization'],
    cta: 'Most Popular',
    featured: true,
  },
];

export default function SalonAutomation() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ── Hero ── */}
      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.2) 0%, rgba(139,92,246,0.12) 35%, #010509 72%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5.5rem' }}>
          <FadeItem delay={0}><div style={{ marginBottom: '1.5rem' }}><SectionBadge>Salon Automation</SectionBadge></div></FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.75rem, 6.5vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '820px', marginBottom: '1.75rem' }}>
              <GradientText>Your chair shouldn't sit empty</GradientText>{' '}<span style={{ color: '#ffffff' }}>because you were too busy to answer the phone.</span>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: '#868583', lineHeight: 1.75, maxWidth: '580px', marginBottom: '2.5rem' }}>
              Salons run on repeat clients and full books. Every missed call, no-show, and lapsed client is revenue left on the table. We build the systems that close those gaps automatically.
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

      {/* ── Service Detail: What Each System Does ── */}
      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>What We Build</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', maxWidth: '640px', margin: '1rem auto 0' }}>
                Four systems built for how salons actually run
              </h2>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {serviceDetails.map((s, i) => (
              <FadeItem key={i} delay={i * 0.09}>
                <div style={{ padding: '2rem', background: 'rgba(167,139,250,0.03)', border: '1px solid rgba(167,139,250,0.12)', borderRadius: '12px', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={14} color="#A78BFA" />
                    </div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.125rem', fontWeight: 700, color: '#ffffff' }}>{s.title}</h3>
                  </div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9rem', color: '#868583', lineHeight: 1.75 }}>{s.body}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── Salon Stat Block ── */}
      <section style={{ borderTop: '1px solid rgba(167,139,250,0.1)', borderBottom: '1px solid rgba(167,139,250,0.1)', padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {salonStats.map((s, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#A78BFA', marginBottom: '0.5rem' }}>{s.value}</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', lineHeight: 1.5, maxWidth: '200px', margin: '0 auto' }}>{s.label}</div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problems ── */}
      <section style={{ padding: '7rem 0' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>The Problem</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem' }}>
                The silent revenue leaks in most salons
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

      {/* ── Solutions ── */}
      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
              <SectionBadge>The Solution</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Six systems. Built for you. Running in the background.
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

      {/* ── Pricing ── */}
      
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

      <section id="pricing" style={{ padding: '6rem 0', background: 'rgba(167,139,250,0.015)', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <SectionBadge>Pricing</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Start with what matters most. <GradientText>Scale from there.</GradientText>
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#868583', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
                Every package is 100% done-for-you. We build it, connect it to your business, and once it's live, it runs. You don't touch a setting.
              </p>
            </div>
          </FadeItem>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
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
          <FadeItem delay={0.4}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', textAlign: 'center', marginTop: '1.75rem' }}>
              Month-to-month. No long-term contracts. Cancel anytime with 30 days notice.
            </p>
          </FadeItem>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ position: 'relative', padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <SectionBadge>Get Started</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              More bookings. Fewer no-shows. Less manual work.
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              30 minutes. Free. No obligation. We'll show you exactly what we'd build for your salon.
            </p>
            <a href="/book" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book a Free 30-Minute Audit <ArrowRight size={17} />
            </a>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}
