"use client"

import { useEffect, useMemo, useState } from "react"
import { Check } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Pair {
  a: string
  b: string
}
interface Data {
  pairs: Pair[]
}

const ACCENT = "#1f306d"
const MAX_PAIRS = 8

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const pairs = rows
    .slice(1)
    .filter((r) => Array.isArray(r) && (r[0] || "").trim() && (r[1] || "").trim())
    .map((r) => ({ a: r[0].trim(), b: r[1].trim() }))
    .slice(0, MAX_PAIRS)
  return { pairs: pairs.length ? pairs : sample.pairs }
}

const sample: Data = {
  pairs: [
    { a: "France", b: "Paris" },
    { a: "Japan", b: "Tokyo" },
    { a: "Egypt", b: "Cairo" },
    { a: "Canada", b: "Ottawa" },
    { a: "Brazil", b: "Brasília" },
    { a: "Kenya", b: "Nairobi" },
  ],
}

interface Tile {
  /** Stable identity of this tile in the deck. */
  id: number
  /** The pair this tile belongs to (matching tiles share this). */
  pairId: number
  text: string
}

/** Deterministic deck built straight from the pairs (no randomness — SSR safe). */
function buildDeck(pairs: Pair[]): Tile[] {
  const deck: Tile[] = []
  pairs.forEach((p, pairId) => {
    deck.push({ id: pairId * 2, pairId, text: p.a })
    deck.push({ id: pairId * 2 + 1, pairId, text: p.b })
  })
  return deck
}

/** Fisher–Yates shuffle on a copy. Only ever called in an effect/handler. */
function shuffled<T>(arr: T[]): T[] {
  const next = [...arr]
  for (let k = next.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1))
    ;[next[k], next[j]] = [next[j], next[k]]
  }
  return next
}

function Matching({ data }: { data: Data }) {
  const pairs = useMemo(
    () => (data.pairs.length ? data.pairs.slice(0, MAX_PAIRS) : sample.pairs),
    [data.pairs],
  )
  const baseDeck = useMemo(() => buildDeck(pairs), [pairs])

  // Deterministic initial order for first server + client render.
  const [deck, setDeck] = useState<Tile[]>(baseDeck)
  const [flipped, setFlipped] = useState<number[]>([]) // tile ids currently face-up & unmatched
  const [matched, setMatched] = useState<Set<number>>(new Set()) // matched pairIds
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false) // briefly true while a mismatch is shown

  // Shuffle only after mount to avoid hydration mismatch.
  useEffect(() => {
    setDeck(shuffled(baseDeck))
    setFlipped([])
    setMatched(new Set())
    setMoves(0)
    setLocked(false)
  }, [baseDeck])

  const totalPairs = pairs.length
  const won = matched.size === totalPairs && totalPairs > 0

  const restart = () => {
    setDeck(shuffled(baseDeck))
    setFlipped([])
    setMatched(new Set())
    setMoves(0)
    setLocked(false)
  }

  const handleFlip = (tile: Tile) => {
    if (locked) return
    if (matched.has(tile.pairId)) return
    if (flipped.includes(tile.id)) return
    if (flipped.length === 2) return

    const next = [...flipped, tile.id]
    setFlipped(next)

    if (next.length === 2) {
      setMoves((m) => m + 1)
      const first = deck.find((t) => t.id === next[0])
      const second = deck.find((t) => t.id === next[1])
      if (first && second && first.pairId === second.pairId) {
        // Match — keep them open.
        setMatched((prev) => {
          const n = new Set(prev)
          n.add(first.pairId)
          return n
        })
        setFlipped([])
      } else {
        // Mismatch — flip back after a beat.
        setLocked(true)
        window.setTimeout(() => {
          setFlipped([])
          setLocked(false)
        }, 800)
      }
    }
  }

  if (totalPairs === 0) {
    return (
      <GameFrame title="Matching Game" accent={ACCENT}>
        <p className="text-center text-slate-500">No pairs to match yet.</p>
      </GameFrame>
    )
  }

  // Responsive column count tuned to deck size.
  const cols = deck.length <= 8 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3 sm:grid-cols-4"

  return (
    <GameFrame
      title="Matching Game"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <span className="hidden items-center gap-3 text-sm font-semibold text-slate-500 sm:flex">
          <span>
            {matched.size}/{totalPairs} pairs
          </span>
          <span>{moves} moves</span>
        </span>
      }
    >
      <div className="mb-4 flex items-center justify-between text-sm text-slate-500 sm:hidden">
        <span>
          {matched.size}/{totalPairs} pairs
        </span>
        <span>{moves} moves</span>
      </div>

      {won && (
        <div
          className="mb-4 rounded-xl border border-black/10 p-4 text-center text-white shadow-md"
          style={{ background: ACCENT }}
        >
          <p className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
            🎉 You matched them all!
          </p>
          <p className="mt-1 text-sm opacity-90">
            Cleared {totalPairs} pairs in {moves} {moves === 1 ? "move" : "moves"}.
          </p>
          <div className="mt-3 flex justify-center">
            <PlayButton accent="#ffffff" onClick={restart} className="!text-slate-800">
              Play again
            </PlayButton>
          </div>
        </div>
      )}

      <div className={`grid gap-3 ${cols}`}>
        {deck.map((tile) => {
          const isMatched = matched.has(tile.pairId)
          const isFaceUp = isMatched || flipped.includes(tile.id)
          return (
            <button
              key={tile.id}
              onClick={() => handleFlip(tile)}
              disabled={isFaceUp || locked}
              aria-label={isFaceUp ? tile.text : "Hidden tile"}
              className="group relative aspect-[3/4] w-full [perspective:1000px] focus:outline-none"
            >
              <span
                className="relative block h-full w-full rounded-xl shadow-sm transition-transform duration-300 [transform-style:preserve-3d]"
                style={{ transform: isFaceUp ? "rotateY(180deg)" : "rotateY(0)" }}
              >
                {/* Back (face-down) */}
                <span
                  className="absolute inset-0 flex items-center justify-center rounded-xl border border-white/20 text-2xl text-white/90 [backface-visibility:hidden]"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}cc)`,
                  }}
                >
                  ?
                </span>
                {/* Front (face-up) */}
                <span
                  className={`absolute inset-0 flex items-center justify-center rounded-xl border p-2 text-center text-sm font-semibold leading-tight [backface-visibility:hidden] ${
                    isMatched
                      ? "border-green-300 bg-green-50 text-green-800"
                      : "border-black/10 bg-white text-slate-800"
                  }`}
                  style={{ transform: "rotateY(180deg)" }}
                >
                  {isMatched && (
                    <Check className="absolute right-1.5 top-1.5 size-4 text-green-500" />
                  )}
                  <span className="line-clamp-4 break-words">{tile.text}</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Flip two tiles to find a matching pair.
      </p>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "matching",
  name: "Matching Game",
  blurb: "A concentration game — flip tiles to find matching pairs.",
  icon: "🧠",
  category: "Study & Review",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Term | Match. First row is headers. Each row is one pair.",
  sample,
  parse,
  Component: Matching,
})
