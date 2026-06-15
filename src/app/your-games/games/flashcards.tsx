"use client"

import { useMemo, useState } from "react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Card {
  front: string
  back: string
  image?: string
}
interface Data {
  cards: Card[]
}

const ACCENT = "#1f306d"

function parse(rows: Rows): Data {
  const cards = rows
    .slice(1)
    .filter((r) => r[0] || r[1])
    .map((r) => ({ front: r[0] || "", back: r[1] || "", image: r[2] || undefined }))
  return { cards: cards.length ? cards : sample.cards }
}

const sample: Data = {
  cards: [
    { front: "Photosynthesis", back: "How plants convert light into chemical energy (glucose)." },
    { front: "Mitochondria", back: "The organelle that produces most of a cell's ATP." },
    { front: "Osmosis", back: "Diffusion of water across a semi-permeable membrane." },
    { front: "Catalyst", back: "A substance that speeds up a reaction without being consumed." },
    { front: "Newton's 1st Law", back: "An object stays at rest or in uniform motion unless acted on by a net force." },
  ],
}

function Flashcards({ data }: { data: Data }) {
  const cards = data.cards
  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [order, setOrder] = useState<number[]>(() => cards.map((_, idx) => idx))
  const [known, setKnown] = useState<Set<number>>(new Set())

  const card = cards[order[i]]

  const go = (delta: number) => {
    setFlipped(false)
    setI((p) => (p + delta + cards.length) % cards.length)
  }
  const shuffle = () => {
    const next = [...order]
    for (let k = next.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1))
      ;[next[k], next[j]] = [next[j], next[k]]
    }
    setOrder(next)
    setI(0)
    setFlipped(false)
  }
  const toggleKnown = () => {
    setKnown((prev) => {
      const n = new Set(prev)
      if (n.has(order[i])) n.delete(order[i])
      else n.add(order[i])
      return n
    })
  }
  const restart = () => {
    setOrder(cards.map((_, idx) => idx))
    setI(0)
    setFlipped(false)
    setKnown(new Set())
  }

  if (!card) return <p className="text-center text-slate-500">No cards.</p>

  return (
    <GameFrame
      title="Flashcards"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <button
          onClick={shuffle}
          className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Shuffle
        </button>
      }
    >
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>
          Card {i + 1} of {cards.length}
        </span>
        <span>{known.size} known</span>
      </div>

      <div className="[perspective:1400px]">
        <button
          onClick={() => setFlipped((f) => !f)}
          className="relative block h-72 w-full transition-transform duration-500 [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}
          aria-label="Flip card"
        >
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-black/10 bg-white p-6 text-center shadow-lg [backface-visibility:hidden]">
            {card.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.image} alt="" className="max-h-32 rounded object-contain" />
            )}
            <span className="text-2xl font-semibold text-slate-800">{card.front}</span>
            <span className="text-xs uppercase tracking-wide text-slate-400">tap to flip</span>
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center rounded-2xl border border-black/10 p-6 text-center text-xl text-white shadow-lg [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)", background: ACCENT }}
          >
            {card.back}
          </span>
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2">
        <PlayButton accent="#64748b" onClick={() => go(-1)}>
          ← Prev
        </PlayButton>
        <button
          onClick={toggleKnown}
          className={`rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition ${
            known.has(order[i])
              ? "bg-green-100 text-green-700"
              : "border border-black/10 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {known.has(order[i]) ? "✓ Known" : "Mark known"}
        </button>
        <PlayButton accent={ACCENT} onClick={() => go(1)}>
          Next →
        </PlayButton>
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "flashcards",
  name: "Flashcards",
  blurb: "Flip through a deck to study and review any topic.",
  icon: "🃏",
  category: "Study & Review",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Front | Back | Image URL (optional). First row is headers.",
  sample,
  parse,
  Component: Flashcards,
})
