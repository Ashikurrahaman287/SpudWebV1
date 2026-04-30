# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

The `spudblocks` artifact is a Vite + React premium Web3 infrastructure site for SpudBlocks ("We Launch, Grow, and List Web3 Projects"), originally ported from Vercel/v0 and upgraded to a 13-section premium brief. Stack: wouter routing, Tailwind v4, Radix UI + shadcn-style components, framer-motion animations, react-hook-form + zod for forms. State is held in React Context and persisted to localStorage (`@/lib/storage`); there is no backend. Admin login uses `VITE_ADMIN_PASSWORD` (default `spudblocks2024`).

### Brand
Dark Web3 theme with blue-violet-purple gradient. Brand HSL CSS vars defined in `src/index.css`:
- `--brand-blue: 204 70% 53%` (#3498DB-ish)
- `--brand-violet: 264 91% 57%` (#7B2CF5-ish)
- `--brand-purple: 270 91% 65%`
- `--brand-cyan: 194 100% 50%` (accent)
Background `#000` / `#05070F`. Headlines use `.sb-headline-shimmer` for animated gradient text.

### Site structure
- **Public**: Home, Services (alias `/solutions`), Case Studies (alias `/work`), Blog, Who We Serve, Method, About, Apply, Our Space, Contact, Legal hub (`/disclaimer`, `/privacy-policy`, `/terms` aliases).
- **Admin** (`/admin`, password-gated): Dashboard, Website Content (homepage hero/metrics/system steps), Case Studies, Blog Posts, Insights, Our Space, Contact Leads, SEO Settings, Media Library.
- **Home page** sections: Hero (with launch pipeline strip Idea→Build→Launch→Grow→Liquidity→Exchange), KPI proof bar, "0 → Exchange System" 6-step section (id="system"), trust metrics (CountUp), featured outcomes, testimonials, partners marquee, recognitions, who we serve, qualification CTA.

### Storage layer (`src/lib/storage.ts`)
Browser-local storage for content (no backend yet for these):
- `getCases/saveCase/deleteCase` — case studies (default seed in `data/cases.ts`)
- `getBlogPosts/saveBlogPost/deleteBlogPost` — blog (initially empty)
- `getInsights` — legacy insights blog (preserved for backward compat)
- `getOurSpace` — Our Space items
- `getWebsiteContent/saveWebsiteContent` — homepage editable copy (hero + metrics + 6 system steps)
- `getMediaLibrary/addMediaItem` — quick-access URL list
- `getSEO/saveSEO` — per-page meta. Use `useSEO(pageKey, fallback)` from `src/lib/seo.ts` to apply.

### Contact submissions — backend-backed (NOT localStorage)
Contact and Apply form submissions go through `src/lib/api.ts` to the api-server, which persists them in the `contact_submissions` Postgres table. This was migrated from localStorage so submissions actually reach the admin panel from a different device/browser.
- POST `/api/contacts` — public, creates a submission
- GET `/api/contacts` — admin (header `x-admin-token: <password>`)
- PATCH `/api/contacts/{id}` — admin, updates status
- DELETE `/api/contacts/{id}` — admin
- The admin token is the same value as `VITE_ADMIN_PASSWORD` (default `spudblocks2024`) and the server expects env `ADMIN_PASSWORD` to match. The browser stores the token in localStorage as `sb_admin_token` after login.
- DB schema: `lib/db/src/schema/contacts.ts`. Routes: `artifacts/api-server/src/routes/contacts.ts`.

### Email notifications
The api-server has a SendGrid notification helper in `src/lib/email.ts` that fires after each new contact submission. It is **dormant by default** — it only sends if all three env vars are set: `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, and `CONTACT_NOTIFICATION_EMAIL`. The user dismissed the SendGrid integration once; if they revisit email, propose Resend or re-propose SendGrid.

### Contact form
New fields beyond name/email: telegram (or whatsapp), company, project website, project stage (Idea/MVP/Pre-TGE/Launched/Looking for Listing), budget bracket, message. Stored as `ContactSubmission` and exported via CSV from admin.

### Animation system
- **Page transitions**: every route is wrapped in `PageTransition` (`src/components/animated/PageTransition.tsx`) inside `Layout.tsx`. Uses framer-motion `AnimatePresence` keyed by `useLocation()` for a fade+slide on every navigation. Also resets scroll-to-top on route change.
- **Scroll reveals**: reusable helpers in `src/components/animated/Reveal.tsx` — `Reveal`, `StaggerGroup`, `StaggerItem` — wrap content with `whileInView` + `viewport.once`.
- **Header**: `motion.header` with mount animation, gradient underline that scales on hover or when route is active, and a state-driven Services dropdown using `AnimatePresence` (more reliable than CSS group-hover).
- **CSS utilities** in `src/index.css`: `.sb-card-lift` (translateY + violet shadow on hover), `.sb-card-glow` (animated gradient border), `.sb-link-underline`, `.sb-btn-shimmer`, custom gradient scrollbar, and `html { scroll-behavior: smooth }`. All gated by `prefers-reduced-motion`.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
