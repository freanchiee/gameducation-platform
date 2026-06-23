import type { StrandhootPack } from "../engine/types"

// Crit C data: pH vs volume of NaOH added during weak acid (HA) titration.
// Data taken directly from the Chapter 12 summative assessment table (page 326).
// The erroneous point at 18.00 cm³ / pH 6.75 is included as-is (the summative
// assessment asks students to identify it). The pH rises from ~2.95 to ~11.85.
// A linearising transform is not appropriate for a full pH curve; instead the
// "gradient" derive is used on the raw data to help students locate the steep
// equivalence-point region (maximum gradient ≈ between 18 and 19 cm³ NaOH).
export const transferCritC: StrandhootPack = {
  slug: "transfer-crit-c",
  title: "pH Titration Curve: Weak Acid vs Strong Base",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "Acid–base titration data analysis",
  accent: "#0984b5",
  icon: "📈",
  statementOfInquiry:
    "Technological advances in analytical devices enhance the ability of scientists to monitor the transfer of matter when changes occur during chemical reactions.",
  estMinutes: 30,
  intro:
    "A student titrated a weak acid (HA) of unknown concentration against 0.10 mol dm⁻³ sodium hydroxide using a pH probe and collected a full pH curve. Analyse the real data from your Chapter 12 textbook: present the curve, find the equivalence point, write a conclusion linking concentration to the mole concept, and evaluate the strengths and limitations of the method.",
  badges: [
    { id: "presenter", label: "Curve Plotter", icon: "📊", description: "Reach Level 8 on Presenting data", strandId: "present", atLevel: 8 },
    { id: "processor", label: "Equivalence Finder", icon: "📐", description: "Reach Level 8 on Processing data", strandId: "process", atLevel: 8 },
    { id: "concluder", label: "Mole Calculator", icon: "🔢", description: "Reach Level 8 on Conclusion", strandId: "conclude", atLevel: 8 },
    { id: "evaluator", label: "Method Critic", icon: "⚖️", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "pH titration dataset", blurb: "Weak acid titration with NaOH — pH probe data from the Chapter 12 summative assessment", icon: "🧪" }],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the pH vs volume of NaOH data clearly and describe the shape of the pH curve.",
      guided: [
        { level: 2, body: "Level 1–2: A basic table with data values, but headings or units may be missing. A sketch graph shows pH on y-axis and volume of NaOH on x-axis, but axes may not be labelled." },
        { level: 4, body: "Level 3–4: A clear table with column headings 'Volume of NaOH added (cm³)' and 'pH', with all data points entered. A graph with both axes labelled and scaled to use most of the available space." },
        { level: 6, body: "Level 5–6: Axes correctly labelled with units; a sensible scale (volume 0–22 cm³; pH 0–14); all data points plotted accurately; a smooth sigmoidal S-shaped curve of best fit drawn through the points — not dot-to-dot. The steep rise (equivalence region) is clearly visible around 18–19 cm³ of NaOH." },
        { level: 8, body: "Level 7–8: As Level 5–6, plus: the anomalous data point at approximately 18.00 cm³ (pH 6.75, which appears too low given the surrounding data) is identified and excluded from the curve of best fit with a reason. The equivalence point is marked at the inflection point of the steep section. The buffer zone (gradual pH rise before ~16 cm³) is labelled. The student notes that a pH probe was used rather than an indicator, giving continuous data." },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "pH vs volume of 0.10 mol dm⁻³ NaOH added to 25 cm³ of weak acid HA",
        xLabel: "Volume of NaOH added (cm³)",
        yLabel: "pH",
        editable: true,
        initialRows: [
          { x: 1.00, y: 2.95 },
          { x: 3.00, y: 3.21 },
          { x: 5.00, y: 3.44 },
          { x: 7.00, y: 3.70 },
          { x: 9.00, y: 4.00 },
          { x: 11.00, y: 4.33 },
          { x: 13.00, y: 4.82 },
          { x: 15.00, y: 5.15 },
          { x: 17.00, y: 5.81 },
          { x: 18.00, y: 6.75 },
          { x: 18.20, y: 10.50 },
          { x: 18.80, y: 11.20 },
          { x: 19.50, y: 11.65 },
          { x: 21.50, y: 11.80 },
        ],
        transforms: [
          { id: "raw", label: "pH vs Volume NaOH", x: "x", y: "y", xLabel: "Volume of NaOH added (cm³)", yLabel: "pH" },
        ],
        derive: { kind: "gradient", label: "ΔpH / ΔV (pH per cm³)", unit: "pH cm⁻³" },
      },
      response: {
        kind: "data",
        prompt: "Describe how you have presented the data. What are the key features of the pH curve that you can identify from your table and graph?",
        scaffolds: [
          "My table includes column headings and units for...",
          "I plotted pH on the y-axis against volume of NaOH on...",
          "The pH curve shows three regions: a buffer zone where..., a steep equivalence region where..., and a levelling-off region where...",
          "I identified one anomalous data point at approximately... cm³ because...",
          "I used a pH probe rather than an indicator, which means...",
        ],
        rubric: [
          { level: 2, descriptor: "Mentions the data or graph.", keywords: ["table", "graph", "ph", "volume", "naoh", "data"], minKeywords: 1 },
          { level: 4, descriptor: "Axes labelled with units; sigmoidal shape described.", keywords: ["units", "labelled", "ph", "volume", "cm³", "axes", "sigmoidal", "s-shaped", "curve"], minKeywords: 2 },
          { level: 6, descriptor: "Three regions of curve identified; smooth curve through points; equivalence point located.", keywords: ["buffer zone", "steep", "equivalence", "levels off", "smooth curve", "inflection", "18", "19"], minKeywords: 3 },
          { level: 8, descriptor: "Anomalous point identified and excluded with reason; pH probe advantage stated.", keywords: ["anomalous", "6.75", "excluded", "best fit", "ph probe", "continuous", "indicator", "buffer zone", "labelled", "inflection"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor: "Determine the equivalence point volume and calculate the concentration of the unknown weak acid.",
      guided: [
        { level: 2, body: "Level 1–2: Describes the trend: 'The pH increases as more sodium hydroxide is added.'" },
        { level: 4, body: "Level 3–4: Identifies the steep region of the pH curve: 'Between 18 and 18.2 cm³ of NaOH, the pH jumps from about 6.75 to 10.5 — this is where the equivalence point is.' Reads off the approximate equivalence volume as ~18.1 cm³ (midpoint of the steep rise, excluding the anomalous point at 6.75)." },
        { level: 6, body: "Level 5–6: Calculates moles of NaOH at equivalence point: n(NaOH) = c × V = 0.10 mol dm⁻³ × (18.1 ÷ 1000) dm³ = 0.00181 mol. Uses the 1:1 mole ratio (HA + NaOH → NaA + H₂O) to find n(HA) = 0.00181 mol. Calculates concentration: c(HA) = 0.00181 ÷ (25.0 ÷ 1000) = 0.0724 mol dm⁻³. States units throughout." },
        { level: 8, body: "Level 7–8: As Level 5–6 plus: acknowledges the anomalous data point at 18.0 cm³ (pH 6.75) would shift the estimated equivalence point if included — the correct equivalence should be read from the graph's inflection as approximately 18.1 cm³ (the midpoint between 17.00 cm³/pH 5.81 and 18.20 cm³/pH 10.50). The ΔpH/ΔV gradient at the equivalence point is (10.50 − 5.81) ÷ (18.20 − 17.00) = 4.69 ÷ 1.20 ≈ 3.9 pH units per cm³ — confirming this is the steepest region. The high pH (>11) after 19 cm³ shows excess NaOH." },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "pH vs volume of 0.10 mol dm⁻³ NaOH added to 25 cm³ of weak acid HA",
        xLabel: "Volume of NaOH added (cm³)",
        yLabel: "pH",
        editable: true,
        initialRows: [
          { x: 1.00, y: 2.95 },
          { x: 3.00, y: 3.21 },
          { x: 5.00, y: 3.44 },
          { x: 7.00, y: 3.70 },
          { x: 9.00, y: 4.00 },
          { x: 11.00, y: 4.33 },
          { x: 13.00, y: 4.82 },
          { x: 15.00, y: 5.15 },
          { x: 17.00, y: 5.81 },
          { x: 18.00, y: 6.75 },
          { x: 18.20, y: 10.50 },
          { x: 18.80, y: 11.20 },
          { x: 19.50, y: 11.65 },
          { x: 21.50, y: 11.80 },
        ],
        transforms: [
          { id: "raw", label: "pH vs Volume NaOH", x: "x", y: "y", xLabel: "Volume of NaOH added (cm³)", yLabel: "pH" },
        ],
        derive: { kind: "gradient", label: "ΔpH / ΔV (pH per cm³)", unit: "pH cm⁻³" },
      },
      response: {
        kind: "data",
        prompt: "Process the data: identify the equivalence point volume from the pH curve and use it to calculate the concentration of the unknown weak acid HA.",
        scaffolds: [
          "The equivalence point occurs at approximately ___ cm³ of NaOH because...",
          "Moles of NaOH at equivalence = 0.10 mol dm⁻³ × (___ ÷ 1000) dm³ = ___ mol",
          "From the equation HA + NaOH → NaA + H₂O, the mole ratio is..., so moles of HA = ___ mol",
          "Concentration of HA = ___ mol ÷ (25.0 ÷ 1000) dm³ = ___ mol dm⁻³",
          "The anomalous data point at ___ cm³ (pH ___) was excluded because...",
        ],
        rubric: [
          { level: 2, descriptor: "States pH increases and identifies rough region of steep rise.", keywords: ["increases", "steep", "18", "19", "equivalence", "rapid", "jump"], minKeywords: 1 },
          { level: 4, descriptor: "Equivalence point volume estimated from the curve.", keywords: ["18.1", "18", "equivalence point", "steep", "volume", "cm³", "midpoint"], minKeywords: 1 },
          { level: 6, descriptor: "Moles of NaOH calculated; mole ratio applied; concentration of HA calculated with units.", keywords: ["0.10", "0.00181", "moles", "1:1", "ratio", "0.0724", "25.0", "mol dm", "concentration", "calculation"], minKeywords: 3 },
          { level: 8, descriptor: "Anomalous point excluded with reason; ΔpH/ΔV gradient calculated to confirm equivalence point.", keywords: ["anomalous", "6.75", "excluded", "gradient", "3.9", "4.69", "1.20", "inflection", "steepest", "excess naoh"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor: "State a conclusion about the concentration of the unknown acid and link to the mole concept.",
      guided: [
        { level: 2, body: "Level 1–2: 'The pH increased as sodium hydroxide was added.' — describes trend but does not state a conclusion about concentration." },
        { level: 4, body: "Level 3–4: 'The equivalence point was reached at about 18 cm³ of NaOH. This means the acid was neutralised. The pH at the equivalence point was about 9, which is alkaline — this tells us the acid was a weak acid.' Identifies key features but does not calculate concentration." },
        { level: 6, body: "Level 5–6: 'The equivalence point was at 18.1 cm³ of 0.10 mol dm⁻³ NaOH. Using n = c × V = 0.00181 mol NaOH, and the 1:1 mole ratio (HA + NaOH → NaA + H₂O), the concentration of HA = 0.00181 ÷ 0.025 = 0.0724 mol dm⁻³. The equivalence point pH (~9–10) confirms HA is a weak acid reacting with a strong base — the salt NaA is basic because A⁻ partially accepts protons from water.'" },
        { level: 8, body: "Level 7–8: Full conclusion: concentration of HA = 0.0724 mol dm⁻³ (3 s.f.). The equivalence point pH > 7 confirms a weak acid–strong base system. The buffer zone (pH 3–6 before 16 cm³) is consistent with partial dissociation of the weak acid. Comparing to the known concentration (as in the summative assessment): if the teacher prepared 0.072 mol dm⁻³ ethanoic acid, the result is in excellent agreement — percentage error = |0.0724 − 0.072| ÷ 0.072 × 100% ≈ 0.6%. The pH probe provided continuous, high-precision data (±0.01 pH units) that would be impossible to match with a colour indicator." },
      ],
      response: {
        kind: "data",
        prompt: "Write a conclusion. State the concentration of the unknown weak acid HA calculated from your titration data. Link your answer to the mole concept and explain what the pH at the equivalence point tells you about the acid.",
        scaffolds: [
          "The equivalence point was at ___ cm³ of NaOH, giving ___ mol of NaOH...",
          "Using the 1:1 mole ratio (HA + NaOH → NaA + H₂O), moles of HA = ___ mol...",
          "Therefore, concentration of HA = ___ mol dm⁻³",
          "The pH at the equivalence point (~___) tells us that the acid is... because...",
          "This is consistent / inconsistent with the known value because...",
        ],
        rubric: [
          { level: 2, descriptor: "States pH increased; trend described.", keywords: ["ph", "increased", "sodium hydroxide", "trend", "added", "neutralised"], minKeywords: 1 },
          { level: 4, descriptor: "Equivalence point noted; equivalence pH stated as alkaline.", keywords: ["equivalence", "18", "ph", "alkaline", "above 7", "weak acid", "strong base"], minKeywords: 2 },
          { level: 6, descriptor: "Concentration calculated with full working; 1:1 mole ratio stated; equivalence pH explained.", keywords: ["0.0724", "0.00181", "moles", "1:1", "mol dm", "concentration", "equivalence", "basic", "a⁻", "hydrolysis"], minKeywords: 3 },
          { level: 8, descriptor: "Concentration to 3 s.f.; compared to known; pH probe advantage; buffer zone explained.", keywords: ["0.0724", "3 s.f.", "percentage error", "0.6", "ph probe", "continuous", "buffer zone", "partial dissociation", "precise", "agreement"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor: "Identify weaknesses in the pH probe titration method and suggest specific improvements.",
      guided: [
        { level: 2, body: "Level 1–2: 'I could have made the experiment better.' — no specific weakness identified." },
        { level: 4, body: "Level 3–4: 'One problem is that one data point (at 18.0 cm³, pH 6.75) seems wrong and may have been recorded incorrectly. This would affect my estimation of the equivalence point.' — one specific weakness with effect." },
        { level: 6, body: "Level 5–6: Multiple specific weaknesses: (1) The data point at 18.0 cm³ / pH 6.75 appears anomalous — its pH is unexpectedly low in the steep equivalence region, suggesting a recording error or incomplete equilibration. (2) The increment of 1 cm³ is too coarse near the equivalence point — the steep rise from pH 3.21 to 10.50 spans only ~1 cm³, so a 0.1 cm³ increment near the equivalence point would dramatically improve accuracy. (3) Only one trial was performed — concordant repeats (within 0.10 cm³) would improve reliability. Improvements: add more data points between 17 and 19 cm³; repeat the titration three times." },
        { level: 8, body: "Level 7–8: As Level 5–6, plus: (4) the pH probe requires calibration with buffer solutions (pH 4.00, 7.00 and 10.00) before use — if uncalibrated, all pH readings carry a systematic error that shifts the calculated equivalence point. (5) The temperature was not controlled — Ka for ethanoic acid decreases with temperature, so a temperature rise shifts the equivalence point pH. (6) The equivalence point determined graphically introduces uncertainty — a first-derivative plot (ΔpH/ΔV vs V) gives a sharper, more accurate peak at the equivalence point. The ΔpH/ΔV at 18.10 cm³ is approximately 3.9 pH cm⁻³ — the highest gradient, confirming the equivalence location." },
      ],
      response: {
        kind: "data",
        prompt: "Evaluate the method used to collect this pH titration data. Identify at least two specific weaknesses and suggest a specific improvement for each. Refer to the data in your answer.",
        scaffolds: [
          "A weakness is the data point at ___ cm³ (pH ___) which appears anomalous because...",
          "This affects the result because...",
          "To improve this, I would...",
          "A second weakness is that the increment between additions was ___ cm³, which means near the equivalence point...",
          "Reliability could be improved by repeating the titration ___ times and taking concordant results.",
        ],
        rubric: [
          { level: 2, descriptor: "Vague evaluation; mentions 'could be improved'.", keywords: ["improve", "better", "error", "wrong", "problem", "weakness"], minKeywords: 1 },
          { level: 4, descriptor: "One specific weakness identified and linked to effect on result.", keywords: ["anomalous", "6.75", "18.0", "record", "wrong", "endpoint", "affect", "equivalence"], minKeywords: 1 },
          { level: 6, descriptor: "Two specific weaknesses with improvements; data values referenced.", keywords: ["anomalous", "increment", "1 cm³", "0.1 cm³", "repeat", "concordant", "three times", "17 to 19", "improve", "reliability"], minKeywords: 3 },
          { level: 8, descriptor: "pH probe calibration discussed; temperature effect on Ka; first-derivative plot suggested.", keywords: ["calibration", "buffer", "ph 4", "ph 7", "ka", "temperature", "systematic error", "derivative", "dpH/dV", "3.9", "peak", "equivalence"], minKeywords: 3 },
        ],
      },
    },
  ],
}
