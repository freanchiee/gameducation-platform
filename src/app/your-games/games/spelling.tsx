"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, MessageSquareText, Eye, ArrowRight } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Item {
  word: string
  sentence?: string
}
interface Data {
  items: Item[]
}

const ACCENT = "#1b7888"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const items = rows
    .slice(1)
    .map((r) => ({ word: (r?.[0] || "").trim(), sentence: (r?.[1] || "").trim() || undefined }))
    .filter((it) => it.word.length > 0)
  return { items: items.length ? items : sample.items }
}

const sample: Data = {
  items: [
    { word: "necessary", sentence: "It is necessary to bring an umbrella when it rains." },
    { word: "rhythm", sentence: "The drummer kept a steady rhythm all night." },
    { word: "separate", sentence: "Please separate the recycling from the trash." },
    { word: "definitely", sentence: "I will definitely be there for your birthday." },
    { word: "embarrass", sentence: "Try not to embarrass yourself on the stage." },
    { word: "occurrence", sentence: "A solar eclipse is a rare occurrence." },
    { word: "conscience", sentence: "Let your conscience guide your decisions." },
    { word: "privilege", sentence: "Voting is both a right and a privilege." },
  ],
}

type Verdict = "idle" | "correct" | "wrong" | "revealed"

function Spelling({ data }: { data: Data }) {
  const items = data.items.length ? data.items : sample.items

  const [i, setI] = useState(0)
  const [guess, setGuess] = useState("")
  const [verdict, setVerdict] = useState<Verdict>("idle")
  const [score, setScore] = useState(0)
  const [attempted, setAttempted] = useState(0)
  const [finished, setFinished] = useState(false)
  const [speechOk, setSpeechOk] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  const current = items[i]

  // Detect speech-synthesis support after mount (browser-only).
  useEffect(() => {
    setSpeechOk(typeof window !== "undefined" && "speechSynthesis" in window)
  }, [])

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return
    try {
      window.speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.rate = 0.85
      u.lang = "en-US"
      window.speechSynthesis.speak(u)
    } catch {
      // ignore — UI already notes audio may be unavailable
    }
  }, [])

  // Auto-speak the word whenever the active item changes (browser-only).
  useEffect(() => {
    if (finished || !current) return
    speak(current.word)
    inputRef.current?.focus()
  }, [i, finished, current, speak])

  // Stop any pending speech on unmount.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const advance = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    if (i + 1 >= items.length) {
      setFinished(true)
    } else {
      setI((p) => p + 1)
      setGuess("")
      setVerdict("idle")
    }
  }, [i, items.length])

  const check = useCallback(() => {
    if (!current || verdict === "correct" || verdict === "revealed") return
    const normalized = guess.trim().toLowerCase()
    if (!normalized) return
    if (normalized === current.word.trim().toLowerCase()) {
      setVerdict("correct")
      setScore((s) => s + 1)
      setAttempted((a) => a + 1)
    } else {
      setVerdict("wrong")
    }
  }, [current, guess, verdict])

  const reveal = useCallback(() => {
    if (!current) return
    setVerdict("revealed")
    setAttempted((a) => a + 1)
    speak(current.word)
  }, [current, speak])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return
    e.preventDefault()
    if (verdict === "correct" || verdict === "revealed") advance()
    else check()
  }

  const restart = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    setI(0)
    setGuess("")
    setVerdict("idle")
    setScore(0)
    setAttempted(0)
    setFinished(false)
  }, [])

  if (!current) {
    return <p className="text-center text-slate-500">No words to spell.</p>
  }

  if (finished) {
    const pct = attempted ? Math.round((score / attempted) * 100) : 0
    return (
      <GameFrame title="Spelling Words" accent={ACCENT} onRestart={restart}>
        <div className="rounded-2xl border border-black/10 bg-white p-8 text-center shadow-lg">
          <div className="text-5xl">{pct >= 80 ? "🏆" : pct >= 50 ? "👏" : "📚"}</div>
          <h2 className="mt-4 text-2xl font-bold text-slate-800">Spelling test complete!</h2>
          <p className="mt-2 text-slate-600">
            You spelled{" "}
            <span className="font-bold" style={{ color: ACCENT }}>
              {score}
            </span>{" "}
            of {items.length} words correctly.
          </p>
          <div className="mx-auto mt-5 h-3 w-full max-w-sm overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: ACCENT }} />
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-500">{pct}%</p>
          <div className="mt-6 flex justify-center">
            <PlayButton accent={ACCENT} onClick={restart}>
              Try again
            </PlayButton>
          </div>
        </div>
      </GameFrame>
    )
  }

  return (
    <GameFrame title="Spelling Words" accent={ACCENT} onRestart={restart}>
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>
          Word {i + 1} of {items.length}
        </span>
        <span>
          Score:{" "}
          <span className="font-bold" style={{ color: ACCENT }}>
            {score}
          </span>
        </span>
      </div>

      {/* progress bar */}
      <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${(i / items.length) * 100}%`, backgroundColor: ACCENT }}
        />
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-lg">
        {!speechOk && (
          <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-center text-sm text-amber-700">
            Audio isn&apos;t available in this browser — the word is shown below instead.
          </p>
        )}

        {/* Hear controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => speak(current.word)}
            disabled={!speechOk}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: ACCENT }}
          >
            <Volume2 className="size-5" />
            Hear word
          </button>
          {current.sentence && (
            <button
              onClick={() => speak(current.sentence as string)}
              disabled={!speechOk}
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MessageSquareText className="size-5" style={{ color: ACCENT }} />
              Hear in a sentence
            </button>
          )}
        </div>

        {/* When audio is unavailable, expose the word so the activity is still playable. */}
        {!speechOk && (
          <p className="mt-4 text-center text-2xl font-bold tracking-wide text-slate-800">{current.word}</p>
        )}

        {/* Input */}
        <div className="mt-6">
          <label htmlFor="spell-input" className="mb-1.5 block text-sm font-semibold text-slate-600">
            Type the spelling
          </label>
          <input
            id="spell-input"
            ref={inputRef}
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value)
              if (verdict === "wrong") setVerdict("idle")
            }}
            onKeyDown={onKeyDown}
            disabled={verdict === "correct" || verdict === "revealed"}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="Spell the word you hear…"
            className="w-full rounded-xl border-2 bg-white px-4 py-3 text-lg text-slate-800 outline-none transition focus:ring-2 disabled:bg-slate-50"
            style={{
              borderColor:
                verdict === "wrong"
                  ? "#ef4444"
                  : verdict === "correct"
                    ? "#16a34a"
                    : verdict === "revealed"
                      ? "#d97706"
                      : "#e2e8f0",
            }}
          />

          {/* Feedback */}
          <div className="mt-2 min-h-[1.5rem] text-sm font-semibold">
            {verdict === "wrong" && <span className="text-red-600">Not quite — try again, or reveal the word.</span>}
            {verdict === "correct" && <span className="text-green-600">Correct! Nicely spelled. ✓</span>}
            {verdict === "revealed" && (
              <span className="text-amber-600">
                The word was <span className="font-bold">{current.word}</span>.
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {verdict === "correct" || verdict === "revealed" ? (
              <PlayButton accent={ACCENT} onClick={advance}>
                <span className="inline-flex items-center gap-1.5">
                  {i + 1 >= items.length ? "See results" : "Next word"}
                  <ArrowRight className="size-4" />
                </span>
              </PlayButton>
            ) : (
              <>
                <PlayButton accent={ACCENT} onClick={check} disabled={!guess.trim()}>
                  Check
                </PlayButton>
                {verdict === "wrong" && (
                  <button
                    onClick={reveal}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    <Eye className="size-4" />
                    Reveal
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "spelling",
  name: "Spelling Words",
  blurb: "Hear the word, type the spelling — a self-paced spelling test.",
  icon: "🔡",
  category: "Word Games",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Word | Example sentence (optional). First row is headers.",
  sample,
  parse,
  Component: Spelling,
})
