"use client"

import { useMemo, useState, type CSSProperties } from "react"
import { Trophy, X } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Cell {
  points: number
  question: string
  answer: string
}
interface Category {
  name: string
  cells: Cell[]
}
interface Data {
  categories: Category[]
}

const ACCENT = "#d85140"
const BOARD = "#0b1d4d" // deep game-show blue
const BOARD_DARK = "#081539"
const GOLD = "#f2c14e"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample

  const order: string[] = []
  const byName = new Map<string, Cell[]>()

  for (const r of rows.slice(1)) {
    if (!Array.isArray(r)) continue
    const name = (r[0] || "").trim()
    const question = (r[2] || "").trim()
    const answer = (r[3] || "").trim()
    const points = Number(r[1])
    if (!name || !question || !Number.isFinite(points)) continue

    if (!byName.has(name)) {
      byName.set(name, [])
      order.push(name)
    }
    byName.get(name)!.push({ points, question, answer })
  }

  const categories: Category[] = order.map((name) => ({
    name,
    cells: [...(byName.get(name) || [])].sort((a, b) => a.points - b.points),
  }))

  const valid = categories.filter((c) => c.cells.length > 0)
  return valid.length ? { categories: valid } : sample
}

const sample: Data = {
  categories: [
    {
      name: "Science",
      cells: [
        { points: 100, question: "This gas do plants absorb during photosynthesis.", answer: "What is carbon dioxide?" },
        { points: 200, question: "The powerhouse of the cell.", answer: "What is the mitochondria?" },
        { points: 300, question: "The number of bones in the adult human body.", answer: "What is 206?" },
        { points: 400, question: "The chemical symbol for gold.", answer: "What is Au?" },
        { points: 500, question: "The force that keeps planets in orbit around the Sun.", answer: "What is gravity?" },
      ],
    },
    {
      name: "Geography",
      cells: [
        { points: 100, question: "The largest ocean on Earth.", answer: "What is the Pacific?" },
        { points: 200, question: "The capital city of Japan.", answer: "What is Tokyo?" },
        { points: 300, question: "The longest river in the world.", answer: "What is the Nile?" },
        { points: 400, question: "The continent that contains the Sahara Desert.", answer: "What is Africa?" },
        { points: 500, question: "The smallest country in the world by area.", answer: "What is Vatican City?" },
      ],
    },
    {
      name: "History",
      cells: [
        { points: 100, question: "The first President of the United States.", answer: "Who is George Washington?" },
        { points: 200, question: "The year World War II ended.", answer: "What is 1945?" },
        { points: 300, question: "The ancient civilization that built the pyramids of Giza.", answer: "Who are the Egyptians?" },
        { points: 400, question: "The wall that divided a German city until 1989.", answer: "What is the Berlin Wall?" },
        { points: 500, question: "The explorer who reached the Americas in 1492.", answer: "Who is Christopher Columbus?" },
      ],
    },
    {
      name: "Arts",
      cells: [
        { points: 100, question: "The artist who painted the Mona Lisa.", answer: "Who is Leonardo da Vinci?" },
        { points: 200, question: "The number of strings on a standard guitar.", answer: "What is six?" },
        { points: 300, question: "The playwright who wrote 'Romeo and Juliet'.", answer: "Who is Shakespeare?" },
        { points: 400, question: "The primary colours of paint.", answer: "What are red, yellow, and blue?" },
        { points: 500, question: "The Dutch painter famous for 'The Starry Night'.", answer: "Who is Vincent van Gogh?" },
      ],
    },
  ],
}

