import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="max-w-md w-full text-center">
        <Link href="/desmos" className="inline-flex items-center gap-2 mb-10">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: "var(--color-brand-teal)", fontFamily: "var(--font-heading)" }}
          >
            R
          </div>
          <span
            className="text-xl font-bold"
            style={{ color: "var(--color-ink)", fontFamily: "var(--font-heading)" }}
          >
            Rekhachitra
          </span>
        </Link>

        <p
          className="text-6xl font-bold mb-4"
          style={{ color: "var(--color-brand-teal)", fontFamily: "var(--font-display)" }}
        >
          404
        </p>
        <h1
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{ color: "var(--color-ink)", fontFamily: "var(--font-display)" }}
        >
          Page not found
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--color-muted)" }}>
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>

        <Link href="/desmos" className="btn btn-primary btn-lg inline-flex">
          <ArrowLeft size={18} />
          Back to home
        </Link>
      </div>
    </div>
  );
}
