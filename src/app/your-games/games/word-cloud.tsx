"use client"

import { useEffect, useMemo, useState } from "react"
import { defineGame, type Rows } from "./types"
import { GameFrame } from "./ui"

interface Word {
  text: string
  weight: number
}
interface Data {
  words: Word[]
}

const ACCENT = "#7c5cbf"

/** Pleasant, readable palette for the cloud. */
const PALETTE = [
  "#7c5cbf",
  "#5b8def",
  "#16a085",
  "#e67e22",
  "#e84393",
  "#0984e3",
  "#00b894",
  "#d63031",
  "#6c5ce7",
  "#fd79a8",
  "#00cec9",
  "#fab1a0",
]

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample

  const body = rows.slice(1).filter((r) => Array.isArray(r) && (r[0] ?? "").trim())

  if (!body.length) return sample

  // Detect whether a usable weight column exists (at least one valid number).
  const hasWeightColumn = body.some((r) => {
    const v = (r[1] ?? "").trim()
    return v !== "" && Number.isFinite(Number(v))
  })

  let words: Word[]
  if (hasWeightColumn) {
    words = body
      .map((r) => {
        const text = (r[0] ?? "").trim()
        const raw = (r[1] ?? "").trim()
        const n = Number(raw)
        const weight = raw !== "" && Number.isFinite(n) && n > 0 ? n : 1
        return { text, weight }
      })
      .filter((w) => w.text)
  } else {
    // No weight column: weight = case-insensitive frequency across rows, deduped.
    const counts = new Map<string, { text: string; weight: number }>()
    for (const r of body) {
      const text = (r[0] ?? "").trim()
      if (!text) continue
      const key = text.toLowerCase()
      const existing = counts.get(key)
      if (existing) existing.weight += 1
      else counts.set(key, { text, weight: 1 })
    }
    words = Array.from(counts.values())
  }

  return { words: words.length ? words : sample.words }
}

const sample: Data = {
  words: [
    { text: "Algebra", weight: 9 },
    { text: "Geometry", weight: 6 },
    { text: "Photosynthesis", weight: 8 },
    { text: "Mitochondria", weight: 5 },
    { text: "Revolution", weight: 7 },
    { text: "Democracy", weight: 6 },
    { text: "Gravity", weight: 8 },
    { text: "Ecosystem", weight: 5 },
    { text: "Fractions", weight: 4 },
    { text: "Metaphor", weight: 6 },
    { text: "Atoms", weight: 9 },
    { text: "Velocity", weight: 5 },
    { text: "Climate", weight: 7 },
    { text: "Grammar", weight: 4 },
    { text: "Energy", weight: 10 },
    { text: "Cells", weight: 6 },
    { text: "Equations", weight: 5 },
    { text: "History", weight: 7 },
    { text: "Molecules", weight: 4 },
    { text: "Probability", weight: 3 },
    { text: "Evolution", weight: 6 },
    { text: "Geography", weight: 5 },
    { text: "Vocabulary", weight: 4 },
    { text: "Friction", weight: 3 },
  ],
}

const MIN_FONT = 14
const MAX_FONT = 64
const FONT_WEIGHTS = [500, 600, 700, 800]

interface Styled {
  rotation: number
  color: string
  fontWeight: number
}

function Name({ data }: { data: Data }) {
  const words = data.words.length ? data.words : sample.words

  // Deterministic font sizing (safe to compute during render).
  const sized = useMemo(() => {
    const weights = words.map((w) => w.weight)
    const min = Math.min(...weights)
    const max = Math.max(...weights)
    const span = max - min || 1
    return words.map((w) => {
      const t = (w.weight - min) / span
      const fontSize = Math.round(MIN_FONT + t * (MAX_FONT - MIN_FONT))
      return { ...w, fontSize, t }
    })
  }, [words])

  // Decorative styling (rotation, colour, font-weight) is randomised, so it must
  // only be set after mount to avoid SSR hydration mismatches.
  const [styled, setStyled] = useState<Styled[] | null>(null)
  const [seed, setSeed] = useState(0)

  useEffect(() => {
    setStyled(
      sized.map(() => ({
        rotation: Math.round(Math.random() * 40 - 20),
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        fontWeight: FONT_WEIGHTS[Math.floor(Math.random() * FONT_WEIGHTS.length)],
      })),
    )
    // Re-run when the dataset shape or the restart seed changes.
  }, [sized, seed])

  const restart = () => setSeed((s) => s + 1)

  const usingWeights = useMemo(
    () => words.some((w, i) => i > 0 && w.weight !== words[0].weight),
    [words],
  )

  if (!words.length) {
    return <p className="text-center text-slate-500">No words to display.</p>
  }

  return (
    <GameFrame title="Word Cloud" accent={ACCENT} onRestart={restart}>
      <div
        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-black/10 bg-white p-6 shadow-lg sm:p-10"
        style={{ minHeight: "20rem" }}
      >
        {sized.map((w, i) => {
          const s = styled?.[i]
          return (
            <span
              key={`${w.text}-${i}`}
              title={`${w.text} · ${w.weight}`}
              className="inline-block cursor-default select-none leading-none transition-transform duration-200 ease-out hover:scale-110"
              style={{
                fontSize: `${w.fontSize}px`,
                fontWeight: s ? s.fontWeight : 600,
                color: s ? s.color : ACCENT,
                transform: s ? `rotate(${s.rotation}deg)` : "rotate(0deg)",
                transitionProperty: "transform, color, font-weight",
                fontFamily: "var(--font-display)",
              }}
            >
              {w.text}
            </span>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block size-2 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          size = {usingWeights ? "weight" : "frequency"}
        </span>
        <span>
          {words.length} word{words.length === 1 ? "" : "s"}
        </span>
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "word-cloud",
  name: "Word Cloud",
  blurb: "Turn a list of words into a colourful weighted word cloud.",
  icon: "☁️",
  category: "Creative",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Word | Weight (optional number). First row is headers.",
  sample,
  parse,
  Component: Name,
})
