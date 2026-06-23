import type { StrandhootPack } from "../engine/types"

export const osmosisCritB: StrandhootPack = {
  slug: "osmosis-crit-b",
  title: "Osmosis in Potato Cylinders",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Sucrose concentration and mass change",
  accent: "#c0392b",
  icon: "💧",
  statementOfInquiry: "The changes in the weather patterns caused by current economic activity may not be fair to future generations.",
  estMinutes: 25,
  intro:
    "Design a controlled investigation into osmosis using potato cylinders and sucrose solutions. Each strand builds one component of a rigorous scientific design — from writing a focused research question and a justified hypothesis, to classifying variables and producing a numbered, safe method.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "master", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Potato osmosis investigation", blurb: "Effect of sucrose concentration on % mass change of potato cylinders", icon: "💧" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for a potato osmosis investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A research question names what you are investigating. Vague example: 'Does osmosis happen in potato?' — too broad and not a controlled, testable experiment." },
        { level: 4, body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does sucrose concentration affect the mass of potato cylinders?' IV = sucrose concentration; DV = mass change of potato cylinders." },
        { level: 6, body: "Level 5–6: A specific, testable question: 'How does the concentration of sucrose solution (0–0.8 mol/dm³) affect the percentage change in mass of potato cylinders after 30 minutes of immersion?' This names the IV, DV, the range, and a key controlled variable (time)." },
        { level: 8, body: "Level 7–8: An operationalised question specifies how measurement will be done: 'How does sucrose concentration (0, 0.1, 0.2 … 0.8 mol/dm³, prepared by serial dilution) affect the percentage change in mass (measured to ±0.01 g on an electronic balance) of potato cylinders (2 cm length, same cork borer) after 30 minutes immersion at room temperature?' It includes measurement technique, precision, a defined range, and key controlled conditions." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate the effect of sucrose concentration on osmosis in potato cylinders.",
        scaffolds: [
          "How does the concentration of sucrose solution...",
          "...affect the percentage change in mass of potato cylinders...",
          "...after ___ minutes of immersion?",
          "Concentration range: 0 to ___ mol/dm³",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["potato", "sucrose", "osmosis", "concentration", "mass", "investigate"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV with clear direction.", keywords: ["concentration", "sucrose", "mass", "percentage", "change", "how does", "affect"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; range stated; time controlled; percentage change specified.", keywords: ["0.8", "mol/dm", "percentage change", "30 minutes", "immersion", "range", "concentration"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: measurement technique, precision and controlled conditions stated.", keywords: ["0.01 g", "balance", "cork borer", "serial dilution", "±", "operationalised", "room temperature", "2 cm", "precision"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict how sucrose concentration affects potato cylinder mass change, with osmosis reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A hypothesis makes a directional prediction. 'Higher sucrose concentration makes the potato lose mass' — this is a start, but gives no scientific reasoning about osmosis." },
        { level: 4, body: "Level 3–4: An if/then hypothesis: 'If sucrose concentration increases, then the percentage change in mass of potato cylinders will decrease.' This names IV and DV and gives a direction, but lacks explanation using water potential." },
        { level: 6, body: "Level 5–6: A justified hypothesis: 'At concentrations below the isotonic point (~0.3 mol/dm³), the solution has a higher water potential than the potato cell contents, so water enters the cells by osmosis and the cylinder gains mass. Above the isotonic point, the external solution has a lower water potential, so water leaves the cells and the cylinder loses mass. At the isotonic point, water potential of the solution equals that of the cell — percentage change = 0.'" },
        { level: 8, body: "Level 7–8: A quantitative hypothesis: 'The relationship between sucrose concentration and % mass change is expected to be linear (R² ≈ 1.0), with the isotonic point at approximately 0.29–0.30 mol/dm³ (where % change = 0). This value corresponds to the water potential of the potato cell cytoplasm. Above this concentration, plasmolysis begins; the gradient of mass loss will be approximately −19% per mol/dm³. This prediction is based on the direct proportionality between solute concentration and water potential depression (van't Hoff relationship at dilute concentrations).'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis for the potato osmosis investigation. Predict how sucrose concentration will affect percentage mass change, and justify your prediction using water potential and osmosis.",
        scaffolds: [
          "If sucrose concentration increases, then...",
          "...because the water potential of the solution...",
          "At concentrations below the isotonic point...",
          "At concentrations above the isotonic point...",
          "At the isotonic point (~0.3 mol/dm³), % change = 0 because...",
        ],
        rubric: [
          { level: 2, descriptor: "States a prediction about concentration and mass.", keywords: ["sucrose", "concentration", "mass", "gain", "lose", "prediction", "potato"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named and direction predicted.", keywords: ["if", "then", "concentration", "mass", "percentage", "decrease", "increase", "osmosis"], minKeywords: 2 },
          { level: 6, descriptor: "Water potential used to justify prediction; isotonic point identified.", keywords: ["water potential", "isotonic", "0.3", "hypotonic", "hypertonic", "higher water potential", "lower water potential", "gain", "lose"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative prediction with gradient and isotonic concentration estimated; linearity stated.", keywords: ["linear", "0.29", "0.30", "gradient", "−19", "r²", "plasmolysis", "van't hoff", "water potential", "quantitative"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify and operationalise all variables for the potato osmosis experiment.",
      guided: [
        { level: 2, body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair)." },
        { level: 4, body: "Level 3–4: For the potato osmosis experiment: IV = sucrose concentration (mol/dm³); DV = percentage change in mass of potato cylinders (%). The formula for DV is: % change = (final mass − initial mass) / initial mass × 100." },
        { level: 6, body: "Level 5–6: IV: sucrose concentration (0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8 mol/dm³). DV: percentage change in mass ([final − initial] / initial × 100). CVs: same potato variety (same water potential), same region of tuber, same cylinder length (2 cm, same cork borer), same immersion time (30 min), same temperature (room temperature), blot cylinders dry before final weighing." },
        { level: 8, body: "Level 7–8: As Level 5–6, plus: each CV stated with how it is controlled and why it matters. 'Same potato variety — controlled by using one potato; variety affects cell water potential, so different varieties would give different isotonic points.' 'Same cylinder length (2 cm, measured with ruler) and same cork borer (same diameter) — ensures same surface area to volume ratio, affecting rate of osmosis.' 'Blot dry on paper towel using consistent 5 blots — removes surface water that would add to apparent mass without being inside the cells.' Instrumental precision: balance to ±0.01 g; uncertainty in % change = ±0.02 g / initial mass × 100." },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for the potato cylinder osmosis investigation.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV): % change in mass = ",
          "Controlled variables (CVs):",
          "I will control [CV] by... because...",
          "I will measure the DV using a balance accurate to...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "variable", "concentration", "mass", "control"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units and formula for % change.", keywords: ["independent variable", "dependent variable", "sucrose", "percentage", "mass", "formula", "mol/dm", "final", "initial"], minKeywords: 2 },
          { level: 6, descriptor: "IV with range, DV with formula, and 3+ CVs named with values.", keywords: ["0 to 0.8", "2 cm", "cork borer", "30 min", "blot dry", "same potato", "room temperature", "controlled"], minKeywords: 3 },
          { level: 8, descriptor: "CVs explained with control method, reason and precision; uncertainty calculated.", keywords: ["variety", "water potential", "surface area", "volume ratio", "blot", "5 blots", "0.01 g", "±", "uncertainty", "diameter", "control method", "why"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, numbered step-by-step method for the potato osmosis investigation.",
      guided: [
        { level: 2, body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Cut potato and put in sucrose. Weigh it.' — no volumes, no repeats, no % change calculation, no safety." },
        { level: 4, body: "Level 3–4: Steps in a logical sequence: (1) Cut potato cylinders using cork borer. (2) Weigh each cylinder and record initial mass. (3) Place cylinders in sucrose solutions of different concentrations. (4) Leave for 30 minutes. (5) Remove, weigh, and record final mass." },
        { level: 6, body: "Level 5–6: Numbered steps specifying: cut cylinders to 2 cm using same cork borer; record initial mass to ±0.01 g; place 3 cylinders per concentration in labelled boiling tubes; add 20 cm³ sucrose solution; leave 30 min at room temperature; remove and blot dry (5 blots on paper towel); reweigh and record final mass; calculate % change = (final − initial) / initial × 100; repeat 3 times per concentration for reliability." },
        { level: 8, body: "Level 7–8: As Level 5–6, plus: prepare sucrose solutions by serial dilution from a stock 1.0 mol/dm³ solution; include a risk assessment (sucrose — non-hazardous; scalpel — cut hazard, use cutting board and lab coat, apply plaster if cut); note that blotting must be standardised (5 blots with same pressure) to prevent systematic error in DV; explain why percentage change (not absolute change) is used — it accounts for variation in initial cylinder mass; state that mean % change across 3 repeats will be calculated with anomalous results excluded and 3 more trials added." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the potato osmosis investigation.",
        scaffolds: [
          "1. Cut potato cylinders to ___ cm using a ___ and measure initial mass to ± ___ g.",
          "2. Prepare sucrose solutions at concentrations of...",
          "3. Place ___ cylinders into each labelled boiling tube and add ___ cm³ of solution...",
          "4. Leave for ___ minutes at room temperature.",
          "5. Remove cylinders, blot dry, and reweigh. Calculate % change = ...",
          "6. Repeat ___ times. Safety: ...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials or gives 1–2 vague steps.", keywords: ["potato", "sucrose", "weigh", "cut", "measure", "tubes"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence with 4+ clear steps.", keywords: ["cut", "initial mass", "weigh", "label", "30 min", "remove", "final mass", "cork borer"], minKeywords: 2 },
          { level: 6, descriptor: "Numbered steps with volumes, blotting, % change formula, and 3 repeats.", keywords: ["2 cm", "20 cm³", "blot dry", "±0.01 g", "percentage change", "formula", "3 cylinders", "3 times", "30 minutes", "repeat"], minKeywords: 4 },
          { level: 8, descriptor: "Serial dilution stated; risk assessment; standardised blotting explained; percentage change justified; anomalous result protocol.", keywords: ["serial dilution", "stock", "scalpel", "risk", "standardised", "systematic error", "initial mass", "anomalous", "exclude", "3 more", "percentage change", "accounts for"], minKeywords: 3 },
        ],
      },
    },
  ],
}
