import { NextResponse } from "next/server";
import { generateExemplar, type GenerateExemplarInput } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as GenerateExemplarInput;
    const exemplar = await generateExemplar(body);
    return NextResponse.json({ exemplar });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
