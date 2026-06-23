"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import HostButton from "./HostButton"
import type { Strandhoot } from "./strandhoots"

const ALL = "All"
const CRIT_LABELS: Record<string, string> = {
  A: "Criterion A",
  B: "Criterion B",
  C: "Criterion C",
  D: "Criterion D",
}

export default function StrandhootsHub({ strandhoots }: { strandhoots: Strandhoot[] }) {
  const [subject, setSubject] = useState(ALL)
  const [crit, setCrit] = useState(ALL)

  const subjects = useMemo(() => {
    const seen = new Set<string>()
    const out: string[] = []
    for (const s of strandhoots) if (!seen.has(s.subject)) { seen.add(s.subject); out.push(s.subject) }
    return out.sort()
  }, [strandhoots])

  const filtered = useMemo(() =>
    strandhoots.filter(s => {
      if (subject !== ALL && s.subject !== subject) return false
      if (crit !== ALL && !s.criteria.includes(`Criterion ${crit} —`)) return false
      return true
    }), [strandhoots, subject, crit])

  return (
    <>
      {/* Filters */}
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <select
          value={subject}
          onChange={e => setSubject(e.target.value)}
          className="rounded-lg border border-black/15 bg-white px-3 py-2 text-sm font-medium shadow-sm focus:outline-none"
        >
          <option value={ALL}>All subjects</option>
          {subjects.map(s => <option key={s}>{s}</option>)}
        </select>

        <div className="flex gap-1.5">
          {[ALL, "A", "B", "C", "D"].map(c => (
            <button
              key={c}
              onClick={() => setCrit(c)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                crit === c
                  ? "bg-[#1f306d] text-white"
                  : "border border-black/15 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {c === ALL ? "All criteria" : `Crit ${c}`}
            </button>
          ))}
        </div>

        <span className="ml-auto text-sm text-slate-500">{filtered.length} strandhoots</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filtered.map(s => (
          <div
            key={s.slug}
            className="group flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <Link href={`/strandhoots/play/${s.slug}`} className="flex flex-1 flex-col">
              <div className="mb-4 flex items-start gap-4">
                <span
                  className="grid size-14 shrink-0 place-items-center rounded-2xl text-3xl"
                  style={{ background: `${s.accent}1a` }}
                >
                  {s.icon}
                </span>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: s.accent, fontFamily: "var(--font-display)" }}>
                    {s.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">{s.subject}</p>
                </div>
              </div>
              <span
                className="mb-3 inline-block w-fit rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{ background: `${s.accent}1a`, color: s.accent }}
              >
                {s.criteria}
              </span>
              <p className="flex-1 text-sm text-slate-600">{s.blurb}</p>
            </Link>
            <div className="mt-5 flex items-center gap-2">
              <Link
                href={`/strandhoots/play/${s.slug}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: s.accent }}
              >
                Launch (solo)
                <ArrowRight className="size-4" />
              </Link>
              <HostButton slug={s.slug} title={s.title} accent={s.accent} />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-slate-400">
          No strandhoots match the selected filters.
        </p>
      )}
    </>
  )
}
