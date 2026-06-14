import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-lb/server";
import { validateWorldSlug } from "@/lib/worlds";
import { scoreWorldArtifact, type GenericArtifactInput } from "@/lib/worlds/artifact-engine";
import { WORLD_TEMPLATES } from "@/lib/worlds/templates";

interface CreateWorldArtifactRequest extends GenericArtifactInput {
  studentId: string;
  classId: string;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ worldSlug: string }> }
) {
  const { worldSlug } = await params;
  if (!validateWorldSlug(worldSlug)) {
    return NextResponse.json({ error: "Unknown world." }, { status: 404 });
  }

  const body = (await req.json()) as Partial<CreateWorldArtifactRequest>;
  if (!body.studentId || !body.classId || !body.title || !body.explanation) {
    return NextResponse.json({ error: "Missing artifact fields." }, { status: 400 });
  }

  const supabase = createServerClient();
  const template = WORLD_TEMPLATES[worldSlug];
  const { data: existingWorld } = await supabase.from("worlds").select("id").eq("slug", worldSlug).single();
  const world =
    existingWorld ??
    (
      await supabase
        .from("worlds")
        .insert({
          slug: worldSlug,
          display_name: template.displayName,
          subject_accent: { artifactType: template.artifactType },
          artifact_schema_version: 1,
        })
        .select("id")
        .single()
    ).data;

  if (!world) {
    return NextResponse.json({ error: "Unable to resolve world." }, { status: 500 });
  }
  const score = scoreWorldArtifact(worldSlug, {
    title: body.title,
    explanation: body.explanation,
    evidence: body.evidence ?? "",
  });

  const { data: artifact, error: artifactError } = await supabase
    .from("artifacts")
    .insert({
      student_id: body.studentId,
      class_id: body.classId,
      world_id: world.id,
      artifact_type: template.artifactType,
      payload: {
        title: body.title,
        explanation: body.explanation,
        evidence: body.evidence ?? "",
      },
      status: "submitted",
      version: 1,
    })
    .select("id")
    .single();

  if (artifactError || !artifact) {
    return NextResponse.json({ error: artifactError?.message ?? "Failed to save artifact." }, { status: 500 });
  }

  await supabase.from("scores").insert({
    artifact_id: artifact.id,
    score_value: score.scoreValue,
    max_score: score.maxScore,
    rubric_id: score.rubricId,
    source: "ai",
    ai_raw_response: score,
    teacher_override_note: null,
  });

  return NextResponse.json({ artifactId: artifact.id, score });
}
