import type { StrandhootPack } from "../engine/types"

// Crit C data: Atmospheric CO₂ at Mauna Loa Observatory (ppm), annual mean values
// extracted from the Chapter 2 Evidence graph (pp. 55–56).
// The data shows a near-linear rise; gradient ≈ 2.1 ppm yr⁻¹ over this period.
// A second transform plots CO₂ vs year² to test whether the rate is accelerating
// (a straight line on CO₂ vs year² would imply accelerating growth).
export const evidenceCritC: StrandhootPack = {
  slug: "evidence-crit-c",
  title: "Rising CO₂: Processing Atmospheric Evidence",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "Atmospheric CO₂ data analysis",
  accent: "#0984b5",
  icon: "📈",
  statementOfInquiry:
    "Our ability to collect evidence improves with advances in science and technical innovations.",
  estMinutes: 30,
  intro:
    "The National Oceanic and Atmospheric Administration (NOAA) has recorded CO₂ levels at Mauna Loa Observatory in Hawaii since 1958. This dataset — used directly in Chapter 2 — shows atmospheric CO₂ rising from ~380 ppm in 2006 to over 405 ppm in 2018. Use the data tool to present, process and analyse the trend, then draw a conclusion and critically evaluate the evidence-collection method.",
  badges: [
    {
      id: "presenter-c",
      label: "Data Display",
      icon: "📊",
      description: "Reach Level 8 on Presenting the data",
      strandId: "present",
      atLevel: 8,
    },
    {
      id: "processor-c",
      label: "Gradient Finder",
      icon: "📐",
      description: "Reach Level 8 on Processing the data",
      strandId: "process",
      atLevel: 8,
    },
    {
      id: "concluder-c",
      label: "Climate Analyst",
      icon: "🌡️",
      description: "Reach Level 8 on Conclusion",
      strandId: "conclude",
      atLevel: 8,
    },
    {
      id: "evaluator-c",
      label: "Method Critic",
      icon: "⚖️",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Mauna Loa CO₂ dataset",
      blurb: "Atmospheric CO₂ concentration from 2006 to 2018",
      icon: "🌋",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor:
        "Display the Mauna Loa CO₂ data clearly and apply an appropriate graphical representation.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table with some values but missing headings or units.",
        },
        {
          level: 4,
          body: "Level 3–4: A clear table with column headings (Year; CO₂ concentration in ppm) and a graph with both axes fully labelled including units. A sensible scale is chosen so the data fills the grid.",
        },
        {
          level: 6,
          body: "Level 5–6: Axes labelled with units, a scale that fills the grid, points accurately plotted with a straight line (or smooth curve) of best fit. The graph clearly shows the upward trend. The steepening gradient after 2010 is visible. Annual mean values are used (seasonal variation removed), which is a processing step that improves the clarity of the trend.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a second graph plotting CO₂ against year² to test whether growth is linear or accelerating. If the CO₂ vs year² plot gives a straight line, the rate of increase is itself increasing (quadratic growth). This linearisation allows a quantitative test of acceleration — a key analytical step. The original graph shows the raw trend; the transformed graph reveals whether the rate of increase is constant or growing.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Atmospheric CO₂ at Mauna Loa Observatory, Hawaii (annual mean, seasonal variations removed)",
        xLabel: "Year",
        yLabel: "CO₂ concentration (ppm)",
        editable: true,
        initialRows: [
          { x: 2006, y: 381.9 },
          { x: 2007, y: 383.8 },
          { x: 2008, y: 385.6 },
          { x: 2009, y: 387.4 },
          { x: 2010, y: 389.9 },
          { x: 2011, y: 391.6 },
          { x: 2012, y: 394.0 },
          { x: 2013, y: 396.5 },
          { x: 2014, y: 398.6 },
          { x: 2015, y: 401.0 },
          { x: 2016, y: 404.2 },
          { x: 2017, y: 406.5 },
          { x: 2018, y: 408.5 },
        ],
        transforms: [
          {
            id: "raw",
            label: "CO₂ vs Year",
            x: "x",
            y: "y",
            xLabel: "Year",
            yLabel: "CO₂ concentration (ppm)",
          },
          {
            id: "squared",
            label: "CO₂ vs Year²  [acceleration test]",
            x: "x²",
            y: "y",
            xLabel: "Year² (×10⁶)",
            yLabel: "CO₂ concentration (ppm)",
          },
        ],
        derive: { kind: "gradient", label: "Rate of CO₂ increase (ppm yr⁻¹)", unit: "ppm yr⁻¹" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and graph clear and scientifically valid?",
        scaffolds: [
          "My table includes headings and units for...",
          "I plotted CO₂ concentration (ppm) on the y-axis against year on...",
          "The graph shows a... trend because...",
          "I used a line of best fit to show...",
          "The seasonal variation has been removed from the data because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data, table or graph.",
            keywords: ["table", "graph", "co2", "year", "concentration", "data"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings and units on table and axes.",
            keywords: [
              "units",
              "heading",
              "labelled",
              "axes",
              "ppm",
              "year",
              "concentration",
              "scale",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Line of best fit; upward trend described; seasonal variation acknowledged.",
            keywords: [
              "line of best fit",
              "upward",
              "increasing",
              "trend",
              "seasonal",
              "removed",
              "annual mean",
              "smooth",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Second transform (CO₂ vs year²) described to test for acceleration.",
            keywords: [
              "year²",
              "squared",
              "acceleration",
              "quadratic",
              "linear",
              "transform",
              "rate",
              "increasing",
              "straight line",
              "test",
            ],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "process",
      name: "Processing the data",
      descriptor:
        "Calculate the mean annual rate of CO₂ increase and assess whether the rate is accelerating.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Describes the overall trend ('CO₂ increases over time').",
        },
        {
          level: 4,
          body: "Level 3–4: Calculates the total rise: from 381.9 ppm (2006) to 408.5 ppm (2018) = an increase of 26.6 ppm over 12 years. Average rate ≈ 26.6 ÷ 12 ≈ 2.2 ppm per year.",
        },
        {
          level: 6,
          body: "Level 5–6: From the line of best fit on the CO₂ vs year graph, chooses two widely-spaced points and calculates the gradient. For example, at 2006 (381.9 ppm) and 2018 (408.5 ppm): gradient = (408.5 − 381.9) / (2018 − 2006) = 26.6 / 12 ≈ 2.2 ppm yr⁻¹. Compares the gradient for 2006–2012 versus 2012–2018 to assess whether the rate has changed.",
        },
        {
          level: 8,
          body: "Level 7–8: Full gradient calculation shown with two clearly identified data points. Sub-period analysis: 2006–2012: (394.0 − 381.9) / 6 = 2.02 ppm yr⁻¹; 2012–2018: (408.5 − 394.0) / 6 = 2.42 ppm yr⁻¹. The rate has increased by ~0.4 ppm yr⁻¹ between the two periods — evidence of acceleration. The CO₂ vs year² plot should show this as a positive curvature in the CO₂ vs year plot becoming a straight line in the squared plot, confirming quadratic (accelerating) growth.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title: "Atmospheric CO₂ at Mauna Loa Observatory, Hawaii (annual mean, seasonal variations removed)",
        xLabel: "Year",
        yLabel: "CO₂ concentration (ppm)",
        editable: true,
        initialRows: [
          { x: 2006, y: 381.9 },
          { x: 2007, y: 383.8 },
          { x: 2008, y: 385.6 },
          { x: 2009, y: 387.4 },
          { x: 2010, y: 389.9 },
          { x: 2011, y: 391.6 },
          { x: 2012, y: 394.0 },
          { x: 2013, y: 396.5 },
          { x: 2014, y: 398.6 },
          { x: 2015, y: 401.0 },
          { x: 2016, y: 404.2 },
          { x: 2017, y: 406.5 },
          { x: 2018, y: 408.5 },
        ],
        transforms: [
          {
            id: "raw",
            label: "CO₂ vs Year",
            x: "x",
            y: "y",
            xLabel: "Year",
            yLabel: "CO₂ concentration (ppm)",
          },
          {
            id: "squared",
            label: "CO₂ vs Year²  [acceleration test]",
            x: "x²",
            y: "y",
            xLabel: "Year² (×10⁶)",
            yLabel: "CO₂ concentration (ppm)",
          },
        ],
        derive: { kind: "gradient", label: "Rate of CO₂ increase (ppm yr⁻¹)", unit: "ppm yr⁻¹" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: calculate the gradient of the CO₂ vs year graph and use it to find the mean annual rate of increase. Assess whether the rate has changed over the period.",
        scaffolds: [
          "The overall trend shows that CO₂...",
          "Total increase = ___ − ___ = ___ ppm over ___ years",
          "Gradient = Δ(CO₂) / Δ(year) = ___ / ___ ≈ ___ ppm yr⁻¹",
          "For 2006–2012: gradient ≈ ___ ppm yr⁻¹; for 2012–2018: gradient ≈ ___",
          "This suggests the rate is [constant / increasing / decreasing] because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Notes CO₂ increases with year.",
            keywords: ["increases", "year", "co2", "rises", "trend", "upward"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Total increase calculated with values cited.",
            keywords: [
              "381",
              "408",
              "26",
              "12 years",
              "increase",
              "total",
              "average",
              "2.2",
              "ppm",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Gradient calculated with two identified data points and units stated.",
            keywords: [
              "gradient",
              "2006",
              "2018",
              "two points",
              "best fit",
              "2.2 ppm",
              "ppm yr",
              "calculation",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Sub-period gradients compared; acceleration in rate identified with numerical evidence.",
            keywords: [
              "2006–2012",
              "2012–2018",
              "2.02",
              "2.42",
              "acceleration",
              "increasing rate",
              "quadratic",
              "0.4",
              "evidence",
              "sub-period",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "conclude",
      name: "Conclusion",
      descriptor:
        "State a conclusion about the trend in atmospheric CO₂ and link to combustion of fossil fuels.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'CO₂ concentration increases over time.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Atmospheric CO₂ increased from 381.9 ppm in 2006 to 408.5 ppm in 2018. This is consistent with increased combustion of fossil fuels releasing CO₂ into the atmosphere.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'CO₂ rose from 381.9 ppm (2006) to 408.5 ppm (2018), a total increase of 26.6 ppm at a mean rate of ~2.2 ppm yr⁻¹. The 400 ppm threshold was exceeded for the first time in recorded history in 2015. Burning fossil fuels releases CO₂ via combustion (e.g. 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O). The rate of increase is consistent with growing global fossil fuel consumption. Comparing pre-industrial levels (~280 ppm) to today (~408 ppm) shows a 46% increase attributable primarily to human activity.'",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus the conclusion addresses rate acceleration: 2006–2012 rate ≈ 2.02 ppm yr⁻¹; 2012–2018 rate ≈ 2.42 ppm yr⁻¹ — evidence that the rate of increase is itself rising, consistent with growing energy demand and insufficient decarbonisation. The conclusion also notes the limitation that Mauna Loa is a single monitoring station; global atmospheric mixing means it is representative, but the conclusion would be strengthened by corroborating data from ice cores (which show the same trend) and multiple global stations.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion about the trend in atmospheric CO₂ from 2006 to 2018. Link the trend to a chemical cause and use specific data values.",
        scaffolds: [
          "CO₂ concentration increased from ___ ppm (2006) to ___ ppm (2018)...",
          "The mean rate of increase was approximately ___ ppm yr⁻¹...",
          "This is caused by..., for example the combustion equation...",
          "The 400 ppm threshold was exceeded in...",
          "Comparing to pre-industrial levels (~280 ppm), CO₂ has risen by approximately...%",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States CO₂ increases with time.",
            keywords: ["increases", "co2", "time", "year", "concentration", "rises"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Specific values cited; fossil fuels linked.",
            keywords: ["381", "408", "fossil fuel", "combustion", "carbon dioxide", "increases"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Rate calculated; combustion equation; 400 ppm milestone; pre-industrial comparison.",
            keywords: [
              "2.2 ppm",
              "rate",
              "400 ppm",
              "2015",
              "combustion",
              "co2",
              "280",
              "pre-industrial",
              "46%",
              "fossil fuel",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Rate acceleration quantified; limitation of single station noted; ice core corroboration mentioned.",
            keywords: [
              "2.02",
              "2.42",
              "acceleration",
              "mauna loa",
              "single station",
              "ice core",
              "limitation",
              "global",
              "representative",
              "corroborate",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "evaluate",
      name: "Evaluating the method",
      descriptor:
        "Identify weaknesses in the Mauna Loa CO₂ monitoring method and suggest specific improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The method could be improved.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'The data comes from only one location. CO₂ levels may vary in other parts of the world, so the data may not be fully representative of the global average.'",
        },
        {
          level: 6,
          body: "Level 5–6: Two limitations with matching improvements: (1) Single monitoring station — Mauna Loa may be affected by local volcanic CO₂ from Kilauea. Improvement: cross-check with other global stations (e.g. Cape Grim, Tasmania). (2) Seasonal variation removed by averaging — this is a processing step that smooths the data but may hide short-term fluctuations. Improvement: also present the un-averaged data to show seasonal cycles caused by photosynthesis in the Northern Hemisphere.",
        },
        {
          level: 8,
          body: "Level 7–8: Multiple specific weaknesses with reasoned improvements: (1) Mauna Loa is near active volcanic vents — local CO₂ emissions from Kilauea could inflate readings; NOAA guards against this with wind direction filtering, but this is a source of systematic error. (2) The continuous monitoring started in 1958 — for historical comparison, ice core proxies must be used, which have ±15 ppm uncertainty. This limits the precision of comparisons to pre-industrial levels. (3) Atmospheric mixing means Mauna Loa is broadly representative, but polar vs tropical gradients exist; satellite mapping (OCO-2 satellite, launched 2014) now provides global spatial resolution. (4) Only 13 data points are shown in the textbook graph — the full dataset has monthly resolution, which would improve the gradient calculation's precision.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method used to collect this atmospheric CO₂ data. What are the main weaknesses and how would you improve them?",
        scaffolds: [
          "A key weakness is...",
          "This affects the result because...",
          "To improve this, I would...",
          "The data from Mauna Loa might be affected by... because the observatory is near...",
          "Reliability of the trend could be strengthened by...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Vague evaluation.",
            keywords: ["improve", "better", "weakness", "problem", "error", "limitation"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Single location weakness mentioned.",
            keywords: [
              "one location",
              "single station",
              "representative",
              "global",
              "mauna loa",
              "only one",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Two specific weaknesses with matching improvements; seasonal variation addressed.",
            keywords: [
              "volcanic",
              "kilauea",
              "seasonal",
              "cape grim",
              "multiple stations",
              "improve",
              "photosynthesis",
              "average",
              "global",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Multiple weaknesses including systematic error, ice core precision, and satellite data mentioned.",
            keywords: [
              "systematic error",
              "wind direction",
              "ice core",
              "±15 ppm",
              "oco-2",
              "satellite",
              "spatial",
              "2014",
              "precision",
              "uncertainty",
              "pre-industrial",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
