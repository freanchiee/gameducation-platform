"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Users, Target, Trash2 } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Data {
  names: string[]
}

const ACCENT = "#e0962f"

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const names = rows
    .slice(1)
    .map((r) => (Array.isArray(r) ? (r[0] ?? "").trim() : ""))
    .filter(Boolean)
  return names.length ? { names } : sample
}

const sample: Data = {
  names: [
    "Ava",
    "Liam",
    "Sofia",
    "Noah",
    "Mia",
    "Ethan",
    "Isabella",
    "Lucas",
    "Amelia",
    "Mason",
    "Harper",
    "Elijah",
    "Charlotte",
    "Oliver",
    "Aria",
    "Benjamin",
  ],
}

type Mode = "pick" | "groups"

function NamePicker({ data }: { data: Data }) {
  const fullList = useMemo(
    () => (data.names.length ? data.names : sample.names),
    [data.names],
  )

  const [mode, setMode] = useState<Mode>("pick")
  const [pool, setPool] = useState<string[]>(fullList)
  const [removeAfter, setRemoveAfter] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [display, setDisplay] = useState<string | null>(null)
  const [winner, setWinner] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])

  const [groupCount, setGroupCount] = useState(3)
  const [groups, setGroups] = useState<string[][]>([])

  const spinTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (spinTimer.current) {
      clearInterval(spinTimer.current)
      spinTimer.current = null
    }
    if (stopTimer.current) {
      clearTimeout(stopTimer.current)
      stopTimer.current = null
    }
  }, [])

  // Reset everything when the source list changes.
  useEffect(() => {
    clearTimers()
    setPool(fullList)
    setSpinning(false)
    setDisplay(null)
    setWinner(null)
    setHistory([])
    setGroups([])
  }, [fullList, clearTimers])

  // Cleanup timers on unmount.
  useEffect(() => clearTimers, [clearTimers])

  const pick = useCallback(() => {
    if (spinning || pool.length === 0) return
    clearTimers()
    setWinner(null)
    setSpinning(true)

    const duration = 1500
    const start = Date.now()

    spinTimer.current = setInterval(() => {
      const idx = Math.floor(Math.random() * pool.length)
      setDisplay(pool[idx])
    }, 70)

    stopTimer.current = setTimeout(() => {
      if (spinTimer.current) {
        clearInterval(spinTimer.current)
        spinTimer.current = null
      }
      const chosen = pool[Math.floor(Math.random() * pool.length)]
      setDisplay(chosen)
      setWinner(chosen)
      setSpinning(false)
      setHistory((h) => [chosen, ...h])
      if (removeAfter) {
        setPool((p) => {
          const i = p.indexOf(chosen)
          if (i === -1) return p
          const next = [...p]
          next.splice(i, 1)
          return next
        })
      }
      void start
    }, duration)
  }, [spinning, pool, removeAfter, clearTimers])

  const makeGroups = useCallback(() => {
    const n = Math.max(1, Math.min(groupCount, fullList.length || 1))
    const shuffled = [...fullList]
    for (let k = shuffled.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1))
      ;[shuffled[k], shuffled[j]] = [shuffled[j], shuffled[k]]
    }
    const buckets: string[][] = Array.from({ length: n }, () => [])
    shuffled.forEach((name, idx) => {
      buckets[idx % n].push(name)
    })
    setGroups(buckets)
  }, [groupCount, fullList])

  const restart = useCallback(() => {
    clearTimers()
    setPool(fullList)
    setSpinning(false)
    setDisplay(null)
    setWinner(null)
    setHistory([])
    setGroups([])
  }, [fullList, clearTimers])

  const switchMode = (m: Mode) => {
    clearTimers()
    setSpinning(false)
    setMode(m)
  }

  const removeFromPool = (name: string) => {
    setPool((p) => {
      const i = p.indexOf(name)
      if (i === -1) return p
      const next = [...p]
      next.splice(i, 1)
      return next
    })
  }

  const poolEmpty = pool.length === 0

  return (
    <GameFrame
      title="Random Name Picker"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        <div className="flex items-center gap-1 rounded-lg border border-black/10 bg-white p-1 shadow-sm">
          <button
            onClick={() => switchMode("pick")}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-semibold transition ${
              mode === "pick" ? "text-white" : "text-slate-600 hover:bg-slate-50"
            }`}
            style={mode === "pick" ? { backgroundColor: ACCENT } : undefined}
          >
            <Target className="size-4" />
            Pick
          </button>
          <button
            onClick={() => switchMode("groups")}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-semibold transition ${
              mode === "groups" ? "text-white" : "text-slate-600 hover:bg-slate-50"
            }`}
            style={mode === "groups" ? { backgroundColor: ACCENT } : undefined}
          >
            <Users className="size-4" />
            Groups
          </button>
        </div>
      }
    >
      {mode === "pick" ? (
        <div className="grid gap-5 md:grid-cols-[1fr_260px]">
          <div className="flex flex-col items-center gap-5">
            {/* Winner stage */}
            <div
              className="flex min-h-44 w-full items-center justify-center rounded-2xl border p-6 text-center shadow-inner transition-colors"
              style={{
                borderColor: winner ? ACCENT : "rgba(0,0,0,0.1)",
                backgroundColor: winner ? `${ACCENT}14` : "#fff",
              }}
            >
              {poolEmpty ? (
                <div className="text-slate-500">
                  <p className="text-lg font-semibold">Everyone has been picked!</p>
                  <p className="mt-1 text-sm">Hit Restart to refill the pool.</p>
                </div>
              ) : display ? (
                <span
                  key={display + (spinning ? "spin" : "set")}
                  className={`break-words text-4xl font-extrabold transition-transform sm:text-5xl ${
                    spinning ? "opacity-70" : "scale-110"
                  }`}
                  style={{
                    color: winner ? ACCENT : "#334155",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {display}
                </span>
              ) : (
                <span className="text-lg text-slate-400">Tap below to pick a name</span>
              )}
            </div>

            {winner && !spinning && (
              <p className="text-sm font-semibold" style={{ color: ACCENT }}>
                🎉 {winner} is up!
              </p>
            )}

            <PlayButton
              accent={ACCENT}
              onClick={pick}
              disabled={spinning || poolEmpty}
              className="w-full max-w-xs py-3 text-base"
            >
              {spinning ? "Picking…" : poolEmpty ? "Pool empty" : "🎯 Pick a name"}
            </PlayButton>

            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600">
              <input
                type="checkbox"
                checked={removeAfter}
                onChange={(e) => setRemoveAfter(e.target.checked)}
                className="size-4 rounded border-slate-300"
                style={{ accentColor: ACCENT }}
              />
              Remove after picking
            </label>
          </div>

          {/* Pool + history */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-black/10 bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Pool
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  {pool.length}
                </span>
              </div>
              <div className="flex max-h-48 flex-wrap gap-1.5 overflow-y-auto">
                {pool.length === 0 ? (
                  <span className="text-xs text-slate-400">No names left.</span>
                ) : (
                  pool.map((name, idx) => (
                    <span
                      key={`${name}-${idx}`}
                      className="group inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {name}
                      <button
                        onClick={() => removeFromPool(name)}
                        className="text-slate-400 transition hover:text-rose-500"
                        aria-label={`Remove ${name}`}
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {history.length > 0 && (
              <div className="rounded-xl border border-black/10 bg-white p-3 shadow-sm">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                  Picked
                </div>
                <ol className="flex max-h-40 flex-col gap-1 overflow-y-auto text-sm text-slate-700">
                  {history.map((name, idx) => (
                    <li key={`${name}-${idx}`} className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">
                        {history.length - idx}.
                      </span>
                      <span className={idx === 0 ? "font-semibold" : ""}>{name}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end gap-4 rounded-xl border border-black/10 bg-white p-4 shadow-sm">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-600">
              Number of groups
              <input
                type="number"
                min={1}
                max={Math.max(1, fullList.length)}
                value={groupCount}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10)
                  setGroupCount(Number.isNaN(v) ? 1 : Math.max(1, v))
                }}
                className="w-28 rounded-lg border border-slate-300 px-3 py-1.5 text-base font-semibold text-slate-800 outline-none focus:border-slate-400"
                style={{ accentColor: ACCENT }}
              />
            </label>
            <PlayButton accent={ACCENT} onClick={makeGroups} className="py-2">
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-4" />
                Make groups
              </span>
            </PlayButton>
            <span className="text-sm text-slate-500">
              {fullList.length} names total
            </span>
          </div>

          {groups.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/15 bg-white p-10 text-center text-slate-400">
              Set a number and hit{" "}
              <span className="font-semibold" style={{ color: ACCENT }}>
                Make groups
              </span>{" "}
              to shuffle everyone into balanced teams.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((members, gi) => (
                <div
                  key={gi}
                  className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm"
                >
                  <div
                    className="flex items-center justify-between px-3 py-2 text-sm font-bold text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <span>Group {gi + 1}</span>
                    <span className="rounded-full bg-white/25 px-2 text-xs">
                      {members.length}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1 p-3 text-sm text-slate-700">
                    {members.map((name, mi) => (
                      <li
                        key={`${name}-${mi}`}
                        className="rounded-md bg-slate-50 px-2.5 py-1 font-medium"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "name-picker",
  name: "Random Name Picker",
  blurb: "Pick a random name — or split the list into fair groups.",
  icon: "🎯",
  category: "Random & Pickers",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Column: Name (one per row). First row is headers.",
  sample,
  parse,
  Component: NamePicker,
})
