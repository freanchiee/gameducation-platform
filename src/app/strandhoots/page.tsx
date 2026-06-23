import Link from "next/link"
import { PencilRuler, Sparkles, Trophy } from "lucide-react"
import { STRANDHOOTS } from "./strandhoots"
import StrandhootsHub from "./StrandhootsHub"

const STRAND = "#58a65c"
const NAVY = "#1f306d"

export const metadata = {
  title: "Strandhoots — Gameducation",
  description: "Gamified MYP assessments. Launch a ready-made strandhoot or build your own.",
}

export default function StrandhootsPage() {
  return (
    <main className="min-h-screen bg-[#f6efca]">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-6 py-16 text-center text-white">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">
            <Trophy className="size-4" /> Strandhoot
          </span>
          <h1 className="text-4xl font-extrabold sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Gamified MYP assessment
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">
            Launch a ready-made strandhoot for your class — students level up each assessment criterion with live
            feedback and badges — or build your own from scratch.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* Available strandhoots with subject/criterion filter */}
        <div className="mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Available strandhoots</h2>
        </div>
        <StrandhootsHub strandhoots={STRANDHOOTS} />

        {/* Strandhoot Maker sublink */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-black/20 bg-white/60 p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-xl text-2xl" style={{ background: `${NAVY}14` }}>
              <PencilRuler className="size-6" style={{ color: NAVY }} />
            </span>
            <div>
              <h3 className="font-bold" style={{ color: NAVY, fontFamily: "var(--font-display)" }}>
                Build your own — Strandhoot Maker
              </h3>
              <p className="text-sm text-slate-600">
                Drag-and-drop blocks to create a custom gamified assessment for any criterion.
              </p>
            </div>
          </div>
          <Link
            href="/strandhoot-builder"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ background: STRAND }}
          >
            <Sparkles className="size-4" />
            Open the maker
          </Link>
        </div>
      </section>
    </main>
  )
}
