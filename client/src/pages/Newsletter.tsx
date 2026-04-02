/*
 * OPS BY NOELL — Newsletter Page
 * Design: Dark theme, quiet editorial luxury
 * Simple email capture with clear value prop
 */

import { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';
import { trpc } from '@/lib/trpc';

function FadeItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useFadeIn(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease-out ${delay}s, transform 0.65s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const topics = [
  'Real automation case studies from local service businesses',
  'The exact systems we build and how they work',
  'Pricing breakdowns and ROI math you can apply to your own business',
  'Platform and tool updates that matter for small business owners',
  'Honest takes on what AI can and cannot do for local businesses right now',
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setAlreadySubscribed(data.alreadySubscribed);
      setStatus('success');
    },
    onError: () => {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setStatus('submitting');
    subscribeMutation.mutate({
      email: email.trim(),
      source: window.location.pathname,
    });
  };

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: '110px', paddingBottom: '3rem' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>The Ops Brief</p>
          </FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{
              fontFamily: "'Nicholas', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              color: '#555555',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}>
              Automation insights for local service businesses.{' '}
              <span style={{ color: '#0CA2A2' }}>No fluff.</span>
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{
              fontFamily: "'Nicholas', serif",
              fontSize: '1.0625rem',
              color: '#555555',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
            }}>
              A short, practical newsletter from Nikki at Ops by Noell. Sent when there's something worth saying, not on a schedule for the sake of it.
            </p>
          </FadeItem>

          {/* Topics */}
          <FadeItem delay={0.3}>
            <div style={{ marginBottom: '3rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>What you'll get</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {topics.map((topic, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                    <CheckCircle size={16} color="#0CA2A2" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#555555', lineHeight: 1.6 }}>
                      {topic}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeItem>

          {/* Form */}
          <FadeItem delay={0.4}>
            {status === 'success' ? (
              <div style={{
                backgroundColor: 'rgba(12,162,162,0.08)',
                border: 'none',
                padding: '2rem',
                textAlign: 'center',
              }}>
                <CheckCircle size={32} color="#0CA2A2" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#555555',
                  marginBottom: '0.5rem',
                }}>
                  {alreadySubscribed ? 'Already subscribed.' : "You're in."}
                </h3>
                <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.9375rem', color: '#555555', lineHeight: 1.6 }}>
                  {alreadySubscribed
                    ? 'That email is already on the list. You\'ll hear from us when there\'s something worth reading.'
                    : "Check your inbox. A welcome email is on its way. We'll be in touch when there's something worth reading."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(20,20,20,0.6)',
                        border: `1px solid ${error ? '#EF4444' : '#2A2A2A'}`,
                        color: '#555555',
                        fontFamily: "'Nicholas', serif",
                        fontSize: '1rem',
                        padding: '0.875rem 1.25rem',
                        outline: 'none',
                        transition: 'border-color 0.15s ease',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#0CA2A2'; }}
                      onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = error ? '#EF4444' : '#2A2A2A'; }}
                    />
                    {error && (
                      <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.8125rem', color: '#EF4444', marginTop: '0.375rem' }}>
                        {error}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary"
                    style={{ opacity: status === 'submitting' ? 0.7 : 1, cursor: status === 'submitting' ? 'not-allowed' : 'pointer' }}
                  >
                    {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                    {status !== 'submitting' && <ArrowRight size={14} />}
                  </button>
                </div>
                <p style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: '0.8125rem',
                  color: '#555555',
                  marginTop: '0.875rem',
                  lineHeight: 1.5,
                }}>
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
                <p style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: '0.75rem',
                  color: '#555555',
                  marginTop: '0.5rem',
                  lineHeight: 1.6,
                  textAlign: 'center',
                }}>
                  By subscribing, you agree to our{' '}
                  <a href="/privacy-policy" style={{ color: '#0CA2A2', textDecoration: 'underline' }}>Privacy Policy</a>
                  {' '}and{' '}
                  <a href="/terms" style={{ color: '#0CA2A2', textDecoration: 'underline' }}>Terms of Service</a>.
                </p>
              </form>
            )}
          </FadeItem>
        </div>
      </section>

      <Footer />
    </div>
  );
}
