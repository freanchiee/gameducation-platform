import type { StrandhootPack } from "../engine/types"

// Dataset: First ionisation energies (kJ mol⁻¹) for period 3 elements (Na → Ar)
// Directly from the chapter's summative assessment data table (p. 298).
// Atomic number as x, IE₁ in kJ mol⁻¹ as y.
// The general increase across a period is slightly non-linear, but the
// 1/x transform (x = atomic number, y = IE₁) does NOT linearise well here.
// Instead we use the raw data and ask students to describe the trend,
// process relative increases, and identify the two dips (Al, S).
// A transform using √x vs y is provided as it partly linearises the trend.
export const patternsCritC: StrandhootPack = {
  slug: "patterns-crit-c",
  title: "First Ionisation Energy Across Period 3",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "First ionisation energy & periodic trends",
  accent: "#0984b5",
  icon: "📊",
  statementOfInquiry:
    "Chemists look for patterns in the periodic table in order to discover relationships and trends that help them to predict physical and chemical properties.",
  estMinutes: 30,
  intro:
    "The chapter gives the first ionisation energies (IE₁) of the first 20 elements. Use the data for period 3 (Na → Ar) to plot, process and analyse the trend — then draw a conclusion about effective nuclear charge and evaluate the method. Eight rows of real chapter data.",
  badges: [
    { id: "presenter", label: "Data Display", icon: "📊", description: "Reach Level 8 on Presenting data", strandId: "present", atLevel: 8 },
    { id: "processor", label: "Trend Analyst", icon: "📐", description: "Reach Level 8 on Processing data", strandId: "process", atLevel: 8 },
    { id: "concluder", label: "Nuclear Chemist", icon: "⚛️", description: "Reach Level 8 on Conclusion", strandId: "conclude", atLevel: 8 },
    { id: "evaluator", label: "Method Critic", icon: "⚖️", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Period 3 IE₁ dataset", blurb: "First ionisation energies of Na → Ar from the chapter data table", icon: "⚛️" }],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the period 3 first ionisation energy data clearly, with labelled axes and correct units.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table with some values but missing column headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A table with clear headings ('Element', 'Atomic number Z', 'IE₁ / kJ mol⁻¹') and a bar or line graph with both axes labelled including units.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, sensible scale filling the grid, points accurately plotted, a line connecting the points (trend line) — not a smooth curve because the data are for discrete elements. The graph clearly shows the general increase from Na (496) to Ar (1520) with two visible dips at Al (578) and S (1000).",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus: a second transformed plot of IE₁ vs √Z (square root of atomic number) to partially linearise the relationship. The elements Al and S are annotated as anomalous points with brief explanations. The table includes an extra column for √Z values to support the transform.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "First ionisation energies of period 3 elements (Na to Ar)",
        xLabel: "Atomic number (Z)",
        yLabel: "First ionisation energy (kJ mol⁻¹)",
        editable: true,
        initialRows: [
          { x: 11, y: 496 },
          { x: 12, y: 738 },
          { x: 13, y: 578 },
          { x: 14, y: 786 },
          { x: 15, y: 1012 },
          { x: 16, y: 1000 },
          { x: 17, y: 1251 },
          { x: 18, y: 1520 },
        ],
        transforms: [
          { id: "raw", label: "IE₁ vs Atomic number", x: "x", y: "y", xLabel: "Atomic number (Z)", yLabel: "IE₁ (kJ mol⁻¹)" },
          { id: "sqrtZ", label: "IE₁ vs √Z  [linearising transform]", x: "√x", y: "y", xLabel: "√Z", yLabel: "IE₁ (kJ mol⁻¹)" },
        ],
        derive: { kind: "gradient", label: "ΔIE₁/Δ(√Z)  (kJ mol⁻¹ per √unit)", unit: "kJ mol⁻¹" },
      },
      response: {
        kind: "data",
        prompt: "Describe how you have presented the period 3 IE₁ data. What makes your table and graph clear and scientifically valid?",
        scaffolds: [
          "My table includes columns for...",
          "I plotted first ionisation energy on the y-axis against...",
          "The graph shows a general... trend...",
          "Two anomalous points are visible at...",
          "I linearised the data by plotting IE₁ vs √Z because...",
        ],
        rubric: [
          { level: 2, descriptor: "Mentions the table or graph with some data.", keywords: ["table", "graph", "data", "ionisation", "element", "period"], minKeywords: 1 },
          { level: 4, descriptor: "Headings and units on table and axes; scale specified.", keywords: ["units", "kj mol", "heading", "axes", "labelled", "atomic number", "scale"], minKeywords: 2 },
          { level: 6, descriptor: "Accurate points; dips at Al and S annotated; general increase described.", keywords: ["al", "aluminium", "s", "sulfur", "dip", "anomalous", "general increase", "496", "1520", "accurate"], minKeywords: 2 },
          { level: 8, descriptor: "Transformed √Z plot described; extra column in table.", keywords: ["sqrt", "square root", "transform", "linear", "√z", "extra column", "annotated", "anomalous", "partially"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor: "Calculate the overall increase in IE₁ across period 3 and identify and explain the two anomalous dips.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Notes that IE₁ increases from Na to Ar in a general pattern.",
        },
        {
          level: 4,
          body: "Level 3–4: Calculates the overall increase: IE₁ increases from 496 kJ mol⁻¹ (Na) to 1520 kJ mol⁻¹ (Ar) — an increase of 1024 kJ mol⁻¹, a factor of about ×3. Notes that two elements (Al and S) do not fit the general trend.",
        },
        {
          level: 6,
          body: "Level 5–6: Quantifies both dips. Al (578) is 160 kJ mol⁻¹ lower than Mg (738) — Al has a single 3p¹ electron in a higher-energy sublevel than Mg's 3s². S (1000) is 12 kJ mol⁻¹ lower than P (1012) — in S, one 3p orbital has a paired electron that experiences extra repulsion and is slightly easier to remove. Both dips are consistent with quantum mechanical subshell structure.",
        },
        {
          level: 8,
          body: "Level 7–8: Full trend analysis using percentage increases between consecutive elements. Average increase per element (ignoring dips): approximately (1520 − 496) / 7 ≈ 146 kJ mol⁻¹. From the √Z linearised plot, the gradient = ΔIE₁/Δ(√Z) ≈ 982 kJ mol⁻¹. The two dips at Al and S are now visible as points that lie below the linear trend line — they are outliers explained by subshell structure (3p > 3s energy; paired-electron repulsion). These dips are replicated in every period, providing powerful evidence for the subshell model of the atom.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "First ionisation energies of period 3 elements (Na to Ar)",
        xLabel: "Atomic number (Z)",
        yLabel: "First ionisation energy (kJ mol⁻¹)",
        editable: true,
        initialRows: [
          { x: 11, y: 496 },
          { x: 12, y: 738 },
          { x: 13, y: 578 },
          { x: 14, y: 786 },
          { x: 15, y: 1012 },
          { x: 16, y: 1000 },
          { x: 17, y: 1251 },
          { x: 18, y: 1520 },
        ],
        transforms: [
          { id: "raw", label: "IE₁ vs Atomic number", x: "x", y: "y", xLabel: "Atomic number (Z)", yLabel: "IE₁ (kJ mol⁻¹)" },
          { id: "sqrtZ", label: "IE₁ vs √Z  [linearising transform]", x: "√x", y: "y", xLabel: "√Z", yLabel: "IE₁ (kJ mol⁻¹)" },
        ],
        derive: { kind: "gradient", label: "ΔIE₁/Δ(√Z)  (kJ mol⁻¹ per √unit)", unit: "kJ mol⁻¹" },
      },
      response: {
        kind: "data",
        prompt: "Process the data: calculate the overall increase in IE₁ across period 3 and explain both anomalous dips (at Al and S) using subshell structure.",
        scaffolds: [
          "The overall increase in IE₁ from Na to Ar is...",
          "Two anomalies occur: at Al (Z = 13) because...",
          "At S (Z = 16) because...",
          "From the √Z plot, the gradient is approximately...",
          "This supports the subshell model because...",
        ],
        rubric: [
          { level: 2, descriptor: "Notes IE₁ increases from Na to Ar.", keywords: ["increases", "general", "sodium", "argon", "trend", "na", "ar"], minKeywords: 1 },
          { level: 4, descriptor: "Overall increase calculated (≈1024 kJ mol⁻¹); two dips noted.", keywords: ["496", "1520", "1024", "increase", "factor", "aluminium", "sulfur", "dip", "anomaly"], minKeywords: 2 },
          { level: 6, descriptor: "Both dips quantified and explained with subshell reasoning.", keywords: ["3p", "3s", "sublevel", "higher energy", "paired", "repulsion", "578", "738", "1000", "1012", "160", "subshell"], minKeywords: 3 },
          { level: 8, descriptor: "Gradient from √Z plot calculated; subshell model confirmed.", keywords: ["gradient", "sqrt", "linear", "982", "average", "146", "outlier", "trend line", "subshell model", "replicated", "evidence"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor: "State a conclusion linking the IE₁ trend to effective nuclear charge and shielding.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'First ionisation energy increases across period 3.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'IE₁ generally increases from Na (496 kJ mol⁻¹) to Ar (1520 kJ mol⁻¹) across period 3, consistent with the hypothesis that increasing nuclear charge makes electrons harder to remove.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'IE₁ increases from 496 (Na) to 1520 kJ mol⁻¹ (Ar) across period 3. This is because shielding remains approximately constant across a period (same number of inner shells) while the nuclear charge increases from +11 to +18. The increasing effective nuclear charge holds the valence electrons more tightly. Two dips (Al and S) confirm the subshell model: the 3p sublevel is higher in energy than 3s, and a paired electron in 3p is destabilised by repulsion.'",
        },
        {
          level: 8,
          body: "Level 7–8: Full quantitative conclusion: IE₁ increases ×3.1 from Na to Ar. The gradient from the √Z linearised plot (≈982 kJ mol⁻¹) confirms a near-linear relationship between IE₁ and √Z, consistent with the quantum mechanical model. The two dips at Al and S are explained precisely: Al's 3p¹ electron is in a higher-energy, more-diffuse orbital than Mg's 3s², losing the 3p¹ electron requires less energy. S's paired 3p electron experiences electron-electron repulsion, making it easier to remove than in P. These two dips, reproduced in every period of the table, provide compelling evidence for the s/p subshell model of electron configuration.",
        },
      ],
      response: {
        kind: "data",
        prompt: "Write a conclusion. What does the period 3 IE₁ data tell us about effective nuclear charge and shielding? Use specific values and explain the two dips.",
        scaffolds: [
          "The IE₁ increases from ___ (Na) to ___ kJ mol⁻¹ (Ar) across period 3...",
          "This trend shows that effective nuclear charge...",
          "The dip at aluminium (Z = 13) is explained by...",
          "The dip at sulfur (Z = 16) is explained by...",
          "Overall, the data confirm / do not confirm the hypothesis because...",
        ],
        rubric: [
          { level: 2, descriptor: "States IE₁ increases across period 3.", keywords: ["increases", "period 3", "sodium", "argon", "general"], minKeywords: 1 },
          { level: 4, descriptor: "IE₁ trend linked to nuclear charge; specific values used.", keywords: ["496", "1520", "nuclear charge", "increases", "hold", "electrons", "harder to remove"], minKeywords: 2 },
          { level: 6, descriptor: "Shielding constant across period stated; both dips explained with subshell.", keywords: ["shielding", "constant", "effective nuclear charge", "3p", "3s", "paired", "repulsion", "aluminium", "sulfur", "subshell"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative; gradient cited; dips linked to specific orbital arguments.", keywords: ["3.1", "×3", "gradient", "sqrt", "982", "linear", "paired", "repulsion", "higher energy", "3p orbital", "replicated", "evidence"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor: "Evaluate the approach of using published IE₁ data and suggest improvements or extensions.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The data seem reliable because they come from a textbook.' — Vague; no specific weakness identified.",
        },
        {
          level: 4,
          body: "Level 3–4: 'Only one value is given per element — there are no repeats to check reliability. Also, using textbook data means we cannot evaluate the original experimental method.'",
        },
        {
          level: 6,
          body: "Level 5–6: Key limitations: (1) Secondary data — we cannot assess how well equilibrium was established in the original measurements, or what the uncertainty was. (2) Rounding — the values appear rounded to the nearest kJ mol⁻¹, masking true precision. (3) Only 8 elements — extending to the whole periodic table (all 20 elements) would make the evidence for the trend more compelling. Improvement: include He, Li → Ne and K, Ca in the same analysis to check the pattern repeats in periods 1, 2 and 4.",
        },
        {
          level: 8,
          body: "Level 7–8: Specific weaknesses with impact: (1) The data are secondary — original measurements use photoelectron spectroscopy (PES); no uncertainty is stated, so we cannot calculate percentage error or decide if the dips are statistically significant. (2) Eight data points give a relatively coarse trend — a denser set (more periods) would better test whether the √Z linearisation is genuinely predictive. (3) Temperature: IE₁ values are measured on gaseous atoms at a specific temperature — if temperature varied, the effective IE₁ would differ. Improvement: cross-reference with NIST Chemistry WebBook values (which give full uncertainty ranges) and perform a χ² or residuals test on the √Z fit to confirm statistical significance of the dips.",
        },
      ],
      response: {
        kind: "data",
        prompt: "Evaluate the quality of the period 3 IE₁ data from this chapter. What are its limitations, and how could the investigation be strengthened?",
        scaffolds: [
          "A key limitation is that this is secondary data, which means...",
          "The data appears to be rounded, which affects...",
          "There are only 8 elements in period 3, so...",
          "To extend the investigation, I would...",
          "To assess whether the dips are statistically significant, I would...",
        ],
        rubric: [
          { level: 2, descriptor: "Vague evaluation.", keywords: ["reliable", "improve", "error", "weakness", "data", "limitation"], minKeywords: 1 },
          { level: 4, descriptor: "Secondary data weakness or rounding noted.", keywords: ["secondary", "textbook", "rounding", "repeat", "original", "only one value"], minKeywords: 1 },
          { level: 6, descriptor: "Multiple limitations; extension to more periods suggested.", keywords: ["secondary", "uncertainty", "rounding", "8 elements", "extend", "period 1", "period 2", "repeating", "pattern", "more elements"], minKeywords: 2 },
          { level: 8, descriptor: "PES mentioned; uncertainty and statistical significance discussed.", keywords: ["photoelectron spectroscopy", "pes", "nist", "uncertainty", "percentage error", "chi squared", "residuals", "statistically significant", "temperature", "coarse"], minKeywords: 3 },
        ],
      },
    },
  ],
}
