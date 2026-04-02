/*
 * RevenueCalculator — Interactive Cost of Inaction Calculator
 * Design: Matches site design system — #0A0A0A bg, #A78BFA accent, Space Grotesk + Inter
 */

import { useState, useCallback } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

function fmt(n: number): string {
  return '$' + Math.round(n).toLocaleString();
}

interface SliderProps {
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}

function Slider({ label, sublabel, value, min, max, step, unit = '', onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: '0.625rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
        <div>
          <span style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '0.8125rem',
            color: 'rgba(245,240,235,0.7)',
            letterSpacing: '0.01em',
          }}>{label}</span>
          {sublabel && (
            <span style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.6875rem',
              color: 'rgba(245,240,235,0.35)',
              marginLeft: '0.5rem',
            }}>{sublabel}</span>
          )}
        </div>
        <span style={{
          fontFamily: "'Nicholas', serif",
          fontSize: '1.125rem',
          color: '#A78BFA',
          fontWeight: 600,
          minWidth: '4rem',
          textAlign: 'right',
        }}>
          {unit === '$' ? `$${value.toLocaleString()}` : `${value}${unit}`}
        </span>
      </div>
      <div style={{ position: 'relative', height: '4px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '2px' }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${pct}%`,
          backgroundColor: '#A78BFA',
          borderRadius: '2px',
          transition: 'width 0.1s ease',
        }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '20px',
            transform: 'translateY(-50%)',
            opacity: 0,
            cursor: 'pointer',
            margin: 0,
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: `${pct}%`,
          transform: 'translate(-50%, -50%)',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: '#A78BFA',
          border: '2px solid #0A0A0A',
          boxShadow: '0 0 0 2px rgba(167,139,250,0.3)',
          pointerEvents: 'none',
          transition: 'left 0.1s ease',
        }} />
      </div>
    </div>
  );
}

interface CostPillProps {
  label: string;
  cost: number;
  assumption: string;
}

function CostPill({ label, cost, assumption }: CostPillProps) {
  const [showTip, setShowTip] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowTip(s => !s)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(167,139,250,0.15)',
          borderRadius: '0.375rem',
          padding: '0.625rem 0.875rem',
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%',
          transition: 'border-color 0.2s ease, background-color 0.2s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(167,139,250,0.4)';
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(167,139,250,0.06)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(167,139,250,0.15)';
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.03)';
        }}
      >
        <span style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: '0.8125rem',
          color: 'rgba(245,240,235,0.55)',
          flexGrow: 1,
        }}>{label}</span>
        <span style={{
          fontFamily: "'Nicholas', serif",
          fontSize: '1rem',
          color: '#A78BFA',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        }}>{fmt(cost)}</span>
        {showTip
          ? <ChevronUp size={10} color="rgba(167,139,250,0.5)" />
          : <ChevronDown size={10} color="rgba(167,139,250,0.3)" />}
      </button>
      {showTip && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          backgroundColor: '#1A1A1A',
          border: '1px solid rgba(167,139,250,0.2)',
          padding: '0.625rem 0.875rem',
          borderRadius: '0.375rem',
          zIndex: 10,
        }}>
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '0.6875rem',
            color: 'rgba(245,240,235,0.5)',
            lineHeight: 1.6,
          }}>{assumption}</p>
        </div>
      )}
    </div>
  );
}

