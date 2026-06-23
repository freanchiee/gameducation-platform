import type { StrandhootPack } from "../engine/types"

// B3 — Wire Resistance: length vs resistance · Criterion B (Inquiring & Designing)
// Sources: Hodder Physics Ch. 18 (current electricity); Oxford MYP Physics "Electricity";
// classic nichrome-wire resistance investigation. R = ρL/A.
export const wireResistanceCritB: StrandhootPack = {
  slug: "wire-resistance-crit-b",
  title: "Resistance of a Wire — Designing",
  subject: "MYP Physics",
  criterion: "B",
  topic: "Resistance of a wire (length vs resistance)",
  accent: "#f0a500",
  icon: "🔌",
  statementOfInquiry:
    "A controlled investigation into resistance reveals the relationship between a wire's length and its opposition to current flow.",
  estMinutes: 30,
  intro:
    "Design a fair investigation into how the length of a nichrome wire affects its resistance. Use R=V/I to plan your measurements.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hyp", atLevel: 8 },
    { id: "controller", label: "Variable Wrangler", icon: "🎛", description: "Reach Level 8 on Variables", strandId: "vars", atLevel: 8 },
    { id: "designer", label: "Master Designer", icon: "📐", description: "Reach Level 6+ on every strand", atLevel: 6 },
  ],
  paths: [
    { id: "resistance-investigation", label: "Resistance investigation", blurb: "How wire length affects resistance", icon: "🔌" },
  ],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question about wire resistance.",
      guided: [
        { level: 2, body: "Level 1–2: A vague question. e.g. \"Does a longer wire resist more?\"" },
        { level: 4, body: "Level 3–4: Names one variable. e.g. \"Does changing the length of a wire change its resistance?\"" },
        { level: 6, body: "Level 5–6: States both IV and DV clearly. e.g. \"How does the length of a nichrome wire affect its resistance?\"" },
        { level: 8, body: "Level 7–8: Focused, testable and measurable with range and units. e.g. \"How does increasing the length of a nichrome wire from 10 cm to 100 cm affect its resistance (Ω), measured using R = V/I?\"" },
      ],
      response: {
        kind: "design",
        prompt: "Write your research question for this resistance investigation.",
        scaffolds: ["How does", "the length of a nichrome wire", "affect its resistance (Ω)", "when the length is changed from … to …", "measured using R = V/I"],
        placeholder: "How does the length of a wire … affect its resistance …?",
        rubric: [
          { level: 2, descriptor: "A question about wire resistance or electricity.", keywords: ["wire", "resistance", "current", "?", "resist"], minKeywords: 1 },
          { level: 4, descriptor: "Names length as the variable to change.", keywords: ["length", "longer", "shorter", "affect", "change", "resistance"], minKeywords: 1 },
          { level: 6, descriptor: "States both the length (IV) and resistance in ohms (DV).", keywords: ["length", "resistance", "affect", "how does", "nichrome", "ohm"], minKeywords: 2 },
          { level: 8, descriptor: "Focused, testable and measurable with a stated range and units.", keywords: ["10 cm", "100 cm", "range", "ohm", "resistance", "r = v/i", "v/i", "measured"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "hyp",
      name: "Hypothesis",
      descriptor: "Make a testable prediction about resistance with scientific reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A guess with no reason. e.g. \"The resistance will increase.\"" },
        { level: 4, body: "Level 3–4: A directional if/then prediction. e.g. \"If the length increases, then the resistance will increase.\"" },
        { level: 6, body: "Level 5–6: Prediction with a scientific reason. e.g. \"If the length of the wire increases, the resistance will increase because there are more atoms for electrons to collide with, impeding the flow of charge.\"" },
        { level: 8, body: "Level 7–8: Quantitative prediction using R ∝ L (from R = ρL/A). e.g. \"Resistance is proportional to length (R ∝ L, from R = ρL/A), so doubling the length should double the resistance, producing a straight-line graph through the origin.\"" },
      ],
      response: {
        kind: "design",
        prompt: "State your hypothesis and explain the science behind it.",
        scaffolds: ["If the length increases, then the resistance will", "because", "electrons collide with", "R ∝ L", "R = ρL/A", "proportional to length", "straight line through the origin"],
        placeholder: "If the length increases, then … because …",
        rubric: [
          { level: 2, descriptor: "A prediction about resistance is made.", keywords: ["resistance", "will", "increase", "greater", "more"], minKeywords: 1 },
          { level: 4, descriptor: "A directional if/then prediction naming both length and resistance.", keywords: ["if", "then", "length", "resistance", "increase"], minKeywords: 2 },
          { level: 6, descriptor: "Prediction supported by reference to electron collisions or impedance.", keywords: ["because", "electrons", "collide", "atoms", "impede", "oppose", "current", "ions"], minKeywords: 2 },
          { level: 8, descriptor: "Quantitative prediction using R = ρL/A or R ∝ L, with expected graph described.", keywords: ["ρl/a", "proportional", "r ∝ l", "double", "straight line", "origin", "gradient", "ρ"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "vars",
      name: "Variables",
      descriptor: "Identify the independent, dependent and controlled variables for the resistance investigation.",
      guided: [
        { level: 2, body: "Level 1–2: Names one thing that changes, e.g. length of wire." },
        { level: 4, body: "Level 3–4: Identifies the independent variable (length) and dependent variable (resistance, calculated from V and I)." },
        { level: 6, body: "Level 5–6: Also lists controlled variables — cross-sectional area (same gauge wire), material (same nichrome wire), temperature (measure quickly to avoid heating), same voltmeter/ammeter placement." },
        { level: 8, body: "Level 7–8: Justifies WHY each control matters and HOW it is kept constant; explains that temperature increases resistance so measurements should be taken quickly, and that the same wire coil must be used to keep ρ and A constant." },
      ],
      response: {
        kind: "design",
        prompt: "List your independent, dependent and controlled variables.",
        scaffolds: ["Independent variable:", "Dependent variable:", "Controlled variables:", "cross-sectional area kept constant by", "same nichrome wire", "measure quickly to avoid heating", "same voltmeter/ammeter placement"],
        placeholder: "Independent variable: …  Dependent variable: …  Controlled: …",
        rubric: [
          { level: 2, descriptor: "Mentions at least one variable.", keywords: ["length", "resistance", "wire", "current"], minKeywords: 1 },
          { level: 4, descriptor: "Names the independent and dependent variables.", keywords: ["independent", "dependent", "length", "resistance", "measure", "voltage", "current"], minKeywords: 2 },
          { level: 6, descriptor: "Lists controlled variables including material, cross-section and temperature.", keywords: ["controlled", "cross-sectional", "material", "nichrome", "temperature", "same", "constant", "area"], minKeywords: 2 },
          { level: 8, descriptor: "Justifies controls with reasons and operationalises temperature control and measurement.", keywords: ["because", "ρ", "area constant", "heating", "quickly", "same coil", "same gauge", "placement", "reliable"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method, materials & safety",
      descriptor: "Write a clear, repeatable method for the wire resistance investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A few steps, missing detail or hard to follow." },
        { level: 4, body: "Level 3–4: A logical sequence of steps with the main apparatus listed (voltmeter, ammeter, power pack, nichrome wire)." },
        { level: 6, body: "Level 5–6: Detailed, repeatable steps with specified length intervals, calculation of R=V/I, repeat readings, and a safety note (low voltage, switch off between readings)." },
        { level: 8, body: "Level 7–8: A fully reproducible method — vary length from 10 cm to 100 cm in 10 cm steps; measure V with voltmeter and I with ammeter across each length; calculate R = V/I; repeat 3× for each length and average; switch off between readings to avoid wire heating; record anomalous results." },
      ],
      response: {
        kind: "design",
        prompt: "Write a method someone else could follow exactly. Include materials and safety.",
        scaffolds: ["Materials:", "1. Set up the circuit with the nichrome wire, ammeter and voltmeter.", "2. Measure out … cm of wire.", "3. Record V and I, then calculate R = V/I.", "Repeat 3 times and average.", "Switch off between readings.", "Safety:"],
        placeholder: "Materials: …  Method: 1) … 2) …  Safety: …",
        rubric: [
          { level: 2, descriptor: "Some steps about wires, current or resistance.", keywords: ["wire", "measure", "current", "record", "resistance"], minKeywords: 1 },
          { level: 4, descriptor: "Ordered steps with key apparatus named.", keywords: ["voltmeter", "ammeter", "power pack", "nichrome", "circuit", "steps"], minKeywords: 2 },
          { level: 6, descriptor: "Repeatable steps with R=V/I calculation, repeat readings and safety.", keywords: ["r = v/i", "v/i", "repeat", "average", "safety", "10 cm", "intervals", "switch off"], minKeywords: 2 },
          { level: 8, descriptor: "Fully reproducible, heating-aware, range-specified method.", keywords: ["10 cm", "100 cm", "10 cm steps", "repeat", "average", "switch off", "heating", "anomal", "v/i", "r = v/i"], minKeywords: 3 },
        ],
      },
    },
  ],
}
