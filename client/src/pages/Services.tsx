/*
 * OPS BY NOELL — Services Page (NeuraFlas Design System)
 * Merged: Solutions + Services + Industries
 * Sections: Hero → What We Build (6 builds) → Service Deep-Dives (6) → Who We Serve (6 industries) → Packages → FAQ → CTA
 */

import { useState } from 'react';
import { ArrowRight, Zap, MessageSquare, Phone, Calendar, Star, Megaphone, Settings, ChevronDown, Check, Scissors, Heart, Smile, Home as HomeIcon, Dumbbell, Stethoscope } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';

function FadeItem({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useFadeIn(0.1);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
      <span style={{ display: 'inline-block', padding: '0.3rem 0.875rem', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '100px', fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#C4B5FD', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
        {children}
      </span>
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {children}
    </span>
  );
}

/* ─── DATA ─────────────────────────────────────────────────────── */


const SERVICES = [
  {
    icon: Phone, number: '01', title: 'Missed Call Text-Back', tagline: 'Never lose a lead to voicemail again.',
    whatItDoes: 'The moment a call goes unanswered, your system fires an instant, personalized text message to the caller within seconds. The message acknowledges their call, offers to help, and guides them toward booking. No manual action required.',
    whyItMatters: "Studies show 85% of callers who don't reach a business on the first try will not call back. They call your competitor. Missed Call Text-Back eliminates that window entirely, keeping leads warm and in conversation before they disappear.",
    bestFor: 'Any appointment-based business that receives phone calls: massage therapists, med spas, chiropractors, salons, wellness providers, consultants.',
  },
  {
    icon: Calendar, number: '02', title: 'AI Booking + Reminder System', tagline: 'Fill your calendar without picking up the phone.',
    whatItDoes: 'A fully automated booking system that allows clients to schedule appointments 24/7 from your website, text, or social media. Automated reminders go out via text and email at strategic intervals before each appointment.',
    whyItMatters: 'No-shows cost local service businesses an estimated 10–15% of annual revenue. Automated reminders reduce no-shows by 30–50%. Combined with 24/7 booking, you capture clients who decide to book at 10pm on a Sunday.',
    bestFor: 'Any business with a calendar: spas, clinics, salons, wellness studios, consultants, coaches.',
  },
  {
    icon: Star, number: '03', title: 'Automated Review Generation', tagline: 'Turn every satisfied client into a five-star review.',
    whatItDoes: 'After each appointment, your system automatically sends a review request via text, timed for peak response rates. Clients are guided to your preferred platform (Google, Yelp, etc.) with a frictionless one-tap experience.',
    whyItMatters: '93% of consumers read online reviews before choosing a local service provider. Businesses with consistent review generation outrank competitors and convert more website visitors. Most businesses never ask, and lose the compounding benefit of social proof.',
    bestFor: 'Every local service business. Reviews are the single highest-ROI reputation asset you can build.',
  },
  {
    icon: MessageSquare, number: '04', title: 'Lead Follow-Up Automation', tagline: 'Most businesses follow up once. We follow up until it converts.',
    whatItDoes: "Multi-touch follow-up sequences that activate when a lead doesn't book, when a client hasn't returned, or when a prospect goes cold. Personalized messages go out at the right intervals via text, email, or both.",
    whyItMatters: "80% of sales require 5+ follow-up touches. Most businesses follow up once, if at all. Automated follow-up sequences recover revenue that would otherwise be permanently lost, from leads who were interested but got busy.",
    bestFor: 'Businesses with longer sales cycles, high-value services, or clients who need multiple touchpoints before committing.',
  },
  {
    icon: Megaphone, number: '05', title: 'Marketing Automation', tagline: 'Stay top of mind without lifting a finger.',
    whatItDoes: 'Automated campaigns that re-engage past clients, promote seasonal offers, and keep your brand present between appointments. Includes birthday messages, win-back sequences, referral requests, and consistent outreach to your existing client base.',
    whyItMatters: 'Acquiring a new client costs 5–7x more than retaining an existing one. Your past clients are your most valuable asset, and most businesses never market to them systematically. Marketing automation turns your client list into a recurring revenue engine.',
    bestFor: 'Established businesses with an existing client base looking to increase lifetime value and referrals.',
  },
  {
    icon: Settings, number: '06', title: 'Custom Operations Buildout', tagline: "If it's a repeatable process, it can be automated.",
    whatItDoes: "Your business doesn't fit a template. We scope and build exactly what you need: internal process automation, team workflows, client onboarding systems, reporting, integrations, and beyond. Every custom buildout starts with a deep-dive into your current operations to identify every manual step that can be systematized.",
    whyItMatters: 'Most automation agencies stop at lead capture. We go further. The real leverage in a growing business is in the back office: the handoffs, the follow-through, the reporting, the onboarding. When those run automatically, you scale without adding headcount.',
    bestFor: 'Growing businesses with complex operations, multiple team members, or unique workflows that off-the-shelf tools can\'t handle.',
  },
];

const INDUSTRIES = [
  {
    icon: Scissors, name: 'Salons & Spas', tagline: 'Fill your chair. Keep it full.',
    desc: 'Missed calls, last-minute cancellations, and clients who never come back are the three biggest revenue leaks in salon and spa businesses. We automate the entire client lifecycle — from the first call to the fifth visit.',
    outcome: 'Salons using our systems typically see 30–50% fewer no-shows and a measurable increase in repeat bookings within 60 days.',
  },
  {
    icon: Heart, name: 'Wellness & Massage', tagline: 'Your practice, running on autopilot.',
    desc: 'Solo practitioners and small wellness studios lose clients not because of bad service, but because nothing happens between appointments. No follow-up. No reminders. No review requests. We fix the invisible gaps.',
    outcome: 'Our founding client, a 25-year massage therapist in Laguna Niguel, went from zero digital infrastructure to a fully automated practice in two weeks.',
  },
  {
    icon: Smile, name: 'Dental & Med Spa', tagline: 'Every missed call is a missed patient.',
    desc: 'Dental offices and med spas run on high-value appointments. A single missed call can cost $500–$2,000 in lost revenue. We install systems that respond instantly, confirm appointments automatically, and keep your schedule full.',
    outcome: 'Automated appointment confirmation and recall systems reduce no-shows and recover patients who would otherwise churn silently.',
  },
  {
    icon: HomeIcon, name: 'Home Services', tagline: 'Never miss a job request again.',
    desc: "Plumbers, HVAC technicians, electricians, and contractors lose jobs every day to missed calls and slow response times. The first company to respond wins the job. We make sure that company is yours.",
    outcome: 'Home service businesses using missed call text-back and automated follow-up recover 20–40% of leads that would otherwise go to a competitor.',
  },
  {
    icon: Dumbbell, name: 'Fitness & Personal Training', tagline: 'Fill your classes. Retain your members.',
    desc: "Gyms, studios, and personal trainers face constant churn. Members stop showing up before they cancel, and by then it's too late. We build re-engagement systems that catch at-risk clients before they leave.",
    outcome: 'Automated re-engagement sequences and milestone-based review requests improve retention and build social proof consistently.',
  },
  {
    icon: Stethoscope, name: 'Healthcare & Chiropractic', tagline: 'Reduce no-shows. Improve patient retention.',
    desc: "Healthcare practices lose thousands monthly to no-shows and patients who don't return for follow-up care. We build HIPAA-aware automation systems that reduce no-shows, automate recall, and keep your schedule optimized.",
    outcome: 'Automated appointment reminders and recall sequences reduce no-shows by 30–50% and recover patients who would otherwise churn.',
  },
];

const PACKAGES = [
  {
    name: 'Starter',
    subtitle: 'Lead Capture + Booking Fix',
    price: '$797',
    period: '/mo · + $997 setup',
    desc: 'The essential foundation for any appointment-based business. Stop losing leads from missed calls and start filling your calendar automatically.',
    includes: ['Missed Call Text-Back', 'AI Booking + Reminder System', 'Onboarding & setup included', 'Ongoing management & maintenance'],
    cta: 'Book Intro Call',
    featured: false,
  },
  {
    name: 'Growth',
    subtitle: 'Full AI Back Office',
    price: '$1,497',
    period: '/mo · + $1,497 setup',
    desc: 'The complete operational transformation. Every system working together to capture, convert, retain, and grow, on autopilot.',
    includes: ['Everything in Starter', 'Automated Review Generation', 'Lead Follow-Up Automation', 'Marketing Automation', 'Priority support & optimization'],
    cta: 'Most Popular',
    featured: true,
  },
  {
    name: 'Website Add-On',
    subtitle: 'Professional Web Presence',
    price: 'Add-On',
    period: 'available with any package',
    desc: 'A clean, conversion-focused website designed to work with your automation systems, not just look good.',
    includes: ['Custom website design & build', 'Booking integration included', 'Mobile-optimized', 'SEO foundation'],
    cta: 'Book Intro Call',
    featured: false,
  },
  {
    name: 'Custom',
    subtitle: 'Full Operations Buildout',
    price: 'Scoped',
    period: 'pricing after audit',
    desc: 'For businesses with complex or unique operational needs. We scope, build, and manage a fully custom automation stack: internal workflows, integrations, team systems, and beyond.',
    includes: ['Deep-dive operations scoping', 'Custom workflow & process automation', 'Team systems & internal integrations', 'Client onboarding automation', 'Reporting & data pipelines', 'Ongoing management & iteration'],
    cta: 'Book a Scoping Call',
    featured: false,
  },
];

const FAQS = [
  { q: 'Do I need to sign a long-term contract?', a: "No. All plans are month-to-month. We earn your business every month by delivering results. You can cancel anytime with 30 days notice. No penalties, no lock-in." },
  { q: 'How long does it take to get set up?', a: "Most clients are fully live within 7–14 days of signing. We handle all the technical setup, integrations, and testing. You just need to show up for a 60-minute onboarding call." },
  { q: 'Do I need any technical knowledge?', a: "None at all. We build, manage, and maintain everything. You'll see the results, not the dashboards. If you ever want visibility into performance, we provide clear weekly or monthly reports." },
  { q: 'What if I already use a CRM or booking software?', a: "We integrate with the tools you already use: HubSpot, Calendly, Acuity, Jane App, Mindbody, and more. If you already have a CRM, we'll build around it rather than replace it. We'll scope the integration during your free intro call." },
  { q: 'How does the process start?', a: "It starts with a free 15-minute intro call. We learn about your business, you learn about us, and we figure out if we're a fit. If it makes sense to move forward, we schedule a Revenue Audit to map your exact gaps and design your system." },
  { q: 'Can I upgrade or add more systems later?', a: "Absolutely. Most clients start with one system and add more as they see results. We'll proactively recommend additions when we spot new opportunities in your operation." },
];

/* ─── MAIN ──────────────────────────────────────────────────────── */
export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: '#010509', minHeight: '100vh' }}>
      <Nav />

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '160px', paddingBottom: '100px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(120,58,237,0.22) 0%, rgba(139,92,246,0.14) 35%, #010509 70%)' }} />
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.14) 0%, rgba(167,139,250,0.05) 40%, transparent 70%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '820px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '100px', fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', fontWeight: 500, color: '#C4B5FD' }}>
                Done-For-You · Built For Your Business
              </span>
            </div>
          </FadeItem>
          <FadeItem delay={0.08}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2.75rem, 6vw, 4.5rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
              Missed calls answered.{' '}
              <GradientText>Leads followed up.</GradientText>
            </h1>
          </FadeItem>
          <FadeItem delay={0.16}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.175rem)', color: '#868583', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto 2.5rem' }}>
              Every system on this page is built for you, installed by us, and running before you know it. No software to learn. No setup on your end. You serve your clients — we automate everything around it.
            </p>
          </FadeItem>
          <FadeItem delay={0.24}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/book" className="btn-gradient" style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Book Free Intro Call <ArrowRight size={16} />
              </a>
              <a href="#pricing" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                View Pricing
              </a>
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ═══ SERVICE DEEP-DIVES — 7 services with what/why/who ═══════ */}
      <section style={{ borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)', background: 'rgba(167,139,250,0.015)' }}>
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <SectionBadge>The Full Service Stack</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Six systems. <GradientText>One integrated operation.</GradientText>
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#868583', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Each service is done-for-you from day one — designed, built, and managed by us. You don't touch a single setting.
            </p>
          </div>

          {SERVICES.map(({ icon: Icon, number, title, tagline, whatItDoes, whyItMatters, bestFor }, i) => (
            <FadeItem key={number} delay={0}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                gap: '3rem',
                padding: '3rem 0',
                borderBottom: '1px solid rgba(167,139,250,0.08)',
                alignItems: 'start',
              }}>
                {/* Number + icon */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                  <span className="step-number" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}>{number}</span>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} style={{ color: '#A78BFA' }} />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A78BFA', marginBottom: '0.5rem' }}>{tagline}</p>
                  <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, marginBottom: '2rem', letterSpacing: '-0.02em' }}>{title}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                    {[
                      { label: 'What It Does', content: whatItDoes },
                      { label: 'Why It Matters', content: whyItMatters },
                      { label: 'Best For', content: bestFor },
                    ].map(({ label, content }) => (
                      <div key={label}>
                        <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A78BFA', marginBottom: '0.875rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(167,139,250,0.12)' }}>{label}</p>
                        <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.75 }}>{content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeItem>
          ))}
        </div>
      </section>

      {/* ═══ WHO WE SERVE — 6 industries ═══════════════════════════ */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionBadge>Who We Serve</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Built for <GradientText>appointment-based businesses.</GradientText>
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#868583', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
              If your business runs on bookings and phone calls, we build the AI systems that make sure nothing falls through the cracks.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {INDUSTRIES.map(({ icon: Icon, name, tagline, desc, outcome }, i) => (
              <FadeItem key={name} delay={i * 0.07}>
                <div className="feature-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="icon-box"><Icon size={20} style={{ color: '#A78BFA' }} /></div>
                  <div>
                    <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>{name}</h3>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#A78BFA' }}>{tagline}</p>
                  </div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9rem', color: '#868583', lineHeight: 1.7, flex: 1 }}>{desc}</p>
                  <div style={{ borderTop: '1px solid rgba(167,139,250,0.12)', paddingTop: '1rem' }}>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#C4B5FD', lineHeight: 1.65, fontStyle: 'italic' }}>{outcome}</p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PACKAGES / PRICING ═════════════════════════════════════ */}
      <section id="pricing" style={{ padding: '6rem 0', background: 'rgba(167,139,250,0.015)', borderTop: '1px solid rgba(167,139,250,0.08)', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionBadge>How We Work Together</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Start with what matters most. <GradientText>Scale from there.</GradientText>
            </h2>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#868583', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Every package is 100% done-for-you. We build it, connect it to your business, and once it's live, it runs. You don't touch a setting.
            </p>
          </div>

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
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: '#A78BFA', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem' }}>{subtitle}</p>
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

      {/* ═══ FAQ ════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionBadge>FAQ</SectionBadge>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Common questions, <GradientText>honest answers.</GradientText>
            </h2>
          </div>

          {FAQS.map(({ q, a }, i) => (
            <div key={i} className="faq-item">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}>
                <span style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', fontWeight: 600, color: openFaq === i ? '#ffffff' : '#e2e8f0', lineHeight: 1.4 }}>{q}</span>
                <ChevronDown size={18} style={{ color: '#A78BFA', flexShrink: 0, transition: 'transform 0.25s ease', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {openFaq === i && (
                <div style={{ paddingBottom: '1.5rem' }}>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583', lineHeight: 1.75 }}>{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════════════ */}
      <section style={{ padding: '7rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(167,139,250,0.08)' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.12) 0%, transparent 65%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '660px', margin: '0 auto' }}>
          <SectionBadge>The First Step Is Free</SectionBadge>
          <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            Not sure where to start?<br /><GradientText>Let's talk for 15 minutes.</GradientText>
          </h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.0625rem', color: '#868583', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            A free intro call is the lowest-risk way to find out if automation is right for your business. No pitch. No pressure. Just a real conversation.
          </p>
          <a href="/book" className="btn-gradient" style={{ padding: '1.125rem 2.25rem', fontSize: '1.0625rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Book Free Intro Call <ArrowRight size={17} />
          </a>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#868583', marginTop: '1.25rem' }}>No commitment. No credit card. Just a conversation.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
