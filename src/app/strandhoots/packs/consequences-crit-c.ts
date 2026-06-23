import type { StrandhootPack } from "../engine/types"

// Crit C data: pH vs [H⁺] for common substances from Chapter 3 (Horner, p.72–73).
// pH = −log₁₀[H⁺], so a plot of pH (y) vs x=[H⁺] is curved/exponential.
// Linearising transform: y=pH on the raw scale, then use ln(y) vs x would not
// help here. The correct linearisation is: since pH = −log₁₀[H⁺],
// plotting pH directly on the y-axis against (1/x where x=[H⁺] in mol dm⁻³)
// is not linear either. The cleanest approach for this dataset:
// Use x = substance pH value and y = [H⁺] (mol dm⁻³) — then the raw y vs x
// is exponential, and ln(y) vs x is a straight line with gradient ≈ −2.303
// (since ln([H⁺]) = −pH × ln(10) = −2.303 × pH).
// This is the "pH linearisation" used in the chapter's data-based question.
//
// Dataset: 9 substances from the Chapter 3 pH scale (book p.66, data table p.72).
// x = pH value; y = [H⁺] in mol dm⁻³ × 10⁷ normalised to integers for display.
// Actual values: x=pH, y=[H⁺] mol dm⁻³.
// We store y as the actual [H⁺] in mol dm⁻³ (scientific notation as decimal).
// Supported transforms: x="x", y="y" (raw) and x="x", y="ln(y)" (linearised).

