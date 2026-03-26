# Ops by Noell — Project TODO

## Completed
- [x] 5-page marketing website (Home, Services, Case Study, About, Book)
- [x] Editorial luxury design system (Cormorant Garamond + DM Sans)
- [x] ChatWidget component with lead capture
- [x] ChatWidget on all pages (global App.tsx)
- [x] Full-stack upgrade (web-db-user)
- [x] chatLeads database schema added

## In Progress
- [x] Run db:push to migrate chatLeads table
- [x] Add chatLeads query helper to server/db.ts
- [x] Add leads.submit tRPC procedure to server/routers.ts
- [x] Wire ChatWidget to submit leads via tRPC + send owner notification email
- [x] Edit 1: Dark "How It Works" section with gold accents (hybrid dark/light)
- [x] Edit 2: Logo image placeholder in nav
- [x] Edit 3: Proof bar on homepage below hero (already present, confirmed)
- [x] Edit 4: About page "We show you the math first" card visual distinction
- [x] Edit 5: Calendly embed placeholder box on Book page
- [x] Edit 6: Mobile view screenshot of homepage — captured and delivered

## Chat Widget Rewrite
- [ ] Rewrite intro message, quick questions, and bot responses to reflect full-scope automation (bookings, reviews, follow-up, marketing, not just lead capture)

## Full-Scope Messaging Rewrite
- [ ] Rewrite homepage hero, problem, solution, services overview, and closing CTA to reflect full-scope automation (not just lead capture)
- [ ] Rewrite chat widget greeting bubble, intro message, quick questions, and bot responses to reflect full scope

## Services Page Copy Update
- [x] Rewrite Services page hero headline and intro to full-scope framing
- [x] Update packages section headline and description to match
- [x] Update closing CTA on Services page

## Homepage — Inconsistent Marketing Section
- [x] Expand problem section to 6 cards covering all revenue gaps (including Inconsistent Marketing)
- [x] Add dedicated Inconsistent Marketing spotlight section with 3 stat callouts and solution copy

## About Page Intro Rewrite
- [x] Rewrite About page hero headline and intro paragraphs to match 'complete operational back office' framing

## Homepage — Cost of Inaction Section
- [x] Build Cost of Inaction section with per-gap monthly cost rows, running total, and audit CTA bridge

## Book Page — Cost of Inaction Urgency Block
- [x] Add $3,000/month estimated loss summary block above Calendly placeholder on Book page

## Book Page — Interactive Revenue Calculator
- [x] Build RevenueCalculator component with sliders/inputs for missed calls, service value, no-show rate, follow-up gaps
- [x] Replace static urgency bar with interactive calculator that updates cost pills and total in real time

## Homepage Hero Copy Update
- [x] Change eyebrow to 'AI-POWERED OPERATIONS FOR LOCAL BUSINESSES'
- [x] Update hero subheadline to full-scope operations copy

## Services Section Update
- [x] Change Services page headline to 'We automate the operations of your business. All of it.'
- [x] Add Custom Operations Buildout as 6th service card on Services page
- [x] Add Custom Operations Buildout as 6th card on homepage services overview grid

## Services Page — Custom Package Tier
- [x] Add Custom / Full Operations Buildout as 4th package after Growth package

## Book Page Copy Update
- [x] Update body copy to full operational audit description
- [x] Update 'What to Expect' Revenue Leak Audit bullet to full operational audit scope

## About Page — Broader Scope Paragraph
- [x] Add broader scope paragraph after 'Why This Exists' body copy

## Geographic Tagline Update
- [x] Update footer subline to 'AI-Powered Operations for Local Businesses · Based in Orange County. Built for businesses everywhere.'
- [x] Replace all 'Serving Orange County' instances in Nav, Footer, About, Book, and Home with new tagline

## Custom Notification System
- [x] Telegram helper (server/telegram.ts) with sendTelegram() function
- [x] Wire chat lead submission to Telegram + email
- [x] Add booking page visit notification (tRPC procedure + frontend useEffect)
- [x] Add booking intent notification (visitor clicks booking CTA)

## Hero Copy Update
- [x] Replace hero subheadline with Blend C: "Your craft is excellent. The systems behind it should be too. We build done-for-you automation infrastructure — from the first call to the five-star review."

## Hero Section Copy Refinements
- [x] Eyebrow updated to "Done-for-You Automation · Ops by Noell"
- [x] Primary CTA updated to "Book Your Free Audit"
- [x] Secondary CTA updated to "See What We Build"

