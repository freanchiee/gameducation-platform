import type { StrandhootPack } from "../engine/types"

export const evidenceCritB: StrandhootPack = {
  slug: "evidence-crit-b",
  title: "Designing the Catalytic Cracking Investigation",
  subject: "MYP Chemistry",
  criterion: "B",
  topic: "Investigating catalytic cracking of paraffin",
  accent: "#c0392b",
  icon: "🧪",
  statementOfInquiry:
    "Our ability to collect evidence improves with advances in science and technical innovations.",
  estMinutes: 28,
  intro:
    "Design a rigorous investigation into the catalytic cracking of liquid paraffin — a real experiment from Chapter 2 that produces a mixture of smaller alkanes and alkenes from large hydrocarbon chains. Step through each phase of inquiry: sharpen your research question, predict outcomes with a justified hypothesis, classify all variables, and write a safe, detailed method.",
  badges: [
    {
      id: "questioner-b",
      label: "Sharp Question",
      icon: "❓",
      description: "Reach Level 8 on Research question",
      strandId: "rq",
      atLevel: 8,
    },
    {
      id: "predictor-b",
      label: "Bold Predictor",
      icon: "🔮",
      description: "Reach Level 8 on Hypothesis",
      strandId: "hypothesis",
      atLevel: 8,
    },
    {
      id: "controller-b",
      label: "Variable Master",
      icon: "🎛️",
      description: "Reach Level 8 on Variables",
      strandId: "variables",
      atLevel: 8,
    },
    {
      id: "safe-scientist-b",
      label: "Safe Scientist",
      icon: "🥼",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Catalytic cracking investigation",
      blurb: "Design an investigation into the catalytic cracking of liquid paraffin",
      icon: "⚗️",
    },
  ],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor:
        "Write a focused, testable research question for a catalytic cracking investigation.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A vague question names the topic but lacks a measurable variable. 'Does catalytic cracking of paraffin produce gas?' — this is not testable in a controlled way. It does not specify what you will change or measure.",
        },
        {
          level: 4,
          body: "Level 3–4: A better question names both the independent variable (IV) and dependent variable (DV). 'How does the amount of catalyst affect the volume of gas produced during catalytic cracking of liquid paraffin?' IV = mass of catalyst; DV = volume of gas collected.",
        },
        {
          level: 6,
          body: "Level 5–6: A specific, testable research question with range, units and a controlled variable: 'How does the mass of pumice stone catalyst (0.5, 1.0, 1.5, 2.0, 2.5 g) affect the total volume of gas (cm³) collected by displacement of water during the catalytic cracking of 2 cm³ liquid paraffin at constant heating time (3 min)?' This names IV, DV, a range, and at least one controlled variable.",
        },
        {
          level: 8,
          body: "Level 7–8: An operationalised question also specifies the measurement technique and precision: 'How does the mass of pumice stone catalyst (0.5–2.5 g, measured to ±0.01 g on an electronic balance) affect the total volume of gas (cm³ ± 0.5 cm³, measured using a gas syringe) collected over 3 minutes during the catalytic cracking of 2.0 cm³ (±0.05 cm³) liquid paraffin at constant temperature?' It specifies the measurement instrument, its precision and the controlled conditions.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a research question to investigate how one variable affects the catalytic cracking of liquid paraffin.",
        scaffolds: [
          "How does...",
          "...affect the volume of gas produced...",
          "...during the catalytic cracking of liquid paraffin...",
          "...at constant [heating time / temperature / paraffin volume] of...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names the topic or one variable vaguely.",
            keywords: [
              "paraffin",
              "cracking",
              "catalyst",
              "gas",
              "investigate",
              "alkene",
              "alkane",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Names IV and DV with clear direction.",
            keywords: [
              "catalyst",
              "volume",
              "gas",
              "how does",
              "affect",
              "mass",
              "independent",
              "dependent",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Specific, testable; range stated; controlled variable identified; units present.",
            keywords: [
              "range",
              "cm³",
              "g",
              "constant",
              "pumice",
              "volume of gas",
              "heating time",
              "2 cm³",
              "paraffin",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Operationalised: measurement instrument and precision stated for IV and DV.",
            keywords: [
              "electronic balance",
              "±0.01",
              "gas syringe",
              "±0.5",
              "precision",
              "operationalised",
              "instrument",
              "±",
              "measure",
            ],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor:
        "Predict how increasing catalyst mass affects gas yield during catalytic cracking, with scientific reasoning.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A directional prediction without reasoning. 'More catalyst will make more gas.' — a start, but no scientific basis is given for why.",
        },
        {
          level: 4,
          body: "Level 3–4: An if/then hypothesis with IV and DV named. 'If the mass of pumice stone catalyst increases, then the volume of gas produced during catalytic cracking will increase.' This names IV and DV and gives a direction, but does not explain why.",
        },
        {
          level: 6,
          body: "Level 5–6: A justified hypothesis linking to catalytic mechanism: 'If the mass of pumice stone catalyst increases from 0.5 g to 2.5 g, then the volume of gas collected will increase, because a larger mass of catalyst provides a greater surface area on which paraffin vapour molecules can adsorb and undergo cracking. More active sites are available, so more large hydrocarbon molecules are broken down per unit time, producing more small alkane and alkene gas molecules.'",
        },
        {
          level: 8,
          body: "Level 7–8: A quantitatively calibrated hypothesis with an upper limit: 'If catalyst mass increases from 0.5 g to 2.5 g, gas volume will increase — possibly proportionally at low catalyst masses — but will plateau beyond a certain mass because the limiting factor shifts from catalyst surface area to the rate of vaporisation of liquid paraffin. The catalyst is not consumed, so above the saturation point, adding more catalyst yields diminishing returns. Bromine water decolourisation of the product gas would confirm the presence of alkene (C=C), and a burning splint test would confirm combustible alkane gases are present.'",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a hypothesis predicting how catalyst mass affects gas yield during catalytic cracking. Include a scientific explanation.",
        scaffolds: [
          "If the mass of catalyst increases, then...",
          "because a larger catalyst mass provides...",
          "...more surface area / active sites, which means...",
          "However, beyond a certain mass, the rate may plateau because...",
          "The products can be identified by...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States a directional prediction about catalyst and gas.",
            keywords: ["catalyst", "gas", "increase", "more", "cracking", "paraffin"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "If/then structure with IV and DV named.",
            keywords: ["if", "then", "catalyst", "volume", "increase", "gas", "paraffin"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Catalyst mechanism referenced: surface area and active sites.",
            keywords: [
              "surface area",
              "active sites",
              "adsorb",
              "cracking",
              "molecules",
              "alkene",
              "alkane",
              "broken",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Upper limit / plateau predicted with limiting factor identified; analytical tests named.",
            keywords: [
              "plateau",
              "diminishing",
              "limiting factor",
              "vaporisation",
              "bromine water",
              "splint",
              "alkene",
              "confirmation",
              "saturated",
            ],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor:
        "Classify all variables for the catalytic cracking of liquid paraffin investigation.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Names one of the three variable types (IV, DV or CVs) without full detail. 'I will change the amount of catalyst and measure the gas.'",
        },
        {
          level: 4,
          body: "Level 3–4: IV and DV named with units. IV: mass of pumice stone catalyst (g); DV: volume of gas collected by water displacement (cm³). At least one CV: volume of liquid paraffin used (2 cm³).",
        },
        {
          level: 6,
          body: "Level 5–6: IV, DV and at least 3 CVs named with values and units. IV: mass of pumice stone catalyst (0.5, 1.0, 1.5, 2.0, 2.5 g). DV: volume of gas collected in test tubes by water displacement (cm³, ±0.5 cm³ using a gas syringe). CVs: volume of liquid paraffin (2.0 cm³), heating time (3 min per trial), type and mesh size of catalyst (pumice stone, 2–3 spatulas), tube setup (same boiling tube and delivery tube dimensions).",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus each CV stated with the specific control method and the reason why it must be controlled. Example: 'Volume of paraffin is controlled at 2.0 cm³ (±0.05 cm³ using a dropping pipette) because varying the paraffin volume would change the total substrate available and confound the effect of catalyst mass on gas yield.' Also identifies a potential systematic error: suck-back — if the delivery tube is removed from the water after heating stops, water is sucked into the hot tube; this is controlled by lifting the tube from the water before stopping the Bunsen burner.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Identify and classify all variables for an investigation into how catalyst mass affects the volume of gas produced during catalytic cracking of liquid paraffin.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV):",
          "Controlled variables (CVs):",
          "I will measure the DV using...",
          "I will control [CV] by... because if this is not controlled...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one type of variable.",
            keywords: ["independent", "dependent", "variable", "catalyst", "volume", "control"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "IV and DV named with units.",
            keywords: [
              "independent variable",
              "dependent variable",
              "mass",
              "volume",
              "cm³",
              "g",
              "catalyst",
              "gas",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "IV, DV and 3+ CVs named with values/units.",
            keywords: [
              "controlled",
              "volume of paraffin",
              "2.0 cm³",
              "heating time",
              "3 min",
              "pumice",
              "gas syringe",
              "same",
              "constant",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "CVs explained with control method, reason, and a systematic error identified.",
            keywords: [
              "confound",
              "dropping pipette",
              "±0.05",
              "suck-back",
              "delivery tube",
              "systematic error",
              "control method",
              "because",
              "why",
              "accuracy",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor:
        "Write a safe, numbered, step-by-step method for the catalytic cracking of liquid paraffin.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Lists some materials but gives only 1–2 vague steps: 'Heat the paraffin with catalyst and collect the gas.' — no volumes, no safety, no analytical tests.",
        },
        {
          level: 4,
          body: "Level 3–4: Steps in a logical sequence: (1) Set up the boiling tube with mineral wool soaked in 2 cm³ paraffin. (2) Place catalyst in the centre. (3) Connect to delivery tube leading to an inverted water-filled test tube. (4) Heat the catalyst strongly. (5) Collect gas by water displacement. (6) Test gas with a lit splint.",
        },
        {
          level: 6,
          body: "Level 5–6: Numbered steps with volumes and safety: (1) Place mineral wool to depth 2 cm; add 2 cm³ liquid paraffin by dropping pipette. (2) Add 2–3 spatulas of pumice stone catalyst to centre of boiling tube. (3) Clamp setup; connect delivery tube to inverted water-filled test tubes. (4) Safety: wear eye protection; use a safety screen; ensure good ventilation. (5) Strongly heat the catalyst region for 3 minutes. (6) Pass flame over paraffin to vaporise it. (7) Collect 4 test tubes of gas. (8) BEFORE stopping heating, lift delivery tube from water to prevent suck-back. (9) Test gas: lit splint (flammable?), 2–3 drops bromine water (alkene present?).",
        },
        {
          level: 8,
          body: "Level 7–8: Adds quantitative detail and controls for reliability: specifies repeating 3× per catalyst mass and calculating a mean, records volume collected in each test tube, states the balanced equation for a cracking example (e.g. C₁₅H₃₂ → C₈H₁₈ + C₃H₆ + C₂H₄ + H₂ — not balanced — or the general concept), explains why the first test tube may contain mostly air and is discarded, describes the bromine water and potassium manganate(VII) tests for alkene confirmation, and lists the specific suck-back risk and its mitigation at step 8.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a numbered, step-by-step method for the catalytic cracking of liquid paraffin experiment, including all safety precautions and the analytical tests for the products.",
        scaffolds: [
          "1. Place mineral wool to a depth of 2 cm in the boiling tube...",
          "2. Drop 2 cm³ of liquid paraffin onto the mineral wool using...",
          "3. Add 2–3 spatulas of pumice stone catalyst to the centre of...",
          "4. Connect the delivery tube to inverted water-filled test tubes...",
          "5. Strongly heat the catalyst region for 3 minutes...",
          "Safety: wear eye protection; BEFORE stopping the Bunsen, lift the delivery tube from the water to prevent suck-back because...",
          "Analytical tests: add 2–3 drops of bromine water to one sample to test for...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Lists materials or gives 1–2 vague steps.",
            keywords: ["paraffin", "catalyst", "heat", "gas", "collect", "test tube"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Logical sequence with 4+ steps.",
            keywords: [
              "mineral wool",
              "catalyst",
              "heat",
              "collect",
              "delivery tube",
              "water",
              "splint",
              "test",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Numbered steps with volumes; safety precautions; analytical tests; suck-back prevention mentioned.",
            keywords: [
              "2 cm³",
              "2–3 spatulas",
              "eye protection",
              "safety screen",
              "suck-back",
              "lift",
              "bromine water",
              "splint",
              "decolourises",
              "ventilation",
            ],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor:
              "Repeats 3× for reliability; first tube discarded; both bromine water and potassium manganate(VII) tests described; suck-back mitigation explained.",
            keywords: [
              "repeat",
              "3 times",
              "mean",
              "first tube",
              "air",
              "discard",
              "potassium manganate",
              "bromine water",
              "decolourises",
              "alkene",
              "suck-back",
              "reliable",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
