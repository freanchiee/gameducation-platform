import Link from "next/link"
import HeroImage from "./_components/HeroImage"
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

/* ── Photo hero — overlay composited onto /public/hero-desk.png ─────────────────
   Positions are percentages over the background photo. `label*` sits ABOVE each
   monitor (centered via -translate-x-1/2); `screen*` lays the product UI ONTO the
   monitor (left = left edge). Tune these against the screenshot after the image
   file is in place. Order matches PRODUCTS: Rekhachitra, GBL, Strandhoot. */
const HERO_POS = [
  { labelLeft: "22%", labelTop: "14%", labelW: "22%", screenLeft: "11.4%", screenTop: "33%", screenW: "22%" },
  { labelLeft: "49%", labelTop: "18.5%", labelW: "23%", screenLeft: "37.8%", screenTop: "33%", screenW: "22%" },
  { labelLeft: "73%", labelTop: "14%", labelW: "22%", screenLeft: "61.8%", screenTop: "33%", screenW: "22%" },
] as const

function PhotoHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0c1322]">
      {/* lg+ — overlay composited onto the lifestyle photo */}
      <div className="relative mx-auto hidden aspect-[16/9] w-full max-w-[1700px] lg:block">
        <HeroImage />

        {/* Brand + tagline (top-center) */}
        <div className="pointer-events-none absolute inset-x-0 top-[3%] flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Gameducation"
              className="size-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
            />
            <span
              className="font-extrabold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,3vw,3.4rem)" }}
            >
              Gameducation
            </span>
          </div>
          <p
            className="mt-1 text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
            style={{ fontSize: "clamp(.8rem,1.15vw,1.2rem)" }}
          >
            One platform. Three ways to make learning unforgettable.
          </p>
        </div>

        {/* Start free (top-right) */}
        <Link
          href="/login"
          className="absolute right-[3%] top-[3.5%] rounded-full bg-white/95 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur transition hover:bg-white"
          style={{ color: GBL }}
        >
          Start free
        </Link>

        {/* Per-product label + CTA, above each monitor */}
        {PRODUCTS.map((p, i) => (
          <div
            key={p.name}
            className="absolute -translate-x-1/2 text-center"
            style={{ left: HERO_POS[i].labelLeft, top: HERO_POS[i].labelTop, width: HERO_POS[i].labelW }}
          >
            <h2
              className="font-extrabold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
              style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(.95rem,1.65vw,1.7rem)" }}
            >
              <span style={{ color: p.accent }}>{p.name}</span>
            </h2>
            <p
              className="mx-auto mt-1 max-w-[22ch] text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]"
              style={{ fontSize: "clamp(.6rem,.95vw,.9rem)" }}
            >
              {p.hook}
            </p>
            <Link
              href={p.href}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-95"
              style={{ background: p.accent, fontSize: "clamp(.6rem,.9vw,.82rem)" }}
            >
              {p.cta}
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        ))}

        {/* Product UI composited onto each monitor */}
        {PRODUCTS.map((p, i) => (
          <div
            key={`${p.name}-screen`}
            className="absolute rounded-[4px] bg-[#0f1a2e]/95 p-1.5 shadow-[0_0_30px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
            style={{ left: HERO_POS[i].screenLeft, top: HERO_POS[i].screenTop, width: HERO_POS[i].screenW }}
          >
            <ProductMock name={p.name} accent={p.accent} />
          </div>
        ))}
      </div>

      {/* < lg — stacked fallback (no photo) */}
      <div className="lg:hidden" style={{ background: CANVAS }}>
        <div className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Gameducation" className="size-9" />
            <span className="text-lg font-bold" style={{ color: GBL, fontFamily: "var(--font-display)" }}>
              Gameducation
            </span>
          </div>
          <Link
            href="/login"
            className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold"
            style={{ color: GBL }}
          >
            Start free
          </Link>
        </div>
        <p className="px-5 pt-4 text-center text-sm text-muted-foreground">
          One platform. Three ways to make learning unforgettable.
        </p>
        <div className="space-y-4 px-5 pb-10 pt-6">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="rounded-2xl p-5 text-center" style={{ background: p.tint }}>
              <h2 className="font-extrabold" style={{ color: p.accent, fontFamily: "var(--font-display)" }}>
                {p.name}
              </h2>
              <p className="mt-1 text-sm" style={{ color: GBL }}>
                {p.hook}
              </p>
              <div className="mx-auto my-4 max-w-xs">
                <DeviceMock accent={p.accent}>
                  <ProductMock name={p.name} accent={p.accent} />
                </DeviceMock>
              </div>
              <CTAButton href={p.href} accent={p.accent} className="w-full">
                {p.cta}
              </CTAButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: CANVAS }}>
      {/* PHOTO HERO (brand + CTA live inside it) */}
      <PhotoHero />

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
    const CURVE = "M20 120 Q90 10 140 70 T260 40"
    return (
      <svg viewBox="0 0 280 150" className="w-full" role="img" aria-label="Live Desmos graph">
        <rect width="280" height="150" fill="#0f1a2e" rx="6" />
        {[30, 70, 110].map((y) => (
          <line key={y} x1="10" y1={y} x2="270" y2={y} stroke="white" strokeOpacity="0.08" />
        ))}
        <line x1="40" y1="10" x2="40" y2="140" stroke="white" strokeOpacity="0.15" />
        <line x1="10" y1="110" x2="270" y2="110" stroke="white" strokeOpacity="0.15" />

        {/* sweeping scan line */}
        <line y1="10" y2="140" stroke={accent} strokeOpacity="0.3" strokeWidth="1">
          <animate attributeName="x1" values="20;260;20" dur="4.8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="20;260;20" dur="4.8s" repeatCount="indefinite" />
        </line>

        {/* curve draws itself once on load, then stays plotted */}
        <path
          d={CURVE}
          fill="none"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1}
        >
          <animate attributeName="stroke-dashoffset" values="1;0" dur="1.4s" repeatCount="1" fill="freeze" />
        </path>

        {/* plotting head drags back and forth along the curve */}
        <circle r="7" fill={accent} opacity="0.35">
          <animateMotion dur="3.6s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" path={CURVE} />
        </circle>
        <circle r="4" fill="#fff">
          <animateMotion dur="3.6s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" path={CURVE} />
        </circle>
      </svg>
    )
  }

  if (name.startsWith("GAME")) {
    const tiles = ["Flashcards", "Quiz", "Roulette", "Hangman", "Memory", "More"]
    return (
      <div>
        <div className="mb-2 flex items-center gap-1.5">
          <span className="hero-pulse inline-block size-1.5 rounded-full bg-red-400" />
          <span className="text-[9px] font-semibold uppercase tracking-wide text-white/70">Live · 24 playing</span>
        </div>
        <div className="relative">
          <div className="grid grid-cols-3 gap-2">
            {tiles.map((t, i) => (
              <div
                key={t}
                className="hero-tile grid h-12 place-items-center rounded-md bg-white/10 text-[10px] font-medium text-white/80"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {t}
              </div>
            ))}
          </div>
          {/* roaming "player" cursor that hops tile to tile */}
          <span
            className="hero-hop pointer-events-none absolute size-3 rounded-full ring-2 ring-white/80"
            style={{ background: accent, transform: "translate(-50%,-50%)" }}
            aria-hidden="true"
          />
        </div>
      </div>
    )
  }

  // Strandhoot — quiz / leaderboard mock with a live timer + leader activity
  const rows = [
    ["Aanya", "3500"],
    ["Rohan", "3200"],
    ["Meera", "2900"],
  ]
  return (
    <div className="space-y-2">
      <div
        className="relative overflow-hidden rounded-md px-3 py-2 text-[11px] font-semibold text-white"
        style={{ background: accent }}
      >
        Which describes Newton&apos;s First Law?
        {/* depleting quiz timer */}
        <span className="hero-timer absolute bottom-0 left-0 h-[3px] rounded-full bg-white/85" />
      </div>
      {rows.map(([n, s], i) => (
        <div
          key={n}
          className={`relative flex items-center justify-between overflow-hidden rounded-md bg-white/10 px-3 py-1.5 text-[11px] text-white/85 ${
            i === 0 ? "hero-row-glow" : ""
          }`}
        >
          <span className="flex items-center gap-2">
            <Trophy className="size-3" style={{ color: i === 0 ? "#f5c000" : "rgba(255,255,255,.5)" }} />
            {n}
          </span>
          <span className="font-bold" style={{ color: "#f5c000" }}>
            {s}
          </span>
          {i === 0 && (
            <span className="hero-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/20" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}
