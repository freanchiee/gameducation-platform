import type { StrandhootPack } from "../engine/types"

// B5 — Hooke's Law: force vs extension · Criterion B (Inquiring & Designing)
// Sources: Hodder Physics Ch. 3 (forces and elasticity); Oxford MYP Physics "Forces";
// F = kx linear relationship until elastic limit.
export const hookesLawCritB: StrandhootPack = {
  slug: "hookes-law-crit-b",
  title: "Hooke's Law — Designing",
  subject: "MYP Physics",
  criterion: "B",
  topic: "Hooke's law: force vs extension",
  accent: "#58a65c",
  icon: "🌀",
  statementOfInquiry:
    "Hooke's law reveals a precise, linear relationship between force and extension — but only within the elastic limit.",
  estMinutes: 30,
  intro:
    "Design an investigation into how the force applied to a spring affects its extension, testing whether Hooke's law (F=kx) holds.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hyp", atLevel: 8 },
    { id: "controller", label: "Variable Wrangler", icon: "🎛", description: "Reach Level 8 on Variables", strandId: "vars", atLevel: 8 },
    { id: "designer", label: "Master Designer", icon: "📐", description: "Reach Level 6+ on every strand", atLevel: 6 },
  ],
  paths: [
    { id: "spring-investigation", label: "Spring investigation", blurb: "How force affects spring extension", icon: "🌀" },
  ],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question about Hooke's law.",
      guided: [
        { level: 2, body: "Level 1–2: A vague question. e.g. \"Does adding weight stretch a spring?\"" },
        { level: 4, body: "Level 3–4: Names one variable. e.g. \"Does increasing the force on a spring change how far it stretches?\"" },
        { level: 6, body: "Level 5–6: States both IV and DV clearly. e.g. \"How does the force (N) applied to a spring affect its extension (cm)?\"" },
        { level: 8, body: "Level 7–8: Focused, testable and measurable with range and units. e.g. \"How does increasing the force applied to a spring from 0 N to 7 N (in 1 N steps) affect its extension (cm) from its natural length, and does the relationship remain linear throughout?\"" },
      ],
      response: {
        kind: "design",
        prompt: "Write your research question for this Hooke's law investigation.",
        scaffolds: ["How does", "the force (N) applied to a spring", "affect its extension (cm)", "when the force is increased from … to …", "does the relationship remain linear"],
        placeholder: "How does the force … affect the extension …?",
        rubric: [
          { level: 2, descriptor: "A question about springs, force or stretching.", keywords: ["spring", "stretch", "force", "weight", "?"], minKeywords: 1 },
          { level: 4, descriptor: "Names force as the variable to change.", keywords: ["force", "weight", "affect", "stretch", "extension", "change"], minKeywords: 1 },
          { level: 6, descriptor: "States both the force applied (IV) and extension in cm (DV).", keywords: ["force", "extension", "affect", "how does", "newtons", "centimetres", "cm"], minKeywords: 2 },
          { level: 8, descriptor: "Focused, testable and measurable with stated range, units and a question about linearity.", keywords: ["0 n", "7 n", "1 n", "range", "extension", "cm", "linear", "natural length", "steps"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "hyp",
      name: "Hypothesis",
      descriptor: "Make a testable prediction about the spring extension with scientific reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A guess with no reason. e.g. \"The spring will stretch more.\"" },
        { level: 4, body: "Level 3–4: A directional if/then prediction. e.g. \"If the force increases, then the extension will increase.\"" },
        { level: 6, body: "Level 5–6: Prediction with a scientific reason. e.g. \"If the force increases, the extension will increase proportionally because Hooke's law states that extension is proportional to the applied force within the elastic limit.\"" },
        { level: 8, body: "Level 7–8: Quantitative prediction using F = kx. e.g. \"According to Hooke's law (F = kx), the extension is directly proportional to the applied force within the elastic limit, so a graph of F vs extension will be a straight line through the origin with gradient equal to the spring constant k. Beyond the elastic limit, the graph will curve and the spring will be permanently deformed.\"" },
      ],
      response: {
        kind: "design",
        prompt: "State your hypothesis and explain the science behind it.",
        scaffolds: ["If the force increases, then the extension will", "because", "Hooke's law states that", "F = kx", "proportional to", "spring constant k", "elastic limit", "straight line through the origin", "beyond the elastic limit"],
        placeholder: "If the force increases, then … because …",
        rubric: [
          { level: 2, descriptor: "A prediction about extension is made.", keywords: ["extension", "stretch", "will", "more", "increase", "longer"], minKeywords: 1 },
          { level: 4, descriptor: "A directional if/then prediction naming both force and extension.", keywords: ["if", "then", "force", "extension", "increase", "proportional"], minKeywords: 2 },
          { level: 6, descriptor: "Prediction supported by reference to Hooke's law or proportionality within the elastic limit.", keywords: ["because", "hooke", "proportional", "elastic limit", "linear", "law"], minKeywords: 2 },
          { level: 8, descriptor: "Quantitative prediction using F = kx with reference to graph shape, spring constant and elastic limit.", keywords: ["f = kx", "kx", "spring constant", "gradient", "straight line", "origin", "elastic limit", "permanent", "deform", "k"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "vars",
      name: "Variables",
      descriptor: "Identify the independent, dependent and controlled variables for the Hooke's law investigation.",
      guided: [
        { level: 2, body: "Level 1–2: Names one thing that changes, e.g. the mass added to the spring." },
        { level: 4, body: "Level 3–4: Identifies the independent variable (force/mass added) and dependent variable (extension of the spring from its natural length)." },
        { level: 6, body: "Level 5–6: Also lists controlled variables — same spring, masses added vertically, ruler held vertically, same measurement point on the spring." },
        { level: 8, body: "Level 7–8: Justifies WHY each control matters — e.g. a different spring has a different k value; tilted ruler causes parallax error; measuring from the same point ensures extension is calculated correctly from the natural length. Explains how each is controlled in practice." },
      ],
      response: {
        kind: "design",
        prompt: "List your independent, dependent and controlled variables.",
        scaffolds: ["Independent variable:", "Dependent variable:", "Controlled variables:", "same spring", "masses added vertically", "ruler held vertically", "same measurement point on spring", "measured from natural length"],
        placeholder: "Independent variable: …  Dependent variable: …  Controlled: …",
        rubric: [
          { level: 2, descriptor: "Mentions at least one variable.", keywords: ["force", "extension", "mass", "spring", "weight"], minKeywords: 1 },
          { level: 4, descriptor: "Names the independent and dependent variables.", keywords: ["independent", "dependent", "force", "extension", "measure", "mass"], minKeywords: 2 },
          { level: 6, descriptor: "Lists controlled variables including same spring, vertical setup, and measurement point.", keywords: ["controlled", "same spring", "vertical", "measurement point", "same", "constant", "ruler"], minKeywords: 2 },
          { level: 8, descriptor: "Justifies controls with reasons linked to spring constant, parallax and natural length.", keywords: ["because", "spring constant", "k", "parallax", "natural length", "vertical", "same spring", "measurement point", "accurate"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method, materials & safety",
      descriptor: "Write a clear, repeatable method for the Hooke's law investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A few steps, missing detail or hard to follow." },
        { level: 4, body: "Level 3–4: A logical sequence of steps with the main apparatus listed (spring, ruler, masses, clamp stand, Newton meter or set of 100 g masses)." },
        { level: 6, body: "Level 5–6: Detailed, repeatable steps specifying mass increments (0–700 g in 100 g steps), measuring extension from natural length, repeating 3× for reliability, and a safety note (masses falling, spring snapping back)." },
        { level: 8, body: "Level 7–8: A fully reproducible method — measure and record the natural length of the spring; add 100 g masses (0–700 g) one at a time, measuring and recording the new length each time; calculate extension = new length − natural length; repeat 3× for each mass and average; plot a graph of force (N) vs extension (cm); identify the elastic limit from the point where the graph becomes non-linear; note safety (stand clear of masses, eye protection, secure clamp)." },
      ],
      response: {
        kind: "design",
        prompt: "Write a method someone else could follow exactly. Include materials and safety.",
        scaffolds: ["Materials:", "1. Measure the natural length of the spring.", "2. Add a 100 g mass and record the new length.", "3. Calculate extension = new length − natural length.", "Repeat 3 times and average.", "Plot force (N) vs extension (cm).", "Safety: eye protection, stand clear of falling masses."],
        placeholder: "Materials: …  Method: 1) … 2) …  Safety: …",
        rubric: [
          { level: 2, descriptor: "Some steps about adding masses or measuring the spring.", keywords: ["mass", "spring", "measure", "record", "weight"], minKeywords: 1 },
          { level: 4, descriptor: "Ordered steps with key apparatus named.", keywords: ["clamp stand", "ruler", "100 g", "spring", "mass", "steps", "record"], minKeywords: 2 },
          { level: 6, descriptor: "Repeatable steps with mass increments, extension calculation, repeats and safety.", keywords: ["100 g", "extension", "natural length", "repeat", "average", "safety", "0–700", "700 g"], minKeywords: 2 },
          { level: 8, descriptor: "Fully reproducible, elastic-limit aware, with graph and safety fully specified.", keywords: ["natural length", "100 g", "700 g", "extension", "repeat", "average", "force vs extension", "graph", "elastic limit", "non-linear", "eye protection", "stand clear"], minKeywords: 4 },
        ],
      },
    },
  ],
}
