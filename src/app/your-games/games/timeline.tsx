"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Eye, ListOrdered, Check, X } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame } from "./ui"

interface TimelineEvent {
  date: string
  label: string
  desc?: string
  sort: number
}
interface Data {
  events: TimelineEvent[]
}

const ACCENT = "#1f306d"

/** Extract a signed numeric sort key from a date/year string.
 *  Pulls the first integer found; negates it when "BC"/"BCE" is present. */
function sortKeyFromDate(date: string): number {
  const text = date || ""
  const match = text.match(/-?\d+/)
  if (!match) return 0
  const n = parseInt(match[0], 10)
  if (Number.isNaN(n)) return 0
  const isBce = /\bb\.?\s?c\.?(e\.?)?\b/i.test(text)
  return isBce ? -Math.abs(n) : n
}

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const events = rows
    .slice(1)
    .filter((r) => Array.isArray(r) && (r[0] || r[1]))
    .map((r) => {
      const date = (r[0] || "").trim()
      const label = (r[1] || "").trim()
      const desc = (r[2] || "").trim() || undefined
      return { date, label, desc, sort: sortKeyFromDate(date) }
    })
    .filter((e) => e.label || e.date)
  if (!events.length) return sample
  events.sort((a, b) => a.sort - b.sort)
  return { events }
}

const sample: Data = {
  events: [
    {
      date: "3000 BCE",
      label: "Writing is invented",
      desc: "Cuneiform appears in Sumer, one of the earliest known writing systems used for record-keeping.",
      sort: -3000,
    },
    {
      date: "776 BCE",
      label: "First Olympic Games",
      desc: "The ancient Olympic Games are held in Olympia, Greece, dedicated to the god Zeus.",
      sort: -776,
    },
    {
      date: "1440",
      label: "Printing press",
      desc: "Johannes Gutenberg develops movable-type printing in Europe, transforming the spread of knowledge.",
      sort: 1440,
    },
    {
      date: "1687",
      label: "Newton's Principia",
      desc: "Isaac Newton publishes his laws of motion and universal gravitation.",
      sort: 1687,
    },
    {
      date: "1869",
      label: "Periodic table",
      desc: "Dmitri Mendeleev arranges the chemical elements by their properties.",
      sort: 1869,
    },
    {
      date: "1969",
      label: "Moon landing",
      desc: "Apollo 11 lands humans on the Moon for the first time.",
      sort: 1969,
    },
    {
      date: "1989",
      label: "World Wide Web",
      desc: "Tim Berners-Lee proposes the World Wide Web at CERN.",
      sort: 1989,
    },
  ],
}