function QuizShow({ data }: { data: Data }) {
  const categories = data.categories.length ? data.categories : sample.categories

  // Stable key for a cell so we can track usage across renders.
  const keyOf = (c: number, r: number) => `${c}:${r}`

  const [used, setUsed] = useState<Set<string>>(new Set())
  const [score, setScore] = useState(0)
  const [open, setOpen] = useState<{ c: number; r: number } | null>(null)
  const [revealed, setRevealed] = useState(false)

  const totalCells = useMemo(
    () => categories.reduce((sum, cat) => sum + cat.cells.length, 0),
    [categories],
  )
  const allDone = used.size >= totalCells && totalCells > 0

  const active =
    open !== null ? categories[open.c]?.cells[open.r] ?? null : null

  const openCell = (c: number, r: number) => {
    if (used.has(keyOf(c, r))) return
    setOpen({ c, r })
    setRevealed(false)
  }

  const close = () => {
    setOpen(null)
    setRevealed(false)
  }

  const resolve = (gotIt: boolean) => {
    if (!open || !active) return
    setUsed((prev) => {
      const next = new Set(prev)
      next.add(keyOf(open.c, open.r))
      return next
    })
    setScore((s) => s + (gotIt ? active.points : -active.points))
    close()
  }

  const restart = () => {
    setUsed(new Set())
    setScore(0)
    setOpen(null)
    setRevealed(false)
  }

  // Max number of rows across categories so columns line up.
  const maxRows = useMemo(
    () => categories.reduce((m, c) => Math.max(m, c.cells.length), 0),
    [categories],
  )

  const scoreColor = score < 0 ? "#fca5a5" : GOLD

  return (
    <GameFrame
      title="Quiz Show"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold shadow-sm"
          style={{ backgroundColor: BOARD, color: scoreColor }}
        >
          <Trophy className="size-4" style={{ color: GOLD }} />
          <span className="tabular-nums">{score}</span>
        </div>
      }
    >
      <div
        className="rounded-2xl p-2 shadow-2xl sm:p-3"
        style={{ background: `linear-gradient(160deg, ${BOARD}, ${BOARD_DARK})` }}
      >
        <div
          className="grid gap-1.5 sm:gap-2"
          style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }}
        >
          {/* Category headers */}
          {categories.map((cat) => (
            <div
              key={`h-${cat.name}`}
              className="flex min-h-[3.25rem] items-center justify-center rounded-lg px-1 py-2 text-center text-[0.7rem] font-extrabold uppercase leading-tight tracking-wide text-white sm:text-sm"
              style={{ backgroundColor: ACCENT, fontFamily: "var(--font-display)" }}
            >
              {cat.name}
            </div>
          ))}

          {/* Point cells, row by row */}
          {Array.from({ length: maxRows }).map((_, r) =>
            categories.map((cat, c) => {
              const cell = cat.cells[r]
              if (!cell) {
                return <div key={keyOf(c, r)} className="rounded-lg bg-black/10" />
              }
              const isUsed = used.has(keyOf(c, r))
              return (
                <button
                  key={keyOf(c, r)}
                  onClick={() => openCell(c, r)}
                  disabled={isUsed}
                  className={`flex min-h-[3rem] items-center justify-center rounded-lg border text-lg font-black tabular-nums transition sm:min-h-[4.5rem] sm:text-2xl ${
                    isUsed
                      ? "cursor-not-allowed border-white/5 bg-black/30 text-white/15"
                      : "border-white/10 text-[color:var(--gold)] hover:scale-[1.03] hover:brightness-125"
                  }`}
                  style={
                    {
                      backgroundColor: isUsed ? undefined : "rgba(255,255,255,0.04)",
                      "--gold": GOLD,
                    } as CSSProperties
                  }
                  aria-label={`${cat.name} for ${cell.points} points`}
                >
                  {isUsed ? "" : cell.points}
                </button>
              )
            }),
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        {allDone
          ? "Board cleared!"
          : `${totalCells - used.size} clue${totalCells - used.size === 1 ? "" : "s"} remaining`}
      </p>

      {/* Final summary */}
      {allDone && (
        <div
          className="mt-4 flex flex-col items-center gap-1 rounded-2xl border border-black/10 bg-white p-6 text-center shadow-lg"
        >
          <Trophy className="size-8" style={{ color: GOLD }} />
          <p className="text-lg font-bold text-slate-800">Final Score</p>
          <p className="text-4xl font-black tabular-nums" style={{ color: ACCENT }}>
            {score}
          </p>
          <PlayButton accent={ACCENT} onClick={restart} className="mt-2">
            Play again
          </PlayButton>
        </div>
      )}

      {/* Clue overlay */}
      {open && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl p-6 text-center shadow-2xl sm:p-8"
            style={{ background: `linear-gradient(160deg, ${BOARD}, ${BOARD_DARK})` }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute right-3 top-3 rounded-full p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div
              className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: ACCENT }}
            >
              {categories[open.c]?.name}
              <span style={{ color: GOLD }}>· {active.points}</span>
            </div>

            <p className="mb-6 text-xl font-semibold leading-snug text-white sm:text-2xl">
              {active.question}
            </p>

            {!revealed ? (
              <PlayButton accent={ACCENT} onClick={() => setRevealed(true)} className="w-full sm:w-auto">
                Reveal answer
              </PlayButton>
            ) : (
              <>
                <div
                  className="mb-5 rounded-xl border-2 px-4 py-3 text-lg font-bold"
                  style={{ borderColor: GOLD, color: GOLD, backgroundColor: "rgba(0,0,0,0.25)" }}
                >
                  {active.answer}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <PlayButton accent="#16a34a" onClick={() => resolve(true)}>
                    Got it +{active.points}
                  </PlayButton>
                  <PlayButton accent="#64748b" onClick={() => resolve(false)}>
                    Missed −{active.points}
                  </PlayButton>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "quiz-show",
  name: "Quiz Show",
  blurb: "A Jeopardy-style trivia board with categories and points.",
  icon: "🎙️",
  category: "Quizzes & Assessment",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Category | Points | Question | Answer. First row is headers.",
  sample,
  parse,
  Component: QuizShow,
})
