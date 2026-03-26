import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { useFadeIn } from '@/hooks/useFadeIn';
import { ArrowRight, Bot, Zap, MessageSquare, BarChart3, Phone, Calendar } from 'lucide-react';
import { Link } from 'wouter';

function FadeSection({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.65s ease-out, transform 0.65s ease-out',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function FadeItem({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const FAQS = [
  {
    q: 'Do I need to sign a long-term contract?',
    a: 'No. All plans are month-to-month. We earn your business every month by delivering results. You can cancel anytime with 30 days notice. No penalties, no lock-in.',
  },
  {
    q: 'How long does it take to get set up?',
    a: 'Most clients are fully live within 7–14 days of signing. We handle all the technical setup, integrations, and testing. You just need to show up for a 60-minute onboarding call.',
  },
  {
    q: 'Do I need any technical knowledge to use your systems?',
    a: "None at all. We build, manage, and maintain everything. You'll see the results, not the dashboards. If you ever want visibility into performance, we provide clear weekly or monthly reports.",
  },
  {
    q: 'What if I already use a CRM or booking software?',
    a: 'We integrate with the tools you already use: HubSpot, Calendly, Acuity, Jane App, Mindbody, and more. If you already have a CRM, we\'ll build around it rather than replace it. We\'ll scope the integration during your free intro call.',
  },
  {
    q: 'How does the process start?',
    a: 'It starts with a free 15-minute intro call. We learn about your business, you learn about us, and we figure out if we\'re a fit. If it makes sense to move forward, we schedule a paid Revenue Audit to map your exact gaps and design your system.',
  },
  {
    q: 'Can I upgrade or add more systems later?',
    a: 'Absolutely. Most clients start with one system and add more as they see results. We\'ll proactively recommend additions when we spot new opportunities in your operation.',
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section-pad" style={{ borderTop: '1px solid #2A2A2A' }}>
      <div className="container">
        <FadeSection>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>FAQ</p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
              fontWeight: 800,
              color: '#F5F0EB',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Common questions, honest answers.
            </h2>
          </div>
        </FadeSection>
        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0' }}>
          {FAQS.map((faq, i) => (
            <FadeItem key={i} delay={i * 0.06}>
              <div
                style={{
                  borderBottom: '1px solid #2A2A2A',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1.375rem 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: open === i ? '#A78BFA' : '#F5F0EB',
                    lineHeight: 1.4,
                    transition: 'color 0.2s ease',
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    flexShrink: 0,
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: open === i ? '#A78BFA' : '#2A2A2A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 2V8M2 5H8" stroke={open === i ? '#A78BFA' : '#8A8480'} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div style={{
                  maxHeight: open === i ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease',
                }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    color: '#8A8480',
                    lineHeight: 1.75,
                    paddingBottom: '1.375rem',
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </FadeItem>
          ))}
        </div>
      </div>
    </section>
  );
}

const BUILDS = [
  {
    icon: Bot,
    tag: 'Conversational AI',
    title: 'AI Lead Qualification Bot',
    description: 'A multi-step conversational AI that qualifies inbound leads via SMS or web chat, collects contact info, scores intent, and routes hot leads directly to your calendar, without any human involvement.',
    perfectFor: 'Med spas, salons, and service businesses with high inbound call and web traffic.',
    outcome: 'Avg. 3x increase in qualified bookings',
  },
  {
    icon: Zap,
    tag: 'Workflow Automation',
    title: 'Full Onboarding Pipeline',
    description: 'End-to-end client onboarding automation: intake forms, contract delivery, payment collection, welcome sequences, and calendar scheduling. All triggered the moment a lead converts.',
    perfectFor: 'Service businesses that manually onboard every new client via phone or email.',
    outcome: 'Onboarding time reduced from 2 days to 12 minutes',
  },
  {
    icon: MessageSquare,
    tag: 'Reputation Management',
    title: 'Review Generation Engine',
    description: 'Automated post-appointment review request sequences across Google, Yelp, and Facebook. Sentiment filtering routes unhappy clients to a private feedback form before they go public.',
    perfectFor: 'Any appointment-based business that wants more 5-star reviews without asking manually.',
    outcome: '4x review volume in 60 days',
  },
  {
    icon: BarChart3,
    tag: 'Analytics & Reporting',
    title: 'Automated Revenue Dashboard',
    description: 'Real-time revenue tracking pulled from your booking system, CRM, and payment processor. Consolidated into a single dashboard with weekly email digests and anomaly alerts.',
    perfectFor: 'Business owners who want to know their numbers without logging into five different tools.',
    outcome: 'Full visibility in under 30 seconds',
  },
  {
    icon: Phone,
    tag: 'Voice AI',
    title: 'Missed Call Recovery System',
    description: 'Every missed call triggers an instant AI-powered text response within 10 seconds. The AI engages the lead, answers FAQs, and books appointments. All before your competitor picks up.',
    perfectFor: 'Any service business that misses calls during appointments, after hours, or on weekends.',
    outcome: '< 10 sec average response time',
  },
  {
    icon: Calendar,
    tag: 'Scheduling Automation',
    title: 'Smart Booking + Reminder Pipeline',
    description: 'Intelligent scheduling that syncs across calendars, sends multi-channel reminders (SMS + email), handles reschedules automatically, and fills cancellations from a waitlist.',
    perfectFor: 'Massage therapists, med spas, dental offices, and salons with recurring appointments.',
    outcome: '30–50% no-show reduction',
  },
];

export default function Solutions() {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section
        style={{
          position: 'relative',
          paddingTop: 'calc(64px + 3rem)',
          paddingBottom: '3rem',
          backgroundColor: 'transparent',
          overflow: 'hidden',
        }}
      >

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeItem delay={0}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(167,139,250,0.1)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(167,139,250,0.3)',
              borderRadius: '100px',
              padding: '0.375rem 1rem',
              marginBottom: '2rem',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A78BFA' }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#A78BFA',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                AI Builds · Custom Automation Systems
              </span>
            </div>
          </FadeItem>

          <FadeItem delay={0.08}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#F5F0EB',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              maxWidth: '720px',
            }}>
              The AI systems we build.{' '}
              <span style={{ color: '#A78BFA' }}>See how they work.</span>
            </h1>
          </FadeItem>

          <FadeItem delay={0.16}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.0625rem',
              color: '#8A8480',
              lineHeight: 1.75,
              maxWidth: '560px',
              marginBottom: '2.5rem',
            }}>
