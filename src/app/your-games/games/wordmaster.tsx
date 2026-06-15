"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Delete, CornerDownLeft } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame } from "./ui"

interface Data {
  words: string[]
}

const ACCENT = "#1b7888"
const MAX_ROWS = 6
const WORD_LEN = 5

type Status = "correct" | "present" | "absent"

const sample: Data = {
  words: [
    "PLANT",
    "BRAVE",
    "CHART",
    "MOUSE",
    "GLIDE",
    "STONE",
    "FROST",
    "QUILT",
    "WORLD",
    "SHINE",
    "CRANE",
    "PRIDE",
    "FLAME",
    "GRASP",
    "TOWER",
  ],
}

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const seen = new Set<string>()
  const words = rows
    .slice(1)
    .map((r) => (r && r[0] ? String(r[0]).trim().toUpperCase() : ""))
    .filter((w) => /^[A-Z]{5}$/.test(w))
    .filter((w) => {
      if (seen.has(w)) return false
      seen.add(w)
      return true
    })
  return { words: words.length ? words : sample.words }
}

/** Standard two-pass Wordle scoring so duplicate letters resolve correctly. */
function scoreGuess(guess: string, answer: string): Status[] {
  const result: Status[] = new Array(WORD_LEN).fill("absent")
  const remaining: Record<string, number> = {}
  // Pass 1: mark exact matches, tally the rest of the answer's letters.
  for (let i = 0; i < WORD_LEN; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct"
    } else {
      remaining[answer[i]] = (remaining[answer[i]] || 0) + 1
    }
  }
  // Pass 2: mark present letters from the leftover pool.
  for (let i = 0; i < WORD_LEN; i++) {
    if (result[i] === "correct") continue
    const ch = guess[i]
    if (remaining[ch] > 0) {
      result[i] = "present"
      remaining[ch] -= 1
    }
  }
  return result
}

const STATUS_RANK: Record<Status, number> = { absent: 0, present: 1, correct: 2 }

const KEY_ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]

function tileColors(status: Status | undefined): string {
  switch (status) {
    case "correct":
      return "text-white border-transparent"
    case "present":
      return "text-white border-transparent"
    case "absent":
      return "bg-slate-400 text-white border-transparent"
    default:
      return "bg-white text-slate-800 border-slate-300"
  }
}

function tileStyle(status: Status | undefined) {
  if (status === "correct") return { backgroundColor: ACCENT }
  if (status === "present") return { backgroundColor: "#c9a227" }
  return undefined
}

