# Deployment Guide

The project has two deployable pieces:

| Piece                 | Path                       | What it is                          | Where it can run                                    |
| --------------------- | -------------------------- | ----------------------------------- | --------------------------------------------------- |
| **SpudBlocks site**   | `artifacts/spudblocks`     | Static Vite + React build (SPA)     | Vercel, Netlify, Cloudflare Pages, Replit Static    |
| **API server**        | `artifacts/api-server`     | Long-running Express + Postgres     | Replit Reserved VM, Render, Railway, Fly.io        |

> Vercel does **not** run long-running Express servers. The API needs its own host.

---

## Option A — Vercel (frontend) + Replit Deployment (API)

This is the recommended split for a Vercel deploy.

### 1. Deploy the API on Replit (or any Node host)

1. Provision a Postgres database (Neon, Supabase, Replit Postgres, etc.).
2. In your Replit deployment, set:
   - `DATABASE_URL` — your Postgres connection string
   - `ADMIN_PASSWORD` — admin token (e.g. a long random string)
   - `CORS_ORIGINS` — `https://your-vercel-domain.vercel.app,https://your-custom-domain.com`
   - `PORT` — `8080` (or whatever your host requires)
3. Push the schema once: `pnpm --filter @workspace/db run push`
4. Note the public URL of the API host (e.g. `https://spudblocks-api.replit.app`).

### 2. Deploy the frontend on Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project** → import the repo.
3. Set the **Root Directory** to `artifacts/spudblocks`. Vercel will pick up
   `artifacts/spudblocks/vercel.json` automatically (it knows how to install
   the whole pnpm workspace and build only this artifact).
4. Set environment variables:
   - `VITE_API_URL` = `https://your-api-host.example.com` (no trailing slash)
   - `VITE_ADMIN_PASSWORD` = same value as the API's `ADMIN_PASSWORD`
5. Deploy. The SPA fallback rewrite in `vercel.json` handles client-side routing.

### 3. Verify

- Open the Vercel URL — the homepage and all pages load.
- Submit the contact form → check `/admin` (login with the admin password)
  → the entry appears.
- Browser DevTools → Network: confirm `POST` to `https://your-api-host.../api/contacts`
  returns `200` with no CORS errors.

---

## Option B — Vercel only (frontend), API stays on Replit dev

Same as Option A but skip step 1; just point `VITE_API_URL` at your existing
Replit dev URL. Note the dev workflow must stay running.

---

## Option C — Single-host deploy on Replit

If you'd rather keep everything on Replit, simply use Replit's deploy button
on each artifact. The frontend automatically uses same-origin `/api` calls
(no `VITE_API_URL` needed) when proxied through Replit's path-routing.

---

## Environment variables reference

### Frontend (`artifacts/spudblocks/.env.example`)
- `VITE_API_URL` — absolute URL of the API server. Leave empty for same-origin.
- `VITE_ADMIN_PASSWORD` — admin token sent in `x-admin-token` header.

### API (`artifacts/api-server/.env.example`)
- `DATABASE_URL` — Postgres connection string.
- `ADMIN_PASSWORD` — token expected in the `x-admin-token` header.
- `CORS_ORIGINS` — comma-separated allowlist of origins (production).
- `PORT` — listening port (default `8080`).
- `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `CONTACT_NOTIFICATION_EMAIL` —
  optional; all three required to enable email notifications.
