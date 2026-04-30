# SpudBlocks - Vercel Production Deployment Guide

## Overview
This guide provides complete setup for deploying SpudBlocks to Vercel (frontend) and a Node.js host like Replit, Render, or Railway (API server).

## Architecture
- **Frontend**: Static Vite + React SPA → Vercel
- **API Server**: Express + PostgreSQL → Replit/Render/Railway
- **Database**: PostgreSQL (managed service like Neon, Supabase, or Railway)

---

## Quick Start Local Development

### Prerequisites
- Node.js 24+ 
- pnpm (install: `npm install -g pnpm`)
- PostgreSQL database URL (local or cloud)

### 1. Install Dependencies
```bash
cd d:\ASHik\Ashik\Downloads\SpudWebV3
pnpm install --ignore-scripts
```

### 2. Set Environment Variables

**Frontend** - `artifacts/spudblocks/.env.local`:
```
VITE_API_URL=http://localhost:8080
VITE_ADMIN_PASSWORD=spudblocks2024
```

**API Server** - `artifacts/api-server/.env.local`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/spudblocks
ADMIN_PASSWORD=spudblocks2024
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
PORT=8080
```

### 3. Run Locally

**Terminal 1 - Frontend**:
```bash
cd artifacts/spudblocks
PORT=5173 npx vite --host 0.0.0.0
# Opens at http://localhost:5173
```

**Terminal 2 - API Server** (requires Database setup):
```bash
cd artifacts/api-server
pnpm run dev
# Runs at http://localhost:8080
```

---

## Vercel Deployment (Frontend Only)

### Step 1: Prepare GitHub Repository
```bash
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### Step 2: Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. **Root Directory**: `artifacts/spudblocks`
5. Vercel automatically detects `vercel.json`

### Step 3: Environment Variables in Vercel
In Vercel project settings → **Environment Variables**, add:

```
VITE_API_URL=https://your-api-server-url.com
VITE_ADMIN_PASSWORD=your-secure-password-32-chars-min
```

### Step 4: Configure API URL
- If API is on **Replit**: `VITE_API_URL=https://your-replit-deployment.replit.dev`
- If API is on **Render**: `VITE_API_URL=https://your-api-service.onrender.com`
- If API is on **Railway**: `VITE_API_URL=https://your-project.up.railway.app`

### Step 5: Deploy
Click **Deploy** - Vercel builds and deploys automatically using `vercel.json` config.

---

## API Server Deployment

### Option A: Replit (Recommended for Quick Setup)

