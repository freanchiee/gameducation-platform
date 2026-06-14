import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata = {
  title: "CellBook | LearnBook",
  description: "The original CellBook organelle social network running inside LearnBook.",
};

export default function CellBookPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <article className="lb-card p-6">
        <h2 className="font-display text-3xl font-extrabold text-navy">Native CellBook</h2>
        <p className="mt-3 max-w-xl text-base text-ink/75">
          Start with the new modular student routes. This is the execution path for Phase 3.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/cellbook/library" className="lb-btn lb-btn-primary">
            Open Native Flow
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link href="/cellbook/start" className="lb-btn lb-btn-secondary">
            Choose Student
          </Link>
          <Link href="/" className="lb-btn lb-btn-secondary">
            Back to LearnBook
          </Link>
        </div>
      </article>

      <article className="lb-card p-6">
        <h2 className="font-display text-3xl font-extrabold text-navy">Legacy Reference</h2>
        <p className="mt-3 max-w-xl text-base text-ink/75">
          Keep the legacy iframe available while we migrate behavior into React components.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/cellbook/legacy" className="lb-btn lb-btn-primary">
            Open Legacy Iframe
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a
            href="/legacy/cellbook.html"
            target="_blank"
            rel="noreferrer"
            className="lb-btn lb-btn-secondary"
          >
            Open Standalone
            <ExternalLink size={17} aria-hidden="true" />
          </a>
        </div>
      </article>
    </div>
  );
}
