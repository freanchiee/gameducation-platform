import type { StrandhootPack } from "../engine/types"

// C — Thermal physics · Specific heat capacity · Criterion C (Processing & Evaluating)
// The data-processor holds energy supplied vs temperature data for 1 kg of water.
// The gradient of the T vs E graph = 1/(mc) → c ≈ 4200 J/kg°C (SHC of water).
export const shcCritC: StrandhootPack = {
  slug: "shc-crit-c",
  title: "Specific Heat Capacity",
  subject: "MYP Physics",
  criterion: "C",
  topic: "Specific heat capacity (E = mcΔT)",
  accent: "#0984b5",
  icon: "🌡️",
  statementOfInquiry:
    "Processing calorimetry data lets scientists determine how much energy different materials store — crucial for engineering and climate science.",
  estMinutes: 30,
  intro:
    "A student heated 1 kg of water with a 50 W immersion heater. Use the data tool to plot energy supplied vs temperature rise and find the specific heat capacity.",
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
      id: "water",
      label: "Water heating experiment",
      blurb: "Energy vs temperature data for 1 kg of water",
      icon: "🌡️",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the data in a clear table and an E vs T graph.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Data copied with no headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A table with column headings and units (J, °C); a graph with labelled axes.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, a sensible scale that fills the grid, points plotted accurately, and a straight best-fit line drawn through or near the data.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a clear triangle marked on the best-fit line used to calculate the gradient, with the rise (ΔT) and run (ΔE) labelled. Notes the linear relationship confirms E = mcΔT is valid.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Heating 1 kg of water",
        xLabel: "energy supplied (J)",
        yLabel: "temperature (°C)",
        editable: true,
        initialRows: [
          { x: 0, y: 20.0 },
          { x: 4200, y: 21.1 },
          { x: 8400, y: 21.9 },
          { x: 12600, y: 23.1 },
          { x: 16800, y: 23.8 },
          { x: 21000, y: 25.2 },
          { x: 25200, y: 26.0 },
          { x: 29400, y: 26.9 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Temperature vs energy",
            x: "x",
            y: "y",
            xLabel: "energy supplied (J)",
            yLabel: "temperature (°C)",
          },
        ],
        derive: {
          kind: "gradient",
          label: "ΔT/ΔE gradient",
          unit: "°C/J",
        },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and graph clear and scientifically valid?",
        scaffolds: [
          "My table has headings and units for",
          "The axes are labelled with",
          "I drew a best-fit line that",
          "The relationship appears",
          "I marked a triangle on the line to find",
        ],
        placeholder:
          "Describe your table, axes, scale, and best-fit line…",
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data or a graph.",
            keywords: ["table", "graph", "data", "plot", "temperature", "energy"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings, units and labelled axes.",
            keywords: ["units", "heading", "labelled", "axes", "°c", "joules", "j"],
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
              "linear",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Triangle on line with ΔT and ΔE labelled; notes linearity confirms E = mcΔT.",
            keywords: [
              "triangle",
              "Δt",
              "Δe",
              "gradient",
              "labelled",
              "e = mcΔt",
              "linear",
              "confirms",
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
        "Calculate the gradient and rearrange E = mcΔT to find the specific heat capacity.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: States that temperature increases as energy is added.",
        },
        {
          level: 4,
          body: "Level 3–4: Describes the trend as a steady increase and identifies any anomalous readings.",
        },
        {
          level: 6,
          body: "Level 5–6: Finds the gradient ≈ 2.38 × 10⁻⁴ °C/J using a large triangle, states c = 1/(m × gradient), and quotes c ≈ 4200 J/kg°C.",
        },
        {
          level: 8,
          body: "Level 7–8: Calculates gradient with a labelled triangle, rearranges E = mcΔT → c = E/(mΔT) = 1/(m × gradient) showing all algebraic steps, quotes c ≈ 4200 J/kg°C with correct units, and notes scatter/anomalies.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Heating 1 kg of water",
        xLabel: "energy supplied (J)",
        yLabel: "temperature (°C)",
        editable: true,
        initialRows: [
          { x: 0, y: 20.0 },
          { x: 4200, y: 21.1 },
          { x: 8400, y: 21.9 },
          { x: 12600, y: 23.1 },
          { x: 16800, y: 23.8 },
          { x: 21000, y: 25.2 },
          { x: 25200, y: 26.0 },
          { x: 29400, y: 26.9 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Temperature vs energy",
            x: "x",
            y: "y",
            xLabel: "energy supplied (J)",
            yLabel: "temperature (°C)",
          },
        ],
        derive: {
          kind: "gradient",
          label: "ΔT/ΔE gradient",
          unit: "°C/J",
        },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: find the gradient and use it to calculate the specific heat capacity of water. Show your working.",
        scaffolds: [
          "gradient = ΔT / ΔE =",
          "c = 1 / (m × gradient) =",
          "m = 1 kg, so c =",
          "My value of c is approximately",
          "J/kg°C",
          "An anomalous point is at E =",
        ],
        placeholder:
          "Show the gradient calculation and rearrangement of E = mcΔT…",
        rubric: [
          {
            level: 2,
            descriptor: "Notes temperature increases with energy.",
            keywords: ["increase", "rise", "temperature", "heat", "energy"],
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
              "linear",
              "constant",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "Finds gradient; states c ≈ 4200 J/kg°C with correct units.",
            keywords: [
              "gradient",
              "4200",
              "j/kg",
              "c =",
              "specific heat",
              "calculation",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Triangle + algebraic rearrangement + 4200 J/kg°C + scatter noted.",
            keywords: [
              "triangle",
              "e = mcΔt",
              "rearrange",
              "4200",
              "1/(m",
              "gradient",
              "anomal",
              "scatter",
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
          body: "Level 1–2: \"The water got hotter as more energy was supplied.\"",
        },
        {
          level: 4,
          body: "Level 3–4: A conclusion that matches the trend, e.g. \"the temperature of the water increased steadily as more energy was supplied.\"",
        },
        {
          level: 6,
          body: "Level 5–6: References specific values, e.g. \"the specific heat capacity of water is approximately 4200 J/kg°C — close to the accepted value of 4180 J/kg°C.\"",
        },
        {
          level: 8,
          body: "Level 7–8: States c ≈ 4200 J/kg°C, compares to 4180 J/kg°C (percentage error ≈ 0.5%), explains what the high value means (water needs a lot of energy to heat up), and links to real-world applications such as climate regulation, cooling systems, or central heating.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion. Use specific values from the data and link to the science and real-world applications.",
        scaffolds: [
          "The data show that",
          "The specific heat capacity of water is approximately",
          "The accepted value is 4180 J/kg°C; my value differs by",
          "Water's high SHC means",
          "This is important in",
        ],
        placeholder: "State and justify your conclusion using the data…",
        rubric: [
          {
            level: 2,
            descriptor: "Basic statement that water got hotter.",
            keywords: ["hot", "temperature", "increase", "energy"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Conclusion matches the trend.",
            keywords: [
              "temperature",
              "increased",
              "steadily",
              "energy",
              "trend",
              "linear",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Quotes c ≈ 4200 J/kg°C; compares to accepted value.",
            keywords: [
              "4200",
              "4180",
              "j/kg",
              "accepted",
              "specific heat",
              "compare",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Percentage error; explains high SHC; links to real applications.",
            keywords: [
              "percentage",
              "error",
              "4180",
              "climate",
              "cooling",
              "high shc",
              "application",
              "heating",
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
          body: "Level 3–4: Names one weakness, e.g. \"some heat was lost to the surroundings.\"",
        },
        {
          level: 6,
          body: "Level 5–6: Identifies a relevant limitation (e.g. heat loss to surroundings or to the heater/beaker itself raises the measured energy and lowers the calculated c) and suggests a matching improvement.",
        },
        {
          level: 8,
          body: "Level 7–8: Evaluates validity and reliability — heat losses to surroundings (underestimates T rise), energy stored in the heater and beaker (overestimates E input), thermometer lag (readings taken too soon), only 8 data points. Proposes specific improvements: insulate the beaker, stir the water, wait for equilibrium before recording, use a data logger for continuous temperature recording, include mass of calorimeter in calculation.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method. What were its weaknesses, and how would you improve it?",
        scaffolds: [
          "A weakness was",
          "Heat was lost to",
          "This caused the calculated c to be",
          "To improve, I would",
          "Insulating the beaker would",
          "Stirring the water would",
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
              "heat loss",
              "surroundings",
              "lag",
              "heater",
              "beaker",
              "once",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Relevant limitation with effect and improvement.",
            keywords: [
              "heat loss",
              "insulate",
              "stir",
              "equilibrium",
              "reliable",
              "valid",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Multiple validity/reliability issues with specific, directed fixes.",
            keywords: [
              "insulate",
              "stir",
              "data logger",
              "equilibrium",
              "heater",
              "calorimeter",
              "lag",
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
