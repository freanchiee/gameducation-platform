import type { StrandhootPack } from "../engine/types"

// D1 — Energy resources & sustainability · Criterion D (Reflecting on the Impacts of Science)
// Sources: Hodder Ch.10 "Power to the people?"; Oxford Ch.11 "Energy"; Cambridge §1.7.
export const energyResourcesCritD: StrandhootPack = {
  slug: "energy-resources-crit-d",
  title: "Powering the Future",
  subject: "MYP Physics",
  criterion: "D",
  topic: "Energy resources & sustainability",
  accent: "#7c5cbf",
  icon: "⚡",
  statementOfInquiry:
    "Every energy choice trades off environment, economy and society — reflecting on these impacts shapes a fairer, more sustainable future.",
  estMinutes: 30,
  intro:
    "How should a country generate its electricity? Use the energy-mix explorer to see the trade-offs, then reflect on how energy science is applied, what its impacts are, and how to judge and communicate the choices. Your reasoning levels up as you weigh the evidence.",
  badges: [
    { id: "applier", label: "Tech Translator", icon: "🔌", description: "Reach Level 8 on Applications", strandId: "apply", atLevel: 8 },
    { id: "impacts", label: "Impact Analyst", icon: "🌍", description: "Reach Level 8 on Implications", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Balanced Judge", icon: "⚖️", description: "Reach Level 8 on Judgement", strandId: "judge", atLevel: 8 },
    { id: "communicator", label: "Clear Voice", icon: "🗣", description: "Reach Level 6+ on every strand", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "National grid", blurb: "Choose a country's energy mix", icon: "⚡" }],
  strands: [
    {
      id: "apply",
      name: "How the science is applied",
      descriptor: "Explain how different resources are used to generate electricity.",
      guided: [
        { level: 2, body: "Level 1–2: Names a few energy resources (coal, solar, wind)." },
        { level: 4, body: "Level 3–4: Classifies resources as renewable (solar, wind, hydro) or non-renewable (coal, gas, oil, nuclear fuel)." },
        { level: 6, body: "Level 5–6: Describes how electricity is generated — most stations heat water to make steam that spins a turbine and generator; solar PV converts light directly to electricity; wind and hydro spin turbines mechanically." },
        { level: 8, body: "Level 7–8: Explains the energy transfers in detail (chemical/nuclear → thermal → kinetic → electrical) and compares the efficiency and energy density of different resources." },
      ],
      artifactKey: "resource-mix",
      response: {
        kind: "reflection",
        scenarios: [
          { id: "ap1", prompt: "Which of these is a renewable energy resource?", options: [
            { id: "a", text: "Natural gas" }, { id: "b", text: "Coal" }, { id: "c", text: "Wind", correct: true }, { id: "d", text: "Uranium" },
          ], explanation: "Wind is replenished naturally; the others are finite." },
          { id: "ap2", prompt: "In a coal power station, what spins the generator?", options: [
            { id: "a", text: "Steam turning a turbine", correct: true }, { id: "b", text: "Sunlight" }, { id: "c", text: "Falling water" }, { id: "d", text: "The coal directly" },
          ], explanation: "Burning coal heats water to steam, which spins a turbine connected to the generator." },
        ],
        prompt: "Explain how two different resources are used to generate electricity, including the energy transfers.",
        scaffolds: ["A renewable resource is", "A non-renewable resource is", "The energy is transferred from", "to kinetic energy in the turbine", "and then to electrical energy"],
        placeholder: "Explain how electricity is generated from two resources…",
        rubric: [
          { level: 2, descriptor: "Names energy resources.", keywords: ["coal", "solar", "wind", "gas", "nuclear", "hydro"], minKeywords: 1 },
          { level: 4, descriptor: "Classifies renewable vs non-renewable.", keywords: ["renewable", "non-renewable", "finite", "replenish", "fossil"], minKeywords: 2 },
          { level: 6, descriptor: "Describes the generation process.", keywords: ["turbine", "generator", "steam", "spin", "photovoltaic", "pv", "convert"], minKeywords: 2 },
          { level: 8, descriptor: "Explains energy transfers and compares efficiency/density.", keywords: ["chemical", "nuclear", "thermal", "kinetic", "electrical", "efficiency", "energy density", "transfer"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Discuss the environmental, economic and social impacts.",
      guided: [
        { level: 2, body: "Level 1–2: States one impact, e.g. \"pollution is bad.\"" },
        { level: 4, body: "Level 3–4: Gives one impact in each of two categories, e.g. environmental (CO₂) and economic (cost)." },
        { level: 6, body: "Level 5–6: Discusses environmental, economic AND social impacts — e.g. fossil fuels emit CO₂ driving climate change; renewables have higher upfront cost but low running cost; energy access affects health and jobs." },
        { level: 8, body: "Level 7–8: Weighs competing impacts and recognises trade-offs and uncertainty — e.g. nuclear is low-carbon and reliable but raises waste-storage and safety concerns; intermittent renewables need storage or backup, affecting reliability and cost." },
      ],
      artifactKey: "resource-mix",
      response: {
        kind: "reflection",
        scenarios: [
          { id: "im1", prompt: "Which resource releases the most CO₂ per unit of electricity?", options: [
            { id: "a", text: "Coal", correct: true }, { id: "b", text: "Wind" }, { id: "c", text: "Nuclear" }, { id: "d", text: "Solar" },
          ], explanation: "Coal has by far the highest lifecycle CO₂ (~820 g/kWh)." },
          { id: "im2", prompt: "What is the main drawback of relying only on solar and wind?", options: [
            { id: "a", text: "They emit lots of CO₂" }, { id: "b", text: "Their output is intermittent / not always available", correct: true }, { id: "c", text: "They use uranium" }, { id: "d", text: "They are non-renewable" },
          ], explanation: "Solar and wind are intermittent — output depends on weather and time of day, so storage or backup is needed." },
        ],
        prompt: "Discuss the environmental, economic and social impacts of the energy choices you explored.",
        scaffolds: ["Environmentally,", "Economically,", "Socially,", "However, a trade-off is", "This is uncertain because"],
        placeholder: "Discuss impacts across environment, economy and society…",
        rubric: [
          { level: 2, descriptor: "States one impact.", keywords: ["pollution", "cost", "co2", "climate", "carbon"], minKeywords: 1 },
          { level: 4, descriptor: "Impacts in two categories.", keywords: ["environment", "economic", "cost", "co2", "emission", "jobs"], minKeywords: 2 },
          { level: 6, descriptor: "Environmental, economic AND social impacts.", keywords: ["environment", "economic", "social", "climate change", "health", "access", "reliability", "running cost"], minKeywords: 3 },
          { level: 8, descriptor: "Weighs trade-offs and uncertainty.", keywords: ["trade-off", "however", "waste", "storage", "intermittent", "reliable", "safety", "uncertain", "balance"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judge",
      name: "Making a balanced judgement",
      descriptor: "Recommend an energy mix and justify it with evidence.",
      guided: [
        { level: 2, body: "Level 1–2: Picks a resource with no reason." },
        { level: 4, body: "Level 3–4: Recommends a resource or mix with one reason." },
        { level: 6, body: "Level 5–6: Recommends a balanced mix and justifies it using the trade-offs (e.g. mostly renewables for low carbon, plus some dispatchable nuclear/gas for reliability)." },
        { level: 8, body: "Level 7–8: Makes a reasoned, evidence-based judgement that acknowledges different stakeholders and ethical considerations (cost to consumers, intergenerational climate justice, local communities), and recognises remaining uncertainty." },
      ],
      artifactKey: "resource-mix",
      response: {
        kind: "reflection",
        prompt: "Using the explorer, recommend an energy mix for a country and justify your choice.",
        scaffolds: ["I would recommend a mix of", "because", "To keep CO₂ low while staying reliable,", "A stakeholder who might disagree is", "This is a fair choice because"],
        placeholder: "Recommend and justify a balanced energy mix…",
        rubric: [
          { level: 2, descriptor: "States a choice.", keywords: ["recommend", "use", "best"], minKeywords: 1 },
          { level: 4, descriptor: "Choice with one reason.", keywords: ["because", "renewable", "cheap", "clean", "reliable"], minKeywords: 2 },
          { level: 6, descriptor: "Balanced mix justified by trade-offs.", keywords: ["mix", "balance", "low carbon", "reliable", "dispatchable", "backup", "storage", "trade-off"], minKeywords: 2 },
          { level: 8, descriptor: "Evidence-based judgement with stakeholders/ethics.", keywords: ["stakeholder", "ethical", "justice", "future generations", "consumer", "community", "uncertain", "evidence"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Use accurate scientific language and acknowledge sources.",
      guided: [
        { level: 2, body: "Level 1–2: Everyday words, some terms misused." },
        { level: 4, body: "Level 3–4: Uses some scientific terminology correctly (e.g. renewable, efficiency, emissions)." },
        { level: 6, body: "Level 5–6: Communicates clearly with accurate terminology and units (kWh, gCO₂/kWh), in a logical structure." },
        { level: 8, body: "Level 7–8: Communicates precisely and concisely for the audience, distinguishes fact from opinion, and refers to evidence/sources to support claims." },
      ],
      response: {
        kind: "reflection",
        prompt: "Write a short, clear summary of your recommendation for a general audience, using accurate terms and noting where your evidence comes from.",
        scaffolds: ["In summary,", "The evidence shows", "Measured in gCO₂/kWh,", "According to", "It is important to note that this is based on"],
        placeholder: "Summarise clearly, using correct terms and citing evidence…",
        rubric: [
          { level: 2, descriptor: "Basic everyday language.", keywords: ["energy", "power", "electricity"], minKeywords: 1 },
          { level: 4, descriptor: "Some correct terminology.", keywords: ["renewable", "efficiency", "emissions", "carbon", "resource"], minKeywords: 2 },
          { level: 6, descriptor: "Clear, accurate terms and units.", keywords: ["kwh", "gco2", "co2", "intensity", "dispatchable", "intermittent", "units"], minKeywords: 2 },
          { level: 8, descriptor: "Precise, evidence-based, distinguishes fact/opinion.", keywords: ["evidence", "source", "data", "according to", "fact", "opinion", "based on"], minKeywords: 2 },
        ],
      },
    },
  ],
}
