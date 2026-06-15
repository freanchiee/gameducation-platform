"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
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
const MAX_WRONG = 6

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const items = rows
    .slice(1)
    .map((r) => ({
      word: (r?.[0] || "").trim(),
      hint: (r?.[1] || "").trim() || undefined,
    }))
    // keep only entries that contain at least one letter to guess
    .filter((it) => /[a-z]/i.test(it.word))
  return items.length ? { items } : sample
}

const sample: Data = {
  items: [
    { word: "AVALANCHE", hint: "A mass of snow sliding down a mountain" },
    { word: "BLIZZARD", hint: "A severe snowstorm with strong winds" },
    { word: "ICICLE", hint: "Hangs from a roof when water freezes" },
    { word: "FROSTBITE", hint: "Skin injury from extreme cold" },
    { word: "SNOW ANGEL", hint: "Made by lying down and moving your arms" },
    { word: "HIBERNATE", hint: "What bears do all winter" },
  ],
}

/** The snowman gets a face, then loses parts as wrong guesses pile up.
 *  stage = number of wrong guesses (0..6). At 6 the snowman has fully melted. */
function Snowman({ stage }: { stage: number }) {
  // 0 wrong = full healthy snowman; 6 wrong = melted puddle.
  const melt = Math.min(Math.max(stage, 0), MAX_WRONG)
  const headOpacity = melt >= 4 ? 0.15 : 1
  const bodyOpacity = melt >= 5 ? 0.15 : 1
  const baseOpacity = melt >= 6 ? 0.15 : 1
  const armOpacity = melt >= 3 ? 0.1 : 1
  const noseOpacity = melt >= 2 ? 0.1 : 1
  const hatOpacity = melt >= 1 ? 0.1 : 1
  // The puddle grows as it melts.
  const puddle = 8 + melt * 9

  return (
    <svg
      viewBox="0 0 160 200"
      className="h-52 w-44"
      role="img"
      aria-label={`Snowman with ${melt} of ${MAX_WRONG} parts melted`}
    >
      {/* melt puddle */}
      <ellipse
        cx="80"
        cy="188"
        rx={puddle}
        ry={4 + melt}
        fill={ACCENT}
        opacity={0.18 + melt * 0.05}
        className="transition-all duration-500"
      />
      {/* base */}
      <circle cx="80" cy="158" r="30" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" opacity={baseOpacity} className="transition-all duration-500" />
      {/* body */}
      <circle cx="80" cy="112" r="24" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" opacity={bodyOpacity} className="transition-all duration-500" />
      {/* buttons */}
      <circle cx="80" cy="104" r="2.4" fill="#475569" opacity={bodyOpacity} className="transition-all duration-500" />
      <circle cx="80" cy="116" r="2.4" fill="#475569" opacity={bodyOpacity} className="transition-all duration-500" />
      {/* arms */}
      <g opacity={armOpacity} className="transition-all duration-500" stroke="#92400e" strokeWidth="3" strokeLinecap="round">
        <line x1="58" y1="108" x2="30" y2="96" />
        <line x1="40" y1="100" x2="34" y2="88" />
        <line x1="102" y1="108" x2="130" y2="96" />
        <line x1="120" y1="100" x2="126" y2="88" />
      </g>
      {/* head */}
      <circle cx="80" cy="72" r="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" opacity={headOpacity} className="transition-all duration-500" />
      {/* eyes */}
      <circle cx="73" cy="69" r="2.4" fill="#1f2937" opacity={headOpacity} className="transition-all duration-500" />
      <circle cx="87" cy="69" r="2.4" fill="#1f2937" opacity={headOpacity} className="transition-all duration-500" />
      {/* carrot nose */}
      <polygon points="80,74 80,80 98,78" fill="#f97316" opacity={noseOpacity} className="transition-all duration-500" />
      {/* hat */}
      <g opacity={hatOpacity} className="transition-all duration-500">
        <rect x="62" y="52" width="36" height="6" rx="2" fill="#1f2937" />
        <rect x="68" y="36" width="24" height="18" rx="2" fill="#1f2937" />
        <rect x="68" y="48" width="24" height="4" fill={ACCENT} />
      </g>
    </svg>
  )
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

function isLetter(ch: string): boolean {
  return /[A-Z]/.test(ch)
}

function SnowmanGame({ data }: { data: Data }) {
  const items = useMemo(
    () => (data.items.length ? data.items : sample.items),
    [data.items],
  )

  // Deterministic initial order for SSR-safe render; shuffled after mount.
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i))
  const [pos, setPos] = useState(0)
  const [guessed, setGuessed] = useState<Set<string>>(new Set())
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)

  // Shuffle once after mount (hydration-safe — no randomness during render).
  useEffect(() => {
    setOrder((prev) => {
      const next = [...prev]
      for (let k = next.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1))
        ;[next[k], next[j]] = [next[j], next[k]]
      }
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const current = items[order[pos]] ?? items[0]
  const word = (current?.word ?? "").toUpperCase()

  const letterSet = useMemo(
    () => new Set(word.split("").filter(isLetter)),
    [word],
  )

  const wrong = useMemo(
    () => [...guessed].filter((g) => !letterSet.has(g)),
    [guessed, letterSet],
  )
  const wrongCount = wrong.length

  const won = useMemo(
    () => letterSet.size > 0 && [...letterSet].every((l) => guessed.has(l)),
    [letterSet, guessed],
  )
  const lost = wrongCount >= MAX_WRONG
  const over = won || lost

  // Tally a result exactly once when the round ends.
  const [tallied, setTallied] = useState(false)
  useEffect(() => {
    if (over && !tallied) {
      if (won) setWins((w) => w + 1)
      else setLosses((l) => l + 1)
      setTallied(true)
    }
  }, [over, won, tallied])

  const guess = useCallback(
    (raw: string) => {
      const ch = raw.toUpperCase()
      if (!isLetter(ch)) return
      setGuessed((prev) => {
        if (prev.has(ch)) return prev
        // Block new guesses once the round is over.
        const finished =
          letterSet.size > 0 &&
          ([...letterSet].every((l) => prev.has(l)) ||
            [...prev].filter((g) => !letterSet.has(g)).length >= MAX_WRONG)
        if (finished) return prev
        const next = new Set(prev)
        next.add(ch)
        return next
      })
    },
    [letterSet],
  )

  const nextWord = useCallback(() => {
    setPos((p) => (p + 1) % items.length)
    setGuessed(new Set())
    setTallied(false)
  }, [items.length])

  const restart = useCallback(() => {
    setOrder(items.map((_, i) => i))
    setPos(0)
    setGuessed(new Set())
    setWins(0)
    setLosses(0)
    setTallied(false)
  }, [items])

  // Physical keyboard support.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (over) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          nextWord()
        }
        return
      }
      if (e.key.length === 1 && /[a-z]/i.test(e.key)) guess(e.key)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [guess, nextWord, over])

  const remaining = MAX_WRONG - wrongCount

  return (
    <GameFrame
      title="Snowman"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="rounded-lg bg-green-100 px-2.5 py-1 text-green-700">
            {wins}W
          </span>
          <span className="rounded-lg bg-rose-100 px-2.5 py-1 text-rose-700">
            {losses}L
          </span>
        </div>
      }
    >
      <div className="rounded-2xl border border-black/10 bg-gradient-to-b from-sky-50 to-white p-5 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
          {/* Snowman + lives */}
          <div className="flex flex-col items-center">
            <Snowman stage={wrongCount} />
            <div className="mt-1 flex items-center gap-1.5">
              {Array.from({ length: MAX_WRONG }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i < remaining ? "" : "bg-slate-200"
                  }`}
                  style={i < remaining ? { backgroundColor: ACCENT } : undefined}
                />
              ))}
            </div>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {remaining} guess{remaining === 1 ? "" : "es"} left
            </p>
          </div>

          {/* Word + hint + status */}
          <div className="min-w-0">
            {current?.hint && (
              <p className="mb-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-700">Hint:</span> {current.hint}
              </p>
            )}

            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {word.split("").map((ch, idx) => {
                if (!isLetter(ch)) {
                  // Render spaces as a visible gap between words.
                  return <span key={idx} className="w-3 sm:w-5" aria-hidden />
                }
                const show = guessed.has(ch) || over
                const correct = letterSet.has(ch)
                return (
                  <span
                    key={idx}
                    className="flex h-11 w-8 items-end justify-center border-b-[3px] text-2xl font-bold sm:w-9"
                    style={{
                      borderColor: ACCENT,
                      color: show ? (correct ? "#0f172a" : "#e11d48") : "transparent",
                    }}
                  >
                    {show ? ch : "•"}
                  </span>
                )
              })}
            </div>

            <div className="mt-4 min-h-[2.5rem]" aria-live="polite">
              {won && (
                <p className="text-lg font-bold text-green-600">
                  Nailed it! The snowman is safe. ⛄
                </p>
              )}
              {lost && (
                <p className="text-lg font-bold text-rose-600">
                  Melted! The word was <span className="underline">{word}</span>.
                </p>
              )}
              {!over && wrongCount > 0 && (
                <p className="text-sm text-slate-500">
                  Wrong: <span className="font-semibold text-rose-500">{wrong.join(" ")}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Keyboard */}
        <div className="mt-4 grid grid-cols-7 gap-1.5 sm:grid-cols-9 sm:gap-2">
          {LETTERS.map((l) => {
            const used = guessed.has(l)
            const right = used && letterSet.has(l)
            const base =
              "flex h-9 items-center justify-center rounded-lg text-sm font-bold transition disabled:cursor-not-allowed"
            let cls = "border border-black/10 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
            if (used && right) cls = "bg-green-100 text-green-700 border border-green-200"
            else if (used && !right) cls = "bg-rose-100 text-rose-400 border border-rose-200 line-through"
            return (
              <button
                key={l}
                onClick={() => guess(l)}
                disabled={used || over}
                className={`${base} ${cls}`}
                aria-label={`Guess ${l}`}
              >
                {l}
              </button>
            )
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm text-slate-500">
            Word {pos + 1} of {items.length}
          </span>
          <PlayButton accent={ACCENT} onClick={nextWord} disabled={!over}>
            Next word →
          </PlayButton>
        </div>
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "snowman",
  name: "Snowman",
  blurb: "A friendly hangman — guess the word before the snowman melts.",
  icon: "⛄",
  category: "Word Games",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Word | Hint (optional). First row is headers.",
  sample,
  parse,
  Component: SnowmanGame,
})
