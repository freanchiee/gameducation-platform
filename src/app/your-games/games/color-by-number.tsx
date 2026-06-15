"use client"

import { useEffect, useMemo, useState } from "react"
import { Eraser, Lightbulb, Printer } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Data {
  grid: number[][]
  palette: string[]
}

const ACCENT = "#7c5cbf"

// Index 0 is the "blank"/white. Indices 1..n are paint colours.
const PALETTE: string[] = [
  "#ffffff", // 0 — blank
  "#ef4444", // 1 — red
  "#f97316", // 2 — orange
  "#facc15", // 3 — yellow
  "#22c55e", // 4 — green
  "#14b8a6", // 5 — teal
  "#3b82f6", // 6 — blue
  "#7c5cbf", // 7 — purple
  "#ec4899", // 8 — pink
  "#78350f", // 9 — brown
]

/** Split a single cell that may contain several numbers, e.g. "0 1 2" or "0,1,2". */
function splitNumbers(cell: string): number[] {
  return cell
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => Number(s))
}

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample

  const dataRows = rows.slice(1).filter((r) => Array.isArray(r) && r.some((c) => (c || "").trim() !== ""))
  if (dataRows.length === 0) return sample

  const parsed: number[][] = dataRows.map((r) => {
    const cells = r.map((c) => (c == null ? "" : String(c)))
    let nums: number[]
    // Case A: a single cell holding all numbers ("0 1 2 0"). Split it.
    if (cells.length === 1 || cells.filter((c) => c.trim() !== "").length === 1) {
      const only = cells.find((c) => c.trim() !== "") ?? ""
      nums = splitNumbers(only)
    } else {
      // Case B: each cell is one number.
      nums = cells.flatMap((c) => splitNumbers(c))
    }
    // Sanitise: clamp to valid palette indices, NaN -> 0 (blank).
    return nums.map((n) => (Number.isFinite(n) && n >= 0 && n < PALETTE.length ? Math.floor(n) : 0))
  })

  const validRows = parsed.filter((r) => r.length > 0)
  if (validRows.length === 0) return sample

  // Build a rectangular grid; pad short rows with 0 (blank).
  const width = validRows.reduce((m, r) => Math.max(m, r.length), 0)
  if (width === 0) return sample
  const grid = validRows.map((r) => {
    const padded = r.slice(0, width)
    while (padded.length < width) padded.push(0)
    return padded
  })

  return { grid, palette: PALETTE }
}

