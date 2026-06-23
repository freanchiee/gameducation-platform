import type { StrandhootPack } from "../engine/types"

export const formCritB: StrandhootPack = {
  slug: "form-crit-b",
  title: "Designing a Filtration Investigation",
  subject: "MYP Chemistry",
  criterion: "B",
  topic: "Investigating separation of mixtures by filtration",
  accent: "#c0392b",
  icon: "🧫",
  statementOfInquiry:
    "Observing and describing the properties of a substance helps us to understand its identity and how it interacts with the environment.",
  estMinutes: 27,
  intro:
    "Design an investigation into the separation of a heterogeneous mixture by filtration — the same technique used in Chapter 6 to separate iron(III) carbonate from the filtrate. Each strand builds one component of a complete scientific design: research question, hypothesis, variables, and method.",
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
      id: "methodwriter",
      label: "Safe Scientist",
      icon: "🥼",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Filtration investigation",
      blurb: "Design a fair test of how particle size affects filtration rate",
      icon: "🧫",
    },
  ],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question about filtration of a heterogeneous mixture.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A research question names what you are looking at. Vague example: 'Does filtration work to separate mixtures?' — too broad, no specific variable named.",
        },
        {
          level: 4,
          body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does the concentration of iron(III) nitrate solution affect the mass of precipitate collected by filtration?' — IV = concentration; DV = mass of precipitate.",
        },
        {
          level: 6,
          body: "Level 5–6: A specific, testable question: 'How does the concentration of sodium carbonate solution (0.1–0.5 mol dm⁻³) affect the mass (g) of iron(III) carbonate precipitate collected by filtration, when reacted with 0.5 mol dm⁻³ iron(III) nitrate solution at constant temperature (20°C)?' — IV, DV, range and a controlled variable all stated.",
        },
        {
          level: 8,
          body: "Level 7–8: An operationalised question specifies how the DV is measured: '...affect the dry mass (g ± 0.001 g, measured on an analytical balance after drying on a watch glass for 24 h) of iron(III) carbonate precipitate collected by filtration using standard filter paper (Grade 1 Whatman)?' — measurement technique, precision, and equipment named.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a research question to investigate how the concentration of sodium carbonate solution affects the amount of iron(III) carbonate precipitate collected by filtration after mixing with iron(III) nitrate solution.",
        scaffolds: [
          "How does the concentration of sodium carbonate solution...",
          "...affect the mass of precipitate collected...",
          "...when reacted with 0.5 mol dm⁻³ iron(III) nitrate...",
          "...at constant temperature of...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names the topic or one variable vaguely.",
            keywords: ["filtration", "precipitate", "iron", "sodium carbonate", "concentration", "mixture"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Names IV and DV clearly with direction.",
            keywords: ["concentration", "mass", "precipitate", "how does", "affect", "iron", "sodium carbonate"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Specific, testable; IV range stated; one controlled variable identified.",
            keywords: ["0.1", "0.5", "mol dm", "constant", "temperature", "iron(iii) nitrate", "iron(iii) carbonate", "20°c", "range"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Operationalised: measurement technique and precision specified.",
            keywords: ["analytical balance", "dry mass", "±0.001", "filter paper", "whatman", "grade 1", "drying", "watch glass", "precision", "24 h"],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict the relationship between sodium carbonate concentration and precipitate mass, with scientific reasoning.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A directional prediction: 'Higher concentration of sodium carbonate will produce more precipitate.' — A good start, but gives no chemical reasoning.",
        },
        {
          level: 4,
          body: "Level 3–4: An if/then hypothesis: 'If the concentration of sodium carbonate increases, then more iron(III) carbonate precipitate will form.' — IV and DV named with direction, but missing a chemical explanation.",
        },
        {
          level: 6,
          body: "Level 5–6: A chemically justified hypothesis: 'If the concentration of Na₂CO₃ increases from 0.1 to 0.5 mol dm⁻³, the mass of iron(III) carbonate precipitate will increase, because the reaction 2Fe(NO₃)₃(aq) + 3Na₂CO₃(aq) → Fe₂(CO₃)₃(s) + 6NaNO₃(aq) produces more moles of insoluble product when more carbonate ions are present — the iron(III) nitrate is the limiting reagent at low Na₂CO₃ concentrations, and increasing Na₂CO₃ drives more product to form.'",
        },
        {
          level: 8,
          body: "Level 7–8: A quantitative hypothesis: 'Using stoichiometry, 2 mol Fe(NO₃)₃ reacts with 3 mol Na₂CO₃. With 10 cm³ of 0.5 mol dm⁻³ Fe(NO₃)₃, the moles of Fe³⁺ = 0.005 mol; the stoichiometric amount of Na₂CO₃ needed is 0.0075 mol. At Na₂CO₃ concentrations below ~0.75 mol dm⁻³ in 10 cm³, the carbonate is the limiting reagent and precipitate mass will increase proportionally with Na₂CO₃ concentration. Above this, Fe³⁺ becomes limiting and mass plateaus.'",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a hypothesis predicting how increasing the concentration of sodium carbonate solution affects the mass of iron(III) carbonate precipitate formed. Include a scientific or mathematical justification.",
        scaffolds: [
          "If the concentration of sodium carbonate increases, then...",
          "because the equation 2Fe(NO₃)₃(aq) + 3Na₂CO₃(aq) → Fe₂(CO₃)₃(s) + 6NaNO₃(aq) shows...",
          "At low Na₂CO₃ concentrations, the limiting reagent is...",
          "The mass of precipitate will increase until...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States a prediction about concentration and precipitate.",
            keywords: ["precipitate", "concentration", "increases", "more", "sodium carbonate", "iron"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "If/then structure naming IV and DV with direction.",
            keywords: ["if", "then", "concentration", "mass", "precipitate", "increases", "more"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Chemical equation cited; limiting reagent concept applied.",
            keywords: ["equation", "fe(no3)3", "na2co3", "limiting reagent", "moles", "insoluble", "carbonate ions", "product", "stoichiometry"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Quantitative prediction with mole calculation; plateau explained.",
            keywords: ["0.005 mol", "0.0075", "stoichiometric", "2:3", "limiting", "plateau", "proportional", "moles", "0.5 mol dm", "quantitative"],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables for the filtration investigation, including how each controlled variable will be maintained.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: There are three types of variable: independent (IV — what you change), dependent (DV — what you measure), and controlled (CVs — what you keep constant to make it a fair test).",
        },
        {
          level: 4,
          body: "Level 3–4: For this investigation: IV = concentration of Na₂CO₃ (mol dm⁻³); DV = dry mass of iron(III) carbonate precipitate (g). Controlled variables include: volume of Fe(NO₃)₃ solution, concentration of Fe(NO₃)₃, temperature, and the grade of filter paper used.",
        },
        {
          level: 6,
          body: "Level 5–6: IV: [Na₂CO₃] at 0.1, 0.2, 0.3, 0.4, 0.5 mol dm⁻³ (5 values). DV: dry mass of Fe₂(CO₃)₃ precipitate (g ± 0.01 g, using a balance). CVs: volume of Fe(NO₃)₃ (10 cm³, measured with a measuring cylinder), concentration of Fe(NO₃)₃ (0.5 mol dm⁻³), temperature (20°C, room temperature), grade of filter paper (standard, Grade 1), volume of distilled wash water (5 cm³ per wash).",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus each CV stated with method of control and reason: 'Temperature controlled by carrying out all experiments in the same room at the same time — temperature affects both solubility and reaction rate, so a consistent temperature ensures a fair comparison.' 'Filter paper grade controlled by using Whatman Grade 1 throughout — different grades have different pore sizes, which would affect filtration rate and residue retention.' Instrumental precision: analytical balance (±0.001 g) rather than a basic balance for a more accurate dry mass. Possible systematic error: incomplete drying of the precipitate would cause the measured mass to exceed the true dry mass.",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Identify and classify all variables for an investigation into how the concentration of sodium carbonate affects the mass of iron(III) carbonate precipitate collected by filtration. For Level 8, explain how each controlled variable is maintained and why.",
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
            keywords: ["independent", "dependent", "variable", "concentration", "mass", "controlled"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "IV and DV named with units.",
            keywords: ["independent variable", "dependent variable", "concentration", "mass", "mol dm", "grams", "precipitate"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "IV, DV and 3+ CVs named with values/units.",
            keywords: ["controlled", "temperature", "volume", "10 cm³", "filter paper", "0.5 mol", "balance", "grade 1", "wash"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "CVs explained with control method, reason and precision stated.",
            keywords: ["systematic error", "drying", "analytical balance", "±0.001", "pore size", "whatman", "temperature affects", "fair comparison", "reason", "precision"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, numbered step-by-step method for separating iron(III) carbonate from the filtrate by filtration.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Lists materials only or gives 1–2 vague steps: 'Mix iron(III) nitrate and sodium carbonate, then filter.' — no volumes, no safety, no drying step.",
        },
        {
          level: 4,
          body: "Level 3–4: Steps in a logical sequence: (1) Measure 10 cm³ of 0.5 mol dm⁻³ iron(III) nitrate into a beaker. (2) Measure 10 cm³ of sodium carbonate solution and add to the beaker. (3) Observe the brown precipitate. (4) Set up filtration apparatus. (5) Pour the mixture through the filter funnel. (6) Dry the residue.",
        },
        {
          level: 6,
          body: "Level 5–6: Clear numbered steps including safety (wear safety glasses; dispose of residues appropriately — iron compounds should not go down the drain). Steps specify volumes exactly (10 cm³ of each solution using a measuring cylinder), fluting the filter paper, washing the residue with 5 cm³ of distilled water to remove soluble NaNO₃ from the precipitate, drying the filter paper with residue on a watch glass in a warm location, and massing the dry residue. Each step is numbered.",
        },
        {
          level: 8,
          body: "Level 7–8: Adds quantitative detail (weigh the dry filter paper before and after to find mass of precipitate by difference), repeats 3× for each Na₂CO₃ concentration for reliability, states the balanced equation 2Fe(NO₃)₃(aq) + 3Na₂CO₃(aq) → Fe₂(CO₃)₃(s) + 6NaNO₃(aq), explains why fluted filter paper increases the rate of filtration (larger surface area), specifies drying time and temperature (e.g. in an oven at 70°C for 30 min), and identifies how to confirm complete drying (re-weigh after further drying — constant mass).",
        },
      ],
      response: {
        kind: "design",
        prompt:
          "Write a numbered, step-by-step method for the filtration experiment: reacting iron(III) nitrate solution with sodium carbonate solution to produce iron(III) carbonate precipitate, then separating and drying the precipitate.",
        scaffolds: [
          "1. Measure 10 cm³ of 0.5 mol dm⁻³ iron(III) nitrate solution...",
          "2. Add the sodium carbonate solution of concentration...",
          "3. Fold the filter paper into a cone shape (fluted) and place in the filter funnel...",
          "4. Pour the mixture slowly onto the filter paper...",
          "5. Wash the residue with 5 cm³ of distilled water to remove...",
          "Safety: wear safety glasses; dispose of residues...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Lists materials or gives 1–2 vague steps.",
            keywords: ["iron", "sodium carbonate", "filter", "mix", "beaker", "precipitate"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Logical sequence with 5+ steps including filtration and drying.",
            keywords: ["measure", "add", "filter", "funnel", "dry", "residue", "beaker", "wash", "weigh"],
            minKeywords: 3,
          },
          {
            level: 6,
            descriptor: "Numbered steps with exact volumes; wash step; safety; drying on watch glass.",
            keywords: ["10 cm³", "fluted", "filter paper", "safety glasses", "wash", "distilled water", "watch glass", "warm", "residue", "dispose"],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor: "Pre-weighed filter paper; repeat 3×; balanced equation cited; constant mass drying.",
            keywords: ["pre-weigh", "difference", "3 times", "repeat", "balanced equation", "2fe(no3)3", "3na2co3", "fluted surface area", "constant mass", "oven"],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
