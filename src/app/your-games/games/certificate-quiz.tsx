"use client"

import { useEffect, useMemo, useState } from "react"
import { Award, CheckCircle2, Printer, XCircle } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Question {
  q: string
  correct: string
  options: string[]
}
interface Data {
  questions: Question[]
}

const ACCENT = "#d85140"
const GOLD = "#c79a3b"
const PASS_THRESHOLD = 0.7

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample

  const questions: Question[] = []
  for (const r of rows.slice(1)) {
    if (!Array.isArray(r)) continue
    const q = (r[0] || "").trim()
    const correct = (r[1] || "").trim()
    if (!q || !correct) continue
    const wrongs = r
      .slice(2)
      .map((c) => (c || "").trim())
      .filter((c) => c.length > 0)
    if (wrongs.length === 0) continue
    questions.push({ q, correct, options: [correct, ...wrongs] })
  }

  return questions.length ? { questions } : sample
}

const sample: Data = {
  questions: [
    {
      q: "What is the chemical symbol for water?",
      correct: "H₂O",
      options: ["H₂O", "CO₂", "O₂", "NaCl"],
    },
    {
      q: "Which planet is known as the Red Planet?",
      correct: "Mars",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
    },
    {
      q: "How many continents are there on Earth?",
      correct: "7",
      options: ["7", "5", "6", "8"],
    },
    {
      q: "Who wrote 'Romeo and Juliet'?",
      correct: "William Shakespeare",
      options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
    },
    {
      q: "What is the largest mammal on Earth?",
      correct: "Blue whale",
      options: ["Blue whale", "African elephant", "Giraffe", "Hippopotamus"],
    },
    {
      q: "What gas do plants primarily absorb for photosynthesis?",
      correct: "Carbon dioxide",
      options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    },
  ],
}

/** Fisher–Yates shuffle returning a new array. Called only in effects. */
function shuffled<T>(arr: T[]): T[] {
  const next = [...arr]
  for (let k = next.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1))
    ;[next[k], next[j]] = [next[j], next[k]]
  }
  return next
}

type Phase = "name" | "quiz" | "result"

