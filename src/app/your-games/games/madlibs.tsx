"use client"

import { useMemo, useRef, useState } from "react"
import { Sparkles, Wand2 } from "lucide-react"
import { defineGame, type Rows } from "./types"
import { GameFrame, PlayButton } from "./ui"

const ACCENT = "#7c5cbf"

interface Data {
  /** Full story text with [bracketed] prompts, newlines preserved. */
  template: string
  /** Prompt labels in order of appearance (duplicates allowed). */
  prompts: string[]
}

/** Pull the [bracketed] labels out of a template, in order, keeping duplicates. */
function extractPrompts(template: string): string[] {
  const out: string[] = []
  const re = /\[([^\]]+)\]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(template)) !== null) {
    out.push(m[1].trim())
  }
  return out
}

const sample: Data = {
  template: [
    "One [adjective] morning, a [animal] named Sir Wigglesworth woke up",
    "and decided to [verb] all the way to the [place].",
    "Along the way it met a very [adjective] [profession] who was juggling",
    "[number] flaming [plural noun].",
    "\"Care to join me?\" squeaked the [animal], waving its tiny [body part].",
    "And that, dear friends, is how the great Pancake Festival began.",
  ].join("\n"),
  prompts: [],
}
// Fill in prompts for the sample from its own template so they always match.
sample.prompts = extractPrompts(sample.template)

function parse(rows: Rows): Data {
  try {
    if (!Array.isArray(rows) || rows.length < 2) return sample
    const lines = rows
      .slice(1)
      .map((r) => (Array.isArray(r) ? (r[0] ?? "") : ""))
      .filter((line) => line.trim().length > 0)
    const template = lines.join("\n")
    const prompts = extractPrompts(template)
    if (!template.trim() || prompts.length === 0) return sample
    return { template, prompts }
  } catch {
    return sample
  }
}

/** Turn an "adjective" / "plural noun" label into "an adjective" / "a plural noun". */
function withArticle(label: string): string {
  const first = label.trim().charAt(0).toLowerCase()
  return /[aeiou]/.test(first) ? `an ${label}` : `a ${label}`
}

function MadLibs({ data }: { data: Data }) {
  const { template, prompts } = data
  const [words, setWords] = useState<string[]>(() => prompts.map(() => ""))
  const [revealed, setRevealed] = useState(false)
  const firstInputRef = useRef<HTMLInputElement | null>(null)

  const allFilled = useMemo(
    () => words.length > 0 && words.every((w) => w.trim().length > 0),
    [words],
  )
  const filledCount = useMemo(() => words.filter((w) => w.trim().length > 0).length, [words])

  if (!template || prompts.length === 0) {
    return <p className="text-center text-slate-500">No story to play.</p>
  }

  const setWord = (idx: number, value: string) => {
    setWords((prev) => {
      const next = [...prev]
      next[idx] = value
      return next
    })
  }

  const tellStory = () => {
    if (allFilled) setRevealed(true)
  }

  const startOver = () => {
    setRevealed(false)
    setWords(prompts.map(() => ""))
    requestAnimationFrame(() => firstInputRef.current?.focus())
  }

  // Build the story split into segments so inserted words can be highlighted.
  const renderStory = () => {
    const re = /\[([^\]]+)\]/g
    const nodes: React.ReactNode[] = []
    let lastIndex = 0
    let promptIdx = 0
    let m: RegExpExecArray | null
    let key = 0
    while ((m = re.exec(template)) !== null) {
      const before = template.slice(lastIndex, m.index)
      if (before) nodes.push(<span key={`t${key++}`}>{before}</span>)
      const word = (words[promptIdx] ?? "").trim() || m[0]
      nodes.push(
        <span
          key={`w${key++}`}
          className="font-semibold underline decoration-2 underline-offset-4"
          style={{ color: ACCENT }}
        >
          {word}
        </span>,
      )
      promptIdx++
      lastIndex = m.index + m[0].length
    }
    const tail = template.slice(lastIndex)
    if (tail) nodes.push(<span key={`t${key++}`}>{tail}</span>)
    return nodes
  }

  return (
    <GameFrame title="MadLibs" accent={ACCENT} onRestart={startOver}>
      {!revealed ? (
        <div>
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-black/10 bg-white p-4 shadow-sm">
            <Wand2 className="size-5 shrink-0" style={{ color: ACCENT }} />
            <p className="text-sm text-slate-600">
              Fill in every word below without peeking at the story, then reveal your masterpiece.
            </p>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prompts.map((label, idx) => (
              <label key={idx} className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {withArticle(label)}
                </span>
                <input
                  ref={idx === 0 ? firstInputRef : undefined}
                  type="text"
                  value={words[idx] ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWord(idx, e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") tellStory()
                  }}
                  placeholder={label}
                  className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-transparent focus:ring-2"
                  style={{ ["--tw-ring-color" as string]: ACCENT }}
                />
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-500">
              {filledCount} / {prompts.length} filled
            </span>
            <PlayButton accent={ACCENT} onClick={tellStory} disabled={!allFilled}>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="size-4" />
                Tell the story
              </span>
            </PlayButton>
          </div>
        </div>
      ) : (
        <div>
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-lg sm:p-8">
            <div
              className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: ACCENT }}
            >
              <Sparkles className="size-3.5" />
              Your story
            </div>
            <p
              className="whitespace-pre-line text-lg leading-relaxed text-slate-800"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {renderStory()}
            </p>
          </div>

          <div className="mt-5 flex justify-center">
            <PlayButton accent={ACCENT} onClick={startOver}>
              Start over
            </PlayButton>
          </div>
        </div>
      )}
    </GameFrame>
  )
}

export default defineGame<Data>({
  id: "madlibs",
  name: "MadLibs",
  blurb: "Collect silly words, then reveal a hilarious filled-in story.",
  icon: "📝",
  category: "Creative",
  accent: ACCENT,
  status: "ready",
  schemaHint:
    "Column: Story lines containing [bracketed] prompts, e.g. The [adjective] [animal] ran. First row is headers.",
  sample,
  parse,
  Component: MadLibs,
})
