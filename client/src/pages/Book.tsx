/*
 * OPS BY NOELL — Book a Free Audit Page
 * Design: Quiet Editorial Luxury
 * Sections: Hero, What to Expect, Calendly Placeholder, FAQ-style reassurances
 */

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock, FileSearch, TrendingDown, Calculator, MessageSquare, Shield } from 'lucide-react';
import RevenueCalculator from '@/components/RevenueCalculator';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useFadeIn } from '@/hooks/useFadeIn';
import { trpc } from '@/lib/trpc';

const STONE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663120940829/n7rBKSsjtvarmxAHpVkZmb/hero-light-motion-m2RtUgSKb9cHxo2CrwfdUd.webp';

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

const expectations = [
  {
    icon: Clock,
    title: '15 minutes',
    detail: 'Video or phone, your choice. Relaxed, conversational, no slides or sales deck.',
  },
  {
    icon: MessageSquare,
    title: 'We learn about your business',
    detail: 'Tell us what you do, who you serve, and where things feel broken. We listen first.',
  },
  {
    icon: FileSearch,
    title: 'You learn about us',
    detail: 'We\'ll explain exactly how we work, what we build, and what results look like for businesses like yours.',
  },
  {
    icon: TrendingDown,
    title: 'We spot the obvious gaps',
    detail: 'Even in 15 minutes, we can usually identify 2–3 places where automation would immediately recover revenue or reduce manual work.',
  },
  {
    icon: Calculator,
    title: 'Clear next step',
    detail: 'If we\'re a fit, we\'ll recommend a paid Revenue Audit to map your full operation and design your system.',
  },
  {
    icon: Shield,
    title: 'Zero pressure',
    detail: 'This is a conversation, not a pitch. You leave with clarity regardless of what you decide.',
  },
];

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => setStatus('success'),
    onError: () => setStatus('error'),
  });

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    else if (!/^[\d\s\-\(\)\+]{7,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number.';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('submitting');
    submitContact.mutate({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(), message: form.message.trim() });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(20,20,20,0.6)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#2A2A2A',
    borderRadius: '0.5rem',
    padding: '0.875rem 1rem',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9375rem',
    color: '#F5F0EB',
    outline: 'none',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
  };

  if (status === 'success') {
    return (
      <div style={{
        backgroundColor: 'rgba(167,139,250,0.08)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(167,139,250,0.3)',
        borderRadius: '1rem',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✓</div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.375rem', fontWeight: 700, color: '#F5F0EB', marginBottom: '0.75rem' }}>
          Message received.
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: '#8A8480', lineHeight: 1.7 }}>
          We'll reply to <span style={{ color: '#A78BFA' }}>{form.email}</span> within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Name */}
      <div>
        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#C8C0B8', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
          Name
        </label>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          onFocus={e => (e.target.style.borderColor = '#A78BFA')}
          onBlur={e => (e.target.style.borderColor = errors.name ? '#FF6B6B' : '#2A2A2A')}
          style={{ ...inputStyle, borderColor: errors.name ? '#FF6B6B' : '#2A2A2A' }}
        />
        {errors.name && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#FF6B6B', marginTop: '0.375rem' }}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#C8C0B8', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
          Email
        </label>
        <input
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          onFocus={e => (e.target.style.borderColor = '#A78BFA')}
          onBlur={e => (e.target.style.borderColor = errors.email ? '#FF6B6B' : '#2A2A2A')}
          style={{ ...inputStyle, borderColor: errors.email ? '#FF6B6B' : '#2A2A2A' }}
        />
        {errors.email && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#FF6B6B', marginTop: '0.375rem' }}>{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#C8C0B8', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="(949) 555-0100"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          onFocus={e => (e.target.style.borderColor = '#A78BFA')}
          onBlur={e => (e.target.style.borderColor = errors.phone ? '#FF6B6B' : '#2A2A2A')}
          style={{ ...inputStyle, borderColor: errors.phone ? '#FF6B6B' : '#2A2A2A' }}
        />
        {errors.phone && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#FF6B6B', marginTop: '0.375rem' }}>{errors.phone}</p>}
      </div>

      {/* Message */}
      <div>
        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', fontWeight: 600, color: '#C8C0B8', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
          Message
        </label>
        <textarea
          placeholder="Tell us about your business and what you're trying to solve..."
          rows={5}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          onFocus={e => (e.target.style.borderColor = '#A78BFA')}
          onBlur={e => (e.target.style.borderColor = errors.message ? '#FF6B6B' : '#2A2A2A')}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '120px', borderColor: errors.message ? '#FF6B6B' : '#2A2A2A' }}
        />
        {errors.message && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#FF6B6B', marginTop: '0.375rem' }}>{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#FF6B6B', textAlign: 'center' }}>
          Something went wrong. Please try again or email us directly at hello@opsbynoell.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          backgroundColor: status === 'submitting' ? 'rgba(167,139,250,0.5)' : '#A78BFA',
          color: '#0A0A0A',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.9375rem',
          fontWeight: 700,
          padding: '0.9375rem 2rem',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          letterSpacing: '-0.01em',
          transition: 'background-color 0.15s ease',
          width: '100%',
        }}
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
        {status !== 'submitting' && <ArrowRight size={15} />}
      </button>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.6875rem', color: '#6A6460', textAlign: 'center', lineHeight: 1.6, marginTop: '0.5rem' }}>
        By submitting this form, you agree to receive SMS and email communications from Ops by Noell.
        Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance.
        View our{' '}
        <a href="/privacy-policy" style={{ color: '#A78BFA', textDecoration: 'underline' }}>Privacy Policy</a>
        {' '}and{' '}
        <a href="/terms" style={{ color: '#A78BFA', textDecoration: 'underline' }}>Terms of Service</a>.
      </p>
    </form>
  );
}

function OptInForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    businessType: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: () => setStatus('success'),
    onError: () => setStatus('error'),
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    else if (!/^[\d\s\-\(\)\+]{7,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.businessType.trim()) e.businessType = 'Business type is required.';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('submitting');
    submitLead.mutate({
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email.trim(),
      businessType: form.businessType.trim(),
      phone: form.phone.trim(),
      page: '/book-opt-in-form',
    });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(20,20,20,0.6)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#2A2A2A',
    borderRadius: '0.5rem',
    padding: '0.875rem 1rem',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9375rem',
    color: '#F5F0EB',
    outline: 'none',
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: '#C8C0B8',
    letterSpacing: '0.04em',
    display: 'block',
    marginBottom: '0.5rem',
  };

  // Thank-you modal rendered on top of the form
  const ThankYouModal = status === 'success' ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Submission confirmed"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeInOverlay 0.25s ease-out',
      }}
      onClick={() => setStatus('idle')}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          backgroundColor: '#111111',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'rgba(167,139,250,0.35)',
          borderRadius: '1.25rem',
          padding: '3rem 2.5rem',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          animation: 'slideUpModal 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setStatus('idle')}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#6A6460',
            cursor: 'pointer',
            fontSize: '1.25rem',
            lineHeight: 1,
            padding: '0.25rem',
          }}
        >
          ✕
        </button>

        {/* Checkmark icon */}
        <div style={{
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          backgroundColor: 'rgba(167,139,250,0.12)',
          border: '2px solid rgba(167,139,250,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '1.75rem',
        }}>
          ✓
        </div>

        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.625rem',
          fontWeight: 800,
          color: '#F5F0EB',
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
        }}>
          You're all set, {form.firstName}!
        </h3>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.9375rem',
          color: '#8A8480',
          lineHeight: 1.75,
          marginBottom: '0.5rem',
        }}>
          Thank you for reaching out. Nikki or James will be in touch with you shortly at:
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.9375rem',
          color: '#A78BFA',
          fontWeight: 600,
          marginBottom: '2rem',
        }}>
          {form.email}{form.phone ? ` · ${form.phone}` : ''}
        </p>

        <button
          onClick={() => setStatus('idle')}
          style={{
            backgroundColor: '#A78BFA',
            color: '#0A0A0A',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9375rem',
            fontWeight: 700,
            padding: '0.875rem 2rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            letterSpacing: '-0.01em',
          }}
        >
          Done
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      {ThankYouModal}
      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    <section className="section-pad" style={{ borderTop: '1px solid #2A2A2A' }}>
      <div className="container">
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <FadeItem delay={0}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Stay Connected</p>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: '#F5F0EB',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}>
                Get updates from Ops by Noell
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', color: '#8A8480', lineHeight: 1.75 }}>
                Leave your details and we'll reach out with insights, offers, and automation tips tailored to your business.
              </p>
            </div>
          </FadeItem>

          <FadeItem delay={0.1}>
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* First Name + Last Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input
                    type="text"
                    placeholder="Nikki"
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = '#A78BFA')}
                    onBlur={e => (e.target.style.borderColor = errors.firstName ? '#FF6B6B' : '#2A2A2A')}
                    style={{ ...inputStyle, borderColor: errors.firstName ? '#FF6B6B' : '#2A2A2A' }}
                  />
                  {errors.firstName && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#FF6B6B', marginTop: '0.375rem' }}>{errors.firstName}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input
                    type="text"
                    placeholder="Noell"
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = '#A78BFA')}
                    onBlur={e => (e.target.style.borderColor = errors.lastName ? '#FF6B6B' : '#2A2A2A')}
                    style={{ ...inputStyle, borderColor: errors.lastName ? '#FF6B6B' : '#2A2A2A' }}
                  />
                  {errors.lastName && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#FF6B6B', marginTop: '0.375rem' }}>{errors.lastName}</p>}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="(949) 555-0100"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = '#A78BFA')}
                  onBlur={e => (e.target.style.borderColor = errors.phone ? '#FF6B6B' : '#2A2A2A')}
                  style={{ ...inputStyle, borderColor: errors.phone ? '#FF6B6B' : '#2A2A2A' }}
                />
                {errors.phone && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#FF6B6B', marginTop: '0.375rem' }}>{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = '#A78BFA')}
                  onBlur={e => (e.target.style.borderColor = errors.email ? '#FF6B6B' : '#2A2A2A')}
                  style={{ ...inputStyle, borderColor: errors.email ? '#FF6B6B' : '#2A2A2A' }}
                />
                {errors.email && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#FF6B6B', marginTop: '0.375rem' }}>{errors.email}</p>}
              </div>

              {/* Business Type */}
              <div>
                <label style={labelStyle}>Business Type</label>
                <input
                  type="text"
                  placeholder="e.g. Med Spa, Dental Practice, Salon..."
                  value={form.businessType}
                  onChange={e => setForm(f => ({ ...f, businessType: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = '#A78BFA')}
                  onBlur={e => (e.target.style.borderColor = errors.businessType ? '#FF6B6B' : '#2A2A2A')}
                  style={{ ...inputStyle, borderColor: errors.businessType ? '#FF6B6B' : '#2A2A2A' }}
                />
                {errors.businessType && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#FF6B6B', marginTop: '0.375rem' }}>{errors.businessType}</p>}
              </div>

              {status === 'error' && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#FF6B6B', textAlign: 'center' }}>
                  Something went wrong. Please try again or email us at hello@opsbynoell.com.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  backgroundColor: status === 'submitting' ? 'rgba(167,139,250,0.5)' : '#A78BFA',
                  color: '#0A0A0A',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  padding: '0.9375rem 2rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  letterSpacing: '-0.01em',
                  transition: 'background-color 0.15s ease',
                  width: '100%',
                }}
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit'}
                {status !== 'submitting' && <ArrowRight size={15} />}
              </button>
              {/* SMS Disclaimer */}
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.6875rem',
                color: '#6A6460',
                marginTop: '0.75rem',
                lineHeight: 1.6,
                textAlign: 'center',
              }}>
                By submitting this form, you agree to receive SMS and email communications from Ops by Noell.
                Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for assistance.
                View our{' '}
                <a href="/privacy-policy" style={{ color: '#A78BFA', textDecoration: 'underline' }}>Privacy Policy</a>
                {' '}and{' '}
                <a href="/terms" style={{ color: '#A78BFA', textDecoration: 'underline' }}>Terms of Service</a>.
              </p>
            </form>
          </FadeItem>
        </div>
      </div>
    </section>
    </>
  );
}

export default function Book() {
  const bookingPageVisit = trpc.notifications.bookingPageVisit.useMutation();
  const bookingIntent = trpc.notifications.bookingIntent.useMutation();
  const visitFired = useRef(false);

  // Fire page-visit notification once on mount
  useEffect(() => {
    if (visitFired.current) return;
    visitFired.current = true;
    bookingPageVisit.mutate({
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inject GHL form embed script once on mount
  useEffect(() => {
    const scriptId = 'ghl-form-embed-script';
    if (document.getElementById(scriptId)) return;
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, []);

  const handleBookingCTA = (source: string) => {
    bookingIntent.mutate({ source, page: '/book' });
  };

  return (
    <div style={{ backgroundColor: 'transparent', minHeight: '100vh' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section style={{
        paddingTop: '110px',
        paddingBottom: '3rem',
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          backgroundImage: `url(${STONE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, #0A0A0A 60%, transparent 100%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Free 15-Min Intro Call</p>
          </FadeItem>
          <FadeItem delay={0.1}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              color: '#F5F0EB',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: '680px',
              marginBottom: '1.5rem',
            }}>
              Let's talk. 15 minutes. No pitch. No pressure.
            </h1>
          </FadeItem>
          <FadeItem delay={0.2}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.0625rem',
              color: '#C8C0B8',
              lineHeight: 1.75,
              maxWidth: '520px',
            }}>
              Book a free 15-minute intro call with Nikki. We'll learn about your business, show you where automation can make an immediate difference, and tell you exactly what we'd build. If it's a fit, we'll recommend a Revenue Audit as the next step. If it's not, we'll tell you that too.
            </p>
          </FadeItem>
        </div>
      </section>

      {/* ─── INTERACTIVE REVENUE CALCULATOR ─── */}
      <RevenueCalculator />

      {/* ─── OPT-IN CONTACT FORM ─── */}
      <OptInForm />

      {/* ─── MAIN CONTENT: WHAT TO EXPECT + CALENDLY ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent', paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', alignItems: 'start' }} className="lg:grid-cols-[1fr_1.5fr]">

            {/* Left: What to Expect */}
            <FadeItem delay={0}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>What to Expect</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {expectations.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1.25rem',
                        padding: '1.5rem 0',
                        borderBottom: i < expectations.length - 1 ? '1px solid #FFFFFF' : 'none',
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: 'rgba(20,20,20,0.55)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <item.icon size={16} color="#A78BFA" />
                      </div>
                      <div>
                        <h3 style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: '#F5F0EB',
                          marginBottom: '0.375rem',
                        }}>
                          {item.title}
                        </h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#C8C0B8', lineHeight: 1.7 }}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeItem>

            {/* Right: Calendly Inline Embed */}
            <FadeItem delay={0.15}>
              <div id="booking">
                <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Choose a Time</p>
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/opsbynoell/30-minute-meeting-clone?hide_event_type_details=1&hide_gdpr_banner=1&text_color=ffffff&primary_color=000000"
                  style={{ width: '100%', height: '750px', borderRadius: '0.75rem', overflow: 'hidden' }}
                />
              </div>
            </FadeItem>
          </div>
        </div>
      </section>

      {/* ─── REASSURANCE STRIP ─── */}
      <section style={{ backgroundColor: 'transparent', padding: '3rem 0' }}>
        <div className="container">
          <FadeItem delay={0}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem' }}>
              {[
                { label: '15 minutes', sub: 'That\'s all it takes' },
                { label: 'No obligation', sub: 'Zero pressure, ever' },
                { label: 'Always free', sub: 'The intro call costs nothing' },
                { label: 'Anywhere', sub: 'Based in OC, built for all' },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#F5F0EB',
                    marginBottom: '0.25rem',
                  }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#C8C0B8', letterSpacing: '0.06em' }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </FadeItem>
        </div>
      </section>

      {/* ─── WHO THIS IS FOR ─── */}
      <section className="section-pad" style={{ backgroundColor: 'rgba(26,26,26,0.55)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="lg:grid-cols-2">
            <FadeItem delay={0}>
              <div>
                <p className="eyebrow" style={{ color: '#A78BFA', marginBottom: '1rem' }}>Who This Is For</p>
                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 700,
                  color: '#F5F0EB',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                }}>
                  Appointment-based local service businesses, anywhere.
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: 'rgba(245,237,216,0.7)', lineHeight: 1.8 }}>
                  If you run a business where clients book appointments and you're losing revenue to missed calls, manual processes, no-shows, or inconsistent follow-up, this call is for you.
                </p>
              </div>
            </FadeItem>

            <FadeItem delay={0.15}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem' }}>
                  We work with
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {[
                    'Massage Therapists',
                    'Med Spas',
                    'Chiropractors',
                    'Hair & Beauty Salons',
                    'Wellness Providers',
                    'Coaches & Consultants',
                    'Acupuncturists',
                    'Personal Trainers',
                    'Estheticians',
                    'Physical Therapists',
                  ].map((biz, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#A78BFA', flexShrink: 0 }} />
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: 'rgba(245,237,216,0.7)' }}>{biz}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeItem>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="section-pad" style={{ backgroundColor: 'transparent' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeItem delay={0}>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Still Have Questions?</p>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: '#F5F0EB',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
              maxWidth: '560px',
              margin: '0 auto 1.25rem',
            }}>
              The intro call answers everything. It costs nothing.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: '#C8C0B8',
              lineHeight: 1.75,
              maxWidth: '420px',
              margin: '0 auto 2.5rem',
            }}>
              Reach out directly at{' '}
              <a href="mailto:hello@opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>
                hello@opsbynoell.com
              </a>
              {' '}or book your free intro call above.
            </p>
            <a href="#booking" className="btn-primary" onClick={() => handleBookingCTA('final-cta-choose-a-time')}>
              Choose a Time
              <ArrowRight size={14} />
            </a>
          </FadeItem>
        </div>
      </section>

      {/* ─── GHL CONTACT FORM ─── */}
      <section id="contact-form" className="section-pad" style={{ borderTop: '1px solid #2A2A2A' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <FadeItem delay={0}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <p className="eyebrow" style={{ marginBottom: '1rem' }}>Get in Touch</p>
                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '0',
                }}>
                  Have questions? Let's connect.
                </h2>
              </div>
            </FadeItem>
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/pn741UhuOW16S9Pkklpa"
              style={{ width: '100%', height: '100%', minHeight: '767px', border: 'none', borderRadius: '4px', display: 'block' }}
              id="inline-pn741UhuOW16S9Pkklpa"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Website Contact Form"
              data-height="767"
              data-layout-iframe-id="inline-pn741UhuOW16S9Pkklpa"
              data-form-id="pn741UhuOW16S9Pkklpa"
              title="Website Contact Form"
            />
          </div>
        </div>
      </section>

      <Footer />


      <style>{`
        .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}

