# Unified Supabase schema — reconciliation notes

The unified database merges **LearnBook** (canonical base) and **flippity-clone**.

## Migration order

| File | Source | Contents |
| --- | --- | --- |
| `0001_learnbook_base.sql` | LearnBook (verbatim) | worlds, classes, students, class_enrollments, artifacts, scores, feed_posts, sessions, session_participants, badges, xp_events; enums; `current_student_id()` / `teacher_owns_class()` helpers; RLS; column privileges; `leaderboard` + `teacher_summary` views |
| `0002_learnbook_ai_audit.sql` | LearnBook (verbatim) | `ai_score_audit` table + RLS |
| `0003_flippity_tables.sql` | flippity (reconciled) | profiles, games, strandhoots, strandhoot_sessions, strandhoot_participants, responses |
| `0004_flippity_rls.sql` | new | RLS for all flippity tables |
| `0005_secure_inherited_views.sql` | new | revoke anon/authenticated on `leaderboard` + `teacher_summary` (views bypass RLS) |
| `seed.sql` | new | the four V1 worlds |

> Files on disk carry timestamp prefixes (e.g. `20260614120001_learnbook_base.sql`) for Supabase CLI ordering. Applied to project `cvdoishawxaqiizbryuh` via `supabase db push --db-url`.

> LearnBook's third migration (`..._phase2_compat_on_existing_schema.sql`) is **intentionally omitted** — it's a shim for migrating an existing legacy DB, irrelevant to a fresh project.

## Key reconciliation decisions

### 1. The `sessions` collision → renamed
Both apps defined a `sessions` table with incompatible shapes:
- **LearnBook** `sessions` = class/world/teacher live session (UUID FKs, `session_status` enum) — **kept as-is**.
- **flippity** `sessions` = code-keyed live strandhoot session — **renamed to `strandhoot_sessions`**, and its `participants` → **`strandhoot_participants`**.

The two live-session systems now coexist without conflict. Unifying them in the UI is a Phase 5 concern.

### 2. Two identity models → kept side-by-side (for now)
- **LearnBook**: `students` table (separate from `auth.users`, supports guests via a `student_id` JWT claim) + teachers referenced directly as `auth.users`.
- **flippity**: `profiles(id, role)` keyed 1:1 to `auth.users`.

Both are retained so each feature set keeps working during the port. **Phase 5** converges them into a single identity model.

### 3. RLS — flippity gap closed
flippity shipped with loose/no RLS. `0004` enables RLS on every flippity table:
- `profiles`, `games` → strict owner-only (`auth.uid()`).
- `strandhoots` → public read, service-role writes.
- `strandhoot_sessions` → public read (look up by code to join), creator-only writes.
- `strandhoot_participants`, `responses` → **deliberately permissive** (the `session_code` is the access control for anonymous join-by-code). Flagged for tightening in Phase 5.

## Applying (once the Supabase project exists)

```bash
cd /Users/utkarshkumar/learnbook-platform
npx supabase init                     # creates supabase/config.toml (keeps our migrations/seed)
npx supabase link --project-ref <REF> # REF is in the project URL / Settings → General
npx supabase db push                  # applies 0001 → 0004 to the remote DB

# Seed worlds on the remote DB (db push does not run seed.sql remotely):
#   paste supabase/seed.sql into the dashboard SQL editor, or psql the connection string.

# Regenerate the canonical TypeScript types:
npx supabase gen types typescript --linked > src/lib/supabase/types.ts
```

Until the project is created, `src/lib/supabase/types.ts` stays as the permissive
placeholder so the app still type-checks.
