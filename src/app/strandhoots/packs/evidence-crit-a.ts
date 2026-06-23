import type { StrandhootPack } from "../engine/types"

export const evidenceCritA: StrandhootPack = {
  slug: "evidence-crit-a",
  title: "Evidence: Knowing the Chemical World",
  subject: "MYP Chemistry",
  criterion: "A",
  topic: "Metals, non-metals, organic compounds & atmosphere",
  accent: "#1b7888",
  icon: "🔬",
  statementOfInquiry:
    "Our ability to collect evidence improves with advances in science and technical innovations.",
  estMinutes: 28,
  intro:
    "Chapter 2 takes you from the periodic table's metallic and non-metallic elements, through the colourful world of transition metals and inert noble gases, into organic chemistry — alkanes, alkenes and alcohols — and out to the composition of Earth's atmosphere. Each strand targets a core knowledge area, levelling from recall to analysis.",
  badges: [
    {
      id: "metal-expert",
      label: "Metal Classifier",
      icon: "🔩",
      description: "Reach Level 8 on Metals & non-metals",
      strandId: "metals",
      atLevel: 8,
    },
    {
      id: "transition-expert",
      label: "Transition Chemist",
      icon: "🎨",
      description: "Reach Level 8 on Transition metals & noble gases",
      strandId: "transition",
      atLevel: 8,
    },
    {
      id: "organic-expert",
      label: "Organic Namer",
      icon: "⛽",
      description: "Reach Level 8 on Alkanes & alkenes",
      strandId: "organics",
      atLevel: 8,
    },
    {
      id: "atmosphere-expert",
      label: "Atmosphere Analyst",
      icon: "🌍",
      description: "Reach Level 8 on Atmospheric composition",
      strandId: "atmosphere",
      atLevel: 8,
    },
    {
      id: "evidence-master",
      label: "Evidence Master",
      icon: "🏆",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Chapter 2: Evidence",
      blurb: "Metals, organics and atmosphere — the evidence all around us",
      icon: "🔬",
    },
  ],
  strands: [
    {
      id: "metals",
      name: "Metals & non-metals",
      descriptor:
        "Identify and contrast the characteristic physical and chemical properties of metals and non-metals.",
      guided: [
        {
          level: 2,
          body: "Metals are shiny, conduct heat and electricity, are malleable (can be hammered into shape) and ductile (can be drawn into wires). Non-metals are the opposite: dull, brittle, poor conductors, with low melting points.",
        },
        {
          level: 4,
          body: "Metals tend to lose electrons and form cations (positively charged ions), while non-metals tend to gain electrons and form anions (negatively charged ions). Metals have high densities, high melting and boiling points, and ring when struck (sonorous). The alkali metals (Group 1) react vigorously with water — potassium reacts more violently than sodium, which reacts more violently than lithium. Reactivity increases down Group 1.",
        },
        {
          level: 6,
          body: "When sodium reacts with water: 2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g). A universal indicator turns alkaline (purple) confirming the NaOH product. The reaction of potassium is so violent that the liberated H₂ ignites, burning with a lilac flame. The increase in reactivity down Group 1 is due to the outer electron being further from the nucleus and more easily lost. This is an example of using qualitative and quantitative evidence — colour change, flame colour and reaction vigour — to establish a reactivity pattern.",
        },
        {
          level: 8,
          body: "Non-metals generally exist as small molecules or giant covalent structures, giving low melting/boiling points (exceptions: graphite, diamond). The key distinction is electron behaviour: metals delocalise electrons forming a 'sea' that carries charge and heat, explaining conductivity; non-metals have localised electrons in covalent bonds. Metalloids (Si, Ge, As) lie along the staircase boundary and can be doped to become semiconductors — evidence that the metal/non-metal boundary is not binary. The reactivity of alkali metals is measurable quantitatively: the volume of H₂ produced per gram of metal decreases as you go up the group, providing numerical evidence for the reactivity trend.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "met-l2",
            level: 2,
            prompt: "Which of the following is a property of metals?",
            options: [
              { id: "a", text: "Brittle and dull" },
              { id: "b", text: "Low melting point" },
              { id: "c", text: "Malleable and good conductor of electricity", correct: true },
              { id: "d", text: "Gains electrons to form anions" },
            ],
            explanation:
              "Metals are malleable (hammerable) and good conductors of heat and electricity. They lose electrons to form cations, not anions.",
          },
          {
            type: "fill",
            id: "met-l4",
            level: 4,
            prompt:
              "In Group 1, reactivity ▁ as you move down the group, because the outer electron is further from the nucleus and more easily lost.",
            answers: ["increases", "increases down the group"],
            explanation:
              "Moving down Group 1 (Li → Na → K), the outer electron is in a higher energy level, further from the nucleus and shielded by more inner electrons, making it easier to lose. Potassium reacts most violently with water.",
          },
          {
            type: "short",
            id: "met-l6",
            level: 6,
            prompt:
              "Sodium reacts with water. Write the balanced symbol equation for this reaction and identify two pieces of evidence you could collect during the experiment to confirm the products formed.",
            keywords: [
              "2na",
              "2h2o",
              "2naoh",
              "h2",
              "hydrogen",
              "alkali",
              "universal indicator",
              "ph",
              "purple",
              "fizzing",
              "splint",
              "flame",
            ],
            minKeywords: 3,
            sample:
              "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g). Evidence 1: Universal indicator turns purple/alkaline, confirming NaOH is produced. Evidence 2: A lit splint held near the gas produces a squeaky pop, confirming H₂ gas is produced.",
          },
          {
            type: "short",
            id: "met-l8",
            level: 8,
            prompt:
              "Explain why metals conduct electricity and non-metals generally do not. Use the concept of electron behaviour to support your answer, and name one non-metal exception to the rule.",
            keywords: [
              "delocalised",
              "sea of electrons",
              "mobile",
              "conductivity",
              "covalent",
              "localised",
              "graphite",
              "semiconductor",
              "silicon",
              "charge",
            ],
            minKeywords: 3,
            sample:
              "Metals have delocalised electrons — a 'sea' of mobile electrons not attached to any one atom — that can carry charge through the structure, explaining electrical conductivity. Non-metals have electrons localised in covalent bonds between specific atoms; these electrons cannot move freely so they do not conduct electricity. Exception: graphite, a non-metal, conducts electricity because one electron per carbon is delocalised along its layered structure.",
          },
        ],
      },
    },
    {
      id: "transition",
      name: "Transition metals & noble gases",
      descriptor:
        "Describe the distinctive properties of transition elements and explain why noble gases are inert.",
      guided: [
        {
          level: 2,
          body: "Transition metals (Groups 3–12) form colourful compounds, can act as catalysts, and can form ions with different charges. Noble gases (Group 18) are inert — they do not react because they have full outer electron shells.",
        },
        {
          level: 4,
          body: "Transition metal properties: (1) they form colourful salts — copper(II) sulfate is blue, cobalt(II) chloride is pink, iron(II) sulfate is green; (2) they can act as catalysts — e.g. vanadium(V) oxide catalyses the Contact process; (3) they can form multiple ions — chromium forms Cr³⁺ and Cr⁶⁺, and vanadium forms V²⁺, V³⁺, V⁴⁺ and V⁵⁺. Noble gases: He (boiling point −269°C) cools MRI superconducting magnets; Ar fills vaccine ampoules to prevent oxidation.",
        },
        {
          level: 6,
          body: "The multiple oxidation states of transition metals arise because their d-electrons can be removed with similar energies. Vanadium solutions in different oxidation states show distinct colours: V²⁺ is violet, V³⁺ is green, V⁴⁺ is blue and V⁵⁺ (VO₂⁺) is yellow. These colour changes provide visual evidence of oxidation state changes — a key tool in analytical chemistry. Noble gases are extracted from liquid air by fractional distillation, exploiting their different boiling points: He (−269°C), Ne (−246°C), Ar (−186°C), Kr (−153°C), Xe (−108°C).",
        },
        {
          level: 8,
          body: "Transition metals are catalysts because they can cycle between oxidation states, providing an alternative reaction pathway of lower activation energy (they donate and accept electrons readily via their d-orbitals). The emission spectrum of each element is unique: when electrons in noble gas discharge tubes are excited to higher energy levels, they emit photons of specific wavelengths on returning to ground state — these unique spectral fingerprints are evidence of quantised electron energy levels. He was actually identified in the Sun's spectrum 27 years before it was isolated on Earth, demonstrating that spectroscopic evidence can precede physical discovery.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "trans-l2",
            level: 2,
            prompt: "Which of the following is a characteristic property of transition metals?",
            options: [
              { id: "a", text: "They are all gaseous at room temperature" },
              { id: "b", text: "They only ever form one type of ion" },
              { id: "c", text: "They form colourful compounds and can act as catalysts", correct: true },
              { id: "d", text: "They are found in Group 18 of the periodic table" },
            ],
            explanation:
              "Transition metals (Groups 3–12) characteristically form colourful compounds and can act as catalysts. They are all solid metals at room temperature and can form ions with different charges.",
          },
          {
            type: "fill",
            id: "trans-l4",
            level: 4,
            prompt:
              "Noble gases are naturally ▁ (unreactive) because they have full outer electron shells.",
            answers: ["inert", "unreactive"],
            explanation:
              "A full outer electron shell means noble gases have no tendency to gain or lose electrons — they are chemically stable (inert). This makes them valuable in applications where reactions must be prevented, such as filling ampoules with argon to protect vaccines.",
          },
          {
            type: "short",
            id: "trans-l6",
            level: 6,
            prompt:
              "Vanadium can exist in four different oxidation states. Explain how the colour of vanadium solutions provides evidence of oxidation state changes during a chemical reaction.",
            keywords: [
              "oxidation state",
              "colour",
              "evidence",
              "v2+",
              "v3+",
              "v4+",
              "v5+",
              "violet",
              "green",
              "blue",
              "yellow",
              "qualitative",
            ],
            minKeywords: 3,
            sample:
              "Each oxidation state of vanadium produces a distinctly coloured solution: V²⁺ is violet, V³⁺ is green, V⁴⁺ is blue, and V⁵⁺ (VO₂⁺) is yellow. As the oxidation state changes during a reaction, the solution colour changes — this is qualitative evidence that a chemical change has occurred. Each colour corresponds to a specific electronic configuration, so colour acts as a diagnostic indicator of the oxidation state present.",
          },
          {
            type: "short",
            id: "trans-l8",
            level: 8,
            prompt:
              "Explain why transition metals make effective catalysts, using their electron structure. Then explain how noble gas emission spectra provide evidence for quantised electron energy levels.",
            keywords: [
              "d-orbital",
              "oxidation state",
              "activation energy",
              "catalyst",
              "electrons",
              "photon",
              "wavelength",
              "quantised",
              "energy level",
              "spectrum",
              "unique",
            ],
            minKeywords: 4,
            sample:
              "Transition metals are effective catalysts because their d-electrons can be donated and accepted readily, allowing them to cycle between oxidation states. This enables them to provide an alternative reaction pathway with lower activation energy without being consumed. For noble gases: when electrons in a discharge tube are excited to higher energy levels, they emit photons of specific wavelengths when returning to the ground state. Each element has a unique emission spectrum — evidence that electron energy levels are quantised (only specific values are allowed). Helium was identified in the Sun's spectrum before it was isolated on Earth.",
          },
        ],
      },
    },
    {
      id: "organics",
      name: "Alkanes, alkenes & alcohols",
      descriptor:
        "Name and compare alkanes, alkenes and alcohols using IUPAC rules and general formulae.",
      guided: [
        {
          level: 2,
          body: "Alkanes are saturated hydrocarbons (only C–C single bonds); general formula CₙH₂ₙ₊₂. Alkenes contain at least one C=C double bond; general formula CₙH₂ₙ. Alcohols contain the functional group –OH. Methane (CH₄), ethene (C₂H₄) and ethanol (C₂H₅OH) are key examples.",
        },
        {
          level: 4,
          body: "IUPAC naming: count the longest carbon chain for the root name (meth-1, eth-2, prop-3, but-4…). Alkanes end in -ane; alkenes end in -ene with the double bond position numbered to be as low as possible; alcohols end in -ol. Alkenes are more reactive than alkanes because the double bond can be broken — bromine water (orange-brown) decolourises when mixed with an alkene, confirming the presence of a C=C bond. Hydrogenation: C₂H₄(g) + H₂(g) → C₂H₆(g), heat/pressure/Ni catalyst.",
        },
        {
          level: 6,
          body: "Catalytic cracking breaks large alkane molecules (from naphtha fraction of crude oil) into smaller, more useful alkanes and alkenes using heat and a catalyst. The products include ethene (used for making plastics) and shorter alkanes (used as fuels). Ethanol can be made industrially from ethene: C₂H₄(g) + H₂O(g) → C₂H₅OH(g) at 300°C, 60 atm, using a phosphoric(V) acid catalyst. Alcohols are identified by the –OH group, which makes them more soluble in water than the corresponding alkane.",
        },
        {
          level: 8,
          body: "Alkanes are saturated — each carbon uses all four bonds for C–C or C–H single bonds. Alkenes are unsaturated — the C=C double bond uses one bond less for each carbon, making them open to addition reactions (bromine water test; hydrogenation; addition polymerisation). The general formula difference between CₙH₂ₙ₊₂ (alkane) and CₙH₂ₙ (alkene) reflects the loss of two H atoms per double bond. Ethanol (C₂H₅OH) combustion: C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l); as a biofuel, its carbon is considered carbon-neutral since the CO₂ was recently fixed by photosynthesis in the source crop. The bromine water test is a simple qualitative evidence-gathering technique: decolourisation = C=C bond confirmed.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "org-l2",
            level: 2,
            prompt: "What is the general formula for the alkane series?",
            options: [
              { id: "a", text: "CₙH₂ₙ" },
              { id: "b", text: "CₙH₂ₙ₊₂", correct: true },
              { id: "c", text: "CₙHₙ" },
              { id: "d", text: "CₙH₂ₙ₋₂" },
            ],
            explanation:
              "Alkanes are saturated hydrocarbons: CₙH₂ₙ₊₂. For example, methane is CH₄ (n=1: 2×1+2=4 ✓) and butane is C₄H₁₀ (n=4: 2×4+2=10 ✓). Alkenes have the formula CₙH₂ₙ (one fewer H₂ per double bond).",
          },
          {
            type: "fill",
            id: "org-l4",
            level: 4,
            prompt:
              "When bromine water (orange-brown) is shaken with an alkene, it turns ▁, providing evidence for the presence of a carbon-carbon double bond.",
            answers: ["colourless", "decolourised", "clear"],
            explanation:
              "The C=C double bond in alkenes undergoes an addition reaction with bromine (Br₂). The bromine adds across the double bond, breaking the C=C and producing a colourless dibromo compound. This decolourisation is diagnostic evidence for unsaturation.",
          },
          {
            type: "short",
            id: "org-l6",
            level: 6,
            prompt:
              "Catalytic cracking converts large hydrocarbon molecules into smaller, more useful ones. Explain the process and give one example of a useful product from cracking, stating its application.",
            keywords: [
              "catalyst",
              "heat",
              "large",
              "small",
              "alkene",
              "alkane",
              "naphtha",
              "ethene",
              "plastics",
              "polymer",
              "fuel",
              "cracking",
            ],
            minKeywords: 3,
            sample:
              "Catalytic cracking heats large hydrocarbon molecules (from the naphtha fraction of crude oil) in the presence of a catalyst (e.g. pumice stone). This breaks the long-chain molecules into smaller alkanes and alkenes. One useful product is ethene (C₂H₄), which is used to make polymers such as poly(ethene) for plastics. Shorter alkane chains are also produced, which are more useful as fuels.",
          },
          {
            type: "short",
            id: "org-l8",
            level: 8,
            prompt:
              "Explain the difference between saturated and unsaturated hydrocarbons. Why are alkenes more reactive than alkanes? Describe how a student could use bromine water to distinguish between hexane and hexene.",
            keywords: [
              "saturated",
              "unsaturated",
              "double bond",
              "addition",
              "bromine water",
              "decolourised",
              "colourless",
              "hexane",
              "hexene",
              "single bond",
              "reactive",
            ],
            minKeywords: 4,
            sample:
              "Saturated hydrocarbons (alkanes) contain only C–C single bonds; all carbon valences are fully occupied with C or H. Unsaturated hydrocarbons (alkenes) contain at least one C=C double bond, leaving the carbons in that bond able to bond with other atoms via addition reactions. Alkenes are more reactive because the double bond can be broken, opening the carbon atoms to addition reactions. Test: add bromine water to both samples. Hexane (saturated) — no change, remains orange-brown. Hexene (unsaturated) — bromine adds across the C=C, the solution decolourises to colourless. Decolourisation is evidence of the C=C bond.",
          },
        ],
      },
    },
    {
      id: "atmosphere",
      name: "Atmospheric composition",
      descriptor:
        "State the composition of Earth's atmosphere and explain the evidence for rising CO₂ levels.",
      guided: [
        {
          level: 2,
          body: "Earth's atmosphere is approximately 78% nitrogen, 21% oxygen, and 1% other gases (mainly argon). Carbon dioxide is present at about 400 ppm (0.04%). The main greenhouse gases are CO₂ and methane (CH₄).",
        },
        {
          level: 4,
          body: "Noble gases (He, Ne, Ar, Kr, Xe) make up most of the remaining 1%. CO₂ is released by burning fossil fuels, deforestation, respiration and volcanic eruptions. Measurements at the Mauna Loa Observatory in Hawaii show atmospheric CO₂ rising from ~380 ppm in 2006 to over 405 ppm in 2018. In 2015, CO₂ exceeded 400 ppm for the first time in recorded history.",
        },
        {
          level: 6,
          body: "Ice cores drilled from Antarctica and Greenland contain trapped air bubbles that preserve ancient atmospheric composition. Over the past 400 000 years, CO₂ levels cycled between 180 and 300 ppm during ice ages and warmer periods. The current level (~405 ppm) is unprecedented in at least 800 000 years of ice core records. This data provides historical context: modern CO₂ is ~40% higher than any pre-industrial level, and has risen in parallel with global mean temperature, supporting the correlation between CO₂ and global warming.",
        },
        {
          level: 8,
          body: "Correlation between CO₂ and temperature in the ice core record is compelling evidence, but correlation is not causation. The physical mechanism is well understood: CO₂ is a greenhouse gas that absorbs outgoing infrared radiation and re-emits it in all directions, including back to Earth's surface ('enhanced greenhouse effect'). Advances in instrumentation enable us to collect this evidence: mass spectrometry identifies isotopic ratios in ice core CO₂, distinguishing volcanic carbon (¹³C-enriched) from fossil fuel carbon (¹²C-enriched). This is a direct example of the statement of inquiry — our ability to collect evidence (ice cores, isotopic analysis, satellite data) has improved with scientific and technical innovation.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "atm-l2",
            level: 2,
            prompt:
              "Approximately what percentage of Earth's atmosphere is made up of nitrogen?",
            options: [
              { id: "a", text: "21%" },
              { id: "b", text: "0.04%" },
              { id: "c", text: "78%", correct: true },
              { id: "d", text: "1%" },
            ],
            explanation:
              "By volume: ~78% N₂, ~21% O₂, ~1% Ar, and trace gases including ~0.04% (400 ppm) CO₂. Nitrogen is the dominant component despite being relatively unreactive.",
          },
          {
            type: "fill",
            id: "atm-l4",
            level: 4,
            prompt:
              "Carbon dioxide is present in Earth's atmosphere at approximately ▁ parts per million (ppm), or 0.04%.",
            answers: ["400", "400 ppm"],
            explanation:
              "400 ppm means 400 molecules of CO₂ for every million air molecules. This milestone was first exceeded in 2015. Despite being a tiny proportion, CO₂'s ability to absorb infrared radiation makes it a potent greenhouse gas.",
          },
          {
            type: "short",
            id: "atm-l6",
            level: 6,
            prompt:
              "Describe how ice cores are used as evidence of past atmospheric CO₂ levels. What is the most significant finding from ice core data about CO₂ levels today?",
            keywords: [
              "ice cores",
              "air bubbles",
              "trapped",
              "past",
              "ancient",
              "400 000",
              "800 000",
              "180",
              "300",
              "400 ppm",
              "unprecedented",
              "pre-industrial",
            ],
            minKeywords: 3,
            sample:
              "Ice cores drilled from Antarctica contain air bubbles trapped thousands of years ago, preserving the ancient atmosphere. By analysing these bubbles, scientists can reconstruct past CO₂ levels. Over the past 400 000+ years, CO₂ cycled between ~180 ppm (glacial) and ~300 ppm (interglacial). The most significant finding is that current levels (~405 ppm) are higher than any point in the past 800 000 years — the current rate and level of increase is unprecedented.",
          },
          {
            type: "short",
            id: "atm-l8",
            level: 8,
            prompt:
              "Explain how advances in science and technology have improved our ability to collect evidence about atmospheric CO₂. In your answer, distinguish between correlation and causation, and explain the physical mechanism linking CO₂ to global warming.",
            keywords: [
              "mauna loa",
              "ice core",
              "isotopic",
              "mass spectrometry",
              "infrared",
              "greenhouse",
              "correlation",
              "causation",
              "mechanism",
              "re-emits",
              "fossil fuel",
              "carbon-12",
            ],
            minKeywords: 4,
            sample:
              "Advances in technology have greatly improved atmospheric evidence collection: the Mauna Loa Observatory provides continuous atmospheric measurements since 1958; ice core drilling gives 800 000 years of data; isotopic mass spectrometry distinguishes fossil fuel CO₂ (¹²C-enriched) from volcanic CO₂ (¹³C-enriched). The correlation between CO₂ and temperature is strong, but correlation alone does not prove causation. The physical mechanism is: CO₂ molecules absorb outgoing infrared radiation emitted by Earth's surface and re-emit it in all directions, including back toward Earth — this enhanced greenhouse effect warms the surface. The combination of the observed correlation and the understood physical mechanism constitutes strong evidence.",
          },
        ],
      },
    },
  ],
}
