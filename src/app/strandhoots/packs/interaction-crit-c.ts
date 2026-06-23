import type { StrandhootPack } from "../engine/types"

// ─────────────────────────────────────────────────────────────────────────────
// Crit C data: mass of conical flask vs time for Mg ribbon reacting with
// 1.0 mol dm⁻³ HCl (20 cm³, 0.5 g Mg). As H₂ gas escapes, the flask loses
// mass. The rate of mass loss is the rate of reaction.
// Linearising transform: mass remaining vs 1/time gives no useful line.
// Instead: ln(Δmass remaining) vs time linearises a first-order decay —
// gradient ≈ −rate constant k (s⁻¹).
// ─────────────────────────────────────────────────────────────────────────────
export const interactionCritC: StrandhootPack = {
  slug: "interaction-crit-c",
  title: "Magnesium + HCl: Rate of Hydrogen Production",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "Rate of reaction & mass-loss data analysis",
  accent: "#0984b5",
  icon: "📉",
  statementOfInquiry:
    "The interactions between substances can sometimes be understood and predicted by examining the underlying processes.",
  estMinutes: 30,
  intro:
    "A student investigated the rate of hydrogen gas production by measuring the loss in mass of a flask as magnesium ribbon reacted with 1.0 mol dm⁻³ hydrochloric acid. Use the data tool to plot, transform and analyse the results — then write a conclusion and evaluate the method.",
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
      label: "Rate Finder",
      icon: "📐",
      description: "Reach Level 8 on Processing data",
      strandId: "process",
      atLevel: 8,
    },
    {
      id: "concluder",
      label: "Reactivity Analyst",
      icon: "⚗️",
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
      label: "Mass-loss dataset",
      blurb: "Rate of H₂ production from Mg + HCl via mass-loss readings",
      icon: "⚗️",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the mass-loss data clearly with correct headings, units and graph.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table with numbers but missing column headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A clear table with headings (Time in s; Mass of flask in g) and a graph with both axes labelled including units, with data points plotted.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, a sensible scale filling the grid, points accurately plotted with a smooth curve of best fit that starts steep (fast initial rate) and levels off (reaction complete). The plateau is reached when all Mg has been consumed.",
        },
        {
          level: 8,
          body: "Level 7–8: As L5–6, plus a linearised graph of ln(mass remaining) vs time. If the mass loss follows first-order kinetics, this gives a straight line with gradient = −k (rate constant, s⁻¹). This transforms a curve into a straight line, making gradient calculations more reliable.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Mass of flask vs time: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)",
        xLabel: "Time (s)",
        yLabel: "Mass of flask (g)",
        editable: true,
        initialRows: [
          { x: 0, y: 98.50 },
          { x: 20, y: 98.26 },
          { x: 40, y: 98.07 },
          { x: 60, y: 97.93 },
          { x: 80, y: 97.82 },
          { x: 100, y: 97.74 },
          { x: 120, y: 97.68 },
          { x: 140, y: 97.63 },
          { x: 160, y: 97.60 },
          { x: 180, y: 97.58 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Mass vs Time",
            x: "x",
            y: "y",
            xLabel: "Time (s)",
            yLabel: "Mass of flask (g)",
          },
          {
            id: "lnmass",
            label: "ln(mass remaining) vs Time  [linearisation]",
            x: "x",
            y: "ln(y)",
            xLabel: "Time (s)",
            yLabel: "ln(mass of flask / g)",
          },
        ],
        derive: { kind: "gradient", label: "Rate constant k (s⁻¹)", unit: "s⁻¹" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and graph clear and scientifically valid?",
        scaffolds: [
          "My table includes headings and units for...",
          "I plotted mass of flask on the y-axis against time on...",
          "The graph shows a curve that... because...",
          "I linearised the data by plotting ln(mass) vs time because...",
          "A straight line on the linearised plot would confirm...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Mentions a table or graph.",
            keywords: ["table", "graph", "data", "mass", "time"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings and units on table and axes; points plotted.",
            keywords: ["units", "heading", "labelled", "axes", "grams", "seconds", "mass", "time"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Smooth curve of best fit; shape described (steep then plateau); scale fills grid.",
            keywords: [
              "curve",
              "best fit",
              "steep",
              "plateau",
              "levels off",
              "smooth",
              "scale",
              "complete",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Linearised ln(mass) vs time plot described; straight line and gradient explained.",
            keywords: [
              "ln",
              "straight line",
              "linear",
              "gradient",
              "transform",
              "first-order",
              "rate constant",
              "k",
            ],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor: "Calculate the initial rate of mass loss and describe how the rate changes with time.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Describes the overall trend — 'the mass decreases over time'.",
        },
        {
          level: 4,
          body: "Level 3–4: Calculates total mass lost: 98.50 − 97.58 = 0.92 g over 180 s. Notes the rate is not constant — it is fastest at the start and slows down over time.",
        },
        {
          level: 6,
          body: "Level 5–6: Calculates initial rate from the first two points: Δmass/Δt = (98.50 − 98.26) / 20 = 0.012 g s⁻¹. Calculates the rate at a later interval (e.g. t = 100–120 s): (97.74 − 97.68) / 20 = 0.003 g s⁻¹. Concludes that the rate decreases as the reaction proceeds because the concentration of HCl decreases as it is consumed.",
        },
        {
          level: 8,
          body: "Level 7–8: As L6, plus: draws a tangent to the curve at t = 0 to find the initial gradient (instantaneous rate). From the linearised plot, uses two widely spaced points to calculate gradient = Δln(mass)/Δt. Since ln(98.50) = 4.590 and ln(97.58) = 4.581 at t = 0 and 180 s respectively: gradient = (4.581 − 4.590) / 180 = −5.0 × 10⁻⁵ s⁻¹. Links decreasing rate to decreasing [HCl] as the reaction proceeds (concentration effect).",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Mass of flask vs time: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)",
        xLabel: "Time (s)",
        yLabel: "Mass of flask (g)",
        editable: true,
        initialRows: [
          { x: 0, y: 98.50 },
          { x: 20, y: 98.26 },
          { x: 40, y: 98.07 },
          { x: 60, y: 97.93 },
          { x: 80, y: 97.82 },
          { x: 100, y: 97.74 },
          { x: 120, y: 97.68 },
          { x: 140, y: 97.63 },
          { x: 160, y: 97.60 },
          { x: 180, y: 97.58 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Mass vs Time",
            x: "x",
            y: "y",
            xLabel: "Time (s)",
            yLabel: "Mass of flask (g)",
          },
          {
            id: "lnmass",
            label: "ln(mass remaining) vs Time  [linearisation]",
            x: "x",
            y: "ln(y)",
            xLabel: "Time (s)",
            yLabel: "ln(mass of flask / g)",
          },
        ],
        derive: { kind: "gradient", label: "Rate constant k (s⁻¹)", unit: "s⁻¹" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: calculate the initial rate of mass loss and explain why the rate changes over time.",
        scaffolds: [
          "The trend shows that mass...",
          "The initial rate (t = 0 to 20 s) = Δmass / Δt = ... / ... = ... g s⁻¹",
          "The rate at t = 100–120 s = ... g s⁻¹, which is... the initial rate",
          "The rate decreases because...",
          "From the linearised plot, gradient = ... s⁻¹",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Notes mass decreases over time.",
            keywords: ["decreases", "mass", "time", "falls", "trend", "loses"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Total mass loss calculated; non-constant rate noted.",
            keywords: ["0.92", "total", "not constant", "fastest", "start", "slows", "decreases"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Initial rate calculated from first interval; rate at later time compared.",
            keywords: [
              "0.012",
              "initial rate",
              "g s⁻¹",
              "delta",
              "20 s",
              "concentration",
              "decreases",
              "hcl",
              "later",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Tangent drawn or gradient of ln plot calculated; rate explained via HCl concentration.",
            keywords: [
              "tangent",
              "ln",
              "4.590",
              "4.581",
              "gradient",
              "5.0 × 10⁻⁵",
              "concentration",
              "decreasing",
              "instantaneous",
              "s⁻¹",
            ],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor: "State a conclusion linking the mass-loss data to the reactivity of magnesium.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The mass of the flask decreased over time.' — states only an observation.",
        },
        {
          level: 4,
          body: "Level 3–4: 'The mass decreased by 0.92 g over 180 s. The rate was fastest at the start and slowed as the reaction proceeded. This shows that magnesium reacted with the acid to produce hydrogen gas, which escaped from the flask.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'Mass decreased from 98.50 g to 97.58 g (a loss of 0.92 g), consistent with the escape of 0.92 g of H₂ gas. The initial rate was 0.012 g s⁻¹ but fell to 0.003 g s⁻¹ at t = 100 s, confirming that the rate decreases as [HCl] decreases. This supports the research question: magnesium (above hydrogen in the reactivity series) reacts vigorously with HCl to displace hydrogen. The equation is: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g).'",
        },
        {
          level: 8,
          body: "Level 7–8: Full quantitative conclusion: total mass lost = 0.92 g ≈ 0.46 mol H₂ (M = 2 g mol⁻¹). From stoichiometry (1:1 Mg:H₂), 0.46 mol Mg reacted, consistent with 5 g ÷ 24 g mol⁻¹ = 0.21 mol Mg — showing acid was in excess. Initial rate = 0.012 g s⁻¹ = 0.006 mol H₂ s⁻¹. The linearised plot gradient (−k ≈ −5.0 × 10⁻⁵ s⁻¹) confirms first-order dependence on HCl concentration. Conclusion is consistent with the hypothesis that magnesium, being high in the reactivity series, would react rapidly with HCl.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion. What does the mass-loss data tell you about the rate of reaction of magnesium with hydrochloric acid? Use specific values and link to the reactivity series.",
        scaffolds: [
          "The mass of the flask decreased from... to... (a loss of... g)...",
          "The balanced equation is Mg(s) + 2HCl(aq) →...",
          "The initial rate was... g s⁻¹, which decreased to... g s⁻¹ because...",
          "This is consistent with magnesium's position in the reactivity series because...",
          "From stoichiometry, the moles of H₂ produced ≈...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States that mass decreased.",
            keywords: ["mass", "decreased", "fell", "flask", "time"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Total mass loss stated; hydrogen escape identified; rate trend noted.",
            keywords: [
              "0.92",
              "hydrogen",
              "escaped",
              "rate",
              "fastest",
              "start",
              "slowed",
              "reacted",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Specific data values used; balanced equation given; rate decrease linked to [HCl].",
            keywords: [
              "98.50",
              "97.58",
              "0.012",
              "mg(s)",
              "2hcl",
              "mgcl₂",
              "h₂(g)",
              "concentration",
              "reactivity series",
              "decreases",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Moles calculated; stoichiometry used; gradient of linearised plot linked to rate constant.",
            keywords: [
              "0.46 mol",
              "24 g mol",
              "stoichiometry",
              "0.006 mol",
              "first-order",
              "5.0 × 10",
              "gradient",
              "k",
              "excess acid",
              "consistent",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor: "Identify specific weaknesses in the mass-loss method and suggest improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The method could be improved.' — vague, no specific weakness identified.",
        },
        {
          level: 4,
          body: "Level 3–4: 'Only one trial was done for each metal, which reduces reliability. Repeating the experiment three times and calculating a mean would improve reliability.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'A key limitation is that the cotton wool ball (used to stop acid spray escaping) may absorb some acid droplets, causing a systematic error in mass — mass lost would appear greater than the true hydrogen loss. Also, recording mass every 20 s may miss the steepest part of the initial rate curve. Improvement: use a gas syringe connected to a sealed Büchner flask for more direct and accurate measurement of gas volume.'",
        },
        {
          level: 8,
          body: "Level 7–8: Multiple specific weaknesses: (1) Cotton wool absorbs acid spray — systematic error makes mass loss appear higher than true H₂ loss. (2) 20 s intervals may miss the rapid initial rate — reducing interval to 5 s in the first 60 s would capture the initial gradient more accurately. (3) Surface area of metal is not precisely controlled — powder reacts faster than ribbon of the same mass; all samples should use equal-surface-area strips. (4) Temperature rises during the exothermic reaction, which would increase rate and confound results — temperature should be monitored throughout. Each weakness is linked to a specific, reasoned improvement.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method used to collect this mass-loss data. What are the main weaknesses and how would you improve each one?",
        scaffolds: [
          "A key weakness is...",
          "This affects the result because...",
          "To improve this, I would...",
          "The 20 s time intervals are a limitation because...",
          "Reliability could be improved by repeating each metal... times and...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Vague suggestion to improve.",
            keywords: ["improve", "better", "error", "weakness", "problem", "repeat"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One specific weakness identified with an improvement.",
            keywords: [
              "repeat",
              "once",
              "reliability",
              "trial",
              "mean",
              "cotton wool",
              "only one",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "Cotton wool systematic error identified; interval limitation noted; gas syringe suggested.",
            keywords: [
              "cotton wool",
              "absorb",
              "systematic error",
              "20 s",
              "initial rate",
              "gas syringe",
              "büchner",
              "spray",
              "improve",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Multiple weaknesses with specific improvements; temperature rise noted; surface area issue raised.",
            keywords: [
              "cotton wool",
              "surface area",
              "temperature",
              "exothermic",
              "5 s",
              "powder",
              "ribbon",
              "confound",
              "systematic",
              "accuracy",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
