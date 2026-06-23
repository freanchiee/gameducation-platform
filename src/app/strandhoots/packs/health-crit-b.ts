import type { StrandhootPack } from "../engine/types"

export const healthCritB: StrandhootPack = {
  slug: "health-crit-b",
  title: "Investigating Health Risk Factors",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Epidemiological study design",
  accent: "#c0392b",
  icon: "💉",
  statementOfInquiry: "Healthy lifestyles can be based on evidence of relationships between types of behaviour and risks of disease.",
  estMinutes: 25,
  intro:
    "Design an epidemiological study correlating physical activity with cardiovascular disease risk markers. Each strand takes you one step further — crafting a focused research question, a justified hypothesis, precise variable classification, and a rigorous numbered method.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Epidemiology investigation", blurb: "Design a study linking physical activity to cardiovascular health", icon: "💉" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for an epidemiological study of physical activity and heart rate.",
      guided: [
        { level: 2, body: "Level 1–2: A research question names what you are investigating. Vague example: 'Does exercise affect health?' — too broad, no named variables, not testable." },
        { level: 4, body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does weekly physical activity affect resting heart rate in adults?' IV = physical activity; DV = resting heart rate." },
        { level: 6, body: "Level 5–6: A specific, testable question with range and population: 'Is there a significant negative correlation between weekly physical activity (hours/week) and resting heart rate (bpm) in adults aged 30–60?' This names both variables, specifies units, gives the population, and states the predicted direction of the relationship." },
        { level: 8, body: "Level 7–8: An operationalised question specifies measurement tools and precision: 'Is there a significant negative correlation between weekly moderate-intensity physical activity (hours/week, measured using the validated IPAQ questionnaire) and resting heart rate (bpm, mean of three measurements taken after 5 minutes seated rest, using a digital pulse oximeter to ±1 bpm) in adults aged 30–60 excluding smokers and those with known cardiac disease?' It includes measurement technique, precision, exclusion criteria, and validation." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate whether there is a correlation between physical activity levels and resting heart rate in adults aged 30–60.",
        scaffolds: [
          "Is there a significant... correlation between...",
          "...weekly physical activity (hours/week)...",
          "...and resting heart rate (bpm)...",
          "...in adults aged 30–60?",
        ],
        rubric: [
          { level: 2, descriptor: "Names one variable or the general topic.", keywords: ["exercise", "physical activity", "heart rate", "health", "adults", "investigate"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV with clear direction.", keywords: ["physical activity", "resting heart rate", "bpm", "how does", "affect", "correlation"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; units stated; population named; direction predicted.", keywords: ["negative correlation", "hours/week", "bpm", "adults", "30", "60", "significant"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: measurement tool, precision, exclusion criteria specified.", keywords: ["ipaq", "pulse oximeter", "±1 bpm", "5 minutes", "seated rest", "exclude", "smokers", "cardiac", "validated"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict the relationship between physical activity and resting heart rate with physiological reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A hypothesis makes a directional prediction. 'More exercise means a lower heart rate' — a start, but gives no scientific reasoning or values." },
        { level: 4, body: "Level 3–4: An if/then hypothesis: 'If weekly physical activity increases, then resting heart rate will decrease.' Names IV and DV, gives direction, but lacks physiological explanation." },
        { level: 6, body: "Level 5–6: A justified hypothesis with physiological mechanism: 'Individuals who achieve more than 150 min/week of moderate physical activity (the WHO recommendation) will have a significantly lower resting heart rate (predicted <65 bpm) compared to sedentary individuals (<30 min/week, predicted >75 bpm), because regular aerobic exercise strengthens the heart muscle (cardiac hypertrophy), increasing stroke volume and reducing the heart rate needed to maintain cardiac output.'" },
        { level: 8, body: "Level 7–8: A quantitative hypothesis with mechanism and prediction linked: 'Based on published literature (American Heart Association, 2018), trained endurance athletes achieve resting heart rates of 40–60 bpm compared to 70–80 bpm in sedentary adults. If the correlation between IPAQ weekly activity score and resting heart rate follows a linear trend, the Pearson r coefficient is expected to be approximately −0.5 to −0.7 (moderate to strong negative correlation). The physiological mechanism is cardiac adaptation: aerobic training increases parasympathetic tone (vagal dominance), increasing stroke volume through enhanced ventricular filling (Frank–Starling mechanism), allowing the same cardiac output at a lower rate.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how weekly physical activity affects resting heart rate. Include a physiological explanation for why the relationship should exist.",
        scaffolds: [
          "If weekly physical activity increases, then resting heart rate will...",
          "because regular aerobic exercise...",
          "Specifically, individuals with >150 min/week will have a resting heart rate of approximately...",
          "compared to sedentary individuals who are predicted to have...",
        ],
        rubric: [
          { level: 2, descriptor: "States a prediction about activity and heart rate.", keywords: ["physical activity", "heart rate", "lower", "decrease", "exercise", "predict"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named.", keywords: ["if", "then", "physical activity", "heart rate", "decrease", "increases", "negative"], minKeywords: 2 },
          { level: 6, descriptor: "Physiological mechanism given; WHO threshold named; predicted values stated.", keywords: ["who", "150 min", "stroke volume", "cardiac output", "65 bpm", "75 bpm", "heart muscle", "aerobic", "mechanism"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative correlation coefficient predicted; Frank-Starling and vagal tone named.", keywords: ["pearson", "r coefficient", "−0.5", "−0.7", "frank-starling", "vagal", "parasympathetic", "stroke volume", "ventricle", "cardiac adaptation"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables and identify confounders in an epidemiological study of activity and cardiovascular health.",
      guided: [
        { level: 2, body: "Level 1–2: Three variable types: independent (IV — what you change or measure as the cause), dependent (DV — what you measure as the outcome), controlled (CVs — what you keep the same to make the test fair)." },
        { level: 4, body: "Level 3–4: IV = weekly physical activity (hours per week, measured by questionnaire). DV = resting heart rate (bpm, measured after 5 minutes seated rest). CVs include age range (30–60 years) and measurement conditions (same time of day, same seated position)." },
        { level: 6, body: "Level 5–6: IV: weekly physical activity (hours/week, measured using the IPAQ validated questionnaire). DV: resting heart rate (bpm, mean of 3 measurements after 5 min seated rest). CVs: age range (30–60 years), same measurement time (morning), exclude smokers (smoking elevates resting heart rate), exclude participants with known cardiac disease. Confounding variables that cannot be fully controlled: stress levels (raises heart rate), diet quality (high caffeine intake raises heart rate), genetics (family history of bradycardia), sleep duration — these should be recorded and reported." },
        { level: 8, body: "Level 7–8: As L6, plus: each CV stated with control method and reason. For example: 'Smoking status controlled by exclusion — smoking raises heart rate through nicotine-mediated sympathetic activation, which would mask the effect of exercise.' Additional DV measurements: blood pressure (systolic/diastolic) and BMI could be measured as secondary DVs. Multiple regression would then allow the independent effect of physical activity on each DV to be calculated after statistically controlling for all confounders. Instrumental precision: digital pulse oximeter (±1 bpm) is more reliable than manual palpation. A possible systematic error: self-reported physical activity (IPAQ) is subject to social desirability bias — participants may overestimate their activity levels." },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for an epidemiological study investigating the correlation between weekly physical activity (hours/week) and resting heart rate (bpm) in adults aged 30–60.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV):",
          "Controlled variables (CVs):",
          "I will measure the DV using...",
          "Confounding variables I cannot fully control include...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "variable", "heart rate", "activity", "control"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units.", keywords: ["independent variable", "dependent variable", "physical activity", "hours", "bpm", "resting heart rate", "questionnaire"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV and 3+ CVs named; confounders acknowledged.", keywords: ["ipaq", "5 min", "seated", "age", "smokers", "exclude", "cardiac disease", "stress", "caffeine", "confounding"], minKeywords: 3 },
          { level: 8, descriptor: "CVs with control method and reason; systematic error identified.", keywords: ["social desirability bias", "overestimate", "self-reported", "nicotine", "sympathetic", "pulse oximeter", "±1", "multiple regression", "secondary", "blood pressure"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a numbered, step-by-step method for an epidemiological study of physical activity and cardiovascular risk markers.",
      guided: [
        { level: 2, body: "Level 1–2: Lists who to study but gives only 1–2 vague steps: 'Ask people about exercise and measure their heart rate.' — no sample size, no validated questionnaire, no measurement protocol." },
        { level: 4, body: "Level 3–4: Steps in a logical sequence: (1) Recruit adults aged 30–60. (2) Ask participants how much they exercise per week. (3) Measure resting heart rate after they sit quietly. (4) Record all measurements and compare groups." },
        { level: 6, body: "Level 5–6: Numbered steps with recruitment strategy, validated measurement tools, and data analysis: (1) Obtain ethical approval. (2) Recruit 200 participants aged 30–60, stratified by age and gender. (3) Administer IPAQ physical activity questionnaire. (4) Measure resting heart rate three times after 5 min seated rest using a digital pulse oximeter — record the mean. (5) Record BMI and resting blood pressure. (6) Exclude smokers and those with cardiac disease. (7) Group participants: sedentary (<30 min/week), moderate (30–150 min/week), active (>150 min/week). (8) Calculate Pearson correlation coefficient between activity hours and resting heart rate. (9) Test significance with p-value (p<0.05 = significant)." },
        { level: 8, body: "Level 7–8: As L6, plus: multiple regression to control for confounders (age, BMI, stress score, caffeine intake); subgroup analyses by age and gender; sample size justification (power analysis: n=200 gives 80% power to detect r=0.3 at α=0.05); ethical considerations (informed consent, data anonymisation, right to withdraw); inter-rater reliability check (two researchers measure the same participant's heart rate independently, correlation should be r>0.95); specific inclusion/exclusion criteria operationalised ('non-smoker' defined as no tobacco use for ≥12 months)." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for an epidemiological study measuring the correlation between weekly physical activity and resting heart rate in 200 adults aged 30–60.",
        scaffolds: [
          "1. Obtain ethical approval and recruit...",
          "2. Administer the IPAQ physical activity questionnaire to...",
          "3. Measure resting heart rate after 5 minutes seated rest using...",
          "4. Record three measurements and calculate the mean...",
          "5. Group participants by activity level: sedentary (<30 min/week), moderate..., active...",
          "6. Calculate the Pearson correlation coefficient and test for significance (p<0.05)...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists who to study; 1–2 vague steps.", keywords: ["adults", "exercise", "heart rate", "measure", "ask", "recruit"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence with 4+ steps; groups defined.", keywords: ["recruit", "questionnaire", "measure", "heart rate", "group", "compare", "mean", "seated"], minKeywords: 2 },
          { level: 6, descriptor: "Numbered steps; IPAQ named; three measurements; Pearson r; p-value; ethical approval.", keywords: ["ipaq", "ethical approval", "200 participants", "three measurements", "mean", "pearson", "p-value", "5 min", "stratified", "exclude"], minKeywords: 4 },
          { level: 8, descriptor: "Multiple regression; power analysis; ethical details; inter-rater reliability.", keywords: ["multiple regression", "power analysis", "80%", "alpha", "0.05", "inter-rater", "informed consent", "anonymised", "confounders", "subgroup"], minKeywords: 3 },
        ],
      },
    },
  ],
}
