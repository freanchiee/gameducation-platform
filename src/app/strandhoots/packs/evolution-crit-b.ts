import type { StrandhootPack } from "../engine/types"

export const evolutionCritB: StrandhootPack = {
  slug: "evolution-crit-b",
  title: "Investigating Inheritance Patterns",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Monohybrid cross and chi-squared",
  accent: "#c0392b",
  icon: "🦕",
  statementOfInquiry: "Scientific and technical innovations can change the impacts that we have on the world.",
  estMinutes: 25,
  intro:
    "Design a genetics investigation using fast plants (Brassica rapa) to test whether offspring phenotype ratios match Mendelian predictions. Each strand takes you one step further — from writing a focused research question to designing a chi-squared statistical test.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "methodologist", label: "Safe Scientist", icon: "🥼", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Brassica genetics experiment", blurb: "Monohybrid cross and chi-squared test with fast plants", icon: "🌱" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for a Brassica rapa monohybrid cross investigation.",
      guided: [
        { level: 2, body: "A research question names what you are investigating. A vague example: 'Does Brassica rapa follow Mendel's laws?' — this is too broad and cannot be directly tested in a single controlled experiment." },
        { level: 4, body: "A stronger question names the independent variable (IV) and dependent variable (DV): 'Do the offspring of a Brassica rapa monohybrid cross show a 3:1 phenotype ratio?' IV = genotype of parents crossed; DV = phenotype ratio of offspring." },
        { level: 6, body: "A specific, testable question: 'Do the F2 offspring of a Brassica rapa monohybrid cross between purple-stem (Pp) × purple-stem (Pp) parents show a 3 purple : 1 green stem phenotype ratio, as predicted by Mendel's law of segregation?' This names the generation, phenotype categories and expected ratio." },
        { level: 8, body: "An operationalised question adds statistical testing: 'Do the observed F2 phenotype frequencies from a Brassica rapa Pp × Pp cross (minimum n = 100) differ significantly from the expected 3:1 Mendelian ratio, as determined by a chi-squared (χ²) goodness-of-fit test at p = 0.05?' This specifies sample size, statistical test, and significance threshold." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate whether the phenotype ratios in F2 Brassica rapa offspring match the expected Mendelian 3:1 ratio.",
        scaffolds: [
          "Do the F2 offspring of a Brassica rapa cross...",
          "...between purple stem (Pp) and purple stem (Pp) parents...",
          "...show a ___:___ phenotype ratio...",
          "...as predicted by Mendel's law of ___?",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["brassica", "monohybrid", "purple", "green", "ratio", "mendel", "offspring", "cross"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV; phenotype categories mentioned.", keywords: ["phenotype", "ratio", "purple", "green", "f2", "offspring", "cross", "pp", "stem"], minKeywords: 2 },
          { level: 6, descriptor: "Specific and testable; 3:1 ratio named; generation specified.", keywords: ["3:1", "f2", "pp", "purple", "green", "mendel", "segregation", "phenotype ratio", "cross"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: chi-squared named; sample size and p-value specified.", keywords: ["chi-squared", "χ²", "n = 100", "p = 0.05", "goodness-of-fit", "significant", "observed", "expected", "operationalised", "minimum"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict the F2 phenotype ratio and justify using Mendelian genetics theory.",
      guided: [
        { level: 2, body: "A hypothesis makes a directional prediction. 'More offspring will have purple stems than green stems' — this is a start but gives no reasoning or numerical prediction." },
        { level: 4, body: "An if/then hypothesis: 'If purple stem (P) is dominant to green stem (p), then F2 offspring from a Pp × Pp cross will show approximately 3 purple : 1 green stem phenotype.' Names IV, DV and a prediction with direction." },
        { level: 6, body: "A justified hypothesis cites Mendel's law of segregation: 'If purple stem is dominant (P) and green stem recessive (p), then F2 plants from Pp × Pp will show a 3:1 phenotype ratio (PP : Pp : Pp : pp = 1:2:1 genotype ratio → 3 purple : 1 green). A chi-squared test should show no significant difference from expected (χ² < 3.84, df = 1, p = 0.05), confirming Mendel's law of segregation.'" },
        { level: 8, body: "A quantitative hypothesis: 'If purple stem is dominant (P), the F2 Punnett square (Pp × Pp) predicts genotype ratio 1 PP : 2 Pp : 1 pp. For n = 100 offspring, the expected numbers are 75 purple-stem and 25 green-stem. The chi-squared test (df = 1, critical value χ² = 3.84 at p = 0.05) will not be significant if Mendel's laws apply. If χ² > 3.84, this would indicate departure from expected Mendelian ratios — possibly due to small sample size, observer error, or a linked gene violating independent assortment.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting the phenotype ratio of F2 Brassica rapa offspring from a Pp × Pp cross. Include a scientific explanation and state what the chi-squared test should show.",
        scaffolds: [
          "If purple stem (P) is dominant to green stem (p)...",
          "...then F2 offspring from a Pp × Pp cross will show a ratio of...",
          "This is because the Punnett square (Pp × Pp) produces...",
          "A chi-squared test will show...",
        ],
        rubric: [
          { level: 2, descriptor: "States a directional prediction about stem colour.", keywords: ["purple", "green", "more", "ratio", "dominant", "predict", "f2"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with 3:1 ratio named.", keywords: ["if", "then", "3:1", "purple", "green", "dominant", "recessive", "pp"], minKeywords: 2 },
          { level: 6, descriptor: "Punnett square reasoning; chi-squared conclusion stated.", keywords: ["punnett", "1:2:1", "3:1", "genotype", "phenotype", "chi-squared", "segregation", "3.84", "p = 0.05", "no significant"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative expected numbers; departure reasons considered.", keywords: ["75", "25", "n = 100", "critical value", "3.84", "df = 1", "departure", "linked gene", "sample size", "observer error", "quantitative"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables for the Brassica rapa monohybrid cross phenotype count experiment.",
      guided: [
        { level: 2, body: "Three variable types: independent (IV — what you change or set), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair)." },
        { level: 4, body: "IV = genotype of parents crossed (Pp × Pp, the F1 self-fertilised to produce F2). DV = phenotype ratio of F2 offspring (number of purple-stem vs green-stem plants). CVs include: growing conditions, observer identifying phenotype, time of observation." },
        { level: 6, body: "IV: parent genotype (PP × pp to produce F1 Pp; F1 Pp self-fertilised to give F2). DV: frequency of purple-stem and green-stem F2 plants (counted as a ratio ± 1 plant). CVs: same light intensity, temperature (22°C), watering schedule and nutrient solution concentration for all plants; minimum of 100 F2 plants to satisfy chi-squared validity; same observer classifying stem colour throughout; observation at day 7 after germination when purple pigmentation is fully developed." },
        { level: 8, body: "As Level 6, plus: each CV stated with control method and reason. Light: 'All plants grown under the same fluorescent light source at 40 μmol m⁻² s⁻¹ to ensure equal photosynthesis and growth rate — different light levels could affect anthocyanin (purple pigment) expression.' Temperature: 'Water bath or growth chamber at 22 ± 1°C — temperature affects enzyme activity and pigment biosynthesis.' Observer: 'A single, blinded observer classifies all plants using a reference colour chart (purple vs green stem at cotyledon level), reducing subjective variation.' Potential confounding variable: epigenetic effects — stress conditions (drought, heat) can alter anthocyanin expression independently of genotype." },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for the experiment counting purple-stem and green-stem F2 Brassica rapa offspring. For each controlled variable, state how you will control it and why.",
        scaffolds: [
          "Independent variable (IV): ...",
          "Dependent variable (DV): ...",
          "Controlled variables (CVs):",
          "I will control [CV] by... because...",
          "A potential confounding variable is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable with an example.", keywords: ["independent", "dependent", "controlled", "variable", "purple", "green", "genotype", "phenotype"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with description.", keywords: ["independent variable", "genotype", "pp", "dependent variable", "phenotype", "ratio", "purple", "green", "count"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV and 3+ CVs named with values; sample size stated.", keywords: ["temperature", "22°c", "light", "water", "observer", "100 plants", "minimum", "day 7", "chi-squared", "nutrient"], minKeywords: 3 },
          { level: 8, descriptor: "CVs with control method and reason; confounding variable identified.", keywords: ["light intensity", "μmol", "blinded", "reference chart", "22 ± 1", "anthocyanin", "pigment", "observer bias", "confounding", "epigenetic", "stress"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a numbered step-by-step method for the Brassica rapa F2 cross phenotype count and chi-squared analysis.",
      guided: [
        { level: 2, body: "Lists materials or gives 1–2 vague steps: 'Cross two purple-stem plants, grow the seeds, count the purple and green plants.' — no detail on cross technique, sample size, or statistical analysis." },
        { level: 4, body: "Numbered steps in a logical sequence: (1) Cross two F1 Pp plants by transferring pollen. (2) Collect seeds and germinate. (3) Grow for 7 days. (4) Count purple-stem and green-stem seedlings. (5) Calculate ratio and compare to 3:1." },
        { level: 6, body: "Detailed steps: (1) Remove anthers from F1 Pp plants before they dehisce (to prevent self-fertilisation in first cross — if using PP × pp). (2) Transfer pollen from one Pp plant to stigma of another Pp plant using a fine brush. (3) Allow F2 seeds to develop; collect and label. (4) Germinate F2 seeds on damp filter paper, transfer to nutrient agar or soil. (5) After 7 days, count purple-stem and green-stem seedlings (total ≥ 100). (6) Calculate expected numbers (75 purple, 25 green). (7) Apply chi-squared: χ² = Σ(O−E)²/E. (8) Compare to critical value (df = 1, p = 0.05, critical χ² = 3.84)." },
        { level: 8, body: "As Level 6, plus: (9) Repeat the count three times on different batches of F2 seeds to assess reliability. (10) Use a reference colour chart to ensure consistent phenotype classification. (11) State the null hypothesis: 'There is no significant difference between the observed and expected 3:1 ratio.' (12) If χ² > 3.84, reject the null hypothesis. (13) Note potential sources of error: small sample size inflates χ², observer error in classifying borderline phenotypes. Justification for minimum n = 100: each expected category must have ≥ 5 individuals for chi-squared to be valid; with n = 100, E(green) = 25 satisfies this." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the Brassica rapa monohybrid cross experiment. Include the crossing technique, growing conditions, phenotype classification, chi-squared calculation, and comparison to critical value.",
        scaffolds: [
          "1. Cross-pollinate F1 Pp plants by...",
          "2. Collect F2 seeds and germinate them on...",
          "3. After 7 days, count the number of...",
          "4. Calculate the expected numbers: 75 purple and 25 green for n = 100...",
          "5. Apply chi-squared: χ² = Σ(O−E)²/E = ...",
          "6. Compare your χ² value to the critical value of 3.84 (df = 1, p = 0.05)...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials or gives 1–2 vague steps.", keywords: ["cross", "grow", "count", "purple", "green", "seeds", "plants"], minKeywords: 1 },
          { level: 4, descriptor: "Logical numbered steps with phenotype count and ratio comparison.", keywords: ["cross-pollinate", "germinate", "count", "7 days", "ratio", "3:1", "purple", "green"], minKeywords: 2 },
          { level: 6, descriptor: "Detailed steps with anther removal, sample size, chi-squared formula and critical value.", keywords: ["anther", "dehiscence", "100", "chi-squared", "σ(o-e)", "3.84", "df = 1", "p = 0.05", "expected", "critical value"], minKeywords: 4 },
          { level: 8, descriptor: "Null hypothesis stated; repeats for reliability; n ≥ 100 justified; error sources identified.", keywords: ["null hypothesis", "reject", "repeat", "3 times", "reliable", "reference chart", "n = 100", "e ≥ 5", "observer error", "small sample"], minKeywords: 3 },
        ],
      },
    },
  ],
}
