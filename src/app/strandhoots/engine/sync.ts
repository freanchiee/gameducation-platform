// Supabase persistence for the native engine. Writes the SAME `responses` shape
// the legacy vendored SPAs used (strand1..5 + strand1..5_level), so the existing
// teacher dashboard reads it unchanged — plus player_name / is_typing (added by
// migration) for the live leaderboard. Uses the app's shared browser client.
import { supabase } from "@/utils/supabase"
import type { Level } from "./types"

export interface SyncCtx {
  studentId: string
  sessionCode: string
  /** Stable per-strandhoot key — also stored in `experiment` + `strandhoot`. */
  slug: string
  playerName: string
}

const UUID_RE = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
export const isUuid = (s: string) => UUID_RE.test(s)

// Solo practice has no real session row, so `responses.session_code` would
// violate the FK + RLS check. Solo is local-only; we persist only for live
// (hosted) sessions where the code exists in strandhoot_sessions.
export const isLiveSession = (ctx: SyncCtx) =>
  isUuid(ctx.studentId) && !!ctx.sessionCode && ctx.sessionCode !== "solo"

const keys = (ctx: SyncCtx) => ({
  student_id: ctx.studentId,
  session_code: ctx.sessionCode,
  experiment: ctx.slug,
})

/** One row per (student, session, strandhoot); upsert merges columns. */
export async function saveStrand(
  ctx: SyncCtx,
  strandIndex: number, // 1..5
  text: string,
  level: Level,
): Promise<{ ok: boolean; error?: string }> {
  if (!isLiveSession(ctx)) return { ok: true } // solo → local only
  const { error } = await supabase.from("responses").upsert(
    {
      ...keys(ctx),
      strandhoot: ctx.slug,
      player_name: ctx.playerName || null,
      is_typing: false,
      [`strand${strandIndex}`]: text || null,
      [`strand${strandIndex}_level`]: level,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "student_id,session_code,experiment" },
  )
  return error ? { ok: false, error: error.message } : { ok: true }
}

/** Lightweight "✍️ typing…" ping for the live dashboard (fire-and-forget). */
export async function pingTyping(ctx: SyncCtx, typing: boolean): Promise<void> {
  if (!isLiveSession(ctx)) return
  await supabase.from("responses").upsert(
    {
      ...keys(ctx),
      strandhoot: ctx.slug,
      player_name: ctx.playerName || null,
      is_typing: typing,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "student_id,session_code,experiment" },
  )
}

export interface LoadedRow {
  strands: Record<number, { text: string; level: Level }>
}

/** Restore a student's saved answers (so refresh / rejoin keeps progress). */
export async function loadResponses(ctx: SyncCtx): Promise<LoadedRow | null> {
  if (!isLiveSession(ctx)) return null
  const { data, error } = await supabase
    .from("responses")
    .select("*")
    .eq("student_id", ctx.studentId)
    .eq("session_code", ctx.sessionCode)
    .eq("experiment", ctx.slug)
    .maybeSingle()
  if (error || !data) return null
  const strands: Record<number, { text: string; level: Level }> = {}
  for (let i = 1; i <= 5; i++) {
    const text = (data as Record<string, unknown>)[`strand${i}`]
    const level = (data as Record<string, unknown>)[`strand${i}_level`]
    if (text != null || level != null) {
      strands[i] = { text: (text as string) ?? "", level: ((level as Level) ?? 0) }
    }
  }
  return { strands }
}
