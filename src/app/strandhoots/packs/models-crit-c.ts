import type { StrandhootPack } from "../engine/types"

// Chapter 9 real investigation (p.249-250): conductivity of KCl solutions.
// Hypothesis tested: "An increase in the concentration of a solute will increase the conductivity."
// Dataset: aqueous KCl conductivity vs concentration at 25°C.
// Values are based on accepted literature values for KCl conductivity;
// the relationship is approximately linear for dilute solutions (ionic strength low),
// so the raw x vs y transform already linearises the data.
// At higher concentrations inter-ionic effects cause slight sub-linear deviation —
// the √x vs y transform straightens the curve in that region (Kohlrausch's law).
export const modelsCritC: StrandhootPack = {
  slug: "models-crit-c",
  title: "Conductivity vs Concentration of KCl",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "Ionic conductivity & Kohlrausch's law",
  accent: "#0984b5",
  icon: "⚡",
  statementOfInquiry:
    "Molecular modelling is used for the visualization of chemical structures, displaying their orientation in space and time.",
  estMinutes: 28,
  intro:
    "A student investigated how the concentration of aqueous potassium chloride affects electrical conductivity. Use the data tool to plot, transform and analyse the results — then write a conclusion linking the trend to ionic bonding theory and evaluate the method. Each written strand levels up with the depth of your scientific reasoning.",
  badges: [
    { id: "presenter-c", label: "Data Display", icon: "📊", description: "Reach Level 8 on Presenting data", strandId: "present-c", atLevel: 8 },
    { id: "processor-c", label: "Gradient Finder", icon: "📐", description: "Reach Level 8 on Processing data", strandId: "process-c", atLevel: 8 },
    { id: "concluder-c", label: "Ionic Analyst", icon: "🔋", description: "Reach Level 8 on Conclusion", strandId: "conclude-c", atLevel: 8 },
    { id: "evaluator-c", label: "Method Critic", icon: "⚖️", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "KCl conductivity dataset", blurb: "Electrical conductivity of KCl vs concentration at 25°C", icon: "🔋" }],
  strands: [
    {
      id: "present-c",
      name: "Presenting the data",
      descriptor: "Display the conductivity vs concentration data clearly and choose an appropriate graph form.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table with data values but missing headings, units or a graph.",
        },
        {
          level: 4,
          body: "Level 3–4: A clear table with column headings (concentration in mol dm⁻³; conductivity in mS cm⁻¹) and a graph with both axes labelled including units.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, sensible scale that fills the grid, data points accurately plotted. A straight line of best fit is drawn through the origin — this is appropriate because conductivity is proportional to concentration for dilute KCl solutions.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus: describes why a √c transform (√concentration vs conductivity) is used to test Kohlrausch's law, which predicts molar conductivity Λ = Λ° − K√c for electrolytes. The linearised graph of conductivity vs √c shows a straight line confirming this relationship. Gradient and y-intercept can be read off.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Electrical conductivity of aqueous KCl vs concentration at 25°C",
        xLabel: "Concentration (mol dm⁻³)",
        yLabel: "Conductivity (mS cm⁻¹)",
        editable: true,
        initialRows: [
          { x: 0.1, y: 12.9 },
          { x: 0.2, y: 25.1 },
          { x: 0.3, y: 37.0 },
          { x: 0.4, y: 48.3 },
          { x: 0.5, y: 59.1 },
          { x: 0.6, y: 69.6 },
          { x: 0.8, y: 89.5 },
          { x: 1.0, y: 108.5 },
          { x: 1.2, y: 126.8 },
        ],
        transforms: [
          { id: "raw", label: "Conductivity vs Concentration", x: "x", y: "y", xLabel: "Concentration (mol dm⁻³)", yLabel: "Conductivity (mS cm⁻¹)" },
          { id: "kohlrausch", label: "Conductivity vs √c  [Kohlrausch]", x: "√x", y: "y", xLabel: "√Concentration (mol dm⁻³)^0.5", yLabel: "Conductivity (mS cm⁻¹)" },
        ],
        derive: { kind: "gradient", label: "Gradient (mS cm⁻¹ per mol dm⁻³)", unit: "mS cm⁻¹ mol⁻¹ dm³" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and graph clear and scientifically valid?",
        scaffolds: [
          "My table includes headings and units for...",
          "I plotted conductivity on the y-axis against concentration on the x-axis because...",
          "The graph shows a... trend because...",
          "I drew a line / curve of best fit because...",
          "I chose the √c transform because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data or graph.",
            keywords: ["table", "graph", "conductivity", "concentration", "data"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings and units on table and axes.",
            keywords: ["units", "heading", "labelled", "axes", "mol dm", "ms cm", "concentration", "conductivity"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Straight line of best fit drawn; proportional trend described; line passes through origin.",
            keywords: ["straight line", "best fit", "proportional", "origin", "increases", "linear", "accurate", "scale"],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "√c transform applied and Kohlrausch's law referenced.",
            keywords: ["√c", "square root", "kohlrausch", "molar conductivity", "transform", "straight line", "gradient", "y-intercept", "law"],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "process-c",
      name: "Processing the data",
      descriptor: "Calculate the gradient of the conductivity vs concentration graph and express the relationship.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Describes the overall trend: 'Conductivity increases as concentration increases.'",
        },
        {
          level: 4,
          body: "Level 3–4: Calculates the total change: conductivity rises from 12.9 mS cm⁻¹ at 0.1 mol dm⁻³ to 126.8 mS cm⁻¹ at 1.2 mol dm⁻³ — an increase of 113.9 mS cm⁻¹ over a range of 1.1 mol dm⁻³.",
        },
        {
          level: 6,
          body: "Level 5–6: Draws a line of best fit and reads off two widely-spaced points to calculate the gradient. Using (0.1, 12.9) and (1.2, 126.8): gradient = (126.8 − 12.9) / (1.2 − 0.1) = 113.9 / 1.1 ≈ 103.5 mS cm⁻¹ per mol dm⁻³. States the unit correctly.",
        },
        {
          level: 8,
          body: "Level 7–8: Full calculation shown with chosen points clearly stated. Gradient ≈ 103.5 mS cm⁻¹ per mol dm⁻³. This is the molar conductivity of KCl at 25°C. The y-intercept is near zero (line passes through the origin), confirming the directly proportional relationship: conductivity = (103.5) × c. From the √c plot, any deviation from the line at high concentrations indicates that inter-ionic interactions reduce the mobility of K⁺ and Cl⁻ ions — consistent with Kohlrausch's law.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Electrical conductivity of aqueous KCl vs concentration at 25°C",
        xLabel: "Concentration (mol dm⁻³)",
        yLabel: "Conductivity (mS cm⁻¹)",
        editable: true,
        initialRows: [
          { x: 0.1, y: 12.9 },
          { x: 0.2, y: 25.1 },
          { x: 0.3, y: 37.0 },
          { x: 0.4, y: 48.3 },
          { x: 0.5, y: 59.1 },
          { x: 0.6, y: 69.6 },
          { x: 0.8, y: 89.5 },
          { x: 1.0, y: 108.5 },
          { x: 1.2, y: 126.8 },
        ],
        transforms: [
          { id: "raw", label: "Conductivity vs Concentration", x: "x", y: "y", xLabel: "Concentration (mol dm⁻³)", yLabel: "Conductivity (mS cm⁻¹)" },
          { id: "kohlrausch", label: "Conductivity vs √c  [Kohlrausch]", x: "√x", y: "y", xLabel: "√Concentration (mol dm⁻³)^0.5", yLabel: "Conductivity (mS cm⁻¹)" },
        ],
        derive: { kind: "gradient", label: "Gradient (mS cm⁻¹ per mol dm⁻³)", unit: "mS cm⁻¹ mol⁻¹ dm³" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: calculate the gradient of the conductivity vs concentration graph and state what it represents.",
        scaffolds: [
          "The trend shows that conductivity...",
          "I chose the two points (c₁, σ₁) = ... and (c₂, σ₂) = ...",
          "Gradient = Δσ / Δc = ... / ... = ... mS cm⁻¹ per mol dm⁻³",
          "This gradient represents the molar conductivity of KCl because...",
          "The line passes through / does not pass through the origin because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Notes conductivity increases with concentration.",
            keywords: ["increases", "concentration", "conductivity", "trend", "rises"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Total change calculated; range noted.",
            keywords: ["12.9", "126.8", "range", "increase", "1.1", "113.9", "total"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Gradient calculated from line of best fit with two points and unit stated.",
            keywords: ["gradient", "two points", "delta", "slope", "103", "ms cm", "mol dm", "best fit", "unit"],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Gradient = molar conductivity; origin intercept discussed; inter-ionic effects at high concentration noted.",
            keywords: ["103", "molar conductivity", "origin", "proportional", "inter-ionic", "mobility", "kohlrausch", "high concentration", "deviation"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "conclude-c",
      name: "Conclusion",
      descriptor: "State a conclusion linking the conductivity trend to ionic bonding theory.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'Conductivity increased as concentration increased.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Conductivity increased with concentration, confirming the hypothesis. Higher KCl concentration means more ions in solution.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'Conductivity rose from 12.9 mS cm⁻¹ at 0.1 mol dm⁻³ to 126.8 mS cm⁻¹ at 1.2 mol dm⁻³ — a roughly 10-fold increase for a 12-fold increase in concentration. This confirms the hypothesis: KCl dissolves as K⁺(aq) and Cl⁻(aq) ions; higher concentration means more ions per unit volume, so more charge carriers, increasing conductivity. The relationship is approximately proportional (gradient ≈ 103.5 mS cm⁻¹ mol⁻¹ dm³).'",
        },
        {
          level: 8,
          body: "Level 7–8: Full conclusion: conductivity rose approximately proportionally with concentration (gradient ≈ 103.5 mS cm⁻¹ mol⁻¹ dm³, line near origin). This confirms the ionic bonding model — KCl(s) → K⁺(aq) + Cl⁻(aq) — and supports the hypothesis directly. Slight sub-linearity at higher concentrations is consistent with Kohlrausch's law: at higher concentrations, inter-ionic attractions reduce ion mobility, so the increase in conductivity per additional mol dm⁻³ is slightly lower. Comparison to distilled water (near-zero conductivity) and solid NaCl (no conductivity) from the textbook experiment confirms that ions in solution are the charge carriers.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion. Does conductivity increase proportionally with KCl concentration? Link your answer to what KCl does when it dissolves.",
        scaffolds: [
          "As concentration increased from 0.1 to 1.2 mol dm⁻³, conductivity...",
          "This confirms / does not confirm the hypothesis because...",
          "When KCl dissolves it produces... and these ions...",
          "The gradient of ≈ 103.5 mS cm⁻¹ per mol dm⁻³ means...",
          "At high concentrations the relationship becomes slightly... because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States conductivity increases with concentration.",
            keywords: ["increases", "conductivity", "concentration", "rises"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Hypothesis confirmed; more ions at higher concentration stated.",
            keywords: ["hypothesis", "confirmed", "ions", "k+", "cl-", "more", "concentration", "dissolves"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Specific data values cited; proportional trend; ionic equation given.",
            keywords: ["12.9", "126.8", "0.1", "1.2", "proportional", "charge carriers", "k+", "cl-", "gradient", "103"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Sub-linearity at high concentration explained via Kohlrausch; comparison to non-conductors.",
            keywords: ["kohlrausch", "inter-ionic", "mobility", "sub-linear", "distilled water", "solid nacl", "non-conductor", "charge carriers", "103", "gradient"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "evaluate-c",
      name: "Evaluating the method",
      descriptor: "Identify weaknesses in the conductivity experiment and suggest specific improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The method could be improved.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Only one trial was done at each concentration, which reduces reliability.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'Key limitations: (1) Only one trial per concentration — if an error occurred, there is no way to detect it. Improvement: repeat each concentration three times and calculate a mean. (2) The probe may not have been fully rinsed between solutions — residual KCl could contaminate the next solution, increasing its apparent conductivity. Improvement: rinse with distilled water and dry between each measurement.'",
        },
        {
          level: 8,
          body: "Level 7–8: Multiple specific weaknesses with quantified reasoning: (1) Temperature was assumed constant but a 1°C change increases conductivity by ~2% — for KCl at 1.0 mol dm⁻³ (~108 mS cm⁻¹), a 2°C temperature rise gives ~4 mS cm⁻¹ error. A water bath set to 25°C ± 0.1°C would minimise this. (2) Solutions prepared by dilution from a stock may have accumulated volumetric errors — using a volumetric flask (±0.06 cm³) rather than a measuring cylinder (±0.5 cm³) would reduce concentration uncertainty. (3) Probe placement — depth and distance from walls affects the reading. Using a fixed probe holder eliminates this. Each weakness is linked to a specific, quantified, reasoned improvement.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method used to collect this conductivity data. Identify the main weaknesses and explain how you would improve each one.",
        scaffolds: [
          "A key weakness is...",
          "This affects the result because...",
          "To improve this, I would...",
          "A temperature uncertainty of ±__ °C means...",
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
            descriptor: "One specific weakness with a named improvement.",
            keywords: ["repeat", "only one", "rinse", "contamination", "temperature", "reliability"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Two specific weaknesses with matching improvements.",
            keywords: ["three times", "mean", "rinse", "distilled water", "temperature", "contamination", "probe", "reliable", "improve"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Multiple weaknesses with quantified impact and specific instrument improvements.",
            keywords: ["2%", "1°c", "4 ms cm", "water bath", "volumetric flask", "±0.06", "measuring cylinder", "probe holder", "depth", "temperature", "quantified"],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
