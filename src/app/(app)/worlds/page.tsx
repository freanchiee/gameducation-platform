"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Globe, X } from "lucide-react"

// Hosted EdgeOne mini-apps ("Worlds"). Seed list — users prune with the per-card
// delete; deletions persist in localStorage (per-browser).
// ponytail: localStorage, not a DB. If the hidden list must be shared across
// devices/users, promote to a Supabase `worlds` table with RLS.
type World = { slug: string; label: string; emoji: string; accent: string }

const SEED: World[] = [
  { slug: "stellarevolution", label: "Stellar Evolution", emoji: "🌟", accent: "#6d4aff" },
  { slug: "comparative-lavender-1ry5ejgdpx", label: "Comparative Lavender", emoji: "🪻", accent: "#9b7ede" },
  { slug: "aflcellbiology", label: "AFL Cell Biology", emoji: "🔬", accent: "#2a9d8f" },
  { slug: "radioactivityquiz", label: "Radioactivity Quiz", emoji: "☢️", accent: "#e76f0f" },
  { slug: "halflife2026ois", label: "Half-Life (2026 OIS)", emoji: "⏳", accent: "#d85140" },
  { slug: "mute-olive-hlvzplrywj", label: "Mute Olive", emoji: "🫒", accent: "#7a8b2e" },
  { slug: "early-amethyst-cpvey2r3ff", label: "Early Amethyst", emoji: "💎", accent: "#9966cc" },
  { slug: "gay-bronze-pagl7assk4", label: "Gay Bronze", emoji: "🥉", accent: "#cd7f32" },
  { slug: "indirect-coffee-beyrm1exsy", label: "Indirect Coffee", emoji: "☕", accent: "#6f4e37" },
  { slug: "portfolioutk", label: "Portfolio (UTK)", emoji: "💼", accent: "#4b668c" },
  { slug: "90minidl", label: "90 Min IDL", emoji: "⏱️", accent: "#0d9488" },
  { slug: "idlflow", label: "IDL Flow", emoji: "🌊", accent: "#2b7fff" },
  { slug: "shrill-apricot-orberyd66d", label: "Shrill Apricot", emoji: "🍑", accent: "#e8845f" },
  { slug: "ibphym2026", label: "IB Physics 2026", emoji: "⚛️", accent: "#3b5bdb" },
  { slug: "horizontal-copper-9sounqsfuf", label: "Horizontal Copper", emoji: "🟫", accent: "#b87333" },
]

const STORE = "worlds-hidden-v1"
const DISPLAY = { fontFamily: "var(--font-display)" }
const urlFor = (slug: string) => `https://${slug}.edgeone.app`

export default function WorldsPage() {
  const [hidden, setHidden] = useState<string[]>([])
  const [active, setActive] = useState<World | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE)
      if (raw) setHidden(JSON.parse(raw))
    } catch {
      /* ignore malformed storage */
    }
  }, [])

  const persist = (next: string[]) => {
    setHidden(next)
    try {
      localStorage.setItem(STORE, JSON.stringify(next))
    } catch {
      /* ignore quota / disabled storage */
    }
  }

  const remove = (slug: string) => persist([...hidden, slug])
  const restoreAll = () => persist([])

  const visible = SEED.filter((w) => !hidden.includes(w.slug))

  // ── Embedded view ──────────────────────────────────────────────────────────
  if (active) {
    return (
      <div className="flex h-[calc(100vh-7rem)] flex-col">
        <div
          className="mb-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-white shadow-sm"
          style={{ background: `linear-gradient(135deg, ${active.accent}, ${active.accent}cc)` }}
        >
          <button
            onClick={() => setActive(null)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur transition hover:bg-white/25"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          <span className="text-xl">{active.emoji}</span>
          <h1 className="truncate text-lg font-bold" style={DISPLAY}>
            {active.label}
          </h1>
          <a
            href={urlFor(active.slug)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur transition hover:bg-white/25"
          >
            Open in new tab <ExternalLink className="size-4" />
          </a>
        </div>
        <iframe
          key={active.slug}
          src={urlFor(active.slug)}
          title={active.label}
          className="min-h-0 flex-1 rounded-2xl border bg-white shadow-sm"
          allow="fullscreen; clipboard-write"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Blank screen? The host may block embedding — use “Open in new tab”.
        </p>
      </div>
    )
  }

  // ── List view ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1f306d] via-[#274e68] to-[#4b668c] px-7 py-7 text-white shadow-sm">
        <div className="absolute -right-8 -top-10 text-[9rem] opacity-10 select-none">🌐</div>
        <h1 className="flex items-center gap-2.5 text-3xl font-extrabold" style={DISPLAY}>
          <Globe className="size-7" /> Worlds
        </h1>
        <p className="mt-1.5 max-w-xl text-white/75">
          Hosted interactive mini-apps. Open one to play it embedded right here — no new tabs, no setup.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
            {visible.length} worlds
          </span>
          {hidden.length > 0 && (
            <button onClick={restoreAll} className="text-sm text-white/70 underline hover:text-white">
              Restore hidden ({hidden.length})
            </button>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No worlds to show.{" "}
          <button onClick={restoreAll} className="underline">
            Restore hidden
          </button>
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((w) => (
            <div
              key={w.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* accent strip */}
              <div className="h-1.5 w-full" style={{ background: w.accent }} />
              <button
                onClick={() => remove(w.slug)}
                title="Remove from Worlds"
                aria-label={`Remove ${w.label}`}
                className="absolute right-3 top-4 z-10 rounded-md p-1 text-muted-foreground opacity-0 transition hover:bg-muted hover:text-red-600 group-hover:opacity-100"
              >
                <X className="size-4" />
              </button>
              <button onClick={() => setActive(w)} className="flex flex-1 flex-col items-start p-5 text-left">
                <span
                  className="mb-3 grid size-12 place-items-center rounded-2xl text-2xl"
                  style={{ background: `${w.accent}1a` }}
                >
                  {w.emoji}
                </span>
                <h3 className="text-lg font-bold" style={{ ...DISPLAY, color: w.accent }}>
                  {w.label}
                </h3>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{w.slug}.edgeone.app</p>
                <span
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: w.accent }}
                >
                  Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-4">
        <Link href="/cellbook" className="text-sm text-muted-foreground underline hover:text-foreground">
          CellBook &amp; internal worlds →
        </Link>
      </div>
    </div>
  )
}
