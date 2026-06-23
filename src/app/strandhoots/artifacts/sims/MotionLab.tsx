"use client"

import { useEffect, useRef, useState } from "react"
import { CartesianGrid, Line, LineChart, ReferenceDot, ResponsiveContainer, XAxis, YAxis, Label } from "recharts"
import { Pause, Play, RotateCcw } from "lucide-react"

// Crit A concept explorer: change u and a, watch the object move and the
// position–time / velocity–time graphs build. s = ut + ½at², v = u + at.
const DUR = 8 // seconds simulated

export default function MotionLab({ accent = "#1b7888" }: { accent?: string }) {
  const [u, setU] = useState(4)
  const [a, setA] = useState(1)
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(false)
  const raf = useRef<number | null>(null)
  const last = useRef<number | null>(null)

  useEffect(() => {
    if (!playing) return
    const step = (ts: number) => {
      if (last.current == null) last.current = ts
      const dt = (ts - last.current) / 1000
      last.current = ts
      setT((prev) => {
        const next = prev + dt
        if (next >= DUR) {
          setPlaying(false)
          return DUR
        }
        return next
      })
      raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      last.current = null
    }
  }, [playing])

  const s = (tt: number) => u * tt + 0.5 * a * tt * tt
  const v = (tt: number) => u + a * tt

  const curve = Array.from({ length: 81 }, (_, i) => {
    const tt = (i / 80) * DUR
    return { t: +tt.toFixed(2), s: +s(tt).toFixed(2), v: +v(tt).toFixed(2) }
  })

  // Map displacement to track position. Car starts at 10% (non-zero u is visible
  // from the first frame) and can travel up to 90% of the track width.
  const allS = curve.map((c) => Math.abs(c.s))
  const maxS = Math.max(1, ...allS)
  const trackPct = 10 + Math.max(0, Math.min(80, (s(t) / maxS) * 80))

  const reset = () => {
    setPlaying(false)
    setT(0)
    last.current = null
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      {/* Track */}
      <div className="relative mb-4 h-16 overflow-hidden rounded-xl bg-slate-100">
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-slate-300" />
        <div
          className="absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-lg shadow"
          style={{ left: `calc(${trackPct}% - 18px)`, background: accent, color: "#fff", willChange: "left" }}
        >
          🚗
        </div>
        {/* Velocity vector arrow — length scales with v(t) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `calc(${trackPct}% + 18px)` }}
        >
          {v(t) > 0.2 && (
            <div className="flex items-center gap-0.5" style={{ color: accent }}>
              <div className="h-0.5 bg-current" style={{ width: Math.min(40, v(t) * 3) }} />
              <span className="text-[8px] font-mono leading-none">▶</span>
            </div>
          )}
        </div>
        <span className="absolute bottom-1 right-2 font-mono text-xs text-slate-500">
          t={t.toFixed(1)}s · s={s(t).toFixed(1)}m · v={v(t).toFixed(1)}m/s
        </span>
      </div>

      {/* Controls */}
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="flex justify-between font-medium text-slate-600">
            Initial velocity u <span className="font-mono">{u} m/s</span>
          </span>
          <input type="range" min={-10} max={20} step={1} value={u} onChange={(e) => { setU(+e.target.value); reset() }} className="w-full" style={{ accentColor: accent }} />
        </label>
        <label className="text-sm">
          <span className="flex justify-between font-medium text-slate-600">
            Acceleration a <span className="font-mono">{a} m/s²</span>
          </span>
          <input type="range" min={-5} max={5} step={0.5} value={a} onChange={(e) => { setA(+e.target.value); reset() }} className="w-full" style={{ accentColor: accent }} />
        </label>
      </div>

      <div className="mb-3 flex gap-2">
        <button onClick={() => setPlaying((p) => !p)} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-white" style={{ background: accent }}>
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          {playing ? "Pause" : "Play"}
        </button>
        <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-black/5">
          <RotateCcw className="size-4" /> Reset
        </button>
      </div>

      {/* Graphs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Graph title="Position–time" data={curve} dataKey="s" yLabel="s (m)" t={t} y={s(t)} accent={accent} />
        <Graph title="Velocity–time" data={curve} dataKey="v" yLabel="v (m/s)" t={t} y={v(t)} accent={accent} />
      </div>
    </div>
  )
}

function Graph({
  title, data, dataKey, yLabel, t, y, accent,
}: {
  title: string
  data: { t: number; s: number; v: number }[]
  dataKey: "s" | "v"
  yLabel: string
  t: number
  y: number
  accent: string
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-bold text-slate-500">{title}</p>
      <div className="h-44">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 6, right: 12, bottom: 20, left: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="t" type="number" domain={[0, DUR]} tick={{ fontSize: 10 }}>
              <Label value="t (s)" offset={-12} position="insideBottom" style={{ fontSize: 10, fill: "#64748b" }} />
            </XAxis>
            <YAxis tick={{ fontSize: 10 }}>
              <Label value={yLabel} angle={-90} position="insideLeft" style={{ fontSize: 10, fill: "#64748b" }} />
            </YAxis>
            <Line dataKey={dataKey} stroke={accent} strokeWidth={2} dot={false} isAnimationActive={false} />
            <ReferenceDot x={t} y={y} r={4} fill={accent} stroke="#fff" strokeWidth={1.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
