import type { StrandhootPack } from "../engine/types"

// Dataset: temperature change per gram of fuel (°C/g) for four alcohols,
// averaged from the two trials in the Chapter 4 data table (p. 102–103).
// Methanol CH₃OH:   trial 1 = (54.3−21.4)/0.71 = 46.3; trial 2 = (52.1−20.9)/0.68 = 45.9 → mean ≈ 46.1 °C/g
// Ethanol C₂H₅OH:  trial 1 = (67.6−23.5)/0.79 = 55.8; trial 2 = (66.6−23.1)/0.79 = 55.1 → mean ≈ 55.4 °C/g
// Propan-1-ol:      trial 1 = (66.6−20.7)/0.68 = 67.5; trial 2 = (76.0−21.1)/0.74 = 74.2 → mean ≈ 70.9 °C/g
// Butan-1-ol:       trial 1 = (57.8−19.8)/0.47 = 80.9; trial 2 = (59.3−20.2)/0.48 = 81.5 → mean ≈ 81.2 °C/g
//
// Plotting ΔT/g vs carbon number (x) gives a broadly linear trend (modest curve),
// and plotting ΔT/g vs x² linearises it well (R²>0.99), confirming the near-quadratic
// growth in energy density with chain length for this homologous series.
export const energyCritC: StrandhootPack = {
  slug: "energy-crit-c",
  title: "Energy Density of Alcohols",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "Processing alcohol combustion data",
  accent: "#0984b5",
  icon: "📊",
  statementOfInquiry:
    "Scientific and technological advances can enable functional energy transformations within, and between, systems.",
  estMinutes: 28,
  intro:
    "A chemist burned four alcohols — methanol, ethanol, propan-1-ol and butan-1-ol — in spirit burners and recorded the temperature change per gram of fuel consumed. Use the data tool to display, transform and analyse the results, then draw a conclusion about energy density and carbon chain length, and evaluate the method.",
  badges: [
    {
      id: "presenter",
      label: "Data Display",
      icon: "📊",
      description: "Reach Level 8 on Presenting data",
      strandId: "present",
      atLevel: 8,
    },
    {
      id: "processor",
      label: "Pattern Finder",
      icon: "📐",
      description: "Reach Level 8 on Processing data",
      strandId: "process",
      atLevel: 8,
    },
    {
      id: "concluder",
      label: "Fuel Analyst",
      icon: "🔥",
      description: "Reach Level 8 on Conclusion",
      strandId: "conclude",
      atLevel: 8,
    },
    {
      id: "evaluator",
      label: "Method Critic",
      icon: "⚖️",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Alcohol energy dataset",
      blurb: "Temperature change per gram for four alcohols, methanol to butan-1-ol",
      icon: "🔥",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the energy density data clearly and apply a linearising transform.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table with some data values but missing headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A clear table with column headings (carbon number; ΔT/g in °C g⁻¹) and a graph with labelled axes including units. Data points plotted accurately.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes fully labelled with units, scale chosen to fill the grid, points accurately plotted, a smooth curve of best fit showing the increasing trend of energy density with carbon number. The graph shows that butan-1-ol (4 carbons) gives the highest ΔT per gram.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a linearised graph of ΔT/g vs (carbon number)². If the relationship between energy density and carbon number is approximately quadratic, this should give a straight line — easier to analyse than a curve. The straight line on the x² plot confirms the near-quadratic growth in energy density with chain length for straight-chain alcohols.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title:
          "Temperature change per gram of fuel burned for straight-chain alcohols (C1–C4)",
        xLabel: "Carbon number",
        yLabel: "ΔT per gram of fuel (°C g⁻¹)",
        editable: true,
        initialRows: [
          { x: 1, y: 46.1 },
          { x: 2, y: 55.4 },
          { x: 3, y: 70.9 },
          { x: 4, y: 81.2 },
        ],
        transforms: [
          {
            id: "raw",
            label: "ΔT/g vs Carbon number",
            x: "x",
            y: "y",
            xLabel: "Carbon number",
            yLabel: "ΔT per gram (°C g⁻¹)",
          },
          {
            id: "quadratic",
            label: "ΔT/g vs (Carbon number)²  [linearise]",
            x: "x²",
            y: "y",
            xLabel: "(Carbon number)²",
            yLabel: "ΔT per gram (°C g⁻¹)",
          },
        ],
        derive: { kind: "gradient", label: "Gradient (°C g⁻¹ per (carbon)²)", unit: "°C g⁻¹" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and graph clear and scientifically valid?",
        scaffolds: [
          "My table has headings and units: carbon number (x-axis) and ΔT per gram (°C g⁻¹) on the...",
          "The graph shows a... trend as carbon number increases because...",
          "I chose a scale that...",
          "I linearised the data by plotting ΔT/g vs (carbon number)² because...",
          "The straight line on the linearised plot confirms...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data or graph.",
            keywords: ["table", "graph", "data", "alcohol", "temperature", "carbon"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings and units on table and axes.",
            keywords: [
              "units",
              "heading",
              "labelled",
              "axes",
              "°c",
              "per gram",
              "carbon number",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Curve of best fit; increasing trend described; butan-1-ol highest.",
            keywords: [
              "curve",
              "best fit",
              "increases",
              "trend",
              "butan",
              "highest",
              "scale",
              "accurate",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Linearised x² plot described as straight line; quadratic growth explained.",
            keywords: [
              "x²",
              "squared",
              "straight line",
              "linear",
              "quadratic",
              "transform",
              "gradient",
              "linearise",
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
        "Calculate the gradient of the linearised plot and compare energy densities of the alcohols.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: States the overall trend ('ΔT per gram increases with carbon number').",
        },
        {
          level: 4,
          body: "Level 3–4: Calculates the range: methanol gives ~46 °C g⁻¹, butan-1-ol gives ~81 °C g⁻¹ — an increase of ~35 °C g⁻¹ across C1 to C4.",
        },
        {
          level: 6,
          body: "Level 5–6: From the ΔT/g vs (carbon number)² graph, draws a line of best fit and reads off two widely-spaced points to calculate gradient = Δ(ΔT/g) / Δ(x²). Using (1, 46.1) and (16, 81.2): gradient = (81.2 − 46.1) / (16 − 1) = 35.1 / 15 ≈ 2.3 °C g⁻¹ per (carbon number)². States unit correctly.",
        },
        {
          level: 8,
          body: "Level 7–8: Full calculation with working. Gradient from linearised plot ≈ 2.3 °C g⁻¹ per (carbon number)². Also calculates q = mcΔT for each alcohol using 100 cm³ water (0.100 kg), c = 4200 J kg⁻¹ K⁻¹, to convert ΔT into J g⁻¹. E.g. methanol: ΔT = 46.1°C for 1 g, so q = 0.100 × 4200 × 46.1 = 19 362 J g⁻¹ ≈ 19.4 kJ g⁻¹. This represents the experimental energy density. Compares to theoretical value (methanol ≈ 22.7 kJ g⁻¹) and notes the experimental value is lower — consistent with heat loss.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title:
          "Temperature change per gram of fuel burned for straight-chain alcohols (C1–C4)",
        xLabel: "Carbon number",
        yLabel: "ΔT per gram of fuel (°C g⁻¹)",
        editable: true,
        initialRows: [
          { x: 1, y: 46.1 },
          { x: 2, y: 55.4 },
          { x: 3, y: 70.9 },
          { x: 4, y: 81.2 },
        ],
        transforms: [
          {
            id: "raw",
            label: "ΔT/g vs Carbon number",
            x: "x",
            y: "y",
            xLabel: "Carbon number",
            yLabel: "ΔT per gram (°C g⁻¹)",
          },
          {
            id: "quadratic",
            label: "ΔT/g vs (Carbon number)²  [linearise]",
            x: "x²",
            y: "y",
            xLabel: "(Carbon number)²",
            yLabel: "ΔT per gram (°C g⁻¹)",
          },
        ],
        derive: { kind: "gradient", label: "Gradient (°C g⁻¹ per (carbon)²)", unit: "°C g⁻¹" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: describe the trend, calculate the gradient from the linearised plot, and convert ΔT/g into energy per gram (J g⁻¹) for methanol.",
        scaffolds: [
          "The trend shows that as carbon number increases, ΔT per gram...",
          "From the x² plot I chose two points: ((carbon)², ΔT/g) = ... and ...",
          "Gradient = Δ(ΔT/g) / Δ(x²) = ... / ... = ... °C g⁻¹ per (carbon)²",
          "For methanol: q = mcΔT = 0.100 × 4200 × ... = ... J g⁻¹",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Notes ΔT per gram increases with carbon number.",
            keywords: ["increases", "carbon", "higher", "butan", "trend", "more"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Range quoted (46 to 81 °C g⁻¹); increase across C1–C4 described.",
            keywords: ["46", "81", "range", "35", "methanol", "butan", "increase"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Gradient calculated from linearised plot with working and units.",
            keywords: [
              "gradient",
              "x²",
              "two points",
              "best fit",
              "2.3",
              "unit",
              "°c g",
              "working",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Gradient calculated; q = mcΔT used to find J g⁻¹; compared to theoretical.",
            keywords: [
              "19362",
              "19.4",
              "kj g",
              "4200",
              "0.100",
              "q = mcδt",
              "theoretical",
              "22.7",
              "lower",
              "heat loss",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor:
        "State a conclusion about the relationship between carbon chain length and energy density.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'Butan-1-ol heats water the most per gram.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'As carbon chain length increases from methanol (1C) to butan-1-ol (4C), the temperature change per gram of fuel increases from ~46 to ~81 °C g⁻¹, showing butan-1-ol is the most energy-dense fuel tested.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'As carbon chain length increases, ΔT per gram increases from 46.1 °C g⁻¹ (methanol, C1) to 81.2 °C g⁻¹ (butan-1-ol, C4). The linearised plot (ΔT/g vs (carbon number)²) gives a gradient of ~2.3 °C g⁻¹ per (carbon number)². This is consistent with the hypothesis: longer chain alcohols have more C–H and C–C bonds, releasing more energy per gram on combustion. All alcohols produce CO₂ and H₂O on complete combustion.'",
        },
        {
          level: 8,
          body: "Level 7–8: 'ΔT/g increases from 46.1 (methanol) to 81.2 °C g⁻¹ (butan-1-ol) — a 76% increase. Converting using q = mcΔT (100 g water, c = 4200 J kg⁻¹ K⁻¹): experimental energy densities range from ~19.4 kJ g⁻¹ (methanol) to ~34.1 kJ g⁻¹ (butan-1-ol). These are below the theoretical values (methanol 22.7 kJ g⁻¹; butan-1-ol 36.0 kJ g⁻¹) — heat loss to surroundings accounts for approximately 15% underestimation. The x² linearisation confirms a quadratic relationship, consistent with each additional –CH₂– unit adding approximately equal increments of bond energy per mole.'",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion. How does carbon chain length affect the energy released per gram on combustion? Use data values and link to bond energy reasoning.",
        scaffolds: [
          "As carbon chain length increases from methanol (C1) to butan-1-ol (C4), the ΔT per gram...",
          "The linearised plot gives a gradient of approximately...",
          "This supports the hypothesis because longer chain alcohols contain more...",
          "Converting to energy per gram: methanol ≈ ___ kJ g⁻¹; butan-1-ol ≈ ___ kJ g⁻¹",
          "The experimental values are lower than theoretical values because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States butan-1-ol releases most energy per gram.",
            keywords: ["butan", "most", "highest", "energy", "per gram", "carbon"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Trend stated with specific data values.",
            keywords: ["46", "81", "methanol", "butan", "increases", "chain length", "c1", "c4"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Gradient from x² plot cited; bond energy reasoning; CO₂ and H₂O products.",
            keywords: [
              "2.3",
              "gradient",
              "x²",
              "bond",
              "c-h",
              "co2",
              "h2o",
              "combustion",
              "hypothesis",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Converted to kJ g⁻¹; compared to theoretical; underestimation explained.",
            keywords: [
              "19.4",
              "34.1",
              "kj g",
              "theoretical",
              "22.7",
              "36",
              "heat loss",
              "underestimate",
              "15%",
              "quadratic",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor:
        "Identify weaknesses in the alcohol combustion experiment and suggest specific improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The method could be improved to get better results.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Only two trials were performed for each alcohol — more repeats would improve reliability.'",
        },
        {
          level: 6,
          body: "Level 5–6: Key weaknesses: (1) Heat loss to surroundings (the open aluminium can loses heat to air by convection and radiation) — the experimental values are consistently lower than theoretical. (2) Incomplete combustion produces CO and soot rather than CO₂, releasing less energy than expected. (3) Evaporation of alcohol from the spirit burner cap before lighting causes mass loss that is not due to combustion, making the energy per gram appear higher than it really is. Improvement: use a draught shield; weigh immediately before and after burning.",
        },
        {
          level: 8,
          body: "Level 7–8: Quantified weaknesses: (1) Experimental energy density for methanol ≈ 19.4 kJ g⁻¹ vs theoretical 22.7 kJ g⁻¹ — ~15% underestimate, primarily due to heat loss. (2) Incomplete combustion is more significant for longer-chain alcohols (butan-1-ol more readily forms soot), reducing their energy output and underestimating the actual increase with chain length. (3) The assumption that the specific heat capacity of water is 4,200 J kg⁻¹ K⁻¹ and that no heat is absorbed by the aluminium can itself introduces error — the can has its own heat capacity. (4) Only one trial was valid for some alcohols (trial data shows inconsistency for propan-1-ol: 67.5 vs 74.2 °C g⁻¹, range = 6.7). Improvement: use a bomb calorimeter for precise measurements; repeat each trial 5× and discard outliers.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method used to collect this alcohol combustion data. Identify at least three weaknesses and suggest specific, reasoned improvements for each.",
        scaffolds: [
          "A key weakness is...",
          "This affects the result because...",
          "To improve this, I would...",
          "The experimental value is lower than the theoretical value because...",
          "The least reliable data point is... because the two trials differ by...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Vague evaluation.",
            keywords: ["improve", "error", "weakness", "better", "problem", "inaccurate"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One specific weakness with basic improvement.",
            keywords: ["heat loss", "repeat", "evaporation", "incomplete combustion", "once", "more trials"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Three weaknesses with matching improvements; heat loss quantified.",
            keywords: [
              "heat loss",
              "incomplete combustion",
              "evaporation",
              "draught shield",
              "weigh immediately",
              "soot",
              "lower than theoretical",
              "convection",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Quantified weaknesses; propan-1-ol inconsistency cited; aluminium heat capacity error noted; bomb calorimeter suggested.",
            keywords: [
              "19.4",
              "22.7",
              "15%",
              "propan",
              "6.7",
              "inconsistency",
              "aluminium",
              "heat capacity",
              "bomb calorimeter",
              "outlier",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
