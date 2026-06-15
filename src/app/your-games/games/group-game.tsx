"use client"

import { useEffect, useMemo, useState } from "react"
import { Check, X } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

interface Item {
  item: string
  group: string
}
interface Data {
  items: Item[]
}

const ACCENT = "#e0962f"

// A pleasant palette cycled across the group bins for visual distinction.
const BIN_COLORS = [
  "#e0962f",
  "#2f7de0",
  "#3fae6a",
  "#d24b6f",
  "#7b5cd6",
  "#2fb6c4",
  "#e0652f",
  "#9aa72f",
]

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const items = rows
    .slice(1)
    .map((r) =>
      Array.isArray(r)
        ? {
            item: (r[0] ?? "").toString().trim(),
            group: (r[1] ?? "").toString().trim(),
          }
        : { item: "", group: "" },
    )
    .filter((it) => it.item && it.group)
  // Need at least one item and at least two distinct groups to be a real game.
  const distinct = new Set(items.map((it) => it.group))
  return items.length >= 1 && distinct.size >= 1 ? { items } : sample
}

const sample: Data = {
  items: [
    { item: "Dog", group: "Mammals" },
    { item: "Whale", group: "Mammals" },
    { item: "Bat", group: "Mammals" },
    { item: "Eagle", group: "Birds" },
    { item: "Penguin", group: "Birds" },
    { item: "Owl", group: "Birds" },
    { item: "Salmon", group: "Fish" },
    { item: "Shark", group: "Fish" },
    { item: "Frog", group: "Amphibians" },
    { item: "Salamander", group: "Amphibians" },
  ],
}

// Fisher–Yates shuffle returning a new array (called only inside effects).
function shuffled<T>(arr: T[]): T[] {
  const next = [...arr]
  for (let k = next.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1))
    ;[next[k], next[j]] = [next[j], next[k]]
  }
  return next
}

const TRAY = "__tray__"

