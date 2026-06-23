"use client"

import { Check } from "lucide-react"
import type { RubricBand } from "../types"
import { bandLabel, type TextEval } from "../evaluate"

/** Scaffolded free-text editor with live, transparent band feedback.
 *  Shared by Criterion B (design), C (analysis) and D (reflection). */
export default function LeveledTextResponse({
  value,
  onChange,
  rubric,
  scaffolds,
  placeholder,
  prompt,
  feedback,
  accent,
}: {
  value: string
  onChange: (v: string) => void
  rubric: RubricBand[]
  scaffolds?: string[]
  placeholder?: string
  prompt?: string
  feedback: TextEval
  accent: string
}) {
  const append = (chip: string) => {
    const sep = value && !/\s$/.test(value) ? " " : ""
    onChange(`${value}${sep}${chip} `)
  }

  return (
    <div className="space-y-4">
      {prompt && <p className="text-sm font-medium text-slate-700">{prompt}</p>}

      {scaffolds && scaffolds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {scaffolds.map((s) => (
            <button
              key={s}
              onClick={() => append(s)}
              className="rounded-full border border-dashed px-3 py-1 text-xs text-slate-600 transition hover:bg-black/5"
              style={{ borderColor: `${accent}66` }}
              title="Insert this sentence starter"
            >
              + {s}
            </button>
          ))}
        </div>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Write your response…"}
        rows={8}
        className="w-full rounded-xl border border-black/15 px-3 py-2.5 text-sm leading-relaxed outline-none focus:border-current"
        style={{ caretColor: accent }}
      />

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{value.trim() ? value.trim().split(/\s+/).length : 0} words</span>
        <span
          className="rounded-full px-2.5 py-1 font-bold"
          style={{ background: `${accent}1a`, color: accent }}
        >
          Current: Level {feedback.level || "—"}/8
        </span>
      </div>

      {/* Transparent rubric feedback — students see exactly what unlocks each band. */}
      <div className="grid gap-2">
        {rubric.map((band) => {
          const fb = feedback.bands.find((b) => b.level === band.level)
          const met = fb?.met
          return (
            <div
              key={band.level}
              className={`rounded-lg border px-3 py-2 text-xs transition ${
                met ? "border-emerald-300 bg-emerald-50" : "border-black/10 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold" style={{ color: met ? "#059669" : accent }}>
                  {met && <Check className="mr-1 inline size-3.5" />}
                  {bandLabel(band.level)}
                </span>
                <span className="text-slate-400">
                  {fb?.matched ?? 0}/{fb?.quota ?? 0} key ideas
                </span>
              </div>
              <p className="mt-0.5 text-slate-600">{band.descriptor}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
