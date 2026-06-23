"use client"

import { useMemo, useState } from "react"
import {
  CartesianGrid,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
  Label,
} from "recharts"

// Predefined, serializable linearizations (content packs can't ship functions).
type AxisX = "x" | "x^2" | "1/x" | "sqrt(x)"
type AxisY = "y" | "ln(y)" | "1/y"
interface Transform {
  id: string
  label: string
  x: AxisX
  y: AxisY
  xLabel: string
  yLabel: string
}

export interface DataProcessorProps {
  title?: string
  xLabel: string
  yLabel: string
  initialRows: { x: number; y: number }[]
  editable?: boolean
  /** Linearization buttons. First is the default view. */
  transforms?: Transform[]
  /** Derive a physical quantity from the best-fit of the *current* transform. */
  derive?: { kind: "gradient" | "intercept" | "x-intercept" | "half-life"; label: string; unit?: string }
  accent?: string
}

const applyX = (x: number, t: AxisX) =>
  t === "x^2" ? x * x : t === "1/x" ? 1 / x : t === "sqrt(x)" ? Math.sqrt(x) : x
const applyY = (y: number, t: AxisY) => (t === "ln(y)" ? Math.log(y) : t === "1/y" ? 1 / y : y)

function leastSquares(pts: { x: number; y: number }[]) {
  const n = pts.length
  if (n < 2) return null
  const sx = pts.reduce((a, p) => a + p.x, 0)
  const sy = pts.reduce((a, p) => a + p.y, 0)
  const sxx = pts.reduce((a, p) => a + p.x * p.x, 0)
  const sxy = pts.reduce((a, p) => a + p.x * p.y, 0)
  const d = n * sxx - sx * sx
  if (Math.abs(d) < 1e-12) return null
  const m = (n * sxy - sx * sy) / d
  const b = (sy - m * sx) / n
  // r²
  const my = sy / n
  const ssTot = pts.reduce((a, p) => a + (p.y - my) ** 2, 0)
  const ssRes = pts.reduce((a, p) => a + (p.y - (m * p.x + b)) ** 2, 0)
  const r2 = ssTot < 1e-12 ? 1 : 1 - ssRes / ssTot
  return { m, b, r2 }
}

const fmt = (v: number) => (Math.abs(v) >= 100 || (Math.abs(v) < 0.01 && v !== 0) ? v.toExponential(2) : v.toFixed(3))

