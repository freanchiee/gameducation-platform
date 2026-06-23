import type { StrandhootPack } from "../engine/types"

// Crit C data: paper chromatography of metal ions — molar mass (g mol⁻¹) vs Rf value.
// Source: Chapter 7 data-based question (Horner, Oxford 2018, p.177) — 5 ions from table,
// plus 3 additional metal ions (Mn²⁺, Fe³⁺, Zn²⁺) with scientifically plausible Rf values
// on the same cellulose paper / acetone-HCl mobile phase system used for metal ion analysis.
// Linearising transform: √x (√molar mass) vs y (Rf) gives an approximately linear relationship,
// allowing gradient to be interpreted as ΔRf per unit √(g mol⁻¹).
export const functionCritC: StrandhootPack = {
  slug: "function-crit-c",
  title: "Metal Ion Chromatography — Rf vs Molar Mass",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "Paper chromatography Rf values & molar mass analysis",
  accent: "#0984b5",
  icon: "📈",
  statementOfInquiry:
    "The way in which matter functions is dependent on its properties and the relationship of the different systems within the environment.",
  estMinutes: 30,
  intro:
    "Chapter 7 includes a data-based question on paper chromatography of metal ions: Ni²⁺, Co²⁺, Cu²⁺, Cd²⁺ and Hg²⁺. Here the dataset is extended to 8 ions to explore whether molar mass predicts Rf value. Use the data tool to present, process, and then evaluate the method. Your written analysis levels up with the depth of scientific reasoning you apply.",
  badges: [
    {
      id: "presenter-c",
      label: "Data Display",
      icon: "📊",
      description: "Reach Level 8 on Presenting data",
      strandId: "present-c",
      atLevel: 8,
    },
    {
      id: "processor-c",
      label: "Gradient Finder",
      icon: "📐",
      description: "Reach Level 8 on Processing data",
      strandId: "process-c",
      atLevel: 8,
    },
    {
      id: "concluder-c",
      label: "Pattern Hunter",
      icon: "🔭",
      description: "Reach Level 8 on Conclusion",
      strandId: "conclude-c",
      atLevel: 8,
    },
    {
      id: "evaluator-c",
      label: "Method Critic",
      icon: "⚖️",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Chromatography dataset",
      blurb: "Molar mass vs Rf for eight metal ions",
      icon: "🔬",
    },
  ],
  strands: [
    {
      id: "present-c",
      name: "Presenting the data",
      descriptor:
        "Display the molar mass vs Rf data and apply a √(molar mass) linearising transform.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table of values with column headings but missing units. No graph plotted.",
        },
        {
          level: 4,
          body: "Level 3–4: A clear table with column headings (molar mass in g mol⁻¹; Rf, dimensionless) and a graph with both axes labelled including units. A line or curve of best fit is drawn.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, a sensible scale that fills the grid, and points accurately plotted. The raw Rf vs molar mass graph shows a steep rise at low molar masses that flattens — a curve, not a straight line. This non-linear shape means a linearising transform is needed before the gradient can be calculated meaningfully.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a linearised graph of Rf vs √(molar mass). If a straight line results, then Rf ∝ √(molar mass). The slope of this line (ΔRf / Δ√(Mr)) reveals by how much Rf increases per unit increase in √(molar mass), linking the physical property (molar mass) to the separation behaviour of the ion on the chromatography paper.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title:
          "Paper chromatography of metal ions: molar mass vs Rf value (Chapter 7, Horner 2018)",
        xLabel: "Molar mass (g mol⁻¹)",
        yLabel: "Rf (dimensionless)",
        editable: true,
        initialRows: [
          { x: 54.9, y: 0.05 },
          { x: 55.8, y: 0.06 },
          { x: 58.7, y: 0.08 },
          { x: 58.9, y: 0.35 },
          { x: 63.5, y: 0.60 },
          { x: 65.4, y: 0.65 },
          { x: 112.4, y: 0.78 },
          { x: 200.6, y: 0.95 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Rf vs Molar mass",
            x: "x",
            y: "y",
            xLabel: "Molar mass (g mol⁻¹)",
            yLabel: "Rf",
          },
          {
            id: "sqrtmass",
            label: "Rf vs √(molar mass)  [linearising transform]",
            x: "√x",
            y: "y",
            xLabel: "√(molar mass)  (g mol⁻¹)^0.5",
            yLabel: "Rf",
          },
        ],
        derive: { kind: "gradient", label: "ΔRf / Δ√(Mr)  ((g mol⁻¹)^−0.5)", unit: "(g mol⁻¹)^−0.5" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and graph scientifically valid? Why is a linearising transform applied?",
        scaffolds: [
          "My table includes headings and units for...",
          "I plotted Rf on the y-axis against molar mass on the x-axis...",
          "The graph shows a... trend because...",
          "I applied the √(molar mass) transform because...",
          "The linearised plot shows...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data or graph.",
            keywords: ["table", "graph", "data", "rf", "molar mass"],
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
              "g mol",
              "rf",
              "molar mass",
              "dimensionless",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Curve of best fit described; non-linear trend explained; need for transform stated.",
            keywords: [
              "curve",
              "best fit",
              "increases",
              "non-linear",
              "steep",
              "flattens",
              "transform",
              "linearise",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "√(molar mass) transform described as producing a straight line; gradient interpretation stated.",
            keywords: [
              "square root",
              "√",
              "straight line",
              "linear",
              "gradient",
              "slope",
              "transform",
              "proportional",
            ],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "process-c",
      name: "Processing the data",
      descriptor:
        "Calculate the gradient of the √(molar mass) vs Rf linearised plot and interpret its meaning.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Describes the overall trend: 'Rf gets larger as molar mass increases.'",
        },
        {
          level: 4,
          body: "Level 3–4: Notes that the increase is large and non-uniform: from Mn²⁺ (Mr = 54.9, Rf = 0.05) to Hg²⁺ (Mr = 200.6, Rf = 0.95), Rf increases by 0.90 across a large molar mass range. But the jump between Co²⁺ (Rf 0.35) and Cu²⁺ (Rf 0.60) is unexpectedly large for only a small difference in molar mass — suggesting other factors also affect Rf.",
        },
        {
          level: 6,
          body: "Level 5–6: From the Rf vs √(molar mass) linearised graph, draws a line of best fit and reads off two widely-spaced points to calculate gradient = ΔRf / Δ√(Mr). Using √54.9 ≈ 7.41 and √200.6 ≈ 14.16: gradient = (0.95 − 0.05) / (14.16 − 7.41) = 0.90 / 6.75 ≈ 0.133 (g mol⁻¹)^−0.5. States the unit of gradient correctly.",
        },
        {
          level: 8,
          body: "Level 7–8: Full calculation shown with two widely-spaced points. Gradient = ΔRf / Δ√(Mr) ≈ 0.133 (g mol⁻¹)^−0.5, interpreted as: for every increase of 1 (g mol⁻¹)^0.5 in √(molar mass), Rf increases by 0.133. The line does not pass through the origin (y-intercept ≈ −0.94), suggesting that lighter ions have an intrinsically low Rf that is not explained by molar mass alone — ionic charge, charge density, and hydration shell also affect mobility in the stationary phase. The anomalously large Rf gap between Co²⁺ and Cu²⁺ (similar Mr but very different Rf) supports this conclusion.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title:
          "Paper chromatography of metal ions: molar mass vs Rf value (Chapter 7, Horner 2018)",
        xLabel: "Molar mass (g mol⁻¹)",
        yLabel: "Rf (dimensionless)",
        editable: true,
        initialRows: [
          { x: 54.9, y: 0.05 },
          { x: 55.8, y: 0.06 },
          { x: 58.7, y: 0.08 },
          { x: 58.9, y: 0.35 },
          { x: 63.5, y: 0.60 },
          { x: 65.4, y: 0.65 },
          { x: 112.4, y: 0.78 },
          { x: 200.6, y: 0.95 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Rf vs Molar mass",
            x: "x",
            y: "y",
            xLabel: "Molar mass (g mol⁻¹)",
            yLabel: "Rf",
          },
          {
            id: "sqrtmass",
            label: "Rf vs √(molar mass)  [linearising transform]",
            x: "√x",
            y: "y",
            xLabel: "√(molar mass)  (g mol⁻¹)^0.5",
            yLabel: "Rf",
          },
        ],
        derive: { kind: "gradient", label: "ΔRf / Δ√(Mr)  ((g mol⁻¹)^−0.5)", unit: "(g mol⁻¹)^−0.5" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: calculate the gradient of the Rf vs √(molar mass) graph. What does the gradient mean? Are there any anomalous values?",
        scaffolds: [
          "The overall trend shows that as molar mass increases, Rf...",
          "From the linearised plot I chose two widely-spaced points: (√Mr₁, Rf₁) = ... and (√Mr₂, Rf₂) = ...",
          "Gradient = ΔRf / Δ√(Mr) = ... / ... = ...",
          "This means that for every increase of 1 unit in √(molar mass), Rf increases by...",
          "An anomalous pair is... because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States that Rf increases with molar mass.",
            keywords: ["increases", "molar mass", "rf", "larger", "trend"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Range of Rf values noted; non-uniform increase described.",
            keywords: [
              "0.05",
              "0.95",
              "range",
              "non-linear",
              "large jump",
              "cobalt",
              "copper",
              "anomalous",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Gradient calculated from linearised plot with working shown.",
            keywords: [
              "gradient",
              "√",
              "square root",
              "two points",
              "best fit",
              "delta",
              "0.133",
              "unit",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Full gradient calculation; y-intercept noted; anomaly between Co and Cu explained with charge density / hydration.",
            keywords: [
              "0.133",
              "gradient",
              "intercept",
              "origin",
              "charge density",
              "hydration",
              "ionic",
              "cobalt",
              "copper",
              "anomalous",
              "calculation",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "conclude-c",
      name: "Conclusion",
      descriptor:
        "State a conclusion about the relationship between molar mass and Rf. Link to chromatography theory.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'Rf increases as molar mass increases.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Rf increased from 0.05 to 0.95 as molar mass rose from 54.9 to 200.6 g mol⁻¹. This shows that heavier metal ions travel further through the chromatography paper in the same solvent.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'As molar mass increased, Rf increased — but not linearly. The √(molar mass) transform gave a more linear relationship (gradient ≈ 0.133 (g mol⁻¹)^−0.5). Heavier ions are less strongly adsorbed to the stationary phase (cellulose paper) and spend more time in the mobile phase, travelling further. However, the anomalous gap between Co²⁺ (Mr 58.9, Rf 0.35) and Cu²⁺ (Mr 63.5, Rf 0.60) suggests molar mass alone does not fully explain Rf — other factors must be at work.'",
        },
        {
          level: 8,
          body: "Level 7–8: The √(molar mass) linearisation improves the fit, suggesting a partial √(Mr) dependence, but R² is not 1 — the relationship is not perfectly described by molar mass alone. Ions interact with the stationary phase via charge density: smaller, more highly charged ions (like Ni²⁺ and Mn²⁺) have high charge density and are more strongly attracted to the polar cellulose paper (low Rf). Larger ions like Hg²⁺ have low charge density, weaker adsorption, and high Rf. The Co²⁺/Cu²⁺ anomaly (large Rf jump for small ΔMr) likely reflects differences in d-orbital interaction with the cellulose surface — a factor the simple √(Mr) model cannot capture. Conclusion: molar mass is a useful but incomplete predictor of Rf.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion about the relationship between molar mass and Rf. Use specific data values and link to the theory of how ions interact with the stationary and mobile phases.",
        scaffolds: [
          "As molar mass increased from ___ to ___ g mol⁻¹, Rf...",
          "The √(molar mass) transform gave a gradient of approximately...",
          "This supports / does not fully support the idea that Rf ∝ √(molar mass) because...",
          "The anomalous Co²⁺/Cu²⁺ data point suggests...",
          "Overall, molar mass is... predictor of Rf because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States Rf increases with molar mass.",
            keywords: ["increases", "molar mass", "rf", "trend"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Specific data values cited; heavier ions travel further.",
            keywords: ["0.05", "0.95", "54.9", "200.6", "heavier", "further", "stationary", "mobile"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Gradient cited; √Mr transform discussed; anomaly between Co and Cu noted.",
            keywords: [
              "0.133",
              "gradient",
              "square root",
              "anomalous",
              "cobalt",
              "copper",
              "adsorbed",
              "stationary phase",
              "mobile phase",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Incomplete model discussed; charge density and d-orbital factors cited; conclusion calibrated.",
            keywords: [
              "charge density",
              "incomplete",
              "model",
              "d-orbital",
              "adsorption",
              "cobalt",
              "copper",
              "predictor",
              "√mr",
              "partial",
              "cellulose",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "evaluate-c",
      name: "Evaluating the method",
      descriptor:
        "Identify weaknesses in the chromatography experiment and suggest specific, reasoned improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The experiment could be improved by repeating it.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Only one trial was done for each ion. This reduces reliability. The solvent level must not be above the baseline or the spots will dissolve before separation.'",
        },
        {
          level: 6,
          body: "Level 5–6: Key limitations: (1) Only one trial per ion — repeat 3 times and average Rf to improve reliability. (2) Measurement of distances: the spots may be diffuse rather than a sharp point — measure to the centre of the spot for consistent Rf. (3) The solvent front must be marked immediately when the paper is removed before it evaporates. (4) Only 5 ions in the original data — a wider range (10+ ions) would better test whether √(Mr) linearity holds. An improvement: use two-dimensional chromatography (turn paper 90° and run with a second solvent) to improve separation of ions with similar Rf.",
        },
        {
          level: 8,
          body: "Level 7–8: Multiple specific weaknesses with reasoned improvements: (1) Spot size and diffuseness introduce systematic uncertainty in distance measurement — use a scanner to digitalise the paper and measure distances to ±0.1 mm instead of a ruler. (2) Solvent composition matters: water alone is a poor mobile phase for metal ions; using a multi-component solvent (acetone/HCl/water) would give cleaner separation. The Chapter 7 experiment uses distilled water as mobile phase for food colorings — the metal ion dataset may use a different mobile phase, making cross-comparison of Rf values invalid without specifying the exact solvent. (3) Temperature and humidity affect solvent evaporation rate, changing Rf — should be performed in a temperature-controlled environment. (4) Only 8 data points across a narrow molar mass range (54.9–200.6): adding data for lighter and heavier metal ions would test whether the √(Mr) trend extends beyond this range.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method used to collect this chromatography data. What are the main weaknesses and how would you improve them?",
        scaffolds: [
          "A key weakness is...",
          "This affects the result because...",
          "To improve this, I would...",
          "The reliability could be improved by...",
          "A systematic error is...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Vague evaluation.",
            keywords: ["improve", "better", "error", "weakness", "repeat"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One specific weakness with a matching improvement.",
            keywords: ["repeat", "spot", "solvent level", "baseline", "ruler", "distance"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Multiple specific weaknesses with improvements and reasons.",
            keywords: [
              "diffuse",
              "centre",
              "solvent front",
              "mark",
              "evaporate",
              "three times",
              "reliability",
              "uncertainty",
              "temperature",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Systematic error identified; solvent composition discussed; temperature and humidity addressed; data range critique.",
            keywords: [
              "systematic",
              "solvent composition",
              "acetone",
              "hcl",
              "temperature",
              "humidity",
              "range",
              "scanner",
              "0.1 mm",
              "cross-comparison",
              "mobile phase",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
