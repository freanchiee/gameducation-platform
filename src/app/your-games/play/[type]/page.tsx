"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Upload, Sparkles, Table2 } from "lucide-react"
import { getGame, getMeta } from "../../games/registry"
import { parseTabular, fetchSheetRows } from "../../games/parse"

export default function PlayPage() {
  const params = useParams<{ type: string }>()
  const mod = getGame(params.type)

  // All hooks run unconditionally (mod is stable per URL); branch afterwards.
  const [data, setData] = useState<unknown>(() => mod?.sample)
  const [open, setOpen] = useState(false)
  const [raw, setRaw] = useState("")
  const [sheet, setSheet] = useState("")
  const [err, setErr] = useState("")
  const [busy, setBusy] = useState(false)

  if (!mod) {
    const meta = getMeta(params.type)
    return (
      <div className="grid min-h-screen place-items-center bg-[#f6efca] px-6 text-center">
        <div>
          <div className="mb-3 text-5xl">{meta?.icon ?? "🎮"}</div>
          <h1 className="text-2xl font-bold text-[#1f306d]">{meta?.name ?? "Activity"} — coming soon</h1>
          <p className="mt-2 text-slate-600">{meta?.blurb ?? "This activity isn't available yet."}</p>
          <Link href="/your-games" className="mt-5 inline-block rounded-lg bg-[#1f306d] px-5 py-2.5 font-semibold text-white">
            ← Back to activities
          </Link>
        </div>
      </div>
    )
  }

  const C = mod.Component

  const applyPaste = () => {
    try {
      const rows = parseTabular(raw)
      if (rows.length < 2) throw new Error("Add a header row plus at least one data row.")
      setData(mod.parse(rows))
      setErr("")
      setOpen(false)
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not parse that data.")
    }
  }
  const applySheet = async () => {
    setBusy(true)
    try {
      const rows = await fetchSheetRows(sheet)
      setData(mod.parse(rows))
      setErr("")
      setOpen(false)
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not read that sheet.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6efca] pb-16">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/your-games" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
            <ArrowLeft className="size-4" /> Activities
          </Link>
          <span className="flex items-center gap-2 font-semibold" style={{ color: mod.accent }}>
            <span>{mod.icon}</span>
            {mod.name}
          </span>
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Upload className="size-4" /> Use your data
          </button>
        </div>
      </header>

      {open && (
        <div className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-5">
            <p className="mb-3 flex items-center gap-2 text-sm text-slate-500">
              <Table2 className="size-4" />
              {mod.schemaHint}
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Paste data (from a spreadsheet)</label>
                <textarea
                  value={raw}
                  onChange={(e) => setRaw(e.target.value)}
                  rows={5}
                  placeholder={"Front\tBack\nBonjour\tHello"}
                  className="w-full rounded-lg border border-black/10 p-2 font-mono text-sm"
                />
                <button onClick={applyPaste} className="mt-2 rounded-lg bg-[#1f306d] px-4 py-2 text-sm font-semibold text-white">
                  Load pasted data
                </button>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">…or a Google Sheet URL</label>
                <input
                  value={sheet}
                  onChange={(e) => setSheet(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/…"
                  className="w-full rounded-lg border border-black/10 p-2 text-sm"
                />
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={applySheet}
                    disabled={busy || !sheet.trim()}
                    className="rounded-lg bg-[#1b7888] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
                  >
                    {busy ? "Loading…" : "Load sheet"}
                  </button>
                  <button
                    onClick={() => {
                      setData(mod.sample)
                      setErr("")
                      setOpen(false)
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <Sparkles className="size-4" /> Use sample
                  </button>
                </div>
              </div>
            </div>
            {err && <p className="mt-3 text-sm font-medium text-red-600">{err}</p>}
          </div>
        </div>
      )}

      <main className="py-8">
        <C data={data} />
      </main>
    </div>
  )
}
