"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Item {
  word: string
  hint?: string
}
interface Data {
  items: Item[]
}

const ACCENT = "#1b7888"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const items = rows
    .slice(1)
    .filter((r) => Array.isArray(r) && (r[0] ?? "").trim())
    .map((r) => ({
      word: (r[0] ?? "").trim(),
      hint: (r[1] ?? "").trim() || undefined,
    }))
  return { items: items.length ? items : sample.items }
}

const sample: Data = {
  items: [
    { word: "PLANET", hint: "Orbits a star like the Sun" },
    { word: "RIVER", hint: "Flowing body of fresh water" },
    { word: "GUITAR", hint: "A six-stringed instrument" },
    { word: "VOLCANO", hint: "Erupts with lava" },
    { word: "PYRAMID", hint: "Ancient Egyptian monument" },
    { word: "COMPASS", hint: "Points you north" },
    { word: "DOLPHIN", hint: "A clever marine mammal" },
  ],
}

/** Fisher–Yates shuffle of an array's characters; guarantees a result that
 *  differs from the original whenever that is possible (length > 1 and not all
 *  characters identical). Pure given an injected RNG so callers control timing. */
function scrambleWord(word: string, rng: () => number): string {
  const chars = word.split("")
  if (chars.length <= 1) return word
  const allSame = chars.every((c) => c === chars[0])
  if (allSame) return word
  let attempt = ""
  // Re-shuffle until it differs from the original.
  for (let tries = 0; tries < 24; tries++) {
    const next = [...chars]
    for (let k = next.length - 1; k > 0; k--) {
      const j = Math.floor(rng() * (k + 1))
      ;[next[k], next[j]] = [next[j], next[k]]
    }
    attempt = next.join("")
    if (attempt !== word) return attempt
  }
  // Fallback: a guaranteed-different rotation.
  return word.slice(1) + word.charAt(0)
}

type Phase = "playing" | "correct" | "revealed"

