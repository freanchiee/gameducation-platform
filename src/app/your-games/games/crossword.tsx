"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CheckCircle2, Eraser, Eye, Sparkles } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Entry {
  word: string
  clue: string
}
interface Data {
  entries: Entry[]
}

const ACCENT = "#1b7888"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample

  const seen = new Set<string>()
  const entries: Entry[] = []
  for (const r of rows.slice(1)) {
    if (!Array.isArray(r)) continue
    const word = (r[0] || "").toUpperCase().replace(/[^A-Z]/g, "")
    const clue = (r[1] || "").trim()
    if (word.length < 2 || word.length > 12) continue
    if (!clue) continue
    if (seen.has(word)) continue
    seen.add(word)
    entries.push({ word, clue })
  }

  return entries.length >= 2 ? { entries } : sample
}

const sample: Data = {
  entries: [
    { word: "PHOTOSYNTHESIS", clue: "How plants turn light into chemical energy." },
    { word: "OXYGEN", clue: "Gas released by plants and breathed by animals." },
    { word: "CHLOROPHYLL", clue: "Green pigment that absorbs sunlight." },
    { word: "GLUCOSE", clue: "Sugar produced as food by plants." },
    { word: "ROOT", clue: "Anchors a plant and absorbs water." },
    { word: "LEAF", clue: "Flat plant organ where most photosynthesis happens." },
    { word: "STEM", clue: "Supports a plant and transports water upward." },
    { word: "WATER", clue: "Liquid drawn up from the soil." },
    { word: "ENERGY", clue: "What sunlight provides to the reaction." },
    { word: "CARBON", clue: "Element in the dioxide plants take in." },
  ],
}

// ── Crossword generation ──────────────────────────────────────────────────────
//
// Place the longest word horizontally at the origin, then greedily interlock
// each remaining word on a shared letter, alternating orientation. Placements
// that collide or sit illegally adjacent to other words are rejected. Finally
// the occupied cells are normalised into a tight bounding grid.

type Orientation = "across" | "down"

interface Placed {
  word: string
  clue: string
  row: number // grid coords (may be negative pre-normalisation)
  col: number
  dir: Orientation
}

interface Cell {
  ch: string
  /** Clue number shown in the top-left of a starting cell, else 0. */
  number: number
}

interface Puzzle {
  rows: number
  cols: number
  /** Flat grid of length rows*cols; null = black (empty) cell. */
  grid: (Cell | null)[]
  across: { number: number; clue: string; word: string; start: number }[]
  down: { number: number; clue: string; word: string; start: number }[]
  /** Words that could not be interlocked. */
  unplaced: string[]
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Key for a sparse coordinate map. */
const key = (r: number, c: number) => `${r},${c}`

/**
 * Check whether `word` can be laid down starting at (row,col) in `dir`,
 * given the cells already occupied. Returns true only if every overlap
 * matches the same letter AND no illegal adjacency is created (parallel
 * words must not touch, and the ends must not abut another letter).
 */
function canPlace(
  occupied: Map<string, string>,
  word: string,
  row: number,
  col: number,
  dir: Orientation,
): boolean {
  const dr = dir === "down" ? 1 : 0
  const dc = dir === "across" ? 1 : 0

  // Cell immediately before the start and after the end must be empty.
  const beforeKey = key(row - dr, col - dc)
  const afterKey = key(row + dr * word.length, col + dc * word.length)
  if (occupied.has(beforeKey)) return false
  if (occupied.has(afterKey)) return false

  let overlaps = 0
  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i
    const c = col + dc * i
    const existing = occupied.get(key(r, c))
    if (existing !== undefined) {
      if (existing !== word[i]) return false
      overlaps++
      continue
    }
    // This is a fresh cell — its perpendicular neighbours must be empty,
    // otherwise the word would run alongside (touch) another word.
    if (dir === "across") {
      if (occupied.has(key(r - 1, c)) || occupied.has(key(r + 1, c))) return false
    } else {
      if (occupied.has(key(r, c - 1)) || occupied.has(key(r, c + 1))) return false
    }
  }
  // A word that overlaps nothing would float free of the crossword.
  return overlaps > 0
}

