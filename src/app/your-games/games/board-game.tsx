"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Flag, Trophy } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface QA {
  q: string
  a: string
}
interface Data {
  items: QA[]
}

const ACCENT = "#58a65c"
const ACCENT_DARK = "#3f7a42"
const TRACK = "#eef6ee"

// Number of playable spaces between START (index 0) and FINISH (last index).
const SPACES = 20
// Columns in the snaking grid.
const COLS = 5

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const items = rows
    .slice(1)
    .filter((r) => Array.isArray(r) && ((r[0] && r[0].trim()) || (r[1] && r[1].trim())))
    .map((r) => ({
      q: (r[0] || "").trim(),
      a: (r[1] || "").trim(),
    }))
    .filter((it) => it.q.length > 0)
  return items.length ? { items } : sample
}

const sample: Data = {
  items: [
    { q: "What is the capital of France?", a: "Paris" },
    { q: "How many continents are there?", a: "Seven" },
    { q: "What gas do plants absorb from the air?", a: "Carbon dioxide" },
    { q: "What is 9 × 7?", a: "63" },
    { q: "Who wrote 'Romeo and Juliet'?", a: "William Shakespeare" },
    { q: "What is the largest planet in our solar system?", a: "Jupiter" },
    { q: "What is the chemical symbol for water?", a: "H₂O" },
    { q: "In which year did World War II end?", a: "1945" },
    { q: "What is the powerhouse of the cell?", a: "The mitochondria" },
    { q: "What is the freezing point of water in Celsius?", a: "0 °C" },
    { q: "What ocean is the largest?", a: "The Pacific Ocean" },
    { q: "What is the square root of 144?", a: "12" },
    { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci" },
    { q: "What is the smallest prime number?", a: "2" },
    { q: "What planet is known as the Red Planet?", a: "Mars" },
    { q: "How many sides does a hexagon have?", a: "Six" },
  ],
}

const DICE_ICONS = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6] as const

// Build a snaking (boustrophedon) layout: row 0 left→right, row 1 right→left, ...
// Returns grid (col, row) for each linear space index 0..SPACES+1.
function layoutFor(total: number, cols: number) {
  const cells: { col: number; row: number }[] = []
  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / cols)
    const inRow = i % cols
    const col = row % 2 === 0 ? inRow : cols - 1 - inRow
    cells.push({ col, row })
  }
  return cells
}

function shuffle<T>(arr: T[]): T[] {
  const next = [...arr]
  for (let k = next.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1))
    ;[next[k], next[j]] = [next[j], next[k]]
  }
  return next
}

