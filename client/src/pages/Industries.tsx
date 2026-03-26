/*
 * OPS BY NOELL — Industries We Serve Page
 * Design: Dark theme, quiet editorial luxury
 * Sections: Hero, Industry Cards, Common Gaps, CTA
 */

import { ArrowRight, Scissors, Heart, Smile, Home, Dumbbell, Stethoscope } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';

function FadeItem({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease-out ${delay}s, transform 0.65s ease-out ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const industries = [
  {
    icon: Scissors,
    name: 'Salons & Spas',
    tagline: 'Fill your chair. Keep it full.',
    description: 'Missed calls, last-minute cancellations, and clients who never come back are the three biggest revenue leaks in salon and spa businesses. We automate the entire client lifecycle, from the first call to the fifth visit.',
    gaps: ['Missed calls going to voicemail', 'No-shows with no recovery system', 'No automated re-booking for lapsed clients', 'Zero review generation after appointments'],
    outcome: 'Salons using our systems typically see 30–50% fewer no-shows and a measurable increase in repeat bookings within 60 days.',
  },
  {
    icon: Heart,
    name: 'Wellness & Massage',
    tagline: 'Your practice, running on autopilot.',
    description: 'Solo practitioners and small wellness studios lose clients not because of bad service, but because nothing happens between appointments. No follow-up. No reminders. No review requests. We fix the invisible gaps.',
    gaps: ['Booking by phone only', 'No appointment reminders', 'No follow-up after sessions', 'Reputation built entirely on word of mouth'],
    outcome: 'Our founding client, a 25-year massage therapist in Laguna Niguel, went from zero digital infrastructure to a fully automated practice in two weeks.',
  },
  {
    icon: Smile,
    name: 'Dental & Med Spa',
    tagline: 'Every missed call is a missed patient.',
    description: 'Dental offices and med spas run on high-value appointments. A single missed call can cost $500–$2,000 in lost revenue. We install systems that respond instantly, confirm appointments automatically, and keep your schedule full.',
    gaps: ['High-value appointments lost to voicemail', 'Manual confirmation calls consuming staff time', 'No automated recall for overdue patients', 'Inconsistent review generation'],
    outcome: 'Automated appointment confirmation and recall systems reduce no-shows and recover patients who would otherwise churn silently.',
  },
  {
    icon: Home,
    name: 'Home Services',
    tagline: 'Never miss a job request again.',
    description: 'Plumbers, HVAC technicians, electricians, and contractors lose jobs every day to missed calls and slow response times. The first company to respond wins the job. We make sure that company is yours.',
    gaps: ['Calls missed during active jobs', 'No system to capture and qualify leads after hours', 'No follow-up for estimates that went cold', 'No review requests after completed jobs'],
    outcome: 'Home service businesses using missed call text-back and automated follow-up recover 20–40% of leads that would otherwise go to a competitor.',
  },
  {
    icon: Dumbbell,
    name: 'Fitness & Personal Training',
    tagline: 'Fill your classes. Retain your members.',
    description: "Gyms, studios, and personal trainers face constant churn. Members stop showing up before they cancel, and by then it's too late. We build re-engagement systems that catch at-risk clients before they leave.",
    gaps: ['No automated re-engagement for inactive members', 'Class cancellations with no waitlist management', 'No onboarding sequence for new members', 'No review generation after milestones'],
    outcome: 'Automated re-engagement sequences and milestone-based review requests improve retention and build social proof consistently.',
  },
  {
    icon: Stethoscope,
    name: 'Healthcare & Chiropractic',
    tagline: 'Reduce no-shows. Improve patient retention.',
    description: 'Healthcare practices lose thousands monthly to no-shows and patients who don\'t return for follow-up care. We build HIPAA-aware automation systems that reduce no-shows, automate recall, and keep your schedule optimized.',
    gaps: ['High no-show rates draining revenue', 'Manual recall for overdue patients', 'No automated follow-up after visits', 'Inconsistent online review presence'],
    outcome: 'Automated appointment reminders and recall sequences reduce no-shows by 30–50% and recover patients who would otherwise churn.',
  },
];

export default function Industries() {
  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{
        paddingTop: '110px',
        paddingBottom: '1.5rem',
        backgroundColor: 'transparent',
        position: 'relative',
      }}>
        <div className="container">
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Industries We Serve</p>
          </FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              color: '#F5F0EB',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: '760px',
              marginBottom: '1.5rem',
            }}>
              Built for appointment-based businesses.{' '}
              <span style={{ color: '#A78BFA' }}>Across every vertical.</span>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.0625rem',
              color: '#C8C0B8',
              lineHeight: 1.75,
              maxWidth: '560px',
            }}>
              If your business runs on bookings, phone calls, and repeat clients, we build the AI systems that make sure nothing falls through the cracks. Every industry has the same core gaps. We've built the fixes for all of them.
            </p>
          </FadeItem>
        </div>
      </section>

      {/* ─── INDUSTRY CARDS ─── */}
      <section style={{ paddingTop: '1.5rem', paddingBottom: '5rem', backgroundColor: 'transparent' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5px', backgroundColor: '#2A2A2A' }}>
            {industries.map((industry, i) => (
              <FadeItem key={i} delay={i * 0.08}>
                <div style={{
                  backgroundColor: 'rgba(26,26,26,0.55)',
                  padding: '3rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '2.5rem',
                  alignItems: 'start',
                }}
                className="lg:industry-grid"
                >
                  {/* Left: Icon + Name */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    <div style={{
                      width: '52px',
                      height: '52px',
                      backgroundColor: 'rgba(167,139,250,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <industry.icon size={22} color="#A78BFA" />
                    </div>
                    <div>
                      <h2 style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: '#F5F0EB',
                        marginBottom: '0.375rem',
                      }}>
                        {industry.name}
                      </h2>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.875rem',
                        color: '#A78BFA',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                      }}>
                        {industry.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Description + Gaps */}
                  <div>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9375rem',
                      color: '#C8C0B8',
                      lineHeight: 1.75,
                      marginBottom: '1.5rem',
                    }}>
                      {industry.description}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {industry.gaps.map((gap, j) => (
                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '5px', height: '5px', backgroundColor: '#A78BFA', borderRadius: '50%', flexShrink: 0 }} />
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#8A8480', lineHeight: 1.5 }}>{gap}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Outcome */}
                  <div style={{
                    backgroundColor: 'rgba(167,139,250,0.06)',
                    borderLeft: '2px solid #A78BFA',
                    padding: '1.5rem',
                  }}>
                    <p className="eyebrow" style={{ color: '#A78BFA', marginBottom: '0.75rem' }}>Typical Outcome</p>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9375rem',
                      color: '#F5F0EB',
                      lineHeight: 1.7,
                    }}>
                      {industry.outcome}
                    </p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-pad" style={{ backgroundColor: 'rgba(26,26,26,0.55)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Ready to Get Started?</p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
              fontWeight: 700,
              color: '#F5F0EB',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              maxWidth: '600px',
              margin: '0 auto 1.25rem',
            }}>
              Don't see your industry? Let's talk anyway.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#C8C0B8',
              lineHeight: 1.75,
              maxWidth: '480px',
              margin: '0 auto 2.5rem',
            }}>
              If your business runs on appointments, phone calls, and repeat clients, we can almost certainly help. Book a free 15-minute intro call and we'll tell you honestly what's possible.
            </p>
            <a href="/book" className="btn-primary">
              Book Free Intro Call
              <ArrowRight size={14} />
            </a>
          </FadeItem>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (min-width: 1024px) {
          .lg\\:industry-grid {
            grid-template-columns: 220px 1fr 280px !important;
          }
        }
        @media (max-width: 767px) {
          .section-pad { padding-top: 3rem !important; padding-bottom: 3rem !important; }
        }
      `}</style>
    </div>
  );
}
