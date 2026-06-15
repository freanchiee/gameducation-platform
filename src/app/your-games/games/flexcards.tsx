"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Layers } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Card {
  sides: string[]
}
interface Data {
  cards: Card[]
}

const ACCENT = "#1f306d"
const MAX_SIDES = 10

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample

  const cards: Card[] = []
  for (const r of rows.slice(1)) {
    if (!Array.isArray(r)) continue
    const sides = r
      .map((cell) => (typeof cell === "string" ? cell.trim() : String(cell ?? "").trim()))
      .filter((cell) => cell.length > 0)
      .slice(0, MAX_SIDES)
    if (sides.length) cards.push({ sides })
  }

  return cards.length ? { cards } : sample
}

const sample: Data = {
  cards: [
    {
      sides: [
        "Photosynthesis",
        "The process plants use to turn light into chemical energy.",
        "Inputs: carbon dioxide + water + sunlight",
        "Output: glucose + oxygen",
        "Takes place in the chloroplasts",
        "https://upload.wikimedia.org/wikipedia/commons/4/4a/Photosynthesis_en.svg",
      ],
    },
    {
      sides: [
        "Mitochondria",
        "The organelle that produces most of a cell's ATP.",
        "Nicknamed the 'powerhouse of the cell'",
        "Has its own DNA",
        "Surrounded by a double membrane",
      ],
    },
    {
      sides: [
        "Water cycle",
        "Evaporation",
        "Condensation",
        "Precipitation",
        "Collection",
        "…and back to evaporation again!",
      ],
    },
    {
      sides: [
        "Newton's Laws",
        "1st: An object stays at rest or in motion unless acted on by a force.",
        "2nd: F = m × a",
        "3rd: Every action has an equal and opposite reaction.",
      ],
    },
  ],
}

const IMG_RE = /^https?:\/\/\S+\.(png|jpe?g|gif|webp|svg|avif|bmp)(\?\S*)?$/i

function isImageUrl(s: string): boolean {
  return IMG_RE.test(s.trim())
}

function Flexcards({ data }: { data: Data }) {
  const cards = useMemo(
    () => (data.cards && data.cards.length ? data.cards : sample.cards),
    [data.cards],
  )

  const [cardIdx, setCardIdx] = useState(0)
  const [sideIdx, setSideIdx] = useState(0)

  const card = cards[cardIdx] ?? cards[0]
  const sides = card?.sides ?? []
  const sideCount = sides.length
  const current = sides[Math.min(sideIdx, Math.max(sideCount - 1, 0))] ?? ""

  const goCard = (delta: number) => {
    if (cards.length === 0) return
    setCardIdx((p) => (p + delta + cards.length) % cards.length)
    setSideIdx(0)
  }
  const goSide = (delta: number) => {
    if (sideCount === 0) return
    setSideIdx((p) => (p + delta + sideCount) % sideCount)
  }

  const restart = () => {
    setCardIdx(0)
    setSideIdx(0)
  }

  if (!card || sideCount === 0) {
    return (
      <GameFrame title="Flexcards" accent={ACCENT}>
        <p className="rounded-2xl border border-black/10 bg-white p-8 text-center text-slate-500 shadow-sm">
          No cards to show.
        </p>
      </GameFrame>
    )
  }

  return (
    <GameFrame
      title="Flexcards"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold text-white shadow-sm"
          style={{ backgroundColor: ACCENT }}
        >
          <Layers className="size-4" />
          <span className="tabular-nums">
            {cardIdx + 1} / {cards.length}
          </span>
        </div>
      }
    >
      {/* Card meta row */}
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span className="font-semibold" style={{ color: ACCENT }}>
          Card {cardIdx + 1} of {cards.length}
        </span>
        <span className="tabular-nums">
          Side {Math.min(sideIdx, sideCount - 1) + 1} of {sideCount}
        </span>
      </div>

      {/* The big card with the current side */}
      <div className="relative">
        <div
          className="flex min-h-[20rem] flex-col items-center justify-center gap-4 rounded-2xl border border-black/10 bg-white p-6 text-center shadow-lg sm:min-h-[24rem]"
          style={{ borderTopColor: ACCENT, borderTopWidth: 4 }}
        >
          {isImageUrl(current) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current}
              alt={`Card ${cardIdx + 1}, side ${sideIdx + 1}`}
              className="max-h-64 max-w-full rounded-lg object-contain"
            />
          ) : (
            <span
              className={`font-semibold leading-snug text-slate-800 ${
                current.length > 120
                  ? "text-lg sm:text-xl"
                  : current.length > 50
                    ? "text-2xl sm:text-3xl"
                    : "text-3xl sm:text-4xl"
              }`}
            >
              {current}
            </span>
          )}
        </div>

        {/* Side dots */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {sides.map((_, idx) => {
            const active = idx === Math.min(sideIdx, sideCount - 1)
            return (
              <button
                key={idx}
                onClick={() => setSideIdx(idx)}
                aria-label={`Go to side ${idx + 1}`}
                aria-current={active}
                className="size-2.5 rounded-full transition"
                style={{
                  backgroundColor: active ? ACCENT : "rgba(31,48,109,0.2)",
                  transform: active ? "scale(1.35)" : "scale(1)",
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Side controls */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <PlayButton accent="#64748b" onClick={() => goSide(-1)} disabled={sideCount < 2}>
          <span className="inline-flex items-center gap-1">
            <ChevronLeft className="size-4" /> Prev side
          </span>
        </PlayButton>
        <span className="text-xs uppercase tracking-wide text-slate-400">cycle this card</span>
        <PlayButton accent="#64748b" onClick={() => goSide(1)} disabled={sideCount < 2}>
          <span className="inline-flex items-center gap-1">
            Next side <ChevronRight className="size-4" />
          </span>
        </PlayButton>
      </div>

      <div className="my-4 h-px bg-black/10" />

      {/* Card controls */}
      <div className="flex items-center justify-between gap-2">
        <PlayButton accent={ACCENT} onClick={() => goCard(-1)} disabled={cards.length < 2}>
          <span className="inline-flex items-center gap-1">
            <ChevronLeft className="size-4" /> Prev card
          </span>
        </PlayButton>
        <span className="text-xs uppercase tracking-wide text-slate-400">jump between cards</span>
        <PlayButton accent={ACCENT} onClick={() => goCard(1)} disabled={cards.length < 2}>
          <span className="inline-flex items-center gap-1">
            Next card <ChevronRight className="size-4" />
          </span>
        </PlayButton>
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "flexcards",
  name: "Flexcards",
  blurb: "10-sided multimedia flashcards.",
  icon: "🎴",
  category: "Study & Review",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Each row is one card; its columns are up to 10 sides. First row is headers.",
  sample,
  parse,
  Component: Flexcards,
})
