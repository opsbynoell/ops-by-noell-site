import { Toaster } from "@/components/ui/sonner"; // v3
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect, lazy, Suspense } from "react";
import ChatWidget from "./components/ChatWidget";

// Route-based code splitting — each page is a separate chunk
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const About = lazy(() => import("./pages/About"));
const Book = lazy(() => import("./pages/Book"));
const BotAnalytics = lazy(() => import("./pages/BotAnalytics"));
const Solutions = lazy(() => import("./pages/Solutions"));
const Industries = lazy(() => import("./pages/Industries"));
const Newsletter = lazy(() => import("./pages/Newsletter"));
const ChatInbox = lazy(() => import("./pages/ChatInbox"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminOpen = lazy(() => import("./pages/AdminOpen"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Calculator = lazy(() => import("./pages/Calculator"));
const MassageTherapistAutomation = lazy(() => import("./pages/MassageTherapistAutomation"));
const MedSpaAutomation = lazy(() => import("./pages/MedSpaAutomation"));
const SalonAutomation = lazy(() => import("./pages/SalonAutomation"));
const DentalAutomation = lazy(() => import("./pages/DentalAutomation"));
const HomeServicesAutomation = lazy(() => import("./pages/HomeServicesAutomation"));
const MassageTherapistCaseStudy = lazy(() => import("./pages/MassageTherapistCaseStudy"));
const Blog = lazy(() => import("./pages/Blog"));

function setMeta(selector: string, attr: string, value: string) {
    let el = document.querySelector(selector);
    if (!el) {
          const tag = selector.match(/^(\w+)/)?.[1] || "meta";
          el = document.createElement(tag);
          const attrMatch = selector.match(/\[([^=]+)="([^"]+)"\]/);
          if (attrMatch) el.setAttribute(attrMatch[1], attrMatch[2]);
          document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
}

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
          title: "Book a Free 30-Minute Intro Call | Ops by Noell",
          description:
                  "Book a free 30-minute call with Nikki. We map your revenue gaps and show you exactly how AI automation can recover lost leads and bookings.",
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
    "/blog": {
          title: "The Ops Blog: AI Automation for Local Service Businesses | Ops by Noell",
          description:
                  "Practical AI automation insights for massage therapists, med spas, salons, and service businesses. Real strategies, real numbers, no fluff.",
          keywords:
                  "AI automation blog, local business automation tips, massage therapist revenue, service business operations, missed call text back, no-show reduction, Ops by Noell blog",
    },
};

function MetaUpdater() {
    const [location] = useLocation();
    const canonicalBase = "https://www.opsbynoell.com";
    const isAdminPage = location.startsWith('/admin') || location === '/analytics';

  useEffect(() => {
        const meta = pageMeta[location] || pageMeta["/"];
        const canonical = location === "/" ? canonicalBase + "/" : canonicalBase + location;

                document.title = meta.title;

                setMeta('meta[name="description"]', "content", meta.description);
        setMeta('meta[name="keywords"]', "content", meta.keywords);

                setMeta('meta[property="og:title"]', "content", meta.title);
        setMeta('meta[property="og:description"]', "content", meta.description);
        setMeta('meta[property="og:url"]', "content", canonical);

                setMeta('meta[name="twitter:title"]', "content", meta.title);
        setMeta('meta[name="twitter:description"]', "content", meta.description);

                let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!canonicalEl) {
                canonicalEl = document.createElement("link");
                canonicalEl.setAttribute("rel", "canonical");
                document.head.appendChild(canonicalEl);
        }
        canonicalEl.setAttribute("href", canonical);

                window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;
}

// Minimal loading fallback — matches site background, no flash
function PageLoader() {
    return (
          <div
                  style={{
                            minHeight: "100vh",
                            background: "#010509",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                  }}
                >
                <div
                          style={{
                                      width: 32,
                                      height: 32,
                                      border: "2px solid rgba(167,139,250,0.2)",
                                      borderTopColor: "#a78bfa",
                                      borderRadius: "50%",
                                      animation: "spin 0.7s linear infinite",
                          }}
                        />
                <style dangerouslySetInnerHTML={{ __html: "@keyframes spin { to { transform: rotate(360deg); } }" }} />
          </div>
        );
}

function Router() {
    const [location] = useLocation();
    const isAdminPage = location.startsWith('/admin') || location === '/analytics';

    return (
          <div style={{ minHeight: "100vh", background: "#010509" }}>
                <MetaUpdater />
                <Suspense fallback={<PageLoader />}>
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
                                  <Route path="/admin/login" component={AdminLogin} />
                                  <Route path="/admin/open" component={AdminOpen} />
                                  <Route path="/admin/inbox" component={ChatInbox} />
                                  <Route path="/privacy-policy" component={PrivacyPolicy} />
                                  <Route path="/terms" component={TermsOfService} />
                                  <Route path="/massage-therapist-automation" component={MassageTherapistAutomation} />
                                  <Route path="/med-spa-automation" component={MedSpaAutomation} />
                                  <Route path="/salon-automation" component={SalonAutomation} />
                                  <Route path="/dental-automation" component={DentalAutomation} />
                                  <Route path="/home-services-automation" component={HomeServicesAutomation} />
                                  <Route path="/case-study/massage-therapist" component={MassageTherapistCaseStudy} />
                                  <Route path="/blog" component={Blog} />
                                  <Route path="/404" component={NotFound} />
                                  <Route component={NotFound} />
                        </Switch>
                </Suspense>
            {!isAdminPage && <ChatWidget />}
          </div>
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
