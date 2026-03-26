/*
 * OPS BY NOELL — Services Page
 * Design: Quiet Editorial Luxury
 * Sections: Hero, 5 Service Deep-Dives, Packages, Closing CTA
 *
 * Color: bg #0A0A0A / alt #FFFFFF / headline #1A1A1A / body #C8C0B8 / CTA #A78BFA
 * Typography: Space Grotesk headlines, Inter body
 */

import { Link } from 'wouter';
import { ArrowRight, Phone, Calendar, Star, MessageSquare, Megaphone, Settings, CheckCircle, Mic } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';

const PLASTER = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663120940829/n7rBKSsjtvarmxAHpVkZmb/texture-light-abstract-apUFTSsXg9VbdHm7Viauvu.webp';

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

const services = [
  {
    icon: Phone,
    number: '01',
    title: 'Missed Call Text-Back',
    tagline: 'Never lose a lead to voicemail again.',
    whatItDoes: 'The moment a call goes unanswered, your system fires an instant, personalized text message to the caller within seconds. The message acknowledges their call, offers to help, and guides them toward booking. No manual action required.',
    whyItMatters: 'Studies show 85% of callers who don\'t reach a business on the first try will not call back. They call your competitor. Missed Call Text-Back eliminates that window entirely, keeping leads warm and in conversation before they disappear.',
    bestFor: 'Solo practitioners, service providers, and any appointment-based business that can\'t answer the phone while with a client.',
    bg: '#0A0A0A',
  },
  {
    icon: Calendar,
    number: '02',
    title: 'AI Booking + Reminder System',
    tagline: 'Fill your calendar without picking up the phone.',
    whatItDoes: 'A fully automated booking system that allows clients to schedule appointments 24/7 from your website, text, or social media. Automated reminders go out via text and email at strategic intervals before each appointment.',
    whyItMatters: 'No-shows cost local service businesses an estimated 10–15% of annual revenue. Automated reminders reduce no-shows by 30–50%. Combined with 24/7 booking, you capture clients who decide to book at 10pm on a Sunday.',
    bestFor: 'Any service business with a calendar: wellness practices, salons, dental offices, home services, and consultants who book appointments.',
    bg: '#0A0A0A',
  },
  {
    icon: Star,
    number: '03',
    title: 'Automated Review Generation',
    tagline: 'Turn every satisfied client into a five-star review.',
    whatItDoes: 'After each appointment, your system automatically sends a review request via text, timed for peak response rates. Clients are guided to your preferred platform (Google, Yelp, etc.) with a frictionless one-tap experience.',
    whyItMatters: '93% of consumers read online reviews before choosing a local service provider. Businesses with consistent review generation outrank competitors and convert more website visitors. Most businesses never ask, and lose the compounding benefit of social proof.',
    bestFor: 'Every service business with an online presence. Reviews are the single highest-ROI reputation asset you can build.',
    bg: '#0A0A0A',
  },
  {
    icon: MessageSquare,
    number: '04',
    title: 'Lead Follow-Up Automation',
    tagline: 'Most businesses follow up once. We follow up until it converts.',
    whatItDoes: 'Follow-up sequences that activate when a lead doesn\'t book, when a client hasn\'t returned, or when a prospect goes cold. Personalized messages go out at the right intervals via text, email, or both.',
    whyItMatters: '80% of sales require 5+ follow-up touches. Most businesses follow up once, if at all. Automated follow-up sequences recover revenue that would otherwise be permanently lost from leads who were interested but got busy.',
    bestFor: 'Service businesses with high-value offerings where prospects need multiple touches before booking: med spas, dental practices, home services, and professional services.',
    bg: '#0A0A0A',
  },
  {
    icon: Megaphone,
    number: '05',
    title: 'Marketing Automation',
    tagline: 'Stay top of mind without lifting a finger.',
    whatItDoes: 'Automated campaigns that re-engage past clients, promote seasonal offers, and keep your brand present between appointments. Includes birthday messages, win-back sequences, referral requests, and consistent outreach to your existing client base.',
    whyItMatters: 'Acquiring a new client costs 5–7x more than retaining an existing one. Your past clients are your most valuable asset, and most businesses never market to them systematically. Marketing automation turns your client list into a recurring revenue engine.',
    bestFor: 'Established service businesses with an existing client base looking to increase rebooking rates, lifetime value, and referrals.',
    bg: '#0A0A0A',
  },
  {
    icon: Mic,
    number: '06',
    title: 'AI Voice Agent',
    tagline: 'Your phone, answered by AI. 24/7. Sounds human.',
    whatItDoes: 'A trained AI voice agent that answers every inbound call, handles FAQs, books appointments, takes messages, and transfers to you when needed. All in a natural, conversational voice. Configured specifically for your business, your services, and your tone.',
    whyItMatters: "The average local service business misses 27% of inbound calls. Each missed call is a potential client who called your competitor next. An AI voice agent eliminates that gap entirely, answering every call instantly, 24 hours a day, 7 days a week, even when you're with a client or asleep. At a fraction of the cost of a human receptionist.",
    bestFor: 'High-volume appointment businesses where a missed call means a missed booking. At a fraction of the cost of a human receptionist.',
    bg: '#0A0A0A',
    highlight: true,
  },
  {
    icon: Settings,
    number: '07',
    title: 'Custom Operations Buildout',
    tagline: 'If it\'s a repeatable process, it can be automated.',
    whatItDoes: 'Your business doesn\'t fit a template. We scope and build exactly what you need: internal process automation, team workflows, client onboarding systems, reporting, integrations, and beyond. Every custom buildout starts with a deep-dive into your current operations to identify every manual step that can be systematized.',
    whyItMatters: 'Most automation agencies stop at lead capture. We go further. The real leverage in a growing business is in the back office: the handoffs, the follow-through, the reporting, the onboarding. When those run automatically, you scale without adding headcount.',
    bestFor: 'Growing businesses with multiple team members, complex scheduling, or unique workflows that standard automation can\'t handle.',
    bg: '#0A0A0A',
    highlight: true,
  },
];

