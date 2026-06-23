import type { StrandhootPack } from "../engine/types"

export const transferCritD: StrandhootPack = {
  slug: "transfer-crit-d",
  title: "The Chemistry of Flavours & Analytical Technology",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Esters, food chemistry & analytical innovation",
  accent: "#27ae60",
  icon: "🍓",
  statementOfInquiry:
    "Technological advances in analytical devices enhance the ability of scientists to monitor the transfer of matter when changes occur during chemical reactions.",
  estMinutes: 28,
  intro:
    "Fruit flavours are made of esters; the food industry relies on chemists using analytical technology to identify, quantify and replicate them. pH probes and titration have been used for over 150 years — yet modern instrumentation has transformed what is possible. Reflect on the real-world applications, societal impacts, trade-offs, and your ability to communicate this chemistry clearly.",
  badges: [
    { id: "applicator", label: "Flavour Scientist", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Science Voice", icon: "📢", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Flavours & analytical chemistry", blurb: "Esters, food industry, pH technology and the ethics of artificial flavours", icon: "🍓" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain real-world applications of esters and analytical chemistry technology.",
      guided: [
        { level: 2, body: "Esters are volatile, sweet-smelling organic compounds responsible for the characteristic fragrances of fruits. For example, pentyl ethanoate smells of banana; ethyl butanoate smells of pineapple; methyl butanoate of apple; pentyl butanoate of strawberry. These flavours are used commercially as flavouring agents in the food industry." },
        { level: 4, body: "Analytical chemistry uses instruments to separate, identify and quantify chemical compounds. The chapter describes that advances in technology (pH probes, data loggers, chromatography) have made data collection more reliable, cost-effective and precise. In the food industry, identifying the chemical profile of a natural flavour requires separation and concentration technology: the American Chemical Society describes how Dimick's team used evaporation, distillation and extraction to isolate strawberry essence from 30 tonnes of fruit over six seasons to obtain just a few grams of strawberry oil." },
        { level: 6, body: "The same esterification chemistry that creates fruit fragrances in nature can be replicated synthetically: react a carboxylic acid with an alcohol using concentrated H₂SO₄ as catalyst and heat. This allows food producers to include artificial green apple flavour (from isoamyl acetate synthesis) in candy and soda without seasonal constraints. Titration has been used for over 150 years as a quantitative analytical tool — a pH probe now provides continuous, precise data (±0.01 pH units) that transformed laboratory accuracy and enabled automated quality control in food manufacturing." },
        { level: 8, body: "Quantified scale: identifying a natural flavour may require hundreds or thousands of component substances present in minute quantities — natural strawberry flavour contains over 360 volatile compounds. Gas chromatography–mass spectrometry (GC-MS), exploiting the volatile nature of esters, allows separation and identification of each component. The food industry then synthesises the most important ones. A single natural flavour compound present at 1 part per billion (1 ppb) can be detectable by human receptors — this is the analytical challenge that drives the technological innovation described in the statement of inquiry." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which ester is responsible for the characteristic smell of banana?",
            options: [
              { id: "a", text: "Ethyl butanoate" },
              { id: "b", text: "Methyl butanoate" },
              { id: "c", text: "Pentyl ethanoate", correct: true },
              { id: "d", text: "Pentyl butanoate" },
            ],
            explanation: "According to the Chapter 12 ester table, pentyl ethanoate is associated with banana fragrance. Ethyl butanoate is pineapple; methyl butanoate is apple; pentyl butanoate is strawberry.",
          },
          {
            id: "s2",
            prompt: "What type of reaction produces an ester from a carboxylic acid and an alcohol?",
            options: [
              { id: "a", text: "Oxidation" },
              { id: "b", text: "Condensation reaction", correct: true },
              { id: "c", text: "Decomposition" },
              { id: "d", text: "Neutralisation" },
            ],
            explanation: "Ester formation is a condensation reaction: two molecules (a carboxylic acid and an alcohol) combine and a small molecule (water) is removed. Concentrated H₂SO₄ acts as a catalyst.",
          },
        ],
        prompt: "Describe the applications of esters and analytical chemistry technology in the food industry. Consider multiple sectors — flavouring, quality control, food science — and their significance.",
        scaffolds: [
          "Esters are used in the food industry to...",
          "The characteristic smell of [fruit] is caused by the ester...",
          "Analytical chemistry is important in food manufacturing because...",
          "Technology such as the pH probe / chromatography allows scientists to...",
          "An unexpected application of ester chemistry is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one ester or one application.", keywords: ["ester", "flavour", "fragrance", "banana", "pineapple", "food", "smell"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more applications with brief explanations.", keywords: ["flavouring", "food industry", "analytical", "ph probe", "titration", "ester", "fragrance", "quality control"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple applications across food, industrial and analytical sectors; technology named.", keywords: ["esterification", "food industry", "artificial flavour", "ph probe", "titration", "chromatography", "quality control", "food manufacturing", "synthesis"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified complexity; GC-MS or analytical instrument named; ppb detection level; historical context of titration.", keywords: ["360", "volatile", "gc-ms", "chromatography", "mass spectrometry", "ppb", "150 years", "strawberry oil", "30 tonnes", "component", "analytical"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the environmental, social and economic impacts of artificial flavour production and food chemistry.",
      guided: [
        { level: 2, body: "The manufacture of artificial flavours involves chemical synthesis of esters. This can reduce the need to grow large quantities of fruit, but it also means food contains synthetic chemicals rather than natural ones. Some people prefer natural food, and food labelling laws require artificial flavours to be declared." },
        { level: 4, body: "Economic impact: artificial flavours are cheaper and more consistent than natural extracts (extracting strawberry essence from 30 tonnes of fruit yields only a few grams). This lowers food costs and enables year-round availability of flavoured products. Social impact: processed food reliance has increased with urbanisation — chemists help enable the global food manufacturing industry. Environmental impact: synthetic ester production requires petrochemical feedstocks (ethanol from fermentation or petroleum, carboxylic acids from oxidation of hydrocarbons), generating chemical waste." },
        { level: 6, body: "Multilevel impacts: Environmental — large-scale synthesis of esters uses concentrated acids (H₂SO₄) and produces chemical waste requiring safe disposal; the petrochemical feedstocks for industrial esters (isoamyl alcohol, ethanoic acid) contribute to fossil fuel dependency. Social — food additives including artificial flavours have been linked to hyperactivity concerns in children (the 'Southampton six' colourants study), though esters themselves are generally regarded as safe (GRAS status in the US). Economic — the global flavours and fragrances market exceeded USD 30 billion in 2023, with artificial flavours enabling accessible, affordable food for billions." },
        { level: 8, body: "Systemic analysis: the ability to synthesise flavour molecules at scale has enabled processed food to become globally dominant — yet this comes with consequences: (1) reduction in dietary diversity as standardised artificial flavours replace regional food cultures; (2) the 'naturalness paradox': consumers prefer 'natural' flavours, yet natural and synthetic strawberry flavour may be chemically identical (isoamyl butyrate from synthesis vs from fruit). Regulatory frameworks (EU E-numbers, US GRAS) attempt to manage safety, but the long-term dietary impact of regular consumption of hundreds of synthetic additives is an active research area. Food sovereignty advocates argue that over-reliance on industrial food chemistry undermines traditional food systems and communities." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Why can artificial fruit flavours be produced more cheaply than natural extracts?",
            options: [
              { id: "a", text: "Natural flavours contain dangerous chemicals that require removal" },
              { id: "b", text: "Synthetic esters can be made from industrial chemicals without the cost of growing and processing large quantities of fruit", correct: true },
              { id: "c", text: "Artificial flavours taste stronger, so less is needed" },
              { id: "d", text: "Natural flavours can only be produced in tropical countries" },
            ],
            explanation: "Extracting natural strawberry essence required 30 tonnes of fruit to obtain a few grams of oil. Synthetic esters can be produced in large quantities from industrial feedstocks at far lower cost and with consistent quality.",
          },
        ],
        prompt: "Evaluate the environmental, social, and economic impacts of producing and using artificial flavours in the food industry. Cover at least three categories of impact.",
        scaffolds: [
          "Economic impacts of artificial flavour production include...",
          "Environmentally, producing synthetic esters requires..., which causes...",
          "Social impacts include consumer perceptions of..., and concerns about...",
          "Regulatory responses such as... attempt to address...",
          "The global flavours market is worth... which shows...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one impact.", keywords: ["cheap", "expensive", "environment", "natural", "artificial", "social", "food", "chemical"], minKeywords: 1 },
          { level: 4, descriptor: "Two categories of impact with explanations.", keywords: ["economic", "social", "environmental", "cheaper", "consistent", "waste", "food additives", "processed food"], minKeywords: 2 },
          { level: 6, descriptor: "Environmental, social, and economic impacts with reasoning; examples given.", keywords: ["economic", "social", "environmental", "petrochemical", "waste", "h2so4", "gras", "30 billion", "hyperactivity", "additives", "food manufacturing"], minKeywords: 4 },
          { level: 8, descriptor: "Systemic analysis; naturalness paradox; regulatory frameworks; food sovereignty mentioned; quantified impacts.", keywords: ["naturalness paradox", "food sovereignty", "e-numbers", "gras", "regulatory", "dietary", "30 billion", "isoamyl", "systemic", "traditional", "processed food", "long-term"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the benefits and costs of using analytical technology and synthetic esters in food production.",
      guided: [
        { level: 2, body: "'Artificial flavours are bad because they are not natural.' — a simple opinion without evidence or consideration of the benefits." },
        { level: 4, body: "'Artificial flavours make food cheaper and more accessible, but some people prefer natural food and worry about consuming synthetic chemicals. On balance, the food industry has benefited, though consumers should be informed.' — uses evidence from both sides." },
        { level: 6, body: "A balanced judgement: 'Analytical chemistry technology — titration, pH probes, chromatography — has transformed food quality control and made safe, affordable flavoured food available to billions. The environmental cost of ester synthesis (chemical waste, petrochemical feedstocks) is real but manageable with green chemistry approaches. The claim that natural and synthetic esters are chemically identical challenges the assumption that natural is always better. Different stakeholders (food manufacturers, organic farmers, food safety regulators, consumers) prioritise different values. On balance, the benefits to food security and affordability outweigh the costs — but transparency in labelling is essential.'" },
        { level: 8, body: "A nuanced judgement: addresses the short-term benefit (accessible food) vs long-term uncertainty (cumulative effect of multiple additives), the distribution of benefits (lower food costs accessible to all) and burdens (processing plant communities bear environmental costs), considers alternatives (biocatalytic green synthesis of esters using enzymatic processes, which uses no strong acids and generates minimal waste), and acknowledges the philosophical challenge of the naturalness paradox — if the molecule is identical, is the distinction meaningful? Arrives at a specific, calibrated position with stated caveats." },
      ],
      response: {
        kind: "reflection",
        prompt: "Is the use of synthetic esters and advanced analytical technology in the food industry a net benefit or a net cost for society and the environment? Construct a reasoned, evidence-based judgement.",
        scaffolds: [
          "Evidence for the benefits of synthetic flavour chemistry includes...",
          "Evidence for concerns includes...",
          "A key trade-off is...",
          "A food manufacturer would argue..., whereas an organic farmer might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["good", "bad", "natural", "artificial", "benefit", "problem", "chemical"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence.", keywords: ["cheaper", "accessible", "environment", "waste", "labelling", "on balance", "benefit", "cost"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; trade-offs; reasoned conclusion with stakeholders mentioned.", keywords: ["trade-off", "stakeholder", "food manufacturer", "consumer", "organic", "regulator", "green chemistry", "labelling", "naturalness", "balance"], minKeywords: 3 },
          { level: 8, descriptor: "Short vs long-term; distribution of benefits/burdens; green alternatives; naturalness paradox; calibrated position with caveats.", keywords: ["short-term", "long-term", "enzymatic", "biocatalytic", "green synthesis", "naturalness paradox", "cumulative", "distribution", "uncertainty", "caveat", "transparent"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain how a pH probe works and why technology matters for monitoring chemical reactions, to a non-specialist audience.",
      guided: [
        { level: 2, body: "Restating definitions with jargon does not communicate to a non-specialist: 'A pH probe is an electrochemical device that measures the potential difference across a permeable glass membrane to determine the concentration of hydrogen ions, H⁺, in a solution.'" },
        { level: 4, body: "An analogy helps — but must connect back to the chemistry: 'Think of the pH probe as a really sensitive taste-tester: it measures how acidic or basic a solution is by detecting the concentration of positive hydrogen ions. A low pH means lots of H⁺ ions (like lemon juice — very sour); a high pH means few H⁺ (like soap — slippery and basic). The probe gives a number on a scale from 0 to 14 so we can track changes precisely.' Good start, but does not explain why technology matters." },
        { level: 6, body: "A clear explanation linked to the chapter's context: 'Imagine you are baking a huge batch of jam and you need to know exactly when to stop adding preservative acid. You could dip litmus paper every few minutes — but this is slow, inaccurate, and you might miss the exact moment. A pH probe plugged into a computer gives you the exact pH every second on a graph, so you never miss the critical change. That is why food factories, water treatment plants and hospital labs use pH probes — they give continuous, precise data that humans and human senses simply cannot match.'" },
        { level: 8, body: "Excellent communication: (1) explains that the pH probe has a permeable glass membrane that only H⁺ ions can pass through — it is like a gate that counts how many positive ions are crossing; (2) explains the reading as a logarithmic scale (each pH unit is a 10× change in H⁺ concentration), using the analogy of decibels for sound; (3) addresses a common misconception ('pH 7 is not zero acid — it just means equal numbers of H⁺ and OH⁻'); (4) connects to the statement of inquiry by explaining that analytical devices like the pH probe have transformed how scientists monitor the transfer of hydrogen ions during reactions — what once required skilled chemical analysis can now be done digitally in real time." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "A pH probe measures pH by detecting which ions in the solution?",
            options: [
              { id: "a", text: "Sodium ions Na⁺" },
              { id: "b", text: "Chloride ions Cl⁻" },
              { id: "c", text: "Hydrogen ions H⁺", correct: true },
              { id: "d", text: "Hydroxide ions OH⁻" },
            ],
            explanation: "The pH probe has a permeable glass membrane through which only H⁺ (hydrogen) ions can pass. It measures the potential difference related to H⁺ concentration to give a pH reading.",
          },
        ],
        prompt: "Explain to a Year 9 student how a pH probe works and why analytical devices like this have transformed what scientists can discover about chemical reactions. Use at least one everyday analogy.",
        scaffolds: [
          "A pH probe works by detecting... which is like...",
          "The pH scale goes from 0 to 14 — each unit means...",
          "Before pH probes, scientists used... which was less accurate because...",
          "In the food industry / hospital / water treatment, pH probes are important because...",
          "A common misconception is... actually...",
        ],
        rubric: [
          { level: 2, descriptor: "Mentions pH or acids/bases with basic definition.", keywords: ["ph", "acid", "base", "probe", "scale", "hydrogen", "measures", "indicator"], minKeywords: 1 },
          { level: 4, descriptor: "Analogy given; pH scale explained; probe's function described.", keywords: ["analogy", "taste", "lemon", "scale", "0 to 14", "h+", "hydrogen", "ions", "measures", "acidic"], minKeywords: 2 },
          { level: 6, descriptor: "Analogy linked to chemistry; technology advantage over indicators explained; real-world application mentioned.", keywords: ["analogy", "continuous", "precise", "indicator", "litmus", "inaccurate", "slow", "food factory", "water treatment", "data", "real-time"], minKeywords: 3 },
          { level: 8, descriptor: "Membrane mechanism explained; log scale; misconception addressed; connection to statement of inquiry.", keywords: ["membrane", "permeable", "logarithmic", "10x", "decibels", "misconception", "ph 7", "equal", "transfer", "hydrogen ions", "analytical device", "transformed"], minKeywords: 4 },
        ],
      },
    },
  ],
}
