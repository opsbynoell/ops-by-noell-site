/*
 * OPS BY NOELL — Home Page
 * Design: Sharp, Clean, AI-Forward (Stripe/Linear/Vercel)
 * Sections: Hero, Proof Bar, Problem, Solution, Services Overview,
 *           How It Works, Marketing Spotlight, Case Study Preview,
 *           Cost of Inaction, Closing CTA
 *
 * Color: bg #0A0A0A / surface #FFFFFF / border #2A2A2A / headline #1A1A1A / body #8A8480 / accent #A78BFA
 * Typography: Inter throughout — 700/600 headlines, 400/500 body
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Phone, Calendar, Star, MessageSquare, Megaphone, Settings, ChevronRight, Check } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';

// Fade-in wrapper component
function FadeSection({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
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
        transition: `opacity 0.55s ease-out ${delay}s, transform 0.55s ease-out ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: '64px',
          backgroundColor: 'transparent',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem', paddingBottom: '3.5rem' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem', alignItems: 'center' }}>
          <div>

            <FadeItem delay={0.08}>
              <h1 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                color: '#F5F0EB',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: '1.5rem',
              }}>
                We build the systems.{' '}
                <span style={{ color: '#A78BFA' }}>Automation runs them. You get your time back.</span>
              </h1>
            </FadeItem>

            <FadeItem delay={0.16}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.125rem',
                color: '#C8C0B8',
                lineHeight: 1.75,
                marginBottom: '2.5rem',
                maxWidth: '580px',
                fontWeight: 400,
              }}>
                Follow-up. Bookings. Reminders. Reviews. AI receptionist. We build done-for-you automation systems for service businesses, so you can get back to doing what you do best.
              </p>
            </FadeItem>

            <FadeItem delay={0.24}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', alignItems: 'center' }}>
                <a href="/book" className="btn-primary">
                  Book Free Intro Call
                  <ArrowRight size={14} />
                </a>

                {/* Lower-friction CTA for colder visitors */}
                <Link href="/solutions" style={{
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
                  See How It Works <ArrowRight size={13} />
                </Link>
              </div>
            </FadeItem>
          </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          zIndex: 2,
          cursor: 'pointer',
          opacity: 0.5,
        }}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div style={{
            width: '1.125rem',
            height: '1.875rem',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(245,240,235,0.3)',
            borderRadius: '999px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '0.25rem',
          }}>
            <div style={{
              width: '2px',
              height: '5px',
              backgroundColor: '#A78BFA',
              borderRadius: '999px',
              animation: 'scrollBob 1.8s ease-in-out infinite',
            }} />
          </div>
          <style>{`
            @keyframes scrollBob {
              0%, 100% { transform: translateY(0); opacity: 1; }
              50% { transform: translateY(6px); opacity: 0.3; }
            }
            @media (max-width: 767px) {
              .hero-grid {
                grid-template-columns: 1fr !important;
                gap: 2.5rem !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ─── PROOF BAR ─── */}
      <section style={{ backgroundColor: 'transparent', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A', padding: '2.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0',
          }} className="lg:grid-cols-4">
            {[
              { stat: '2 weeks', label: 'Average time from audit to live systems' },
              { stat: '30–50%', label: 'Typical no-show reduction with reminders' },
              { stat: '< 10 sec', label: 'Missed call response time' },
              { stat: '0 hrs/week', label: 'Your time managing it after we build it' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem 2rem',
                  borderRight: i < 3 ? '1px solid #2A2A2A' : 'none',
                  borderBottom: i < 2 ? '1px solid #2A2A2A' : 'none',
                  textAlign: 'center',
                }}
                className="lg:border-b-0"
              >
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.02em',
                }}>
                  {item.stat}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.6875rem',
                  color: '#8A8480',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section style={{ backgroundColor: 'transparent', borderBottom: '1px solid #2A2A2A', padding: '1.25rem 0' }}>
        <div className="container">
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            color: '#8A8480',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            Trusted by service businesses across Orange County
          </p>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent' }}>
        <div className="container">
          <FadeSection>
            <div style={{ maxWidth: '580px', marginBottom: '4rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>The Problem</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#F5F0EB',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
              }}>
                The work is great. The follow-through is where things fall apart.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#C8C0B8', lineHeight: 1.8 }}>
                Every missed call is a potential client who went somewhere else. Every manual follow-up that never happened is a lead that went cold. These aren't marketing problems. They're systems problems. And they're fixable.
              </p>
            </div>
          </FadeSection>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Missed Leads',
                body: 'When someone calls and hits voicemail, they hang up and call the next person on the list. That next person gets the job. It happens every day.',
                icon: Phone,
              },
              {
                number: '02',
                title: 'Manual Processes',
                body: "Scheduling by phone, reminders by hand, follow-up by memory. Every manual task is a bottleneck, and a liability when you're busy.",
                icon: Calendar,
              },
              {
                number: '03',
                title: 'No Follow-Up System',
                body: 'One-time clients who never return. No review requests. No re-engagement. The relationship ends when the appointment does.',
                icon: MessageSquare,
              },
            ].map((card, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{
                  backgroundColor: 'transparent',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: '#2A2A2A',
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  height: '100%',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#A78BFA';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(167,139,250,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '3rem',
                      fontWeight: 800,
                      color: 'rgba(167,139,250,0.35)',
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                    }}>
                      {card.number}
                    </span>
                    <div style={{ width: '36px', height: '36px', backgroundColor: 'rgba(167,139,250,0.12)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <card.icon size={18} color="#A78BFA" />
                    </div>
                  </div>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: '#F5F0EB',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                  }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#8A8480', lineHeight: 1.8 }}>
                    {card.body}
                  </p>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE SOLUTION ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', alignItems: 'center', maxWidth: '760px' }}>
            {/* Left: Copy */}
            <FadeItem delay={0}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '1rem' }}>The Solution</p>
                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  color: '#F5F0EB',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '1.5rem',
                }}>
                  We build the behind-the-scenes systems that make your business run. And then they run themselves.
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#C8C0B8', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  We don't sell software or hand you a login and wish you luck. We build your complete automation system from scratch: designed around your specific business, connected to your tools, and running from day one.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#C8C0B8', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                  From the moment a lead calls to the moment they leave a five-star review, every step is automated, optimized, and running. Whether you're with a client or asleep.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {[
                    'We design the system around your specific business',
                    'We install and configure every component',
                    'We monitor it and adjust as your business grows',
                    'You see results, not dashboards.',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <div style={{ width: '20px', height: '20px', backgroundColor: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px', borderRadius: '4px' }}>
                        <Check size={11} color="#A78BFA" strokeWidth={2.5} />
                      </div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: '#8A8480', lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>

                <a href="/book" className="btn-primary">
                  Book Free Intro Call
                  <ArrowRight size={14} />
                </a>
              </div>
            </FadeItem>


          </div>
        </div>
      </section>

      {/* ─── SERVICES OVERVIEW ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent' }}>
        <div className="container">
          <FadeSection>
            <div style={{ maxWidth: '560px', marginBottom: '4rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>What We Build</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#F5F0EB',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
              }}>
                Six systems. Built once. Running always.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#C8C0B8', lineHeight: 1.8 }}>
                Each system is custom-built for your business and runs automatically: follow-up, bookings, reviews, and more. No lifting a finger required.
              </p>
            </div>
          </FadeSection>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }} className="md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Missed Call Text-Back',
                tag: 'Lead Capture',
                body: 'Every missed call triggers an instant automated text in under 10 seconds. The lead stays warm. Your competitor doesn\'t get the chance.',
                icon: Phone,
                accent: false,
              },
              {
                number: '02',
                title: 'Automatic Booking + Reminders',
                tag: 'Scheduling',
                body: '24/7 AI-driven booking without phone tag. Smart reminders that cut no-shows by 30–50%.',
                icon: Calendar,
                accent: false,
              },
              {
                number: '03',
                title: 'Review Requests on Autopilot',
                tag: 'Reputation',
                body: 'Automated review requests after every interaction. More 5-star reviews, higher ranking, more inbound leads.',
                icon: Star,
                accent: false,
              },
              {
                number: '04',
                title: 'Follow-Up That Actually Happens',
                tag: 'Conversion',
                body: 'Most businesses follow up once. Our AI follows up until it converts. Intelligent sequences that turn cold leads into booked clients.',
                icon: MessageSquare,
                accent: false,
              },
              {
                number: '05',
                title: 'Bring Back Lost Clients',
                tag: 'Retention',
                body: 'AI-powered campaigns that identify and re-activate lapsed clients before they\'re gone for good.',
                icon: Settings,
                accent: false,
              },
              {
                number: '06',
                title: 'Stay in Touch Without Thinking About It',
                tag: 'Growth',
                body: 'Seasonal promotions, personalized outreach, referral pipelines. Enterprise-level marketing automation, done for you.',
                icon: Megaphone,
                accent: true,
              },
            ].map((service, i) => (
              <FadeItem key={i} delay={i * 0.07}>
                <div style={{
                  backgroundColor: service.accent ? 'rgba(167,139,250,0.08)' : '#0A0A0A',
                  border: service.accent ? '1px solid rgba(167,139,250,0.45)' : '1px solid #2A2A2A',
                  boxShadow: service.accent ? '0 0 32px rgba(167,139,250,0.12), inset 0 0 20px rgba(167,139,250,0.04)' : 'none',
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                  onMouseEnter={(e) => {
                    if (!service.accent) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.3)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(167,139,250,0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!service.accent) {
                      (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: '36px', height: '36px',
                      backgroundColor: service.accent ? 'rgba(167,139,250,0.15)' : '#FDF4E3',
                      borderRadius: '0.5rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <service.icon size={18} color={service.accent ? '#A78BFA' : '#A78BFA'} />
                    </div>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.625rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: service.accent ? '#A78BFA' : '#8A8480',
                      border: `1px solid ${service.accent ? 'rgba(167,139,250,0.35)' : '#2A2A2A'}`,
                      padding: '0.25rem 0.625rem',
                      borderRadius: '100px',
                    }}>
                      {service.tag}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: '#F5F0EB',
                    marginBottom: '0.625rem',
                    lineHeight: 1.3,
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: '#8A8480',
                    lineHeight: 1.8,
                    flexGrow: 1,
                  }}>
                    {service.body}
                  </p>
                  {service.accent && (
                    <a href="/book" style={{
                      marginTop: '1.5rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: '#A78BFA',
                      textDecoration: 'none',
                      opacity: 1,
                    }}>
                      Book Free Intro Call <ArrowRight size={13} />
                    </a>
                  )}
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES WE SERVE ─── */}
      <section id="industries" className="section-pad" style={{ backgroundColor: 'transparent', borderTop: '1px solid #2A2A2A' }}>
        <div className="container">
          <FadeSection>
            <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 3.5rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Industries We Serve</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                color: '#F5F0EB',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}>
                We build AI automation for appointment-based service businesses.
              </h2>
            </div>
          </FadeSection>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Med Spas & Wellness',
                body: 'AI receptionist, treatment follow-up, and review generation that fills your calendar and builds your online reputation.',
              },
              {
                title: 'Massage & Bodywork',
                body: 'Missed call text-back, automated booking and reminders, and client reactivation campaigns that bring lapsed clients back.',
              },
              {
                title: 'Salons & Spas',
                body: '24/7 AI booking, no-show reduction, and automated review requests that keep your chairs full and your ratings high.',
              },
              {
                title: 'Dental & Healthcare',
                body: 'AI-powered patient intake, appointment reminders, recall campaigns, and review generation for your practice.',
              },
            ].map((industry, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{
                  backgroundColor: '#0A0A0A',
                  border: '1px solid #2A2A2A',
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.2s ease',
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.4)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A'; }}
                >
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#F5F0EB',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                  }}>
                    {industry.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: '#8A8480',
                    lineHeight: 1.8,
                    flexGrow: 1,
                    marginBottom: '1.5rem',
                  }}>
                    {industry.body}
                  </p>
                  <a href="/book" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: '#A78BFA',
                    textDecoration: 'none',
                  }}>
                    Book Free Intro Call <ArrowRight size={12} />
                  </a>
                </div>
              </FadeItem>
            ))}
          </div>

          <FadeSection>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9375rem',
              color: '#8A8480',
              textAlign: 'center',
              marginTop: '2.5rem',
              lineHeight: 1.7,
            }}>
              Don't see your industry? We work with any appointment-based service business.{' '}
              <a href="/book" style={{ color: '#A78BFA', textDecoration: 'none', fontWeight: 500 }}>Book a free intro call</a>{' '}
              and we'll show you what we can build.
            </p>
          </FadeSection>
        </div>
      </section>

      {/* ─── TECH STACK / POWERED BY ─── */}
      <section style={{ backgroundColor: 'rgba(20,20,20,0.55)', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A', padding: '3.5rem 0' }}>
        <div className="container">
            <FadeSection>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: '#8A8480',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}>Built on enterprise-grade AI infrastructure</p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: '#C8C0B8',
                lineHeight: 1.75,
                maxWidth: '560px',
                margin: '0 auto',
              }}>
                Every system we build runs on enterprise-grade AI infrastructure, the same platforms powering thousands of fast-growing service businesses, configured specifically for yours. We handle the setup, the connections, and the ongoing monitoring so you never have to.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A' }}>
        <div className="container">
          <FadeSection>
            <div style={{ maxWidth: '560px', marginBottom: '4.5rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>The Process</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                color: '#F5F0EB',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
              }}>
                From audit to automation in as little as{' '}
                <span style={{ color: '#A78BFA' }}>two weeks.</span>
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: '#C8C0B8', lineHeight: 1.8 }}>
                Most clients are fully live within 2 weeks of their audit. You don't change how you work. The system adapts to you.
              </p>
            </div>
          </FadeSection>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Free 15-Min Intro Call',
                body: 'We learn about your business, answer your questions, and see if we\'re a fit. No pitch. No pressure. Just a real conversation.',
              },
              {
                step: '02',
                title: 'System Design',
                body: 'We build your automation stack to fit your business and workflow. Configured specifically for you, not a generic template.',
              },
              {
                step: '03',
                title: 'Installation',
                body: 'We install and test everything. Most clients are fully live within two weeks. Once your system is live, Nova (our AI assistant) is available around the clock to answer your questions. And when something needs a human, The Noells are here.',
              },
              {
                step: '04',
                title: 'Automated Growth',
                body: 'Leads get captured. Follow-up runs. Reviews come in. Clients come back. You focus on delivery. The system handles the rest.',
              },
            ].map((step, i) => (
              <FadeItem key={i} delay={i * 0.1}>
                <div style={{
                  backgroundColor: 'transparent',
                  borderTop: i === 3 ? '3px solid #A78BFA' : '1px solid #2A2A2A',
                  borderRight: '1px solid #2A2A2A',
                  borderBottom: '1px solid #2A2A2A',
                  borderLeft: '1px solid #2A2A2A',
                  borderRadius: '0.75rem',
                  padding: '2rem',
                  height: '100%',
                  position: 'relative',
                }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '4rem',
                    fontWeight: 800,
                    color: 'rgba(167,139,250,0.4)',
                    lineHeight: 1,
                    marginBottom: '-0.5rem',
                    letterSpacing: '-0.04em',
                  }}>
                    {step.step}
                  </div>
                  <div style={{
                    width: '24px',
                    height: '3px',
                    backgroundColor: '#A78BFA',
                    marginBottom: '1rem',
                    marginTop: '0.5rem',
                  }} />
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#F5F0EB',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#8A8480', lineHeight: 1.8 }}>
                    {step.body}
                  </p>
                </div>
              </FadeItem>
            ))}
          </div>

          <FadeSection style={{ marginTop: '3.5rem', textAlign: 'center' }}>
            <a href="/book" className="btn-primary">
              Book Free Intro Call
              <ArrowRight size={14} />
            </a>
          </FadeSection>
        </div>
      </section>

      {/* ─── REAL RESULTS + CASE STUDY PREVIEW ─── */}
      <section className="section-pad" style={{ backgroundColor: 'rgba(20,20,20,0.55)', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A' }}>
        <div className="container" style={{ marginBottom: '3rem' }}>
          <FadeSection>
            <div style={{ textAlign: 'center' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Real Results</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: '#F5F0EB',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
              }}>We build the system. You see the results.</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#C8C0B8', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto' }}>
                Every client we take on gets a custom-built system designed around their specific business. Here's what that looks like in practice.
              </p>
            </div>
          </FadeSection>
        </div>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0',
            backgroundColor: 'transparent',
            overflow: 'hidden',
            border: '1px solid #2A2A2A',
            borderRadius: '1rem',
          }} className="lg:grid-cols-2">
            {/* Left: Visual */}
            <div style={{
              position: 'relative',
              minHeight: '280px',
              backgroundColor: 'rgba(26,26,26,0.55)',
              display: 'flex',
              alignItems: 'center',
              padding: '2.5rem',
            }}>
              {/* Abstract blue grid overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(167,139,250,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(167,139,250,0.15) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }} />
              <div style={{
                position: 'absolute',
                inset: 0
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p className="eyebrow" style={{ marginBottom: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Case Study</p>
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}>
                  25 years of expertise.<br />Zero infrastructure.
                </p>
              </div>
            </div>

            {/* Right: Copy */}
            <FadeItem delay={0.15}>
              <div style={{ padding: '3rem 2.5rem' }}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#8A8480',
                  marginBottom: '1.25rem',
                }}>
                  Laguna Niguel, CA · Massage Therapy
                </p>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  color: '#F5F0EB',
                  lineHeight: 1.3,
                  letterSpacing: '-0.015em',
                  marginBottom: '1.25rem',
                }}>
                  A 25-year massage therapist with zero digital infrastructure. Transformed in two weeks.
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: '#C8C0B8', lineHeight: 1.8, marginBottom: '2rem' }}>
                  As our founding client partner, Santa gave us the chance to prove what AI automation could do for a service business with zero digital infrastructure. The results speak for themselves.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '2.5rem' }}>
                  {[
                    'Website built and launched',
                    'Missed call text-back installed',
                    'Online booking + reminders live',
                    'Review generation automated',
                    'Repeat client follow-up running',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A78BFA', flexShrink: 0 }} />
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#8A8480' }}>{item}</p>
                    </div>
                  ))}
                </div>

                <Link href="/case-study" className="btn-primary">
                  Read the Full Case Study
                  <ArrowRight size={14} />
                </Link>
              </div>
            </FadeItem>
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="section-pad" style={{ backgroundColor: 'rgba(26,26,26,0.55)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle blue grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(167,139,250,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }} />
        {/* Blue glow center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '400px',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <FadeSection>
            <p className="eyebrow" style={{ marginBottom: '1.25rem', color: 'rgba(255,255,255,0.65)' }}>Ready to Stop Losing Revenue?</p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Ready to stop doing it all manually?{' '}
              <span style={{ color: '#A78BFA' }}>Let's talk.</span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.8,
              maxWidth: '520px',
              margin: '0 auto 2.5rem',
            }}>
              It starts with a free 15-minute call. We learn about your business, you learn about us, and we figure out together if automation is the right move. No pitch. No pressure.
            </p>
            <a href="/book" className="btn-primary" style={{ fontSize: '0.9375rem', padding: '1rem 2.5rem' }}>
              Book Free Intro Call
              <ArrowRight size={15} />
            </a>
          </FadeSection>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.4; }
          50% { transform: scaleY(0.6); opacity: 0.15; }
        }
        .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
        .lg\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .md\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
        .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .lg\\:flex-row { flex-direction: row; }
        .lg\\:items-end { align-items: flex-end; }
        .lg\\:justify-between { justify-content: space-between; }
        .lg\\:block { display: block; }
        .md\\:block { display: block; }
        .sm\\:flex-row { flex-direction: row; }
        .sm\\:justify-between { justify-content: space-between; }
        .sm\\:items-center { align-items: center; }
        .hidden { display: none; }
        .md\\:flex { display: flex; }
        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
          .md\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
          .md\\:flex { display: flex; }
          .md\\:block { display: block; }
          .lg\\:border-b-0 { border-bottom: none; }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
          .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
          .lg\\:flex-row { flex-direction: row; }
          .lg\\:items-end { align-items: flex-end; }
          .lg\\:justify-between { justify-content: space-between; }
          .lg\\:block { display: block; }
        }
        @media (min-width: 640px) {
          .sm\\:flex-row { flex-direction: row; }
          .sm\\:justify-between { justify-content: space-between; }
          .sm\\:items-center { align-items: center; }
        }
      `}</style>
    </div>
  );
}
