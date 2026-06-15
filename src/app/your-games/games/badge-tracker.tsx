"use client"

import { useMemo, useState, type CSSProperties } from "react"
import { Award, Check, Trophy } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame } from "./ui"

interface Student {
  name: string
  badges: string[]
}
interface Data {
  students: Student[]
  allBadges: string[]
}

const ACCENT = "#58a65c"

/** Stable, colourful palette for badge columns (cycled). */
const BADGE_COLORS = [
  "#58a65c",
  "#d85140",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#0ea5e9",
  "#14b8a6",
  "#f97316",
  "#6366f1",
]

const MEDALS = ["🥇", "🥈", "🥉"]
const PODIUM = [
  { ring: "ring-amber-300", chip: "bg-amber-100 text-amber-700" },
  { ring: "ring-slate-300", chip: "bg-slate-100 text-slate-600" },
  { ring: "ring-orange-300", chip: "bg-orange-100 text-orange-700" },
]

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample

  const students: Student[] = []
  const seen = new Set<string>()
  const allBadges: string[] = []

  for (const r of rows.slice(1)) {
    if (!Array.isArray(r)) continue
    const name = (r[0] || "").trim()
    if (!name) continue

    const badges: string[] = []
    for (let c = 1; c < r.length; c++) {
      const b = (r[c] || "").trim()
      if (!b) continue
      badges.push(b)
      if (!seen.has(b)) {
        seen.add(b)
        allBadges.push(b)
      }
    }
    students.push({ name, badges })
  }

  if (students.length === 0 || allBadges.length === 0) return sample
  return { students, allBadges }
}

const sample: Data = {
  students: [
    { name: "Ava Chen", badges: ["Reader", "Helper", "Scientist", "Artist"] },
    { name: "Liam Patel", badges: ["Reader", "Mathlete", "Helper"] },
    { name: "Sofia Reyes", badges: ["Reader", "Scientist", "Mathlete", "Artist", "Leader"] },
    { name: "Noah Kim", badges: ["Helper"] },
    { name: "Mia Johnson", badges: ["Reader", "Artist", "Leader"] },
    { name: "Ethan Brooks", badges: ["Mathlete", "Scientist"] },
  ],
  allBadges: ["Reader", "Helper", "Scientist", "Artist", "Mathlete", "Leader"],
}

function colorFor(index: number): string {
  return BADGE_COLORS[index % BADGE_COLORS.length]
}

