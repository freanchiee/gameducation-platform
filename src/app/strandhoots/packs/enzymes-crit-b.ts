import type { StrandhootPack } from "../engine/types"

export const enzymesCritB: StrandhootPack = {
  slug: "enzymes-crit-b",
  title: "Investigating Enzyme Activity",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Temperature & amylase experiment",
  accent: "#c0392b",
  icon: "🔬",
  statementOfInquiry: "Science is applied to mitigate the transformations associated with aging but sometimes anti-aging science is misrepresented.",
  estMinutes: 25,
  intro:
    "Design a rigorous investigation into how temperature affects the rate of starch digestion by amylase. Each strand takes you one step further — from crafting a sharp research question and testable hypothesis, to classifying variables and writing a safe, step-by-step method.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "master", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Amylase investigation", blurb: "Design an experiment into temperature effects on amylase activity", icon: "🔬" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for the amylase temperature investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A research question names what you are investigating. Vague example: 'Does temperature affect amylase?' — too broad, doesn't specify what is measured or over what range." },
        { level: 4, body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does temperature affect the rate of starch digestion by amylase?' IV = temperature; DV = rate of starch digestion." },
        { level: 6, body: "Level 5–6: A specific, testable question: 'How does temperature (10°C–60°C) affect the rate of starch digestion by salivary amylase, as measured by the time taken for iodine solution to stop turning blue-black?' This names the IV, DV, range, enzyme and method of measurement." },
        { level: 8, body: "Level 7–8: An operationalised question specifies how variables are controlled and measured: 'How does temperature (10, 20, 30, 37, 40, 45, 50, 55°C, maintained using a water bath to ±1°C) affect the rate of starch digestion by 1% salivary amylase solution (measured as 1/time for iodine on a spot plate to turn from blue-black to colourless, s⁻¹)?' It specifies concentrations, temperatures, precision, and calculation of rate." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate how temperature affects the rate of starch digestion by amylase.",
        scaffolds: [
          "How does temperature (range: ___°C to ___°C)...",
          "...affect the rate of starch digestion by amylase...",
          "...measured by the time for iodine solution to...",
          "...at constant [amylase / starch concentration] of...",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["temperature", "amylase", "starch", "investigate", "enzyme", "digestion"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV with clear direction.", keywords: ["temperature", "rate", "starch digestion", "amylase", "how does", "affect", "time"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; range stated; measurement method named.", keywords: ["range", "10", "60", "iodine", "spot plate", "time", "blue-black", "rate", "amylase", "starch"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: concentrations, precision and rate calculation specified.", keywords: ["water bath", "±1", "1%", "1/time", "s⁻¹", "colourless", "operationalised", "controlled", "precision", "concentration"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict how temperature affects amylase activity, with scientific reasoning from enzyme theory.",
      guided: [
        { level: 2, body: "Level 1–2: A hypothesis makes a directional prediction. 'Warmer temperature will make amylase work faster' — this is a start, but gives no scientific reasoning about why or what happens at higher temperatures." },
        { level: 4, body: "Level 3–4: An if/then hypothesis: 'If temperature increases from 10°C to 37°C, then the rate of starch digestion will increase, because more energy means more collisions between enzyme and substrate.' This names IV and DV and gives a direction with brief reasoning." },
        { level: 6, body: "Level 5–6: A justified hypothesis with two parts: 'If temperature increases from 10°C to 37°C, then the rate will increase because greater kinetic energy leads to more frequent successful collisions between amylase active sites and starch molecules (Q10 ≈ 2). Above approximately 40°C, the rate will fall because the H-bonds maintaining the active site shape break — the enzyme denatures and can no longer bind starch.'" },
        { level: 8, body: "Level 7–8: A quantitative hypothesis: 'Rate will approximately double for every 10°C rise between 10°C and 37°C (Q10 = 2), following the Arrhenius relationship. At the optimum (~37°C for salivary amylase), rate is maximal. Above 40°C, denaturation of the active site increases sharply, reducing the fraction of functional enzyme molecules — rate falls steeply. Above 50°C, I predict all enzyme activity will cease because the active site will be fully denatured. Kc is unchanged; only reaction rate and enzyme conformation are affected by temperature.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how temperature affects the rate of starch digestion by amylase. Include scientific reasoning for both the rise and fall in rate.",
        scaffolds: [
          "If temperature increases from 10°C to 37°C, then the rate will...",
          "because greater kinetic energy causes...",
          "Above approximately ___°C, the rate will fall because...",
          "The hydrogen bonds maintaining the active site shape will...",
        ],
        rubric: [
          { level: 2, descriptor: "States a prediction about temperature and digestion rate.", keywords: ["temperature", "rate", "faster", "slower", "amylase", "starch", "increase", "decrease"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named; brief reasoning.", keywords: ["if", "then", "temperature", "rate", "kinetic energy", "collisions", "increases"], minKeywords: 2 },
          { level: 6, descriptor: "Two-part hypothesis: rise to optimum and fall above; denaturation explained.", keywords: ["optimum", "37", "denaturation", "hydrogen bonds", "active site", "shape", "q10", "kinetic energy", "fall"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative prediction; Arrhenius or Q10 cited; above 50°C prediction included.", keywords: ["q10", "doubles", "arrhenius", "50", "fully denatured", "fraction", "functional", "quantitative", "optimum", "37"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Identify and classify all variables for the amylase temperature investigation.",
      guided: [
        { level: 2, body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair). Temperature is the IV in this experiment." },
        { level: 4, body: "Level 3–4: IV = temperature (water bath set to 10, 20, 30, 37, 40, 45, 50, 55°C). DV = time for iodine colour to disappear from the spot plate (s); rate = 1/time (s⁻¹). Key CVs include amylase concentration and starch concentration." },
        { level: 6, body: "Level 5–6: IV: temperature (10, 20, 30, 37, 40, 45, 50, 55°C, ±1°C using a water bath). DV: time for iodine on spot plate to change from blue-black to colourless (s, measured to ±1 s); rate = 1/time (s⁻¹). CVs: amylase concentration (1%), starch concentration (1%), volume of each solution (2 cm³), pH (pH 7 phosphate buffer), type of iodine reagent." },
        { level: 8, body: "Level 7–8: As Level 6, plus: each CV stated with (a) how it is controlled ('pH maintained using a pH 7 phosphate buffer solution') and (b) why ('pH affects the ionic bonds in the active site; a change in pH would denature the enzyme and confound results'). Instrumental precision: stopwatch ±0.5 s; water bath ±1°C. Potential systematic error: if the tubes are not fully equilibrated to the water bath temperature before mixing, the enzyme will react at a different temperature than set — equilibration time of 5 minutes should be given." },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for an investigation into how temperature affects the rate of starch digestion by amylase.",
        scaffolds: [
          "Independent variable (IV): temperature, ranging from ___°C to ___°C",
          "Dependent variable (DV): time for iodine to turn from ___; rate = 1/time",
          "Controlled variables (CVs):",
          "I will control [CV] by... because...",
          "Precision: stopwatch measured to ±___ s; water bath to ±___°C",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "temperature", "time", "control", "variable"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units; rate calculation mentioned.", keywords: ["temperature", "time", "rate", "1/time", "s", "independent", "dependent", "amylase", "starch"], minKeywords: 2 },
          { level: 6, descriptor: "IV with range; DV with units; 3+ CVs named with values.", keywords: ["10°c", "55°c", "ph 7", "buffer", "amylase concentration", "starch concentration", "volume", "2 cm³", "1%", "iodine"], minKeywords: 3 },
          { level: 8, descriptor: "CVs with control method and reason; precision stated; systematic error identified.", keywords: ["phosphate buffer", "ph affects", "equilibrate", "5 min", "systematic error", "±1°c", "±0.5", "confound", "precision", "why"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, numbered step-by-step method for the amylase temperature investigation.",
      guided: [
        { level: 2, body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Mix amylase and starch at different temperatures and record results.' — no volumes, no equilibration, no safety, no details of iodine testing." },
        { level: 4, body: "Level 3–4: Steps in a logical sequence: (1) Set up water baths at each temperature. (2) Add amylase and starch solutions to separate test tubes in the water bath. (3) Mix together and start the timer. (4) Test drops on a spot plate with iodine every 30 s. (5) Record time for colour to disappear." },
        { level: 6, body: "Level 5–6: Numbered steps including: set up water baths (10, 20, 30, 37, 40, 45, 50, 55°C); add 2 cm³ of 1% amylase and 2 cm³ of 1% starch in pH 7 buffer to separate tubes; equilibrate for 5 minutes; mix together and start stopwatch; add drops to iodine spot plate every 30 s; record time for colourless endpoint; calculate rate = 1/time; repeat 3 times at each temperature. Safety: iodine is irritant — avoid skin contact; use eye protection." },
        { level: 8, body: "Level 7–8: Adds precision (pipette volumes to ±0.05 cm³ using a calibrated pipette); note that the first drop may appear colourless due to dilution — use a consistent drop size (calibrated dropper); explain why 30-second testing intervals are appropriate (amylase is fast at 37°C; intervals may need to be reduced to 15 s at optimum); reference using an automatic colorimetric method or a colour reference card to reduce subjectivity at the endpoint; explain how unreacted enzyme at high temperatures is confirmed by testing with iodine 5 minutes after initial colourless endpoint." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered step-by-step method for investigating the effect of temperature on amylase activity using the iodine spot plate technique.",
        scaffolds: [
          "1. Set up water baths at each of the following temperatures: 10, 20, 30, 37, 40, 45, 50, 55°C...",
          "2. Place 2 cm³ of 1% amylase solution and 2 cm³ of 1% starch (pH 7 buffer) in separate tubes in the water bath...",
          "3. Allow both tubes to equilibrate for 5 minutes at the set temperature...",
          "4. Mix the tubes together, start the stopwatch, and immediately test a drop on the spot plate with iodine...",
          "5. Test a drop every 30 seconds until the colour changes from blue-black to colourless...",
          "6. Record the time and calculate rate = 1/time. Repeat 3 times.",
          "Safety: wear eye protection; iodine solution is irritant.",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials or gives 1–2 vague steps.", keywords: ["amylase", "starch", "temperature", "iodine", "mix", "test"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence with 4+ steps; iodine test described.", keywords: ["water bath", "mix", "spot plate", "iodine", "timer", "colour", "record", "test"], minKeywords: 2 },
          { level: 6, descriptor: "Numbered steps with volumes; equilibration; pH buffer; repeat 3×; safety.", keywords: ["2 cm³", "1%", "equilibrate", "5 min", "ph 7", "buffer", "30 s", "repeat", "safety", "eye protection", "rate = 1/time"], minKeywords: 4 },
          { level: 8, descriptor: "Precision of pipetting; subjectivity reduced; high-temperature confirmation; interval adjustment.", keywords: ["calibrated pipette", "±0.05", "reference card", "colorimetric", "15 s", "37°c", "subjectivity", "consistency", "confirm", "5 min after"], minKeywords: 3 },
        ],
      },
    },
  ],
}
