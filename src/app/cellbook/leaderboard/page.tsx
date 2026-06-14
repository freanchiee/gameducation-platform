"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase-lb/client";
import { getCellbookSession } from "@/lib/cellbook/session";

interface LeaderboardRow {
  student_id: string;
  display_name: string;
  total_xp: number;
  rank: number;
}

export default function CellBookLeaderboardPage() {
  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = getCellbookSession();
    const classId = session?.classId;
    if (!classId) {
      setError("No active student session. Choose a student first.");
      return;
    }

    const supabase = createBrowserClient();

    async function loadLeaderboard() {
      const { data, error: readError } = await supabase
        .from("leaderboard")
        .select("student_id,display_name,total_xp,rank")
        .eq("class_id", classId)
        .order("rank", { ascending: true });
      if (readError) {
        setError(readError.message);
        return;
      }
      setRows((data ?? []) as LeaderboardRow[]);
    }

    void loadLeaderboard();

    const channel = supabase
      .channel("cellbook-leaderboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "xp_events", filter: `class_id=eq.${classId}` },
        () => void loadLeaderboard()
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-5">
      <h2 className="font-display text-3xl font-extrabold text-navy">Leaderboard</h2>
      {error ? <p className="text-sm font-semibold text-red">Error: {error}</p> : null}
      <div className="lb-card overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-surface-soft">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-navy">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-extrabold text-navy">Student</th>
              <th className="px-4 py-3 text-right text-sm font-extrabold text-navy">XP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.student_id} className="border-t border-slate/35">
                <td className="px-4 py-3 font-bold text-navy">#{row.rank}</td>
                <td className="px-4 py-3 text-ink">{row.display_name}</td>
                <td className="px-4 py-3 text-right font-bold text-navy">{row.total_xp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