function BadgeTracker({ data }: { data: Data }) {
  const { students, allBadges } = useMemo(() => {
    if (data.students.length && data.allBadges.length) return data
    return sample
  }, [data])

  // Earned matrix: key `${row}:${col}` -> earned. Seeded from source data.
  const seed = useMemo(() => {
    const s = new Set<string>()
    students.forEach((stu, ri) => {
      const owned = new Set(stu.badges)
      allBadges.forEach((b, ci) => {
        if (owned.has(b)) s.add(`${ri}:${ci}`)
      })
    })
    return s
  }, [students, allBadges])

  const [earned, setEarned] = useState<Set<string>>(() => new Set(seed))

  const toggle = (ri: number, ci: number) => {
    const k = `${ri}:${ci}`
    setEarned((prev) => {
      const next = new Set(prev)
      if (next.has(k)) next.delete(k)
      else next.add(k)
      return next
    })
  }

  const restart = () => setEarned(new Set(seed))

  // Per-student counts + ranking.
  const counts = useMemo(
    () =>
      students.map((stu, ri) => ({
        name: stu.name,
        ri,
        count: allBadges.reduce((n, _b, ci) => n + (earned.has(`${ri}:${ci}`) ? 1 : 0), 0),
      })),
    [students, allBadges, earned],
  )

  const ranking = useMemo(
    () => [...counts].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    [counts],
  )

  const countByRow = useMemo(() => {
    const m = new Map<number, number>()
    counts.forEach((c) => m.set(c.ri, c.count))
    return m
  }, [counts])

  const totalEarned = earned.size
  const totalPossible = students.length * allBadges.length

  // Dense rank by badge count for podium highlighting (ties share a place).
  const placeByRow = useMemo(() => {
    const m = new Map<number, number>()
    let place = 0
    let prev: number | null = null
    ranking.forEach((c) => {
      if (prev === null || c.count !== prev) {
        place += 1
        prev = c.count
      }
      m.set(c.ri, c.count > 0 ? place : 99)
    })
    return m
  }, [ranking])

  return (
    <GameFrame
      title="Badge Tracker"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <span
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
          style={{ backgroundColor: ACCENT }}
        >
          <Award className="size-4" />
          {totalEarned}/{totalPossible}
        </span>
      }
    >
      <p className="mb-4 text-sm text-slate-500">
        Tap any cell to award or remove a badge. Counts and the ranking update live.
      </p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
        {/* Matrix */}
        <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-lg">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 min-w-[8rem] bg-white px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Student
                </th>
                {allBadges.map((b, ci) => (
                  <th key={b + ci} className="px-2 py-3 text-center align-bottom">
                    <span
                      className="inline-flex max-w-[6rem] items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-bold text-white shadow-sm"
                      style={{ backgroundColor: colorFor(ci) }}
                      title={b}
                    >
                      <Award className="size-3 shrink-0" />
                      <span className="truncate">{b}</span>
                    </span>
                  </th>
                ))}
                <th className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {students.map((stu, ri) => {
                const place = placeByRow.get(ri) ?? 99
                const podium = place <= 3 ? PODIUM[place - 1] : null
                return (
                  <tr key={stu.name + ri} className="transition hover:bg-slate-50/70">
                    <td
                      className={`sticky left-0 z-10 bg-white px-4 py-2.5 font-semibold text-slate-700 ${
                        podium ? `ring-2 ring-inset ${podium.ring}` : ""
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {podium && <span aria-hidden>{MEDALS[place - 1]}</span>}
                        <span className="truncate">{stu.name}</span>
                      </span>
                    </td>
                    {allBadges.map((b, ci) => {
                      const k = `${ri}:${ci}`
                      const has = earned.has(k)
                      const color = colorFor(ci)
                      return (
                        <td key={k} className="px-2 py-2 text-center">
                          <button
                            onClick={() => toggle(ri, ci)}
                            aria-pressed={has}
                            aria-label={`${stu.name} — ${b}: ${has ? "earned" : "not earned"}`}
                            className={`mx-auto flex size-9 items-center justify-center rounded-full border transition hover:scale-110 ${
                              has
                                ? "border-transparent text-white shadow-md"
                                : "border-dashed border-slate-300 bg-slate-50 text-slate-300 hover:border-slate-400"
                            }`}
                            style={
                              has
                                ? ({ backgroundColor: color } as CSSProperties)
                                : undefined
                            }
                          >
                            {has ? <Check className="size-5" strokeWidth={3} /> : <Award className="size-4" />}
                          </button>
                        </td>
                      )
                    })}
                    <td className="px-3 py-2 text-center">
                      <span
                        className="inline-flex min-w-[1.75rem] items-center justify-center rounded-full px-2 py-0.5 text-sm font-bold tabular-nums"
                        style={{
                          backgroundColor: `${ACCENT}1a`,
                          color: ACCENT,
                        }}
                      >
                        {countByRow.get(ri) ?? 0}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Ranking */}
        <aside className="rounded-2xl border border-black/10 bg-white p-4 shadow-lg">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
            <Trophy className="size-4" style={{ color: "#f2c14e" }} />
            Most badges
          </h2>
          <ol className="space-y-2">
            {ranking.map((c) => {
              const place = placeByRow.get(c.ri) ?? 99
              const podium = place <= 3 ? PODIUM[place - 1] : null
              const pct = allBadges.length ? (c.count / allBadges.length) * 100 : 0
              return (
                <li
                  key={c.name + c.ri}
                  className={`rounded-xl px-3 py-2 ${podium ? `ring-2 ring-inset ${podium.ring}` : "bg-slate-50"}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-slate-700">
                      <span className="w-5 shrink-0 text-center" aria-hidden>
                        {podium ? MEDALS[place - 1] : "•"}
                      </span>
                      <span className="truncate">{c.name}</span>
                    </span>
                    <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color: ACCENT }}>
                      {c.count}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/5">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: ACCENT }}
                    />
                  </div>
                </li>
              )
            })}
          </ol>
          <p className="mt-3 text-center text-xs text-slate-400">
            {allBadges.length} badge{allBadges.length === 1 ? "" : "s"} · {students.length} student
            {students.length === 1 ? "" : "s"}
          </p>
        </aside>
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "badge-tracker",
  name: "Badge Tracker",
  blurb: "Track badges earned by each student.",
  icon: "🏅",
  category: "Competition",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Name | Badge | Badge | … (badges that student has earned). First row is headers.",
  sample,
  parse,
  Component: BadgeTracker,
})
