import type { StrandhootPack } from "../engine/types"

// Crit C data: Rate of protein digestion by pepsin at pH 1–8.
// Optimum at pH 3 (~82%/min); rapid denaturation above pH 5.
// ln(rate) vs pH in the descending region (pH 3–8) gives a straight line
// whose gradient = rate of decline per pH unit.
export const digestionCritC: StrandhootPack = {
  slug: "digestion-crit-c",
  title: "Pepsin Activity vs pH",
  subject: "MYP Biology",
  criterion: "C",
  topic: "Protein digestion dataset",
  accent: "#0984b5",
  icon: "🍎",
  statementOfInquiry:
    "Each component in a system must perform its specific function at the right time and place for the system as a whole to be successful.",
  estMinutes: 30,
  intro:
    "A student measured the rate of protein digestion by pepsin at eight different pH values. Use the data tool to plot, transform and analyse — then draw a conclusion about pepsin's optimal pH and evaluate the method. Each written strand levels up with the depth of your scientific reasoning.",
  badges: [
    { id: "presenter", label: "Data Display", icon: "📊", description: "Reach Level 8 on Presenting data", strandId: "present", atLevel: 8 },
    { id: "processor", label: "Gradient Finder", icon: "📐", description: "Reach Level 8 on Processing data", strandId: "process", atLevel: 8 },
    { id: "concluder", label: "Enzyme Expert", icon: "🔬", description: "Reach Level 8 on Conclusion", strandId: "conclude", atLevel: 8 },
    { id: "evaluator", label: "Method Critic", icon: "⚖️", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Pepsin pH dataset", blurb: "Rate of protein digestion by pepsin at pH 1–8", icon: "🍎" }],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the pepsin activity vs pH data clearly and apply a linearising transform.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table with some data values but missing headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A clear table with column headings (pH; Digestion rate %/min) and a graph with both axes labelled including units. Points plotted accurately.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units; a sensible scale that fills the grid; points plotted with a smooth curve showing the rise to an optimum at pH 3 and a steep fall above pH 5.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a linearised graph of ln(rate) vs pH for the descending portion (pH 3–8). If the decline is exponential, this gives a straight line — far easier to analyse. The gradient gives the rate of decline per pH unit, quantifying how sharply pepsin is denatured away from its optimum.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Rate of protein digestion by pepsin at different pH values",
        xLabel: "pH",
        yLabel: "Digestion rate (% protein digested per min)",
        editable: true,
        initialRows: [
          { x: 1, y: 5 },
          { x: 2, y: 45 },
          { x: 3, y: 82 },
          { x: 4, y: 58 },
          { x: 5, y: 28 },
          { x: 6, y: 11 },
          { x: 7, y: 4 },
          { x: 8, y: 1 },
        ],
        transforms: [
          { id: "raw", label: "Digestion rate vs pH", x: "x", y: "y", xLabel: "pH", yLabel: "Digestion rate (%/min)" },
          { id: "ln", label: "ln(rate) vs pH", x: "x", y: "ln(y)", xLabel: "pH", yLabel: "ln(rate)" },
        ],
        derive: { kind: "gradient", label: "Rate decline per pH unit (pH 3-8)", unit: "%/min per pH unit" },
      },
      response: {
        kind: "data",
        prompt: "Describe how you have presented the data. What makes your table and graph clear and scientifically valid?",
        scaffolds: [
          "My table includes headings and units for...",
          "I plotted digestion rate on the y-axis against pH on...",
          "The graph shows a ___ trend — the rate rises to a peak at pH ___ and then...",
          "I linearised the data by plotting ln(rate) vs pH because...",
          "The straight line on the ln(rate) vs pH graph confirms...",
        ],
        rubric: [
          { level: 2, descriptor: "Mentions the data or graph.", keywords: ["table", "graph", "data", "rate", "ph", "pepsin"], minKeywords: 1 },
          { level: 4, descriptor: "Headings and units on table and axes.", keywords: ["units", "heading", "labelled", "axes", "%", "per min", "ph", "digestion rate"], minKeywords: 2 },
          { level: 6, descriptor: "Smooth curve; peak at pH 3 identified; steep decline above pH 5 described.", keywords: ["curve", "best fit", "peak", "ph 3", "optimum", "declines", "smooth", "accurate", "scale", "ph 5"], minKeywords: 2 },
          { level: 8, descriptor: "Linearised ln(rate) vs pH plot described as a straight line with gradient interpreted.", keywords: ["ln", "straight line", "linear", "transform", "slope", "gradient", "exponential", "descending", "ph 3", "ph 8", "decline"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor: "Calculate the gradient of the ln(rate) vs pH plot to quantify the rate of pepsin denaturation.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Describes the overall trend ('Rate increases then decreases as pH increases').",
        },
        {
          level: 4,
          body: "Level 3–4: Identifies the peak at pH 3 (82%/min) and lowest values at pH 1 (5%/min) and pH 8 (1%/min). Notes the rapid decline above pH 3.",
        },
        {
          level: 6,
          body: "Level 5–6: From the ln(rate) vs pH graph (pH 3–8), draws a line of best fit and reads off two widely-spaced points to calculate gradient = Δln(rate) / ΔpH. States units of gradient as per pH unit.",
        },
        {
          level: 8,
          body: "Level 7–8: Full calculation shown — gradient = (ln rate₂ − ln rate₁) / (pH₂ − pH₁). Using pH 3 (rate = 82) and pH 8 (rate = 1): gradient = (ln 1 − ln 82) / (8 − 3) = (0 − 4.41) / 5 = −0.88 per pH unit. This means each unit rise in pH reduces ln(rate) by 0.88, equivalent to reducing the rate by a factor of e^0.88 ≈ 2.4× per pH unit — rapid denaturation in the alkaline range.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Rate of protein digestion by pepsin at different pH values",
        xLabel: "pH",
        yLabel: "Digestion rate (% protein digested per min)",
        editable: true,
        initialRows: [
          { x: 1, y: 5 },
          { x: 2, y: 45 },
          { x: 3, y: 82 },
          { x: 4, y: 58 },
          { x: 5, y: 28 },
          { x: 6, y: 11 },
          { x: 7, y: 4 },
          { x: 8, y: 1 },
        ],
        transforms: [
          { id: "raw", label: "Digestion rate vs pH", x: "x", y: "y", xLabel: "pH", yLabel: "Digestion rate (%/min)" },
          { id: "ln", label: "ln(rate) vs pH", x: "x", y: "ln(y)", xLabel: "pH", yLabel: "ln(rate)" },
        ],
        derive: { kind: "gradient", label: "Rate decline per pH unit (pH 3-8)", unit: "%/min per pH unit" },
      },
      response: {
        kind: "data",
        prompt: "Process the data: identify the optimum pH, then calculate the gradient of the ln(rate) vs pH graph (pH 3–8) to find how quickly the rate declines per pH unit.",
        scaffolds: [
          "The optimum pH for pepsin is ___ because the rate is highest at ___",
          "From the ln(rate) vs pH graph I chose two points: (pH₁, ln rate₁) = ... and (pH₂, ln rate₂) = ...",
          "Gradient = Δln(rate) / ΔpH = ___ / ___ = ___ per pH unit",
          "This means each unit rise in pH reduces the rate by a factor of e^___ ≈ ___× per pH unit",
        ],
        rubric: [
          { level: 2, descriptor: "Notes rate increases then decreases.", keywords: ["increases", "decreases", "rate", "ph", "rises", "falls", "trend", "optimum"], minKeywords: 1 },
          { level: 4, descriptor: "Peak at pH 3 identified with value; rapid decline above pH 4 noted.", keywords: ["ph 3", "82", "peak", "highest", "decline", "ph 4", "ph 5", "rapidly", "falls"], minKeywords: 1 },
          { level: 6, descriptor: "Gradient calculated from ln(rate) vs pH with working shown.", keywords: ["gradient", "ln", "slope", "two points", "delta", "best fit", "ph unit", "descending"], minKeywords: 2 },
          { level: 8, descriptor: "Full gradient calculation with e^gradient factor interpretation.", keywords: ["4.41", "ln 82", "ln 1", "0.88", "2.4", "e^", "factor", "per ph unit", "denaturation", "rapid", "calculation"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor: "State a conclusion about pepsin's optimal pH and link to its function in the stomach.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'Pepsin works best at low pH.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Pepsin works best at pH 3, with a rate of 82%/min. The rate falls steeply above pH 4 as the enzyme is denatured.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'Pepsin has an optimal pH of approximately 3, matching stomach conditions (HCl gives pH 1–3). Rate fell from 82%/min at pH 3 to 1%/min at pH 8. The enzyme's active site is adapted to function in acid — the key ionisable residues (Asp32, Asp215) are protonated at low pH, enabling substrate binding. Above pH 5, denaturation destroys this shape.'",
        },
        {
          level: 8,
          body: "Level 7–8: 'Optimum pH ≈ 3 (rate = 82%/min). Gradient of ln(rate) vs pH = −0.88 per pH unit — each pH unit rise reduces rate by ≈2.4×. This rapid denaturation above pH 5 matches pepsin's biological role: once food leaves the stomach and enters the duodenum (pH 7–8), pepsin is irreversibly denatured. This prevents pepsin from digesting the intestinal wall — a biological safety mechanism. The data support the hypothesis and match the known Km minimum for pepsin at pH 2–3.'",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Rate of protein digestion by pepsin at different pH values",
        xLabel: "pH",
        yLabel: "Digestion rate (% protein digested per min)",
        editable: true,
        initialRows: [
          { x: 1, y: 5 },
          { x: 2, y: 45 },
          { x: 3, y: 82 },
          { x: 4, y: 58 },
          { x: 5, y: 28 },
          { x: 6, y: 11 },
          { x: 7, y: 4 },
          { x: 8, y: 1 },
        ],
        transforms: [
          { id: "raw", label: "Digestion rate vs pH", x: "x", y: "y", xLabel: "pH", yLabel: "Digestion rate (%/min)" },
          { id: "ln", label: "ln(rate) vs pH", x: "x", y: "ln(y)", xLabel: "pH", yLabel: "ln(rate)" },
        ],
        derive: { kind: "gradient", label: "Rate decline per pH unit (pH 3-8)", unit: "%/min per pH unit" },
      },
      response: {
        kind: "data",
        prompt: "Write a conclusion. What is the optimal pH for pepsin? Use data values to support your answer and link pepsin's optimal pH to its role in the stomach.",
        scaffolds: [
          "The optimal pH for pepsin is approximately ___ because the rate is highest at ___",
          "The rate declines from ___ at pH 3 to ___ at pH 8, showing...",
          "This is consistent with pepsin's biological role in the stomach where...",
          "The gradient of −0.88 per pH unit means...",
          "This matches / differs from the hypothesis because...",
        ],
        rubric: [
          { level: 2, descriptor: "States pepsin works best at low pH.", keywords: ["low ph", "acid", "pepsin", "best", "optimal", "rate", "highest"], minKeywords: 1 },
          { level: 4, descriptor: "Optimal pH 3 stated with value; denaturation above pH 4 mentioned.", keywords: ["ph 3", "82", "optimal", "denaturation", "ph 4", "decreases", "rate", "denatures"], minKeywords: 1 },
          { level: 6, descriptor: "Specific data values used; stomach pH link made; active site/ionisable residues mentioned.", keywords: ["82", "ph 3", "1", "ph 8", "stomach", "hcl", "active site", "denaturation", "ph 5", "adapted", "ionisable"], minKeywords: 3 },
          { level: 8, descriptor: "Gradient used; biological safety mechanism of denaturation in duodenum discussed; hypothesis evaluated.", keywords: ["0.88", "2.4", "duodenum", "ph 7", "irreversibly", "safety", "intestinal wall", "km", "hypothesis", "gradient", "consistent"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor: "Identify weaknesses in the pepsin activity measurement and suggest specific improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The method could be improved.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Only one trial was done at each pH, which reduces reliability. The visual endpoint (cloudy → clear) is subjective.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'A key limitation is that visual clarity is subjective — different observers may judge the endpoint differently. Using a colorimeter at 600 nm provides an objective, continuous absorbance measurement. Only one trial at each pH reduces reliability — repeating 3 times and calculating mean ± SD would improve this. Temperature may not have been constant throughout — a thermostated water bath with ±0.5°C control is needed.'",
        },
        {
          level: 8,
          body: "Level 7–8: Multiple specific weaknesses: (1) Visual endpoint is subjective (±5% observer error) — colorimeter at 600 nm gives objective data, initial rate (tangent at t=0) is more precise than total clearing time. (2) Commercial pepsin contains other proteases (cathepsins) — purified pepsin would give a cleaner result. (3) Only 8 pH values — adding pH 2.5, 3.5, 4.5 in the optimum region would better define the peak. (4) Albumin concentration may fall during the experiment — using a spectrophotometer with a flow-through cell and continuous recording would fix this. Each weakness linked to a specific reasoned improvement.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Rate of protein digestion by pepsin at different pH values",
        xLabel: "pH",
        yLabel: "Digestion rate (% protein digested per min)",
        editable: true,
        initialRows: [
          { x: 1, y: 5 },
          { x: 2, y: 45 },
          { x: 3, y: 82 },
          { x: 4, y: 58 },
          { x: 5, y: 28 },
          { x: 6, y: 11 },
          { x: 7, y: 4 },
          { x: 8, y: 1 },
        ],
        transforms: [
          { id: "raw", label: "Digestion rate vs pH", x: "x", y: "y", xLabel: "pH", yLabel: "Digestion rate (%/min)" },
          { id: "ln", label: "ln(rate) vs pH", x: "x", y: "ln(y)", xLabel: "pH", yLabel: "ln(rate)" },
        ],
        derive: { kind: "gradient", label: "Rate decline per pH unit (pH 3-8)", unit: "%/min per pH unit" },
      },
      response: {
        kind: "data",
        prompt: "Evaluate the method used to collect this pepsin activity data. What are the main weaknesses and how would you improve them?",
        scaffolds: [
          "A key weakness is...",
          "This affects the result because...",
          "To improve this, I would...",
          "Reliability could be improved by...",
          "An additional limitation is that only 8 pH values were tested — this means...",
        ],
        rubric: [
          { level: 2, descriptor: "Vague evaluation.", keywords: ["improve", "better", "error", "weakness", "problem", "limitation"], minKeywords: 1 },
          { level: 4, descriptor: "One specific weakness mentioned.", keywords: ["subjective", "visual", "repeat", "reliability", "one trial", "temperature", "only once"], minKeywords: 1 },
          { level: 6, descriptor: "Relevant limitation with matching improvement.", keywords: ["colorimeter", "600 nm", "objective", "reliable", "repeat", "3 times", "temperature", "water bath", "±0.5", "observer", "improve"], minKeywords: 2 },
          { level: 8, descriptor: "Multiple specific weaknesses with reasoned improvements.", keywords: ["cathepsins", "purified pepsin", "initial rate", "tangent", "8 ph values", "2.5", "3.5", "spectrophotometer", "flow-through", "observer error", "5%", "continuous", "accuracy"], minKeywords: 3 },
        ],
      },
    },
  ],
}
