import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Rekhachitra team. We'd love your feedback as we build the live math classroom for IB MYP teachers.",
};

export default function ContactPage() {
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

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <main className="px-4 sm:px-6 py-20">
        <div className="max-w-xl mx-auto text-center">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: "var(--color-ink)", fontFamily: "var(--font-display)" }}
          >
            Get in touch
          </h1>
          <p className="text-lg mb-10" style={{ color: "var(--color-muted)" }}>
            We&apos;re in beta and building Rekhachitra in the open — your feedback, feature requests,
            and bug reports genuinely shape what we build next.
          </p>

          <a
            href="mailto:hello@rekhachitra.app"
            className="btn btn-primary btn-lg inline-flex"
          >
            <Mail size={18} />
            hello@rekhachitra.app
          </a>

          <p className="text-center text-sm mt-10">
            <Link href="/desmos" className="hover:opacity-70 transition-opacity" style={{ color: "var(--color-muted)" }}>
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
