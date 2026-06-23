import type { StrandhootPack } from "../engine/types"

export const movementCritB: StrandhootPack = {
  slug: "movement-crit-b",
  title: "Designing a Voltaic Cell Investigation",
  subject: "MYP Chemistry",
  criterion: "B",
  topic: "Investigating voltaic cells using the reactivity series",
  accent: "#c0392b",
  icon: "🔬",
  statementOfInquiry:
    "The changes we observe in a chemical system can help us to infer information about the movement of molecules and their properties.",
  estMinutes: 27,
  intro:
    "Design an investigation to build and compare voltaic cells using different metal electrode pairs from the textbook experiment (Chapter 10). Each strand takes you one step further — crafting a focused research question, forming a hypothesis based on the electrochemical series, classifying variables, and writing a safe step-by-step method.",
  badges: [
    {
      id: "sharp-question",
      label: "Sharp Question",
      icon: "❓",
      description: "Reach Level 8 on Research question",
      strandId: "rq",
      atLevel: 8,
    },
    {
      id: "bold-predictor",
      label: "Electrochemical Prophet",
      icon: "🔮",
      description: "Reach Level 8 on Hypothesis",
      strandId: "hypothesis",
      atLevel: 8,
    },
    {
      id: "variable-master",
      label: "Variable Master",
      icon: "🎛️",
      description: "Reach Level 8 on Variables",
      strandId: "variables",
      atLevel: 8,
    },
    {
      id: "safe-scientist",
      label: "Safe Scientist",
      icon: "🥼",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Voltaic cell investigation",
      blurb: "Design an experiment comparing voltage output of different metal electrode pairs",
      icon: "🔋",
    },
  ],
  strands: [
    {
      id: "rq",
      name: "Research question",
      descriptor: "Write a focused, testable research question for the voltaic cell investigation.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A research question names what you are investigating. Vague example: 'Does a voltaic cell work with different metals?' — too broad, no specific variable named.",
        },
        {
          level: 4,
          body: "Level 3–4: A stronger question names the independent variable (IV) and dependent variable (DV): 'How does the choice of metal electrode pair affect the voltage produced by a voltaic cell?' IV = metal electrode pair; DV = voltage (V).",
        },
        {
          level: 6,
          body: "Level 5–6: A specific, testable question: 'How does the separation of two metals in the electrochemical series (using pairs from Cu, Zn, Mg and Fe electrodes in 1.0 mol dm⁻³ salt solutions) affect the voltage (V) measured by a voltmeter at constant temperature (20°C)?' This names the IV, DV, controlled variables and the specific metals.",
        },
        {
          level: 8,
          body: "Level 7–8: An operationalised question specifies measurement technique and precision: 'How does the separation of two metals in the electrochemical series (measured in standard electrode potential units, V) affect the voltage output (measured with a digital voltmeter to ±0.01 V) of a voltaic cell constructed with 1.0 mol dm⁻³ solutions at 20 ± 1°C?' This includes measurement instrument, precision, and controlled conditions.",
        },
      ],
      response: {
        kind: "design",
        prompt: "Write a research question to investigate how the choice of metal electrodes affects the voltage output of a voltaic cell.",
        scaffolds: [
          "How does...",
          "...affect the voltage produced by a voltaic cell...",
          "...using electrodes chosen from copper, zinc, magnesium and iron...",
          "...at constant [temperature / electrolyte concentration] of...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names the topic or one variable vaguely.",
            keywords: ["voltaic", "cell", "voltage", "metal", "electrode", "investigate"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Names IV and DV with clear direction.",
            keywords: ["electrode", "metal", "voltage", "how does", "affect", "voltmeter", "pair"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Specific, testable; metals named; controlled variables stated; units included.",
            keywords: ["electrochemical series", "copper", "zinc", "magnesium", "iron", "1.0 mol", "volts", "constant", "temperature", "20"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Operationalised: measurement technique and precision specified.",
            keywords: ["digital voltmeter", "±0.01", "standard electrode potential", "precision", "operationalised", "±1°c", "calibrated", "measure"],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "hypothesis",
      name: "Hypothesis",
      descriptor: "Predict how the separation of metals in the electrochemical series affects cell voltage.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: A hypothesis makes a directional prediction. 'A bigger difference between the metals will make more voltage' — this is a start, but gives no scientific reasoning.",
        },
        {
          level: 4,
          body: "Level 3–4: An if/then hypothesis: 'If the two metals in a voltaic cell are further apart in the reactivity series, then the voltage produced will be higher.' This names IV and DV and gives a direction, but lacks a scientific explanation.",
        },
        {
          level: 6,
          body: "Level 5–6: A justified hypothesis uses the electrochemical series: 'If the separation between two metals in the electrochemical series increases, the cell voltage will increase, because the greater the difference in tendency to lose electrons, the greater the driving force for electron transfer through the external circuit. For example, Mg–Cu should produce a higher voltage than Zn–Cu, as magnesium is higher above copper in the series than zinc is.'",
        },
        {
          level: 8,
          body: "Level 7–8: A quantitative hypothesis: 'Cell voltage is approximately equal to the difference in standard electrode potentials of the two half-cells. Mg²⁺/Mg (E° = −2.37 V) and Cu²⁺/Cu (E° = +0.34 V) give a predicted cell voltage of about 2.71 V, while Zn²⁺/Zn (E° = −0.76 V) and Cu give about 1.10 V. Therefore the Mg–Cu cell should produce approximately 2.5× more voltage than the Zn–Cu cell. However, in a simple classroom cell the measured voltage may be lower due to internal resistance and non-standard conditions.'",
        },
      ],
      response: {
        kind: "design",
        prompt: "Write a hypothesis predicting how the separation of two metals in the electrochemical series affects the voltage of a voltaic cell. Include a scientific explanation.",
        scaffolds: [
          "If the two metals are further apart in the electrochemical series, then...",
          "because the greater the difference in tendency to lose electrons...",
          "For example, a Mg–Cu cell should produce ___ voltage than a Zn–Cu cell because...",
          "The metal higher in the series will act as the ___ (anode/cathode)...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States a prediction about electrode separation and voltage.",
            keywords: ["voltage", "higher", "lower", "metals", "series", "more", "predict"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "If/then structure with IV and DV named.",
            keywords: ["if", "then", "further apart", "voltage", "increases", "electrochemical", "series"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Electrochemical series applied with specific example; driving force for electron transfer explained.",
            keywords: ["electrochemical series", "electrons", "driving force", "mg", "cu", "zn", "anode", "cathode", "higher", "tendency"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Quantitative prediction using standard electrode potentials; limitations acknowledged.",
            keywords: ["standard electrode potential", "2.71", "1.10", "−2.37", "+0.34", "−0.76", "predicted", "internal resistance", "non-standard"],
            minKeywords: 2,
          },
        ],
      },
    },
    {
      id: "variables",
      name: "Variables",
      descriptor: "Classify all variables for the voltaic cell investigation.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Three variable types: independent (IV — what you change), dependent (DV — what you measure), controlled (CVs — what you keep constant to make the test fair).",
        },
        {
          level: 4,
          body: "Level 3–4: For the voltaic cell investigation: IV = the combination of metal electrode pair chosen (e.g. Mg–Cu, Zn–Cu, Fe–Cu); DV = the voltage (V) measured by the voltmeter.",
        },
        {
          level: 6,
          body: "Level 5–6: IV: electrode metal pair (Mg–Cu, Zn–Cu, Fe–Cu, Mg–Zn). DV: voltage measured by voltmeter (V, ± 0.01 V). CVs: concentration of electrolyte solutions (1.0 mol dm⁻³); volume of electrolyte (50 cm³); length of electrode submerged (3 cm); temperature (20°C); salt bridge material (filter paper soaked in 1.0 mol dm⁻³ KNO₃); surface area of electrodes cleaned with sandpaper before each trial.",
        },
        {
          level: 8,
          body: "Level 7–8: As Level 5–6, plus: each CV stated with how it is controlled and why it matters. E.g. 'Surface area of electrode (CV): controlled by sanding and cutting each electrode to the same size — surface area affects the rate of oxidation and therefore current, which affects measured voltage.' Instrumental precision: digital voltmeter (±0.01 V) used rather than analogue. A possible systematic error: the voltmeter draws a small current, slightly reducing the actual open-circuit voltage; a high-impedance voltmeter minimises this.",
        },
      ],
      response: {
        kind: "design",
        prompt: "Identify and classify all variables for an investigation into how the electrode metal pair affects the voltage of a voltaic cell (using Cu, Zn, Mg and Fe electrodes with 1.0 mol dm⁻³ salt solutions).",
        scaffolds: [
          "Independent variable (IV):",
          "Dependent variable (DV):",
          "Controlled variables (CVs):",
          "I will measure the DV using...",
          "I will control [CV] by... because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one type of variable.",
            keywords: ["independent", "dependent", "variable", "electrode", "voltage", "control"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "IV and DV named with units.",
            keywords: ["independent variable", "dependent variable", "electrode", "metal pair", "voltage", "volts", "voltmeter"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "IV, DV and 3+ CVs named with values/units.",
            keywords: ["controlled", "concentration", "1.0 mol", "temperature", "salt bridge", "kno₃", "surface area", "50 cm³", "voltmeter", "±0.01"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "CVs explained with control method, reason and precision; systematic error identified.",
            keywords: ["surface area", "sanding", "rate of oxidation", "current", "systematic error", "impedance", "precision", "why", "control method", "affects"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "method",
      name: "Method",
      descriptor: "Write a safe, step-by-step method for the voltaic cell investigation.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Lists materials but gives only 1–2 vague steps: 'Put metals in solution and connect a voltmeter.' — no volumes, no safety, no salt bridge described.",
        },
        {
          level: 4,
          body: "Level 3–4: Steps in a logical sequence: (1) Fill two beakers with 1.0 mol dm⁻³ copper sulfate and zinc sulfate. (2) Place Cu and Zn electrodes in their respective solutions. (3) Connect a salt bridge between the beakers. (4) Connect a voltmeter and record the reading.",
        },
        {
          level: 6,
          body: "Level 5–6: Numbered steps with specific volumes and safety: (1) Wear safety glasses — copper sulfate and zinc sulfate are irritants. (2) Half-fill two 100 cm³ beakers with 1.0 mol dm⁻³ copper(II) sulfate and 1.0 mol dm⁻³ zinc sulfate. (3) Sand each electrode with fine sandpaper to remove oxide layers; cut to equal length. (4) Place Cu electrode in CuSO₄ and Zn electrode in ZnSO₄. (5) Fold a strip of filter paper into a U-shape, soak in 1.0 mol dm⁻³ KNO₃ and place ends in each beaker. (6) Connect voltmeter between the two electrodes and record voltage. (7) Repeat with other electrode pairs; rinse and dry apparatus between trials.",
        },
        {
          level: 8,
          body: "Level 7–8: Adds quantitative detail (record voltage at 30 s intervals for 2 minutes; take mean of last 3 readings for stability), repeats each electrode combination 3 times for reliability, records half-equations and predicted ionic equations for each pair, states disposal procedures for metal ion solutions, and identifies that the electrode that loses mass is the anode. Includes a results table template with columns for electrode pair, predicted order in electrochemical series, measured voltage (trial 1, 2, 3), mean voltage.",
        },
      ],
      response: {
        kind: "design",
        prompt: "Write a numbered, step-by-step method for the voltaic cell investigation: comparing the voltage produced by different metal electrode pairs (Cu, Zn, Mg, Fe) with 1.0 mol dm⁻³ salt solutions.",
        scaffolds: [
          "1. Wear safety glasses. Half-fill two 100 cm³ beakers with 1.0 mol dm⁻³...",
          "2. Sand each metal electrode with fine sandpaper and cut to equal length...",
          "3. Place the first electrode into its corresponding salt solution...",
          "4. Prepare a salt bridge by soaking filter paper in 1.0 mol dm⁻³ KNO₃...",
          "5. Connect a voltmeter between the two electrodes and record the voltage...",
          "6. Repeat steps 1–5 using other combinations of metal electrodes...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Lists materials only or gives 1–2 vague steps.",
            keywords: ["electrode", "solution", "voltmeter", "beaker", "connect", "measure"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Logical sequence with 4+ steps including salt bridge.",
            keywords: ["beaker", "electrode", "salt bridge", "voltmeter", "solution", "record", "connect", "filter paper", "kno₃"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Numbered steps with volumes, sanding, safety and specific concentrations.",
            keywords: ["100 cm³", "1.0 mol", "sand", "safety glasses", "filter paper", "kno₃", "rinse", "repeat", "equal length", "half-fill"],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor: "30 s intervals; mean of 3; 3 repeats; results table; ionic equations; disposal.",
            keywords: ["30 s", "mean", "3 times", "reliable", "ionic equation", "anode", "mass", "disposal", "results table", "half-equation"],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
