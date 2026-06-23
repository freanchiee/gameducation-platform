import type { StrandhootPack } from "../engine/types"

export const interactionCritA: StrandhootPack = {
  slug: "interaction-crit-a",
  title: "Redox, Corrosion & Combustion",
  subject: "MYP Chemistry",
  criterion: "A",
  topic: "Redox reactions, corrosion, combustion & reactivity",
  accent: "#1b7888",
  icon: "⚡",
  statementOfInquiry:
    "The interactions between substances can sometimes be understood and predicted by examining the underlying processes.",
  estMinutes: 28,
  intro:
    "Unlock the hidden logic of chemical interactions — from the rusting of iron to the burning of fuels and the displacement of copper by zinc. Each strand targets a core concept from Chapter 8: Interaction, stepping up from recall to analysis.",
  badges: [
    {
      id: "redox-expert",
      label: "Redox Reader",
      icon: "🔄",
      description: "Reach Level 8 on Redox reactions & OILRIG",
      strandId: "redox",
      atLevel: 8,
    },
    {
      id: "corrosion-expert",
      label: "Corrosion Chemist",
      icon: "🔩",
      description: "Reach Level 8 on Corrosion & half-equations",
      strandId: "corrosion",
      atLevel: 8,
    },
    {
      id: "combustion-expert",
      label: "Combustion Master",
      icon: "🔥",
      description: "Reach Level 8 on Complete & incomplete combustion",
      strandId: "combustion",
      atLevel: 8,
    },
    {
      id: "reactivity-expert",
      label: "Reactivity Ranker",
      icon: "⚗️",
      description: "Reach Level 8 on Reactivity series & salt formation",
      strandId: "reactivity",
      atLevel: 8,
    },
    {
      id: "interaction-master",
      label: "Interaction Master",
      icon: "🏆",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Chapter 8: Interaction",
      blurb: "Redox, corrosion, combustion and reactivity",
      icon: "⚡",
    },
  ],
  strands: [
    {
      id: "redox",
      name: "Redox reactions & OILRIG",
      descriptor: "Define oxidation and reduction; identify them in equations using electron transfer.",
      guided: [
        {
          level: 2,
          body: "A redox reaction involves two linked processes: oxidation and reduction. They always occur together — one cannot happen without the other. The mnemonic OILRIG helps: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons).",
        },
        {
          level: 4,
          body: "Oxidation is also described as gaining oxygen or losing hydrogen; reduction is losing oxygen or gaining hydrogen. In the rusting of iron: 4Fe(s) + 3O₂(g) → 2Fe₂O₃(s). Iron is oxidised — it gains oxygen. The three main types of reactions chemists study are acid–base, precipitation, and redox reactions.",
        },
        {
          level: 6,
          body: "In the zinc–copper displacement reaction Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s), zinc loses 2 electrons (it is oxidised) and the Cu²⁺ ion gains 2 electrons (it is reduced). The net ionic equation is Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s). Spectator ions (SO₄²⁻) are removed from the full ionic equation because they appear unchanged on both sides.",
        },
        {
          level: 8,
          body: "Half-equations separate the oxidation and reduction steps: Zn(s) → Zn²⁺(aq) + 2e⁻ (oxidation) and Cu²⁺(aq) + 2e⁻ → Cu(s) (reduction). The electrons on each side must balance in number and sign. In the rusting half-equations: Fe(s) → Fe³⁺(aq) + 3e⁻ (oxidation) and O₂(g) + 4e⁻ → 2O²⁻(aq) (reduction). Identifying the oxidised and reduced species from half-equations is the deepest level of redox analysis.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "redox-l2",
            level: 2,
            prompt: "According to OILRIG, what happens to electrons during oxidation?",
            options: [
              { id: "a", text: "Electrons are gained" },
              { id: "b", text: "Electrons are lost", correct: true },
              { id: "c", text: "Electrons are shared equally" },
              { id: "d", text: "Electrons do not move" },
            ],
            explanation:
              "OILRIG: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons). In any redox reaction, the species that is oxidised loses electrons to the species being reduced.",
          },
          {
            type: "fill",
            id: "redox-l4",
            level: 4,
            prompt:
              "In the reaction 4Fe(s) + 3O₂(g) → 2Fe₂O₃(s), iron is ▁ because it gains oxygen.",
            answers: ["oxidised", "oxidized"],
            explanation:
              "Oxidation can be defined as gaining oxygen. Iron combines with oxygen to form iron(III) oxide (rust), so iron is oxidised. This is also the reason rusting is classified as a redox (specifically an oxidation) reaction.",
          },
          {
            type: "short",
            id: "redox-l6",
            level: 6,
            prompt:
              "In the reaction Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s), identify the species being oxidised and the species being reduced. Write the net ionic equation and explain what spectator ions are.",
            keywords: [
              "zinc",
              "oxidised",
              "cu²⁺",
              "reduced",
              "electrons",
              "spectator",
              "so₄²⁻",
              "net ionic",
              "unchanged",
              "gains",
            ],
            minKeywords: 3,
            sample:
              "Zinc is oxidised — it loses 2 electrons. Cu²⁺ ions are reduced — they gain 2 electrons. Net ionic equation: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s). Spectator ions (SO₄²⁻) appear unchanged on both sides of the full ionic equation and are removed to give the net ionic equation.",
          },
          {
            type: "short",
            id: "redox-l8",
            level: 8,
            prompt:
              "Write the two half-equations for the reaction between zinc and copper(II) sulfate. Show how they add together to give the net ionic equation. Identify which half-equation represents oxidation and which represents reduction.",
            keywords: [
              "zn(s)",
              "zn²⁺",
              "2e⁻",
              "cu²⁺",
              "cu(s)",
              "oxidation",
              "reduction",
              "half-equation",
              "electrons cancel",
              "balance",
            ],
            minKeywords: 4,
            sample:
              "Oxidation half-equation: Zn(s) → Zn²⁺(aq) + 2e⁻ (zinc loses 2 electrons). Reduction half-equation: Cu²⁺(aq) + 2e⁻ → Cu(s) (copper(II) ion gains 2 electrons). Adding them: the 2e⁻ cancel on each side, giving: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s). Zinc is oxidised; Cu²⁺ is reduced.",
          },
        ],
      },
    },
    {
      id: "corrosion",
      name: "Corrosion & its prevention",
      descriptor: "Explain corrosion as an oxidation reaction and describe prevention strategies.",
      guided: [
        {
          level: 2,
          body: "Corrosion is the oxidation of metals when exposed to oxygen. The most familiar example is rusting — iron reacts with oxygen to form iron(III) oxide (rust). The global annual cost of corrosion is estimated at US$2.5 trillion, more than 3% of the world's GDP.",
        },
        {
          level: 4,
          body: "The equation for rusting is: 4Fe(s) + 3O₂(g) → 2Fe₂O₃(s). The reaction is irreversible. Corrosion can be prevented by physical barriers such as paints, oils, and galvanising (coating with zinc). Sacrificial anodes — highly reactive metals such as zinc or magnesium attached to a structure — corrode preferentially, protecting the metal underneath.",
        },
        {
          level: 6,
          body: "Sacrificial anodes work because zinc and magnesium are higher in the reactivity series than iron. Since they are more reactive, they oxidise first, sacrificing themselves to protect the iron structure. Ships and pipelines use zinc or aluminium anodes; the anode corrodes slowly while the steel hull is protected. Without oxygen and water, rusting cannot occur — iron submerged in deoxygenated water does not rust.",
        },
        {
          level: 8,
          body: "Corrosion is a global systemic problem: utilities, transportation, infrastructure, and production sectors each face billions of dollars of damage annually. New approaches include ionic self-assembled monolayer (ISAM) coatings — ultrathin layers that inhibit corrosion without toxic heavy-metal primers. The half-equations for rusting: Fe(s) → Fe³⁺(aq) + 3e⁻ (oxidation of iron); O₂(g) + 4e⁻ → 2O²⁻(aq) (reduction of oxygen). Cathodic protection extends the sacrificial anode principle to buried pipelines and ship hulls by imposing an opposing electric current.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "corr-l2",
            level: 2,
            prompt: "Rusting is classified as which type of chemical reaction?",
            options: [
              { id: "a", text: "Neutralisation" },
              { id: "b", text: "Oxidation", correct: true },
              { id: "c", text: "Precipitation" },
              { id: "d", text: "Decomposition" },
            ],
            explanation:
              "Rusting is an oxidation reaction: iron gains oxygen to form iron(III) oxide. It is therefore also classified as a redox reaction. The global annual cost of corrosion exceeds US$2.5 trillion.",
          },
          {
            type: "fill",
            id: "corr-l4",
            level: 4,
            prompt:
              "A sacrificial anode is a highly reactive metal attached to a structure to corrode ▁, thereby protecting the metal underneath.",
            answers: ["preferentially", "first", "instead", "in preference"],
            explanation:
              "Because the sacrificial anode (e.g. zinc) is more reactive than the protected metal (e.g. iron), it oxidises preferentially. The anode slowly corrodes while the steel structure is protected. Ships and pipelines commonly use zinc anodes.",
          },
          {
            type: "short",
            id: "corr-l6",
            level: 6,
            prompt:
              "Explain why zinc is effective as a sacrificial anode for protecting a steel ship hull. Use the reactivity series in your answer.",
            keywords: [
              "zinc",
              "more reactive",
              "reactivity series",
              "oxidises",
              "iron",
              "preferentially",
              "sacrificial",
              "anode",
              "protect",
              "electrons",
            ],
            minKeywords: 3,
            sample:
              "Zinc is higher in the reactivity series than iron, meaning it is more reactive. When zinc is attached to a steel hull, it oxidises preferentially — losing electrons and corroding before the iron does. This protects the steel hull. As long as zinc remains, the hull cannot rust. The zinc anode is replaced periodically.",
          },
          {
            type: "short",
            id: "corr-l8",
            level: 8,
            prompt:
              "Write the two half-equations for the rusting of iron. Explain what conditions are required for rusting to occur and describe one modern approach to corrosion prevention beyond painting.",
            keywords: [
              "fe(s)",
              "fe³⁺",
              "3e⁻",
              "o₂",
              "reduction",
              "oxidation",
              "water",
              "oxygen",
              "isam",
              "cathodic",
              "sacrificial",
              "conditions",
            ],
            minKeywords: 3,
            sample:
              "Oxidation half-equation: Fe(s) → Fe³⁺(aq) + 3e⁻. Reduction half-equation: O₂(g) + 4e⁻ → 2O²⁻(aq). Both oxygen and water are required for rusting — iron in dry air or deoxygenated water does not rust. A modern approach is ISAM (ionic self-assembled monolayer) coating — an ultrathin layer that inhibits corrosion without toxic heavy-metal primers, suitable for ships, bridges and aircraft.",
          },
        ],
      },
    },
    {
      id: "combustion",
      name: "Complete & incomplete combustion",
      descriptor: "Write equations for complete and incomplete combustion of alkanes and explain the products.",
      guided: [
        {
          level: 2,
          body: "Alkanes are hydrocarbons with the general formula CₙH₂ₙ₊₂. When they burn in oxygen they undergo combustion — an exothermic oxidation reaction. When excess oxygen is available, complete combustion produces carbon dioxide and water.",
        },
        {
          level: 4,
          body: "Complete combustion of methane: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) + heat. If oxygen is limited, incomplete combustion produces carbon monoxide instead of carbon dioxide: 2CH₄(g) + 3O₂(g) → 2CO(g) + 4H₂O(g) + heat. Even less oxygen produces soot (carbon): CH₄(g) + O₂(g) → C(s) + 2H₂O(g) + heat. For methane, the CH₄:O₂ ratios are 1:2 (complete), 2:3 (CO), and 1:1 (soot).",
        },
        {
          level: 6,
          body: "Carbon monoxide (CO) is colorless, odorless, and extremely toxic. It binds to hemoglobin in red blood cells far more strongly than oxygen, blocking oxygen transport. Symptoms of CO poisoning include dizziness, nausea, and eventually coma and death. Combustion of butane: 2C₄H₁₀(g) + 13O₂(g) → 8CO₂(g) + 10H₂O(g) + heat. One mole of butane releases 2878 kJ of energy.",
        },
        {
          level: 8,
          body: "Gasoline and diesel are complex mixtures of alkanes, alkenes, and other components. Incomplete combustion produces CO, nitrogen oxides (NOₓ), and particulates in addition to CO₂ and water — all contributing to photochemical smog. LPG (propane C₃H₈ and butane C₄H₁₀) burns more completely than gasoline, reducing CO and particulate emissions. The Lancet estimated 9 million premature deaths globally in 2015 from diseases related to air pollution — roughly 16% of all deaths. Selecting a fuel with a higher H:C ratio (e.g. methane) reduces CO₂ per kJ of energy released.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "comb-l2",
            level: 2,
            prompt: "What are the products of the complete combustion of an alkane?",
            options: [
              { id: "a", text: "Carbon monoxide and water" },
              { id: "b", text: "Carbon (soot) and water" },
              { id: "c", text: "Carbon dioxide and water", correct: true },
              { id: "d", text: "Carbon dioxide and hydrogen" },
            ],
            explanation:
              "When excess oxygen is available, complete combustion of any hydrocarbon produces carbon dioxide (CO₂) and water (H₂O). The reaction is exothermic, releasing heat energy.",
          },
          {
            type: "fill",
            id: "comb-l4",
            level: 4,
            prompt:
              "When methane undergoes incomplete combustion with a limited oxygen supply (CH₄:O₂ ratio 2:3), the carbon-containing product is ▁ rather than carbon dioxide.",
            answers: ["carbon monoxide", "CO"],
            explanation:
              "With a restricted oxygen supply (2:3 ratio), incomplete combustion of methane produces carbon monoxide: 2CH₄(g) + 3O₂(g) → 2CO(g) + 4H₂O(g). Carbon monoxide is very poisonous because it binds to hemoglobin more strongly than oxygen.",
          },
          {
            type: "short",
            id: "comb-l6",
            level: 6,
            prompt:
              "Explain why carbon monoxide is dangerous to humans. In your answer, refer to hemoglobin and describe the symptoms of carbon monoxide poisoning.",
            keywords: [
              "hemoglobin",
              "binds",
              "oxygen",
              "blocks",
              "red blood cells",
              "oxygen carrying",
              "dizziness",
              "nausea",
              "coma",
              "poisonous",
            ],
            minKeywords: 3,
            sample:
              "Carbon monoxide binds to hemoglobin in red blood cells far more strongly than oxygen, blocking the sites where oxygen and carbon dioxide normally bind. This reduces the oxygen-carrying capacity of the blood. Symptoms of CO poisoning begin with dizziness and nausea, progressing to vomiting, tiredness, and eventually coma and death.",
          },
          {
            type: "short",
            id: "comb-l8",
            level: 8,
            prompt:
              "Write the balanced equation for the complete combustion of butane (C₄H₁₀). Explain why LPG-powered vehicles (propane and butane) produce less air pollution than gasoline vehicles, and name two pollutants produced by incomplete combustion of gasoline.",
            keywords: [
              "2c₄h₁₀",
              "13o₂",
              "8co₂",
              "10h₂o",
              "carbon monoxide",
              "nitrogen oxides",
              "particulates",
              "smog",
              "lpg",
              "complete",
              "cleaner",
            ],
            minKeywords: 3,
            sample:
              "2C₄H₁₀(g) + 13O₂(g) → 8CO₂(g) + 10H₂O(g) + heat. LPG burns more completely than gasoline because it is a simpler mixture of pure hydrocarbons (propane and butane) without the complex alkene and aromatic components of gasoline. This reduces the production of carbon monoxide, nitrogen oxides (NOₓ), and particulates, which contribute to photochemical smog and serious health impacts.",
          },
        ],
      },
    },
    {
      id: "reactivity",
      name: "Reactivity series & salt formation",
      descriptor: "Use the reactivity series to predict displacement reactions and name the salts formed.",
      guided: [
        {
          level: 2,
          body: "The reactivity series orders metals from most reactive (lithium, potassium) to least reactive (copper, silver, gold). A more reactive metal can displace a less reactive metal from its salt solution. Metals above hydrogen in the series react with acids to produce hydrogen gas and a salt.",
        },
        {
          level: 4,
          body: "When a metal reacts with an acid: metal + acid → salt + hydrogen. For example, magnesium reacts with hydrochloric acid: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g). The salt name comes from the metal (cation) plus the acid anion: hydrochloric acid → chloride salt; sulfuric acid → sulfate salt; nitric acid → nitrate salt.",
        },
        {
          level: 6,
          body: "The reactivity series can predict which displacement reactions will occur. Zinc displaces copper from copper(II) sulfate because zinc is above copper. Magnesium displaces iron from iron(III) chloride because magnesium is above iron. The rate of reaction with acid correlates with position in the series — magnesium reacts vigorously with HCl (rapid bubbling), while iron reacts slowly. Gold and platinum (below hydrogen) do not react with acids at all.",
        },
        {
          level: 8,
          body: "Single replacement reactions can be predicted exactly from the reactivity series and confirmed with the half-equations. For Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s): oxidation half-equation Fe(s) → Fe²⁺(aq) + 2e⁻; reduction half-equation Cu²⁺(aq) + 2e⁻ → Cu(s). Iron is above copper in the reactivity series, so the reaction proceeds. Reverse (Cu + FeSO₄) does not occur. The same principle explains why sacrificial anodes must use metals above the protected metal in the reactivity series — zinc (higher) protects iron (lower).",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "react-l2",
            level: 2,
            prompt:
              "Which of the following metals is the MOST reactive, based on the reactivity series from Chapter 8?",
            options: [
              { id: "a", text: "Copper" },
              { id: "b", text: "Iron" },
              { id: "c", text: "Zinc" },
              { id: "d", text: "Magnesium", correct: true },
            ],
            explanation:
              "The reactivity series (most to least reactive) includes: Li, K, Ba, Ca, Na, Mg, Al, C, Zn, Fe, Ni, Sn, Pb, H, Cu, Hg, Ag, Au, Pt. Magnesium is the most reactive among the four options listed.",
          },
          {
            type: "fill",
            id: "react-l4",
            level: 4,
            prompt:
              "When zinc reacts with sulfuric acid (H₂SO₄), the salt produced is zinc ▁.",
            answers: ["sulfate", "sulphate"],
            explanation:
              "Sulfuric acid produces sulfate salts. Zinc + sulfuric acid → zinc sulfate + hydrogen: Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g). The metal provides the cation (Zn²⁺) and the acid provides the anion (SO₄²⁻).",
          },
          {
            type: "short",
            id: "react-l6",
            level: 6,
            prompt:
              "Predict whether copper will react with iron(II) sulfate solution to displace iron. Use the reactivity series to justify your answer. Write the equation if a reaction occurs, or explain why no reaction occurs.",
            keywords: [
              "reactivity series",
              "copper",
              "iron",
              "below",
              "above",
              "no reaction",
              "less reactive",
              "cannot displace",
              "predict",
              "position",
            ],
            minKeywords: 3,
            sample:
              "No reaction will occur. Copper is below iron in the reactivity series, meaning copper is less reactive than iron. A metal can only displace another metal that is lower in the reactivity series than itself. Since copper is lower than iron, it cannot displace iron from iron(II) sulfate solution. The reverse reaction (iron + copper sulfate) does occur because iron is above copper.",
          },
          {
            type: "short",
            id: "react-l8",
            level: 8,
            prompt:
              "Write the balanced equation and the two half-equations for the reaction of iron with copper(II) sulfate solution. Identify which species is oxidised and which is reduced. Explain the link between this reaction and the use of sacrificial anodes.",
            keywords: [
              "fe(s)",
              "cuso₄",
              "feso₄",
              "cu(s)",
              "fe²⁺",
              "2e⁻",
              "oxidation",
              "reduction",
              "sacrificial",
              "zinc",
              "reactivity",
              "above",
            ],
            minKeywords: 4,
            sample:
              "Balanced equation: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s). Oxidation half-equation: Fe(s) → Fe²⁺(aq) + 2e⁻ (iron is oxidised, losing electrons). Reduction half-equation: Cu²⁺(aq) + 2e⁻ → Cu(s) (copper(II) ions are reduced, gaining electrons). This is directly linked to sacrificial anodes: zinc (higher in the series) is attached to iron structures, so zinc is preferentially oxidised (loses electrons) instead of iron. The zinc corrodes while the iron is protected.",
          },
        ],
      },
    },
  ],
}