export default function DataProcessor({
  title,
  xLabel,
  yLabel,
  initialRows,
  editable = true,
  transforms,
  derive,
  accent = "#d85140",
}: DataProcessorProps) {
  const [rows, setRows] = useState(initialRows)
  const tfs: Transform[] = transforms ?? [{ id: "raw", label: "Raw data", x: "x", y: "y", xLabel, yLabel }]
  const [tfId, setTfId] = useState(tfs[0].id)
  const tf = tfs.find((t) => t.id === tfId) ?? tfs[0]

  const points = useMemo(
    () =>
      rows
        .filter((r) => Number.isFinite(r.x) && Number.isFinite(r.y))
        .map((r) => ({ x: applyX(r.x, tf.x), y: applyY(r.y, tf.y) }))
        .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y)),
    [rows, tf],
  )
  const fit = useMemo(() => leastSquares(points), [points])

  const fitLine = useMemo(() => {
    if (!fit || points.length < 2) return []
    const xs = points.map((p) => p.x)
    const min = Math.min(...xs)
    const max = Math.max(...xs)
    return [
      { x: min, fit: fit.m * min + fit.b },
      { x: max, fit: fit.m * max + fit.b },
    ]
  }, [fit, points])

  const chartData = useMemo(() => {
    const merged: Record<number, { x: number; y?: number; fit?: number }> = {}
    points.forEach((p) => (merged[p.x] = { ...merged[p.x], x: p.x, y: p.y }))
    fitLine.forEach((p) => (merged[p.x] = { ...merged[p.x], x: p.x, fit: p.fit }))
    return Object.values(merged).sort((a, b) => a.x - b.x)
  }, [points, fitLine])

  const derived = useMemo(() => {
    if (!fit || !derive) return null
    switch (derive.kind) {
      case "gradient":
        return fit.m
      case "intercept":
        return fit.b
      case "x-intercept":
        return fit.m === 0 ? null : -fit.b / fit.m
      case "half-life":
        // ln(N) = ln(N0) - λt → slope = -λ, t½ = ln2/λ. Only valid on the ln view.
        return tf.y === "ln(y)" && fit.m < 0 ? Math.LN2 / -fit.m : null
    }
  }, [fit, derive, tf])

  const update = (i: number, key: "x" | "y", val: string) => {
    const v = parseFloat(val)
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, [key]: Number.isNaN(v) ? NaN : v } : r)))
  }
  const addRow = () => setRows((rs) => [...rs, { x: NaN, y: NaN }])
  const delRow = (i: number) => setRows((rs) => rs.filter((_, idx) => idx !== i))

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      {title && <h4 className="mb-3 font-bold text-slate-800">{title}</h4>}

      <div className="grid gap-4 md:grid-cols-[minmax(0,260px)_1fr]">
        {/* Editable table */}
        <div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b px-2 py-1 text-left text-xs font-bold text-slate-500">{xLabel}</th>
                <th className="border-b px-2 py-1 text-left text-xs font-bold text-slate-500">{yLabel}</th>
                {editable && <th className="border-b px-1" />}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="border-b border-black/5 px-1 py-0.5">
                    <input
                      type="number"
                      value={Number.isNaN(r.x) ? "" : r.x}
                      onChange={(e) => update(i, "x", e.target.value)}
                      disabled={!editable}
                      className="w-full rounded border border-black/10 px-1.5 py-1 text-sm disabled:bg-slate-50"
                    />
                  </td>
                  <td className="border-b border-black/5 px-1 py-0.5">
                    <input
                      type="number"
                      value={Number.isNaN(r.y) ? "" : r.y}
                      onChange={(e) => update(i, "y", e.target.value)}
                      disabled={!editable}
                      className="w-full rounded border border-black/10 px-1.5 py-1 text-sm disabled:bg-slate-50"
                    />
                  </td>
                  {editable && (
                    <td className="px-1 text-center">
                      <button onClick={() => delRow(i)} className="text-xs text-slate-400 hover:text-rose-500">
                        ✕
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {editable && (
            <button
              onClick={addRow}
              className="mt-2 w-full rounded-lg border border-dashed border-black/20 py-1 text-xs font-semibold text-slate-500 hover:bg-black/5"
            >
              + Add row
            </button>
          )}
        </div>

        {/* Chart + readout */}
        <div>
          {tfs.length > 1 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {tfs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTfId(t.id)}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                    t.id === tfId ? "text-white" : "border border-black/10 text-slate-600 hover:bg-black/5"
                  }`}
                  style={t.id === tfId ? { background: accent } : undefined}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
          <div className="h-56 w-full">
            <ResponsiveContainer>
              <ComposedChart data={chartData} margin={{ top: 8, right: 16, bottom: 24, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="x" type="number" domain={["auto", "auto"]} tick={{ fontSize: 11 }}>
                  <Label value={tf.xLabel} offset={-14} position="insideBottom" style={{ fontSize: 11, fill: "#64748b" }} />
                </XAxis>
                <YAxis type="number" domain={["auto", "auto"]} tick={{ fontSize: 11 }}>
                  <Label value={tf.yLabel} angle={-90} position="insideLeft" style={{ fontSize: 11, fill: "#64748b" }} />
                </YAxis>
                <Tooltip formatter={(v: number) => fmt(v)} labelFormatter={(l) => `${tf.xLabel}: ${fmt(Number(l))}`} />
                <Scatter dataKey="y" fill={accent} />
                <Line dataKey="fit" stroke={accent} strokeWidth={2} dot={false} strokeDasharray="5 4" legendType="none" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {fit && (
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <span>
                best fit: <b>y = {fmt(fit.m)}·x + {fmt(fit.b)}</b>
              </span>
              <span>
                R² = <b>{fit.r2.toFixed(3)}</b>
              </span>
              {derived != null && (
                <span
                  className="rounded-full px-2.5 py-1 font-bold"
                  style={{ background: `${accent}1a`, color: accent }}
                >
                  {derive!.label}: {fmt(derived)} {derive!.unit ?? ""}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
