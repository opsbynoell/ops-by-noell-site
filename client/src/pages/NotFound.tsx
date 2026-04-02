import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 1.5rem 6rem',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '560px' }}>
          {/* Large 404 */}
          <p style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(6rem, 20vw, 12rem)',
            fontWeight: 800,
            color: 'rgba(12,162,162,0.12)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            marginBottom: '-1rem',
            userSelect: 'none',
          }}>
            404
          </p>

          <h1 style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: '#555555',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
          }}>
            This page doesn't exist.
          </h1>

          <p style={{
            fontFamily: "'Nicholas', serif",
            fontSize: '1rem',
            color: '#555555',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
          }}>
            The page you're looking for may have been moved or deleted. Let's get you back on track.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/">
              <a style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#0CA2A2',
                color: '#1A1A1A',
                fontFamily: "'Nicholas', serif",
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '0.875rem 1.75rem',
                borderRadius: '0.375rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}>
                <Home size={14} />
                Go Home
              </a>
            </Link>
            <Link href="/book">
              <a style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'transparent',
                color: '#555555',
                fontFamily: "'Nicholas', serif",
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '0.875rem 1.75rem',
                borderRadius: '0.375rem',
                border: '1px solid rgba(255,255,255,0.15)',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}>
                Book Intro Call
                <ArrowRight size={14} />
              </a>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
