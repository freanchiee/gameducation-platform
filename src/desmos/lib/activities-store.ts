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
  }
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

/** Upsert an activity. Always mirrors to localStorage; also persists to Supabase when signed in. */
export async function saveActivity(activity: Activity): Promise<void> {
  const map = readLocal()
  map[activity.id] = activity
  writeLocal(map)

  const client = sb()
  const user = await currentUser(client)
  if (!user) return
  await client.from("activities").upsert({
    id: activity.id,
    user_id: user.id,
    title: activity.title || "Untitled activity",
    description: activity.description ?? null,
    status: activity.status ?? "draft",
    is_public: activity.isPublic ?? false,
    slides: activity.slides ?? [],
    updated_at: new Date().toISOString(),
  })
}

export async function deleteActivity(id: string): Promise<void> {
  const map = readLocal()
  delete map[id]
  writeLocal(map)

  const client = sb()
  const user = await currentUser(client)
  if (user) await client.from("activities").delete().eq("id", id)
}
