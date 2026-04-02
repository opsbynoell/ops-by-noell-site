/*
 * OPS BY NOELL — Home Services Automation Landing Page
 * Route: /home-services-automation
 * SEO: "home services automation", "AI for HVAC plumbers electricians contractors"
 */

import { ArrowRight, Check, X, Clock, Phone, Calendar } from 'lucide-react';
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
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', borderRadius: '99px', border: '1px solid rgba(167,139,250,0.25)', background: 'rgba(167,139,250,0.08)', fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#A78BFA' }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#A78BFA', display: 'inline-block' }} />
      {children}
    </span>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return <span style={{ background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{children}</span>;
}

const problems = [
  { title: 'Calls missed during active jobs', detail: 'You\'re on the roof or under a sink. The phone rings. You can\'t answer. The homeowner calls the next company on the list and books with them.' },
  { title: 'No system to capture after-hours leads', detail: 'After-hours inquiries go unanswered until morning. By then, someone else has already won the job.' },
  { title: 'Cold estimates that never convert', detail: 'You sent 20 estimates last month. Half never responded. Nobody followed up. That revenue is gone.' },
  { title: 'No review requests after completed jobs', detail: 'You do great work. The customer is happy. They never leave a review. You start every new lead with a blank reputation.' },
];

const solutions = [
  { item: 'Missed call text-back', detail: 'Every missed call gets an instant text response. "Hey, sorry we missed you — what can we help with?" The lead stays warm while you finish the job.' },
  { item: 'After-hours lead capture', detail: 'Web form submissions and missed calls after hours get an immediate automated response with a booking link. You wake up to qualified leads, not cold prospects.' },
  { item: 'Estimate follow-up sequences', detail: 'Every estimate you send triggers an automated follow-up at 24 hours, 3 days, and 7 days. Cold leads re-engage. Win rates improve.' },
  { item: '24/7 online booking', detail: 'Let homeowners schedule estimates or service calls directly online. Qualified appointments appear on your calendar without a single phone call.' },
  { item: 'Post-job review requests', detail: 'After each completed job, an automated text goes out asking for a Google review. Your reputation builds automatically as you work.' },
];

const serviceDetails = [
  {
    icon: <Phone size={24} color="#A78BFA" />,
    title: 'Missed Call Text-Back',
    body: 'A homeowner with a burst pipe or a broken AC is calling three contractors simultaneously. Whoever responds first gets the job. An automatic text-back within 60 seconds puts you first in line even when you are on another job.',
  },
  {
    icon: <ArrowRight size={24} color="#A78BFA" />,
    title: 'Lead Follow-Up Automation',
    body: 'Home service leads go cold in hours, not days. Automated follow-up sequences keep your business top of mind through the decision window without your team manually chasing every inquiry.',
  },
  {
    icon: <Calendar size={24} color="#A78BFA" />,
    title: 'AI Booking System',
    body: 'Allow clients to self-schedule service calls, estimates, and follow-up appointments directly from your website or text. No back-and-forth, no phone tag.',
  },
];

const stats = [
  { num: '78%', label: 'of homeowners hire the first contractor who responds' },
  { num: '62%', label: 'of inbound calls missed by average contractor on job sites' },
  { num: '35%', label: 'of lost leads recovered by automated follow-up' },
];

const BOOKING_LINK = 'https://api.leadconnectorhq.com/widget/booking/hxFAP5dMiIqvBj2gf8ld';

export default function HomeServicesAutomation() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.2) 0%, rgba(139,92,246,0.12) 35%, #010509 72%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}><SectionBadge>Home Services Automation</SectionBadge></div>
          
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.75rem, 6.5vw, 5rem)', fontWeight: 800, lineHeight: 1.7, letterSpacing: '-0.03em', maxWidth: '820px', marginBottom: '1.75rem' }}>
              <span style={{ color: '#ffffff' }}>Most home service jobs are won or lost after 5pm.</span>{' '}<GradientText>We make sure you win them.</GradientText>
            </h1>
          
          
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: '#b8b6b3', lineHeight: 1.75, maxWidth: '580px', marginBottom: '2.5rem' }}>
              In home services, the first company to respond wins. We build the systems that respond instantly to every inquiry — even when you're mid-job — so you're always first in line.
            </p>
          
          
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={BOOKING_LINK} target="_blank" rel="noreferrer" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book a Free 30-Minute Audit <ArrowRight size={16} />
              </a>
              <a href="/services" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>See Pricing</a>
            </div>
          
        </div>
      </section>

      {/* ── SERVICE DETAIL SECTION ── */}
      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>Speed to Lead</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Whoever answers first wins the job.
              </h2>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto' }}>
                Here's what we build for home service businesses — and why each piece matters.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {serviceDetails.map((svc, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{ padding: '2.25rem', background: 'rgba(167,139,250,0.03)', border: '1px solid rgba(167,139,250,0.12)', borderRadius: '12px', height: '100%' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                    {svc.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.1875rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>{svc.title}</h3>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.75 }}>{svc.body}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAT BLOCK ── */}
      <section style={{ padding: '5rem 0', background: 'rgba(167,139,250,0.03)', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <SectionBadge>Industry Data</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, letterSpacing: '-0.02em', marginTop: '1rem' }}>
                The numbers behind the missed revenue.
              </h2>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {stats.map((s, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{ padding: '2rem', background: '#010509', border: '1px solid rgba(167,139,250,0.15)', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: '#A78BFA', lineHeight: 1, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>{s.num}</div>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3', lineHeight: 1.6 }}>{s.label}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      
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
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#A78BFA' }}>
              Santa M. — Licensed Massage Therapist, Laguna Niguel CA
            </p>
          </div>
        </div>
      </section>

      {/* ── PRICING + BOOKING CTA ── */}
      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>Pricing</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Simple pricing. No hidden fees.
              </h2>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75, maxWidth: '500px', margin: '0 auto' }}>
                Every plan includes setup, installation, and ongoing management. You don't touch the tech — we handle everything.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '960px', margin: '0 auto 4rem' }}>
            {/* Entry */}
            <FadeItem delay={0.05}>
              <div style={{ padding: '2rem', background: 'rgba(167,139,250,0.02)', border: '1px solid rgba(167,139,250,0.12)', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#A78BFA', marginBottom: '0.75rem' }}>Entry</div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: "'Nicholas', serif", fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>$197</span>
                  <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3' }}>/mo</span>
                </div>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3', marginBottom: '1.5rem' }}>+ $497 setup fee</div>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.65, marginBottom: '1.5rem' }}>Missed call text-back only. The single highest-ROI automation for home service businesses — deploy it in days.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
                  {['Instant missed call text-back', 'Automated lead follow-up sequence', 'Monthly performance report'].map((f) => (
                    <li key={f} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3' }}>
                      <Check size={14} color="#A78BFA" style={{ marginTop: '3px', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={BOOKING_LINK} target="_blank" rel="noreferrer" className="btn-outline" style={{ textAlign: 'center', padding: '0.875rem 1.5rem', fontSize: '0.9375rem', display: 'block' }}>
                  Get Started
                </a>
              </div>
            </FadeItem>
            {/* Starter */}
            <FadeItem delay={0.1}>
              <div style={{ padding: '2rem', background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '4px 14px', background: '#A78BFA', borderRadius: '99px', fontFamily: "'Nicholas', serif", fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#010509', whiteSpace: 'nowrap' }}>Most Popular</div>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#A78BFA', marginBottom: '0.75rem' }}>Starter</div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: "'Nicholas', serif", fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>$797</span>
                  <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3' }}>/mo</span>
                </div>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3', marginBottom: '1.5rem' }}>+ $997 setup fee</div>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.65, marginBottom: '1.5rem' }}>Full lead capture, follow-up, booking, and review generation. The complete stack for a busy home service operation.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
                  {['Missed call text-back (60-second response)', 'After-hours lead capture + auto-reply', 'Estimate follow-up sequences', 'AI online booking system', 'Post-job review requests', 'Monthly performance reporting'].map((f) => (
                    <li key={f} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3' }}>
                      <Check size={14} color="#A78BFA" style={{ marginTop: '3px', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={BOOKING_LINK} target="_blank" rel="noreferrer" className="btn-gradient" style={{ textAlign: 'center', padding: '0.875rem 1.5rem', fontSize: '0.9375rem', display: 'block', fontWeight: 700 }}>
                  Book a Free 30-Minute Audit
                </a>
              </div>
            </FadeItem>
            {/* Growth */}
            <FadeItem delay={0.15}>
              <div style={{ padding: '2rem', background: 'rgba(167,139,250,0.02)', border: '1px solid rgba(167,139,250,0.12)', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#A78BFA', marginBottom: '0.75rem' }}>Growth</div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: "'Nicholas', serif", fontSize: '2.5rem', fontWeight: 800, color: '#ffffff' }}>$1,497</span>
                  <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3' }}>/mo</span>
                </div>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3', marginBottom: '1.5rem' }}>+ $1,497 setup fee</div>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.65, marginBottom: '1.5rem' }}>Everything in Starter plus AI voice agent, seasonal maintenance campaigns, and advanced pipeline management.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
                  {['Everything in Starter', 'AI voice agent (answers calls)', 'Seasonal maintenance campaigns', 'Repeat customer win-back sequences', 'Custom CRM pipeline + reporting'].map((f) => (
                    <li key={f} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3' }}>
                      <Check size={14} color="#A78BFA" style={{ marginTop: '3px', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={BOOKING_LINK} target="_blank" rel="noreferrer" className="btn-outline" style={{ textAlign: 'center', padding: '0.875rem 1.5rem', fontSize: '0.9375rem', display: 'block' }}>
                  Get Started
                </a>
              </div>
            </FadeItem>
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>The Problem</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, letterSpacing: '-0.02em', marginTop: '1rem' }}>
                How jobs slip through the cracks every single day
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
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#b8b6b3', lineHeight: 1.7 }}>{p.detail}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ── */}
      <section style={{ padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
              <SectionBadge>The Solution</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Systems that respond, follow up, and close — while you work.
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
                    <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.7 }}>{s.detail}</p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: 'relative', padding: '7rem 0', borderTop: '1px solid rgba(167,139,250,0.08)', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <SectionBadge>Get Started</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.7, letterSpacing: '-0.03em', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              Stop losing jobs to the company that answers faster.
            </h2>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#b8b6b3', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              30 minutes. Free. No obligation. We'll show you what we'd build and what it costs.
            </p>
            <a href={BOOKING_LINK} target="_blank" rel="noreferrer" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Book a Free 30-Minute Audit <ArrowRight size={17} />
            </a>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}

