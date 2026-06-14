import { NextResponse } from "next/server";
import { writeAiAudit } from "@/lib/ai/audit";
import { createServerClient } from "@/lib/supabase-lb/server";

interface OverrideRequest {
  scoreId: string;
  scoreValue: number;
  teacherOverrideNote: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<OverrideRequest>;
    if (!body.scoreId || typeof body.scoreValue !== "number") {
      return NextResponse.json({ error: "Missing scoreId or scoreValue." }, { status: 400 });
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("scores")
      .update({
        score_value: body.scoreValue,
        source: "teacher",
        teacher_override_note: body.teacherOverrideNote ?? null,
      })
      .eq("id", body.scoreId)
      .select("id,artifact_id,score_value,max_score,rubric_id,source,teacher_override_note")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "Score not found." }, { status: 500 });
    }

    await writeAiAudit(supabase, {
      artifactId: data.artifact_id,
      scoreId: data.id,
      eventType: "teacher_override",
      inputPayload: body as Record<string, unknown>,
      outputPayload: data as unknown as Record<string, unknown>,
    }).catch(() => undefined);

    return NextResponse.json({ score: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
