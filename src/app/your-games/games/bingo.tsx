"use client"

import { useEffect, useMemo, useState } from "react"
import { Megaphone, PartyPopper, RefreshCw } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Data {
  items: string[]
}

const ACCENT = "#58a65c"
const FREE = "★ FREE"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const items = rows
    .slice(1)
    .map((r) => (Array.isArray(r) ? (r[0] ?? "").trim() : ""))
    .filter(Boolean)
  return { items: items.length ? items : sample.items }
}

const sample: Data = {
  items: [
    "Photosynthesis",
    "Mitochondria",
    "Osmosis",
    "Catalyst",
    "Gravity",
    "Friction",
    "Velocity",
    "Momentum",
    "Voltage",
    "Resistance",
    "Atom",
    "Molecule",
    "Electron",
    "Proton",
    "Neutron",
    "Isotope",
    "Enzyme",
    "Protein",
    "Glucose",
    "Diffusion",
    "Density",
    "Pressure",
    "Frequency",
    "Wavelength",
    "Acceleration",
    "Energy",
    "Force",
    "Mass",
  ],
}

/** Deterministic Fisher–Yates using a seedable PRNG (mulberry32). Pure: no
 *  global RNG, so it can run anywhere — we seed it from a value created inside
 *  an effect to stay hydration-safe. */
function shuffleSeeded<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  let s = seed >>> 0
  const rand = () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  for (let k = out.length - 1; k > 0; k--) {
    const j = Math.floor(rand() * (k + 1))
    ;[out[k], out[j]] = [out[j], out[k]]
  }
  return out
}

/** Pick 24 distinct-ish cells. If the source pool has fewer than 24 entries we
 *  pad by repeating shuffled copies so a card always fills. Returns whether
 *  padding was needed so the UI can note it. */
function buildPool(items: string[], seed: number): { cells: string[]; padded: boolean } {
  const unique = Array.from(new Set(items))
  const padded = unique.length < 24
  let pool = shuffleSeeded(unique, seed)
  while (pool.length < 24) {
    pool = pool.concat(shuffleSeeded(unique, seed + pool.length))
  }
  return { cells: pool.slice(0, 24), padded }
}

const CENTER = 12 // index of the middle cell in a 5x5 grid

/** Build the 25-cell grid (center is FREE). */
function buildCard(cells24: string[]): string[] {
  const grid: string[] = []
  let p = 0
  for (let i = 0; i < 25; i++) {
    if (i === CENTER) grid.push(FREE)
    else grid.push(cells24[p++] ?? "")
  }
  return grid
}

const LINES: number[][] = (() => {
  const lines: number[][] = []
  for (let r = 0; r < 5; r++) lines.push([0, 1, 2, 3, 4].map((c) => r * 5 + c))
  for (let c = 0; c < 5; c++) lines.push([0, 1, 2, 3, 4].map((r) => r * 5 + c))
  lines.push([0, 6, 12, 18, 24])
  lines.push([4, 8, 12, 16, 20])
  return lines
})()

