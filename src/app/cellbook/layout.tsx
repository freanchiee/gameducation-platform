import Link from "next/link";
import { Microscope } from "lucide-react";
import CellbookSessionBadge from "./CellbookSessionBadge";

const tabs = [
  { href: "/cellbook/library", label: "Library" },
  { href: "/cellbook/profile-builder", label: "Profile Builder" },
  { href: "/cellbook/feed", label: "Class Feed" },
  { href: "/cellbook/leaderboard", label: "Leaderboard" },
  { href: "/cellbook/assessment", label: "Assessment" },
];

export default function CellBookLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-canvas">
      <header className="border-b border-slate/40 bg-surface/95">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-mint text-navy">
              <Microscope size={20} aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-navy">CellBook</h1>
              <p className="text-sm font-semibold text-ink/60">Native LearnBook flow (Phase 3)</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CellbookSessionBadge />
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="rounded-md border border-slate/50 bg-surface px-3 py-2 text-sm font-bold text-navy transition hover:bg-surface-soft"
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">{children}</section>
    </main>
  );
}
