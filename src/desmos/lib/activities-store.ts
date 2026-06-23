// Supabase-backed persistence for Desmos activities, with a localStorage
// fallback/mirror so the builder keeps working offline / when unauthenticated.
// Replaces the former localStorage-only `rk_activities` map.
import { createBrowserClient } from "@supabase/ssr"

import type { Activity } from "@/desmos/types"

const LS_KEY = "rk_activities"

function sb() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

// getSession() reads the stored session without throwing; getUser() throws
// AuthSessionMissingError when signed out, which would reject our void'd saves.
async function currentUser(client: ReturnType<typeof sb>) {
  const {
    data: { session },
  } = await client.auth.getSession()
  return session?.user ?? null
}

type Row = {
  id: string
  user_id: string | null
  title: string
  description: string | null
  status: string
  is_public: boolean
  slides: unknown
  share_slug: string | null
  forked_from: string | null
  created_at: string
  updated_at: string
}

function rowToActivity(r: Row): Activity {
  return {
    id: r.id,
    teacherId: r.user_id ?? "",
    title: r.title,
    description: r.description,
    isPublic: r.is_public,
    status: r.status as Activity["status"],
    slides: (r.slides as Activity["slides"]) ?? [],
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    shareSlug: r.share_slug ?? undefined,
    forkedFrom: r.forked_from,
  }
}

// Non-crypto slug for share links; the unique index catches the rare collision.
function genSlug(): string {
  let s = ""
  while (s.length < 10) s += Math.random().toString(36).slice(2)
  return s.slice(0, 10)
}

function readLocal(): Record<string, Activity> {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as Record<string, Activity>) : {}
  } catch {
    return {}
  }
}

function writeLocal(map: Record<string, Activity>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(map))
  } catch {
    /* quota / unavailable — ignore */
  }
}

function sortByUpdated(list: Activity[]): Activity[] {
  return [...list].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )
}

/** List the signed-in teacher's activities from Supabase; localStorage if not signed in. */
export async function listActivities(): Promise<Activity[]> {
  const client = sb()
  const user = await currentUser(client)
  if (user) {
    const { data, error } = await client
      .from("activities")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
    if (!error && data) return (data as Row[]).map(rowToActivity)
  }
  return sortByUpdated(Object.values(readLocal()))
}

export async function getActivity(id: string): Promise<Activity | null> {
  const client = sb()
  const user = await currentUser(client)
  if (user) {
    const { data } = await client
      .from("activities")
      .select("*")
      .eq("id", id)
      .maybeSingle()
    if (data) return rowToActivity(data as Row)
  }
  return readLocal()[id] ?? null
}

/** Upsert an activity. Mints a stable shareSlug if absent. Mirrors to localStorage;
 *  persists to Supabase when signed in. Returns the stored activity. */
export async function saveActivity(activity: Activity): Promise<Activity> {
  const saved: Activity = {
    ...activity,
    shareSlug: activity.shareSlug ?? genSlug(),
    forkedFrom: activity.forkedFrom ?? null,
    updatedAt: new Date().toISOString(),
  }
  const map = readLocal()
  map[saved.id] = saved
  writeLocal(map)

  const client = sb()
  const user = await currentUser(client)
  if (!user) return saved
  await client.from("activities").upsert({
    id: saved.id,
    user_id: user.id,
    title: saved.title || "Untitled activity",
    description: saved.description ?? null,
    status: saved.status ?? "draft",
    is_public: saved.isPublic ?? false,
    slides: saved.slides ?? [],
    share_slug: saved.shareSlug,
    forked_from: saved.forkedFrom,
    updated_at: saved.updatedAt,
  })
  return saved
}

export async function deleteActivity(id: string): Promise<void> {
  const map = readLocal()
  delete map[id]
  writeLocal(map)

  const client = sb()
  const user = await currentUser(client)
  if (user) await client.from("activities").delete().eq("id", id)
}

/** Read a shared activity by slug. Works for non-owners: the activities_public_read
 *  RLS policy exposes rows with is_public = true (which `shareActivity` sets). */
export async function getByShareSlug(slug: string): Promise<Activity | null> {
  const client = sb()
  const { data } = await client
    .from("activities")
    .select("*")
    .eq("share_slug", slug)
    .maybeSingle()
  if (data) return rowToActivity(data as Row)
  return Object.values(readLocal()).find((a) => a.shareSlug === slug) ?? null
}

/** Make an activity reachable by link: mint a slug (if needed) and mark it public. */
export async function shareActivity(activity: Activity): Promise<Activity> {
  return saveActivity({ ...activity, isPublic: true, shareSlug: activity.shareSlug ?? genSlug() })
}

/** Copy a (possibly someone else's) activity into the signed-in teacher's library. */
export async function forkActivity(source: Activity): Promise<Activity> {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  return saveActivity({
    ...source,
    id,
    teacherId: "",
    title: `${source.title || "Untitled activity"} (copy)`,
    status: "draft",
    isPublic: false,
    shareSlug: genSlug(),
    forkedFrom: source.id,
    slides: (source.slides ?? []).map((s) => ({ ...s, activityId: id })),
    createdAt: now,
    updatedAt: now,
  })
}