function WordMaster({ data }: { data: Data }) {
  const words = data.words.length ? data.words : sample.words

  // Deterministic first answer (words[0]) so SSR and first client render match.
  const [answer, setAnswer] = useState<string>(() => words[0])
  const [guesses, setGuesses] = useState<string[]>([])
  const [current, setCurrent] = useState<string>("")
  const [done, setDone] = useState<"won" | "lost" | null>(null)
  const [shake, setShake] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // Per-letter best status, for recolouring the on-screen keyboard.
  const keyStatuses = useMemo<Record<string, Status>>(() => {
    const map: Record<string, Status> = {}
    for (const g of guesses) {
      const score = scoreGuess(g, answer)
      for (let i = 0; i < WORD_LEN; i++) {
        const ch = g[i]
        const s = score[i]
        if (!map[ch] || STATUS_RANK[s] > STATUS_RANK[map[ch]]) map[ch] = s
      }
    }
    return map
  }, [guesses, answer])

  const flash = useCallback((msg: string) => {
    setToast(msg)
    setShake(true)
    window.setTimeout(() => setShake(false), 450)
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 1200)
  }, [])

  const submit = useCallback(() => {
    if (done) return
    if (current.length !== WORD_LEN) {
      flash("Not enough letters")
      return
    }
    const guess = current
    const nextGuesses = [...guesses, guess]
    setGuesses(nextGuesses)
    setCurrent("")
    if (guess === answer) {
      const praise = ["Genius!", "Magnificent!", "Impressive!", "Splendid!", "Great!", "Phew!"]
      setToast(praise[Math.min(nextGuesses.length - 1, praise.length - 1)])
      setDone("won")
    } else if (nextGuesses.length >= MAX_ROWS) {
      setDone("lost")
    }
  }, [current, guesses, answer, done, flash])

  const press = useCallback(
    (key: string) => {
      if (done) return
      if (key === "ENTER") {
        submit()
      } else if (key === "BACK") {
        setCurrent((c) => c.slice(0, -1))
      } else if (/^[A-Z]$/.test(key)) {
        setCurrent((c) => (c.length < WORD_LEN ? c + key : c))
      }
    },
    [done, submit],
  )

  // Physical keyboard input.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === "Enter") {
        e.preventDefault()
        press("ENTER")
      } else if (e.key === "Backspace") {
        e.preventDefault()
        press("BACK")
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        press(e.key.toUpperCase())
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [press])

  const restart = useCallback(() => {
    // Random answer on restart — fine here since it runs from a user action.
    const next = words[Math.floor(Math.random() * words.length)] || words[0]
    setAnswer(next)
    setGuesses([])
    setCurrent("")
    setDone(null)
    setToast(null)
  }, [words])

  // Build the 6x5 grid for rendering.
  const grid = useMemo(() => {
    const rows: { letters: string[]; statuses?: Status[]; isCurrent: boolean }[] = []
    for (let r = 0; r < MAX_ROWS; r++) {
      if (r < guesses.length) {
        const g = guesses[r]
        rows.push({
          letters: g.split(""),
          statuses: scoreGuess(g, answer),
          isCurrent: false,
        })
      } else if (r === guesses.length && !done) {
        const letters = current.split("")
        while (letters.length < WORD_LEN) letters.push("")
        rows.push({ letters, isCurrent: true })
      } else {
        rows.push({ letters: new Array(WORD_LEN).fill(""), isCurrent: false })
      }
    }
    return rows
  }, [guesses, current, answer, done])

  return (
    <GameFrame title="WordMaster" accent={ACCENT} onRestart={restart}>
      <div className="mb-4 flex items-center justify-center gap-2 text-sm text-slate-500">
        <span>Guess the 5-letter word in {MAX_ROWS} tries</span>
      </div>

      {/* Toast / status banner */}
      <div className="mb-3 flex h-8 items-center justify-center">
        {toast && (
          <span
            className="rounded-md px-3 py-1 text-sm font-semibold text-white shadow-sm"
            style={{ backgroundColor: done === "lost" ? "#64748b" : ACCENT }}
          >
            {toast}
          </span>
        )}
        {!toast && done === "lost" && (
          <span className="text-sm font-semibold text-slate-600">
            The word was <span className="font-bold tracking-widest" style={{ color: ACCENT }}>{answer}</span>
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="mx-auto flex w-fit flex-col gap-1.5">
        {grid.map((row, r) => (
          <div
            key={r}
            className={`flex gap-1.5 ${shake && row.isCurrent ? "animate-[wm-shake_0.45s]" : ""}`}
          >
            {row.letters.map((ch, c) => {
              const status = row.statuses?.[c]
              const filled = ch !== ""
              return (
                <div
                  key={c}
                  className={`flex size-12 items-center justify-center rounded-md border-2 text-2xl font-extrabold uppercase transition sm:size-14 sm:text-3xl ${tileColors(
                    status,
                  )} ${filled && !status ? "border-slate-500" : ""}`}
                  style={tileStyle(status)}
                >
                  {ch}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Win banner */}
      {done === "won" && (
        <p className="mt-5 text-center text-lg font-bold" style={{ color: ACCENT }}>
          Solved in {guesses.length} {guesses.length === 1 ? "guess" : "guesses"}!
        </p>
      )}

      {/* On-screen keyboard */}
      <div className="mx-auto mt-6 flex max-w-xl flex-col gap-1.5">
        {KEY_ROWS.map((krow, ri) => (
          <div key={ri} className="flex justify-center gap-1.5">
            {ri === 2 && (
              <KeyCap label="ENTER" wide onClick={() => press("ENTER")}>
                <CornerDownLeft className="size-4" />
                <span className="ml-1 hidden text-[11px] sm:inline">Enter</span>
              </KeyCap>
            )}
            {krow.split("").map((k) => (
              <KeyCap key={k} label={k} status={keyStatuses[k]} onClick={() => press(k)}>
                {k}
              </KeyCap>
            ))}
            {ri === 2 && (
              <KeyCap label="BACK" wide onClick={() => press("BACK")}>
                <Delete className="size-4" />
              </KeyCap>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Type with your keyboard or tap the keys. Enter to submit.
      </p>

      <style>{`
        @keyframes wm-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </GameFrame>
  )
}

function KeyCap({
  label,
  status,
  wide,
  onClick,
  children,
}: {
  label: string
  status?: Status
  wide?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  const base =
    "flex h-12 items-center justify-center rounded-md text-sm font-bold uppercase transition select-none active:scale-95 sm:h-14"
  const sizing = wide ? "px-3 min-w-[3.25rem]" : "w-9 sm:w-11"
  let cls = "bg-slate-200 text-slate-800 hover:bg-slate-300"
  let style: React.CSSProperties | undefined
  if (status === "correct") {
    cls = "text-white"
    style = { backgroundColor: ACCENT }
  } else if (status === "present") {
    cls = "text-white"
    style = { backgroundColor: "#c9a227" }
  } else if (status === "absent") {
    cls = "bg-slate-400 text-white"
  }
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`${base} ${sizing} ${cls}`}
      style={style}
    >
      {children}
    </button>
  )
}

export default defineGame<Data>({
  id: "wordmaster",
  name: "WordMaster",
  blurb: "A Wordle-style puzzle — guess the 5-letter word in six tries.",
  icon: "🟩",
  category: "Word Games",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Column: Word (5-letter words). First row is headers.",
  sample,
  parse,
  Component: WordMaster,
})