## Services Page Copy Pass
- [x] Eyebrow updated to "Done-for-You · Built for Your Business"
- [x] Headline updated to "We build the back office your business has been running without."
- [x] Body copy tightened — removed brand name redundancy, leads with benefit
- [x] Second body line updated to "You focus on the work. The infrastructure runs itself."
- [x] Hero CTA aligned to "Book Your Free Audit"
- [x] Service 04 tagline sharpened to "Most businesses follow up once. We follow up until it converts."
- [x] Packages eyebrow updated to "How We Work Together"
- [x] Package CTAs aligned to "Book Your Free Audit"
- [x] Closing CTA eyebrow updated to "The First Step Is Free."
- [x] Closing CTA button aligned to "Book Your Free Audit"

## Visual Refresh + Logo Resize
- [x] Generate abstract motion/light background images (hero, services, book, about, case study)
- [x] Upload images to CDN
- [x] Increase logo size in Nav component (48px → 68px) and Footer (56px → 72px)
- [x] Swap all background visuals across all pages (Home, Services, About, Book, CaseStudy)

## Telegram Bot Lead Qualification Flow
- [x] Build Telegram webhook endpoint to receive bot updates
- [x] Implement multi-step conversation state machine (interest → contact method → contact info → confirmation)
- [x] Store conversation state in database (session per Telegram user)
- [x] Send owner notification with lead summary (interest, contact method, contact info, timestamp)
- [x] Add deep link from website to Telegram bot to trigger the flow
- [x] Add "Book a Call" button to Nav and Hero (Telegram deep link)
- [x] Register webhook URL with Telegram Bot API (auto-registers in production)
- [x] Write vitest tests for the bot flow logic (11 tests passing)

## Telegram Bot Analytics Dashboard
- [x] Add analytics tRPC procedures (funnel stats, daily leads, interest breakdown, contact method split)
- [x] Build analytics dashboard page with conversion funnel chart
- [x] Add daily leads trend chart
- [x] Add interest and contact method breakdown charts
- [x] Add recent leads table with full session details
- [x] Wire dashboard to admin-only route in App.tsx (/analytics)

## Telegram Bot — Name Step Enhancement
- [x] Add `leadName` field to botSessions schema and push migration
- [x] Add `awaiting_name` step to the bot conversation state machine
- [x] Update owner notification to include the lead's name (prefers leadName over Telegram first name)
- [x] Update analytics recent leads table to show the provided name
- [x] Update tests for the new step (41 tests passing)

## Aesthetic Redesign — Bold Warm Human-First
- [x] Update global CSS variables and theme tokens (navy, cream, amber)
- [x] Update Google Fonts to Playfair Display + Inter
- [x] Redesign Nav component
- [x] Redesign Footer component
- [x] Redesign Home page all sections
- [x] Update Services page
- [x] Update About page
- [x] Update Book page
- [x] Update CaseStudy page

## Aesthetic Redesign v2 — Clean AI-Forward (Stripe/Linear/Vercel)
- [ ] Rewrite global CSS tokens: near-white bg, near-black text, electric blue accent
- [ ] Update Google Fonts to Inter only (no serif)
- [ ] Redesign Nav component for light theme
- [ ] Redesign Footer component for light theme
- [ ] Redesign Home page all sections
- [ ] Update Services page
- [ ] Update About page
- [ ] Update Book page
- [ ] Update CaseStudy page

