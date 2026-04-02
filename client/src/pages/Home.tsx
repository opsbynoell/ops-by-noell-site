/*
 * OPS BY NOELL — Home Page v9 (Light Theme)
 * Spec: 10 sections per design doc, April 2, 2026
 * Section 0: Nav (component)
 * Section 1: Hero — two-column split, animated Nova chat mockup
 * Section 2: Social Proof Bar — 3 stats
 * Section 3: Problem/Pain
 * Section 4: Product Grid — 6 cards
 * Section 5: Nova Spotlight
 * Section 6: Video placeholder
 * Section 7: Case Study — Santa
 * Section 8: How It Works — 3 steps
 * Section 9: Dark CTA footer section
 * Section 10: Footer (component)
 */

import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calendar, Star, Filter, RefreshCw, ArrowRight, Check } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

/* ─── ANIMATED NOVA CHAT MOCKUP (Asset Placeholder 1) ─────────────
   CSS-only animation. chatSlideIn keyframes defined in index.css.
   Conversation loops with 2s pause after completion.
   Phone frame #1A1A1A, client bubbles gray/right, Nova teal/left.
   ─────────────────────────────────────────────────────────────────── */
function NovaChatMockup() {
  const messages = [
    { from: 'client', text: 'Hi, do you have anything open this week?', delay: '0.3s' },
    { from: 'nova', text: 'Hi! Yes — we have Tuesday at 2 PM and Thursday at 10 AM. Which works better for you?', delay: '0.6s' },
    { from: 'client', text: 'Thursday!', delay: '0.9s' },
    { from: 'nova', text: "Perfect — I'll hold Thursday at 10 AM. Can I get your name to confirm the booking?", delay: '1.2s' },
    { from: 'client', text: 'Sarah', delay: '1.5s' },
    { from: 'nova', text: 'Done, Sarah! You\'re booked for Thursday at 10 AM. See you then! ✓', delay: '1.8s' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      {/* Phone frame */}
      <div style={{
        background: '#1A1A1A',
        borderRadius: '24px',
        padding: '0',
        width: '100%',
        maxWidth: '320px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}>
        {/* Chat header */}
        <div style={{
          background: '#0CA2A2',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <MessageSquare size={18} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
              Serenity Massage
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ADE80' }} />
              <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', color: 'rgba(255,255,255,0.85)' }}>Nova is online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          background: '#F9F9F9',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.625rem',
          minHeight: '280px',
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.from === 'client' ? 'flex-end' : 'flex-start',
                animation: `chatSlideIn 0.4s ease both`,
                animationDelay: msg.delay,
                opacity: 0,
                animationFillMode: 'both',
              }}
            >
              <div style={{
                maxWidth: '75%',
                padding: '0.5rem 0.875rem',
                borderRadius: msg.from === 'client'
                  ? '16px 16px 4px 16px'
                  : '16px 16px 16px 4px',
                background: msg.from === 'client' ? '#E8E8E8' : '#0CA2A2',
                color: msg.from === 'client' ? '#1A1A1A' : '#FFFFFF',
                fontFamily: "'Nicholas', serif",
                fontSize: '0.8125rem',
                lineHeight: 1.5,
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating booking confirmation card */}
      <div
        className="float-up"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E5E5E5',
          borderRadius: '12px',
          padding: '0.875rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          maxWidth: '280px',
          width: '100%',
        }}
      >
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'rgba(12,162,162,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Calendar size={18} color="#0CA2A2" />
        </div>
        <div>
          <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.8125rem', fontWeight: 600, color: '#1A1A1A' }}>
            New appointment booked
          </div>
          <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.75rem', color: '#555555' }}>
            Thursday 10:00 AM
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT CARDS DATA ─────────────────────────────────────────── */
const products = [
  {
    icon: Phone,
    iconBg: '#0CA2A2',
    title: 'Missed Call Recovery',
    description: 'Every missed call gets an instant text-back. Your lead stays warm until you can follow up — or Nova books them automatically.',
    link: null,
  },
  {
    icon: MessageSquare,
    iconBg: '#7C5CFC',
    title: 'Nova AI Chat',
    description: '24/7 AI chat that qualifies leads, answers questions, and books appointments in real time — even at midnight.',
    link: { text: 'Also available standalone →', href: '/nova' },
  },
  {
    icon: Calendar,
    iconBg: '#E8604C',
    title: 'Appointment Confirmation',
    description: 'Automated reminders at 48 hours and 2 hours before every appointment. No-shows drop. Your schedule holds.',
    link: null,
  },
  {
    icon: Star,
    iconBg: '#F5A623',
    title: 'Review Generation',
    description: 'After every completed appointment, the perfect follow-up goes out. Santa got 40+ reviews in 8 weeks. Automatically.',
    link: null,
  },
  {
    icon: Filter,
    iconBg: '#3B82F6',
    title: 'Lead Pipeline',
    description: 'Every lead — call, DM, web form — captured in one dashboard. Nothing falls through. Everything gets followed up.',
    link: null,
  },
  {
    icon: RefreshCw,
    iconBg: '#10B981',
    title: 'Reactivation Campaigns',
    description: "Automatically reach out to clients who haven't booked in 60+ days. Bring back the revenue that quietly walked away.",
    link: null,
  },
];

/* ─── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Nav />

      {/* ═══ SECTION 1: HERO ════════════════════════════════════════ */}
      <section style={{
        background: '#FFFFFF',
        paddingTop: '120px',
        paddingBottom: '5rem',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div className="container">
          <div className="hero-split">
            {/* Left column — copy */}
            <div className="hero-text">
              {/* Section label */}
              <span className="section-label" style={{ marginBottom: '1.25rem', animationFillMode: 'both', animation: 'fadeIn 0.5s ease both 0s' }}>
                Practice Growth System
              </span>

              {/* H1 */}
              <h1 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(1.75rem, 4.5vw, 4rem)',
                fontWeight: 800,
                color: '#1A1A1A',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: '1.5rem',
                animation: 'fadeIn 0.5s ease both 0.2s',
                animationFillMode: 'both',
              }}>
                By the time you call back, they've already booked somewhere else.
              </h1>

              {/* Body copy */}
              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1.125rem',
                color: '#555555',
                lineHeight: 1.6,
                maxWidth: '480px',
                marginBottom: '2rem',
                animation: 'fadeIn 0.5s ease both 0.4s',
                animationFillMode: 'both',
              }}>
                You're with a client. Your phone rings. Nobody picks up. That lead? Gone.
              </p>
              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1.125rem',
                color: '#555555',
                lineHeight: 1.6,
                maxWidth: '480px',
                marginBottom: '2.5rem',
                animation: 'fadeIn 0.5s ease both 0.4s',
                animationFillMode: 'both',
              }}>
                Ops by Noell runs your scheduling, follow-ups, and client communication automatically — so your practice is always responding, even when you're not.
              </p>

              {/* CTAs */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'flex-start',
                animation: 'fadeIn 0.5s ease both 0.6s',
                animationFillMode: 'both',
              }}>
                <a
                  href="/book"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#0CA2A2',
                    color: '#FFFFFF',
                    fontFamily: "'Nicholas', serif",
                    fontSize: '1rem',
                    fontWeight: 600,
                    padding: '0 1.75rem',
                    height: '48px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#0A8F8F'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#0CA2A2'; }}
                >
                  Get Your Free Audit
                </a>
                <a
                  href="/nova"
                  style={{
                    fontFamily: "'Nicholas', serif",
                    fontSize: '0.9375rem',
                    fontWeight: 400,
                    color: '#0CA2A2',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  Watch how Nova works →
                </a>
              </div>
            </div>

            {/* Right column — Nova Chat Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <NovaChatMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: SOCIAL PROOF BAR ════════════════════════════ */}
      <section style={{
        background: '#FAFAF8',
        padding: '5rem 0',
        animation: 'fadeInUp 0.6s ease both 0.2s',
        animationFillMode: 'both',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0',
          }}>
            {[
              { value: '$960', label: 'Revenue recovered in 14 days' },
              { value: '40+', label: 'Google reviews in 8 weeks' },
              { value: '< 1', label: 'No-shows per week (was 4)' },
            ].map(({ value, label }, i) => (
              <div
                key={label}
                className="proof-item"
                style={{
                  textAlign: 'center',
                  padding: '0 3rem',
                  borderRight: i < 2 ? '1px solid #E5E5E5' : 'none',
                }}
              >
                <div style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 700,
                  color: '#0CA2A2',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: '0.9375rem',
                  color: '#555555',
                  fontWeight: 400,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Attribution */}
          <p style={{
            fontFamily: "'Nicholas', serif",
            fontSize: '0.9375rem',
            fontStyle: 'italic',
            color: '#555555',
            textAlign: 'center',
            marginTop: '2rem',
          }}>
            From one practice. 14 days. One system change.
          </p>
        </div>
      </section>

      {/* ═══ SECTION 3: PROBLEM / PAIN ══════════════════════════════ */}
      <section style={{
        background: '#FFFFFF',
        padding: '7.5rem 0',
      }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span className="section-label" style={{ marginBottom: '1.25rem', display: 'block' }}>
            The Real Problem
          </span>

          <h2 style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            color: '#1A1A1A',
            lineHeight: 1.2,
            marginBottom: '1.75rem',
          }}>
            Your marketing is working. Your response time isn't.
          </h2>

          <p style={{
            fontFamily: "'Nicholas', serif",
            fontSize: '1.125rem',
            color: '#555555',
            lineHeight: 1.7,
            marginBottom: '1.25rem',
          }}>
            You spend money on ads. You get Google reviews. Your website looks good.
          </p>

          <p style={{
            fontFamily: "'Nicholas', serif",
            fontSize: '1.125rem',
            color: '#555555',
            lineHeight: 1.7,
            marginBottom: '1.25rem',
          }}>
            And then someone calls at 2 PM on a Tuesday while you're in a room with a client. Nobody answers. They don't leave a voicemail. By the time you see the missed call, they've already booked with whoever picked up.
          </p>

          <p style={{
            fontFamily: "'Nicholas', serif",
            fontSize: '1.125rem',
            color: '#555555',
            lineHeight: 1.7,
            fontWeight: 600,
            marginBottom: '1.25rem',
          }}>
            85% of people who call a practice and don't get an answer will never call back.
          </p>

          <p style={{
            fontFamily: "'Nicholas', serif",
            fontSize: '1.125rem',
            color: '#555555',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}>
            This isn't a marketing problem. It's an operations problem.
          </p>

          {/* Quote block */}
          <div style={{
            borderLeft: '3px solid #0CA2A2',
            background: '#F0FAFA',
            padding: '1.5rem',
            borderRadius: '0 8px 8px 0',
          }}>
            <p style={{
              fontFamily: "'Nicholas', serif",
              fontSize: '1.0625rem',
              fontStyle: 'italic',
              color: '#1A1A1A',
              lineHeight: 1.7,
              marginBottom: '0.75rem',
            }}>
              "Before pouring more money into advertising, evaluate how swiftly your current leads are being contacted. The response time is 'whenever I can manage' — that's the real issue."
            </p>
            <p style={{
              fontFamily: "'Nicholas', serif",
              fontSize: '0.875rem',
              color: '#555555',
            }}>
              — Practice owner, r/MedSpa
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: PRODUCT GRID ════════════════════════════════ */}
      <section style={{ background: '#FAFAF8', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>
              The System
            </span>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}>
              Everything your practice needs to stop leaking revenue.
            </h2>
            <p style={{
              fontFamily: "'Nicholas', serif",
              fontSize: '1.0625rem',
              color: '#555555',
              maxWidth: '560px',
              margin: '0 auto',
            }}>
              Six integrated systems. Done for you. Running while you work.
            </p>
          </div>

          {/* 6-card grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}
          className="product-grid"
          >
            {products.map((product, i) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.title}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E8E8E8',
                    borderRadius: '12px',
                    padding: '2rem',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
                    animationDelay: `${i * 0.1}s`,
                  }}
                  className="card-hover"
                >
                  {/* Icon */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: product.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    flexShrink: 0,
                  }}>
                    <Icon size={22} color="#FFFFFF" />
                  </div>

                  <h3 style={{
                    fontFamily: "'Nicholas', serif",
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1A1A1A',
                    marginBottom: '0.625rem',
                  }}>
                    {product.title}
                  </h3>

                  <p style={{
                    fontFamily: "'Nicholas', serif",
                    fontSize: '0.9375rem',
                    color: '#555555',
                    lineHeight: 1.6,
                    marginBottom: product.link ? '0.875rem' : 0,
                  }}>
                    {product.description}
                  </p>

                  {product.link && (
                    <a
                      href={product.link.href}
                      style={{
                        fontFamily: "'Nicholas', serif",
                        fontSize: '0.875rem',
                        color: '#0CA2A2',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      {product.link.text}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: NOVA SPOTLIGHT ══════════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
          className="nova-split"
          >
            {/* Left — copy */}
            <div>
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

              <h2 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: '#1A1A1A',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}>
                Your AI front desk. Available 24/7. Never has a bad day.
              </h2>

              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1.0625rem',
                color: '#555555',
                lineHeight: 1.6,
                marginBottom: '1.25rem',
              }}>
                Nova is not a FAQ bot. It holds real conversations, qualifies your leads, handles objections, and books appointments — all in the tone of your practice.
              </p>

              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1.0625rem',
                color: '#555555',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}>
                It's the system that responds at midnight when someone asks "do you have anything this week?" and has an appointment on the calendar before you wake up.
              </p>

              {/* Feature bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  'Works in Instagram DMs, Google Business Messages, web chat, and SMS',
                  'Learns your services, pricing, and availability — answers like a knowledgeable front desk person',
                ].map((bullet) => (
                  <div key={bullet} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <Check size={16} color="#0CA2A2" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{
                      fontFamily: "'Nicholas', serif",
                      fontSize: '0.9375rem',
                      color: '#555555',
                      lineHeight: 1.6,
                    }}>
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="/nova"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#7C5CFC',
                  color: '#FFFFFF',
                  fontFamily: "'Nicholas', serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '0 1.75rem',
                  height: '48px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'background-color 0.15s ease',
                  marginBottom: '0.875rem',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#6A4DE8'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#7C5CFC'; }}
              >
                Learn About Nova →
              </a>

              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '0.875rem',
                color: '#555555',
              }}>
                Available as standalone product or bundled with the full system.
              </p>
            </div>

            {/* Right — Nova feature card */}
            <div style={{
              background: '#F7F4FF',
              borderRadius: '16px',
              padding: '2.5rem',
              border: '1px solid rgba(124,92,252,0.12)',
            }}>
              <div style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#7C5CFC',
                marginBottom: '1.5rem',
              }}>
                What Nova Handles
              </div>
              {[
                { emoji: '\u{1F4AC}', text: 'Answers inquiries instantly \u2014 even at 11 PM' },
                { emoji: '\u{1F4C5}', text: 'Books appointments directly into your calendar' },
                { emoji: '\u{1F50D}', text: 'Qualifies leads before they reach you' },
                { emoji: '\u{1F5E3}\uFE0F', text: 'Handles objections like a real front desk' },
                { emoji: '\u{1F4F2}', text: 'Works across web chat, SMS, Instagram DMs, and Google' },
              ].map((item) => (
                <div key={item.text} style={{
                  display: 'flex',
                  gap: '0.875rem',
                  alignItems: 'flex-start',
                  marginBottom: '1.25rem',
                }}>
                  <span style={{ fontSize: '1.125rem', flexShrink: 0, lineHeight: 1.5 }}>{item.emoji}</span>
                  <span style={{
                    fontFamily: "'Nicholas', serif",
                    fontSize: '0.9375rem',
                    color: '#1A1A1A',
                    lineHeight: 1.6,
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid rgba(124,92,252,0.08)',
              }}>
                <div style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: '0.8125rem',
                  fontStyle: 'italic',
                  color: '#555555',
                  lineHeight: 1.6,
                }}>
                  "It's like having a front desk person who never calls in sick, never has a bad day, and works at 2 AM."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: CASE STUDY — SANTA ══════════════════════════ */}
      <section style={{ background: '#FFFFFF', padding: '5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="case-split"
          >
            {/* Left — narrative */}
            <div>
              <span className="section-label" style={{ marginBottom: '1.25rem', display: 'block' }}>
                Client Results
              </span>

              <h2 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: '#1A1A1A',
                lineHeight: 1.2,
                marginBottom: '1.75rem',
              }}>
                4 no-shows a week. Then none.
              </h2>

              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1.125rem',
                color: '#555555',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
              }}>
                Santa is a massage therapist in Laguna Niguel. She was doing everything herself — answering calls between sessions, sending reminder texts manually at night, chasing down cancellations.
              </p>

              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1.125rem',
                color: '#555555',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
              }}>
                In 14 days, that stopped.
              </p>

              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1.125rem',
                color: '#555555',
                lineHeight: 1.7,
                marginBottom: '1.25rem',
              }}>
                The system ran confirmations. Reminders went out automatically. A cancellation on a Friday morning triggered a waitlist offer — and the slot was filled before she saw the notification.
              </p>

              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1.125rem',
                color: '#555555',
                lineHeight: 1.7,
              }}>
                She didn't change her services, her pricing, or her marketing. She changed what was running in the background.
              </p>
            </div>

            {/* Right — metrics panel */}
            <div style={{
              background: '#FAFAF8',
              borderRadius: '16px',
              padding: '2rem',
            }}>
              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: '#AAAAAA',
                marginBottom: '1.5rem',
              }}>
                Before → After (14 days)
              </p>

              {[
                { label: 'No-shows per week', before: '4', after: '< 1' },
                { label: 'Revenue recovered', before: '$0', after: '$960' },
                { label: 'Google reviews', before: 'Manual', after: '40+ (8 weeks)' },
                { label: 'Reminders', before: 'Manual', after: 'Fully automated' },
              ].map(({ label, before, after }) => (
                <div key={label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid #E5E5E5',
                }}>
                  <span style={{
                    fontFamily: "'Nicholas', serif",
                    fontSize: '0.9375rem',
                    color: '#555555',
                  }}>
                    {label}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontFamily: "'Nicholas', serif",
                      fontSize: '0.875rem',
                      color: '#AAAAAA',
                      textDecoration: 'line-through',
                    }}>
                      {before}
                    </span>
                    <ArrowRight size={14} color="#0CA2A2" />
                    <span style={{
                      fontFamily: "'Nicholas', serif",
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#0CA2A2',
                    }}>
                      {after}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: HOW IT WORKS ════════════════════════════════ */}
      <section id="how-it-works" style={{ background: '#FAFAF8', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>
              How It Works
            </span>
            <h2 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.2,
            }}>
              Three steps. No learning curve.
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2.5rem',
          }}
          className="steps-grid"
          >
            {[
              {
                num: '01',
                title: 'Audit',
                desc: 'We look at your current setup — calls, scheduling, follow-ups. We show you exactly where revenue is leaking and how much.',
              },
              {
                num: '02',
                title: 'Build',
                desc: 'We configure your full system: GHL pipeline, Nova chat, confirmation sequences, review automation. Done for you. No software to learn.',
              },
              {
                num: '03',
                title: 'Run',
                desc: 'It goes live. We monitor it. You show up for your clients. The system handles everything else.',
              },
            ].map(({ num, title, desc }) => (
              <div key={num} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                  fontWeight: 800,
                  color: '#0CA2A2',
                  lineHeight: 1,
                  marginBottom: '1rem',
                  userSelect: 'none',
                }}>
                  {num}
                </div>
                <h3 style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#1A1A1A',
                  marginBottom: '0.75rem',
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: '0.9375rem',
                  color: '#555555',
                  lineHeight: 1.6,
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a
              href="/book"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#0CA2A2',
                color: '#FFFFFF',
                fontFamily: "'Nicholas', serif",
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0 1.75rem',
                height: '48px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#0A8F8F'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#0CA2A2'; }}
            >
              Book your free audit →
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: DARK CTA ════════════════════════════════════ */}
      <section style={{ background: '#1A1A1A', padding: '6.25rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="cta-split"
          >
            {/* Left — copy */}
            <div>
              <h2 style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}>
                Free audit. No pitch. Just your numbers.
              </h2>

              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1.125rem',
                color: '#AAAAAA',
                lineHeight: 1.6,
                maxWidth: '520px',
                marginBottom: '2rem',
              }}>
                In 30 minutes, you'll know how many leads you're missing, what they're costing you, and exactly what fixing it would look like. No obligation.
              </p>

              <a
                href="/book"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#0CA2A2',
                  color: '#FFFFFF',
                  fontFamily: "'Nicholas', serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '0 2rem',
                  height: '52px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
                  marginBottom: '0.875rem',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = '#0A8F8F';
                  el.style.boxShadow = '0 0 0 8px rgba(12,162,162,0)';
                  el.style.animation = 'pulseGlow 1.5s ease-in-out';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = '#0CA2A2';
                  el.style.boxShadow = 'none';
                }}
              >
                Book Free Audit →
              </a>

              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '0.875rem',
                color: '#777777',
              }}>
                Takes 2 minutes to schedule. No commitment.
              </p>
            </div>

            {/* Right — Nikki headshot placeholder */}
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              {/* Placeholder: teal circle with initials NN */}
              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: '#0CA2A2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <span style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                }}>
                  NN
                </span>
              </div>
              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '0.9375rem',
                fontStyle: 'italic',
                color: '#FFFFFF',
                lineHeight: 1.5,
              }}>
                "You built this to work with clients.
              </p>
              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '0.9375rem',
                fontStyle: 'italic',
                color: '#FFFFFF',
                lineHeight: 1.5,
                marginBottom: '0.5rem',
              }}>
                Not to chase them."
              </p>
              <p style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '0.875rem',
                color: '#777777',
              }}>
                — Nikki Noell, Ops by Noell
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Responsive grid overrides for mobile */}
      <style>{`
        @media (max-width: 900px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nova-split, .case-split { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .cta-split { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 580px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
