import Link from "next/link"
import {
  ArrowRight,
  Check,
  Clock,
  Sparkles,
  LayoutDashboard,
  Code2,
  Gauge,
  Trophy,
  Star,
  Quote,
  Menu,
  Rocket,
  Smartphone,
  Users,
  PencilRuler,
  MessageSquareText,
  TrendingUp,
  Table2,
} from "lucide-react"

/* ── Brand accents (per product) ───────────────────────────────────────────── */
const REKHA = "#1b7888" // Rekhachitra — teal
const GBL = "#1f306d" // Game-Based Learning — navy
const STRAND = "#58a65c" // Strandhoot — green
const CANVAS = "#f6efca"

type Product = {
  name: string
  accent: string
  tint: string
  hook: string
  bullets: string[]
  cta: string
  href: string
}

const PRODUCTS: Product[] = [
  {
    name: "REKHACHITRA",
    accent: REKHA,
    tint: "rgba(27,120,136,0.08)",
    hook: "Live, interactive math & physics on Desmos.",
    bullets: [
      "AI-generate a lesson in seconds",
      "Students join by code, no logins",
      "See every student's graph live",
    ],
    cta: "Launch a live class",
    href: "/desmos",
  },
  {
    name: "GAME-BASED LEARNING",
    accent: GBL,
    tint: "rgba(31,48,109,0.06)",
    hook: "Turn a Google Sheet into a game in 2 minutes.",
    bullets: [
      "Paste a sheet → playable game",
      "Works on any device",
      "Live multiplayer by join code",
    ],
    cta: "Build a game free",
    href: "/your-games",
  },
  {
    name: "STRANDHOOT",
    accent: STRAND,
    tint: "rgba(88,166,92,0.10)",
    hook: "Gamified MYP assessment that levels students up.",
    bullets: [
      "Drag-and-drop strandhoot builder",
      "AI rubric feedback & badges",
      "Track strands & levels per student",
    ],
    cta: "Create a Strandhoot",
    href: "/strandhoot-builder",
  },
]

