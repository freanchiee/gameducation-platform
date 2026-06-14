"use client";

import { useState } from "react";
import { getCellbookSession } from "@/lib/cellbook/session";

interface ScoreResponse {
  artifactId: string;
  score: {
    scoreValue: number;
    maxScore: number;
    rubricId: string;
    dimensionScores: Array<{
      dimension: string;
      score: number;
      maxScore: number;
      rationale: string;
    }>;
    overallFeedback: string;
  };
  xp: {
    delta: number;
    total: number;
    unlocks: {
      profileTheme: boolean;
      feedReactions: boolean;
      advancedCard: boolean;
    };
  };
  rewards: {
    streakDays: number;
    badgeKeys: string[];
  };
}

export default function CellBookProfileBuilderPage() {
  const [organelle, setOrganelle] = useState("");
  const [functionText, setFunctionText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScoreResponse | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setResult(null);

    try {
      const session = getCellbookSession();
      if (!session) {
        throw new Error("No active student session. Choose a student first.");
      }
      const res = await fetch("/api/cellbook/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: session.studentId,
          classId: session.classId,
          worldId: session.worldId,
          organelle,
          functionText,
          locationText,
        }),
      });
      const json = (await res.json()) as ScoreResponse & { error?: string };
      if (!res.ok) {
        throw new Error(json.error ?? "Failed to save profile.");
      }
      setResult(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    const exportPayload = {
      artifactId: result.artifactId,
      organelle,
      functionText,
      locationText,
      score: result.score,
      xp: result.xp,
      rewards: result.rewards,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `cellbook-profile-${result.artifactId}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="lb-card p-5">
        <h2 className="font-display text-3xl font-extrabold text-navy">Profile Builder</h2>
        <p className="mt-2 text-ink/70">Native form shell for organelle profile submission.</p>
        <form
          className="mt-5 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSave();
          }}
        >
          <label className="grid gap-2">
            <span className="text-sm font-bold text-navy">Organelle</span>
            <input
              className="rounded-md border border-slate/50 bg-surface px-3 py-2"
              placeholder="e.g. Mitochondria"
              value={organelle}
              onChange={(e) => setOrganelle(e.target.value)}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-navy">Function</span>
            <textarea
              className="min-h-24 rounded-md border border-slate/50 bg-surface px-3 py-2"
              placeholder="Describe key function..."
              value={functionText}
              onChange={(e) => setFunctionText(e.target.value)}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-navy">Location</span>
            <textarea
              className="min-h-20 rounded-md border border-slate/50 bg-surface px-3 py-2"
              placeholder="Where is this organelle typically found?"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
            />
          </label>
          <button disabled={saving} type="submit" className="lb-btn lb-btn-primary w-fit disabled:opacity-60">
            {saving ? "Saving..." : "Save + Score"}
          </button>
          {error ? <p className="text-sm font-semibold text-red">Error: {error}</p> : null}
        </form>
      </section>
      <aside className="lb-card p-5">
        <h3 className="font-display text-2xl font-bold text-navy">Preview Card</h3>
        {result ? (
          <div className="mt-4 space-y-3 rounded-lg border border-slate/50 bg-surface-soft p-4">
            <p className="text-sm font-bold text-navy">Artifact: {result.artifactId}</p>
            <p className="font-display text-2xl font-extrabold text-navy">
              Score {result.score.scoreValue}/{result.score.maxScore}
            </p>
            <p className="text-sm font-bold text-green">
              XP +{result.xp.delta} (Total: {result.xp.total})
            </p>
            <p className="text-sm text-ink/75">{result.score.overallFeedback}</p>
            <div className="space-y-2">
              {result.score.dimensionScores.map((d) => (
                <div key={d.dimension} className="rounded-md bg-surface p-3">
                  <p className="text-sm font-bold text-navy">
                    {d.dimension}: {d.score}/{d.maxScore}
                  </p>
                  <p className="text-xs text-ink/70">{d.rationale}</p>
                </div>
              ))}
            </div>
            <div className="rounded-md bg-surface p-3">
              <p className="text-sm font-bold text-navy">Unlocks</p>
              <p className="text-xs text-ink/75">
                Profile Theme: {result.xp.unlocks.profileTheme ? "Unlocked" : "Locked"} | Feed
                Reactions: {result.xp.unlocks.feedReactions ? "Unlocked" : "Locked"} | Advanced
                Card: {result.xp.unlocks.advancedCard ? "Unlocked" : "Locked"}
              </p>
            </div>
            <div className="rounded-md bg-surface p-3">
              <p className="text-sm font-bold text-navy">
                Streak: {result.rewards.streakDays} day{result.rewards.streakDays === 1 ? "" : "s"}
              </p>
              <p className="mt-1 text-xs text-ink/75">
                Badges: {result.rewards.badgeKeys.length > 0 ? result.rewards.badgeKeys.join(", ") : "None yet"}
              </p>
            </div>
            <button type="button" className="lb-btn lb-btn-secondary w-fit" onClick={handleDownload}>
              Download Profile Export
            </button>
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-slate/50 bg-surface-soft p-4">
            <p className="text-sm font-bold text-navy">Draft preview appears here</p>
            <p className="mt-2 text-sm text-ink/70">This panel mirrors score output after submission.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
