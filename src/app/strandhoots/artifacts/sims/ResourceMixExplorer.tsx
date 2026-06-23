"use client"

import { useMemo, useState } from "react"

// Crit D impact explorer: build a national electricity mix and see the
// environmental (CO₂), economic (cost) and reliability (dispatchability)
// trade-offs. Figures are representative IPCC/IEA lifecycle values.
interface Source {
  id: string
  label: string
  color: string
  co2: number // gCO₂eq / kWh (lifecycle)
  cost: number // $ / MWh (levelised)
  dispatch: number // 0..1 how controllable the output is
  renewable: boolean
}

const SOURCES: Source[] = [
  { id: "coal", label: "Coal", color: "#475569", co2: 820, cost: 110, dispatch: 1, renewable: false },
  { id: "gas", label: "Gas", color: "#a16207", co2: 490, cost: 70, dispatch: 1, renewable: false },
  { id: "nuclear", label: "Nuclear", color: "#7c3aed", co2: 12, cost: 160, dispatch: 1, renewable: false },
  { id: "hydro", label: "Hydro", color: "#0891b2", co2: 24, cost: 50, dispatch: 0.8, renewable: true },
  { id: "wind", label: "Wind", color: "#0d9488", co2: 11, cost: 40, dispatch: 0.2, renewable: true },
  { id: "solar", label: "Solar", color: "#f59e0b", co2: 45, cost: 38, dispatch: 0.15, renewable: true },
]

export default function ResourceMixExplorer({ accent = "#7c5cbf" }: { accent?: string }) {
  const [mix, setMix] = useState<Record<string, number>>({
    coal: 30, gas: 25, nuclear: 15, hydro: 10, wind: 12, solar: 8,
  })

  const total = Object.values(mix).reduce((a, b) => a + b, 0) || 1
  const share = (id: string) => mix[id] / total

  const metrics = useMemo(() => {
    let co2 = 0, cost = 0, dispatch = 0, renew = 0
    for (const s of SOURCES) {
      const w = share(s.id)
      co2 += w * s.co2
      cost += w * s.cost
      dispatch += w * s.dispatch
      if (s.renewable) renew += w
    }
    return { co2, cost, dispatch, renew }
  }, [mix]) // eslint-disable-line react-hooks/exhaustive-deps

  const verdict = (() => {
    const lowCarbon = metrics.co2 < 150
    const reliable = metrics.dispatch > 0.5
    if (lowCarbon && reliable) return { text: "Low-carbon AND reliable — but check the cost.", tone: "#059669" }
    if (lowCarbon && !reliable) return { text: "Clean, but intermittent — needs storage/backup for windless, dark days.", tone: "#d97706" }
    if (!lowCarbon && reliable) return { text: "Reliable, but high CO₂ — a climate cost.", tone: "#dc2626" }
    return { text: "High CO₂ and unreliable — the worst of both.", tone: "#dc2626" }
  })()

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      {/* Stacked mix bar */}
      <div className="mb-1 flex h-7 w-full overflow-hidden rounded-lg">
        {SOURCES.map((s) => {
          const pct = share(s.id) * 100
          return pct > 0 ? (
            <div key={s.id} style={{ width: `${pct}%`, background: s.color }} title={`${s.label} ${pct.toFixed(0)}%`} />
          ) : null
        })}
      </div>
      <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
        {SOURCES.map((s) => (
          <span key={s.id} className="inline-flex items-center gap-1">
            <span className="inline-block size-2.5 rounded-sm" style={{ background: s.color }} />
            {s.label} {(share(s.id) * 100).toFixed(0)}%
          </span>
        ))}
      </div>

      {/* Sliders */}
      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        {SOURCES.map((s) => (
          <label key={s.id} className="text-sm">
            <span className="flex justify-between font-medium text-slate-600">
              {s.label} {s.renewable && <span className="text-[10px] text-emerald-600">renewable</span>}
            </span>
            <input
              type="range" min={0} max={100} step={1}
              value={mix[s.id]}
              onChange={(e) => setMix((m) => ({ ...m, [s.id]: +e.target.value }))}
              className="w-full"
              style={{ accentColor: s.color }}
            />
          </label>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <Metric label="CO₂ intensity" value={`${metrics.co2.toFixed(0)}`} unit="g/kWh" good={metrics.co2 < 150} bad={metrics.co2 > 500} />
        <Metric label="Cost" value={`$${metrics.cost.toFixed(0)}`} unit="/MWh" good={metrics.cost < 70} bad={metrics.cost > 120} />
        <Metric label="Dispatchable" value={`${(metrics.dispatch * 100).toFixed(0)}%`} unit="reliable" good={metrics.dispatch > 0.6} bad={metrics.dispatch < 0.35} />
      </div>

      <p className="mt-3 rounded-lg px-3 py-2 text-sm font-semibold" style={{ background: `${verdict.tone}1a`, color: verdict.tone }}>
        {verdict.text}
      </p>
      <p className="mt-1 text-xs text-slate-500">Renewable share: {(metrics.renew * 100).toFixed(0)}%</p>
    </div>
  )
}

function Metric({ label, value, unit, good, bad }: { label: string; value: string; unit: string; good?: boolean; bad?: boolean }) {
  const color = good ? "#059669" : bad ? "#dc2626" : "#475569"
  return (
    <div className="rounded-xl border border-black/10 bg-slate-50 px-2 py-3">
      <div className="text-xl font-extrabold" style={{ color }}>{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-slate-400">{unit}</div>
      <div className="mt-1 text-xs font-medium text-slate-600">{label}</div>
    </div>
  )
}
