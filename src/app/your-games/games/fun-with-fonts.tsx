"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { Printer, Shuffle, Sparkles } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Data {
  words: string[]
}

const ACCENT = "#7c5cbf"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const words = rows
    .slice(1)
    .map((r) => (Array.isArray(r) ? (r[0] || "").trim() : ""))
    .filter((w) => w.length > 0)
  return { words: words.length ? words : sample.words }
}

const sample: Data = {
  words: [
    "Imagine",
    "Create",
    "Inspire",
    "Dream Big",
    "Wonder",
    "Believe",
    "Explore",
    "Shine",
    "Curious",
    "Bold",
  ],
}

/** A reusable "word art" recipe. `build` turns a word + palette into inline CSS. */
interface ArtStyle {
  name: string
  build: (palette: Palette) => CSSProperties
}

interface Palette {
  a: string
  b: string
  ink: string
}

// A few cheerful palettes the styles draw from. Index-based so it stays
// deterministic on first render (hydration safe).
const PALETTES: Palette[] = [
  { a: "#7c5cbf", b: "#ec4899", ink: "#312e81" },
  { a: "#0ea5e9", b: "#22d3ee", ink: "#0c4a6e" },
  { a: "#f59e0b", b: "#ef4444", ink: "#7c2d12" },
  { a: "#10b981", b: "#84cc16", ink: "#064e3b" },
  { a: "#f43f5e", b: "#fb7185", ink: "#881337" },
  { a: "#8b5cf6", b: "#6366f1", ink: "#1e1b4b" },
]

const BASE: CSSProperties = {
  lineHeight: 1.05,
  display: "inline-block",
  padding: "0.1em 0.05em",
}

// ~8 distinct art treatments. Each combines font-family + colour + effect.
const STYLES: ArtStyle[] = [
  {
    name: "Sunset Gradient",
    build: (p) => ({
      ...BASE,
      fontFamily: "Impact, 'Arial Black', sans-serif",
      textTransform: "uppercase",
      letterSpacing: "0.01em",
      background: `linear-gradient(120deg, ${p.a}, ${p.b})`,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      WebkitTextFillColor: "transparent",
    }),
  },
  {
    name: "Bold Outline",
    build: (p) => ({
      ...BASE,
      fontFamily: "Impact, 'Arial Black', sans-serif",
      textTransform: "uppercase",
      letterSpacing: "0.02em",
      color: "#ffffff",
      WebkitTextStroke: `2px ${p.a}`,
    }),
  },
  {
    name: "Long Shadow",
    build: (p) => ({
      ...BASE,
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontWeight: 700,
      color: p.a,
      textShadow: `2px 2px 0 ${p.b}, 4px 4px 0 ${p.b}66, 7px 7px 14px rgba(0,0,0,0.25)`,
    }),
  },
  {
    name: "Typewriter",
    build: (p) => ({
      ...BASE,
      fontFamily: "'Courier New', Courier, monospace",
      fontWeight: 700,
      letterSpacing: "0.08em",
      color: p.ink,
      textShadow: `0 1px 0 ${p.a}55`,
    }),
  },
  {
    name: "Script Tilt",
    build: (p) => ({
      ...BASE,
      fontFamily: "'Brush Script MT', cursive",
      fontStyle: "italic",
      color: p.b,
      transform: "rotate(-6deg)",
      textShadow: `1px 2px 6px ${p.a}55`,
    }),
  },
  {
    name: "Neon Glow",
    build: (p) => ({
      ...BASE,
      fontFamily: "'Trebuchet MS', Helvetica, sans-serif",
      fontWeight: 800,
      color: "#fff",
      textShadow: `0 0 4px ${p.b}, 0 0 12px ${p.a}, 0 0 26px ${p.a}, 0 0 48px ${p.a}`,
    }),
  },
  {
    name: "Stamp Caps",
    build: (p) => ({
      ...BASE,
      fontFamily: "'Arial Black', Arial, sans-serif",
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      color: p.a,
      WebkitTextStroke: `1px ${p.ink}`,
      transform: "rotate(3deg)",
    }),
  },
  {
    name: "Vertical Stretch",
    build: (p) => ({
      ...BASE,
      fontFamily: "Georgia, serif",
      fontWeight: 900,
      letterSpacing: "-0.02em",
      transform: "scaleY(1.4)",
      transformOrigin: "center",
      background: `linear-gradient(180deg, ${p.b}, ${p.a})`,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      WebkitTextFillColor: "transparent",
    }),
  },
]

