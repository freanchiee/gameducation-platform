import { NextResponse } from "next/server";
import { generateRubric, type GenerateRubricInput } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerateRubricInput;
    const rubric = await generateRubric(body);
    return NextResponse.json({ rubric });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
