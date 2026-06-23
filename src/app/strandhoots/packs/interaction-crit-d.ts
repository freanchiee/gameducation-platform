import type { StrandhootPack } from "../engine/types"

export const interactionCritD: StrandhootPack = {
  slug: "interaction-crit-d",
  title: "Redox, Fuels & Corrosion in a Globalised World",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Environmental, social & economic impacts of redox reactions",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry:
    "The interactions between substances can sometimes be understood and predicted by examining the underlying processes.",
  estMinutes: 28,
  intro:
    "Corrosion costs the world US$2.5 trillion a year, incomplete combustion of fuels kills 9 million people prematurely, and the shift to LPG in Hong Kong taxis shows that understanding chemical interactions can drive real sustainability solutions. Reflect on the global implications of redox chemistry.",
  badges: [
    {
      id: "applicator",
      label: "Real World Link",
      icon: "🌐",
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
      label: "Redox chemistry in context",
      blurb: "Corrosion, combustion, and chemical interaction at a global scale",
      icon: "🌍",
    },
  ],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain the real-world applications of redox reactions from Chapter 8.",
      guided: [
        {
          level: 2,
          body: "Redox reactions are all around us. Rusting is an oxidation reaction that destroys metal structures. The combustion of fuels (petrol, LPG) is an oxidation reaction that powers vehicles and heats homes. Metals react with acids (redox) to form salts used in industry.",
        },
        {
          level: 4,
          body: "Key applications: (1) Combustion of LPG (propane C₃H₈ and butane C₄H₁₀) powers vehicles and cooking — since 2006, all public taxis in Hong Kong run on LPG to reduce urban air pollution. (2) The reactivity series predicts which metals are useful for specific applications: gold and platinum (least reactive) are used for jewellery and electronic contacts; iron (moderately reactive) is used in construction. (3) Sacrificial anodes protect steel ships, pipelines and bridges from corrosion.",
        },
        {
          level: 6,
          body: "Corrosion applications involve understanding oxidation to prevent it: zinc galvanising forms a physical barrier AND a sacrificial layer (zinc is higher in the reactivity series than iron, so it corrodes preferentially). The blast furnace uses the reducing agent carbon (coke) to remove oxygen from iron ore (Fe₂O₃), extracting iron: Fe₂O₃ + 3CO → 2Fe + 3CO₂. Combustion energy calculations (E = mcΔT) link chemistry to engineering — 1 mole of butane releases 2878 kJ, enough to raise 740 g of water from 20°C to 100°C.",
        },
        {
          level: 8,
          body: "Quantified applications: (1) Corrosion costs US$2.5 trillion annually (>3% global GDP) — the US corrosion study found utilities ($47 billion), transportation ($29 billion), infrastructure ($22 billion) as top sectors. (2) Luna Innovations' ISAM (ionic self-assembled monolayer) coatings represent a green chemistry approach — inhibiting corrosion without the toxic heavy metals used in traditional primers, applicable to aircraft, ships and bridges. (3) Germany, France and UK plan to ban petrol/diesel vehicles by 2030–2040, replacing them with EVs and LPG — this represents a direct application of redox chemistry knowledge to policy. (4) Electrochemical cells harness redox reactions (as in car batteries and fuel cells) to convert chemical energy directly to electrical energy.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "Since 2006, all public taxis in Hong Kong have run on LPG. Which statement best explains the environmental benefit?",
            options: [
              { id: "a", text: "LPG produces no carbon dioxide at all" },
              {
                id: "b",
                text: "LPG undergoes more complete combustion than gasoline, producing less CO, NOₓ and particulates",
                correct: true,
              },
              { id: "c", text: "LPG vehicles produce hydrogen gas instead of CO₂" },
              { id: "d", text: "LPG is a renewable fuel produced from plants" },
            ],
            explanation:
              "LPG (propane and butane) is a simpler hydrocarbon mixture than gasoline. It burns more completely in vehicle engines, producing less carbon monoxide, nitrogen oxides and particulates — the pollutants most responsible for urban smog and health impacts.",
          },
          {
            id: "s2",
            prompt:
              "Zinc is used as a sacrificial anode to protect steel ship hulls. What is the chemical reason zinc is effective for this purpose?",
            options: [
              { id: "a", text: "Zinc is cheaper than steel" },
              { id: "b", text: "Zinc is below iron in the reactivity series" },
              {
                id: "c",
                text: "Zinc is above iron in the reactivity series and is oxidised preferentially",
                correct: true,
              },
              { id: "d", text: "Zinc does not react with seawater at all" },
            ],
            explanation:
              "Zinc is higher in the reactivity series than iron, meaning zinc loses electrons (is oxidised) more readily. When zinc is attached to a steel hull, it corrodes preferentially — sacrificing itself to protect the iron. This is why it is called a sacrificial anode.",
          },
        ],
        prompt:
          "Describe three real-world applications of redox reactions from Chapter 8. For each application, explain the underlying chemistry and its significance.",
        scaffolds: [
          "Application 1: Combustion of fuels...",
          "The underlying chemistry is... because...",
          "Application 2: Corrosion and its prevention...",
          "Application 3: Metal extraction or salt formation...",
          "The global significance of these applications is...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one application.",
            keywords: ["rust", "combustion", "fuel", "corrosion", "metal", "salt", "reaction"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two applications with brief chemical explanation.",
            keywords: [
              "lpg",
              "combustion",
              "sacrificial anode",
              "zinc",
              "corrosion",
              "reactivity series",
              "oxidation",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Three applications; chemistry explained; global significance mentioned.",
            keywords: [
              "lpg",
              "hong kong",
              "sacrificial anode",
              "zinc",
              "reactivity series",
              "galvanising",
              "blast furnace",
              "fe₂o₃",
              "energy",
              "significance",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Quantified data; ISAM or policy examples cited; electrochemical application included.",
            keywords: [
              "2.5 trillion",
              "3%",
              "isam",
              "luna innovations",
              "green chemistry",
              "ban",
              "2030",
              "fuel cell",
              "electrochemical",
              "utilities",
              "47 billion",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the environmental, social and economic impacts of combustion and corrosion.",
      guided: [
        {
          level: 2,
          body: "Burning fuels releases carbon dioxide, contributing to global warming. Corrosion of metal structures costs money to repair. These are direct effects of oxidation reactions on our environment and economy.",
        },
        {
          level: 4,
          body: "Environmental: incomplete combustion of gasoline and diesel produces carbon monoxide (CO), nitrogen oxides (NOₓ), and particulates, which form photochemical smog in cities. Health: CO binds to hemoglobin, reducing oxygen transport. Economic: corrosion costs >US$2.5 trillion per year globally (>3% of world GDP); utilities, transportation and infrastructure are the hardest-hit sectors.",
        },
        {
          level: 6,
          body: "Multilevel impacts: Environmental — CO₂ from combustion contributes to the greenhouse effect and ocean acidification; NOₓ reacts with water to form acid rain; particulate matter (PM2.5) from incomplete combustion penetrates deep into the lungs. Social — the Lancet (2015) found 9 million premature deaths globally from pollution-related diseases, representing 16% of all deaths — more than AIDS, tuberculosis and malaria combined. Economic — developing economies face a double burden: they need fossil fuels for growth but lack the financial and technical resources for cleaner alternatives.",
        },
        {
          level: 8,
          body: "Systemic analysis: the global vehicle fleet is projected to double from 1.1 billion (2015) to 2.0 billion by 2040 (Bernstein Research / Business Insider), with most growth in China and India. This will amplify all combustion-related impacts unless the fuel mix changes. A systemic view reveals feedback loops: CO₂ warms the climate → increases weathering → accelerates corrosion of infrastructure; NOₓ forms smog → impairs lung function → increases health costs. The transition to LPG and eventually EVs can break these feedbacks, but developing economies face financial, technical and infrastructure barriers — the benefits and costs of the transition are unequally distributed.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "The Lancet published a global study finding that 9 million people died prematurely from pollution-related diseases in 2015. Approximately what percentage of all global deaths does this represent?",
            options: [
              { id: "a", text: "About 2%" },
              { id: "b", text: "About 16%", correct: true },
              { id: "c", text: "About 33%" },
              { id: "d", text: "About 50%" },
            ],
            explanation:
              "The Lancet study (2015) found that 9 million premature deaths were linked to pollution — approximately 16% of all global deaths. This is far greater than the number of deaths from violence and war, and more than AIDS, tuberculosis and malaria combined.",
          },
        ],
        prompt:
          "Evaluate the environmental, social, and economic impacts of combustion and corrosion. Cover at least three distinct categories of impact with evidence.",
        scaffolds: [
          "Environmental impacts of combustion include...",
          "The health (social) impact is shown by the Lancet data which found...",
          "Economically, corrosion costs... because...",
          "Developing economies are particularly affected because...",
          "These impacts interact because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one impact.",
            keywords: [
              "pollution",
              "co₂",
              "corrosion",
              "cost",
              "health",
              "environment",
              "damage",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two categories of impact with brief explanations.",
            keywords: [
              "co₂",
              "greenhouse",
              "smog",
              "health",
              "corrosion",
              "cost",
              "economic",
              "nox",
              "particulates",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Environmental, social and economic impacts with evidence.",
            keywords: [
              "9 million",
              "16%",
              "lancet",
              "co₂",
              "acid rain",
              "nox",
              "particulate",
              "2.5 trillion",
              "developing",
              "social",
            ],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor:
              "Systemic feedback loops identified; 2040 vehicle projections used; unequal distribution noted.",
            keywords: [
              "2 billion",
              "2040",
              "feedback",
              "china",
              "india",
              "unequal",
              "double burden",
              "systemic",
              "transition",
              "bernstein",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the benefits and costs of fossil fuel combustion and form an evidence-based position.",
      guided: [
        {
          level: 2,
          body: "'Burning fuels is bad because it pollutes the air.' — A simple opinion without evidence or balanced consideration of trade-offs.",
        },
        {
          level: 4,
          body: "'Burning fossil fuels provides energy for transport and heating, which supports economic development. However, the CO₂, CO and particulates produced harm health and the environment. On balance, a transition to cleaner fuels like LPG or electricity is needed.' — Uses evidence from both sides with a tentative conclusion.",
        },
        {
          level: 6,
          body: "A balanced judgement considers multiple perspectives: 'The benefits of fossil fuels — powering 1.1 billion vehicles and generating economic development — are enormous, especially for emerging economies. The costs — 9 million premature deaths per year (Lancet, 2015), CO₂ contributions to climate change, and US$2.5 trillion in annual corrosion damage — are equally enormous. Developing nations cannot simply switch to EVs; the transition must account for financial and technical inequality. LPG represents a near-term reduction in health impacts while longer-term solutions are developed.'",
        },
        {
          level: 8,
          body: "A nuanced judgement: weighs short-term versus long-term consequences (short: energy access and economic growth; long: compounding climate, health and corrosion costs); considers who benefits and who bears the costs (wealthy nations transition to EVs; food-insecure nations burn coal for growth); examines alternatives (LPG, hydrogen fuel cells, EVs, green chemistry corrosion prevention); acknowledges uncertainty in impact projections; and arrives at a specific, calibrated conclusion with stated caveats about the pace and equity of the energy transition.",
        },
      ],
      response: {
        kind: "reflection",
        prompt:
          "Is the continued widespread use of fossil fuels as the primary energy source for transport a net positive or net negative for humanity? Construct a reasoned, evidence-based judgement that weighs the trade-offs.",
        scaffolds: [
          "Evidence supporting continued fossil fuel use includes...",
          "Evidence against includes... (cite specific numbers)...",
          "A key trade-off is...",
          "Stakeholders view this differently — for example, a farmer in a low-income country would say... whereas an environmental scientist might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Simple opinion without evidence.",
            keywords: ["good", "bad", "positive", "negative", "fuel", "pollution", "harmful"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One argument from each side with some evidence.",
            keywords: [
              "energy",
              "transport",
              "pollution",
              "co₂",
              "benefit",
              "cost",
              "evidence",
              "however",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Multiple perspectives; trade-offs identified; reasoned conclusion.",
            keywords: [
              "9 million",
              "lancet",
              "2.5 trillion",
              "emerging",
              "trade-off",
              "lpg",
              "transition",
              "stakeholder",
              "inequality",
              "on balance",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Short vs long-term; distribution of costs; alternatives evaluated; uncertainty acknowledged.",
            keywords: [
              "short-term",
              "long-term",
              "developing",
              "ev",
              "hydrogen fuel cell",
              "green chemistry",
              "calibrated",
              "caveats",
              "equity",
              "uncertainty",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain why corrosion is such a costly global problem and what chemistry tells us about preventing it.",
      guided: [
        {
          level: 2,
          body: "Restating the definition without explanation: 'Corrosion is when metals oxidise and break down. It is a problem because it damages structures.' — uses jargon without making the scale or chemistry accessible.",
        },
        {
          level: 4,
          body: "A simple explanation for a non-specialist: 'Corrosion is when metals like iron react with oxygen in the air to form rust. This weakens bridges, ships and pipelines over time. Chemists prevent corrosion by coating metals with paint or zinc, which reacts with oxygen first, protecting the iron beneath.' Good start — but doesn't explain why it costs so much or link to the underlying chemistry.",
        },
        {
          level: 6,
          body: "A clear, connected explanation: 'Every time iron gains oxygen — the process called oxidation — it forms a crumbly, weak oxide called rust. At a global scale, this destroys an estimated US$2.5 trillion worth of infrastructure every year — more than 3% of world GDP. Chemists use knowledge of the reactivity series to design solutions: zinc anodes on ships corrode instead of the steel hull because zinc loses electrons more easily. Understanding the chemical interaction between metal and oxygen lets engineers predict and prevent the damage.'",
        },
        {
          level: 8,
          body: "Excellent communication: uses two linked analogies (oxidation as 'metal slowly burning'; sacrificial anode as 'a bodyguard who takes the hit'), explicitly connects each to the reactivity series and electron transfer, avoids jargon (explains 'oxidation' as 'losing electrons to oxygen', 'reactivity series' as 'a ranking of how eagerly metals give away electrons'), addresses a likely misconception ('corrosion isn't just a surface problem — once rust forms it flakes off, exposing fresh metal'), and explains industrial relevance ('that's why ISAM coatings are exciting — they block oxidation at the molecular level without toxic chemicals, and they can be sprayed on anything from planes to pipelines').",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "The annual global cost of corrosion is estimated at US$2.5 trillion. Approximately what percentage of the world's GDP does this represent?",
            options: [
              { id: "a", text: "Less than 1%" },
              { id: "b", text: "About 3%", correct: true },
              { id: "c", text: "About 10%" },
              { id: "d", text: "About 25%" },
            ],
            explanation:
              "Corrosion costs approximately US$2.5 trillion annually, which is over 3% of the world's gross domestic product (GDP). Public and private organisations spend enormous amounts developing and implementing corrosion prevention strategies.",
          },
        ],
        prompt:
          "Explain to a Year 9 student who has never studied chemistry: why does corrosion cost the world so much money, and what can chemists do about it? Use at least one analogy and avoid jargon (or explain any technical term you use).",
        scaffolds: [
          "Imagine metal as something that is constantly trying to...",
          "The chemistry behind corrosion is...",
          "The reason this is so costly is...",
          "Chemists use knowledge of the reactivity series to...",
          "A new solution being developed is ISAM coatings, which...",
          "A common misconception is that paint alone is enough — actually...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Restates definition with jargon; no analogy.",
            keywords: ["oxidation", "iron", "rust", "oxygen", "metal", "corrosion"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Simple analogy present; prevention mentioned; accessible language.",
            keywords: ["analogy", "protect", "paint", "zinc", "oxygen", "react", "accessible"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "Cost quantified; reactivity series linked to prevention; explanation accessible.",
            keywords: [
              "2.5 trillion",
              "3%",
              "reactivity series",
              "electrons",
              "sacrificial",
              "zinc",
              "analogy",
              "accessible",
              "engineer",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Two analogies; jargon explained; misconception addressed; ISAM or green chemistry mentioned.",
            keywords: [
              "analogy",
              "jargon",
              "misconception",
              "flakes off",
              "isam",
              "molecular level",
              "electrons",
              "bodyguard",
              "sprayed",
              "industrial",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
