# SpudBlocks - Production Ready ✓

This project is now **Vercel production-ready**. This document provides a quick summary of what's been set up.

## What's Been Done

### ✅ Vercel Configuration
- `artifacts/spudblocks/vercel.json` is properly configured with:
  - Build command that installs workspace and builds only spudblocks
  - Output directory: `dist/public`
  - SPA routing rewrite (all paths → index.html)
  - Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
  - Cache-Control headers for `/assets/*` (immutable, 1 year)
  - CORS-friendly setup

### ✅ Environment Configuration
- `.env.local` files created for both frontend and API
- Frontend configured to connect to `http://localhost:8080` for local dev
- API server configured with proper CORS settings
- Production env variables guide created: `.env.production`

### ✅ Local Development Setup
- `setup-local-dev.bat` (Windows batch script)
- `setup-local-dev.ps1` (PowerShell script)
- Both scripts create necessary `.env.local` files automatically

### ✅ Production Deployment Guide
- Complete guide: `VERCEL_PRODUCTION_GUIDE.md`
- Covers:
  - Vercel frontend deployment
  - API server deployment (Replit, Render, Railway)
  - Database setup
  - Environment variables
  - Security checklist
  - Troubleshooting

---

## Quick Start - Local Development

### Option 1: Windows Batch
```cmd
setup-local-dev.bat
```

### Option 2: PowerShell
```powershell
.\setup-local-dev.ps1
```

### Option 3: Manual Setup
```bash
# Terminal 1 - Frontend
set PORT=5173
cd artifacts\spudblocks
npx vite --host 0.0.0.0
# Opens at http://localhost:5173

# Terminal 2 - API (requires database)
cd artifacts\api-server
pnpm run dev
# Runs at http://localhost:8080
```

---

## Deploy to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Production ready"
git push
```

### 2. Go to Vercel
Visit [vercel.com](https://vercel.com) and:
- Click "Add New" → "Project"
- Import your GitHub repo
- Root Directory: `artifacts/spudblocks`
- Add environment variables:
  - `VITE_API_URL` = your API server URL
  - `VITE_ADMIN_PASSWORD` = secure password (32+ chars)

### 3. Deploy
Click "Deploy" - Vercel handles everything automatically using `vercel.json`

---

## Deploy API Server

Choose one hosting option:

### Replit (Quickest)
1. Create account at [replit.com](https://replit.com)
2. Set up PostgreSQL database (or use external: Neon, Supabase)
3. Configure `.env` with `DATABASE_URL`, `ADMIN_PASSWORD`, `CORS_ORIGINS`
4. Replit auto-deploys
5. Get API URL from Replit deployment

### Render
1. Create account at [render.com](https://render.com)
2. Connect GitHub repo
3. Create PostgreSQL database in Render
4. Deploy as Web Service
5. Add environment variables
6. Get API URL

### Railway
1. Create account at [railway.app](https://railway.app)
2. Connect GitHub repo
3. Add PostgreSQL
4. Deploy
5. Get API URL

---

## Files You'll Need to Know

### Frontend
```
artifacts/spudblocks/
├── vercel.json           ← Vercel configuration (don't modify)
├── vite.config.ts        ← Vite build config
├── .env.local            ← Local dev environment (git-ignored)
├── .env.example          ← Reference for required variables
└── src/
    ├── main.tsx          ← App entry point
    ├── App.tsx           ← Main component
    └── pages/            ← Page components
```

### API Server
```
artifacts/api-server/
├── src/
│   ├── app.ts            ← Express app setup
│   ├── index.ts          ← Server entry point
│   └── routes/           ← API routes
├── build.mjs             ← Build script
├── package.json
├── .env.local            ← Local env (git-ignored)
└── .env.example          ← Reference
```

### Database
```
lib/db/
├── drizzle.config.ts     ← Database config
├── src/
│   └── schema/           ← Database schema definitions
└── package.json          ← DB utilities package
```

---

## Environment Variables Checklist

### For Vercel
```
VITE_API_URL             ← API server URL (e.g., https://api.example.com)
VITE_ADMIN_PASSWORD      ← Admin password (32+ chars, very secure)
```

### For API Server (Replit/Render/Railway)
```
DATABASE_URL             ← PostgreSQL connection string
ADMIN_PASSWORD           ← Same as VITE_ADMIN_PASSWORD
CORS_ORIGINS             ← Your Vercel domain (https://example.vercel.app)
PORT                     ← 8080 (default, change if needed)
NODE_ENV                 ← production
SENDGRID_API_KEY         ← Optional for email notifications
SENDGRID_FROM_EMAIL      ← Optional for email notifications
CONTACT_NOTIFICATION_EMAIL ← Optional for email notifications
```

---

## Testing

### Local Testing
1. Start frontend: `npx vite --host 0.0.0.0` (port 5173)
2. Start API: `pnpm run dev` (port 8080)
3. Open http://localhost:5173 in browser
4. Navigate to `/admin` and login with your admin password
5. Submit contact form and verify it appears in admin panel
6. Check browser DevTools → Network tab for API calls

### Vercel Testing
1. Visit your Vercel deployment URL
2. Check that all pages load (home, about, contact, etc.)
3. Try submitting contact form
4. Verify DevTools shows API calls to your production API server
5. No CORS errors should appear

---

## Security Checklist

- [ ] `ADMIN_PASSWORD` is 32+ characters, cryptographically random
- [ ] `DATABASE_URL` never committed to git (use .env files)
- [ ] `CORS_ORIGINS` restricted to known domains only
- [ ] HTTPS enabled everywhere (automatic with Vercel)
- [ ] `.env` files are in `.gitignore`
- [ ] No secrets in `package.json` or code
- [ ] API rate limiting configured (optional, in `artifacts/api-server/src/app.ts`)

---

## Troubleshooting

### Frontend won't start locally
```bash
# Try clearing cache
rmdir /s node_modules
pnpm install --ignore-scripts
```

### API connects but returns 404
- Verify `VITE_API_URL` doesn't have trailing slash
- Check API server is running on correct port
- Verify endpoint exists: POST `/api/contacts`

### CORS errors
- Check `CORS_ORIGINS` includes your exact Vercel domain
- No `www` vs `www` mismatch
- No trailing slashes in domain

### Vercel build fails
- Check build logs in Vercel dashboard
- Ensure `pnpm-lock.yaml` is committed to git
- Try redeploy from Vercel dashboard

---

## Next Steps

1. **Set up database**: Use Neon (neon.tech), Supabase, or your hosting provider's PostgreSQL
2. **Deploy API**: Choose Replit, Render, or Railway (see guide for detailed steps)
3. **Deploy Frontend**: Push to GitHub, import in Vercel, configure env vars
4. **Set custom domain** (optional): In Vercel project settings
5. **Monitor**: Set up error tracking and analytics

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **PostgreSQL**: https://postgresql.org
- **Express**: https://expressjs.com
- **Vite**: https://vitejs.dev
- **React**: https://react.dev
- **Drizzle ORM**: https://orm.drizzle.team

---

## Key Files to Review

1. `VERCEL_PRODUCTION_GUIDE.md` - Comprehensive deployment guide
2. `DEPLOYMENT.md` - Original deployment notes
3. `replit.md` - Project architecture overview
4. `artifacts/spudblocks/vercel.json` - Frontend Vercel config
5. `artifacts/spudblocks/vite.config.ts` - Build configuration

---

**Status**: Production Ready ✅
**Last Updated**: April 30, 2026
**Node.js Version**: 24+
**Package Manager**: pnpm
