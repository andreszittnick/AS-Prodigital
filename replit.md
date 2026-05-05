# Overview

This is a modern full-stack web application built for the freelancer André Szittnick (AS ProDigital). The application serves as a professional portfolio and contact website, featuring services exclusively in web design and SEO optimization. It includes a comprehensive blog with category filtering and SEO-optimized articles. It's built with a React frontend using modern UI components and an Express.js backend with PostgreSQL database integration.

**Current migration status:** Ready for Ionos static webhosting. Analytics removed. EmailJS replaces backend contact forms (all 4 forms). `.htaccess` in `client/public/.htaccess` for Apache routing. True SSG via react-dom/server renderToString: `client/src/entry-server.tsx` (SSR entry), `vite.ssr.config.ts` (CJS bundle config), `scripts/prerender.mjs` (renders all 43 routes with full HTML + helmet meta). Routes generated programmatically from `blogPosts[]` and `cities` data. Build: `bash build-ionos.sh` (3 steps) → upload `dist/public/` to Ionos. Backend only for development.

# User Preferences

Preferred communication style: Simple, everyday language.
Brand colors: Use #fa5219 (orange) and #19243b (blue) separately - do not mix/gradient the colors together.
Website language: German (all content translated from English to German).
Page-specific modifications: When user requests changes to a specific subpage (e.g., "Webdesign-Unterseite"), only modify that exact page. Do not apply changes to other subpages unless explicitly requested.
URL Structure: URLs - / (home), /Leistungen (services overview), /Webdesign (webdesign subpage), /SEO (SEO subpage), /ueber-mich (about page), /Kontakt (contact page), /blog (blog overview), /blog/:slug (individual blog posts), /video-analyse (free video analysis landing page), /datenschutz (privacy policy - lowercase only), /impressum (legal notice), /agb (terms and conditions).
Services: ONLY Webdesign and SEO - NO KI/AI services whatsoever.
Contact: WhatsApp: 06731 8789, Email: info@as-prodigital.de, Phone: 06731 8789, Location: Alzey
UI Features: Floating contact buttons (WhatsApp & Email) visible on all pages, NO social media sections or icons.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Animations**: Framer Motion for smooth animations and transitions
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: FloatingContactButtons component (fixed position WhatsApp & Email buttons on all pages)
- **Privacy Compliance**: GDPR-compliant cookie consent system with banner, settings modal, and footer access

## Cookie Consent System (GDPR-Compliant)
- **Implementation Date**: November 2025
- **Hook**: `use-cookie-consent.tsx` - Context-based state management with LocalStorage persistence
- **Components**: 
  - `CookieBanner` - Initial consent banner with 3 action buttons
  - `CookieSettingsModal` - Detailed preferences for 4 cookie categories
  - Footer integration - "Cookie-Einstellungen" link for permanent access
- **Cookie Categories**: Notwendige (always active), Präferenzen, Analyse, Marketing
- **Consent Status**: Explicit tracking ('accepted' | 'rejected' | 'custom' | null)
- **Version Management**: v1.0 with automatic reset on updates
- **Helper Methods**: `hasAcceptedAll`, `hasRejectedOptional` for future analytics integration
- **GDPR Features**: 
  - Opt-in required for non-essential cookies
  - Withdrawal right accessible anytime via footer
  - Clear category descriptions with examples
  - Link to privacy policy (/datenschutz) in banner and modal
  - LocalStorage-based preference persistence
  - Version tracking for compliance updates
- **Storage Key**: `cookie-consent-preferences`
- **Future Integration**: Wire analytics/marketing loaders to consent helpers before initializing third-party scripts

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API endpoints with proper error handling
- **Development Setup**: Vite for development server with hot module replacement
- **Session Management**: Session-based storage configuration (connect-pg-simple)

## Database Schema
- **Primary Database**: PostgreSQL with Neon serverless driver
- **Tables**: 
  - `users` - User authentication and management
  - `contact_inquiries` - Contact form submissions with fields: firstName, lastName, companyName (optional), email, phone (optional), service, message (optional)
  - `analytics_sessions` - Anonymous visitor sessions (sessionId, visitorId, isReturning, entryPage, device, referrerSource, startedAt, lastActivity, pageCount, duration)
  - `analytics_events` - Individual tracking events (sessionId, eventType, page, element, scrollDepth, timeOnPage, timestamp)
  - `blog_posts` - Blog articles with categories, tags, and SEO metadata
