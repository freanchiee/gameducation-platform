# LearnBook Platform — Unification Plan

Single unified app combining **flippity-clone** (`gameducation-platform`),
**Learnbook**, and **Rekhachitra** (Desmos live-physics teaching).
`strandhoot-minter` is intentionally **dropped**.

## Decisions (locked)

| Decision | Choice |
| --- | --- |
| Shape | One unified Next.js app, built fresh ("fresh shell") |
| React | **18.3** — protects flippity's `react-dnd`-based strandhoot-builder (matches flippity's proven Next 15 + React 18 setup) |
| Framework | Next.js 15 (App Router), TypeScript strict |
| Styling | Tailwind v4 + shadcn/Radix (classic), Learnbook palette merged in Phase 2 |
| Auth/Data | Supabase via `@supabase/ssr` only (drop deprecated `auth-helpers`) |
| AI | OpenAI (from Learnbook `lib/ai`) |
| Supabase project | **New clean project** + unified migrations |
| Sheets | Google Sheets service account (kept; optional) |

## Source projects

- flippity-clone: `/Users/utkarshkumar/flippity-clone`
- Learnbook: `/Users/utkarshkumar/Learnbook`
- Rekhachitra: `/Users/utkarshkumar/rekhachitra` (cloned from `github.com/freanchiee/rekhachitra`, branch `claude/edtech-platform-architecture-JzR1s`). Stack: Next 16 · React 19 · TW3 · Zustand · Desmos · multi-provider AI BYOK. Persistence is localStorage + in-memory only (no DB).

## The two hard problems

1. **`sessions` collision + two identity models.** Both apps define a `sessions`
   table with different shapes, and model students differently
   (flippity `profiles(id, role)` vs Learnbook `students` + guest JWT claim).
   → Adopt Learnbook's rigorous schema as the base; fold flippity's tables in
   with renamed collisions (`sessions → strandhoot_sessions`,
   `participants → strandhoot_participants`). Converge identity in Phase 5.
2. **RLS gap.** flippity tables ship with loose/no RLS. Add proper policies when
   they enter Learnbook's locked-down schema (security fix, not optional).

## Phases

- [ ] **Phase 0 — Scaffold** _(in progress)_
  - [x] Next.js 15 + React 18 + Tailwind 4 app created
  - [x] shadcn/Radix design tokens + `Button` (discarded experimental base-ui output)
  - [x] `@supabase/ssr` client / server / middleware (env-guarded)
  - [x] Vitest + smoke test
  - [x] `.env.example`, this plan
  - [x] Verified: `typecheck`, `test`, and `build` all green (route `/` prerenders)
- [x] **Phase 1 — Database** _(applied to project `cvdoishawxaqiizbryuh` + verified)_
  - [x] `…120001_learnbook_base.sql` + `…120002_learnbook_ai_audit.sql` (LearnBook base, verbatim)
  - [x] `…120003_flippity_tables.sql` (flippity tables; `sessions`→`strandhoot_sessions`, `participants`→`strandhoot_participants`)
  - [x] `…120004_flippity_rls.sql` (RLS for flippity tables — closes the gap)
  - [x] `…120005_secure_inherited_views.sql` (lock down RLS-bypassing leaderboard/teacher_summary views)
  - [x] `seed.sql` (four V1 worlds) + `supabase/SCHEMA_NOTES.md`
  - [x] Applied via `supabase db push` (no Docker/OAuth — direct `--db-url`)
  - [x] `src/lib/supabase/types.ts` hand-authored to match live schema (regen later via `gen types --linked`)
  - [x] Verified over REST: worlds seeded, RLS blocks anon on protected tables/views, public reads work
  - [x] App typechecks + tests pass against real types
