import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-lb/server";
import { createJoinCode } from "@/lib/teacher/classes";

interface CreateClassRequest {
  teacherId: string;
  worldId: string;
  name: string;
}

function teacherFromRequest(req: Request): string | null {
  const headerId = req.headers.get("x-teacher-id");
  if (headerId) return headerId;
  const fallback = process.env.LEARNBOOK_TEACHER_ID;
  return fallback ?? null;
}

export async function GET(req: Request) {
  const teacherId = teacherFromRequest(req);
  if (!teacherId) {
    return NextResponse.json({ error: "Teacher identity missing." }, { status: 401 });
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("classes")
    .select("id,name,join_code,is_active,world_id,created_at")
    .eq("teacher_id", teacherId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ classes: data ?? [] });
}

export async function POST(req: Request) {
  const teacherId = teacherFromRequest(req);
  if (!teacherId) {
    return NextResponse.json({ error: "Teacher identity missing." }, { status: 401 });
  }

  const body = (await req.json()) as Partial<CreateClassRequest>;
  if (!body.worldId || !body.name) {
    return NextResponse.json({ error: "Missing class name or world." }, { status: 400 });
  }

  const supabase = createServerClient();
  const joinCode = createJoinCode();

  const { data, error } = await supabase
    .from("classes")
    .insert({
      teacher_id: teacherId,
      world_id: body.worldId,
      name: body.name,
      join_code: joinCode,
      is_active: true,
      class_code: joinCode,
      teacher: "LearnBook Teacher",
      teacher_pin: "1234",
    } as never)
    .select("id,name,join_code,is_active,world_id,created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ class: data });
}