function Timeline({ data }: { data: Data }) {
  const sorted = useMemo(
    () => [...data.events].sort((a, b) => a.sort - b.sort),
    [data.events],
  )

  // Reading view state
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  // Challenge state
  const [challenge, setChallenge] = useState(false)
  const [order, setOrder] = useState<number[]>(() => sorted.map((_, i) => i))
  const [checked, setChecked] = useState(false)

  const toggleExpand = (i: number) =>
    setExpanded((prev) => {
      const n = new Set(prev)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })

  // The correct order is simply ascending indices (sorted is already ascending).
  const correctIndices = useMemo(() => sorted.map((_, i) => i), [sorted])

  const startChallenge = () => {
    // Deterministic-then-shuffle: build a fresh shuffled order in a handler
    // (user-triggered, never during render) so SSR stays stable.
    const next = sorted.map((_, i) => i)
    for (let k = next.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1))
      ;[next[k], next[j]] = [next[j], next[k]]
    }
    setOrder(next)
    setChecked(false)
    setChallenge(true)
  }

  const move = (pos: number, delta: number) => {
    setChecked(false)
    setOrder((prev) => {
      const target = pos + delta
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[pos], next[target]] = [next[target], next[pos]]
      return next
    })
  }

  const restart = () => {
    setChallenge(false)
    setChecked(false)
    setOrder(sorted.map((_, i) => i))
    setExpanded(new Set())
  }

  const correctCount = order.filter((idx, pos) => idx === correctIndices[pos]).length
  const allCorrect = correctCount === order.length && order.length > 0

  if (!sorted.length)
    return (
      <GameFrame title="Timeline" accent={ACCENT}>
        <p className="rounded-xl border border-black/10 bg-white p-8 text-center text-slate-500">
          No events yet. Add rows with a date and a label to build a timeline.
        </p>
      </GameFrame>
    )

  return (
    <GameFrame
      title="Timeline"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <button
          onClick={challenge ? restart : startChallenge}
          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold shadow-sm transition ${
            challenge
              ? "border-transparent text-white"
              : "border-black/10 bg-white text-slate-700 hover:bg-slate-50"
          }`}
          style={challenge ? { backgroundColor: ACCENT } : undefined}
        >
          {challenge ? (
            <>
              <Eye className="size-4" /> View timeline
            </>
          ) : (
            <>
              <ListOrdered className="size-4" /> Order Challenge
            </>
          )}
        </button>
      }
    >
      {challenge ? (
        <ChallengeView
          events={sorted}
          order={order}
          checked={checked}
          correctIndices={correctIndices}
          correctCount={correctCount}
          allCorrect={allCorrect}
          onMove={move}
          onCheck={() => setChecked(true)}
        />
      ) : (
        <ReadingView events={sorted} expanded={expanded} onToggle={toggleExpand} />
      )}
    </GameFrame>
  )
}

function ReadingView({
  events,
  expanded,
  onToggle,
}: {
  events: TimelineEvent[]
  expanded: Set<number>
  onToggle: (i: number) => void
}) {
  return (
    <div className="relative py-2">
      {/* central line (mobile: left-aligned, desktop: centered) */}
      <div
        className="absolute bottom-0 top-0 w-0.5 md:left-1/2 md:-translate-x-1/2"
        style={{ left: "10px", backgroundColor: `${ACCENT}33` }}
        aria-hidden
      />
      <ul className="space-y-6">
        {events.map((ev, i) => {
          const isLeft = i % 2 === 0
          const open = expanded.has(i)
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.06, 0.5) }}
              className={`relative flex md:items-center ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* node dot */}
              <span
                className="absolute z-10 size-3.5 rounded-full ring-4 ring-white md:left-1/2 md:-translate-x-1/2"
                style={{ left: "4px", backgroundColor: ACCENT }}
                aria-hidden
              />
              {/* spacer for the other half on desktop */}
              <div className="hidden md:block md:w-1/2" />
              <div
                className={`w-full pl-8 md:w-1/2 md:pl-0 ${
                  isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                }`}
              >
                <button
                  onClick={() => onToggle(i)}
                  className="group w-full rounded-xl border border-black/10 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
                >
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${
                      isLeft ? "md:ml-auto" : ""
                    }`}
                    style={{ backgroundColor: ACCENT }}
                  >
                    {ev.date || "—"}
                  </span>
                  <span className="mt-1.5 flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-800">{ev.label}</span>
                    {ev.desc &&
                      (open ? (
                        <ChevronUp className="size-4 shrink-0 text-slate-400" />
                      ) : (
                        <ChevronDown className="size-4 shrink-0 text-slate-400" />
                      ))}
                  </span>
                  {ev.desc && open && (
                    <motion.span
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 block text-sm leading-relaxed text-slate-600"
                    >
                      {ev.desc}
                    </motion.span>
                  )}
                  {ev.desc && !open && (
                    <span className="mt-1 block text-xs text-slate-400">
                      Tap to read more
                    </span>
                  )}
                </button>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

function ChallengeView({
  events,
  order,
  checked,
  correctIndices,
  correctCount,
  allCorrect,
  onMove,
  onCheck,
}: {
  events: TimelineEvent[]
  order: number[]
  checked: boolean
  correctIndices: number[]
  correctCount: number
  allCorrect: boolean
  onMove: (pos: number, delta: number) => void
  onCheck: () => void
}) {
  return (
    <div>
      <p className="mb-3 text-sm text-slate-500">
        Dates are hidden. Reorder the events from earliest to latest, then check your work.
      </p>

      <ul className="space-y-2">
        {order.map((idx, pos) => {
          const ev = events[idx]
          const isRight = checked && idx === correctIndices[pos]
          const isWrong = checked && idx !== correctIndices[pos]
          return (
            <li
              key={idx}
              className={`flex items-center gap-3 rounded-xl border p-3 shadow-sm transition ${
                isRight
                  ? "border-green-300 bg-green-50"
                  : isWrong
                    ? "border-red-300 bg-red-50"
                    : "border-black/10 bg-white"
              }`}
            >
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: ACCENT }}
              >
                {pos + 1}
              </span>
              <span className="flex-1 font-semibold text-slate-800">{ev.label}</span>
              {checked &&
                (isRight ? (
                  <Check className="size-5 text-green-600" />
                ) : (
                  <X className="size-5 text-red-500" />
                ))}
              <span className="flex flex-col gap-1">
                <button
                  onClick={() => onMove(pos, -1)}
                  disabled={pos === 0}
                  aria-label="Move up"
                  className="rounded border border-black/10 bg-white p-0.5 text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-30"
                >
                  <ChevronUp className="size-4" />
                </button>
                <button
                  onClick={() => onMove(pos, 1)}
                  disabled={pos === order.length - 1}
                  aria-label="Move down"
                  className="rounded border border-black/10 bg-white p-0.5 text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-30"
                >
                  <ChevronDown className="size-4" />
                </button>
              </span>
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          onClick={onCheck}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          style={{ backgroundColor: ACCENT }}
        >
          Check order
        </button>
        {checked && (
          <span
            className={`text-sm font-semibold ${
              allCorrect ? "text-green-600" : "text-slate-600"
            }`}
          >
            {allCorrect
              ? "🎉 Perfect chronology!"
              : `${correctCount} / ${order.length} in the right place`}
          </span>
        )}
      </div>
    </div>
  )
}

export default defineGame<Data>({
  id: "timeline",
  name: "Timeline",
  blurb: "A clean interactive timeline of events, sorted by date.",
  icon: "📅",
  category: "Study & Review",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Date/Year | Event | Description (optional). First row is headers.",
  sample,
  parse,
  Component: Timeline,
})
