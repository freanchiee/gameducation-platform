"use client";

import { useEffect, useMemo, useState } from "react";
import { buildJoinLink } from "@/lib/teacher/classes";

interface ClassRow {
  id: string;
  name: string;
  join_code: string;
  world_id: string;
  is_active: boolean;
  created_at: string;
}

const WORLDS = [
  { id: "00000000-0000-0000-0000-000000000001", name: "CellBook" },
  { id: "00000000-0000-0000-0000-000000000002", name: "Organistagram" },
  { id: "00000000-0000-0000-0000-000000000003", name: "Reactagram" },
  { id: "00000000-0000-0000-0000-000000000004", name: "Physigram" },
];

export default function TeacherClassesPage() {
  const [teacherId, setTeacherId] = useState("00000000-0000-0000-0000-000000000010");
  const [name, setName] = useState("");
  const [worldId, setWorldId] = useState(WORLDS[0].id);
  const [rows, setRows] = useState<ClassRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadClasses() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/teacher/classes", { headers: { "x-teacher-id": teacherId } });
    const json = (await res.json()) as { classes?: ClassRow[]; error?: string };
    if (!res.ok) {
      setError(json.error ?? "Failed to load classes.");
      setLoading(false);
      return;
    }
    setRows(json.classes ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void loadClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createClass() {
    setError(null);
    const res = await fetch("/api/teacher/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-teacher-id": teacherId,
      },
      body: JSON.stringify({ teacherId, worldId, name }),
    });
    const json = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(json.error ?? "Failed to create class.");
      return;
    }
    setName("");
    await loadClasses();
  }

  const origin = useMemo(
    () => (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"),
    []
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="lb-card p-5">
        <h2 className="font-display text-3xl font-extrabold text-navy">Create Class</h2>
        <p className="mt-2 text-sm text-ink/70">Teacher-managed class creation with join code generation.</p>
        <div className="mt-4 grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs font-bold text-navy">Teacher ID</span>
            <input
              className="rounded-md border border-slate/50 bg-surface px-3 py-2"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-bold text-navy">Class Name</span>
            <input
              className="rounded-md border border-slate/50 bg-surface px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Period 3 Cell Biology"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-bold text-navy">World</span>
            <select
              className="rounded-md border border-slate/50 bg-surface px-3 py-2"
              value={worldId}
              onChange={(e) => setWorldId(e.target.value)}
            >
              {WORLDS.map((world) => (
                <option key={world.id} value={world.id}>
                  {world.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-2">
            <button className="lb-btn lb-btn-primary" type="button" onClick={() => void createClass()}>
              Create Class
            </button>
            <button className="lb-btn lb-btn-secondary" type="button" onClick={() => void loadClasses()}>
              Refresh
            </button>
          </div>
          {error ? <p className="text-sm font-semibold text-red">Error: {error}</p> : null}
        </div>
      </section>

      <section className="lb-card p-5">
        <h2 className="font-display text-3xl font-extrabold text-navy">Your Classes</h2>
        <p className="mt-2 text-sm text-ink/70">Class codes and join links for students.</p>
        <div className="mt-4 grid gap-3">
          {loading ? <p className="text-sm text-ink/70">Loading classes...</p> : null}
          {rows.map((row) => {
            const joinLink = buildJoinLink(origin, row.join_code);
            return (
              <article key={row.id} className="rounded-md border border-slate/40 bg-surface p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-navy">{row.name}</h3>
                  <span className="rounded-full bg-mint px-2 py-1 text-xs font-bold text-navy">
                    {row.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink/75">Join Code: {row.join_code}</p>
                <p className="mt-1 break-all text-xs text-ink/65">{joinLink}</p>
                <button
                  type="button"
                  className="mt-2 rounded-md border border-slate/40 px-2 py-1 text-xs font-bold text-navy"
                  onClick={async () => navigator.clipboard.writeText(joinLink)}
                >
                  Copy Join Link
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
