"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearCellbookSession, getCellbookSession } from "@/lib/cellbook/session";

export default function CellbookSessionBadge() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const session = getCellbookSession();
    setName(session?.displayName ?? null);
  }, []);

  if (!name) {
    return (
      <Link href="/cellbook/start" className="lb-btn lb-btn-secondary">
        Choose Student
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="rounded-md bg-surface-soft px-3 py-2 text-sm font-bold text-navy">{name}</span>
      <button
        type="button"
        className="rounded-md border border-slate/50 bg-surface px-3 py-2 text-sm font-bold text-navy"
        onClick={() => {
          clearCellbookSession();
          window.location.href = "/cellbook/start";
        }}
      >
        Switch
      </button>
    </div>
  );
}
