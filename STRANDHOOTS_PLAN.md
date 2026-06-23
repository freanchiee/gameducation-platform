# Strandhoots — Build Plan & Status

Goal: a library of MYP Physics "strandhoots" (gamified, criterion-aligned assessment
mini-apps) — **5 per MYP Sciences criterion (A/B/C/D) = 20 total** — integrated into the
platform with the host → lobby → live-dashboard flow.

## Architecture (decided & built in Phase 1)

**One data-driven engine, not 20 SPAs.** New strandhoots = author a typed content pack
+ pick artifacts. No per-app build, no iframe, no `npm install` disk churn.

- Engine: `src/app/strandhoots/engine/` — `StrandhootEngine.tsx` (welcome → dashboard →
  strand[guided/response/sim] → results+PDF), `types.ts` (StrandhootPack contract),
  `evaluate.ts` (offline auto-leveling), `sync.ts` (Supabase `responses` writes), `pdf.ts`.
- Response renderers: `engine/responses/` — `QuestionEngine` (A), `LeveledTextResponse`
  (B/C/D), `ScenarioQuiz` (D warm-ups).
- Artifacts (drop-in, keyed): `artifacts/registry.tsx` → `DataProcessor` (editable table →
  linearise → least-squares best-fit → readout), sims `MotionLab`, `PendulumLab`,
  `ResourceMixExplorer`.
- Content packs: `src/app/strandhoots/packs/`.
- Catalog: `strandhoots.ts` carries `mode: "native" | "iframe"`. Native = engine + pack;
  iframe = the 3 legacy vendored Vite SPAs (kept working, to be re-authored in Phase 2).
- Play route `play/[slug]/page.tsx` branches native vs iframe; uses a real UUID studentId.

### Data contract (verified against the live DB)
`responses` (one row per student × session × strandhoot): `strand1..5` + `strand1..5_level`,
`player_name`, `is_typing`, upsert `onConflict: student_id,session_code,experiment`
(experiment = slug). Migrations added: `player_name`, `is_typing`, the unique index, and
Realtime publication for `responses` + `strandhoot_participants`. Solo play (`sessionCode=solo`)
is local-only (no session row → FK/RLS would reject; by design).

## The 20 strandhoots

| # | Crit | Topic | Slug | Status |
|---|------|-------|------|--------|
| A1 | A | Kinematics & motion graphs | `kinematics-crit-a` | ✅ native (Phase 1) |
| A2 | A | Forces & Newton's laws | `forces-crit-a` | ✅ native (Phase 2) |
| A3 | A | Electric circuits & Ohm's law | `circuits-crit-a` | ✅ native (Phase 2) |
| A4 | A | Waves & the wave equation v=fλ | `waves-crit-a` | ✅ native (Phase 2) |
| A5 | A | Refraction & total internal reflection | `tir-criteria-a` | ✅ native (Phase 2, re-authored) |
| B1 | B | Pendulum: length vs period | `pendulum-crit-b` | ✅ native (Phase 1) |
| B2 | B | Magnetism: distance vs field strength | `lab-report-criteria-b` | ✅ native (Phase 2, re-authored) |
| B3 | B | Resistance of a wire (length vs R) | `wire-resistance-crit-b` | ✅ native (Phase 2) |
| B4 | B | Rate of cooling (insulation) | `cooling-crit-b` | ✅ native (Phase 2) |
| B5 | B | Hooke's law: force vs extension | `hookes-law-crit-b` | ✅ native (Phase 2) |
| C1 | C | Magnetism data processing | `magnetism-crit-c` | ✅ native (Phase 2, re-authored) |
| C2 | C | Radioactive decay & half-life | `half-life-crit-c` | ✅ native (Phase 1) |
| C3 | C | Acceleration from motion data | `acceleration-crit-c` | ✅ native (Phase 2) |
| C4 | C | Specific heat capacity | `shc-crit-c` | ✅ native (Phase 2) |
| C5 | C | Boyle's law (P vs 1/V) | `boyles-law-crit-c` | ✅ native (Phase 2) |
| D1 | D | Energy resources & sustainability | `energy-resources-crit-d` | ✅ native (Phase 1) |
| D2 | D | Nuclear power & radioactive waste | `nuclear-society-crit-d` | ✅ native (Phase 2) |
| D3 | D | Climate change & the greenhouse effect | `climate-crit-d` | ✅ native (Phase 2) |
| D4 | D | Communication & the EM spectrum | `em-spectrum-crit-d` | ✅ native (Phase 2) |
| D5 | D | Transport safety & momentum | `transport-safety-crit-d` | ✅ native (Phase 2) |

## Phase 1 — DONE ✅
- [x] Engine + artifact library (data-driven, native Next).
- [x] 4 proof strandhoots (one per criterion): A1, B1, C2, D1 — registered & verified.
- [x] Host → lobby → launch → `responses` → dashboard wired to the **real** tables
      (`strandhoot_sessions`, `strandhoot_participants`, `responses`). Hub "Host live session"
      button creates the session with the slug; lobby launches the internal play route
      (the hardcoded `makersapien.github.io/magnetism-crit-c` URL is gone); dashboard merges
      participants + responses with Realtime + polling fallback.
