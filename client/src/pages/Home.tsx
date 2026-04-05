import { useState, useEffect } from 'react';
import { MessageSquare, Calendar } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Container } from '@/components/agenforce/container';
import { Heading } from '@/components/agenforce/heading';
import { Subheading } from '@/components/agenforce/subheading';
import { GradientDivider } from '@/components/agenforce/gradient-divider';
import { Button } from '@/components/agenforce/ui/button';
import { Card, CardContent, CardCTA, CardSkeleton, CardTitle } from '@/components/agenforce/features/card';
import { SkeletonOne as FeatureSkeletonOne } from '@/components/agenforce/features/skeletons/first';
import { SkeletonTwo as FeatureSkeletonTwo } from '@/components/agenforce/features/skeletons/second';
import { SkeletonThree as FeatureSkeletonThree } from '@/components/agenforce/features/skeletons/third';
import { FeaturesSecondary } from '@/components/agenforce/features-secondary';
import { FeaturesTertiary } from '@/components/agenforce/features-tertiary';
import { IconPlus } from '@tabler/icons-react';
import { motion } from 'framer-motion';

/* ─── LOGO CLOUD ────────────────────────────────────────────────── */
function LogoCloud() {
  const industries = [
    { label: 'Massage Therapy', icon: '🙌' },
    { label: 'Med Spas', icon: '✨' },
    { label: 'Salons', icon: '✂️' },
    { label: 'Estheticians', icon: '🌿' },
    { label: 'Dental Practices', icon: '🦷' },
    { label: 'Home Services', icon: '🏠' },
  ];

  return (
    <section className="py-8 md:py-12 bg-white border-b border-neutral-100">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6 font-inter">
          Trusted by practices across Orange County
        </p>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...industries, ...industries].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-2 mx-3 rounded-full border border-neutral-200 bg-neutral-50 text-sm font-medium text-neutral-600 whitespace-nowrap"
              >
                <span>{item.icon}</span>
                <span className="font-inter">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── ANIMATED NOVA CHAT MOCKUP ─────────────────────────────────── */
function NovaChatMockup() {
  const messages = [
    { from: 'client', text: 'Hi, do you have anything open this week?', delay: '0.3s' },
    { from: 'nova', text: 'Hi! Yes — we have Tuesday at 2 PM and Thursday at 10 AM. Which works better for you?', delay: '0.6s' },
    { from: 'client', text: 'Thursday!', delay: '0.9s' },
    { from: 'nova', text: "Perfect — I'll hold Thursday at 10 AM. Can I get your name to confirm the booking?", delay: '1.2s' },
    { from: 'client', text: 'Sarah', delay: '1.5s' },
    { from: 'nova', text: "Done, Sarah! You're booked for Thursday at 10 AM. See you then!", delay: '1.8s' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{
        background: '#1A1A1A',
        borderRadius: '24px',
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
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <MessageSquare size={18} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
              Serenity Massage
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ADE80' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: 'rgba(255,255,255,0.85)' }}>Nova is online</span>
            </div>
          </div>
        </div>
        <div style={{
          background: '#F9F9F9', padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '0.625rem', minHeight: '280px',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.from === 'client' ? 'flex-end' : 'flex-start',
              animation: 'chatSlideIn 0.4s ease both',
              animationDelay: msg.delay,
              opacity: 0,
              animationFillMode: 'both',
            }}>
              <div style={{
                maxWidth: '75%', padding: '0.5rem 0.875rem',
                borderRadius: msg.from === 'client' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.from === 'client' ? '#E8E8E8' : '#0CA2A2',
                color: msg.from === 'client' ? '#1A1A1A' : '#FFFFFF',
                fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', lineHeight: 1.5,
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="float-up" style={{
        background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '12px',
        padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)', maxWidth: '280px', width: '100%',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'rgba(12,162,162,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Calendar size={18} color="#0CA2A2" />
        </div>
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#1A1A1A' }}>
            New appointment booked
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#555555' }}>
            Thursday 10:00 AM
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HOME PAGE ─────────────────────────────────────────────────── */
export default function Home() {
  const stats = [
    { value: '$960', label: 'Revenue recovered in 14 days' },
    { value: '40+', label: 'Google reviews in 8 weeks' },
    { value: '<1', label: 'No-shows per week (was 4)' },
    { value: '14', label: 'Days to full results' },
  ];

  return (
    <>
      <Nav />
      <main className="pt-[72px]">

        {/* ── SECTION 1: HERO ── */}
        <section className="pt-10 md:pt-20 lg:pt-32 relative overflow-hidden bg-white">
          <Container>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-sm font-medium text-neutral-600 mb-6 font-inter">
              Done-for-You Front Desk + Follow-Up System
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Heading as="h1">
                  By the time you call back, they've already booked somewhere else.
                </Heading>
                <Subheading className="py-6">
                  We build, install, and manage your entire front desk and follow-up system. Missed calls answered. No-shows chased. Reviews generated. All automatic.
                </Subheading>
                <p className="text-sm text-neutral-400 mb-6 font-inter">
                  Built for massage therapists, med spas, salons, dental practices, and estheticians in Orange County.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Button asChild>
                    <a href="/book">Get Your Free Audit</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/services">See How It Works</a>
                  </Button>
                </div>
                <p className="text-sm text-neutral-400 mt-4 italic font-inter">
                  Case study: 4 no-shows/week to less than 1 in 14 days.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <NovaChatMockup />
              </div>
            </div>
          </Container>
          <GradientDivider />
        </section>

        {/* ── LOGO CLOUD ── */}
        <LogoCloud />

        {/* ── SECTION 2: STATS ── */}
        <section id="results" className="pb-10 md:pb-20 bg-white">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border border-neutral-200 rounded-2xl p-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-bold font-display text-neutral-900">{stat.value}</p>
                  <p className="text-sm text-neutral-500 mt-1 font-inter">{stat.label}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-neutral-400 text-sm mt-4 italic font-inter">
              From one practice. 14 days. One system change.
            </p>
          </Container>
        </section>

        {/* ── SECTION 3: WHO THIS IS FOR ── */}
        <section id="who" className="py-10 md:py-20 lg:py-32 bg-white">
          <Container>
            <div className="flex xl:flex-row flex-col xl:items-baseline-last justify-between gap-10 mb-10 md:mb-20">
              <Heading className="text-center lg:text-left">
                Built for the people doing the actual work.
              </Heading>
              <Subheading className="text-center lg:text-left mx-auto lg:mx-0">
                Whether you run a solo practice or manage a multi-provider location, the system is the same. You stop losing clients you never knew were reaching out.
              </Subheading>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="rounded-tl-3xl rounded-bl-3xl">
                <CardSkeleton>
                  <FeatureSkeletonOne />
                </CardSkeleton>
                <CardContent>
                  <CardTitle>Massage Therapists</CardTitle>
                  <CardCTA><IconPlus /></CardCTA>
                </CardContent>
              </Card>
              <Card>
                <CardSkeleton>
                  <FeatureSkeletonTwo />
                </CardSkeleton>
                <CardContent>
                  <CardTitle>Med Spa Owners</CardTitle>
                  <CardCTA><IconPlus /></CardCTA>
                </CardContent>
              </Card>
              <Card className="rounded-tr-3xl rounded-br-3xl">
                <CardSkeleton>
                  <FeatureSkeletonThree />
                </CardSkeleton>
                <CardContent>
                  <CardTitle>Salons and Estheticians</CardTitle>
                  <CardCTA><IconPlus /></CardCTA>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* ── SECTION 4: THE REAL PROBLEM ── */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 py-6 md:py-10 z-10">
            <Container>
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400 font-inter">The Real Problem</span>
              </div>
              <Heading className="text-center">
                Your marketing is working. Your response time isn't.
              </Heading>
            </Container>
          </div>
          <FeaturesSecondary />
        </div>

        {/* ── SECTION 5: CASE STUDY ── */}
        <div id="case-study" className="relative">
          <div className="absolute top-0 left-0 right-0 py-6 md:py-10 z-10">
            <Container>
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400 font-inter">Client Results</span>
              </div>
              <Heading className="text-center">
                4 no-shows a week. Then none.
              </Heading>
              <Subheading className="text-center mx-auto mt-4">
                A massage practice in Orange County went from 4 missed appointments a week to less than 1, in 14 days, without changing their booking software.
              </Subheading>
            </Container>
          </div>
          <FeaturesTertiary />
        </div>

        {/* ── SECTION 6: ABOUT ── */}
        <section id="about" className="py-10 md:py-20 lg:py-32 bg-white relative overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Subheading className="mb-4">About Us</Subheading>
                <Heading>
                  We've spent years building the fix for businesses exactly like yours.
                </Heading>
                <p className="text-neutral-600 mt-6 text-base font-inter leading-relaxed">
                  Nikki and James Noell started Ops by Noell after watching a close friend's massage practice hemorrhage clients, not because of bad service, but because of a broken front desk. Calls went to voicemail. Texts sat unanswered. No-shows piled up.
                </p>
                <p className="text-neutral-600 mt-4 text-base font-inter leading-relaxed">
                  We built the system we wished existed: one that handles every missed touchpoint automatically, without adding complexity to the people doing the actual work.
                </p>
                <p className="text-neutral-500 mt-4 text-sm italic font-inter">
                  Nikki Noell and James Noell, Co-Founders
                </p>
                <div className="mt-8">
                  <Button asChild>
                    <a href="/book">Talk to Us</a>
                  </Button>
                </div>
              </div>
              <div className="bg-neutral-100 rounded-2xl aspect-[4/3] flex items-center justify-center border border-neutral-200">
                <p className="text-neutral-400 text-sm font-inter">Founder photo coming soon</p>
              </div>
            </div>
          </Container>
          <GradientDivider />
        </section>

        {/* ── SECTION 7: BOTTOM CTA ── */}
        <section className="py-20 md:py-32 bg-neutral-950 relative overflow-hidden">
          <Container>
            <div className="text-center">
              <Heading className="text-white">
                Stop losing clients you never knew about.
              </Heading>
              <Subheading className="text-neutral-400 py-6 mx-auto">
                In 30 minutes, we show you your numbers. No pitch. No slides. Just the data.
              </Subheading>
              <div className="flex gap-4 flex-wrap justify-center items-center">
                <Button className="shadow-brand" asChild>
                  <a href="/book">Get Your Free Audit</a>
                </Button>
                <a href="/services" className="text-neutral-400 underline font-inter text-sm">
                  See how it works
                </a>
              </div>
            </div>
          </Container>
        </section>

      </main>
      <Footer />
    </>
  );
}
