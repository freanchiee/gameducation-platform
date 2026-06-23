import type { StrandhootPack } from "../engine/types"

export const cellStructureCritB: StrandhootPack = {
  slug: "cell-structure-crit-b",
  title: "Microscopy Investigation",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Cell staining and measurement",
  accent: "#c0392b",
  icon: "🔬",
  statementOfInquiry: "Relationships between organisms are revealed by similarities and differences between the myriad of forms.",
  estMinutes: 25,
  intro:
    "Design a microscopy investigation comparing onion epidermal cells and human cheek cells. Each strand builds a complete investigation design — a sharp research question, a justified hypothesis, classified variables, and a safe numbered method. Step-by-step guidance levels you from vague to fully operationalised.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe", label: "Safe Scientist", icon: "🥼", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Microscopy investigation", blurb: "Compare onion and cheek cell sizes using staining and measurement", icon: "🔬" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question comparing cell sizes under the microscope.",
      guided: [
        { level: 2, body: "Level 1–2: A research question should name what you are investigating. Vague example: 'What do cells look like under a microscope?' — too broad, not testable as a controlled comparison." },
        { level: 4, body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does cell type (onion vs cheek) affect cell diameter?' IV = cell type; DV = cell diameter. This gives direction and is testable." },
        { level: 6, body: "Level 5–6: A specific, testable question: 'How does cell type (onion epidermal cell vs human cheek cell) affect the actual cell diameter (μm) when observed at ×400 magnification under a light microscope?' This names the IV, DV with units, the magnification, and the type of microscope used." },
        { level: 8, body: "Level 7–8: An operationalised question specifies exactly how the measurement is made: 'How does cell type (onion epidermal cell vs human cheek cell) affect the actual cell diameter (μm), calculated from eyepiece graticule measurements at ×400 magnification, with the graticule calibrated against a stage micrometer?' This includes measurement technique, instrument, and control of magnification." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate how cell diameter compares between onion epidermal cells and human cheek cells at the same magnification.",
        scaffolds: [
          "How does cell type...",
          "...affect the actual cell diameter (μm)...",
          "...when observed at ×400 magnification...",
          "...using a light microscope with an eyepiece graticule calibrated against...",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["cell", "onion", "cheek", "microscope", "size", "diameter", "compare"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV (cell type) and DV (diameter) with clear direction.", keywords: ["cell type", "diameter", "onion", "cheek", "affect", "how does", "compare"], minKeywords: 2 },
          { level: 6, descriptor: "Specific and testable; magnification stated; units included.", keywords: ["onion epidermal", "cheek", "diameter", "μm", "×400", "magnification", "light microscope"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: measurement technique (eyepiece graticule) and calibration specified.", keywords: ["eyepiece graticule", "stage micrometer", "calibrated", "×400", "operationalised", "μm", "calculate", "actual size"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict which cell type will be larger and justify using biological knowledge.",
      guided: [
        { level: 2, body: "Level 1–2: A hypothesis makes a directional prediction. 'Onion cells will be bigger than cheek cells' — this is a start, but gives no scientific reasoning." },
        { level: 4, body: "Level 3–4: An if/then hypothesis: 'If cell type changes from cheek to onion, then the diameter will increase because plant cells are generally larger.' This names IV and DV and gives a direction with minimal explanation." },
        { level: 6, body: "Level 5–6: A justified hypothesis cites structural biology: 'If the cell type is onion epidermal rather than human cheek, then the cell diameter will be larger, because plant cells have a rigid cellulose cell wall that gives the cell a fixed, larger shape. The cell wall prevents the cell from changing shape and is associated with greater overall cell dimensions. Predicted: onion ~40 μm, cheek ~15 μm diameter.'" },
        { level: 8, body: "Level 7–8: A fully quantitative hypothesis with biological mechanism: 'If the cell type is onion epidermal cell rather than human cheek cell, the mean actual diameter will be significantly larger (predicted ~40 μm vs ~15 μm). Plant epidermal cells are supported by a rigid cellulose cell wall and a large central vacuole maintaining turgor pressure, both of which give a more regular, larger cell outline at ×400 magnification. Cheek cells lack these structures, so they collapse and spread on the slide, appearing flattened and irregular. The actual size formula (actual size = image size / magnification) will be applied to eyepiece graticule readings calibrated against a stage micrometer.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting which cell type (onion epidermal or human cheek) will have a larger diameter, and justify your prediction with biological reasoning.",
        scaffolds: [
          "If the cell type is onion epidermal rather than cheek, then...",
          "because plant cells have...",
          "The cell wall / vacuole causes...",
          "I predict onion cells will measure approximately ___ μm and cheek cells approximately ___ μm diameter.",
        ],
        rubric: [
          { level: 2, descriptor: "States a prediction about which cell is larger.", keywords: ["onion", "cheek", "larger", "bigger", "smaller", "diameter"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named and direction given.", keywords: ["if", "then", "onion", "cheek", "diameter", "larger", "because"], minKeywords: 2 },
          { level: 6, descriptor: "Biological justification citing cell wall and/or vacuole; predicted values given.", keywords: ["cell wall", "cellulose", "rigid", "vacuole", "turgor", "40 μm", "15 μm", "larger", "structure"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative prediction; mechanism explained; measurement method stated.", keywords: ["40 μm", "15 μm", "cellulose cell wall", "vacuole", "turgor", "image size", "magnification", "graticule", "actual size", "flattened"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables for the onion and cheek cell microscopy comparison.",
      guided: [
        { level: 2, body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep the same to make it a fair test)." },
        { level: 4, body: "Level 3–4: IV = cell type (onion epidermal vs human cheek); DV = actual cell diameter (μm), calculated using image size / magnification. The DV must be measured as actual size, not the image size seen through the eyepiece." },
        { level: 6, body: "Level 5–6: IV: cell type (onion epidermal cell vs human cheek cell). DV: actual cell diameter (μm) = image size / magnification, measured from 10 cells per type using an eyepiece graticule (calibrated). CVs: same magnification (×400 objective, ×10 eyepiece = ×400 total); same staining time and stain concentration (iodine for onion, methylene blue for cheek); same preparation technique (single cell layer, same mounting medium — water); same number of cells measured (n=10)." },
        { level: 8, body: "Level 7–8: As Level 5–6, plus: each CV stated with the method of control and the reason it matters. E.g. 'Magnification controlled by always using the ×40 objective lens — if magnification changes, the image-to-actual size ratio changes, so the calculated actual diameter would be wrong.' 'Staining time fixed at 30 seconds — longer staining darkens the cell wall and makes the cell boundary harder to locate precisely, increasing measurement error.' 'Same operator throughout to reduce subjective error in identifying the cell boundary.' Also note: distinguishing DV precision — eyepiece graticule ±0.5 divisions (= ±1 μm at ×400)." },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for an experiment comparing the actual diameter of onion epidermal cells and human cheek cells at ×400 magnification.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV):",
          "Controlled variables (CVs):",
          "I will measure the DV using an eyepiece graticule by...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "variable", "cell type", "diameter", "controlled"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units and measurement noted.", keywords: ["iv", "dv", "cell type", "diameter", "μm", "actual size", "magnification", "image size"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV, and 3+ CVs named with values.", keywords: ["×400", "magnification", "stain", "iodine", "methylene blue", "10 cells", "same technique", "eyepiece graticule", "controlled"], minKeywords: 3 },
          { level: 8, descriptor: "CVs each stated with control method and reason; precision of DV specified.", keywords: ["×40 objective", "staining time", "30 seconds", "operator", "subjective", "±0.5", "±1 μm", "boundary", "precision", "method of control"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, numbered method for preparing and measuring onion and cheek cell slides.",
      guided: [
        { level: 2, body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Put cells on a slide and look through the microscope.' — no detail of preparation, staining, magnification, or measurement." },
        { level: 4, body: "Level 3–4: Logical sequence: (1) Peel a layer of onion epidermis and mount on slide with a drop of iodine. (2) Add coverslip. (3) Observe under microscope starting at low power, then switch to high. (4) For cheek cells: gently scrape the inside of your cheek, spread on a slide, add methylene blue, add coverslip. (5) Measure cell diameter." },
        { level: 6, body: "Level 5–6: Numbered steps with detail and safety: Onion: (1) Snap back an onion scale, use fine forceps to peel a single layer of epidermis from the inner surface. (2) Lay flat on slide in a drop of water. (3) Add 2 drops of iodine solution; leave 30 s. (4) Lower coverslip at 45° to avoid air bubbles. (5) Observe at ×40 (low power) then switch to ×400 (high power). (6) Use eyepiece graticule to measure diameter of 10 cells and record in table. Cheek: (7) Use a clean cotton swab to gently scrape inner cheek. (8) Spread on slide, add 2 drops methylene blue; leave 30 s. (9) Add coverslip at 45°. (10) Observe and measure as above. Safety: methylene blue stains skin/clothing; iodine can irritate eyes — wear eye protection." },
        { level: 8, body: "Level 7–8: Adds quantitative precision, calibration, and reliability: (0) Calibrate eyepiece graticule: place stage micrometer on stage at ×400 and align gratings to determine that 1 eyepiece division = 2.5 μm. (1–9) As Level 5–6. (10) Record diameter of each cell in eyepiece divisions; calculate actual diameter = divisions × 2.5 μm. (11) Repeat for 10 cells per cell type (n=10). (12) Calculate mean, range, and standard deviation for each cell type. (13) Repeat the entire preparation for each cell type twice more (3 repeats total) for reliability. Risk assessment: iodine is an irritant — avoid contact with eyes and skin, wash immediately if contact occurs; methylene blue is a mild stain — gloves recommended; handle glass slides with care to prevent cuts." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the microscopy investigation. Cover preparation of both onion and cheek cell slides, staining, focusing, measuring cell diameter, and safety precautions.",
        scaffolds: [
          "1. Peel a single layer of epidermis from the inner surface of an onion scale using fine forceps...",
          "2. Lay the tissue flat on a clean slide and add 2 drops of iodine solution...",
          "3. Gently lower a coverslip at 45° to avoid air bubbles...",
          "4. Focus at low power (×40), then switch to high power (×400)...",
          "5. Use the eyepiece graticule to measure the diameter of 10 cells...",
          "Safety: wear eye protection because...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials only or gives 1–2 vague steps.", keywords: ["slide", "microscope", "onion", "cheek", "stain", "mount"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence with 4+ steps covering both cell types.", keywords: ["forceps", "iodine", "methylene blue", "coverslip", "low power", "high power", "measure", "scrape", "cheek", "onion"], minKeywords: 3 },
          { level: 6, descriptor: "Numbered steps with volumes, staining times, safety precautions, and 10-cell sample size.", keywords: ["2 drops", "30 seconds", "45°", "coverslip", "×400", "10 cells", "eye protection", "graticule", "methylene blue", "iodine"], minKeywords: 4 },
          { level: 8, descriptor: "Graticule calibration step included; actual size formula used; repeats for reliability; full risk assessment.", keywords: ["calibrate", "stage micrometer", "2.5 μm", "actual diameter", "divisions", "3 repeats", "mean", "standard deviation", "risk", "irritant"], minKeywords: 4 },
        ],
      },
    },
  ],
}