export const consequencesCritC: StrandhootPack = {
  slug: "consequences-crit-c",
  title: "pH and Hydrogen Ion Concentration",
  subject: "MYP Chemistry",
  criterion: "C",
  topic: "pH scale, logarithmic relationships & acid rain data",
  accent: "#0984b5",
  icon: "📈",
  statementOfInquiry:
    "Change as a consequence of human development can be identified within all environments on our planet.",
  estMinutes: 30,
  intro:
    "A data table from Chapter 3 lists nine common substances with their pH values and hydrogen ion concentrations. The raw data reveals an exponential relationship — but a simple mathematical transform turns it into a straight line that yields the defining equation of the pH scale. Use the data tool to plot, transform and analyse, then draw a conclusion about the consequences of acid rain for our environment.",
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
      label: "Log Master",
      icon: "📐",
      description: "Reach Level 8 on Processing data",
      strandId: "process",
      atLevel: 8,
    },
    {
      id: "concluder",
      label: "Acid Rain Analyst",
      icon: "🌧️",
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
      label: "pH dataset",
      blurb:
        "Hydrogen ion concentration vs pH for nine substances from Chapter 3",
      icon: "🧪",
    },
  ],
  strands: [
    {
      id: "present",
      name: "Presenting the data",
      descriptor:
        "Display the pH vs [H⁺] data clearly and apply a logarithmic transform to linearise it.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A basic table listing the substances and their pH values, with no graph or missing headings and units.",
        },
        {
          level: 4,
          body: "Level 3–4: A clear table with column headings (Substance; pH; [H⁺] in mol dm⁻³) and a graph of [H⁺] on the y-axis against pH on the x-axis, with both axes labelled including units. The graph will show a steep exponential (non-linear) curve.",
        },
        {
          level: 6,
          body: "Level 5–6: The raw graph shows a strongly non-linear, exponential decrease in [H⁺] as pH increases. A sensible scale fills the grid; points are accurately plotted. The curve is steep at low pH (gastric juice, pH 1) and nearly flat at high pH (bleach, pH 13). A smooth curve of best fit is drawn through all 9 points.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus a linearised graph of ln([H⁺]) vs pH. Because pH = −log₁₀[H⁺], we have ln([H⁺]) = −pH × ln(10) ≈ −2.303 × pH. Plotting ln([H⁺]) on the y-axis against pH on the x-axis gives a straight line with gradient ≈ −2.303. This linearisation confirms the mathematical relationship underlying the pH scale and makes it far easier to analyse the data.",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title:
          "Hydrogen ion concentration [H⁺] vs pH for common substances (Chapter 3, Horner 2018)",
        xLabel: "pH",
        yLabel: "[H⁺] (mol dm⁻³)",
        editable: true,
        initialRows: [
          { x: 1, y: 0.1 },
          { x: 2, y: 0.01 },
          { x: 3, y: 0.001 },
          { x: 4, y: 0.0001 },
          { x: 5, y: 0.00001 },
          { x: 6, y: 0.000001 },
          { x: 7, y: 0.0000001 },
          { x: 9, y: 0.000000001 },
          { x: 13, y: 0.0000000000001 },
        ],
        transforms: [
          {
            id: "raw",
            label: "[H⁺] vs pH",
            x: "x",
            y: "y",
            xLabel: "pH",
            yLabel: "[H⁺] (mol dm⁻³)",
          },
          {
            id: "linearised",
            label: "ln([H⁺]) vs pH  [linearised]",
            x: "x",
            y: "ln(y)",
            xLabel: "pH",
            yLabel: "ln([H⁺])",
          },
        ],
        derive: { kind: "gradient", label: "Gradient (≈ −2.303)", unit: "" },
      },
      response: {
        kind: "data",
        prompt:
          "Describe how you have presented the data. What makes your table and graph scientifically valid? Comment on the shape of the raw graph.",
        scaffolds: [
          "My table includes headings and units for...",
          "I plotted [H⁺] on the y-axis against pH on the x-axis...",
          "The graph shows a... trend because...",
          "I linearised the data by plotting ln([H⁺]) vs pH because...",
          "The straight line on the linearised plot confirms...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Mentions the data or graph.",
            keywords: ["table", "graph", "data", "ph", "concentration", "h+"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Headings and units on table and axes; curve shape described.",
            keywords: [
              "units",
              "heading",
              "labelled",
              "axes",
              "mol dm",
              "ph",
              "exponential",
              "curve",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Exponential decrease described; smooth curve of best fit; scale fills the grid.",
            keywords: [
              "exponential",
              "decrease",
              "smooth",
              "best fit",
              "curve",
              "steep",
              "accurate",
              "scale",
              "non-linear",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Linearised ln([H⁺]) vs pH graph described; gradient ≈ −2.303 noted; pH definition confirmed.",
            keywords: [
              "ln",
              "straight line",
              "linear",
              "gradient",
              "-2.303",
              "transform",
              "log",
              "ph definition",
              "linearised",
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
        "Calculate the gradient of the linearised ln([H⁺]) vs pH plot and interpret it.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'As pH increases, [H⁺] decreases.' — describes the overall trend from the raw graph.",
        },
        {
          level: 4,
          body: "Level 3–4: The decrease in [H⁺] is very large and non-linear. Between pH 1 and pH 7, [H⁺] decreases from 0.1 mol dm⁻³ to 1.0 × 10⁻⁷ mol dm⁻³ — a factor of 1,000,000. This cannot be read accurately from a linear graph, which is why a transform is needed.",
        },
        {
          level: 6,
          body: "Level 5–6: From the ln([H⁺]) vs pH graph, a line of best fit is drawn. Reading two widely-spaced points: at pH 1, ln([H⁺]) = ln(0.1) ≈ −2.30; at pH 7, ln([H⁺]) = ln(1×10⁻⁷) ≈ −16.12. Gradient = (−16.12 − (−2.30)) / (7 − 1) = −13.82 / 6 ≈ −2.30. The unit of gradient is (no unit) / pH unit = per pH unit.",
        },
        {
          level: 8,
          body: "Level 7–8: Full calculation: using the extreme points pH 1 ([H⁺] = 0.1) and pH 13 ([H⁺] = 1×10⁻¹³). ln(0.1) = −2.303; ln(1×10⁻¹³) = −29.934. Gradient = (−29.934 − (−2.303)) / (13 − 1) = −27.631 / 12 ≈ −2.303. This value equals −ln(10) ≈ −2.3026. Therefore pH = −log₁₀[H⁺] = −ln([H⁺]) / ln(10), confirming the mathematical definition of the pH scale. Acid rain at pH 4.2 has [H⁺] = 10⁻⁴·² ≈ 6.3 × 10⁻⁵ mol dm⁻³, about 25 times higher than normal rain at pH 5.6 ([H⁺] ≈ 2.5 × 10⁻⁶ mol dm⁻³).",
        },
      ],
      artifactKey: "data-processor",
      artifactProps: {
        title:
          "Hydrogen ion concentration [H⁺] vs pH for common substances (Chapter 3, Horner 2018)",
        xLabel: "pH",
        yLabel: "[H⁺] (mol dm⁻³)",
        editable: true,
        initialRows: [
          { x: 1, y: 0.1 },
          { x: 2, y: 0.01 },
          { x: 3, y: 0.001 },
          { x: 4, y: 0.0001 },
          { x: 5, y: 0.00001 },
          { x: 6, y: 0.000001 },
          { x: 7, y: 0.0000001 },
          { x: 9, y: 0.000000001 },
          { x: 13, y: 0.0000000000001 },
        ],
        transforms: [
          {
            id: "raw",
            label: "[H⁺] vs pH",
            x: "x",
            y: "y",
            xLabel: "pH",
            yLabel: "[H⁺] (mol dm⁻³)",
          },
          {
            id: "linearised",
            label: "ln([H⁺]) vs pH  [linearised]",
            x: "x",
            y: "ln(y)",
            xLabel: "pH",
            yLabel: "ln([H⁺])",
          },
        ],
        derive: { kind: "gradient", label: "Gradient (≈ −2.303)", unit: "" },
      },
      response: {
        kind: "data",
        prompt:
          "Process the data: calculate the gradient of the ln([H⁺]) vs pH graph and interpret what it tells you about the pH scale.",
        scaffolds: [
          "The raw graph shows that [H⁺]...",
          "From the linearised graph I chose two points: (pH₁, ln[H⁺]₁) = ... and (pH₂, ln[H⁺]₂) = ...",
          "Gradient = Δln([H⁺]) / ΔpH = ... / ... ≈ ...",
          "This value of ≈ −2.303 is significant because it equals...",
          "Acid rain at pH 4.2 has [H⁺] ≈ ... mol dm⁻³, which is ___ times greater than normal rain.",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Notes [H⁺] decreases as pH increases.",
            keywords: [
              "decreases",
              "increases",
              "ph",
              "h+",
              "concentration",
              "trend",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor:
              "Large non-linear decrease described; factor of 10 per pH unit stated.",
            keywords: [
              "million",
              "1000000",
              "factor",
              "non-linear",
              "10-fold",
              "large",
              "exponential",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "Gradient calculated from linearised graph with working shown.",
            keywords: [
              "gradient",
              "ln",
              "delta",
              "two points",
              "-2.3",
              "slope",
              "working",
              "best fit",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Full gradient calculation; −ln(10) identified; acid rain [H⁺] calculated.",
            keywords: [
              "-2.303",
              "ln(10)",
              "definition",
              "ph scale",
              "gradient",
              "acid rain",
              "4.2",
              "25 times",
              "calculation",
              "6.3",
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
        "State a conclusion about the logarithmic nature of the pH scale and link to acid rain impacts.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: '[H⁺] decreases as pH increases.'",
        },
        {
          level: 4,
          body: "Level 3–4: '[H⁺] decreases as pH increases. Each unit increase in pH corresponds to a 10-fold decrease in hydrogen ion concentration. This makes the pH scale logarithmic.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'The data confirms that the pH scale is logarithmic — a 1 unit increase in pH corresponds to a 10-fold decrease in [H⁺]. The linearised plot of ln([H⁺]) vs pH gave a gradient of approximately −2.30, consistent with the relationship pH = −log₁₀[H⁺] (where ln(10) ≈ 2.303). This means that acid rain at pH 4.2 has roughly 25 times more H⁺ ions per litre than normal rain at pH 5.6 — a consequence with measurable effects on aquatic ecosystems.'",
        },
        {
          level: 8,
          body: "Level 7–8: The gradient of −2.303 ± 0.02 from the linearised plot is in excellent agreement with the theoretical value of −ln(10) = −2.3026 (< 0.1% error), confirming the mathematical definition pH = −log₁₀[H⁺]. Acid rain (pH 4.2) has [H⁺] = 6.3 × 10⁻⁵ mol dm⁻³ compared to normal rain (pH 5.6) at 2.5 × 10⁻⁶ mol dm⁻³ — a factor of 25. For aquatic ecosystems, this additional acidity dissolves aluminium ions from soil into waterways (toxic to fish), lowers the pH below the tolerance range of freshwater invertebrates (critical threshold ~pH 5), and inhibits reproduction in many fish species. The data thus connects the abstract logarithmic scale directly to measurable environmental consequences.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Write a conclusion. What does the data confirm about the mathematical relationship between pH and [H⁺]? Link your conclusion to the environmental consequences of acid rain.",
        scaffolds: [
          "The data confirms that the pH scale is... because...",
          "Each unit increase in pH corresponds to a ___ -fold change in [H⁺]...",
          "The gradient of the linearised graph (≈ −2.303) equals −ln(10), confirming...",
          "Acid rain at pH 4.2 has [H⁺] ≈ ___ mol dm⁻³, which is ___ times greater than...",
          "This is environmentally significant because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States [H⁺] decreases with increasing pH.",
            keywords: ["decreases", "h+", "ph", "increases", "concentration"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor:
              "10-fold change per pH unit stated; logarithmic relationship identified.",
            keywords: [
              "10-fold",
              "logarithmic",
              "each unit",
              "factor 10",
              "10 times",
              "log scale",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "Gradient ≈ −2.303; acid rain comparison made with data values; environmental link.",
            keywords: [
              "-2.303",
              "gradient",
              "ln(10)",
              "acid rain",
              "ph 4.2",
              "ph 5.6",
              "25 times",
              "aquatic",
              "environment",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Excellent agreement with theory stated; [H⁺] of acid vs normal rain calculated; species impacts named.",
            keywords: [
              "2.3026",
              "agreement",
              "error",
              "6.3",
              "aluminium",
              "fish",
              "invertebrates",
              "ph 5",
              "reproduction",
              "threshold",
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
        "Identify weaknesses in pH measurement by universal indicator and suggest improvements.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: 'The method could be improved by repeating the experiment.'",
        },
        {
          level: 4,
          body: "Level 3–4: 'Using universal indicator only gives an approximate pH (to the nearest 1 unit), which is a significant weakness when investigating small pH changes — for example, the difference between normal rain (pH 5.6) and acid rain (pH 4.2) is only 1.4 units.'",
        },
        {
          level: 6,
          body: "Level 5–6: 'A key limitation is the use of universal indicator solution, which gives pH values only to the nearest ±1 unit — insufficient for detecting the 0.2–0.4 pH unit differences typical in acid rain studies. An improvement would be to use a calibrated pH electrode (precision ±0.01 pH units). Another limitation: the [H⁺] data in this table represents ideal solutions under standard conditions; real rainwater contains multiple dissolved acids (H₂SO₄, HNO₃, H₂CO₃), making actual [H⁺] predictions more complex.'",
        },
        {
          level: 8,
          body: "Level 7–8: Multiple specific weaknesses: (1) Universal indicator accuracy is ±1 pH unit — insufficient for this dataset which spans 12 pH units (pH 1–13) but where small changes near pH 4–6 have large ecological significance. (2) The dataset contains only 9 points and has a gap between pH 7 and pH 9 — adding data at pH 8 (seawater) and pH 9 (baking soda) would improve the fit in the near-neutral region. (3) The [H⁺] values represent thermodynamic standard conditions (25°C); real oceans and lakes have lower temperatures where slightly different [H⁺] values apply. (4) No replicate measurements — averaging at least 3 pH readings per substance would improve precision. Each weakness is linked to a specific, reasoned improvement.",
        },
      ],
      response: {
        kind: "data",
        prompt:
          "Evaluate the method used to measure pH and collect this data. What are the main weaknesses and how would you improve them?",
        scaffolds: [
          "A key weakness is...",
          "This affects the result because...",
          "To improve this, I would...",
          "Universal indicator gives pH values only to the nearest ___ pH unit, which means...",
          "A limitation of the dataset is...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Vague evaluation.",
            keywords: [
              "improve",
              "better",
              "error",
              "weakness",
              "problem",
              "accurate",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor:
              "Universal indicator precision issue identified; small pH differences noted.",
            keywords: [
              "universal indicator",
              "approximate",
              "±1",
              "1 unit",
              "small",
              "precise",
              "acid rain",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "Precision limitation with matching improvement (pH electrode); real rain complexity noted.",
            keywords: [
              "ph electrode",
              "calibrated",
              "±0.01",
              "improvement",
              "reliable",
              "multiple acids",
              "h2so4",
              "hno3",
              "real rainwater",
            ],
            minKeywords: 2,
          },
          {
            level: 8,
            descriptor:
              "Multiple specific weaknesses with reasoned improvements; temperature effect on [H⁺]; missing data points identified.",
            keywords: [
              "temperature",
              "25°c",
              "9 points",
              "gap",
              "seawater",
              "replicate",
              "3 readings",
              "precision",
              "ecological",
              "±1 unit",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
