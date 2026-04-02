/*
 * OPS BY NOELL — Nova Support Landing Page v9 (Light + Purple Accent)
 * Spec: Purple #7C5CFC as primary accent throughout
 * Hero bg: very light purple tint #F7F4FF
 * Everything else: universal light theme
 */

import { useState } from 'react';
import { ArrowRight, Bot, Clock, Bell, UserCheck, Database, Zap, ChevronDown, Check } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

interface FaqItem { q: string; a: string; }

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

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '1.375rem 0',
              background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem',
            }}
          >
            <span style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 600, color: '#1A1A1A' }}>
              {item.q}
            </span>
            <ChevronDown
              size={18}
              color="#7C5CFC"
              style={{ flexShrink: 0, transition: 'transform 0.2s ease', transform: open === i ? 'rotate(180deg)' : 'rotate(0)' }}
            />
          </button>
          {open === i && (
            <div style={{ paddingBottom: '1.375rem' }}>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#555555', lineHeight: 1.7 }}>
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Nova() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* ─── HERO — very light purple tint ─── */}
      <section style={{
        background: '#F7F4FF',
        paddingTop: '120px',
        paddingBottom: '5rem',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{
            fontFamily: "'Nicholas', serif",
            fontSize: '0.6875rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: '#7C5CFC',
            display: 'block',
            marginBottom: '1.25rem',
          }}>
            Nova Support
          </span>

          <h1 style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)',
            fontWeight: 800,
            color: '#1A1A1A',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: '1.5rem',
          }}>
            Your AI front desk answers every message. Even at midnight.
          </h1>

          <p style={{
            fontFamily: "'Nicholas', serif",
            fontSize: '1.125rem',
            color: '#555555',
            lineHeight: 1.6,
            maxWidth: '580px',
            margin: '0 auto 2.5rem',
          }}>
            Nova is a live AI chat system that responds to visitors on your website 24/7, qualifies them as leads, books appointments, and alerts you the moment someone is ready to buy.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/book"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#7C5CFC', color: '#FFFFFF',
                fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 600,
                padding: '0 2rem', height: '52px', borderRadius: '8px',
                textDecoration: 'none', transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#6A4DE8'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#7C5CFC'; }}
            >
              Get Nova on my site <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'transparent', color: '#7C5CFC',
                fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 600,
                padding: '0 2rem', height: '52px', borderRadius: '8px',
                border: '1.5px solid #7C5CFC', textDecoration: 'none',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(124,92,252,0.06)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section style={{ background: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase' as const,
              color: '#7C5CFC', display: 'block', marginBottom: '1rem',
            }}>
              What Nova Does
            </span>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2,
            }}>
              Everything a front desk should do. Automatically.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }} className="features-grid">
            {FEATURES.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  style={{
                    background: '#FFFFFF', border: '1px solid #E8E8E8',
                    borderRadius: '12px', padding: '2rem',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
                  }}
                  className="card-hover"
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '10px',
                    background: 'rgba(124,92,252,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
                  }}>
                    <Icon size={22} color="#7C5CFC" />
                  </div>
                  <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 600, color: '#1A1A1A', marginBottom: '0.625rem' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#555555', lineHeight: 1.6 }}>
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" style={{ background: '#F7F4FF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            color: '#7C5CFC', display: 'block', marginBottom: '1rem',
          }}>
            How It Works
          </span>
          <h2 style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '3rem',
          }}>
            Live in 48 hours. Running for years.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            {[
              { step: '01', title: 'We train Nova on your business', desc: 'You fill out a simple form. We train Nova on your services, pricing, hours, and tone. She answers like a knowledgeable employee, not a chatbot.' },
              { step: '02', title: 'One line of code goes on your site', desc: 'We send you a snippet. Your web person pastes it in. Done. Nova appears as a live chat widget on every page.' },
              { step: '03', title: 'Nova runs your front desk', desc: 'Every visitor gets responded to. Leads are qualified. Appointments are booked. You get instant alerts when something needs your attention.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{
                  fontFamily: "'Nicholas', serif", fontSize: '1.5rem', fontWeight: 800,
                  color: '#7C5CFC', flexShrink: 0, minWidth: '2.5rem',
                }}>
                  {step}
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', fontWeight: 600, color: '#1A1A1A', marginBottom: '0.5rem' }}>
                    {title}
                  </h3>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#555555', lineHeight: 1.6 }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section style={{ background: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            color: '#7C5CFC', display: 'block', marginBottom: '1rem',
          }}>
            Pricing
          </span>
          <h2 style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '3rem',
          }}>
            Standalone or bundled.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="pricing-grid">
            {/* Standalone */}
            <div style={{
              background: '#FFFFFF', border: '1px solid #E8E8E8',
              borderRadius: '16px', padding: '2.5rem', textAlign: 'left',
            }}>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.8125rem', fontWeight: 600, color: '#7C5CFC', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '0.75rem' }}>
                Nova Standalone
              </p>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: "'Nicholas', serif", fontSize: '2.5rem', fontWeight: 800, color: '#1A1A1A' }}>$497</span>
                <span style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#555555' }}> setup + $197/mo</span>
              </div>
              {['Nova AI chat on your site', 'Lead qualification + booking', 'Instant Telegram alerts', 'Human takeover anytime', 'Monthly performance report'].map(f => (
                <div key={f} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                  <Check size={16} color="#7C5CFC" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#555555' }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Bundled */}
            <div style={{
              background: '#7C5CFC', border: '1px solid #7C5CFC',
              borderRadius: '16px', padding: '2.5rem', textAlign: 'left',
            }}>
              <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '0.75rem' }}>
                Full System (includes Nova)
              </p>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: "'Nicholas', serif", fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF' }}>$797</span>
                <span style={{ fontFamily: "'Nicholas', serif", fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>/mo + $997 setup</span>
              </div>
              {['Everything in Nova Standalone', 'Missed call text-back', 'Appointment confirmations', 'Review generation', 'Lead pipeline + reactivation'].map(f => (
                <div key={f} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                  <Check size={16} color="#FFFFFF" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: 'rgba(255,255,255,0.9)' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ background: '#FAFAF8', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase' as const,
              color: '#7C5CFC', display: 'block', marginBottom: '1rem',
            }}>
              Questions
            </span>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2,
            }}>
              Common questions about Nova.
            </h2>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ background: '#FAFAF8', padding: '6rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2, marginBottom: '1rem',
          }}>
            Every visitor deserves a response. Nova makes that happen.
          </h2>
          <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', color: '#AAAAAA', lineHeight: 1.6, marginBottom: '2rem' }}>
            Set up in 48 hours. No software to learn. Cancel anytime.
          </p>
          <a
            href="/book"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#7C5CFC', color: '#FFFFFF',
              fontFamily: "'Nicholas', serif", fontSize: '1rem', fontWeight: 600,
              padding: '0 2.5rem', height: '56px', borderRadius: '8px',
              textDecoration: 'none', transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#6A4DE8'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#7C5CFC'; }}
          >
            Get Nova on my site <ArrowRight size={16} />
          </a>
          <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', color: '#777777', marginTop: '1rem' }}>
            Starts with a free 30-minute audit call.
          </p>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
