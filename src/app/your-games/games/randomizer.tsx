"use client"

import { useRef, useState } from "react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Data {
  options: string[]
}

const ACCENT = "#e0962f"

// A pleasant palette that cycles for the wheel segments.
const SEGMENT_COLORS = [
  "#e0962f",
  "#2f7de0",
  "#3fae6a",
  "#d24b6f",
  "#7b5cd6",
  "#e0c52f",
  "#2fb6c4",
  "#e0652f",
]

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const options = rows
    .slice(1)
    .map((r) => (Array.isArray(r) ? (r[0] ?? "").toString().trim() : ""))
    .filter(Boolean)
  // Wheel renders best up to ~12 options; cap to keep labels legible.
  const trimmed = options.slice(0, 12)
  return { options: trimmed.length ? trimmed : sample.options }
}

const sample: Data = {
  options: [
    "Pizza",
    "Tacos",
    "Sushi",
    "Burgers",
    "Pasta",
    "Salad",
    "Curry",
    "Ramen",
  ],
}

// Build an SVG arc path for one segment of a unit-ish wheel.
function segmentPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const toXY = (angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
  }
  const [x1, y1] = toXY(startAngle)
  const [x2, y2] = toXY(endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
}

function Randomizer({ data }: { data: Data }) {
  const options = data.options
  const n = options.length
  const seg = 360 / n

  // Deterministic initial state for SSR safety (no random in render/initializer).
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const spinningRef = useRef(false)

  const size = 360
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 6

  const spin = () => {
    if (spinningRef.current || n === 0) return
    spinningRef.current = true
    setSpinning(true)
    setResult(null)

    // Random spin happens in a handler (allowed) — several full turns plus a
    // landing offset. Random landing index keeps things fair across segments.
    const landing = Math.floor(Math.random() * n)
    const fullTurns = 5 + Math.floor(Math.random() * 4) // 5–8 turns
    // Pointer is fixed at the top (12 o'clock). To land segment `landing`
    // under it, rotate so that segment's centre sits at the top. Add a small
    // jitter within the segment so it doesn't always stop dead-centre.
    const jitter = (Math.random() - 0.5) * (seg * 0.6)
    const segCenter = landing * seg + seg / 2
    const targetWithin = (360 - segCenter + jitter + 360) % 360
    // Advance from the current angle to the next full turn boundary, then to
    // the target offset within that final rotation.
    const current = ((rotation % 360) + 360) % 360
    const delta = ((targetWithin - current + 360) % 360) + fullTurns * 360
    const next = rotation + delta
    setRotation(next)
  }

  const onTransitionEnd = () => {
    if (!spinningRef.current) return
    spinningRef.current = false
    setSpinning(false)
    // Determine which segment is under the top pointer from the final angle.
    const normalized = ((rotation % 360) + 360) % 360
    const pointerAngle = (360 - normalized) % 360
    const index = Math.floor(pointerAngle / seg) % n
    const landed = options[index]
    setResult(landed)
    setHistory((h) => [landed, ...h].slice(0, 8))
  }

  const restart = () => {
    if (spinningRef.current) return
    setRotation(0)
    setResult(null)
    setHistory([])
    setSpinning(false)
  }

  if (n === 0) {
    return (
      <GameFrame title="Randomizer" accent={ACCENT}>
        <p className="text-center text-slate-500">Add at least one option to spin the wheel.</p>
      </GameFrame>
    )
  }

  return (
    <GameFrame
      title="Randomizer"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-slate-500 shadow-sm">
          {n} option{n === 1 ? "" : "s"}
        </span>
      }
    >
      <div className="flex flex-col items-center gap-6">
        {/* Wheel + fixed pointer */}
        <div className="relative" style={{ width: size, maxWidth: "100%" }}>
          {/* Pointer fixed at top, pointing down into the wheel */}
          <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1">
            <svg width="36" height="30" viewBox="0 0 36 30" aria-hidden="true">
              <path
                d="M18 28 L4 4 Q18 0 32 4 Z"
                fill={ACCENT}
                stroke="#fff"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full select-none drop-shadow-xl"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.18, 0.9, 0.2, 1)" : "none",
            }}
            onTransitionEnd={onTransitionEnd}
            role="img"
            aria-label="Randomizer wheel"
          >
            <circle cx={cx} cy={cy} r={r + 4} fill="#1f2937" />
            {options.map((opt, idx) => {
              const start = idx * seg
              const end = start + seg
              const color = SEGMENT_COLORS[idx % SEGMENT_COLORS.length]
              const mid = start + seg / 2
              const labelRad = ((mid - 90) * Math.PI) / 180
              const labelR = r * 0.62
              const lx = cx + labelR * Math.cos(labelRad)
              const ly = cy + labelR * Math.sin(labelRad)
              const display = opt.length > 14 ? opt.slice(0, 13) + "…" : opt
              return (
                <g key={idx}>
                  <path d={segmentPath(cx, cy, r, start, end)} fill={color} stroke="#fff" strokeWidth="2" />
                  <text
                    x={lx}
                    y={ly}
                    fill="#fff"
                    fontSize={n > 9 ? 12 : 15}
                    fontWeight={700}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${mid} ${lx} ${ly})`}
                    style={{ pointerEvents: "none" }}
                  >
                    {display}
                  </text>
                </g>
              )
            })}
            {/* Hub */}
            <circle cx={cx} cy={cy} r={22} fill="#fff" stroke="#1f2937" strokeWidth="3" />
            <circle cx={cx} cy={cy} r={8} fill={ACCENT} />
          </svg>
        </div>

        {/* Result banner */}
        <div className="min-h-[3.25rem] w-full max-w-md">
          {result ? (
            <div
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-lg font-bold text-white shadow-md"
              style={{ backgroundColor: ACCENT }}
            >
              <span className="text-xl">🎉</span>
              <span className="truncate">{result}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-300 px-5 py-3 text-center text-sm text-slate-400">
              {spinning ? "Spinning…" : "Press Spin to pick a winner"}
            </div>
          )}
        </div>

        <PlayButton accent={ACCENT} onClick={spin} disabled={spinning} className="px-8 py-3 text-base">
          {spinning ? "Spinning…" : "🎡 Spin"}
        </PlayButton>

        {/* Recent results */}
        {history.length > 0 && (
          <div className="w-full max-w-md">
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
              Recent picks
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {history.map((h, idx) => (
                <span
                  key={idx}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    idx === 0 ? "text-white" : "bg-slate-100 text-slate-600"
                  }`}
                  style={idx === 0 ? { backgroundColor: ACCENT } : undefined}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "randomizer",
  name: "Randomizer",
  blurb: "A spin-the-wheel randomizer for any set of options.",
  icon: "🎡",
  category: "Random & Pickers",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Column: Option (one per row). First row is headers.",
  sample,
  parse,
  Component: Randomizer,
})
