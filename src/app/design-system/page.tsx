import {
  Activity,
  ArrowLeft,
  Beaker,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  Leaf,
  Microscope,
  Send,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import Link from "next/link";

const palette = [
  ["canvas", "#F6EFCA"],
  ["surface", "#FFFFFF"],
  ["surface-soft", "#E9F3EC"],
  ["navy", "#1F306D"],
  ["navy-2", "#314678"],
  ["blue-band", "#4B668C"],
  ["blue-muted", "#5A7599"],
  ["mint", "#B9EDCE"],
  ["green", "#58A65C"],
  ["red", "#D85140"],
  ["red-deep", "#BA3C36"],
  ["slate", "#A7AEB4"],
  ["ink", "#111827"],
];

const worlds = [
  {
    name: "CellBook",
    description: "Cells, organelles, and specialised structures",
    icon: Microscope,
    className: "bg-mint text-navy",
  },
  {
    name: "Organistagram",
    description: "Organisms, ecosystems, and food webs",
    icon: Leaf,
    className: "bg-green text-white",
  },
  {
    name: "Reactagram",
    description: "Reactants, products, evidence, and energy",
    icon: FlaskConical,
    className: "bg-red text-white",
  },
  {
    name: "Physigram",
    description: "Forces, waves, circuits, and motion",
    icon: Waves,
    className: "bg-blue-band text-white",
  },
];

const rows = [
  ["Aisha R.", "CellBook", "8/12 profiles", "82%", "+140 XP"],
  ["Dev M.", "Reactagram", "5/8 reactions", "76%", "+95 XP"],
  ["Mira S.", "Organistagram", "6/10 roles", "91%", "+180 XP"],
];

export default function DesignSystemPage() {
  return (
    <main className="lb-page">
      <div className="lb-shell py-6 sm:py-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-navy/70 hover:text-navy"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              LearnBook
            </Link>
            <h1 className="font-display text-4xl font-extrabold text-navy sm:text-5xl">
              Design System Preview
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-ink/70">
              A first pass at the refined LearnBook palette: warm cream canvas, deep academic
              navy, science blues, mint success surfaces, and restrained red accents.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="lb-btn lb-btn-secondary" type="button">
              <BookOpen size={18} aria-hidden="true" />
              Docs
            </button>
            <button className="lb-btn lb-btn-primary" type="button">
              <Sparkles size={18} aria-hidden="true" />
              New World
            </button>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {worlds.map(({ name, description, icon: Icon, className }) => (
            <article key={name} className="lb-card overflow-hidden">
              <div className={`flex h-28 items-center justify-center ${className}`}>
                <Icon size={36} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <div className="p-4">
                <h2 className="font-display text-xl font-extrabold text-navy">{name}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-ink/68">{description}</p>
                <button className="mt-4 lb-btn lb-btn-secondary w-full" type="button">
                  Open Skin
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="lb-panel rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-muted">
                  Student Artifact
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold text-navy">
                  Mitochondria Profile
                </h2>
              </div>
              <span className="rounded-full bg-mint px-3 py-1 text-sm font-extrabold text-navy">
                84%
              </span>
            </div>

            <div className="mt-5 rounded-lg border border-slate/40 bg-surface p-4">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-lg bg-navy text-white">
                  <Beaker size={28} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy">@powerhouse</h3>
                  <p className="text-sm font-semibold text-blue-muted">Energy Systems Lab</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink/74">
                I turn glucose into ATP and keep high-energy cells alive. Find me scattered
                through the cytoplasm, especially where the cell needs power fast.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <Metric label="Collabs" value="3 orgs" />
                <Metric label="Impact" value="High" />
                <Metric label="XP" value="+48" />
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-surface-soft p-4">
              <label className="text-sm font-extrabold text-navy" htmlFor="feedback">
                AI feedback
              </label>
              <textarea
                id="feedback"
                className="mt-2 min-h-24 w-full resize-none rounded-lg border border-slate/60 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-navy"
                defaultValue="Strong profile. Add one specific term such as aerobic respiration or ATP synthase to make the science sharper."
              />
              <div className="mt-3 flex justify-end">
                <button className="lb-btn lb-btn-primary" type="button">
                  <Send size={17} aria-hidden="true" />
                  Send Feedback
                </button>
              </div>
            </div>
          </article>

          <article className="lb-panel rounded-lg p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-muted">
                  Teacher Workspace
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold text-navy">
                  Grade 6A Live Progress
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-navy px-3 py-2 text-sm font-bold text-white">
                <Users size={16} aria-hidden="true" />
                24 students
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-lg border border-slate/45 bg-white">
              <div className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr_0.8fr] gap-3 bg-surface-soft px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-navy">
                <span>Student</span>
                <span>World</span>
                <span>Progress</span>
                <span>Score</span>
                <span>XP</span>
              </div>
              {rows.map((row) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-[1.2fr_1fr_1fr_0.8fr_0.8fr] gap-3 border-t border-slate/30 px-4 py-3 text-sm text-ink/78"
                >
                  {row.map((cell, index) => (
                    <span key={cell} className={index === 0 ? "font-bold text-navy" : ""}>
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Status icon={CheckCircle2} label="Completed" value="68%" tone="bg-mint text-navy" />
              <Status icon={Activity} label="Active now" value="17" tone="bg-blue-band text-white" />
              <Status icon={Sparkles} label="Needs review" value="4" tone="bg-red text-white" />
            </div>
          </article>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-extrabold text-navy">Palette Tokens</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {palette.map(([name, hex]) => (
              <div key={name} className="lb-card overflow-hidden">
                <div className="h-20" style={{ backgroundColor: hex }} />
                <div className="flex items-center justify-between p-3">
                  <span className="font-bold text-navy">{name}</span>
                  <span className="text-sm font-semibold text-ink/60">{hex}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-canvas px-3 py-2">
      <div className="text-xs font-bold uppercase tracking-wide text-blue-muted">{label}</div>
      <div className="mt-1 font-display text-lg font-extrabold text-navy">{value}</div>
    </div>
  );
}

function Status({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className={`rounded-lg p-4 ${tone}`}>
      <Icon size={20} aria-hidden="true" />
      <div className="mt-3 text-xs font-bold uppercase tracking-wide opacity-75">{label}</div>
      <div className="font-display text-3xl font-extrabold">{value}</div>
    </div>
  );
}
