import type { StrandhootPack } from "../engine/types"

export const modelsCritA: StrandhootPack = {
  slug: "models-crit-a",
  title: "Chemical Models & Bonding",
  subject: "MYP Chemistry",
  criterion: "A",
  topic: "Structure, bonding and chemical formulae",
  accent: "#1b7888",
  icon: "🔬",
  statementOfInquiry:
    "Molecular modelling is used for the visualization of chemical structures, displaying their orientation in space and time.",
  estMinutes: 25,
  intro:
    "Models are chemistry's language for the invisible. This pack covers the four big knowledge pillars of Chapter 9: how ions form and why, how to build chemical formulae using the criss-cross method, the differences between ionic, covalent and metallic bonding, and the structure and purpose of alloys. Each strand levels from recall to analysis.",
  badges: [
    { id: "ion-former", label: "Ion Former", icon: "⚡", description: "Reach Level 8 on Electron configuration & ions", strandId: "ions", atLevel: 8 },
    { id: "formula-builder", label: "Formula Builder", icon: "🧮", description: "Reach Level 8 on Chemical formulae", strandId: "formulae", atLevel: 8 },
    { id: "bond-analyst", label: "Bond Analyst", icon: "🔗", description: "Reach Level 8 on Types of chemical bonding", strandId: "bonding", atLevel: 8 },
    { id: "alloy-expert", label: "Alloy Expert", icon: "⚙️", description: "Reach Level 8 on Alloys", strandId: "alloys", atLevel: 8 },
    { id: "models-master", label: "Models Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Chapter 9: Models", blurb: "Ions, formulae, bonding types and alloys", icon: "🔬" }],
  strands: [
    {
      id: "ions",
      name: "Electron configuration & ions",
      descriptor: "Explain how and why atoms lose or gain electrons to form ions, using electron configurations.",
      guided: [
        {
          level: 2,
          body: "Atoms form ions in order to achieve a full outer electron shell like the noble gases in group 18. Metals lose electrons to form positive ions (cations). Non-metals gain electrons to form negative ions (anions). For example, sodium [2,8,1] loses 1 electron → Na⁺ [2,8].",
        },
        {
          level: 4,
          body: "The driving force is the noble gas electron configuration. Sodium (group 1) has electron configuration [2,8,1]. It can lose 1 electron to reach [2,8] (neon configuration) or gain 7 electrons to reach [2,8,8] (argon). It is far easier to lose 1 electron than gain 7. Chlorine [2,8,7] gains 1 electron → Cl⁻ [2,8,8]. Atoms with the same electron configuration are isoelectronic — e.g. Na⁺ and Ne are both [2,8].",
        },
        {
          level: 6,
          body: "The charge on an ion depends on the balance of protons and electrons. Magnesium (atomic number 12, mass number 24) has 12 protons and 12 electrons, configuration [2,8,2]. It loses 2 electrons to reach [2,8] — neon configuration — giving Mg²⁺ with 10 electrons but still 12 protons, net charge 2+. Knowing an element's group in the periodic table predicts how many electrons it will lose or gain: group 1 → 1+ ions; group 2 → 2+ ions; group 16 → 2− ions; group 17 → 1− ions.",
        },
        {
          level: 8,
          body: "For transition metals the charge is not directly predictable from group number — they can form multiple ions. For example, iron can be Fe²⁺ (iron(II)) or Fe³⁺ (iron(III)), and manganese can form Mn⁺ through Mn⁷⁺. Roman numerals in the name specify the charge. The isoelectronic concept extends across ions and noble gases: Na⁺, Mg²⁺, Al³⁺, N³⁻, O²⁻ and F⁻ are all isoelectronic with neon [2,8]. This shared electron configuration does not give them identical properties — charge still dominates size and lattice energy.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "ions-l2",
            level: 2,
            prompt: "Sodium has the electron configuration [2,8,1]. What ion does sodium form and why?",
            options: [
              { id: "a", text: "Na²⁺ — it loses two electrons from its outer shell" },
              { id: "b", text: "Na⁺ — it loses one electron to achieve a full outer shell", correct: true },
              { id: "c", text: "Na⁻ — it gains one electron to fill its outer shell" },
              { id: "d", text: "Na²⁻ — it gains two electrons to fill its outer shell" },
            ],
            explanation:
              "Sodium is in group 1 and has one valence electron [2,8,1]. Losing 1 electron gives the noble gas configuration of neon [2,8] — far easier than gaining 7 electrons. This produces Na⁺.",
          },
          {
            type: "fill",
            id: "ions-l4",
            level: 4,
            prompt:
              "Two ions or atoms with the same electron configuration are described as ▁ with each other.",
            answers: ["isoelectronic"],
            explanation:
              "Isoelectronic species have identical electron configurations. For example, Na⁺ [2,8] and Ne [2,8] are isoelectronic — Mg²⁺ and Al³⁺ are also isoelectronic with neon.",
          },
          {
            type: "short",
            id: "ions-l6",
            level: 6,
            prompt:
              "Magnesium has atomic number 12 and mass number 24. Explain step by step how the magnesium ion Mg²⁺ is formed, including the number of protons, neutrons and electrons in both the atom and the ion.",
            keywords: ["protons", "electrons", "12", "10", "2+", "outer shell", "lose", "neon", "configuration", "2,8"],
            minKeywords: 4,
            sample:
              "Magnesium has 12 protons, 12 neutrons (24−12) and 12 electrons in configuration [2,8,2]. To achieve a full outer electron shell, Mg loses 2 electrons. The resulting Mg²⁺ ion has 12 protons but only 10 electrons — net charge 2+. Its electron configuration [2,8] is isoelectronic with neon.",
          },
          {
            type: "short",
            id: "ions-l8",
            level: 8,
            prompt:
              "Iron forms both Fe²⁺ and Fe³⁺ ions, while manganese can form seven different cations from Mn⁺ to Mn⁷⁺. How does this differ from main-group metals, and why are Roman numerals used in the naming of transition metal compounds?",
            keywords: ["transition metal", "multiple", "roman numerals", "charge", "mn", "fe2+", "fe3+", "predict", "group", "variable"],
            minKeywords: 3,
            sample:
              "Main-group metals (groups 1, 2, 13) form ions of fixed charge predictable from their group number. Transition metals can form multiple cations because they have similar energy levels in d-orbitals, allowing different numbers of electrons to be removed. Iron forms Fe²⁺ and Fe³⁺; manganese can form Mn⁺ through Mn⁷⁺. Roman numerals (e.g. iron(III)) specify which ion is present in a compound, since the group number alone cannot predict this.",
          },
        ],
      },
    },
    {
      id: "formulae",
      name: "Chemical formulae",
      descriptor: "Construct formulae of ionic compounds using the criss-cross method and balance charges.",
      guided: [
        {
          level: 2,
          body: "The chemical formula of an ionic compound shows the elements present and the lowest whole number ratio of atoms. The overall charge must equal zero. For sodium chloride, Na⁺ and Cl⁻ have equal and opposite charges, so the formula is NaCl (1:1 ratio).",
        },
        {
          level: 4,
          body: "The criss-cross method: swap the size of the charge (ignoring the sign) to find the ratio. For magnesium iodide: Mg²⁺ and I⁻ → swap the 2 and the 1 → MgI₂. Check: one Mg²⁺ (+2) and two I⁻ (2×−1 = −2) → net charge = 0. ✓ For iron(III) chloride: Fe³⁺ and Cl⁻ → FeCl₃.",
        },
        {
          level: 6,
          body: "Polyatomic ions (e.g. OH⁻, SO₄²⁻, NH₄⁺, NO₃⁻) are treated as single units. When more than one polyatomic ion is needed, use parentheses. For iron(III) hydroxide: Fe³⁺ and OH⁻ → Fe(OH)₃ — the bracket shows three OH groups, not FeO₃H₃. For ammonium phosphate: NH₄⁺ and PO₄³⁻ → (NH₄)₃PO₄ using the criss-cross method.",
        },
        {
          level: 8,
          body: "The formula represents the lowest whole number ratio — always simplify. Ca₂O₂ simplifies to CaO. Covalent compounds differ: CO₂ is the actual molecular formula (one molecule has exactly 1 C and 2 O atoms). Ionic formulae describe an infinite lattice ratio, not a single molecule. Recognising which type of bonding is present is essential before writing a formula — and the formula in turn encodes composition and bonding type.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "formulae-l2",
            level: 2,
            prompt: "What is the formula of the ionic compound formed between calcium (Ca²⁺) and chlorine (Cl⁻)?",
            options: [
              { id: "a", text: "CaCl" },
              { id: "b", text: "CaCl₂", correct: true },
              { id: "c", text: "Ca₂Cl" },
              { id: "d", text: "Ca₂Cl₂" },
            ],
            explanation:
              "Using the criss-cross method: Ca²⁺ and Cl⁻ → swap the 2 and the 1 → CaCl₂. Check: one Ca²⁺ (+2) and two Cl⁻ (−2) → net charge 0. CaCl₂ is the lowest whole number ratio.",
          },
          {
            type: "fill",
            id: "formulae-l4",
            level: 4,
            prompt: "The formula of iron(III) chloride, formed from Fe³⁺ and Cl⁻, is ▁.",
            answers: ["FeCl3", "FeCl₃"],
            explanation:
              "Fe³⁺ and Cl⁻: using the criss-cross method, swap the 3 and the 1 → FeCl₃. Check: one Fe³⁺ (+3) and three Cl⁻ (3×−1 = −3) → net charge 0. ✓",
          },
          {
            type: "short",
            id: "formulae-l6",
            level: 6,
            prompt:
              "Write the formula for iron(III) hydroxide (Fe³⁺ and OH⁻). Why are parentheses needed in this formula, and what would happen if they were omitted?",
            keywords: ["fe(oh)3", "parentheses", "brackets", "polyatomic", "oh", "three", "ratio", "net charge", "zero", "hydroxide"],
            minKeywords: 3,
            sample:
              "Using the criss-cross method with Fe³⁺ and OH⁻: swap 3 and 1 → Fe(OH)₃. Parentheses show that there are three complete OH⁻ groups (not three oxygen atoms and then hydrogen separately). Without parentheses, FeOH₃ could be misread as one O and three H atoms — changing the formula entirely. Net charge: Fe³⁺ (+3) + 3 OH⁻ (3×−1=−3) = 0. ✓",
          },
          {
            type: "short",
            id: "formulae-l8",
            level: 8,
            prompt:
              "Explain the key difference between the chemical formula of an ionic compound (such as NaCl) and a covalent compound (such as CO₂). Why does the formula mean something different in each case?",
            keywords: ["ionic", "ratio", "lattice", "covalent", "molecule", "actual", "number", "atoms", "lowest", "infinite"],
            minKeywords: 4,
            sample:
              "For ionic compounds like NaCl, the formula represents the lowest whole number ratio of ions in an infinite crystal lattice — there is no single NaCl 'molecule'. The 1:1 ratio means Na⁺ and Cl⁻ ions alternate throughout the lattice. For covalent compounds like CO₂, the formula is the actual molecular formula — each molecule contains exactly 1 C atom and 2 O atoms. Changing a subscript in CO₂ would create a different molecule; changing the ratio in NaCl describes a different compound entirely.",
          },
        ],
      },
    },
    {
      id: "bonding",
      name: "Types of chemical bonding",
      descriptor: "Compare ionic, covalent and metallic bonding and relate each to properties of materials.",
      guided: [
        {
          level: 2,
          body: "There are three main types of chemical bonding. Ionic bonding: electrostatic attraction between positive and negative ions (metal + non-metal). Covalent bonding: sharing of electrons between non-metal atoms. Metallic bonding: attraction between positive metal ions and a 'sea' of delocalized electrons.",
        },
        {
          level: 4,
          body: "Ionic compounds (e.g. NaCl) form giant crystalline lattices with high melting points (NaCl: 801°C) because a lot of energy is needed to overcome the strong electrostatic forces. They conduct electricity when molten or dissolved in water (ions free to move) but not as solids. Covalent compounds (e.g. CO₂) have low melting points. Metals conduct electricity in all states because delocalized electrons carry charge.",
        },
        {
          level: 6,
          body: "The 6:6 coordinate structure of NaCl means each Na⁺ is surrounded by six Cl⁻ ions and vice versa, making the lattice very stable. Ionic compounds are brittle: stress shifts planes so like-charged ions become adjacent and repel — the crystal shatters. In metallic bonding, cations slide over each other without disruption because delocalized electrons move with them — this explains why metals are malleable, not brittle. Covalent bonds are directional; metallic bonds are non-directional.",
        },
        {
          level: 8,
          body: "Electrical conductivity differences are due to electron mobility. Ionic solids: electrons are localized on ions — no charge carriers. Ionic solution/melt: ions free to move carry charge. Covalent solids (e.g. sugar): both electrons and atoms are localized — non-conductors. Metals: delocalized electrons move freely, explaining high conductivity. Graphite is a covalent solid that conducts because each carbon forms only three bonds, leaving one delocalized electron per atom — structurally similar to metallic bonding. Stronger ionic bonds (higher charges, smaller ions) mean higher melting points — MgO (Mg²⁺ + O²⁻) melts at ~2852°C, far higher than NaCl (Na⁺ + Cl⁻) at 801°C.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "bonding-l2",
            level: 2,
            prompt: "Which type of bonding involves a 'sea' of delocalized electrons surrounding positive metal ions?",
            options: [
              { id: "a", text: "Ionic bonding" },
              { id: "b", text: "Covalent bonding" },
              { id: "c", text: "Metallic bonding", correct: true },
              { id: "d", text: "Hydrogen bonding" },
            ],
            explanation:
              "Metallic bonding is described as the electrostatic attraction between a lattice of positive metal ions and a 'sea' of delocalized electrons that are free to move throughout the metal.",
          },
          {
            type: "fill",
            id: "bonding-l4",
            level: 4,
            prompt:
              "Sodium chloride has a melting point of 801°C. It has a ▁ lattice structure, meaning each Na⁺ ion is surrounded by six Cl⁻ ions.",
            answers: ["6:6 coordinate", "6:6", "six-six coordinate", "crystalline"],
            explanation:
              "NaCl has a 6:6 coordinate lattice: each Na⁺ ion is bonded to six Cl⁻ ions and vice versa. This regular, strongly-bonded structure requires a lot of energy to break — hence the high melting point of 801°C.",
          },
          {
            type: "short",
            id: "bonding-l6",
            level: 6,
            prompt:
              "Explain why ionic compounds are brittle but metals are malleable. Use the nature of the bonds in each material to justify your answer.",
            keywords: ["ionic", "brittle", "planes", "like-charged", "repel", "shatter", "metal", "malleable", "delocalized", "slide", "non-directional"],
            minKeywords: 4,
            sample:
              "Ionic compounds are brittle because their lattice contains alternating positive and negative ions. When stress is applied, planes of ions shift so that like-charged ions become adjacent — repulsion causes the crystal to shatter. In metals, cations can slide past each other without disruption because the delocalized electrons move with them, maintaining the metallic bonds throughout. The non-directional nature of metallic bonding allows reshaping without breaking — this is malleability.",
          },
          {
            type: "short",
            id: "bonding-l8",
            level: 8,
            prompt:
              "A student tests solid NaCl, molten NaCl, a sugar solution and solid copper with a conductivity probe. Predict the conductivity of each and explain using bonding theory.",
            keywords: ["solid nacl", "ions", "localized", "molten nacl", "free to move", "sugar", "covalent", "non-conductor", "copper", "delocalized", "electrons", "conductor"],
            minKeywords: 4,
            sample:
              "Solid NaCl: no conductivity — ions are in fixed lattice positions and cannot move to carry charge. Molten NaCl: good conductor — Na⁺ and Cl⁻ ions are free to move and carry charge. Sugar solution: no conductivity — sugar dissolves as neutral molecules with no ions in solution; covalent bonds are localized. Solid copper: excellent conductor — delocalized electrons in the metallic lattice carry charge throughout the solid.",
          },
        ],
      },
    },
    {
      id: "alloys",
      name: "Alloys",
      descriptor: "Explain the composition, structure and properties of alloys and relate them to applications.",
      guided: [
        {
          level: 2,
          body: "An alloy is a homogeneous mixture of two or more metals, or a metal combined with a non-metal alloying element. Common alloys include brass (copper + zinc), steel (iron + carbon + another metal), and stainless steel (iron + nickel + chromium). Alloys cannot be separated by mechanical methods.",
        },
        {
          level: 4,
          body: "Adding a different atom to a pure metal disrupts the regular lattice structure. The regular arrangement of cations in a pure metal means the planes slide easily past each other (malleability). The different-sized atoms in an alloy prevent the planes from sliding as easily — the alloy is less malleable but considerably stronger. Alloys can also have greater resistance to corrosion and greater magnetic properties.",
        },
        {
          level: 6,
          body: "Pure aluminium is soft, ductile and malleable with very high electrical conductivity. By adding small amounts of other metals, lightweight aluminium alloys are produced that are strong enough for aircraft wings and fuselage. Steel is iron combined with carbon (and sometimes tungsten). The carbon atoms sit between the iron cations, further disrupting lattice sliding and greatly increasing hardness and tensile strength. Stainless steel adds nickel and chromium — the chromium forms a protective oxide layer that resists corrosion.",
        },
        {
          level: 8,
          body: "The atomic radius of the alloying element determines how much lattice disruption occurs. If the alloying atom is similar in size to the host metal cation, it substitutes in the lattice (substitutional alloy — e.g. brass: Zn in Cu sites). If much smaller, it fits between the host cations (interstitial alloy — e.g. steel: small C atoms between Fe cations). Interstitial alloys tend to be harder and less ductile. In both cases, the result is that cations cannot slide over one another as easily — the alloy is stronger than the pure metal but less malleable. This is the structural explanation for why 'pure' metals are rarely used in engineering.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "alloys-l2",
            level: 2,
            prompt: "Which of the following is the correct composition of brass?",
            options: [
              { id: "a", text: "Iron and carbon" },
              { id: "b", text: "Iron, nickel and chromium" },
              { id: "c", text: "Copper and zinc", correct: true },
              { id: "d", text: "Aluminium and titanium" },
            ],
            explanation:
              "Brass is an alloy of copper and zinc. Steel is iron and carbon. Stainless steel is iron, nickel and chromium. These different compositions give each alloy its distinctive properties.",
          },
          {
            type: "fill",
            id: "alloys-l4",
            level: 4,
            prompt:
              "Adding a different-sized atom to a pure metal disrupts the regular ▁ structure, making the alloy less malleable but considerably stronger.",
            answers: ["lattice", "crystal lattice", "crystalline lattice"],
            explanation:
              "In a pure metal, cations are arranged in a regular lattice and planes can slide past each other (malleability). Adding differently-sized alloying atoms interrupts the regular arrangement, preventing easy sliding — the alloy is stronger but less malleable.",
          },
          {
            type: "short",
            id: "alloys-l6",
            level: 6,
            prompt:
              "Pure aluminium is soft and malleable. Explain why aluminium alloys used in aircraft wings are much stronger, using the structure of metallic bonding.",
            keywords: ["lattice", "disrupts", "regular", "different atom", "cations", "slide", "strength", "malleability", "alloy", "aluminium"],
            minKeywords: 3,
            sample:
              "In pure aluminium, cations are arranged in a regular lattice. When a force is applied, planes of cations slide past one another while the delocalized electron sea maintains bonding — this is malleability. In aluminium alloys, different-sized atoms are added, disrupting the regular lattice structure. The disruption prevents the cation planes from sliding easily, greatly increasing the strength of the material. The alloy is therefore strong enough for aircraft wings while still being much lighter than steel.",
          },
          {
            type: "short",
            id: "alloys-l8",
            level: 8,
            prompt:
              "Compare substitutional and interstitial alloys. Give one example of each and explain how the size of the alloying atom determines which type forms.",
            keywords: ["substitutional", "interstitial", "atomic radius", "size", "brass", "steel", "carbon", "zinc", "copper", "iron", "between", "replaces", "harder"],
            minKeywords: 4,
            sample:
              "In a substitutional alloy, the alloying atom is similar in size to the host metal cation and replaces it in the lattice — e.g. brass: zinc atoms substitute for copper atoms in the FCC copper lattice. In an interstitial alloy, the alloying atom is much smaller than the host and fits between the host cations — e.g. steel: small carbon atoms sit in the gaps between iron cations. Interstitial alloys tend to be harder and less ductile than substitutional alloys because the small atoms lock the lattice planes more rigidly. In both cases, disruption of the regular lattice is the structural reason for increased strength.",
          },
        ],
      },
    },
  ],
}
