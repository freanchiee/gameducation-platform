import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Rekhachitra is free during beta — build graph-based activities and run live sessions for your IB MYP classroom at no cost.",
};

const included = [
  "Unlimited activities",
  "Live student sessions",
  "Join by code — no student login",
  "Real-time response analytics",
  "Mobile-first student view",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-body)" }}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link href="/desmos" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "var(--color-brand-teal)", fontFamily: "var(--font-heading)" }}
            >
              R
            </div>
            <span
              className="text-lg font-bold"
              style={{ color: "var(--color-ink)", fontFamily: "var(--font-heading)" }}
            >
              Rekhachitra
            </span>
          </Link>
        </div>
      </header>

      {/* ── Pricing ─────────────────────────────────────────────────────── */}
      <main className="px-4 sm:px-6 py-20">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: "var(--color-ink)", fontFamily: "var(--font-display)" }}
          >
            Free during beta.
          </h1>
          <p className="text-lg" style={{ color: "var(--color-muted)" }}>
            Every feature, no cost, no credit card. We&apos;re building Rekhachitra alongside the
            teachers who use it.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="card p-8 text-center border border-[var(--color-border)] rounded-2xl">
            <p
              className="text-sm font-semibold uppercase tracking-wide mb-2"
              style={{ color: "var(--color-brand-teal)" }}
            >
              Beta
            </p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span
                className="text-5xl font-bold"
                style={{ color: "var(--color-ink)", fontFamily: "var(--font-display)" }}
              >
                Free
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
              while we&apos;re in beta
            </p>

            <ul className="text-left space-y-3 mb-8">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle size={16} style={{ color: "var(--color-brand-mint)", flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "var(--color-ink-soft)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/desmos/auth/login" className="btn btn-primary btn-lg w-full">
              Get started
              <ArrowRight size={18} />
            </Link>
          </div>

          <p className="text-center text-sm mt-6">
            <Link href="/desmos" className="hover:opacity-70 transition-opacity" style={{ color: "var(--color-muted)" }}>
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
