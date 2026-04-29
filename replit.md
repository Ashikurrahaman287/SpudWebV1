# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

The `spudblocks` artifact is a Vite + React marketing/admin site for SpudBlocks (operator-grade launch discipline for token projects), ported from Vercel/v0. It uses wouter for routing, Tailwind v4 for styling, and Radix UI + shadcn-style components. State is held in React Context and persisted to localStorage (`@/lib/storage`); there is no backend dependency for the site itself. Admin login uses `VITE_ADMIN_PASSWORD` (default `spudblocks2024`).

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