// A 12x12 heart picture: 1 = red outline/fill, 8 = pink highlight, 0 = blank.
const HEART: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 1, 8, 8, 1, 0, 0, 1, 8, 8, 1, 0],
  [1, 8, 8, 8, 8, 1, 1, 8, 8, 8, 8, 1],
  [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1],
  [1, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1],
  [0, 1, 8, 8, 8, 8, 8, 8, 8, 8, 1, 0],
  [0, 0, 1, 8, 8, 8, 8, 8, 8, 1, 0, 0],
  [0, 0, 0, 1, 8, 8, 8, 8, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 8, 8, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const sample: Data = { grid: HEART, palette: PALETTE }

function ColorByNumber({ data }: { data: Data }) {
  const grid = useMemo(
    () => (Array.isArray(data.grid) && data.grid.length ? data.grid : sample.grid),
    [data.grid],
  )
  const palette = data.palette && data.palette.length ? data.palette : PALETTE

  const rowsN = grid.length
  const colsN = grid.reduce((m, r) => Math.max(m, r.length), 0)

  // Which palette indices actually appear (besides 0) — drives the legend.
  const usedColors = useMemo(() => {
    const set = new Set<number>()
    for (const row of grid) for (const n of row) if (n > 0 && n < palette.length) set.add(n)
    return [...set].sort((a, b) => a - b)
  }, [grid, palette.length])

  // painted[r][c] = palette index the user has applied (0 = empty).
  const blank = useMemo(() => grid.map((r) => r.map(() => 0)), [grid])
  const [painted, setPainted] = useState<number[][]>(blank)
  const [active, setActive] = useState<number>(() => usedColors[0] ?? 1)

  // Reset painted canvas whenever the underlying grid changes (e.g. new data).
  useEffect(() => {
    setPainted(grid.map((r) => r.map(() => 0)))
    setActive(usedColors[0] ?? 1)
  }, [grid, usedColors])

  const totalTargets = useMemo(
    () => grid.reduce((sum, row) => sum + row.filter((n) => n > 0).length, 0),
    [grid],
  )
  const correct = useMemo(() => {
    let n = 0
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        const target = grid[r][c]
        if (target > 0 && painted[r]?.[c] === target) n++
      }
    }
    return n
  }, [grid, painted])

  const pct = totalTargets ? Math.round((correct / totalTargets) * 100) : 0
  const done = totalTargets > 0 && correct === totalTargets

  const paint = (r: number, c: number) => {
    if (done) return
    setPainted((prev) => {
      const next = prev.map((row) => row.slice())
      if (!next[r]) return prev
      // Click an already-active cell to clear it; otherwise apply active colour.
      next[r][c] = next[r][c] === active ? 0 : active
      return next
    })
  }

  const showSolution = () => setPainted(grid.map((r) => r.slice()))
  const clearAll = () => setPainted(grid.map((r) => r.map(() => 0)))
  const restart = () => {
    clearAll()
    setActive(usedColors[0] ?? 1)
  }

  const print = () => {
    if (typeof window !== "undefined") window.print()
  }

  return (
    <GameFrame
      title="Color by Number"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold text-white shadow-sm tabular-nums"
          style={{ backgroundColor: ACCENT }}
        >
          {pct}%
        </div>
      }
    >
      {/* Progress bar */}
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>
            {correct} / {totalTargets} cells coloured correctly
          </span>
          <span>{done ? "Complete!" : `${totalTargets - correct} to go`}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${pct}%`, backgroundColor: done ? "#16a34a" : ACCENT }}
          />
        </div>
      </div>

      {/* Legend / palette picker */}
      <div className="mb-4 flex flex-wrap items-center gap-2 print:hidden">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Key</span>
        {usedColors.map((n) => {
          const selected = n === active
          return (
            <button
              key={n}
              onClick={() => setActive(n)}
              className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 text-sm font-bold shadow-sm transition ${
                selected ? "ring-2 ring-offset-1" : "hover:bg-slate-50"
              }`}
              style={{
                borderColor: selected ? ACCENT : "rgba(0,0,0,0.1)",
                ...(selected ? ({ ["--tw-ring-color" as string]: ACCENT } as Record<string, string>) : {}),
              }}
              aria-pressed={selected}
              aria-label={`Select colour ${n}`}
            >
              <span
                className="size-5 rounded border border-black/10"
                style={{ backgroundColor: palette[n] ?? "#000" }}
              />
              <span className="tabular-nums text-slate-700">{n}</span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="flex justify-center">
        <div
          className="grid select-none gap-px rounded-xl bg-slate-300 p-2 shadow-lg"
          style={{
            gridTemplateColumns: `repeat(${colsN}, minmax(0, 1fr))`,
            maxWidth: "min(100%, 30rem)",
            width: "100%",
          }}
        >
          {grid.map((row, r) =>
            Array.from({ length: colsN }).map((_, c) => {
              const target = row[c] ?? 0
              const isBlankCell = target === 0
              const fill = painted[r]?.[c] ?? 0
              const isCorrect = !isBlankCell && fill === target
              const bg = fill > 0 ? palette[fill] ?? "#fff" : "#ffffff"
              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => !isBlankCell && paint(r, c)}
                  disabled={isBlankCell}
                  className={`relative aspect-square text-[0.55rem] font-semibold leading-none transition sm:text-[0.65rem] ${
                    isBlankCell
                      ? "cursor-default text-transparent"
                      : "cursor-pointer hover:brightness-95"
                  }`}
                  style={{ backgroundColor: bg }}
                  aria-label={isBlankCell ? "blank" : `Cell needs colour ${target}`}
                >
                  {/* Show the target number until the cell is correctly filled. */}
                  {!isBlankCell && !isCorrect && (
                    <span className="absolute inset-0 flex items-center justify-center text-slate-500">
                      {target}
                    </span>
                  )}
                </button>
              )
            }),
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 print:hidden">
        <PlayButton accent="#16a34a" onClick={showSolution}>
          <span className="inline-flex items-center gap-1.5">
            <Lightbulb className="size-4" /> Show solution
          </span>
        </PlayButton>
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Eraser className="size-4" /> Clear
        </button>
        <button
          onClick={print}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Printer className="size-4" /> Print
        </button>
      </div>

      {done && (
        <p className="mt-4 text-center text-lg font-bold" style={{ color: "#16a34a" }}>
          🎉 Picture complete — beautiful work!
        </p>
      )}
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "color-by-number",
  name: "Color by Number",
  blurb: "Color-by-number from an answer key.",
  icon: "🎨",
  category: "Creative",
  accent: ACCENT,
  status: "ready",
  schemaHint:
    "Rows of space/comma-separated numbers forming a grid (0 = blank). First row is headers.",
  sample,
  parse,
  Component: ColorByNumber,
})