function GroupGame({ data }: { data: Data }) {
  const items = data.items.length ? data.items : sample.items

  // Distinct groups in first-seen order become the labelled bins.
  const groups = useMemo(() => {
    const seen: string[] = []
    for (const it of items) if (!seen.includes(it.group)) seen.push(it.group)
    return seen
  }, [items])

  // placement[i] = group name the item is in, or TRAY if still unsorted.
  const [placement, setPlacement] = useState<string[]>(() => items.map(() => TRAY))
  // Order of unsorted items in the tray (indices into `items`). Shuffled on mount.
  const [trayOrder, setTrayOrder] = useState<number[]>(() => items.map((_, i) => i))
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  // Hydration-safe: shuffle the tray only after mount, never during render.
  useEffect(() => {
    setPlacement(items.map(() => TRAY))
    setTrayOrder(shuffled(items.map((_, i) => i)))
    setSelected(null)
    setChecked(false)
  }, [items])

  const placedCount = useMemo(
    () => placement.filter((p) => p !== TRAY).length,
    [placement],
  )
  const allPlaced = items.length > 0 && placedCount === items.length

  const score = useMemo(
    () =>
      placement.reduce(
        (sum, p, i) => sum + (p !== TRAY && p === items[i].group ? 1 : 0),
        0,
      ),
    [placement, items],
  )
  const allCorrect = checked && score === items.length

  const trayItems = trayOrder.filter((i) => placement[i] === TRAY)

  const colorFor = (group: string) =>
    BIN_COLORS[Math.max(0, groups.indexOf(group)) % BIN_COLORS.length]

  // Click an item to select it; click again to deselect.
  const selectItem = (i: number) => {
    if (checked) return
    setSelected((prev) => (prev === i ? null : i))
  }

  // Drop the currently selected item into a target ("group name" or TRAY).
  const dropInto = (target: string) => {
    if (selected === null || checked) return
    setPlacement((prev) => {
      const next = [...prev]
      next[selected] = target
      return next
    })
    setSelected(null)
  }

  const check = () => {
    if (!allPlaced) return
    setChecked(true)
    setSelected(null)
  }

  const reveal = () => {
    setPlacement(items.map((it) => it.group))
    setChecked(true)
    setSelected(null)
  }

  const restart = () => {
    setPlacement(items.map(() => TRAY))
    setTrayOrder(shuffled(items.map((_, i) => i)))
    setSelected(null)
    setChecked(false)
  }

  if (items.length === 0 || groups.length === 0) {
    return (
      <GameFrame title="Group Game" accent={ACCENT}>
        <p className="text-center text-slate-500">Add items and groups to start sorting.</p>
      </GameFrame>
    )
  }

  // A placed item chip. Coloured by correctness once checked.
  const itemChip = (i: number, placed: boolean) => {
    const isSel = selected === i
    let stateClasses =
      "border-black/10 bg-white text-slate-800 hover:border-black/20 hover:bg-slate-50"
    let icon: React.ReactNode = null
    if (placed && checked) {
      const right = placement[i] === items[i].group
      stateClasses = right
        ? "border-green-300 bg-green-50 text-green-800"
        : "border-red-300 bg-red-50 text-red-800"
      icon = right ? (
        <Check className="size-3.5 shrink-0" />
      ) : (
        <X className="size-3.5 shrink-0" />
      )
    } else if (isSel) {
      stateClasses = "text-white shadow-md"
    }
    return (
      <button
        key={i}
        onClick={() => selectItem(i)}
        disabled={checked}
        aria-pressed={isSel}
        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-semibold shadow-sm transition disabled:cursor-default ${stateClasses}`}
        style={isSel && !checked ? { backgroundColor: ACCENT, borderColor: ACCENT } : undefined}
      >
        {icon}
        <span className="truncate">{items[i].item}</span>
      </button>
    )
  }

  return (
    <GameFrame
      title="Group Game"
      accent={ACCENT}
      onRestart={restart}
      toolbar={
        checked ? (
          <span
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-bold text-white shadow-sm"
            style={{ backgroundColor: allCorrect ? "#16a34a" : ACCENT }}
          >
            {allCorrect && <Check className="size-4" />}
            {score}/{items.length}
          </span>
        ) : (
          <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-slate-500 shadow-sm">
            {placedCount}/{items.length} placed
          </span>
        )
      }
    >
      {/* Instructions / result banner */}
      <div className="mb-4 min-h-[2.75rem]">
        {checked ? (
          <div
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center text-sm font-bold text-white shadow-md"
            style={{ backgroundColor: allCorrect ? "#16a34a" : ACCENT }}
          >
            {allCorrect ? (
              <>
                <span className="text-base">🎉</span>
                Perfect! All {items.length} sorted correctly.
              </>
            ) : (
              <>You scored {score} of {items.length}. Restart to try again, or Reveal the answers.</>
            )}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-center text-sm text-slate-500">
            {selected !== null
              ? "Now click a group to drop it in (or the tray to send it back)."
              : "Click an item to pick it up, then click the group it belongs to."}
          </p>
        )}
      </div>

      {/* Unsorted tray */}
      <button
        type="button"
        onClick={() => dropInto(TRAY)}
        disabled={checked || selected === null}
        aria-label="Unsorted tray — drop selected item here"
        className={`mb-5 block w-full rounded-2xl border-2 p-4 text-left transition disabled:cursor-default ${
          selected !== null && !checked && placement[selected] !== TRAY
            ? "border-dashed border-slate-400 bg-slate-50"
            : "border-dashed border-slate-200 bg-slate-50/60"
        }`}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Unsorted
          </span>
          <span className="text-xs font-semibold text-slate-400">{trayItems.length} left</span>
        </div>
        <div className="flex min-h-[2.5rem] flex-wrap items-center gap-2">
          {trayItems.length ? (
            trayItems.map((i) => itemChip(i, false))
          ) : (
            <span className="text-sm text-slate-400">All items placed — press Check!</span>
          )}
        </div>
      </button>

      {/* Group bins — wrap responsively */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => {
          const color = colorFor(g)
          const binItems = placement
            .map((p, i) => (p === g ? i : -1))
            .filter((i) => i >= 0)
          const isDropTarget = selected !== null && !checked && placement[selected] !== g
          return (
            <button
              key={g}
              type="button"
              onClick={() => dropInto(g)}
              disabled={checked || !isDropTarget}
              aria-label={`Group ${g}`}
              className={`flex min-h-[7rem] flex-col rounded-2xl border-2 bg-white p-3 text-left shadow-sm transition disabled:cursor-default ${
                isDropTarget ? "ring-2 ring-offset-1" : ""
              }`}
              style={{
                borderColor: color,
                ...(isDropTarget ? ({ "--tw-ring-color": color } as React.CSSProperties) : {}),
              }}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span
                  className="truncate rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white"
                  style={{ backgroundColor: color }}
                >
                  {g}
                </span>
                <span className="shrink-0 text-xs font-semibold text-slate-400">
                  {binItems.length}
                </span>
              </div>
              <div className="flex flex-1 flex-wrap content-start items-start gap-2">
                {binItems.length ? (
                  binItems.map((i) => itemChip(i, true))
                ) : (
                  <span className="text-xs text-slate-300">Drop items here</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {!checked ? (
          <>
            <PlayButton accent={ACCENT} onClick={check} disabled={!allPlaced} className="px-6">
              Check {allPlaced ? "" : `(${items.length - placedCount} left)`}
            </PlayButton>
            <button
              onClick={reveal}
              className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Reveal
            </button>
          </>
        ) : (
          <PlayButton accent={ACCENT} onClick={restart} className="px-6">
            Play again
          </PlayButton>
        )}
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "group-game",
  name: "Group Game",
  blurb: "Sort items into the correct groups.",
  icon: "👥",
  category: "Random & Pickers",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Columns: Item | Correct group. First row is headers.",
  sample,
  parse,
  Component: GroupGame,
})
