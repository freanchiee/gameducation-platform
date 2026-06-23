import type { StrandhootPack } from "../engine/types"

export const respirationCritB: StrandhootPack = {
  slug: "respiration-crit-b",
  title: "Investigating Photosynthesis Rate",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Light intensity & Elodea",
  accent: "#c0392b",
  icon: "🌿",
  statementOfInquiry: "Humans need to find sources of energy that do not cause harmful and irreversible changes to ecosystems and the environment.",
  estMinutes: 25,
  intro:
    "Design a rigorous investigation into how light intensity affects the rate of photosynthesis in Elodea (an aquatic plant). Each strand takes you one step further — from crafting a sharp research question, to building a justified hypothesis, classifying variables precisely, and writing a safe numbered method.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe", label: "Safe Scientist", icon: "🥼", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Photosynthesis investigation", blurb: "Design an investigation into light intensity and O₂ production in Elodea", icon: "🌿" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question naming the independent and dependent variables.",
      guided: [
        { level: 2, body: "Level 1–2: A research question names what you are investigating. Vague example: 'Does light affect plants?' — too broad, not testable as a controlled experiment. It does not say what is being measured." },
        { level: 4, body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does light intensity affect the rate of photosynthesis in Elodea?' IV = light intensity; DV = rate of photosynthesis (measured as O₂ bubbles per minute)." },
        { level: 6, body: "Level 5–6: A specific, testable question: 'How does light intensity (distance from lamp: 10–100 cm) affect the rate of O₂ production (bubbles per minute) in a 5 cm Elodea stem at constant temperature (25°C) and CO₂ concentration (0.5% NaHCO₃)?' This names the IV and DV with units, the range, and key controlled variables." },
        { level: 8, body: "Level 7–8: An operationalised question specifies how measurement is done: 'How does light intensity (calculated as 1/d² in lux, where d is the distance in cm from a 60 W lamp) affect the mean rate of O₂ production (bubbles per minute, counted over two 60-second trials) in a 5 cm freshly cut Elodea stem submerged in 0.5% sodium bicarbonate solution at 25°C ± 0.5°C?' Includes measurement technique, instrument, precision, and controlled conditions." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate how light intensity affects the rate of photosynthesis in Elodea (measured as O₂ bubbles produced per minute).",
        scaffolds: [
          "How does...",
          "...light intensity (distance from lamp: __ to __ cm)...",
          "...affect the rate of O₂ production (bubbles per minute)...",
          "...in Elodea at constant temperature and CO₂ concentration?",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["light", "elodea", "photosynthesis", "plant", "investigate", "oxygen"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV with clear direction.", keywords: ["light intensity", "bubbles", "rate", "photosynthesis", "how does", "affect", "elodea", "o2"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; range stated; units included; one CV identified.", keywords: ["distance", "cm", "bubbles per minute", "temperature", "co2", "constant", "sodium bicarbonate", "10", "100"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: measurement technique, instrument precision, and units fully specified.", keywords: ["1/d²", "lux", "60-second", "trial", "0.5%", "sodium bicarbonate", "±0.5", "freshly cut", "operationalised", "mean"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict how light intensity affects O₂ production in Elodea with scientific reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A hypothesis makes a directional prediction. 'More light means more bubbles' — this is a start, but gives no scientific reasoning linking light to photosynthesis." },
        { level: 4, body: "Level 3–4: An if/then hypothesis: 'If light intensity increases, then the rate of O₂ production will increase.' This names IV and DV and gives a direction, but lacks explanation." },
        { level: 6, body: "Level 5–6: A justified hypothesis cites the mechanism: 'If light intensity increases, the rate of photosynthesis will increase, because greater light energy allows more ATP and NADPH to be produced in the light-dependent reactions, driving greater CO₂ fixation in the Calvin cycle and producing more O₂ as a by-product. However, at high light intensity, the rate will plateau when CO₂ concentration becomes the limiting factor (light saturation point).'" },
        { level: 8, body: "Level 7–8: A quantitative hypothesis with named saturation: 'If light intensity (measured as 1/d²) increases from 0.01 to 0.10 (arbitrary units), the rate of O₂ production will increase approximately linearly, with a plateau expected around 2 500 lux as CO₂ becomes limiting. Beyond saturation, further increases in light will not increase the rate. I predict a positive linear relationship in the low-intensity range (R² close to 1) and a hyperbolic curve overall, consistent with Michaelis–Menten-type enzyme kinetics.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how light intensity affects the rate of O₂ production in Elodea. Include a scientific explanation and predict what happens at high light intensity.",
        scaffolds: [
          "If light intensity increases, then...",
          "...because light energy is needed for...",
          "...which produces more ATP and NADPH for the Calvin cycle...",
          "...releasing more O₂ as a by-product.",
          "However, at high light intensity, the rate will plateau because...",
        ],
        rubric: [
          { level: 2, descriptor: "States a prediction linking light to O₂ or bubbles.", keywords: ["light", "bubbles", "o2", "more", "increase", "elodea", "predict"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named.", keywords: ["if", "then", "light intensity", "o2", "rate", "increases", "photosynthesis"], minKeywords: 2 },
          { level: 6, descriptor: "Mechanism explained using light-dependent reactions; saturation named.", keywords: ["atp", "nadph", "calvin cycle", "light-dependent", "co2", "limiting factor", "saturation", "plateau", "by-product"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative prediction with saturation point; curve shape predicted; kinetics mentioned.", keywords: ["2500 lux", "linear", "plateau", "saturation", "michaelis", "hyperbolic", "quantitative", "r²", "1/d²", "co2 limiting"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables for the Elodea photosynthesis investigation with units and control methods.",
      guided: [
        { level: 2, body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair)." },
        { level: 4, body: "Level 3–4: For the Elodea experiment: IV = light intensity (controlled by changing the distance between the lamp and the plant in cm); DV = number of O₂ bubbles produced per minute. A controlled variable is temperature — this must be kept constant because temperature affects enzyme activity in photosynthesis." },
        { level: 6, body: "Level 5–6: IV: distance from lamp (10, 30, 50, 70, 100 cm) to vary light intensity. DV: O₂ bubbles per minute (counted over 2 minutes; rate = bubbles ÷ 2). CVs: temperature (water bath at 25°C ± 0.5°C); CO₂ concentration (0.5% sodium bicarbonate solution, same batch); same Elodea species; same length of stem (5 cm, freshly cut); same 60 W lamp; same volume of sodium bicarbonate solution (200 cm³)." },
        { level: 8, body: "Level 7–8: As Level 5–6, plus each CV stated with the specific control method and justification: temperature controlled by a thermostatically controlled water bath (±0.5°C) because temperature affects enzyme activity (RuBisCO and ATP synthase); CO₂ controlled using 0.5% NaHCO₃ (same freshly prepared solution each trial) because CO₂ is a substrate; same stem length (5 cm) and Elodea source to control biomass and chlorophyll content. Instrumental precision: bubble counter (count every 60 s, repeat 3×, discard outliers). Potential systematic error: bubbles coalesce at very high rates — use a video recording to count accurately." },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for the Elodea photosynthesis investigation. For each controlled variable, state how you will control it and why.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV):",
          "Controlled variables (CVs):",
          "I will measure the DV by...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable correctly.", keywords: ["independent", "dependent", "variable", "light", "bubbles", "temperature", "control"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units; at least one CV identified.", keywords: ["light intensity", "distance", "cm", "bubbles per minute", "temperature", "controlled variable", "co2"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV and 4+ CVs listed with values/units.", keywords: ["water bath", "sodium bicarbonate", "0.5%", "5 cm", "same species", "same length", "60 w", "temperature", "co2", "volume"], minKeywords: 4 },
          { level: 8, descriptor: "CVs explained with control method, justification and potential systematic error identified.", keywords: ["rubisco", "enzyme activity", "thermostatically", "±0.5°c", "freshly prepared", "chlorophyll", "biomass", "systematic error", "coalesce", "video", "outlier"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, numbered, step-by-step method to measure the effect of light intensity on O₂ production in Elodea.",
      guided: [
        { level: 2, body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Put Elodea in water and shine a light on it and count bubbles.' — no volumes, no distances, no safety, no repeats." },
        { level: 4, body: "Level 3–4: Steps in a logical sequence: (1) Set up Elodea in sodium bicarbonate solution in a beaker. (2) Place a lamp at 10 cm from the plant. (3) Wait 2 minutes for the plant to adjust. (4) Count the bubbles produced per minute. (5) Move the lamp to 30 cm and repeat." },
        { level: 6, body: "Level 5–6: Clear numbered steps including: (1) Cut a fresh 5 cm Elodea stem and place in 200 cm³ of 0.5% sodium bicarbonate solution in a beaker. (2) Position the lamp at 10 cm, ensure the water bath maintains 25°C. (3) Allow 3 minutes acclimatisation. (4) Count O₂ bubbles for 2 min; calculate rate (bubbles min⁻¹). (5) Repeat at 5 distances (10, 30, 50, 70, 100 cm). (6) Repeat each distance 3 times and calculate mean. Safety: do not touch the hot lamp; handle glassware carefully." },
        { level: 8, body: "Level 7–8: Adds quantitative detail: (1) Prepare 200 cm³ 0.5% NaHCO₃ solution. (2) Cut a fresh 5 cm apical Elodea stem under water to prevent air entry. (3) Submerge in solution, maintaining 25°C ± 0.5°C water bath. (4) Allow 5 min acclimatisation at each light level. (5) Film bubble production for 2 × 60 s trials; count from video to avoid coalescence error. (6) Test five distances (10, 30, 50, 70, 100 cm). (7) Repeat 3× per distance; discard outliers (>2 SD from mean); calculate mean rate. (8) Record light intensity (lux) at each distance using a light sensor for accurate x-axis values. Safety: use LED lamp (no UV/heat); eye protection." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the Elodea photosynthesis experiment. Include setup, distances tested, counting method, repeats, and safety precautions.",
        scaffolds: [
          "1. Cut a fresh 5 cm Elodea stem and place in 200 cm³ of 0.5% sodium bicarbonate solution...",
          "2. Position the lamp at 10 cm from the Elodea...",
          "3. Allow ___ minutes for acclimatisation...",
          "4. Count the number of O₂ bubbles produced for 2 minutes and calculate rate (bubbles min⁻¹)...",
          "5. Repeat at distances of 30, 50, 70, and 100 cm...",
          "6. Repeat each distance 3 times and calculate the mean rate...",
          "Safety: ...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials only or gives 1–2 vague steps.", keywords: ["elodea", "water", "light", "count", "bubbles", "lamp"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence of 4+ numbered steps.", keywords: ["distance", "beaker", "wait", "count", "repeat", "lamp", "sodium bicarbonate", "bubbles per minute"], minKeywords: 2 },
          { level: 6, descriptor: "Numbered steps with volumes, distances, acclimatisation time, 3 repeats and safety.", keywords: ["5 cm", "200 cm³", "0.5%", "sodium bicarbonate", "3 minutes", "acclimatisation", "three", "repeat", "safety", "water bath", "25°c"], minKeywords: 4 },
          { level: 8, descriptor: "Cut under water; video counting; light sensor; outlier handling; 5 min acclimatisation.", keywords: ["under water", "video", "coalescence", "light sensor", "lux", "outlier", "2 sd", "led", "5 min", "apical", "freshly cut"], minKeywords: 3 },
        ],
      },
    },
  ],
}
