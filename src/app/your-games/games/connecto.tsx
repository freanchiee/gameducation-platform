"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { Trophy, X, RotateCcw, Check } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Item {
  q: string
  a: string
}
interface Data {
  items: Item[]
}

const ACCENT = "#58a65c"
const X_COLOR = "#2563eb" // blue X
const O_COLOR = "#e11d48" // rose O
const BOARD = "#0f3d2e"

type Mark = "X" | "O"
type Player = Mark

const WIN_LINES: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

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
    { q: "What gas do plants absorb during photosynthesis?", a: "Carbon dioxide" },
    { q: "What is the capital of Japan?", a: "Tokyo" },
    { q: "How many sides does a hexagon have?", a: "Six" },
    { q: "What is the chemical symbol for gold?", a: "Au" },
    { q: "Who wrote 'Romeo and Juliet'?", a: "William Shakespeare" },
    { q: "What is the largest planet in our solar system?", a: "Jupiter" },
    { q: "What is 9 × 8?", a: "72" },
    { q: "What is the powerhouse of the cell?", a: "The mitochondria" },
    { q: "What ocean is the largest on Earth?", a: "The Pacific Ocean" },
    { q: "In what year did World War II end?", a: "1945" },
    { q: "What is the freezing point of water in °C?", a: "0 °C" },
    { q: "What is the square root of 144?", a: "12" },
  ],
}

function MarkGlyph({ mark, size = "text-4xl" }: { mark: Mark; size?: string }) {
  return (
    <span
      className={`font-black leading-none ${size}`}
      style={{ color: mark === "X" ? X_COLOR : O_COLOR, fontFamily: "var(--font-display)" }}
    >
      {mark}
    </span>
  )
}

