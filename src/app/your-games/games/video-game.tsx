"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { Heart, Coins, Gamepad2 } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Item {
  q: string
  a: string
}
interface Data {
  items: Item[]
}

const ACCENT = "#d85140"
const PANEL = "#0a0a0f" // near-black cabinet
const PANEL_LIGHT = "#15151f"
const NEON = "#39ff14" // arcade green for score
const MAX_LIVES = 3
const MONO = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const items: Item[] = []
  for (const r of rows.slice(1)) {
    if (!Array.isArray(r)) continue
    const q = (r[0] || "").trim()
    const a = (r[1] || "").trim()
    if (!q || !a) continue
    items.push({ q, a })
  }
  return items.length ? { items } : sample
}

const sample: Data = {
  items: [
    { q: "What planet is known as the Red Planet?", a: "Mars" },
    { q: "How many continents are there on Earth?", a: "Seven" },
    { q: "What is the chemical symbol for water?", a: "H2O" },
    { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
    { q: "What is the largest mammal on Earth?", a: "Blue whale" },
    { q: "What gas do plants absorb from the air?", a: "Carbon dioxide" },
    { q: "How many sides does a hexagon have?", a: "Six" },
    { q: "What is the capital of France?", a: "Paris" },
    { q: "Which language has the most native speakers?", a: "Mandarin Chinese" },
    { q: "What force pulls objects toward Earth?", a: "Gravity" },
  ],
}

// Fisher–Yates shuffle (call only inside effects/handlers — never during render).
function shuffled<T>(arr: T[]): T[] {
  const next = [...arr]
  for (let k = next.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1))
    ;[next[k], next[j]] = [next[j], next[k]]
  }
  return next
}

