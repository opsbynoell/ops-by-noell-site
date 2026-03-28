/*
 * OPS BY NOELL — App Router
 * Design: Quiet Editorial Luxury
 * Routes: Home, Services, Case Study, About, Book
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";

// Components
import ChatWidget from "./components/ChatWidget";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import CaseStudy from "./pages/CaseStudy";
import About from "./pages/About";
import Book from "./pages/Book";
import BotAnalytics from "./pages/BotAnalytics";
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import Newsletter from "./pages/Newsletter";
import ChatInbox from "./pages/ChatInbox";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Calculator from "./pages/Calculator";
// Vertical landing pages
import MassageTherapistAutomation from "./pages/MassageTherapistAutomation";
import MedSpaAutomation from "./pages/MedSpaAutomation";
import SalonAutomation from "./pages/SalonAutomation";
import DentalAutomation from "./pages/DentalAutomation";
import HomeServicesAutomation from "./pages/HomeServicesAutomation";
// Dedicated case study pages
import MassageTherapistCaseStudy from "./pages/MassageTherapistCaseStudy";

// SEO meta per page — descriptions kept to 50–160 chars; keywords are page-specific
const pageMeta: Record<string, { title: string; description: string; keywords: string }> = {
  "/": {
    title: "Ops by Noell: AI Automation Systems for Local Businesses",
    description:
      "Done-for-you AI automation for local service businesses. We handle lead capture, booking, follow-up, and reviews, 24/7.",
    keywords:
      "AI automation agency, done-for-you automation, local service business automation, missed call text back, appointment booking automation, lead follow-up automation, AI receptionist, Orange County automation, review generation, no-show reduction, Ops by Noell",
  },
  "/solutions": {
    title: "AI Automation Solutions | Ops by Noell",
    description:
      "Six done-for-you AI systems: missed call text-back, booking automation, review generation, follow-up, AI voice, and marketing. Built and managed for you.",
    keywords:
      "AI automation solutions, missed call text back system, automated appointment booking, review generation automation, lead follow-up sequences, AI voice agent, marketing automation, done-for-you AI systems, local business automation",
  },
  "/services": {
    title: "Pricing & Services | Ops by Noell AI Automation",
    description:
      "Transparent pricing for done-for-you AI automation. Starter, Growth, and Scale packages for local service businesses. Setup included. No tech skills needed.",
    keywords:
      "AI automation pricing, done-for-you automation packages, Starter automation plan, Growth automation plan, Scale automation plan, local business AI services, automation setup fee, monthly automation management",
  },
  "/case-study": {
    title: "Case Study: Massage Therapist Automates Her Business | Ops by Noell",
    description:
      "See how a 25-year massage therapist went from zero digital infrastructure to a fully automated business in two weeks with Ops by Noell.",
    keywords:
      "AI automation case study, massage therapist automation, local business transformation, automated booking system, missed call recovery, Orange County small business, done-for-you automation results, Laguna Niguel business automation",
  },
  "/about": {
    title: "About Ops by Noell | Done-for-You AI Automation Agency",
    description:
      "Ops by Noell builds AI automation systems for local service businesses, done for you, start to finish. We design, install, and manage every system.",
    keywords:
      "about Ops by Noell, AI automation agency Orange County, done-for-you automation team, local business operations, revenue automation, AI systems for service businesses, automation agency founders",
  },
  "/book": {
    title: "Book a Free Revenue Audit Call | Ops by Noell",
    description:
      "Book a free 15-minute intro call with Nikki. We map your revenue gaps and show you exactly how AI automation can recover lost leads and bookings.",
    keywords:
      "book free automation audit, revenue leak audit, free AI consultation, automation discovery call, local business revenue gaps, missed lead recovery, book Ops by Noell, free intro call",
  },
  "/industries": {
    title: "Industries We Serve | Ops by Noell AI Automation",
    description:
      "AI automation for med spas, salons, massage therapists, dental offices, fitness studios, and home service businesses. Done-for-you systems, any industry.",
    keywords:
      "med spa automation, salon automation, massage therapist automation, dental office automation, fitness studio automation, home service business automation, AI systems by industry, local service business AI",
  },
  "/newsletter": {
    title: "The Ops Brief: AI Automation Newsletter by Ops by Noell",
    description:
      "Subscribe to The Ops Brief: practical AI automation insights, real case studies, and system breakdowns for local service business owners.",
    keywords:
      "AI automation newsletter, The Ops Brief, local business automation tips, automation case studies, service business operations, Ops by Noell newsletter, automation insights",
  },
  "/analytics": {
    title: "Bot Analytics | Ops by Noell",
    description: "Telegram bot lead qualification analytics dashboard.",
    keywords: "bot analytics, lead qualification, Telegram bot",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Ops by Noell",
    description: "Read the Ops by Noell privacy policy. Learn how we collect, use, and protect your information including SMS consent and cookies.",
    keywords: "Ops by Noell privacy policy, SMS consent, data collection, cookies, opsbynoell.com",
  },
  "/terms": {
    title: "Terms of Service | Ops by Noell",
    description: "Read the Ops by Noell terms of service covering website use, AI automation services, payment terms, and governing law.",
    keywords: "Ops by Noell terms of service, AI automation terms, service agreement, California governing law",
  },
  "/massage-therapist-automation": {
    title: "AI Automation for Massage Therapists | Ops by Noell",
    description:
      "Done-for-you AI automation for massage therapists. Missed call text-back, 24/7 booking, appointment reminders, and review generation. Live in 2 weeks.",
    keywords:
      "massage therapist automation, AI booking for massage therapists, missed call text-back, appointment reminders, review generation, massage practice automation, Orange County",
  },
  "/med-spa-automation": {
    title: "AI Automation for Med Spas | Ops by Noell",
    description:
      "Done-for-you AI automation for med spas. Recover missed calls instantly, automate booking, reduce no-shows, and generate 5-star reviews consistently.",
    keywords:
      "med spa automation, AI for med spas, missed call recovery, automated appointment booking, med spa no-show reduction, review generation, Orange County med spa",
  },
  "/salon-automation": {
    title: "AI Automation for Salons | Ops by Noell",
    description:
      "Done-for-you AI automation for salons and hair studios. Fill your chair, cut no-shows, and re-engage lapsed clients automatically.",
    keywords:
      "salon automation, hair salon AI, automated booking for salons, no-show reduction salon, re-engagement sequences, salon review generation, Orange County salon",
  },
  "/dental-automation": {
    title: "AI Automation for Dental Offices | Ops by Noell",
    description:
      "Done-for-you AI automation for dental practices. Automate recall, cut no-shows, and fill your schedule without adding to your front desk workload.",
    keywords:
      "dental office automation, AI for dental practices, automated recall, dental no-show reduction, patient re-engagement, dental appointment reminders, Orange County dental",
  },
  "/home-services-automation": {
    title: "AI Automation for Home Service Businesses | Ops by Noell",
    description:
      "Done-for-you AI automation for HVAC, plumbing, electrical, and contractor businesses. Never miss a job request again with instant missed call response.",
    keywords:
      "home services automation, HVAC automation, plumber AI automation, contractor missed call, home service lead follow-up, estimate follow-up automation, Orange County",
  },
  "/case-study/massage-therapist": {
    title: "Case Study: Massage Therapist AI Automation | Ops by Noell",
    description:
      "How a 25-year massage therapist in Laguna Niguel went from zero digital infrastructure to a fully automated practice in 14 days. No-shows dropped from 4 to less than 1 per week.",
    keywords:
      "massage therapist automation case study, AI automation results, no-show reduction, Laguna Niguel massage, Ops by Noell case study, local business automation proof",
  },
};

// Helper to upsert a meta tag
function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    const [attrName, attrValue] = selector.replace('meta[', '').replace(']', '').split('="');
    el.setAttribute(attrName, attrValue.replace('"', ''));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

// Component to update document meta tags on route change
function MetaUpdater() {
  const [location] = useLocation();
  const canonicalBase = "https://www.opsbynoell.com";
  const isAdminPage = location.startsWith('/admin') || location === '/analytics';

  useEffect(() => {
    const meta = pageMeta[location] || pageMeta["/"];
    const canonical = location === "/" ? canonicalBase + "/" : canonicalBase + location;

    document.title = meta.title;

    // Standard meta
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[name="keywords"]', "content", meta.keywords);

    // Open Graph
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", canonical);

    // Twitter Card
    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);

    // Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonical);

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  const [location] = useLocation();
  const isAdminPage = location.startsWith('/admin') || location === '/analytics';
  return (
    <>
      {/* Flat dark background — no animation */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: '#010509', pointerEvents: 'none' }} />
      <MetaUpdater />
      {/* Page content wrapper — z-index:2 ensures it sits above the fixed overlay */}
      <div style={{ position: 'relative', zIndex: 2 }}>
      {!isAdminPage && <ChatWidget />}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/solutions" component={Services} />
        <Route path="/services" component={Services} />
        <Route path="/case-study" component={CaseStudy} />
        <Route path="/about" component={About} />
        <Route path="/book" component={Book} />
        <Route path="/industries" component={Services} />
        <Route path="/newsletter" component={Newsletter} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/analytics" component={BotAnalytics} />
        <Route path="/admin/inbox" component={ChatInbox} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        {/* Vertical landing pages */}
        <Route path="/massage-therapist-automation" component={MassageTherapistAutomation} />
        <Route path="/med-spa-automation" component={MedSpaAutomation} />
        <Route path="/salon-automation" component={SalonAutomation} />
        <Route path="/dental-automation" component={DentalAutomation} />
        <Route path="/home-services-automation" component={HomeServicesAutomation} />
        {/* Dedicated case study pages */}
        <Route path="/case-study/massage-therapist" component={MassageTherapistCaseStudy} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      </div>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