function Connecto({ data }: { data: Data }) {
  const items = data.items.length ? data.items : sample.items

  const [order, setOrder] = useState<number[]>(() => items.map((_, idx) => idx))
  const [qPos, setQPos] = useState(0) // pointer into `order`
  const [board, setBoard] = useState<(Mark | null)[]>(() => Array(9).fill(null))
  const [cellQuestion, setCellQuestion] = useState<number[]>(() => Array(9).fill(-1))
  const [turn, setTurn] = useState<Player>("X")
  const [open, setOpen] = useState<number | null>(null) // index of cell being answered
  const [revealed, setRevealed] = useState(false)

  // Shuffle the question order after mount to stay hydration-safe.
  useEffect(() => {
    const next = items.map((_, idx) => idx)
    for (let k = next.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1))
      ;[next[k], next[j]] = [next[j], next[k]]
    }
    setOrder(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const result = useMemo(() => {
    for (const [a, b, c] of WIN_LINES) {
      const m = board[a]
      if (m && board[b] === m && board[c] === m) {
        return { winner: m as Mark, line: [a, b, c] as [number, number, number] }
      }
    }
    if (board.every((cell) => cell !== null)) return { winner: "draw" as const, line: null }
    return null
  }, [board])

  const winningSet = useMemo(
    () => new Set(result && result.line ? result.line : []),
    [result],
  )

  const gameOver = result !== null
  const activeItem = open !== null ? items[order[cellQuestion[open]]] ?? null : null

  const openCell = (idx: number) => {
    if (gameOver || board[idx] !== null) return
    setCellQuestion((prev) => {
      // Reuse the question already pinned to this cell, else assign the next one.
      if (prev[idx] !== -1) return prev
      const next = [...prev]
      next[idx] = qPos
      return next
    })
    if (cellQuestion[idx] === -1) {
      setQPos((p) => (p + 1) % Math.max(order.length, 1))
    }
    setOpen(idx)
    setRevealed(false)
  }

  const close = () => {
    setOpen(null)
    setRevealed(false)
  }

  // Current player got it right: claim the cell.
  const claim = () => {
    if (open === null) return
    setBoard((prev) => {
      if (prev[open] !== null) return prev
      const next = [...prev]
      next[open] = turn
      return next
    })
    setTurn((t) => (t === "X" ? "O" : "X"))
    close()
  }

  // Skip / wrong: cell stays open, turn passes to the other player.
  const skip = () => {
    setTurn((t) => (t === "X" ? "O" : "X"))
    close()
  }

  const restart = () => {
    setBoard(Array(9).fill(null))
    setCellQuestion(Array(9).fill(-1))
    setTurn("X")
    setQPos(0)
    setOpen(null)
    setRevealed(false)
    const next = items.map((_, idx) => idx)
    for (let k = next.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1))
      ;[next[k], next[j]] = [next[j], next[k]]
    }
    setOrder(next)
  }

  return (
    <GameFrame
      title="Connecto"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div
          className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-bold shadow-sm"
          aria-live="polite"
        >
          {gameOver ? (
            <span className="text-slate-600">Game over</span>
          ) : (
            <>
              <span className="text-slate-500">Turn:</span>
              <MarkGlyph mark={turn} size="text-lg" />
            </>
          )}
        </div>
      }
    >
      {/* Player banner */}
      {!gameOver && (
        <div className="mb-4 flex items-center justify-center gap-3 text-center">
          <div
            className="rounded-xl border-2 px-4 py-2 text-sm font-bold shadow-sm transition"
            style={{
              borderColor: turn === "X" ? X_COLOR : "transparent",
              color: X_COLOR,
              backgroundColor: turn === "X" ? "rgba(37,99,235,0.08)" : "white",
              opacity: turn === "X" ? 1 : 0.5,
            }}
          >
            Player X
          </div>
          <span className="text-xs uppercase tracking-wide text-slate-400">vs</span>
          <div
            className="rounded-xl border-2 px-4 py-2 text-sm font-bold shadow-sm transition"
            style={{
              borderColor: turn === "O" ? O_COLOR : "transparent",
              color: O_COLOR,
              backgroundColor: turn === "O" ? "rgba(225,29,72,0.08)" : "white",
              opacity: turn === "O" ? 1 : 0.5,
            }}
          >
            Player O
          </div>
        </div>
      )}

      {/* Board */}
      <div
        className="mx-auto grid max-w-md grid-cols-3 gap-2 rounded-2xl p-3 shadow-2xl"
        style={{ background: `linear-gradient(160deg, ${BOARD}, #07241a)` }}
      >
        {board.map((mark, idx) => {
          const isWin = winningSet.has(idx)
          const claimed = mark !== null
          const visited = cellQuestion[idx] !== -1
          return (
            <button
              key={idx}
              onClick={() => openCell(idx)}
              disabled={claimed || gameOver}
              className={`relative flex aspect-square items-center justify-center rounded-xl border-2 transition ${
                claimed
                  ? "cursor-default"
                  : gameOver
                    ? "cursor-not-allowed border-white/10 bg-white/5"
                    : "border-white/15 bg-white/95 hover:scale-[1.03] hover:bg-white"
              }`}
              style={
                {
                  borderColor: isWin
                    ? mark === "X"
                      ? X_COLOR
                      : O_COLOR
                    : claimed
                      ? "rgba(255,255,255,0.25)"
                      : undefined,
                  backgroundColor: claimed
                    ? isWin
                      ? mark === "X"
                        ? "rgba(37,99,235,0.18)"
                        : "rgba(225,29,72,0.18)"
                      : "rgba(255,255,255,0.92)"
                    : undefined,
                  boxShadow: isWin ? "0 0 0 3px rgba(255,255,255,0.35) inset" : undefined,
                } as CSSProperties
              }
              aria-label={
                claimed
                  ? `Cell ${idx + 1} claimed by ${mark}`
                  : `Cell ${idx + 1}, ${visited ? "answer again" : "open question"}`
              }
            >
              {claimed ? (
                <MarkGlyph mark={mark} />
              ) : !gameOver && visited ? (
                <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400">
                  open ?
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      {/* Status / result */}
      <div className="mt-5">
        {result ? (
          result.winner === "draw" ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-black/10 bg-white p-6 text-center shadow-lg">
              <p className="text-lg font-bold text-slate-700">It&apos;s a draw!</p>
              <p className="text-sm text-slate-500">The board filled up with no three-in-a-row.</p>
              <PlayButton accent={ACCENT} onClick={restart} className="mt-1">
                <span className="inline-flex items-center gap-1.5">
                  <RotateCcw className="size-4" /> Play again
                </span>
              </PlayButton>
            </div>
          ) : (
            <div
              className="flex flex-col items-center gap-2 rounded-2xl border-2 bg-white p-6 text-center shadow-lg"
              style={{ borderColor: result.winner === "X" ? X_COLOR : O_COLOR }}
            >
              <Trophy
                className="size-8"
                style={{ color: result.winner === "X" ? X_COLOR : O_COLOR }}
              />
              <p className="flex items-center gap-2 text-lg font-bold text-slate-800">
                Player <MarkGlyph mark={result.winner} size="text-2xl" /> wins!
              </p>
              <p className="text-sm text-slate-500">Three in a row — nicely connected.</p>
              <PlayButton accent={ACCENT} onClick={restart} className="mt-1">
                <span className="inline-flex items-center gap-1.5">
                  <RotateCcw className="size-4" /> Play again
                </span>
              </PlayButton>
            </div>
          )
        ) : (
          <p className="text-center text-xs text-slate-500">
            Click any open square to answer a question. Self-report whether you got it right to claim
            the cell.
          </p>
        )}
      </div>

      {/* Question overlay */}
      {open !== null && activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div
              className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: turn === "X" ? X_COLOR : O_COLOR }}
            >
              Player {turn}&apos;s question
            </div>

            <p className="mb-6 text-xl font-semibold leading-snug text-slate-800 sm:text-2xl">
              {activeItem.q}
            </p>

            {!revealed ? (
              <PlayButton accent={ACCENT} onClick={() => setRevealed(true)} className="w-full sm:w-auto">
                Reveal answer
              </PlayButton>
            ) : (
              <>
                <div
                  className="mb-5 rounded-xl border-2 px-4 py-3 text-lg font-bold"
                  style={{ borderColor: ACCENT, color: ACCENT, backgroundColor: "rgba(88,166,92,0.08)" }}
                >
                  {activeItem.a}
                </div>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <PlayButton accent="#16a34a" onClick={claim} className="w-full sm:w-auto">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="size-4" /> Correct — claim cell
                    </span>
                  </PlayButton>
                  <PlayButton accent="#64748b" onClick={skip} className="w-full sm:w-auto">
                    Skip / wrong — pass turn
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
  id: "connecto",
  name: "Connecto",
  blurb: "Tic-Tac-Toe-style answer-and-claim game.",
  icon: "⭕",
  category: "Competition",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Question | Answer. First row is headers.",
  sample,
  parse,
  Component: Connecto,
})
