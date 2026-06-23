import type { StrandhootPack } from "../engine/types"

export const evidenceCritD: StrandhootPack = {
  slug: "evidence-crit-d",
  title: "Evidence, Innovation & the Climate Challenge",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Science, technology and environmental responsibility",
  accent: "#27ae60",
  icon: "🌿",
  statementOfInquiry:
    "Our ability to collect evidence improves with advances in science and technical innovations.",
  estMinutes: 28,
  intro:
    "Fractional distillation, spectroscopy, atmospheric monitoring and biofuel technology all demonstrate how scientific and technical innovations have advanced our ability to gather evidence about the chemical world. Reflect on these applications, consider their environmental and social impacts, weigh the trade-offs, and practise communicating the science clearly.",
  badges: [
    {
      id: "applicator-d",
      label: "Real World Link",
      icon: "🌍",
      description: "Reach Level 8 on Applications",
      strandId: "applications",
      atLevel: 8,
    },
    {
      id: "critic-d",
      label: "Impact Analyst",
      icon: "⚠️",
      description: "Reach Level 8 on Implications & impacts",
      strandId: "impacts",
      atLevel: 8,
    },
    {
      id: "judge-d",
      label: "Evidence Judge",
      icon: "⚖️",
      description: "Reach Level 8 on Making a judgement",
      strandId: "judgement",
      atLevel: 8,
    },
    {
      id: "communicator-d",
      label: "Science Voice",
      icon: "📢",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Evidence & innovation context",
      blurb: "Fossil fuels, biofuels, atmospheric monitoring and technical innovation",
      icon: "🔭",
    },
  ],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor:
        "Identify real applications of Chapter 2 chemistry — from fractional distillation to noble gas uses — and explain their significance.",
      guided: [
        {
          level: 2,
          body: "Fractional distillation of crude oil separates it into fractions with different boiling points. Petrol (gasoline) is used as fuel for cars; kerosene fuels jet aircraft. Noble gases such as helium are used in MRI scanners and argon fills light bulbs.",
        },
        {
          level: 4,
          body: "Crude oil fractions by boiling point range: refinery gas (<40°C) — bottled gas for cooking; gasoline (40–100°C) — petrol for cars; naphtha (80–180°C) — making plastics; kerosene (160–250°C) — jet fuel; diesel (250–300°C) — lorries and tractors; fuel oil (350–500°C) — power stations and ships; bitumen (residue) — road surfaces. Noble gases: helium (b.p. −269°C) cools superconducting MRI magnets; argon fills vaccine ampoules and welding atmospheres; neon/xenon produce unique emission spectra used in spectroscopic analysis.",
        },
        {
          level: 6,
          body: "Technical innovation examples from Chapter 2: (1) Emission spectroscopy — each element's unique spectral fingerprint enables identification of elements in unknown samples; helium was identified in the Sun's spectrum before it was isolated on Earth. (2) Gas chromatography combined with mass spectrometry (GC-MS) enables chemists to identify the precise hydrocarbon composition of different crude oil samples — Saharan crude (API gravity 44°) has very different composition to Venezuelan heavy oil (API gravity 10.7°). (3) Mauna Loa Observatory: continuous atmospheric monitoring since 1958 has produced the iconic 'Keeling Curve', the definitive evidence of rising CO₂.",
        },
        {
          level: 8,
          body: "Quantified applications: daily global crude oil consumption is ~100 million barrels; in 2017 the top producers were Russia, Saudi Arabia, USA and China. Fractional distillation enables the chemical industry to obtain ethene (from naphtha cracking) at industrial scale — ethene is the feedstock for poly(ethene), the world's most-produced plastic (>100 million tonnes yr⁻¹). Noble gas applications demonstrate the statement of inquiry directly: the discovery of helium via spectroscopy (1868 — without a physical sample) exemplifies how advancing analytical technology enables evidence collection that was previously impossible. OCO-2 satellite (launched 2014) now maps global CO₂ distribution with ~1 ppm precision, a revolution in atmospheric evidence-gathering.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "Which fraction of crude oil has the lowest boiling point range and is collected at the top of the fractionating column?",
            options: [
              { id: "a", text: "Diesel oil (250–300°C)" },
              { id: "b", text: "Kerosene (160–250°C)" },
              { id: "c", text: "Refinery gas (<40°C)", correct: true },
              { id: "d", text: "Bitumen (residue)" },
            ],
            explanation:
              "Short-chain hydrocarbons have low boiling points and are highly volatile — they rise to the top of the fractionating column. Refinery gas (<40°C) is collected as a gas and bottled for cooking and heating.",
          },
          {
            id: "s2",
            prompt:
              "Helium was detected in the Sun's emission spectrum in 1868, 27 years before it was isolated on Earth. What does this demonstrate?",
            options: [
              { id: "a", text: "Helium is only found in space, not on Earth" },
              { id: "b", text: "Spectroscopic evidence can enable scientific discovery without a physical sample", correct: true },
              { id: "c", text: "The Sun and Earth have completely different chemical compositions" },
              { id: "d", text: "Emission spectroscopy was invented in 1868" },
            ],
            explanation:
              "Each element has a unique emission spectrum. Detecting helium's spectral lines in sunlight provided evidence of its existence before a terrestrial sample was available — a powerful example of how technical innovation (spectroscopy) extends evidence-gathering beyond physical access.",
          },
        ],
        prompt:
          "Describe real applications of chemistry and technology from Chapter 2. Explain how scientific and technical innovations have enabled these applications and improved our ability to gather evidence.",
        scaffolds: [
          "Fractional distillation is used to..., which is important because...",
          "Noble gases have the application of... because they are inert...",
          "Spectroscopy enables scientists to..., for example...",
          "The Mauna Loa Observatory has improved our ability to collect evidence by...",
          "One application I find particularly significant is..., because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one application.",
            keywords: [
              "fractional distillation",
              "petrol",
              "helium",
              "noble gas",
              "kerosene",
              "mri",
              "spectroscopy",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two applications with brief explanations of why they are important.",
            keywords: [
              "crude oil",
              "fractions",
              "boiling point",
              "noble gas",
              "inert",
              "spectroscopy",
              "mauna loa",
              "mri",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Multiple applications across sectors; innovation linked to evidence-collection; helium/spectroscopy example used.",
            keywords: [
              "emission spectrum",
              "helium",
              "sun",
              "spectroscopy",
              "mauna loa",
              "keeling curve",
              "gc-ms",
              "evidence",
              "innovation",
              "unique",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Quantified applications; OCO-2 satellite named; poly(ethene) scale; statement of inquiry explicitly addressed.",
            keywords: [
              "100 million barrels",
              "oco-2",
              "2014",
              "satellite",
              "poly(ethene)",
              "100 million tonnes",
              "statement of inquiry",
              "evidence",
              "1 ppm precision",
              "1868",
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
        "Evaluate the environmental, social and economic impacts of fossil fuel use and atmospheric CO₂ rise.",
      guided: [
        {
          level: 2,
          body: "Burning fossil fuels releases CO₂, which is a greenhouse gas. This contributes to global warming and climate change. In 2016, more than 35 countries were over 90% dependent on fossil fuels for energy.",
        },
        {
          level: 4,
          body: "Environmental: CO₂ and methane (greenhouse gases) trap infrared radiation, raising Earth's surface temperature. This causes: ice cap melting → sea level rise; more extreme weather; ocean acidification (CO₂ + H₂O → H₂CO₃). Social: communities dependent on fossil fuel industries face economic disruption during energy transition. Economic: fossil fuels are non-renewable; as reserves deplete, costs rise. Countries with >90% fossil fuel dependency (e.g. Malta, 99%) are economically vulnerable to price changes.",
        },
        {
          level: 6,
          body: "At the global scale: atmospheric CO₂ surpassed 400 ppm in 2015 — the first time in recorded history. Evidence from ice cores shows pre-industrial CO₂ was ~280 ppm; human activity has increased it by ~40%. The Paris Agreement (December 2015, 195 countries) set a target to limit warming to 1.5–2°C above pre-industrial levels. Biofuels represent a partial technical solution: ethanol produced from sugar cane (Brazil is the world's second-largest producer) is considered near-carbon-neutral, since the CO₂ released on combustion was recently fixed by photosynthesis. Global ethanol production grew from ~13 billion gallons (2007) to ~25 billion gallons (2016).",
        },
        {
          level: 8,
          body: "Multi-level analysis: burning fossil fuels releases not only CO₂ but also sulfur dioxide (from high-sulfur crudes like Venezuelan Boscan, 5.3% S) causing acid rain; particulate matter contributing to respiratory disease; and nitrogen oxides from vehicle engines. The 'sweet crude' vs 'sour crude' distinction (sulfur content <0.5% = sweet) directly affects the environmental cost of refining — sweet crude (e.g. Saharan, 0.2% S) commands a higher market price because it requires less desulfurisation. These costs and benefits are not equally distributed: oil-producing nations gain economically but communities near refineries bear environmental health costs. The systemic challenge is that fossil fuel infrastructure built over 150 years cannot be decarbonised quickly without massive investment and social disruption.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "What is the main greenhouse gas released by the combustion of fossil fuels?",
            options: [
              { id: "a", text: "Nitrogen (N₂)" },
              { id: "b", text: "Carbon dioxide (CO₂)", correct: true },
              { id: "c", text: "Argon (Ar)" },
              { id: "d", text: "Oxygen (O₂)" },
            ],
            explanation:
              "Combustion of hydrocarbons produces CO₂ and H₂O. CO₂ is a greenhouse gas — it absorbs outgoing infrared radiation and re-emits it, warming the atmosphere. Atmospheric CO₂ has increased from ~280 ppm (pre-industrial) to over 400 ppm today.",
          },
        ],
        prompt:
          "Evaluate the environmental, social and economic impacts of global dependence on fossil fuels. Cover at least three categories of impact and use specific evidence from Chapter 2.",
        scaffolds: [
          "Environmental impacts include...",
          "The combustion of fossil fuels releases..., which causes...",
          "Socially, communities that depend on fossil fuels face...",
          "Economically, non-renewable fossil fuels cause vulnerability because...",
          "Biofuels offer a partial solution because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one impact.",
            keywords: [
              "co2",
              "global warming",
              "greenhouse",
              "climate",
              "pollution",
              "fossil fuel",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two categories of impact with brief explanations.",
            keywords: [
              "co2",
              "greenhouse",
              "sea level",
              "economic",
              "non-renewable",
              "dependent",
              "social",
              "environmental",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Environmental, social and economic impacts with data; Paris Agreement; biofuels mentioned.",
            keywords: [
              "400 ppm",
              "2015",
              "paris agreement",
              "biofuel",
              "ethanol",
              "carbon-neutral",
              "sea level",
              "280 ppm",
              "40%",
              "social",
            ],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor:
              "Sulfur dioxide / acid rain; sweet vs sour crude; unequal distribution of costs and benefits; systemic infrastructure challenge.",
            keywords: [
              "sulfur dioxide",
              "acid rain",
              "sweet crude",
              "sour crude",
              "boscan",
              "5.3%",
              "unequal",
              "refinery",
              "health",
              "infrastructure",
              "systemic",
              "desulfurisation",
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
        "Weigh the benefits and costs of continued fossil fuel use versus the transition to alternatives, and form an evidence-based position.",
      guided: [
        {
          level: 2,
          body: "'Fossil fuels are bad because they cause climate change.' — A simple opinion without evidence or acknowledgement of the scale of current dependence.",
        },
        {
          level: 4,
          body: "'Fossil fuels have powered industrial development and feed the global economy, but the evidence of rising CO₂ (from 280 to 400+ ppm) shows the environmental cost is severe. On balance, we need to transition to renewables.' — Uses evidence from both sides.",
        },
        {
          level: 6,
          body: "A balanced judgement: 'The benefits of fossil fuels — energy density, existing infrastructure, economic output — are substantial. The costs — rising CO₂ (now exceeding 400 ppm for the first time in recorded history), ocean acidification, health impacts from particulates — are also substantial and growing. The transition to biofuels and renewables offers a path, but biofuels from crops compete with food production and may drive deforestation. On balance, evidence supports urgent decarbonisation, but the pace must consider economic and social disruption, particularly for communities in fossil fuel-dependent nations.'",
        },
        {
          level: 8,
          body: "A nuanced judgement distinguishes short-term vs long-term consequences: short-term, fossil fuels remain the most energy-dense, lowest-cost option in many markets; long-term, the cost of inaction (climate damage, health, biodiversity loss) exceeds the cost of transition. It acknowledges uncertainty: climate models have different sensitivity estimates (1.5–4.5°C per doubling of CO₂). It considers distributional justice: low-income nations produce less CO₂ but face more severe climate impacts. It evaluates the evidence quality: ice cores + Mauna Loa + satellite data = converging evidence of high confidence. It arrives at a calibrated conclusion with stated caveats.",
        },
      ],
      response: {
        kind: "reflection",
        prompt:
          "Is continued global dependence on fossil fuels justified? Construct a reasoned, evidence-based judgement that weighs the trade-offs between current dependence and the need for transition.",
        scaffolds: [
          "Evidence supporting continued fossil fuel use includes...",
          "Evidence against continued use includes...",
          "A key trade-off is...",
          "Different stakeholders view this differently — for example, a government in an oil-producing nation would say... whereas a climate scientist might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Simple opinion without evidence.",
            keywords: [
              "bad",
              "good",
              "positive",
              "negative",
              "fossil fuel",
              "climate",
              "environment",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One argument from each side with evidence.",
            keywords: [
              "co2",
              "400 ppm",
              "evidence",
              "benefit",
              "cost",
              "however",
              "on balance",
              "economy",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Multiple perspectives; trade-offs identified; biofuels/food conflict; reasoned conclusion.",
            keywords: [
              "trade-off",
              "stakeholder",
              "biofuel",
              "food production",
              "deforestation",
              "400 ppm",
              "infrastructure",
              "decarbonisation",
              "social",
              "on balance",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Short vs long-term; distributional justice; climate sensitivity uncertainty; converging evidence quality assessed.",
            keywords: [
              "short-term",
              "long-term",
              "distributional",
              "low-income",
              "climate sensitivity",
              "1.5",
              "4.5",
              "uncertainty",
              "ice core",
              "satellite",
              "converging",
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
        "Explain how advances in scientific technology have improved our ability to collect evidence, using an accessible analogy for a non-specialist audience.",
      guided: [
        {
          level: 2,
          body: "Restating the statement of inquiry without explaining it: 'Our ability to collect evidence improves with advances in science and technology.' — This is a restatement, not a communication of what that means in practice.",
        },
        {
          level: 4,
          body: "An example helps: 'Scientists now use satellites to measure CO₂ across the whole planet, whereas in the past they could only measure it at one location. This is like going from reading the temperature in one room to having a thermometer in every room of the house.' A good start, but doesn't explain the chemistry or why the improvement matters for our understanding.",
        },
        {
          level: 6,
          body: "A clear explanation with a linked analogy: 'Imagine trying to understand traffic patterns from one traffic camera versus a whole city's GPS network — the more sensors you have, the better your evidence. Scientists collecting atmospheric CO₂ data have made this leap: from Mauna Loa's single station (1958) to the OCO-2 satellite (2014), which maps CO₂ globally at ~1 ppm precision. Each technical advance gives us a clearer, more reliable picture of how human activity is changing the atmosphere. Better evidence means more confident conclusions and better policy decisions.'",
        },
        {
          level: 8,
          body: "Excellent communication uses two linked analogies (one for improved precision, one for spatial coverage), explicitly connects each to a Chapter 2 example, avoids jargon (explains 'ppm' as 'parts per million — like 400 grains of sand in a million', 'infrared radiation' as 'invisible heat rays'), addresses a likely misconception ('CO₂ is natural — volcanoes make it — so how do we know the rise is human-caused?') and answers it using isotopic evidence (¹²C vs ¹³C ratios from mass spectrometry distinguish fossil fuel emissions from volcanic CO₂), and explains why this matters for policy.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "A student says: 'Volcanoes also produce CO₂ naturally — so how do scientists know the rising CO₂ is caused by humans, not volcanoes?' Which response best addresses this?",
            options: [
              {
                id: "a",
                text: "Volcanoes produce far more CO₂ than humans every year",
              },
              {
                id: "b",
                text: "Isotopic analysis shows fossil fuel CO₂ has a distinct ¹²C signature different from volcanic CO₂",
                correct: true,
              },
              {
                id: "c",
                text: "Scientists simply ignore volcanic CO₂ in their measurements",
              },
              {
                id: "d",
                text: "Volcanoes have been inactive for the past 100 years",
              },
            ],
            explanation:
              "Mass spectrometry can distinguish between carbon isotopes. Fossil fuels are depleted in ¹³C (they formed from ancient organic matter). The observed pattern of decreasing ¹³C/¹²C ratio in atmospheric CO₂ over time is a chemical fingerprint of fossil fuel combustion — not volcanic activity.",
          },
        ],
        prompt:
          "Explain to a Year 9 student (with no chemistry background) how advances in science and technology have improved our ability to collect evidence about the atmosphere. Use at least one everyday analogy and address a likely misconception.",
        scaffolds: [
          "Imagine trying to understand... using only one...",
          "With advances in technology, scientists can now...",
          "This is like going from... to...",
          "One example of this is..., which works by...",
          "A common misconception is...; in fact, scientists know that... because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Restates the statement of inquiry with jargon.",
            keywords: ["evidence", "technology", "advances", "improve", "science"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Gives one analogy but does not link it to specific chemistry.",
            keywords: ["analogy", "thermometer", "satellite", "camera", "sensor", "gps"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor:
              "Analogy linked to atmospheric chemistry; Mauna Loa and OCO-2 mentioned; policy relevance stated.",
            keywords: [
              "mauna loa",
              "oco-2",
              "satellite",
              "analogy",
              "ppm",
              "policy",
              "evidence",
              "global",
              "explains",
              "non-specialist",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Two analogies; jargon explained; misconception addressed; isotopic evidence used to distinguish volcanic vs fossil fuel CO₂.",
            keywords: [
              "analogy",
              "jargon",
              "misconception",
              "isotopic",
              "carbon-12",
              "carbon-13",
              "mass spectrometry",
              "volcanic",
              "fossil fuel",
              "ppm explained",
              "policy",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
