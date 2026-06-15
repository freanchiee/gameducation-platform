"use client"

import { useMemo, useRef, useState } from "react"
import { CheckCircle2, Eraser, Eye, XCircle } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Data {
  /** Passage text containing [bracketed] answers marking each blank. */
  template: string
  /** Correct answers in order of appearance (duplicates allowed by index). */
  answers: string[]
}

const ACCENT = "#d85140"

/** Matches a [bracketed] blank, capturing its inner content (non-greedy, no nesting). */
const BLANK_RE = /\[([^\][]*)\]/g

/** Collect the bracket contents in order of appearance. */
function extractAnswers(template: string): string[] {
  const out: string[] = []
  for (const m of template.matchAll(BLANK_RE)) {
    out.push((m[1] ?? "").trim())
  }
  return out.filter((a) => a.length > 0)
}

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample

  const lines = rows
    .slice(1)
    .map((r) => (Array.isArray(r) ? (r[0] ?? "") : ""))
    // Trailing fully-empty rows are common in pasted data; drop them but keep
    // intentional blank lines between paragraphs in the middle.
    .filter((line, idx, arr) => line.trim() !== "" || idx < arr.length - 1)

  const template = lines.join("\n").trim()
  const answers = extractAnswers(template)

  // Fall back to the sample if there is nothing to play.
  if (!template || answers.length === 0) return sample
  return { template, answers }
}

const sample: Data = {
  template: [
    "The water cycle describes how water moves around our planet. Energy from the",
    "[Sun] heats the oceans, causing liquid water to turn into vapour through a",
    "process called [evaporation]. As the vapour rises and cools, it forms tiny",
    "droplets in a step known as [condensation], building the clouds we see in the",
    "sky. When those droplets grow heavy enough, they fall back to the ground as",
    "[precipitation] — rain, snow, or hail. Finally, water flows over land and",
    "collects in rivers, lakes, and oceans, where the whole cycle begins [again].",
  ].join("\n"),
  answers: ["Sun", "evaporation", "condensation", "precipitation", "again"],
}

/** A token in the parsed passage: literal text or a numbered blank. */
type Token =
  | { kind: "text"; value: string }
  | { kind: "blank"; index: number; answer: string }

/** Split the template into renderable tokens, numbering blanks in order. */
function tokenize(template: string): Token[] {
  const tokens: Token[] = []
  let last = 0
  let blankIndex = 0
  // Re-run the regex statelessly per call.
  const re = new RegExp(BLANK_RE.source, "g")
  let m: RegExpExecArray | null
  while ((m = re.exec(template)) !== null) {
    const inner = (m[1] ?? "").trim()
    if (inner.length === 0) continue // ignore empty [] brackets
    if (m.index > last) {
      tokens.push({ kind: "text", value: template.slice(last, m.index) })
    }
    tokens.push({ kind: "blank", index: blankIndex, answer: inner })
    blankIndex += 1
    last = m.index + m[0].length
  }
  if (last < template.length) {
    tokens.push({ kind: "text", value: template.slice(last) })
  }
  return tokens
}

type Status = "idle" | "correct" | "wrong"

