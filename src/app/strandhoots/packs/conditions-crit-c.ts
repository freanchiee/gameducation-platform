import type { StrandhootPack } from "../engine/types"

// Crit C data: CO₂ volume produced in CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g) + H₂O(l)
// Dataset from the textbook (page 117): 20 cm³ of 1.0 mol dm⁻³ HCl + 5.0 g CaCO₃ chips.
// Rate = ΔV/Δt; initial rate is highest (steepest gradient), falls as reactant is consumed.
// Linearising transform: 1/x (1/time) applied to a rate-vs-concentration dataset from p.123.
export const conditionsCritC: StrandhootPack = {
  slug: "conditions-crit-c",
  title: "Analysing the CaCO₃ + HCl Reaction Data",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "Rate of reaction data processing & evaluation",
  accent: "#0984b5",
  icon: "📊",
  statementOfInquiry:
    "Scientific innovations advance a scientist's ability to monitor changes in conditions and the effect they have on the rate of a chemical reaction.",
  estMinutes: 30,
  intro:
    "A student added 20 cm³ of 1.0 mol dm⁻³ hydrochloric acid to 5.0 g of calcium carbonate chips in a conical flask. The volume of CO₂ produced was measured every minute. Use the data tool to plot, transform and analyse — then write a conclusion about how rate changes over time, and evaluate the method.",
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
      label: "Gradient Finder",
      icon: "📐",
      description: "Reach Level 8 on Processing data",
      strandId: "process",
      atLevel: 8,
    },
    {
      id: "concluder",
      label: "Kinetics Analyst",
      icon: "🔬",
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
      label: "CaCO₃ + HCl dataset",
      blurb: "Volume of CO₂ vs time for marble chips + hydrochloric acid",
      icon: "⚗️",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor:
        "Display the CO₂ volume vs time data clearly and describe the shape of the curve.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table with data values but missing headings or units. A graph with points plotted but axes not labelled.",
        },
        {
          level: 4,
          body: "Level 3–4: A clear table with headings (Time in min; Volume of CO₂ in cm³) and a graph with both axes labelled including units. Points accurately plotted.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, a sensible scale that fills the grid, points accurately plotted with a smooth curve of best fit. The curve rises steeply initially and flattens as the reaction slows — this characteristic shape shows the rate is fastest at the start.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a tangent drawn at t = 0 min to determine the initial rate. The gradient of this tangent gives the initial rate of reaction in cm³ min⁻¹. The student notes that the curve approaches a plateau (≈78 cm³) when all the hydrochloric acid has been consumed — the limiting reagent.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title:
          "Volume of CO₂ produced when 20 cm³ of 1.0 mol dm⁻³ HCl reacts with 5.0 g CaCO₃ chips",
        xLabel: "Time (min)",
        yLabel: "Volume of CO₂ (cm³)",
        editable: true,
        initialRows: [
          { x: 1, y: 14 },
          { x: 2, y: 26 },
          { x: 3, y: 36 },
          { x: 4, y: 43 },
          { x: 5, y: 50 },
          { x: 6, y: 59 },
          { x: 7, y: 64 },
          { x: 8, y: 70 },
          { x: 9, y: 74 },
          { x: 10, y: 78 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Volume vs Time",
            x: "x",
            y: "y",
            xLabel: "Time (min)",
            yLabel: "Volume of CO₂ (cm³)",
          },
          {
            id: "rate",
            label: "Rate (1/t) vs Volume — shows rate slowing",
            x: "x",
            y: "1/y",
            xLabel: "Time (min)",
            yLabel: "1 / Volume of CO₂ (cm⁻³)",
          },
        ],
        derive: { kind: "gradient", label: "Initial rate (cm³ min⁻¹)", unit: "cm³ min⁻¹" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and graph clear and scientifically valid? Describe the shape of the curve.",
        scaffolds: [
          "My table includes headings and units for...",
          "I plotted volume of CO₂ on the y-axis against time on the x-axis...",
          "The graph shows a curve that is steepest at the start because...",
          "The curve flattens and reaches a plateau at approximately __ cm³ because...",
          "I drew a tangent at t = 0 to find the initial rate...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data, table or graph.",
            keywords: ["table", "graph", "data", "volume", "time", "co2"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings and units on table and axes; points plotted.",
            keywords: [
              "units",
              "heading",
              "labelled",
              "axes",
              "cm³",
              "minutes",
              "time",
              "volume",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Smooth curve drawn; shape described (steep then flattening); scale fills grid.",
            keywords: [
              "smooth curve",
              "steep",
              "flattens",
              "plateau",
              "best fit",
              "scale",
              "rate",
              "decreases",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Tangent drawn at t=0; initial rate calculated; plateau explained as limiting reagent consumed.",
            keywords: [
              "tangent",
              "t=0",
              "initial rate",
              "gradient",
              "78",
              "plateau",
              "limiting reagent",
              "hcl",
              "consumed",
              "cm³ min",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor:
        "Calculate the rate at different time points and describe how the rate changes during the reaction.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Describes the overall trend: 'The volume of CO₂ increases as time increases.'",
        },
        {
          level: 4,
          body: "Level 3–4: Calculates the change in volume over the first and last few minutes: between t=1 and t=2 min, ΔV = 26 − 14 = 12 cm³ (rate ≈ 12 cm³ min⁻¹); between t=9 and t=10 min, ΔV = 78 − 74 = 4 cm³ min⁻¹. Notes that the rate is much higher at the start.",
        },
        {
          level: 6,
          body: "Level 5–6: Draws a tangent to the curve at t = 0 and calculates its gradient. From the graph, the tangent at t=0 has a gradient of approximately 14–16 cm³ min⁻¹ (initial rate). Also calculates the rate at t = 5 min by drawing a tangent there, showing a lower gradient. Explains the decrease in rate using the collision theory: as HCl is consumed, [H⁺] falls, reducing collision frequency.",
        },
        {
          level: 8,
          body: "Level 7–8: Full gradient calculation at t = 0: using two points on the tangent, gradient = Δy/Δx = (78 − 0) / (5.5 − 0) ≈ 14 cm³ min⁻¹. Converts to cm³ s⁻¹: 14/60 ≈ 0.23 cm³ s⁻¹. Compares with rate at t = 9 min ≈ (78−74)/(10−9) = 4 cm³ min⁻¹ = 0.067 cm³ s⁻¹. The rate has fallen by a factor of ~3.5 over the course of the reaction as [HCl] decreases from 1.0 mol dm⁻³ toward zero.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title:
          "Volume of CO₂ produced when 20 cm³ of 1.0 mol dm⁻³ HCl reacts with 5.0 g CaCO₃ chips",
        xLabel: "Time (min)",
        yLabel: "Volume of CO₂ (cm³)",
        editable: true,
        initialRows: [
          { x: 1, y: 14 },
          { x: 2, y: 26 },
          { x: 3, y: 36 },
          { x: 4, y: 43 },
          { x: 5, y: 50 },
          { x: 6, y: 59 },
          { x: 7, y: 64 },
          { x: 8, y: 70 },
          { x: 9, y: 74 },
          { x: 10, y: 78 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Volume vs Time",
            x: "x",
            y: "y",
            xLabel: "Time (min)",
            yLabel: "Volume of CO₂ (cm³)",
          },
          {
            id: "rate",
            label: "Rate (1/t) vs Volume — shows rate slowing",
            x: "x",
            y: "1/y",
            xLabel: "Time (min)",
            yLabel: "1 / Volume of CO₂ (cm⁻³)",
          },
        ],
        derive: { kind: "gradient", label: "Initial rate (cm³ min⁻¹)", unit: "cm³ min⁻¹" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: calculate the rate at t = 0 min and at t = 9 min by drawing tangents. How does the rate change during the reaction? Use the collision theory to explain.",
        scaffolds: [
          "At t = 0 min, I drew a tangent. The gradient = Δy/Δx = ... ÷ ... = ... cm³ min⁻¹",
          "At t = 9 min, ΔV between 9 and 10 min = ... cm³, so rate ≈ ... cm³ min⁻¹",
          "The rate decreased because the concentration of HCl...",
          "By collision theory, fewer H⁺ ions per cm³ means...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Notes volume of CO₂ increases with time.",
            keywords: ["increases", "volume", "co2", "time", "rises"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Calculates rate at two time points; notes rate decreases.",
            keywords: [
              "12 cm³",
              "4 cm³",
              "rate",
              "decreases",
              "start",
              "end",
              "higher",
              "lower",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Tangent drawn at t=0; gradient calculated; collision theory applied.",
            keywords: [
              "tangent",
              "gradient",
              "delta y",
              "delta x",
              "concentration",
              "collision",
              "h+",
              "frequency",
              "decreases",
              "cm³ min",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Gradient at t=0 and t=9 both calculated; ratio compared; converted to cm³ s⁻¹.",
            keywords: [
              "14 cm³",
              "0.23",
              "0.067",
              "cm³ s",
              "factor",
              "3.5",
              "hcl",
              "1.0 mol",
              "decreases",
              "tangent",
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
        "Write a conclusion about how and why the rate changes during the CaCO₃ + HCl reaction.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The volume of CO₂ increased over time and then stopped increasing.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'The rate of reaction was fastest at the start and slowed down over time. The total volume of CO₂ produced was 78 cm³. The reaction stopped because the HCl was used up.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'The initial rate (t = 0–2 min) was approximately 12–14 cm³ min⁻¹ and fell to approximately 4 cm³ min⁻¹ by t = 9 min. The rate decreased because the concentration of HCl fell as it was consumed — fewer H⁺ ions per dm³ means a lower frequency of successful collisions with CaCO₃ surfaces, reducing the rate. The reaction stopped at 78 cm³ when HCl (the limiting reagent) was fully consumed.'",
        },
        {
          level: 8,
          body: "Level 7–8: Full quantitative conclusion: initial rate ≈ 14 cm³ min⁻¹ (0.23 cm³ s⁻¹) from tangent at t = 0; rate at t = 9 min ≈ 4 cm³ min⁻¹ (0.067 cm³ s⁻¹) — a 3.5-fold decrease. This is fully consistent with the collision theory: as [HCl] falls from 1.0 mol dm⁻³ toward zero, the frequency of H⁺ ions colliding with CaCO₃ surfaces decreases proportionally. The final volume of 78 cm³ confirms HCl is the limiting reagent — calculated moles of CO₂ expected: n(HCl) = 0.020 dm³ × 1.0 mol dm⁻³ = 0.020 mol → 0.020 mol CO₂ → 480 cm³ at STP — but since real conditions are room temperature and pressure, the measured 78 cm³ is consistent with a smaller molar volume.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion about how the rate of the CaCO₃ + HCl reaction changes over time. Use specific data values, explain using the collision theory, and state what determines the total volume of CO₂.",
        scaffolds: [
          "The initial rate of reaction was approximately ... cm³ min⁻¹ because...",
          "The rate decreased over time because the concentration of HCl...",
          "By the collision theory, fewer H⁺ ions per unit volume means...",
          "The total volume of CO₂ produced was 78 cm³. The reaction stopped because...",
          "HCl is the limiting reagent because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States volume increased then stopped.",
            keywords: ["volume", "increases", "stopped", "co2", "78", "end"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Rate was fastest at start; reaction stopped when HCl used up.",
            keywords: [
              "fastest",
              "start",
              "slowed",
              "hcl",
              "used up",
              "limiting",
              "78 cm³",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Specific rate values cited; collision theory applied to explain decrease.",
            keywords: [
              "14 cm³",
              "4 cm³",
              "collision",
              "concentration",
              "h+",
              "frequency",
              "limiting reagent",
              "hcl",
              "decreases",
              "surface",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Rates at t=0 and t=9 quantified; ratio calculated; moles of HCl cited to confirm limiting reagent.",
            keywords: [
              "0.23",
              "0.067",
              "3.5",
              "factor",
              "0.020 mol",
              "1.0 mol dm",
              "limiting reagent",
              "collision theory",
              "proportional",
              "cm³ s",
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
        "Identify weaknesses in the gas-collection method and suggest specific, reasoned improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The experiment could be improved by doing it more carefully.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Only one trial was done, which reduces the reliability of the results. Repeating the experiment three times would allow a mean to be calculated and anomalous values identified.'",
        },
        {
          level: 6,
          body: "Level 5–6: Specific weaknesses: (1) Only one trial at each set of conditions — reduces reliability. (2) Using a cotton wool ball to plug the flask may not seal perfectly, allowing some CO₂ to escape before being measured, causing the volume to be underestimated. Improvement: use a gas syringe connected by a rubber bung to collect all CO₂ produced.",
        },
        {
          level: 8,
          body: "Level 7–8: Multiple weaknesses with linked, specific improvements: (1) Single trial — repeat 3× and calculate mean; (2) Cotton wool plug allows CO₂ escape — systematic error causing consistently low volume readings; replace with rubber bung and gas syringe for a sealed system; (3) Chips vary in size and shape — surface area not precisely controlled; use marble powder or chips of uniform sieve size to control surface area; (4) Temperature not controlled — CO₂ is more soluble in cold water, so ambient temperature changes affect the volume of gas collected; conduct all trials at constant room temperature or use a thermostat.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method used to collect the CaCO₃ + HCl data. What are the main weaknesses and how would you specifically improve them?",
        scaffolds: [
          "A key weakness is...",
          "This affects the results because...",
          "To improve this, I would...",
          "Another limitation is that the marble chips vary in size, which means...",
          "Reliability could be improved by...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Vague evaluation.",
            keywords: ["improve", "better", "error", "weakness", "problem", "careful"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One specific weakness with a matching improvement.",
            keywords: [
              "repeat",
              "reliability",
              "one trial",
              "mean",
              "anomalous",
              "three times",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Two specific weaknesses with matched improvements.",
            keywords: [
              "cotton wool",
              "escape",
              "gas syringe",
              "rubber bung",
              "reliable",
              "repeat",
              "3 times",
              "sealed",
              "underestimated",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "3+ weaknesses; systematic error identified; surface area and temperature control discussed.",
            keywords: [
              "systematic",
              "consistently low",
              "chip size",
              "surface area",
              "sieve",
              "powder",
              "temperature",
              "solubility",
              "thermostat",
              "gas syringe",
              "bung",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
