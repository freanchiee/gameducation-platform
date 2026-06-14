"use client";

import { useRouter } from "next/navigation";
import { setCellbookSession } from "@/lib/cellbook/session";

const OPTIONS = [
  {
    displayName: "Alice",
    studentId: "00000000-0000-0000-0000-000000000031",
    classId: "00000000-0000-0000-0000-000000000020",
    worldId: "00000000-0000-0000-0000-000000000001",
  },
  {
    displayName: "Bob",
    studentId: "00000000-0000-0000-0000-000000000033",
    classId: "00000000-0000-0000-0000-000000000020",
    worldId: "00000000-0000-0000-0000-000000000001",
  },
  {
    displayName: "Guest_Charlie",
    studentId: "00000000-0000-0000-0000-000000000035",
    classId: "00000000-0000-0000-0000-000000000020",
    worldId: "00000000-0000-0000-0000-000000000001",
  },
];

export default function CellbookStartPage() {
  const router = useRouter();

  return (
    <div className="space-y-5">
      <h2 className="font-display text-3xl font-extrabold text-navy">Choose Student</h2>
      <p className="text-ink/75">Pick a student profile to enter the native CellBook flow.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {OPTIONS.map((option) => (
          <button
            key={option.studentId}
            type="button"
            className="lb-card p-4 text-left transition hover:-translate-y-0.5"
            onClick={() => {
              setCellbookSession(option);
              router.push("/cellbook/library");
            }}
          >
            <p className="font-display text-2xl font-bold text-navy">{option.displayName}</p>
            <p className="mt-2 text-sm text-ink/70">Class: CELL01</p>
          </button>
        ))}
      </div>
    </div>
  );
}
