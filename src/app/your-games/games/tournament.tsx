"use client"

import { useMemo, useState } from "react"
import { Shuffle, Trophy } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Data {
  competitors: string[]
}

const ACCENT = "#58a65c"
const BYE = "BYE"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const competitors = rows
    .slice(1)
    .map((r) => (Array.isArray(r) ? (r[0] || "").trim() : ""))
    .filter(Boolean)
  return { competitors: competitors.length >= 2 ? competitors : sample.competitors }
}

const sample: Data = {
  competitors: [
    "Lions",
    "Tigers",
    "Bears",
    "Wolves",
    "Eagles",
    "Sharks",
    "Falcons",
    "Panthers",
  ],
}

/** Next power of two >= n (min 2). */
function nextPow2(n: number): number {
  let p = 2
  while (p < n) p *= 2
  return p
}

/** Build the seeded slots, padded with BYE up to the next power of two. */
function buildSlots(competitors: string[]): string[] {
  const clean = competitors.map((c) => c.trim()).filter(Boolean)
  const size = nextPow2(Math.max(clean.length, 2))
  const slots = clean.slice(0, size)
  while (slots.length < size) slots.push(BYE)
  return slots
}

/** A single match between two slot positions. winner is a slot value or null. */
interface Match {
  a: string
  b: string
  winner: string | null
}

/**
 * Deterministically compute the full bracket from the slot list + the set of
 * user-chosen winners (keyed by "round-index"). BYEs auto-advance. Each round
 * is derived from the previous round's resolved winners, so we never store
 * stale state — winners alone drive everything.
 */
function computeRounds(
  slots: string[],
  picks: Record<string, string>,
): Match[][] {
  const rounds: Match[][] = []
  let entrants = slots
  let round = 0
  while (entrants.length >= 2) {
    const matches: Match[] = []
    const nextEntrants: string[] = []
    for (let i = 0; i < entrants.length; i += 2) {
      const a = entrants[i]
      const b = entrants[i + 1]
      const key = `${round}-${i / 2}`
      let winner: string | null = null
      // Auto-advance when one side is a BYE (or empty placeholder).
      const aReal = a && a !== BYE
      const bReal = b && b !== BYE
      if (aReal && !bReal) winner = a
      else if (!aReal && bReal) winner = b
      else if (!aReal && !bReal) winner = null
      else {
        const picked = picks[key]
        if (picked === a || picked === b) winner = picked
      }
      matches.push({ a, b, winner })
      nextEntrants.push(winner ?? "")
    }
    rounds.push(matches)
    entrants = nextEntrants
    round += 1
  }
  return rounds
}

function roundLabel(roundIdx: number, totalRounds: number): string {
  const fromEnd = totalRounds - roundIdx
  if (fromEnd === 1) return "Final"
  if (fromEnd === 2) return "Semifinals"
  if (fromEnd === 3) return "Quarterfinals"
  return `Round ${roundIdx + 1}`
}

