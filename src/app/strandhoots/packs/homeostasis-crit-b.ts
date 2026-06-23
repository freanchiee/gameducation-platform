import type { StrandhootPack } from "../engine/types"

export const homeostasisCritB: StrandhootPack = {
  slug: "homeostasis-crit-b",
  title: "Investigating Blood Glucose Regulation",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Diet and glucose response over time",
  accent: "#c0392b",
  icon: "⚖️",
  statementOfInquiry: "Development is only sustainable if systems remain in balance.",
  estMinutes: 25,
  intro:
    "Design an investigation into how the glycaemic index of food affects blood glucose levels over time. Each strand takes you one step further — from crafting a sharp research question and testable hypothesis, to classifying variables and writing a rigorous crossover method.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "GI food investigation", blurb: "Design an investigation into glycaemic index and blood glucose response", icon: "⚖️" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for a glycaemic index investigation.",
      guided: [
        { level: 2, body: "A research question names what you are investigating. Vague example: 'Does food affect blood sugar?' — too broad, not specific enough to design a controlled experiment." },
        { level: 4, body: "A stronger question names the independent variable (IV) and dependent variable (DV): 'How does the type of food consumed affect blood glucose levels?' This is better, but still lacks specificity about how food type is defined or how blood glucose is measured." },
        { level: 6, body: "A specific, testable question: 'How does the glycaemic index (GI) of food consumed affect the blood glucose level (mmol/L) measured at 30-minute intervals over 3 hours after consumption?' This names the IV (GI of food), DV (blood glucose at set time points), the measurement interval, and the duration." },
        { level: 8, body: "An operationalised question specifies measurement technique and precision: 'How does consuming a high-GI food (white bread, GI = 75) compared with a low-GI food (lentils, GI = 29) — matched for 50 g available carbohydrate — affect blood glucose concentration (mmol/L ± 0.1, measured with a calibrated glucometer via finger-prick at 0, 30, 60, 90, 120, 150, and 180 minutes) in fasted healthy adults?' This specifies GI values, carbohydrate content match, measurement precision, time points, and participant criteria." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate how the glycaemic index of food affects blood glucose levels over time.",
        scaffolds: [
          "How does the glycaemic index (GI) of food...",
          "...affect the blood glucose level (mmol/L)...",
          "...measured every __ minutes over __ hours...",
          "...after consuming the food in a fasted state?",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["food", "blood glucose", "sugar", "blood sugar", "gi", "glycaemic", "investigate"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV with clear direction.", keywords: ["glycaemic index", "blood glucose", "mmol", "how does", "affect", "over time", "type of food"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; measurement interval and duration stated; IV and DV with units.", keywords: ["glycaemic index", "mmol/l", "30 minutes", "3 hours", "intervals", "fasted", "time points", "blood glucose"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: GI values named; carbohydrate match specified; glucometer precision stated.", keywords: ["white bread", "lentils", "gi = 75", "gi = 29", "50 g", "glucometer", "calibrated", "±0.1", "finger-prick", "healthy adults", "fasted"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict how glycaemic index affects the blood glucose response curve, with scientific reasoning.",
      guided: [
        { level: 2, body: "A hypothesis makes a directional prediction. 'High GI food will cause higher blood glucose than low GI food' — this is a start, but gives no scientific reasoning." },
        { level: 4, body: "An if/then hypothesis: 'If participants consume high-GI food, then blood glucose will rise faster and reach a higher peak than after low-GI food.' This names the IV and DV and gives a direction, but lacks a mechanistic explanation." },
        { level: 6, body: "A justified hypothesis: 'If participants consume high-GI food (white bread, GI = 75), blood glucose will peak at approximately 8 mmol/L at 60 minutes and return to baseline by 180 minutes. Low-GI food (lentils, GI = 29) will produce a lower, later peak of approximately 6 mmol/L at 90 minutes. This is because high-GI foods are digested and absorbed rapidly, releasing glucose into the blood quickly and triggering a strong insulin response.' The scientific reasoning links starch digestion rate to GI." },
        { level: 8, body: "A quantitative hypothesis with full reasoning: 'High-GI food will produce a peak of ~8 mmol/L at 60 min (area under curve, AUC, ~900 mmol·min/L) versus ~6 mmol/L at 90 min (AUC ~700 mmol·min/L) for low-GI food. High-GI foods have rapidly digestible starch (large amylopectin to amylose ratio), releasing glucose quickly via amylase and brush border disaccharidases. The resulting rapid rise triggers a stronger insulin response, but also causes a post-meal glucose dip (reactive hypoglycaemia) as insulin overshoots. Low-GI foods release glucose more slowly due to resistant starch and food matrix structure, producing a more sustained, moderate response — as predicted by the Jenkins glycaemic response model.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how glycaemic index affects the blood glucose response over 3 hours. Include predicted peak values, timing, and a scientific explanation.",
        scaffolds: [
          "If participants consume high-GI food, then blood glucose will...",
          "The predicted peak for high-GI food is approximately ___ mmol/L at ___ minutes, because...",
          "For low-GI food, the peak will be approximately ___ mmol/L at ___ minutes, because...",
          "This difference occurs because high-GI foods are digested...",
          "The insulin response will be...",
        ],
        rubric: [
          { level: 2, descriptor: "States a directional prediction about GI and blood glucose.", keywords: ["high gi", "low gi", "blood glucose", "higher", "lower", "peak", "rise"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named and direction stated.", keywords: ["if", "then", "high gi", "low gi", "peak", "faster", "higher", "insulin", "blood glucose"], minKeywords: 2 },
          { level: 6, descriptor: "Predicted peak values and timing given; digestion rate linked to GI.", keywords: ["8 mmol", "6 mmol", "60 min", "90 min", "digested", "absorbed", "rapidly", "insulin", "starch", "gi = 75", "gi = 29", "justified"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative AUC prediction; amylopectin/amylose ratio or food matrix explained; reactive hypoglycaemia or Jenkins model referenced.", keywords: ["area under curve", "auc", "amylopectin", "amylose", "reactive hypoglycaemia", "insulin", "overshoot", "resistant starch", "food matrix", "quantitative", "900", "700"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables for the glycaemic index investigation.",
      guided: [
        { level: 2, body: "Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair)." },
        { level: 4, body: "IV = type of food consumed (high GI vs low GI). DV = blood glucose level (mmol/L) measured with a glucometer at each time point. Key CVs include: same participant, same total carbohydrate content (50 g), same fasting period before the test." },
        { level: 6, body: "IV: type of food (high GI = white bread, GI = 75; low GI = lentils, GI = 29), matched for 50 g available carbohydrate content. DV: blood glucose concentration (mmol/L ± 0.1) measured via finger-prick glucometer at 0, 30, 60, 90, 120, 150, 180 minutes. CVs: same participant (crossover design), 10-hour overnight fasting period before each test, same amount of physical activity during the test period (seated rest), same time of day for each trial, no other food or caloric drink during the test period, same glucometer and test strips." },
        { level: 8, body: "As Level 6, plus: each CV stated with how it is controlled and why. Fasting controlled by providing instructions and confirming with a 0-min baseline blood glucose reading (if >5.6 mmol/L, suggest participant may not be fully fasted). Physical activity controlled by having participants remain seated throughout and tracking any movement. Time of day controlled to account for circadian rhythm effects on insulin sensitivity. The crossover design (same participant does both conditions on different days) eliminates inter-individual variation in insulin sensitivity as a confound. A washout period of at least 2 days between trials prevents carryover effects." },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for a crossover study investigating how the glycaemic index of food (high GI vs low GI, matched for 50 g carbohydrate) affects blood glucose over 3 hours.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV) with instrument and unit:",
          "Controlled variables (CVs):",
          "I will measure the DV using...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "controlled", "variable", "food", "blood glucose", "type"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units; at least one CV identified.", keywords: ["independent variable", "type of food", "blood glucose", "mmol/l", "glucometer", "controlled", "fasting", "carbohydrate"], minKeywords: 2 },
          { level: 6, descriptor: "IV with GI values; DV with units, instrument, and time points; 4+ CVs named with values.", keywords: ["gi = 75", "gi = 29", "50 g", "mmol/l", "glucometer", "10 hours", "fasting", "30 minutes", "180 minutes", "physical activity", "seated", "same participant"], minKeywords: 4 },
          { level: 8, descriptor: "CVs explained with control method, reason, and crossover design justified; washout period included.", keywords: ["crossover", "inter-individual", "confound", "washout", "circadian", "insulin sensitivity", "baseline", "5.6", "carryover", "control method", "why", "seated", "fasting confirmed"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a numbered, step-by-step method for the glycaemic index crossover experiment.",
      guided: [
        { level: 2, body: "Lists materials but gives only 1–2 vague steps: 'Give participant food, then measure blood glucose.' — no fasting protocol, no time points, no safety considerations." },
        { level: 4, body: "Steps in a logical sequence: (1) Participant fasts for 10 hours. (2) Measure fasting blood glucose (t = 0). (3) Participant eats test food within 10 minutes. (4) Measure blood glucose every 30 minutes for 3 hours. (5) Repeat on another day with the other food type." },
        { level: 6, body: "Clear numbered steps including: participant fasts overnight (10 h), measure baseline blood glucose at t = 0 (finger-prick glucometer), participant consumes 50 g available carbohydrate of test food within 10 minutes, measure blood glucose at 30, 60, 90, 120, 150, 180 min, participant remains seated throughout, plot blood glucose vs time graph, calculate area under the curve (AUC) as a measure of total glucose exposure, crossover — repeat with other food on a different day with ≥2-day washout. Safety: trained personnel should perform glucometer testing; ensure participant is not diabetic before testing; have glucose tablets available in case of hypoglycaemia." },
        { level: 8, body: "Adds quantitative detail: specify exact food portion (e.g. 75 g white bread ≈ 50 g available carbohydrate; 200 g lentils ≈ 50 g available carbohydrate), instruct participant to eat at a controlled pace (within 10 minutes), confirm fasting state with baseline reading (if >5.6 mmol/L, delay or reschedule), record glucometer reading at each time point to ±0.1 mmol/L, note any adverse events, repeat crossover 3 times for each participant to assess within-person reliability, calculate mean and standard deviation for each time point, plot mean ± SD on the same graph for both conditions, calculate AUC using the trapezoidal method. Ethical consideration: obtain informed consent, ensure participants understand they can withdraw at any time, anonymise all data." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the crossover study investigating how glycaemic index of food affects blood glucose over 3 hours. Include safety and ethical considerations.",
        scaffolds: [
          "1. Recruit participants who are non-diabetic healthy adults and obtain informed consent...",
          "2. Instruct participant to fast for 10 hours overnight...",
          "3. At t = 0 min, measure baseline blood glucose using a finger-prick glucometer...",
          "4. Provide the test food (50 g available carbohydrate of high-GI food) to be consumed within 10 minutes...",
          "5. Measure blood glucose at t = 30, 60, 90, 120, 150, 180 minutes...",
          "6. After a washout period of at least 2 days, repeat with the low-GI food...",
          "Safety: have glucose tablets available; do not test participants with known metabolic conditions...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials only or gives 1–2 vague steps.", keywords: ["food", "blood glucose", "measure", "glucometer", "fast", "participant"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence with fasting, baseline, food consumption and time points.", keywords: ["fast", "10 hours", "baseline", "t = 0", "30 minutes", "plot", "crossover", "repeat"], minKeywords: 2 },
          { level: 6, descriptor: "Numbered steps with 50 g carbohydrate, glucometer readings, AUC calculation, crossover design, safety noted.", keywords: ["50 g", "glucometer", "30 min", "60 min", "area under curve", "crossover", "washout", "seated", "safety", "glucose tablets", "diabetic"], minKeywords: 4 },
          { level: 8, descriptor: "Quantitative food portions, fasting confirmation threshold, repeat 3 times, SD, trapezoidal AUC, ethics and consent.", keywords: ["75 g white bread", "200 g lentils", "5.6 mmol", "trapezoidal", "mean", "standard deviation", "informed consent", "anonymise", "withdraw", "3 times", "reliability", "±0.1"], minKeywords: 3 },
        ],
      },
    },
  ],
}
