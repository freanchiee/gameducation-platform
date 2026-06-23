import type { StrandhootPack } from "../engine/types"

export const consequencesCritA: StrandhootPack = {
  slug: "consequences-crit-a",
  title: "Acids, Bases & the pH Scale",
  subject: "MYP Chemistry",
  criterion: "A",
  topic: "Acids, bases, pH and neutralisation",
  accent: "#1b7888",
  icon: "🧪",
  statementOfInquiry:
    "Change as a consequence of human development can be identified within all environments on our planet.",
  estMinutes: 28,
  intro:
    "From the gastric acid in your stomach (pH 1–3) to the alkaline oven cleaner on the shelf (pH 14), acids and bases shape chemistry in every environment. This pack takes you from Arrhenius definitions and the pH scale through strong/weak dissociation, indicators, neutralisation reactions and the reactivity series — levelling up from recall to analysis.",
  badges: [
    {
      id: "ph-master",
      label: "pH Scale Pro",
      icon: "📊",
      description: "Reach Level 8 on the pH scale strand",
      strandId: "ph-scale",
      atLevel: 8,
    },
    {
      id: "neutraliser",
      label: "Neutraliser",
      icon: "⚗️",
      description: "Reach Level 8 on Neutralisation reactions",
      strandId: "neutralisation",
      atLevel: 8,
    },
    {
      id: "reactivity-ace",
      label: "Reactivity Ace",
      icon: "⚡",
      description: "Reach Level 8 on the Reactivity series",
      strandId: "reactivity",
      atLevel: 8,
    },
    {
      id: "consequences-a-master",
      label: "Consequences Champion",
      icon: "🏆",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Chapter 3: Consequences",
      blurb: "Acids, bases, pH, neutralisation and the reactivity series",
      icon: "🧪",
    },
  ],
  strands: [
    {
      id: "acid-base-definitions",
      name: "Acids and bases — definitions & properties",
      descriptor:
        "Define acids and bases using the Arrhenius model and describe their characteristic properties.",
      guided: [
        {
          level: 2,
          body: "An acid is a substance with a sour taste that turns blue litmus red. A base is a substance with a bitter taste that turns red litmus blue. A base that dissolves in water is called an alkali. Everyday acids include citric acid (C₆H₈O₇) in lemons and ethanoic acid (C₂H₄O₂) in vinegar.",
        },
        {
          level: 4,
          body: "Arrhenius definition: an acid ionises in water to produce hydrogen ions, H⁺(aq); an alkali ionises in water to produce hydroxide ions, OH⁻(aq). Strong acids (e.g. hydrochloric acid, HCl) fully dissociate: HCl(aq) → H⁺(aq) + Cl⁻(aq). Key properties: acids have pH < 7; bases have pH > 7; neutral solutions have pH = 7.",
        },
        {
          level: 6,
          body: "Weak acids only partially dissociate — the reaction reaches equilibrium. Ethanoic acid (CH₃COOH) is a weak acid found in vinegar: CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq). The equilibrium position favours the reactant side, so most molecules remain undissociated. Strength (strong vs weak) is different from concentration (concentrated vs dilute): a dilute solution of HCl is still a strong acid.",
        },
        {
          level: 8,
          body: "Strong acids fully dissociate because the conjugate base (e.g. Cl⁻ from HCl) has no affinity for H⁺ ions. In contrast, the ethanoate ion CH₃COO⁻ has a strong affinity for H⁺, pulling the equilibrium back towards the undissociated acid. Ammonia (NH₃) is a weak base: NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq). The stomach (pH 1–3) uses HCl as a strong acid to activate the enzyme pepsin from its inactive precursor pepsinogen — the low pH is a direct consequence of full dissociation of gastric HCl.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "ab-l2",
            level: 2,
            prompt:
              "According to the Arrhenius definition, what does an acid produce when it dissolves in water?",
            options: [
              { id: "a", text: "Hydroxide ions, OH⁻" },
              { id: "b", text: "Hydrogen ions, H⁺", correct: true },
              { id: "c", text: "Water molecules, H₂O" },
              { id: "d", text: "Chloride ions, Cl⁻" },
            ],
            explanation:
              "Arrhenius defined an acid as a substance that ionises in water to produce hydrogen ions H⁺. Alkalis produce hydroxide ions OH⁻.",
          },
          {
            type: "fill",
            id: "ab-l4",
            level: 4,
            prompt:
              "Hydrochloric acid is described as a strong acid because it ▁ completely in water.",
            answers: ["dissociates", "ionises", "ionizes"],
            explanation:
              "Strong acids fully dissociate (ionise) in water — all the acid molecules break apart into ions. Weak acids only partially dissociate, establishing an equilibrium.",
          },
          {
            type: "short",
            id: "ab-l6",
            level: 6,
            prompt:
              "Explain the difference between a strong acid and a concentrated acid. Use ethanoic acid as an example in your answer.",
            keywords: [
              "strong",
              "weak",
              "dissociate",
              "concentration",
              "partial",
              "equilibrium",
              "ethanoic",
              "dilute",
              "fully",
            ],
            minKeywords: 3,
            sample:
              "Strength refers to how fully an acid dissociates in water, while concentration refers to how many moles of acid are dissolved per litre. Ethanoic acid (vinegar) is a weak acid — it only partially dissociates, establishing an equilibrium: CH₃COOH ⇌ H⁺ + CH₃COO⁻. However, it can be prepared as a concentrated or dilute solution. A dilute solution of hydrochloric acid (a strong acid) still dissociates completely, even though few moles are present.",
          },
          {
            type: "short",
            id: "ab-l8",
            level: 8,
            prompt:
              "Explain why hydrochloric acid is a strong acid while ethanoic acid is a weak acid. In your answer, refer to the affinity of the conjugate bases for H⁺ ions and use an equilibrium equation for ethanoic acid.",
            keywords: [
              "conjugate base",
              "affinity",
              "chloride",
              "ethanoate",
              "equilibrium",
              "dissociate",
              "fully",
              "partial",
              "ch3coo",
              "cl",
            ],
            minKeywords: 3,
            sample:
              "HCl is a strong acid because its conjugate base, the chloride ion Cl⁻, has no affinity for H⁺ — so the dissociation goes to completion: HCl(aq) → H⁺(aq) + Cl⁻(aq). Ethanoic acid is weak because its conjugate base, the ethanoate ion CH₃COO⁻, has a high affinity for H⁺, pulling the equilibrium back: CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq). Most molecules remain undissociated — the equilibrium favours the reactant side.",
          },
        ],
      },
    },
    {
      id: "ph-scale",
      name: "The pH scale",
      descriptor:
        "Use the pH scale and the formula pH = −log₁₀[H⁺] to calculate and interpret pH values.",
      guided: [
        {
          level: 2,
          body: "The pH scale runs from 0 to 14. Acidic solutions have pH < 7; neutral solutions have pH = 7; alkaline solutions have pH > 7. Indicators change colour depending on pH: litmus is red in acid and blue in alkali; universal indicator gives a range of colours matching a colour chart.",
        },
        {
          level: 4,
          body: "The pH scale is logarithmic — each unit change in pH corresponds to a 10-fold change in hydrogen ion concentration. Water at pH 7.0 has [H⁺] = 1.0 × 10⁻⁷ mol dm⁻³. Milk at pH 6.0 has [H⁺] = 1.0 × 10⁻⁶ mol dm⁻³ — 10 times more acidic. Black coffee at pH 5.0 has [H⁺] = 1.0 × 10⁻⁵ mol dm⁻³ — 100 times more acidic than water.",
        },
        {
          level: 6,
          body: "The relationship between pH and hydrogen ion concentration is: pH = −log₁₀[H⁺]. For a solution where [H⁺] = 0.01 mol dm⁻³: pH = −log₁₀(0.01) = −log₁₀(10⁻²) = 2. For [H⁺] = 1.0 × 10⁻⁴ mol dm⁻³: pH = −(−4) = 4. The choice of indicator for a titration depends on the strength of the acid and base: phenolphthalein (colourless → pink) is used for weak acid–strong base titrations.",
        },
        {
          level: 8,
          body: "Acid rain typically has pH 4.2–4.4, compared to normal rain at pH 5.6 (slightly acidic because dissolved CO₂ forms carbonic acid). A pH difference of 1.4 means acid rain has 10^1.4 ≈ 25 times greater [H⁺] than normal rain. The key indicator choice rule: phenol red (yellow in acid, red in base) suits strong acid–strong base titrations; methyl orange (red in acid, yellow in base) suits strong acid–weak base; phenolphthalein suits weak acid–strong base. This is because the equivalence point pH differs depending on the strength of the acid and base.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "ph-l2",
            level: 2,
            prompt: "Which statement correctly describes the pH scale?",
            options: [
              { id: "a", text: "pH 7 is acidic; pH below 7 is neutral" },
              {
                id: "b",
                text: "pH below 7 is acidic; pH 7 is neutral; pH above 7 is alkaline",
                correct: true,
              },
              { id: "c", text: "The scale only runs from 0 to 7" },
              { id: "d", text: "A lower pH number means a less acidic solution" },
            ],
            explanation:
              "The pH scale runs 0–14. Below 7 = acidic; 7 = neutral; above 7 = alkaline. The lower the pH, the more acidic the solution.",
          },
          {
            type: "fill",
            id: "ph-l4",
            level: 4,
            prompt:
              "The pH scale is ▁, meaning each unit change in pH corresponds to a 10-fold change in hydrogen ion concentration.",
            answers: ["logarithmic", "log scale", "log"],
            explanation:
              "The pH scale is logarithmic (base 10). A change of 1 pH unit means the hydrogen ion concentration changes by a factor of 10 — so gastric juice at pH 1 is 1,000,000 times more acidic than pure water at pH 7.",
          },
          {
            type: "short",
            id: "ph-l6",
            level: 6,
            prompt:
              "Using the formula pH = −log₁₀[H⁺], calculate the pH of a solution where [H⁺] = 1.0 × 10⁻⁴ mol dm⁻³. Then explain which colour phenolphthalein would show in this solution.",
            keywords: [
              "ph",
              "4",
              "log",
              "formula",
              "acidic",
              "colourless",
              "colorless",
              "phenolphthalein",
              "indicator",
              "acid",
            ],
            minKeywords: 3,
            sample:
              "pH = −log₁₀(1.0 × 10⁻⁴) = −(−4) = 4. This is an acidic solution (pH < 7). Phenolphthalein is colourless in acidic solutions — it only turns pink in alkaline (basic) conditions above approximately pH 8.3.",
          },
          {
            type: "short",
            id: "ph-l8",
            level: 8,
            prompt:
              "Acid rain has a pH of approximately 4.2–4.4, while normal rain has a pH of about 5.6. Calculate how many times greater the hydrogen ion concentration is in acid rain compared to normal rain. Explain why this matters for aquatic ecosystems.",
            keywords: [
              "logarithmic",
              "10",
              "times",
              "concentration",
              "aquatic",
              "fish",
              "aluminium",
              "soil",
              "spawning",
              "dissolved",
              "ph difference",
            ],
            minKeywords: 3,
            sample:
              "The pH difference is approximately 5.6 − 4.3 = 1.3 units. Since the scale is logarithmic, [H⁺] in acid rain is 10^1.3 ≈ 20 times greater. This matters because aquatic organisms such as fish can only tolerate small pH changes. Increased acidity dissolves aluminium compounds in soil, carrying aluminium ions into waterways where they are toxic to fish. Changes in pH also affect egg hatching and spawning, threatening entire populations.",
          },
        ],
      },
    },
    {
      id: "neutralisation",
      name: "Neutralisation reactions & formation of salts",
      descriptor:
        "Write and balance equations for neutralisation reactions and predict the salt formed.",
      guided: [
        {
          level: 2,
          body: "A neutralisation reaction occurs when an acid and a base react together. The general word equation is: acid + base → a salt + water. It is an exothermic reaction — heat is released. For example, hydrochloric acid and sodium hydroxide react to form sodium chloride (table salt) and water.",
        },
        {
          level: 4,
          body: "The acid determines the type of salt formed: hydrochloric acid produces chloride salts; sulfuric acid produces sulfate salts; nitric acid produces nitrate salts. Equation: HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l). A salt is made up of a cation (positive ion from the base) and an anion (negative ion from the acid).",
        },
        {
          level: 6,
          body: "Reaction of calcium carbonate (limestone) with hydrochloric acid: CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g). This reaction explains how acid rain erodes limestone buildings and marble statues — calcium carbonate undergoes neutralisation with sulfuric acid in the rain: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂. Indicators detect the endpoint: universal indicator turns green at neutrality.",
        },
        {
          level: 8,
          body: "The ionic equation for any neutralisation reaction is: H⁺(aq) + OH⁻(aq) → H₂O(l) — the spectator ions cancel. This shows that neutralisation is fundamentally a reaction between H⁺ and OH⁻. The reaction is always exothermic because forming O–H bonds in water releases more energy than breaking the O–H and H–O bonds in the reactants. When limestone reacts with acid rain, the CaSO₄ formed is sparingly soluble, so it coats the surface and slows further erosion — yet over decades the damage is cumulative and irreversible.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "neut-l2",
            level: 2,
            prompt:
              "What type of reaction occurs when an acid reacts with a base?",
            options: [
              { id: "a", text: "Combustion reaction" },
              { id: "b", text: "Displacement reaction" },
              { id: "c", text: "Neutralisation reaction", correct: true },
              { id: "d", text: "Decomposition reaction" },
            ],
            explanation:
              "A neutralisation reaction occurs when an acid and a base react together to produce a salt and water. It is always exothermic.",
          },
          {
            type: "fill",
            id: "neut-l4",
            level: 4,
            prompt:
              "When sulfuric acid reacts with a base, it always produces ▁ salts.",
            answers: ["sulfate", "sulphate"],
            explanation:
              "The acid determines the anion in the salt: sulfuric acid → sulfate salts; hydrochloric acid → chloride salts; nitric acid → nitrate salts.",
          },
          {
            type: "short",
            id: "neut-l6",
            level: 6,
            prompt:
              "Write a balanced equation for the reaction between calcium carbonate and hydrochloric acid. Explain how this reaction is relevant to the damage acid rain causes to limestone buildings.",
            keywords: [
              "caco3",
              "hcl",
              "cacl2",
              "co2",
              "h2o",
              "balanced",
              "acid rain",
              "limestone",
              "erodes",
              "neutralisation",
            ],
            minKeywords: 3,
            sample:
              "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g). This is relevant because limestone buildings are made largely of calcium carbonate. When acid rain (containing sulfuric and nitric acids) falls on them, a neutralisation reaction occurs that dissolves the CaCO₃, producing CO₂ gas and soluble calcium salts. Over time this erodes and weakens the stone.",
          },
          {
            type: "short",
            id: "neut-l8",
            level: 8,
            prompt:
              "Write the net ionic equation for any neutralisation reaction between a strong acid and a strong base. Explain why this equation is the same regardless of which specific acid and base are used.",
            keywords: [
              "h+",
              "oh-",
              "h2o",
              "ionic",
              "spectator",
              "cancel",
              "net ionic",
              "same",
              "exothermic",
              "bond",
            ],
            minKeywords: 3,
            sample:
              "The net ionic equation is: H⁺(aq) + OH⁻(aq) → H₂O(l). It is the same regardless of which specific strong acid and base are used because the other ions (e.g. Na⁺ and Cl⁻ in NaCl) are spectator ions — they do not participate in the reaction and cancel from both sides. The core chemistry is always the formation of water from H⁺ and OH⁻, which is exothermic because the O–H bonds formed in water release more energy than is needed to separate the ions.",
          },
        ],
      },
    },
    {
      id: "reactivity",
      name: "Reactivity series & metal–acid reactions",
      descriptor:
        "Use the reactivity series to predict and explain reactions between metals and acids.",
      guided: [
        {
          level: 2,
          body: "The reactivity series lists metals from most reactive (potassium at the top) to least reactive (platinum at the bottom). Metals above hydrogen in the series will react with acids to produce a salt and hydrogen gas. The more reactive the metal, the more vigorous the reaction.",
        },
        {
          level: 4,
          body: "Order (most to least reactive): K, Na, Ca, Mg, Al, (C), Zn, Fe, Sn, Pb, (H), Cu, Ag, Au, Pt. Magnesium is above hydrogen, so it reacts with hydrochloric acid: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g). Copper is below hydrogen, so it does not react with dilute hydrochloric acid. The presence of hydrogen gas is confirmed by the 'pop test' — a lit wooden splint held at the mouth of a test tube gives a squeaky pop.",
        },
        {
          level: 6,
          body: "Reactivity reflects the tendency to lose electrons and form cations. More reactive metals have a greater tendency to be oxidised (lose electrons). Displacement reactions follow the same principle: a more reactive metal displaces a less reactive metal from its salt solution. Iron is less reactive than magnesium: in a race to react with dilute H₂SO₄, the Mg reaction would be much more vigorous and faster, producing more hydrogen gas in less time. This is the basis of the 'rate of reaction' investigations using gas collection.",
        },
        {
          level: 8,
          body: "Precious metals (gold, platinum) are found in their 'native' unreacted state in the Earth's crust because they have so little tendency to lose electrons that they are not oxidised by natural processes. In contrast, reactive metals like sodium and potassium are found only as compounds (e.g. NaCl, KNO₃) — their high reactivity means they react immediately with water and oxygen. The reactivity series also underpins extraction methods: metals above carbon require electrolysis to extract (e.g. Al, Na), while metals below carbon can be reduced by heating with coke (e.g. Fe₂O₃ + 3C → 2Fe + 3CO₂). This has huge industrial and environmental consequences — aluminium production is enormously energy-intensive.",
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
              "Which of the following metals will react with dilute hydrochloric acid to produce hydrogen gas?",
            options: [
              { id: "a", text: "Copper" },
              { id: "b", text: "Gold" },
              { id: "c", text: "Magnesium", correct: true },
              { id: "d", text: "Platinum" },
            ],
            explanation:
              "Only metals above hydrogen in the reactivity series react with dilute acids to produce hydrogen. Magnesium is above hydrogen; copper, gold and platinum are below it and do not react.",
          },
          {
            type: "fill",
            id: "react-l4",
            level: 4,
            prompt:
              "In the pop test, hydrogen gas produces a ▁ sound when a lit wooden splint is held at the mouth of the test tube.",
            answers: ["squeaky pop", "pop", "squeaky"],
            explanation:
              "Hydrogen gas burns rapidly in air with a characteristic 'squeaky pop' sound. The small explosion occurs as hydrogen combines with oxygen in the air in a combustion reaction.",
          },
          {
            type: "short",
            id: "react-l6",
            level: 6,
            prompt:
              "Write a balanced equation for the reaction of magnesium with hydrochloric acid. Explain why zinc would react more slowly than magnesium in the same acid.",
            keywords: [
              "mg",
              "hcl",
              "mgcl2",
              "h2",
              "balanced",
              "zinc",
              "reactivity",
              "less reactive",
              "slower",
              "electrons",
            ],
            minKeywords: 3,
            sample:
              "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g). Zinc is less reactive than magnesium in the reactivity series because zinc has a lower tendency to lose electrons and form cations. Therefore zinc reacts more slowly with the same hydrochloric acid — less vigorous fizzing, less hydrogen gas produced per unit time. The rate of reaction is directly related to the metal's position in the reactivity series.",
          },
          {
            type: "short",
            id: "react-l8",
            level: 8,
            prompt:
              "Gold is found in its native state in the Earth's crust, while aluminium is always found as a compound. Use the reactivity series to explain this difference, and describe what this means for how each metal is extracted industrially.",
            keywords: [
              "gold",
              "aluminium",
              "native",
              "electrons",
              "oxidised",
              "compound",
              "electrolysis",
              "coke",
              "carbon",
              "extraction",
              "reactive",
              "energy",
            ],
            minKeywords: 4,
            sample:
              "Gold is at the bottom of the reactivity series — it has almost no tendency to lose electrons and form ions, so it is not oxidised by oxygen or water in nature and is found as pure metal. Aluminium is high in the reactivity series — it readily loses electrons and forms Al³⁺, so it always exists as compounds (e.g. in bauxite, Al₂O₃). Extracting aluminium requires electrolysis because it is too reactive to be reduced by carbon; this makes aluminium production extremely energy-intensive. Gold can simply be mined physically.",
          },
        ],
      },
    },
  ],
}
