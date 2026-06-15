# Game-Based Learning — Flippity.net Parity ✅

The **Game-Based Learning** path now mirrors the full
[flippity.net](https://flippity.net/) activity catalog — **all 32 activities**,
each playable instantly inside this app.

---

## How our version works (vs. flippity)

Flippity turns a **Google Sheet** into an activity. We support that too, but we
removed the hard dependency on Google so every activity is **instantly playable**:

- **Use sample** — every activity ships a built-in demo dataset; zero setup.
- **Paste data** — paste tab- or comma-separated rows (straight from any
  spreadsheet); parsed client-side.
- **Google Sheet** — paste a Sheet URL; rows are fetched via `/api/sheets`
  (needs the server's Google service-account env vars).

### Key files

| Concern | Path |
| --- | --- |
| Activity gallery (the hub) | `src/app/your-games/page.tsx` |
| Play any activity | `src/app/your-games/play/[type]/page.tsx` |
| Module interface | `src/app/your-games/games/types.ts` |
| Registry + catalog | `src/app/your-games/games/registry.ts` |
| Paste/sheet parsing | `src/app/your-games/games/parse.ts` |
| Shared UI chrome | `src/app/your-games/games/ui.tsx` |
| One file per activity | `src/app/your-games/games/<id>.tsx` |
| (Legacy) sheet game route | `src/app/game/[id]/page.tsx` + `src/app/api/sheets/route.ts` |

---

## Catalog — 32 / 32 ready ✅

### Study & Review
`flashcards` · `matching` (concentration) · `timeline` · `flexcards` · `progress`

### Quizzes & Assessment
`quiz-show` (Jeopardy board) · `video-game` (arcade quiz) · `cloze` ·
`certificate-quiz` · `self-assessment`

### Word Games
`word-search` · `word-scramble` · `snowman` (hangman) · `wordmaster` (Wordle) ·
`spelling` · `typing-test` · `crossword` (auto-generated)

### Random & Pickers
`name-picker` · `randomizer` (wheel) · `group-game`

### Competition
`bingo` · `leaderboard` · `tournament` · `board-game` · `connecto` ·
`virtual-breakout` · `badge-tracker`

### Creative
`madlibs` · `word-cloud` · `fun-with-fonts` · `color-by-number` · `manipulatives`

Every activity is a `GameModule` (`status: "ready"`); the gallery at
`/your-games` lists them by category and each plays at
`/your-games/play/<id>`.

---

## How to add / change an activity

1. Create `src/app/your-games/games/<id>.tsx` following `flashcards.tsx`:
   - `"use client"`, a local `interface Data`, `parse(rows): Data` (row 0 =
     headers, defensive fallback to `sample`), `const sample`, and the
     `Component`.
   - `export default defineGame<Data>({ id, name, blurb, icon, category,
     accent, status: "ready", schemaHint, sample, parse, Component })`.
   - Hydration: never use the random API / read `window` / read the date during
     render or in a `useState` initializer — do it in a `useEffect`.
2. In `registry.ts`: `import <id> from "./<id>"` and add to `GAMES`.
3. Done — it appears in the gallery and plays at `/your-games/play/<id>`.

---

## Next milestones (beyond catalog parity)

These are larger, separate efforts — noted for the next phase:

1. **Live multiplayer** — join-code lobbies + Supabase Realtime so a class plays
   together (reuse the existing strandhoot `*_sessions` / `*_participants`
   tables). Today the activities are single-device.
2. **Save & share** — persist a configured activity (parsed data) to a table so
   a teacher shares a link instead of re-pasting.
3. **Richer media** — image/audio support across more activities; print/export
   polish (certificates, color-by-number, crosswords).
