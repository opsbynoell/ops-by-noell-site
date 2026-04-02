/*
 * OPS BY NOELL — Massage Therapist Automation Landing Page
 * Route: /massage-therapist-automation
 * SEO: "massage therapist automation", "AI booking for massage therapists", "AI receptionist massage"
 */

import { ArrowRight, Check, Phone, Quote, X } from 'lucide-react';
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

const heroStats = [
  { value: '< 10s', label: 'Response time to missed calls' },
  { value: '85%', label: 'Of callers never call back after voicemail' },
  { value: '75%', label: 'No-show reduction in 2 weeks' },
  { value: '2 weeks', label: 'To full automation' },
];

const caseStudyStats = [
  { value: '75%', label: 'Reduction in no-shows' },
  { value: '$960', label: 'Revenue recovered in first 2 weeks' },
  { value: '0', label: 'Changes to how she runs her practice' },
];

const services = [
  {
    item: 'Missed Call Text-Back',
    detail: 'Solo practitioners miss calls constantly while they are with clients. An automatic text goes out within 60 seconds so the new client does not move on to someone else.',
    highlight: false,
  },
  {
    item: 'AI Booking + Reminder System',
    detail: 'The fix is three automated touches: instant booking confirmation, 48-hour reminder with reschedule link, 2-hour same-day reminder. Runs without you touching it.',
    highlight: true,
  },
  {
    item: 'Automated Review Generation',
    detail: 'Happy clients do not leave reviews unless asked at the right moment. Automated review requests go out 2 hours after every appointment while the client is still feeling good.',
    highlight: false,
  },
  {
    item: 'AI Voice Receptionist',
    detail: 'A trained AI agent picks up your missed calls, greets callers in your practice\'s name, answers questions about services, and books appointments directly into your calendar — day or night. No voicemail. No lost clients.',
    highlight: false,
  },
  {
    item: 'Re-Engagement Sequences',
    detail: 'Clients who have not booked in 30, 60, or 90 days get a natural, personal-feeling follow-up. Most re-book within a week of hearing from you.',
    highlight: false,
  },
];

const industryStats = [
  { stat: '30–50%', context: 'of new client calls go unanswered while practitioners are in session' },
  { stat: '$500–$800', context: 'lost per week to no-shows in the average massage practice' },
  { stat: '75%', context: 'no-show reduction with a 3-touch automated reminder sequence' },
];

const pricingTiers = [
  {
    name: 'Entry',
    price: '$197',
    period: '/mo',
    setup: '$497 setup',
    description: 'Missed call text-back only. Ideal if your biggest leak is unanswered calls.',
    features: [
      'Instant missed call text-back (< 60 sec)',
      'Custom text template in your voice',
      'GHL CRM setup and management',
      'Ongoing monitoring and support',
    ],
    highlight: false,
    cta: 'Get Started',
  },
  {
    name: 'Starter',
    price: '$797',
    period: '/mo',
    setup: '$997 setup',
    description: 'The full no-show fix. Booking, reminders, review generation, and missed call text-back.',
    features: [
      'Everything in Entry',
      'AI booking + 3-touch reminder system',
      'Automated review generation',
      '24/7 online booking',
      'Monthly performance report',
    ],
    highlight: true,
    cta: 'Most Popular — Get Started',
  },
  {
    name: 'Growth',
    price: '$1,497',
    period: '/mo',
    setup: '$1,497 setup',
    description: 'Full-stack automation plus AI Voice. We handle every inbound call and every follow-up.',
    features: [
      'Everything in Starter',
      'AI Voice Receptionist (24/7)',
      'Re-engagement sequences',
      'Lead follow-up automation',
      'Priority support',
    ],
    highlight: false,
    cta: 'Get Started',
  },
];

