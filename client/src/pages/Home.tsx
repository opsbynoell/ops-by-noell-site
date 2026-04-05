import { Phone, MessageSquare, Calendar, Star, Filter, RefreshCw, Check } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

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
      <div style={{
        background: '#1A1A1A',
        borderRadius: '24px',
        padding: '0',
        width: '100%',
        maxWidth: '320px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}>
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
                animation: 'chatSlideIn 0.4s ease both',
                animationDelay: msg.delay,
                opacity: 0,
                animationFillMode: 'both',
              }}
            >
              <div style={{
                maxWidth: '75%',
                padding: '0.5rem 0.875rem',
                borderRadius: msg.from === 'client' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
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

export default function Home() {
  const whoItems = [
    {
      title: 'Massage Therapists',
      description: "You're in a room. Hands on a client. Your phone is at the front desk, and it's ringing.",
      link: '/book',
    },
    {
      title: 'Med Spa Owners',
      description: "High-value leads. Short booking windows. You can't afford 'I'll call them back later.'",
      link: '/book',
    },
    {
      title: 'Salon Owners',
      description: 'You built this so you could do hair, not return voicemails at 9 PM.',
      link: '/book',
    },
    {
      title: 'Dental Offices',
      description: 'Your front desk is overwhelmed. Your recall list is growing. Something has to give.',
      link: '/book',
    },
  ];

  const features = [
    {
      icon: <Phone size={24} color="#7C5CFC" />,
      title: 'Missed Call Recovery',
      desc: 'Someone calls, no one answers. Within 60 seconds, they get a text. Hey, sorry we missed you, can we find a time? Most people respond. Most of those book.',
    },
    {
      icon: <MessageSquare size={24} color="#7C5CFC" />,
      title: 'Nova AI Chat',
      desc: 'Nova responds to website visitors 24/7. Books appointments, answers questions, captures leads while you sleep. Not a chatbot. A booking engine.',
    },
    {
      icon: <Calendar size={24} color="#7C5CFC" />,
      title: 'Appointment Confirmation',
      desc: '48 hours before. 2 hours before. Two texts. That\'s it. Santa went from 4 no-shows a week to less than 1. Not because clients changed. Because the reminders did.',
    },
    {
      icon: <Star size={24} color="#7C5CFC" />,
      title: 'Review Generation',
      desc: 'After every appointment, the right message goes out at the right time. Santa went from 12 to 52 Google reviews in 8 weeks. No awkward asks. Fully automated.',
    },
    {
      icon: <Filter size={24} color="#7C5CFC" />,
      title: 'Lead Pipeline',
      desc: 'Every call, DM, web form, missed call in one inbox. You stop losing leads not because you got better at it. The system got better for you.',
    },
    {
      icon: <RefreshCw size={24} color="#7C5CFC" />,
      title: 'Reactivation Campaigns',
      desc: 'Clients who haven\'t booked in 60+ days get a re-engagement sequence. Most practices have 40-100 dormant clients. This wakes them up.',
    },
  ];

  const faqItems = [
    {
      q: 'Do I need any tech experience?',
      a: 'None. We handle everything. You get a login to view your dashboard and a weekly summary. That\'s it.',
    },
    {
      q: 'How long does setup take?',
      a: 'Most practices are live within 10 to 14 days.',
    },
    {
      q: 'What if I already have a CRM?',
      a: "We work with most platforms. If yours doesn't connect, we'll tell you before you start.",
    },
    {
      q: 'Is there a contract?',
      a: 'No long-term contract. Month-to-month after the setup period.',
    },
    {
      q: 'What kind of results can I expect?',
      a: 'Most practices recover 3 to 5 missed bookings in the first 30 days. Results depend on your volume, but the system works the same day it goes live.',
    },
    {
      q: "What's included in the free audit?",
      a: 'A 30-minute call where we look at your current setup, identify where you\'re losing revenue, and show you exactly what we\'d build. No obligation.',
    },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Nav />

      {/* SECTION 1 — HERO */}
      <section style={{ background: '#FFFFFF', paddingTop: '120px', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
          <div className="home-hero-grid" style={{ display: 'grid', gridTemplateColumns: '60% 40%', gap: '4rem', alignItems: 'center' }}>
            {/* Left column */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(124,92,252,0.1)',
                color: '#7C5CFC',
                borderRadius: '9999px',
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                marginBottom: '1.5rem',
              }}>
                Done-for-You Front Desk + Follow-Up System
              </div>
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                fontWeight: 800,
                color: '#0A0A0A',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
              }}>
                By the time you call back, they've already booked somewhere else.
              </h1>
              <p style={{ fontSize: '1.125rem', color: '#6B7280', maxWidth: '520px', lineHeight: 1.7, marginBottom: '1rem' }}>
                We build, install, and manage your entire front desk and follow-up system. Every missed call recovered. Every lead answered. Your calendar stays full. You stay focused on the client in front of you.
              </p>
              <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '2rem' }}>
                Built for massage therapists, med spas, salons, dental practices, and estheticians in Orange County.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <a
                  href="/book"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#7C5CFC',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '1rem',
                    height: '48px',
                    padding: '0 1.75rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#6B4FD8')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#7C5CFC')}
                >
                  Get Your Free Audit
                </a>
                <a
                  href="#system"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid #E5E5E5',
                    color: '#374151',
                    fontWeight: 500,
                    fontSize: '1rem',
                    height: '48px',
                    padding: '0 1.5rem',
                    borderRadius: '8px',
                    background: 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  See How It Works
                </a>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '1rem' }}>
                Case study: 4 no-shows/week to less than 1 in 14 days.
              </p>
            </div>
            {/* Right column */}
            <div
              className="home-hero-right"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
              }}
            >
              <NovaChatMockup />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — STATS BAR */}
      <section style={{ background: '#F9F5F3', padding: '4rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="stats-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
            {[
              { number: '$960', label: 'Revenue recovered in 14 days' },
              { number: '40+', label: 'Google reviews in 8 weeks' },
              { number: '<1', label: 'No-shows per week (was 4)' },
            ].map((stat, idx, arr) => (
              <div
                key={idx}
                className="stat-divider"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '0 2rem',
                  borderRight: idx < arr.length - 1 ? '1px solid #E5E5E5' : 'none',
                }}
              >
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#7C5CFC',
                  lineHeight: 1,
                }}>
                  {stat.number}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem', display: 'block' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          <p style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: '0.875rem',
            color: '#9CA3AF',
            fontStyle: 'italic',
          }}>
            From one practice. 14 days. One system change.
          </p>
        </div>
      </section>

      {/* SECTION 3 — WHO THIS IS FOR */}
      <section id="who" style={{ background: '#FFFFFF', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ color: '#7C5CFC' }}>Who This Is For</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0A0A0A', marginTop: '0.5rem' }}>
              Built for the people doing the actual work.
            </h2>
          </div>
          <HoverEffect items={whoItems} />
        </div>
      </section>

      {/* SECTION 4 — THE REAL PROBLEM */}
      <section style={{ background: '#FFFFFF', padding: '5rem 0', borderTop: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'left' }}>
            <span className="section-label" style={{ color: '#7C5CFC' }}>The Real Problem</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0A0A0A', marginTop: '0.5rem', marginBottom: '2rem' }}>
              Your marketing is working. Your response time isn't.
            </h2>
            <p style={{ color: '#6B7280', fontSize: '1.0625rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              You spend money on ads. You get Google reviews. Your website looks good.
            </p>
            <p style={{ color: '#6B7280', fontSize: '1.0625rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              And then someone calls at 2 PM on a Tuesday while you're in a room with a client. Nobody answers. They don't leave a voicemail. By the time you see the missed call, they've already booked with whoever picked up.
            </p>
            <p style={{ color: '#6B7280', fontSize: '1.0625rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              You know that feeling. Checking your phone between sessions, wondering who you missed. Doing the math on Sunday night. Thinking about Monday before the weekend is over.
            </p>
            <p style={{ color: '#6B7280', fontSize: '1.0625rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              It's not that you're bad at this. It's that you're doing the work of three people and the phone doesn't stop.
            </p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
            <span style={{ display: 'block', fontSize: 'clamp(4rem, 10vw, 7rem)', fontWeight: 900, color: '#7C5CFC', lineHeight: 1 }}>
              85%
            </span>
            <p style={{ fontSize: '1rem', color: '#6B7280', marginTop: '0.5rem' }}>
              of callers who don't get an answer will never call back.
            </p>
          </div>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <p style={{ color: '#0A0A0A', fontWeight: 600, fontSize: '1.0625rem' }}>
              This isn't a marketing problem. It's an operations problem. And it's fixable without hiring anyone.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CASE STUDY */}
      <section style={{ background: '#F9F5F3', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="case-split-new" style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: '4rem', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <span className="section-label" style={{ color: '#7C5CFC' }}>Client Results</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0A0A0A', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                4 no-shows a week. Then none.
              </h2>
              <p style={{ color: '#6B7280', lineHeight: 1.8, fontSize: '1.0625rem' }}>
                Santa runs a massage practice in Orange County. She was doing everything right. Marketing. Reviews. A good website. But she was in sessions all day, and every missed call was a lost client. We installed the system in 10 days. Missed calls answered instantly. Confirmations sent automatically. A follow-up sequence that runs while she works.
              </p>
            </div>
            {/* Right — before/after table */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#7C5CFC' }}>
                    <th style={{ padding: '0.875rem 1.25rem', textAlign: 'left', color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600 }}>Metric</th>
                    <th style={{ padding: '0.875rem 1rem', textAlign: 'center', color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600 }}>Before</th>
                    <th style={{ padding: '0.875rem 1rem', textAlign: 'center', color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600 }}>After (14 days)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'No-shows', before: '4/week', after: 'Less than 1' },
                    { metric: 'Google reviews', before: '12', after: '52' },
                    { metric: 'Revenue recovered', before: '$0', after: '$960' },
                    { metric: 'Hours on admin', before: '~8/week', after: '~1/week' },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: idx < 3 ? '1px solid #F3F4F6' : 'none', background: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                      <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', color: '#0A0A0A', fontWeight: 500 }}>{row.metric}</td>
                      <td style={{ padding: '0.875rem 1rem', textAlign: 'center', fontSize: '0.875rem', color: '#9CA3AF' }}>{row.before}</td>
                      <td style={{ padding: '0.875rem 1rem', textAlign: 'center', fontSize: '0.875rem', color: '#7C5CFC', fontWeight: 600 }}>{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — THE SYSTEM */}
      <section id="system" style={{ background: '#FFFFFF', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-label" style={{ color: '#7C5CFC' }}>The System</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0A0A0A', marginTop: '0.5rem', marginBottom: '1rem' }}>
              Everything your practice needs to stop leaking revenue.
            </h2>
            <p style={{ fontSize: '1.0625rem', color: '#6B7280' }}>
              Six systems. One flat rate. We build it, install it, and manage it.
            </p>
          </div>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                marginBottom: '4rem',
                direction: idx % 2 === 1 ? 'rtl' : 'ltr',
              }}
            >
              {/* Icon + title side */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', direction: 'ltr' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(124,92,252,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {feature.icon}
                </div>
                <div style={{ direction: 'ltr' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0A0A0A', margin: 0 }}>{feature.title}</h3>
                  <div style={{ background: '#7C5CFC', width: '32px', height: '2px', marginTop: '8px' }} />
                </div>
              </div>
              {/* Description side */}
              <p style={{ color: '#6B7280', fontSize: '1.0625rem', lineHeight: 1.8, margin: 0, direction: 'ltr' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — HOW IT WORKS */}
      <section id="how-it-works" style={{ background: '#F9F5F3', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ color: '#7C5CFC' }}>How It Works</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0A0A0A', marginTop: '0.5rem' }}>
              Simple to start. Runs itself after that.
            </h2>
          </div>
          <div className="how-it-works-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            {[
              {
                number: '01',
                title: 'Audit',
                desc: 'We spend 30 minutes learning your practice. Where you lose leads. Where you lose clients. What\'s costing you money every week.',
              },
              {
                number: '02',
                title: 'Build',
                desc: 'We set up your entire system. Missed call recovery, booking confirmation, follow-up, review generation. You don\'t touch a setting.',
              },
              {
                number: '03',
                title: 'Run',
                desc: 'We manage it. You get a system that works while you\'re in sessions. We send you a weekly report. You stay focused on clients.',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '2rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(124,92,252,0.2)', lineHeight: 1 }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0A0A0A', marginTop: '1rem', marginBottom: '0.75rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: 1.7, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a
              href="/book"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#7C5CFC',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '1rem',
                height: '48px',
                padding: '0 1.75rem',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#6B4FD8')}
              onMouseLeave={e => (e.currentTarget.style.background = '#7C5CFC')}
            >
              Book your free audit
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 8 — PRICING */}
      <section style={{ background: '#FFFFFF', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span className="section-label" style={{ color: '#7C5CFC' }}>Pricing</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0A0A0A', marginTop: '0.5rem' }}>
              One flat rate. Everything included.
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B7280', marginTop: '0.75rem' }}>
              No per-seat fees. No surprise add-ons. We run it, you don't touch it.
            </p>
          </div>
          <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '3rem', alignItems: 'start' }}>
            {/* Card 1: Entry */}
            <div style={{
              background: '#F9F5F3',
              border: '1px solid #E5E5E5',
              borderRadius: '16px',
              padding: '2.5rem 2rem',
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                Entry
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0A0A0A', lineHeight: 1 }}>$197</span>
                <span style={{ fontSize: '1rem', color: '#6B7280' }}>/mo</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '1.5rem' }}>+ $497 setup</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Missed call text-back', 'Basic lead capture', 'Weekly report', 'Email support'].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.9375rem', color: '#374151' }}>
                    <Check size={16} color="#7C5CFC" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/book"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#0A0A0A',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  height: '44px',
                  lineHeight: '44px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                Get Started
              </a>
            </div>

            {/* Card 2: Starter (featured) */}
            <div style={{
              position: 'relative',
              background: '#FFFFFF',
              border: '2px solid #7C5CFC',
              borderRadius: '16px',
              padding: '2.5rem 2rem',
              boxShadow: '0 8px 40px rgba(124,92,252,0.15)',
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#7C5CFC',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
              }}>
                Most popular
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#7C5CFC', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                Starter
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0A0A0A', lineHeight: 1 }}>$797</span>
                <span style={{ fontSize: '1rem', color: '#6B7280' }}>/mo</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '1.5rem' }}>+ $997 setup</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Everything in Entry',
                  'Nova AI Chat (24/7 booking)',
                  'Appointment confirmations',
                  'Review generation',
                  'Lead pipeline (unified inbox)',
                  'Monthly strategy call',
                ].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.9375rem', color: '#374151' }}>
                    <Check size={16} color="#7C5CFC" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/book"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#7C5CFC',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  height: '44px',
                  lineHeight: '44px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                Get Started
              </a>
            </div>

            {/* Card 3: Growth */}
            <div style={{
              background: '#F9F5F3',
              border: '1px solid #E5E5E5',
              borderRadius: '16px',
              padding: '2.5rem 2rem',
            }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                Growth
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0A0A0A', lineHeight: 1 }}>$1,497</span>
                <span style={{ fontSize: '1rem', color: '#6B7280' }}>/mo</span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#9CA3AF', marginBottom: '1.5rem' }}>+ $1,497 setup</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Everything in Starter',
                  'AI voice receptionist',
                  'Reactivation campaigns',
                  'Priority support (same-day response)',
                  'Quarterly business review',
                ].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.9375rem', color: '#374151' }}>
                    <Check size={16} color="#7C5CFC" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/book"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#0A0A0A',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  height: '44px',
                  lineHeight: '44px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FAQ */}
      <section style={{ background: '#F9F5F3', padding: '5rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <span className="section-label" style={{ color: '#7C5CFC' }}>FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0A0A0A', marginTop: '0.5rem' }}>
              Questions before you start.
            </h2>
          </div>
          <div style={{ maxWidth: '720px', margin: '2.5rem auto 0' }}>
            <Accordion type="single" collapsible>
              {faqItems.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger style={{ fontSize: '1rem', fontWeight: 600, color: '#0A0A0A' }}>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent style={{ fontSize: '0.9375rem', color: '#6B7280', lineHeight: 1.7 }}>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* SECTION 10 — BOTTOM CTA */}
      <section style={{ background: '#0A0A0A', padding: '6rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            color: '#FFFFFF',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            marginBottom: '1rem',
          }}>
            Stop losing clients you never knew about.
          </h2>
          <p style={{
            color: '#9CA3AF',
            fontSize: '1.125rem',
            maxWidth: '480px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}>
            The system runs while you work. You get the clients you were already earning.
          </p>
          <a
            href="/book"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#7C5CFC',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '1.0625rem',
              height: '52px',
              padding: '0 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#6B4FD8')}
            onMouseLeave={e => (e.currentTarget.style.background = '#7C5CFC')}
          >
            Get Your Free Audit
          </a>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .feature-row { grid-template-columns: 1fr !important; direction: ltr !important; gap: 1.5rem !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .case-split-new { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .home-hero-grid { grid-template-columns: 1fr !important; }
          .home-hero-right { display: none; }
          .how-it-works-grid { grid-template-columns: 1fr !important; }
          .stats-row { flex-direction: column !important; gap: 2rem !important; }
          .stats-row .stat-divider { display: none !important; }
        }
        @media (max-width: 600px) {
          .audience-grid-new { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