## Visual Fixes — Accent Color + Nav + About Image
- [x] Replace all #2563EB (electric blue) with #D4A843 (warm gold) for primary CTAs
- [x] Use #1A1A2E (near-black navy) for secondary "Book a Call" button
- [x] Fix Nav: "Book Free Audit" in warm gold (#D4A843), "Book a Call" dark outlined (#1A1A2E)
- [x] Remove abstract image on About page — replaced with solid near-white background

## Logo Swap + Palette Update v3
- [x] Upload new wordmark logo to CDN
- [x] Replace old logo URL in Nav and Footer
- [x] Update global CSS: background #F6EEEE, text #1A1A1A, accent #D4A843
- [x] Update Nav header background to #F6EEEE to match logo
- [x] Remove all remaining blue (#0081F2, #1A93FE, #229ED9) site-wide — 0 instances remaining
- [x] Update index.css design tokens (v4 palette)

## Targeted Visual Fixes v2
- [ ] Resize logo to 140px wide in Nav and Footer
- [ ] Change red text (dollar amounts in Revenue Gap/cost calculator) to #D4A843 gold
- [ ] Replace all #FFFFFF section backgrounds with #F6EEEE cream (keep #1A1A1A CTA section)

## Tech AI Agency Repositioning (10 suggestions)
- [ ] #1 Hero: New headline "We build AI systems that work while you sleep." + new subhead
- [ ] #1 Hero: Pill badge → "AI-Powered Agency · Built for Modern Businesses"
- [ ] #7 Hero: Add lower-friction "See How It Works" CTA (demo/explainer link)
- [ ] #3 Services: Rename Six Systems to AI agency terminology
- [ ] #5 Stats bar: Add AI-specific metrics (workflows deployed, revenue recovered)
- [ ] #4 Add Tech Stack / Powered By section on homepage
- [ ] #8 Add testimonials / social proof section on homepage
- [ ] #6 Add Solutions nav item + new Solutions page (custom AI builds showcase)
- [ ] #2 Broaden audience language sitewide (not just local/appointment businesses)
- [ ] #9 About page: reframe as tech team ("AI builders and automation engineers")

## UI Polish
- [x] Make hero scroll indicator smaller/less prominent

## Complete Website Overhaul — March 2026

### Homepage
- [ ] Update subheadline to include "AI receptionist"
- [ ] Remove "GoHighLevel" name from infrastructure copy
- [ ] Add Industries We Serve section (4 cards: Med Spas, Massage, Salons, Dental)
- [ ] Add social proof placeholder bar below stats
- [ ] Reframe case study preview copy
- [ ] Update SEO meta tags (title + description)

### Solutions Page
- [ ] Update hero subheadline copy
- [ ] Remove all tool name badges (OpenAI, Twilio, GHL, Make.com, etc.)
- [ ] Add "Perfect for:" lines to each system card
- [ ] Update FAQ answer for "What if I already use a CRM"
- [ ] Update SEO meta tags

### Services Page
- [ ] Update hero subheadline copy
- [ ] Update all 7 "Best For" sections to service business language
- [ ] Add Activation Sprint tier ($1,500 flat fee)
- [ ] Change Growth price from $1,497 to $1,197
- [ ] Add Scale tier ($1,497/mo) with AI voice included
- [ ] Remove standalone AI Voice Agent add-on card
- [ ] Add setup fee notes to Starter and Growth cards
- [ ] Add "Monthly strategy call included" to Growth
- [ ] Update SEO meta tags

### Case Study Page
- [ ] Add Founding Client Partner badge
- [ ] Reframe client description copy
- [ ] Update "costing her thousands" line
- [ ] Add two new After metrics (response time, review generation)
- [ ] Update bottom CTA copy
- [ ] Update SEO meta tags

### About Page
- [ ] Add industry focus paragraph after "built it for everyone else"
- [ ] Update "Custom-built" differentiator copy
- [ ] Update "Revenue outcomes" differentiator copy
- [ ] Verify/update founded year
- [ ] Update SEO meta tags

### Book Page
- [ ] Update intro text to discovery call framing

### Site-Wide
- [ ] Update footer tagline on all pages
- [ ] Add newsletter signup form to footer
- [ ] Add "Industries" nav item linking to #industries anchor
- [ ] Update Nova chat widget greeting message

### New Pages
- [ ] Create /newsletter page
- [ ] Create /industries placeholder page
- [ ] Wire both routes in App.tsx

## Calendly Integration + Human Takeover Chat
- [x] Replace Calendly placeholder on Book page with real inline embed
- [x] Update all "Book" CTAs in chat widget to use real Calendly URL
- [x] Update telegramBot.ts CALENDLY_URL constant to real URL
- [x] Build admin chat inbox page to view all widget conversations
- [x] Add human takeover: admin can reply as Nova from the dashboard
- [x] Store all chat messages in database (per session)
- [x] Show unread indicator when new visitor message arrives

## Email Notification on Human Takeover
- [x] Send email to owner when visitor triggers human takeover in chat widget

## Nova Q&A + Dual Notification
- [x] Replace Nova keyword engine with approved Q&A responses in ChatWidget and chat router
- [x] Add email notification (Resend) when visitor triggers human takeover in chat

## Nova Chat & Inbox Enhancements
- [x] Embed full chat history in human takeover email notification
- [x] Capture visitor IP and geo-location in chat sessions
- [x] Display visitor IP and location in admin chat inbox
- [x] Expand Nova Q&A with additional edge case responses

## Publishing & Operations
- [x] Run pnpm db:push to create chatSessions and chatMessages tables in production
- [x] Promote Noell to admin role in the database
- [x] Verify live site is fully operational post-deployment

## Newsletter Form (Resend Integration)
- [x] Add newsletterSubscribers table to schema and migrate
- [x] Build newsletter.subscribe tRPC procedure (store, welcome email, owner notification)
- [x] Wire frontend Newsletter page form to the tRPC procedure

## SEO Fixes — Homepage (/)
- [x] Trim meta description to 50–160 characters
- [x] Add keywords meta tag with target keywords

## SEO Fixes — Per-Page Meta Descriptions & Keywords
- [x] Audit how meta tags are currently managed per-page (App.tsx / MetaUpdater)
- [x] Add unique meta description + keywords for /solutions
- [x] Add unique meta description + keywords for /services
- [x] Add unique meta description + keywords for /case-study
- [x] Add unique meta description + keywords for /about
- [x] Add unique meta description + keywords for /book
- [x] Add unique meta description + keywords for /industries
- [x] Add unique meta description + keywords for /newsletter

## SEO — Sitemap & Robots
- [x] Generate sitemap.xml for all 8 public pages and add to client/public/
- [x] Add robots.txt to client/public/ pointing to sitemap and blocking private routes
- [x] Add <link rel="sitemap"> tag to index.html <head>

## SEO — www Redirect
- [x] Add 301 redirect middleware in Express: opsbynoell.com → www.opsbynoell.com

## SEO — Structured Data
- [x] Add LocalBusiness JSON-LD schema to index.html

## Bug — Nova Chatbot Not Responding
- [x] Diagnose and fix Nova chatbot not responding to site visitors

## Bug — Nova Chatbot Fixes
- [x] Trim quick questions list and prevent them from looping
- [x] Add human handoff: when visitor asks to speak to a person, Nova escalates and notifies owner

## Nova Chatbot — Greeting Update
- [x] Update Nova's opening greeting to new copy
- [x] Deep research: website support bot best practices report

## Nova Chatbot — Answer-First Flow
- [x] Reorder ChatWidget flow: answer visitor's first question before asking for contact info

## Nova Chatbot — Proactive Trigger
- [x] Auto-open Nova with page-specific message on /services after 45s
- [x] Auto-open Nova with page-specific message on /book after 45s

## Nova Chatbot — Human Escalation Paths
- [x] Add "Talk to a person" as a quick-question chip visible from the start
- [x] Add "Still need help? Talk to a person" button after 3+ bot exchanges in chat stage

## Visual Edit — Homepage Hero
- [x] Remove mobile mockup image from hero section

## Bug — Resend Email Validation Error
- [ ] Fix Resend validation error on human takeover email notification

## Legal Pages
- [x] Create /privacy-policy page matching site design
- [x] Create /terms page matching site design
- [x] Register both routes in App.tsx
- [x] Add footer links to Privacy Policy and Terms of Service

## Legal Consent Line on Forms
- [x] Add Privacy Policy + Terms consent line to ChatWidget lead capture form
- [x] Add Privacy Policy + Terms consent line to Newsletter signup form
- [x] Add Privacy Policy + Terms consent line to Book page (below Calendly embed)

## Compliance Checklist Changes
- [x] Footer: add phone number (949) 242-9161 next to email
- [x] Footer: change 'Lake Forest, CA' to 'Mission Viejo, CA'
- [x] Book page: add full SMS/email opt-in contact form with TCPA disclaimer
- [x] Privacy Policy: change 'Lake Forest, CA' to 'Mission Viejo, CA' (already correct)

## Book Page — Thank You Modal
- [x] Replace inline success state with a confirmation pop-up modal on /book opt-in form

## Copy Audit — Human Voice Rewrite
- [ ] Scan all files for em dashes (—) and double hyphens (--)
- [ ] Rewrite Home page copy: warm, human, no em dashes
- [ ] Rewrite Nav and Footer copy
- [ ] Rewrite Solutions page copy
- [ ] Rewrite Services page copy
- [ ] Rewrite Case Study page copy
- [ ] Rewrite About page copy
- [ ] Rewrite Industries page copy
- [ ] Rewrite Book page copy
- [ ] Rewrite Newsletter page copy
- [ ] Rewrite ChatWidget copy (Nova messages, quick questions)
- [ ] Rewrite Privacy Policy and Terms of Service copy
- [ ] Final scan: confirm zero em dashes or double hyphens remain

## Design System Audit — March 26 2026
- [x] Scan all pages and components for old aesthetic tokens (Cormorant Garamond, DM Sans, #B8956A, #F5F0EB as bg, #3D3530, #E8E2DA, #FDFAF7, #7A6F68, #D4A843, warm cream backgrounds)
- [x] Fix any remaining old tokens and align to current dark design system