function CertificateQuiz({ data }: { data: Data }) {
  const questions = data.questions.length ? data.questions : sample.questions
  const total = questions.length

  const [phase, setPhase] = useState<Phase>("name")
  const [name, setName] = useState("")
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  // Per-question shuffled options. Built in an effect (hydration-safe).
  const [optionOrder, setOptionOrder] = useState<string[][]>([])
  // Today's date — read after mount, never during render.
  const [today, setToday] = useState("")

  // Shuffle every question's options once on mount (and when data changes).
  useEffect(() => {
    setOptionOrder(questions.map((q) => shuffled(q.options)))
  }, [questions])

  const current = questions[i]
  // Fall back to unshuffled options until the effect has populated state.
  const currentOptions = optionOrder[i] ?? current?.options ?? []
  const answered = picked !== null
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const passed = total > 0 && score / total >= PASS_THRESHOLD

  const start = () => {
    if (!name.trim()) return
    setPhase("quiz")
  }

  const choose = (option: string) => {
    if (answered || !current) return
    setPicked(option)
    if (option === current.correct) setScore((s) => s + 1)
  }

  const next = () => {
    if (i + 1 >= total) {
      setPhase("result")
      return
    }
    setI((p) => p + 1)
    setPicked(null)
  }

  // Read the date when we reach a passing result screen.
  useEffect(() => {
    if (phase === "result" && passed && !today) {
      setToday(
        new Date().toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      )
    }
  }, [phase, passed, today])

  const restart = () => {
    setPhase("name")
    setName("")
    setI(0)
    setScore(0)
    setPicked(null)
    setToday("")
    setOptionOrder(questions.map((q) => shuffled(q.options)))
  }

  const print = () => {
    if (typeof window !== "undefined") window.print()
  }

  const progressPct = useMemo(
    () => (total > 0 ? Math.round(((i + (answered ? 1 : 0)) / total) * 100) : 0),
    [i, answered, total],
  )

  if (total === 0) {
    return <p className="text-center text-slate-500">No questions available.</p>
  }

  return (
    <GameFrame title="Certificate Quiz" accent={ACCENT} onRestart={phase === "name" ? undefined : restart}>
      {/* Print styles: hide everything except the certificate when printing. */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #cert-print, #cert-print * { visibility: visible !important; }
          #cert-print { position: absolute; inset: 0; margin: 0 auto; box-shadow: none !important; }
        }
      `}</style>

      {/* ---- NAME ENTRY ---- */}
      {phase === "name" && (
        <div className="rounded-2xl border border-black/10 bg-white p-8 text-center shadow-lg">
          <div
            className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full"
            style={{ backgroundColor: `${ACCENT}1a` }}
          >
            <Award className="size-8" style={{ color: ACCENT }} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Earn your certificate</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Answer {total} question{total === 1 ? "" : "s"}. Score{" "}
            <span className="font-semibold text-slate-700">{Math.round(PASS_THRESHOLD * 100)}%</span> or
            higher to receive a printable certificate.
          </p>
          <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") start()
              }}
              placeholder="Enter your full name"
              maxLength={60}
              className="w-full rounded-lg border border-black/15 px-4 py-2.5 text-center text-base text-slate-800 shadow-sm outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/30"
              style={{ ["--accent" as string]: ACCENT }}
              autoFocus
            />
            <PlayButton accent={ACCENT} onClick={start} disabled={!name.trim()}>
              Start quiz
            </PlayButton>
          </div>
        </div>
      )}

      {/* ---- QUIZ ---- */}
      {phase === "quiz" && current && (
        <div>
          <div className="mb-4">
            <div className="mb-1.5 flex items-center justify-between text-sm text-slate-500">
              <span>
                Question {i + 1} of {total}
              </span>
              <span className="font-semibold tabular-nums" style={{ color: ACCENT }}>
                Score {score}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%`, backgroundColor: ACCENT }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
            <p className="mb-5 text-lg font-semibold leading-snug text-slate-800">{current.q}</p>
            <div className="grid gap-2.5">
              {currentOptions.map((option, idx) => {
                const isCorrect = option === current.correct
                const isPicked = option === picked
                let cls =
                  "border-black/10 bg-white text-slate-700 hover:border-[color:var(--accent)] hover:bg-slate-50"
                if (answered && isCorrect) cls = "border-green-500 bg-green-50 text-green-800"
                else if (answered && isPicked) cls = "border-red-400 bg-red-50 text-red-700"
                else if (answered) cls = "border-black/10 bg-white text-slate-400"
                return (
                  <button
                    key={`${idx}-${option}`}
                    onClick={() => choose(option)}
                    disabled={answered}
                    className={`flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left text-base font-medium shadow-sm transition disabled:cursor-default ${cls}`}
                    style={{ ["--accent" as string]: ACCENT }}
                  >
                    <span>{option}</span>
                    {answered && isCorrect && <CheckCircle2 className="size-5 shrink-0 text-green-600" />}
                    {answered && isPicked && !isCorrect && (
                      <XCircle className="size-5 shrink-0 text-red-500" />
                    )}
                  </button>
                )
              })}
            </div>

            {answered && (
              <div className="mt-5 flex items-center justify-between gap-3">
                <p
                  className={`text-sm font-semibold ${
                    picked === current.correct ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {picked === current.correct
                    ? "Correct!"
                    : `Not quite — the answer is "${current.correct}".`}
                </p>
                <PlayButton accent={ACCENT} onClick={next}>
                  {i + 1 >= total ? "See results" : "Next question →"}
                </PlayButton>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---- RESULT ---- */}
      {phase === "result" && (
        <div className="flex flex-col items-center">
          {passed ? (
            <>
              <div
                id="cert-print"
                className="relative w-full overflow-hidden rounded-2xl bg-white p-8 shadow-2xl sm:p-12"
                style={{ border: `10px double ${GOLD}` }}
              >
                <div
                  className="pointer-events-none absolute inset-3 rounded-xl"
                  style={{ border: `2px solid ${ACCENT}55` }}
                />
                <div className="relative flex flex-col items-center text-center">
                  <Award className="size-12" style={{ color: GOLD }} />
                  <p
                    className="mt-3 text-xs font-bold uppercase tracking-[0.35em] text-slate-400"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Certificate of Achievement
                  </p>
                  <p className="mt-6 text-sm italic text-slate-500">This certifies that</p>
                  <p
                    className="mt-2 text-3xl font-bold sm:text-4xl"
                    style={{ color: ACCENT, fontFamily: "var(--font-display)" }}
                  >
                    {name.trim()}
                  </p>
                  <div
                    className="mx-auto mt-3 h-px w-48"
                    style={{ backgroundColor: `${GOLD}99` }}
                  />
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600">
                    has successfully completed the quiz and scored
                  </p>
                  <p className="mt-2 text-xl font-bold text-slate-800">
                    {score}/{total}{" "}
                    <span style={{ color: ACCENT }}>({pct}%)</span>
                  </p>
                  <p className="mt-8 text-sm text-slate-500">
                    Awarded on{" "}
                    <span className="font-semibold text-slate-700">{today || "—"}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 print:hidden">
                <PlayButton accent={ACCENT} onClick={print}>
                  <span className="inline-flex items-center gap-2">
                    <Printer className="size-4" />
                    Print certificate
                  </span>
                </PlayButton>
                <button
                  onClick={restart}
                  className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Try again
                </button>
              </div>
            </>
          ) : (
            <div className="w-full rounded-2xl border border-black/10 bg-white p-8 text-center shadow-lg">
              <div
                className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full"
                style={{ backgroundColor: "#fee2e2" }}
              >
                <XCircle className="size-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Not passed yet</h2>
              <p className="mt-2 text-sm text-slate-500">
                You scored{" "}
                <span className="font-semibold text-slate-700">
                  {score}/{total} ({pct}%)
                </span>
                . You need at least {Math.round(PASS_THRESHOLD * 100)}% to earn your certificate.
              </p>
              <p className="mt-1 text-sm text-slate-500">Give it another shot!</p>
              <PlayButton accent={ACCENT} onClick={restart} className="mt-6">
                Try again
              </PlayButton>
            </div>
          )}
        </div>
      )}
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "certificate-quiz",
  name: "Certificate Quiz",
  blurb: "A quiz that awards a printable certificate.",
  icon: "📜",
  category: "Quizzes & Assessment",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Question | Correct answer | Wrong option | Wrong option… First row is headers.",
  sample,
  parse,
  Component: CertificateQuiz,
})
