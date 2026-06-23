import type { StrandhootPack } from "../engine/types"

export const consequencesCritD: StrandhootPack = {
  slug: "consequences-crit-d",
  title: "Acid Rain, Fossil Fuels & the Planet",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Acid deposition, fossil fuels & sustainability",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry:
    "Change as a consequence of human development can be identified within all environments on our planet.",
  estMinutes: 27,
  intro:
    "Since the 19th century, burning fossil fuels has released SO₂ and NOₓ into the atmosphere — transforming rain into acid and rivers into dead zones. Explore the real applications of acid-base chemistry, evaluate the environmental and social impacts, weigh the evidence for a judgement, and practice communicating the science to a non-specialist audience.",
  badges: [
    {
      id: "applicator",
      label: "Real World Link",
      icon: "🌏",
      description: "Reach Level 8 on Applications",
      strandId: "applications",
      atLevel: 8,
    },
    {
      id: "impact-analyst",
      label: "Impact Analyst",
      icon: "⚠️",
      description: "Reach Level 8 on Implications & impacts",
      strandId: "impacts",
      atLevel: 8,
    },
    {
      id: "evidence-judge",
      label: "Evidence Judge",
      icon: "⚖️",
      description: "Reach Level 8 on Making a judgement",
      strandId: "judgement",
      atLevel: 8,
    },
    {
      id: "science-voice",
      label: "Science Voice",
      icon: "📢",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Acid rain context",
      blurb: "Fossil fuels, acid deposition and sustainability",
      icon: "🌍",
    },
  ],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor:
        "Identify and explain the real applications of acid-base chemistry from Chapter 3.",
      guided: [
        {
          level: 2,
          body: "Acids and bases have many everyday applications. The stomach uses hydrochloric acid (HCl, pH 1–3) to digest food and activate enzymes. Farmers add ground limestone (calcium carbonate, CaCO₃) to acidic soil to neutralise it and improve crop growth. Acid-base indicators help chemists measure pH in water quality testing.",
        },
        {
          level: 4,
          body: "Key applications: (1) Soil liming — CaCO₃ neutralises acidic soil: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂; (2) Antacids — bases such as calcium carbonate and magnesium hydroxide neutralise excess stomach acid (pH 1–3); (3) Water treatment — lime (Ca(OH)₂) is added to acidified lakes to raise pH; (4) Industrial cleaning — strong alkaline solutions dissolve grease and protein residues; (5) pH indicators — used in titrations and water quality monitoring.",
        },
        {
          level: 6,
          body: "Broader applications: (1) Acid deposition remediation — Scandinavian governments add calcium carbonate to acidified lakes and rivers to protect fish populations from the effects of acid rain from British and German industries. (2) Carbon capture — the reaction CO₂(g) + H₂O(l) ⇌ H₂CO₃(aq) (formation of carbonic acid in the oceans) reduces atmospheric CO₂ but acidifies seawater, threatening coral reefs and shell-forming organisms. (3) Battery electrolytes — alkaline batteries use KOH (potassium hydroxide) as the electrolyte; improper disposal leaches this strong base into the environment.",
        },
        {
          level: 8,
          body: "Quantified applications: (1) Over 200 million tonnes of calcium carbonate are used per year to counteract acid deposition globally — one of the most large-scale applications of neutralisation chemistry. (2) Ocean acidification: since the Industrial Revolution, ocean surface pH has dropped from ~8.2 to ~8.1 (a 26% increase in [H⁺]) due to dissolved CO₂ forming carbonic acid; below pH 8.0 coral skeletons (CaCO₃) dissolve. (3) Battery disposal: the EU's Battery Directive (2006) mandates recycling of >50% of portable batteries to prevent alkaline electrolytes (KOH) and toxic heavy metals from landfill. These applications illustrate how neutralisation chemistry is both a cause of and a solution to environmental problems.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "A farmer's soil has a pH of 5.2. Which substance from Chapter 3 could they add to neutralise it?",
            options: [
              { id: "a", text: "Hydrochloric acid" },
              { id: "b", text: "Ground limestone (calcium carbonate)", correct: true },
              { id: "c", text: "Sulfuric acid" },
              { id: "d", text: "Vinegar (ethanoic acid)" },
            ],
            explanation:
              "Ground limestone (CaCO₃) is a base. When added to acidic soil it neutralises the excess H⁺ ions: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂, raising the pH towards neutral.",
          },
          {
            id: "s2",
            prompt:
              "Scandinavian governments add calcium carbonate to lakes affected by acid rain from other countries. Which type of reaction is occurring?",
            options: [
              { id: "a", text: "Combustion" },
              { id: "b", text: "Decomposition" },
              { id: "c", text: "Neutralisation", correct: true },
              { id: "d", text: "Electrolysis" },
            ],
            explanation:
              "Adding calcium carbonate (a base) to an acidified lake is a neutralisation reaction — the base reacts with the acid (H₂SO₄ or HNO₃) to form a salt and water, raising the pH.",
          },
        ],
        prompt:
          "Describe two or more real applications of acid-base chemistry from Chapter 3. For each application, explain the chemistry involved and its global or environmental significance.",
        scaffolds: [
          "One application is...",
          "The chemistry involved is...",
          "This is globally significant because...",
          "A second application is...",
          "On a quantified scale, this matters because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one application.",
            keywords: [
              "soil",
              "limestone",
              "stomach",
              "neutralise",
              "acid",
              "base",
              "indicator",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor:
              "Two applications with brief chemistry explanations.",
            keywords: [
              "caco3",
              "neutralise",
              "soil",
              "antacid",
              "stomach acid",
              "lake",
              "water treatment",
              "indicator",
              "battery",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Multiple applications across sectors; global/environmental significance explained; equation used.",
            keywords: [
              "neutralisation",
              "equation",
              "scandinavian",
              "ocean acidification",
              "co2",
              "carbonic acid",
              "coral",
              "battery",
              "koh",
              "environment",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Quantified scale; ocean pH change stated; EU Battery Directive referenced; cause and solution framing.",
            keywords: [
              "200 million",
              "8.1",
              "8.2",
              "26%",
              "coral",
              "battery directive",
              "2006",
              "50%",
              "industrial revolution",
              "koh",
              "recycling",
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
        "Evaluate the environmental, social and economic impacts of acid deposition caused by burning fossil fuels.",
      guided: [
        {
          level: 2,
          body: "Burning fossil fuels releases sulfur dioxide (SO₂) and nitrogen dioxide (NO₂) into the atmosphere. These react with water to form sulfuric acid and nitric acid, which fall as acid rain. Acid rain kills plants and aquatic life and erodes stone buildings.",
        },
        {
          level: 4,
          body: "Environmental: acid rain lowers the pH of rivers and lakes, killing fish and invertebrates. It erodes limestone monuments. It removes essential nutrients from soil, stunting tree growth (Black Forest, Germany). Economic: acid rain damage to forests and buildings costs billions of dollars per year. Social: communities dependent on fishing (Scandinavia) lose livelihoods when lakes become too acidic for fish to survive. Geopolitical: pollutants cross national borders — countries causing pollution are not always those suffering the consequences.",
        },
        {
          level: 6,
          body: "Multilevel impacts: Environmental — acid rain dissolves aluminium compounds in soil, releasing Al³⁺ ions that are toxic to fish gills; lakes below pH 5 typically contain no fish. Sulfuric acid corrodes steel reinforcement in buildings. Social — the Scandinavian fishing industry suffered major declines in the 1970s–80s from acid rain originating in UK and German coal-fired power stations. Economic — the 1990 US Clean Air Act Amendments introduced SO₂ 'cap-and-trade' to reduce acid rain emissions, with costs estimated at $3 billion/year but benefits of $122 billion/year (EPA estimate). Global — acid deposition does not respect borders; it is an international problem requiring international solutions.",
        },
        {
          level: 8,
          body: "Systemic analysis: (1) Acid rain has declined significantly in Europe and North America since the 1980s due to desulfurisation of power stations and catalytic converters reducing NOₓ — but Asia's rapid industrialisation has shifted the problem. (2) The 'acid cascade': SO₂ → H₂SO₃/H₂SO₄ → acidified soil → Al³⁺ ions in water → fish death → collapse of aquatic food webs → loss of biodiversity. (3) Ocean acidification (CO₂ → H₂CO₃) mirrors acid rain in mechanism but operates on a global, centuries-long scale. (4) Unequal burden: the Solomon Islands and Marshall Islands (Chapter 3) contribute < 0.001% of global greenhouse gas emissions yet face existential threats from rising sea levels — a direct consequence of combustion chemistry in developed nations.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "What happens to aluminium compounds in soil when acid rain falls on a forest?",
            options: [
              {
                id: "a",
                text: "They are neutralised and become harmless fertiliser",
              },
              {
                id: "b",
                text: "They dissolve and are washed into waterways as Al³⁺ ions, which are toxic to fish",
                correct: true,
              },
              { id: "c", text: "They solidify and protect the tree roots" },
              { id: "d", text: "They evaporate into the atmosphere" },
            ],
            explanation:
              "Acid rain dissolves aluminium compounds in the soil, releasing Al³⁺ ions which are carried into rivers and lakes. These ions are toxic to fish — they clog fish gills, preventing breathing.",
          },
        ],
        prompt:
          "Evaluate the environmental, social and economic impacts of acid deposition resulting from the burning of fossil fuels. Cover at least three categories of impact with specific examples.",
        scaffolds: [
          "Environmental impacts include...",
          "The reaction SO₂ + H₂O forms... which causes...",
          "Social impacts include...",
          "Economically, acid rain...",
          "The geopolitical dimension is...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one impact.",
            keywords: [
              "acid rain",
              "pollution",
              "fish",
              "plants",
              "buildings",
              "environment",
              "so2",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor:
              "Two categories of impact with brief explanations.",
            keywords: [
              "fish",
              "forests",
              "buildings",
              "economic",
              "social",
              "fishing",
              "scandinavia",
              "limestone",
              "nutrients",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Environmental, social and economic impacts with reasoning; geopolitical dimension mentioned.",
            keywords: [
              "aluminium",
              "al3+",
              "ph 5",
              "fish",
              "scandinavia",
              "clean air act",
              "cross borders",
              "international",
              "soil",
              "forest",
              "economic cost",
            ],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor:
              "Systemic analysis; desulfurisation improvements noted; Asia shift; ocean acidification paralleled; unequal burden named.",
            keywords: [
              "desulfurisation",
              "catalytic converter",
              "asia",
              "ocean acidification",
              "h2co3",
              "solomon islands",
              "unequal",
              "food web",
              "cascade",
              "biodiversity",
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
        "Weigh the costs and benefits of fossil fuel combustion and form an evidence-based position.",
      guided: [
        {
          level: 2,
          body: "'Burning fossil fuels is bad because it causes acid rain.' — A simple opinion without evidence or acknowledgement of benefits.",
        },
        {
          level: 4,
          body: "'Burning fossil fuels has driven industrial development and provides 85% of the world's energy, but causes acid rain, kills aquatic life and erodes buildings. On balance, the costs are significant, but energy production has also brought enormous benefits in living standards.' — Uses evidence from both sides.",
        },
        {
          level: 6,
          body: "A balanced judgement: 'The benefits of fossil fuel combustion — electrifying cities, powering industry, raising living standards — have been enormous. The costs — acid rain, ocean acidification, climate change — are severe and in many cases irreversible. Different stakeholders view this trade-off differently: an energy-poor community in a developing nation may prioritise access to electricity over emissions; a Scandinavian government protecting its fishing industry will prioritise reducing SO₂ emissions. On balance, the evidence shows the environmental costs are becoming unacceptably high, and cleaner alternatives must be scaled up urgently.'",
        },
        {
          level: 8,
          body: "A nuanced judgement addresses: (1) Short-term vs long-term — in the short term, fossil fuels are the cheapest reliable energy source; in the long term, the EPA estimates benefits of clean-air legislation outweigh costs by 40:1. (2) Distribution of burdens — the Solomon Islands face existential risk from combustion they did not cause. (3) Alternatives — renewable energy, green hydrogen, carbon capture. (4) Progress — acid rain in Europe has decreased significantly since the 1980s (desulfurisation, catalytic converters) showing regulation works. (5) Irreversibility — some ecosystem damage (species loss, structural damage to monuments) cannot be undone. A calibrated conclusion acknowledges uncertainty and commits to a specific position with stated caveats.",
        },
      ],
      response: {
        kind: "reflection",
        prompt:
          "Is continued burning of fossil fuels justifiable given the environmental consequences documented in Chapter 3? Construct a reasoned, evidence-based judgement that considers multiple perspectives and trade-offs.",
        scaffolds: [
          "Evidence in favour of continued fossil fuel use includes...",
          "Evidence against includes...",
          "A key trade-off is...",
          "Different stakeholders view this differently — for example, a community without electricity would say... whereas a Scandinavian fisher might argue...",
          "Considering the evidence, my judgement is... with the caveat that...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Simple opinion without evidence.",
            keywords: [
              "bad",
              "good",
              "harmful",
              "beneficial",
              "acid rain",
              "fossil fuel",
              "environment",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor:
              "One argument from each side with evidence; both benefits and costs acknowledged.",
            keywords: [
              "energy",
              "living standards",
              "acid rain",
              "costs",
              "benefits",
              "however",
              "on balance",
              "evidence",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Multiple perspectives; trade-offs identified; stakeholders named; reasoned conclusion.",
            keywords: [
              "trade-off",
              "stakeholder",
              "developing",
              "scandinavia",
              "irreversible",
              "renewable",
              "urgently",
              "perspective",
              "environment",
              "economic",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Short vs long-term; distribution of burdens; alternatives; progress cited; uncertainty acknowledged; calibrated conclusion.",
            keywords: [
              "short-term",
              "long-term",
              "solomon islands",
              "desulfurisation",
              "regulation",
              "40:1",
              "irreversibility",
              "species loss",
              "uncertainty",
              "caveats",
              "calibrated",
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
        "Explain how acid rain forms and why it is a global problem, using accessible language for a non-specialist.",
      guided: [
        {
          level: 2,
          body: "Restating the technical definition: 'Acid deposition results from the release of acid-forming pollutants SO₂ and NOₓ which react with water to form H₂SO₄ and HNO₃.' — Uses too much jargon; a non-specialist would not follow this.",
        },
        {
          level: 4,
          body: "An analogy helps: 'Think of the atmosphere as a giant chemistry lab. When coal-fired power stations release sulfur dioxide, it's like adding an ingredient that reacts with rain water to make the rain slightly acidic — similar to adding a squeeze of lemon juice. This sour rain falls on forests, lakes and buildings, causing harm over time.' Useful start but does not explain why this is a global, cross-border problem.",
        },
        {
          level: 6,
          body: "A clear explanation with an analogy, chain of cause-and-effect, and global dimension: 'Imagine every chimney in the country is releasing an invisible gas (SO₂) that mixes with clouds. The clouds travel hundreds of kilometres, and when it rains over a different country, the rain is acidic — like dilute battery acid. This is acid rain. In the 1970s, British coal-fired power stations pumped out SO₂ that turned Norwegian lakes so acidic that entire fish populations died — even though Norway had few power stations of its own. It shows that air pollution is everyone's problem, not just the country creating it.'",
        },
        {
          level: 8,
          body: "Excellent communication: uses two analogies (atmosphere as chemistry lab; acid rain as long-distance lemon juice), explicitly chains SO₂ → H₂SO₃ → H₂SO₄ in plain language ('the sulfur dioxide dissolves in rainwater just like fizzy drink CO₂ dissolves in water, but instead of making it fizzy, it makes it acidic'), explains the logarithmic pH scale with an accessible metaphor ('each step down the pH scale is 10 times more acidic — so acid rain at pH 4 is not a little bit more acidic than normal rain at pH 6, it's a hundred times more acidic'), connects to the chapter theme ('human development — power stations, cars — changes the atmosphere in a way that harms environments thousands of kilometres away'), and addresses a likely misconception ('the gas is invisible, so it's easy to ignore — but the consequences for forests and fish are very visible').",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "You are explaining acid rain to a 10-year-old. Which analogy from the list best communicates how SO₂ dissolves in rainwater to make it acidic?",
            options: [
              {
                id: "a",
                text: "It is like dissolving CO₂ in water to make fizzy drink — except it makes the water acidic instead of fizzy",
                correct: true,
              },
              {
                id: "b",
                text: "It is like the equilibrium constant Kc shifting to the left under Le Chatelier's principle",
              },
              {
                id: "c",
                text: "It is like the complete dissociation of HCl into H⁺ and Cl⁻ ions",
              },
              {
                id: "d",
                text: "It is like the neutralisation of stomach acid by an antacid tablet",
              },
            ],
            explanation:
              "The CO₂ / fizzy drink analogy works because most people understand that CO₂ dissolved in water creates a mildly acidic drink. For SO₂, the same dissolution process creates a more strongly acidic solution — accessible and memorable.",
          },
        ],
        prompt:
          "Explain to a Year 9 student who has never studied chemistry how burning fossil fuels causes acid rain, and why this is a problem that crosses national borders. Use at least one everyday analogy.",
        scaffolds: [
          "Imagine that every factory chimney is releasing a gas that...",
          "This gas mixes with water droplets in clouds to make...",
          "It is similar to... because...",
          "The rain then falls hundreds of kilometres away, where...",
          "This is a global problem because...",
          "A common misconception is...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Restates definition with jargon.",
            keywords: [
              "so2",
              "acid",
              "rain",
              "fossil fuel",
              "pollution",
              "sulfur",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor:
              "One analogy used; cause-effect chain started.",
            keywords: [
              "analogy",
              "like",
              "imagine",
              "gas",
              "rain",
              "acidic",
              "power station",
              "lemon",
              "fizzy",
            ],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "Clear analogy; cross-border dimension; real example (Norway/UK); plain language.",
            keywords: [
              "analogy",
              "norway",
              "uk",
              "fish",
              "power station",
              "hundreds of kilometres",
              "border",
              "global",
              "plain language",
              "explains",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Two analogies; logarithmic scale explained accessibly; misconception addressed; human development theme connected.",
            keywords: [
              "analogy",
              "logarithm",
              "hundred times",
              "10 times",
              "misconception",
              "invisible",
              "human development",
              "consequences",
              "visible",
              "fizzy",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
