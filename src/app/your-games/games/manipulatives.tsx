"use client"

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { Shuffle, Undo2 } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame } from "./ui"

interface Data {
  tiles: string[]
}

const ACCENT = "#7c5cbf"

// A palette of friendly chip colours, assigned round-robin to tiles.
const PALETTE = [
  "#7c5cbf",
  "#e07a5f",
  "#3d9970",
  "#2f80ed",
  "#d6336c",
  "#f2994a",
  "#9b51e0",
  "#10a5b5",
]

function parse(rows: Rows): Data {
  if (!Array.isArray(rows) || rows.length < 2) return sample
  const tiles = rows
    .slice(1)
    .map((r) => (Array.isArray(r) ? (r[0] || "").trim() : ""))
    .filter((t) => t.length > 0)
  return { tiles: tiles.length ? tiles : sample.tiles }
}

const sample: Data = {
  tiles: [
    "The",
    "quick",
    "brown",
    "fox",
    "jumps",
    "over",
    "the",
    "lazy",
    "dog",
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
  ],
}

// Position of a tile that has been dropped onto the workspace (relative to the
// workspace's top-left corner). Tiles without a position live in the tray.
interface Placed {
  x: number
  y: number
}

const TILE_W = 104
const TILE_H = 44

function Manipulatives({ data }: { data: Data }) {
  const tiles = data.tiles.length ? data.tiles : sample.tiles

  const workspaceRef = useRef<HTMLDivElement>(null)
  // Map of tile index -> placement. Absent => still in the tray.
  const [placed, setPlaced] = useState<Record<number, Placed>>({})
  // Index of the tile currently being dragged (null when idle).
  const [dragging, setDragging] = useState<number | null>(null)
  // Pointer offset within the tile so dragging feels anchored to the grab point.
  const grabOffset = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 })
  // Track the workspace size so shuffling/clamping stays inside bounds.
  const [bounds, setBounds] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  useEffect(() => {
    const el = workspaceRef.current
    if (!el) return
    const measure = () => setBounds({ w: el.clientWidth, h: el.clientHeight })
    measure()
    if (typeof window === "undefined") return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const clamp = (x: number, y: number, b: { w: number; h: number }) => ({
    x: Math.max(0, Math.min(x, Math.max(0, b.w - TILE_W))),
    y: Math.max(0, Math.min(y, Math.max(0, b.h - TILE_H))),
  })

  // Capture the pointer on the persistent workspace element (not the tile),
  // so a tray tile that re-mounts onto the board keeps receiving move events.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>, idx: number) => {
    const ws = workspaceRef.current
    if (!ws) return
    e.preventDefault()
    e.stopPropagation()
    const rect = ws.getBoundingClientRect()
    const current = placed[idx]
    if (current) {
      // Grabbing a tile already on the workspace: keep the cursor anchor.
      grabOffset.current = {
        dx: e.clientX - rect.left - current.x,
        dy: e.clientY - rect.top - current.y,
      }
    } else {
      // Grabbing a tray tile: anchor to its centre as it lifts off.
      grabOffset.current = { dx: TILE_W / 2, dy: TILE_H / 2 }
      const dropped = clamp(
        e.clientX - rect.left - TILE_W / 2,
        e.clientY - rect.top - TILE_H / 2,
        bounds,
      )
      setPlaced((prev) => ({ ...prev, [idx]: dropped }))
    }
    setDragging(idx)
    ws.setPointerCapture(e.pointerId)
  }

  // Bound on the workspace container, which owns the captured pointer.
  const onWorkspaceMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging === null) return
    const ws = workspaceRef.current
    if (!ws) return
    const rect = ws.getBoundingClientRect()
    const idx = dragging
    const next = clamp(
      e.clientX - rect.left - grabOffset.current.dx,
      e.clientY - rect.top - grabOffset.current.dy,
      bounds,
    )
    setPlaced((prev) => ({ ...prev, [idx]: next }))
  }

  const onWorkspaceUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging === null) return
    setDragging(null)
    const ws = workspaceRef.current
    if (ws && ws.hasPointerCapture(e.pointerId)) {
      ws.releasePointerCapture(e.pointerId)
    }
  }

  // Scatter every tile across the workspace (in a handler, never during render).
  const shuffle = () => {
    const b = bounds.w && bounds.h ? bounds : { w: 640, h: 400 }
    const next: Record<number, Placed> = {}
    for (let i = 0; i < tiles.length; i++) {
      const x = Math.random() * Math.max(1, b.w - TILE_W)
      const y = Math.random() * Math.max(1, b.h - TILE_H)
      next[i] = clamp(x, y, b)
    }
    setPlaced(next)
  }

  const resetToTray = () => {
    setPlaced({})
    setDragging(null)
  }

  const placedCount = Object.keys(placed).length
  const trayIndices = tiles
    .map((_, i) => i)
    .filter((i) => !(i in placed))

  return (
    <GameFrame
      title="Manipulatives"
      accent={ACCENT}
      onRestart={resetToTray}
      toolbar={
        <button
          onClick={shuffle}
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Shuffle className="size-4" />
          Shuffle
        </button>
      }
    >
      <div className="mb-3 flex items-center justify-between text-sm text-slate-500">
        <span>Drag tiles onto the board to sort, order &amp; build.</span>
        <span className="tabular-nums">
          {placedCount} / {tiles.length} placed
        </span>
      </div>

      {/* Workspace — the free canvas where placed tiles live. */}
      <div
        ref={workspaceRef}
        onPointerMove={onWorkspaceMove}
        onPointerUp={onWorkspaceUp}
        onPointerCancel={onWorkspaceUp}
        className="relative h-[26rem] w-full overflow-hidden rounded-2xl border-2 border-dashed shadow-inner"
        style={{
          borderColor: `${ACCENT}55`,
          backgroundColor: `${ACCENT}0d`,
          backgroundImage:
            `linear-gradient(${ACCENT}14 1px, transparent 1px), linear-gradient(90deg, ${ACCENT}14 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          touchAction: "none",
        }}
      >
        {placedCount === 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
            <span className="text-sm font-medium text-slate-400">
              Drag tiles up here, then rearrange them freely.
            </span>
          </div>
        )}

        {tiles.map((label, idx) => {
          const pos = placed[idx]
          if (!pos) return null
          const isDragging = dragging === idx
          return (
            <div
              key={idx}
              onPointerDown={(e) => onPointerDown(e, idx)}
              className="absolute flex select-none items-center justify-center rounded-full px-3 text-center text-sm font-semibold text-white shadow-md"
              style={{
                left: pos.x,
                top: pos.y,
                width: TILE_W,
                height: TILE_H,
                backgroundColor: PALETTE[idx % PALETTE.length],
                cursor: isDragging ? "grabbing" : "grab",
                zIndex: isDragging ? 30 : 10,
                transform: isDragging ? "scale(1.08)" : "scale(1)",
                boxShadow: isDragging
                  ? "0 10px 24px rgba(0,0,0,0.25)"
                  : "0 2px 6px rgba(0,0,0,0.15)",
                transition: isDragging ? "none" : "transform 120ms ease, box-shadow 120ms ease",
                touchAction: "none",
              }}
            >
              <span className="truncate">{label}</span>
            </div>
          )
        })}
      </div>

      {/* Tray — the source of tiles not yet on the board. */}
      <div className="mt-4 rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Tray
          </span>
          <button
            onClick={resetToTray}
            disabled={placedCount === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Undo2 className="size-3.5" />
            Reset to tray
          </button>
        </div>

        {trayIndices.length === 0 ? (
          <p className="py-2 text-center text-sm text-slate-400">
            All tiles are on the board.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {trayIndices.map((idx) => (
              <div
                key={idx}
                onPointerDown={(e) => onPointerDown(e, idx)}
                className="flex h-11 min-w-[5rem] max-w-[12rem] cursor-grab select-none items-center justify-center rounded-full px-3 text-center text-sm font-semibold text-white shadow-md transition hover:scale-105 active:cursor-grabbing"
                style={{
                  backgroundColor: PALETTE[idx % PALETTE.length],
                  touchAction: "none",
                }}
              >
                <span className="truncate">{tiles[idx]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "manipulatives",
  name: "Manipulatives",
  blurb: "Drag tiles freely to sort, order & build.",
  icon: "🧲",
  category: "Creative",
  accent: ACCENT,
  status: "ready",
  schemaHint: "Column: Tile label (one per row). First row is headers.",
  sample,
  parse,
  Component: Manipulatives,
})
