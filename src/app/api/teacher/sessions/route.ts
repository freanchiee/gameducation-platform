import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-lb/server";
import { createSessionCode } from "@/lib/teacher/classes";

interface CreateSessionRequest {
  teacherId?: string;
  classId: string;
  title: string;
}

interface PatchSessionRequest {
  teacherId?: string;
  sessionId: string;
  status: "lobby" | "active" | "ended";
}

function teacherFromRequest(req: Request, bodyTeacherId?: string): string | null {
  return req.headers.get("x-teacher-id") ?? bodyTeacherId ?? process.env.LEARNBOOK_TEACHER_ID ?? null;
}

export async function GET(req: Request) {
  const teacherId = teacherFromRequest(req);
  if (!teacherId) {
    return NextResponse.json({ error: "Teacher identity missing." }, { status: 401 });
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("sessions")
    .select("id,class_id,world_id,teacher_id,status,started_at,ended_at,created_at,title,session_code,class_code")
    .eq("teacher_id", teacherId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ sessions: data ?? [] });
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<CreateSessionRequest>;
  const teacherId = teacherFromRequest(req, body.teacherId);
  if (!teacherId) {
    return NextResponse.json({ error: "Teacher identity missing." }, { status: 401 });
  }
  if (!body.classId || !body.title) {
    return NextResponse.json({ error: "Missing class or title." }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data: klass, error: classError } = await supabase
    .from("classes")
    .select("id,world_id,join_code,class_code")
    .eq("id", body.classId)
    .single();

  if (classError || !klass) {
    return NextResponse.json(
      { error: "Class not found.", details: classError?.message },
      { status: 404 }
    );
  }

  const classCode = (klass as { class_code?: string | null; join_code?: string | null }).class_code ?? klass.join_code;
  const { data, error } = await supabase
    .from("sessions")
    .insert({
      class_id: body.classId,
      world_id: klass.world_id,
      teacher_id: teacherId,
      status: "lobby",
      class_code: classCode,
      session_code: createSessionCode(),
      title: body.title,
    } as never)
    .select("id,class_id,world_id,teacher_id,status,started_at,ended_at,created_at,title,session_code,class_code")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ session: data });
}

export async function PATCH(req: Request) {
  const body = (await req.json()) as Partial<PatchSessionRequest>;
  const teacherId = teacherFromRequest(req, body.teacherId);
  if (!teacherId) {
    return NextResponse.json({ error: "Teacher identity missing." }, { status: 401 });
  }
  if (!body.sessionId || !body.status) {
    return NextResponse.json({ error: "Missing session or status." }, { status: 400 });
  }

  const supabase = createServerClient();
  const update: Record<string, unknown> = { status: body.status };
  if (body.status === "active") update.started_at = new Date().toISOString();
  if (body.status === "ended") update.ended_at = new Date().toISOString();

  const { data: session, error } = await supabase
    .from("sessions")
    .update(update as never)
    .eq("id", body.sessionId)
    .eq("teacher_id", teacherId)
    .select("id,class_id,world_id,teacher_id,status,started_at,ended_at,created_at,title,session_code,class_code")
    .single();

  if (error || !session) {
    return NextResponse.json(
      { error: "Failed to update session.", details: error?.message },
      { status: 500 }
    );
  }

  if (body.status === "active") {
    const { data: enrollments } = await supabase
      .from("class_enrollments")
      .select("student_id")
      .eq("class_id", session.class_id);

    const participantRows = (enrollments ?? []).map((row) => ({
      session_id: session.id,
      student_id: row.student_id,
    }));

    if (participantRows.length > 0) {
      await supabase.from("session_participants").upsert(participantRows as never, {
        onConflict: "session_id,student_id",
      });
    }
  }

  return NextResponse.json({ session });
}
