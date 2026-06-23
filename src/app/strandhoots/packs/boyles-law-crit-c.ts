import type { StrandhootPack } from "../engine/types"

// C — Gas laws · Boyle's Law · Criterion C (Processing & Evaluating)
// The data-processor holds P vs V data for trapped air in a syringe.
// Linearising to P vs 1/V gives a straight line through the origin, confirming PV = constant ≈ 10100 kPa⋅cm³.
export const boylesLawCritC: StrandhootPack = {
  slug: "boyles-law-crit-c",
  title: "Boyle's Law: P vs 1/V",
  subject: "MYP Physics",
  criterion: "C",
  topic: "Boyle's law (P vs 1/V linearisation)",
  accent: "#6b3fa0",
  icon: "🔵",
  statementOfInquiry:
    "Linearising data reveals the mathematical relationship between variables — Boyle's law shows pressure and volume are inversely proportional.",
  estMinutes: 30,
  intro:
    "A student compressed a fixed mass of air in a sealed syringe, recording the pressure as the volume changed. Use the data tool to test Boyle's law.",
  badges: [
    {
      id: "presenter",
      label: "Clean Data",
      icon: "📊",
      description: "Reach Level 8 on Presenting data",
      strandId: "present",
      atLevel: 8,
    },
    {
      id: "processor",
      label: "Number Cruncher",
      icon: "🧮",
      description: "Reach Level 8 on Processing",
      strandId: "process",
      atLevel: 8,
    },
    {
      id: "concluder",
      label: "Evidence-Based",
      icon: "🔎",
      description: "Reach Level 8 on Conclusion",
      strandId: "conclude",
      atLevel: 8,
    },
    {
      id: "evaluator",
      label: "Critical Scientist",
      icon: "⚖️",
      description: "Reach Level 6+ on every strand",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "syringe",
      label: "Syringe experiment",
      blurb: "Pressure vs volume for trapped air",
      icon: "🔵",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor:
        "Display the data in a clear table and plot P vs V to show the hyperbolic relationship.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Data copied with no headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A table with column headings and units (cm³, kPa); a P vs V graph with labelled axes showing pressure increasing as volume decreases.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, a sensible scale, points plotted accurately, and a smooth hyperbolic curve of best fit drawn through the data.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a linearised graph of P vs 1/V — which should be a straight line through the origin, confirming the inverse proportionality. Notes what the gradient represents (PV constant).",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Pressure vs volume of trapped air",
        xLabel: "volume (cm³)",
        yLabel: "pressure (kPa)",
        editable: true,
        initialRows: [
          { x: 100, y: 101 },
          { x: 80, y: 126 },
          { x: 60, y: 168 },
          { x: 50, y: 202 },
          { x: 40, y: 253 },
          { x: 30, y: 337 },
        ],
        transforms: [
          {
            id: "raw",
            label: "P vs V (hyperbola)",
            x: "x",
            y: "y",
            xLabel: "volume (cm³)",
            yLabel: "pressure (kPa)",
          },
          {
            id: "linearised",
            label: "P vs 1/V (linearised)",
            x: "1/x",
            y: "y",
            xLabel: "1/V (cm⁻³)",
            yLabel: "pressure (kPa)",
          },
        ],
        derive: { kind: "gradient", label: "PV constant", unit: "kPa⋅cm³" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What shape is the P vs V graph, and how does the linearised graph confirm Boyle's law?",
        scaffolds: [
          "My table has headings and units for",
          "The P vs V graph is a",
          "As volume decreases, pressure",
          "I linearised by plotting P vs 1/V, which gives",
          "The gradient of the P vs 1/V graph represents",
        ],
        placeholder:
          "Describe your table, axes, the hyperbolic curve, and the linearised graph…",
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data or a graph.",
            keywords: ["table", "graph", "data", "plot", "pressure", "volume"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings, units and labelled axes.",
            keywords: [
              "units",
              "heading",
              "labelled",
              "axes",
              "kpa",
              "cm³",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Describes hyperbolic curve; pressure increases as V decreases.",
            keywords: [
              "hyperbola",
              "curve",
              "decreases",
              "increases",
              "best fit",
              "inverse",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "P vs 1/V straight line noted; gradient = PV constant explained.",
            keywords: [
              "1/v",
              "straight line",
              "linearised",
              "gradient",
              "pv",
              "constant",
              "origin",
            ],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor:
        "Linearise the data (P vs 1/V) and find the gradient to verify that PV is constant.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Notes that pressure goes up as volume goes down.",
        },
        {
          level: 4,
          body: "Level 3–4: Describes the inverse trend and identifies any anomalous points.",
        },
        {
          level: 6,
          body: "Level 5–6: Calculates P × V for two or more rows and notes the values are approximately equal (≈ 10100 kPa⋅cm³), confirming Boyle's law.",
        },
        {
          level: 8,
          body: "Level 7–8: Plots P vs 1/V, draws a best-fit line through the origin, and finds the gradient using a large triangle. States gradient = PV constant ≈ 10100 kPa⋅cm³. Verifies with P₁V₁ = P₂V₂ using at least two data pairs and comments on any anomalous points.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Pressure vs volume of trapped air",
        xLabel: "volume (cm³)",
        yLabel: "pressure (kPa)",
        editable: true,
        initialRows: [
          { x: 100, y: 101 },
          { x: 80, y: 126 },
          { x: 60, y: 168 },
          { x: 50, y: 202 },
          { x: 40, y: 253 },
          { x: 30, y: 337 },
        ],
        transforms: [
          {
            id: "raw",
            label: "P vs V (hyperbola)",
            x: "x",
            y: "y",
            xLabel: "volume (cm³)",
            yLabel: "pressure (kPa)",
          },
          {
            id: "linearised",
            label: "P vs 1/V (linearised)",
            x: "1/x",
            y: "y",
            xLabel: "1/V (cm⁻³)",
            yLabel: "pressure (kPa)",
          },
        ],
        derive: { kind: "gradient", label: "PV constant", unit: "kPa⋅cm³" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: linearise to P vs 1/V, find the gradient, and verify P₁V₁ = P₂V₂.",
        scaffolds: [
          "P × V at V = 100 cm³: 101 × 100 =",
          "gradient = ΔP / Δ(1/V) =",
          "This represents the PV constant =",
          "P₁V₁ = P₂V₂: 101 × 100 =",
          "kPa⋅cm³",
          "An anomalous point is at V =",
        ],
        placeholder:
          "Calculate PV products, find the gradient, and verify Boyle's law…",
        rubric: [
          {
            level: 2,
            descriptor: "Notes pressure increases as volume decreases.",
            keywords: ["increase", "decrease", "pressure", "volume", "smaller"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Describes the inverse trend; identifies anomalies.",
            keywords: [
              "inverse",
              "trend",
              "anomal",
              "outlier",
              "as volume",
              "decreases",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Calculates P × V showing it is approximately constant.",
            keywords: [
              "p × v",
              "pv",
              "10100",
              "constant",
              "product",
              "equal",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "P vs 1/V gradient found; P₁V₁ = P₂V₂ verified; anomalies noted.",
            keywords: [
              "gradient",
              "1/v",
              "triangle",
              "10100",
              "p₁v₁",
              "p₂v₂",
              "verify",
              "anomal",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor: "State a conclusion supported by the processed data.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: \"The pressure went up when the volume went down.\"",
        },
        {
          level: 4,
          body: "Level 3–4: A conclusion that matches the trend, e.g. \"the pressure increased as the volume decreased.\"",
        },
        {
          level: 6,
          body: "Level 5–6: References specific values, e.g. \"P × V ≈ 10100 kPa⋅cm³ in each case, confirming Boyle's law P ∝ 1/V for a fixed mass of gas at constant temperature.\"",
        },
        {
          level: 8,
          body: "Level 7–8: States P ∝ 1/V confirmed by the straight-line P vs 1/V graph through the origin, quotes PV constant ≈ 10100 kPa⋅cm³, and links to the kinetic theory explanation — the same number of molecules in a smaller space collide with the walls more frequently, so pressure is higher.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion. Use specific values from the data and link to kinetic theory.",
        scaffolds: [
          "The data show that pressure and volume are",
          "P × V ≈",
          "kPa⋅cm³ in each case, confirming",
          "The P vs 1/V graph is a straight line through the origin, which shows",
          "According to kinetic theory, the same molecules in a smaller space",
        ],
        placeholder: "State and justify your conclusion using the data…",
        rubric: [
          {
            level: 2,
            descriptor: "Basic statement about pressure and volume.",
            keywords: ["pressure", "volume", "increase", "decrease"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Conclusion matches the observed trend.",
            keywords: [
              "pressure",
              "increased",
              "decreased",
              "as volume",
              "trend",
              "inverse",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "PV ≈ 10100 quoted; Boyle's law P ∝ 1/V stated with evidence.",
            keywords: [
              "10100",
              "pv",
              "constant",
              "boyle",
              "p ∝ 1/v",
              "confirms",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Straight-line P vs 1/V evidence; kinetic theory explanation.",
            keywords: [
              "straight line",
              "origin",
              "kinetic theory",
              "molecules",
              "collisions",
              "10100",
              "boyle",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor: "Identify weaknesses and suggest realistic improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: \"The experiment could be improved.\"",
        },
        {
          level: 4,
          body: "Level 3–4: Names one weakness, e.g. \"the volume was hard to read accurately.\"",
        },
        {
          level: 6,
          body: "Level 5–6: Identifies a relevant limitation (e.g. temperature rises during rapid compression, invalidating Boyle's law which assumes constant temperature) and suggests a matching improvement.",
        },
        {
          level: 8,
          body: "Level 7–8: Evaluates validity and reliability — temperature not perfectly constant during compression (Boyle's law requires isothermal conditions), friction in the piston gives systematic error, difficulty reading the scale accurately at small volumes, only 6 data points. Proposes specific improvements: compress slowly and wait for temperature to equilibrate, use a digital pressure sensor, take more readings especially at small volumes, repeat measurements and average.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method. What were its weaknesses, and how would you improve it?",
        scaffolds: [
          "A weakness was",
          "Boyle's law assumes constant temperature, but",
          "Friction in the piston",
          "To improve, I would",
          "Compressing slowly would",
          "Using a digital pressure sensor would",
        ],
        placeholder:
          "Evaluate validity/reliability and suggest specific improvements…",
        rubric: [
          {
            level: 2,
            descriptor: "Vague evaluation.",
            keywords: ["improve", "better", "weakness", "error"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One specific weakness named.",
            keywords: [
              "temperature",
              "volume",
              "friction",
              "reading",
              "scale",
              "accurate",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "Temperature / isothermal condition identified; matched improvement.",
            keywords: [
              "temperature",
              "isothermal",
              "constant",
              "slowly",
              "equilibrate",
              "valid",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Temperature + friction + scale + data points; specific fixes.",
            keywords: [
              "isothermal",
              "friction",
              "digital",
              "pressure sensor",
              "slowly",
              "equilibrate",
              "repeat",
              "average",
              "valid",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