#### 1. Provision PostgreSQL
- Use Replit's built-in PostgreSQL, OR
- Use Neon: [neon.tech](https://neon.tech) (free tier)
- Use Supabase: [supabase.com](https://supabase.com) (free tier)

#### 2. Get Database URL
Copy your PostgreSQL connection string from your chosen provider.

#### 3. Push Schema
```bash
pnpm --filter @workspace/db run push
```
Input your `DATABASE_URL` when prompted.

#### 4. Create `.replit` (if not exists)
```
run = "cd artifacts/api-server && pnpm run start"
modules = ["nodejs-20"]
```

#### 5. Environment Variables in Replit
Create a `.env` file:
```
DATABASE_URL=your-database-url
ADMIN_PASSWORD=your-secure-password
CORS_ORIGINS=https://your-vercel-domain.vercel.app,https://your-custom-domain.com
PORT=8080
SENDGRID_API_KEY=optional-for-email
SENDGRID_FROM_EMAIL=optional@example.com
CONTACT_NOTIFICATION_EMAIL=admin@example.com
```

#### 6. Deploy & Get URL
- Replit auto-deploys on every change
- Your API URL: `https://your-replit-project.replit.dev`

---

### Option B: Render.com

#### 1. Create PostgreSQL Database
- In Render dashboard → **New** → **PostgreSQL**
- Copy the Internal Database URL

#### 2. Deploy API Server
- **New** → **Web Service**
- Connect GitHub repository
- **Build Command**: `cd artifacts/api-server && pnpm install && pnpm run build`
- **Start Command**: `node --enable-source-maps ./dist/index.mjs`
- **Root Directory**: Leave blank
- Add environment variables:
  ```
  DATABASE_URL=internal-postgres-url
  ADMIN_PASSWORD=your-secure-password
  CORS_ORIGINS=https://your-vercel-domain.vercel.app
  NODE_ENV=production
  PORT=3000
  ```

#### 3. Get API URL
Your API service URL: `https://your-service-name.onrender.com`

---

### Option C: Railway

#### 1. Create Database
- **New Project** → **Add database** → **PostgreSQL**
- Railway shows environment variables automatically

#### 2. Deploy Service
- **New** → **Deploy from GitHub**
- Select your repository
- **Root Directory**: `artifacts/api-server`
- **Start Command**: `pnpm run start`
- **Build Command**: `pnpm install && pnpm run build`

#### 3. Add Environment Variables
```
ADMIN_PASSWORD=your-secure-password
CORS_ORIGINS=https://your-vercel-domain.vercel.app
NODE_ENV=production
```

#### 4. Get API URL
Your API URL: `https://your-service.up.railway.app`

---

## Vercel Configuration File (`artifacts/spudblocks/vercel.json`)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "cd ../.. && pnpm install --frozen-lockfile && pnpm --filter @workspace/spudblocks build",
  "outputDirectory": "dist/public",
  "installCommand": "echo 'install handled in buildCommand'",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

---

## Production Checklist

### Frontend (Vercel)
- [ ] Repository pushed to GitHub
- [ ] Vercel project created and connected
- [ ] `VITE_API_URL` set to production API URL
- [ ] `VITE_ADMIN_PASSWORD` set to secure password
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled (automatic with Vercel)

### API Server
- [ ] PostgreSQL database provisioned
- [ ] `DATABASE_URL` configured
- [ ] `ADMIN_PASSWORD` matches frontend
- [ ] `CORS_ORIGINS` whitelisted to Vercel domain
- [ ] Email notifications configured (optional)
- [ ] API URL shared with frontend team
- [ ] Database schema pushed: `pnpm --filter @workspace/db run push`

### Security
- [ ] Admin password is 32+ characters and cryptographically random
- [ ] Database credentials stored in environment variables (not code)
- [ ] CORS restricted to known domains
- [ ] HTTPS enforced everywhere
- [ ] Environment variables never committed to Git

---

## Testing Deployment

### 1. Test Frontend
```bash
# Open Vercel URL in browser
https://your-project.vercel.app

# Should show SpudBlocks home page with:
- Header and navigation
- Hero section
- Services / Solutions
- Contact form (may not work without API yet)
```

### 2. Test API Connection
```bash
# Open browser DevTools → Network tab
# Submit contact form
# Should show POST request to https://your-api-server.com/api/contacts
# Response should be 200 with no CORS errors
```

### 3. Test Admin Panel
```bash
# Visit https://your-project.vercel.app/admin
# Login with VITE_ADMIN_PASSWORD
# Verify contact submissions appear
```

---

## Troubleshooting

### CORS Errors
**Problem**: "Access to XMLHttpRequest blocked by CORS policy"
**Solution**:
1. Check `CORS_ORIGINS` env var includes your Vercel domain
2. No trailing slash in domain
3. Exact domain match (www vs non-www matters)

### 404 on API Calls
**Problem**: "Failed to load resource: 404"
**Solution**:
1. Verify `VITE_API_URL` is correct in Vercel env vars
2. API server is actually running
3. Endpoint exists at `/api/contacts`

### Database Connection Fails
**Problem**: "Cannot connect to database"
**Solution**:
1. Verify `DATABASE_URL` is correctly formatted
2. Database is running and accessible
3. Firewall allows connection from API server location

### Build Fails on Vercel
**Problem**: "Build failed with 1 error"
**Solution**:
1. Check Vercel build logs for specific error
2. Ensure `pnpm-lock.yaml` is committed
3. Try rebuilding: Vercel dashboard → **Deployments** → **Redeploy**

---

## Support

For issues with:
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **PostgreSQL**: [postgresql.org](https://postgresql.org)
- **Express**: [expressjs.com](https://expressjs.com)
- **Vite**: [vitejs.dev](https://vitejs.dev)
- **React**: [react.dev](https://react.dev)

---

## Files Location

```
SpudWebV3/
├── artifacts/
│   ├── spudblocks/           # Frontend (→ Vercel)
│   │   ├── vercel.json
│   │   ├── vite.config.ts
│   │   ├── .env.example
│   │   └── src/
│   │
│   └── api-server/           # Backend (→ Replit/Render/Railway)
│       ├── src/
│       ├── package.json
│       └── .env.example
│
├── lib/
│   ├── db/                   # Database schema
│   │   ├── drizzle.config.ts
│   │   └── src/schema/
│   │
│   ├── api-spec/             # OpenAPI specification
│   │   └── openapi.yaml
│   │
│   └── api-client-react/     # Generated API hooks
│
└── pnpm-workspace.yaml
```

---

## Environment Variables Reference

### Frontend (`VITE_*`)
| Variable | Example | Purpose |
|----------|---------|---------|
| `VITE_API_URL` | `https://api.example.com` | API server URL (empty = same-origin) |
| `VITE_ADMIN_PASSWORD` | `super-secure-pass-123` | Admin login password |

### API Server
| Variable | Example | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | `postgresql://...` | PostgreSQL connection string |
| `ADMIN_PASSWORD` | `super-secure-pass-123` | Must match frontend password |
| `CORS_ORIGINS` | `https://example.com,https://www.example.com` | Allowed frontend origins |
| `PORT` | `8080` | Server listening port |
| `NODE_ENV` | `production` | Environment mode |
| `SENDGRID_API_KEY` | `SG.xxxx` | Optional: Email notifications |
| `SENDGRID_FROM_EMAIL` | `noreply@example.com` | Optional: Email sender |
| `CONTACT_NOTIFICATION_EMAIL` | `admin@example.com` | Optional: Notification recipient |

---

**Last Updated**: April 30, 2026
**Status**: Production Ready ✓