- **Schema Management**: Drizzle migrations with push-based deployment

## Custom Analytics Tracking System (DSGVO-compliant)
- **Dashboard URL**: /analytics (password-protected, noindex, not in sitemap/navigation)
- **Auth**: ANALYTICS_PASSWORD environment variable (set on Render.com)
- **Hook**: `client/src/hooks/use-analytics.ts` - Auto-tracks pageviews, scroll depth, session, exit events
- **Tracking**: Runs invisibly on all pages via AnalyticsTracker in App.tsx
- **CTA Tracking**: trackClick() function - used in FloatingContactButtons, contact form, video-analyse form
- **Anonymous IDs**: visitor_id (localStorage) and session_id (sessionStorage) - no personal data
- **Data collected**: pageviews per page, entry/exit pages, time on page, scroll depth (25/50/75/100%), CTA clicks, device type (desktop/tablet/mobile), referrer source (direct/google/social/other), user flows between pages
- **Dashboard features**: KPI cards, daily timeline chart (Recharts), pages table, CTA ranking, user flow list, device/referrer breakdown, date range filter, PDF export (jsPDF + html2canvas)
- **PDF Export**: "Als PDF exportieren" button exports full dashboard with branding
- **Render.com setup needed**: DATABASE_URL + ANALYTICS_PASSWORD environment variables

## Local SEO Landingpages
- **Strategie**: /webdesign und /seo sind allgemeine Service-Seiten (nicht Alzey-spezifisch)
- **Stadt-Landingpages**: Je eine Webdesign + SEO Seite für 7 Städte = 14 Landingpages
- **Städte**: Alzey, Worms, Kaiserslautern, Bingen, Bad Kreuznach, Ingelheim, Mannheim
- **URLs**: /webdesign-[stadtname] und /seo-[stadtname] (z.B. /webdesign-alzey, /seo-worms)
- **Routing**: Dynamisch via wouter Param-Route /webdesign-:city und /seo-:city
- **City-Daten**: client/src/data/cities.ts (CityData Typ mit SEO-relevanten Feldern)
- **Templates**: client/src/pages/city-webdesign-page.tsx und city-seo-page.tsx
- **Schema.org**: Service-Markup mit areaServed pro Stadtseite, vollständiges LocalBusiness-Markup auf Homepage
- **Sitemap**: Alle 14 neuen Landingpages in sitemap.xml eingetragen

## Blog System
- **Content**: 12 SEO-optimized blog posts (6 Webdesign, 6 SEO topics)
- **Features**: Category filtering (All, Webdesign, SEO), Individual blog detail pages, Related posts suggestions, Share functionality, SEO metadata (title, description, keywords)
- **Storage**: Static content in client/src/data/blog-posts.ts
- **Categories**: Webdesign and SEO only

## Data Storage Solutions
- **Production**: PostgreSQL database via Neon serverless
- **Development**: In-memory storage fallback for development/testing
- **Validation**: Zod schemas for runtime type checking and form validation

## Authentication & Authorization
- **Strategy**: Session-based authentication prepared (storage interface defined)
- **Security**: CORS and security headers configuration
- **User Management**: UUID-based user identification

## Build & Deployment
- **Frontend Build**: Vite bundler with React plugin
- **Backend Build**: esbuild for Node.js server bundling
- **Development**: Hot reload with Vite development server
- **Production**: Static file serving with Express

# External Dependencies

## Core Technologies
- **Database**: Neon PostgreSQL serverless database
- **Deployment**: Replit-optimized configuration with development banner integration

## UI & Design
- **Component Library**: Radix UI primitives for accessible components
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for complex animations
- **Carousel**: Embla Carousel for image/content carousels

## Development Tools
- **Type Safety**: TypeScript with strict configuration
- **Code Quality**: ESLint and TypeScript compiler checks
- **Hot Reload**: Vite with React Fast Refresh
- **Error Handling**: Runtime error overlay for development

## Third-Party Services
- **Email Integration**: Prepared for email service integration (contact form notifications)
- **Analytics**: Ready for analytics service integration
- **CDN**: Unsplash for placeholder images in portfolio section

## Development Environment
- **Replit Integration**: Cartographer plugin for enhanced development experience
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)