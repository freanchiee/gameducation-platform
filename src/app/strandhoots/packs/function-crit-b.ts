import type { StrandhootPack } from "../engine/types"

export const functionCritB: StrandhootPack = {
  slug: "function-crit-b",
  title: "Designing the Lead Iodide Precipitation Experiment",
  subject: "MYP Chemistry",
  criterion: "B",
  topic: "Investigating separation of an insoluble salt by precipitation and filtration",
  accent: "#c0392b",
  icon: "🧫",
  statementOfInquiry:
    "The way in which matter functions is dependent on its properties and the relationship of the different systems within the environment.",
  estMinutes: 27,
  intro:
    "Design an investigation into the precipitation of lead(II) iodide from lead(II) nitrate and potassium iodide solutions — the real experiment in Chapter 7. Move from a research question through hypothesis, variable classification, and a complete safe method. Each strand levels up from vague to operationalised.",
  badges: [
    {
      id: "questioner-b",
      label: "Sharp Question",
      icon: "❓",
      description: "Reach Level 8 on Research question",
      strandId: "rq-b",
      atLevel: 8,
    },
    {
      id: "predictor-b",
      label: "Bold Predictor",
      icon: "🔮",
      description: "Reach Level 8 on Hypothesis",
      strandId: "hypothesis-b",
      atLevel: 8,
    },
    {
      id: "controller-b",
      label: "Variable Master",
      icon: "🎛️",
      description: "Reach Level 8 on Variables",
      strandId: "variables-b",
      atLevel: 8,
    },
    {
      id: "safe-b",
      label: "Safe Scientist",
      icon: "🥼",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Lead iodide investigation",
      blurb: "Design a precipitation and filtration investigation",
      icon: "🧂",
    },
  ],
  strands: [
    {
      id: "rq-b",
      name: "Research question",
      descriptor:
        "Write a focused, testable research question for the lead(II) iodide precipitation experiment.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A vague question: 'Does lead nitrate react with potassium iodide?' This is not testable as a controlled quantitative experiment — it has no variable range and no measurable DV.",
        },
        {
          level: 4,
          body: "Level 3–4: A better question names IV and DV: 'How does the concentration of potassium iodide affect the mass of lead(II) iodide precipitate produced?' IV = concentration of KI; DV = mass of PbI₂ precipitate produced.",
        },
        {
          level: 6,
          body: "Level 5–6: A specific, testable question: 'How does the concentration of potassium iodide solution (0.1–0.5 mol dm⁻³) affect the mass (g) of lead(II) iodide precipitate produced when mixed with 10 cm³ of 0.01 mol dm⁻³ lead(II) nitrate solution?' Names IV with range, DV with units, and one CV.",
        },
        {
          level: 8,
          body: "Level 7–8: An operationalised question specifies how both the DV will be measured and the precision: 'How does the concentration of KI solution (0.1, 0.2, 0.3, 0.4, 0.5 mol dm⁻³, measured with a calibrated 25 cm³ measuring cylinder ±0.5 cm³) affect the dry mass (g ±0.001 g) of PbI₂ precipitate collected by filtration and dried to constant mass, when mixed with exactly 10 cm³ of 0.01 mol dm⁻³ Pb(NO₃)₂?'",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a research question to investigate how one variable affects the mass of lead(II) iodide precipitate produced when lead(II) nitrate and potassium iodide solutions are mixed.",
        scaffolds: [
          "How does...",
          "...affect the mass of lead(II) iodide precipitate...",
          "...when mixed with [volume] of [concentration] lead(II) nitrate...",
          "...at constant [temperature / volume]?",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names the topic or one variable vaguely.",
            keywords: ["lead", "iodide", "potassium", "precipitate", "react", "investigate"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Names IV and DV with direction.",
            keywords: [
              "concentration",
              "mass",
              "precipitate",
              "lead iodide",
              "affect",
              "how does",
              "potassium iodide",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Specific, testable; range stated; at least one CV identified.",
            keywords: [
              "mol dm",
              "0.01",
              "10 cm",
              "range",
              "constant",
              "volume",
              "temperature",
              "pbi2",
              "0.1",
              "0.5",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Operationalised: measurement technique, precision and CV specified.",
            keywords: [
              "measuring cylinder",
              "calibrated",
              "±",
              "dry mass",
              "constant mass",
              "filtration",
              "balance",
              "precision",
              "operationalised",
              "0.001",
            ],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "hypothesis-b",
      name: "Hypothesis",
      descriptor:
        "Predict how increasing the concentration of potassium iodide affects the mass of lead(II) iodide precipitate, with chemical reasoning.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A directional prediction without reasoning: 'If more potassium iodide is added, more precipitate will form.' No chemical explanation is given.",
        },
        {
          level: 4,
          body: "Level 3–4: An if/then hypothesis: 'If the concentration of KI increases, then the mass of PbI₂ precipitate will increase, because there are more iodide ions available to react with lead ions.'",
        },
        {
          level: 6,
          body: "Level 5–6: A hypothesis citing stoichiometry: 'If [KI] increases from 0.1 to 0.5 mol dm⁻³, the mass of PbI₂ precipitate will increase, because from the balanced equation Pb(NO₃)₂(aq) + 2KI(aq) → 2KNO₃(aq) + PbI₂(s), 1 mole of Pb²⁺ requires 2 moles of I⁻. A higher [KI] provides more I⁻ to react with the fixed amount of Pb²⁺, until Pb²⁺ becomes the limiting reagent.'",
        },
        {
          level: 8,
          body: "Level 7–8: A quantitative hypothesis: 'Using 10 cm³ of 0.01 mol dm⁻³ Pb(NO₃)₂: n(Pb²⁺) = 0.010 × 0.01 = 1.0 × 10⁻⁴ mol. From the 1:2 mole ratio, n(KI) required = 2.0 × 10⁻⁴ mol. When [KI] is sufficient (≥ 0.02 mol dm⁻³ in 10 cm³), Pb²⁺ is the limiting reagent and n(PbI₂) = 1.0 × 10⁻⁴ mol → mass = 1.0 × 10⁻⁴ × 461 = 0.0461 g. Above this concentration, mass will plateau. Below, mass is proportional to [KI].'",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a hypothesis predicting how the concentration of KI affects the mass of PbI₂ precipitate. Include a chemical explanation referencing the balanced equation.",
        scaffolds: [
          "If the concentration of potassium iodide increases, then...",
          "because from the balanced equation Pb(NO₃)₂ + 2KI → 2KNO₃ + PbI₂...",
          "The mole ratio of Pb²⁺ to I⁻ is...",
          "Therefore, when [KI] is high enough, the limiting reagent will be...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States a directional prediction about concentration and precipitate.",
            keywords: ["concentration", "precipitate", "increase", "more", "iodide", "lead"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "If/then hypothesis with IV, DV and brief chemical reason.",
            keywords: [
              "if",
              "then",
              "concentration",
              "mass",
              "increases",
              "iodide ions",
              "react",
              "more",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Balanced equation cited; mole ratio used; limiting reagent concept applied.",
            keywords: [
              "balanced equation",
              "mole ratio",
              "1:2",
              "limiting reagent",
              "pb2+",
              "i-",
              "stoichiometry",
              "two moles",
              "one mole",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Quantitative prediction: moles calculated, plateau predicted, limiting reagent identified.",
            keywords: [
              "1.0 × 10",
              "0.0461",
              "461",
              "limiting",
              "plateau",
              "moles",
              "quantitative",
              "calculation",
              "0.01 mol",
              "n =",
            ],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "variables-b",
      name: "Variables",
      descriptor:
        "Classify all variables for the lead(II) iodide precipitation experiment using the Chapter 7 method.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Three variable types: independent (IV) — what you change; dependent (DV) — what you measure; controlled (CVs) — what you keep constant to make the test fair.",
        },
        {
          level: 4,
          body: "Level 3–4: For the Chapter 7 experiment: IV = volume of KI solution (10 cm³) mixed with Pb(NO₃)₂, or alternatively [KI]. DV = mass of PbI₂ precipitate (g) after filtering and drying. Key CVs: volume of Pb(NO₃)₂ (10 cm³), concentration of Pb(NO₃)₂ (0.01 mol dm⁻³), temperature, same filter paper used each time.",
        },
        {
          level: 6,
          body: "Level 5–6: IV: concentration of KI (0.1, 0.2, 0.3, 0.4, 0.5 mol dm⁻³). DV: dry mass of PbI₂ (g ±0.001 g, weighed on an electronic balance after drying to constant mass on a watch glass). CVs: volume of Pb(NO₃)₂ (10 cm³, measured with a 25 cm³ measuring cylinder), [Pb(NO₃)₂] = 0.01 mol dm⁻³, volume of KI (10 cm³), temperature (room temperature ≈ 20°C), grade of filter paper (same box throughout).",
        },
        {
          level: 8,
          body: "Level 7–8: As L6, plus: each CV stated with how it is controlled and why. E.g. 'Volume of Pb(NO₃)₂ controlled with a 25 cm³ measuring cylinder (±0.5 cm³) because changing volume changes moles of Pb²⁺ — the limiting reagent.' Potential systematic error: if the precipitate is not dried to constant mass, residual water adds to the measured mass, making results unreliable. Equipment precision: balance ±0.001 g → absolute uncertainty in mass is 0.001 g; as PbI₂ mass ≈ 0.046 g this is ~2% relative uncertainty.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Identify and classify all variables for the lead(II) iodide precipitation experiment. Include IV, DV, and at least three CVs with control methods.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV):",
          "Controlled variables (CVs):",
          "I will measure the DV using...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one type of variable.",
            keywords: [
              "independent",
              "dependent",
              "variable",
              "concentration",
              "mass",
              "controlled",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "IV and DV named with units.",
            keywords: [
              "independent variable",
              "dependent variable",
              "concentration",
              "mass",
              "mol dm",
              "grams",
              "temperature",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "IV, DV and 3+ CVs named with values and units.",
            keywords: [
              "controlled",
              "volume",
              "10 cm",
              "0.01 mol",
              "temperature",
              "filter paper",
              "balance",
              "electronic",
              "constant mass",
              "dry",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "CVs explained with control method, reason, precision stated, systematic error identified.",
            keywords: [
              "measuring cylinder",
              "limiting reagent",
              "precision",
              "systematic error",
              "dry to constant mass",
              "water",
              "uncertainty",
              "2%",
              "why",
              "control method",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "method-b",
      name: "Method",
      descriptor:
        "Write a safe, step-by-step method for the lead(II) iodide precipitation and filtration experiment from Chapter 7.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Mix the lead nitrate and potassium iodide, then filter.' No volumes, no safety, no drying step.",
        },
        {
          level: 4,
          body: "Level 3–4: Logical sequence: (1) Measure 10 cm³ of Pb(NO₃)₂ and 10 cm³ of KI. (2) Pour both into a 50 cm³ beaker simultaneously. (3) Observe the yellow precipitate. (4) Filter using fluted filter paper. (5) Dry the residue and weigh.",
        },
        {
          level: 6,
          body: "Level 5–6: Numbered steps with volumes, safety, and observation detail: (1) Wear safety glasses and gloves — lead nitrate is toxic and hazardous to the environment; dispose of filtrate as chemical waste. (2) Measure exactly 10 cm³ of 0.01 mol dm⁻³ Pb(NO₃)₂ and 10 cm³ of 0.5 mol dm⁻³ KI using separate 25 cm³ measuring cylinders. (3) Place a 50 cm³ beaker on a white tile. (4) Pour both solutions simultaneously into the beaker; observe the immediate yellow precipitate of PbI₂. (5) Allow to stand 10 minutes, swirl, and pour through fluted filter paper in a funnel. (6) Rinse the beaker with distilled water. (7) Remove filter paper; dry on a watch glass in a warm place. (8) Weigh once dry.",
        },
        {
          level: 8,
          body: "Level 7–8: Adds quantitative detail, repeats and references balanced equation: Steps as L6, plus: dry to constant mass (weigh, reheat, reweigh until mass does not change by more than 0.001 g); repeat each concentration 3 times for reliability; cite the balanced equation Pb(NO₃)₂(aq) + 2KI(aq) → 2KNO₃(aq) + PbI₂(s) to justify stoichiometry of solutions chosen; use 50 cm³ beaker on white paper to observe the characteristic bright yellow precipitate clearly; identify risk of lead contamination on gloves and lab bench — wipe surfaces with damp paper.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a numbered, step-by-step method for the lead(II) iodide experiment: reacting lead(II) nitrate with potassium iodide, filtering the precipitate, drying it and weighing it.",
        scaffolds: [
          "1. Wear safety glasses and disposable gloves because lead nitrate...",
          "2. Measure 10 cm³ of 0.01 mol dm⁻³ lead(II) nitrate using...",
          "3. Measure 10 cm³ of potassium iodide using a separate measuring cylinder...",
          "4. Pour both solutions simultaneously into a 50 cm³ beaker placed on...",
          "5. After 10 minutes, swirl the beaker and pour the mixture through...",
          "6. Remove the filter paper, place it on a watch glass and...",
          "Safety: Lead nitrate is toxic — dispose of filtrate as chemical waste...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Lists materials or gives 1–2 vague steps.",
            keywords: ["lead", "iodide", "filter", "mix", "beaker", "measure"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Logical sequence with 4+ steps.",
            keywords: [
              "measure",
              "pour",
              "filter",
              "dry",
              "weigh",
              "beaker",
              "filter paper",
              "simultaneously",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Numbered steps with volumes, safety, yellow precipitate noted, drying step included.",
            keywords: [
              "10 cm³",
              "safety glasses",
              "gloves",
              "toxic",
              "chemical waste",
              "white tile",
              "yellow",
              "watch glass",
              "dry",
              "25 cm³ measuring cylinder",
            ],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor:
              "Constant mass drying; repeat 3×; balanced equation cited; lead contamination addressed.",
            keywords: [
              "constant mass",
              "0.001 g",
              "repeat",
              "3 times",
              "reliable",
              "balanced equation",
              "1:2",
              "pb(no3)2",
              "ki",
              "contamination",
              "wipe",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
