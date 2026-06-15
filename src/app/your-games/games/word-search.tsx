"use client"

import { useEffect, useState, useCallback } from "react"
import { Check } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame } from "./ui"

interface Data {
  words: string[]
}

const ACCENT = "#1b7888"

function parse(rows: Rows): Data {
  const words = rows
    .slice(1)
    .map((r) => (r[0] || "").toUpperCase().replace(/[^A-Z]/g, ""))
    .filter((w) => w.length >= 2 && w.length <= 12)
  // De-duplicate while preserving order.
  const seen = new Set<string>()
  const unique: string[] = []
  for (const w of words) {
    if (!seen.has(w)) {
      seen.add(w)
      unique.push(w)
    }
  }
  return { words: unique.length ? unique : sample.words }
}

const sample: Data = {
  words: ["PYTHON", "JAVA", "RUBY", "SWIFT", "KOTLIN", "RUST", "TYPESCRIPT", "GOLANG"],
}

// ── Grid generation ──────────────────────────────────────────────────────────

interface Placement {
  word: string
  cells: number[] // flat indices, first->last
}

interface Grid {
  size: number
  letters: string[] // flat, length size*size
  placements: Placement[]
}

const DIRS: ReadonlyArray<readonly [number, number]> = [
  [0, 1], // right
  [1, 0], // down
  [1, 1], // down-right
  [-1, 1], // up-right
]
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function buildGrid(words: string[]): Grid {
  const longest = words.reduce((m, w) => Math.max(m, w.length), 0)
  const size = Math.max(10, longest + 1)
  const cells: (string | null)[] = new Array(size * size).fill(null)
  const placements: Placement[] = []

  const idx = (r: number, c: number) => r * size + c

  // Try longest words first — they're hardest to fit.
  const ordered = [...words].sort((a, b) => b.length - a.length)

  for (const word of ordered) {
    let placed = false
    // Random starting offsets so the layout differs each restart.
    const dirOrder = shuffleInPlace([...DIRS.keys()])
    for (let d = 0; d < dirOrder.length && !placed; d++) {
      const [dr, dc] = DIRS[dirOrder[d]]
      const positions: Array<[number, number]> = []
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const endR = r + dr * (word.length - 1)
          const endC = c + dc * (word.length - 1)
          if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue
          positions.push([r, c])
        }
      }
      shuffleInPlace(positions)
      for (const [r, c] of positions) {
        let ok = true
        const cellIdx: number[] = []
        for (let i = 0; i < word.length; i++) {
          const rr = r + dr * i
          const cc = c + dc * i
          const existing = cells[idx(rr, cc)]
          if (existing !== null && existing !== word[i]) {
            ok = false
            break
          }
          cellIdx.push(idx(rr, cc))
        }
        if (!ok) continue
        for (let i = 0; i < word.length; i++) {
          const rr = r + dr * i
          const cc = c + dc * i
          cells[idx(rr, cc)] = word[i]
        }
        placements.push({ word, cells: cellIdx })
        placed = true
        break
      }
    }
    // If it genuinely cannot be placed (very rare with size>=longest+1), skip it
    // so generation never throws or hangs.
  }

  const letters = cells.map((ch) => ch ?? ALPHABET[Math.floor(Math.random() * 26)])
  return { size, letters, placements }
}

function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Compute the straight line of flat indices between two cells, if they share a
// row / column / diagonal. Returns null otherwise.
function lineBetween(a: number, b: number, size: number): number[] | null {
  const ar = Math.floor(a / size)
  const ac = a % size
  const br = Math.floor(b / size)
  const bc = b % size
  const dr = br - ar
  const dc = bc - ac
  const aDr = Math.abs(dr)
  const aDc = Math.abs(dc)
  const sameRow = dr === 0
  const sameCol = dc === 0
  const diag = aDr === aDc
  if (!sameRow && !sameCol && !diag) return null
  const len = Math.max(aDr, aDc)
  const stepR = dr === 0 ? 0 : dr / aDr
  const stepC = dc === 0 ? 0 : dc / aDc
  const out: number[] = []
  for (let i = 0; i <= len; i++) {
    out.push((ar + stepR * i) * size + (ac + stepC * i))
  }
  return out
}

// ── Component ────────────────────────────────────────────────────────────────