// Soft confetti dots painted into the backdrop. Deterministic (no randomness)
// so SSR and the first client render agree.
const BACKDROP: CSSProperties = {
  backgroundColor: "#fdfbff",
  backgroundImage: [
    "radial-gradient(circle at 12% 18%, rgba(124,92,191,0.16) 0 8px, transparent 9px)",
    "radial-gradient(circle at 82% 26%, rgba(236,72,153,0.16) 0 10px, transparent 11px)",
    "radial-gradient(circle at 28% 74%, rgba(14,165,233,0.16) 0 7px, transparent 8px)",
    "radial-gradient(circle at 68% 82%, rgba(245,158,11,0.16) 0 9px, transparent 10px)",
    "radial-gradient(circle at 48% 44%, rgba(16,185,129,0.12) 0 6px, transparent 7px)",
  ].join(","),
}

function FunWithFonts({ data }: { data: Data }) {
  const words = useMemo(
    () => (data.words.length ? data.words : sample.words),
    [data.words],
  )

  // Deterministic initial assignment by index → identical on server & client.
  const initial = useMemo(
    () => words.map((_, i) => ({ style: i % STYLES.length, palette: i % PALETTES.length })),
    [words],
  )

  const [assign, setAssign] = useState(initial)
  const [shuffleCount, setShuffleCount] = useState(0)

  // Re-sync when the dataset changes (e.g. new pasted words).
  useEffect(() => {
    setAssign(initial)
    setShuffleCount(0)
  }, [initial])

  // Cycle a single word to its next art style (and nudge its palette).
  const cycle = (i: number) => {
    setAssign((prev) =>
      prev.map((a, idx) =>
        idx === i
          ? {
              style: (a.style + 1) % STYLES.length,
              palette: (a.palette + 1) % PALETTES.length,
            }
          : a,
      ),
    )
  }

  // Randomize all — only runs from a click handler, so Math.random is safe here.
  const randomizeAll = () => {
    setAssign(
      words.map(() => ({
        style: Math.floor(Math.random() * STYLES.length),
        palette: Math.floor(Math.random() * PALETTES.length),
      })),
    )
    setShuffleCount((n) => n + 1)
  }

  const reset = () => {
    setAssign(initial)
    setShuffleCount(0)
  }

  const print = () => {
    if (typeof window !== "undefined") window.print()
  }

  return (
    <GameFrame
      title="Fun with Fonts"
      accent={ACCENT}
      onRestart={reset}
      toolbar={
        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={randomizeAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Shuffle className="size-4" style={{ color: ACCENT }} />
            Randomize all
          </button>
          <PlayButton accent={ACCENT} onClick={print}>
            <span className="inline-flex items-center gap-1.5">
              <Printer className="size-4" />
              Print
            </span>
          </PlayButton>
        </div>
      }
    >
      {/* Print: show only the art canvas, edge to edge. */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #fonts-canvas, #fonts-canvas * { visibility: visible !important; }
          #fonts-canvas {
            position: absolute; inset: 0; margin: 0; border: none !important;
            box-shadow: none !important; background: #ffffff !important;
          }
        }
      `}</style>

      <p className="mb-3 flex items-center justify-center gap-1.5 text-center text-sm text-slate-500 print:hidden">
        <Sparkles className="size-4" style={{ color: ACCENT }} />
        Tap any word to restyle it, or shuffle the whole board.
      </p>

      <div
        id="fonts-canvas"
        className="relative overflow-hidden rounded-2xl border border-black/10 p-6 shadow-lg sm:p-10"
        style={BACKDROP}
      >
        {words.length === 0 ? (
          <p className="py-16 text-center text-slate-400">No words to show.</p>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-10">
            {words.map((word, i) => {
              const a = assign[i] ?? { style: i % STYLES.length, palette: i % PALETTES.length }
              const styleDef = STYLES[a.style] ?? STYLES[0]
              const palette = PALETTES[a.palette] ?? PALETTES[0]
              return (
                <button
                  key={`${word}-${i}`}
                  onClick={() => cycle(i)}
                  title={`${styleDef.name} — click to restyle`}
                  className="group relative max-w-full rounded-xl px-2 transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 print:hover:scale-100"
                  style={{ outlineColor: ACCENT }}
                >
                  <span
                    className="block break-words text-4xl sm:text-6xl"
                    style={styleDef.build(palette)}
                  >
                    {word}
                  </span>
                  <span
                    className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-wide text-slate-400 opacity-0 transition group-hover:opacity-100 print:hidden"
                  >
                    {styleDef.name}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500 print:hidden">
        <span>
          {words.length} word{words.length === 1 ? "" : "s"} · {STYLES.length} art styles
        </span>
        <span>{shuffleCount === 0 ? "Styled by index" : `Shuffled ×${shuffleCount}`}</span>
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "fun-with-fonts",
  name: "Fun with Fonts",
  blurb: "Artistic word art to print or save.",
  icon: "🔤",
  category: "Creative",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Column: Word or phrase (one per row). First row is headers.",
  sample,
  parse,
  Component: FunWithFonts,
})
