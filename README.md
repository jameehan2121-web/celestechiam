[replit.md](https://github.com/user-attachments/files/24324472/replit.md)
# Dr. Celeste Chiam - Professional Portfolio Website

## Overview

This is a professional portfolio and booking website for Dr. Celeste Chiam, a pianist, educator, and creative director. The application serves as a personal brand website featuring:

- Biography and credentials showcase
- Cal.com booking integration for all scheduling (no payment processing on-site)
- Playshop and creativity coaching services
- Contact forms for inquiries (via Resend email)
- Media gallery with performance videos
- Testimonials from students and clients

The site is built for Vercel deployment with a React frontend and serverless API functions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/` (shadcn/ui)
- Feature components in `client/src/components/`
- Custom hooks in `client/src/hooks/`

### API Architecture (Vercel Serverless Functions)
- **Runtime**: Vercel Node.js serverless functions
- **Location**: `/api/` folder
- **Email Service**: Resend for transactional emails (using Fetch API directly)

API endpoints:
- `POST /api/contact` - Contact form submissions (sends email via Resend)

### Data Model
- **Schema Location**: `shared/schema.ts`
- Contains Zod validation schemas for contact form

No database is used - all bookings are handled through Cal.com.

## Deployment Architecture (Vercel)

### Build & Deploy
- **Build Command**: `vite build`
- **Output Directory**: `dist/public`
- **Framework**: Vite (auto-detected by Vercel)

### Environment Variables (Vercel Dashboard)
Required:
- `RESEND_API_KEY` - Resend email service API key
- `RECIPIENT_EMAIL` - Email address to receive contact form submissions (default: celeste.pianist@gmail.com)

Optional:
- `FRONTEND_URL` - For CORS configuration (if needed)
- `VITE_API_BASE_URL` - API base URL for frontend (empty for same-origin)

### Key Configuration Files
- `vercel.json` - Vercel deployment configuration
- `client/src/lib/config.ts` - API URL configuration helper

## External Dependencies

### Third-Party Services
- **Cal.com**: All booking/scheduling (celestechiam-rxcvpp account)
- **Resend**: Transactional email delivery for contact forms

### Cal.com Booking Links
- In-Person Training: `https://cal.com/celestechiam-rxcvpp/in-person-training-for-music-teachers`
- Virtual Training: `https://cal.com/celestechiam-rxcvpp/virtual-training-for-music-teachers`
- Intro Call (Creativity Coaching): `https://cal.com/celestechiam-rxcvpp/complimentary-intro-call-creativity-coaching`
- Quick Consult: `https://cal.com/celestechiam-rxcvpp/quick-consult-creativity-coaching`
- Comprehensive Session: `https://cal.com/celestechiam-rxcvpp/comprehensive-session-creativity-coaching`
- Deep Dive: `https://cal.com/celestechiam-rxcvpp/deep-dive-creativity-coaching`
- 5-Session Package: `https://cal.com/celestechiam-rxcvpp/5-session-package-creativity-coaching`

### Key NPM Packages
- `@vercel/node` - Vercel serverless function types
- `@tanstack/react-query` - Server state management
- `wouter` - Client-side routing
- `zod` - Schema validation
- Full shadcn/ui component library with Radix primitives

## Local Development

For local development in Replit, run `npm run dev:client` to start the Vite dev server on port 5000.

Note: The contact form API requires the Vercel environment to function. For local testing, you can mock the API response or deploy to Vercel preview.