function BoardGame({ data }: { data: Data }) {
  const items = data.items.length ? data.items : sample.items

  // Total cells including START (0) and FINISH (SPACES + 1).
  const total = SPACES + 2
  const finish = total - 1
  const rows = Math.ceil(total / COLS)
  const cells = useMemo(() => layoutFor(total, COLS), [total])

  // pos: linear index of the token (0 = START, finish = FINISH).
  const [pos, setPos] = useState(0)
  const [die, setDie] = useState<number | null>(null)
  const [rolling, setRolling] = useState(false)
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i))
  const [drawIdx, setDrawIdx] = useState(0) // pointer into `order`
  const [current, setCurrent] = useState<QA | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [won, setWon] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [message, setMessage] = useState<string | null>(null)

  // Reshuffle the question order once after mount (hydration-safe: no random in render).
  useEffect(() => {
    setOrder(shuffle(items.map((_, i) => i)))
  }, [items])

  const drawNext = () => {
    if (items.length === 0) return
    const idx = order[drawIdx % order.length] ?? 0
    setCurrent(items[idx] ?? items[0])
    setRevealed(false)
    setDrawIdx((d) => d + 1)
  }

  const roll = () => {
    if (rolling || won || current) return
    const value = Math.floor(Math.random() * 6) + 1
    setRolling(true)
    setDie(value)
    setRolls((r) => r + 1)
    setMessage(null)

    // Brief dice tumble before resolving the move.
    window.setTimeout(() => {
      setPos((prev) => {
        const next = Math.min(prev + value, finish)
        if (next >= finish) {
          setWon(true)
          setMessage(null)
        } else {
          drawNext()
        }
        return next
      })
      setRolling(false)
    }, 550)
  }

  const right = () => {
    setCorrect((c) => c + 1)
    setMessage(`Correct! The token holds at space ${pos === finish ? "FINISH" : pos}.`)
    setCurrent(null)
    setRevealed(false)
  }

  const wrong = () => {
    setPos((prev) => {
      const back = Math.max(0, prev - 2)
      setMessage(
        back === prev
          ? "Oof — already at START, can't slip back further."
          : `Wrong — the token slips back to space ${back === 0 ? "START" : back}.`,
      )
      return back
    })
    setCurrent(null)
    setRevealed(false)
  }

  const restart = () => {
    setPos(0)
    setDie(null)
    setRolling(false)
    setOrder(shuffle(items.map((_, i) => i)))
    setDrawIdx(0)
    setCurrent(null)
    setRevealed(false)
    setWon(false)
    setRolls(0)
    setCorrect(0)
    setMessage(null)
  }

  const DieIcon = die ? DICE_ICONS[die - 1] : null

  const spaceLabel = (i: number) => {
    if (i === 0) return "START"
    if (i === finish) return "FINISH"
    return String(i)
  }

  return (
    <GameFrame
      title="Board Game"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold text-white shadow-sm"
          style={{ backgroundColor: ACCENT_DARK }}
        >
          <span className="tabular-nums">
            {pos === finish ? "FINISH" : pos === 0 ? "START" : `Space ${pos}`}
          </span>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-[1fr,18rem]">
        {/* ── The board ────────────────────────────────────────────── */}
        <div
          className="relative rounded-2xl p-3 shadow-inner"
          style={{ background: `linear-gradient(155deg, ${TRACK}, #ffffff)` }}
        >
          <div
            className="grid gap-1.5 sm:gap-2"
            style={{
              gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
          >
            {cells.map((cell, i) => {
              const isStart = i === 0
              const isFinish = i === finish
              const isHere = i === pos
              const special = isStart || isFinish
              return (
                <div
                  key={i}
                  className="relative flex aspect-square items-center justify-center rounded-lg border text-center text-xs font-bold transition"
                  style={{
                    gridColumnStart: cell.col + 1,
                    gridRowStart: cell.row + 1,
                    backgroundColor: special ? ACCENT : "#ffffff",
                    borderColor: special ? ACCENT_DARK : "rgba(0,0,0,0.08)",
                    color: special ? "#ffffff" : "#475569",
                    boxShadow: isHere ? `0 0 0 3px ${ACCENT_DARK}` : undefined,
                  }}
                  aria-label={`Space ${spaceLabel(i)}`}
                >
                  {isStart ? (
                    <span className="text-[0.6rem] uppercase leading-none tracking-wide">Start</span>
                  ) : isFinish ? (
                    <Flag className="size-4" />
                  ) : (
                    <span className="tabular-nums opacity-70">{i}</span>
                  )}
                  {isHere && (
                    <motion.div
                      layoutId="token"
                      transition={{ type: "spring", stiffness: 320, damping: 26 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span
                        className="flex size-7 items-center justify-center rounded-full text-base shadow-lg ring-2 ring-white"
                        style={{ backgroundColor: ACCENT_DARK }}
                      >
                        🎲
                      </span>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Side panel: dice + question ─────────────────────────── */}
        <div className="flex flex-col gap-3">
          {/* Dice + roll control */}
          <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
            <motion.div
              key={`${die}-${rolls}`}
              animate={rolling ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.12, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="flex size-14 items-center justify-center rounded-xl border-2 shadow-sm"
              style={{ borderColor: ACCENT, color: ACCENT_DARK }}
            >
              {DieIcon ? <DieIcon className="size-9" /> : <span className="text-2xl text-slate-300">?</span>}
            </motion.div>
            <div className="flex-1">
              <PlayButton
                accent={ACCENT}
                onClick={roll}
                disabled={rolling || won || current !== null}
                className="w-full"
              >
                {rolling ? "Rolling…" : "🎲 Roll dice"}
              </PlayButton>
              <p className="mt-1.5 text-center text-xs text-slate-400 tabular-nums">
                {rolls} roll{rolls === 1 ? "" : "s"} · {correct} correct
              </p>
            </div>
          </div>

          {/* Question / status panel */}
          <div className="min-h-[10rem] rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
            {won ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <Trophy className="size-9" style={{ color: ACCENT }} />
                <p className="text-lg font-bold text-slate-800">You reached the FINISH!</p>
                <p className="text-sm text-slate-500 tabular-nums">
                  {rolls} rolls · {correct} correct
                </p>
                <PlayButton accent={ACCENT} onClick={restart} className="mt-1">
                  Play again
                </PlayButton>
              </div>
            ) : current ? (
              <div className="flex h-full flex-col">
                <span
                  className="mb-2 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  Space {pos} · Question
                </span>
                <p className="text-base font-semibold leading-snug text-slate-800">{current.q}</p>

                {!revealed ? (
                  <PlayButton
                    accent={ACCENT}
                    onClick={() => setRevealed(true)}
                    className="mt-auto w-full"
                  >
                    Reveal answer
                  </PlayButton>
                ) : (
                  <div className="mt-auto">
                    <div
                      className="mb-3 rounded-xl border-2 px-3 py-2 text-sm font-bold"
                      style={{ borderColor: ACCENT, color: ACCENT_DARK, backgroundColor: TRACK }}
                    >
                      {current.a}
                    </div>
                    <div className="flex gap-2">
                      <PlayButton accent={ACCENT} onClick={right} className="flex-1">
                        I was right
                      </PlayButton>
                      <PlayButton accent="#94a3b8" onClick={wrong} className="flex-1">
                        I was wrong
                      </PlayButton>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-1 text-center text-slate-500">
                <p className="text-sm">
                  {message ?? "Roll the dice to move the token and draw a question."}
                </p>
                {pos === 0 && !message && (
                  <p className="text-xs text-slate-400">Race from START to FINISH.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "board-game",
  name: "Board Game",
  blurb: "A virtual board game with question spaces.",
  icon: "🎲",
  category: "Competition",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Question | Answer. First row is headers.",
  sample,
  parse,
  Component: BoardGame,
})
