import type { StrandhootPack } from "../engine/types"

export const conservationCritB: StrandhootPack = {
  slug: "conservation-crit-b",
  title: "Mark-Recapture Population Study",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Lincoln-Petersen method",
  accent: "#c0392b",
  icon: "🐋",
  statementOfInquiry: "Methods of achieving sustainability can be developed using models that explore differences between systems.",
  estMinutes: 25,
  intro:
    "Wildlife managers cannot count every animal in a forest. Instead they use the Lincoln-Petersen mark-recapture method — the same mathematical model used to survey humpback whales, woodland butterflies, and woodlice under logs. Design your own population study, step by step.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "fieldworker", label: "Field Scientist", icon: "🌿", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Mark-recapture study", blurb: "Estimate woodlice population size using the Lincoln-Petersen method", icon: "🐋" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for a mark-recapture population study.",
      guided: [
        { level: 2, body: "A research question names what you are investigating. A vague version: 'How many woodlice are in the area?' — this is not testable as a controlled scientific investigation because it doesn't specify a method or site." },
        { level: 4, body: "A better question names the method (IV) and what will be measured (DV): 'Can the mark-recapture method estimate the population size of woodlice in a woodland area?' This specifies both the technique and what is being determined." },
        { level: 6, body: "A specific, testable question: 'Can the Lincoln-Petersen mark-recapture method accurately estimate the population size of woodlice (Armadillidium vulgare) within a 5m × 5m woodland floor quadrat?' This names the species, method, area, and what 'accurate' means — comparison to a true count." },
        { level: 8, body: "An operationalised question includes the assumptions being tested: 'Can the Lincoln-Petersen mark-recapture method (N = MC/R) accurately estimate the population of woodlice (Armadillidium vulgare) within a 5m × 5m woodland quadrat, given the assumptions of a closed population, equal capture probability, and non-harmful marking?' This identifies the equation, species, site, and the key testable conditions the method depends on." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate whether the Lincoln-Petersen mark-recapture method can accurately estimate the woodlice population in a defined study area.",
        scaffolds: [
          "Can the Lincoln-Petersen mark-recapture method...",
          "...accurately estimate the population size of woodlice (Armadillidium vulgare)...",
          "...within a [specify area, e.g. 5m × 5m] woodland quadrat...",
          "...given the assumptions of [list key assumptions]?",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["woodlice", "population", "mark", "estimate", "area", "woodland"], minKeywords: 1 },
          { level: 4, descriptor: "Names the method and what is being estimated.", keywords: ["mark-recapture", "population size", "estimate", "method", "woodlice", "accurate"], minKeywords: 2 },
          { level: 6, descriptor: "Specific — names species, method, site dimensions; measurable outcome stated.", keywords: ["lincoln-petersen", "armadillidium vulgare", "5m", "quadrat", "accurately", "population", "woodland floor"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised — equation, species, site, and key assumptions all stated.", keywords: ["n = mc/r", "closed population", "equal capture", "non-harmful", "marking", "assumptions", "operationalised", "testable"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict the outcome of the mark-recapture study and state the key assumptions.",
      guided: [
        { level: 2, body: "A hypothesis makes a directional prediction. 'The mark-recapture method will estimate the woodlice population' — this is a start, but gives no numbers or conditions." },
        { level: 4, body: "An if/then hypothesis: 'If the Lincoln-Petersen method is applied correctly, then the population estimate N will be close to the true count of woodlice in the quadrat.' This gives a direction but lacks quantitative prediction or stated assumptions." },
        { level: 6, body: "A quantitative hypothesis: 'The Lincoln-Petersen estimate (N = M×C/R) will give a population estimate of approximately 300–500 woodlice in the 5m × 5m quadrat, with 95% confidence intervals that overlap the true count, provided the assumptions are met: (1) closed population — no immigration or emigration during the study, (2) equal probability of capture for all individuals, (3) marks are not lost or harmful.'" },
        { level: 8, body: "A fully justified hypothesis states the prediction, quantitative range, method for uncertainty, and consequence of assumption violation: 'N is predicted to be 300–500 woodlice. The 95% CI (N ± 1.96√(M²C(C-R)/R³)) should include the true count if assumptions hold. If the population is not closed (e.g. individuals emigrate), N will be overestimated. If marked individuals avoid recapture, R will be too low, inflating N. These violations would bias the estimate, so the hypothesis is: if assumptions are met, the method will yield a statistically reliable estimate.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting the outcome of the mark-recapture study. State the expected population estimate, confidence interval approach, and the assumptions the method depends on.",
        scaffolds: [
          "If the Lincoln-Petersen method is applied correctly, then...",
          "The estimated population N will be approximately...",
          "The 95% confidence interval will be calculated as N ± 1.96√(M²C(C-R)/R³)...",
          "The key assumptions are: (1) closed population — ..., (2) equal capture probability — ..., (3) marks not lost or harmful — ...",
          "If any assumption is violated, the estimate will be biased because...",
        ],
        rubric: [
          { level: 2, descriptor: "States a prediction about the population estimate.", keywords: ["estimate", "population", "woodlice", "mark-recapture", "close", "accurate", "predict"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with directional prediction; method named.", keywords: ["if", "then", "lincoln-petersen", "estimate", "n", "true", "count", "close"], minKeywords: 2 },
          { level: 6, descriptor: "Quantitative range given; at least two assumptions stated.", keywords: ["300", "500", "confidence interval", "closed population", "equal capture", "marks", "harmful", "assumption"], minKeywords: 3 },
          { level: 8, descriptor: "CI formula stated; all three assumptions with consequences of violation.", keywords: ["n ± 1.96", "m²c", "r³", "overestimate", "immigration", "bias", "violation", "recapture", "inflating", "reliable"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Identify and classify variables for the mark-recapture investigation.",
      guided: [
        { level: 2, body: "Three variable types: independent (IV — what you change or manipulate), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair)." },
        { level: 4, body: "The key measurement is N = MC/R. M = number marked in first capture; C = total caught in second capture; R = number recaptured with mark. The DV is N (estimated population size); the method (Lincoln-Petersen) is the IV; CVs include the quadrat area and search time." },
        { level: 6, body: "DV: estimated population size N (individuals), calculated as N = MC/R. Uncertainty calculated as 95% CI = N ± 1.96√(M²C(C-R)/R³). CVs: same 5m × 5m search area both sessions; same search duration (30 min per session); same time of day (reduces diel behaviour variation); same weather conditions (dry — woodlice emerge less in rain); 24-hour gap between captures to allow marked individuals to mix randomly through the population." },
        { level: 8, body: "Full variable table: DV — N = MC/R (individuals, calculated); precision of DV measured by 95% CI. CVs: (1) quadrat area — 5m × 5m, defined by stakes and string (prevents area creep); (2) search duration — 30 min measured by stopwatch; (3) time of day — 09:00–09:30 both sessions (woodlice are nocturnal, minimising surface availability at midday); (4) weather — dry conditions only; (5) observer — same team both sessions to avoid capture-efficiency bias; (6) marking method — single non-toxic white paint dot on dorsal cuticle applied with fine brush. Potential confound: mark loss due to moulting — if woodlice moult during the 24h interval, R underestimates true recaptures, inflating N." },
      ],
      response: {
        kind: "design",
        prompt: "Classify all variables for the mark-recapture study: what is the independent variable, dependent variable, and at least three controlled variables?",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV): estimated population size N, calculated by...",
          "Controlled variables (CVs):",
          "I will control [CV] by... because...",
          "The 95% confidence interval will be calculated as...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "variable", "population", "controlled", "n"], minKeywords: 1 },
          { level: 4, descriptor: "DV named with formula; at least one CV named.", keywords: ["n = mc/r", "population size", "controlled", "quadrat", "search", "time", "dependent variable"], minKeywords: 2 },
          { level: 6, descriptor: "DV, CI, and three CVs with values.", keywords: ["n ± 1.96", "30 min", "5m", "24 hours", "weather", "time of day", "same area", "controlled variables", "mix"], minKeywords: 3 },
          { level: 8, descriptor: "All CVs with control method and reason; confound (mark loss) identified.", keywords: ["mark loss", "moulting", "confound", "bias", "underestimate", "r", "observer", "same team", "nocturnal", "diel", "quadrat boundary", "stakes"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a numbered, step-by-step method for the mark-recapture study.",
      guided: [
        { level: 2, body: "A basic method: 'Catch some woodlice, mark them, release them, catch them again, and count.' — no details on area, timing, marking technique, or calculation." },
        { level: 4, body: "Clearer numbered steps: (1) Mark a 5m × 5m woodland quadrat. (2) Search for woodlice for 30 minutes and collect all found. (3) Mark each woodlice with a paint spot and count — this is M. (4) Release all. (5) After 24 hours, search again for 30 minutes. (6) Count total caught (C) and those with marks (R). (7) Calculate N = MC/R." },
        { level: 6, body: "A full method with safety and controls: (1) Delineate 5m × 5m quadrat using stakes and string. (2) At 09:00, search systematically (row by row, turning over logs, stones, leaf litter) for 30 min. (3) Transfer woodlice to a container. (4) Apply one small non-toxic white paint dot to the dorsal surface of each using a fine brush. (5) Count marked individuals — record M. (6) Release all at original locations. (7) Wait 24 hours. (8) At 09:00 next day, repeat the 30-min search. (9) Record total caught (C) and number with paint mark (R). (10) Calculate N = MC/R. (11) Calculate 95% CI. Safety: handle animals gently; wash hands after." },
        { level: 8, body: "Adds repeats and comparison: as L6, plus: repeat first and second capture sessions on 3 consecutive days and average the N estimates to improve reliability. Compare N estimate to a complete census of the quadrat (remove and count all woodlice, then release) to validate accuracy. Record source of potential bias: check for mark loss (any woodlice that have moulted and lost the mark). Statistical note: the Lincoln-Petersen estimate assumes random mixing of marked individuals — verify this by checking whether recaptured individuals are spread evenly across the quadrat rather than clustered. If clustered, marks may have been applied to a non-representative sub-population." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the woodlice mark-recapture study. Include the quadrat setup, both capture sessions, the calculation, and any relevant safety or ethical considerations.",
        scaffolds: [
          "1. Delineate a 5m × 5m quadrat using stakes and string in a woodland site.",
          "2. At 09:00, systematically search the quadrat for 30 minutes...",
          "3. Mark each woodlice with a non-toxic white paint dot on the dorsal surface...",
          "4. Record M (number marked) and release all individuals at their capture locations.",
          "5. Allow 24 hours for marked individuals to mix randomly in the population.",
          "6. Return at 09:00 and search for 30 minutes. Record C (total caught) and R (marked recaptured).",
          "7. Calculate N = MC/R. Calculate 95% CI = N ± 1.96√(M²C(C-R)/R³).",
          "Safety and ethics: handle animals gently; do not mark near the head; wash hands afterwards.",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials or gives 1–2 vague steps.", keywords: ["mark", "count", "woodlice", "catch", "release", "recapture"], minKeywords: 1 },
          { level: 4, descriptor: "Logical numbered sequence with both capture sessions and calculation.", keywords: ["mark", "release", "24 hours", "count", "c", "m", "r", "n = mc/r", "numbered"], minKeywords: 3 },
          { level: 6, descriptor: "Full numbered method with area, timing, marking detail, calculation and safety.", keywords: ["5m", "30 min", "09:00", "systematic", "dorsal", "non-toxic", "release", "n = mc/r", "confidence interval", "safety", "wash hands"], minKeywords: 4 },
          { level: 8, descriptor: "Repeats for reliability; census comparison; bias check for mark loss and clustering.", keywords: ["repeat", "3 days", "average", "census", "validate", "mark loss", "moult", "clustering", "random mixing", "bias", "sub-population", "reliability"], minKeywords: 3 },
        ],
      },
    },
  ],
}