function Cloze({ data }: { data: Data }) {
  const safe = data.template && data.answers.length ? data : sample

  const tokens = useMemo(() => tokenize(safe.template), [safe.template])
  const answers = useMemo(
    () => tokens.filter((t): t is Extract<Token, { kind: "blank" }> => t.kind === "blank"),
    [tokens],
  )
  const total = answers.length

  const [values, setValues] = useState<string[]>(() => answers.map(() => ""))
  const [checked, setChecked] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const norm = (s: string) => s.trim().toLowerCase()

  const statuses: Status[] = useMemo(() => {
    if (revealed) return answers.map(() => "correct")
    if (!checked) return answers.map(() => "idle")
    return answers.map((b, i) => (norm(values[i] ?? "") === norm(b.answer) ? "correct" : "wrong"))
  }, [answers, values, checked, revealed])

  const score = useMemo(
    () => statuses.filter((s) => s === "correct").length,
    [statuses],
  )
  const allCorrect = checked && !revealed && score === total && total > 0

  const setValue = (i: number, v: string) => {
    setValues((prev) => {
      const next = [...prev]
      next[i] = v
      return next
    })
    // Editing invalidates a prior check.
    if (checked) setChecked(false)
  }

  const check = () => {
    setRevealed(false)
    setChecked(true)
  }

  const reveal = () => {
    setRevealed(true)
    setChecked(false)
  }

  const clear = () => {
    setValues(answers.map(() => ""))
    setChecked(false)
    setRevealed(false)
    inputRefs.current[0]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const next = inputRefs.current[i + 1]
      if (next) next.focus()
      else check()
    }
  }

  // Size each input to its answer length so it hints the expected word length.
  const widthCh = (b: Extract<Token, { kind: "blank" }>) =>
    Math.min(Math.max(b.answer.length + 2, 5), 22)

  const styleFor = (s: Status): { borderColor: string; color: string; background: string } => {
    if (s === "correct") return { borderColor: "#16a34a", color: "#15803d", background: "#f0fdf4" }
    if (s === "wrong") return { borderColor: "#dc2626", color: "#b91c1c", background: "#fef2f2" }
    return { borderColor: "rgba(0,0,0,0.18)", color: "#0f172a", background: "#ffffff" }
  }

  if (total === 0) {
    return (
      <GameFrame title="Cloze Activity" accent={ACCENT}>
        <p className="rounded-2xl border border-black/10 bg-white p-6 text-center text-slate-500 shadow-sm">
          No blanks found. Wrap the words to hide in [square brackets].
        </p>
      </GameFrame>
    )
  }

  return (
    <GameFrame
      title="Cloze Activity"
      accent={ACCENT}
      onRestart={clear}
      toolbar={
        <div
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold shadow-sm"
          style={
            checked && !revealed
              ? allCorrect
                ? { backgroundColor: "#f0fdf4", color: "#15803d" }
                : { backgroundColor: "#fff7ed", color: ACCENT }
              : { backgroundColor: "#f1f5f9", color: "#475569" }
          }
        >
          <span className="tabular-nums">
            {checked && !revealed ? `${score} / ${total} correct` : `${total} blank${total === 1 ? "" : "s"}`}
          </span>
        </div>
      }
    >
      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm sm:p-7">
        <p
          className="whitespace-pre-wrap text-lg leading-relaxed text-slate-700"
          style={{ wordBreak: "break-word" }}
        >
          {tokens.map((t, ti) => {
            if (t.kind === "text") {
              return <span key={`t-${ti}`}>{t.value}</span>
            }
            const s = statuses[t.index]
            const sc = styleFor(s)
            return (
              <span key={`b-${ti}`} className="relative inline-flex items-baseline align-baseline">
                <input
                  ref={(el) => {
                    inputRefs.current[t.index] = el
                  }}
                  type="text"
                  value={revealed ? t.answer : values[t.index] ?? ""}
                  onChange={(e) => setValue(t.index, e.target.value)}
                  onKeyDown={(e) => onKeyDown(e, t.index)}
                  disabled={revealed}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label={`Blank ${t.index + 1} of ${total}`}
                  className="mx-1 rounded-md border-2 px-2 py-0.5 text-center text-base font-semibold shadow-inner outline-none transition focus:ring-2 disabled:cursor-default"
                  style={{
                    width: `${widthCh(t)}ch`,
                    borderColor: sc.borderColor,
                    color: sc.color,
                    backgroundColor: sc.background,
                    ...({ ["--tw-ring-color" as string]: `${ACCENT}55` } as React.CSSProperties),
                  }}
                />
                {s === "correct" && (
                  <CheckCircle2 className="pointer-events-none absolute -right-1 -top-2 size-3.5" style={{ color: "#16a34a" }} />
                )}
                {s === "wrong" && (
                  <XCircle className="pointer-events-none absolute -right-1 -top-2 size-3.5" style={{ color: "#dc2626" }} />
                )}
              </span>
            )
          })}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
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
            Reveal answers
          </button>
          <button
            onClick={clear}
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Eraser className="size-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Feedback banner */}
      {checked && !revealed && (
        <div
          className="mt-4 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm"
          style={
            allCorrect
              ? { borderColor: "#16a34a", backgroundColor: "#f0fdf4", color: "#15803d" }
              : { borderColor: ACCENT, backgroundColor: "#fff7ed", color: ACCENT }
          }
        >
          {allCorrect ? (
            <>
              <CheckCircle2 className="size-5 shrink-0" />
              <span>Perfect! All {total} blanks correct. 🎉</span>
            </>
          ) : (
            <>
              <XCircle className="size-5 shrink-0" />
              <span>
                {score} of {total} correct. Fix the red blanks and check again.
              </span>
            </>
          )}
        </div>
      )}

      {revealed && (
        <p className="mt-4 rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-center text-sm font-semibold text-slate-500">
          Answers revealed. Press <span className="text-slate-700">Clear</span> to try again.
        </p>
      )}
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "cloze",
  name: "Cloze Activity",
  blurb: "Fill-in-the-gap passage practice.",
  icon: "✍️",
  category: "Quizzes & Assessment",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Passage text with [bracketed] answers marking each blank. First row is headers.",
  sample,
  parse,
  Component: Cloze,
})
