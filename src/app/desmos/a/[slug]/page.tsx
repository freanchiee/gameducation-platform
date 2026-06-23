"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Layers, Play, Copy, ArrowRight, BarChart2, Type, MessageSquare, HelpCircle } from "lucide-react";
import { getByShareSlug, forkActivity } from "@/desmos/lib/activities-store";
import type { Activity, SlideType } from "@/desmos/types";

const slideIcon: Record<SlideType, typeof Type> = {
  info: Type,
  graph: BarChart2,
  mcq: HelpCircle,
  short_answer: MessageSquare,
};

export default function SharedActivityPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) ?? "";

  const [activity, setActivity] = useState<Activity | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const found = await getByShareSlug(slug);
      if (cancelled) return;
      setActivity(found);
      setState(found ? "ready" : "missing");
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const makeCopy = async () => {
    if (!activity) return;
    setCopying(true);
    const copy = await forkActivity(activity);
    router.push(`/desmos/dashboard/activities/new?id=${copy.id}`);
  };

  if (state === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: "var(--color-brand-teal)", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  if (state === "missing" || !activity) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 px-6 text-center">
        <div className="text-5xl">🔍</div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-ink)", fontFamily: "var(--font-heading)" }}>
          Activity not found
        </h1>
        <p className="text-sm max-w-sm" style={{ color: "var(--color-muted)" }}>
          This share link is invalid, or the activity isn&apos;t shared.
        </p>
        <Link href="/desmos" className="btn btn-outline mt-2">
          Go to Rekhachitra
        </Link>
      </div>
    );
  }

  const slides = activity.slides ?? [];
  const blockCount = slides.reduce((sum, s) => sum + (s.content?.length ?? 0), 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface, #f8fafc)" }}>
      {/* Brand bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
        <Link href="/desmos" className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: "var(--color-brand-teal)", fontFamily: "var(--font-heading)" }}
          >
            R
          </span>
          <span className="font-bold" style={{ color: "var(--color-ink)", fontFamily: "var(--font-heading)" }}>
            Rekhachitra
          </span>
        </Link>
        <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(45,184,158,0.12)", color: "var(--color-brand-teal)" }}>
          Shared activity
        </span>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="card p-7">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-ink)", fontFamily: "var(--font-heading)" }}>
            {activity.title || "Untitled Activity"}
          </h1>
          {activity.description && (
            <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>
              {activity.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs mb-6" style={{ color: "var(--color-subtle)" }}>
            <span className="flex items-center gap-1">
              <Layers size={12} /> {slides.length} slide{slides.length !== 1 ? "s" : ""}
            </span>
            {blockCount > 0 && <span>{blockCount} block{blockCount !== 1 ? "s" : ""}</span>}
            {activity.forkedFrom && <span>· copied from a shared activity</span>}
          </div>

          {/* Slide outline */}
          <div className="space-y-1.5 mb-7">
            {slides.map((s, i) => {
              const Icon = slideIcon[s.type] ?? Type;
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  style={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                >
                  <span className="text-xs font-mono w-5" style={{ color: "var(--color-subtle)" }}>
                    {i + 1}
                  </span>
                  <Icon size={14} style={{ color: "var(--color-brand-teal)" }} />
                  <span className="text-sm" style={{ color: "var(--color-ink)" }}>
                    {s.title || `${s.type} slide`}
                  </span>
                  {s.checkpoint && s.checkpoint.type !== "none" && (
                    <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(245,192,0,0.15)", color: "#92740a" }}>
                      question
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/desmos/dashboard/sessions?activity=${activity.id}`}
              className="btn btn-primary gap-2 flex-1 justify-center"
            >
              <Play size={16} /> Use this — launch a session
            </Link>
            <button onClick={makeCopy} disabled={copying} className="btn btn-outline gap-2 flex-1 justify-center">
              <Copy size={16} /> {copying ? "Copying…" : "Make a copy"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "var(--color-subtle)" }}>
          “Make a copy” adds it to your library so you can edit it.{" "}
          <Link href="/desmos/dashboard/activities" className="underline inline-flex items-center gap-0.5">
            Your activities <ArrowRight size={11} />
          </Link>
        </p>
      </main>
    </div>
  );
}
