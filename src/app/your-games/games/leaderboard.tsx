"use client"

import { useMemo, useState } from "react"
import { Search, Trophy, ArrowUp, ArrowDown } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame } from "./ui"

interface Player {
  name: string
  values: number[]
}
interface Data {
  columns: string[]
  rows: Player[]
}

const ACCENT = "#58a65c"

function parse(rows: Rows): Data {
  if (!rows || rows.length < 2) return sample

  const header = rows[0] ?? []
  const columns = header.slice(1).map((c, i) => (c && c.trim() ? c.trim() : `Column ${i + 1}`))
  if (columns.length === 0) return sample

  const players: Player[] = rows
    .slice(1)
    .filter((r) => Array.isArray(r) && (r[0]?.trim() ?? ""))
    .map((r) => {
      const values = columns.map((_, i) => {
        const n = Number(r[i + 1])
        return Number.isFinite(n) ? n : 0
      })
      return { name: r[0].trim(), values }
    })

  if (players.length === 0) return sample
  return { columns, rows: players }
}

const sample: Data = {
  columns: ["Points", "Wins", "Streak"],
  rows: [
    { name: "Ada Lovelace", values: [980, 24, 7] },
    { name: "Alan Turing", values: [1120, 29, 5] },
    { name: "Grace Hopper", values: [1050, 27, 9] },
    { name: "Katherine Johnson", values: [890, 21, 4] },
    { name: "Linus Torvalds", values: [760, 18, 3] },
    { name: "Margaret Hamilton", values: [1010, 25, 6] },
    { name: "Tim Berners-Lee", values: [845, 20, 2] },
    { name: "Dennis Ritchie", values: [930, 23, 8] },
    { name: "Barbara Liskov", values: [705, 17, 1] },
    { name: "Edsger Dijkstra", values: [880, 22, 5] },
  ],
}

const MEDALS = ["🥇", "🥈", "🥉"]
const PODIUM = [
  { ring: "ring-amber-300", badge: "bg-amber-100 text-amber-700", glow: "shadow-amber-200/60" },
  { ring: "ring-slate-300", badge: "bg-slate-100 text-slate-600", glow: "shadow-slate-200/60" },
  { ring: "ring-orange-300", badge: "bg-orange-100 text-orange-700", glow: "shadow-orange-200/60" },
]

function Leaderboard({ data }: { data: Data }) {
  const { columns, rows } = data
  const lastSort = columns.length - 1

  const [sortCol, setSortCol] = useState(0)
  const [dir, setDir] = useState<"asc" | "desc">("desc")
  const [query, setQuery] = useState("")

  const ranked = useMemo(() => {
    const idx = Math.min(Math.max(sortCol, 0), lastSort)
    const sorted = [...rows].sort((a, b) => {
      const diff = (a.values[idx] ?? 0) - (b.values[idx] ?? 0)
      return dir === "desc" ? -diff : diff
    })
    return sorted.map((p, i) => ({ ...p, rank: i + 1 }))
  }, [rows, sortCol, dir, lastSort])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ranked
    return ranked.filter((p) => p.name.toLowerCase().includes(q))
  }, [ranked, query])

  const onHeaderClick = (col: number) => {
    if (col === sortCol) {
      setDir((d) => (d === "desc" ? "asc" : "desc"))
    } else {
      setSortCol(col)
      setDir("desc")
    }
  }

  const restart = () => {
    setSortCol(0)
    setDir("desc")
    setQuery("")
  }

  if (rows.length === 0) {
    return (
      <GameFrame title="Leader Board" accent={ACCENT}>
        <p className="text-center text-slate-500">No players to rank.</p>
      </GameFrame>
    )
  }

  return (
    <GameFrame
      title="Leader Board"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <span
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
          style={{ backgroundColor: ACCENT }}
        >
          <Trophy className="size-4" />
          {rows.length} players
        </span>
      }
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players…"
            className="w-full rounded-lg border border-black/10 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none transition focus:ring-2"
            style={{ ["--tw-ring-color" as string]: `${ACCENT}55` }}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg">
        <div
          className="grid items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white"
          style={{
            backgroundColor: ACCENT,
            gridTemplateColumns: `3rem minmax(0,1fr) repeat(${columns.length}, minmax(3.5rem, 6rem))`,
          }}
        >
          <div className="text-center">#</div>
          <div>Player</div>
          {columns.map((c, i) => (
            <button
              key={c + i}
              onClick={() => onHeaderClick(i)}
              className="flex items-center justify-end gap-1 text-right uppercase tracking-wide transition hover:opacity-80"
              title={`Sort by ${c}`}
            >
              <span className="truncate">{c}</span>
              {sortCol === i &&
                (dir === "desc" ? <ArrowDown className="size-3 shrink-0" /> : <ArrowUp className="size-3 shrink-0" />)}
            </button>
          ))}
        </div>

        <div className="divide-y divide-black/5">
          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-slate-500">No players match “{query}”.</div>
          ) : (
            filtered.map((p) => {
              const podium = p.rank <= 3 ? PODIUM[p.rank - 1] : null
              return (
                <div
                  key={p.name}
                  className={`grid items-center gap-2 px-4 py-3 text-sm transition ${
                    podium ? `bg-white ring-2 ring-inset ${podium.ring}` : "hover:bg-slate-50"
                  }`}
                  style={{
                    gridTemplateColumns: `3rem minmax(0,1fr) repeat(${columns.length}, minmax(3.5rem, 6rem))`,
                  }}
                >
                  <div className="flex items-center justify-center">
                    {podium ? (
                      <span className="text-xl leading-none" aria-label={`Rank ${p.rank}`}>
                        {MEDALS[p.rank - 1]}
                      </span>
                    ) : (
                      <span className="font-mono font-semibold text-slate-400">{p.rank}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    {podium && (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${podium.badge}`}>
                        Top {p.rank}
                      </span>
                    )}
                    <span className={`truncate font-semibold ${podium ? "text-slate-900" : "text-slate-700"}`}>
                      {p.name}
                    </span>
                  </div>
                  {p.values.map((v, ci) => (
                    <div
                      key={ci}
                      className={`text-right font-mono tabular-nums ${
                        ci === sortCol ? "font-bold text-slate-900" : "text-slate-500"
                      }`}
                    >
                      {v.toLocaleString()}
                    </div>
                  ))}
                </div>
              )
            })
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-slate-400">
        Sorted by <span className="font-semibold text-slate-500">{columns[Math.min(sortCol, lastSort)]}</span>{" "}
        ({dir === "desc" ? "high → low" : "low → high"}) · click a column to re-sort
      </p>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "leaderboard",
  name: "Leader Board",
  blurb: "A polished, sortable leaderboard with medals for the top three.",
  icon: "🏆",
  category: "Competition",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Name | Score (more numeric columns optional). First row is headers.",
  sample,
  parse,
  Component: Leaderboard,
})
