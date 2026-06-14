import { NextResponse } from "next/server";
import { scoreArtifact, type ScoreInput } from "@/lib/ai";
import { writeAiAudit } from "@/lib/ai/audit";
import { createServerClient } from "@/lib/supabase-lb/server";

interface ScoreRequest extends ScoreInput {
  artifactId?: string;
  persist?: boolean;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ScoreRequest;
    const output = await scoreArtifact(body);
    let scoreId: string | null = null;

    if (body.persist && body.artifactId) {
      const supabase = createServerClient();
      const { data } = await supabase
        .from("scores")
        .insert({
          artifact_id: body.artifactId,
          score_value: output.scoreValue,
          max_score: output.maxScore,
          rubric_id: body.rubricId,
          source: "ai",
          ai_raw_response: output as unknown as Record<string, unknown>,
          teacher_override_note: null,
        })
        .select("id")
        .single();
      scoreId = data?.id ?? null;
      await writeAiAudit(supabase, {
        artifactId: body.artifactId,
        scoreId,
        eventType: "ai_score",
        inputPayload: body as unknown as Record<string, unknown>,
        outputPayload: output as unknown as Record<string, unknown>,
      }).catch(() => undefined);
    }

    return NextResponse.json({ score: output, scoreId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
