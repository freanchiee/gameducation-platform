import type { StrandhootPack } from "../engine/types"

export const conditionsCritD: StrandhootPack = {
  slug: "conditions-crit-d",
  title: "Conditions, Catalysts & the Planet",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Impacts of controlling reaction rates",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry:
    "Scientific innovations advance a scientist's ability to monitor changes in conditions and the effect they have on the rate of a chemical reaction.",
  estMinutes: 27,
  intro:
    "Controlling the conditions of chemical reactions has transformed industry and life on Earth — but it has also produced unintended consequences, from ozone depletion to explosive sugar dust. Reflect on what it means to innovate responsibly when reaction conditions can both benefit and harm the planet.",
  badges: [
    {
      id: "applicator",
      label: "Real World Link",
      icon: "🌍",
      description: "Reach Level 8 on Applications",
      strandId: "applications",
      atLevel: 8,
    },
    {
      id: "critic",
      label: "Impact Analyst",
      icon: "⚠️",
      description: "Reach Level 8 on Implications & impacts",
      strandId: "impacts",
      atLevel: 8,
    },
    {
      id: "judge",
      label: "Evidence Judge",
      icon: "⚖️",
      description: "Reach Level 8 on Making a judgement",
      strandId: "judgement",
      atLevel: 8,
    },
    {
      id: "communicator",
      label: "Science Voice",
      icon: "📢",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Conditions in context",
      blurb: "Catalysts, ozone depletion, green chemistry, and industrial innovation",
      icon: "🏭",
    },
  ],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor:
        "Identify and explain real-world applications of controlling reaction conditions and catalysts.",
      guided: [
        {
          level: 2,
          body: "Catalysts are used in industry to speed up chemical reactions without being used up themselves. The textbook states that catalysts are used in approximately 90% of processes in the chemical industry, including the production of fuels, plastics, drugs and fertilizers.",
        },
        {
          level: 4,
          body: "Applications of catalysts from the chapter: (1) Industrial synthesis — at least 15 Nobel Prizes have been awarded for work on catalysis. (2) The Monsanto process for acetic (ethanoic) acid reacts methanol with carbon monoxide; small changes to reaction conditions and catalysts increased the atom economy from 35% to 100% — all reactants converted to the preferred product. (3) Ozone layer maintenance — the natural ozone cycle uses UV radiation as the energy input and the system acts as a giant catalytic filter.",
        },
        {
          level: 6,
          body: "Cutting-edge catalyst applications (from the Nature article in the textbook): chemists are developing homogeneous catalysts — metal ion complexes surrounded by 'ligands' that control which reactions occur. These allow chemists to 'skip reaction steps, reduce waste, minimise energy use and do more with less.' New approaches include light-activated catalysts, DNA-helix catalysts, and computational modelling to design catalysts at the atomic scale. Green chemistry principle: prevent pollution before it happens by choosing reaction conditions and catalysts that generate no unwanted by-products.",
        },
        {
          level: 8,
          body: "Quantified industrial scale: catalysts are used in ~90% of industrial chemical processes. The Monsanto acetic acid process: atom economy from 35% → 100% — every atom of reactant ends up in the product, producing zero waste. Annual number of publications on catalysis has tripled in the past decade. The pivot to Earth-abundant catalysts (iron, nickel, copper) instead of platinum, palladium, iridium and ruthenium is driven by sustainability: rare metals are finite resources. Green Haber using renewable H₂ and iron-based catalysts, if scaled, could eliminate 1–2% of global energy consumption currently used by the conventional process.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "According to the textbook, approximately what percentage of industrial chemical processes use catalysts?",
            options: [
              { id: "a", text: "10%" },
              { id: "b", text: "50%" },
              { id: "c", text: "75%" },
              { id: "d", text: "90%", correct: true },
            ],
            explanation:
              "The Nature article featured in the textbook states that catalysts are used in some 90% of processes in the chemical industry, and are essential for the production of fuels, plastics, drugs and fertilizers.",
          },
          {
            id: "s2",
            prompt:
              "The Monsanto process for making acetic acid has an atom economy of 100%. What does this mean?",
            options: [
              { id: "a", text: "The reaction is 100% fast" },
              { id: "b", text: "All atoms in the reactants end up in the desired product, with no waste", correct: true },
              { id: "c", text: "The catalyst costs 100 times less than before" },
              { id: "d", text: "The reaction requires 100°C" },
            ],
            explanation:
              "Atom economy = (mass of desired product / total mass of reactants) × 100%. A 100% atom economy means every atom in the reactants is incorporated into the desired product — zero waste atoms. Previous methods had only 35% atom economy.",
          },
        ],
        prompt:
          "Describe at least three real-world applications of controlling reaction conditions or using catalysts. Consider industrial, environmental and everyday contexts.",
        scaffolds: [
          "Catalysts are used in approximately __% of industrial processes, including...",
          "The Monsanto process is significant because it increased atom economy from __ to __%, meaning...",
          "Green chemistry applies the principle of...",
          "A cutting-edge application of catalysis is...",
          "Using Earth-abundant metals like iron or copper instead of platinum matters because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one application of catalysts or reaction conditions.",
            keywords: [
              "catalyst",
              "industry",
              "fuel",
              "plastic",
              "drug",
              "fertilizer",
              "reaction",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two or more applications with brief explanations.",
            keywords: [
              "monsanto",
              "acetic acid",
              "atom economy",
              "catalyst",
              "90%",
              "green chemistry",
              "ozone",
              "nobel",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Multiple applications across sectors; green chemistry principle stated; cutting-edge example.",
            keywords: [
              "90%",
              "atom economy",
              "100%",
              "waste",
              "green chemistry",
              "homogeneous",
              "ligands",
              "light-activated",
              "computational",
              "prevent pollution",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Quantified impacts; finite resources linked to Earth-abundant metals; green Haber mentioned.",
            keywords: [
              "90% of processes",
              "35%",
              "100%",
              "tripled",
              "earth-abundant",
              "iron",
              "nickel",
              "palladium",
              "finite",
              "green haber",
              "renewable",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor:
        "Evaluate the environmental, social and economic impacts of changing reaction conditions — including ozone depletion and industrial hazards.",
      guided: [
        {
          level: 2,
          body: "Changing reaction conditions can have unexpected environmental consequences. CFCs (chlorofluorocarbons), used as cooling agents in air conditioning and refrigerators, were thought to be harmless. When they reached the stratosphere, UV radiation caused them to decompose, releasing chlorine atoms that act as catalysts for ozone destruction.",
        },
        {
          level: 4,
          body: "Two categories of impact: (1) Environmental — CFCs release chlorine in the stratosphere; chlorine catalyses ozone destruction (O₃ → O₂ + O, repeatedly); since catalysts are not consumed, a small amount of chlorine can destroy large amounts of ozone. This increases UV radiation reaching Earth's surface, causing an increase in skin cancers and eye diseases. (2) Industrial safety — increasing the surface area of reactive solids can produce explosive reactions; in 2008, combustible sugar dust caused a fatal explosion at a US refinery.",
        },
        {
          level: 6,
          body: "Multi-level impacts: Environmental — the ozone layer sits 10–50 km above Earth's surface; its depletion represents a large-scale, global environmental impact from a single category of industrial chemical (CFCs). Social — increased UV radiation disproportionately affects people in high-altitude and polar regions (closer to the ozone hole). Economic — the Montreal Protocol (1987) phased out CFCs globally; transitioning to HFCs required costly industrial redesign. Industrial hazard — sugar dust, flour dust, coal dust, and metal powders are all explosive when finely divided, because surface area dramatically increases the rate of oxidation.",
        },
        {
          level: 8,
          body: "Systemic analysis: CFCs were introduced as a technological solution (safe refrigerants) but caused an unforeseen systemic environmental impact through an unintended catalytic pathway. This exemplifies the 'technology-risk paradox' — innovations solve one problem while creating another. The ozone depletion case established the scientific principle that a catalyst present in trace quantities can have disproportionately large environmental effects (a small amount of Cl can destroy millions of O₃ molecules). This directly parallels industrial catalysis: the same property (not consumed; cycles repeatedly) that makes catalysts economically valuable makes them environmentally hazardous when they end up in the wrong system.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "How do CFCs (chlorofluorocarbons) cause ozone depletion in the stratosphere?",
            options: [
              { id: "a", text: "CFCs directly block UV radiation from reaching the ozone layer" },
              {
                id: "b",
                text: "CFCs decompose under UV radiation to release chlorine, which acts as a catalyst to split ozone",
                correct: true,
              },
              { id: "c", text: "CFCs react with oxygen to produce ozone" },
              { id: "d", text: "CFCs absorb heat from the ozone layer and warm it" },
            ],
            explanation:
              "In the stratosphere, UV radiation decomposes CFCs to release chlorine atoms. Chlorine then catalyses the reaction O₃ → O₂ + O, and is not consumed — so a single chlorine atom can destroy thousands of ozone molecules.",
          },
        ],
        prompt:
          "Evaluate the environmental, social and economic impacts of at least two situations in this chapter where changing conditions (temperature, surface area, or catalysts) had significant real-world consequences.",
        scaffolds: [
          "Environmental impact: CFCs in the stratosphere led to...",
          "Since chlorine is a catalyst (not consumed), it can...",
          "This increases UV radiation reaching Earth's surface, which causes...",
          "Social impact: communities affected include...",
          "The 2008 sugar dust explosion shows that increasing surface area...",
          "Industrial safety precaution: factories that use fine powders must...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one impact.",
            keywords: [
              "ozone",
              "cfc",
              "uv",
              "cancer",
              "explosion",
              "surface area",
              "environment",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two categories of impact with brief explanations.",
            keywords: [
              "ozone depletion",
              "uv radiation",
              "skin cancer",
              "cfc",
              "chlorine",
              "sugar dust",
              "explosion",
              "surface area",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Environmental, social and economic impacts with scientific reasoning; Montreal Protocol mentioned.",
            keywords: [
              "chlorine",
              "catalyst",
              "not consumed",
              "ozone",
              "uv",
              "skin cancer",
              "eye disease",
              "montreal protocol",
              "hfc",
              "sugar dust",
              "filter",
              "refinery",
            ],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor: "Systemic analysis: technology-risk paradox; trace catalysts causing disproportionate global effects.",
            keywords: [
              "systemic",
              "technology-risk",
              "paradox",
              "trace",
              "disproportionate",
              "not consumed",
              "cycles",
              "stratosphere",
              "10-50 km",
              "montreal",
              "unforeseen",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor:
        "Weigh the benefits and costs of scientific innovation in controlling reaction conditions and form an evidence-based position.",
      guided: [
        {
          level: 2,
          body: "'Scientific innovation in reaction conditions is good because it makes processes faster and cheaper.' — A simple opinion without evidence or nuance.",
        },
        {
          level: 4,
          body: "'Scientific innovations like catalysts have enabled efficient production of drugs, fuels, and plastics, benefitting billions of people. However, the CFC example shows that innovations can have serious unintended consequences such as ozone depletion. On balance, innovation is positive, but scientists must carefully evaluate potential side effects.'",
        },
        {
          level: 6,
          body: "A balanced judgement considers multiple stakeholders: the chemical industry (benefits: lower energy costs, higher yields, 100% atom economy); environmental scientists (concerns: ozone depletion, explosive industrial hazards); communities near factories (risks: accidents like the 2008 sugar dust explosion); developing nations (question: do they share equally in the benefits of industrial catalysis?). The statement of inquiry itself — 'scientific innovations advance a scientist's ability to monitor changes in conditions' — implies an ongoing improvement that requires active monitoring precisely because conditions matter so much.",
        },
        {
          level: 8,
          body: "A nuanced judgement weighs: short-term benefits (lower costs, higher yields, fewer by-products) vs long-term systemic risks (unforeseen catalytic pathways, industrial hazards from scale-up); distribution of benefits (wealthy nations access cutting-edge green chemistry; developing nations may still use older, more polluting methods); quality of evidence (CFC-ozone link was scientifically established; industry initially disputed it); precautionary principle — the burden of proof should fall on demonstrating safety before widespread industrial use. Conclusion: innovation in reaction conditions is a net positive, but only if coupled with rigorous environmental monitoring, international agreements, and transition strategies for those disadvantaged by change.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "A chemical company can increase its production rate by grinding reactants into a very fine powder, increasing surface area. What is the main industrial safety risk of this approach?",
            options: [
              { id: "a", text: "The powder will dissolve in the reactants" },
              { id: "b", text: "Fine powder suspended in air can ignite explosively if exposed to a spark", correct: true },
              { id: "c", text: "The powder will increase the activation energy" },
              { id: "d", text: "The powder reacts more slowly with gases" },
            ],
            explanation:
              "Very fine powders (sugar, flour, coal, metals) have enormous surface areas. When suspended in air, the rate of oxidation is so fast that ignition produces an explosion rather than a steady burn. Sugar refineries filter the air and ban sources of ignition for this reason.",
          },
        ],
        prompt:
          "Is scientific innovation in reaction conditions and catalysis a net positive for humanity and the planet? Construct a reasoned, evidence-based judgement that weighs the trade-offs from this chapter.",
        scaffolds: [
          "Evidence supporting the benefits of innovation includes...",
          "Evidence of risks or costs includes...",
          "Different stakeholders view this differently — for example, a chemical engineer might say... whereas an environmental scientist might argue...",
          "A key trade-off is short-term gain vs long-term risk: for example...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Simple opinion without evidence.",
            keywords: [
              "good",
              "bad",
              "positive",
              "negative",
              "beneficial",
              "harmful",
              "innovation",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One argument from each side with evidence.",
            keywords: [
              "catalyst",
              "benefit",
              "ozone",
              "cfc",
              "evidence",
              "however",
              "on balance",
              "unintended",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Multiple perspectives; trade-offs; stakeholders named; reasoned conclusion.",
            keywords: [
              "stakeholder",
              "engineer",
              "environmental",
              "atom economy",
              "ozone depletion",
              "trade-off",
              "sugar dust",
              "monitoring",
              "developing nations",
              "precaution",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Short vs long-term; distribution of benefits; precautionary principle; quality of evidence discussed.",
            keywords: [
              "short-term",
              "long-term",
              "distribution",
              "precautionary principle",
              "burden of proof",
              "systemic",
              "international",
              "montreal",
              "dispute",
              "transition",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor:
        "Explain how controlling conditions affects reaction rate to a non-specialist audience using an accessible analogy.",
      guided: [
        {
          level: 2,
          body: "Restating a definition doesn't communicate to a non-specialist: 'Increasing temperature increases the kinetic energy of particles, which increases the frequency of successful collisions, which increases the reaction rate.' — Correct but full of jargon; a non-chemist would not follow.",
        },
        {
          level: 4,
          body: "An analogy helps — but needs linking back to chemistry: 'Think of trying to find a friend in a crowded shopping centre. The more people (particles) there are and the faster they are moving, the more often you bump into your friend (a collision). In chemistry, more particles and more energy means more reactions.' — Good start, but doesn't connect to all four factors or explain what 'successful' means.",
        },
        {
          level: 6,
          body: "A clear analogy linked to all four factors: 'Think of children running around at break time (temperature). The more energetic and numerous they are, the more often they bump into each other correctly. A teacher standing in the middle (catalyst) finds new paths that let students collide more easily, without the teacher moving away. Chopping an apple into small pieces (surface area) exposes more of it to the air — just like giving more reactant particles a chance to collide. Having more children in the playground (concentration) also increases collisions.'",
        },
        {
          level: 8,
          body: "An excellent explanation uses two linked analogies, explicitly connects each to a factor, avoids all jargon (explaining 'activation energy' as 'the minimum push needed to start the reaction', 'catalyst' as 'a shortcut through a mountain rather than over the top'), addresses a common misconception ('a catalyst does not get used up — it's like a revolving door rather than a one-use door'), and links to a real everyday example: 'This is why hydrogen peroxide in your medicine cabinet breaks down slowly at room temperature, but add a tiny pinch of manganese dioxide and it fizzes vigorously — the catalyst lowered the activation energy without being consumed.'",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "Hydrogen peroxide (H₂O₂) decomposes slowly in a bottle on a shelf, but fizzes vigorously when a small amount of manganese dioxide (MnO₂) powder is added. What role does MnO₂ play?",
            options: [
              { id: "a", text: "It is a reactant that produces extra oxygen" },
              { id: "b", text: "It acts as a catalyst, lowering the activation energy of decomposition", correct: true },
              { id: "c", text: "It increases the temperature of the solution" },
              { id: "d", text: "It increases the concentration of H₂O₂" },
            ],
            explanation:
              "MnO₂ is a heterogeneous catalyst for H₂O₂ decomposition: 2H₂O₂(aq) → 2H₂O(l) + O₂(g). It provides an alternative reaction pathway with lower activation energy, and is not consumed. At the end, the MnO₂ can be filtered out and reused.",
          },
        ],
        prompt:
          "Explain to a Year 8 student who has never studied chemistry: what is activation energy, what does a catalyst do, and why does increasing temperature make reactions faster? Use at least one everyday analogy for each concept.",
        scaffolds: [
          "Activation energy is like... (use an analogy such as a hill, a lock, or a starting push)",
          "A catalyst is like... because it...",
          "Increasing temperature is like... — it means the particles...",
          "A common misconception is that a catalyst gets used up — actually...",
          "A real everyday example is...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Restates definitions using jargon.",
            keywords: [
              "activation energy",
              "catalyst",
              "temperature",
              "kinetic energy",
              "collision",
              "rate",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Uses an analogy for at least one concept.",
            keywords: [
              "analogy",
              "like",
              "hill",
              "push",
              "children",
              "crowd",
              "shortcut",
              "door",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Analogies for 2+ concepts linked to chemistry; jargon replaced; catalyst not consumed clarified.",
            keywords: [
              "analogy",
              "activation energy",
              "not used up",
              "not consumed",
              "temperature",
              "faster",
              "shortcut",
              "everyday",
              "explains",
              "catalyst",
            ],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor: "Two+ analogies; all jargon explained; misconception addressed; real-world example cited.",
            keywords: [
              "analogy",
              "misconception",
              "not consumed",
              "revolving door",
              "manganese dioxide",
              "hydrogen peroxide",
              "mountain",
              "shortcut",
              "everyday",
              "year 8",
              "clear",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
