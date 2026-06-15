"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Gamepad2 } from "lucide-react"
import { CATALOG } from "./games/registry"
import type { GameCategory, GameMeta } from "./games/types"

const CATEGORY_ORDER: GameCategory[] = [
  "Study & Review",
  "Quizzes & Assessment",
  "Word Games",
  "Random & Pickers",
  "Competition",
  "Creative",
]

function byCategory(cat: GameCategory): GameMeta[] {
  return CATALOG.filter((g) => g.category === cat)
}

function ActivityCard({ g }: { g: GameMeta }) {
  const ready = g.status === "ready"
  const inner = (
    <div
      className={`group relative flex h-full flex-col rounded-2xl border bg-white p-5 transition ${
        ready ? "border-black/10 shadow-sm hover:-translate-y-1 hover:shadow-lg" : "border-dashed border-black/15 opacity-75"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className="grid size-11 place-items-center rounded-xl text-2xl"
          style={{ background: `${g.accent}1a` }}
        >
          {g.icon}
        </span>
        {!ready && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
            Soon
          </span>
        )}
      </div>
      <h3 className="font-bold" style={{ color: g.accent, fontFamily: "var(--font-display)" }}>
        {g.name}
      </h3>
      <p className="mt-1 flex-1 text-sm text-slate-600">{g.blurb}</p>
      {ready && (
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: g.accent }}>
          Play <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      )}
    </div>
  )
  return ready ? (
    <Link href={`/your-games/play/${g.id}`} className="block h-full">
      {inner}
    </Link>
  ) : (
    <div className="h-full">{inner}</div>
  )
}

export default function YourGamesPage() {
  const readyCount = CATALOG.filter((g) => g.status === "ready").length
  return (
    <main className="min-h-screen bg-[#f6efca]">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "#1f306d" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 text-center text-white">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">
            <Gamepad2 className="size-4" /> Game-Based Learning
          </span>
          <h1 className="text-4xl font-extrabold sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Turn any topic into a game
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Pick an activity and play instantly with the built-in sample — or paste your own data (or a Google Sheet)
            and it&apos;s ready in seconds. {readyCount} activities live, more on the way.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/your-games/play/flashcards"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-semibold text-[#1f306d] shadow-sm transition hover:opacity-90"
            >
              <Sparkles className="size-4" /> Try a demo
            </Link>
          </div>
        </div>
      </section>

      {/* Activities catalog */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        {CATEGORY_ORDER.map((cat) => {
          const items = byCategory(cat)
          if (!items.length) return null
          return (
            <div key={cat} className="mb-12">
              <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-500">{cat}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((g) => (
                  <ActivityCard key={g.id} g={g} />
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
