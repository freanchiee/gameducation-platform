import type { StrandhootPack } from "../engine/types"

// D3 — Climate Change & the Greenhouse Effect · Criterion D (Reflecting on the Impacts of Science)
// Sources: Hodder Ch.9 "Global warming"; Oxford Ch.10 "Thermal physics"; Cambridge §3.5; IPCC AR6 SPM.
export const climateCritD: StrandhootPack = {
  slug: "climate-crit-d",
  title: "Climate Change & the Greenhouse Effect",
  subject: "MYP Physics",
  criterion: "D",
  topic: "Climate change & greenhouse effect",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry:
    "The greenhouse effect sustains life on Earth, but human activity has amplified it — the consequences challenge science, society and every individual.",
  estMinutes: 30,
  intro:
    "Examine the science of the greenhouse effect, explore the environmental and human impacts of climate change, and consider what individuals, governments and scientists should do. Your reasoning levels up as you weigh the evidence.",
  badges: [
    {
      id: "greenhouse-scientist",
      label: "Greenhouse Scientist",
      icon: "🔬",
      description: "Reach Level 8 on Applications",
      strandId: "apply",
      atLevel: 8,
    },
    {
      id: "impact-mapper",
      label: "Impact Mapper",
      icon: "🗺️",
      description: "Reach Level 8 on Implications & Impacts",
      strandId: "impacts",
      atLevel: 8,
    },
    {
      id: "climate-arbiter",
      label: "Climate Arbiter",
      icon: "⚖️",
      description: "Reach Level 8 on Balanced Judgement",
      strandId: "judge",
      atLevel: 8,
    },
    {
      id: "data-literate",
      label: "Data Literate",
      icon: "📊",
      description: "Reach Level 6+ on every strand",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Climate science",
      blurb: "Explore the greenhouse effect and its global impacts",
      icon: "🌍",
    },
  ],
  strands: [
    {
      id: "apply",
      name: "How the science is applied",
      descriptor:
        "Explain the mechanism of the greenhouse effect and how human activity enhances it.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: States that greenhouse gases trap heat and cause warming.",
        },
        {
          level: 4,
          body: "Level 3–4: Names key greenhouse gases (CO₂, CH₄, water vapour) and states they come from human activities such as burning fossil fuels.",
        },
        {
          level: 6,
          body: "Level 5–6: Explains the mechanism — solar radiation (short wavelength visible light) passes through the atmosphere; Earth's surface absorbs and re-emits longer-wavelength infrared radiation; greenhouse gases absorb and re-emit this IR, warming the lower atmosphere. Human activity has increased CO₂ concentration, enhancing the effect.",
        },
        {
          level: 8,
          body: "Level 7–8: Explains positive feedback loops (e.g. ice-albedo: as ice melts, darker ocean absorbs more radiation, causing more warming and more melting), the role of the IPCC in synthesising scientific evidence, and how models project future warming under different emission scenarios.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "ap1",
            prompt:
              "Why does Earth's atmosphere absorb infrared radiation re-emitted from the surface but allow most incoming solar radiation through?",
            options: [
              { id: "a", text: "Solar radiation is blocked by the ozone layer; IR is not" },
              {
                id: "b",
                text: "Greenhouse gases are transparent to short-wavelength visible light but absorb longer-wavelength infrared radiation",
                correct: true,
              },
              {
                id: "c",
                text: "The atmosphere is hotter than the Sun, so it absorbs all radiation",
              },
              { id: "d", text: "Infrared radiation is produced only during the day" },
            ],
            explanation:
              "Greenhouse gases (CO₂, CH₄, water vapour) are largely transparent to incoming visible light but absorb the longer-wavelength infrared radiation emitted by the warm Earth's surface, re-radiating it and warming the lower atmosphere.",
          },
          {
            id: "ap2",
            prompt:
              "Which of the following is an example of a positive feedback loop in climate change?",
            options: [
              {
                id: "a",
                text: "More CO₂ leads to more plant growth, which absorbs CO₂ (negative feedback)",
              },
              {
                id: "b",
                text: "Warming melts Arctic ice, exposing darker ocean that absorbs more radiation, causing further warming",
                correct: true,
              },
              { id: "c", text: "More rainfall absorbs CO₂ from the atmosphere, slowing warming" },
              { id: "d", text: "Higher temperatures reduce water evaporation, decreasing water vapour" },
            ],
            explanation:
              "The ice-albedo feedback is a classic positive feedback: melting ice reduces Earth's reflectivity (albedo), so more solar energy is absorbed, raising temperatures further and melting more ice.",
          },
        ],
        prompt:
          "Explain how the greenhouse effect works and how human activities have changed it. Include the role of specific greenhouse gases and the energy transfers involved.",
        scaffolds: [
          "Solar radiation reaches Earth as",
          "The Earth's surface absorbs this energy and re-emits it as",
          "Greenhouse gases such as CO₂ and CH₄",
          "Human activities, especially burning fossil fuels, have",
          "A positive feedback loop that amplifies warming is",
        ],
        placeholder: "Explain the greenhouse effect mechanism and human enhancement of it…",
        rubric: [
          {
            level: 2,
            descriptor: "States that greenhouse gases trap heat.",
            keywords: ["greenhouse", "heat", "warm", "atmosphere", "gas"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Names greenhouse gases and links to human activity.",
            keywords: ["co2", "ch4", "methane", "fossil fuels", "burning", "emissions"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Explains infrared absorption mechanism and enhanced greenhouse effect.",
            keywords: [
              "infrared",
              "wavelength",
              "absorb",
              "re-emit",
              "visible light",
              "surface",
              "concentration",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Discusses positive feedback loops, IPCC, and emission scenarios.",
            keywords: [
              "feedback",
              "albedo",
              "ipcc",
              "model",
              "scenario",
              "amplify",
              "water vapour",
              "projection",
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
        "Discuss the environmental, social and economic impacts of climate change, including issues of justice.",
      guided: [
        {
          level: 2,
          body: 'Level 1–2: States one impact, e.g. "it is getting hotter."',
        },
        {
          level: 4,
          body: "Level 3–4: Gives impacts in two categories, e.g. environmental (ice melting, sea level rise) and economic (damage costs, adaptation).",
        },
        {
          level: 6,
          body: "Level 5–6: Discusses environmental impacts (rising temperatures, sea level rise flooding coastal regions and islands, more frequent extreme weather, biodiversity loss), economic impacts (damage to infrastructure, cost of adaptation and mitigation), and social impacts (displacement of vulnerable communities, food and water insecurity, climate justice).",
        },
        {
          level: 8,
          body: "Level 7–8: Weighs trade-offs between mitigation cost now vs. future damage, identifies that poorer nations contribute least to emissions but suffer most (climate justice), recognises scientific consensus vs. political disagreement, and considers the Paris Agreement targets in context of current trajectories.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "im1",
            prompt:
              "Sea level is rising due to climate change. Which two physical processes contribute most to this rise?",
            options: [
              {
                id: "a",
                text: "Melting of land-based ice (glaciers and ice sheets) and thermal expansion of ocean water as it warms",
                correct: true,
              },
              { id: "b", text: "Evaporation of ocean water and increased rainfall over the ocean" },
              { id: "c", text: "Melting of sea ice and increased ocean currents" },
              { id: "d", text: "Increased tidal forces from the Moon and thermal contraction of land" },
            ],
            explanation:
              "Sea level rise has two main causes: melting of glaciers and ice sheets adds water to the ocean, and thermal expansion occurs because water expands as it warms. Melting sea ice does not raise sea level because it is already displacing its weight in water.",
          },
          {
            id: "im2",
            prompt:
              "Which statement best reflects the concept of 'climate justice'?",
            options: [
              {
                id: "a",
                text: "All countries should reduce emissions by the same percentage",
              },
              {
                id: "b",
                text: "Wealthier countries that have contributed most to historical emissions bear greater responsibility to act, while vulnerable low-emitting nations face the worst impacts",
                correct: true,
              },
              { id: "c", text: "Climate change affects all countries equally regardless of wealth" },
              { id: "d", text: "Developing nations should not need to reduce emissions" },
            ],
            explanation:
              "Climate justice recognises that historical CO₂ emissions have been concentrated in wealthy industrialised nations, yet low-income countries — particularly small island states and sub-Saharan Africa — face disproportionately severe impacts despite contributing far less to the problem.",
          },
        ],
        prompt:
          "Discuss the environmental, economic and social impacts of climate change, and explain why some groups of people are affected more than others.",
        scaffolds: [
          "Environmentally, climate change causes",
          "Economically, the costs include",
          "Socially, groups most affected include",
          "Climate justice refers to",
          "The Paris Agreement aims to",
        ],
        placeholder: "Discuss impacts across environment, economy and society, including justice…",
        rubric: [
          {
            level: 2,
            descriptor: "States one impact.",
            keywords: ["warm", "hot", "flood", "melt", "sea level", "storm"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Impacts in two categories.",
            keywords: [
              "sea level",
              "biodiversity",
              "economic",
              "cost",
              "displacement",
              "food",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Environmental, economic AND social impacts with reasoning.",
            keywords: [
              "sea level rise",
              "biodiversity loss",
              "extreme weather",
              "adaptation",
              "displacement",
              "food security",
              "water",
              "social",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Weighs trade-offs, climate justice, Paris Agreement, consensus vs. politics.",
            keywords: [
              "climate justice",
              "paris agreement",
              "trade-off",
              "vulnerable",
              "historical emissions",
              "mitigation",
              "consensus",
              "trajectory",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "judge",
      name: "Making a balanced judgement",
      descriptor:
        "Make a balanced judgement about individual vs. systemic responsibility for addressing climate change, and the role of science.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: States a simple opinion (e.g. 'everyone should recycle') with no reasoning.",
        },
        {
          level: 4,
          body: "Level 3–4: Argues for individual or systemic action with one reason.",
        },
        {
          level: 6,
          body: "Level 5–6: Makes a balanced judgement acknowledging that both individual actions (diet, transport, energy use) and systemic changes (government policy, international agreements, technological innovation) are necessary, and explains the role of science in informing decisions.",
        },
        {
          level: 8,
          body: "Level 7–8: Evaluates multiple perspectives (individual moral responsibility vs. structural change; developed vs. developing nations; scientific consensus vs. economic interests), considers the limits of what science alone can determine (values and priorities are political), and reaches a nuanced, evidence-informed conclusion.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "jd1",
            prompt:
              "A student argues: 'Individual actions like recycling and eating less meat are too small to matter — only governments can fix climate change.' Is this claim fully justified?",
            options: [
              { id: "a", text: "Yes — individual actions have no impact on global emissions" },
              {
                id: "b",
                text: "Partly — individual choices do matter and collectively are significant, but systemic government and industry action is also essential and can achieve change at much greater scale",
                correct: true,
              },
              { id: "c", text: "No — individuals alone can solve climate change without government action" },
              { id: "d", text: "Yes — governments are responsible for all emissions, not individuals" },
            ],
            explanation:
              "The IPCC recognises that both demand-side (individual behaviour) and supply-side (policy, technology) changes are needed. Individual actions collectively matter — global food systems alone account for ~26% of emissions — but cannot substitute for systemic policy change.",
          },
          {
            id: "jd2",
            prompt:
              "Which statement best describes the role of science in climate change decisions?",
            options: [
              {
                id: "a",
                text: "Science tells us exactly what policies to adopt",
              },
              {
                id: "b",
                text: "Science provides evidence about what is happening and likely consequences, but decisions about what to do also involve values, economics and politics",
                correct: true,
              },
              { id: "c", text: "Science has no role to play in climate policy" },
              {
                id: "d",
                text: "Scientists disagree too much on climate change to guide any decisions",
              },
            ],
            explanation:
              "There is overwhelming scientific consensus on the reality and causes of climate change (IPCC AR6). However, choosing how to respond involves trade-offs between values, economic costs, equity and political feasibility — areas where science informs but does not dictate.",
          },
        ],
        prompt:
          "Make a balanced judgement: who is responsible for addressing climate change — individuals, governments, corporations, or all three? What role should science play?",
        scaffolds: [
          "Individual actions such as … can contribute by",
          "However, systemic change requires",
          "Science can inform decisions by",
          "Science alone cannot determine … because",
          "A balanced conclusion is that",
        ],
        placeholder: "Make a balanced judgement about responsibility and the role of science…",
        rubric: [
          {
            level: 2,
            descriptor: "States a simple position.",
            keywords: ["individual", "government", "everyone", "responsibility"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Position with one reason.",
            keywords: [
              "because",
              "policy",
              "systemic",
              "individual",
              "action",
              "emissions",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Balanced view on individual and systemic action, role of science.",
            keywords: [
              "individual",
              "systemic",
              "government",
              "policy",
              "science",
              "evidence",
              "both",
              "necessary",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Nuanced judgement with multiple perspectives, limits of science, values vs. evidence.",
            keywords: [
              "perspective",
              "values",
              "political",
              "equity",
              "scientific consensus",
              "trade-off",
              "limits",
              "ipcc",
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
        "Use data literacy skills to interpret temperature anomaly graphs and IPCC evidence accurately and clearly.",
      guided: [
        {
          level: 2,
          body: "Level 1–2: Makes general statements about warming without using data.",
        },
        {
          level: 4,
          body: "Level 3–4: References data or graphs to support a claim, though interpretation may be imprecise.",
        },
        {
          level: 6,
          body: "Level 5–6: Reads and interprets temperature anomaly data accurately — identifies trends, describes uncertainty ranges, and uses correct terminology (anomaly, baseline, trend, ppm) in a logical written explanation.",
        },
        {
          level: 8,
          body: "Level 7–8: Communicates complex data precisely and critically — identifies what data shows vs. what it doesn't, notes limitations and uncertainty in projections, distinguishes scientific fact from political opinion, and acknowledges counterarguments while explaining why the scientific consensus is robust.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "co1",
            prompt:
              "A temperature anomaly graph shows values relative to a 1951–1980 baseline. A reading of +1.2 °C in 2024 means:",
            options: [
              { id: "a", text: "The global average temperature in 2024 was 1.2 °C" },
              {
                id: "b",
                text: "The 2024 global average temperature was 1.2 °C warmer than the 1951–1980 average",
                correct: true,
              },
              { id: "c", text: "Temperatures rose by 1.2 °C every year since 1980" },
              { id: "d", text: "The temperature anomaly shows total warming since pre-industrial times" },
            ],
            explanation:
              "An anomaly graph shows the difference from a chosen baseline period, not the absolute temperature. +1.2 °C means the 2024 average was 1.2 °C above the 1951–1980 average. This kind of data literacy is essential for accurately communicating climate science.",
          },
          {
            id: "co2",
            prompt:
              "Atmospheric CO₂ concentration is currently about 422 ppm. What does 'ppm' mean, and why does this number matter?",
            options: [
              { id: "a", text: "Parts per million — the number of CO₂ atoms per atom of nitrogen" },
              {
                id: "b",
                text: "Parts per million — 422 CO₂ molecules per million air molecules; this is higher than any time in the past 800,000 years and drives enhanced greenhouse warming",
                correct: true,
              },
              { id: "c", text: "Percentage per million — 422% CO₂ increase" },
              {
                id: "d",
                text: "Parts per million — irrelevant to temperature as CO₂ is a trace gas",
              },
            ],
            explanation:
              "422 ppm means 422 molecules of CO₂ per million molecules of air. Ice core data show pre-industrial levels were ~280 ppm; the current level (>420 ppm) is unprecedented in at least 800,000 years and is the primary driver of observed warming.",
          },
        ],
        prompt:
          "Using data and scientific terminology, explain what temperature anomaly graphs and CO₂ concentration records tell us about climate change. Note any limitations in what the data can tell us.",
        scaffolds: [
          "A temperature anomaly of +1.2 °C means",
          "Atmospheric CO₂ is currently about 422 ppm, which means",
          "This data suggests",
          "However, data has limitations because",
          "The scientific consensus, supported by the IPCC, is that",
        ],
        placeholder: "Interpret climate data accurately, using correct terminology…",
        rubric: [
          {
            level: 2,
            descriptor: "General statements, no data used.",
            keywords: ["warmer", "hotter", "temperature", "co2"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "References data but interpretation may lack precision.",
            keywords: ["data", "graph", "co2", "temperature", "increase", "record"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Accurate interpretation of anomaly and ppm data with correct terms.",
            keywords: [
              "anomaly",
              "baseline",
              "ppm",
              "trend",
              "pre-industrial",
              "celsius",
              "concentration",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Critical data literacy: limitations, uncertainty, fact vs. opinion, robust consensus.",
            keywords: [
              "limitation",
              "uncertainty",
              "consensus",
              "ipcc",
              "fact",
              "opinion",
              "projection",
              "anomaly",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
