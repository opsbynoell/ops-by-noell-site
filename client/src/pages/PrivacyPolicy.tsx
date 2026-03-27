/*
 * OPS BY NOELL — Privacy Policy Page
 * URL: /privacy-policy
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

export default function PrivacyPolicy() {
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
            Privacy Policy
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
              Ops by Noell ("we," "us," or "our") is an AI automation agency owned and operated by Nicole (Nikki) Noell, based in Mission Viejo, CA. This Privacy Policy explains how we collect, use, and protect information you provide when visiting <strong>opsbynoell.com</strong> or engaging with our services.
            </p>
            <p style={P_STYLE}>
              By using this website or submitting information through any of our forms, you agree to the practices described in this policy. If you have questions, contact us at <a href="mailto:hello@opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>hello@opsbynoell.com</a>.
            </p>
          </div>

          <div style={{ ...SECTION_STYLE, backgroundColor: 'rgba(167,139,250,0.06)', borderLeft: '3px solid #A78BFA', padding: '1rem 1.25rem', borderRadius: '0 6px 6px 0' }}>
            <p style={{ ...P_STYLE, marginBottom: 0, color: 'rgba(245,240,235,0.9)' }}>
              <strong>We do not share your SMS opt-in data or phone number with third parties for marketing or promotional purposes.</strong>
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>1. What Information We Collect</h2>
            <p style={P_STYLE}>
              We collect personal information that you voluntarily provide through our contact forms, booking forms, newsletter sign-up, and chat widget. This may include:
            </p>
            <ul style={UL_STYLE}>
              <li><strong>Name:</strong> your first name or full name</li>
              <li><strong>Email address:</strong> used to respond to inquiries and send service-related communications</li>
              <li><strong>Phone number:</strong> collected when you opt in to SMS communications or provide it through a booking or contact form</li>
              <li><strong>Business details:</strong> the type of business you operate, your goals, and other details you share through our forms, used to tailor our service recommendations</li>
            </ul>
            <p style={P_STYLE}>
              We do not collect payment card information directly. Any payment processing is handled by third-party processors under their own privacy policies.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>2. How We Use Your Information</h2>
            <p style={P_STYLE}>
              Information you provide is used solely for the following purposes:
            </p>
            <ul style={UL_STYLE}>
              <li>To respond to inquiries submitted through our website or chat widget</li>
              <li>To schedule and confirm discovery calls or consultations</li>
              <li>To send appointment reminders and follow-up communications related to booked services</li>
              <li>To deliver the AI automation services you have engaged us to provide</li>
              <li>To send our newsletter, <em>The Ops Brief</em>, if you have subscribed</li>
              <li>To send service-related SMS and email messages if you have explicitly opted in (see Section 3)</li>
            </ul>
            <p style={P_STYLE}>
              We do not sell, rent, or trade your personal information to any third party for marketing purposes.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>3. SMS Opt-In and Phone Number Use</h2>
            <p style={P_STYLE}>
              If you provide your phone number and consent to receive SMS messages from Ops by Noell, you agree to receive text messages related to your inquiry, appointment reminders, and service updates.
            </p>
            <p style={P_STYLE}>
              Phone numbers collected via opt-in forms are used solely to send the messages the user consented to receive. We do not use your phone number for any other purpose.
            </p>
            <p style={CALLOUT_STYLE}>
              <strong>We do not share your SMS opt-in information or phone number with third parties for marketing purposes.</strong>
            </p>
            <p style={P_STYLE}>
              <strong>SMS consent is collected explicitly and is never shared with third parties.</strong> Your phone number will not be used for any purpose other than the communications you have agreed to receive.
            </p>
            <p style={P_STYLE}>
              You may opt out of SMS communications at any time by replying <strong>STOP</strong> to any message you receive from us. After opting out, you will receive a single confirmation message and no further SMS messages will be sent. Reply <strong>HELP</strong> for assistance. Message and data rates may apply.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>4. Cookies and Tracking Technologies</h2>
            <p style={P_STYLE}>
              Our website uses cookies and similar tracking technologies to improve site performance and understand how visitors interact with our content. This includes:
            </p>
            <ul style={UL_STYLE}>
              <li><strong>Analytics cookies:</strong> we use privacy-focused analytics tools to measure page visits, traffic sources, and general usage patterns. This data is aggregated and does not identify individual visitors.</li>
              <li><strong>Functional cookies:</strong> used to remember your preferences and maintain session state (for example, keeping the chat widget open between pages).</li>
            </ul>
            <p style={P_STYLE}>
              You can disable cookies in your browser settings, though some features of the website may not function as intended if you do so.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>5. Data Security</h2>
            <p style={P_STYLE}>
              We use reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include secure data transmission (HTTPS), access controls, and working only with reputable third-party service providers.
            </p>
            <p style={P_STYLE}>
              While we take data security seriously, no method of transmission over the internet or method of electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to protecting your information to the best of our ability.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>6. Your Rights</h2>
            <p style={P_STYLE}>
              You have the right to access, update, or request deletion of the personal information we hold about you. To exercise any of these rights, please email us at <a href="mailto:hello@opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>hello@opsbynoell.com</a> with your request. We will respond within 30 days.
            </p>
            <ul style={UL_STYLE}>
              <li><strong>Access:</strong> request a copy of the information we have on file for you</li>
              <li><strong>Update:</strong> ask us to correct any inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> request that we delete your personal information from our records</li>
              <li><strong>Opt-out:</strong> unsubscribe from email communications at any time using the unsubscribe link in any email, or reply STOP to any SMS message</li>
            </ul>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>7. Data Retention</h2>
            <p style={P_STYLE}>
              We retain your personal information for as long as necessary to fulfill the purposes described in this policy, or as required by law. If you would like us to delete your information, please contact us at <a href="mailto:hello@opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>hello@opsbynoell.com</a> and we will respond within 30 days.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>8. Third-Party Services</h2>
            <p style={P_STYLE}>
              We use third-party tools to operate our business, including scheduling software, email delivery services, and automation platforms. These services may process your information on our behalf under their own privacy policies. We only share the minimum information necessary for these services to function.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>9. Children's Privacy</h2>
            <p style={P_STYLE}>
              Our website and services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>10. Changes to This Policy</h2>
            <p style={P_STYLE}>
              We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.
            </p>
          </div>

          <div style={SECTION_STYLE}>
            <h2 style={H2_STYLE}>11. Contact Us</h2>
            <p style={P_STYLE}>
              If you have questions or concerns about this Privacy Policy or how your information is handled, please contact us:
            </p>
            <p style={{ ...P_STYLE, marginBottom: 0 }}>
              <strong>Ops by Noell</strong><br />
              Attn: Nicole (Nikki) Noell<br />
              Mission Viejo, CA<br />
              <a href="mailto:hello@opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>hello@opsbynoell.com</a><br />
              <a href="https://www.opsbynoell.com" style={{ color: '#A78BFA', textDecoration: 'none' }}>www.opsbynoell.com</a>
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
