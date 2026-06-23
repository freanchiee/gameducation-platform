"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { ArrowLeft, Github } from "lucide-react"
import { getStrandhoot } from "../../strandhoots"
import { getPack } from "../../packs"
import StrandhootEngine from "../../engine/StrandhootEngine"

const UUID_RE = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

/** A real UUID — required because `responses.student_id` is a uuid column. */
function resolveStudentId(fromUrl: string | null): string {
  if (fromUrl && UUID_RE.test(fromUrl)) return fromUrl
  const KEY = "gx_student_id"
  let id = localStorage.getItem(KEY)
  if (!id || !UUID_RE.test(id)) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : "00000000-0000-4000-8000-" + Date.now().toString(16).padStart(12, "0").slice(-12)
    localStorage.setItem(KEY, id)
  }
  return id
}

export default function PlayStrandhoot() {
  const params = useParams<{ slug: string }>()
  const search = useSearchParams()
  const sh = getStrandhoot(params.slug)

  // Resolve session identity on the client (window/localStorage/crypto only here).
  const [identity, setIdentity] = useState<{ studentId: string; sessionCode: string; name: string } | null>(null)
  useEffect(() => {
    if (!sh) return
    setIdentity({
      studentId: resolveStudentId(search.get("studentId")),
      sessionCode: search.get("sessionCode") ?? "solo",
      name: search.get("name") ?? "",
    })
  }, [sh, search])

  if (!sh) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f6efca] px-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1f306d]">Strandhoot not found</h1>
          <Link href="/strandhoots" className="mt-4 inline-block rounded-lg bg-[#1f306d] px-5 py-2.5 font-semibold text-white">
            ← Back to strandhoots
          </Link>
        </div>
      </div>
    )
  }

  // ── Native (engine-rendered) ───────────────────────────────────────────────
  if (sh.mode === "native") {
    const pack = getPack(sh.slug)
    if (!pack) {
      return (
        <div className="grid min-h-screen place-items-center bg-[#f6efca] px-6 text-center text-[#1f306d]">
          Content pack missing for <code className="mx-1">{sh.slug}</code>.
        </div>
      )
    }
    return (
      <div className="relative">
        <Link
          href="/strandhoots"
          className="fixed left-3 top-3 z-50 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-slate-700 shadow backdrop-blur hover:bg-white"
        >
          <ArrowLeft className="size-4" /> Strandhoots
        </Link>
        {identity && (
          <StrandhootEngine
            pack={pack}
            studentId={identity.studentId}
            sessionCode={identity.sessionCode}
            initialName={identity.name}
          />
        )}
      </div>
    )
  }

  // ── Legacy iframe (vendored Vite SPA) ──────────────────────────────────────
  const src = (() => {
    if (!identity || !sh.embed) return null
    const u = new URL(sh.embed, window.location.origin)
    u.searchParams.set("studentId", identity.studentId)
    u.searchParams.set("sessionCode", identity.sessionCode)
    if (identity.name) u.searchParams.set("name", identity.name)
    return u.toString()
  })()

  return (
    <div className="flex h-screen flex-col bg-[#0c1322]">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#0c1322] px-4 py-2.5">
        <Link href="/strandhoots" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">
          <ArrowLeft className="size-4" /> Strandhoots
        </Link>
        <span className="flex min-w-0 items-center gap-2 truncate font-semibold text-white">
          <span>{sh.icon}</span>
          <span className="truncate">{sh.title}</span>
          <span className="hidden truncate text-sm font-normal text-white/50 sm:inline">· {sh.criteria}</span>
        </span>
        {sh.source ? (
          <a href={sh.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white" title="View source">
            <Github className="size-4" />
          </a>
        ) : (
          <span className="size-4" />
        )}
      </header>
      <div className="relative flex-1">
        {src ? (
          <iframe
            key={src}
            src={src}
            title={sh.title}
            className="absolute inset-0 size-full border-0 bg-white"
            allow="fullscreen; clipboard-write; microphone; camera"
          />
        ) : (
          <div className="grid size-full place-items-center text-white/60">Loading strandhoot…</div>
        )}
      </div>
    </div>
  )
}
