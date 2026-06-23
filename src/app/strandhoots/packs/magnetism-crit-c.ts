import type { StrandhootPack } from "../engine/types"

// C — Magnetism · Distance vs field strength · Criterion C (Processing & Evaluating)
// The data-processor artifact holds force vs distance data; the 1/F vs d² linearisation
// confirms the inverse square law F ∝ 1/d².
export const magnetismCritC: StrandhootPack = {
  slug: "magnetism-crit-c",
  title: "Magnetism — Processing & Evaluating",
  subject: "MYP Physics",
  criterion: "C",
  topic: "Magnetism: distance vs field strength",
  accent: "#c0392b",
  icon: "🧲",
  statementOfInquiry:
    "Processing experimental data and evaluating methods turns raw magnetism readings into scientific conclusions.",
  estMinutes: 30,
  intro:
    "A student measured the force a magnet exerted on a steel ball at different distances. Use the data tool to plot, analyse and evaluate the results.",
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
      id: "distance",
      label: "Distance effect",
      blurb: "Force vs distance data",
      icon: "📏",
    },
    {
      id: "magnets",
      label: "Multiple magnets",
      blurb: "Stacking magnets data",
      icon: "🧲",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the data in a clear table and a suitable graph.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Data copied with no headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A table with column headings and units; a graph with labelled axes showing force decreasing with distance.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, a sensible scale that fills the grid, and points plotted accurately with a smooth curve of best fit.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a linearised graph of 1/F vs d² — which should be a straight line, making the inverse-square relationship clear and allowing the gradient to be found precisely.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Magnetic force vs distance",
        xLabel: "distance (cm)",
        yLabel: "force (mN)",
        editable: true,
        initialRows: [
          { x: 2, y: 48 },
          { x: 4, y: 12 },
          { x: 6, y: 5.3 },
          { x: 8, y: 3.0 },
          { x: 10, y: 1.9 },
          { x: 12, y: 1.3 },
          { x: 14, y: 1.0 },
          { x: 16, y: 0.75 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Force vs distance",
            x: "x",
            y: "y",
            xLabel: "distance (cm)",
            yLabel: "force (mN)",
          },
          {
            id: "linearised",
            label: "1/F vs d² (linearised)",
            x: "x²",
            y: "1/y",
            xLabel: "d² (cm²)",
            yLabel: "1/F (mN⁻¹)",
          },
        ],
        derive: { kind: "gradient", label: "1/F gradient", unit: "mN⁻¹/cm²" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and graph clear and scientifically valid?",
        scaffolds: [
          "My table has headings and units for",
          "The axes are labelled with",
          "I drew a best-fit",
          "I linearised the data by plotting",
          "The linearised graph is a straight line because",
        ],
        placeholder:
          "Describe your table, axes, scale, curve shape, and any linearisation…",
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data or a graph.",
            keywords: ["table", "graph", "data", "plot", "distance", "force"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings, units and labelled axes.",
            keywords: ["units", "heading", "labelled", "axes", "mn", "cm"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Suitable scale and a curve of best fit.",
            keywords: [
              "scale",
              "best fit",
              "curve",
              "accurate",
              "smooth",
              "decreases",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Linearises to 1/F vs d² — a straight line.",
            keywords: [
              "1/f",
              "d²",
              "linearised",
              "straight line",
              "inverse",
              "transform",
              "gradient",
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
        "Calculate the gradient of the linearised graph and interpret it.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Notes that force decreases as distance increases.",
        },
        {
          level: 4,
          body: "Level 3–4: Describes the trend as decreasing and identifies any anomalous points.",
        },
        {
          level: 6,
          body: "Level 5–6: States that force roughly halves when distance doubles and identifies this as an inverse relationship.",
        },
        {
          level: 8,
          body: "Level 7–8: Plots 1/F vs d², finds the gradient using a large triangle on the best-fit line, and states this confirms F ∝ 1/d² (inverse square law). Identifies any anomalous points and explains them.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Magnetic force vs distance",
        xLabel: "distance (cm)",
        yLabel: "force (mN)",
        editable: true,
        initialRows: [
          { x: 2, y: 48 },
          { x: 4, y: 12 },
          { x: 6, y: 5.3 },
          { x: 8, y: 3.0 },
          { x: 10, y: 1.9 },
          { x: 12, y: 1.3 },
          { x: 14, y: 1.0 },
          { x: 16, y: 0.75 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Force vs distance",
            x: "x",
            y: "y",
            xLabel: "distance (cm)",
            yLabel: "force (mN)",
          },
          {
            id: "linearised",
            label: "1/F vs d² (linearised)",
            x: "x²",
            y: "1/y",
            xLabel: "d² (cm²)",
            yLabel: "1/F (mN⁻¹)",
          },
        ],
        derive: { kind: "gradient", label: "1/F gradient", unit: "mN⁻¹/cm²" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: find the gradient of the 1/F vs d² graph. What does it tell you about the relationship between force and distance?",
        scaffolds: [
          "When distance doubles, force",
          "The gradient of 1/F vs d² is",
          "This means F ∝",
          "An anomalous point is at d =",
          "The inverse square law predicts",
        ],
        placeholder: "Calculate the gradient and explain the relationship…",
        rubric: [
          {
            level: 2,
            descriptor: "Notes force decreases with distance.",
            keywords: ["decrease", "less", "smaller", "further"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Describes the trend and anomalies.",
            keywords: ["decreasing", "trend", "anomal", "outlier", "pattern"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "Identifies that force approximately halves as distance doubles.",
            keywords: [
              "halve",
              "double",
              "inverse",
              "proportional",
              "relationship",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Finds the gradient of 1/F vs d²; confirms inverse square law.",
            keywords: [
              "gradient",
              "1/f",
              "d²",
              "inverse square",
              "1/d²",
              "triangle",
              "confirms",
            ],
            minKeywords: 2,
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
          body: "Level 1–2: \"The force got smaller as the distance increased.\"",
        },
        {
          level: 4,
          body: "Level 3–4: A conclusion that matches the trend, e.g. \"the force decreased as the distance between the magnet and ball increased.\"",
        },
        {
          level: 6,
          body: "Level 5–6: References specific values, e.g. \"at 2 cm the force was 48 mN but at 4 cm it fell to 12 mN — roughly a quarter, consistent with an inverse square law.\"",
        },
        {
          level: 8,
          body: "Level 7–8: States F ∝ 1/d², links the straight-line 1/F vs d² graph as evidence, and connects to the field-line model (field lines spread over 4× the area when distance doubles).",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion. Use specific values from the data and link to the underlying science.",
        scaffolds: [
          "The data show that force",
          "At d = 2 cm, F = 48 mN; at d = 4 cm, F =",
          "This is consistent with F ∝",
          "The 1/F vs d² graph is a straight line, which shows",
          "Magnetic field lines spread out",
        ],
        placeholder: "State and justify your conclusion using the data…",
        rubric: [
          {
            level: 2,
            descriptor: "Basic statement about trend direction.",
            keywords: ["force", "decrease", "distance", "smaller"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Conclusion matches the observed trend.",
            keywords: [
              "increased",
              "decreased",
              "as distance",
              "force decreased",
              "trend",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Uses specific data values as evidence.",
            keywords: ["48", "12", "quarter", "halve", "values", "evidence"],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "States inverse square law; links to field-line model or 1/F vs d² evidence.",
            keywords: [
              "inverse square",
              "1/d²",
              "field lines",
              "straight line",
              "evidence",
              "proportional",
            ],
            minKeywords: 2,
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
          body: "Level 3–4: Names one weakness, e.g. \"the distance was hard to measure accurately.\"",
        },
        {
          level: 6,
          body: "Level 5–6: Identifies a relevant limitation (e.g. the magnet is not a point source, so the inverse-square law only applies approximately) and suggests a matching improvement.",
        },
        {
          level: 8,
          body: "Level 7–8: Evaluates validity and reliability — magnet not a point source, distance measured from surface not centre, steel ball magnetised and retains some magnetism, friction if ball rests on a surface, only 8 data points. Proposes specific improvements: measure from the centre of the magnet, use a Hall probe instead of measuring force, repeat readings, take more distances especially at close range.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method. What were its weaknesses, and how would you improve it?",
        scaffolds: [
          "A weakness was",
          "This affected the results because",
          "The magnet is not a point source, so",
          "To improve, I would",
          "Repeating and averaging would",
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
              "distance",
              "measure",
              "difficult",
              "accurate",
              "single",
              "once",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Relevant limitation with a matching improvement.",
            keywords: [
              "point source",
              "centre",
              "surface",
              "repeat",
              "average",
              "reliable",
              "friction",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Multiple validity/reliability issues with specific fixes.",
            keywords: [
              "point source",
              "centre",
              "magnetised",
              "friction",
              "hall probe",
              "repeat",
              "average",
              "more distances",
              "valid",
              "reliability",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
