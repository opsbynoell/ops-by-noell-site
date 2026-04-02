/*
 * OPS BY NOELL — Navigation v9 (Light Theme)
 * Spec: Sticky white nav, #FFFFFF bg, 1px bottom border #E5E5E5
 * Left: Ops by Noell wordmark Nicholas 700, teal #0CA2A2
 * Center: Nav links Nicholas 600, #555555
 * Right: "Book Free Audit" teal pill button
 * Mobile: hamburger, full-width dropdown
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Nova Support', href: '/nova' },
  { label: 'Results', href: '/case-study' },
  { label: 'Book a Free Audit', href: '/book' },
];

const industries = [
  { label: 'Massage Therapists', href: '/massage-therapist-automation', desc: 'From zero infrastructure to automated' },
  { label: 'Med Spas', href: '/med-spa-automation', desc: 'High-value appointments, zero missed calls' },
  { label: 'Salons', href: '/salon-automation', desc: 'Fill your chair. Keep it full.' },
  { label: 'Dental Offices', href: '/dental-automation', desc: 'Reduce no-shows, automate recall' },
  { label: 'Home Services', href: '/home-services-automation', desc: 'Never miss a job request again' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setIndustriesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isIndustriesActive = industries.some(i => location === i.href);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E5E5',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Wordmark */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span style={{
              fontFamily: "'Nicholas', serif",
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#0CA2A2',
              letterSpacing: '-0.01em',
            }}>
              Ops by Noell
            </span>
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
                    fontFamily: "'Nicholas', serif",
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: isActive ? '#0CA2A2' : '#555555',
                    textDecoration: 'none',
                    padding: '0.5rem 0.875rem',
                    borderRadius: '0.375rem',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#0CA2A2'; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#555555'; }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Industries Dropdown */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIndustriesOpen(!industriesOpen)}
                style={{
                  fontFamily: "'Nicholas', serif",
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: isIndustriesActive ? '#0CA2A2' : '#555555',
                  background: 'none',
                  border: 'none',
                  padding: '0.5rem 0.875rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#0CA2A2'; }}
                onMouseLeave={(e) => { if (!industriesOpen && !isIndustriesActive) (e.currentTarget as HTMLElement).style.color = '#555555'; }}
              >
                Industries
                <ChevronDown size={14} style={{ transition: 'transform 0.2s ease', transform: industriesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>

              {industriesOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '280px',
                  background: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  borderRadius: '12px',
                  padding: '0.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  zIndex: 200,
                }}>
                  {industries.map((item) => {
                    const isItemActive = location === item.href;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        style={{
                          display: 'block',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          background: isItemActive ? 'rgba(12,162,162,0.06)' : 'transparent',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => { if (!isItemActive) (e.currentTarget as HTMLElement).style.background = 'rgba(12,162,162,0.04)'; }}
                        onMouseLeave={(e) => { if (!isItemActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      >
                        <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.875rem', fontWeight: 600, color: isItemActive ? '#0CA2A2' : '#1A1A1A', marginBottom: '0.2rem' }}>
                          {item.label}
                        </div>
                        <div style={{ fontFamily: "'Nicholas', serif", fontSize: '0.75rem', color: '#555555', lineHeight: 1.5 }}>
                          {item.desc}
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: 'flex', alignItems: 'center' }} className="hidden md:flex">
            <a
              href="/book"
              style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#0CA2A2',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                border: '1.5px solid #0CA2A2',
                borderRadius: '6px',
                transition: 'background-color 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(12,162,162,0.06)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
            >
              Book Free Audit
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', color: '#1A1A1A', padding: '0.5rem', borderRadius: '0.375rem', cursor: 'pointer' }}
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
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            borderTop: '1px solid #E5E5E5',
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
                    fontFamily: "'Nicholas', serif",
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: isActive ? '#0CA2A2' : '#1A1A1A',
                    textDecoration: 'none',
                    padding: '0.875rem 1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: isActive ? 'rgba(12,162,162,0.06)' : 'transparent',
                    borderLeft: isActive ? '3px solid #0CA2A2' : '3px solid transparent',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Industries */}
            <button
              onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
              style={{
                fontFamily: "'Nicholas', serif",
                fontSize: '1.125rem',
                fontWeight: 600,
                color: isIndustriesActive ? '#0CA2A2' : '#1A1A1A',
                background: isIndustriesActive ? 'rgba(12,162,162,0.06)' : 'transparent',
                border: 'none',
                borderLeft: isIndustriesActive ? '3px solid #0CA2A2' : '3px solid transparent',
                padding: '0.875rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Industries
              <ChevronDown size={16} style={{ transition: 'transform 0.2s ease', transform: mobileIndustriesOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
            </button>

            {mobileIndustriesOpen && (
              <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {industries.map((item) => {
                  const isItemActive = location === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      style={{
                        fontFamily: "'Nicholas', serif",
                        fontSize: '1rem',
                        fontWeight: isItemActive ? 600 : 400,
                        color: isItemActive ? '#0CA2A2' : '#555555',
                        textDecoration: 'none',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: isItemActive ? 'rgba(12,162,162,0.06)' : 'transparent',
                        borderLeft: isItemActive ? '3px solid #0CA2A2' : '3px solid transparent',
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </nav>

          <div style={{ marginTop: '1.5rem' }}>
            <a
              href="/book"
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontFamily: "'Nicholas', serif",
                fontSize: '1rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: '#0CA2A2',
                padding: '0.875rem 1.5rem',
                borderRadius: '999px',
                textDecoration: 'none',
              }}
            >
              Book Free Audit
            </a>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #E5E5E5' }}>
            <p style={{ fontFamily: "'Nicholas', serif", fontSize: '0.75rem', color: '#AAAAAA', letterSpacing: '0.04em' }}>
              Based in Orange County. Built for businesses everywhere.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