const packages = [
  {
    name: 'Revenue Audit',
    subtitle: 'Paid Discovery (Recommended Starting Point)',
    description: 'A deep-dive into your operation. We map every gap, quantify the monthly revenue impact, and hand you a clear roadmap of exactly what to build and in what order. Most clients find this pays for itself immediately in clarity alone.',
    includes: [
      'Full lead flow & operations review',
      'Revenue impact quantification per gap',
      'Custom automation roadmap',
      'System design recommendations',
      'Priority ranking: biggest wins first',
    ],
    note: 'Credited toward any setup fee. The recommended starting point.',
    price: '$497 one-time' as string | undefined,
    highlight: false,
    customCta: 'Book Intro Call to Get Started' as string | undefined,
  },
  {
    name: 'Activation Sprint',
    subtitle: 'Prove ROI in Two Weeks',
    description: 'We implement ONE high-impact automation system, your biggest opportunity identified in the Revenue Audit. Fixed scope. Fixed price. Fixed timeline.',
    includes: [
      'One core automation system (missed call text-back, review generation, or AI booking)',
      'Full setup and configuration',
      '2-week implementation timeline',
      'One optimization check-in after launch',
    ],
    note: 'Most clients see results within 14 days and upgrade to a monthly retainer.',
    price: '$1,500 flat' as string | undefined,
    highlight: false,
    customCta: 'Book Intro Call to Get Started' as string | undefined,
  },
  {
    name: 'Starter',
    subtitle: 'Lead Capture + Booking Fix',
    description: 'The essential foundation for any appointment-based business. Stop losing leads from missed calls and start filling your calendar automatically.',
    includes: [
      'Missed Call Text-Back',
      'AI Booking + Reminder System',
      'Onboarding & setup included',
      'Ongoing management & maintenance',
    ],
    note: 'One-time $1,500 setup fee (credited if you completed an Activation Sprint).',
    price: '$797/mo' as string | undefined,
    highlight: false,
  },
  {
    name: 'Growth',
    subtitle: 'Full AI Back Office',
    description: 'The full build. Every system connected and working together: follow-up, bookings, reminders, reviews, and reactivation. Built once, running always.',
    includes: [
      'Everything in Starter',
      'Automated Review Generation',
      'Lead Follow-Up Automation',
      'Marketing Automation',
      'Monthly strategy call included',
      'Priority support & optimization',
    ],
    note: 'One-time $2,500 setup fee.',
    price: '$1,197/mo' as string | undefined,
    highlight: true,
    badge: 'Most Popular' as string | undefined,
  },
  {
    name: 'Scale',
    subtitle: 'Full AI Operations System',
    description: 'Everything in Growth plus the full AI operations stack. Built for businesses ready to run on autopilot.',
    includes: [
      'Everything in Growth',
      'AI voice receptionist (24/7 inbound call handling, appointment booking by phone, FAQ handling, call transfers)',
      'Advanced integrations with your existing practice management software',
      'Priority support with same-day response',
      'AI-powered content creation for social media and email',
      'Dedicated monthly optimization and reporting',
    ],
    note: 'One-time $2,500 setup fee.',
    price: '$1,497/mo' as string | undefined,
    highlight: false,
  },
  {
    name: 'Website Add-On',
    subtitle: 'Professional Web Presence',
    description: 'A clean, conversion-focused website designed to work with your automation systems, not just look good.',
    includes: [
      'Custom website design & build',
      'Booking integration included',
      'Mobile-optimized',
      'SEO foundation',
    ],
    note: 'Available as add-on to any package.',
    price: undefined as string | undefined,
    highlight: false,
    customCta: undefined as string | undefined,
  },
  {
    name: 'Custom',
    subtitle: 'Full Operations Buildout',
    description: 'We scope and build a fully custom automation stack around how your business actually operates: internal workflows, integrations, and systems designed specifically for you. Pricing scoped after audit.',
    includes: [
      'Deep-dive operations scoping',
      'Custom workflow & process automation',
      'Team systems & internal integrations',
      'Client onboarding automation',
      'Reporting & data pipelines',
      'Ongoing management & iteration',
    ],
    note: 'Pricing scoped on intro call. No templates.',
    price: undefined as string | undefined,
    highlight: false,
    customCta: 'Book a Scoping Call' as string | undefined,
  },
];

