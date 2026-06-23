"use client"

import { useEffect, useRef, useState } from "react"
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis, Label, Tooltip } from "recharts"

// Crit B pilot-data bench: choose the length (IV), keep mass/amplitude fixed
// (CVs), time the swings (DV = period). T = 2π√(L/g). Records build a dataset
// the student can use to plan their own investigation.
const G = 9.81

export default function PendulumLab({ accent = "#58a65c" }: { accent?: string }) {
  const [length, setLength] = useState(1.0)
  const [mass, setMass] = useState(100) // g — control variable (no effect)
  const [amp, setAmp] = useState(15) // degrees — control variable
  const [t, setT] = useState(0)
  const [timing, setTiming] = useState(false)
  const [data, setData] = useState<{ x: number; y: number }[]>([])
  const raf = useRef<number | null>(null)
  const start = useRef<number | null>(null)

  const period = 2 * Math.PI * Math.sqrt(length / G)

  useEffect(() => {
    const step = (ts: number) => {
      if (start.current == null) start.current = ts
      setT((ts - start.current) / 1000)
      raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  // angle(t) = A·cos(2π t / T)
  const angle = (amp * Math.PI) / 180 * Math.cos((2 * Math.PI * t) / period)
  const pivotX = 150
  const pivotY = 20
  const armLen = 60 + length * 70
  const bobX = pivotX + armLen * Math.sin(angle)
  const bobY = pivotY + armLen * Math.cos(angle)
  const bobR = 8 + Math.cbrt(mass) * 0.8

  const record = () => {
    setTiming(true)
    // Simulate timing 10 swings then dividing by 10, with small human error.
    const noise = (Math.random() - 0.5) * 0.04 * period
    const measured = +(period + noise).toFixed(3)
    window.setTimeout(() => {
      setData((d) => [...d, { x: +length.toFixed(2), y: measured }].sort((p, q) => p.x - q.x))
      setTiming(false)
    }, 600)
  }

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Bench */}
        <div>
          <svg viewBox="0 0 300 220" className="w-full rounded-xl bg-slate-50">
            <rect x={70} y={12} width={160} height={8} rx={2} fill="#94a3b8" />
            <line x1={pivotX} y1={pivotY} x2={bobX} y2={bobY} stroke="#475569" strokeWidth={2} />
            <circle cx={bobX} cy={bobY} r={bobR} fill={accent} stroke="#fff" strokeWidth={2} />
            <circle cx={pivotX} cy={pivotY} r={3} fill="#475569" />
            <text x={150} y={210} textAnchor="middle" className="fill-slate-500" style={{ fontSize: 11 }}>
              T = {period.toFixed(2)} s
            </text>
          </svg>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          <label className="block text-sm">
            <span className="flex justify-between font-medium text-slate-600">
              Length L (independent) <span className="font-mono">{length.toFixed(2)} m</span>
            </span>
            <input type="range" min={0.2} max={2} step={0.05} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full" style={{ accentColor: accent }} />
          </label>
          <label className="block text-sm">
            <span className="flex justify-between font-medium text-slate-600">
              Bob mass (control) <span className="font-mono">{mass} g</span>
            </span>
            <input type="range" min={20} max={500} step={10} value={mass} onChange={(e) => setMass(+e.target.value)} className="w-full" style={{ accentColor: "#94a3b8" }} />
          </label>
          <label className="block text-sm">
            <span className="flex justify-between font-medium text-slate-600">
              Amplitude (control) <span className="font-mono">{amp}°</span>
            </span>
            <input type="range" min={5} max={30} step={1} value={amp} onChange={(e) => setAmp(+e.target.value)} className="w-full" style={{ accentColor: "#94a3b8" }} />
          </label>
          <button
            onClick={record}
            disabled={timing}
            className="w-full rounded-lg py-2 text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: accent }}
          >
            {timing ? "Timing 10 swings…" : "⏱ Time 10 swings & record"}
          </button>
        </div>
      </div>

      {/* Recorded data */}
      {data.length > 0 && (
        <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,200px)_1fr]">
          <div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs font-bold text-slate-500">
                  <th className="border-b px-2 py-1 text-left">L (m)</th>
                  <th className="border-b px-2 py-1 text-left">T (s)</th>
                  <th className="border-b px-1" />
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td className="border-b border-black/5 px-2 py-1 font-mono">{d.x.toFixed(2)}</td>
                    <td className="border-b border-black/5 px-2 py-1 font-mono">{d.y.toFixed(3)}</td>
                    <td className="px-1 text-center">
                      <button onClick={() => setData((arr) => arr.filter((_, idx) => idx !== i))} className="text-xs text-slate-400 hover:text-rose-500">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setData([])} className="mt-2 text-xs text-slate-400 hover:text-rose-500">Clear all</button>
          </div>
          <div className="h-48">
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 8, right: 12, bottom: 22, left: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="x" type="number" name="L" tick={{ fontSize: 10 }} domain={["auto", "auto"]}>
                  <Label value="Length (m)" offset={-12} position="insideBottom" style={{ fontSize: 10, fill: "#64748b" }} />
                </XAxis>
                <YAxis dataKey="y" type="number" name="T" tick={{ fontSize: 10 }} domain={["auto", "auto"]}>
                  <Label value="Period (s)" angle={-90} position="insideLeft" style={{ fontSize: 10, fill: "#64748b" }} />
                </YAxis>
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={data} fill={accent} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
