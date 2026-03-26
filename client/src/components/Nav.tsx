/*
 * OPS BY NOELL — Navigation Component (Dark Theme)
 * - #0A0A0A background — matches site primary background
 * - Dark logo (cream letterforms on black) sits flush
 * - Active nav link: bold weight + gold #A78BFA underline
 * - Permanent 1px bottom border in #2A2A2A
 * - Gold primary CTA, warm cream outlined secondary
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Services', href: '/services' },
  { label: 'Case Study', href: '/case-study' },
  { label: 'Industries', href: '/industries' },
  { label: 'About', href: '/about' },
];

const LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663120940829/n7rBKSsjtvarmxAHpVkZmb/ops-by-noell-logo-new_f7b785e3.png';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? 'rgba(10,10,10,0.88)' : 'rgba(10,10,10,0.72)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #2A2A2A',
          transition: 'background-color 0.2s ease, backdrop-filter 0.2s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          {/* Logo — dark version with cream letterforms on black */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <img
              src={LOGO_URL}
              alt="Ops by Noell"
              style={{ width: '160px', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden md:flex">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#F5F0EB' : '#8A8480',
                    textDecoration: 'none',
                    padding: '0.5rem 0.875rem',
                    borderRadius: '0.375rem',
                    backgroundColor: 'transparent',
                    borderBottom: isActive ? '2px solid #A78BFA' : '2px solid transparent',
                    transition: 'color 0.15s ease, border-color 0.15s ease',
                    marginBottom: '-1px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = '#F5F0EB';
                      (e.currentTarget as HTMLElement).style.borderBottomColor = '#2A2A2A';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = '#8A8480';
                      (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hidden md:flex">
            <a href="/book" className="btn-primary" style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem', fontWeight: 700 }}>
              Book Free Intro Call
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: '#F5F0EB', padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10,10,10,0.92)',
            backdropFilter: 'blur(20px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            borderTop: '1px solid #2A2A2A',
            overflowY: 'auto',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.125rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#F5F0EB' : '#8A8480',
                    textDecoration: 'none',
                    padding: '0.875rem 1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: isActive ? '#141414' : 'transparent',
                    borderLeft: isActive ? '3px solid #A78BFA' : '3px solid transparent',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a href="/book" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', fontWeight: 700 }}>
              Book Free Intro Call
            </a>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #2A2A2A' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: '#8A8480', letterSpacing: '0.04em' }}>
              Based in Orange County. Built for businesses everywhere.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
