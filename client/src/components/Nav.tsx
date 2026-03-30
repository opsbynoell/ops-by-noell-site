/*
 * OPS BY NOELL — Navigation (NeuraFlas Design System)
 * - nav-blur: rgba(1,5,9,0.7) backdrop-filter blur(20px)
 * - Sora font, accent #A78BFA
 * - Active: gradient underline
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Results', href: '/case-study' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const LOGO_URL = '/logo.svg';

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
          background: scrolled ? 'rgba(1,5,9,0.88)' : 'rgba(1,5,9,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(167,139,250,0.15)' : '1px solid rgba(167,139,250,0.08)',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <img
              src={LOGO_URL}
              alt="Ops by Noell"
              style={{ width: '160px', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }} className="hidden md:flex">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#ffffff' : 'rgba(160,168,184,0.85)',
                    textDecoration: 'none',
                    padding: '0.5rem 0.875rem',
                    borderRadius: '0.375rem',
                    backgroundColor: 'transparent',
                    position: 'relative',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(160,168,184,0.85)';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0.875rem',
                      right: '0.875rem',
                      height: '2px',
                      background: 'linear-gradient(90deg, #A78BFA, #C4B5FD)',
                      borderRadius: '99px',
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hidden md:flex">
            <a href="/book" className="btn-gradient" style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
              Book Free Call
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: '#ffffff', padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}
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
            backgroundColor: 'rgba(1,5,9,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            borderTop: '1px solid rgba(167,139,250,0.15)',
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
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '1.125rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#ffffff' : 'rgba(160,168,184,0.85)',
                    textDecoration: 'none',
                    padding: '0.875rem 1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: isActive ? 'rgba(167,139,250,0.1)' : 'transparent',
                    borderLeft: isActive ? '3px solid #A78BFA' : '3px solid transparent',
                    transition: 'background 0.15s ease',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a href="/book" className="btn-gradient" style={{ display: 'flex', justifyContent: 'center', fontWeight: 600 }}>
              Book Free Call
            </a>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(167,139,250,0.12)' }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.75rem', color: 'rgba(160,168,184,0.6)', letterSpacing: '0.04em' }}>
              Based in Orange County. Built for businesses everywhere.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
