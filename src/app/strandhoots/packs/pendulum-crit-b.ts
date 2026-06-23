import type { StrandhootPack } from "../engine/types"

// B1 — Pendulum: length vs period · Criterion B (Inquiring & Designing)
// Sources: Hodder Ch.7 (waves/oscillations groundwork); Oxford "Movement";
// classic MYP pendulum investigation. The pendulum bench gives pilot data.
export const pendulumCritB: StrandhootPack = {
  slug: "pendulum-crit-b",
  title: "Designing a Pendulum Investigation",
  subject: "MYP Physics",
  criterion: "B",
  topic: "Period of a simple pendulum",
  accent: "#58a65c",
  icon: "⏱",
  statementOfInquiry:
    "Careful inquiry — controlling variables and predicting with reasoning — turns a question into reliable evidence.",
  estMinutes: 30,
  intro:
    "Plan a fair investigation into what affects the period of a pendulum. Use the bench to collect pilot data, then build each part of your design — research question, hypothesis, variables and method — levelling up as your scientific reasoning sharpens.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hyp", atLevel: 8 },
    { id: "controller", label: "Variable Wrangler", icon: "🎛", description: "Reach Level 8 on Variables", strandId: "vars", atLevel: 8 },
    { id: "designer", label: "Master Designer", icon: "📐", description: "Reach Level 6+ on every strand", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Pendulum bench", blurb: "Swing length, mass and amplitude", icon: "⏱" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question.",
      guided: [
        { level: 2, body: "Level 1–2: A vague question. e.g. \"What makes a pendulum swing?\"" },
        { level: 4, body: "Level 3–4: Names one variable. e.g. \"Does the length of a pendulum change how it swings?\"" },
        { level: 6, body: "Level 5–6: States the independent and dependent variables clearly. e.g. \"How does the length of a pendulum affect its period?\"" },
        { level: 8, body: "Level 7–8: Focused, testable and measurable, with ranges. e.g. \"How does increasing the pendulum length from 0.2 m to 1.0 m affect the time period (s) of one complete oscillation?\"" },
      ],
      artifactKey: "pendulum-lab",
      response: {
        kind: "design",
        prompt: "Write your research question for this investigation.",
        scaffolds: ["How does", "affect the period (time for one swing)", "when the length is changed from … to …"],
        placeholder: "How does … affect …?",
        rubric: [
          { level: 2, descriptor: "A question about the topic.", keywords: ["pendulum", "swing", "?"], minKeywords: 1 },
          { level: 4, descriptor: "Names a variable you will change.", keywords: ["length", "affect", "change"], minKeywords: 1 },
          { level: 6, descriptor: "States both the variable changed and the variable measured.", keywords: ["length", "period", "time", "affect", "how does"], minKeywords: 2 },
          { level: 8, descriptor: "Focused, testable and measurable with a range/units.", keywords: ["length", "period", "time", "oscillation", "0.2", "1.0", "m", "seconds", "range", "increasing"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "hyp",
      name: "Hypothesis",
      descriptor: "Make a testable prediction with scientific reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A guess with no reason. e.g. \"The period will change.\"" },
        { level: 4, body: "Level 3–4: A directional prediction. e.g. \"If the length increases, the period will increase.\"" },
        { level: 6, body: "Level 5–6: Prediction plus a scientific reason. e.g. \"A longer pendulum has a longer period because the bob travels a longer arc for each swing.\"" },
        { level: 8, body: "Level 7–8: Quantitative prediction using theory. e.g. \"Because T = 2π√(L/g), the period is proportional to the square root of length, so quadrupling L should double T.\"" },
      ],
      artifactKey: "pendulum-lab",
      response: {
        kind: "design",
        prompt: "State your hypothesis and explain the science behind it.",
        scaffolds: ["If … increases, then … will", "because", "This is because T = 2π√(L/g)", "proportional to the square root of"],
        placeholder: "If the length increases, then … because …",
        rubric: [
          { level: 2, descriptor: "A prediction is made.", keywords: ["will", "predict", "think"], minKeywords: 1 },
          { level: 4, descriptor: "A directional 'if…then' prediction.", keywords: ["if", "then", "increase", "longer", "decrease"], minKeywords: 2 },
          { level: 6, descriptor: "Prediction supported by a scientific reason.", keywords: ["because", "longer", "arc", "restoring", "gravity", "distance"], minKeywords: 2 },
          { level: 8, descriptor: "Quantitative reasoning using the relationship T = 2π√(L/g).", keywords: ["2π", "square root", "√", "proportional", "g", "quadrupling", "double", "t = 2"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "vars",
      name: "Variables",
      descriptor: "Identify the independent, dependent and controlled variables.",
      guided: [
        { level: 2, body: "Level 1–2: Names one thing that changes." },
        { level: 4, body: "Level 3–4: Identifies the independent variable (what you change) and dependent variable (what you measure)." },
        { level: 6, body: "Level 5–6: Also lists controlled variables — things kept the same — e.g. bob mass, release angle (amplitude), same location (g)." },
        { level: 8, body: "Level 7–8: Explains WHY each control matters and HOW it is kept constant, and how the dependent variable is measured precisely (e.g. time 10 swings and divide by 10)." },
      ],
      artifactKey: "pendulum-lab",
      response: {
        kind: "design",
        prompt: "List your independent, dependent and controlled variables.",
        scaffolds: ["Independent variable:", "Dependent variable:", "Controlled variables:", "kept constant by", "I will measure the period by"],
        placeholder: "Independent variable: …  Dependent variable: …  Controlled: …",
        rubric: [
          { level: 2, descriptor: "Mentions a variable.", keywords: ["length", "period", "mass", "angle"], minKeywords: 1 },
          { level: 4, descriptor: "Names the independent and dependent variables.", keywords: ["independent", "dependent", "length", "period", "measure"], minKeywords: 2 },
          { level: 6, descriptor: "Also lists controlled variables.", keywords: ["controlled", "mass", "amplitude", "angle", "same", "constant"], minKeywords: 2 },
          { level: 8, descriptor: "Justifies and operationalises the controls and measurement.", keywords: ["because", "kept constant", "10 swings", "divide", "repeat", "average", "precise", "g"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method, materials & safety",
      descriptor: "Write a clear, repeatable method including safety.",
      guided: [
        { level: 2, body: "Level 1–2: A few steps, hard to follow or missing detail." },
        { level: 4, body: "Level 3–4: A logical sequence of steps with the main apparatus listed." },
        { level: 6, body: "Level 5–6: Detailed, repeatable steps with measurements, repeats for reliability, and a relevant safety note." },
        { level: 8, body: "Level 7–8: A method another student could follow exactly — specifies the length range and intervals, repeat readings and averaging, how to reduce timing error (count 10 swings), and safety (secure clamp, clear swing area)." },
      ],
      artifactKey: "pendulum-lab",
      response: {
        kind: "design",
        prompt: "Write a method someone else could follow exactly. Include materials and safety.",
        scaffolds: ["Materials:", "1.", "2.", "Repeat 3 times and average", "Safety:", "Measure the time for 10 oscillations"],
        placeholder: "Materials: …  Method: 1) … 2) …  Safety: …",
        rubric: [
          { level: 2, descriptor: "Some steps given.", keywords: ["measure", "swing", "time", "record"], minKeywords: 1 },
          { level: 4, descriptor: "Ordered steps and apparatus.", keywords: ["clamp", "string", "stopwatch", "ruler", "mass", "steps", "first", "then"], minKeywords: 2 },
          { level: 6, descriptor: "Repeatable with repeats and a safety point.", keywords: ["repeat", "average", "safety", "reliable", "intervals", "record"], minKeywords: 2 },
          { level: 8, descriptor: "Precise, reproducible, error-aware and safe.", keywords: ["10 oscillations", "10 swings", "divide", "range", "0.2", "1.0", "repeat", "average", "anomal", "clamp", "secure", "swing area"], minKeywords: 3 },
        ],
      },
    },
  ],
}
