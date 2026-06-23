import type { StrandhootPack } from "../engine/types"

// C2 — Radioactive decay & half-life · Criterion C (Processing & Evaluating)
// Sources: Cambridge §5.2 "Radioactivity"; Oxford Ch.12 "Patterns"; Hodder Ch.11.
// The data-processor artifact holds a measured decay dataset; the ln(count)
// linearization recovers the half-life (≈15 s) from the gradient (−λ).
export const halfLifeCritC: StrandhootPack = {
  slug: "half-life-crit-c",
  title: "Half-Life from Decay Data",
  subject: "MYP Physics",
  criterion: "C",
  topic: "Radioactive decay & half-life",
  accent: "#d85140",
  icon: "☢️",
  statementOfInquiry:
    "Processing data and evaluating method lets scientists turn noisy measurements into trustworthy conclusions.",
  estMinutes: 30,
  intro:
    "A student measured the count rate of a radioactive source over time. Use the data tool to plot, transform and analyse it — then process the data, draw a conclusion, and evaluate the method. Each written strand levels up with the depth of your scientific reasoning.",
  badges: [
    { id: "presenter", label: "Clean Data", icon: "📊", description: "Reach Level 8 on Presenting data", strandId: "present", atLevel: 8 },
    { id: "processor", label: "Number Cruncher", icon: "🧮", description: "Reach Level 8 on Processing", strandId: "process", atLevel: 8 },
    { id: "concluder", label: "Evidence-Based", icon: "🔎", description: "Reach Level 8 on Conclusion", strandId: "conclude", atLevel: 8 },
    { id: "evaluator", label: "Critical Scientist", icon: "⚖️", description: "Reach Level 6+ on every strand", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Decay dataset", blurb: "Count rate vs time", icon: "☢️" }],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the data in a clear table and a suitable graph.",
      guided: [
        { level: 2, body: "Level 1–2: Data copied with no headings or units." },
        { level: 4, body: "Level 3–4: A table with column headings and units; a graph with labelled axes." },
        { level: 6, body: "Level 5–6: Axes labelled with units, a sensible scale that fills the grid, and points plotted accurately with a smooth curve of best fit." },
        { level: 8, body: "Level 7–8: As Level 5–6, plus a transformed (linearised) graph of ln(count rate) against time, which should be a straight line for exponential decay — making the data far easier to analyse." },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Measured decay of a radioactive source",
        xLabel: "time (s)",
        yLabel: "count rate (Bq)",
        editable: true,
        initialRows: [
          { x: 0, y: 200 }, { x: 5, y: 158 }, { x: 10, y: 127 }, { x: 15, y: 101 },
          { x: 20, y: 78 }, { x: 25, y: 64 }, { x: 30, y: 49 }, { x: 35, y: 41 }, { x: 40, y: 30 },
        ],
        transforms: [
          { id: "raw", label: "Count vs time", x: "x", y: "y", xLabel: "time (s)", yLabel: "count rate (Bq)" },
          { id: "log", label: "ln(count) vs time", x: "x", y: "ln(y)", xLabel: "time (s)", yLabel: "ln(count rate)" },
        ],
        derive: { kind: "half-life", label: "Half-life", unit: "s" },
      },
      response: {
        kind: "data",
        prompt: "Describe how you have presented the data. What makes your table and graph clear and valid?",
        scaffolds: ["My table has", "The axes are labelled with units", "I plotted", "line of best fit", "I linearised the data by"],
        placeholder: "Describe your table, axes, scale, and any transformation…",
        rubric: [
          { level: 2, descriptor: "Mentions the data.", keywords: ["table", "graph", "data", "plot"], minKeywords: 1 },
          { level: 4, descriptor: "Headings, units and labelled axes.", keywords: ["units", "heading", "labelled", "axes", "bq", "time"], minKeywords: 2 },
          { level: 6, descriptor: "Suitable scale and a curve of best fit.", keywords: ["scale", "best fit", "curve", "accurate", "smooth", "points"], minKeywords: 2 },
          { level: 8, descriptor: "Linearises the data (ln) to a straight line.", keywords: ["ln", "log", "linear", "straight line", "transform", "gradient"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor: "Calculate the half-life and describe the trend.",
      guided: [
        { level: 2, body: "Level 1–2: States the count rate goes down." },
        { level: 4, body: "Level 3–4: Describes the trend as decreasing and identifies any anomalous points." },
        { level: 6, body: "Level 5–6: Reads the half-life from the graph — the time for the count rate to halve (e.g. 200→100 Bq takes about 15 s) — and notes the decay is exponential." },
        { level: 8, body: "Level 7–8: Finds the half-life two ways and compares them: by reading repeated halvings (200→100→50) AND from the ln-graph gradient, where slope = −λ and t½ = ln2 / λ. Comments on anomalies and the random nature of decay." },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Measured decay of a radioactive source",
        xLabel: "time (s)",
        yLabel: "count rate (Bq)",
        editable: true,
        initialRows: [
          { x: 0, y: 200 }, { x: 5, y: 158 }, { x: 10, y: 127 }, { x: 15, y: 101 },
          { x: 20, y: 78 }, { x: 25, y: 64 }, { x: 30, y: 49 }, { x: 35, y: 41 }, { x: 40, y: 30 },
        ],
        transforms: [
          { id: "raw", label: "Count vs time", x: "x", y: "y", xLabel: "time (s)", yLabel: "count rate (Bq)" },
          { id: "log", label: "ln(count) vs time", x: "x", y: "ln(y)", xLabel: "time (s)", yLabel: "ln(count rate)" },
        ],
        derive: { kind: "half-life", label: "Half-life", unit: "s" },
      },
      response: {
        kind: "data",
        prompt: "Process the data: what is the half-life, and how did you find it?",
        scaffolds: ["The count rate halves from", "so the half-life is about", "The decay is exponential because", "From the gradient of the ln graph, λ =", "t½ = ln2 / λ"],
        placeholder: "Calculate and explain the half-life…",
        rubric: [
          { level: 2, descriptor: "Notes the count rate falls.", keywords: ["decrease", "down", "falls", "less"], minKeywords: 1 },
          { level: 4, descriptor: "Describes the decreasing trend and anomalies.", keywords: ["decreasing", "trend", "anomal", "outlier", "steady"], minKeywords: 1 },
          { level: 6, descriptor: "Reads the half-life and identifies exponential decay.", keywords: ["half-life", "halve", "15", "100", "exponential"], minKeywords: 2 },
          { level: 8, descriptor: "Two methods incl. ln-gradient; mentions randomness.", keywords: ["gradient", "ln", "λ", "lambda", "ln2", "random", "repeated", "compare"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor: "State a conclusion supported by the processed data.",
      guided: [
        { level: 2, body: "Level 1–2: \"The source decayed.\"" },
        { level: 4, body: "Level 3–4: A conclusion that matches the trend, e.g. \"the count rate decreased over time.\"" },
        { level: 6, body: "Level 5–6: A conclusion referring to specific values, e.g. \"the half-life is about 15 s, and it stays constant — each 15 s the count rate halves.\"" },
        { level: 8, body: "Level 7–8: Links the constant half-life to the underlying theory (decay is random and exponential; half-life is independent of the starting amount) and uses the data as evidence." },
      ],
      response: {
        kind: "data",
        prompt: "Write a conclusion. Use values from the data and link to the science.",
        scaffolds: ["The data show that", "The half-life is approximately", "This is constant because", "which agrees with the theory that radioactive decay is"],
        placeholder: "State and justify your conclusion using the data…",
        rubric: [
          { level: 2, descriptor: "A basic statement.", keywords: ["decay", "decrease", "source"], minKeywords: 1 },
          { level: 4, descriptor: "Conclusion matches the trend.", keywords: ["count rate", "decreased", "over time", "trend"], minKeywords: 1 },
          { level: 6, descriptor: "Uses specific values incl. half-life.", keywords: ["half-life", "15", "constant", "halve", "200", "100"], minKeywords: 2 },
          { level: 8, descriptor: "Links to theory (random, exponential, independent of amount).", keywords: ["random", "exponential", "independent", "constant", "evidence", "theory"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor: "Identify weaknesses and suggest realistic improvements.",
      guided: [
        { level: 2, body: "Level 1–2: \"It could be better.\"" },
        { level: 4, body: "Level 3–4: Names one weakness, e.g. \"only measured once.\"" },
        { level: 6, body: "Level 5–6: Identifies a relevant limitation (e.g. background radiation not subtracted; few readings) and suggests a matching improvement." },
        { level: 8, body: "Level 7–8: Evaluates validity and reliability — background-radiation correction, the random statistical uncertainty in counts, dead time of the detector — and proposes specific improvements (repeat and average, subtract background, take readings over more half-lives)." },
      ],
      response: {
        kind: "data",
        prompt: "Evaluate the method. What were its weaknesses, and how would you improve it?",
        scaffolds: ["A weakness was", "This affected the results because", "To improve, I would", "Background radiation should be", "Repeating and averaging would"],
        placeholder: "Evaluate validity/reliability and suggest improvements…",
        rubric: [
          { level: 2, descriptor: "Vague evaluation.", keywords: ["improve", "better", "weakness"], minKeywords: 1 },
          { level: 4, descriptor: "One specific weakness.", keywords: ["once", "few readings", "error", "anomal", "single"], minKeywords: 1 },
          { level: 6, descriptor: "Relevant limitation with a matching improvement.", keywords: ["background", "repeat", "average", "more readings", "reliable", "improve"], minKeywords: 2 },
          { level: 8, descriptor: "Evaluates validity/reliability with specific fixes.", keywords: ["background radiation", "subtract", "uncertainty", "random", "statistical", "dead time", "half-lives", "repeat", "average", "valid"], minKeywords: 3 },
        ],
      },
    },
  ],
}
