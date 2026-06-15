"use client"

import { useMemo, useState, type CSSProperties } from "react"
import { Lock, LockOpen, Lightbulb, KeyRound, PartyPopper, Sparkles } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface LockItem {
  clue: string
  code: string
  hint?: string
}
interface Data {
  locks: LockItem[]
}

const ACCENT = "#58a65c"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample

  const locks = rows
    .slice(1)
    .filter((r) => Array.isArray(r) && (r[0] || r[1]))
    .map((r) => ({
      clue: (r[0] || "").trim(),
      code: (r[1] || "").trim(),
      hint: (r[2] || "").trim() || undefined,
    }))
    // A lock needs both a clue and a code to be solvable.
    .filter((l) => l.clue && l.code)

  return locks.length ? { locks } : sample
}

const sample: Data = {
  locks: [
    {
      clue: "I am the closest planet to the Sun. Type my name to unlock.",
      code: "Mercury",
      hint: "It shares a name with a liquid metal.",
    },
    {
      clue: "The number of sides on a hexagon, times two.",
      code: "12",
      hint: "A hexagon has 6 sides.",
    },
    {
      clue: "The chemical symbol for water.",
      code: "H2O",
      hint: "Two hydrogen, one oxygen.",
    },
    {
      clue: "The author of 'Romeo and Juliet' (last name only).",
      code: "Shakespeare",
      hint: "The Bard of Avon.",
    },
    {
      clue: "What does the 'C' stand for in CPU?",
      code: "Central",
      hint: "Central ___ Processing Unit.",
    },
    {
      clue: "The largest mammal on Earth (two words).",
      code: "Blue Whale",
      hint: "Its name is also a colour.",
    },
  ],
}

type Status = "locked" | "open"