function generate(entries: Entry[]): Puzzle {
  // Longest first — the spine of the puzzle. Shuffle equal-length words so
  // restarts vary. Generation runs only after mount, so randomness is safe.
  const ordered = shuffle(entries).sort((a, b) => b.word.length - a.word.length)

  const occupied = new Map<string, string>() // "r,c" -> letter
  const placed: Placed[] = []
  const unplaced: string[] = []

  const place = (e: Entry, row: number, col: number, dir: Orientation) => {
    const dr = dir === "down" ? 1 : 0
    const dc = dir === "across" ? 1 : 0
    for (let i = 0; i < e.word.length; i++) {
      occupied.set(key(row + dr * i, col + dc * i), e.word[i])
    }
    placed.push({ word: e.word, clue: e.clue, row, col, dir })
  }

  // Seed with the longest word, horizontal at origin.
  const first = ordered[0]
  place(first, 0, 0, "across")

  for (let n = 1; n < ordered.length; n++) {
    const e = ordered[n]
    let done = false

    // Try interlocking on a shared letter with each already-placed word.
    // Prefer the orientation perpendicular to the anchor (a real crossing).
    const anchors = shuffle(placed)
    for (const anchor of anchors) {
      if (done) break
      const anchorDr = anchor.dir === "down" ? 1 : 0
      const anchorDc = anchor.dir === "across" ? 1 : 0
      const newDir: Orientation = anchor.dir === "across" ? "down" : "across"
      const ndr = newDir === "down" ? 1 : 0
      const ndc = newDir === "across" ? 1 : 0

      // For each letter of the anchor, find matching letters in the new word.
      for (let ai = 0; ai < anchor.word.length && !done; ai++) {
        const anchorCh = anchor.word[ai]
        const aRow = anchor.row + anchorDr * ai
        const aCol = anchor.col + anchorDc * ai
        for (let wi = 0; wi < e.word.length && !done; wi++) {
          if (e.word[wi] !== anchorCh) continue
          // Position the new word so its wi-th letter sits on the anchor cell.
          const startRow = aRow - ndr * wi
          const startCol = aCol - ndc * wi
          if (canPlace(occupied, e.word, startRow, startCol, newDir)) {
            place(e, startRow, startCol, newDir)
            done = true
          }
        }
      }
    }

    if (!done) unplaced.push(e.word)
  }

  // ── Normalise into a tight bounding grid ──
  let minR = Infinity
  let minC = Infinity
  let maxR = -Infinity
  let maxC = -Infinity
  for (const p of placed) {
    const dr = p.dir === "down" ? 1 : 0
    const dc = p.dir === "across" ? 1 : 0
    const endR = p.row + dr * (p.word.length - 1)
    const endC = p.col + dc * (p.word.length - 1)
    minR = Math.min(minR, p.row, endR)
    minC = Math.min(minC, p.col, endC)
    maxR = Math.max(maxR, p.row, endR)
    maxC = Math.max(maxC, p.col, endC)
  }
  if (!Number.isFinite(minR)) {
    // Nothing placed (shouldn't happen with >=2 entries). Degenerate fallback.
    return { rows: 1, cols: 1, grid: [null], across: [], down: [], unplaced }
  }

  const rows = maxR - minR + 1
  const cols = maxC - minC + 1
  const grid: (Cell | null)[] = new Array(rows * cols).fill(null)
  const idx = (r: number, c: number) => r * cols + c

  for (const p of placed) {
    const dr = p.dir === "down" ? 1 : 0
    const dc = p.dir === "across" ? 1 : 0
    for (let i = 0; i < p.word.length; i++) {
      const r = p.row + dr * i - minR
      const c = p.col + dc * i - minC
      grid[idx(r, c)] = { ch: p.word[i], number: 0 }
    }
  }

  // Number the starting cells in standard crossword reading order.
  const normalised = placed.map((p) => ({
    ...p,
    row: p.row - minR,
    col: p.col - minC,
  }))
  // A cell starts an across word if it has no across-neighbour to the left but
  // has one to the right; similarly for down. We assign numbers by scanning.
  const starts = new Map<number, number>() // flat index -> number
  let counter = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[idx(r, c)]
      if (!cell) continue
      const leftEmpty = c === 0 || !grid[idx(r, c - 1)]
      const rightFilled = c + 1 < cols && !!grid[idx(r, c + 1)]
      const upEmpty = r === 0 || !grid[idx(r - 1, c)]
      const downFilled = r + 1 < rows && !!grid[idx(r + 1, c)]
      const startsAcross = leftEmpty && rightFilled
      const startsDown = upEmpty && downFilled
      if (startsAcross || startsDown) {
        counter++
        cell.number = counter
        starts.set(idx(r, c), counter)
      }
    }
  }

  const across: Puzzle["across"] = []
  const down: Puzzle["down"] = []
  for (const p of normalised) {
    const start = idx(p.row, p.col)
    const number = starts.get(start) ?? 0
    if (p.dir === "across") across.push({ number, clue: p.clue, word: p.word, start })
    else down.push({ number, clue: p.clue, word: p.word, start })
  }
  across.sort((a, b) => a.number - b.number)
  down.sort((a, b) => a.number - b.number)

  return { rows, cols, grid, across, down, unplaced }
}

// ── Component ────────────────────────────────────────────────────────────────

