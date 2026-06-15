"use client"

import { useEffect, useMemo, useState } from "react"
import { Target, TrendingUp } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame } from "./ui"

interface Item {
  label: string
  current: number
  target: number
}
interface Data {
  items: Item[]
}

const ACCENT = "#1f306d"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample

  const items = rows
    .slice(1)
    .filter((r) => Array.isArray(r) && (r[0] || r[1] || r[2]))
    .map((r) => {
      const label = (r[0] || "").trim() || "Untitled"
      const current = Number(r[1]) || 0
      const target = Number(r[2]) || 100
      return { label, current, target }
    })

  return items.length ? { items } : sample
}

const sample: Data = {
  items: [
    { label: "Chapters read", current: 8, target: 12 },
    { label: "Practice problems", current: 145, target: 150 },
    { label: "Vocabulary mastered", current: 60, target: 200 },
    { label: "Lab reports submitted", current: 3, target: 5 },
    { label: "Flashcards reviewed", current: 420, target: 500 },
    { label: "Essay drafts", current: 1, target: 4 },
  ],
}

/** Clamp a value into the 0..100 range. */
function clampPct(n: number): number {
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(100, n))
}

/** Colour code by completion percentage. */
function colorFor(pct: number): string {
  if (pct < 34) return "#ef4444" // red
  if (pct < 67) return "#f59e0b" // amber
  return "#22c55e" // green
}

function ProgressBar({
  label,
  pct,
  current,
  target,
  mounted,
  delay,
}: {
  label: string
  pct: number
  current: number
  target: number
  mounted: boolean
  delay: number
}) {
  const color = colorFor(pct)
  const done = pct >= 100
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-end justify-between gap-3">
        <span className="font-semibold text-slate-800">{label}</span>
        <span className="shrink-0 text-sm tabular-nums text-slate-500">
          {current} / {target}{" "}
          <span className="font-bold" style={{ color }}>
            ({Math.round(pct)}%)
          </span>
        </span>
      </div>
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: mounted ? `${pct}%` : "0%",
            backgroundColor: color,
            transition: `width 900ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
          }}
        />
        {done && (
          <span className="absolute inset-0 flex items-center justify-end pr-2 text-[0.65rem] font-bold uppercase tracking-wide text-white">
            Done
          </span>
        )}
      </div>
    </div>
  )
}

function ProgressIndicator({ data }: { data: Data }) {
  const items = data.items.length ? data.items : sample.items

  const [mounted, setMounted] = useState(false)
  // Bumping this key restarts the CSS transitions by remounting the bars.
  const [run, setRun] = useState(0)

  // Trigger the grow-in animation after mount (hydration-safe).
  useEffect(() => {
    setMounted(false)
    const t = window.setTimeout(() => setMounted(true), 60)
    return () => window.clearTimeout(t)
  }, [run])

  const rows = useMemo(
    () =>
      items.map((it) => {
        const target = it.target > 0 ? it.target : 100
        const pct = clampPct((it.current / target) * 100)
        return { ...it, pct }
      }),
    [items],
  )

  const avg = useMemo(() => {
    if (!rows.length) return 0
    return clampPct(rows.reduce((sum, r) => sum + r.pct, 0) / rows.length)
  }, [rows])

  const completed = rows.filter((r) => r.pct >= 100).length
  const avgColor = colorFor(avg)

  const restart = () => setRun((r) => r + 1)

  return (
    <GameFrame title="Progress Indicator" accent={ACCENT} onRestart={restart}>
      {/* Overall average */}
      <div
        className="mb-6 rounded-2xl p-5 text-white shadow-lg"
        style={{ background: `linear-gradient(135deg, ${ACCENT}, #2f4699)` }}
      >
        <div className="mb-3 flex items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5" />
            <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
              Overall progress
            </span>
          </div>
          <span className="text-3xl font-black tabular-nums">{Math.round(avg)}%</span>
        </div>
        <div className="relative h-5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: mounted ? `${avg}%` : "0%",
              backgroundColor: avgColor,
              transition: "width 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-sm opacity-90">
          <Target className="size-4" />
          <span>
            {completed} of {rows.length} goal{rows.length === 1 ? "" : "s"} complete
          </span>
        </div>
      </div>

      {/* Per-goal bars */}
      <div className="space-y-3">
        {rows.map((r, i) => (
          <ProgressBar
            key={`${run}-${i}-${r.label}`}
            label={r.label}
            pct={r.pct}
            current={r.current}
            target={r.target}
            mounted={mounted}
            delay={i * 90}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Red below 34% · amber below 67% · green at 67% and above
      </p>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "progress",
  name: "Progress Indicator",
  blurb: "Progress bars for goals and milestones.",
  icon: "📊",
  category: "Study & Review",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Label | Current | Target. First row is headers.",
  sample,
  parse,
  Component: ProgressIndicator,
})
