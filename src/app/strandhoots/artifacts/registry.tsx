"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

// Interactive artifacts are client-only (canvas/recharts/animation) — load with
// ssr:false so nothing touches window during SSR. New strandhoots slot one in by
// key; no engine changes required.
const loading = () => (
  <div className="grid h-48 place-items-center rounded-2xl border border-black/10 bg-white text-sm text-slate-400">
    Loading simulation…
  </div>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ARTIFACTS: Record<string, ComponentType<any>> = {
  "motion-lab": dynamic(() => import("./sims/MotionLab"), { ssr: false, loading }),
  "pendulum-lab": dynamic(() => import("./sims/PendulumLab"), { ssr: false, loading }),
  "resource-mix": dynamic(() => import("./sims/ResourceMixExplorer"), { ssr: false, loading }),
  "data-processor": dynamic(() => import("./DataProcessor"), { ssr: false, loading }),
}

export function hasArtifact(key?: string): key is string {
  return !!key && key in ARTIFACTS
}

export default function ArtifactSlot({
  artifactKey,
  props,
  accent,
}: {
  artifactKey: string
  props?: Record<string, unknown>
  accent?: string
}) {
  const Cmp = ARTIFACTS[artifactKey]
  if (!Cmp) {
    return (
      <div className="rounded-2xl border border-dashed border-black/15 bg-white p-6 text-center text-sm text-slate-400">
        Unknown artifact: <code>{artifactKey}</code>
      </div>
    )
  }
  return <Cmp accent={accent} {...(props ?? {})} />
}
