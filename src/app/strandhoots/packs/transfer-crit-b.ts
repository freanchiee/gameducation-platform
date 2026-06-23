import type { StrandhootPack } from "../engine/types"

export const transferCritB: StrandhootPack = {
  slug: "transfer-crit-b",
  title: "Designing an Acid–Base Titration Investigation",
  subject: "MYP Chemistry",
  criterion: "B",
  topic: "Investigating ethanoic acid concentration by titration",
  accent: "#c0392b",
  icon: "🧪",
  statementOfInquiry:
    "Technological advances in analytical devices enhance the ability of scientists to monitor the transfer of matter when changes occur during chemical reactions.",
  estMinutes: 28,
  intro:
    "Design a complete investigation to determine the concentration of a weak acid (ethanoic acid) by titration with a strong base (sodium hydroxide). This is the real experiment from Chapter 12 of your textbook. Each strand — research question, hypothesis, variables, and method — levels up from vague to fully operationalised scientific design.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Hypothesis Writer", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Controller", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe-scientist", label: "Safe Scientist", icon: "🥼", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Titration investigation design", blurb: "Design the acid–base titration of ethanoic acid with sodium hydroxide", icon: "🧪" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for the titration investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A research question names what you are investigating. Vague example: 'Does ethanoic acid react with sodium hydroxide?' — too broad, no variables identified." },
        { level: 4, body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does the volume of sodium hydroxide solution added affect the pH of ethanoic acid solution?' IV = volume of NaOH; DV = pH." },
        { level: 6, body: "Level 5–6: A specific, testable question: 'How does the volume of 0.50 mol dm⁻³ sodium hydroxide solution (0–30 cm³, added in 1 cm³ increments) affect the pH of 25.0 cm³ of ethanoic acid solution of unknown concentration, as monitored by a pH probe?' This names the standard solution concentration, volume range, DV measurement method, and the controlled starting volume." },
        { level: 8, body: "Level 7–8: An operationalised question specifies measurement precision: 'How does the volume of 0.500 mol dm⁻³ NaOH (certified standard solution, measured to ±0.05 cm³ from a 50 cm³ burette) affect the pH (measured to ±0.01 pH units by a calibrated pH probe) of 25.0 cm³ of ethanoic acid solution of unknown concentration, in order to determine the concentration of the ethanoic acid to 3 significant figures?'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate the concentration of an ethanoic acid solution by titration with sodium hydroxide. The research question should identify the variables and the method of measurement.",
        scaffolds: [
          "How does the volume of... sodium hydroxide added...",
          "...affect the pH of... ethanoic acid solution...",
          "...as measured by a pH probe / phenolphthalein indicator...",
          "...in order to determine the concentration of...",
        ],
        rubric: [
          { level: 2, descriptor: "Names the substances or the topic vaguely.", keywords: ["ethanoic acid", "sodium hydroxide", "titration", "concentration", "ph", "investigate"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with some direction.", keywords: ["volume", "naoh", "ph", "ethanoic acid", "how does", "affect", "unknown"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; standard solution concentration stated; measurement method named; volume range or increment stated.", keywords: ["0.50 mol", "25.0 cm³", "ph probe", "burette", "range", "concentration", "unknown", "increments"], minKeywords: 3 },
          { level: 8, descriptor: "Fully operationalised: precision of both IV and DV stated, significant figures of outcome specified.", keywords: ["±0.05", "±0.01", "calibrated", "burette", "50 cm³", "0.500 mol", "3 significant", "precision", "operationalised"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict what will happen to the pH as sodium hydroxide is added to ethanoic acid, with scientific reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A prediction with no reasoning: 'I think the pH will increase as we add sodium hydroxide.' — correct direction, but no science." },
        { level: 4, body: "Level 3–4: An if/then hypothesis: 'If more sodium hydroxide is added to the ethanoic acid, then the pH will increase because the base neutralises the acid.' Names both IV and DV with scientific direction." },
        { level: 6, body: "Level 5–6: A justified hypothesis: 'If sodium hydroxide is added to ethanoic acid, then the pH will increase slowly at first (buffer zone), then rise steeply at the equivalence point, then level off at high pH. This is because ethanoic acid is a weak acid that partially dissociates; sodium hydroxide is a strong base that fully dissociates. The equivalence point is at pH > 7 because the sodium ethanoate salt formed is basic.'" },
        { level: 8, body: "Level 7–8: A quantitative hypothesis: 'If 0.50 mol dm⁻³ NaOH is added to 25.0 cm³ ethanoic acid of estimated concentration 0.45 mol dm⁻³ (based on a rough titration), the equivalence point will require approximately 22.5 cm³ of NaOH (from n = c × V = 0.45 × 0.025 = 0.01125 mol; V(NaOH) = 0.01125 ÷ 0.50 = 0.0225 dm³ = 22.5 cm³). The pH at equivalence will be ~8.9 (basic) because sodium ethanoate hydrolyses in water, producing OH⁻. Phenolphthalein (pH 8.2–10) is therefore the appropriate indicator.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how the pH will change as sodium hydroxide is added to ethanoic acid during a titration. Include scientific reasoning and, for a high level, a prediction of the pH at the equivalence point.",
        scaffolds: [
          "If sodium hydroxide is added to ethanoic acid, then the pH will...",
          "because ethanoic acid is a weak acid that..., and sodium hydroxide...",
          "The equivalence point will be at pH... because the salt formed (sodium ethanoate) is...",
          "I predict that approximately ___ cm³ of NaOH will be needed because...",
        ],
        rubric: [
          { level: 2, descriptor: "States pH will increase as base is added.", keywords: ["ph", "increase", "base", "sodium hydroxide", "neutralise", "add"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV; neutralisation reaction mentioned.", keywords: ["if", "then", "ph", "increase", "neutralise", "weak acid", "base", "sodium hydroxide"], minKeywords: 2 },
          { level: 6, descriptor: "Buffer zone described; equivalence point pH stated as above 7; weak acid partial dissociation mentioned.", keywords: ["buffer", "equivalence", "ph > 7", "weak acid", "partial", "dissociation", "sodium ethanoate", "basic", "steep"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative prediction of equivalence volume with calculation shown; indicator selection justified.", keywords: ["22", "0.0225", "0.45", "moles", "calculation", "phenolphthalein", "8.9", "hydrolysis", "indicator", "quantitative"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Identify and classify all variables for the acid–base titration experiment.",
      guided: [
        { level: 2, body: "Level 1–2: Variable types: independent (IV — what you deliberately change), dependent (DV — what you measure), controlled (CVs — what you keep the same to make it a fair test)." },
        { level: 4, body: "Level 3–4: IV = volume of 0.50 mol dm⁻³ NaOH added (cm³); DV = pH of the ethanoic acid solution at each addition. CVs include: volume of ethanoic acid at the start (25.0 cm³), concentration of NaOH, temperature, equipment used." },
        { level: 6, body: "Level 5–6: IV: volume of NaOH (0–30 cm³, added in increments of 1 cm³ from a 50 cm³ burette, ±0.05 cm³). DV: pH of the solution (measured by a calibrated pH probe, ±0.01 pH units, after each addition). CVs: volume of ethanoic acid (25.0 cm³, measured with a 25 cm³ bulb pipette, ±0.06 cm³); concentration of NaOH (0.50 mol dm⁻³ standard solution); temperature (room temperature ~20°C); rinsing of equipment with appropriate solutions to avoid contamination." },
        { level: 8, body: "Level 7–8: As Level 5–6, plus: each CV stated with how it is controlled and why. For example: 'Concentration of NaOH is controlled by using a certified standard solution prepared by the teacher — any error here creates a systematic error in all calculated concentrations.' 'Temperature is controlled by working in a temperature-constant laboratory — temperature affects Ka (acid dissociation constant) of ethanoic acid, changing both the pH curve shape and the position of the equivalence point.' 'The pipette is rinsed with ethanoic acid solution and the burette with NaOH to prevent dilution errors.'" },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for the acid–base titration: adding sodium hydroxide to ethanoic acid and measuring the pH at each addition using a pH probe.",
        scaffolds: [
          "Independent variable (IV): the volume of NaOH added...",
          "Dependent variable (DV): the pH of the solution, measured by...",
          "Controlled variables (CVs): volume of ethanoic acid (how controlled)..., concentration of NaOH (how controlled)..., temperature...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable with one example.", keywords: ["independent", "dependent", "variable", "volume", "ph", "naoh", "control"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units.", keywords: ["independent variable", "dependent variable", "cm³", "ph", "naoh", "burette", "probe"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV and 3+ CVs listed with values and units.", keywords: ["25.0 cm³", "0.50 mol", "pipette", "burette", "temperature", "calibrated", "ph probe", "controlled", "rinsing"], minKeywords: 3 },
          { level: 8, descriptor: "Each CV has a control method and a scientific reason; systematic error implications discussed.", keywords: ["systematic error", "ka", "acid dissociation", "temperature", "water bath", "certified", "dilution", "contamination", "why", "reason", "precision"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, step-by-step method for the acid–base titration of ethanoic acid with sodium hydroxide.",
      guided: [
        { level: 2, body: "Level 1–2: Lists apparatus only or gives 1–2 vague steps: 'Put the acid in a flask, add the base and record the pH.' No volumes, no safety, no indicator or probe set-up." },
        { level: 4, body: "Level 3–4: Logical sequence of 4+ steps: (1) Pipette 25 cm³ of ethanoic acid into a conical flask. (2) Add phenolphthalein indicator. (3) Fill the burette with sodium hydroxide. (4) Add NaOH dropwise, swirl, and observe colour change. (5) Record the volume of NaOH added at the endpoint." },
        { level: 6, body: "Level 5–6: Detailed numbered steps with volumes, safety, and pH monitoring. E.g.: (1) Rinse the 25 cm³ bulb pipette with ethanoic acid; pipette exactly 25.0 cm³ into a clean 150 cm³ conical flask. (2) Add three drops of phenolphthalein indicator. (3) Rinse and fill the 50 cm³ burette with 0.50 mol dm⁻³ NaOH; remove the air bubble; record the initial volume. (4) Add NaOH in 1 cm³ increments; swirl after each addition; record the pH. (5) As the colour change approaches, slow to 1 drop at a time. (6) Record the final volume when a permanent light-pink colour remains (endpoint). Safety: wear eye protection; NaOH is caustic and corrosive." },
        { level: 8, body: "Level 7–8: Adds concordant results protocol (repeat until two consecutive readings agree within 0.10 cm³); balanced equation CH₃COOH(aq) + NaOH(aq) → CH₃COONa(aq) + H₂O(l) cited to justify 1:1 mole ratio; identifies that the rough titration establishes the approximate endpoint; describes rinsing burette with NaOH (not water) to avoid concentration error; notes that a white tile under the flask helps see the phenolphthalein colour change; states that the endpoint pH is ~8.9 for this specific combination." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered step-by-step method for the titration of 25.0 cm³ of ethanoic acid solution of unknown concentration with 0.50 mol dm⁻³ sodium hydroxide (standard solution). Include safety precautions, apparatus details, and how you will determine the endpoint.",
        scaffolds: [
          "1. Rinse the 25 cm³ bulb pipette with ethanoic acid, then pipette exactly 25.0 cm³ into a clean conical flask.",
          "2. Add three drops of phenolphthalein indicator and swirl to mix.",
          "3. Rinse the 50 cm³ burette with 0.50 mol dm⁻³ sodium hydroxide solution, then fill it and record the initial volume.",
          "4. Open the tap and add NaOH in 1 cm³ increments, swirling after each addition and recording the pH / watching for colour change.",
          "5. As the endpoint approaches (localized pink flash that disappears on swirling), slow to one drop at a time.",
          "Safety: wear eye protection; NaOH is caustic — avoid skin contact.",
        ],
        rubric: [
          { level: 2, descriptor: "Vague steps or apparatus list only.", keywords: ["flask", "acid", "base", "add", "record", "burette", "indicator"], minKeywords: 1 },
          { level: 4, descriptor: "4+ logical steps; endpoint identified.", keywords: ["pipette", "25 cm³", "phenolphthalein", "burette", "naoh", "swirl", "endpoint", "colour change", "record"], minKeywords: 3 },
          { level: 6, descriptor: "Volumes specified; rinsing steps; safety; pH probe or indicator method; initial and final volume recorded.", keywords: ["rinse", "25.0 cm³", "0.50 mol", "record initial", "final volume", "eye protection", "caustic", "1 cm³", "swirl", "white tile"], minKeywords: 4 },
          { level: 8, descriptor: "Concordant results protocol; balanced equation cited; rough titration; burette rinsing explained; endpoint pH stated.", keywords: ["concordant", "0.10 cm³", "rough titration", "balanced equation", "ch3cooh", "1:1", "rinse with naoh", "white tile", "endpoint", "8.9", "repeat"], minKeywords: 4 },
        ],
      },
    },
  ],
}
