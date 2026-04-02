/*
 * OPS BY NOELL — Nova Support Landing Page
 * Single-offer, conversion-focused. No nav distractions.
 * Design: matches site system — #010509 bg, #A78BFA violet, Sora/Nicholas fonts
 */

import { useState } from 'react';
import { ArrowRight, Bot, Clock, Bell, UserCheck, Database, Zap, Star, ChevronDown } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/* ─── TYPES ────────────────────────────────────────────────────── */
interface FaqItem {
  q: string;
  a: string;
}

/* ─── DATA ─────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Bot,
    title: 'AI agent trained on your business',
    desc: 'Services, pricing, hours, and FAQs — Nova knows your business and answers like your best team member.',
  },
  {
    icon: Clock,
    title: 'Visitors qualify themselves in real time',
    desc: '24 hours a day, 7 days a week. Nova never sleeps, never misses a visitor, never drops a lead.',
  },
  {
    icon: Bell,
    title: 'Instant alert the moment a hot lead appears',
    desc: "Name, business type, pain point, and contact info — delivered to you before the visitor even leaves the page.",
  },
  {
    icon: UserCheck,
    title: 'Jump into any conversation live at any time',
    desc: 'Human takeover is built in. One tap and you are in the chat, in real time, from your phone.',
  },
  {
    icon: Database,
    title: 'Every lead automatically added to your follow-up pipeline',
    desc: 'No manual data entry. Every conversation ends with a contact record ready for follow-up.',
  },
  {
    icon: Zap,
    title: 'Installed on your website in 48 hours',
    desc: 'No software to manage, no logins to remember. One line of code and Nova is live.',
  },
];

const FAQS: FaqItem[] = [
  {
    q: 'Does this work on my existing website?',
    a: 'Yes. Nova installs with one line of code on any website platform — WordPress, Squarespace, Wix, Webflow, Shopify, or custom built. Your web person can do it in 5 minutes.',
  },
  {
    q: 'What happens when someone chats with Nova?',
    a: 'Nova starts a conversation, asks about their business and what they need, captures their name and contact info, and sends you an instant alert. You can jump in and take over the conversation live at any time.',
  },
  {
    q: 'Do I need GoHighLevel or any other software?',
    a: 'No. Nova works as a standalone system. Every lead is automatically added to a follow-up pipeline but you do not need to log into anything to get value from day one.',
  },
  {
    q: 'How long does setup take?',
    a: 'We train Nova on your business, install her on your site, and confirm everything is working before we hand it over. 48 hours from when you sign up.',
  },
  {
    q: 'What if I want to cancel?',
    a: 'Cancel anytime. No contracts, no penalties.',
  },
];

/* ─── SHARED COMPONENTS ─────────────────────────────────────────── */
function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      background: 'linear-gradient(90deg, #A78BFA 0%, #C4B5FD 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {children}
    </span>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
      <span style={{
        display: 'inline-block',
        padding: '0.3rem 0.875rem',
        background: 'rgba(167,139,250,0.1)',
        border: '1px solid rgba(167,139,250,0.25)',
        borderRadius: '100px',
        fontFamily: "'Sora', sans-serif",
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#C4B5FD',
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
      }}>
        {children}
      </span>
    </div>
  );
}

function CtaButton({ href, children, large }: { href: string; children: React.ReactNode; large?: boolean }) {
  const pad = large ? '1.125rem 2.5rem' : '1rem 2rem';
  const fz = large ? '1.0625rem' : '1rem';
  return (
    <a
      href={href}
      className="btn-gradient"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: pad,
        fontSize: fz,
        fontWeight: 700,
        textDecoration: 'none',
      }}
    >
      {children}
      <ArrowRight size={large ? 17 : 16} />
    </a>
  );
}

