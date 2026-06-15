"use client"

import { useMemo, useState, type CSSProperties } from "react"
import { CheckCircle2, Sparkles } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Data {
  statements: string[]
  scale: string[]
}

const ACCENT = "#d85140"
const DEFAULT_SCALE = ["Not yet", "Developing", "Secure", "Mastered"]

// Colour ramp from "needs work" (warm red) up to "mastered" (green),
// indexed across however many scale levels there are.
const LEVEL_COLORS = ["#dc2626", "#f59e0b", "#3b82f6", "#16a34a", "#7c3aed", "#0891b2"]
function levelColor(level: number, total: number): string {
  if (total <= 1) return LEVEL_COLORS[LEVEL_COLORS.length - 1]
  // Map 0..total-1 onto the available palette stops.
  const idx = Math.round((level / (total - 1)) * (LEVEL_COLORS.length - 1))
  return LEVEL_COLORS[Math.min(idx, LEVEL_COLORS.length - 1)]
}

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const statements = rows
    .slice(1)
    .map((r) => (Array.isArray(r) ? (r[0] || "").trim() : ""))
    .filter((s) => s.length > 0)
  if (!statements.length) return sample
  return { statements, scale: DEFAULT_SCALE }
}

const sample: Data = {
  statements: [
    "I can explain the topic in my own words.",
    "I can solve practice problems without help.",
    "I can identify and correct my own mistakes.",
    "I can teach this concept to a classmate.",
    "I can apply this skill to a new situation.",
    "I can connect this topic to what we learned before.",
  ],
  scale: DEFAULT_SCALE,
}

function SelfAssessment({ data }: { data: Data }) {
  const statements = data.statements.length ? data.statements : sample.statements
  const scale = data.scale.length ? data.scale : DEFAULT_SCALE
  const total = statements.length
  const maxLevel = scale.length - 1

  // ratings[i] = selected level index for statement i, or -1 if unanswered.
  const [ratings, setRatings] = useState<number[]>(() => statements.map(() => -1))
  const [reflection, setReflection] = useState("")

  const answered = useMemo(() => ratings.filter((r) => r >= 0).length, [ratings])
  const allAnswered = answered === total && total > 0

  const select = (stmtIdx: number, level: number) => {
    setRatings((prev) => {
      const next = [...prev]
      next[stmtIdx] = level
      return next
    })
  }

  const restart = () => {
    setRatings(statements.map(() => -1))
    setReflection("")
  }

  // Average level as a 0..100% "readiness" once everything is answered.
  const readiness = useMemo(() => {
    if (!allAnswered || maxLevel <= 0) return 0
    const sum = ratings.reduce((acc, r) => acc + r, 0)
    return Math.round((sum / (total * maxLevel)) * 100)
  }, [allAnswered, maxLevel, ratings, total])

  // How many statements landed on each level (for the summary bars).
  const levelCounts = useMemo(() => {
    const counts = new Array(scale.length).fill(0)
    for (const r of ratings) if (r >= 0) counts[r]++
    return counts as number[]
  }, [ratings, scale.length])

  const readinessColor = levelColor(
    Math.round((readiness / 100) * maxLevel),
    scale.length,
  )

  return (
    <GameFrame
      title="Self Assessment"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div
          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-bold shadow-sm"
          style={{ color: ACCENT }}
        >
          <CheckCircle2 className="size-4" />
          <span className="tabular-nums">
            {answered}/{total}
          </span>
        </div>
      }
    >
      {/* Progress bar */}
      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Progress</span>
          <span className="tabular-nums">
            {total ? Math.round((answered / total) * 100) : 0}%
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${total ? (answered / total) * 100 : 0}%`,
              backgroundColor: ACCENT,
            }}
          />
        </div>
      </div>

      {/* Scale legend */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        {scale.map((label, lvl) => (
          <span
            key={`legend-${lvl}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-2.5 py-1 font-medium text-slate-600 shadow-sm"
          >
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: levelColor(lvl, scale.length) }}
            />
            {label}
          </span>
        ))}
      </div>

      {/* Statements */}
      <div className="space-y-3">
        {statements.map((stmt, i) => {
          const chosen = ratings[i]
          return (
            <div
              key={`stmt-${i}`}
              className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition"
            >
              <div className="flex items-start gap-2">
                <span
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{
                    backgroundColor: chosen >= 0 ? levelColor(chosen, scale.length) : "#cbd5e1",
                  }}
                >
                  {chosen >= 0 ? "✓" : i + 1}
                </span>
                <p className="text-sm font-medium leading-snug text-slate-800 sm:text-base">
                  {stmt}
                </p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {scale.map((label, lvl) => {
                  const active = chosen === lvl
                  const color = levelColor(lvl, scale.length)
                  return (
                    <button
                      key={`opt-${i}-${lvl}`}
                      onClick={() => select(i, lvl)}
                      aria-pressed={active}
                      className={`rounded-lg border px-2 py-2 text-xs font-semibold transition sm:text-sm ${
                        active
                          ? "text-white shadow-sm"
                          : "border-black/10 bg-slate-50 text-slate-600 hover:bg-slate-100"
                      }`}
                      style={
                        active
                          ? { backgroundColor: color, borderColor: color }
                          : undefined
                      }
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary — appears once everything is answered */}
      {allAnswered && (
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
          <div className="flex flex-col items-center gap-1 text-center">
            <Sparkles className="size-7" style={{ color: readinessColor }} />
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Overall readiness
            </p>
            <p
              className="text-5xl font-black tabular-nums"
              style={{ color: readinessColor }}
            >
              {readiness}%
            </p>
          </div>

          {/* Per-level breakdown */}
          <div className="mt-5 space-y-2">
            {scale.map((label, lvl) => {
              const count = levelCounts[lvl]
              const pct = total ? (count / total) * 100 : 0
              const color = levelColor(lvl, scale.length)
              return (
                <div key={`sum-${lvl}`} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-right text-xs font-semibold text-slate-600">
                    {label}
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-xs font-bold tabular-nums text-slate-500">
                    {count}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Reflection */}
          <div className="mt-5">
            <label
              htmlFor="sa-reflection"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              What will you work on next?
            </label>
            <textarea
              id="sa-reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              rows={3}
              placeholder="Jot down your next steps and goals…"
              className="w-full resize-y rounded-xl border border-black/10 bg-slate-50 p-3 text-sm text-slate-800 shadow-inner outline-none transition focus:border-transparent focus:ring-2"
              style={{ "--tw-ring-color": ACCENT } as CSSProperties}
            />
          </div>

          <div className="mt-5 flex justify-center">
            <PlayButton accent={ACCENT} onClick={restart}>
              Start over
            </PlayButton>
          </div>
        </div>
      )}

      {!allAnswered && (
        <p className="mt-5 text-center text-xs text-slate-500">
          Rate every statement to reveal your readiness summary
          {total - answered > 0
            ? ` · ${total - answered} left`
            : ""}
        </p>
      )}
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "self-assessment",
  name: "Self Assessment",
  blurb: "Self-assessment checklist & reflection.",
  icon: "🪞",
  category: "Quizzes & Assessment",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Column: Statement (one per row). First row is headers.",
  sample,
  parse,
  Component: SelfAssessment,
})