function Bingo({ data }: { data: Data }) {
  const items = data.items.length ? data.items : sample.items

  // Round counter drives regeneration; bumping it requests a new card.
  const [round, setRound] = useState(0)
  // Seed is set only inside an effect (after mount) -> hydration-safe. null ==
  // not yet generated (deterministic placeholder render on the server).
  const [seed, setSeed] = useState<number | null>(null)
  const [card, setCard] = useState<string[]>([])
  const [padded, setPadded] = useState(false)

  // marked = indices on the card the player has clicked (center is auto-marked).
  const [marked, setMarked] = useState<Set<number>>(() => new Set([CENTER]))
  // called = items the caller has drawn, newest first; remaining = uncalled pool.
  const [called, setCalled] = useState<string[]>([])
  const [remaining, setRemaining] = useState<string[]>([])
  const [lastCall, setLastCall] = useState<string | null>(null)
  const [won, setWon] = useState(false)

  // Generate (and regenerate) the card after mount / on each new round.
  useEffect(() => {
    const s = (Date.now() + round * 0x9e3779b9) >>> 0
    const { cells, padded: wasPadded } = buildPool(items, s)
    const grid = buildCard(cells)
    setSeed(s)
    setCard(grid)
    setPadded(wasPadded)
    setMarked(new Set([CENTER]))
    setCalled([])
    setLastCall(null)
    setWon(false)
    // Caller's pool = the distinct items that can be drawn.
    setRemaining(shuffleSeeded(Array.from(new Set(items)), s ^ 0x1234abcd))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, items])

  const calledSet = useMemo(() => new Set(called), [called])

  // Win check: any full line where every cell is marked.
  useEffect(() => {
    if (!card.length) return
    const win = LINES.some((line) => line.every((idx) => marked.has(idx)))
    if (win) setWon(true)
  }, [marked, card])

  const callNext = () => {
    if (won || !remaining.length) return
    const next = remaining[0]
    setRemaining((prev) => prev.slice(1))
    setCalled((prev) => [next, ...prev])
    setLastCall(next)
  }

  const toggleCell = (idx: number) => {
    if (idx === CENTER || won) return
    const value = card[idx]
    if (!value) return
    // Only allow marking a cell whose value has actually been called.
    if (!calledSet.has(value)) return
    setMarked((prev) => {
      const n = new Set(prev)
      if (n.has(idx)) n.delete(idx)
      else n.add(idx)
      return n
    })
  }

  const newCard = () => setRound((r) => r + 1)

  const generating = seed === null || !card.length

  return (
    <GameFrame
      title="Bingo"
      accent={ACCENT}
      onRestart={newCard}
      toolbar={
        <button
          onClick={newCard}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw className="size-4" />
          New card
        </button>
      }
    >
      {padded && (
        <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
          Fewer than 24 unique items — some terms repeat to fill the card.
        </p>
      )}

      <div className="grid gap-5 md:grid-cols-[1fr_15rem]">
        {/* Card */}
        <div>
          <div
            className="relative grid grid-cols-5 gap-1.5 rounded-2xl border border-black/10 bg-white p-3 shadow-lg"
            aria-label="Bingo card"
          >
            <div className="col-span-5 mb-1 grid grid-cols-5 text-center">
              {["B", "I", "N", "G", "O"].map((l) => (
                <span
                  key={l}
                  className="text-xl font-black tracking-wide"
                  style={{ color: ACCENT, fontFamily: "var(--font-display)" }}
                >
                  {l}
                </span>
              ))}
            </div>

            {generating
              ? Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex aspect-square items-center justify-center rounded-lg bg-slate-100"
                  />
                ))
              : card.map((value, idx) => {
                  const isCenter = idx === CENTER
                  const isMarked = marked.has(idx)
                  const callable = !isCenter && calledSet.has(value) && !isMarked && !won
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleCell(idx)}
                      disabled={isCenter || won || (!isMarked && !calledSet.has(value))}
                      title={value}
                      className={`flex aspect-square items-center justify-center rounded-lg p-1 text-center text-[11px] font-semibold leading-tight transition sm:text-xs ${
                        isMarked
                          ? "text-white shadow-inner"
                          : callable
                            ? "bg-white text-slate-700 ring-2 hover:scale-[1.03]"
                            : "bg-slate-50 text-slate-400"
                      }`}
                      style={
                        isMarked
                          ? { backgroundColor: ACCENT }
                          : callable
                            ? { boxShadow: `0 0 0 2px ${ACCENT}` }
                            : undefined
                      }
                    >
                      <span className="line-clamp-3 break-words">{value}</span>
                    </button>
                  )
                })}
          </div>

          {won && (
            <div
              className="mt-4 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-lg font-black text-white shadow-lg"
              style={{ backgroundColor: ACCENT }}
            >
              <PartyPopper className="size-6" />
              BINGO! You win!
            </div>
          )}
        </div>

        {/* Caller panel */}
        <aside className="flex flex-col gap-3">
          <div className="rounded-2xl border border-black/10 bg-white p-4 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Last called
            </p>
            <p className="mt-1 min-h-7 text-lg font-bold text-slate-800">
              {lastCall ?? "—"}
            </p>
            <PlayButton
              accent={ACCENT}
              onClick={callNext}
              disabled={won || !remaining.length || generating}
              className="mt-3 inline-flex w-full items-center justify-center gap-2"
            >
              <Megaphone className="size-4" />
              {remaining.length ? "Call next" : "All called"}
            </PlayButton>
            <p className="mt-2 text-xs text-slate-500">
              {called.length} called · {remaining.length} left
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Called items
            </p>
            {called.length === 0 ? (
              <p className="py-3 text-center text-xs text-slate-400">
                Press “Call next” to start.
              </p>
            ) : (
              <ul className="flex max-h-64 flex-wrap gap-1.5 overflow-y-auto">
                {called.map((c, i) => (
                  <li
                    key={`${c}-${i}`}
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      i === 0 ? "text-white" : "bg-slate-100 text-slate-600"
                    }`}
                    style={i === 0 ? { backgroundColor: ACCENT } : undefined}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "bingo",
  name: "Bingo",
  blurb: "Generate bingo cards and call items until someone wins.",
  icon: "🎱",
  category: "Competition",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Column: Item (terms to appear on cards). First row is headers.",
  sample,
  parse,
  Component: Bingo,
})