/* ─── FAQ ACCORDION ─────────────────────────────────────────────── */
function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            borderBottom: '1px solid rgba(167,139,250,0.12)',
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.375rem 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              gap: '1rem',
            }}
          >
            <span style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.5,
            }}>
              {item.q}
            </span>
            <ChevronDown
              size={18}
              style={{
                color: '#A78BFA',
                flexShrink: 0,
                transition: 'transform 0.2s ease',
                transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
          {open === i && (
            <div style={{
              paddingBottom: '1.375rem',
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.9375rem',
              color: '#b8b6b3',
              lineHeight: 1.75,
            }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────── */
export default function Nova() {
  return (
    <>
      <Nav />
      <div style={{ backgroundColor: '#010509', minHeight: '100vh', overflowX: 'hidden' }}>

        {/* ═══ HERO ═══════════════════════════════════════════════════ */}
        <section style={{
          position: 'relative',
          paddingTop: '160px',
          paddingBottom: '120px',
          textAlign: 'center',
          overflow: 'hidden',
        }}>
          {/* Purple gradient backdrop */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(120,58,237,0.28) 0%, rgba(139,92,246,0.18) 35%, #010509 72%)',
          }} />
          {/* Orb */}
          <div style={{
            position: 'absolute', top: '5%', left: '50%',
            transform: 'translateX(-50%)',
            width: '700px', height: '700px', pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.16) 0%, rgba(167,139,250,0.06) 40%, transparent 70%)',
          }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem' }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.375rem 1rem',
                background: 'rgba(167,139,250,0.12)',
                border: '1px solid rgba(167,139,250,0.3)',
                borderRadius: '100px',
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.8125rem', fontWeight: 500, color: '#C4B5FD', letterSpacing: '0.02em',
              }}>
                <Zap size={13} style={{ color: '#A78BFA' }} />
                AI Chat Agent for Service Businesses
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
            }}>
              Your website should be closing leads{' '}
              <GradientText>while you sleep.</GradientText>
            </h1>

            {/* Sub */}
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(1rem, 2vw, 1.175rem)',
              color: '#b8b6b3',
              lineHeight: 1.75,
              maxWidth: '660px',
              margin: '0 auto 2.5rem',
            }}>
              Nova is an AI chat agent for your website. She qualifies visitors, captures their contact info, and sends you an instant alert the moment a hot lead shows up. Done for you. Live on your site in 48 hours.
            </p>

            {/* CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.875rem' }}>
              <CtaButton href="/book" large>Get Nova on Your Site — $497 Setup — Founding Client Rate</CtaButton>
              <p style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.875rem',
                color: '#b8b6b3',
              }}>
                Then $297/month. No contracts. Cancel anytime.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ THE PROBLEM ════════════════════════════════════════════ */}
        <section style={{
          padding: '7rem 0',
          borderTop: '1px solid rgba(167,139,250,0.08)',
          borderBottom: '1px solid rgba(167,139,250,0.08)',
          background: 'rgba(167,139,250,0.015)',
        }}>
          <div className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
            <SectionBadge>The Problem</SectionBadge>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '1.75rem',
            }}>
              Right now, visitors are leaving your site{' '}
              <GradientText>without ever reaching out.</GradientText>
            </h2>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '1.0625rem',
              color: '#b8b6b3',
              lineHeight: 1.8,
            }}>
              Most people who land on a service business website look around and leave. They never fill out a form. They never call. They just disappear. Nova fixes that. The moment someone lands on your site, Nova starts a conversation — asks the right questions, captures their name and contact info, and sends you an instant alert when someone is ready to book.
            </p>
          </div>
        </section>

        {/* ═══ WHAT THEY GET ══════════════════════════════════════════ */}
        <section style={{ padding: '7rem 0', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
          <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <SectionBadge>What You Get</SectionBadge>
              <h2 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}>
                Everything built in. <GradientText>Nothing to manage.</GradientText>
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    padding: '2rem',
                    background: 'rgba(167,139,250,0.04)',
                    border: '1px solid rgba(167,139,250,0.12)',
                    borderRadius: '12px',
                  }}
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(167,139,250,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.125rem',
                  }}>
                    <Icon size={19} style={{ color: '#A78BFA' }} />
                  </div>
                  <h3 style={{
                    fontFamily: "'Nicholas', serif",
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.3,
                    marginBottom: '0.625rem',
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '0.9rem',
                    color: '#b8b6b3',
                    lineHeight: 1.7,
                  }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ LIVE DEMO ══════════════════════════════════════════════ */}
        <section style={{
          padding: '7rem 0',
          borderBottom: '1px solid rgba(167,139,250,0.08)',
          background: 'rgba(167,139,250,0.015)',
          textAlign: 'center',
        }}>
          <div className="container" style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem' }}>
            <SectionBadge>Live Demo</SectionBadge>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
            }}>
              Want to see it <GradientText>before you buy?</GradientText>
            </h2>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '1.0625rem',
              color: '#b8b6b3',
              lineHeight: 1.8,
            }}>
              Nova is live on this site right now. Talk to her. She is the same agent we would install on your website.
            </p>
          </div>
        </section>

        {/* ═══ SOCIAL PROOF ═══════════════════════════════════════════ */}
        <section style={{ padding: '7rem 0', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
          <div className="container" style={{ maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>Client Results</SectionBadge>
              <h2 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}>
                What happens when you stop <GradientText>letting leads walk away.</GradientText>
              </h2>
            </div>

            <div
              style={{
                padding: '2.5rem',
                background: 'rgba(167,139,250,0.04)',
                border: '1px solid rgba(167,139,250,0.18)',
                borderRadius: '16px',
              }}
            >
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} style={{ color: '#A78BFA', fill: '#A78BFA' }} />
                ))}
              </div>
              <p style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                color: '#d4d0cc',
                lineHeight: 1.8,
                fontStyle: 'italic',
                marginBottom: '1.75rem',
              }}>
                "I used to dread Mondays because there would always be gaps I did not expect. Now I open my calendar and it is just full. The reminders go out and people show up. I do not think about it anymore."
              </p>
              <div>
                <div style={{
                  fontFamily: "'Nicholas', serif",
                  fontWeight: 700,
                  color: '#ffffff',
                  fontSize: '1rem',
                  marginBottom: '0.2rem',
                }}>
                  Santa
                </div>
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '0.875rem',
                  color: '#b8b6b3',
                }}>
                  Licensed Massage Therapist, Laguna Niguel, CA
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PRICING ════════════════════════════════════════════════ */}
        <section style={{
          padding: '7rem 0',
          borderBottom: '1px solid rgba(167,139,250,0.08)',
          background: 'rgba(167,139,250,0.015)',
          textAlign: 'center',
        }}>
          <div className="container" style={{ maxWidth: '520px', margin: '0 auto', padding: '0 1.5rem' }}>
            <SectionBadge>Pricing</SectionBadge>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '3rem',
            }}>
              Founding Client Pricing <GradientText>— Limited to 5 Businesses</GradientText>
            </h2>

            {/* Pricing Card */}
            <div style={{
              background: 'rgba(167,139,250,0.06)',
              border: '1px solid rgba(167,139,250,0.3)',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'left',
            }}>
              {/* Card Header */}
              <div style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid rgba(167,139,250,0.12)' }}>
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#A78BFA',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  marginBottom: '0.75rem',
                }}>
                  Nova Starter
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.375rem' }}>
                  <span style={{ fontFamily: "'Nicholas', serif", fontSize: '2.75rem', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>$497</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9rem', color: '#b8b6b3' }}>one-time setup</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.8125rem', color: '#A78BFA', marginLeft: '0.25rem', opacity: 0.7 }}>save $500</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                  <span style={{ fontFamily: "'Nicholas', serif", fontSize: '1.625rem', fontWeight: 700, color: '#C4B5FD', lineHeight: 1 }}>$297</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.875rem', color: '#b8b6b3' }}>/ month</span>
                </div>
              </div>

              {/* Feature List */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {[
                  'AI chat agent trained on your business',
                  'Human takeover — jump in live anytime',
                  'Instant alerts when hot leads appear',
                  'Every lead synced to your follow-up pipeline',
                  'Installed in 48 hours',
                ].map((feature) => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{
                      marginTop: '2px',
                      flexShrink: 0,
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(167,139,250,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#d4d0cc', lineHeight: 1.5 }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <CtaButton href="/book">Get Started</CtaButton>
            </div>

            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.8125rem',
              color: '#b8b6b3',
              marginTop: '1.25rem',
            }}>
              This rate is available to the first 5 businesses who sign up. Regular price is $997 setup.
            </p>
          </div>
        </section>

        {/* ═══ FAQ ════════════════════════════════════════════════════ */}
        <section style={{ padding: '7rem 0', borderBottom: '1px solid rgba(167,139,250,0.08)' }}>
          <div className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <SectionBadge>FAQ</SectionBadge>
              <h2 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}>
                Common questions, <GradientText>answered.</GradientText>
              </h2>
            </div>
            <FaqAccordion items={FAQS} />
          </div>
        </section>

        {/* ═══ FINAL CTA ══════════════════════════════════════════════ */}
        <section style={{ padding: '8rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.14) 0%, transparent 65%)',
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem' }}>
            <SectionBadge>Get Started</SectionBadge>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: '2rem',
            }}>
              Stop letting leads leave{' '}
              <GradientText>without a conversation.</GradientText>
            </h2>
            <CtaButton href="/book" large>Get Nova on Your Site — $497 Setup — Founding Client Rate</CtaButton>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.875rem',
              color: '#b8b6b3',
              marginTop: '1rem',
            }}>
              Then $297/month. No contracts. Cancel anytime.
            </p>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}

