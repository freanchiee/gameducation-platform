import type { StrandhootPack } from "../engine/types"

// Crit C data: Boiling point of water vs altitude above sea level.
// Source: Chapter 6 "Form" data-based question "Cooking at altitude" (p.143).
// The graph shows a linear decrease from 100°C at 0 m to ~71°C at ~10 000 m.
// Digitised values at even altitude intervals.
// Raw data is already linear (boiling point vs altitude), so the raw transform
// is the primary display. A 1/x transform (boiling point vs 1/altitude) is
// included as a contrast to confirm linearity of the raw relationship.
// Gradient of raw line: slope ≈ −0.0029 °C m⁻¹ (≈ −2.9°C per 1000 m).
// This matches the textbook context: "at higher altitudes the air pressure
// decreases and the boiling point decreases."
export const formCritC: StrandhootPack = {
  slug: "form-crit-c",
  title: "Boiling Point vs Altitude",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "Effect of altitude on boiling point of water",
  accent: "#0984b5",
  icon: "📉",
  statementOfInquiry:
    "Observing and describing the properties of a substance helps us to understand its identity and how it interacts with the environment.",
  estMinutes: 30,
  intro:
    "The boiling point of water falls as altitude increases — as shown in Chapter 6's 'Cooking at altitude' dataset. Use the data tool to plot, process and analyse the relationship, then draw conclusions about cooking at high altitude and evaluate the method.",
  badges: [
    {
      id: "presenter",
      label: "Data Display",
      icon: "📊",
      description: "Reach Level 8 on Presenting data",
      strandId: "present",
      atLevel: 8,
    },
    {
      id: "processor",
      label: "Gradient Finder",
      icon: "📐",
      description: "Reach Level 8 on Processing data",
      strandId: "process",
      atLevel: 8,
    },
    {
      id: "concluder",
      label: "Altitude Analyst",
      icon: "🏔️",
      description: "Reach Level 8 on Conclusion",
      strandId: "conclude",
      atLevel: 8,
    },
    {
      id: "evaluator",
      label: "Method Critic",
      icon: "⚖️",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Altitude dataset",
      blurb: "Boiling point of water at different altitudes above sea level",
      icon: "🏔️",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor: "Display the boiling point vs altitude data clearly and describe the trend.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table with numbers but missing headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A table with clear column headings (altitude in m; boiling point in °C) and a graph with labelled axes including units. A line of best fit is drawn through the data.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, a scale that fills the grid, data points accurately plotted. The trend is described as a negative linear relationship — as altitude increases, boiling point decreases at an approximately constant rate. A straight line of best fit is the appropriate model.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus identification that the relationship is linear (unlike the Kc vs temperature relationship which is exponential). The raw boiling point vs altitude data gives a straight line, confirming a direct proportional decrease. Specific landmark values from the table are used: at the summit of Everest (8848 m), boiling point ≈ 74°C; at the top of the Burj Khalifa (828 m), boiling point ≈ 97.6°C. These are read off the line of best fit and confirmed against the landmarks in the textbook.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Boiling point of water at different altitudes above sea level",
        xLabel: "Altitude above sea level (m)",
        yLabel: "Boiling point (°C)",
        editable: true,
        initialRows: [
          { x: 0, y: 100.0 },
          { x: 1000, y: 97.1 },
          { x: 2000, y: 93.8 },
          { x: 3000, y: 90.9 },
          { x: 4000, y: 87.8 },
          { x: 5000, y: 84.6 },
          { x: 6000, y: 81.4 },
          { x: 8000, y: 75.5 },
          { x: 9000, y: 72.5 },
          { x: 10000, y: 70.7 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Boiling point vs Altitude",
            x: "x",
            y: "y",
            xLabel: "Altitude (m)",
            yLabel: "Boiling point (°C)",
          },
          {
            id: "sqrtx",
            label: "Boiling point vs √Altitude",
            x: "√x",
            y: "y",
            xLabel: "√Altitude (m^0.5)",
            yLabel: "Boiling point (°C)",
          },
        ],
        derive: { kind: "gradient", label: "Rate of decrease (°C m⁻¹)", unit: "°C m⁻¹" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and graph scientifically valid? Describe the overall trend.",
        scaffolds: [
          "My table includes headings and units for...",
          "I plotted boiling point on the y-axis against altitude on...",
          "The graph shows a... trend because as altitude increases...",
          "I drew a line of best fit because...",
          "The specific values at Everest and Burj Khalifa are...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data or a graph.",
            keywords: ["table", "graph", "altitude", "boiling point", "data"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings and units on table and axes; basic trend stated.",
            keywords: ["units", "heading", "labelled", "axes", "metres", "degrees", "celsius", "altitude", "decreases"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Linear trend identified; line of best fit described; scale fills grid.",
            keywords: ["linear", "line of best fit", "decreases", "constant rate", "negative", "scale", "straight line", "accurate"],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Landmark values from table read off graph; linearity confirmed.",
            keywords: ["everest", "8848", "74", "burj khalifa", "828", "97", "landmark", "straight line", "linear", "proportional"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor: "Calculate the gradient of the boiling point vs altitude graph and interpret its meaning.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Describes the overall trend ('boiling point gets lower at higher altitudes').",
        },
        {
          level: 4,
          body: "Level 3–4: Calculates the overall change: boiling point falls from 100°C at sea level to ~71°C at 10 000 m — a total decrease of ~29°C. Notes this is a large change and describes the relationship as approximately linear.",
        },
        {
          level: 6,
          body: "Level 5–6: Calculates the gradient by choosing two widely-spaced points on the line of best fit: e.g. (0 m, 100°C) and (10 000 m, 71°C). Gradient = Δy / Δx = (71 − 100) / (10 000 − 0) = −29 / 10 000 = −0.0029 °C m⁻¹. States that boiling point falls by about 2.9°C for every 1000 m increase in altitude.",
        },
        {
          level: 8,
          body: "Level 7–8: Full working shown — gradient = (y₂ − y₁) / (x₂ − x₁) using two clearly identified points on the line of best fit (not raw data points). Uses the gradient to predict boiling point at the landmark heights from the table: At Burj Khalifa (828 m): b.p. = 100 + (−0.0029 × 828) = 100 − 2.4 = 97.6°C. At Everest summit (8848 m): b.p. = 100 + (−0.0029 × 8848) = 100 − 25.7 = 74.3°C. States unit of gradient as °C m⁻¹. Links to the physical reason: lower atmospheric pressure at altitude means fewer air particles push down on the liquid surface, so less kinetic energy (lower temperature) is needed for molecules to escape into the gas phase.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Boiling point of water at different altitudes above sea level",
        xLabel: "Altitude above sea level (m)",
        yLabel: "Boiling point (°C)",
        editable: true,
        initialRows: [
          { x: 0, y: 100.0 },
          { x: 1000, y: 97.1 },
          { x: 2000, y: 93.8 },
          { x: 3000, y: 90.9 },
          { x: 4000, y: 87.8 },
          { x: 5000, y: 84.6 },
          { x: 6000, y: 81.4 },
          { x: 8000, y: 75.5 },
          { x: 9000, y: 72.5 },
          { x: 10000, y: 70.7 },
        ],
        transforms: [
          {
            id: "raw",
            label: "Boiling point vs Altitude",
            x: "x",
            y: "y",
            xLabel: "Altitude (m)",
            yLabel: "Boiling point (°C)",
          },
          {
            id: "sqrtx",
            label: "Boiling point vs √Altitude",
            x: "√x",
            y: "y",
            xLabel: "√Altitude (m^0.5)",
            yLabel: "Boiling point (°C)",
          },
        ],
        derive: { kind: "gradient", label: "Rate of decrease (°C m⁻¹)", unit: "°C m⁻¹" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: calculate the gradient of the boiling point vs altitude graph. Use the gradient to predict the boiling point at the summit of Everest (8848 m) and at the top of the Burj Khalifa (828 m).",
        scaffolds: [
          "The trend shows boiling point...",
          "Gradient = Δboiling point / Δaltitude = ( ___ − ___ ) / ( ___ − ___ ) = ___°C m⁻¹",
          "At the Burj Khalifa (828 m): boiling point ≈ 100 + (gradient × 828) = ___°C",
          "At Everest summit (8848 m): boiling point ≈ 100 + (gradient × 8848) = ___°C",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Notes boiling point decreases with altitude.",
            keywords: ["decreases", "increases", "altitude", "boiling point", "falls", "lower"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Overall change calculated; linear relationship described.",
            keywords: ["29", "100", "71", "linear", "change", "range", "decrease", "10000"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Gradient calculated with working; unit stated.",
            keywords: ["gradient", "0.0029", "delta y", "delta x", "two points", "best fit", "°c m", "2.9"],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor: "Gradient used to predict landmark values; physical reason for decrease given.",
            keywords: ["97.6", "74", "burj khalifa", "everest", "prediction", "atmospheric pressure", "kinetic energy", "gas phase", "escape", "lower pressure"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor: "State a conclusion about the effect of altitude on boiling point and explain it in terms of atmospheric pressure.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'Boiling point decreases as altitude increases.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Boiling point decreases as altitude increases. This means water boils at a lower temperature on top of Everest (~74°C) than at sea level (100°C), so it takes longer to cook food at high altitude.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'Boiling point falls from 100°C at sea level to ~71°C at 10 000 m — a decrease of ~29°C. This is because at higher altitudes the atmospheric pressure is lower. Boiling occurs when the vapour pressure of the liquid equals the atmospheric pressure. At lower atmospheric pressure, the vapour pressure of water can equal the external pressure at a lower temperature, so water boils below 100°C. Food cooks more slowly at high altitude because water boils at a lower temperature, reducing the rate of cooking.'",
        },
        {
          level: 8,
          body: "Level 7–8: 'Boiling point decreases linearly with altitude at a rate of ~0.0029°C m⁻¹ (2.9°C per 1000 m). At the summit of Everest (8848 m), the predicted boiling point is ~74.3°C — this matches values from the textbook. Physically: at sea level, atmospheric pressure is ~100 kPa. At the summit of Everest, atmospheric pressure is approximately 33 kPa. Boiling occurs when the vapour pressure of the liquid matches the external (atmospheric) pressure. At lower pressure, water reaches this equilibrium at a lower temperature. Pasta cooked at Everest would require significantly longer cooking time and might never cook properly if the protein denaturation temperature is not reached. In contrast, a pressure cooker raises the pressure above atmospheric, increasing the boiling point above 100°C, cooking food faster.'",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion. What is the relationship between altitude and boiling point? Explain it in terms of atmospheric pressure. Use specific data values and relate to the cooking application.",
        scaffolds: [
          "As altitude increases from 0 m to 10 000 m, the boiling point of water...",
          "This is because at higher altitude, the atmospheric pressure...",
          "Boiling occurs when the vapour pressure of water...",
          "At the summit of Everest (8848 m), the boiling point is approximately...°C, which means...",
          "This explains why cooking pasta at altitude...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States boiling point decreases with altitude.",
            keywords: ["decreases", "boiling point", "altitude", "lower", "falls"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Everest or Burj Khalifa values cited; practical cooking impact stated.",
            keywords: ["everest", "74", "burj khalifa", "sea level", "100", "cook", "longer", "lower temperature"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Vapour pressure equal to atmospheric pressure explained; 29°C decrease cited.",
            keywords: ["vapour pressure", "atmospheric pressure", "29", "equal", "boiling point", "lower pressure", "temperature", "altitude", "rate"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Gradient used; pressure values cited; pressure cooker contrast or denaturation mentioned.",
            keywords: ["0.0029", "33 kpa", "100 kpa", "pressure cooker", "gradient", "74.3", "denaturation", "vapour pressure", "equilibrium", "faster"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor: "Identify weaknesses in the data collection and suggest specific improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The results could be improved.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Only one trial was conducted at each altitude, so we cannot be certain the boiling point values are reliable.' Also: 'The altitude values from the graph may not be precisely read — digitising a printed graph introduces error.'",
        },
        {
          level: 6,
          body: "Level 5–6: Two specific weaknesses: (1) Only one reading per altitude — reliability could be improved by repeating measurements three times and taking a mean. (2) The data was read from a printed graph rather than recorded directly with calibrated instruments — this introduces reading errors of ±1–2°C. Improvement: use a calibrated thermometer (±0.1°C) and a GPS altimeter (±5 m) to measure boiling point and altitude directly. Also, the data does not include measurements between 6000 m and 8000 m — a gap that reduces confidence in the line of best fit in this range.",
        },
        {
          level: 8,
          body: "Level 7–8: Multiple specific weaknesses with effects and improvements: (1) Reading error from printed graph (±2°C) — use a calibrated digital thermometer. (2) No repeat measurements — means cannot be calculated and outliers cannot be identified; repeat 3× at each altitude. (3) 'Altitude' is a macroscopic variable — it reflects atmospheric pressure, which also varies with weather conditions; pressure should be measured directly with a barometer (±0.1 kPa) rather than inferred from altitude. (4) The straight-line relationship breaks down at very low pressures (near vacuum) — the data range (0–10 000 m) does not test the limits of validity. (5) Only 10 data points — adding points in the steep section (6000–8000 m) would improve the precision of the gradient.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method used to collect this boiling point vs altitude data. Identify the main weaknesses and suggest specific, reasoned improvements.",
        scaffolds: [
          "A key weakness is...",
          "This affects the result because...",
          "To improve this, I would...",
          "Reliability could be improved by...",
          "A systematic error might arise from...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Vague evaluation.",
            keywords: ["improve", "better", "error", "weakness", "problem", "inaccurate"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One specific weakness mentioned with its effect.",
            keywords: ["repeat", "reliable", "graph", "reading error", "one trial", "thermometer", "once"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Two weaknesses with matching improvements.",
            keywords: ["repeat", "three times", "calibrated thermometer", "reading error", "±", "gps", "altimeter", "gap", "6000", "8000", "reliability"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Multiple weaknesses with effects and specific improvements; pressure measurement suggested.",
            keywords: ["barometer", "pressure", "weather", "digital thermometer", "repeat", "outlier", "mean", "10 data points", "range", "valid", "kpa"],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