/* ── Small device-frame placeholder ────────────────────────────────────────── */
function DeviceMock({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-[#16243a] shadow-[0_18px_50px_rgba(31,48,109,0.18)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="size-2 rounded-full bg-white/25" />
        <span className="size-2 rounded-full bg-white/25" />
        <span className="size-2 rounded-full" style={{ background: accent }} />
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function CTAButton({
  href,
  accent,
  children,
  className = "",
}: {
  href: string
  accent: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 hover:-translate-y-0.5 ${className}`}
      style={{ backgroundColor: accent }}
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  )
}

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: CANVAS }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-[#1f306d] text-white">
              <Sparkles className="size-4" />
            </div>
            <span className="text-lg font-bold" style={{ color: GBL, fontFamily: "var(--font-display)" }}>
              Gameducation
            </span>
          </div>
          <p className="hidden flex-1 text-center text-sm text-muted-foreground md:block">
            One platform. Three ways to make learning unforgettable.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold transition hover:bg-black/5"
              style={{ color: GBL }}
            >
              Start free
            </Link>
            <Menu className="size-5 md:hidden" style={{ color: GBL }} />
          </div>
        </div>
      </header>

      {/* TRIFOLD HERO */}
      <section className="flex flex-col md:flex-row">
        {PRODUCTS.map((p) => (
          <div
            key={p.name}
            className="group flex flex-1 basis-0 flex-col items-center px-6 py-10 text-center transition-all duration-300 md:min-h-[82vh] md:hover:flex-[1.35]"
            style={{ background: p.tint }}
          >
            <h2
              className="text-2xl font-extrabold tracking-tight md:text-3xl"
              style={{ color: p.accent, fontFamily: "var(--font-display)" }}
            >
              {p.name}
            </h2>
            <p className="mt-3 max-w-xs text-lg font-medium" style={{ color: GBL }}>
              {p.hook}
            </p>

            <div className="my-7 w-full max-w-sm">
              <DeviceMock accent={p.accent}>
                <ProductMock name={p.name} accent={p.accent} />
              </DeviceMock>
            </div>

            <ul className="mb-7 space-y-2 text-left">
              {p.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm" style={{ color: GBL }}>
                  <Check className="mt-0.5 size-4 shrink-0" style={{ color: p.accent }} />
                  {b}
                </li>
              ))}
            </ul>

            <CTAButton href={p.href} accent={p.accent} className="mt-auto w-full max-w-xs">
              {p.cta}
            </CTAButton>
          </div>
        ))}
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-6 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-5">
            <span className="text-sm font-semibold" style={{ color: GBL }}>
              Trusted by IB MYP teachers
            </span>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate opacity-60">
              <span>SCHOOL LOGO</span>
              <span>MYP PROGRAMME</span>
              <span>MYP SCHOOLS</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Metric icon={Clock} value="2-min" label="setup" />
            <Metric icon={Sparkles} value="10,000+" label="activities created" />
            <Metric icon={Rocket} value="30-sec" label="student join" />
            <Metric icon={Check} value="100%" label="IB MYP aligned" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <h3 className="text-center text-2xl font-bold" style={{ color: GBL, fontFamily: "var(--font-display)" }}>
            How it works
          </h3>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <Step n="1" title="Create" desc="Build a lesson, game, or assessment in minutes with our smart tools." />
            <Step n="2" title="Launch" desc="Share a join code. Students join instantly, no accounts." />
            <Step n="3" title="Learn" desc="See real-time insights and help every student reach the next level." />
          </div>
        </div>
      </section>

      {/* DEEP DIVES */}
      <DeepDive
        accent={REKHA}
        tint="rgba(27,120,136,0.07)"
        eyebrow="REKHACHITRA"
        title="Make math & physics come alive."
        body="Build interactive, graph-based activities in Desmos. AI creates full lessons. You see every student's thinking."
        features={[
          { icon: Sparkles, title: "AI Lesson Generator", desc: "Full multi-slide lessons in seconds" },
          { icon: LayoutDashboard, title: "Live Class Dashboard", desc: "See every graph, instantly" },
          { icon: Code2, title: "Student Code Join", desc: "6-char code, no logins needed" },
        ]}
        cta="Launch a live class"
        href="/desmos"
        mockSide="left"
      />
      <DeepDive
        accent={GBL}
        tint="rgba(31,48,109,0.05)"
        eyebrow="GAME-BASED LEARNING"
        title="Any sheet. Any game. Instantly."
        body="Turn your Google Sheet into engaging classroom games — flashcards, quizzes, roulette, hangman & more."
        features={[
          { icon: Table2, title: "Sheet to Game", desc: "Paste → playable game" },
          { icon: Smartphone, title: "Any Device", desc: "Chromebooks, tablets, phones" },
          { icon: Users, title: "Multiplayer", desc: "Live games with a join code" },
        ]}
        cta="Build a game free"
        href="/your-games"
        mockSide="right"
      />
      <DeepDive
        accent={STRAND}
        tint="rgba(88,166,92,0.09)"
        eyebrow="STRANDHOOT"
        title="Assess by strands. Motivate with games."
        body="Create strand-based assessments with criteria A·B·C·D, AI feedback, badges, and progress tracking."
        features={[
          { icon: PencilRuler, title: "Strandhoot Builder", desc: "Drag, drop, organize" },
          { icon: MessageSquareText, title: "AI Rubric Feedback", desc: "Personalized tips for growth" },
          { icon: TrendingUp, title: "Track & Level Up", desc: "Monitor progress by strand & level" },
        ]}
        cta="Create a Strandhoot"
        href="/strandhoot-builder"
        mockSide="left"
      />

      {/* TESTIMONIALS */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h3 className="text-center text-2xl font-bold" style={{ color: GBL, fontFamily: "var(--font-display)" }}>
            Loved by teachers. Proven in classrooms.
          </h3>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Testimonial
              quote="Rekhachitra changed how I teach graphs. My students explore more and ask better questions now."
              name="Priya M."
              role="DP Physics Teacher, Bangalore"
              accent={REKHA}
            />
            <Testimonial
              quote="Game-Based Learning is my go-to warm-up. 2 minutes to launch, 100% engagement."
              name="Daniel K."
              role="MYP Math Teacher, Singapore"
              accent={GBL}
            />
            <Testimonial
              quote="Strandhoot makes assessments fair, clear, and even fun for students."
              name="Aisha R."
              role="MYP Coordinator, Dubai"
              accent={STRAND}
            />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ background: CANVAS }}>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h3 className="text-center text-2xl font-bold" style={{ color: GBL, fontFamily: "var(--font-display)" }}>
            Simple pricing. Maximum impact.
          </h3>
          <div className="mt-10 grid items-start gap-6 md:grid-cols-3">
            <PricingCard
              name="Free"
              tagline="Perfect to get started"
              price="$0"
              priceNote="For 1 class"
              features={["Up to 25 students", "Basic games & activities", "Community support"]}
              cta="Start free"
              href="/login"
            />
            <PricingCard
              name="Pro"
              tagline="For teachers who do more"
              price="$9"
              priceNote="/mo · billed yearly"
              features={[
                "Unlimited students & classes",
                "AI lesson generation",
                "All games & features",
                "Priority support",
              ]}
              cta="Start free"
              href="/login"
              featured
              footnote="No credit card required. Cancel anytime."
            />
            <PricingCard
              name="School"
              tagline="For teams & institutions"
              price="Custom"
              priceNote="Annual billing"
              features={[
                "Everything in Pro",
                "SSO & user management",
                "School analytics",
                "Dedicated success manager",
              ]}
              cta="Talk to sales"
              href="/login"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <h3 className="text-center text-2xl font-bold" style={{ color: GBL, fontFamily: "var(--font-display)" }}>
            Frequently asked questions
          </h3>
          <div className="mt-8 grid gap-x-8 gap-y-3 md:grid-cols-2">
            <Faq q="Is there a free plan?" a="Yes — the Free plan covers one class with up to 25 students, forever. No credit card." />
            <Faq q="How is this aligned to IB MYP?" a="Strandhoot is built around MYP criteria A–D and level-based evaluation; activities map to MYP subjects." />
            <Faq q="What devices do students need?" a="Anything with a browser — Chromebooks, tablets, or phones. Nothing to install." />
            <Faq q="How does the AI lesson generation work?" a="Describe a topic and Rekhachitra generates a full multi-slide Desmos activity you can edit before launching." />
            <Faq q="Do students need accounts?" a="No. Students join a live session with a 6-character code — no signup required." />
            <Faq q="Can I import my existing content?" a="Yes — Game-Based Learning turns any Google Sheet into a playable game in about two minutes." />
          </div>
        </div>
      </section>

      {/* FINAL CTA + FOOTER */}
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-md">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-lg bg-[#1f306d] text-white">
                  <Sparkles className="size-3.5" />
                </div>
                <span className="font-bold" style={{ color: GBL }}>
                  Ready to make learning unforgettable?
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Join thousands of IB MYP teachers creating more engaged, confident learners.
              </p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your school email"
                  className="h-11 flex-1 rounded-lg border border-black/15 bg-white px-3 text-sm outline-none focus:border-[#1f306d]"
                />
                <CTAButton href="/login" accent={GBL}>
                  Start free
                </CTAButton>
              </div>
              <p className="text-xs text-muted-foreground">No credit card. No risk.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 border-t border-black/5 pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
            <FooterCol
              title="Products"
              links={[
                ["Rekhachitra", "/desmos"],
                ["Game-Based Learning", "/your-games"],
                ["Strandhoot", "/strandhoot-builder"],
              ]}
            />
            <FooterCol title="Company" links={[["About", "#"], ["Blog", "#"], ["Careers", "#"]]} />
            <FooterCol title="Resources" links={[["Help Center", "#"], ["Templates", "#"], ["Webinars", "#"]]} />
            <FooterCol title="Legal" links={[["Privacy Policy", "#"], ["Terms of Service", "#"], ["Security", "#"]]} />
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ── Section helpers ───────────────────────────────────────────────────────── */
function Metric({ icon: Icon, value, label }: { icon: React.ComponentType<{ className?: string }>; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-5 text-slate" />
      <div className="leading-tight">
        <div className="text-sm font-bold" style={{ color: GBL }}>
          {value}
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}

function Step({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="grid size-9 place-items-center rounded-full text-sm font-bold text-white" style={{ background: GBL }}>
        {n}
      </div>
      <div className="mt-3 font-semibold" style={{ color: GBL }}>
        {title}
      </div>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}

function DeepDive({
  accent,
  tint,
  eyebrow,
  title,
  body,
  features,
  cta,
  href,
  mockSide,
}: {
  accent: string
  tint: string
  eyebrow: string
  title: string
  body: string
  features: {
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
    title: string
    desc: string
  }[]
  cta: string
  href: string
  mockSide: "left" | "right"
}) {
  const mock = (
    <div className="w-full">
      <DeviceMock accent={accent}>
        <ProductMock name={eyebrow} accent={accent} />
      </DeviceMock>
    </div>
  )
  const text = (
    <div>
      <p className="text-xs font-bold tracking-widest" style={{ color: accent }}>
        {eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-bold md:text-3xl" style={{ color: GBL, fontFamily: "var(--font-display)" }}>
        {title}
      </h3>
      <p className="mt-3 max-w-md text-muted-foreground">{body}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title}>
            <f.icon className="size-5" style={{ color: accent }} />
            <div className="mt-2 text-sm font-semibold" style={{ color: GBL }}>
              {f.title}
            </div>
            <div className="text-xs text-muted-foreground">{f.desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-7">
        <CTAButton href={href} accent={accent}>
          {cta}
        </CTAButton>
      </div>
    </div>
  )
  return (
    <section style={{ background: tint }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
        {mockSide === "left" ? (
          <>
            {mock}
            {text}
          </>
        ) : (
          <>
            <div className="md:order-2">{mock}</div>
            <div className="md:order-1">{text}</div>
          </>
        )}
      </div>
    </section>
  )
}

function Testimonial({ quote, name, role, accent }: { quote: string; name: string; role: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <Quote className="size-6" style={{ color: accent }} />
      <p className="mt-3 text-sm" style={{ color: GBL }}>
        {quote}
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-full text-sm font-bold text-white" style={{ background: accent }}>
          {name.charAt(0)}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold" style={{ color: GBL }}>
            {name}
          </div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  )
}

function PricingCard({
  name,
  tagline,
  price,
  priceNote,
  features,
  cta,
  href,
  featured = false,
  footnote,
}: {
  name: string
  tagline: string
  price: string
  priceNote: string
  features: string[]
  cta: string
  href: string
  featured?: boolean
  footnote?: string
}) {
  return (
    <div
      className={`relative rounded-2xl border bg-white p-6 ${featured ? "shadow-[0_18px_50px_rgba(31,48,109,0.16)]" : "shadow-sm"}`}
      style={{ borderColor: featured ? GBL : "rgba(0,0,0,0.1)", borderWidth: featured ? 2 : 1 }}
    >
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: GBL }}>
          Most popular
        </span>
      )}
      <div className="font-bold" style={{ color: GBL }}>
        {name}
      </div>
      <div className="text-xs text-muted-foreground">{tagline}</div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold" style={{ color: GBL }}>
          {price}
        </span>
        <span className="text-xs text-muted-foreground">{priceNote}</span>
      </div>
      <ul className="mt-5 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm" style={{ color: GBL }}>
            <Check className="mt-0.5 size-4 shrink-0" style={{ color: STRAND }} />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`mt-6 flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:opacity-90 ${featured ? "text-white" : "border"}`}
        style={featured ? { background: GBL } : { borderColor: GBL, color: GBL }}
      >
        {cta}
      </Link>
      {footnote && <p className="mt-3 text-center text-xs text-muted-foreground">{footnote}</p>}
    </div>
  )
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-lg border border-black/10 bg-white px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium" style={{ color: GBL }}>
        {q}
        <ArrowRight className="size-4 transition-transform group-open:rotate-90" />
      </summary>
      <p className="mt-2 text-sm text-muted-foreground">{a}</p>
    </details>
  )
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold" style={{ color: GBL }}>
        {title}
      </div>
      <ul className="space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Lightweight per-product mock content ──────────────────────────────────── */
function ProductMock({ name, accent }: { name: string; accent: string }) {
  if (name.startsWith("REKHA")) {
    return (
      <svg viewBox="0 0 280 150" className="w-full" role="img" aria-label="Desmos graph preview">
        <rect width="280" height="150" fill="#0f1a2e" rx="6" />
        {[30, 70, 110].map((y) => (
          <line key={y} x1="10" y1={y} x2="270" y2={y} stroke="white" strokeOpacity="0.08" />
        ))}
        <line x1="40" y1="10" x2="40" y2="140" stroke="white" strokeOpacity="0.15" />
        <line x1="10" y1="110" x2="270" y2="110" stroke="white" strokeOpacity="0.15" />
        <path d="M20 120 Q90 10 140 70 T260 40" fill="none" stroke={accent} strokeWidth="3" />
        {[
          [60, 95],
          [140, 70],
          [210, 52],
        ].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="4" fill={accent} />
        ))}
      </svg>
    )
  }
  if (name.startsWith("GAME")) {
    const tiles = ["Flashcards", "Quiz", "Roulette", "Hangman", "Memory", "More"]
    return (
      <div className="grid grid-cols-3 gap-2">
        {tiles.map((t) => (
          <div key={t} className="grid h-12 place-items-center rounded-md bg-white/10 text-[10px] font-medium text-white/80">
            {t}
          </div>
        ))}
      </div>
    )
  }
  // Strandhoot — quiz / leaderboard mock
  const rows = [
    ["Aanya", "3500"],
    ["Rohan", "3200"],
    ["Meera", "2900"],
  ]
  return (
    <div className="space-y-2">
      <div className="rounded-md px-3 py-2 text-[11px] font-semibold text-white" style={{ background: accent }}>
        Which describes Newton&apos;s First Law?
      </div>
      {rows.map(([n, s], i) => (
        <div key={n} className="flex items-center justify-between rounded-md bg-white/10 px-3 py-1.5 text-[11px] text-white/85">
          <span className="flex items-center gap-2">
            <Trophy className="size-3" style={{ color: i === 0 ? "#f5c000" : "rgba(255,255,255,.5)" }} />
            {n}
          </span>
          <span className="font-bold" style={{ color: "#f5c000" }}>
            {s}
          </span>
        </div>
      ))}
    </div>
  )
}
