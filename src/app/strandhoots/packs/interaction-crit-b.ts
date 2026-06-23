import type { StrandhootPack } from "../engine/types"

export const interactionCritB: StrandhootPack = {
  slug: "interaction-crit-b",
  title: "Designing a Metals Reactivity Investigation",
  subject: "MYP Chemistry",
  criterion: "B",
  topic: "Investigating reactivity of metals with hydrochloric acid",
  accent: "#c0392b",
  icon: "🧪",
  statementOfInquiry:
    "The interactions between substances can sometimes be understood and predicted by examining the underlying processes.",
  estMinutes: 27,
  intro:
    "Design a rigorous investigation into how the reactivity of a metal affects the rate at which it produces hydrogen gas when reacted with hydrochloric acid — the real Chapter 8 experiment. Each strand levels up: craft a sharp research question, form a testable hypothesis, classify your variables, then write a safe, step-by-step method.",
  badges: [
    {
      id: "questioner",
      label: "Sharp Question",
      icon: "❓",
      description: "Reach Level 8 on Research question",
      strandId: "rq",
      atLevel: 8,
    },
    {
      id: "predictor",
      label: "Bold Predictor",
      icon: "🔮",
      description: "Reach Level 8 on Hypothesis",
      strandId: "hypothesis",
      atLevel: 8,
    },
    {
      id: "controller",
      label: "Variable Master",
      icon: "🎛️",
      description: "Reach Level 8 on Variables",
      strandId: "variables",
      atLevel: 8,
    },
    {
      id: "safe",
      label: "Safe Scientist",
      icon: "🥼",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Metals reactivity investigation",
      blurb: "Design the experiment: metal + acid → salt + hydrogen gas",
      icon: "🧪",
    },
  ],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for the metals-with-acid investigation.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A research question names what you are investigating. Vague example: 'Do metals react differently with acid?' — too broad, names no specific variable.",
        },
        {
          level: 4,
          body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does the type of metal affect the volume of hydrogen gas produced when reacted with hydrochloric acid?' IV = type of metal; DV = volume of hydrogen gas.",
        },
        {
          level: 6,
          body: "Level 5–6: A specific, testable question: 'How does the type of metal (magnesium, zinc, iron, nickel or copper) affect the initial rate of hydrogen gas production (cm³ s⁻¹) when 5 cm × 2 cm strips are reacted with 5 cm³ of 1.0 mol dm⁻³ hydrochloric acid at 20°C?' This names IV, DV with units, a specific range of metals, amounts, and at least one controlled variable.",
        },
        {
          level: 8,
          body: "Level 7–8: An operationalised question includes measurement precision: 'How does the type of metal (magnesium, zinc, iron, nickel or copper, each as freshly polished 2 cm × 2 cm strips of equal surface area) affect the initial rate of hydrogen gas production (cm³ per 20 s interval, measured using a gas syringe to ±0.5 cm³) when reacted with 5 cm³ of 1.0 mol dm⁻³ HCl at 20 ± 1°C in a sealed 250 cm³ Büchner flask?' It specifies measurement technique, precision, and all controlled conditions.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a research question to investigate how the type of metal affects the initial rate of hydrogen gas production when it reacts with hydrochloric acid.",
        scaffolds: [
          "How does the type of metal...",
          "...affect the initial rate of hydrogen gas production...",
          "...when reacted with 1.0 mol dm⁻³ hydrochloric acid...",
          "...at constant temperature of...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names the topic or one variable vaguely.",
            keywords: ["metal", "acid", "hydrogen", "reaction", "gas", "investigate"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Names IV and DV clearly.",
            keywords: ["type of metal", "hydrogen", "volume", "rate", "hydrochloric acid", "affect"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Specific metals named; units stated; at least one CV identified.",
            keywords: [
              "magnesium",
              "zinc",
              "iron",
              "cm³",
              "rate",
              "mol dm",
              "constant",
              "temperature",
              "surface area",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Measurement technique and precision specified; all conditions operationalised.",
            keywords: [
              "gas syringe",
              "±",
              "büchner",
              "freshly polished",
              "2 cm",
              "5 cm³",
              "20 s",
              "precision",
              "sealed",
              "operationalised",
            ],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict how the type of metal affects hydrogen gas production rate, with scientific reasoning.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A hypothesis makes a directional prediction. 'More reactive metals produce hydrogen faster.' — this is a start but gives no scientific reasoning.",
        },
        {
          level: 4,
          body: "Level 3–4: An if/then hypothesis: 'If the metal is higher in the reactivity series, then the initial rate of hydrogen gas production will be greater.' Names IV and DV with direction, but lacks explanation.",
        },
        {
          level: 6,
          body: "Level 5–6: A justified hypothesis cites the reactivity series: 'If the metal is higher in the reactivity series (Mg > Zn > Fe > Ni > Cu), the initial rate of hydrogen production will increase, because a higher position in the reactivity series indicates greater ease of electron loss. Metals above hydrogen in the series displace H⁺ ions from solution; the more reactive the metal, the faster this electron transfer occurs. Copper is below hydrogen and will produce no gas.'",
        },
        {
          level: 8,
          body: "Level 7–8: A quantitative, mechanistic hypothesis: 'Magnesium will produce the highest initial rate of hydrogen gas (estimated >5 cm³ per 20 s) because it is the highest of the test metals in the reactivity series and loses electrons most readily. Each metal above hydrogen reduces H⁺: e.g. Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g). Copper will produce no hydrogen because it is below hydrogen in the series and cannot lose electrons to H⁺. The half-equations for magnesium: Mg(s) → Mg²⁺(aq) + 2e⁻ and 2H⁺(aq) + 2e⁻ → H₂(g). The order of decreasing rate will mirror the reactivity series order.'",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a hypothesis predicting how the type of metal affects the rate of hydrogen gas production when reacted with hydrochloric acid. Include scientific reasoning linked to the reactivity series.",
        scaffolds: [
          "If the metal is higher in the reactivity series, then...",
          "because the reactivity series shows...",
          "Metals above hydrogen in the series can...",
          "Copper will produce no hydrogen because...",
          "The half-equations for magnesium are...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States a directional prediction about metal reactivity and hydrogen.",
            keywords: ["reactive", "hydrogen", "faster", "more", "rate", "metal"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "If/then structure with IV and DV named; reactivity series mentioned.",
            keywords: [
              "if",
              "then",
              "reactivity series",
              "higher",
              "rate",
              "hydrogen",
              "above",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Reactivity series order applied; electron loss mentioned; copper exclusion justified.",
            keywords: [
              "reactivity series",
              "electron",
              "mg",
              "zn",
              "fe",
              "copper",
              "below hydrogen",
              "displaces",
              "h⁺",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Quantitative prediction; half-equations written; mechanism explained with electron transfer.",
            keywords: [
              "mg(s)",
              "mg²⁺",
              "2e⁻",
              "2h⁺",
              "h₂(g)",
              "half-equation",
              "cm³",
              "quantitative",
              "mechanism",
              "electron transfer",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables for the metals-with-hydrochloric-acid rate investigation.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair).",
        },
        {
          level: 4,
          body: "Level 3–4: IV: type of metal (magnesium, zinc, iron, nickel, copper). DV: initial rate of hydrogen gas production (volume of gas per unit time, cm³ s⁻¹), measured by reading the gas syringe at regular intervals. The mass of each metal sample and the volume and concentration of acid must be controlled.",
        },
        {
          level: 6,
          body: "Level 5–6: IV: type of metal. DV: volume of H₂ gas collected (cm³) every 20 s, measured with a glass gas syringe (±0.5 cm³). CVs: mass of metal (5 g), volume of HCl (20 cm³), concentration of HCl (1.0 mol dm⁻³), temperature (20°C), surface area of metal (freshly polished 2 cm × 2 cm strips). Copper is used as a control to confirm that metals below hydrogen do not produce hydrogen.",
        },
        {
          level: 8,
          body: "Level 7–8: As L6, plus: each CV stated with method of control and reason. Mass of metal controlled by weighing on an electronic balance (±0.01 g) because different masses would change the number of moles reacting. Temperature controlled using a water bath at 20 ± 1°C because temperature affects reaction rate independently of metal type. Surface area controlled using freshly polished strips of equal size because oxidation layers (Al₂O₃ on aluminium) would reduce reactivity and surface area affects rate. Systematic error identified: if the bung is not airtight, gas will escape and the rate will be underestimated.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Identify and classify all variables for an experiment investigating how the type of metal affects the initial rate of hydrogen gas production when reacted with 1.0 mol dm⁻³ hydrochloric acid.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV):",
          "Controlled variables (CVs):",
          "I will measure the DV using a glass gas syringe which measures to ±...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one type of variable.",
            keywords: [
              "independent",
              "dependent",
              "controlled",
              "metal",
              "hydrogen",
              "variable",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "IV, DV named with units.",
            keywords: [
              "type of metal",
              "volume",
              "rate",
              "cm³",
              "gas syringe",
              "concentration",
              "mass",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "IV, DV and 3+ CVs named with values and units.",
            keywords: [
              "5 g",
              "20 cm³",
              "1.0 mol dm",
              "20°c",
              "surface area",
              "2 cm",
              "freshly polished",
              "gas syringe",
              "20 s",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "CVs with control method, reason, and systematic error identified.",
            keywords: [
              "±0.01 g",
              "water bath",
              "electronic balance",
              "airtight",
              "oxidation layer",
              "al₂o₃",
              "systematic error",
              "bung",
              "moles",
              "precision",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, numbered method for investigating hydrogen gas production from metals with HCl.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Lists materials only or gives 1–2 vague steps: 'Put metal in acid and measure gas.' — no volumes, no safety precautions, no timing.",
        },
        {
          level: 4,
          body: "Level 3–4: Steps in logical order: (1) Measure 5 cm³ of 1.0 mol dm⁻³ HCl into a conical flask. (2) Add a 2 cm × 2 cm strip of magnesium. (3) Seal the flask and start a stopwatch. (4) Record the gas syringe volume every 20 s. Safety: wear eye protection; HCl is corrosive.",
        },
        {
          level: 6,
          body: "Level 5–6: Numbered steps with all volumes and masses stated; precise apparatus named; timing intervals; safety precautions (eye protection, fume hood for HCl vapour, no naked flames). Steps: (1) Weigh 5 g of magnesium ribbon. (2) Measure 20 cm³ of 1.0 mol dm⁻³ HCl using a measuring cylinder. (3) Pour acid into a 250 cm³ Büchner flask connected to a glass gas syringe. (4) Add metal, seal with rubber bung, start stopwatch. (5) Record gas syringe reading every 20 s until no further change. (6) Repeat with zinc, iron, nickel and copper. Use a fresh flask and new acid each time.",
        },
        {
          level: 8,
          body: "Level 7–8: As L6, plus: freshly polish each metal strip with sandpaper immediately before use (to remove oxide layer); repeat each metal 3 times and calculate a mean rate; record the initial rate (gradient of first linear section of volume vs time graph, cm³ s⁻¹); note observations (color change, vigor of bubbling, heat produced). Identifies and controls the systematic error of gas leakage by testing the seal with a soap bubble before each run. States the balanced equation for each metal used.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a numbered, step-by-step method for investigating how the type of metal affects the initial rate of hydrogen gas production when reacted with 1.0 mol dm⁻³ hydrochloric acid.",
        scaffolds: [
          "1. Freshly polish a 2 cm × 2 cm strip of magnesium using sandpaper...",
          "2. Measure 20 cm³ of 1.0 mol dm⁻³ hydrochloric acid using a measuring cylinder...",
          "3. Pour the acid into a 250 cm³ Büchner flask connected to a glass gas syringe...",
          "4. Add the metal strip to the flask, seal with a rubber bung and start the stopwatch...",
          "5. Record the gas syringe reading every 20 s until the reaction is complete...",
          "Safety: wear eye protection; work in a well-ventilated area because HCl produces corrosive vapours...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Lists materials or gives 1–2 vague steps.",
            keywords: ["metal", "acid", "gas", "measure", "flask", "react"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Logical sequence with 4+ steps; safety mentioned.",
            keywords: [
              "measure",
              "add",
              "seal",
              "stopwatch",
              "record",
              "eye protection",
              "syringe",
              "corrosive",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Numbered steps with volumes, masses, timing; apparatus named; safety.",
            keywords: [
              "20 cm³",
              "1.0 mol dm",
              "büchner",
              "gas syringe",
              "rubber bung",
              "20 s",
              "eye protection",
              "fume",
              "fresh flask",
            ],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor:
              "Polishing step; 3 repeats; initial rate defined; leak test; balanced equations.",
            keywords: [
              "sandpaper",
              "polish",
              "3 times",
              "repeat",
              "mean",
              "gradient",
              "leak",
              "soap bubble",
              "balanced equation",
              "mg(s)",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
