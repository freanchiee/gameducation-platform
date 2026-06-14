/**
 * /api/live/[code] — Server-side live session relay (Supabase-backed).
 *
 * Persists live session state in the `desmos_live_sessions` table (one row per
 * normalized join code). Replaces the former in-memory Map, so sessions now
 * survive server restarts / serverless cold starts. The API contract is
 * unchanged, so clients (Zustand stores) need no modification.
 *
 * Uses the service-role key: the relay is the access gate (the table has RLS on
 * with no policies, so it is unreachable directly via the Data API).
 *
 *   GET    /api/live/[code]  → { session, activity, students, updatedAt }  (404 if not found)
 *   POST   /api/live/[code]  ← { session, activity }                       (create / replace)
 *   PATCH  /api/live/[code]  ← { session?: partial, student?: StudentProgressData }
 */
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

function svc() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

// Normalise join codes: "9VX-6PY" and "9vx6py" both become "9vx6py".
function norm(code: string) {
  return code.replace(/-/g, "").toLowerCase()
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params
  const { data } = await svc()
    .from("desmos_live_sessions")
    .select("session, activity, students, updated_at")
    .eq("code", norm(code))
    .maybeSingle()
  if (!data) return Response.json({ error: "not_found" }, { status: 404 })
  return Response.json({
    session: data.session,
    activity: data.activity,
    students: data.students,
    updatedAt: data.updated_at,
  })
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params
  const body = (await req.json()) as {
    session?: Record<string, unknown>
    activity?: Record<string, unknown>
    students?: Record<string, unknown>
  }
  const c = norm(code)
  const supabase = svc()
  const { data: existing } = await supabase
    .from("desmos_live_sessions")
    .select("session, activity, students")
    .eq("code", c)
    .maybeSingle()

  await supabase.from("desmos_live_sessions").upsert({
    code: c,
    session: body.session ?? existing?.session ?? {},
    activity: body.activity ?? existing?.activity ?? {},
    students: body.students ?? existing?.students ?? {},
    updated_at: new Date().toISOString(),
  })
  return Response.json({ ok: true })
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params
  const body = (await req.json()) as {
    session?: Record<string, unknown>
    student?: Record<string, unknown>
  }
  const c = norm(code)
  const supabase = svc()

  const { data: existing } = await supabase
    .from("desmos_live_sessions")
    .select("session, students")
    .eq("code", c)
    .maybeSingle()
  if (!existing) return Response.json({ error: "not_found" }, { status: 404 })

  const session = body.session
    ? { ...(existing.session as Record<string, unknown>), ...body.session }
    : existing.session
  const students = (existing.students ?? {}) as Record<string, unknown>
  if (body.student && typeof body.student.id === "string") {
    students[body.student.id as string] = body.student
  }

  await supabase
    .from("desmos_live_sessions")
    .update({ session, students, updated_at: new Date().toISOString() })
    .eq("code", c)
  return Response.json({ ok: true })
}
