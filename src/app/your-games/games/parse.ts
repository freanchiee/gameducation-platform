import type { Rows } from "./types"

/**
 * Parse pasted text into tabular rows. Auto-detects tab- vs comma-separated
 * (tabs win if any line contains one — that's what you get pasting from a
 * spreadsheet). Blank lines are dropped; quoted CSV cells are unwrapped.
 */
export function parseTabular(text: string): Rows {
  const lines = text.replace(/\r\n?/g, "\n").split("\n").filter((l) => l.trim() !== "")
  const useTab = lines.some((l) => l.includes("\t"))
  return lines.map((line) => {
    if (useTab) return line.split("\t").map((c) => c.trim())
    return splitCsv(line)
  })
}

/** Minimal CSV line splitter that respects double-quoted cells with commas. */
function splitCsv(line: string): string[] {
  const out: string[] = []
  let cur = ""
  let inQ = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQ) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++ } else inQ = false
      } else cur += ch
    } else if (ch === '"') inQ = true
    else if (ch === ",") { out.push(cur.trim()); cur = "" }
    else cur += ch
  }
  out.push(cur.trim())
  return out
}

/** Pull a spreadsheet ID out of a full Google Sheets URL (or pass through an ID). */
export function sheetId(urlOrId: string): string {
  const m = urlOrId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  return m ? m[1] : urlOrId.trim()
}

/** Fetch raw rows from a Google Sheet via the server route (creds permitting). */
export async function fetchSheetRows(urlOrId: string): Promise<Rows> {
  const res = await fetch("/api/sheets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ spreadsheetId: sheetId(urlOrId), range: "Sheet1!A:Z", gameType: "raw" }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message || "Could not read that sheet")
  return (json.data as Rows) ?? []
}
