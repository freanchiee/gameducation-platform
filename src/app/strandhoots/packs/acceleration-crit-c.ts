import type { StrandhootPack } from "../engine/types"

// C — Kinematics · Acceleration from v-t data · Criterion C (Processing & Evaluating)
// The data-processor artifact holds velocity vs time data for a trolley on a ramp;
// the gradient of the v-t graph gives acceleration ≈ 0.48 m/s².
export const accelerationCritC: StrandhootPack = {
  slug: "acceleration-crit-c",
  title: "Acceleration from Motion Data",
  subject: "MYP Physics",
  criterion: "C",
  topic: "Acceleration from v-t data",
  accent: "#e07b39",
  icon: "📈",
  statementOfInquiry:
    "Processing velocity-time data reveals acceleration — the key to understanding how forces change motion.",
  estMinutes: 30,
  intro:
    "A trolley on a ramp was timed through light gates at intervals. Use the data tool to plot a v-t graph and find the acceleration from the gradient.",
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
      id: "ramp",
      label: "Trolley on ramp",
      blurb: "Velocity-time data from light gates",
      icon: "📈",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the data in a clear table and a v-t graph.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Data copied with no headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A table with column headings and units; a v-t graph with labelled axes.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units (m/s and s), a sensible scale that fills the grid, points plotted accurately, and a straight best-fit line drawn through the origin.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a clear triangle marked on the best-fit line used to calculate the gradient, with the rise (Δv) and run (Δt) labelled on the graph.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Velocity of trolley on ramp",
        xLabel: "time (s)",
        yLabel: "velocity (m/s)",
        editable: true,
        initialRows: [
          { x: 0, y: 0.0 },
          { x: 0.5, y: 0.24 },
          { x: 1.0, y: 0.49 },
          { x: 1.5, y: 0.73 },
          { x: 2.0, y: 0.98 },
          { x: 2.5, y: 1.21 },
          { x: 3.0, y: 1.45 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Velocity vs time",
            x: "x",
            y: "y",
            xLabel: "time (s)",
            yLabel: "velocity (m/s)",
          },
        ],
        derive: { kind: "gradient", label: "Acceleration", unit: "m/s²" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and v-t graph clear and scientifically valid?",
        scaffolds: [
          "My table has headings and units for",
          "The axes are labelled with",
          "I drew a best-fit line that",
          "The graph passes through",
          "I marked a triangle on the line to find",
        ],
        placeholder:
          "Describe your table, axes, scale, best-fit line and any triangle used…",
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data or a graph.",
            keywords: ["table", "graph", "data", "plot", "velocity", "time"],
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
              "m/s",
              "seconds",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Suitable scale and a straight best-fit line.",
            keywords: [
              "scale",
              "best fit",
              "straight",
              "line",
              "accurate",
              "origin",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Triangle marked on line with rise (Δv) and run (Δt) labelled.",
            keywords: [
              "triangle",
              "rise",
              "run",
              "Δv",
              "Δt",
              "gradient",
              "labelled",
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
        "Find the acceleration from the gradient of the v-t graph; show working.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: States that velocity increases.",
        },
        {
          level: 4,
          body: "Level 3–4: Describes the trend as a steady increase and identifies any anomalous readings.",
        },
        {
          level: 6,
          body: "Level 5–6: Finds the gradient using two points on the best-fit line and states acceleration ≈ 0.48 m/s² with correct units.",
        },
        {
          level: 8,
          body: "Level 7–8: Calculates gradient with a clearly labelled triangle, quotes acceleration = 0.48 m/s², notes the line passes through the origin (confirming uniform acceleration from rest), and comments on scatter/anomalies.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Velocity of trolley on ramp",
        xLabel: "time (s)",
        yLabel: "velocity (m/s)",
        editable: true,
        initialRows: [
          { x: 0, y: 0.0 },
          { x: 0.5, y: 0.24 },
          { x: 1.0, y: 0.49 },
          { x: 1.5, y: 0.73 },
          { x: 2.0, y: 0.98 },
          { x: 2.5, y: 1.21 },
          { x: 3.0, y: 1.45 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Velocity vs time",
            x: "x",
            y: "y",
            xLabel: "time (s)",
            yLabel: "velocity (m/s)",
          },
        ],
        derive: { kind: "gradient", label: "Acceleration", unit: "m/s²" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: find the acceleration. Show your gradient calculation clearly.",
        scaffolds: [
          "gradient = Δv / Δt =",
          "Δv =",
          "Δt =",
          "So acceleration =",
          "m/s²",
          "An anomalous point at t =",
        ],
        placeholder:
          "Show the gradient calculation and state the acceleration with units…",
        rubric: [
          {
            level: 2,
            descriptor: "Notes velocity increases.",
            keywords: ["increase", "faster", "speed", "grows"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Describes trend and anomalies.",
            keywords: [
              "steady",
              "trend",
              "anomal",
              "outlier",
              "increase",
              "constant",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Calculates gradient; quotes acceleration with units.",
            keywords: [
              "gradient",
              "0.48",
              "m/s²",
              "Δv",
              "Δt",
              "acceleration",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Large triangle; quotes 0.48 m/s²; notes origin and scatter.",
            keywords: [
              "triangle",
              "origin",
              "uniform",
              "0.48",
              "scatter",
              "anomal",
              "gradient",
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
          body: "Level 1–2: \"The trolley sped up.\"",
        },
        {
          level: 4,
          body: "Level 3–4: A conclusion that matches the trend, e.g. \"the velocity of the trolley increased steadily over time.\"",
        },
        {
          level: 6,
          body: "Level 5–6: References specific values, e.g. \"the acceleration was constant at 0.48 m/s² because the v-t graph is a straight line.\"",
        },
        {
          level: 8,
          body: "Level 7–8: Links constant acceleration to Newton's Second Law (F = ma — constant net force on the ramp produces constant acceleration), uses data values as evidence, and notes the line passes through the origin confirming the trolley started from rest.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion. Use specific values from the data and link to the physics.",
        scaffolds: [
          "The data show that the trolley",
          "The acceleration was constant at",
          "The v-t graph is a straight line, which means",
          "According to F = ma,",
          "The line passes through the origin, which shows",
        ],
        placeholder: "State and justify your conclusion using the data…",
        rubric: [
          {
            level: 2,
            descriptor: "Basic statement that trolley accelerated.",
            keywords: ["speed", "faster", "accelerate", "increase"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Conclusion matches the trend.",
            keywords: [
              "velocity",
              "increased",
              "steadily",
              "time",
              "trend",
              "constant",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Uses 0.48 m/s² and straight-line evidence.",
            keywords: [
              "0.48",
              "m/s²",
              "straight line",
              "constant",
              "acceleration",
              "evidence",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Links to F = ma; notes constant force and origin intercept.",
            keywords: [
              "f = ma",
              "newton",
              "constant force",
              "origin",
              "rest",
              "evidence",
              "straight line",
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
          body: "Level 1–2: \"The experiment could be better.\"",
        },
        {
          level: 4,
          body: "Level 3–4: Names one weakness, e.g. \"the ramp angle might have changed.\"",
        },
        {
          level: 6,
          body: "Level 5–6: Identifies a relevant limitation (e.g. friction along the ramp is not constant; timing resolution of light gates) and suggests a matching improvement.",
        },
        {
          level: 8,
          body: "Level 7–8: Evaluates validity and reliability — friction varies along the ramp, light gate spacing affects timing resolution (wider spacing → smaller percentage error), air resistance at higher speeds, only 7 data points. Proposes specific improvements: repeat runs and average, measure at more time intervals, use a motion sensor for continuous v-t data, lubricate the ramp or use an air track.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method. What were its weaknesses, and how would you improve it?",
        scaffolds: [
          "A weakness was",
          "This affected the results because",
          "Friction on the ramp",
          "The light gate resolution",
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
              "ramp",
              "angle",
              "friction",
              "timing",
              "single",
              "light gate",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Relevant limitation with a matching improvement.",
            keywords: [
              "friction",
              "resolution",
              "repeat",
              "average",
              "reliable",
              "spacing",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Multiple validity/reliability issues with specific fixes.",
            keywords: [
              "friction",
              "air resistance",
              "resolution",
              "spacing",
              "motion sensor",
              "air track",
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