function WordScramble({ data }: { data: Data }) {
  const items = data.items.length ? data.items : sample.items
  const total = items.length

  const [i, setI] = useState(0)
  const [scrambled, setScrambled] = useState("")
  const [guess, setGuess] = useState("")
  const [phase, setPhase] = useState<Phase>("playing")
  const [wrong, setWrong] = useState(false)
  const [score, setScore] = useState(0)
  const [solved, setSolved] = useState<Set<number>>(new Set())
  const inputRef = useRef<HTMLInputElement>(null)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const current = items[i]
  const finished = solved.size === total

  // Hydration-safe scramble: deterministic empty/server render, then shuffle on
  // mount and whenever the active item changes — randomness lives in an effect.
  useEffect(() => {
    if (!current) return
    setScrambled(scrambleWord(current.word, Math.random))
  }, [i, current])

  // Focus the input when a fresh word is presented.
  useEffect(() => {
    if (phase === "playing") inputRef.current?.focus()
  }, [i, phase])

  // Auto-advance shortly after a correct answer (unless everything is solved).
  useEffect(() => {
    if (phase !== "correct") return
    if (solved.size >= total) return
    advanceTimer.current = setTimeout(() => goNext(), 1100)
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, solved, total])

  const clearTimer = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current)
      advanceTimer.current = null
    }
  }

  const reshuffle = () => {
    if (current) setScrambled(scrambleWord(current.word, Math.random))
  }

  const goTo = (idx: number) => {
    clearTimer()
    setI(((idx % total) + total) % total)
    setGuess("")
    setPhase("playing")
    setWrong(false)
  }
  const goNext = () => goTo(i + 1)
  const goPrev = () => goTo(i - 1)

  const check = () => {
    if (!current || phase === "correct") return
    const ok = guess.trim().toLowerCase() === current.word.trim().toLowerCase()
    if (ok) {
      setPhase("correct")
      setWrong(false)
      if (!solved.has(i)) {
        setSolved((prev) => new Set(prev).add(i))
        setScore((s) => s + 1)
      }
    } else {
      setWrong(true)
      // Brief shake/flash, then let them try again.
      window.setTimeout(() => setWrong(false), 600)
    }
  }

  const reveal = () => {
    if (!current) return
    clearTimer()
    setPhase("revealed")
    setWrong(false)
    setGuess(current.word)
  }

  const restart = () => {
    clearTimer()
    setI(0)
    setGuess("")
    setPhase("playing")
    setWrong(false)
    setScore(0)
    setSolved(new Set())
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (phase === "correct") goNext()
      else check()
    }
  }

  // Render the scrambled letters as individual tiles.
  const tiles = useMemo(
    () => scrambled.split("").map((ch, idx) => ({ ch, key: `${idx}-${ch}` })),
    [scrambled],
  )

  if (!current) {
    return (
      <GameFrame title="Word Scramble" accent={ACCENT}>
        <p className="rounded-2xl border border-black/10 bg-white p-8 text-center text-slate-500 shadow-sm">
          No words to unscramble yet. Add a list of words to play.
        </p>
      </GameFrame>
    )
  }

  return (
    <GameFrame
      title="Word Scramble"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <span
          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
          style={{ backgroundColor: ACCENT }}
        >
          Score {score}
        </span>
      }
    >
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>
          Word {i + 1} of {total}
        </span>
        <span>{solved.size} solved</span>
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(solved.size / total) * 100}%`, backgroundColor: ACCENT }}
        />
      </div>

      {finished ? (
        <div className="rounded-2xl border border-black/10 bg-white p-8 text-center shadow-lg">
          <div className="mb-2 text-4xl">🎉</div>
          <h2 className="text-xl font-bold text-slate-800">All words unscrambled!</h2>
          <p className="mt-1 text-slate-500">
            You scored {score} of {total}.
          </p>
          <div className="mt-5 flex justify-center">
            <PlayButton accent={ACCENT} onClick={restart}>
              Play again
            </PlayButton>
          </div>
        </div>
      ) : (
        <div
          className={`rounded-2xl border bg-white p-6 shadow-lg transition ${
            wrong ? "border-red-300" : "border-black/10"
          }`}
        >
          {/* Scrambled letter tiles */}
          <div
            className={`flex flex-wrap items-center justify-center gap-2 ${
              wrong ? "animate-pulse" : ""
            }`}
          >
            {tiles.map((t) => (
              <span
                key={t.key}
                className="flex size-11 select-none items-center justify-center rounded-lg text-xl font-bold uppercase text-white shadow-sm sm:size-12 sm:text-2xl"
                style={{
                  backgroundColor: phase === "correct" ? "#16a34a" : ACCENT,
                }}
              >
                {t.ch}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center">
            <button
              onClick={reshuffle}
              disabled={phase !== "playing"}
              className="text-xs font-semibold text-slate-400 underline-offset-2 transition hover:text-slate-600 hover:underline disabled:opacity-40"
            >
              shuffle letters
            </button>
          </div>

          {current.hint && (
            <p className="mt-4 text-center text-sm text-slate-500">
              <span className="font-semibold uppercase tracking-wide text-slate-400">Hint: </span>
              {current.hint}
            </p>
          )}

          {/* Input + result */}
          <div className="mt-6">
            {phase === "correct" ? (
              <div className="rounded-xl bg-green-50 p-4 text-center">
                <p className="text-lg font-bold text-green-700">✓ Correct!</p>
                <p className="mt-1 text-2xl font-bold uppercase tracking-wide text-green-800">
                  {current.word}
                </p>
              </div>
            ) : phase === "revealed" ? (
              <div className="rounded-xl bg-amber-50 p-4 text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
                  Answer
                </p>
                <p className="mt-1 text-2xl font-bold uppercase tracking-wide text-amber-800">
                  {current.word}
                </p>
              </div>
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type your answer…"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-center text-lg font-semibold uppercase tracking-wide text-slate-800 outline-none transition placeholder:normal-case placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-400 ${
                  wrong ? "border-red-400" : "border-slate-200 focus:border-[var(--ws-accent)]"
                }`}
                style={{ ["--ws-accent" as string]: ACCENT }}
              />
            )}
            {wrong && (
              <p className="mt-2 text-center text-sm font-semibold text-red-500">
                Not quite — try again!
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between gap-2">
            <button
              onClick={goPrev}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              ← Prev
            </button>

            <div className="flex items-center gap-2">
              {phase === "playing" && (
                <>
                  <button
                    onClick={reveal}
                    className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
                  >
                    Reveal
                  </button>
                  <PlayButton accent={ACCENT} onClick={check} disabled={!guess.trim()}>
                    Check
                  </PlayButton>
                </>
              )}
              {phase === "correct" && (
                <PlayButton accent={ACCENT} onClick={goNext}>
                  Next →
                </PlayButton>
              )}
              {phase === "revealed" && (
                <button
                  onClick={goNext}
                  className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
                >
                  Skip →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "word-scramble",
  name: "Word Scramble",
  blurb: "Unscramble the jumbled letters to find each word.",
  icon: "🔀",
  category: "Word Games",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Word | Hint (optional). First row is headers.",
  sample,
  parse,
  Component: WordScramble,
})
