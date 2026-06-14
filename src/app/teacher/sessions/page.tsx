"use client";

import { useEffect, useMemo, useState } from "react";

interface ClassRow {
  id: string;
  name: string;
  join_code: string;
  world_id: string;
}

interface SessionRow {
  id: string;
  class_id: string;
  status: "lobby" | "active" | "ended";
  title: string;
  session_code: string;
  created_at: string;
  started_at: string | null;
  ended_at: string | null;
}

interface ProgressRow {
  studentId: string;
  displayName: string;
  artifactCount: number;
  submittedCount: number;
  totalXp: number;
  badgeCount: number;
  joinedAt: string | null;
  completedAt: string | null;
}

const TEACHER_ID = "00000000-0000-0000-0000-000000000010";

export default function TeacherSessionsPage() {
  const [classes, setClasses] = useState<ClassRow[]>([]);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [title, setTitle] = useState("CellBook Live Session");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [progressRows, setProgressRows] = useState<ProgressRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function loadClasses() {
    const res = await fetch("/api/teacher/classes", { headers: { "x-teacher-id": TEACHER_ID } });
    const json = (await res.json()) as { classes?: ClassRow[]; error?: string };
    if (!res.ok) {
      setError(json.error ?? "Failed to load classes.");
      return;
    }
    setClasses(json.classes ?? []);
    setSelectedClassId((current) => current || json.classes?.[0]?.id || "");
  }

  async function loadSessions() {
    const res = await fetch("/api/teacher/sessions", { headers: { "x-teacher-id": TEACHER_ID } });
    const json = (await res.json()) as { sessions?: SessionRow[]; error?: string };
    if (!res.ok) {
      setError(json.error ?? "Failed to load sessions.");
      return;
    }
    setSessions(json.sessions ?? []);
    setSelectedSessionId((current) => current || json.sessions?.[0]?.id || "");
  }

  async function loadProgress(sessionId = selectedSessionId, classId = selectedSession?.class_id ?? selectedClassId) {
    if (!classId) return;
    const params = new URLSearchParams({ classId });
    if (sessionId) params.set("sessionId", sessionId);
    const res = await fetch(`/api/teacher/session-progress?${params.toString()}`);
    const json = (await res.json()) as { rows?: ProgressRow[]; error?: string };
    if (!res.ok) {
      setError(json.error ?? "Failed to load progress.");
      return;
    }
    setProgressRows(json.rows ?? []);
  }

  useEffect(() => {
    void loadClasses();
    void loadSessions();
  }, []);

  const selectedSession = useMemo(
    () => sessions.find((session) => session.id === selectedSessionId),
    [selectedSessionId, sessions]
  );

  useEffect(() => {
    void loadProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSessionId, selectedClassId]);

  async function createSession() {
    setError(null);
    const res = await fetch("/api/teacher/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-teacher-id": TEACHER_ID,
      },
      body: JSON.stringify({ classId: selectedClassId, title }),
    });
    const json = (await res.json()) as { session?: SessionRow; error?: string };
    if (!res.ok || !json.session) {
      setError(json.error ?? "Failed to create session.");
      return;
    }
    setSelectedSessionId(json.session.id);
    await loadSessions();
  }

  async function updateStatus(status: SessionRow["status"]) {
    if (!selectedSessionId) return;
    setError(null);
    const res = await fetch("/api/teacher/sessions", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-teacher-id": TEACHER_ID,
      },
      body: JSON.stringify({ sessionId: selectedSessionId, status }),
    });
    const json = (await res.json()) as { error?: string };
    if (!res.ok) {
      setError(json.error ?? "Failed to update session.");
      return;
    }
    await loadSessions();
    await loadProgress();
  }

  function exportCsv() {
    const header = ["student", "artifacts", "submitted", "xp", "badges", "joined_at", "completed_at"];
    const lines = progressRows.map((row) =>
      [
        row.displayName,
        row.artifactCount,
        row.submittedCount,
        row.totalXp,
        row.badgeCount,
        row.joinedAt ?? "",
        row.completedAt ?? "",
      ]
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(",")
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `learnbook-session-${selectedSessionId || "progress"}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
      <section className="lb-card p-5">
        <h2 className="font-display text-3xl font-extrabold text-navy">Live Sessions</h2>
        <div className="mt-4 grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs font-bold text-navy">Class</span>
            <select
              className="rounded-md border border-slate/50 bg-surface px-3 py-2"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              {classes.map((klass) => (
                <option key={klass.id} value={klass.id}>
                  {klass.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-xs font-bold text-navy">Session Title</span>
            <input
              className="rounded-md border border-slate/50 bg-surface px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <button className="lb-btn lb-btn-primary w-fit" type="button" onClick={() => void createSession()}>
            Create Lobby
          </button>
          {error ? <p className="text-sm font-semibold text-red">Error: {error}</p> : null}
        </div>

        <div className="mt-6 grid gap-3">
          {sessions.map((session) => (
            <button
              key={session.id}
              type="button"
              className={`rounded-md border p-3 text-left ${
                selectedSessionId === session.id
                  ? "border-navy bg-surface-soft"
                  : "border-slate/40 bg-surface"
              }`}
              onClick={() => setSelectedSessionId(session.id)}
            >
              <p className="font-display text-lg font-bold text-navy">{session.title}</p>
              <p className="text-sm text-ink/70">
                {session.status} | Code {session.session_code}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="lb-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-navy">
              {selectedSession?.title ?? "Session Progress"}
            </h2>
            <p className="mt-1 text-sm text-ink/70">
              Status: {selectedSession?.status ?? "No session selected"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="lb-btn lb-btn-secondary" type="button" onClick={() => void updateStatus("active")}>
              Start
            </button>
            <button className="lb-btn lb-btn-secondary" type="button" onClick={() => void loadProgress()}>
              Refresh
            </button>
            <button className="lb-btn lb-btn-secondary" type="button" onClick={exportCsv}>
              Export CSV
            </button>
            <button className="lb-btn lb-btn-primary" type="button" onClick={() => void updateStatus("ended")}>
              End
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-lg border border-slate/40">
          <table className="w-full min-w-[760px] border-collapse bg-surface">
            <thead className="bg-surface-soft">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-extrabold text-navy">Student</th>
                <th className="px-3 py-3 text-right text-xs font-extrabold text-navy">Artifacts</th>
                <th className="px-3 py-3 text-right text-xs font-extrabold text-navy">Submitted</th>
                <th className="px-3 py-3 text-right text-xs font-extrabold text-navy">XP</th>
                <th className="px-3 py-3 text-right text-xs font-extrabold text-navy">Badges</th>
                <th className="px-3 py-3 text-left text-xs font-extrabold text-navy">Session</th>
              </tr>
            </thead>
            <tbody>
              {progressRows.map((row) => (
                <tr key={row.studentId} className="border-t border-slate/30">
                  <td className="px-3 py-3 font-bold text-ink">{row.displayName}</td>
                  <td className="px-3 py-3 text-right">{row.artifactCount}</td>
                  <td className="px-3 py-3 text-right">{row.submittedCount}</td>
                  <td className="px-3 py-3 text-right">{row.totalXp}</td>
                  <td className="px-3 py-3 text-right">{row.badgeCount}</td>
                  <td className="px-3 py-3 text-sm text-ink/70">
                    {row.completedAt ? "Completed" : row.joinedAt ? "Joined" : "Not joined"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
