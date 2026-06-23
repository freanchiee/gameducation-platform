import { nanoid } from "nanoid";
import { getSupabase } from "@/lib/supabase/client";
import { getOwnerId } from "@/lib/utils/owner";
import { generateId } from "@/lib/utils/session";
import type { Activity, ActivityStatus } from "@/types";

// Durable, shareable activity store. Source of truth is the Supabase
// `rk_activities` table; localStorage (rk_activities map) is kept as a mirror so
// the builder/list/session still work offline or when Supabase is unconfigured.
const TABLE = "rk_activities";
const LS_KEY = "rk_activities";

const newSlug = () => nanoid(10);

// ── row <-> Activity mapping ────────────────────────────────────────────────
type Row = {
  id: string;
  teacher_id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  status: ActivityStatus;
  visibility: "private" | "unlisted" | "public";
  share_slug: string;
  forked_from: string | null;
  slides: Activity["slides"];
  created_at: string;
  updated_at: string;
};

function rowToActivity(r: Row): Activity {
  return {
    id: r.id,
    teacherId: r.teacher_id,
    title: r.title,
    description: r.description,
    isPublic: r.is_public,
    status: r.status,
    slides: r.slides ?? [],
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    visibility: r.visibility,
    shareSlug: r.share_slug,
    forkedFrom: r.forked_from,
  };
}

function activityToRow(a: Activity): Row {
  return {
    id: a.id,
    teacher_id: a.teacherId,
    title: a.title || "Untitled Activity",
    description: a.description ?? null,
    is_public: a.isPublic ?? false,
    status: a.status,
    visibility: a.visibility ?? "unlisted",
    share_slug: a.shareSlug ?? newSlug(),
    forked_from: a.forkedFrom ?? null,
    slides: a.slides ?? [],
    created_at: a.createdAt,
    updated_at: a.updatedAt,
  };
}

// ── localStorage mirror ─────────────────────────────────────────────────────
function readMap(): Record<string, Activity> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Activity>) : {};
  } catch {
    return {};
  }
}
function writeMap(map: Record<string, Activity>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(map));
  } catch {
    /* quota — Supabase still has it */
  }
}

// ── public API ──────────────────────────────────────────────────────────────

/** This browser's library: Supabase rows for the owner, merged with the local mirror. */
export async function listMine(): Promise<Activity[]> {
  const ownerId = getOwnerId();
  const byId = new Map<string, Activity>();
  // local mirror first (every value is this browser's own)
  for (const a of Object.values(readMap())) byId.set(a.id, a);
  // Supabase rows win on conflict (fresher / canonical)
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb.from(TABLE).select("*").eq("teacher_id", ownerId);
    if (!error && data) for (const r of data as Row[]) byId.set(r.id, rowToActivity(r));
  }
  return [...byId.values()].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function getById(id: string): Promise<Activity | null> {
  const sb = getSupabase();
  if (sb) {
    const { data } = await sb.from(TABLE).select("*").eq("id", id).maybeSingle();
    if (data) return rowToActivity(data as Row);
  }
  return readMap()[id] ?? null;
}

export async function getByShareSlug(slug: string): Promise<Activity | null> {
  const sb = getSupabase();
  if (sb) {
    const { data } = await sb.from(TABLE).select("*").eq("share_slug", slug).maybeSingle();
    if (data) return rowToActivity(data as Row);
  }
  // same-browser fallback
  return Object.values(readMap()).find((a) => a.shareSlug === slug) ?? null;
}

/** Upsert. Mints owner + shareSlug + visibility if missing. Returns the stored activity. */
export async function saveActivity(input: Activity): Promise<Activity> {
  const a: Activity = {
    ...input,
    teacherId:
      input.teacherId && input.teacherId !== "local-teacher" ? input.teacherId : getOwnerId(),
    visibility: input.visibility ?? "unlisted",
    shareSlug: input.shareSlug ?? newSlug(),
    forkedFrom: input.forkedFrom ?? null,
    updatedAt: new Date().toISOString(),
  };
  // mirror
  const map = readMap();
  map[a.id] = a;
  writeMap(map);
  // durable
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from(TABLE).upsert(activityToRow(a), { onConflict: "id" });
    if (error) console.warn("rk_activities upsert failed (kept locally):", error.message);
  }
  return a;
}

export async function deleteActivity(id: string): Promise<void> {
  const map = readMap();
  delete map[id];
  writeMap(map);
  const sb = getSupabase();
  if (sb) await sb.from(TABLE).delete().eq("id", id);
}

export async function setStatus(id: string, status: ActivityStatus): Promise<void> {
  const current = await getById(id);
  if (current) await saveActivity({ ...current, status });
}

/** Copy a (possibly someone else's) activity into this browser's library. */
export async function forkActivity(source: Activity): Promise<Activity> {
  const newId = generateId();
  const now = new Date().toISOString();
  const copy: Activity = {
    ...source,
    id: newId,
    teacherId: getOwnerId(),
    title: `${source.title || "Untitled Activity"} (copy)`,
    status: "draft",
    visibility: "unlisted",
    shareSlug: newSlug(),
    forkedFrom: source.id,
    slides: (source.slides ?? []).map((s) => ({ ...s, activityId: newId })),
    createdAt: now,
    updatedAt: now,
  };
  return saveActivity(copy);
}
