import type { StrandhootPack } from "../engine/types"

export const digestionCritB: StrandhootPack = {
  slug: "digestion-crit-b",
  title: "Investigating Pepsin Activity",
  subject: "MYP Biology",
  criterion: "B",
  topic: "pH and protein digestion",
  accent: "#c0392b",
  icon: "🍎",
  statementOfInquiry:
    "Each component in a system must perform its specific function at the right time and place for the system as a whole to be successful.",
  estMinutes: 25,
  intro:
    "Design a rigorous investigation into how pH affects the rate of protein digestion by pepsin. Each strand takes you one step further: from forming a sharp research question and testable hypothesis, to classifying variables and writing a numbered, safe method.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe", label: "Safe Scientist", icon: "🥼", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Pepsin pH investigation", blurb: "Design an experiment on pH and protein digestion rate", icon: "🍎" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for a pepsin activity investigation.",
      guided: [
        {
          level: 2,
          body: "A research question names what you are investigating. Vague example: 'Does pH affect pepsin?' — not testable as a controlled experiment because no variables or range are specified.",
        },
        {
          level: 4,
          body: "A stronger question names the independent variable (IV) and dependent variable (DV): 'How does pH affect the rate of protein digestion by pepsin?' IV = pH; DV = rate of digestion.",
        },
        {
          level: 6,
          body: "A specific, testable question: 'How does pH (range 1–8) affect the rate of protein digestion by pepsin, measured as the time for an albumin suspension to become clear at 37°C?' This names IV, DV, the pH range, the measurement technique, and a key controlled variable (temperature).",
        },
        {
          level: 8,
          body: "An operationalised question specifies measurement technique and precision: 'How does pH (1, 2, 3, 4, 5, 6, 7, 8; controlled with calibrated buffer solutions to ±0.1 pH units) affect the rate of protein digestion by pepsin (0.5% w/v), measured as the reciprocal of clearing time (1/t in s⁻¹) for a 2% albumin suspension at 37 ± 0.5°C using a colorimeter at 600 nm?' This operationalises both IV and DV with specific instruments and precision.",
        },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate how pH (range 1–8) affects the rate of protein digestion by pepsin, using an albumin suspension (goes from cloudy to clear as protein is digested).",
        scaffolds: [
          "How does pH (range ___) ...",
          "...affect the rate of protein digestion by pepsin...",
          "...measured as... (cloudy → clear)",
          "...at constant temperature of ___°C?",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["ph", "pepsin", "protein", "digestion", "investigate", "affect", "albumin"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV with clear direction.", keywords: ["ph", "rate", "digestion", "pepsin", "how does", "affect", "protein", "albumin"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; pH range stated; measurement technique named; one CV identified.", keywords: ["1-8", "rate", "clear", "cloudy", "albumin", "37", "temperature", "time", "suspension", "constant"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: buffer precision, colorimeter, 1/t rate, and instrument named.", keywords: ["buffer", "0.1", "colorimeter", "600 nm", "1/t", "reciprocal", "0.5%", "2%", "37", "±", "operationalised"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict the effect of pH on pepsin activity with scientific reasoning.",
      guided: [
        {
          level: 2,
          body: "A hypothesis makes a directional prediction. 'Higher pH makes pepsin work better' — this is a start but the direction is incorrect and gives no scientific reasoning.",
        },
        {
          level: 4,
          body: "An if/then hypothesis: 'If pH decreases toward 2, then the rate of protein digestion by pepsin will increase.' Names IV and DV and gives a direction, but lacks explanation.",
        },
        {
          level: 6,
          body: "A justified hypothesis: 'If pH is approximately 2, pepsin will have its highest rate of protein digestion, because pepsin evolved in the stomach where HCl maintains pH 1–3. Above pH 4, pepsin's active site will change shape (denaturation), reducing substrate binding and digestion rate significantly.'",
        },
        {
          level: 8,
          body: "A quantitative hypothesis: 'Pepsin will show maximum activity at pH 2–3 (matching gastric pH), with digestion rate declining sharply above pH 4 as ionisable amino acid residues in the active site lose their correct protonation state. Above pH 5, the enzyme will be largely denatured and rate will approach zero. I predict the rate (1/time for clearing) at pH 2 will be >5× higher than at pH 6, based on published Km data. Kcat will be unchanged by pH — pH affects binding (Km), not catalytic rate directly.'",
        },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how pH affects the rate of protein digestion by pepsin. Include a scientific explanation linked to enzyme structure.",
        scaffolds: [
          "If pH is approximately ___,  then the rate of protein digestion will be...",
          "because pepsin evolved to work in the ___ where the pH is approximately ___...",
          "Above pH ___, the enzyme will ___ because...",
          "I predict the rate will be highest at pH ___ and lowest at pH ___ because...",
        ],
        rubric: [
          { level: 2, descriptor: "States a prediction about pH and pepsin activity.", keywords: ["ph", "pepsin", "rate", "increases", "decreases", "predict", "digestion", "protein"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named and direction correct.", keywords: ["if", "then", "ph 2", "ph 3", "rate", "highest", "stomach", "decreases", "increases"], minKeywords: 2 },
          { level: 6, descriptor: "Scientific explanation: stomach pH, optimal pH, denaturation above pH 4.", keywords: ["optimal ph", "stomach", "hcl", "ph 2", "ph 3", "active site", "denature", "denaturation", "shape", "ph 4", "decreases"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative prediction; Km/Kcat distinction; protonation state mentioned.", keywords: ["quantitative", "km", "kcat", "protonation", "ionisable", "residues", "5×", "ph 5", "denatured", "binding", "published", "catalytic"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Identify and classify all variables for the pepsin pH investigation.",
      guided: [
        {
          level: 2,
          body: "Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair).",
        },
        {
          level: 4,
          body: "For this experiment: IV = pH (the different buffer solutions pH 1, 2, 3, 4, 5, 6, 7, 8); DV = time for albumin suspension to become clear (seconds), or rate = 1/time (s⁻¹).",
        },
        {
          level: 6,
          body: "IV: pH (buffer solutions pH 1, 2, 3, 4, 5, 6, 7, 8). DV: time for albumin suspension to clear (s, ± 1 s stop clock) or rate = 1/t (s⁻¹); alternatively, absorbance at 600 nm measured every 2 min with a colorimeter. CVs: pepsin concentration (0.5% w/v), albumin concentration (2% w/v), temperature (37°C water bath), volume of albumin suspension (5 cm³), volume of pepsin solution (1 cm³).",
        },
        {
          level: 8,
          body: "As Level 6, plus: each CV stated with how it is controlled and why. Temperature (37°C ± 0.5°C, controlled by water bath — temperature affects enzyme kinetics; a 10°C rise approximately doubles rate). Pepsin concentration (0.5% w/v, measured with a balance, same stock solution — affects rate directly). Albumin concentration (2% w/v — substrate concentration affects rate). Buffer concentration (50 mM phosphate or citrate, same molarity across pH values — ensures pH is maintained during the reaction). Instrumental precision: colorimeter at 600 nm (±0.01 absorbance units). Potential systematic error: commercial pepsin preparations contain other proteases that will also digest albumin, inflating the apparent rate.",
        },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for an experiment investigating how pH (1–8) affects the rate of protein digestion by pepsin using an albumin suspension.",
        scaffolds: [
          "Independent variable (IV): pH — values to be tested: ___",
          "Dependent variable (DV): time for albumin to clear (s), or rate = ___",
          "Controlled variables (CVs): pepsin concentration: ___, albumin concentration: ___, temperature: ___",
          "I will control [CV] by... because...",
          "Instrumental precision for DV: ___",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "variable", "ph", "rate", "control", "pepsin"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units.", keywords: ["independent variable", "dependent variable", "ph", "rate", "time", "seconds", "1/t", "albumin", "clear"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV and 3+ CVs named with values/units.", keywords: ["buffer", "ph 1", "ph 8", "0.5%", "2%", "37°c", "temperature", "concentration", "volume", "colorimeter"], minKeywords: 3 },
          { level: 8, descriptor: "CVs explained with control method, reason and precision stated; systematic error identified.", keywords: ["water bath", "±0.5", "50 mm", "buffer concentration", "systematic error", "precision", "colorimeter", "0.01", "protease", "control method", "why", "kinetics"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, step-by-step numbered method for investigating pepsin activity at different pH values.",
      guided: [
        {
          level: 2,
          body: "Lists materials but gives only 1–2 vague steps: 'Mix pepsin and albumin at different pH values, then wait.' — No volumes, no safety, no measurement described.",
        },
        {
          level: 4,
          body: "Steps in a logical sequence: (1) Prepare buffer solutions pH 1–8. (2) Add albumin suspension and pepsin to each test tube. (3) Place in 37°C water bath for 5 min. (4) Mix and start timer. (5) Record time for suspension to clear.",
        },
        {
          level: 6,
          body: "Numbered steps with volumes, safety, and measurement: (1) Prepare 8 buffer solutions (pH 1–8) using citrate-phosphate buffer; check each with a calibrated pH meter. (2) Add 5 cm³ albumin suspension (2% w/v) to 8 labelled test tubes. (3) Add 1 cm³ pepsin solution (0.5% w/v) to each. (4) Allow to equilibrate at 37°C in a water bath for 5 min. (5) Mix gently, start stopwatch. (6) Record time for each tube to become visually clear (or measure absorbance at 600 nm every 2 min using a colorimeter). Safety: wear gloves; pepsin solution is mildly irritant; buffer solutions at pH 1–2 are strongly acidic — handle in a fume cupboard.",
        },
        {
          level: 8,
          body: "As Level 6, plus: (7) Repeat each pH 3 times for reliability, calculate mean clearing time and standard deviation. (8) Plot rate (1/t) on y-axis vs pH on x-axis; draw a smooth curve. Justification: albumin (egg white protein) becomes cloudy when denatured; as pepsin digests it at pH 2, the suspension clears as protein fragments become soluble. Colorimeter at 600 nm is more objective than visual endpoint — record absorbance every 2 min, plot absorbance vs time, use initial rate (steepest tangent at t=0) as DV. Control: add distilled water instead of pepsin at pH 2 — any clearing is due to acid alone, not enzyme.",
        },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the pepsin investigation. You will use albumin suspension (cloudy → clear as protein is digested), buffer solutions (pH 1–8), pepsin solution, a colorimeter, and a 37°C water bath.",
        scaffolds: [
          "1. Prepare buffer solutions pH 1, 2, 3, 4, 5, 6, 7, 8 using...",
          "2. Add ___ cm³ of 2% albumin suspension to each of 8 labelled test tubes...",
          "3. Add ___ cm³ of 0.5% pepsin solution to each tube...",
          "4. Place all tubes in a water bath at 37°C for ___ minutes to equilibrate...",
          "5. Mix gently and start the stopwatch. Record... every 2 minutes using...",
          "Safety: wear gloves; pH 1–2 solutions are strongly acidic because...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials only or gives 1–2 vague steps.", keywords: ["pepsin", "albumin", "ph", "mix", "wait", "test tube", "buffer"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence with 4+ steps.", keywords: ["buffer", "albumin", "pepsin", "water bath", "37", "timer", "clear", "measure", "mix", "minutes"], minKeywords: 2 },
          { level: 6, descriptor: "Numbered steps with volumes, 37°C water bath, colorimeter or visual endpoint, safety.", keywords: ["5 cm³", "1 cm³", "37°c", "5 min", "equilibrate", "colorimeter", "600 nm", "gloves", "acidic", "citrate", "ph meter", "labelled"], minKeywords: 4 },
          { level: 8, descriptor: "Three repeats; initial rate; control with water; colorimeter over visual; justification of albumin model.", keywords: ["3 times", "repeat", "mean", "standard deviation", "initial rate", "tangent", "control", "distilled water", "albumin", "egg white", "soluble", "fragments", "objective"], minKeywords: 3 },
        ],
      },
    },
  ],
}