- [x] DB migrations: responses unique index + `player_name`/`is_typing`; Realtime publication.
- [x] `tsc --noEmit` clean; `npm run build` green.
- [x] Browser-verified (engine welcome→dashboard→strand→sim→leveling, no console errors) and
      the anon-key `responses` write contract verified end-to-end (RLS + FK + upsert merge).

## Phase 2 — DONE ✅
- [x] Author the remaining 13 native packs (A2-A4, B3-B5, C3-C5, D2-D5).
- [x] Re-author the 3 legacy iframe apps (A5/B2/C1) as native packs; LEGACY array
      cleared in `strandhoots.ts`; vendored SPA cleanup is optional (non-blocking).
- [x] `tsc --noEmit` clean after all 20 packs registered.
- [ ] Optional engine features: path-branching (packs currently single-path), per-question
      restore for question strands.

## Chemistry packs — DONE ✅ (48 packs, all 12 chapters × 4 criteria)

Authored from: *MYP Chemistry: A concept-based approach, Years 4 & 5*, Gary Horner, Oxford 2018.
All packs follow the native engine contract (`StrandhootPack`). `tsc --noEmit` clean.

| Ch | Title | Slugs | Status |
|----|-------|-------|--------|
| 1 | Balance | `balance-crit-{a,b,c,d}` | ✅ |
| 2 | Evidence | `evidence-crit-{a,b,c,d}` | ✅ |
| 3 | Consequences | `consequences-crit-{a,b,c,d}` | ✅ |
| 4 | Energy | `energy-crit-{a,b,c,d}` | ✅ |
| 5 | Conditions | `conditions-crit-{a,b,c,d}` | ✅ |
| 6 | Form | `form-crit-{a,b,c,d}` | ✅ |
| 7 | Function | `function-crit-{a,b,c,d}` | ✅ |
| 8 | Interaction | `interaction-crit-{a,b,c,d}` | ✅ |
| 9 | Models | `models-crit-{a,b,c,d}` | ✅ |
| 10 | Movement | `movement-crit-{a,b,c,d}` | ✅ |
| 11 | Patterns | `patterns-crit-{a,b,c,d}` | ✅ |
| 12 | Transfer | `transfer-crit-{a,b,c,d}` | ✅ |

Per-criterion structure (all chapters):
- **A** — 4 knowledge strands, MCQ/fill at L2/L4 + short at L6/L8
- **B** — 4 design strands: Research question → Hypothesis → Variables → Method (based on a real chapter experiment)
- **C** — 4 data strands: Presenting → Processing → Conclusion → Evaluating; `data-processor` artifact with a real chapter dataset and a linearising van't Hoff / ln / 1/x transform where applicable
- **D** — 4 reflection strands: Applications → Implications & impacts → Making a judgement → Communicating the science; 1–2 warm-up scenario MCQs per strand

## Biology packs — IN PROGRESS 🚧 (48 packs, all 12 chapters × 4 criteria)

Authored from: *MYP Biology: A concept-based approach, Years 4 & 5*, Andrew Allott & David Mindorff, Oxford 2017.

| Ch | Title | Slugs | Status |
|----|-------|-------|--------|
| 1 | Energy | `respiration-crit-{a,b,c,d}` | ✅ |
| 2 | Transformation | `enzymes-crit-{a,b,c,d}` | ✅ |
| 3 | Form | `cell-structure-crit-{a,b,c,d}` | ✅ |
| 4 | Function | `digestion-crit-{a,b,c,d}` | ✅ |
| 5 | Movement | `osmosis-crit-{a,b,c,d}` | ✅ |
| 6 | Interaction | `pathogens-crit-{a,b,c,d}` | ✅ |
| 7 | Balance | `homeostasis-crit-{a,b,c,d}` | ✅ |
| 8 | Environment | `habitat-crit-{a,b,c,d}` | ✅ |
| 9 | Patterns | `genetics-crit-{a,b,c,d}` | ✅ |
| 10 | Consequences | `evolution-crit-{a,b,c,d}` | ✅ |
| 11 | Evidence | `health-crit-{a,b,c,d}` | ✅ |
| 12 | Models | `conservation-crit-{a,b,c,d}` | ✅ |

## Known issues / cleanup (outside the verified Phase-1 path)
These alternate/legacy strandhoot paths still query the **non-existent `participants` table**
(or the wrong `sessions` table) and need the same migration to
`strandhoot_participants` / `strandhoot_sessions`:
`src/app/components/strandhoot/useParticipant.ts`,
`src/app/components/strandhoot/[sessionCode]/StrandhootSessionView.tsx`,
`src/app/strandhoot-builder/utils/demoSession.ts`,
`src/app/strandhoot-routes/shared/page.tsx`.
(The canonical hub → lobby → dashboard path does **not** use these and is fully wired.)
