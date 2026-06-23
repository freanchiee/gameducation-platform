"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, ChevronDown, Clock, Download, RotateCcw, Trophy } from "lucide-react"
import type { Level, Strand, StrandhootPack } from "./types"
import { MYP_CRITERIA } from "./types"
import {
  bandLabel,
  earnedBadges,
  evaluateQuestions,
  evaluateText,
  pointsForLevel,
  type QuestionAnswer,
} from "./evaluate"
import QuestionEngine from "./responses/QuestionEngine"
import LeveledTextResponse from "./responses/LeveledTextResponse"
import ScenarioQuiz, { type ScenarioAnswers } from "./responses/ScenarioQuiz"
import ArtifactSlot, { hasArtifact } from "../artifacts/registry"
import { isUuid, loadResponses, pingTyping, saveStrand, type SyncCtx } from "./sync"
import { generateReport } from "./pdf"

type QAnswers = Record<string, QuestionAnswer>
type Screen = "welcome" | "dashboard" | "strand" | "results"

function levelColor(level: Level) {
  if (level >= 7) return "#10b981"
  if (level >= 5) return "#3b82f6"
  if (level >= 3) return "#f59e0b"
  if (level >= 1) return "#ef4444"
  return "#cbd5e1"
}

export default function StrandhootEngine({
  pack,
  studentId,
  sessionCode,
  initialName,
}: {
  pack: StrandhootPack
  studentId: string
  sessionCode: string
  initialName?: string
}) {
  const [screen, setScreen] = useState<Screen>("welcome")
  const [name, setName] = useState(initialName ?? "")
  const [pathId, setPathId] = useState<string | null>(pack.paths.length === 1 ? pack.paths[0].id : null)
  const [active, setActive] = useState(0)

  const [qAnswers, setQAnswers] = useState<Record<string, QAnswers>>({})
  const [text, setText] = useState<Record<string, string>>({})
  const [scenario, setScenario] = useState<Record<string, ScenarioAnswers>>({})

  const accent = pack.accent
  const ctx: SyncCtx = useMemo(
    () => ({ studentId, sessionCode, slug: pack.slug, playerName: name }),
    [studentId, sessionCode, pack.slug, name],
  )

  // Per-strand evaluation (level + the text we persist + feedback).
  const evalStrand = (s: Strand) => {
    const r = s.response
    if (r.kind === "questions") {
      const e = evaluateQuestions(r.questions, qAnswers[s.id] ?? {})
      return {
        level: e.level,
        save: `Quiz — Level ${e.level}/8 (${e.correct}/${e.total} correct)`,
        qeval: e,
        feedback: null,
      }
    }
    const t = text[s.id] ?? ""
    const fb = evaluateText(r.rubric, t)
    return { level: fb.level, save: t, qeval: null, feedback: fb }
  }

  const levels = useMemo(() => {
    const m: Record<string, Level> = {}
    for (const s of pack.strands) m[s.id] = evalStrand(s).level
    return m
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pack, qAnswers, text])

  const scenarioBonus = useMemo(() => {
    let pts = 0
    for (const s of pack.strands) {
      if (s.response.kind !== "reflection" || !s.response.scenarios) continue
      const ans = scenario[s.id] ?? {}
      for (const sc of s.response.scenarios) {
        if (sc.options.find((o) => o.id === ans[sc.id])?.correct) pts += 5
      }
    }
    return pts
  }, [pack, scenario])

  const points = pack.strands.reduce((a, s) => a + pointsForLevel(levels[s.id] ?? 0), 0) + scenarioBonus
  const badges = useMemo(() => earnedBadges(pack, levels), [pack, levels])

  // Restore saved free-text answers once (refresh / rejoin keeps progress).
  useEffect(() => {
    if (!isUuid(studentId)) return
    let cancelled = false
    loadResponses(ctx).then((row) => {
      if (cancelled || !row) return
      setText((prev) => {
        const next = { ...prev }
        pack.strands.forEach((s, i) => {
          const saved = row.strands[i + 1]
          if (saved && s.response.kind !== "questions" && next[s.id] == null) next[s.id] = saved.text
        })
        return next
      })
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Debounced save of the active strand whenever its inputs change.
  useEffect(() => {
    if (screen === "welcome" || !isUuid(studentId)) return
    const s = pack.strands[active]
    if (!s) return
    const { level, save } = evalStrand(s)
    void pingTyping(ctx, true)
    const id = window.setTimeout(() => void saveStrand(ctx, active + 1, save, level), 800)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, active, qAnswers, text, scenario, ctx])

  // ── WELCOME ────────────────────────────────────────────────────────────────
  if (screen === "welcome") {
    const ready = name.trim().length > 0 && (pack.paths.length <= 1 || pathId)
    return (
      <Shell accent={accent}>
        {/* Exemplar-style full-width accent header */}
        <SHeader
          accent={accent}
          title={pack.title}
          subtitle={`${pack.subject} · ${MYP_CRITERIA[pack.criterion]}`}
        />
        <Card>
          {/* Centred icon + title inside the card */}
          <div className="pt-8 pb-4 text-center px-6">
            <div className="text-5xl mb-3">{pack.icon}</div>
            <h1 className="text-2xl font-extrabold text-slate-900">{pack.title}</h1>
            <p className="mt-1 text-sm font-semibold" style={{ color: accent }}>
              <Clock className="size-3.5 inline mr-1 -mt-0.5" /> ~{pack.estMinutes} min · {pack.strands.length} strands
            </p>
          </div>

          <div className="px-6 pb-4">
            {/* Statement of Inquiry */}
            <div className="mb-5 rounded-xl border-l-4 bg-slate-50 p-4" style={{ borderColor: accent }}>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Statement of Inquiry</p>
              <p className="mt-1 italic text-slate-700">"{pack.statementOfInquiry}"</p>
            </div>

            <p className="mb-6 text-sm text-slate-600">{pack.intro}</p>

            {/* Badges — 3-col grid with description, matching exemplar */}
            <p className="mb-3 font-bold text-slate-700">🏅 Available Badges</p>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {pack.badges.map((b) => (
                <div
                  key={b.id}
                  className="rounded-xl border border-black/10 p-3"
                  style={{ background: `${accent}08` }}
                >
                  <div className="text-2xl mb-1">{b.icon}</div>
                  <div className="text-xs font-bold text-slate-700">{b.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{b.description}</div>
                </div>
              ))}
            </div>

            {/* Name */}
            <label className="mb-4 block">
              <span className="text-sm font-bold text-slate-700">Your Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name…"
                className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2.5 outline-none focus:border-current"
                style={{ caretColor: accent }}
              />
            </label>

            {/* Paths */}
            {pack.paths.length > 1 && (
              <div className="mb-6">
                <p className="mb-2 text-sm font-bold text-slate-700">Choose Your Learning Path</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {pack.paths.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPathId(p.id)}
                      className={`rounded-xl border-2 p-4 text-left transition ${pathId === p.id ? "" : "border-black/10 hover:bg-black/5"}`}
                      style={pathId === p.id ? { borderColor: accent, background: `${accent}10` } : undefined}
                    >
                      <div className="text-2xl">{p.icon ?? "🧭"}</div>
                      <div className="mt-1 font-bold text-slate-800">{p.label}</div>
                      <div className="text-xs text-slate-500">{p.blurb}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              disabled={!ready}
              onClick={() => setScreen("dashboard")}
              className="w-full rounded-xl py-3 text-base font-bold text-white shadow-sm transition disabled:opacity-40"
              style={{ background: accent }}
            >
              Start Journey →
            </button>
          </div>
        </Card>
      </Shell>
    )
  }

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  if (screen === "dashboard") {
    return (
      <Shell accent={accent}>
        <SHeader accent={accent} title={pack.title} subtitle="Your strands" points={points} />
        <Card>
          <div className="p-6">
            <p className="mb-4 text-sm text-slate-500">
              Tap a strand to level up. Each strand is assessed on the MYP 1–8 scale.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {pack.strands.map((s, i) => {
                const lvl = levels[s.id] ?? 0
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActive(i)
                      setScreen("strand")
                    }}
                    className="rounded-2xl border border-black/10 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Strand {i + 1}</span>
                      <span className="rounded-full px-2 py-0.5 text-xs font-bold text-white" style={{ background: levelColor(lvl) }}>
                        {lvl}/8
                      </span>
                    </div>
                    <h3 className="mt-1 font-bold text-slate-800">{s.name}</h3>
                    <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{s.descriptor}</p>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full transition-all" style={{ width: `${(lvl / 8) * 100}%`, background: levelColor(lvl) }} />
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Badge row */}
            <div className="mt-6 flex flex-wrap gap-2">
              {pack.badges.map((b) => {
                const got = badges.has(b.id)
                return (
                  <span
                    key={b.id}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${got ? "border-amber-300 bg-amber-50 text-amber-700" : "border-black/10 bg-white text-slate-300"}`}
                    title={b.description}
                  >
                    <span className={got ? "" : "grayscale"}>{b.icon}</span> {b.label}
                  </span>
                )
              })}
            </div>

            <button
              onClick={() => setScreen("results")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold text-white"
              style={{ background: accent }}
            >
              <Trophy className="size-4" /> Finish & see results
            </button>
          </div>
        </Card>
      </Shell>
    )
  }

  // ── STRAND ─────────────────────────────────────────────────────────────────
  if (screen === "strand") {
    const s = pack.strands[active]
    return (
      <Shell accent={accent}>
        <SHeader accent={accent} title={pack.title} points={points} onBack={() => setScreen("dashboard")} backLabel="Dashboard" />
        <Card>
        <StrandView
          key={s.id}
          strand={s}
          index={active}
          total={pack.strands.length}
          accent={accent}
          level={levels[s.id] ?? 0}
          qAnswers={qAnswers[s.id] ?? {}}
          setQAnswers={(a) => setQAnswers((prev) => ({ ...prev, [s.id]: a }))}
          text={text[s.id] ?? ""}
          setText={(t) => setText((prev) => ({ ...prev, [s.id]: t }))}
          scenario={scenario[s.id] ?? {}}
          setScenario={(a) => setScenario((prev) => ({ ...prev, [s.id]: a }))}
          onPrev={active > 0 ? () => setActive(active - 1) : undefined}
          onNext={active < pack.strands.length - 1 ? () => setActive(active + 1) : () => setScreen("results")}
        />
        </Card>
      </Shell>
    )
  }

  // ── RESULTS ────────────────────────────────────────────────────────────────
  const reportStrands = pack.strands.map((s) => ({ name: s.name, level: levels[s.id] ?? 0, text: evalStrand(s).save }))
  const badgeLabels = pack.badges.filter((b) => badges.has(b.id)).map((b) => b.label)
  return (
    <Shell accent={accent}>
      <SHeader accent={accent} title={pack.title} points={points} onBack={() => setScreen("dashboard")} backLabel="Dashboard" />
      <Card>
      <div className="p-6">
        <div className="rounded-2xl p-6 text-center text-white" style={{ background: accent }}>
          <div className="text-5xl">🏆</div>
          <h2 className="mt-2 text-2xl font-extrabold">{name || "Your"} results</h2>
          <p className="mt-1 text-white/90">
            {points} points · {badgeLabels.length} badge{badgeLabels.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          {pack.strands.map((s, i) => {
            const lvl = levels[s.id] ?? 0
            return (
              <div key={s.id} className="rounded-xl border border-black/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800">
                    {i + 1}. {s.name}
                  </h3>
                  <span className="rounded-full px-2.5 py-0.5 text-sm font-bold text-white" style={{ background: levelColor(lvl) }}>
                    Level {lvl}/8
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${(lvl / 8) * 100}%`, background: levelColor(lvl) }} />
                </div>
              </div>
            )
          })}
        </div>

        {badgeLabels.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {pack.badges
              .filter((b) => badges.has(b.id))
              .map((b) => (
                <span key={b.id} className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                  {b.icon} {b.label}
                </span>
              ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => void generateReport(pack, name, reportStrands, points, badgeLabels)}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-bold text-white"
            style={{ background: accent }}
          >
            <Download className="size-4" /> Generate PDF
          </button>
          <button
            onClick={() => setScreen("dashboard")}
            className="inline-flex items-center gap-2 rounded-xl border border-black/15 px-5 py-2.5 font-bold text-slate-600 hover:bg-black/5"
          >
            <RotateCcw className="size-4" /> Keep working
          </button>
        </div>
      </div>
      </Card>
    </Shell>
  )
}

// ── Layout primitives ─────────────────────────────────────────────────────────
function Shell({ accent, children }: { accent: string; children: React.ReactNode }) {
  // Warm gradient tinted by the pack's accent colour — mirrors the exemplar SPAs.
  return (
    <div
      className="min-h-screen"
      style={{ background: `linear-gradient(150deg, #fff8f2 0%, color-mix(in srgb, ${accent} 12%, #fef3e8) 100%)` }}
    >
      {children}
    </div>
  )
}

/** Full-width accent header that matches the exemplar iframe strandhoots. */
function SHeader({
  accent,
  title,
  subtitle,
  points,
  onBack,
  backLabel,
}: {
  accent: string
  title: string
  subtitle?: string
  points?: number
  onBack?: () => void
  backLabel?: string
}) {
  return (
    <div className="w-full text-white" style={{ background: accent }}>
      <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white"
            >
              <ArrowLeft className="size-4" /> {backLabel ?? "Back"}
            </button>
          )}
          <div className="min-w-0">
            <p className="font-extrabold text-base sm:text-lg leading-tight truncate">{title}</p>
            {subtitle && <p className="text-xs sm:text-sm opacity-75 truncate">{subtitle}</p>}
          </div>
        </div>
        {points != null && (
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-bold ml-3">
            <Trophy className="size-3.5" /> {points} pts
          </span>
        )}
      </div>
    </div>
  )
}

/** White card centred on the gradient background — matches exemplar card layout. */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-4 sm:mx-auto max-w-3xl my-8 rounded-2xl bg-white shadow-xl overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

// ── Strand view (tabs) ─────────────────────────────────────────────────────────
function StrandView({
  strand,
  index,
  total,
  accent,
  level,
  qAnswers,
  setQAnswers,
  text,
  setText,
  scenario,
  setScenario,
  onPrev,
  onNext,
}: {
  strand: Strand
  index: number
  total: number
  accent: string
  level: Level
  qAnswers: QAnswers
  setQAnswers: (a: QAnswers) => void
  text: string
  setText: (t: string) => void
  scenario: ScenarioAnswers
  setScenario: (a: ScenarioAnswers) => void
  onPrev?: () => void
  onNext: () => void
}) {
  const showSim = hasArtifact(strand.artifactKey)
  const [tab, setTab] = useState<"guided" | "response" | "sim">("guided")
  const r = strand.response

  const feedback = r.kind !== "questions" ? evaluateText(r.rubric, text) : null

  return (
    <div className="mx-auto max-w-3xl px-5 py-6">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Strand {index + 1} of {total}
        </span>
        <span className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white" style={{ background: levelColor(level) }}>
          Level {level}/8
        </span>
      </div>
      <h2 className="text-xl font-extrabold text-slate-900">{strand.name}</h2>
      <p className="mt-1 text-sm text-slate-600">{strand.descriptor}</p>

      {/* Tabs */}
      <div className="mt-4 flex gap-1 rounded-xl bg-slate-100 p-1">
        <TabBtn active={tab === "guided"} onClick={() => setTab("guided")} accent={accent}>
          Guided example
        </TabBtn>
        <TabBtn active={tab === "response"} onClick={() => setTab("response")} accent={accent}>
          Your response
        </TabBtn>
        {showSim && (
          <TabBtn active={tab === "sim"} onClick={() => setTab("sim")} accent={accent}>
            🔬 Simulation
          </TabBtn>
        )}
      </div>

      <div className="mt-4">
        {tab === "guided" && (
          <div className="space-y-2">
            {strand.guided.map((g) => (
              <details key={g.level} className="group rounded-xl border border-black/10 bg-white p-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-700">
                  <span style={{ color: accent }}>{g.label ?? bandLabel(g.level)}</span>
                  <ChevronDown className="size-4 transition group-open:rotate-180" />
                </summary>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">{g.body}</p>
              </details>
            ))}
          </div>
        )}

        {tab === "response" && (
          <>
            {r.kind === "questions" && (
              <QuestionEngine spec={r} answers={qAnswers} onAnswers={setQAnswers} accent={accent} />
            )}
            {r.kind === "reflection" && r.scenarios && r.scenarios.length > 0 && (
              <div className="mb-5">
                <p className="mb-2 text-sm font-bold text-slate-700">Warm-up: think it through</p>
                <ScenarioQuiz scenarios={r.scenarios} answers={scenario} onAnswers={setScenario} accent={accent} />
              </div>
            )}
            {r.kind !== "questions" && feedback && (
              <LeveledTextResponse
                value={text}
                onChange={setText}
                rubric={r.rubric}
                scaffolds={r.scaffolds}
                placeholder={r.placeholder}
                prompt={r.prompt}
                feedback={feedback}
                accent={accent}
              />
            )}
          </>
        )}

        {tab === "sim" && showSim && (
          <ArtifactSlot artifactKey={strand.artifactKey!} props={strand.artifactProps} accent={accent} />
        )}
      </div>

      {/* Nav */}
      <div className="mt-6 flex items-center justify-between">
        {onPrev ? (
          <button onClick={onPrev} className="inline-flex items-center gap-1.5 rounded-xl border border-black/15 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-black/5">
            <ArrowLeft className="size-4" /> Previous
          </button>
        ) : (
          <span />
        )}
        <button onClick={onNext} className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold text-white" style={{ background: accent }}>
          {index < total - 1 ? "Next strand" : "See results"} <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

function TabBtn({ active, onClick, accent, children }: { active: boolean; onClick: () => void; accent: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${active ? "bg-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
      style={active ? { color: accent } : undefined}
    >
      {children}
    </button>
  )
}