Every system below is custom-built and deployed for your specific business. We don't hand you software. We install infrastructure that runs your business while you focus on the work.
            </p>
          </FadeItem>

          <FadeItem delay={0.24}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', alignItems: 'center' }}>
              <a href="/book" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#A78BFA',
                color: '#0A0A0A',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}>
                Get a Custom Build <ArrowRight size={14} />
              </a>
              <Link href="/services" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#8A8480',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#A78BFA'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8A8480'; }}
              >
                View Packages <ArrowRight size={13} />
              </Link>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ─── BUILDS GRID ─── */}
      <section className="section-pad" style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid #2A2A2A' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-2 lg:grid-cols-3">
            {BUILDS.map((build, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div
                  style={{
                    backgroundColor: '#141414',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: '#2A2A2A',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.4)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(167,139,250,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Icon + Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: 'rgba(167,139,250,0.12)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <build.icon size={18} color="#A78BFA" />
                    </div>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#8A8480',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>{build.tag}</span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: '#F5F0EB',
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}>{build.title}</h3>

                  {/* Description */}
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: '#8A8480',
                    lineHeight: 1.7,
                    flex: 1,
                  }}>{build.description}</p>

                  {/* Perfect for */}
                  {'perfectFor' in build && (
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8125rem',
                      color: '#8A8480',
                      lineHeight: 1.6,
                    }}>
                      <span style={{ color: '#A78BFA', fontWeight: 600 }}>Perfect for: </span>
                      {(build as any).perfectFor}
                    </p>
                  )}

                  {/* Outcome */}
                  <div style={{
                    backgroundColor: 'rgba(167,139,250,0.08)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(167,139,250,0.2)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                  }}>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: '#A78BFA',
                      letterSpacing: '-0.01em',
                    }}>{build.outcome}</p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>


      {/* ─── FAQ ─── */}
      <FAQSection />

      {/* ─── CUSTOM BUILD CTA ─── */}
      <section className="section-pad" style={{ backgroundColor: '#141414', borderTop: '1px solid #2A2A2A' }}>
        <div className="container">
          <FadeSection>
            <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Don't see what you need?</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                fontWeight: 800,
                color: '#F5F0EB',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
              }}>
                We build custom AI systems for your exact workflow.
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: '#8A8480',
                lineHeight: 1.75,
                marginBottom: '2.5rem',
              }}>
                Every business is different. Start with a free 15-minute intro call and we'll show you exactly what we'd build to fix it.
              </p>
              <a href="/book" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#A78BFA',
                color: '#0A0A0A',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9375rem',
                fontWeight: 700,
                padding: '0.875rem 2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}>
                Book Free Intro Call <ArrowRight size={15} />
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
