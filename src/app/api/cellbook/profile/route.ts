import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-lb/server";
import { scoreCellbookProfile } from "@/lib/cellbook/scoring";
import { computeBadgeKeys, computeStreakDays } from "@/lib/cellbook/rewards";

interface CreateProfileRequest {
  studentId: string;
  classId: string;
  worldId: string;
  organelle: string;
  functionText: string;
  locationText: string;
}

function computeXp(scoreValue: number) {
  if (scoreValue >= 85) return 20;
  if (scoreValue >= 70) return 15;
  if (scoreValue >= 55) return 10;
  return 5;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<CreateProfileRequest>;
    if (!body.studentId || !body.classId || !body.worldId || !body.organelle) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const payload = {
      organelle: body.organelle,
      functionText: body.functionText ?? "",
      locationText: body.locationText ?? "",
    };
    const score = scoreCellbookProfile(payload);

    const supabase = createServerClient();
    const { data: artifact, error: artifactError } = await supabase
      .from("artifacts")
      .insert({
        student_id: body.studentId,
        class_id: body.classId,
        world_id: body.worldId,
        artifact_type: "organelle_card",
        payload: payload,
        status: "submitted",
        version: 1,
      })
      .select("id")
      .single();

    if (artifactError || !artifact) {
      return NextResponse.json(
        { error: "Failed to create artifact.", details: artifactError?.message },
        { status: 500 }
      );
    }

    const { error: scoreError } = await supabase.from("scores").insert({
      artifact_id: artifact.id,
      score_value: score.scoreValue,
      max_score: score.maxScore,
      rubric_id: score.rubricId,
      source: "ai",
      ai_raw_response: {
        model: "rules-v1",
        dimensionScores: score.dimensionScores,
        overallFeedback: score.overallFeedback,
      },
    });

    if (scoreError) {
      return NextResponse.json(
        { error: "Failed to store score.", details: scoreError.message },
        { status: 500 }
      );
    }

    await supabase.from("feed_posts").insert({
      artifact_id: artifact.id,
      class_id: body.classId,
      student_id: body.studentId,
      caption: `${payload.organelle}: ${payload.functionText}`,
      reaction_counts: {},
      class_code: "CELL01",
      type: "profile_submission",
      content: payload.functionText,
    } as never);

    const xpDelta = computeXp(score.scoreValue);
    const { error: xpError } = await supabase.from("xp_events").insert({
      student_id: body.studentId,
      class_id: body.classId,
      world_id: body.worldId,
      action_type: "profile_submit",
      xp_delta: xpDelta,
      reference_id: artifact.id,
    });

    if (xpError) {
      return NextResponse.json(
        { error: "Failed to store XP event.", details: xpError.message },
        { status: 500 }
      );
    }

    const { data: xpRows, error: xpReadError } = await supabase
      .from("xp_events")
      .select("xp_delta")
      .eq("student_id", body.studentId)
      .eq("class_id", body.classId);

    if (xpReadError) {
      return NextResponse.json(
        { error: "Failed to load XP totals.", details: xpReadError.message },
        { status: 500 }
      );
    }

    const totalXp = (xpRows ?? []).reduce((sum, row) => sum + row.xp_delta, 0);
    const { count: artifactCount } = await supabase
      .from("artifacts")
      .select("id", { count: "exact", head: true })
      .eq("student_id", body.studentId)
      .eq("class_id", body.classId);

    const { data: submissionRows } = await supabase
      .from("artifacts")
      .select("created_at")
      .eq("student_id", body.studentId)
      .eq("class_id", body.classId)
      .order("created_at", { ascending: false })
      .limit(60);

    const streakDays = computeStreakDays((submissionRows ?? []).map((r) => r.created_at));
    const badgeKeys = computeBadgeKeys({
      totalXp,
      scoreValue: score.scoreValue,
      artifactCount: artifactCount ?? 0,
    });

    const { data: existingBadges } = await supabase
      .from("badges")
      .select("badge_type")
      .eq("student_id", body.studentId);

    const existingSet = new Set((existingBadges ?? []).map((b) => b.badge_type));
    const missing = badgeKeys.filter((key) => !existingSet.has(key));
    if (missing.length > 0) {
      const inserts = missing.map((badgeType) => ({
        student_id: body.studentId,
        badge_type: badgeType,
        world_id: body.worldId,
        metadata: { source: "profile_submit" },
        badge_id: badgeType,
      }));
      await supabase.from("badges").insert(inserts as never);
    }

    const unlocks = {
      profileTheme: totalXp >= 25,
      feedReactions: totalXp >= 60,
      advancedCard: totalXp >= 100,
    };

    return NextResponse.json({
      artifactId: artifact.id,
      score,
      xp: {
        delta: xpDelta,
        total: totalXp,
        unlocks,
      },
      rewards: {
        streakDays,
        badgeKeys,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