function Crossword({ data }: { data: Data }) {
  const entries = data.entries.length >= 2 ? data.entries : sample.entries

  const [puzzle, setPuzzle] = useState<Puzzle | null>(null)
  const [values, setValues] = useState<Record<number, string>>({})
  const [checked, setChecked] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [seed, setSeed] = useState(0)
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({})

  // Generate AFTER mount so SSR markup stays deterministic (no hydration drift).
  useEffect(() => {
    setPuzzle(generate(entries))
    setValues({})
    setChecked(false)
    setRevealed(false)
  }, [entries, seed])

  const regenerate = useCallback(() => setSeed((s) => s + 1), [])

  const letterIndices = useMemo(() => {
    if (!puzzle) return [] as number[]
    const out: number[] = []
    puzzle.grid.forEach((cell, i) => {
      if (cell) out.push(i)
    })
    return out
  }, [puzzle])

  const setLetter = (i: number, raw: string) => {
    const ch = raw.toUpperCase().replace(/[^A-Z]/g, "").slice(-1)
    setValues((prev) => ({ ...prev, [i]: ch }))
    if (checked) setChecked(false)
  }

  // Move focus to the next letter cell when one is filled.
  const focusNext = (i: number) => {
    const order = letterIndices
    const at = order.indexOf(i)
    const next = order[at + 1]
    if (next !== undefined) inputRefs.current[next]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (!puzzle) return
    const cols = puzzle.cols
    const r = Math.floor(i / cols)
    const c = i % cols
    const tryFocus = (rr: number, cc: number) => {
      if (rr < 0 || cc < 0 || rr >= puzzle.rows || cc >= cols) return
      const ni = rr * cols + cc
      if (puzzle.grid[ni]) inputRefs.current[ni]?.focus()
    }
    if (e.key === "ArrowRight") {
      e.preventDefault()
      tryFocus(r, c + 1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      tryFocus(r, c - 1)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      tryFocus(r + 1, c)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      tryFocus(r - 1, c)
    } else if (e.key === "Backspace" && !(values[i] ?? "")) {
      // Step backwards through the letter sequence on an empty cell.
      const order = letterIndices
      const at = order.indexOf(i)
      const prev = order[at - 1]
      if (prev !== undefined) inputRefs.current[prev]?.focus()
    }
  }

  const check = () => {
    setRevealed(false)
    setChecked(true)
  }
  const reveal = () => {
    setChecked(false)
    setRevealed(true)
  }
  const clearAll = () => {
    setValues({})
    setChecked(false)
    setRevealed(false)
  }

  // Per-cell correctness (only meaningful once checked).
  const isCorrectCell = (i: number) => {
    if (!puzzle) return false
    const cell = puzzle.grid[i]
    if (!cell) return false
    return (values[i] ?? "") === cell.ch
  }

  // Per-word solved state for the score line.
  const wordSolved = (start: number, list: Puzzle["across"]): boolean => {
    if (!puzzle) return false
    const entry = list.find((w) => w.start === start)
    if (!entry) return false
    return checkWord(entry.word, start, list === puzzle.across)
  }

  const checkWord = (word: string, start: number, across: boolean): boolean => {
    if (!puzzle) return false
    const cols = puzzle.cols
    for (let i = 0; i < word.length; i++) {
      const idx = across ? start + i : start + i * cols
      if ((values[idx] ?? "") !== word[i]) return false
    }
    return true
  }

  const totalWords = puzzle ? puzzle.across.length + puzzle.down.length : 0
  const solvedCount = useMemo(() => {
    if (!puzzle) return 0
    let n = 0
    for (const w of puzzle.across) if (checkWord(w.word, w.start, true)) n++
    for (const w of puzzle.down) if (checkWord(w.word, w.start, false)) n++
    return n
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle, values])
  const allSolved = totalWords > 0 && solvedCount === totalWords

  // Loading state until generation completes client-side.
  if (!puzzle) {
    return (
      <GameFrame title="Crossword" accent={ACCENT}>
        <div className="mx-auto grid max-w-sm grid-cols-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded bg-slate-200" />
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">Building puzzle…</p>
      </GameFrame>
    )
  }

  const cellPx = "min(2.4rem, 9vw)"

  return (
    <GameFrame
      title="Crossword"
      accent={ACCENT}
      onRestart={clearAll}
      toolbar={
        <div
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold shadow-sm"
          style={
            allSolved
              ? { backgroundColor: "#f0fdf4", color: "#15803d" }
              : { backgroundColor: "#f1f5f9", color: "#475569" }
          }
        >
          <span className="tabular-nums">
            solved {solvedCount}/{totalWords} words
          </span>
        </div>
      }
    >
      {allSolved && (
        <div
          className="mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-sm"
          style={{ backgroundColor: ACCENT }}
        >
          <CheckCircle2 className="size-5 shrink-0" />
          Solved! Every word is correct. 🎉
        </div>
      )}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Grid */}
        <div className="min-w-0 lg:flex-1">
          <div className="overflow-auto rounded-2xl border border-black/10 bg-slate-800 p-2 shadow-sm sm:p-3">
            <div
              className="mx-auto grid w-max gap-px"
              style={{ gridTemplateColumns: `repeat(${puzzle.cols}, ${cellPx})` }}
            >
              {puzzle.grid.map((cell, i) => {
                if (!cell) {
                  return (
                    <div
                      key={i}
                      className="rounded-[2px] bg-slate-800"
                      style={{ width: cellPx, height: cellPx }}
                    />
                  )
                }
                const val = revealed ? cell.ch : values[i] ?? ""
                const showState = checked && !revealed && val !== ""
                const correct = isCorrectCell(i)
                let bg = "#ffffff"
                let color = "#0f172a"
                if (revealed) {
                  bg = "#ecfeff"
                  color = ACCENT
                } else if (showState) {
                  bg = correct ? "#f0fdf4" : "#fef2f2"
                  color = correct ? "#15803d" : "#b91c1c"
                }
                return (
                  <div
                    key={i}
                    className="relative"
                    style={{ width: cellPx, height: cellPx }}
                  >
                    {cell.number > 0 && (
                      <span className="pointer-events-none absolute left-[2px] top-[1px] z-10 text-[0.5rem] font-bold leading-none text-slate-400">
                        {cell.number}
                      </span>
                    )}
                    <input
                      ref={(el) => {
                        inputRefs.current[i] = el
                      }}
                      type="text"
                      inputMode="text"
                      maxLength={1}
                      value={val}
                      disabled={revealed}
                      onChange={(e) => {
                        setLetter(i, e.target.value)
                        if (e.target.value) focusNext(i)
                      }}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      onFocus={(e) => e.target.select()}
                      autoComplete="off"
                      autoCapitalize="characters"
                      spellCheck={false}
                      aria-label={`Cell row ${Math.floor(i / puzzle.cols) + 1} column ${(i % puzzle.cols) + 1}`}
                      className="size-full rounded-[2px] border border-slate-300 text-center text-sm font-bold uppercase outline-none transition focus:border-transparent focus:ring-2 disabled:cursor-default sm:text-base"
                      style={{
                        backgroundColor: bg,
                        color,
                        ...({ ["--tw-ring-color" as string]: `${ACCENT}` } as React.CSSProperties),
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <PlayButton accent={ACCENT} onClick={check} disabled={revealed}>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4" />
                Check
              </span>
            </PlayButton>
            <button
              onClick={reveal}
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Eye className="size-4" />
              Reveal
            </button>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Eraser className="size-4" />
              Clear
            </button>
            <button
              onClick={regenerate}
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Sparkles className="size-4" style={{ color: ACCENT }} />
              New puzzle
            </button>
          </div>

          {puzzle.unplaced.length > 0 && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <span className="font-semibold">Couldn&apos;t place:</span>{" "}
              {puzzle.unplaced.join(", ")}
            </div>
          )}
        </div>

        {/* Clue lists */}
        <div className="w-full shrink-0 space-y-5 lg:w-72">
          <ClueList
            title="Across"
            items={puzzle.across}
            accent={ACCENT}
            solved={(start) => wordSolved(start, puzzle.across)}
          />
          <ClueList
            title="Down"
            items={puzzle.down}
            accent={ACCENT}
            solved={(start) => wordSolved(start, puzzle.down)}
          />
        </div>
      </div>
    </GameFrame>
  )
}

function ClueList({
  title,
  items,
  accent,
  solved,
}: {
  title: string
  items: { number: number; clue: string; word: string; start: number }[]
  accent: string
  solved: (start: number) => boolean
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <h2
        className="mb-2 text-xs font-extrabold uppercase tracking-wide"
        style={{ color: accent }}
      >
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-sm text-slate-400">None.</p>
      ) : (
        <ol className="space-y-1.5">
          {items.map((it) => {
            const done = solved(it.start)
            return (
              <li
                key={`${title}-${it.number}-${it.start}`}
                className={`flex gap-2 text-sm leading-snug transition ${
                  done ? "text-emerald-600 line-through" : "text-slate-700"
                }`}
              >
                <span className="w-5 shrink-0 text-right font-bold tabular-nums text-slate-400">
                  {it.number}
                </span>
                <span>{it.clue}</span>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}

export default defineGame<Data>({
  id: "crossword",
  name: "Crossword",
  blurb: "Auto-generated crossword puzzle.",
  icon: "🧩",
  category: "Word Games",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Word | Clue. First row is headers.",
  sample,
  parse,
  Component: Crossword,
})
