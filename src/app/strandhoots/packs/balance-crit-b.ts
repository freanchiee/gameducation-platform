import type { StrandhootPack } from "../engine/types"

export const balanceCritB: StrandhootPack = {
  slug: "balance-crit-b",
  title: "Designing a Haber Process Investigation",
  subject: "MYP Chemistry",
  criterion: "B",
  topic: "Investigating equilibrium conditions",
  accent: "#c0392b",
  icon: "🏭",
  statementOfInquiry: "Imbalanced relationships affect finite resources, both locally and globally.",
  estMinutes: 25,
  intro:
    "Design an investigation into chemical equilibrium in the Haber process. Each strand takes you one step further — from crafting a sharp research question and testable hypothesis, to classifying variables and writing a safe, step-by-step method.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe", label: "Safe Scientist", icon: "🥼", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Equilibrium investigation", blurb: "Design an investigation into the Haber process", icon: "🏭" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for a Haber process equilibrium investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A research question names what you are investigating. Vague example: 'Does the Haber process make ammonia?' — too broad, not testable as a controlled experiment." },
        { level: 4, body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does temperature affect the yield of ammonia in the Haber process?' IV = temperature; DV = yield of ammonia." },
        { level: 6, body: "Level 5–6: A specific, testable question: 'How does temperature (300–600°C) affect the equilibrium yield (%) of ammonia in the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) at constant pressure of 200 atm?' This names the IV, DV, the reaction, a range, and a controlled variable." },
        { level: 8, body: "Level 7–8: An operationalised question specifies how measurement is done: 'How does temperature (300–600°C, measured with a calibrated thermocouple to ±2°C) affect the mole fraction of NH₃ at equilibrium at constant pressure (200 atm) in the Haber process?' It includes measurement technique, precision, and controlled conditions." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate how one variable affects the equilibrium yield of ammonia in the Haber process.",
        scaffolds: [
          "How does...",
          "...affect the equilibrium yield of ammonia...",
          "...in the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g)...",
          "...at constant [pressure / temperature] of...",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["haber", "ammonia", "investigate", "temperature", "pressure", "equilibrium"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV with clear direction.", keywords: ["temperature", "pressure", "yield", "ammonia", "how does", "affect", "equilibrium"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; range stated; reaction named; one CV identified.", keywords: ["yield", "equilibrium", "range", "°c", "atm", "n2", "h2", "nh3", "constant", "300", "600"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: measurement technique and precision specified.", keywords: ["thermocouple", "mole fraction", "calibrated", "±", "constant pressure", "200 atm", "precision", "measure", "operationalised"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict how pressure affects the yield of ammonia, with scientific reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A hypothesis makes a directional prediction. 'Higher pressure makes more ammonia' — this is a start, but gives no scientific reasoning." },
        { level: 4, body: "Level 3–4: An if/then hypothesis: 'If pressure increases, then the yield of ammonia will increase.' This names IV and DV and gives a direction, but lacks explanation." },
        { level: 6, body: "Level 5–6: A justified hypothesis cites Le Chatelier's principle: 'If pressure increases, the equilibrium yield of NH₃ will increase, because Le Chatelier's principle states the system shifts toward the side with fewer moles of gas. The product side (2 mol NH₃) has fewer moles than the reactant side (4 mol: 1N₂ + 3H₂), so increasing pressure favours the forward reaction.'" },
        { level: 8, body: "Level 7–8: A quantitative hypothesis: 'If pressure doubles from 200 to 400 atm at 450°C, the equilibrium yield of NH₃ will increase from approximately 15% to ~25%. Le Chatelier's principle predicts a right shift (fewer gas moles on product side: 2 mol vs 4 mol). However, Kc is unchanged — only the equilibrium position shifts. Above 400 atm, diminishing returns are expected as the equilibrium approaches its maximum.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how pressure affects the yield of ammonia in the Haber process. Include a scientific explanation.",
        scaffolds: [
          "If pressure increases, then...",
          "because Le Chatelier's principle states...",
          "The reactant side has ___ moles of gas and the product side has ___ moles...",
          "Therefore, increasing pressure will shift the equilibrium to the...",
        ],
        rubric: [
          { level: 2, descriptor: "States a prediction about pressure and ammonia.", keywords: ["pressure", "ammonia", "yield", "increase", "more", "haber"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named.", keywords: ["if", "then", "pressure", "yield", "ammonia", "increases", "forward"], minKeywords: 2 },
          { level: 6, descriptor: "Le Chatelier applied with moles comparison.", keywords: ["le chatelier", "moles", "gas", "fewer", "product", "2 mol", "4 mol", "shift", "forward"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative prediction with Kc unchanged noted.", keywords: ["15%", "25%", "200 atm", "400 atm", "kc", "unchanged", "equilibrium position", "quantitative", "diminishing"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables for a neutralisation experiment making ammonium sulfate.",
      guided: [
        { level: 2, body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair)." },
        { level: 4, body: "Level 3–4: For an experiment investigating how the concentration of H₂SO₄ affects the volume of NH₃ solution needed to neutralise it: IV = concentration of H₂SO₄ (mol dm⁻³); DV = volume of NH₃ solution at pH 7 (cm³)." },
        { level: 6, body: "Level 5–6: IV: [H₂SO₄] (0.5, 1.0, 1.5, 2.0 mol dm⁻³). DV: volume of 1.0 mol dm⁻³ NH₃ added when pH = 7 (cm³ ± 0.05 cm³, using a burette). CVs: volume of H₂SO₄ (20 cm³), temperature (20°C), type of indicator (universal indicator paper), concentration of NH₃ (1.0 mol dm⁻³)." },
        { level: 8, body: "Level 7–8: As L6, plus: each CV stated with how it is controlled ('temperature controlled using a water bath at 20°C') and why ('temperature affects the indicator colour change and rate of neutralisation'). Instrumental precision: pH electrode (±0.01 pH units) is more precise than universal indicator paper. A possible systematic error: if the pH meter is not calibrated against buffer solutions, the endpoint will be inaccurate." },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for an experiment investigating how the concentration of sulfuric acid affects the volume of ammonia solution needed to neutralise it (reach pH 7).",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV):",
          "Controlled variables (CVs):",
          "I will measure the DV using...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "variable", "concentration", "volume", "control"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units.", keywords: ["independent variable", "dependent variable", "concentration", "volume", "mol dm", "cm³", "ph 7"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV and 3+ CVs named with values/units.", keywords: ["controlled", "temperature", "volume of acid", "20 cm³", "universal indicator", "concentration of ammonia", "burette", "1.0 mol"], minKeywords: 3 },
          { level: 8, descriptor: "CVs explained with control method, reason and precision stated.", keywords: ["water bath", "calibrated", "ph electrode", "±0.01", "systematic error", "buffer", "precision", "control method", "why", "accuracy"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, step-by-step method for making ammonium sulfate fertilizer.",
      guided: [
        { level: 2, body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Mix sulfuric acid and ammonia, then heat.' — no volumes, no safety, no pH monitoring." },
        { level: 4, body: "Level 3–4: Steps in a logical sequence: (1) Measure 20 cm³ H₂SO₄ into an evaporating basin. (2) Add NH₃ solution drop by drop. (3) Test pH with indicator until pH > 7. (4) Heat to reduce volume and crystallise." },
        { level: 6, body: "Level 5–6: Clear numbered steps including safety (eye protection; fume hood for corrosive NH₃ gas; avoid contact with corrosive H₂SO₄). Steps specify volumes (20 cm³ of 1.0 mol dm⁻³ H₂SO₄, add 1.0 mol dm⁻³ NH₃ dropwise), pH monitoring after each addition, stopping at pH > 7.0, heating gently to 20% volume, cooling to crystallise, filtering, and drying." },
        { level: 8, body: "Level 7–8: Adds quantitative detail (add NH₃ in 0.5 cm³ increments, record volume and pH each time), repeats 3× for reliability, states the balanced equation H₂SO₄(aq) + 2NH₃(aq) → (NH₄)₂SO₄(aq) to justify the expected 1:2 ratio of acid to ammonia, identifies the risk of overheating (solution spit), and describes how to confirm crystallisation is complete." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the making fertilizer experiment: reacting sulfuric acid with ammonia solution to produce ammonium sulfate crystals.",
        scaffolds: [
          "1. Measure 20 cm³ of 1.0 mol dm⁻³ sulfuric acid...",
          "2. Using a dropping pipette, add 1.0 mol dm⁻³ ammonia solution dropwise...",
          "3. After each addition, test the pH using...",
          "4. Continue adding until the pH reaches...",
          "5. Heat the solution gently to about 20% of its original volume...",
          "Safety: wear eye protection; work in a fume hood because ammonia...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials only or gives 1–2 vague steps.", keywords: ["acid", "ammonia", "heat", "measure", "mix", "basin"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence with 4+ steps.", keywords: ["measure", "add", "test", "heat", "filter", "ph", "pipette", "basin", "dropwise"], minKeywords: 2 },
          { level: 6, descriptor: "Numbered steps with volumes; pH monitoring; safety precautions.", keywords: ["20 cm³", "1.0 mol", "dropwise", "ph 7", "eye protection", "fume hood", "heat gently", "universal indicator", "cool", "filter"], minKeywords: 4 },
          { level: 8, descriptor: "Incremental additions with pH recorded each time; repeats 3×; balanced equation cited.", keywords: ["0.5 cm³", "repeat", "3 times", "reliable", "balanced equation", "1:2", "h2so4", "nh4", "so4", "crystallise", "spitting"], minKeywords: 3 },
        ],
      },
    },
  ],
}
