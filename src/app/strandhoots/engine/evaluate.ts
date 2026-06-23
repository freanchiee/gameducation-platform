// Pure, offline auto-leveling for strandhoot responses. No AI — keyword/answer
// heuristics that mirror the vendored exemplars, so it runs fully client-side.
import type {
  Badge,
  Level,
  Question,
  ResponseSpec,
  RubricBand,
  StrandhootPack,
  TargetLevel,
} from "./types"

const BANDS: TargetLevel[] = [2, 4, 6, 8]

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s%.+-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

/** Distinct keywords (lower-cased phrases) that appear in `text`. */
export function matchedKeywords(text: string, keywords: string[]): string[] {
  const hay = norm(text)
  if (!hay) return []
  const hits = new Set<string>()
  for (const kw of keywords) {
    const needle = norm(kw)
    if (needle && hay.includes(needle)) hits.add(kw)
  }
  return [...hits]
}

function bandQuota(band: RubricBand): number {
  return band.minKeywords ?? Math.max(1, Math.ceil(band.keywords.length * 0.6))
}

type BandStatus = "absent" | "met" | "unmet"

/** Highest band actually MET, walking up while no *present* lower band is unmet.
 *  An absent band (no content authored at that level) is transparent — it never
 *  blocks a higher band, and never awards its own level. */
function achievedLevel(status: Record<TargetLevel, BandStatus>): Level {
  let achieved: Level = 0
  for (const b of BANDS) {
    if (status[b] === "absent") continue
    if (status[b] === "met") achieved = b
    else break
  }
  return achieved
}

export interface TextEval {
  level: Level
  matched: string[]
  /** Per-band matched counts vs quota, for transparent feedback. */
  bands: { level: TargetLevel; matched: number; quota: number; met: boolean }[]
}

/** Level a free-text answer against a keyword rubric (design/data/reflection). */
export function evaluateText(rubric: RubricBand[], text: string): TextEval {
  const allMatched = new Set<string>()
  const wrote = norm(text).length >= 12 // require some writing before any level > 0
  const status = { 2: "absent", 4: "absent", 6: "absent", 8: "absent" } as Record<TargetLevel, BandStatus>
  const bands = BANDS.map((lvl) => {
    const band = rubric.find((r) => r.level === lvl)
    if (!band) return { level: lvl, matched: 0, quota: 0, met: false }
    const hits = matchedKeywords(text, band.keywords)
    hits.forEach((h) => allMatched.add(h))
    const quota = bandQuota(band)
    const met = wrote && hits.length >= quota
    status[lvl] = met ? "met" : "unmet"
    return { level: lvl, matched: hits.length, quota, met }
  })
  return { level: achievedLevel(status), matched: [...allMatched], bands }
}

export type QuestionAnswer =
  | { qid: string; choice?: string; fill?: string; short?: string; match?: Record<string, string> }

/** Is a single question answered correctly given the student's answer record? */
export function isQuestionCorrect(q: Question, ans?: QuestionAnswer): boolean {
  if (!ans) return false
  switch (q.type) {
    case "mcq":
      return !!q.options.find((o) => o.id === ans.choice)?.correct
    case "fill": {
      const got = norm(ans.fill ?? "")
      return q.answers.some((a) => norm(a) === got)
    }
    case "short": {
      const hits = matchedKeywords(ans.short ?? "", q.keywords).length
      const quota = q.minKeywords ?? Math.max(1, Math.ceil(q.keywords.length * 0.5))
      return hits >= quota
    }
    case "match": {
      const m = ans.match ?? {}
      return q.pairs.every((p) => norm(m[p.left] ?? "") === norm(p.right))
    }
  }
}

export interface QuestionEval {
  level: Level
  correct: number
  total: number
  bands: { level: TargetLevel; correct: number; total: number; met: boolean }[]
}

/** Level a question set: highest contiguous band whose questions are all correct. */
export function evaluateQuestions(
  questions: Question[],
  answers: Record<string, QuestionAnswer>,
): QuestionEval {
  const status = { 2: "absent", 4: "absent", 6: "absent", 8: "absent" } as Record<TargetLevel, BandStatus>
  let correct = 0
  const bands = BANDS.map((lvl) => {
    const qs = questions.filter((q) => q.level === lvl)
    if (qs.length === 0) return { level: lvl, correct: 0, total: 0, met: false }
    const ok = qs.filter((q) => isQuestionCorrect(q, answers[q.id])).length
    correct += ok
    const met = ok === qs.length
    status[lvl] = met ? "met" : "unmet"
    return { level: lvl, correct: ok, total: qs.length, met }
  })
  return { level: achievedLevel(status), correct, total: questions.length, bands }
}

/** Points: 10 per achieved level point (max 80/strand). */
export const pointsForLevel = (level: Level) => level * 10

/** Which badges are earned, given each strand's achieved level. */
export function earnedBadges(pack: StrandhootPack, levelByStrand: Record<string, Level>): Set<string> {
  const earned = new Set<string>()
  for (const b of pack.badges) {
    const target = b.atLevel ?? 8
    if (b.strandId) {
      if ((levelByStrand[b.strandId] ?? 0) >= target) earned.add(b.id)
    } else {
      // pack-wide: every strand at/above target
      if (pack.strands.every((s) => (levelByStrand[s.id] ?? 0) >= target)) earned.add(b.id)
    }
  }
  return earned
}

/** Convenience: does this response spec use free-text leveling? */
export function isTextResponse(r: ResponseSpec): r is Exclude<ResponseSpec, { kind: "questions" }> {
  return r.kind !== "questions"
}

export const bandLabel = (level: TargetLevel) =>
  ({ 2: "Level 1–2", 4: "Level 3–4", 6: "Level 5–6", 8: "Level 7–8" })[level]

export type { Badge }