export default function MassageTherapistAutomation() {
  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.2) 0%, rgba(139,92,246,0.12) 35%, #010509 72%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5.5rem' }}>
          <FadeItem delay={0}><div style={{ marginBottom: '1.5rem' }}><SectionBadge>Massage Therapist Automation</SectionBadge></div></FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.75rem, 6.5vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '820px', marginBottom: '1.75rem' }}>
              <GradientText>AI receptionist and automation</GradientText>{' '}<span style={{ color: '#ffffff' }}>for massage therapists. Stop losing clients to voicemail.</span>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(1rem, 1.4vw, 1.125rem)', color: '#868583', lineHeight: 1.75, maxWidth: '580px', marginBottom: '2.5rem' }}>
              You built your practice on your hands, not on following up leads and chasing no-shows. We build the AI systems that handle every call, every reminder, and every re-engagement — so you can stay focused on your clients.
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

      {/* Stats strip */}
      <section style={{ borderTop: '1px solid rgba(167,139,250,0.1)', borderBottom: '1px solid rgba(167,139,250,0.1)', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {heroStats.map((s, i) => (
              <FadeItem key={i} delay={i * 0.07}>
                <div style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#A78BFA', marginBottom: '0.4rem' }}>{s.value}</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', lineHeight: 1.5 }}>{s.label}</div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study — Santa */}
      <section style={{ padding: '7rem 0', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ marginBottom: '1rem' }}><SectionBadge>Client Results</SectionBadge></div>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '780px', marginBottom: '4rem' }}>
              From 4 no-shows a week to less than 1. In 2 weeks.
            </h2>
          </FadeItem>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            <FadeItem delay={0.1}>
              <div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#c4c4c4', lineHeight: 1.85, marginBottom: '1.5rem' }}>
                  Santa has been a licensed massage therapist in Laguna Niguel for six years. She was losing roughly $600 a week to no-shows and last-minute cancellations. We built a three-touch automated reminder sequence. In two weeks her no-show rate dropped from 21% to 6%.
                </p>

                {/* Pull quote */}
                <div style={{ position: 'relative', padding: '2rem 2rem 2rem 2.5rem', background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.15)', borderLeft: '3px solid #A78BFA', borderRadius: '0 10px 10px 0', marginBottom: '2rem' }}>
                  <Quote size={20} color="rgba(167,139,250,0.3)" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }} />
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#e2e2e2', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1rem' }}>
                    "I used to dread Mondays because there would always be gaps I did not expect. Now I open my calendar and it is just full. The reminders go out and people show up. I do not think about it anymore."
                  </p>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#A78BFA' }}>
                    Santa, Licensed Massage Therapist — Laguna Niguel
                  </div>
                </div>

                <a href="/case-study/massage-therapist" style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', fontWeight: 600, color: '#A78BFA', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                  Read the full case study <ArrowRight size={14} />
                </a>
              </div>
            </FadeItem>

            <FadeItem delay={0.2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {caseStudyStats.map((cs, i) => (
                  <div key={i} style={{ padding: '1.75rem 2rem', background: i === 0 ? 'rgba(167,139,250,0.08)' : 'rgba(167,139,250,0.03)', border: '1px solid rgba(167,139,250,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#A78BFA', lineHeight: 1, flexShrink: 0 }}>{cs.value}</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#c4c4c4', lineHeight: 1.5 }}>{cs.label}</div>
                  </div>
                ))}
              </div>
            </FadeItem>
          </div>
        </div>
      </section>

      {/* Service Detail — massage therapist specific */}
      <section style={{ padding: '7rem 0', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ maxWidth: '600px', marginBottom: '3.5rem' }}>
              <SectionBadge>What We Build</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '1rem' }}>
                Done-for-you automation. We build it. We run it.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.75 }}>
                Everything below is managed and maintained for you. Zero tech setup required on your end.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(167,139,250,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
            {services.map((s, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{ background: s.highlight ? 'rgba(167,139,250,0.08)' : (i % 2 === 0 ? 'rgba(167,139,250,0.02)' : 'rgba(167,139,250,0.04)'), padding: '1.75rem 2rem', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', borderLeft: s.highlight ? '2px solid #A78BFA' : 'none' }}>
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

      {/* Stat block — industry context */}
      <section style={{ padding: '7rem 0', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>The Numbers</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem' }}>
                The revenue leaks in every solo practice
              </h2>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {industryStats.map((s, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{ padding: '2.5rem 2rem', background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.12)', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.25rem, 5vw, 3rem)', fontWeight: 800, color: '#A78BFA', marginBottom: '0.75rem', lineHeight: 1 }}>{s.stat}</div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.65 }}>{s.context}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '7rem 0', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>Pricing</SectionBadge>
              <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '1rem', marginBottom: '0.75rem' }}>
                Simple, flat-rate pricing. No surprises.
              </h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
                Every plan includes full setup, ongoing management, and support from our team. You pay one flat rate. We handle everything.
              </p>
            </div>
          </FadeItem>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '1000px', margin: '0 auto' }}>
            {pricingTiers.map((tier, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{ padding: '2.25rem', background: tier.highlight ? 'rgba(167,139,250,0.08)' : 'rgba(167,139,250,0.03)', border: tier.highlight ? '1px solid rgba(167,139,250,0.35)' : '1px solid rgba(167,139,250,0.12)', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' as const }}>
                  {tier.highlight && (
                    <div style={{ position: 'absolute' as const, top: '-13px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #A78BFA, #C4B5FD)', borderRadius: '99px', padding: '0.25rem 1rem', fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 700, color: '#0a0614', letterSpacing: '0.08em', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#A78BFA', marginBottom: '0.625rem' }}>{tier.name}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{tier.price}</span>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583' }}>{tier.period}</span>
                    </div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', marginBottom: '1rem' }}>{tier.setup}</div>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#c4c4c4', lineHeight: 1.65 }}>{tier.description}</p>
                  </div>
                  <div style={{ flex: 1, marginBottom: '1.75rem' }}>
                    {tier.features.map((feat, fi) => (
                      <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', marginBottom: '0.625rem' }}>
                        <Check size={14} color="#A78BFA" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#e2e2e2', lineHeight: 1.5 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                  <a href="/book" className={tier.highlight ? 'btn-gradient' : 'btn-outline'} style={{ textAlign: 'center', padding: '0.875rem 1.5rem', fontSize: '0.9375rem', fontWeight: 600, display: 'block', textDecoration: 'none' }}>
                    {tier.cta}
                  </a>
                </div>
              </FadeItem>
            ))}
          </div>
          <FadeItem delay={0.4}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', textAlign: 'center', marginTop: '2rem' }}>
              Not sure which plan fits? <a href="/book" style={{ color: '#A78BFA', textDecoration: 'none', fontWeight: 600 }}>Book a free 30-minute call</a> and we will map it out for you.
            </p>
          </FadeItem>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', padding: '7rem 0', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <SectionBadge>Get Started</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              Your practice deserves a full calendar, not a full voicemail box.
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1rem', color: '#868583', lineHeight: 1.75, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              30 minutes. Free. No obligation. We will map your revenue gaps and show you exactly what we would build.
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
