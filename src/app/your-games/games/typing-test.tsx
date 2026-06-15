"use client"

import { useMemo, useRef, useState, type ChangeEvent, type CSSProperties, type ReactNode } from "react"
import { Keyboard, Gauge, Target, Timer, RotateCcw } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Data {
  passages: string[]
}

const ACCENT = "#1b7888"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const passages = rows
    .slice(1)
    .map((r) => (Array.isArray(r) ? (r[0] || "").trim() : ""))
    .filter((p) => p.length > 0)
  return { passages: passages.length ? passages : sample.passages }
}

const sample: Data = {
  passages: [
    "The quick brown fox jumps over the lazy dog while the sun sets behind the rolling hills.",
    "Practice makes perfect, so keep your fingers on the home row and let the words flow naturally.",
    "Learning to type quickly is a skill that grows a little stronger with every single session.",
    "A calm mind and steady hands will always beat a rushed one that stumbles over the keys.",
  ],
}

interface Result {
  wpm: number
  accuracy: number
  seconds: number
}

function TypingTest({ data }: { data: Data }) {
  const passages = data.passages.length ? data.passages : sample.passages

  const [pIndex, setPIndex] = useState(0)
  const [typed, setTyped] = useState("")
  const [result, setResult] = useState<Result | null>(null)
  const startRef = useRef<number | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  const passage = passages[pIndex % passages.length] ?? ""
  const target = passage.length

  // Live correctness stats over what's been typed so far.
  const { correctChars, typedChars } = useMemo(() => {
    let correct = 0
    const n = Math.min(typed.length, passage.length)
    for (let i = 0; i < n; i++) {
      if (typed[i] === passage[i]) correct++
    }
    return { correctChars: correct, typedChars: typed.length }
  }, [typed, passage])

  const progress = target > 0 ? Math.min(100, (typed.length / target) * 100) : 0
  const liveAccuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100

  const finish = (finalTyped: string, finalCorrect: number) => {
    const start = startRef.current
    const now = typeof performance !== "undefined" ? performance.now() : Date.now()
    const seconds = start != null ? Math.max(0.001, (now - start) / 1000) : 0.001
    const minutes = seconds / 60
    const wpm = Math.round(finalCorrect / 5 / minutes)
    const accuracy =
      finalTyped.length > 0 ? Math.round((finalCorrect / finalTyped.length) * 100) : 0
    setResult({ wpm, accuracy, seconds })
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (result) return // locked once finished
    // Start the clock on the very first keystroke (captured in the handler).
    if (startRef.current === null && e.target.value.length > 0) {
      startRef.current = typeof performance !== "undefined" ? performance.now() : Date.now()
    }
    // Cap input at the passage length so finishing is deterministic.
    const next = e.target.value.slice(0, target)
    setTyped(next)

    if (next.length >= target && target > 0) {
      let correct = 0
      for (let i = 0; i < target; i++) {
        if (next[i] === passage[i]) correct++
      }
      finish(next, correct)
    }
  }

  const resetPassage = () => {
    setTyped("")
    setResult(null)
    startRef.current = null
    // Focus is a browser-only side effect, safe here (event handler).
    inputRef.current?.focus()
  }

  const tryAgain = () => {
    resetPassage()
  }

  const nextPassage = () => {
    setPIndex((i) => (i + 1) % passages.length)
    setTyped("")
    setResult(null)
    startRef.current = null
    inputRef.current?.focus()
  }

  const restart = () => {
    setPIndex(0)
    setTyped("")
    setResult(null)
    startRef.current = null
    inputRef.current?.focus()
  }

  const started = startRef.current !== null

  return (
    <GameFrame
      title="Typing Test"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
          style={{ backgroundColor: ACCENT }}
        >
          <Keyboard className="size-4" />
          <span className="tabular-nums">
            {pIndex + 1}/{passages.length}
          </span>
        </div>
      }
    >
      {/* Live stats bar */}
      <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
        <Stat
          icon={<Target className="size-4" />}
          label="Accuracy"
          value={`${result ? result.accuracy : liveAccuracy}%`}
        />
        <Stat
          icon={<Gauge className="size-4" />}
          label="Progress"
          value={`${Math.round(progress)}%`}
        />
        <Stat
          icon={<Timer className="size-4" />}
          label="Typed"
          value={`${typedChars}/${target}`}
        />
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full transition-[width] duration-150"
          style={{ width: `${progress}%`, backgroundColor: ACCENT }}
        />
      </div>

      {/* The passage with per-character coloring */}
      <div
        className="mb-4 rounded-2xl border border-black/10 bg-white p-5 text-lg leading-relaxed shadow-sm sm:text-xl"
        aria-label="Text to type"
      >
        {passage.split("").map((ch, i) => {
          let cls = "text-slate-400"
          if (i < typed.length) {
            cls = typed[i] === ch ? "text-emerald-600" : "rounded-sm bg-red-100 text-red-600"
          }
          const isCursor = i === typed.length && !result
          return (
            <span
              key={i}
              className={`${cls} ${isCursor ? "rounded-sm underline decoration-2 underline-offset-4" : ""}`}
              style={isCursor ? { backgroundColor: `${ACCENT}22` } : undefined}
            >
              {ch === " " ? " " : ch}
            </span>
          )
        })}
      </div>

      {/* Input */}
      <textarea
        ref={inputRef}
        value={typed}
        onChange={handleChange}
        disabled={!!result}
        rows={3}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Start typing here — the timer begins on your first keystroke…"
        className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-white p-4 font-mono text-base text-slate-800 shadow-inner outline-none transition focus:border-[color:var(--ring)] disabled:cursor-not-allowed disabled:bg-slate-50"
        style={{ "--ring": ACCENT } as CSSProperties}
      />

      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
        <span>{started ? "Timing…" : "Not started"}</span>
        <button
          onClick={resetPassage}
          className="inline-flex items-center gap-1 font-semibold text-slate-600 transition hover:text-slate-900"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </button>
      </div>

      {/* Results card */}
      {result && (
        <div className="mt-5 rounded-2xl border border-black/10 bg-white p-6 text-center shadow-lg">
          <div
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: ACCENT }}
          >
            <Keyboard className="size-4" />
            Results
          </div>
          <div className="grid grid-cols-3 gap-3">
            <BigStat label="WPM" value={`${Number.isFinite(result.wpm) ? result.wpm : 0}`} accent={ACCENT} />
            <BigStat label="Accuracy" value={`${result.accuracy}%`} accent={ACCENT} />
            <BigStat label="Time" value={`${result.seconds.toFixed(1)}s`} accent={ACCENT} />
          </div>
          <div className="mt-5 flex items-center justify-center gap-3">
            <PlayButton accent="#64748b" onClick={tryAgain}>
              Try again
            </PlayButton>
            <PlayButton accent={ACCENT} onClick={nextPassage} disabled={passages.length < 2}>
              Next passage →
            </PlayButton>
          </div>
        </div>
      )}
    </GameFrame>
  )
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-black/10 bg-white py-2 shadow-sm">
      <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-slate-500">
        {icon}
        {label}
      </div>
      <div className="text-lg font-bold tabular-nums text-slate-800">{value}</div>
    </div>
  )
}

function BigStat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl bg-slate-50 py-4">
      <div className="text-3xl font-black tabular-nums sm:text-4xl" style={{ color: accent }}>
        {value}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
    </div>
  )
}

export default defineGame<Data>({
  id: "typing-test",
  name: "Typing Test",
  blurb: "Typing-speed test with WPM & accuracy.",
  icon: "⌨️",
  category: "Word Games",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Column: Passage to type (one per row). First row is headers.",
  sample,
  parse,
  Component: TypingTest,
})
