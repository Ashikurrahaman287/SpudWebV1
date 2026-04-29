# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

- **spudblocks** (`/`) — SpudBlocks marketing/brand site. Web3 launch operator for pre-TGE token founders. Conversion-first React + Vite multi-page site (Home, Solutions x3, Work + case studies, Who We Serve, Method, Insights + articles, About, Apply, Legal hub + 4 sub-pages).
- **api-server** (`/api`) — Shared Express API server (currently health route only).
- **mockup-sandbox** (`/__mockup`) — Canvas/UI prototyping sandbox.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React 19 + Vite, wouter, TanStack Query, framer-motion, recharts, react-hook-form + zod, shadcn/ui (Radix primitives), Tailwind v4, lucide-react
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM (not currently used by spudblocks)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/spudblocks run typecheck` — typecheck the SpudBlocks site
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
