// Ported from flippity-clone — games CRUD, rewritten onto @supabase/ssr + getUser().
import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      spreadsheetId,
      gameType,
      title = `${gameType.charAt(0).toUpperCase() + gameType.slice(1)} Game`,
    }: { spreadsheetId: string; gameType: string; title?: string } =
      await req.json()

    if (!spreadsheetId || !gameType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data: existingGame } = await supabase
      .from("games")
      .select("id")
      .eq("user_id", user.id)
      .eq("spreadsheet_id", spreadsheetId)
      .eq("type", gameType)
      .maybeSingle()

    const result = existingGame?.id
      ? await supabase
          .from("games")
          .update({ title, created_at: new Date().toISOString() })
          .eq("id", existingGame.id)
          .select()
          .single()
      : await supabase
          .from("games")
          .insert({
            user_id: user.id,
            spreadsheet_id: spreadsheetId,
            type: gameType,
            title,
          })
          .select()
          .single()

    if (result.error) {
      return NextResponse.json({ error: "Failed to save game" }, { status: 500 })
    }
    return NextResponse.json({ success: true, game: result.data })
  } catch (error) {
    console.error("Error in POST /api/games:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 })
    }
    return NextResponse.json({ games: data })
  } catch (error) {
    console.error("Error in GET /api/games:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
