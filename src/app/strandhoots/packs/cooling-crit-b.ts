import type { StrandhootPack } from "../engine/types"

// B4 — Rate of Cooling: insulation effect · Criterion B (Inquiring & Designing)
// Sources: Hodder Physics Ch. 14 (thermal energy); Oxford MYP Physics "Thermal Physics";
// Newton's law of cooling; classic insulation comparative investigation.
export const coolingCritB: StrandhootPack = {
  slug: "cooling-crit-b",
  title: "Rate of Cooling — Designing",
  subject: "MYP Physics",
  criterion: "B",
  topic: "Rate of cooling (insulation effect)",
  accent: "#0984b5",
  icon: "🧊",
  statementOfInquiry:
    "The rate at which objects cool depends on insulation — designing a fair comparison reveals the science of thermal energy transfer.",
  estMinutes: 30,
  intro:
    "Design an investigation into how different types of insulation affect the rate of cooling of hot water. Plan a fair, reliable method to compare insulators.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hyp", atLevel: 8 },
    { id: "controller", label: "Variable Wrangler", icon: "🎛", description: "Reach Level 8 on Variables", strandId: "vars", atLevel: 8 },
    { id: "designer", label: "Master Designer", icon: "📐", description: "Reach Level 6+ on every strand", atLevel: 6 },
  ],
  paths: [
    { id: "insulation-investigation", label: "Insulation investigation", blurb: "How insulator type affects cooling rate", icon: "🧊" },
  ],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question about the rate of cooling.",
      guided: [
        { level: 2, body: "Level 1–2: A vague question. e.g. \"Does insulation keep things warm?\"" },
        { level: 4, body: "Level 3–4: Names one variable. e.g. \"Does the type of insulation affect how quickly water cools?\"" },
        { level: 6, body: "Level 5–6: States both IV and DV clearly. e.g. \"How does the type of insulation material affect the rate of cooling (°C/min) of hot water?\"" },
        { level: 8, body: "Level 7–8: Focused, testable and measurable with range and units. e.g. \"How does wrapping a beaker of water (starting at 80°C) in cotton wool, bubble wrap or foil affect the rate of cooling (°C/min) over 10 minutes compared to no insulation?\"" },
      ],
      response: {
        kind: "design",
        prompt: "Write your research question for this cooling investigation.",
        scaffolds: ["How does", "the type of insulation", "affect the rate of cooling", "measured in °C/min", "over … minutes", "starting at … °C"],
        placeholder: "How does the type of insulation … affect the rate of cooling …?",
        rubric: [
          { level: 2, descriptor: "A question about cooling, insulation or temperature.", keywords: ["cool", "warm", "temperature", "insulation", "?"], minKeywords: 1 },
          { level: 4, descriptor: "Names the type of insulation as the variable to change.", keywords: ["insulation", "type", "material", "affect", "cool", "rate"], minKeywords: 1 },
          { level: 6, descriptor: "States both the insulation type (IV) and rate of cooling in °C/min (DV).", keywords: ["type", "insulation", "rate", "cooling", "how does", "°c/min", "degrees"], minKeywords: 2 },
          { level: 8, descriptor: "Focused, testable and measurable with starting temperature, duration and comparison to a control.", keywords: ["80°c", "80", "10 minutes", "cotton wool", "bubble wrap", "foil", "control", "°c/min", "no insulation"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "hyp",
      name: "Hypothesis",
      descriptor: "Make a testable prediction about cooling rate with scientific reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A guess with no reason. e.g. \"The water will cool more slowly.\"" },
        { level: 4, body: "Level 3–4: A directional if/then prediction. e.g. \"If insulation is added, then the water will cool more slowly.\"" },
        { level: 6, body: "Level 5–6: Prediction with a scientific reason. e.g. \"If bubble wrap is used, the water will cool more slowly than with no insulation because air trapped in the bubbles is a poor thermal conductor, reducing convection and conduction.\"" },
        { level: 8, body: "Level 7–8: Quantitative prediction using Newton's law of cooling. e.g. \"According to Newton's law of cooling, the rate of heat loss is proportional to (T_object − T_ambient). Better insulation reduces the effective thermal conductance, so the temperature difference decreases more slowly — the cooling curve will be less steep for bubble wrap than for foil or no insulation.\"" },
      ],
      response: {
        kind: "design",
        prompt: "State your hypothesis and explain the science behind it.",
        scaffolds: ["If … insulation is used, then the rate of cooling will", "because", "thermal conductivity", "conduction / convection / radiation", "Newton's law of cooling", "rate ∝ (T_object − T_ambient)", "the cooling curve will be"],
        placeholder: "If … insulation is used, then … because …",
        rubric: [
          { level: 2, descriptor: "A prediction about cooling rate or temperature is made.", keywords: ["cool", "temperature", "rate", "slower", "faster", "will"], minKeywords: 1 },
          { level: 4, descriptor: "A directional if/then prediction naming insulation and cooling rate.", keywords: ["if", "then", "insulation", "cool", "slower", "rate", "decrease"], minKeywords: 2 },
          { level: 6, descriptor: "Prediction supported by reference to conduction, convection, or radiation.", keywords: ["because", "conduction", "convection", "radiation", "conductor", "thermal", "air", "trapped"], minKeywords: 2 },
          { level: 8, descriptor: "Quantitative prediction invoking Newton's law of cooling with reference to the cooling curve gradient.", keywords: ["newton", "proportional", "t_object", "t_ambient", "ambient", "conductance", "gradient", "curve", "steeper", "less steep"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "vars",
      name: "Variables",
      descriptor: "Identify the independent, dependent and controlled variables for the cooling investigation.",
      guided: [
        { level: 2, body: "Level 1–2: Names one thing that changes, e.g. the type of insulation." },
        { level: 4, body: "Level 3–4: Identifies the independent variable (insulator type) and dependent variable (temperature over time, rate of cooling)." },
        { level: 6, body: "Level 5–6: Also lists controlled variables — starting temperature of water, volume of water, same beaker size, same thermometer, same room temperature." },
        { level: 8, body: "Level 7–8: Justifies WHY each control matters and HOW it is kept constant; explains that the same starting temperature is needed so cooling curves are comparable, and the same room temperature is required because Newton's law depends on the ambient temperature." },
      ],
      response: {
        kind: "design",
        prompt: "List your independent, dependent and controlled variables.",
        scaffolds: ["Independent variable:", "Dependent variable:", "Controlled variables:", "starting temperature kept constant by", "same volume of water", "same beaker size", "same room temperature"],
        placeholder: "Independent variable: …  Dependent variable: …  Controlled: …",
        rubric: [
          { level: 2, descriptor: "Mentions at least one variable.", keywords: ["insulation", "temperature", "cooling", "type", "rate"], minKeywords: 1 },
          { level: 4, descriptor: "Names the independent and dependent variables.", keywords: ["independent", "dependent", "insulation", "temperature", "rate", "cooling"], minKeywords: 2 },
          { level: 6, descriptor: "Lists controlled variables including starting temperature, volume and room temperature.", keywords: ["controlled", "starting temperature", "volume", "room temperature", "beaker", "same", "constant"], minKeywords: 2 },
          { level: 8, descriptor: "Justifies controls with reasons linked to Newton's law and comparability.", keywords: ["because", "comparable", "ambient", "room temperature", "same volume", "same beaker", "starting temperature", "newton", "fair test"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method, materials & safety",
      descriptor: "Write a clear, repeatable method for the cooling investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A few steps, missing detail or hard to follow." },
        { level: 4, body: "Level 3–4: A logical sequence of steps with the main apparatus listed (beaker, thermometer, insulating material, hot water, stopwatch)." },
        { level: 6, body: "Level 5–6: Detailed, repeatable steps specifying temperature measurement every 30 s over 10 min, 3 repeats for reliability, and a safety note (hot water, handle carefully)." },
        { level: 8, body: "Level 7–8: A fully reproducible method — heat water to 80°C, wrap beaker in insulator, start stopwatch, record temperature every 30 s for 10 min, repeat 3× for each insulator and average, plot cooling curves on the same axes to compare gradients, note safety precautions (hot water, insulated gloves)." },
      ],
      response: {
        kind: "design",
        prompt: "Write a method someone else could follow exactly. Include materials and safety.",
        scaffolds: ["Materials:", "1. Heat 200 ml of water to 80°C.", "2. Wrap the beaker in the insulating material.", "3. Record the temperature every 30 seconds for 10 minutes.", "Repeat 3 times and average.", "Plot cooling curves for each material.", "Safety: handle hot water carefully, use insulated gloves."],
        placeholder: "Materials: …  Method: 1) … 2) …  Safety: …",
        rubric: [
          { level: 2, descriptor: "Some steps about measuring temperature or using insulation.", keywords: ["temperature", "insulation", "measure", "record", "cool"], minKeywords: 1 },
          { level: 4, descriptor: "Ordered steps with key apparatus named.", keywords: ["thermometer", "beaker", "stopwatch", "hot water", "record", "steps", "insulation"], minKeywords: 2 },
          { level: 6, descriptor: "Repeatable steps with 30 s intervals, 10 min duration, repeats and safety.", keywords: ["30 seconds", "30 s", "10 minutes", "repeat", "average", "safety", "hot", "reliable"], minKeywords: 2 },
          { level: 8, descriptor: "Fully reproducible, with starting temperature, cooling curves and safety specified.", keywords: ["80°c", "80", "30 seconds", "10 minutes", "repeat", "average", "cooling curve", "gradient", "gloves", "hot water", "same axes"], minKeywords: 3 },
        ],
      },
    },
  ],
}
