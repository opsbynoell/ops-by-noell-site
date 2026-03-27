/*
 * OPS BY NOELL — Terms of Service Page
 * URL: /terms
 * Last Updated: March 25, 2026
 */

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const SECTION_STYLE: React.CSSProperties = {
  marginBottom: '2.5rem',
};

const H2_STYLE: React.CSSProperties = {
  fontFamily: "'Nicholas', serif",
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#F5F0EC',
  marginBottom: '0.875rem',
  letterSpacing: '-0.02em',
};

const P_STYLE: React.CSSProperties = {
  fontFamily: "'Sora', sans-serif",
  fontSize: '0.9375rem',
  color: '#868583',
  lineHeight: 1.8,
  marginBottom: '0.875rem',
};

const UL_STYLE: React.CSSProperties = {
  fontFamily: "'Sora', sans-serif",
  fontSize: '0.9375rem',
  color: '#868583',
  lineHeight: 1.8,
  paddingLeft: '1.5rem',
  marginBottom: '0.875rem',
};

const CALLOUT_STYLE: React.CSSProperties = {
  fontFamily: "'Sora', sans-serif",
  fontSize: '0.9375rem',
  color: 'rgba(245,240,235,0.8)',
  lineHeight: 1.8,
  backgroundColor: 'rgba(167,139,250,0.06)',
  borderLeft: '3px solid #A78BFA',
  padding: '1rem 1.25rem',
  marginBottom: '1rem',
  borderRadius: '0 6px 6px 0',
};

