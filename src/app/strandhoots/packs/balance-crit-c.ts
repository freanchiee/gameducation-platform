import type { StrandhootPack } from "../engine/types"

// Crit C data: Kc for N₂ + 3H₂ ⇌ 2NH₃ at different temperatures.
// van't Hoff linearisation: ln(Kc) vs 1/T gives a straight line with
// gradient = ΔH/R ≈ 11 065 K → ΔH ≈ −92 kJ mol⁻¹ (exothermic, confirmed).
export const balanceCritC: StrandhootPack = {
  slug: "balance-crit-c",
  title: "Equilibrium Constant vs Temperature",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "Kc & the van't Hoff relationship",
  accent: "#0984b5",
  icon: "📈",
  statementOfInquiry: "Imbalanced relationships affect finite resources, both locally and globally.",
  estMinutes: 30,
  intro:
    "A student measured the equilibrium constant Kc for the Haber process at eight different temperatures. Use the data tool to plot, transform and analyse — then draw a conclusion about the enthalpy change and evaluate the method. Each written strand levels up with the depth of your scientific reasoning.",
  badges: [
    { id: "presenter", label: "Data Display", icon: "📊", description: "Reach Level 8 on Presenting data", strandId: "present", atLevel: 8 },
    { id: "processor", label: "Gradient Finder", icon: "📐", description: "Reach Level 8 on Processing data", strandId: "process", atLevel: 8 },
    { id: "concluder", label: "Thermochemist", icon: "🔥", description: "Reach Level 8 on Conclusion", strandId: "conclude", atLevel: 8 },
    { id: "evaluator", label: "Method Critic", icon: "⚖️", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Kc dataset", blurb: "Equilibrium constant vs temperature for N₂ + 3H₂ ⇌ 2NH₃", icon: "🏭" }],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the Kc vs temperature data clearly and apply a linearising transform.",
      guided: [
        { level: 2, body: "Level 1–2: A basic table with data values but missing headings or units." },
        { level: 4, body: "Level 3–4: A clear table with column headings (T in K; Kc in dm⁶ mol⁻²) and a graph with both axes labelled including units." },
        { level: 6, body: "Level 5–6: Axes labelled with units, a sensible scale that fills the grid, points accurately plotted with a smooth curve of best fit showing the exponential decrease of Kc with temperature." },
        { level: 8, body: "Level 7–8: As Level 5–6, plus a linearised graph of ln(Kc) vs 1/T (K⁻¹). If the van't Hoff relationship holds, this gives a straight line — far easier to analyse. The slope of the ln(Kc) vs 1/T line equals ΔH/R, directly revealing the enthalpy change of the forward reaction." },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Equilibrium constant Kc for N₂(g) + 3H₂(g) ⇌ 2NH₃(g) at different temperatures",
        xLabel: "Temperature (K)",
        yLabel: "Kc (dm⁶ mol⁻²)",
        editable: true,
        initialRows: [
          { x: 500, y: 32500 },
          { x: 550, y: 4400 },
          { x: 600, y: 810 },
          { x: 650, y: 195 },
          { x: 700, y: 58 },
          { x: 750, y: 20 },
          { x: 800, y: 8 },
          { x: 850, y: 3.5 },
        ],
        transforms: [
          { id: "raw", label: "Kc vs Temperature", x: "x", y: "y", xLabel: "Temperature (K)", yLabel: "Kc (dm⁶ mol⁻²)" },
          { id: "vanthoff", label: "ln(Kc) vs 1/T  [van't Hoff]", x: "1/x", y: "ln(y)", xLabel: "1/T (K⁻¹)", yLabel: "ln(Kc)" },
        ],
        derive: { kind: "gradient", label: "ΔH/R (K)", unit: "K" },
      },
      response: {
        kind: "data",
        prompt: "Describe how you have presented the data. What makes your table and graph clear and scientifically valid?",
        scaffolds: [
          "My table includes headings and units for...",
          "I plotted Kc on the y-axis against temperature on...",
          "The graph shows a... trend because...",
          "I linearised the data by plotting ln(Kc) vs 1/T because...",
          "The straight line on the van't Hoff plot confirms...",
        ],
        rubric: [
          { level: 2, descriptor: "Mentions the data or graph.", keywords: ["table", "graph", "data", "kc", "temperature"], minKeywords: 1 },
          { level: 4, descriptor: "Headings and units on table and axes.", keywords: ["units", "heading", "labelled", "axes", "dm", "mol", "temperature", "kelvin"], minKeywords: 2 },
          { level: 6, descriptor: "Smooth curve of best fit; exponential trend described.", keywords: ["curve", "best fit", "decreases", "exponential", "smooth", "accurate", "scale"], minKeywords: 2 },
          { level: 8, descriptor: "Linearised van't Hoff plot described as a straight line.", keywords: ["ln", "1/t", "straight line", "linear", "van't hoff", "transform", "slope", "gradient"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor: "Calculate the gradient of the linearised plot and determine ΔH/R.",
      guided: [
        { level: 2, body: "Level 1–2: Describes the overall trend ('Kc gets smaller as temperature increases')." },
        { level: 4, body: "Level 3–4: Calculates the change in Kc over the temperature range (32 500 to 3.5) and notes the decrease is very large and non-linear (exponential)." },
        { level: 6, body: "Level 5–6: From the ln(Kc) vs 1/T graph, draws a line of best fit and reads off two widely-spaced points to calculate gradient = Δln(Kc) / Δ(1/T). States the unit of gradient as K." },
        { level: 8, body: "Level 7–8: Full calculation shown — gradient = (ln Kc₂ − ln Kc₁) / (1/T₂ − 1/T₁). Using T = 500 K (Kc = 32 500) and T = 850 K (Kc = 3.5): gradient = (1.25 − 10.39) / (0.001176 − 0.002000) = −9.14 / −0.000824 ≈ 11 090 K. Since gradient = ΔH/R and R = 8.314 J mol⁻¹ K⁻¹: ΔH ≈ 11 090 × 8.314 ≈ 92.2 kJ mol⁻¹." },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Equilibrium constant Kc for N₂(g) + 3H₂(g) ⇌ 2NH₃(g) at different temperatures",
        xLabel: "Temperature (K)",
        yLabel: "Kc (dm⁶ mol⁻²)",
        editable: true,
        initialRows: [
          { x: 500, y: 32500 },
          { x: 550, y: 4400 },
          { x: 600, y: 810 },
          { x: 650, y: 195 },
          { x: 700, y: 58 },
          { x: 750, y: 20 },
          { x: 800, y: 8 },
          { x: 850, y: 3.5 },
        ],
        transforms: [
          { id: "raw", label: "Kc vs Temperature", x: "x", y: "y", xLabel: "Temperature (K)", yLabel: "Kc (dm⁶ mol⁻²)" },
          { id: "vanthoff", label: "ln(Kc) vs 1/T  [van't Hoff]", x: "1/x", y: "ln(y)", xLabel: "1/T (K⁻¹)", yLabel: "ln(Kc)" },
        ],
        derive: { kind: "gradient", label: "ΔH/R (K)", unit: "K" },
      },
      response: {
        kind: "data",
        prompt: "Process the data: calculate the gradient of the ln(Kc) vs 1/T graph and use it to find ΔH/R.",
        scaffolds: [
          "The trend shows that Kc...",
          "From the van't Hoff plot I chose two points: (1/T₁, ln Kc₁) = ... and (1/T₂, ln Kc₂) = ...",
          "Gradient = Δln(Kc) / Δ(1/T) = ... / ... = ... K",
          "Since gradient = ΔH/R and R = 8.314 J mol⁻¹ K⁻¹: ΔH ≈ ... kJ mol⁻¹",
        ],
        rubric: [
          { level: 2, descriptor: "Notes Kc decreases with temperature.", keywords: ["decreases", "increases", "temperature", "kc", "falls", "trend"], minKeywords: 1 },
          { level: 4, descriptor: "Describes exponential decrease; range noted.", keywords: ["exponential", "decrease", "range", "32500", "3.5", "large"], minKeywords: 1 },
          { level: 6, descriptor: "Gradient calculated from linearised graph with working.", keywords: ["gradient", "ln", "1/t", "delta", "slope", "two points", "best fit", "k"], minKeywords: 2 },
          { level: 8, descriptor: "Full gradient calculation and ΔH = gradient × R shown with values.", keywords: ["11000", "11090", "8.314", "92", "kj mol", "delta h", "gradient", "calculation", "r"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor: "State a conclusion about the enthalpy change and link to Le Chatelier's principle.",
      guided: [
        { level: 2, body: "Level 1–2: 'The Kc decreased as temperature increased.'" },
        { level: 4, body: "Level 3–4: 'Kc decreased as temperature increased, showing the equilibrium shifted left at higher temperatures — the reverse reaction was favoured.'" },
        { level: 6, body: "Level 5–6: 'Kc fell from 32 500 to 3.5 as T rose from 500 K to 850 K. By Le Chatelier's principle, increasing T favoured the endothermic reverse reaction, so the forward reaction must be exothermic. The van't Hoff gradient gives ΔH/R ≈ 11 000 K → ΔH ≈ 91 kJ mol⁻¹.'" },
        { level: 8, body: "Level 7–8: Kc decreased by a factor of ~9 300 over the range. Gradient = ΔH/R ≈ 11 090 K → ΔH ≈ −92.2 kJ mol⁻¹. The negative sign (exothermic forward reaction) is consistent with the known value of ΔH = −92 kJ mol⁻¹ — excellent agreement. Le Chatelier's principle predicts, and these data confirm, that high temperatures shift the Haber equilibrium left, reducing yield. Low temperature maximises Kc but slows the rate — the classic industrial compromise." },
      ],
      response: {
        kind: "data",
        prompt: "Write a conclusion. Is the Haber process forward reaction exothermic or endothermic? Use values from the data and link to Le Chatelier's principle.",
        scaffolds: [
          "As temperature increases from 500 K to 850 K, Kc...",
          "By Le Chatelier's principle, this tells us the forward reaction is...",
          "The van't Hoff gradient gives ΔH/R ≈ ___ K, so ΔH ≈ ___ kJ mol⁻¹",
          "This is consistent with / differs from the known value of ΔH = −92 kJ mol⁻¹ because...",
        ],
        rubric: [
          { level: 2, descriptor: "States Kc decreases with temperature.", keywords: ["decreases", "kc", "temperature", "falls"], minKeywords: 1 },
          { level: 4, descriptor: "Equilibrium shifts left; forward reaction is exothermic stated.", keywords: ["exothermic", "left", "reverse", "shift", "equilibrium", "favoured"], minKeywords: 1 },
          { level: 6, descriptor: "Specific data values used; Le Chatelier applied.", keywords: ["32500", "3.5", "500 k", "850 k", "le chatelier", "exothermic", "reverse", "gradient", "91"], minKeywords: 3 },
          { level: 8, descriptor: "ΔH calculated from gradient; compared to known value.", keywords: ["92", "kj mol", "delta h", "gradient", "11000", "8.314", "consistent", "known value", "negative", "exothermic"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor: "Identify weaknesses in the Kc measurement and suggest specific improvements.",
      guided: [
        { level: 2, body: "Level 1–2: 'The method could be improved.'" },
        { level: 4, body: "Level 3–4: 'Only one trial was done at each temperature, which reduces reliability.'" },
        { level: 6, body: "Level 5–6: 'A key limitation is that the system may not have fully reached equilibrium before Kc was measured — if measured too early, Kc would be inaccurate. Also, only one trial per temperature reduces reliability. Improvement: allow longer equilibration time and repeat each measurement 3 times.'" },
        { level: 8, body: "Level 7–8: Multiple specific weaknesses: (1) Equilibrium may not be reached — Kc measured too early would be too low. (2) Temperature control is difficult at high T — a ±10 K uncertainty changes 1/T enough to affect the gradient. (3) Gas leaks would alter concentrations in a closed system. (4) Only 8 data points across a wide range — adding points between 600–700 K (where Kc changes most rapidly) would improve the fit. Each weakness linked to a specific, reasoned improvement." },
      ],
      response: {
        kind: "data",
        prompt: "Evaluate the method used to collect this Kc data. What are the main weaknesses and how would you improve them?",
        scaffolds: [
          "A key weakness is...",
          "This affects the result because...",
          "To improve this, I would...",
          "A temperature uncertainty of ±__ K means...",
          "Reliability could be improved by...",
        ],
        rubric: [
          { level: 2, descriptor: "Vague evaluation.", keywords: ["improve", "better", "error", "weakness", "problem"], minKeywords: 1 },
          { level: 4, descriptor: "One specific weakness mentioned.", keywords: ["repeat", "equilibrium", "temperature", "inaccurate", "only one", "once"], minKeywords: 1 },
          { level: 6, descriptor: "Relevant limitation with matching improvement.", keywords: ["equilibrium not reached", "reliable", "repeat", "longer time", "temperature control", "uncertainty", "improve", "3 times"], minKeywords: 2 },
          { level: 8, descriptor: "Multiple specific weaknesses with reasoned improvements.", keywords: ["equilibrium", "temperature uncertainty", "±10", "gas leak", "8 data points", "600", "700", "1/t", "gradient", "accuracy", "reliability"], minKeywords: 3 },
        ],
      },
    },
  ],
}