export default function Services() {
  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Nav />

      {/* ─── PAGE HERO ─── */}
      <section style={{
        paddingTop: '110px',
        paddingBottom: '3rem',
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Done-for-You · Built for Your Business</p>
          </FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              color: '#F5F0EB',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: '700px',
              marginBottom: '1.5rem',
            }}>
Missed calls answered. Leads followed up. Appointments booked. Reviews collected.
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.0625rem',
              color: '#C8C0B8',
              lineHeight: 1.75,
              maxWidth: '580px',
              marginBottom: '1.25rem',
            }}>
Every system on this page is built for you, installed by us, and running before you know it. No software to learn. No setup on your end.
            </p>
          </FadeItem>
          <FadeItem delay={0.25}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.0625rem',
              color: '#C8C0B8',
              lineHeight: 1.75,
              maxWidth: '580px',
              marginBottom: '2.5rem',
            }}>
You serve your clients. We automate everything around it.
            </p>
          </FadeItem>
          <FadeItem delay={0.3}>
            <a href="/book" className="btn-primary">
              Book Free Intro Call
              <ArrowRight size={14} />
            </a>
          </FadeItem>
        </div>
      </section>

      {/* ─── SERVICE SECTIONS ─── */}
      {services.map((service, i) => (
        <section
          key={i}
          className="section-pad"
          style={{ backgroundColor: service.bg }}
        >
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '4rem',
              alignItems: 'start',
            }} className="lg:grid-cols-12">
              {/* Left: Number + Icon */}
              <FadeItem delay={0} style={{ gridColumn: 'span 1' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }} className="lg:col-span-2">
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '5rem',
                    fontWeight: 700,
                    color: 'rgba(167,139,250,0.55)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                  }}>
                    {service.number}
                  </span>
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#A78BFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <service.icon size={18} color="#1A1A1A" />
                  </div>
                </div>
              </FadeItem>

              {/* Right: Content */}
              <FadeItem delay={0.1} style={{ gridColumn: 'span 1' }}>
                <div className="lg:col-span-10">
                  <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>{service.tagline}</p>
                  <h2 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(2rem, 3.5vw, 2.875rem)',
                    fontWeight: 700,
                    color: '#F5F0EB',
                    lineHeight: 1.1,
                    marginBottom: '2.5rem',
                  }}>
                    {service.title}
                  </h2>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '2rem',
                  }} className="md:grid-cols-3">
                    {[
                      { label: 'What It Does', content: service.whatItDoes },
                      { label: 'Why It Matters', content: service.whyItMatters },
                      { label: 'Best For', content: service.bestFor },
                    ].map((col, j) => (
                      <div key={j}>
                        <p style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.6875rem',
                          fontWeight: 500,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: '#A78BFA',
                          marginBottom: '0.875rem',
                          paddingBottom: '0.875rem',
                          borderBottom: '1px solid #2A2A2A',
                        }}>
                          {col.label}
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: '#C8C0B8', lineHeight: 1.75 }}>
                          {col.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeItem>
            </div>
          </div>
          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#2A2A2A', marginTop: '5rem', maxWidth: '1320px', margin: '5rem auto 0', padding: '0 3rem' }}>
            <div style={{ height: '1px', backgroundColor: '#2A2A2A' }} />
          </div>
        </section>
      ))}

      {/* ─── PACKAGES ─── */}
      <section className="section-pad" style={{ backgroundColor: 'rgba(26,26,26,0.55)' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p className="eyebrow" style={{ color: '#A78BFA', marginBottom: '1rem' }}>How We Work Together</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                fontWeight: 700,
                color: '#F5F0EB',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}>
                Start with what matters most. Scale from there.
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'rgba(245,237,216,0.65)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto' }}>
                Every package is 100% done-for-you. We build it, connect it to your business, and once it's live, it runs. You don’t touch a setting.
              </p>
            </div>
          </FadeItem>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5px',
            backgroundColor: 'rgba(255,255,255,0.2)',
          }} className="md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, i) => (
              <FadeItem key={i} delay={i * 0.12}>
                <div style={{
                  backgroundColor: pkg.highlight ? '#A78BFA' : 'rgba(245,237,216,0.05)',
                  padding: '2.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}>
                  {(pkg as any).badge && (
                    <div style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: pkg.highlight ? 'rgba(10,10,10,0.55)' : 'rgba(167,139,250,0.15)',
                      padding: '0.25rem 1rem',
                    }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: pkg.highlight ? '#0A0A0A' : '#A78BFA' }}>
                        {(pkg as any).badge}
                      </p>
                    </div>
                  )}

                  {(pkg as any).price && (
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 700, color: '#A78BFA', lineHeight: 1 }}>
                        {(pkg as any).price}
                      </p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(245,237,216,0.5)', letterSpacing: '0.08em', marginTop: '0.25rem' }}>
                        {pkg.name === 'Revenue Audit' ? 'one-time · credited toward setup fee' : pkg.name === 'Activation Sprint' ? 'flat fee · fixed scope' : 'per month · cancel anytime'}
                      </p>
                    </div>
                  )}

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: pkg.highlight ? '#1A1A1A' : '#F5F0EB',
                      lineHeight: 1,
                      marginBottom: '0.375rem',
                    }}>
                      {pkg.name}
                    </h3>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: pkg.highlight ? 'rgba(245,237,216,0.8)' : '#A78BFA',
                    }}>
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', flexGrow: 1 }}>
                    {pkg.includes.map((item, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <CheckCircle size={15} color={pkg.highlight ? 'rgba(245,237,216,0.9)' : '#A78BFA'} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: pkg.highlight ? 'rgba(245,237,216,0.85)' : 'rgba(245,237,216,0.7)', lineHeight: 1.5 }}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: `1px solid ${pkg.highlight ? 'rgba(245,237,216,0.2)' : 'rgba(255,255,255,0.2)'}`, paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: pkg.highlight ? '#8A8480' : 'rgba(255,255,255,0.6)', }}>
                      {pkg.note}
                    </p>
                  </div>

                  <a
                    href="/book"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: pkg.highlight ? '#1A1A1A' : pkg.customCta ? '#A78BFA' : 'transparent',
                      color: pkg.highlight ? '#A78BFA' : '#F5F0EB',
                      border: pkg.highlight ? 'none' : pkg.customCta ? 'none' : '1px solid rgba(255,255,255,0.4)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.875rem 1.5rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {pkg.customCta ?? 'Book Free Intro Call'} <ArrowRight size={12} />
                  </a>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLOSING CTA ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>The First Step Is Free.</p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
              fontWeight: 700,
              color: '#F5F0EB',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              maxWidth: '640px',
              margin: '0 auto 1.25rem',
            }}>
              Not sure where to start? Let's talk for 15 minutes.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#C8C0B8',
              lineHeight: 1.75,
              maxWidth: '500px',
              margin: '0 auto 2.5rem',
            }}>
              A free intro call is the lowest-risk way to find out if automation is right for your business. No pitch. No pressure. Just a real conversation about where you are and what's possible.
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
        .lg\\:grid-cols-12 { display: grid; grid-template-columns: repeat(12, 1fr); }
        .lg\\:col-span-2 { grid-column: span 2; }
        .lg\\:col-span-10 { grid-column: span 10; }
        .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 768px) {
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-12 { grid-template-columns: 120px 1fr; }
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
