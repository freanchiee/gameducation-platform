import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-lb/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const classId = url.searchParams.get("classId");
  const sessionId = url.searchParams.get("sessionId");

  if (!classId) {
    return NextResponse.json({ error: "Missing classId." }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data: enrollments, error: enrollmentError } = await supabase
    .from("class_enrollments")
    .select("student_id")
    .eq("class_id", classId);

  if (enrollmentError) {
    return NextResponse.json({ error: enrollmentError.message }, { status: 500 });
  }

  const studentIds = (enrollments ?? []).map((row) => row.student_id);
  if (studentIds.length === 0) {
    return NextResponse.json({ rows: [] });
  }

  const [{ data: students }, { data: artifacts }, { data: xpEvents }, { data: badges }, { data: participants }] =
    await Promise.all([
      supabase.from("students").select("id,display_name").in("id", studentIds),
      supabase.from("artifacts").select("id,student_id,status").eq("class_id", classId).in("student_id", studentIds),
      supabase.from("xp_events").select("student_id,xp_delta").eq("class_id", classId).in("student_id", studentIds),
      supabase.from("badges").select("student_id,badge_type").in("student_id", studentIds),
      sessionId
        ? supabase
            .from("session_participants")
            .select("student_id,joined_at,completed_at")
            .eq("session_id", sessionId)
            .in("student_id", studentIds)
        : Promise.resolve({ data: [] }),
    ]);

  const rows = studentIds.map((studentId) => {
    const student = (students ?? []).find((row) => row.id === studentId);
    const studentArtifacts = (artifacts ?? []).filter((row) => row.student_id === studentId);
    const totalXp = (xpEvents ?? [])
      .filter((row) => row.student_id === studentId)
      .reduce((sum, row) => sum + row.xp_delta, 0);
    const studentBadges = (badges ?? []).filter((row) => row.student_id === studentId);
    const participant = (participants ?? []).find((row) => row.student_id === studentId);

    return {
      studentId,
      displayName: student?.display_name ?? "Student",
      artifactCount: studentArtifacts.length,
      submittedCount: studentArtifacts.filter((artifact) => artifact.status !== "draft").length,
      totalXp,
      badgeCount: studentBadges.length,
      joinedAt: participant?.joined_at ?? null,
      completedAt: participant?.completed_at ?? null,
    };
  });

  return NextResponse.json({ rows });
}