function WordSearch({ data }: { data: Data }) {
  const words = data.words
  const [grid, setGrid] = useState<Grid | null>(null)
  const [found, setFound] = useState<Set<string>>(new Set())
  const [foundCells, setFoundCells] = useState<Set<number>>(new Set())
  const [first, setFirst] = useState<number | null>(null)
  const [flash, setFlash] = useState<"hit" | "miss" | null>(null)
  const [seed, setSeed] = useState(0)

  // Random grid generation happens AFTER mount (effect) to avoid SSR hydration
  // mismatch — render order is deterministic until then.
  useEffect(() => {
    setGrid(buildGrid(words))
    setFound(new Set())
    setFoundCells(new Set())
    setFirst(null)
    setFlash(null)
    // seed forces regeneration on restart; words covers data changes.
  }, [words, seed])

  const restart = useCallback(() => setSeed((s) => s + 1), [])

  const handleCell = (i: number) => {
    if (!grid || foundCells.has(i)) return
    if (first === null) {
      setFirst(i)
      return
    }
    if (first === i) {
      setFirst(null)
      return
    }
    const line = lineBetween(first, i, grid.size)
    if (!line) {
      setFirst(i) // restart selection from the new cell
      return
    }
    const str = line.map((c) => grid.letters[c]).join("")
    const rev = [...str].reverse().join("")
    const match = words.find((w) => !found.has(w) && (w === str || w === rev))
    if (match) {
      setFound((prev) => new Set(prev).add(match))
      setFoundCells((prev) => {
        const n = new Set(prev)
        line.forEach((c) => n.add(c))
        return n
      })
      setFlash("hit")
    } else {
      setFlash("miss")
    }
    setFirst(null)
    window.setTimeout(() => setFlash(null), 450)
  }

  const total = words.length
  const remaining = total - found.size
  const won = total > 0 && remaining === 0

  // Loading shimmer until the grid is generated client-side.
  if (!grid) {
    return (
      <GameFrame title="Word Search" accent={ACCENT}>
        <div className="mx-auto grid max-w-md grid-cols-10 gap-1">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded bg-slate-200" />
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">Building grid…</p>
      </GameFrame>
    )
  }

  return (
    <GameFrame title="Word Search" accent={ACCENT} onRestart={restart}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-600">
          Found <span style={{ color: ACCENT }}>{found.size}</span> / {total}
        </div>
        <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${total ? (found.size / total) * 100 : 0}%`,
              backgroundColor: ACCENT,
            }}
          />
        </div>
      </div>

      {won && (
        <div
          className="mb-4 rounded-xl px-4 py-3 text-center text-sm font-bold text-white shadow-sm"
          style={{ backgroundColor: ACCENT }}
        >
          🎉 You found every word! Hit Restart for a fresh grid.
        </div>
      )}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Grid */}
        <div
          className={`flex-1 rounded-xl border border-black/10 bg-white p-2 shadow-sm transition-colors sm:p-3 ${
            flash === "miss" ? "ring-2 ring-red-300" : flash === "hit" ? "ring-2 ring-emerald-300" : ""
          }`}
        >
          <div
            className="grid gap-1 select-none"
            style={{ gridTemplateColumns: `repeat(${grid.size}, minmax(0, 1fr))` }}
          >
            {grid.letters.map((ch, i) => {
              const isFound = foundCells.has(i)
              const isFirst = first === i
              return (
                <button
                  key={i}
                  onClick={() => handleCell(i)}
                  aria-label={`cell ${ch}`}
                  className={`flex aspect-square items-center justify-center rounded text-[11px] font-bold uppercase transition sm:text-sm ${
                    isFound
                      ? "text-white shadow-inner"
                      : isFirst
                        ? "text-white ring-2 ring-offset-1"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  style={
                    isFound
                      ? { backgroundColor: ACCENT }
                      : isFirst
                        ? { backgroundColor: ACCENT, opacity: 0.7 }
                        : undefined
                  }
                >
                  {ch}
                </button>
              )
            })}
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">
            Click the first letter, then the last letter of a word.
          </p>
        </div>

        {/* Word list */}
        <div className="w-full shrink-0 sm:w-44">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Words</h2>
          <ul className="flex flex-wrap gap-1.5 sm:flex-col sm:gap-1">
            {words.map((w) => {
              const done = found.has(w)
              return (
                <li
                  key={w}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-sm font-semibold transition ${
                    done ? "bg-emerald-50 text-emerald-700 line-through" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {done && <Check className="size-3.5 shrink-0" />}
                  {w}
                </li>
              )
            })}
          </ul>
          {first !== null && (
            <button
              onClick={() => setFirst(null)}
              className="mt-3 w-full rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              Clear selection
            </button>
          )}
        </div>
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "word-search",
  name: "Word Search",
  blurb: "Find the hidden words in a generated letter grid.",
  icon: "🔎",
  category: "Word Games",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Column: Word (one per row). First row is headers.",
  sample,
  parse,
  Component: WordSearch,
})
