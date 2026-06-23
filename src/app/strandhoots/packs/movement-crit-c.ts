import type { StrandhootPack } from "../engine/types"

// Crit C data: voltages measured for different metal electrode pairs in a voltaic cell.
// The x-axis is the difference in electrochemical series position (arbitrary rank units,
// 1 = adjacent, 4 = furthest apart) and the y-axis is measured cell voltage (V).
// The dataset is taken from the Chapter 10 summative investigation design using Cu, Pb,
// Zn and Mg electrodes (p. 273). Voltage increases with electrochemical series separation.
// A linearising transform 1/x vs 1/y does not apply here; the raw data IS linear.
// The sqrt(x) vs y transform tests whether a non-linear model fits better.
export const movementCritC: StrandhootPack = {
  slug: "movement-crit-c",
  title: "Voltaic Cell Voltage vs Electrode Separation",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "Electrochemical series & cell voltage",
  accent: "#0984b5",
  icon: "📈",
  statementOfInquiry:
    "The changes we observe in a chemical system can help us to infer information about the movement of molecules and their properties.",
  estMinutes: 30,
  intro:
    "A student measured the voltage produced by eight different metal electrode pairs in a voltaic cell and recorded the electrochemical series separation for each pair. Use the data tool to plot, transform and analyse — then draw a conclusion about the relationship between series separation and cell voltage, and evaluate the experimental method.",
  badges: [
    {
      id: "data-display",
      label: "Data Display",
      icon: "📊",
      description: "Reach Level 8 on Presenting data",
      strandId: "present",
      atLevel: 8,
    },
    {
      id: "gradient-finder",
      label: "Gradient Finder",
      icon: "📐",
      description: "Reach Level 8 on Processing data",
      strandId: "process",
      atLevel: 8,
    },
    {
      id: "concluder",
      label: "Cell Analyst",
      icon: "🔋",
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
      label: "Voltaic cell dataset",
      blurb: "Cell voltage vs electrochemical series separation for metal electrode pairs",
      icon: "⚡",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the cell voltage vs electrode separation data clearly with a graph and line of best fit.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table with data values but missing headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A clear table with column headings (electrochemical series separation in rank units; cell voltage in V) and a graph with both axes labelled including units.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, a sensible scale that fills the grid, points accurately plotted with a straight line of best fit drawn through the majority of points, showing the approximately linear increase of voltage with series separation.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a linearised analysis: since the raw data appears approximately linear, the x vs y transform should give a straight line with a positive gradient (mV per rank unit). Alternatively, test a √x vs y transform — if the √x transform gives a straighter line, it suggests a square-root relationship. The choice of best-fit model should be justified with reference to R² or visual inspection.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Cell voltage for different metal electrode pairs in a voltaic cell",
        xLabel: "Electrochemical series separation (rank units)",
        yLabel: "Cell voltage (V)",
        editable: true,
        initialRows: [
          { x: 1, y: 0.32 },
          { x: 1, y: 0.28 },
          { x: 2, y: 0.65 },
          { x: 2, y: 0.71 },
          { x: 3, y: 1.02 },
          { x: 3, y: 0.98 },
          { x: 4, y: 1.44 },
          { x: 4, y: 1.51 },
          { x: 5, y: 1.78 },
        ],
        transforms: [
          { id: "raw", label: "Voltage vs Series Separation", x: "x", y: "y", xLabel: "Series separation (rank units)", yLabel: "Cell voltage (V)" },
          { id: "sqrt", label: "Voltage vs √(Series Separation)", x: "√x", y: "y", xLabel: "√(Series separation)", yLabel: "Cell voltage (V)" },
        ],
        derive: { kind: "gradient", label: "Gradient (V per rank unit)", unit: "V rank⁻¹" },
      },
      response: {
        kind: "data",
        prompt: "Describe how you have presented the data. What makes your table and graph clear and scientifically valid?",
        scaffolds: [
          "My table includes headings and units for...",
          "I plotted cell voltage on the y-axis against...",
          "The graph shows a... trend because...",
          "I drew a line of best fit that...",
          "I tested the √x transform to check whether...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data or graph.",
            keywords: ["table", "graph", "data", "voltage", "electrode"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings and units on table and axes.",
            keywords: ["units", "heading", "labelled", "axes", "volts", "rank", "separation", "voltage"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Line of best fit drawn; linear trend described; axes fill the grid.",
            keywords: ["line of best fit", "linear", "increases", "positive", "trend", "scale", "accurate", "straight"],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Transform tested and model choice justified; R² or visual comparison discussed.",
            keywords: ["√x", "square root", "transform", "straight line", "r²", "model", "justified", "linear", "gradient", "best fit"],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor: "Calculate the gradient of the voltage vs separation graph and identify the trend.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Describes the overall trend ('cell voltage increases as electrode separation increases').",
        },
        {
          level: 4,
          body: "Level 3–4: Notes the range of voltages (from ~0.30 V for adjacent metals to ~1.78 V for the most separated pair) and calculates the total increase across the full range.",
        },
        {
          level: 6,
          body: "Level 5–6: From the graph, draws a line of best fit and reads off two widely-spaced points to calculate gradient = ΔV / Δ(separation). States the unit of gradient as V per rank unit. Identifies which electrode pairs would be expected to produce the highest and lowest voltages.",
        },
        {
          level: 8,
          body: "Level 7–8: Full gradient calculation shown — using two well-separated points from the best-fit line, e.g. (1, 0.30) and (5, 1.78): gradient = (1.78 − 0.30) / (5 − 1) = 1.48 / 4 = 0.37 V per rank unit. States the physical meaning: each step further apart in the electrochemical series adds approximately 0.37 V to the cell voltage. Notes that the gradient matches the trend expected from standard electrode potential differences (~0.3–0.4 V per series step for common metals).",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Cell voltage for different metal electrode pairs in a voltaic cell",
        xLabel: "Electrochemical series separation (rank units)",
        yLabel: "Cell voltage (V)",
        editable: true,
        initialRows: [
          { x: 1, y: 0.32 },
          { x: 1, y: 0.28 },
          { x: 2, y: 0.65 },
          { x: 2, y: 0.71 },
          { x: 3, y: 1.02 },
          { x: 3, y: 0.98 },
          { x: 4, y: 1.44 },
          { x: 4, y: 1.51 },
          { x: 5, y: 1.78 },
        ],
        transforms: [
          { id: "raw", label: "Voltage vs Series Separation", x: "x", y: "y", xLabel: "Series separation (rank units)", yLabel: "Cell voltage (V)" },
          { id: "sqrt", label: "Voltage vs √(Series Separation)", x: "√x", y: "y", xLabel: "√(Series separation)", yLabel: "Cell voltage (V)" },
        ],
        derive: { kind: "gradient", label: "Gradient (V per rank unit)", unit: "V rank⁻¹" },
      },
      response: {
        kind: "data",
        prompt: "Process the data: calculate the gradient of the voltage vs separation graph and state what it means physically.",
        scaffolds: [
          "The trend shows that as separation increases, voltage...",
          "The voltage range across all electrode pairs is from ___ V to ___ V",
          "Gradient = ΔV / Δ(separation) = ___ / ___ = ___ V per rank unit",
          "This means that each step further apart in the electrochemical series adds approximately ___ V",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Notes voltage increases with separation.",
            keywords: ["increases", "higher", "voltage", "separation", "trend", "larger"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Range of voltage noted; overall increase quantified.",
            keywords: ["range", "0.3", "1.78", "increase", "0.28", "from", "to"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Gradient calculated from graph with working and units stated.",
            keywords: ["gradient", "delta v", "rank", "unit", "two points", "best fit", "v per", "slope"],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Full gradient calculation with values; physical meaning stated; consistent with electrode potentials.",
            keywords: ["0.37", "1.48", "4", "rank unit", "0.3", "0.4", "electrode potential", "physical meaning", "step", "gradient"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor: "State a conclusion about the relationship between electrochemical series separation and cell voltage.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The voltage increased as the separation between metals increased.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'As the separation between the two metals in the electrochemical series increased, the cell voltage increased approximately linearly. The highest voltage was produced by the electrode pair furthest apart in the series.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'The data shows a positive linear relationship between electrochemical series separation and cell voltage. The gradient of approximately 0.37 V per rank unit indicates each step further apart in the series adds ~0.37 V. This is consistent with the electrochemical series — the greater the difference in the tendency to lose electrons between the two metals, the greater the driving force for electron transfer through the external circuit, and therefore the higher the measured voltage.'",
        },
        {
          level: 8,
          body: "Level 7–8: 'The voltage increases approximately linearly with electrochemical series separation (gradient ≈ 0.37 V rank⁻¹, R² close to 1). This is consistent with standard electrode potential theory: cell voltage ≈ E°cathode − E°anode, and each rank step corresponds to roughly 0.3–0.4 V in standard electrode potential difference for common metals (Cu, Zn, Fe, Pb, Mg). The linearity supports the hypothesis. However, absolute values are lower than standard electrode potentials (e.g. Zn–Cu: predicted ~1.10 V from E° data; measured ~0.65–0.71 V), suggesting non-standard conditions (ion concentration may deviate from 1.0 mol dm⁻³ during the reaction) and internal resistance reduce the measured voltage.'",
        },
      ],
      response: {
        kind: "data",
        prompt: "Write a conclusion. How does electrochemical series separation affect cell voltage? Use specific values from the data and link to the theory of electron transfer.",
        scaffolds: [
          "As the separation between metals in the electrochemical series increases, the voltage...",
          "The gradient of ___ V per rank unit shows that...",
          "This is consistent with electrochemical theory because...",
          "The measured values are [higher/lower] than expected from standard electrode potentials because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States voltage increases with separation.",
            keywords: ["increases", "voltage", "separation", "higher", "greater"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Linear relationship stated; highest/lowest pairs identified.",
            keywords: ["linear", "positive", "highest", "lowest", "furthest", "pair", "relationship"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Gradient used in conclusion; driving force for electron transfer explained.",
            keywords: ["0.37", "gradient", "rank unit", "electron transfer", "driving force", "tendency", "lose electrons", "series"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Standard electrode potential comparison; non-standard conditions explained; quantitative.",
            keywords: ["standard electrode potential", "1.10", "0.65", "internal resistance", "non-standard", "e°", "cathode", "anode", "r²", "linear"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor: "Identify weaknesses in the voltaic cell experiment and suggest specific improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The method could be improved.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Only two trials were done for some electrode pairs, which reduces reliability. The results could also be affected by contamination of the electrodes.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'A key limitation is that the electrode surface may have an oxide layer that increases resistance — sandpaper was used but may not fully remove all oxide. Also, the salt bridge resistance changes over time as ions are depleted. Improvement: use a fresh salt bridge for each trial; clean electrodes more thoroughly with dilute acid before use, then rinse with distilled water.'",
        },
        {
          level: 8,
          body: "Level 7–8: Multiple specific weaknesses: (1) Electrode surface oxidation — increases contact resistance, reducing measured voltage below the true E° difference. (2) Ion concentration changes — as the reaction proceeds, [Zn²⁺] increases and [Cu²⁺] decreases, shifting away from standard conditions (1.0 mol dm⁻³) and changing the equilibrium voltage. (3) Salt bridge degradation — KNO₃ ions are depleted over time, reducing ionic conductivity. (4) Irregular electrode surface area — affects current density and therefore voltage drop. Each weakness linked to a specific, reasoned improvement, e.g. 'Use a high-impedance voltmeter to minimise current draw and keep concentrations near 1.0 mol dm⁻³ throughout.'",
        },
      ],
      response: {
        kind: "data",
        prompt: "Evaluate the method used to collect this cell voltage data. What are the main weaknesses and how would you improve them?",
        scaffolds: [
          "A key weakness is...",
          "This affects the result because...",
          "To improve this, I would...",
          "The salt bridge could be improved by...",
          "Reliability could be improved by...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Vague evaluation.",
            keywords: ["improve", "better", "error", "weakness", "problem"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One specific weakness mentioned.",
            keywords: ["oxide", "contamination", "reliability", "repeat", "trial", "electrode", "resistance"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Relevant limitation with matching improvement.",
            keywords: ["oxide layer", "salt bridge", "sandpaper", "fresh", "dilute acid", "rinse", "resistance", "improve", "repeat"],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Multiple specific weaknesses with reasoned improvements; concentration changes and current draw discussed.",
            keywords: ["concentration", "cu²⁺", "zn²⁺", "standard conditions", "salt bridge degradation", "surface area", "high-impedance", "current draw", "1.0 mol", "e°"],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
