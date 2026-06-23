import type { StrandhootPack } from "../engine/types"

export const geneticsCritB: StrandhootPack = {
  slug: "genetics-crit-b",
  title: "Investigating Mitosis",
  subject: "MYP Biology",
  criterion: "B",
  topic: "Onion root tip squash experiment",
  accent: "#c0392b",
  icon: "🧬",
  statementOfInquiry: "Observing patterns allows scientists to propose new theories that explain how the living world works.",
  estMinutes: 25,
  intro:
    "Design a microscopy investigation to calculate the mitotic index in onion root tip cells. Each strand takes you one step further — from writing a sharp research question, to predicting a result, classifying variables, and writing a safe, repeatable method.",
  badges: [
    { id: "questioner", label: "Sharp Question", icon: "❓", description: "Reach Level 8 on Research question", strandId: "rq", atLevel: 8 },
    { id: "predictor", label: "Bold Predictor", icon: "🔮", description: "Reach Level 8 on Hypothesis", strandId: "hypothesis", atLevel: 8 },
    { id: "controller", label: "Variable Master", icon: "🎛️", description: "Reach Level 8 on Variables", strandId: "variables", atLevel: 8 },
    { id: "safe", label: "Safe Scientist", icon: "🥼", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Onion root tip experiment", blurb: "Calculate mitotic index across different regions of the root", icon: "🔬" }],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for a mitotic index investigation.",
      guided: [
        { level: 2, body: "Level 1–2: A research question names what you are investigating. Vague example: 'How do cells divide in onion roots?' — too broad, not testable as a controlled experiment." },
        { level: 4, body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does distance from the root tip affect the mitotic index in onion root cells?' IV = distance; DV = mitotic index." },
        { level: 6, body: "Level 5–6: A specific, testable question: 'How does distance from the root apex (0–2000 μm) affect the mitotic index (%) in onion (Allium cepa) root tip cells prepared by the acetocarmine squash technique?' This names the IV with a range, DV with units, organism, and technique." },
        { level: 8, body: "Level 7–8: An operationalised question specifies how measurement is done: 'How does distance from the root apex (0, 500, 1000, 1500, 2000 μm, measured using stage micrometer) affect the mitotic index (number of cells in any stage of mitosis / total cells counted × 100, counting a minimum of 100 cells per field at ×400 magnification) in acetocarmine-stained onion root tip squash preparations?' It specifies counting protocol, magnification, and measurement instrument." },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate how distance from the root tip affects the mitotic index in onion root tip cells.",
        scaffolds: [
          "How does...",
          "...affect the mitotic index (%)...",
          "...in onion root tip cells...",
          "...prepared by the acetocarmine squash technique at distances of...",
        ],
        rubric: [
          { level: 2, descriptor: "Names the topic or one variable vaguely.", keywords: ["mitosis", "onion", "root", "divide", "cells", "tip"], minKeywords: 1 },
          { level: 4, descriptor: "Names IV and DV with clear direction.", keywords: ["distance", "mitotic index", "root tip", "how does", "affect", "meristem", "proportion"], minKeywords: 2 },
          { level: 6, descriptor: "Specific, testable; range stated; organism named; technique named.", keywords: ["0", "2000", "μm", "acetocarmine", "squash", "allium", "onion", "mitotic index", "%", "range"], minKeywords: 3 },
          { level: 8, descriptor: "Operationalised: counting protocol, magnification, and measurement instrument specified.", keywords: ["100 cells", "400", "magnification", "stage micrometer", "counting", "minimum", "operationalised", "500", "1000", "1500"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict how mitotic index changes with distance from the root tip meristem.",
      guided: [
        { level: 2, body: "Level 1–2: A hypothesis makes a directional prediction. 'Cells near the root tip will be dividing more.' — This is a start, but gives no scientific reasoning." },
        { level: 4, body: "Level 3–4: An if/then hypothesis: 'If distance from the root apex increases, then the mitotic index will decrease.' This names IV and DV and gives a direction, but lacks scientific explanation." },
        { level: 6, body: "Level 5–6: A justified hypothesis: 'If distance from the root apex increases (0→2000 μm), then the mitotic index will decrease, because cells closest to the tip are in the zone of active cell division (meristem). Cells further from the tip enter the zone of elongation and differentiation, where they stop dividing and instead expand. Mitotic index = number of dividing cells / total cells × 100.' Cites zones and formula." },
        { level: 8, body: "Level 7–8: A quantitative hypothesis: 'If distance increases from 0–500 μm (meristem) to 1500–2000 μm (elongation zone), the mitotic index will decrease from approximately 15–20% to near 0%. At 0–500 μm, the apical meristem has the highest proportion of cycling cells (high mitotic index); at 500–1000 μm, cells transition to elongation (low mitotic index); beyond 1000 μm, cells are fully differentiated (mitotic index ≈ 0). This is predicted by the known spatial pattern of growth zones in plant roots.'" },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how the mitotic index will change with distance from the root tip. Include a scientific explanation referencing root growth zones.",
        scaffolds: [
          "If distance from the root apex increases, then the mitotic index will...",
          "because the meristem (zone of active cell division) is located at...",
          "Cells further from the tip are in the zone of elongation / differentiation, where they...",
          "Mitotic index = number of dividing cells / total cells × 100",
        ],
        rubric: [
          { level: 2, descriptor: "States a prediction about cell division and distance.", keywords: ["divide", "mitosis", "distance", "root", "tip", "more", "closer"], minKeywords: 1 },
          { level: 4, descriptor: "If/then structure with IV and DV named.", keywords: ["if", "then", "distance", "mitotic index", "decreases", "increases", "zone"], minKeywords: 2 },
          { level: 6, descriptor: "Meristem and zone of elongation/differentiation cited with formula.", keywords: ["meristem", "elongation", "differentiation", "zone", "formula", "dividing cells", "total cells", "100", "decreases"], minKeywords: 3 },
          { level: 8, descriptor: "Quantitative prediction with percentage estimates and growth zones named.", keywords: ["15", "20%", "0–500", "1000", "1500", "meristem", "elongation", "differentiation", "quantitative", "≈ 0"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables for the mitotic index investigation.",
      guided: [
        { level: 2, body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair)." },
        { level: 4, body: "Level 3–4: For the mitotic index experiment: IV = distance from root apex (μm). DV = mitotic index (%). This is calculated as: number of cells in any stage of mitosis / total number of cells observed × 100." },
        { level: 6, body: "Level 5–6: IV: distance from root apex (μm) — 0, 500, 1000, 1500, 2000 μm. DV: mitotic index (%) — counted as cells in prophase, metaphase, anaphase or telophase / total cells × 100. CVs: same staining technique (acetocarmine), same magnification (×400), minimum cells counted per field (100), same preparation method (acid maceration 1M HCl at 60°C for 10 min, then squash), same species and variety of onion (Allium cepa)." },
        { level: 8, body: "Level 7–8: As L6, plus: each CV stated with how it is controlled ('magnification kept at ×400 using the same objective lens throughout') and why ('higher magnification allows individual chromosomes to be visible for stage identification; different magnifications would change field area and distort cell counts'). Instrumental precision: stage micrometer (±5 μm) to locate fields at specified distances. A potential systematic error: acetocarmine may stain all cells but condensed chromosomes are only clearly visible at certain stages — cells in interphase may be under-counted if their chromatin cannot be resolved, inflating the mitotic index. Standardise by counting all cells with a visible nucleus." },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for the mitotic index investigation in onion root tip cells.",
        scaffolds: [
          "Independent variable (IV): distance from root apex (μm) at values of...",
          "Dependent variable (DV): mitotic index (%) = ...",
          "Controlled variables (CVs):",
          "I will control [CV] by... because...",
          "A potential source of systematic error is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one type of variable.", keywords: ["independent", "dependent", "controlled", "distance", "mitotic index", "variable"], minKeywords: 1 },
          { level: 4, descriptor: "IV and DV named with units and formula.", keywords: ["distance", "μm", "mitotic index", "%", "dividing cells", "total cells", "formula", "×100"], minKeywords: 2 },
          { level: 6, descriptor: "IV, DV and 3+ CVs named with values.", keywords: ["acetocarmine", "magnification", "400", "100 cells", "acid maceration", "hcl", "squash", "same species", "allium"], minKeywords: 3 },
          { level: 8, descriptor: "CVs explained with control method, reason, precision stated, systematic error identified.", keywords: ["stage micrometer", "±5", "systematic error", "interphase", "chromatin", "objective lens", "control method", "precision", "why", "inflate"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, step-by-step method for the onion root tip squash experiment.",
      guided: [
        { level: 2, body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Cut the root tip, stain it, look under a microscope.' — no specific volumes, times, safety precautions, or counting protocol." },
        { level: 4, body: "Level 3–4: Steps in a logical sequence: (1) Cut 1 cm onion root tip. (2) Place in hydrochloric acid for 10 minutes. (3) Rinse, add stain, cover, squash. (4) View under microscope and count dividing cells." },
        { level: 6, body: "Level 5–6: Numbered steps including safety precautions (goggles; HCl is corrosive; acetocarmine is carcinogenic — handle in fume hood). Specific protocol: cut 1 cm root tip, place in 1M HCl at 60°C for 10 min (acid maceration to separate cells by dissolving middle lamella), rinse in water 3× for 2 min, place on slide, add 2–3 drops acetocarmine stain, cover with coverslip, press gently with thumb (do NOT twist — shearing damages chromosomes), observe under ×400 magnification, count cells in mitosis and total cells in 5 fields at each of 5 distances." },
        { level: 8, body: "Level 7–8: Adds quantitative counting detail (record cells in each stage of mitosis: P, M, A, T; count minimum 100 cells per field; use stage micrometer to locate fields at specified distances), repeats 3× for reliability, calculates mitotic index = (P+M+A+T) / total × 100. Safety: acetocarmine — wear nitrile gloves and work in fume hood; 1M HCl — corrosive, avoid skin contact; all waste disposed in designated containers. States a positive control: include a known actively dividing root section to confirm staining worked." },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for preparing an acetocarmine squash of onion root tip cells and calculating the mitotic index at different distances from the root apex.",
        scaffolds: [
          "1. Cut a 1 cm section from the tip of an onion root...",
          "2. Place in 1M HCl at 60°C for 10 minutes to macerate (separate) the cells...",
          "3. Rinse in distilled water 3× for 2 minutes each...",
          "4. Place the root tip on a slide, add 2–3 drops acetocarmine stain...",
          "5. Cover with a coverslip and press GENTLY with your thumb (do NOT twist)...",
          "6. Observe under ×400 magnification. Count cells in mitosis and total cells in 5 fields at each distance...",
          "Safety: wear goggles and gloves; acetocarmine is carcinogenic — work in a fume hood...",
        ],
        rubric: [
          { level: 2, descriptor: "Lists materials or gives 1–2 vague steps.", keywords: ["root tip", "stain", "microscope", "cut", "slide", "hcl"], minKeywords: 1 },
          { level: 4, descriptor: "Logical sequence with 4+ steps.", keywords: ["cut", "hcl", "rinse", "stain", "coverslip", "squash", "count", "microscope", "acetocarmine"], minKeywords: 2 },
          { level: 6, descriptor: "Numbered steps with specific volumes/times/conditions; counting protocol; safety.", keywords: ["1 cm", "1m hcl", "60°c", "10 min", "acetocarmine", "coverslip", "squash", "×400", "5 fields", "goggles", "fume hood"], minKeywords: 4 },
          { level: 8, descriptor: "Stage-by-stage counting; repeats 3×; mitotic index formula; positive control; waste disposal.", keywords: ["prophase", "metaphase", "anaphase", "telophase", "100 cells", "repeat", "3 times", "mitotic index", "positive control", "waste", "stage micrometer", "nitrile"], minKeywords: 3 },
        ],
      },
    },
  ],
}
