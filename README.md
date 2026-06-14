# LearnBook Platform

Unified learning platform that combines **flippity-clone** (games,
strandhoot-builder, live sessions) and **Learnbook** (worlds, AI assessment,
leaderboards) into a single Next.js app.

> Status: **Phase 0** — foundation shell. See [`MIGRATION_PLAN.md`](./MIGRATION_PLAN.md).

## Stack

- Next.js 15 (App Router) · React 18 · TypeScript
- Tailwind v4 + shadcn/ui (Radix)
- Supabase (`@supabase/ssr`) for auth + data
- OpenAI for AI assessment (Phase 4)
- Vitest for tests

## Getting started

```bash
cp .env.example .env.local   # fill in Supabase (+ OpenAI later)
npm install
npm run dev                  # http://localhost:3000
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest |
| `npm run lint` | ESLint |

The app boots without Supabase credentials (auth middleware is a no-op until
`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set).
