import type { StrandhootPack } from "../engine/types"

export const formCritD: StrandhootPack = {
  slug: "form-crit-d",
  title: "Form, Identity & the Environment",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Impacts of mixture properties: palm oil, saturated fats and water",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry:
    "Observing and describing the properties of a substance helps us to understand its identity and how it interacts with the environment.",
  estMinutes: 28,
  intro:
    "The form and properties of substances — from the unique density of water to the saturated fat content of palm oil — have profound impacts on health, ecosystems and society. Reflect on how identifying the chemical form of a substance helps us understand its interactions with the world around us.",
  badges: [
    {
      id: "applicator",
      label: "Real World Link",
      icon: "🌎",
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
      label: "Form in context",
      blurb: "Water, palm oil, saturated fats, and the impacts of physical properties",
      icon: "🌍",
    },
  ],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain real applications of the physical properties of matter discussed in Chapter 6.",
      guided: [
        {
          level: 2,
          body: "The physical properties of matter — its state, boiling point, density and solubility — determine how it is used. Water's anomalous properties (it is denser as a liquid than as a solid) make it uniquely suitable for supporting aquatic life. Fractional distillation is applied industrially to separate crude oil into useful fuels and materials.",
        },
        {
          level: 4,
          body: "Applications include: (1) Evaporation of seawater to extract salt — used for centuries and still practised in salt flats around the world. (2) Crude oil fractional distillation — produces refinery gas (fuels), gasoline (petrol), kerosene (jet fuel), diesel and bitumen from the same source mixture, each with its own boiling-point range. (3) The high enthalpy of vaporization of water (+2260 J g⁻¹) makes it an excellent coolant in car radiators and living organisms (sweating).",
        },
        {
          level: 6,
          body: "Iodine number is a measure of the degree of saturation of fats and oils — the lower the iodine number, the more saturated the fat and the greater the health risk (linked to raised cholesterol and coronary heart disease). Palm oil has an iodine number of 48–58, making it highly saturated compared to soya bean oil (125–145) or olive oil (79–95). Palm oil is the most widely consumed oil globally, used in food manufacturing and as a biofuel — identifying its chemical composition has enabled scientists to link its consumption to cardiovascular health outcomes.",
        },
        {
          level: 8,
          body: "Quantified applications: The enthalpy of vaporization of water (+2260 J g⁻¹) is exploited in cooling towers, refrigeration cycles and biological thermoregulation. Ice's lower density (917 vs ~1000 kg m⁻³) means icebergs, freshwater ice and polar ice caps float — if ice were denser it would sink and ocean floors would be filled with ice, fundamentally altering Earth's climate. Palm oil has an iodine number of 48–58; saturated fatty acids (primarily palmitic acid, a 16-carbon chain) increase low-density lipoprotein (LDL) cholesterol, which is correlated with increased risk of coronary heart disease. Globally, palm oil production exceeds 70 million tonnes per year, with 85% of global supply from Malaysia and Indonesia. Understanding the chemical form — its carbon chain length, degree of saturation, and physical properties — is the foundation for evaluating health and environmental trade-offs.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which property of palm oil is most directly linked to increased cholesterol in humans?",
            options: [
              { id: "a", text: "Its low boiling point" },
              { id: "b", text: "Its high degree of saturation (low iodine number)", correct: true },
              { id: "c", text: "Its high density compared to water" },
              { id: "d", text: "Its high enthalpy of vaporization" },
            ],
            explanation:
              "The iodine number measures saturation — a low iodine number (48–58 for palm oil) indicates a highly saturated fat. Saturated fatty acids increase LDL cholesterol, which is linked to coronary heart disease. Boiling point and density are not the relevant properties here.",
          },
          {
            id: "s2",
            prompt: "Why does ice float on liquid water, unlike most other solid-liquid pairs?",
            options: [
              { id: "a", text: "Ice has a higher density than liquid water" },
              { id: "b", text: "Ice has a lower density than liquid water due to its hydrogen-bonded lattice structure", correct: true },
              { id: "c", text: "The enthalpy of fusion of water is higher than other substances" },
              { id: "d", text: "Ice contains more dissolved gases than liquid water" },
            ],
            explanation:
              "Ice forms a hydrogen-bonded lattice that is less compact than liquid water — ice density ~917 kg m⁻³ vs liquid water ~1000 kg m⁻³. This anomalous property means ice is less dense and floats. Most solids are denser than their liquid forms.",
          },
        ],
        prompt:
          "Describe three applications of physical properties discussed in Chapter 6. For each, name the specific property being exploited and explain why it matters in a real-world context.",
        scaffolds: [
          "Application 1: [name the application]... This exploits the property of...",
          "Application 2: Crude oil fractional distillation uses differences in... to separate...",
          "Application 3: The iodine number of palm oil (48–58) measures... This is important because...",
          "Without [property], [real-world consequence] would occur because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one application.",
            keywords: ["fractional distillation", "salt", "ice", "palm oil", "water", "cooling", "boiling point"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two applications with the specific property named.",
            keywords: ["boiling point", "density", "iodine number", "saturation", "enthalpy", "vaporization", "fractional distillation", "ice floats"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Three applications; property linked to real-world consequence.",
            keywords: ["iodine number", "saturated", "cholesterol", "ice floats", "density", "917", "crude oil", "fractions", "coolant", "evaporation", "salt"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Quantified evidence; chemical form linked to consequence for each application.",
            keywords: ["48", "58", "917", "1000", "2260", "ldl", "palmitic acid", "70 million", "enthalpy", "iodine number", "coronary", "icebergs"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the environmental, social and health impacts of palm oil production and consumption.",
      guided: [
        {
          level: 2,
          body: "Palm oil is the most widely consumed oil in the world. Its production has environmental impacts including deforestation. High saturated fat content links it to health issues such as high cholesterol.",
        },
        {
          level: 4,
          body: "Environmental impacts: vast palm oil plantations in Malaysia, Indonesia and Thailand have led to deforestation, smoke haze and reduction in biodiversity as varied landscapes become monocultures. Social/economic impact: palm oil has lifted hundreds of thousands of farmers out of poverty and contributes significantly to GDP in producing countries. Health impact: saturated fat in palm oil (primarily palmitic acid) increases LDL cholesterol and risk of coronary heart disease.",
        },
        {
          level: 6,
          body: "Multi-level impacts: (1) Environmental — deforestation destroys biodiversity and releases CO₂; smoke haze from land clearing causes respiratory illness across entire regions. (2) Health — the iodine number of palm oil (48–58) is much lower than soya bean oil (125–145) or olive oil (79–95), indicating higher saturation and greater cardiovascular risk. The saturated fatty acid palmitic acid raises LDL cholesterol in blood. (3) Social/Economic — palm oil provides economic development for millions of farmers; it is also used as a biofuel, meaning its organic waste has minimal energy waste. These impacts cut across health, environment and economics, often benefiting some groups while harming others.",
        },
        {
          level: 8,
          body: "Systemic analysis: The chemical identity of palm oil — predominantly palmitic acid (C₁₆H₃₂O₂), a 16-carbon saturated fatty acid — directly determines its health impact. Its iodine number of 48–58 places it among the most saturated commercial fats (compared to trans-fats in industrially hydrogenated oils, which have even worse cardiovascular profiles). Global production exceeds 70 million tonnes/year; Malaysia and Indonesia supply ~85% of global output. Deforestation for palm plantations is estimated to release 0.6 Gt CO₂ equivalent per year and has destroyed habitat for orangutans, Sumatran tigers and pygmy elephants. Economic benefits are real but inequitably distributed — large corporations capture most profit while smallholder farmers remain vulnerable to commodity price fluctuations. The tension between economic development, food security, environmental protection and health is a microcosm of global sustainability challenges.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which oil has the highest iodine number and is therefore the most unsaturated (least harmful to cardiovascular health)?",
            options: [
              { id: "a", text: "Palm oil (iodine number 48–58)" },
              { id: "b", text: "Lard (iodine number 43)" },
              { id: "c", text: "Soya bean oil (iodine number 125–145)", correct: true },
              { id: "d", text: "Olive oil (iodine number 79–95)" },
            ],
            explanation:
              "A higher iodine number indicates greater unsaturation (more C=C double bonds). Soya bean oil has the highest iodine number (125–145) of the options given, making it the most unsaturated and least associated with raised LDL cholesterol.",
          },
        ],
        prompt:
          "Evaluate the environmental, social, and health impacts of large-scale palm oil production and consumption. Use evidence from the chapter and cover at least three categories of impact.",
        scaffolds: [
          "Environmental impacts include...",
          "The deforestation of tropical forests for palm oil plantations causes...",
          "The health impact is linked to the chemical identity of palm oil because...",
          "Economically, palm oil production...",
          "These impacts affect different groups differently — for example...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one impact.",
            keywords: ["deforestation", "cholesterol", "health", "environment", "palm oil", "saturated"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two categories of impact with brief explanation.",
            keywords: ["deforestation", "biodiversity", "cholesterol", "ldl", "economic", "farmers", "poverty", "iodine number"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Environmental, social and health impacts; iodine numbers compared.",
            keywords: ["iodine number", "48", "125", "unsaturated", "deforestation", "smoke haze", "respiratory", "ldl", "coronary", "economic", "biofuel", "farmers"],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor: "Systemic analysis with quantified evidence; inequitable distribution acknowledged.",
            keywords: ["70 million", "0.6 gt", "palmitic acid", "c16", "orangutan", "malaysia", "indonesia", "smallholder", "commodity", "inequitable", "systemic"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the benefits and costs of palm oil and form an evidence-based position.",
      guided: [
        {
          level: 2,
          body: "'Palm oil is bad because it causes deforestation and health problems.' — A simple opinion without nuance or evidence.",
        },
        {
          level: 4,
          body: "'Palm oil has benefits — it provides economic development and is used in many foods — but it also causes deforestation and increases cholesterol risk. On balance, its use should be reduced.' — Uses evidence from both sides but lacks specifics.",
        },
        {
          level: 6,
          body: "A balanced judgement: 'The benefits of palm oil — economic development for millions of farmers, low cost of production, versatile use in food and biofuel — are real and significant. The costs — deforestation (habitat loss for endangered species), respiratory illness from smoke haze, and cardiovascular health risks linked to its high saturated fat content (iodine number 48–58 vs olive oil 79–95) — are also severe. Different stakeholders view this differently: a smallholder farmer in Malaysia depends on income from palm oil; a nutritionist in Europe focuses on LDL cholesterol risks; an environmental scientist in Borneo sees habitat destruction. A balanced judgement requires weighing all perspectives.'",
        },
        {
          level: 8,
          body: "A nuanced judgement: addresses short vs long-term consequences (short: economic income for farmers; long: ecosystem collapse and public health crisis); distribution of benefits and burdens (corporate profits vs community health and smallholder vulnerability); alternatives to palm oil production (certified sustainable palm oil — RSPO, shade-grown plantations, alternative oils); evaluates trade-offs with cited evidence (iodine numbers, CO₂ estimates, tonnes of production); and concludes with a calibrated, caveated position — acknowledging that outright bans disadvantage developing economies while unchecked expansion is environmentally unsustainable.",
        },
      ],
      response: {
        kind: "reflection",
        prompt:
          "Is the global production and consumption of palm oil a net positive or net negative for humanity and the planet? Construct a reasoned, evidence-based judgement that weighs trade-offs from multiple perspectives.",
        scaffolds: [
          "Evidence supporting palm oil production includes...",
          "Evidence against includes...",
          "A key trade-off is...",
          "Different stakeholders view this differently — a farmer in Malaysia would say... whereas an environmental scientist might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Simple opinion without evidence.",
            keywords: ["good", "bad", "positive", "negative", "palm oil", "deforestation", "health"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One argument from each side with evidence.",
            keywords: ["economic", "deforestation", "cholesterol", "benefit", "cost", "however", "on balance"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Multiple perspectives; iodine number cited; trade-offs identified.",
            keywords: ["iodine number", "48", "79", "trade-off", "stakeholder", "farmer", "environmental", "deforestation", "ldl", "sustainable", "perspective"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Short vs long-term; distribution of benefits; RSPO or alternatives mentioned; uncertainty acknowledged.",
            keywords: ["rspo", "certified sustainable", "short-term", "long-term", "smallholder", "ecosystem", "developing", "alternative", "calibrated", "caveats", "trade-off"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain the connection between the chemical form of a substance and its identity and environmental interactions to a non-specialist.",
      guided: [
        {
          level: 2,
          body: "Restating technical language does not communicate well to a non-specialist: 'The form of a substance includes its observable and measurable physical and chemical properties which allow it to be identified and classified.' — Too jargon-heavy.",
        },
        {
          level: 4,
          body: "An accessible approach: 'The form of a substance — how it looks, what state it is in, whether it dissolves, what temperature it melts or boils at — is like a fingerprint. Each pure substance has a unique set of properties that lets us identify it and predict how it will behave.' Good, but doesn't link to a specific example from the chapter.",
        },
        {
          level: 6,
          body: "A clear explanation linked to the chapter: 'Think of ice floating on water. Most solids sink in their own liquid — but water is special because its solid form (ice) is less dense than the liquid. This is because ice forms a more open structure. This single property of water — its form as a solid — has enormous consequences: it keeps water bodies insulated in winter, allowing fish to survive under the ice. The form of a substance determines how it interacts with everything around it.'",
        },
        {
          level: 8,
          body: "Excellent communication links form to identity to impact using two connected examples from the chapter: (1) ice density (form → physical identity → environmental impact — insulating effect on aquatic ecosystems); (2) iodine number of fats (form → chemical identity via saturation → health impact — cardiovascular disease risk). Uses analogies ('a fingerprint tells you who someone is; the iodine number tells you how saturated a fat is'), avoids or explains jargon ('saturated' = 'full up with hydrogen atoms, leaving no room for double bonds'), addresses a likely misconception ('all fats are the same' → 'different chemical forms of fat have very different health effects'), and explains why this matters to the listener personally.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which of the following is the best everyday analogy for how iodine number reveals the identity of a fat?",
            options: [
              { id: "a", text: "A road map shows where a city is, just as the iodine number shows where the fat is in food" },
              {
                id: "b",
                text: "A fingerprint uniquely identifies a person; the iodine number uniquely identifies the saturation level of a fat",
                correct: true,
              },
              { id: "c", text: "A thermometer measures temperature, just as iodine number measures boiling point" },
              { id: "d", text: "A calendar shows what day it is, just as the iodine number shows how old a fat is" },
            ],
            explanation:
              "The fingerprint analogy works because both are unique identifiers: a fingerprint identifies an individual, and the iodine number characterises the saturation level of a fat, which in turn predicts its health impact. This mirrors the statement of inquiry — 'describing properties helps understand identity.'",
          },
        ],
        prompt:
          "Explain to a Year 9 student with no chemistry background why the form — the physical and chemical properties — of a substance determines its identity and how it interacts with the environment. Use at least one example from Chapter 6 (e.g. ice density, palm oil saturation, or boiling point at altitude).",
        scaffolds: [
          "Think of the form of a substance as its fingerprint...",
          "For example, ice floating on water shows that...",
          "In the same way, the iodine number of palm oil tells us...",
          "This matters in real life because...",
          "A common misconception is that all fats/oils are the same — actually...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Restates definition using jargon.",
            keywords: ["properties", "identity", "form", "substance", "classify", "observe"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Accessible language; analogy used; one example from chapter.",
            keywords: ["fingerprint", "analogy", "ice", "palm oil", "boiling point", "identity", "properties", "form"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Two examples linked to environmental or health impact; jargon explained.",
            keywords: ["ice floats", "density", "insulates", "aquatic", "iodine number", "saturated", "cholesterol", "analogy", "explains", "consequences"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Two linked examples; misconception addressed; personal relevance made explicit.",
            keywords: ["misconception", "all fats", "same", "different", "hydrogen", "double bond", "personal", "relevant", "clear", "ice", "iodine", "analogy", "jargon"],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
