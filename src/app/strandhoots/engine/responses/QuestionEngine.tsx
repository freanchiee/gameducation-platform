"use client"

import { useState } from "react"
import { Check, X, ChevronRight } from "lucide-react"
import type { Question, QuestionSpec } from "../types"
import { isQuestionCorrect, bandLabel, type QuestionAnswer } from "../evaluate"
import type { TargetLevel } from "../types"

type Answers = Record<string, QuestionAnswer>

const BANDS: TargetLevel[] = [2, 4, 6, 8]

export default function QuestionEngine({
  spec,
  answers,
  onAnswers,
  accent,
}: {
  spec: QuestionSpec
  answers: Answers
  onAnswers: (a: Answers) => void
  accent: string
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const set = (qid: string, patch: Partial<QuestionAnswer>) =>
    onAnswers({ ...answers, [qid]: { ...answers[qid], ...patch, qid } })

  return (
    <div className="space-y-6">
      {BANDS.map((band) => {
        const qs = spec.questions.filter((q) => q.level === band)
        if (qs.length === 0) return null
        return (
          <div key={band}>
            <div
              className="mb-2 inline-block rounded-full px-2.5 py-1 text-xs font-bold"
              style={{ background: `${accent}1a`, color: accent }}
            >
              {bandLabel(band)}
            </div>
            <div className="space-y-4">
              {qs.map((q) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  answer={answers[q.id]}
                  checked={!!checked[q.id]}
                  onCheck={() => setChecked((c) => ({ ...c, [q.id]: true }))}
                  onChange={(patch) => {
                    set(q.id, patch)
                    setChecked((c) => ({ ...c, [q.id]: false }))
                  }}
                  accent={accent}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function QuestionCard({
  q,
  answer,
  checked,
  onCheck,
  onChange,
  accent,
}: {
  q: Question
  answer?: QuestionAnswer
  checked: boolean
  onCheck: () => void
  onChange: (patch: Partial<QuestionAnswer>) => void
  accent: string
}) {
  const correct = isQuestionCorrect(q, answer)
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <p className="mb-3 font-medium text-slate-800">{q.prompt}</p>

      {q.type === "mcq" && (
        <div className="space-y-2">
          {q.options.map((o) => {
            const sel = answer?.choice === o.id
            return (
              <button
                key={o.id}
                onClick={() => onChange({ choice: o.id })}
                className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                  sel ? "border-current font-semibold" : "border-black/10 hover:bg-black/5"
                }`}
                style={sel ? { color: accent, background: `${accent}12` } : undefined}
              >
                <span
                  className="grid size-5 shrink-0 place-items-center rounded-full border text-[10px]"
                  style={sel ? { borderColor: accent, background: accent, color: "#fff" } : { borderColor: "#cbd5e1" }}
                >
                  {sel ? "●" : ""}
                </span>
                {o.text}
              </button>
            )
          })}
        </div>
      )}

      {q.type === "fill" && (
        <input
          value={answer?.fill ?? ""}
          onChange={(e) => onChange({ fill: e.target.value })}
          placeholder="Type your answer…"
          className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-current"
          style={{ caretColor: accent }}
        />
      )}

      {q.type === "short" && (
        <textarea
          value={answer?.short ?? ""}
          onChange={(e) => onChange({ short: e.target.value })}
          placeholder="Write a short answer…"
          rows={3}
          className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-current"
        />
      )}

      {q.type === "match" && (
        <div className="space-y-2">
          {q.pairs.map((p) => (
            <div key={p.left} className="flex items-center gap-2">
              <span className="w-1/2 text-sm text-slate-700">{p.left}</span>
              <ChevronRight className="size-4 shrink-0 text-slate-400" />
              <select
                value={answer?.match?.[p.left] ?? ""}
                onChange={(e) => onChange({ match: { ...answer?.match, [p.left]: e.target.value } })}
                className="w-1/2 rounded-lg border border-black/15 px-2 py-1.5 text-sm"
              >
                <option value="">Choose…</option>
                {[...q.pairs.map((x) => x.right)]
                  .sort()
                  .map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={onCheck}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white"
          style={{ background: accent }}
        >
          Check
        </button>
        {checked &&
          (correct ? (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
              <Check className="size-4" /> Correct
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-rose-500">
              <X className="size-4" /> Not yet
            </span>
          ))}
      </div>

      {checked && q.type !== "match" && "explanation" in q && q.explanation && (
        <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">{q.explanation}</p>
      )}
    </div>
  )
}
