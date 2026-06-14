// Ported from flippity-clone — fetch Google Sheets data via a service account.
import { google } from "googleapis"
import { JWT } from "google-auth-library"
import { NextResponse } from "next/server"

async function getAuthClient(): Promise<JWT> {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  const client = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  })
  await client.authorize()
  return client
}

async function readSpreadsheet(
  spreadsheetId: string,
  range: string,
): Promise<string[][]> {
  const auth = await getAuthClient()
  const sheets = google.sheets({ version: "v4", auth })
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range })
  return response.data.values as string[][]
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    spreadsheetId: string
    range: string
    gameType: string
  }
  const { spreadsheetId, range, gameType } = body

  if (!spreadsheetId || !range || !gameType) {
    return NextResponse.json(
      { message: "Missing required parameters" },
      { status: 400 },
    )
  }

  try {
    if (
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY
    ) {
      return NextResponse.json(
        { message: "Server configuration error: Missing Google API credentials" },
        { status: 500 },
      )
    }

    const data = await readSpreadsheet(spreadsheetId, range)
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { message: "No data found in spreadsheet or invalid format" },
        { status: 404 },
      )
    }

    return NextResponse.json({ data: transformData(data, gameType) })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { message: "Error fetching spreadsheet data", error: message },
      { status: 500 },
    )
  }
}

function transformData(data: string[][], gameType: string): unknown {
  switch (gameType) {
    case "flashcards":
      return transformFlashcards(data)
    default:
      return data
  }
}

function transformFlashcards(data: string[][]): {
  title: string
  cards: Array<{ front: string; back: string; image: string | null }>
} {
  const cards = data.slice(1).map((row) => ({
    front: row[0] || "",
    back: row[1] || "",
    image: row[2] || null,
  }))
  return { title: data[0]?.[0] || "Flashcards", cards }
}
