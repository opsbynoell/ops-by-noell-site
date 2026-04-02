/*
 * OPS BY NOELL — Revenue Calculator Page
 * Standalone page for the interactive cost-of-inaction calculator
 */

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevenueCalculator from '@/components/RevenueCalculator';

export default function Calculator() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section style={{
        position: 'relative',
        paddingTop: '140px',
        paddingBottom: '2rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: '#FFFFFF',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: "'Nicholas', serif",
            fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#0CA2A2', marginBottom: '1rem',
          }}>
            Revenue Calculator
          </p>
          <h1 style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: '#ffffff',
            lineHeight: 1.1, marginBottom: '1rem',
          }}>
            What are your operational gaps costing you?
          </h1>
          <p style={{
            fontFamily: "'Nicholas', serif",
            fontSize: '1rem', color: '#555555',
            lineHeight: 1.75, maxWidth: '520px', margin: '0 auto',
          }}>
            Adjust the sliders to match your business. See exactly how much revenue slips through the cracks each month.
          </p>
        </div>
      </section>

      <RevenueCalculator />

      <Footer />
    </div>
  );
}
