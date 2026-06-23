import type { StrandhootPack } from "../engine/types"

export const pathogensCritB: StrandhootPack = {
  slug: "pathogens-crit-b",
  title: "Investigating Antibacterial Effectiveness",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Zone of inhibition experiment",
  accent: "#c0392b",
  icon: "🦠",
  statementOfInquiry: "When two or more individuals interact, they form relationships that, over time, impact and contribute to their identity.",
  estMinutes: 25,
  intro:
    "Design a rigorous investigation into how disinfectant concentration affects bacterial growth. Each strand guides you through one design element — from a sharp research question and testable hypothesis, to precise variable classification and a safe, step-by-step method using the agar plate zone-of-inhibition technique.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe", label: "Safe Scientist", icon: "🥼", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Zone of inhibition investigation", blurb: "Design an experiment on disinfectant concentration and bacterial growth", icon: "🦠" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for the disinfectant inhibition investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A research question names what you are investigating. Vague example: 'Does disinfectant kill bacteria?' — too broad, not testable as a controlled experiment because it specifies no concentration range or measurement." },
        { level: 4, body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does the concentration of disinfectant affect the growth of bacteria on an agar plate?' IV = disinfectant concentration; DV = bacterial growth inhibition." },
        { level: 6, body: "Level 5–6: A specific, testable question: 'How does the concentration of household disinfectant (0–200 μg/ml) affect the diameter of the zone of inhibition (mm) around a 6 mm paper disc on a nutrient agar plate inoculated with E. coli?' This names the IV with a range, the DV with a unit, the bacterial species, and the measurement technique." },
        { level: 8, body: "Level 7–8: An operationalised question specifies how measurement is done: 'How does the concentration of household disinfectant (0, 5, 10, 25, 50, 100, 200 μg/ml) affect the mean diameter (mm, measured to ±0.5 mm with digital callipers in two perpendicular directions) of the zone of inhibition around a 6 mm paper disc, on a nutrient agar plate uniformly inoculated with E. coli (10⁶ CFU/ml), incubated at 30°C for 24 h?' It includes all measurement techniques, precision, and controlled conditions." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate how disinfectant concentration affects the zone of inhibition on a bacterial agar plate.",
        scaffolds: [
          "How does the concentration of...",
          "...affect the diameter of the zone of inhibition...",
          "...around a paper disc on a nutrient agar plate...",
          "...inoculated with [bacterial species] and incubated at [temperature] for [time]?",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["disinfectant", "bacteria", "concentration", "growth", "inhibition", "investigate"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV with clear direction.", keywords: ["concentration", "zone of inhibition", "diameter", "bacteria", "how does", "affect", "agar"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; range stated; species named; measurement unit given.", keywords: ["μg/ml", "mm", "diameter", "zone of inhibition", "e. coli", "0", "200", "paper disc", "6 mm", "incubated"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: measurement technique, precision and all key conditions specified.", keywords: ["perpendicular", "callipers", "±0.5", "cfu", "30°c", "24 h", "mean", "operationalised", "nutrient agar", "uniform"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict how disinfectant concentration affects zone of inhibition, with scientific reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A hypothesis makes a directional prediction. 'Higher disinfectant concentration kills more bacteria' — this is a start, but gives no scientific reasoning." },
        { level: 4, body: "Level 3–4: An if/then hypothesis: 'If disinfectant concentration increases, then the diameter of the zone of inhibition will increase.' This names IV and DV and gives a direction, but lacks explanation of the mechanism." },
        { level: 6, body: "Level 5–6: A justified hypothesis: 'If disinfectant concentration increases from 0 to 200 μg/ml, the diameter of the zone of inhibition will increase, because higher concentrations provide more active molecules that diffuse further into the agar, inhibiting bacterial growth over a larger area. The relationship may be non-linear (logarithmic) because at very high concentrations the agar may become fully saturated with disinfectant.'" },
        { level: 8, body: "Level 7–8: A quantitative, mechanistic hypothesis: 'If disinfectant concentration doubles (e.g. from 25 to 50 μg/ml), the zone of inhibition diameter will increase by a diminishing increment — consistent with a logarithmic (log-linear) relationship. This is because diffusion is concentration-gradient driven (Fick's law); at higher concentrations the gradient still drives outward diffusion but the marginal inhibitory gain decreases as molecules spread over an ever-larger area. The minimum inhibitory concentration (MIC) may be read from the intercept where the zone diameter equals the disc diameter (6 mm).'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how disinfectant concentration affects the zone of inhibition diameter. Include a scientific explanation of the mechanism.",
        scaffolds: [
          "If disinfectant concentration increases, then the zone of inhibition will...",
          "because higher concentrations provide more...",
          "The relationship between concentration and zone diameter may be... because...",
          "At very high concentrations, I expect... because...",
        ],
        rubric: [
          { level: 2, descriptor: "States a directional prediction about concentration and inhibition.", keywords: ["concentration", "zone", "inhibition", "increase", "larger", "more", "bacteria"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named and direction given.", keywords: ["if", "then", "concentration", "zone of inhibition", "diameter", "increase", "larger"], minKeywords: 2 },
          { level: 6, descriptor: "Mechanism explained (diffusion of molecules); non-linear/logarithmic relationship mentioned.", keywords: ["diffuse", "molecules", "active", "agar", "logarithmic", "non-linear", "mechanism", "inhibit", "saturated"], minKeywords: 2 },
          { level: 8, descriptor: "Quantitative prediction citing Fick's law; MIC defined; diminishing returns explained.", keywords: ["fick", "logarithmic", "doubles", "diminishing", "mic", "minimum inhibitory concentration", "gradient", "6 mm", "intercept", "quantitative"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables for the zone of inhibition disinfectant experiment.",
      guided: [
        { level: 2, body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair)." },
        { level: 4, body: "Level 3–4: IV = disinfectant concentration (μg/ml); DV = diameter of zone of inhibition (mm) measured with a ruler. Several conditions must be kept constant, including the same bacterial species and same incubation temperature." },
        { level: 6, body: "Level 5–6: IV: disinfectant concentration at 7 levels (0, 5, 10, 25, 50, 100, 200 μg/ml). DV: mean diameter of zone of inhibition (mm), measured in two perpendicular directions and averaged. CVs: same bacterial species (E. coli), same brand of nutrient agar plate, same disc size (6 mm), same incubation temperature (30°C) and time (24 h), same volume of disinfectant per disc (20 μl), same inoculation method (flood-and-drain with a standardised bacterial suspension)." },
        { level: 8, body: "Level 7–8: As L6, plus: each CV stated with how it is controlled ('incubation temperature controlled by a calibrated incubator to ±1°C') and why it is controlled ('temperature affects bacterial growth rate and diffusion rate of disinfectant molecules'). Instrumental precision: digital callipers (±0.1 mm) are more precise than a plastic ruler (±0.5 mm) for measuring zone diameter. Potential systematic error: if discs are not applied immediately after the plate dries, the agar surface may absorb disinfectant unevenly — standardise the waiting time (5 min drying) before disc application to reduce this." },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for an experiment investigating how disinfectant concentration affects the diameter of the zone of inhibition on a bacterial agar plate.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV) — how measured and with what instrument:",
          "Controlled variables (CVs):",
          "I will control [CV] by... because...",
          "A potential systematic error is... which I will reduce by...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "variable", "concentration", "zone", "control"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units.", keywords: ["independent variable", "dependent variable", "concentration", "diameter", "mm", "μg/ml", "zone of inhibition"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV and 4+ CVs named with values/units.", keywords: ["e. coli", "30°c", "24 h", "6 mm", "20 μl", "agar", "disc", "species", "temperature", "time", "perpendicular"], minKeywords: 3 },
          { level: 8, descriptor: "CVs explained with control method, reason and precision stated; systematic error identified.", keywords: ["calibrated incubator", "±1°c", "±0.1 mm", "callipers", "diffusion rate", "systematic error", "drying", "5 min", "why", "accuracy", "precision"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, numbered step-by-step method for the zone of inhibition disinfectant experiment.",
      guided: [
        { level: 2, body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Put disinfectant on agar plate and measure.' — no safety, no bacterial inoculation procedure, no disc details." },
        { level: 4, body: "Level 3–4: Logical sequence: (1) Prepare agar plates. (2) Inoculate with bacteria. (3) Place discs soaked in each concentration. (4) Incubate. (5) Measure zone. More detail needed on volumes, safety and repeats." },
        { level: 6, body: "Level 5–6: Clear numbered steps: (1) Label 7 plates with each concentration. (2) Using sterile technique, inoculate each plate with 1 ml of E. coli suspension (flood-and-drain method), allow to dry 5 min. (3) Using sterile forceps, place one 6 mm paper disc per plate; add 20 μl of the correct disinfectant concentration to each disc. (4) Incubate at 30°C for 24 h. (5) Measure zone of inhibition diameter in two perpendicular directions; average and record. Safety: wear gloves and eye protection; autoclave all plates after use; wash hands thoroughly; work in a designated microbiology area." },
        { level: 8, body: "Level 7–8: Adds quantitative detail: repeat each concentration 3 times for reliability, use a calibrated loop or micropipette to standardise bacterial suspension density (e.g. 0.5 McFarland standard, ≈1.5 × 10⁸ CFU/ml, diluted to 10⁶ CFU/ml), prepare disinfectant dilutions using serial dilution (stock solution → 2-fold dilutions → target concentrations). Explain why forceps must be flamed and cooled before each disc placement (to prevent cross-contamination). After 24 h, measure zones digitally using image software for improved precision. States that a 0 μg/ml control disc is essential to confirm that any zone is due to the disinfectant, not the disc itself. All plates labelled, sealed with Parafilm, and disposed of by autoclaving at 121°C, 15 min." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the zone of inhibition experiment: investigating how disinfectant concentration affects bacterial growth inhibition on nutrient agar plates.",
        scaffolds: [
          "1. Label 7 nutrient agar plates with the seven disinfectant concentrations (0, 5, 10, 25, 50, 100, 200 μg/ml).",
          "2. Using sterile technique, inoculate each plate with 1 ml of bacterial suspension...",
          "3. Allow plates to dry for 5 minutes, then use sterile forceps to place a 6 mm paper disc...",
          "4. Add 20 μl of the correct disinfectant concentration to the disc using a micropipette...",
          "5. Incubate all plates at 30°C for 24 hours...",
          "6. Measure the zone of inhibition diameter in two perpendicular directions; calculate the mean...",
          "Safety: wear gloves and eye protection; autoclave all plates after use...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials or gives 1–2 vague steps.", keywords: ["disinfectant", "agar", "bacteria", "measure", "plate", "disc"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence of 4+ steps including inoculation and measurement.", keywords: ["inoculate", "disc", "incubate", "measure", "zone", "place", "label", "plate", "forceps"], minKeywords: 2 },
          { level: 6, descriptor: "Numbered steps with volumes, temperature, time; safety included; perpendicular measurement.", keywords: ["20 μl", "30°c", "24 h", "6 mm", "perpendicular", "gloves", "eye protection", "autoclave", "dry", "sterile", "forceps"], minKeywords: 4 },
          { level: 8, descriptor: "3 repeats; McFarland standard; serial dilution; image software; 0 μg/ml control; autoclave disposal details.", keywords: ["3 times", "repeat", "mcfarland", "serial dilution", "control", "0 μg/ml", "image software", "autoclave", "121°c", "cross-contamination", "parafilm", "reliable"], minKeywords: 3 },
        ],
      },
    },
  ],
}
