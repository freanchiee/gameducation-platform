import { NextResponse } from "next/server";
import { generateFeedback, type FeedbackInput } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as FeedbackInput;
    const feedback = await generateFeedback(body);
    return NextResponse.json({ feedback });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
