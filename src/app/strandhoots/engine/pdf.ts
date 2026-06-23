// Minimal client-side PDF report via CDN-loaded jsPDF (matches the vendored
// exemplars — avoids adding a build dependency).
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StrandhootPack, Level } from "./types"

const CDN = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"

function ensureJsPDF(): Promise<any> {
  return new Promise((resolve, reject) => {
    const w = window as any
    if (w.jspdf?.jsPDF) return resolve(w.jspdf.jsPDF)
    const existing = document.querySelector(`script[src="${CDN}"]`)
    if (existing) {
      existing.addEventListener("load", () => resolve((window as any).jspdf.jsPDF))
      existing.addEventListener("error", reject)
      return
    }
    const s = document.createElement("script")
    s.src = CDN
    s.onload = () => resolve((window as any).jspdf.jsPDF)
    s.onerror = reject
    document.head.appendChild(s)
  })
}

export interface ReportStrand {
  name: string
  level: Level
  text: string
}

export async function generateReport(
  pack: StrandhootPack,
  studentName: string,
  strands: ReportStrand[],
  points: number,
  badges: string[],
) {
  const jsPDF = await ensureJsPDF()
  const doc = new jsPDF()
  const W = 210
  const M = 16
  let y = 20

  const line = (txt: string, size = 11, bold = false, color = "#1f2937") => {
    doc.setFontSize(size)
    doc.setFont("helvetica", bold ? "bold" : "normal")
    doc.setTextColor(color)
    const parts = doc.splitTextToSize(txt, W - 2 * M)
    for (const p of parts) {
      if (y > 280) {
        doc.addPage()
        y = 20
      }
      doc.text(p, M, y)
      y += size * 0.55
    }
  }

  // Header band
  doc.setFillColor(pack.accent)
  doc.rect(0, 0, W, 4, "F")
  line(`${pack.icon}  ${pack.title}`, 18, true, pack.accent)
  line(`${pack.subject} · ${pack.topic}`, 11, false, "#64748b")
  y += 2
  line(`Student: ${studentName || "—"}`, 11, true)
  line(`Total points: ${points}    Badges: ${badges.length ? badges.join(", ") : "none yet"}`, 10, false, "#475569")
  y += 4

  for (const s of strands) {
    line(`${s.name}  —  Level ${s.level}/8`, 12, true, pack.accent)
    line(s.text?.trim() ? s.text.trim() : "(no response)", 10, false, "#334155")
    y += 4
  }

  doc.save(`${pack.slug}-${(studentName || "student").replace(/\s+/g, "-").toLowerCase()}.pdf`)
}