function VirtualBreakout({ data }: { data: Data }) {
  const locks = data.locks.length ? data.locks : sample.locks

  const [opened, setOpened] = useState<boolean[]>(() => locks.map(() => false))
  const [inputs, setInputs] = useState<string[]>(() => locks.map(() => ""))
  const [shaking, setShaking] = useState<number | null>(null)
  const [hintsShown, setHintsShown] = useState<boolean[]>(() => locks.map(() => false))
  const [attempts, setAttempts] = useState(0)
  const [justOpened, setJustOpened] = useState<number | null>(null)

  const openedCount = useMemo(() => opened.filter(Boolean).length, [opened])
  const total = locks.length
  const escaped = total > 0 && openedCount === total

  const tryCode = (i: number) => {
    if (opened[i]) return
    const guess = (inputs[i] || "").trim().toLowerCase()
    const answer = (locks[i].code || "").trim().toLowerCase()
    if (!guess) return

    if (guess === answer) {
      setOpened((prev) => {
        const next = [...prev]
        next[i] = true
        return next
      })
      setJustOpened(i)
      // Clear the celebration flag shortly after; harmless if unmounted.
      window.setTimeout(() => {
        setJustOpened((cur) => (cur === i ? null : cur))
      }, 1400)
    } else {
      setAttempts((a) => a + 1)
      setShaking(i)
      window.setTimeout(() => {
        setShaking((cur) => (cur === i ? null : cur))
      }, 520)
    }
  }

  const setInput = (i: number, v: string) => {
    setInputs((prev) => {
      const next = [...prev]
      next[i] = v
      return next
    })
  }

  const showHint = (i: number) => {
    setHintsShown((prev) => {
      const next = [...prev]
      next[i] = true
      return next
    })
  }

  const restart = () => {
    setOpened(locks.map(() => false))
    setInputs(locks.map(() => ""))
    setHintsShown(locks.map(() => false))
    setShaking(null)
    setJustOpened(null)
    setAttempts(0)
  }

  const pct = total ? Math.round((openedCount / total) * 100) : 0

  return (
    <GameFrame
      title="Virtual Breakout"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold text-white shadow-sm"
          style={{ backgroundColor: ACCENT }}
        >
          <KeyRound className="size-4" />
          <span className="tabular-nums">
            {openedCount} / {total}
          </span>
        </div>
      }
    >
      {/* Local keyframes for shake + celebration so we avoid extra deps. */}
      <style>{`
        @keyframes vb-shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px) rotate(-1deg); }
          30% { transform: translateX(7px) rotate(1deg); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(5px); }
          75% { transform: translateX(-3px); }
        }
        @keyframes vb-pop {
          0% { transform: scale(0.6); opacity: 0; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes vb-rise {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(-44px) scale(1.1); opacity: 0; }
        }
      `}</style>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between text-sm font-semibold text-slate-600">
          <span>
            {escaped ? "All locks opened!" : `${openedCount} of ${total} locks opened`}
          </span>
          <span className="tabular-nums text-slate-400">{attempts} attempts</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: ACCENT }}
          />
        </div>
      </div>

      {escaped ? (
        <div
          className="relative flex flex-col items-center gap-3 overflow-hidden rounded-3xl border border-black/10 p-10 text-center shadow-xl"
          style={{
            background: `linear-gradient(160deg, ${ACCENT}, #2f7a37)`,
          }}
        >
          <div
            className="flex size-20 items-center justify-center rounded-full bg-white/20 text-white"
            style={{ animation: "vb-pop 0.6s ease-out" }}
          >
            <PartyPopper className="size-10" />
          </div>
          <h2
            className="text-4xl font-black text-white drop-shadow"
            style={{ fontFamily: "var(--font-display)" }}
          >
            You escaped!
          </h2>
          <p className="max-w-sm text-white/90">
            You cracked all {total} lock{total === 1 ? "" : "s"} in{" "}
            <span className="font-bold">{attempts}</span> wrong attempt
            {attempts === 1 ? "" : "s"}.
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-white/80">
            <Sparkles className="size-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              {attempts === 0 ? "Flawless breakout!" : "Mission complete"}
            </span>
            <Sparkles className="size-5" />
          </div>
          <PlayButton accent="#1f4d24" onClick={restart} className="mt-3">
            Lock it back up
          </PlayButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {locks.map((lock, i) => {
            const isOpen: boolean = opened[i]
            const status: Status = isOpen ? "open" : "locked"
            const isShaking = shaking === i
            const isCelebrating = justOpened === i

            const cardStyle: CSSProperties = {
              animation: isShaking ? "vb-shake 0.5s ease" : undefined,
              borderColor: isOpen ? ACCENT : undefined,
            }

            return (
              <div
                key={i}
                style={cardStyle}
                className={`relative flex flex-col gap-3 rounded-2xl border-2 p-5 shadow-sm transition-colors ${
                  isOpen
                    ? "border-2 bg-green-50"
                    : "border-black/10 bg-white"
                }`}
              >
                {/* Celebration burst */}
                {isCelebrating && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-3xl"
                    style={{ animation: "vb-rise 1.3s ease-out forwards" }}
                  >
                    🎉
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Lock {i + 1}
                  </span>
                  <span
                    className="flex size-10 items-center justify-center rounded-xl text-white shadow-sm"
                    style={{
                      backgroundColor: isOpen ? ACCENT : "#475569",
                      animation: isCelebrating ? "vb-pop 0.5s ease-out" : undefined,
                    }}
                  >
                    {isOpen ? (
                      <LockOpen className="size-5" />
                    ) : (
                      <Lock className="size-5" />
                    )}
                  </span>
                </div>

                <p
                  className={`min-h-[3rem] text-[0.95rem] font-medium leading-snug ${
                    isOpen ? "text-green-800" : "text-slate-700"
                  }`}
                >
                  {lock.clue}
                </p>

                {status === "open" ? (
                  <div
                    className="mt-auto flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-bold"
                    style={{
                      borderColor: ACCENT,
                      color: "#2f7a37",
                      backgroundColor: "rgba(88,166,92,0.12)",
                    }}
                  >
                    <LockOpen className="size-4 shrink-0" />
                    <span className="truncate">Unlocked — {lock.code}</span>
                  </div>
                ) : (
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-stretch gap-2">
                      <input
                        type="text"
                        value={inputs[i] || ""}
                        onChange={(e) => setInput(i, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") tryCode(i)
                        }}
                        placeholder="Enter code…"
                        aria-label={`Code for lock ${i + 1}`}
                        className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-inner outline-none transition focus:border-transparent focus:ring-2"
                        style={{ "--tw-ring-color": ACCENT } as CSSProperties}
                      />
                      <PlayButton accent={ACCENT} onClick={() => tryCode(i)}>
                        Try
                      </PlayButton>
                    </div>

                    {lock.hint &&
                      (hintsShown[i] ? (
                        <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
                          <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" />
                          <span>{lock.hint}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => showHint(i)}
                          className="inline-flex w-fit items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-amber-600 transition hover:bg-amber-50"
                        >
                          <Lightbulb className="size-3.5" />
                          Show hint
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {!escaped && (
        <p className="mt-5 text-center text-xs text-slate-400">
          Crack every lock to break out. Codes are not case-sensitive.
        </p>
      )}
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "virtual-breakout",
  name: "Virtual Breakout",
  blurb: "Digital breakout / escape room with locks.",
  icon: "🔓",
  category: "Competition",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Clue | Code (the answer that unlocks it). First row is headers.",
  sample,
  parse,
  Component: VirtualBreakout,
})
