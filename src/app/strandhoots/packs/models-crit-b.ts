import type { StrandhootPack } from "../engine/types"

export const modelsCritB: StrandhootPack = {
  slug: "models-crit-b",
  title: "Designing a Conductivity Investigation",
  subject: "MYP Chemistry",
  criterion: "B",
  topic: "Investigating conductivity and bonding type",
  accent: "#c0392b",
  icon: "🔋",
  statementOfInquiry:
    "Molecular modelling is used for the visualization of chemical structures, displaying their orientation in space and time.",
  estMinutes: 25,
  intro:
    "The chapter's conductivity investigation links bonding type to a measurable property. Design a focused inquiry into how the concentration of potassium chloride affects the conductivity of its aqueous solution — stepping from a sharp research question and testable hypothesis, through careful variable classification, to a safe, quantitative method.",
  badges: [
    { id: "questioner-b", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq-b", atLevel: 8 },
    { id: "predictor-b", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis-b", atLevel: 8 },
    { id: "controller-b", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables-b", atLevel: 8 },
    { id: "safe-b", label: "Safe Scientist", icon: "🥼", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Conductivity investigation", blurb: "Design an investigation into ionic conductivity", icon: "🔋" }],
  strands: [
    {
      id: "rq-b",
      name: "Research question",
      descriptor: "Write a focused, testable research question for the conductivity investigation from Chapter 9.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A research question names what is being investigated. Vague example: 'Does conductivity depend on concentration?' — too broad, no variables identified, no units.",
        },
        {
          level: 4,
          body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does the concentration of potassium chloride solution affect its electrical conductivity?' IV = concentration; DV = conductivity.",
        },
        {
          level: 6,
          body: "Level 5–6: A specific, testable question: 'How does the concentration of potassium chloride solution (0.5, 1.0, 1.5 mol dm⁻³) affect the electrical conductivity (mS cm⁻¹) of the solution at constant temperature (25°C)?' This names the IV with a range, the DV with units, and one controlled variable (temperature).",
        },
        {
          level: 8,
          body: "Level 7–8: An operationalised question specifies measurement technique and precision: 'How does the concentration of aqueous potassium chloride (0.5, 1.0, 1.5 mol dm⁻³, ±0.01 mol dm⁻³) affect its electrical conductivity (mS cm⁻¹, measured with a calibrated conductivity probe at 25°C ± 0.5°C) at constant volume (50 cm³)?' The question is fully operationalised: instrument named, precision stated, all controlled variables identified.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a research question for an investigation into how the concentration of potassium chloride solution affects its electrical conductivity.",
        scaffolds: [
          "How does the concentration of...",
          "...affect the electrical conductivity of...",
          "...at constant temperature of...",
          "...measured in units of...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names the topic or one variable vaguely.",
            keywords: ["conductivity", "concentration", "potassium chloride", "kcl", "investigate", "solution"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Names IV and DV with clear direction.",
            keywords: ["concentration", "electrical conductivity", "potassium chloride", "how does", "affect", "solution"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "IV range stated; DV has units; one CV identified.",
            keywords: ["0.5", "1.0", "1.5", "mol dm", "ms cm", "temperature", "constant", "25°c", "range", "units"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Operationalised: instrument named, precision stated, all CVs identified.",
            keywords: ["calibrated", "conductivity probe", "±", "precision", "volume", "50 cm", "operationalised", "25°c", "0.01"],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "hypothesis-b",
      name: "Hypothesis",
      descriptor: "Predict how concentration affects conductivity using ionic bonding theory.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A hypothesis makes a directional prediction. 'Higher concentration gives higher conductivity' — a start, but no scientific reasoning is given.",
        },
        {
          level: 4,
          body: "Level 3–4: An if/then hypothesis: 'If the concentration of potassium chloride increases, then the conductivity will increase.' This names IV and DV with direction, but does not explain why.",
        },
        {
          level: 6,
          body: "Level 5–6: A justified hypothesis links prediction to bonding theory: 'If the concentration of KCl increases, then the electrical conductivity will increase, because a higher concentration of KCl means more K⁺ and Cl⁻ ions in the solution. These ions are the charge carriers — more ions means more current can flow, increasing conductivity.'",
        },
        {
          level: 8,
          body: "Level 7–8: A quantitative hypothesis: 'If concentration doubles from 0.5 to 1.0 mol dm⁻³, conductivity is expected to approximately double, since conductivity is proportional to the number of charge-carrying ions in solution. However, at high concentrations, inter-ionic interactions may reduce the mobility of individual ions, so the increase may become non-linear above ~1.5 mol dm⁻³.'",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a hypothesis predicting how the concentration of potassium chloride solution affects its conductivity. Include a scientific explanation using ionic bonding theory.",
        scaffolds: [
          "If the concentration of KCl increases, then...",
          "because more K⁺ and Cl⁻ ions...",
          "These ions are charge carriers — more ions means...",
          "At high concentrations, however...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States a directional prediction.",
            keywords: ["concentration", "conductivity", "increase", "higher", "kcl", "solution"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "If/then structure with IV and DV named.",
            keywords: ["if", "then", "concentration", "conductivity", "increases", "potassium chloride"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Prediction linked to number of ions as charge carriers.",
            keywords: ["ions", "charge carriers", "k+", "cl-", "more ions", "current", "conduct", "mobile", "solution"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Quantitative prediction; non-linearity at high concentration noted.",
            keywords: ["doubles", "proportional", "non-linear", "inter-ionic", "mobility", "0.5", "1.0", "high concentration", "quantitative"],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "variables-b",
      name: "Variables",
      descriptor: "Classify all variables for the conductivity investigation and give control methods.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant).",
        },
        {
          level: 4,
          body: "Level 3–4: IV = concentration of KCl solution (mol dm⁻³). DV = electrical conductivity of the solution (mS cm⁻¹). Controlled variables include temperature and volume of solution.",
        },
        {
          level: 6,
          body: "Level 5–6: IV: concentration of KCl (0.5, 1.0, 1.5 mol dm⁻³). DV: conductivity reading (mS cm⁻¹ ± 0.1, from calibrated conductivity probe). CVs: volume of solution (50 cm³), temperature (25°C ± 0.5°C, water bath), type of solute (KCl only), electrode geometry (same probe throughout).",
        },
        {
          level: 8,
          body: "Level 7–8: As L6, plus: each CV is stated with how it is controlled and why it matters. 'Temperature is controlled using a water bath at 25°C because temperature affects the mobility of ions — a 1°C rise increases conductivity by ~2%, making it a significant systematic error. Volume is measured using a calibrated 50 cm³ measuring cylinder (±0.5 cm³) to ensure the probe geometry is consistent. The probe is rinsed with distilled water between measurements to prevent cross-contamination.' Possible systematic error: if probe is not re-calibrated between runs, readings may drift.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Identify and classify all variables for the investigation into how KCl concentration affects electrical conductivity.",
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
            keywords: ["independent", "dependent", "variable", "concentration", "conductivity", "control"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "IV and DV named with units.",
            keywords: ["independent variable", "dependent variable", "mol dm", "ms cm", "conductivity", "concentration", "kcl"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "IV, DV and 3+ CVs named with values and units.",
            keywords: ["temperature", "volume", "50 cm", "25°c", "probe", "electrode", "0.5 mol", "1.0 mol", "1.5 mol", "controlled"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "CVs with control method and reason stated; systematic error identified.",
            keywords: ["water bath", "calibrated", "ion mobility", "2%", "systematic error", "rinsed", "distilled water", "cross-contamination", "drift", "precision"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "method-b",
      name: "Method",
      descriptor: "Write a safe, numbered method for the conductivity investigation.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Lists materials and gives 1–2 vague steps: 'Mix KCl in water and measure conductivity.' — no volumes, no concentrations, no safety.",
        },
        {
          level: 4,
          body: "Level 3–4: Steps in logical order: (1) Prepare three KCl solutions. (2) Transfer 50 cm³ to a beaker. (3) Place conductivity probe in solution. (4) Record reading. (5) Rinse probe. (6) Repeat for remaining solutions.",
        },
        {
          level: 6,
          body: "Level 5–6: Clear numbered steps with volumes, concentrations and safety: (1) Wear safety glasses. (2) Use a calibrated balance to dissolve the correct mass of KCl in 100 cm³ of distilled water to prepare 0.5, 1.0 and 1.5 mol dm⁻³ solutions. (3) Transfer 50 cm³ to a 100 cm³ beaker labelled with concentration. (4) Place beaker in water bath at 25°C; allow 5 min to equilibrate. (5) Insert conductivity probe; record reading in mS cm⁻¹. (6) Remove probe, rinse with distilled water, dry with paper towel. (7) Repeat steps 4–6 for each concentration. (8) Repeat entire experiment 3 times for each concentration.",
        },
        {
          level: 8,
          body: "Level 7–8: Adds quantitative detail (mass of KCl needed per concentration calculated using n = cV), explains calibration of conductivity probe using a standard solution, states the balanced equation for KCl dissolving: KCl(s) → K⁺(aq) + Cl⁻(aq), identifies the risk (KCl solutions are irritants in high concentration), describes how to confirm equilibration to temperature, and specifies that the probe must not touch the beaker walls. Repeat 3 times at each concentration for reliability; calculate mean and uncertainty.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a numbered, step-by-step method for the conductivity investigation using KCl solutions of 0.5, 1.0 and 1.5 mol dm⁻³.",
        scaffolds: [
          "1. Wear safety glasses. Prepare 100 cm³ of each KCl solution by...",
          "2. Transfer 50 cm³ of each solution into a labelled 100 cm³ beaker...",
          "3. Place the beaker in a water bath at 25°C and allow...",
          "4. Insert the conductivity probe and record the reading in mS cm⁻¹...",
          "5. Rinse the probe with distilled water between measurements to...",
          "6. Repeat 3 times for each concentration to ensure reliability.",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Lists materials only or gives 1–2 vague steps.",
            keywords: ["kcl", "water", "probe", "conductivity", "measure", "mix"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Logical sequence with 4+ steps.",
            keywords: ["prepare", "transfer", "beaker", "probe", "record", "rinse", "50 cm", "repeat"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Numbered steps with volumes, concentrations, temperature control and safety.",
            keywords: ["50 cm³", "0.5 mol", "1.0 mol", "1.5 mol", "safety glasses", "water bath", "25°c", "distilled water", "rinse", "3 times"],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor: "Calibration stated; KCl equation given; reliability with repeats; systematic error addressed.",
            keywords: ["calibrate", "standard solution", "kcl(s)", "k+", "cl-", "n = cv", "mass", "reliability", "mean", "uncertainty", "3 times"],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
