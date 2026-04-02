/*
 * OPS BY NOELL — Revenue Calculator Page
 * Route: /resources/revenue-calculator
 * Five-input calculator with client-side math and result interpretation.
 */

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: '#0CA2A2', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {children}
    </span>
  );
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

interface InputFieldProps {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
}

function InputField({ label, hint, value, onChange, prefix, suffix }: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' }}>
      <label style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', fontWeight: 600, color: '#ffffff' }}>
        {label}
      </label>
      <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.8125rem', color: '#b8b6b3', margin: 0, lineHeight: 1.5 }}>{hint}</p>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {prefix && (
          <span style={{ position: 'absolute', left: '1rem', fontFamily: "'Nicholas', serif", fontSize: '1rem', color: '#0CA2A2', fontWeight: 600, pointerEvents: 'none', zIndex: 1 }}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: prefix ? '0.875rem 1rem 0.875rem 2rem' : suffix ? '0.875rem 3.5rem 0.875rem 1rem' : '0.875rem 1rem',
            background: 'rgba(12,162,162,0.05)',
            border: `1px solid ${focused ? 'rgba(12,162,162,0.5)' : 'rgba(12,162,162,0.18)'}`,
            borderRadius: '10px',
            fontFamily: "'Nicholas', serif",
            fontSize: '1rem',
            color: '#ffffff',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            boxSizing: 'border-box' as const,
            MozAppearance: 'textfield',
          }}
        />
        {suffix && (
          <span style={{ position: 'absolute', right: '1rem', fontFamily: "'Nicholas', serif", fontSize: '0.8125rem', color: '#b8b6b3', pointerEvents: 'none' }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: number;
  accent?: boolean;
}

function ResultCard({ label, value, accent = false }: ResultCardProps) {
  return (
    <div style={{
      background: accent ? 'rgba(12,162,162,0.1)' : 'rgba(12,162,162,0.04)',
      border: `1px solid ${accent ? 'rgba(12,162,162,0.4)' : 'rgba(12,162,162,0.15)'}`,
      borderRadius: '12px',
      padding: '1.5rem',
    }}>
      <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.8125rem', color: '#b8b6b3', margin: '0 0 0.5rem', lineHeight: 1.4 }}>{label}</p>
      <p style={{
        fontFamily: "'Nicholas', serif",
        fontSize: accent ? '2.25rem' : '1.75rem',
        fontWeight: 800,
        lineHeight: 1,
        margin: 0,
        color: '#0CA2A2',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {formatCurrency(value)}
      </p>
    </div>
  );
}

function getInterpretation(total: number): { label: string; color: string; description: string } {
  if (total < 15_000) {
    return {
      label: 'Manageable',
      color: '#4ADE80',
      description: 'Your revenue leak is below the threshold where automation typically has a significant ROI impact. That said, the right systems can still recover meaningful revenue and reduce manual overhead.',
    };
  }
  if (total < 40_000) {
    return {
      label: 'Most common range',
      color: '#FBBF24',
      description: 'This is where we see most appointment-based businesses land. The gaps are real and measurable — and in most cases, fixable within 2 weeks with a modest monthly investment that pays for itself quickly.',
    };
  }
  if (total < 80_000) {
    return {
      label: 'Significant preventable losses',
      color: '#F87171',
      description: 'You\'re losing enough revenue that doing nothing is costing you more than fixing it. At this level, every week without systems in place is a quantifiable decision. These numbers are recoverable.',
    };
  }
  return {
    label: 'Systems problem, not a revenue problem',
    color: '#F87171',
    description: 'At this scale, the issue isn\'t demand — it\'s infrastructure. The revenue is there. The clients are calling and booking. What\'s missing is the follow-through layer that captures and retains them. This is exactly what we build.',
  };
}

export default function RevenueCalculatorPage() {
  const [price, setPrice] = useState('120');
  const [appts, setAppts] = useState('25');
  const [noShows, setNoShows] = useState('3');
  const [missedCalls, setMissedCalls] = useState('8');
  const [visitsPerYear, setVisitsPerYear] = useState('8');
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState({ noShowLoss: 0, missedCallLoss: 0, lifetimeValueLost: 0, totalLeak: 0 });

  function calculate() {
    const p = parseFloat(price) || 0;
    const ns = parseFloat(noShows) || 0;
    const mc = parseFloat(missedCalls) || 0;
    const vpY = parseFloat(visitsPerYear) || 0;

    const noShowLoss = ns * p * 52;
    const missedCallLoss = mc * 0.85 * p * 52;
    const lifetimeValueLost = missedCallLoss * vpY;
    const totalLeak = noShowLoss + lifetimeValueLost;

    setResults({ noShowLoss, missedCallLoss, lifetimeValueLost, totalLeak });
    setCalculated(true);

    setTimeout(() => {
      document.getElementById('calc-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  const interpretation = getInterpretation(results.totalLeak);

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* ═══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', paddingTop: '140px', paddingBottom: '64px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'none' }} />
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', pointerEvents: 'none', background: 'radial-gradient(ellipse at center, rgba(255,255,255,0),0.1) 0%, transparent 65%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <FadeItem delay={0}>
            <span style={{ display: 'inline-block', padding: '0.25rem 0.875rem', background: '#F0FAFA', border: '1px solid #E5E5E5', borderRadius: '100px', fontFamily: "'Nicholas', serif", fontSize: '0.6875rem', fontWeight: 600, color: '#0CA2A2', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '1.25rem' }}>
              Free Revenue Calculator
            </span>
          </FadeItem>
          <FadeItem delay={0.07}>
            <h1 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
              Find out what your <GradientText>revenue gaps</GradientText> are costing you.
            </h1>
          </FadeItem>
          <FadeItem delay={0.14}>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '1.0625rem', color: '#b8b6b3', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto' }}>
              Five inputs. Three minutes. Real numbers on exactly how much revenue is slipping through the cracks in your practice.
            </p>
          </FadeItem>
        </div>
      </section>

      {/* ═══ CALCULATOR FORM ════════════════════════════════════════ */}
      <section style={{ padding: '0 0 6rem' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>

              {/* Form fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '2rem' }}>
                <InputField
                  label="Average service price per appointment"
                  hint="Your typical session or service rate."
                  value={price}
                  onChange={setPrice}
                  prefix="$"
                />
                <InputField
                  label="Total appointments scheduled per week"
                  hint="Your average weekly appointment volume."
                  value={appts}
                  onChange={setAppts}
                  suffix="/ wk"
                />
                <InputField
                  label="No-shows per week"
                  hint="Clients who book but don't show up, on average."
                  value={noShows}
                  onChange={setNoShows}
                  suffix="/ wk"
                />
                <InputField
                  label="Missed or unanswered calls per week"
                  hint="Calls that go to voicemail while you're with clients."
                  value={missedCalls}
                  onChange={setMissedCalls}
                  suffix="/ wk"
                />
                <InputField
                  label="Average visits per returning client per year"
                  hint="How many times a typical loyal client books per year."
                  value={visitsPerYear}
                  onChange={setVisitsPerYear}
                  suffix="/ yr"
                />
              </div>

              <button
                onClick={calculate}
                style={{
                  width: '100%',
                  padding: '1.125rem',
                  background: 'linear-gradient(135deg, #7C3AED 0%, #0CA2A2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  fontFamily: "'Nicholas', serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'opacity 0.2s ease',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                Calculate My Revenue Leak <ArrowRight size={16} />
              </button>

            </div>
          </FadeItem>

          {/* ─── RESULTS ─── */}
          {calculated && (
            <div id="calc-results" style={{ marginTop: '2.5rem' }}>
              <FadeItem delay={0}>

                {/* Result cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <ResultCard
                    label="Annual no-show revenue lost"
                    value={results.noShowLoss}
                  />
                  <ResultCard
                    label="Annual missed call revenue lost"
                    value={results.missedCallLoss}
                  />
                  <ResultCard
                    label="Total lifetime value lost from missed calls"
                    value={results.lifetimeValueLost}
                  />
                </div>

                {/* Total */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <ResultCard
                    label="Total annual revenue leak"
                    value={results.totalLeak}
                    accent={true}
                  />
                </div>

                {/* Interpretation */}
                <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: '14px', padding: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: interpretation.color,
                      flexShrink: 0,
                    }} />
                    <span style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', fontWeight: 700, color: interpretation.color }}>
                      {interpretation.label}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.7, margin: 0 }}>
                    {interpretation.description}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div style={{ background: '#FFFFFF', border: 'none', borderRadius: '16px', padding: '2rem', textAlign: 'center' as const }}>
                  <h3 style={{ fontFamily: "'Nicholas', serif", fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                    Want us to run the numbers with you?
                  </h3>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    Book a free 30-minute audit. We map your actual gaps, verify the numbers, and show you exactly what the fix looks like — before you commit to anything.
                  </p>
                  <a
                    href="/book"
                    className="btn-gradient"
                    style={{ padding: '1rem 2rem', fontSize: '1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    Book a Free 30-Minute Audit <ArrowRight size={16} />
                  </a>
                  <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.8125rem', color: '#b8b6b3', marginTop: '0.875rem' }}>
                    No commitment. No credit card. Just a real conversation.
                  </p>
                </div>

              </FadeItem>
            </div>
          )}

        </div>
      </section>

      {/* ═══ HOW IT WORKS NOTE ══════════════════════════════════════ */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #E5E5E5' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <h2 style={{ fontFamily: "'Nicholas', serif", fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', fontWeight: 700, color: '#ffffff', marginBottom: '1rem', lineHeight: 1.2 }}>
              How this calculator works
            </h2>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.75, marginBottom: '0.75rem' }}>
              <strong style={{ color: '#0CA2A2' }}>Annual no-show loss</strong> is calculated as: no-shows per week × your service price × 52 weeks.
            </p>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.75, marginBottom: '0.75rem' }}>
              <strong style={{ color: '#0CA2A2' }}>Missed call loss</strong> applies the industry-standard 85% non-callback rate to your missed calls, then multiplies by price × 52.
            </p>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.75, marginBottom: '0.75rem' }}>
              <strong style={{ color: '#0CA2A2' }}>Lifetime value lost</strong> multiplies the missed call loss by average visits per year — showing the true long-term cost of each lost caller, not just the single appointment.
            </p>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#b8b6b3', lineHeight: 1.75 }}>
              <strong style={{ color: '#0CA2A2' }}>Total annual revenue leak</strong> combines no-show loss with lifetime value lost.
            </p>
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}