export default function TermsOfService() {
  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section style={{ backgroundColor: '#0A0A0A', paddingTop: '7rem', paddingBottom: '4rem' }}>
        <div className="container">
          <p className="eyebrow" style={{ color: '#A78BFA', marginBottom: '1rem' }}>Legal</p>
          <h1 style={{
            fontFamily: "'Nicholas', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#F5F0EC',
            lineHeight: 1.1,
            marginBottom: '1rem',
            letterSpacing: '-0.03em',
          }}>
            Terms of Service
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: '0.9375rem', color: '#868583' }}>
            Last updated: March 25, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ paddingTop: '4rem', paddingBottom: '5rem', backgroundColor: '#0A0A0A' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto' }}>

          <div style={SECTION_STYLE}>
            <p style={P_STYLE}>
              These Terms of Service ("Terms") govern your use of the website located at <strong>opsbynoell.com</strong> and any services provided by Ops by Noell ("we," "us," or "our"), an AI automation agency owned and operated by Nicole (Nikki) Noell, based in Mission Viejo, CA. By accessing this website or engaging our services, you agree to be bound by these Terms.
            </p>
            <p style={P_STYLE}>
              If you do not agree to these Terms, please do not use this website or engage our services.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>1. Use of This Website</h2>
            <p style={P_STYLE}>
              You may use this website for lawful purposes only. You agree not to:
            </p>
            <ul style={UL_STYLE}>
              <li>Use the website in any way that violates applicable federal, state, or local laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the website or its underlying systems</li>
              <li>Transmit any unsolicited or unauthorized advertising or promotional material</li>
              <li>Reproduce, duplicate, copy, or resell any part of the website without our express written permission</li>
            </ul>
            <p style={P_STYLE}>
              We reserve the right to terminate or restrict access to this website at our sole discretion, without notice, for any conduct we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>2. Description of Services</h2>
            <p style={P_STYLE}>
              Ops by Noell provides AI automation consulting and done-for-you automation systems for service-based businesses. Our services include, but are not limited to:
            </p>
            <ul style={UL_STYLE}>
              <li>Missed call text-back and AI voice response systems</li>
              <li>Automated appointment booking and reminder workflows</li>
              <li>Lead follow-up and re-engagement sequences</li>
              <li>Review generation and reputation management automation</li>
              <li>Custom AI receptionist and client communication systems</li>
              <li>Full operational back-office automation buildouts</li>
            </ul>
            <p style={P_STYLE}>
              The specific scope of services for each client is defined in a separate service agreement or proposal. These Terms apply to all engagements unless superseded by a signed written agreement.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>3. SMS Messaging Program</h2>
            <p style={P_STYLE}>
              Ops by Noell sends informational and promotional text messages to users who opt in via our website forms at <strong>opsbynoell.com/book</strong> or any other opt-in form on our website.
            </p>
            <p style={CALLOUT_STYLE}>
              By opting in, you agree to receive recurring SMS messages from Ops by Noell related to your inquiry, appointment reminders, follow-up communications, and service updates. Message frequency varies. Message and data rates may apply.
            </p>
            <p style={P_STYLE}>
              <strong>To opt out:</strong> Reply <strong>STOP</strong> at any time to unsubscribe from SMS communications. After opting out, you will receive a single confirmation message and no further messages will be sent.
            </p>
            <p style={P_STYLE}>
              <strong>For help:</strong> Reply <strong>HELP</strong> for assistance, or contact us directly at:
            </p>
            <ul style={UL_STYLE}>
              <li>Email: <a href="mailto:hello@opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>hello@opsbynoell.com</a></li>
              <li>Phone: <a href="tel:+19492429161" style={{ color: '#A78BFA', textDecoration: 'none' }}>(949) 242-9161</a></li>
            </ul>
            <p style={P_STYLE}>
              <strong>Age restriction:</strong> You must be 18 years of age or older to opt in to SMS communications from Ops by Noell.
            </p>
            <p style={P_STYLE}>
              <strong>Carrier disclaimer:</strong> Mobile carriers are not responsible for delayed or undelivered messages.
            </p>
            <p style={P_STYLE}>
              For information on how we handle your phone number and SMS consent data, please review our{' '}
              <a href="/privacy-policy" style={{ color: '#A78BFA', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>4. Payment Terms</h2>
            <p style={P_STYLE}>
              Fees for our services are due at the time of the service agreement unless otherwise specified in writing. By agreeing to our services, you authorize us to collect payment in accordance with the pricing outlined in your service proposal or agreement.
            </p>
            <p style={P_STYLE}>
              All fees are non-refundable unless otherwise stated in your service agreement. If you have questions about pricing or billing, please contact us at <a href="mailto:hello@opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>hello@opsbynoell.com</a> before engaging our services.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>5. No Guarantee of Results</h2>
            <p style={P_STYLE}>
              We design and implement automation systems based on industry best practices and our professional expertise. However, <strong>we do not guarantee specific business outcomes, revenue increases, lead volumes, or conversion rates.</strong>
            </p>
            <p style={P_STYLE}>
              Results will vary depending on factors outside our control, including but not limited to the nature of your business, market conditions, the quality of your existing operations, and how consistently the systems are used. Any case studies, testimonials, or performance examples shared on this website represent past results and are not a guarantee of future performance.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>6. Intellectual Property</h2>
            <p style={P_STYLE}>
              All content on this website, including text, graphics, logos, and design, is the property of Ops by Noell and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this website without our prior written consent.
            </p>
            <p style={P_STYLE}>
              Custom automation systems and workflows built for your business remain your property upon full payment. We retain the right to reference the general nature of our work (without disclosing confidential client details) for marketing and portfolio purposes.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>7. Limitation of Liability</h2>
            <p style={P_STYLE}>
              To the fullest extent permitted by law, Ops by Noell and its owner shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or our services, even if we have been advised of the possibility of such damages.
            </p>
            <p style={P_STYLE}>
              Our total liability to you for any claim arising out of or relating to these Terms or our services shall not exceed the total amount you paid us in the three (3) months preceding the claim.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>8. Disclaimer of Warranties</h2>
            <p style={P_STYLE}>
              This website and our services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>9. Third-Party Links</h2>
            <p style={P_STYLE}>
              This website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>10. Governing Law</h2>
            <p style={P_STYLE}>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Orange County, California.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>11. Changes to These Terms</h2>
            <p style={P_STYLE}>
              We reserve the right to update these Terms at any time. When we do, we will revise the "Last updated" date at the top of this page. Your continued use of this website after any changes constitutes your acceptance of the revised Terms.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>12. Contact Us</h2>
            <p style={P_STYLE}>
              If you have questions about these Terms, please contact us:
            </p>
            <p style={{ ...P_STYLE, marginBottom: 0 }}>
              <strong>Ops by Noell</strong><br />
              Attn: Nicole (Nikki) Noell<br />
              Mission Viejo, CA<br />
              <a href="mailto:hello@opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>hello@opsbynoell.com</a><br />
              <a href="tel:+19492429161" style={{ color: '#A78BFA', textDecoration: 'none' }}>(949) 242-9161</a><br />
              <a href="https://www.opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>www.opsbynoell.com</a>
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
