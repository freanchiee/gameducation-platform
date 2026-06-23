import type { StrandhootPack } from "../engine/types"

// B2 — Magnetism: distance vs field strength · Criterion B (Inquiring & Designing)
// Sources: Hodder Physics Ch. 11 (magnetism); Oxford MYP Physics "Fields";
// classic inverse-square-law investigation. Two paths: distance effect vs stacking magnets.
export const labReportCriteriaB: StrandhootPack = {
  slug: "lab-report-criteria-b",
  title: "Magnetism — Inquiring & Designing",
  subject: "MYP Physics",
  criterion: "B",
  topic: "Magnetism: distance vs field strength",
  accent: "#c0392b",
  icon: "🧲",
  statementOfInquiry:
    "Designing a fair test — controlling variables and making testable predictions — turns curiosity about magnetism into reliable evidence.",
  estMinutes: 30,
  intro:
    "Plan an investigation into how distance from a magnet affects the force it exerts. Design your research question, hypothesis, variables and method for a magnetism experiment.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hyp", atLevel: 8 },
    { id: "controller", label: "Variable Wrangler", icon: "🎛", description: "Reach Level 8 on Variables", strandId: "vars", atLevel: 8 },
    { id: "designer", label: "Master Designer", icon: "📐", description: "Reach Level 6+ on every strand", atLevel: 6 },
  ],
  paths: [
    { id: "distance", label: "Distance effect", blurb: "How far affects magnetic force", icon: "📏" },
    { id: "magnets", label: "Multiple magnets", blurb: "How stacking magnets changes force", icon: "🧲" },
  ],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question about magnetism.",
      guided: [
        { level: 2, body: "Level 1–2: A vague question about magnets. e.g. \"Does a magnet work far away?\"" },
        { level: 4, body: "Level 3–4: Names one variable. e.g. \"Does distance from a magnet change how strong it is?\"" },
        { level: 6, body: "Level 5–6: States both IV and DV clearly. e.g. \"How does the distance from a bar magnet affect the force it exerts on a steel paperclip?\"" },
        { level: 8, body: "Level 7–8: Focused, testable and measurable with ranges and units. e.g. \"How does increasing the distance from a bar magnet from 1 cm to 10 cm affect the force (N) it exerts on a 5 g steel paperclip?\"" },
      ],
      response: {
        kind: "design",
        prompt: "Write your research question for this magnetism investigation.",
        scaffolds: ["How does", "the distance from a magnet", "affect the force", "when the distance is changed from … to …", "(measured in cm)", "(measured in N)"],
        placeholder: "How does the distance … affect the force …?",
        rubric: [
          { level: 2, descriptor: "A question about magnets or magnetic force.", keywords: ["magnet", "force", "pull", "attract", "?"], minKeywords: 1 },
          { level: 4, descriptor: "Names the distance or strength as a variable to change.", keywords: ["distance", "far", "closer", "strength", "affect", "change"], minKeywords: 1 },
          { level: 6, descriptor: "States both the independent variable (distance) and dependent variable (force or attraction).", keywords: ["distance", "force", "affect", "how does", "paperclip", "newtons"], minKeywords: 2 },
          { level: 8, descriptor: "Focused, testable and measurable with a stated range and units.", keywords: ["1 cm", "10 cm", "range", "newtons", "force", "distance", "paperclip", "bar magnet"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "hyp",
      name: "Hypothesis",
      descriptor: "Make a testable prediction about magnetism with scientific reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A guess with no reason. e.g. \"The force will get smaller.\"" },
        { level: 4, body: "Level 3–4: A directional if/then prediction. e.g. \"If the distance increases, then the force will decrease.\"" },
        { level: 6, body: "Level 5–6: Prediction with a scientific reason. e.g. \"If distance increases, the magnetic force will decrease because field lines spread out further apart, reducing the field density at the paperclip.\"" },
        { level: 8, body: "Level 7–8: Quantitative prediction using the inverse-square law. e.g. \"The force is proportional to 1/d², following F ∝ 1/d², so doubling the distance should reduce the force to one quarter of its original value.\"" },
      ],
      response: {
        kind: "design",
        prompt: "State your hypothesis and explain the science behind it.",
        scaffolds: ["If the distance increases, then the force will", "because", "The magnetic field lines", "F ∝ 1/d²", "doubling the distance will"],
        placeholder: "If distance increases, then … because …",
        rubric: [
          { level: 2, descriptor: "A prediction is made about the force.", keywords: ["force", "will", "smaller", "weaker", "decrease", "less"], minKeywords: 1 },
          { level: 4, descriptor: "A directional if/then prediction naming both IV and DV.", keywords: ["if", "then", "distance", "force", "increase", "decrease"], minKeywords: 2 },
          { level: 6, descriptor: "Prediction supported by reference to field lines or field density.", keywords: ["because", "field lines", "spread", "density", "weaker", "further apart", "field strength"], minKeywords: 2 },
          { level: 8, descriptor: "Quantitative prediction using F ∝ 1/d² (inverse-square law).", keywords: ["1/d", "inverse square", "proportional", "quarter", "doubling", "f ∝", "1/d²"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "vars",
      name: "Variables",
      descriptor: "Identify the independent, dependent and controlled variables for the magnetism experiment.",
      guided: [
        { level: 2, body: "Level 1–2: Names one thing that changes, e.g. distance." },
        { level: 4, body: "Level 3–4: Identifies the independent variable (distance) and dependent variable (force or number of paperclips held)." },
        { level: 6, body: "Level 5–6: Also lists controlled variables — type and size of magnet, mass of paperclip, orientation of magnet, surface type." },
        { level: 8, body: "Level 7–8: Justifies WHY each control matters and HOW it is kept constant; operationalises the dependent variable measurement (e.g. use a Newton meter to measure force, repeat 3× and average)." },
      ],
      response: {
        kind: "design",
        prompt: "List your independent, dependent and controlled variables.",
        scaffolds: ["Independent variable:", "Dependent variable:", "Controlled variables:", "kept constant by", "I will measure the force using a Newton meter"],
        placeholder: "Independent variable: …  Dependent variable: …  Controlled: …",
        rubric: [
          { level: 2, descriptor: "Mentions at least one variable.", keywords: ["distance", "force", "magnet", "change"], minKeywords: 1 },
          { level: 4, descriptor: "Names the independent and dependent variables.", keywords: ["independent", "dependent", "distance", "force", "measure"], minKeywords: 2 },
          { level: 6, descriptor: "Lists controlled variables with examples.", keywords: ["controlled", "same magnet", "same paperclip", "constant", "type", "orientation"], minKeywords: 2 },
          { level: 8, descriptor: "Justifies controls and operationalises measurement with repeats.", keywords: ["because", "newton meter", "repeat", "average", "kept constant", "orientation", "same surface", "reliable"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method, materials & safety",
      descriptor: "Write a clear, repeatable method for the magnetism investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A few steps, hard to follow or missing detail." },
        { level: 4, body: "Level 3–4: A logical sequence of steps with the main apparatus listed." },
        { level: 6, body: "Level 5–6: Detailed, repeatable steps with measurements, repeat readings for reliability, and a safety note." },
        { level: 8, body: "Level 7–8: A method another student could follow exactly — specifies the distance range (1–10 cm) and intervals (1 cm steps), use of a Newton meter, repeat readings (3×) and averaging, and appropriate safety precautions (keep magnets away from electronics, handle with care to avoid pinching)." },
      ],
      response: {
        kind: "design",
        prompt: "Write a method someone else could follow exactly. Include materials and safety.",
        scaffolds: ["Materials:", "1. Place the magnet on a flat surface.", "2. Position the paperclip at … cm from the magnet.", "3. Measure the force using a Newton meter.", "Repeat 3 times and average.", "Safety:"],
        placeholder: "Materials: …  Method: 1) … 2) …  Safety: …",
        rubric: [
          { level: 2, descriptor: "Some steps about measuring or testing the magnet.", keywords: ["magnet", "measure", "distance", "paperclip", "record"], minKeywords: 1 },
          { level: 4, descriptor: "Ordered steps with key apparatus named.", keywords: ["newton meter", "ruler", "paperclip", "bar magnet", "steps", "place", "record"], minKeywords: 2 },
          { level: 6, descriptor: "Repeatable steps with repeats and a safety note.", keywords: ["repeat", "average", "safety", "reliable", "intervals", "cm", "record"], minKeywords: 2 },
          { level: 8, descriptor: "Precise, reproducible, error-aware and safe, with full range and intervals stated.", keywords: ["1 cm", "10 cm", "intervals", "newton meter", "repeat", "average", "anomal", "electronics", "pinch", "keep away"], minKeywords: 3 },
        ],
      },
    },
  ],
}
