"use client";

import { useState } from "react";
import type { WorldSlug } from "@/lib/worlds";
import { WORLD_TEMPLATES } from "@/lib/worlds/templates";

const DEMO_CONTEXT = {
  studentId: "00000000-0000-0000-0000-000000000031",
  classId: "00000000-0000-0000-0000-000000000020",
};

export default function WorldClient({ worldSlug }: { worldSlug: WorldSlug }) {
  const template = WORLD_TEMPLATES[worldSlug];
  const [title, setTitle] = useState("");
  const [explanation, setExplanation] = useState("");
  const [evidence, setEvidence] = useState("");
  const [result, setResult] = useState<{ artifactId: string; score: { scoreValue: number; feedback: string } } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const profileTitle = title.trim() || template.promptLabel;
  const handle = `@${template.handlePrefix}.${profileTitle.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/(^\.|\.$)/g, "") || "profile"}`;
  const previewBio = explanation.trim() || "Build a profile that explains the concept, role, evidence, and why it matters.";
  const previewEvidence = evidence.trim() || "Evidence or example appears here after you add it.";

  async function submitArtifact() {
    setError(null);
    setResult(null);
    const res = await fetch(`/api/worlds/${worldSlug}/artifacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...DEMO_CONTEXT, title, explanation, evidence }),
    });
    const json = (await res.json()) as {
      artifactId?: string;
      score?: { scoreValue: number; feedback: string };
      error?: string;
    };
    if (!res.ok || !json.artifactId || !json.score) {
      setError(json.error ?? "Unable to save artifact.");
      return;
    }
    setResult({ artifactId: json.artifactId, score: json.score });
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-slate/40 bg-surface/95">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <div className="font-display text-2xl font-extrabold text-navy">{template.displayName}</div>
            <p className="text-sm font-semibold text-ink/60">{template.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md border border-slate/40 bg-surface-soft px-3 py-2 text-sm font-bold text-navy">
              Library
            </span>
            <span className="rounded-md border border-slate/40 bg-surface-soft px-3 py-2 text-sm font-bold text-navy">
              Profile
            </span>
            <span className="rounded-md border border-slate/40 bg-surface-soft px-3 py-2 text-sm font-bold text-navy">
              Feed
            </span>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 py-6 lg:grid-cols-[320px_1fr_320px]">
        <aside className="space-y-4">
          <section className="lb-card overflow-hidden">
            <div className={`h-24 ${template.coverClass}`} />
            <div className="relative p-4 pt-9">
              <div className="absolute -top-8 left-4 flex size-16 items-center justify-center rounded-full border-4 border-surface bg-surface-soft text-3xl shadow-tile">
                {template.avatar}
              </div>
              <h1 className="font-display text-2xl font-extrabold text-navy">{profileTitle}</h1>
              <p className="text-sm font-semibold text-ink/60">{handle}</p>
              <p className="mt-3 text-sm leading-6 text-ink/75">{previewBio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {template.rubricHints.map((hint) => (
                  <span key={hint} className="rounded-full border border-slate/40 bg-surface px-2 py-1 text-[11px] font-bold text-navy">
                    {hint}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-slate/35 bg-surface-soft">
              {template.statLabels.map((label, index) => (
                <div key={label} className="px-2 py-3 text-center">
                  <div className="font-display text-sm font-extrabold text-navy">
                    {index === 0 ? title.length : index === 1 ? explanation.length : evidence.length}
                  </div>
                  <div className="text-[10px] font-bold uppercase text-ink/50">{label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="lb-card p-4">
            <h2 className="font-display text-xl font-bold text-navy">Rubric Lens</h2>
            <div className="mt-3 grid gap-2">
              {template.rubricHints.map((hint) => (
                <div key={hint} className="rounded-md bg-surface-soft px-3 py-2 text-sm font-bold text-navy">
                  {hint}
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section className="space-y-4">
          <article className="lb-card overflow-hidden">
            <div className={`flex items-center justify-between px-4 py-3 ${template.coverClass}`}>
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full border-2 border-white/80 bg-white text-2xl">
                  {template.avatar}
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-white">{template.displayName}</p>
                  <p className="text-xs font-bold text-white/75">{template.artifactType}</p>
                </div>
              </div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">Draft</span>
            </div>

            <div className="grid gap-4 p-5">
              <h2 className="font-display text-3xl font-extrabold text-navy">{template.promptLabel}</h2>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-navy">Title</span>
              <input
                className="rounded-md border border-slate/50 bg-surface px-3 py-2"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-navy">Explanation</span>
              <textarea
                className="min-h-28 rounded-md border border-slate/50 bg-surface px-3 py-2"
                value={explanation}
                onChange={(event) => setExplanation(event.target.value)}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-navy">Evidence or example</span>
              <textarea
                className="min-h-20 rounded-md border border-slate/50 bg-surface px-3 py-2"
                value={evidence}
                onChange={(event) => setEvidence(event.target.value)}
              />
            </label>
            <button className="lb-btn lb-btn-primary w-fit" type="button" onClick={() => void submitArtifact()}>
              Post Profile
            </button>
            {error ? <p className="text-sm font-bold text-red">{error}</p> : null}
            {result ? (
              <div className="rounded-lg border border-slate/40 bg-surface-soft p-4">
                <p className="font-display text-2xl font-extrabold text-navy">
                  Score {result.score.scoreValue}/100
                </p>
                <p className="mt-2 text-sm text-ink/75">{result.score.feedback}</p>
              </div>
            ) : null}
          </div>
          </article>

          <article className="lb-card p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-navy">Class Feed Preview</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${template.accentClass}`}>Live</span>
            </div>
            <div className="mt-4 rounded-lg border border-slate/40 bg-surface p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-surface-soft text-xl">
                  {template.avatar}
                </div>
                <div>
                  <p className="font-display text-base font-bold text-navy">{profileTitle}</p>
                  <p className="text-xs font-semibold text-ink/55">{handle}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink/75">{previewBio}</p>
              <p className="mt-3 rounded-md bg-surface-soft px-3 py-2 text-sm text-ink/75">{previewEvidence}</p>
            </div>
          </article>
        </section>

        <aside className="space-y-4">
          <section className="lb-card p-4">
            <h2 className="font-display text-xl font-bold text-navy">Suggested Profiles</h2>
            <div className="mt-3 grid gap-3">
              {template.rubricHints.map((hint, index) => (
                <div key={hint} className="flex items-center gap-3 rounded-md border border-slate/35 bg-surface p-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-surface-soft">
                    {index === 0 ? template.avatar : index === 1 ? "★" : "#"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">{hint}</p>
                    <p className="text-xs text-ink/55">@{template.handlePrefix}.template</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="lb-card p-4">
            <h2 className="font-display text-xl font-bold text-navy">Progress</h2>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-soft">
              <div
                className={`h-full ${template.coverClass}`}
                style={{ width: `${Math.min(100, result?.score.scoreValue ?? 35)}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-ink/65">
              {result ? "Profile posted and scored." : "Complete the profile to score this post."}
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}