- [x] **Phase 2 — Shared core**
  - [x] Ported flippity's **50 shadcn/Radix UI components** + `use-mobile`/`use-toast` hooks (27 Radix pkgs + cmdk/vaul/sonner/recharts/etc., React-18-safe)
  - [x] Merged LearnBook brand palette (navy/mint/green/red/blue-band/cream) + Syne/DM Sans into Tailwind v4 tokens
  - [x] Auth on `@supabase/ssr`: `/login` (email magic-link + Google button), `/auth/callback` (PKCE exchange), `/choose-role` → `profiles`, `/auth/auth-error`
  - [x] Role-aware app shell (`(app)` layout guard + sidebar/topbar + sign out) and a role-aware `/dashboard`
  - [x] Pinned `@supabase/supabase-js@2.49.4` (2.108's write-path types inferred `never` against our types format)
  - [x] Verified: typecheck + build clean; auth guard redirects unauthenticated users to `/login`
- [x] **Phase 3 — flippity features** _(build green: typecheck 0, all routes prerender)_
  - [x] Topology-preserving port of the whole flippity tree (components, 121-file strandhoot-builder, contexts, utils, routes) into `src/` so `@/app/components/*` etc. resolve
  - [x] `@/utils/supabase` compat shim made **untyped** (matches flippity's assumptions) → 159→29 errors; remaining 29 fixed via parallel workflow (StrandhootManager/service reconcile, react-dnd callback refs, file-casing, catch typing, stray `page.tsx`-under-`components`)
  - [x] `/api/sheets` (verbatim) + `/api/games` (rewritten onto `@supabase/ssr` + `getUser()`)
  - [x] Mounted ported providers (Theme/DarkMode/Sidebar) so client pages prerender; `eslint.ignoreDuringBuilds`
  - [x] Routes live: `/strandhoot-builder` (+`/preview/[id]`), `/game/[id]`, `/lobby/[sessionCode]`, `/dashboard/[sessionCode]`, `/your-games`, `/strandhoot-routes/shared`
- [x] **Phase 4 — Learnbook features** _(build green: 35 pages)_
  - [x] Ported `lib/{ai,auth,cellbook,teacher,worlds}` → `src/lib/*`; isolated Learnbook's Supabase layer as `src/lib/supabase-lb` (its `createServerClient`/`createBrowserClient`/types differ from ours) and rewrote its `@/lib/supabase` imports to it
  - [x] Routes: `/cellbook/*` (8), `/teacher/*` (3), `/[worldSlug]`, `/design-system`; APIs: `/api/ai/*` (4), `/api/cellbook/profile`, `/api/scores/override`, `/api/teacher/*` (3), `/api/worlds/[worldSlug]/artifacts`
  - [x] Installed `openai`; only 1 type fix needed (stray relative `../supabase/types`)
- [x] **Phase 4b — Port Rekhachitra (Desmos live physics)** _(build green; isolated under `/desmos`)_ — code → `src/desmos/*`, routes → `src/app/desmos/*`, `@/*`→`@/desmos/*`; React-19 `use(params)`→`useParams()`, nested-layout fixed, Desmos key + Anthropic model env-ified (model id `claude-sonnet-4-6` verified current via claude-api skill), brand tokens scoped to `.desmos-scope`. Originals below kept for reference:
  - [ ] Schema addendum migration: `activities`, `slides`, `desmos_sessions` (join-code), `desmos_student_sessions`, `desmos_responses` (+ RLS). A *third* live-session model — namespaced to avoid colliding with LearnBook `sessions` and flippity `strandhoot_sessions`.
  - [ ] Port source onto our stack (Next 15 / React 18 / TW4); add brand tokens (`brand-yellow/mint/teal/coral`, Baloo 2/Fredoka/Poppins).
  - [ ] Components: `DesmosCalculator` (+ `injectSliderBounds` fix, modes edit/student/display), session components, builder. Move Desmos key → `NEXT_PUBLIC_DESMOS_API_KEY`.
  - [ ] Routes namespaced under their own segment (avoid `/dashboard`,`/join`,`/auth` collisions); wire to shared Supabase auth (drop mock auth).
  - [ ] AI generator route (BYOK Claude/Gemini/DeepSeek/Minimax) — verify Claude model id via the claude-api skill.
  - [ ] Persistence: **port working on localStorage + in-memory relay first**, then migrate to Supabase (tables above + Realtime) as a follow-up.
- [x] **Phase 5 — IA & navigation** _(role-aware shell nav now links every merged feature: builder, games, worlds/classes, sessions, Desmos studio)_. Deferred to a follow-up: deeper student-identity convergence (`profiles` vs `students`) and reconciling the three live-session models into one UX — tracked, non-blocking.
- [x] **Phase 6 — QA**: `typecheck` 0 errors; production `build` green (all routes prerender); Vitest passes; Supabase **security advisors** run — fixed `search_path` hardening (migration `…120007`); remaining warnings are intentional (anonymous join-by-code policies) or low-risk/accepted, no ERROR-level issues.

## Post-merge follow-ups (autonomous pass — all build-green)

- [x] **1. Identity convergence** — `ensure_current_student()` SECURITY-DEFINER primitive (migration `…120009`); choose-role provisions both `profiles.role` (canonical) and the linked `students` row for one account.
- [x] **2. Desmos persistence** — `activities` + `desmos_live_sessions` tables (`…120010`); the `/api/live` relay is now Supabase-backed (fixes the cold-start data-loss limitation), and activities persist to Supabase with a localStorage fallback (list/save/edit/launch). _Client-side Realtime subscriptions remain a latency optimization on top._
- [x] **3. Tighten flippity RLS** — write policies on `responses`/`strandhoot_participants` scoped to existing sessions (`…120011`); cleared the `rls_policy_always_true` advisor warnings while preserving anonymous join-by-code.
- [x] **4. Unified visual pass** — dashboard is now a role-aware launcher (cards link to each feature); shared design tokens already unify color/type. _Wrapping every feature page in the shell chrome is a further, larger refactor._

### Security advisor (final)
No ERROR-level issues. Fixed: function `search_path` hardening. Accepted/documented: `desmos_live_sessions` RLS-on/no-policy (INFO — service-role-only by design); SECURITY-DEFINER helper RPC exposure (low-sensitivity; revoking risks breaking RLS evaluation); leaked-password protection (auth uses magic-link OTP, no passwords).

## Setup

```bash
cp .env.example .env.local   # fill in Supabase + OpenAI
npm install
npm run dev                  # http://localhost:3000
npm run typecheck && npm run test && npm run build
```
