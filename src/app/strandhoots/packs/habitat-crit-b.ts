import type { StrandhootPack } from "../engine/types"

export const habitatCritB: StrandhootPack = {
  slug: "habitat-crit-b",
  title: "Biodiversity Field Investigation",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Quadrat sampling and diversity index",
  accent: "#c0392b",
  icon: "🌍",
  statementOfInquiry: "Environments provide aesthetic benefits and influence human cultural expression, but human induced changes undermine these benefits.",
  estMinutes: 25,
  intro:
    "Design an investigation comparing species diversity in two contrasting microhabitats using quadrats and Simpson's diversity index. Each strand builds one section of a full scientific design — from a sharp research question through to a step-by-step method.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe", label: "Field Scientist", icon: "🌿", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Grassland diversity study", blurb: "Compare plant diversity in mown vs unmown grassland using quadrats", icon: "🌍" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for a habitat diversity investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A research question names what you are investigating. Vague example: 'Does mowing affect plants?' — too broad and not testable as a controlled experiment." },
        { level: 4, body: "Level 3–4: A stronger question names both the independent variable (IV) and the dependent variable (DV): 'How does management type (mown vs unmown grassland) affect the number of plant species?' IV = management type; DV = number of plant species." },
        { level: 6, body: "Level 5–6: A specific, testable question names IV, DV, and gives operational detail: 'How does grassland management type (mown lawn vs unmown meadow) affect the species diversity index (Simpson's D) of plant species recorded in a 0.25 m² quadrat?' This states how diversity is measured and the quadrat area used." },
        { level: 8, body: "Level 7–8: An operationalised question also specifies sampling strategy: 'How does grassland management type (mown lawn vs unmown meadow) affect the mean Simpson's diversity index D [D = 1 − Σ(n/N)²], calculated from 10 randomly placed 0.25 m² quadrats per habitat, identified to species level using a field key?' Every measurable detail is fixed and named." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate how grassland management type affects plant species diversity.",
        scaffolds: [
          "How does...",
          "...the management type (mown vs unmown)...",
          "...affect the species diversity index (Simpson's D)...",
          "...of plant species in a 0.25 m² quadrat?",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["mowing", "grassland", "plants", "diversity", "species", "management"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV with clear direction.", keywords: ["management", "mown", "unmown", "diversity", "species", "how does", "affect"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; measurement method stated; quadrat size named.", keywords: ["simpson", "diversity index", "0.25", "quadrat", "mown", "unmown", "plant species", "management type"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: sampling strategy, formula, and identification method specified.", keywords: ["10 quadrats", "random", "field key", "species level", "1 − Σ", "n/N", "mean", "operationalised", "0.25 m²"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict how management type affects species diversity, with scientific reasoning.",
      guided: [
        { level: 2, body: "Level 1–2: A hypothesis makes a directional prediction. 'The unmown meadow will have more species' — this is a start, but gives no scientific reasoning." },
        { level: 4, body: "Level 3–4: An if/then hypothesis: 'If the grassland is unmown, then the Simpson's diversity index will be higher than in the mown lawn.' This names IV and DV and gives a direction, but lacks explanation." },
        { level: 6, body: "Level 5–6: A justified hypothesis links to the mechanism: 'If the grassland is unmown, then the Simpson's diversity index D will be higher than in the mown lawn, because mowing selects for only low-growing, stress-tolerant grass species, reducing species richness. In contrast, an unmown meadow allows taller flowering plants to establish, creating more niches and supporting greater species richness and evenness.'" },
        { level: 8, body: "Level 7–8: A quantitative, two-tailed hypothesis: 'The mean Simpson's D in the unmown meadow will be significantly higher than in the mown lawn (predicted D_meadow > 0.7 vs D_lawn < 0.4). Mowing is a regular mechanical disturbance that removes tall-growing species and imposes an artificial selection pressure for prostrate, fast-growing grasses (e.g. Poa annua). The unmown meadow supports greater vertical structure and therefore more ecological niches, increasing both species richness and evenness — both of which raise D. A t-test on the 10 paired D values will be used to test for a statistically significant difference.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how management type (mown vs unmown) affects Simpson's diversity index. Include a scientific explanation.",
        scaffolds: [
          "If the grassland is unmown, then...",
          "because mowing selects for...",
          "whereas unmown meadow allows...",
          "This means species richness and evenness will be...",
        ],
        rubric: [
          { level: 2, descriptor: "States a directional prediction about mowing and species.", keywords: ["mown", "unmown", "more", "less", "species", "diversity", "meadow"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named.", keywords: ["if", "then", "unmown", "diversity", "higher", "mown", "simpson"], minKeywords: 2 },
          { level: 6, descriptor: "Mechanism explained: mowing selects for low-growing species; niches mentioned.", keywords: ["mowing", "selects", "low-growing", "niche", "richness", "evenness", "taller", "flowering", "disturbance", "mechanism"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative prediction; specific mechanism; statistical test named.", keywords: ["0.7", "0.4", "poa annua", "vertical structure", "niche", "t-test", "significant", "richness", "evenness", "paired", "selection pressure"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify and operationalise all variables for the habitat diversity investigation.",
      guided: [
        { level: 2, body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant). For this investigation: IV = habitat type; DV = species diversity." },
        { level: 4, body: "Level 3–4: IV = habitat management type (mown lawn vs unmown meadow). DV = Simpson's diversity index D, calculated as D = 1 − Σ(n/N)², where n = number of individuals per species and N = total individuals in each quadrat. Each quadrat gives one value of D." },
        { level: 6, body: "Level 5–6: IV: habitat type (2 levels: mown lawn vs unmown meadow). DV: mean Simpson's D from 10 quadrats per habitat. CVs: quadrat size (0.25 m²), number of quadrats per habitat (10), same observer identifying species, same time of day and season (to avoid phenological differences), random placement of quadrats (using random number coordinates to avoid selection bias), same 0.25 m² quadrat frame." },
        { level: 8, body: "Level 7–8: As L6, plus each CV is stated with its control method and reason: 'Quadrat size controlled at 0.25 m² using the same physical frame, because different areas sample different numbers of species — larger quadrats tend to contain more species, confounding the comparison. Season controlled by surveying both habitats on the same date in June, because plant species richness is highest in early summer when annual species are identifiable. Observer identity controlled by using one botanist for all identifications, because species identification is subjective and inter-observer variation would introduce random error in D.'" },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for an investigation comparing plant species diversity (Simpson's D) in mown lawn vs unmown meadow using 0.25 m² quadrats.",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV):",
          "Controlled variables (CVs):",
          "I will measure the DV by...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "variable", "habitat", "mown", "diversity", "control"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with formula or measurement method.", keywords: ["habitat type", "management", "mown", "unmown", "simpson", "diversity", "n/n", "1 − σ", "quadrat", "dv"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV and 3+ CVs named with values.", keywords: ["0.25 m²", "10 quadrats", "same observer", "same season", "random", "placement", "frame", "time of day", "controlled"], minKeywords: 3 },
          { level: 8, descriptor: "CVs each given with control method and scientific reason.", keywords: ["frame", "same date", "june", "botanist", "inter-observer", "confounding", "random error", "reason", "seasonal", "phenological", "subjective"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a numbered, reproducible field method for comparing plant diversity using quadrats.",
      guided: [
        { level: 2, body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Go to the meadow and count the plants in some squares.' — no quadrat size, no randomisation, no identification method." },
        { level: 4, body: "Level 3–4: Steps in a logical sequence: (1) Define the boundaries of each habitat. (2) Place a 0.25 m² quadrat in the habitat. (3) Count and identify species inside the quadrat. (4) Repeat in several locations. (5) Calculate Simpson's D for each quadrat." },
        { level: 6, body: "Level 5–6: Clear numbered steps including: (1) Define a 10 m × 10 m study area within each habitat using boundary stakes. (2) Generate 10 pairs of random coordinates using a random number table (0–10 m × 0–10 m). (3) Place the 0.25 m² frame at each coordinate. (4) Identify every plant species within the frame to species level using a plant ID key, record species name and count of all individuals in a tally table. (5) Calculate D = 1 − Σ(n/N)² for each quadrat. (6) Calculate mean D for each habitat. (7) Repeat in the second habitat on the same day." },
        { level: 8, body: "Level 7–8: As L6, plus: percentage cover is used for species that cannot be individually counted (e.g. grasses forming mats); state how to handle this in the D formula (count number of stems in 20 cm × 20 cm sub-quadrat as a proxy). Record date, time, temperature, and cloud cover for each habitat to check for confounding variation. Analyse data using a t-test comparing mean D in each habitat (one-tailed test, H₁: D_meadow > D_lawn). State the statistical threshold for significance (p < 0.05). Repeat the entire survey on 3 separate dates to test reproducibility." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step field method for comparing plant species diversity (Simpson's D) in mown lawn vs unmown meadow using 0.25 m² quadrats.",
        scaffolds: [
          "1. Define a study area of... using...",
          "2. Generate random coordinates using...",
          "3. Place a 0.25 m² quadrat frame at each coordinate and...",
          "4. Identify each plant species using a field ID key and count...",
          "5. Record results in a tally table with columns for...",
          "6. Calculate D = 1 − Σ(n/N)² for each quadrat and...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials or gives 1–2 vague steps.", keywords: ["quadrat", "count", "species", "habitat", "meadow", "lawn", "plants"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence with 4+ steps including identification and calculation.", keywords: ["boundary", "identify", "count", "calculate", "simpson", "d", "tally", "repeat"], minKeywords: 2 },
          { level: 6, descriptor: "Random placement; species ID key used; D calculated per quadrat; repeated.", keywords: ["random", "coordinates", "random number", "0.25 m²", "frame", "field key", "tally", "d =", "mean", "10 quadrats"], minKeywords: 4 },
          { level: 8, descriptor: "Percentage cover method; confounders recorded; t-test specified; 3 survey dates.", keywords: ["percentage cover", "sub-quadrat", "t-test", "p < 0.05", "one-tailed", "3 dates", "reproducibility", "temperature", "cloud", "confounding"], minKeywords: 3 },
        ],
      },
    },
  ],
}
