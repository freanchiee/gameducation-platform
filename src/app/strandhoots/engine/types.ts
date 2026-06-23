// ─────────────────────────────────────────────────────────────────────────────
// Strandhoot Engine — content-pack type contract
//
// A "strandhoot" is a criterion-aligned, gamified MYP Sciences assessment. Rather
// than ship one hand-built SPA per strandhoot (20 npm installs = disk pain), the
// platform renders ALL strandhoots from a single data-driven engine
// (<StrandhootEngine pack={…}/>) that reads a typed StrandhootPack.
//
// MYP achievement bands are 1–2 / 3–4 / 5–6 / 7–8; the engine shows them as
// Level 2 / 4 / 6 / 8 (the band ceiling) and persists 0–8 to the shared
// `responses` table (strand1..5 + strand1..5_level) so the live teacher
// dashboard can read progress.
// ─────────────────────────────────────────────────────────────────────────────

/** Displayed MYP band ceiling. 0 = "not yet". */
export type Level = 0 | 2 | 4 | 6 | 8
/** A level a piece of content targets (band ceilings only). */
export type TargetLevel = 2 | 4 | 6 | 8

export const MYP_CRITERIA = {
  A: "Criterion A — Knowing & Understanding",
  B: "Criterion B — Inquiring & Designing",
  C: "Criterion C — Processing & Evaluating",
  D: "Criterion D — Reflecting on the Impacts of Science",
} as const
export type Criterion = keyof typeof MYP_CRITERIA

// ── Badges ───────────────────────────────────────────────────────────────────
export interface Badge {
  id: string
  label: string
  /** emoji */
  icon: string
  description: string
  /** Earned when this strand reaches `atLevel` (default 8). Omit strandId for a
   *  pack-wide badge earned when every strand reaches `atLevel`. */
  strandId?: string
  atLevel?: TargetLevel
}

// ── Guided examples (leveled exemplars, expandable) ──────────────────────────
export interface GuidedExample {
  level: TargetLevel
  /** e.g. "Level 5–6". Defaults to a label derived from `level`. */
  label?: string
  body: string
}

// ── Keyword rubric (drives auto-leveling of free-text responses) ─────────────
export interface RubricBand {
  level: TargetLevel
  descriptor: string
  /** Lower-cased phrases; a band is "met" when enough distinct ones appear. */
  keywords: string[]
  /** How many distinct keywords this band needs. Defaults to ~60% of keywords. */
  minKeywords?: number
}

// ── Response engines (discriminated union, one per strand) ───────────────────

// A — Knowing & Understanding: question engine
export interface MCQQuestion {
  type: "mcq"
  id: string
  level: TargetLevel
  prompt: string
  options: { id: string; text: string; correct?: boolean }[]
  explanation?: string
}
export interface FillQuestion {
  type: "fill"
  id: string
  level: TargetLevel
  /** Use ▁ (or {blank}) to mark the gap in the prompt. */
  prompt: string
  /** Accepted answers (compared case-insensitively, trimmed). */
  answers: string[]
  explanation?: string
}
export interface ShortQuestion {
  type: "short"
  id: string
  level: TargetLevel
  prompt: string
  /** Lower-cased keywords scored against the student's answer. */
  keywords: string[]
  minKeywords?: number
  sample?: string
}
export interface MatchQuestion {
  type: "match"
  id: string
  level: TargetLevel
  prompt: string
  pairs: { left: string; right: string }[]
}
export type Question = MCQQuestion | FillQuestion | ShortQuestion | MatchQuestion

export interface QuestionSpec {
  kind: "questions"
  questions: Question[]
}

// B — Inquiring & Designing: scaffolded leveled free-text builder
export interface DesignSpec {
  kind: "design"
  /** Optional prompt shown above the editor. */
  prompt?: string
  placeholder?: string
  /** Sentence starters / scaffolds shown as chips. */
  scaffolds?: string[]
  rubric: RubricBand[]
}

// C — Processing & Evaluating: data-processing tool + written analysis
export interface DataSpec {
  kind: "data"
  prompt: string
  placeholder?: string
  scaffolds?: string[]
  rubric: RubricBand[]
}

// D — Reflecting on impacts: scenario MCQ warm-up + reflective writing
export interface ReflectionSpec {
  kind: "reflection"
  /** Optional scenario MCQs (award points/feel; level comes from the writing). */
  scenarios?: {
    id: string
    prompt: string
    options: { id: string; text: string; correct?: boolean }[]
    explanation?: string
  }[]
  prompt: string
  placeholder?: string
  scaffolds?: string[]
  rubric: RubricBand[]
}

export type ResponseSpec = QuestionSpec | DesignSpec | DataSpec | ReflectionSpec

// ── Strand ───────────────────────────────────────────────────────────────────
export interface Strand {
  /** Stable id. Position in the array maps to strand1..5 in `responses`. */
  id: string
  name: string
  descriptor: string
  guided: GuidedExample[]
  response: ResponseSpec
  /** Key into the artifact registry → renders a 🔬 Simulation tab. */
  artifactKey?: string
  /** Props forwarded to the artifact component. */
  artifactProps?: Record<string, unknown>
}

// ── Learning path / experiment chooser ───────────────────────────────────────
export interface Path {
  id: string
  label: string
  blurb: string
  icon?: string
}

// ── The pack ─────────────────────────────────────────────────────────────────
export interface StrandhootPack {
  slug: string
  title: string
  subject: string
  criterion: Criterion
  topic: string
  /** hex, e.g. #1b7888 */
  accent: string
  /** emoji */
  icon: string
  statementOfInquiry: string
  estMinutes: number
  intro: string
  badges: Badge[]
  /** 1–2 paths; if a single path the chooser is skipped. */
  paths: Path[]
  /** 4–5 strands → strand1..5. */
  strands: Strand[]
}

// ── Per-strand evaluation result (computed by the engine) ────────────────────
export interface StrandResult {
  level: Level
  /** Human-readable evidence, e.g. matched keywords or quiz tally. */
  detail: string
  /** Raw text the student wrote (for free-text kinds) — saved to responses. */
  text: string
}