function Tournament({ data }: { data: Data }) {
  const competitors = data.competitors.length >= 2 ? data.competitors : sample.competitors

  // Seed order in state so "Shuffle seeds" can reorder it (deterministic init).
  const [seedOrder, setSeedOrder] = useState<string[]>(() => competitors.slice())
  const [picks, setPicks] = useState<Record<string, string>>({})

  const slots = useMemo(() => buildSlots(seedOrder), [seedOrder])
  const rounds = useMemo(() => computeRounds(slots, picks), [slots, picks])

  const totalRounds = rounds.length
  const champion =
    totalRounds > 0 ? rounds[totalRounds - 1][0]?.winner ?? null : null
  const champReal = champion && champion !== BYE ? champion : null

  const isRealContest = (m: Match) =>
    m.a !== "" && m.b !== "" && m.a !== BYE && m.b !== BYE
  const decidedCount = rounds
    .flat()
    .filter((m) => isRealContest(m) && m.winner).length
  const totalReal = rounds.flat().filter(isRealContest).length

  const pick = (roundIdx: number, matchIdx: number, name: string) => {
    if (!name || name === BYE) return
    const key = `${roundIdx}-${matchIdx}`
    setPicks((prev) => {
      const next = { ...prev }
      next[key] = name
      // Invalidate any picks in later rounds — the bracket recomputes from here.
      for (const k of Object.keys(next)) {
        const r = Number(k.split("-")[0])
        if (r > roundIdx) delete next[k]
      }
      return next
    })
  }

  const shuffleSeeds = () => {
    const next = competitors.slice()
    for (let k = next.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1))
      ;[next[k], next[j]] = [next[j], next[k]]
    }
    setSeedOrder(next)
    setPicks({})
  }

  const restart = () => {
    setSeedOrder(competitors.slice())
    setPicks({})
  }

  return (
    <GameFrame
      title="Tournament Bracket"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <button
          onClick={shuffleSeeds}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Shuffle className="size-4" />
          Shuffle seeds
        </button>
      }
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <span>
          {competitors.length} competitors · {totalRounds}{" "}
          {totalRounds === 1 ? "round" : "rounds"}
        </span>
        <span>
          {decidedCount} / {totalReal} matches decided
        </span>
      </div>

      {champReal ? (
        <div
          className="mb-5 flex items-center justify-center gap-3 rounded-2xl border px-6 py-5 text-center shadow-sm"
          style={{ borderColor: ACCENT, background: `${ACCENT}1a` }}
        >
          <Trophy className="size-7" style={{ color: ACCENT }} />
          <span className="text-xl font-bold" style={{ color: ACCENT }}>
            🏆 Champion: {champReal}
          </span>
        </div>
      ) : (
        <p className="mb-4 text-center text-sm text-slate-500">
          Click a name in each matchup to advance the winner.
        </p>
      )}

      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-max items-stretch gap-6">
          {rounds.map((matches, roundIdx) => (
            <div key={roundIdx} className="flex w-52 flex-col">
              <h2 className="mb-3 text-center text-xs font-bold uppercase tracking-wide text-slate-400">
                {roundLabel(roundIdx, totalRounds)}
              </h2>
              <div className="flex flex-1 flex-col justify-around gap-4">
                {matches.map((m, matchIdx) => (
                  <MatchCard
                    key={matchIdx}
                    match={m}
                    onPick={(name) => pick(roundIdx, matchIdx, name)}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Champion column */}
          <div className="flex w-44 flex-col">
            <h2 className="mb-3 text-center text-xs font-bold uppercase tracking-wide text-slate-400">
              Champion
            </h2>
            <div className="flex flex-1 items-center">
              <div
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed px-3 py-4 text-center text-sm font-bold"
                style={
                  champReal
                    ? { borderColor: ACCENT, background: `${ACCENT}1a`, color: ACCENT }
                    : { borderColor: "rgba(0,0,0,0.12)", color: "#94a3b8" }
                }
              >
                {champReal ? (
                  <>
                    <Trophy className="size-4 shrink-0" />
                    {champReal}
                  </>
                ) : (
                  "TBD"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <PlayButton accent={ACCENT} onClick={restart}>
          New bracket
        </PlayButton>
      </div>
    </GameFrame>
  )
}

function MatchCard({
  match,
  onPick,
}: {
  match: Match
  onPick: (name: string) => void
}) {
  const { a, b, winner } = match
  const isBye = a === BYE || b === BYE
  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
      <Slot name={a} winner={winner} disabled={isBye} onPick={onPick} top />
      <div className="h-px bg-black/10" />
      <Slot name={b} winner={winner} disabled={isBye} onPick={onPick} top={false} />
    </div>
  )
}

function Slot({
  name,
  winner,
  disabled,
  onPick,
  top,
}: {
  name: string
  winner: string | null
  disabled: boolean
  onPick: (name: string) => void
  top: boolean
}) {
  const isBye = !name || name === BYE
  const empty = name === ""
  const isWinner = !!winner && winner === name && !isBye
  const isLoser = !!winner && winner !== name && !isBye

  const label = empty ? "—" : isBye ? BYE : name

  return (
    <button
      type="button"
      disabled={disabled || isBye || empty}
      onClick={() => onPick(name)}
      aria-pressed={isWinner}
      className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-semibold transition ${
        top ? "rounded-t-xl" : "rounded-b-xl"
      } ${
        isWinner
          ? "text-white"
          : isLoser
            ? "text-slate-400 line-through"
            : isBye || empty
              ? "cursor-default text-slate-300"
              : "text-slate-700 hover:bg-slate-50"
      }`}
      style={isWinner ? { backgroundColor: ACCENT } : undefined}
    >
      <span className="truncate">{label}</span>
    </button>
  )
}

export default defineGame<Data>({
  id: "tournament",
  name: "Tournament Bracket",
  blurb: "Run a single-elimination bracket and crown a champion.",
  icon: "🥊",
  category: "Competition",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Column: Competitor (one per row). First row is headers.",
  sample,
  parse,
  Component: Tournament,
})
