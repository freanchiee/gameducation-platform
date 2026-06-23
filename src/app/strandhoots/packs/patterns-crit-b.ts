import type { StrandhootPack } from "../engine/types"

export const patternsCritB: StrandhootPack = {
  slug: "patterns-crit-b",
  title: "Designing a Periodic Properties Investigation",
  subject: "MYP Chemistry",
  criterion: "B",
  topic: "Investigating thermal conductivity of metals",
  accent: "#c0392b",
  icon: "🔬",
  statementOfInquiry:
    "Chemists look for patterns in the periodic table in order to discover relationships and trends that help them to predict physical and chemical properties.",
  estMinutes: 28,
  intro:
    "Design an investigation into the thermal conductivity of metals — a key periodic property that reveals patterns across the table. The chapter describes a real student experiment using metal rods, wax and a Bunsen burner. Each strand takes you one step further through the design process.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe", label: "Safe Scientist", icon: "🥼", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Thermal conductivity experiment", blurb: "Design an investigation into the thermal conductivity of metal rods", icon: "🔥" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question about the thermal conductivity of metals.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A research question names what is being investigated. Vague example: 'Does metal conduct heat?' — too broad and not a controlled experiment.",
        },
        {
          level: 4,
          body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does the type of metal affect the time for heat to travel along a 30 cm rod?' IV = type of metal; DV = time for wax to melt and thumbtack to fall.",
        },
        {
          level: 6,
          body: "Level 5–6: A specific, testable question: 'How does the type of metal (copper, steel/iron, aluminium, brass, zinc) affect the time (seconds) for heat to travel 25 cm along a 30 cm rod at constant Bunsen burner flame, as measured by the time for a wax-held thumbtack to fall?' This names the IV with specific values, the DV with measurement method, and a controlled variable.",
        },
        {
          level: 8,
          body: "Level 7–8: An operationalised question specifies precision and control: 'How does the type of metal (copper, steel, aluminium, brass, zinc — all 30 cm × 5 mm diameter rods) affect the time (±0.1 s, measured with a digital stopwatch) for heat to travel a fixed distance of 25 cm from a roaring Bunsen burner flame, using the wax-thumbtack method, with all other variables controlled (rod diameter, distance, flame setting, initial wax mass)?'",
        },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question for the thermal conductivity experiment described in Chapter 11: metal rods (copper, steel, aluminium, brass, zinc), a Bunsen burner, wax and a thumbtack.",
        scaffolds: [
          "How does the type of metal...",
          "...affect the time for the thumbtack to fall...",
          "...along a 30 cm rod...",
          "...when heated at the opposite end by a Bunsen burner?",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic (thermal conductivity or metals).", keywords: ["metal", "heat", "thermal", "conductivity", "temperature", "rod"], minKeywords: 1 },
          { level: 4, descriptor: "IV (type of metal) and DV (time/heat travel) named.", keywords: ["type of metal", "time", "heat", "thumbtack", "wax", "travel", "bunsen", "falls"], minKeywords: 2 },
          { level: 6, descriptor: "Specific metals listed, measurement method named, one CV identified.", keywords: ["copper", "steel", "aluminium", "brass", "zinc", "30 cm", "stopwatch", "wax", "thumbtack", "constant", "distance"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: precision (±), rod dimensions, and controlled variables specified.", keywords: ["±", "diameter", "5 mm", "roaring", "digital stopwatch", "precision", "controlled", "25 cm", "operationalised", "fixed distance"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict which metal will conduct heat fastest, with scientific reasoning based on bonding.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A hypothesis makes a directional prediction. 'Copper will conduct heat the fastest.' — This is a start, but gives no scientific reasoning.",
        },
        {
          level: 4,
          body: "Level 3–4: An if/then hypothesis: 'If copper is used, then the thumbtack will fall in the shortest time.' This names IV and DV and gives a direction, but lacks an explanation of why copper conducts better.",
        },
        {
          level: 6,
          body: "Level 5–6: A justified hypothesis: 'If the metal is copper, then the thumbtack will fall in the shortest time because copper has the highest density of free (delocalised) electrons in its metallic bonding structure. These free electrons can transfer kinetic energy rapidly along the rod, resulting in the highest thermal conductivity.' Steel (iron) has fewer free electrons and a stronger iron lattice, predicting a longer time.",
        },
        {
          level: 8,
          body: "Level 7–8: A quantitative, risk-assessed hypothesis: 'If the metals are ranked by thermal conductivity, then copper (401 W m⁻¹ K⁻¹) will give the shortest time, followed by aluminium (~205), brass (~109), zinc (~116), and steel/iron (~50 W m⁻¹ K⁻¹) — the longest time. The ranking follows from the density of delocalised electrons in the metallic lattice; groups with more free electrons and fewer lattice defects conduct heat faster. However, the wax method measures time to fall at a single distance — the ranking may not be perfectly linear with conductivity values because of rod geometry effects.'",
        },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting which metal will conduct heat fastest in the thumbtack experiment. Include scientific reasoning.",
        scaffolds: [
          "If the metal is copper (or steel / aluminium / zinc / brass), then...",
          "because metallic bonding...",
          "Free (delocalised) electrons can...",
          "Therefore the predicted order is...",
        ],
        rubric: [
          { level: 2, descriptor: "States a prediction about which metal is fastest.", keywords: ["copper", "fastest", "shortest", "time", "heat", "metal", "predict"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure; names both IV and DV.", keywords: ["if", "then", "copper", "time", "thumbtack", "falls", "shortest", "conducts"], minKeywords: 2 },
          { level: 6, descriptor: "Reasoning using free/delocalised electrons; order predicted.", keywords: ["delocalised", "free electrons", "metallic bonding", "transfer", "energy", "copper", "fastest", "steel", "slowest", "order"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative values cited; limitations of wax method acknowledged.", keywords: ["401", "w m", "k-1", "aluminium", "205", "iron", "50", "linear", "geometry", "limitation", "wax method", "rank"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify the independent, dependent and controlled variables for the thermal conductivity experiment.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair).",
        },
        {
          level: 4,
          body: "Level 3–4: IV: type of metal (copper, steel, aluminium, brass, zinc). DV: time in seconds for the thumbtack to fall from the rod after heating begins. CVs include: length of the rod, position of the thumbtack on the rod, Bunsen burner flame type.",
        },
        {
          level: 6,
          body: "Level 5–6: IV: type of metal (copper, steel/iron, aluminium, brass, zinc — each a 30 cm rod). DV: time (seconds, ±0.1 s using a digital stopwatch) from lighting the Bunsen burner until the thumbtack falls. CVs: rod length (30 cm), rod diameter (5 mm), thumbtack distance from Bunsen (25 cm), flame setting (roaring), amount of wax (same sized drop), room temperature (20°C). Each CV needs a reason: rod diameter affects surface area for heat conduction.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus: each CV stated with how it is controlled ('rod diameter controlled by using calibrated 5 mm diameter rods of each metal') and why ('diameter affects cross-sectional area: a thicker rod has more material to conduct through, potentially increasing conduction time — a confounding variable'). Systematic error: if the Bunsen burner is not at the exact same position each time, the distance from flame to thumbtack varies, introducing error in the DV. Improvement: use a fixed position for the burner, marked with tape.",
        },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for the thermal conductivity experiment: burning each of five metal rods with a Bunsen burner and measuring the time for a wax-held thumbtack to fall.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV):",
          "Controlled variables (CVs):",
          "I will measure the DV using...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "variable", "metal", "time", "control"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units.", keywords: ["independent variable", "dependent variable", "type of metal", "time", "seconds", "stopwatch", "thumbtack", "falls"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV and 3+ CVs with values.", keywords: ["30 cm", "rod length", "diameter", "distance", "flame", "roaring", "wax", "amount", "room temperature", "bunsen", "5 mm"], minKeywords: 3 },
          { level: 8, descriptor: "CVs with control method and reason; systematic error identified.", keywords: ["cross-sectional area", "calibrated", "confounding", "systematic error", "fixed position", "tape", "diameter affects", "control method", "why", "accuracy"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, step-by-step method for the thermal conductivity of metals experiment.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Heat the rod and see what happens.' — no measurements, no safety, no timing.",
        },
        {
          level: 4,
          body: "Level 3–4: Steps in a logical sequence: (1) Secure the metal rod in a clamp. (2) Press a wax-coated thumbtack onto the rod 25 cm from one end. (3) Place the Bunsen burner at the opposite end. (4) Light the Bunsen and start the stopwatch. (5) Stop when the thumbtack falls. (6) Record the time. (7) Repeat for each metal.",
        },
        {
          level: 6,
          body: "Level 5–6: Clear numbered steps with safety precautions: wear heat-resistant gloves and safety goggles; do not touch the rod during heating; clamp securely. Specific measurements: use a 30 cm rod clamped 5 cm from one end; place the thumbtack at 25 cm from the Bunsen end; use a roaring Bunsen flame; drop a standard 0.1 g candle wax onto the rod at 25 cm and press the thumbtack base in; start the stopwatch when the flame is lit; stop when the thumbtack falls; wait 5 minutes for the rod to cool before repeating.",
        },
        {
          level: 8,
          body: "Level 7–8: Adds reliability (repeat 3× per metal), records temperature of each rod before starting (ensure all start at 20°C), tabulates results with mean time and range, identifies outliers, includes a risk assessment (hot rod — use tongs; flame — keep hair/clothing clear), and states the balanced equation for the combustion reaction if Bunsen burns methane: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) — reminding the student the energy source is constant-rate combustion. Include a result table with columns: metal, trial 1 time, trial 2 time, trial 3 time, mean time (s), range (s).",
        },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the thermal conductivity experiment: heating one end of a 30 cm metal rod with a Bunsen burner and timing how long a wax-held thumbtack at 25 cm takes to fall.",
        scaffolds: [
          "1. Secure a 30 cm metal rod in a cork-lined clamp...",
          "2. Drop a small amount of melted wax onto the rod at 25 cm from one end...",
          "3. Press the thumbtack base into the liquid wax and hold until it sets...",
          "4. Position the Bunsen burner at the opposite end, light it on a roaring flame, and start the stopwatch...",
          "5. When the wax melts and the thumbtack falls, stop the stopwatch and record the time...",
          "Safety: wear safety goggles; do not touch the rod; allow the rod to cool for 5 minutes before repeating...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials only or 1–2 vague steps.", keywords: ["rod", "heat", "bunsen", "clamp", "wax", "thumbtack", "time"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence with 4+ steps.", keywords: ["clamp", "wax", "thumbtack", "light", "stopwatch", "start", "falls", "record", "repeat", "each metal"], minKeywords: 2 },
          { level: 6, descriptor: "Numbered steps with measurements, cooling time, and safety.", keywords: ["30 cm", "25 cm", "roaring", "safety goggles", "cool", "5 minutes", "clamp", "0.1 g", "standard", "heat-resistant"], minKeywords: 4 },
          { level: 8, descriptor: "3 repeats; result table specified; risk assessment; combustion equation cited.", keywords: ["3 times", "repeat", "mean", "range", "risk", "tongs", "table", "ch4", "co2", "trial", "outlier", "combustion"], minKeywords: 3 },
        ],
      },
    },
  ],
}
