import type { StrandhootPack } from "../engine/types"

export const functionCritA: StrandhootPack = {
  slug: "function-crit-a",
  title: "Salts, Separation & the Mole",
  subject: "MYP Chemistry",
  criterion: "A",
  topic: "Formation of salts, separation techniques & the mole concept",
  accent: "#1b7888",
  icon: "🧪",
  statementOfInquiry:
    "The way in which matter functions is dependent on its properties and the relationship of the different systems within the environment.",
  estMinutes: 28,
  intro:
    "Chapter 7 weaves together three core ideas: how soluble and insoluble salts form and can be separated, how physical separation techniques (filtration, distillation, chromatography) exploit differences in properties, and how the mole concept lets chemists count particles by weighing. Each strand levels up from recall through to analysis.",
  badges: [
    {
      id: "salt-former",
      label: "Salt Architect",
      icon: "🏗️",
      description: "Reach Level 8 on Solubility rules & salt formation",
      strandId: "salts",
      atLevel: 8,
    },
    {
      id: "separator",
      label: "Separation Specialist",
      icon: "🔍",
      description: "Reach Level 8 on Separation techniques",
      strandId: "separation",
      atLevel: 8,
    },
    {
      id: "mole-master",
      label: "Mole Master",
      icon: "⚗️",
      description: "Reach Level 8 on The mole concept",
      strandId: "mole",
      atLevel: 8,
    },
    {
      id: "function-scholar",
      label: "Function Scholar",
      icon: "🏆",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Chapter 7: Function",
      blurb: "Salts, separation techniques and mole calculations",
      icon: "🧂",
    },
  ],
  strands: [
    {
      id: "salts",
      name: "Solubility rules & salt formation",
      descriptor:
        "Apply solubility rules to predict precipitate formation and write equations for double-replacement reactions.",
      guided: [
        {
          level: 2,
          body: "Ionic compounds are called salts. Some salts are soluble in water; others are insoluble. A simple rule: all nitrates are soluble. When two ionic solutions react and an insoluble salt forms, it appears as a solid precipitate.",
        },
        {
          level: 4,
          body: "Solubility rules from Chapter 7: All nitrates are soluble. Most sulfates are soluble — except lead sulfate and barium sulfate. Most chlorides are soluble — except silver chloride, lead chloride and lead bromide. Silver chloride is a white precipitate; silver bromide is pale cream; silver iodide is pale yellow. In a double-replacement reaction, cations swap partners: A⁺B⁻ + C⁺D⁻ → A⁺D⁻ + C⁺B⁻. A precipitate forms only if one product is insoluble.",
        },
        {
          level: 6,
          body: "Consider NaCl(aq) + AgNO₃(aq) → NaNO₃(aq) + AgCl(s). The solubility rules confirm AgCl is insoluble (silver chloride rule) — it precipitates. NaNO₃ stays dissolved (all nitrates soluble). The net ionic equation removes spectator ions (Na⁺ and NO₃⁻ do not react): Ag⁺(aq) + Cl⁻(aq) → AgCl(s). Only the precipitate-forming ions appear in the net ionic equation.",
        },
        {
          level: 8,
          body: "The reaction Pb(NO₃)₂(aq) + 2KI(aq) → 2KNO₃(aq) + PbI₂(s) demonstrates double-replacement in full. Pb(NO₃)₂ is soluble (all nitrates), KI is soluble (most iodides), KNO₃ is soluble (all nitrates), but PbI₂ (lead iodide) is insoluble (lead halide rule) — a bright yellow precipitate forms. Spectator ions are K⁺ and NO₃⁻. Net ionic equation: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s). The physical property of insolubility drives the reaction to completion — and filtration then separates the solid from the aqueous filtrate.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "s-l2",
            level: 2,
            prompt:
              "According to the solubility rules in Chapter 7, which of the following is ALWAYS soluble in water?",
            options: [
              { id: "a", text: "Lead sulfate" },
              { id: "b", text: "Silver chloride" },
              { id: "c", text: "All nitrates", correct: true },
              { id: "d", text: "Most carbonates" },
            ],
            explanation:
              "The solubility rules state that all nitrates are soluble — there are no exceptions. Lead sulfate and silver chloride are well-known insoluble salts.",
          },
          {
            type: "fill",
            id: "s-l4",
            level: 4,
            prompt:
              "When silver nitrate solution is added to sodium chloride solution, the insoluble precipitate that forms is ▁.",
            answers: ["silver chloride", "AgCl"],
            explanation:
              "NaCl(aq) + AgNO₃(aq) → NaNO₃(aq) + AgCl(s). The solubility rules confirm AgCl is insoluble; it forms a characteristic milky-white precipitate.",
          },
          {
            type: "short",
            id: "s-l6",
            level: 6,
            prompt:
              "Write the net ionic equation for the reaction of silver nitrate with sodium chloride. Explain why Na⁺ and NO₃⁻ are called spectator ions.",
            keywords: [
              "ag+",
              "cl-",
              "agcl",
              "precipitate",
              "spectator",
              "net ionic",
              "do not react",
              "insoluble",
              "dissolved",
            ],
            minKeywords: 3,
            sample:
              "Net ionic equation: Ag⁺(aq) + Cl⁻(aq) → AgCl(s). Na⁺ and NO₃⁻ are spectator ions because they are present in solution both before and after the reaction — they do not take part in forming the precipitate. Only the ions that combine to form the insoluble product appear in the net ionic equation.",
          },
          {
            type: "short",
            id: "s-l8",
            level: 8,
            prompt:
              "Lead(II) nitrate solution is mixed with potassium iodide solution. Identify the precipitate formed, write the full ionic equation, identify the spectator ions, and explain how the physical property of the precipitate allows it to be separated.",
            keywords: [
              "pbi2",
              "lead iodide",
              "yellow",
              "insoluble",
              "spectator",
              "k+",
              "no3-",
              "filtration",
              "filter paper",
              "residue",
              "solubility",
              "net ionic",
            ],
            minKeywords: 4,
            sample:
              "Pb(NO₃)₂(aq) + 2KI(aq) → 2KNO₃(aq) + PbI₂(s). PbI₂ (lead iodide) is insoluble — it forms a bright yellow precipitate. Spectator ions are K⁺ and NO₃⁻ (both form soluble compounds). Net ionic: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s). Because PbI₂ is a solid and the other products remain dissolved, filtration can separate the precipitate: the solid is retained as the residue on the filter paper while the filtrate passes through.",
          },
        ],
      },
    },
    {
      id: "separation",
      name: "Separation techniques",
      descriptor:
        "Select and justify physical separation techniques — filtration, distillation, and chromatography — based on the properties of the components.",
      guided: [
        {
          level: 2,
          body: "Mixtures can be separated using physical methods that rely on differences in properties of the components. Filtration separates an insoluble solid from a liquid. Distillation separates miscible liquids with different boiling points. Chromatography separates components based on how they travel through a stationary phase.",
        },
        {
          level: 4,
          body: "Filtration uses a filter paper and funnel: the insoluble solid stays on the filter paper (residue) while the liquid passes through (filtrate). Distillation: the mixture is heated; the component with the lower boiling point evaporates first, travels through a Liebig condenser where it is cooled back to liquid, and is collected as the distillate. Chromatography: the retention factor Rf = distance travelled by component ÷ distance travelled by solvent. A higher Rf means the component is more soluble in the mobile phase (solvent).",
        },
        {
          level: 6,
          body: "Choice of technique depends on properties: if the components differ in solubility (one is insoluble), use filtration. If both are soluble in the same solvent but have different boiling points, use distillation. If components are similar but differ in polarity or size, use chromatography. The rule 'like dissolves like' governs solubility: polar solvents dissolve polar solutes; non-polar solvents dissolve non-polar solutes. Ethanol (bp 78.37°C) and water (bp 100°C) are both polar and miscible — distillation exploits the 21.6°C boiling point difference.",
        },
        {
          level: 8,
          body: "In paper chromatography of food colorings, different pigments travel at different rates because each has a different affinity for the stationary phase (chromatography paper) versus the mobile phase (water solvent). A pigment with a high Rf is more soluble in the mobile phase and spends less time adsorbed to the paper. Rf is unique under fixed conditions and can be used to identify components. In forensic chromatography, HPLC has unique retention times for each substance — these are compared against libraries of known mass spectra (GC-MS / LC-MS) to confirm identity. Selection of the correct technique depends on understanding the physical and chemical properties of the substances.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "sep-l2",
            level: 2,
            prompt:
              "A student has a mixture of sand (insoluble in water) and salt (soluble in water). Which separation technique would best separate the sand from the saltwater?",
            options: [
              { id: "a", text: "Distillation" },
              { id: "b", text: "Chromatography" },
              { id: "c", text: "Filtration", correct: true },
              { id: "d", text: "Evaporation" },
            ],
            explanation:
              "Filtration works because sand is insoluble — it stays on the filter paper as the residue — while saltwater passes through as the filtrate. Distillation would be used to separate two miscible liquids.",
          },
          {
            type: "fill",
            id: "sep-l4",
            level: 4,
            prompt:
              "In chromatography, the retention factor Rf is calculated as the distance travelled by a component divided by the distance travelled by the ▁.",
            answers: ["solvent", "solvent front", "mobile phase"],
            explanation:
              "Rf = distance travelled by component ÷ distance travelled by solvent. Since the solvent always travels further than any component, Rf is always between 0 and 1.",
          },
          {
            type: "short",
            id: "sep-l6",
            level: 6,
            prompt:
              "Ethanol (boiling point 78.37°C) is mixed with water (boiling point 100°C). Explain step by step how simple distillation separates these two miscible liquids.",
            keywords: [
              "boiling point",
              "ethanol",
              "evaporates",
              "condenser",
              "distillate",
              "miscible",
              "78",
              "100",
              "temperature",
              "liquid",
              "homogeneous",
            ],
            minKeywords: 3,
            sample:
              "Ethanol and water are miscible (they form a homogeneous mixture) so filtration cannot separate them. In distillation, the mixture is heated slowly. Ethanol reaches its lower boiling point (78.37°C) first and begins to evaporate. The vapour travels through a water-cooled Liebig condenser, condenses back to liquid, and is collected as the distillate. Water (bp 100°C) remains behind in the distillation flask. The thermometer reading confirms which fraction is being collected.",
          },
          {
            type: "short",
            id: "sep-l8",
            level: 8,
            prompt:
              "In a paper chromatography experiment on food colorings using water as solvent, pigment A has Rf = 0.60 and pigment B has Rf = 0.08. Explain what these values reveal about the solubility of each pigment, and suggest why forensic scientists prefer HPLC over simple paper chromatography.",
            keywords: [
              "rf",
              "soluble",
              "mobile phase",
              "stationary phase",
              "water",
              "polar",
              "adsorbed",
              "hplc",
              "retention time",
              "identity",
              "confirm",
              "gc-ms",
              "forensic",
            ],
            minKeywords: 4,
            sample:
              "Pigment A (Rf 0.60) is more soluble in the mobile phase (water) — it spends more time in the solvent and travels further. Pigment B (Rf 0.08) is more strongly adsorbed to the stationary phase (paper) and is less soluble in water, so it moves very little. Forensic scientists prefer HPLC because it provides unique retention times that can be matched against libraries of known spectra (GC-MS / LC-MS). Paper chromatography is only a presumptive (screening) test — two different substances could have the same Rf under a given solvent. HPLC coupled with mass spectrometry confirms the identity of the substance definitively.",
          },
        ],
      },
    },
    {
      id: "mole",
      name: "The mole concept",
      descriptor:
        "Define the mole, apply Avogadro's constant, and calculate molar mass, number of moles, and molar volume of gases.",
      guided: [
        {
          level: 2,
          body: "A mole is a counting unit for very large numbers of particles. One mole of any substance contains 6.02 × 10²³ particles (atoms, molecules, ions or electrons). This number is Avogadro's constant. For example, 1 mole of water contains 6.02 × 10²³ water molecules, and 1 mole of copper contains 6.02 × 10²³ copper atoms.",
        },
        {
          level: 4,
          body: "The molar mass of a substance (Mr) equals the sum of the relative atomic masses of all atoms in its formula, in g mol⁻¹. For H₂SO₄: 2(1) + 32 + 4(16) = 98 g mol⁻¹. The number of moles formula: n = m / Mr, where m is mass in grams. Example: 4.00 g of NaOH (Mr = 23 + 16 + 1 = 40 g mol⁻¹): n = 4.00 / 40 = 0.100 mol.",
        },
        {
          level: 6,
          body: "Avogadro's law: equal volumes of gases at the same temperature and pressure contain equal numbers of molecules. At STP (273 K, 100 kPa), the molar volume of any gas is 22.7 dm³ mol⁻¹. At RTP (298 K, 100 kPa) it is 24 dm³. So n = V / 22.7 (at STP). Example: 13.62 dm³ of methane at STP: n = 13.62 / 22.7 = 0.600 mol. Mass = 0.600 × (12.01 + 4×1.01) = 0.600 × 16.05 = 9.63 g.",
        },
        {
          level: 8,
          body: "Stoichiometry uses mole ratios from balanced equations to calculate masses and volumes. For magnesium combustion: 2Mg(s) + O₂(g) → 2MgO(s). The 2:1:2 mole ratio means 2 mol Mg reacts with 1 mol O₂ to produce 2 mol MgO. If 18.0 g Mg reacts: n(Mg) = 18.0 / 24.31 = 0.741 mol. Since Mg:MgO = 1:1, n(MgO) = 0.741 mol. Mass of MgO = 0.741 × (24.31 + 16.00) = 0.741 × 40.31 = 29.9 g. The law of definite proportions (Proust, 1794) guarantees this fixed ratio — the mole concept gives this law its quantitative power.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "m-l2",
            level: 2,
            prompt: "Avogadro's constant (6.02 × 10²³) represents the number of particles in:",
            options: [
              { id: "a", text: "1 gram of any substance" },
              { id: "b", text: "1 mole of any substance", correct: true },
              { id: "c", text: "1 dm³ of any gas" },
              { id: "d", text: "1 litre of any solution" },
            ],
            explanation:
              "One mole of any substance always contains 6.02 × 10²³ particles — atoms, molecules, ions or electrons. This is Avogadro's constant and it is the same regardless of which substance.",
          },
          {
            type: "fill",
            id: "m-l4",
            level: 4,
            prompt:
              "The molar mass of sulfuric acid H₂SO₄ is ▁ g mol⁻¹. (Use Ar values: H=1, S=32, O=16.)",
            answers: ["98", "98 g mol-1", "98 g/mol"],
            explanation:
              "Mr(H₂SO₄) = 2(1) + 1(32) + 4(16) = 2 + 32 + 64 = 98 g mol⁻¹. This is also the molar mass, so 1 mole of H₂SO₄ has a mass of 98 g.",
          },
          {
            type: "short",
            id: "m-l6",
            level: 6,
            prompt:
              "A sample of methane gas (CH₄) occupies 13.62 dm³ at STP. Calculate (a) the number of moles of methane and (b) the mass of the sample. (Molar volume at STP = 22.7 dm³ mol⁻¹; Ar: C=12.01, H=1.01.)",
            keywords: [
              "0.600",
              "22.7",
              "molar volume",
              "stp",
              "moles",
              "mass",
              "9.63",
              "16.05",
              "molar mass",
              "n = v",
            ],
            minKeywords: 3,
            sample:
              "(a) n = V / molar volume = 13.62 / 22.7 = 0.600 mol. (b) Mr(CH₄) = 12.01 + 4(1.01) = 16.05 g mol⁻¹. Mass = n × Mr = 0.600 × 16.05 = 9.63 g.",
          },
          {
            type: "short",
            id: "m-l8",
            level: 8,
            prompt:
              "A student burns 18.0 g of magnesium in excess oxygen: 2Mg(s) + O₂(g) → 2MgO(s). Calculate the mass of magnesium oxide produced. Show full working using mole ratios. (Ar: Mg=24.31, O=16.00.)",
            keywords: [
              "0.741",
              "mole ratio",
              "1:1",
              "40.31",
              "29.9",
              "mgo",
              "moles",
              "stoichiometry",
              "balanced equation",
              "molar mass",
              "n = m",
            ],
            minKeywords: 4,
            sample:
              "n(Mg) = 18.0 / 24.31 = 0.741 mol. From the equation 2Mg:2MgO, the mole ratio Mg:MgO = 1:1, so n(MgO) = 0.741 mol. Mr(MgO) = 24.31 + 16.00 = 40.31 g mol⁻¹. Mass(MgO) = 0.741 × 40.31 = 29.9 g. The mole ratio from the balanced equation is essential — it tells us how many moles of product form per mole of reactant consumed.",
          },
        ],
      },
    },
    {
      id: "chromatography-rf",
      name: "Retention factors & molar mass",
      descriptor:
        "Calculate Rf values, interpret chromatography data for metal ions, and relate Rf to molar mass and solubility.",
      guided: [
        {
          level: 2,
          body: "The retention factor Rf compares how far a component travels to how far the solvent travels. Rf = distance travelled by component ÷ distance travelled by solvent. Rf is always between 0 and 1. A larger Rf means the substance moved further through the stationary phase.",
        },
        {
          level: 4,
          body: "In paper chromatography of metal ions, heavier ions generally have larger Rf values: Ni²⁺ (molar mass 58.7 g mol⁻¹, Rf = 0.08) versus Cu²⁺ (molar mass 63.5 g mol⁻¹, Rf = 0.60) versus Hg²⁺ (molar mass 200.6 g mol⁻¹, Rf = 0.95). Each ion produces a characteristic spot color: Cu²⁺ is blue, Cd²⁺ is yellow, Co²⁺ is brown-black. These colours, combined with Rf values, identify the ion.",
        },
        {
          level: 6,
          body: "Two different ions are identified by matching both Rf value AND spot color to a known reference table. For example, a sample showing Rf = 0.60 (blue) must be Cu²⁺ and Rf = 0.78 (yellow) must be Cd²⁺ — matching both properties simultaneously confirms identity. The increasing Rf trend with molar mass reflects differences in how each ion interacts with the stationary phase and mobile phase. An ion with a very low Rf (like Ni²⁺, Rf = 0.08) is strongly adsorbed to the paper and poorly dissolved in the mobile phase.",
        },
        {
          level: 8,
          body: "The data-based question in Chapter 7 shows three waste water samples. Sample 2 (Rf = 0.35 brown-black; Rf = 0.95 brown-black) contains Co²⁺ and Hg²⁺ — both toxic heavy metals. Sample 3 (Rf = 0.08 pink; Rf = 0.78 yellow; Rf = 0.95 brown-black) contains Ni²⁺, Cd²⁺, and Hg²⁺ — three toxic ions simultaneously. This illustrates how paper chromatography functions as a rapid screening tool for environmental contamination. More rigorous confirmation would require GC-MS because some ions happen to share similar Rf values under different conditions.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "rf-l2",
            level: 2,
            prompt:
              "A pigment travels 6.0 cm and the solvent front travels 10.0 cm. What is the Rf value of this pigment?",
            options: [
              { id: "a", text: "0.17" },
              { id: "b", text: "1.67" },
              { id: "c", text: "0.60", correct: true },
              { id: "d", text: "4.0" },
            ],
            explanation:
              "Rf = distance of component ÷ distance of solvent = 6.0 / 10.0 = 0.60. Rf is always between 0 and 1 because the solvent always travels further than the component.",
          },
          {
            type: "fill",
            id: "rf-l4",
            level: 4,
            prompt:
              "In Chapter 7's chromatography data table, the metal ion with Rf = 0.60 and a blue spot is ▁.",
            answers: ["copper", "Cu2+", "Cu²⁺", "copper(ii)", "copper(II)"],
            explanation:
              "From the reference table: Cu²⁺ has molar mass 63.5 g mol⁻¹, distance travelled 6.0 cm, Rf = 0.60, and produces a blue spot. These two properties (Rf and colour) together confirm identity.",
          },
          {
            type: "short",
            id: "rf-l6",
            level: 6,
            prompt:
              "A waste water sample shows two spots: Rf = 0.35 (brown-black) and Rf = 0.95 (brown-black). Using the reference table from Chapter 7, identify both ions present. Explain how you use both Rf value and spot color to identify each ion.",
            keywords: [
              "co2+",
              "cobalt",
              "hg2+",
              "mercury",
              "0.35",
              "0.95",
              "brown-black",
              "rf",
              "colour",
              "identify",
              "match",
              "reference",
            ],
            minKeywords: 3,
            sample:
              "Rf = 0.35 (brown-black) matches Co²⁺ (cobalt, molar mass 58.9). Rf = 0.95 (brown-black) matches Hg²⁺ (mercury, molar mass 200.6). Both spots are brown-black, so colour alone cannot distinguish them — the Rf values must also be used. By matching both Rf AND spot colour to the reference table, both ions are identified. Both are toxic heavy metals, indicating serious contamination of this waste water.",
          },
          {
            type: "short",
            id: "rf-l8",
            level: 8,
            prompt:
              "Examine the chromatography reference data for five metal ions (Ni²⁺, Co²⁺, Cu²⁺, Cd²⁺, Hg²⁺). Describe the trend between molar mass and Rf value. Explain this trend in terms of how each ion interacts with the stationary and mobile phases. Why might a forensic scientist require GC-MS in addition to chromatography to confirm the identity of an ion?",
            keywords: [
              "molar mass",
              "rf",
              "increases",
              "trend",
              "stationary phase",
              "mobile phase",
              "adsorbed",
              "soluble",
              "heavier",
              "gc-ms",
              "confirm",
              "identity",
              "forensic",
              "retention time",
            ],
            minKeywords: 4,
            sample:
              "As molar mass increases (Ni 58.7 → Hg 200.6 g mol⁻¹), Rf increases (0.08 → 0.95). Ions with lower molar mass are more strongly adsorbed to the stationary phase (paper) and less soluble in the mobile phase, so they travel shorter distances. Heavier ions interact less strongly with the paper and travel further. However, paper chromatography is only a presumptive test — some ions share similar Rf values under different conditions, or solvent choice can change Rf. GC-MS provides unique mass spectra that unambiguously confirm the identity of a substance by comparing fragmentation patterns against a library of known spectra, making it far more definitive than Rf matching alone.",
          },
        ],
      },
    },
  ],
}
