/*
 * OPS BY NOELL — Footer Component (Dark Theme)
 * - #0A0A0A background, #2A2A2A border
 * - Warm cream text #F5F0EB, muted #8A8480
 * - Gold #A78BFA accents
 */

import { Link } from 'wouter';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663120940829/n7rBKSsjtvarmxAHpVkZmb/ops-by-noell-logo-new_f7b785e3.png';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid #2A2A2A' }}>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="lg:grid-cols-3">
          {/* Logo + tagline */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <img
                src={LOGO_URL}
                alt="Ops by Noell"
                style={{ width: '140px', height: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#B0A8A0', lineHeight: 1.75, maxWidth: '260px', marginBottom: '1.5rem' }}>
              AI automation systems for local service businesses. Done for you. Running 24/7.
            </p>
            {/* Social icons — replace # with real URLs when profiles are live */}
            <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Facebook, label: 'Facebook', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={`${label} (coming soon)`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid #2A2A2A',
                    color: '#8A8480',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s ease, color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#A78BFA';
                    (e.currentTarget as HTMLElement).style.color = '#A78BFA';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A';
                    (e.currentTarget as HTMLElement).style.color = '#8A8480';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
              {/* TikTok — lucide doesn't have TikTok, using SVG */}
              <a
                href="#"
                aria-label="TikTok"
                title="TikTok (coming soon)"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid #2A2A2A',
                  color: '#8A8480',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#A78BFA';
                  (e.currentTarget as HTMLElement).style.color = '#A78BFA';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#2A2A2A';
                  (e.currentTarget as HTMLElement).style.color = '#8A8480';
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Navigation</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'Solutions', href: '/solutions' },
                { label: 'Services', href: '/services' },
                { label: 'Case Study', href: '/case-study' },
                { label: 'About', href: '/about' },
                { label: 'Industries We Serve', href: '/industries' },
                { label: 'Book a Free Intro Call', href: '/book' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: '#B0A8A0',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5F0EB'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#B0A8A0'; }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact + CTA */}
          <div>
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#B0A8A0' }}>
                Mission Viejo, CA
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#B0A8A0' }}>
                Based in Orange County. Built for businesses everywhere.
              </p>
              <a
                href="mailto:hello@opsbynoell.com"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#A78BFA', textDecoration: 'none', transition: 'opacity 0.15s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                hello@opsbynoell.com
              </a>
              <a
                href="tel:+19492429161"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#A78BFA', textDecoration: 'none', transition: 'opacity 0.15s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                (949) 242-9161
              </a>
            </div>
            <a href="/book" className="btn-primary" style={{ fontSize: '0.8125rem', padding: '0.75rem 1.5rem' }}>
              Book Free Intro Call
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#2A2A2A', margin: '2.5rem 0 1.75rem' }} />

        {/* Copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="sm:flex-row sm:justify-between sm:items-center">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#B0A8A0' }}>
            © 2026 Ops by Noell. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/privacy-policy"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#8A8480', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5F0EB'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8A8480'; }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8125rem', color: '#8A8480', textDecoration: 'none', transition: 'color 0.15s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F5F0EB'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8A8480'; }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