export default function RevenueCalculator() {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(6);
  const [avgServiceValue, setAvgServiceValue] = useState(120);
  const [weeklyAppointments, setWeeklyAppointments] = useState(20);
  const [noShowRate, setNoShowRate] = useState(15);
  const [conversionRate, setConversionRate] = useState(30);

  const calc = useCallback(() => {
    const weeksPerMonth = 4.33;
    const missedCallsMonthly = missedCallsPerWeek * weeksPerMonth;
    const missedCallLoss = missedCallsMonthly * 0.4 * avgServiceValue;
    const coldLeadsMonthly = weeklyAppointments * weeksPerMonth * 0.5;
    const followUpLoss = coldLeadsMonthly * (conversionRate / 100) * avgServiceValue;
    const noShowsMonthly = weeklyAppointments * weeksPerMonth * (noShowRate / 100);
    const noShowLoss = noShowsMonthly * avgServiceValue;
    const missedReviewsMonthly = (weeklyAppointments * weeksPerMonth) / 3;
    const reviewLoss = missedReviewsMonthly * 0.15 * avgServiceValue;
    const monthlyClients = weeklyAppointments * weeksPerMonth;
    const marketingLoss = monthlyClients * 0.1 * avgServiceValue;
    const total = missedCallLoss + followUpLoss + noShowLoss + reviewLoss + marketingLoss;
    return { missedCallLoss, followUpLoss, noShowLoss, reviewLoss, marketingLoss, total };
  }, [missedCallsPerWeek, avgServiceValue, weeklyAppointments, noShowRate, conversionRate]);

  const costs = calc();

  return (
    <section style={{ backgroundColor: '#0A0A0A', padding: '3rem 0', position: 'relative', overflow: 'hidden', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A' }}>
      {/* Top purple glow line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.4) 30%, rgba(167,139,250,0.4) 70%, transparent)',
      }} />

      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: '1.75rem', maxWidth: '560px' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
            The Cost of Waiting
          </p>
          <h2 style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 800,
            color: '#F5F0EC',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '0.875rem',
          }}>
            Enter your numbers. See exactly what inaction is costing you.
          </h2>
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '0.9375rem',
            color: '#b8b6b3',
            lineHeight: 1.75,
          }}>
            Adjust the sliders to match your business. The estimates update instantly. Click any cost row to see the assumption behind the number.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2.5rem',
          alignItems: 'start',
        }} className="lg:grid-cols-2">

          {/* LEFT: Sliders */}
          <div style={{
            backgroundColor: '#111111',
            border: '1px solid #2A2A2A',
            borderRadius: '0.75rem',
            padding: '1.5rem',
          }}>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.625rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(167,139,250,0.5)',
              marginBottom: '1.25rem',
            }}>
              Your Business: Adjust to Match
            </p>

            <Slider
              label="Missed calls per week"
              sublabel="calls that go unanswered"
              value={missedCallsPerWeek}
              min={1}
              max={30}
              step={1}
              unit=" calls"
              onChange={setMissedCallsPerWeek}
            />
            <Slider
              label="Average service value"
              sublabel="per appointment"
              value={avgServiceValue}
              min={50}
              max={500}
              step={10}
              unit="$"
              onChange={setAvgServiceValue}
            />
            <Slider
              label="Weekly appointments"
              sublabel="total booked per week"
              value={weeklyAppointments}
              min={5}
              max={80}
              step={1}
              unit=" appts"
              onChange={setWeeklyAppointments}
            />
            <Slider
              label="No-show rate"
              sublabel="% of bookings that don't show"
              value={noShowRate}
              min={5}
              max={40}
              step={1}
              unit="%"
              onChange={setNoShowRate}
            />
            <Slider
              label="Lead conversion rate"
              sublabel="% of cold leads that would book with follow-up"
              value={conversionRate}
              min={10}
              max={60}
              step={5}
              unit="%"
              onChange={setConversionRate}
            />

            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.6875rem',
              color: 'rgba(245,240,235,0.2)',
              lineHeight: 1.6,
              marginTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              paddingTop: '1rem',
            }}>
              These are conservative estimates based on industry averages. A Revenue Audit gives you the precise numbers specific to your business, your market, and your gaps.
            </p>
          </div>

          {/* RIGHT: Results */}
          <div>
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.625rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(167,139,250,0.5)',
              marginBottom: '1.75rem',
            }}>
              Estimated Monthly Revenue Loss
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <CostPill
                label="Missed Calls"
                cost={costs.missedCallLoss}
                assumption={`Based on ${Math.round(missedCallsPerWeek * 4.33)} missed calls/month x 40% booking rate x $${avgServiceValue} avg service value.`}
              />
              <CostPill
                label="No Follow-Up"
                cost={costs.followUpLoss}
                assumption={`Based on 50% of monthly appointments generating a cold lead, with ${conversionRate}% converting with proper follow-up at $${avgServiceValue} per booking.`}
              />
              <CostPill
                label="No-Shows"
                cost={costs.noShowLoss}
                assumption={`Based on ${noShowRate}% no-show rate x ${Math.round(weeklyAppointments * 4.33)} monthly appointments x $${avgServiceValue} per appointment.`}
              />
              <CostPill
                label="Weak Reviews"
                cost={costs.reviewLoss}
                assumption={`Based on 1 missed review request per 3 appointments. 15% of those would have returned or referred a new client worth $${avgServiceValue}.`}
              />
              <CostPill
                label="Inconsistent Marketing"
                cost={costs.marketingLoss}
                assumption={`Based on 10% of your monthly client base rebooking with a single re-engagement message at $${avgServiceValue} per visit.`}
              />
            </div>

            {/* Total */}
            <div style={{
              backgroundColor: 'rgba(167,139,250,0.06)',
              border: '1px solid rgba(167,139,250,0.25)',
              borderRadius: '0.75rem',
              padding: '1.5rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem',
            }}>
              <div>
                <p style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '0.625rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(167,139,250,0.6)',
                  marginBottom: '0.25rem',
                }}>
                  Total estimated monthly loss
                </p>
                <p style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                  fontWeight: 800,
                  color: '#F5F0EC',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  transition: 'all 0.3s ease',
                }}>
                  {fmt(costs.total)}
                </p>
                <p style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '0.6875rem',
                  color: 'rgba(245,240,235,0.3)',
                  marginTop: '0.25rem',
                }}>
                  per month, conservative estimate
                </p>
              </div>
              <div style={{
                fontFamily: "'Nicholas', serif",
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 700,
                color: 'rgba(167,139,250,0.2)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textAlign: 'right',
              }}>
                {fmt(costs.total * 12)}<br />
                <span style={{ fontSize: '0.5em', color: 'rgba(167,139,250,0.3)', letterSpacing: '0.05em', fontFamily: "'Sora', sans-serif", fontWeight: 400 }}>
                  / year
                </span>
              </div>
            </div>

            {/* Contextual framing */}
            <p style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '0.9375rem',
              color: '#A78BFA',
              lineHeight: 1.75,
              marginBottom: '1.5rem',
              fontStyle: 'italic',
            }}>
              At ${'{'}fmt(costs.total){'}'}/month in preventable losses, your revenue leak is larger than the cost of the full automation stack.
            </p>

            {/* Email capture */}
            <div style={{
              background: 'rgba(167,139,250,0.04)',
              border: '1px solid rgba(167,139,250,0.2)',
              borderRadius: '10px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#c4c4c4', lineHeight: 1.7, marginBottom: '1rem' }}>
                Want a copy of your results? Enter your email and we'll send your personalized revenue leak report.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const emailInput = form.elements.namedItem('calc_email') as HTMLInputElement;
                  const email = emailInput?.value;
                  if (!email) return;

                  // Fire analytics events on calculator completion
                  if (typeof window !== 'undefined') {
                    const annualLeak = Math.round(costs.total * 12);
                    if (typeof (window as any).fbq === 'function') {
                      (window as any).fbq('track', 'Lead', {
                        content_name: 'Revenue Calculator',
                        value: annualLeak,
                        currency: 'USD',
                      });
                    }
                    if (typeof (window as any).gtag === 'function') {
                      (window as any).gtag('event', 'calculator_complete', {
                        event_category: 'engagement',
                        event_label: 'revenue_calculator',
                        value: annualLeak,
                      });
                    }
                  }

                  fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email,
                      source: 'revenue_calculator',
                      calculatorResults: {
                        total: costs.total,
                        missedCalls: costs.missedCallLoss,
                        noShows: costs.noShowLoss,
                        followUp: costs.followUpLoss,
                        reviews: costs.reviewLoss,
                        marketing: costs.marketingLoss,
                      },
                    }),
                  }).catch(() => {});
                  emailInput.value = '';
                  emailInput.placeholder = 'Report sent!';
                  emailInput.disabled = true;
                  (form.querySelector('button') as HTMLButtonElement).disabled = true;
                }}
                style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' as const }}
              >
                <input
                  type="email"
                  name="calc_email"
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    minWidth: '180px',
                    padding: '0.75rem 1rem',
                    background: 'rgba(10,8,20,0.8)',
                    border: '1px solid rgba(167,139,250,0.25)',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: '#A78BFA',
                    color: '#0A0A0A',
                    border: 'none',
                    borderRadius: '6px',
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap' as const,
                  }}
                >
                  Send My Report
                </button>
              </form>
            </div>

            {/* CTA */}
            <div>
              <p style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '0.9375rem',
                color: '#b8b6b3',
                lineHeight: 1.75,
                marginBottom: '1.25rem',
              }}>
                Start with a free 30-minute intro call. If we're a fit, a Revenue Audit gives you the real numbers specific to your business, your market, and your gaps.
              </p>
              <a
                href="/book"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  backgroundColor: '#A78BFA',
                  color: '#0A0A0A',
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  padding: '0.9375rem 2rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#9370e8')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#A78BFA')}
              >
                Get My Real Numbers, Free
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom glow line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.4) 30%, rgba(167,139,250,0.4) 70%, transparent)',
      }} />
    </section>
  );
}





