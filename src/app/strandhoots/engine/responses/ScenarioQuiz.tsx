"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import type { ReflectionSpec } from "../types"

type Scenario = NonNullable<ReflectionSpec["scenarios"]>[number]
export type ScenarioAnswers = Record<string, string>

/** Warm-up scenario MCQs for Criterion D — frames the impact before the student
 *  writes their reflection. Contributes points/badges; the strand level itself
 *  comes from the written reflection. */
export default function ScenarioQuiz({
  scenarios,
  answers,
  onAnswers,
  accent,
}: {
  scenarios: Scenario[]
  answers: ScenarioAnswers
  onAnswers: (a: ScenarioAnswers) => void
  accent: string
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  return (
    <div className="space-y-4">
      {scenarios.map((sc) => {
        const sel = answers[sc.id]
        const isChecked = !!checked[sc.id]
        const correct = !!sc.options.find((o) => o.id === sel)?.correct
        return (
          <div key={sc.id} className="rounded-xl border border-black/10 bg-white p-4">
            <p className="mb-3 text-sm font-medium text-slate-800">{sc.prompt}</p>
            <div className="space-y-2">
              {sc.options.map((o) => {
                const isSel = sel === o.id
                return (
                  <button
                    key={o.id}
                    onClick={() => {
                      onAnswers({ ...answers, [sc.id]: o.id })
                      setChecked((c) => ({ ...c, [sc.id]: false }))
                    }}
                    className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                      isSel ? "font-semibold" : "border-black/10 hover:bg-black/5"
                    }`}
                    style={isSel ? { color: accent, background: `${accent}12`, borderColor: accent } : undefined}
                  >
                    {o.text}
                  </button>
                )
              })}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => setChecked((c) => ({ ...c, [sc.id]: true }))}
                disabled={!sel}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
                style={{ background: accent }}
              >
                Check
              </button>
              {isChecked &&
                (correct ? (
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                    <Check className="size-4" /> Good thinking
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-rose-500">
                    <X className="size-4" /> Reconsider
                  </span>
                ))}
            </div>
            {isChecked && sc.explanation && (
              <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">{sc.explanation}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