function VideoGame({ data }: { data: Data }) {
  const items = data.items.length ? data.items : sample.items

  // Round order is randomised on mount / restart (hydration-safe: set in effect).
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i))
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(MAX_LIVES)
  const [choices, setChoices] = useState<string[]>([])
  // null = awaiting answer; otherwise the chosen option string.
  const [picked, setPicked] = useState<string | null>(null)
  const [streak, setStreak] = useState(0)
  const [over, setOver] = useState<"win" | "lose" | null>(null)
  const [restartKey, setRestartKey] = useState(0)

  const total = items.length
  const current = items[order[idx]] ?? null

  // Randomise the round order once per mount/restart.
  useEffect(() => {
    setOrder(shuffled(items.map((_, i) => i)))
    setIdx(0)
    setScore(0)
    setLives(MAX_LIVES)
    setPicked(null)
    setStreak(0)
    setOver(null)
    // items identity is stable per `data`; restartKey forces a reshuffle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restartKey, total])

  // Build answer choices whenever the question changes (random — keep in effect).
  useEffect(() => {
    if (!current || over) return
    const correct = current.a
    const distractorPool = items
      .map((it) => it.a)
      .filter((a) => a !== correct)
    const uniqueDistractors = Array.from(new Set(distractorPool))
    const desired = Math.min(4, Math.max(2, uniqueDistractors.length + 1))
    const pickedDistractors = shuffled(uniqueDistractors).slice(0, desired - 1)
    setChoices(shuffled([correct, ...pickedDistractors]))
    setPicked(null)
    // current changes with idx/order; recompute on those.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, order, over])

  const advance = (correctPicked: boolean, livesAfter: number) => {
    const isLast = idx + 1 >= order.length
    if (livesAfter <= 0) {
      window.setTimeout(() => setOver("lose"), 650)
      return
    }
    if (isLast) {
      window.setTimeout(() => setOver(correctPicked || livesAfter > 0 ? "win" : "lose"), 650)
      return
    }
    window.setTimeout(() => setIdx((p) => p + 1), 650)
  }

  const choose = (opt: string) => {
    if (picked !== null || over || !current) return
    setPicked(opt)
    const correct = opt === current.a
    if (correct) {
      setScore((s) => s + 100 + streak * 25)
      setStreak((s) => s + 1)
      advance(true, lives)
    } else {
      const livesAfter = lives - 1
      setLives(livesAfter)
      setStreak(0)
      advance(false, livesAfter)
    }
  }

  // Number-key support (1–4). Effect-only browser API; cleaned up on change.
  useEffect(() => {
    if (over) return
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key)
      if (Number.isFinite(n) && n >= 1 && n <= choices.length) {
        choose(choices[n - 1])
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // choose closes over current state; rebind when choices/picked/lives change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choices, picked, over, lives, streak])

  const restart = () => setRestartKey((k) => k + 1)

  const progress = useMemo(
    () => (total > 0 ? Math.round((idx / total) * 100) : 0),
    [idx, total],
  )

  const cabinetStyle: CSSProperties = {
    background: `radial-gradient(120% 90% at 50% -10%, ${PANEL_LIGHT}, ${PANEL} 60%)`,
    boxShadow: `0 0 0 1px ${ACCENT}55, 0 0 28px ${ACCENT}40, inset 0 0 60px rgba(0,0,0,0.6)`,
    fontFamily: MONO,
  }

  return (
    <GameFrame
      title="Video Game"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold tabular-nums shadow-sm"
          style={{ backgroundColor: PANEL, color: NEON, fontFamily: MONO, boxShadow: `0 0 10px ${NEON}55` }}
        >
          <Coins className="size-4" style={{ color: NEON }} />
          {score}
        </div>
      }
    >
      <div className="overflow-hidden rounded-2xl p-4 sm:p-6" style={cabinetStyle}>
        {/* HUD */}
        <div className="mb-4 flex items-center justify-between gap-3 text-[0.7rem] uppercase tracking-widest sm:text-xs" style={{ fontFamily: MONO }}>
          <div className="flex flex-col gap-0.5">
            <span className="text-white/40">Score</span>
            <span
              className="text-lg font-black tabular-nums sm:text-xl"
              style={{ color: NEON, textShadow: `0 0 8px ${NEON}99` }}
            >
              {String(score).padStart(6, "0")}
            </span>
          </div>

          <div className="flex flex-col items-center gap-0.5">
            <span className="text-white/40">Stage</span>
            <span className="text-lg font-black tabular-nums sm:text-xl" style={{ color: "#fff" }}>
              {Math.min(idx + 1, total)}
              <span className="text-white/30">/{total}</span>
            </span>
          </div>

          <div className="flex flex-col items-end gap-0.5">
            <span className="text-white/40">Lives</span>
            <span className="flex gap-1">
              {Array.from({ length: MAX_LIVES }).map((_, i) => (
                <Heart
                  key={i}
                  className="size-4 sm:size-5"
                  style={{
                    color: i < lives ? ACCENT : "transparent",
                    fill: i < lives ? ACCENT : "transparent",
                    stroke: i < lives ? ACCENT : "rgba(255,255,255,0.2)",
                    filter: i < lives ? `drop-shadow(0 0 4px ${ACCENT})` : "none",
                  }}
                />
              ))}
            </span>
          </div>
        </div>

        {/* Progress scanline bar */}
        <div className="mb-5 h-2 w-full overflow-hidden rounded-full border border-white/10 bg-black/50">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${ACCENT}, ${NEON})`, boxShadow: `0 0 10px ${ACCENT}` }}
          />
        </div>

        {over ? (
          <ResultsScreen
            outcome={over}
            score={score}
            total={total}
            onRestart={restart}
          />
        ) : current ? (
          <div>
            {/* Question screen */}
            <div
              className="mb-5 rounded-xl border border-white/10 px-4 py-6 text-center"
              style={{ background: "rgba(0,0,0,0.45)", boxShadow: `inset 0 0 30px ${ACCENT}22` }}
            >
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/40" style={{ fontFamily: MONO }}>
                Question
              </p>
              <p
                className="text-lg font-bold leading-snug text-white sm:text-2xl"
                style={{ fontFamily: MONO, textShadow: "0 2px 0 rgba(0,0,0,0.6)" }}
              >
                {current.q}
              </p>
            </div>

            {/* Choices */}
            <div className="grid gap-2.5 sm:grid-cols-2">
              {choices.map((opt, i) => {
                const isCorrect = opt === current.a
                const isPicked = picked === opt
                const reveal = picked !== null
                let bg = "rgba(255,255,255,0.04)"
                let border = "rgba(255,255,255,0.14)"
                let glow = "none"
                let color = "#fff"
                if (reveal && isCorrect) {
                  bg = "rgba(57,255,20,0.16)"
                  border = NEON
                  glow = `0 0 14px ${NEON}88`
                  color = NEON
                } else if (reveal && isPicked && !isCorrect) {
                  bg = "rgba(216,81,64,0.18)"
                  border = ACCENT
                  glow = `0 0 14px ${ACCENT}88`
                  color = "#ffb4ab"
                } else if (reveal) {
                  color = "rgba(255,255,255,0.45)"
                }
                return (
                  <button
                    key={`${opt}-${i}`}
                    onClick={() => choose(opt)}
                    disabled={reveal}
                    className="group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition enabled:hover:scale-[1.02] enabled:hover:brightness-125 disabled:cursor-default"
                    style={{ backgroundColor: bg, borderColor: border, boxShadow: glow, fontFamily: MONO }}
                  >
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-md text-sm font-black"
                      style={{
                        backgroundColor: reveal && isCorrect ? NEON : reveal && isPicked ? ACCENT : "rgba(255,255,255,0.1)",
                        color: reveal && (isCorrect || isPicked) ? PANEL : "#fff",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-bold sm:text-base" style={{ color }}>
                      {opt}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Feedback line */}
            <div className="mt-4 h-6 text-center text-sm font-bold" style={{ fontFamily: MONO }}>
              {picked !== null &&
                (picked === current.a ? (
                  <span style={{ color: NEON, textShadow: `0 0 8px ${NEON}` }}>
                    {streak > 1 ? `COMBO x${streak}! ` : ""}+{100 + (streak - 1) * 25} ★
                  </span>
                ) : (
                  <span style={{ color: "#ffb4ab" }}>
                    MISS — answer: {current.a}
                  </span>
                ))}
            </div>

            <p className="mt-1 text-center text-[0.65rem] uppercase tracking-widest text-white/30" style={{ fontFamily: MONO }}>
              Click or press 1–{choices.length || 4}
            </p>
          </div>
        ) : (
          <p className="py-10 text-center text-white/50" style={{ fontFamily: MONO }}>
            No questions loaded.
          </p>
        )}
      </div>
    </GameFrame>
  )
}

function ResultsScreen({
  outcome,
  score,
  total,
  onRestart,
}: {
  outcome: "win" | "lose"
  score: number
  total: number
  onRestart: () => void
}) {
  const won = outcome === "win"
  // Blink "INSERT COIN" — toggled in an effect (no render-time timing).
  const [blink, setBlink] = useState(true)
  useEffect(() => {
    const t = window.setInterval(() => setBlink((b) => !b), 600)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center" style={{ fontFamily: MONO }}>
      <Gamepad2
        className="size-12"
        style={{ color: won ? NEON : ACCENT, filter: `drop-shadow(0 0 12px ${won ? NEON : ACCENT})` }}
      />
      <p
        className="text-3xl font-black uppercase tracking-widest sm:text-4xl"
        style={{ color: won ? NEON : ACCENT, textShadow: `0 0 16px ${won ? NEON : ACCENT}` }}
      >
        {won ? "You Win!" : "Game Over"}
      </p>

      <div className="rounded-xl border border-white/10 bg-black/50 px-8 py-4">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/40">Final Score</p>
        <p className="text-4xl font-black tabular-nums" style={{ color: NEON, textShadow: `0 0 12px ${NEON}99` }}>
          {String(score).padStart(6, "0")}
        </p>
        <p className="mt-1 text-xs text-white/40">{total} question{total === 1 ? "" : "s"}</p>
      </div>

      <span
        className="text-sm font-bold uppercase tracking-[0.3em] transition-opacity"
        style={{ color: "#fff", opacity: blink ? 1 : 0.15 }}
      >
        Insert Coin
      </span>

      <PlayButton accent={ACCENT} onClick={onRestart} className="mt-1">
        <span className="inline-flex items-center gap-1.5">
          <Coins className="size-4" /> Play Again
        </span>
      </PlayButton>
    </div>
  )
}

export default defineGame<Data>({
  id: "video-game",
  name: "Video Game",
  blurb: "A retro arcade-style quiz game.",
  icon: "🕹️",
  category: "Quizzes & Assessment",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Question | Answer. First row is headers.",
  sample,
  parse,
  Component: VideoGame,
})
