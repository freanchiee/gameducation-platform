import type { StrandhootPack } from "../engine/types"

export const movementCritD: StrandhootPack = {
  slug: "movement-crit-d",
  title: "Electrochemistry, Corrosion & Society",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Applications and impacts of electrochemical technology",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry:
    "The changes we observe in a chemical system can help us to infer information about the movement of molecules and their properties.",
  estMinutes: 26,
  intro:
    "From the International Space Station's nickel–hydrogen batteries to the Hall–Héroult process that makes aluminium, electrochemistry shapes the modern world. Reflect on the applications, social and environmental impacts, ethical trade-offs and scientific communication challenges arising from the redox chemistry in Chapter 10.",
  badges: [
    {
      id: "applicator",
      label: "Real World Link",
      icon: "🔗",
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
      label: "Electrochemistry in context",
      blurb: "Batteries, aluminium extraction, corrosion and scientific innovation",
      icon: "⚡",
    },
  ],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain the applications of electrochemical processes from Chapter 10.",
      guided: [
        {
          level: 2,
          body: "Voltaic cells convert chemical energy to electrical energy. Batteries — from the dry cell in a torch to the rechargeable lead-acid battery in a car — are voltaic cells. Electrolysis is used industrially to extract and purify metals.",
        },
        {
          level: 4,
          body: "Key applications: (1) Dry cell batteries (non-rechargeable, primary cells) — anode: zinc container; cathode: carbon rod; electrolyte: NH₄Cl, ZnCl₂ and MnO₂. (2) Rechargeable lead-acid batteries — used in cars to start the engine; the alternator recharges them while running. (3) Hydrogen fuel cells — invented 1838 by William Grove; used by NASA in the ISS and satellites; 2H₂(g) + O₂(g) → 2H₂O(g); produce water, electricity and heat as by-products. (4) Electrolytic purification of copper — impure copper anode dissolves; pure copper deposits at cathode.",
        },
        {
          level: 6,
          body: "Electrochemical applications span three sectors: (1) Energy storage — dry cells, lead-acid, lithium-ion (portable devices), nickel–hydrogen (ISS satellites). (2) Metal extraction — Hall–Héroult process: alumina dissolved in molten cryolite (~950°C) rather than pure alumina (~2000°C) makes aluminium extraction economically feasible; aluminium produced is 99% pure. (3) Metal purification — copper electrolysis removes sulfur impurities; impure copper loses mass as anode, pure copper gains mass at cathode. Electroplating (binding a thin metal layer, ~0.0001 mm thick, to a cathode object) is another major industrial application in jewellery, car parts and electronics.",
        },
        {
          level: 8,
          body: "Quantified scale and cross-cutting connections: (1) Aluminium production — ~65 million tonnes per year globally; the Hall–Héroult process consumes ~14 kWh of electrical energy per kg of aluminium produced, making it energy-intensive but essential for modern transport and packaging. Cryolite (Na₃AlF₆) lowers the melting point of alumina from ~2000°C to ~950°C, reducing energy costs by approximately 55%. (2) Hydrogen fuel cells — the ISS uses them for power generation and drinking water; in terrestrial vehicles, fuel cells produce ~60% efficiency vs ~25% for internal combustion engines. (3) Electroplating — a current of 10 A applied for 360 s to CuSO₄ deposits Cu metal; the deposited mass depends on current × time (charge) and ion charge. (4) Commercial NaCl electrolysis — ~100,000 tonnes of sodium metal produced annually from molten NaCl; chlorine gas is a co-product used for PVC, disinfectants and pharmaceuticals.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Why does the Hall–Héroult process dissolve alumina (Al₂O₃) in cryolite before electrolysis, rather than electrolysing pure alumina directly?",
            options: [
              { id: "a", text: "Cryolite prevents the aluminium from re-oxidising at the cathode" },
              { id: "b", text: "Pure alumina melts at over 2000°C, making it too expensive to heat; cryolite lowers the melting point to ~950°C", correct: true },
              { id: "c", text: "Cryolite reacts with alumina to produce a better electrical conductor than aluminium" },
              { id: "d", text: "Cryolite provides the source of aluminium ions, not the alumina" },
            ],
            explanation: "Al₂O₃ melts at over 2000°C — heating to this temperature would be prohibitively expensive. Dissolving alumina in molten cryolite (Na₃AlF₆) creates a mixture that melts at approximately 950°C, making industrial electrolysis economically feasible.",
          },
          {
            id: "s2",
            prompt: "In a hydrogen fuel cell used on the International Space Station, what are the useful products of the overall reaction 2H₂(g) + O₂(g) → 2H₂O(g)?",
            options: [
              { id: "a", text: "Electricity only" },
              { id: "b", text: "Water vapour only" },
              { id: "c", text: "Electricity, water (which can be used as drinking water) and heat", correct: true },
              { id: "d", text: "Hydrogen gas and electrical energy only" },
            ],
            explanation: "The hydrogen fuel cell produces electricity, water (used as drinking water on the ISS) and heat. Its reactants — H₂ and O₂ — are renewable, and water is the only waste product, making it environmentally attractive.",
          },
        ],
        prompt: "Describe the applications of electrochemical processes from Chapter 10. Consider multiple sectors — energy, metal production, industry — and their global significance.",
        scaffolds: [
          "Voltaic cells are used to...",
          "The Hall–Héroult process is important because...",
          "Hydrogen fuel cells are used in... and are better than conventional batteries because...",
          "Without electrochemistry, modern industry could not...",
          "A less obvious application is electroplating, which...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one application.",
            keywords: ["battery", "aluminium", "fuel cell", "electrolysis", "copper", "electroplating"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two or more applications with brief explanations.",
            keywords: ["battery", "fuel cell", "aluminium", "hall", "copper purification", "electroplating", "sodium"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Three sectors covered; cryolite role explained; electroplating mentioned.",
            keywords: ["energy storage", "hall-héroult", "cryolite", "950", "electroplating", "0.0001", "copper cathode", "fuel cell", "iss", "nasa"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Quantified impacts across 4+ applications; energy efficiency compared; industrial scale cited.",
            keywords: ["65 million", "14 kwh", "2000°c", "55%", "100,000 tonnes", "60%", "25%", "10 a", "360 s", "pvc", "pharmaceutical"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the environmental, social and economic impacts of electrochemical industries.",
      guided: [
        {
          level: 2,
          body: "Large-scale electrochemical industries use a lot of electricity. The electrolysis of aluminium uses huge amounts of energy. Batteries contain toxic materials that must be disposed of carefully.",
        },
        {
          level: 4,
          body: "Environmental: (1) Aluminium electrolysis is very energy-intensive (~14 kWh/kg), contributing to CO₂ emissions if the electricity comes from fossil fuels. (2) Graphite anodes in the Hall–Héroult process react with oxygen to form CO₂ — they must be replaced regularly (C(s) + O₂(g) → CO₂(g)). (3) Battery disposal — heavy metals (lead, cadmium, mercury) in batteries can leach into groundwater if not recycled. Economic: aluminium is easy to recycle (saves ~95% of the energy vs primary production), making recycling economically and environmentally important.",
        },
        {
          level: 6,
          body: "Multi-level impacts: Environmental — (1) Hall–Héroult CO₂ from anode oxidation; (2) sodium and chlorine production from NaCl electrolysis generates hazardous Cl₂ gas — transport and storage risks; (3) battery landfill leaches Pb, Cd, Hg into soil and water. Social — (1) portable batteries enable mobile phones, laptops and medical devices, transforming communication and healthcare globally; (2) rechargeable car batteries support the shift to electric vehicles, reducing urban air pollution. Economic — (3) aluminium recycling saves ~95% energy vs primary production; recycled aluminium makes up over 75% of all aluminium ever produced that is still in use.",
        },
        {
          level: 8,
          body: "Systemic analysis: aluminium production accounts for approximately 3% of global electrical energy consumption — a significant contributor to industrial greenhouse gas emissions if powered by coal. However, regions using hydroelectric power (e.g. Iceland, Norway) produce 'green aluminium' with near-zero CO₂. The chlor-alkali industry (electrolysis of brine) produces Cl₂ and NaOH simultaneously — Cl₂ is essential for water purification (kills pathogens, saving millions of lives) but is also a chemical warfare agent (used in WWI). Battery disposal creates an estimated 180,000 tonnes of hazardous waste annually in the EU. The shift to lithium-ion batteries for EVs creates new supply-chain ethical concerns (cobalt mining in DRC). These systemic environmental costs must be weighed against the transformative benefits of electrochemical technology.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "The graphite anodes in the Hall–Héroult aluminium extraction process slowly burn away and must be replaced regularly. What chemical reaction causes this?",
            options: [
              { id: "a", text: "C(s) + O₂(g) → CO₂(g) — carbon reacts with the oxygen produced at the anode", correct: true },
              { id: "b", text: "Al³⁺(l) + 3e⁻ → Al(l) — aluminium ions are reduced at the graphite anode" },
              { id: "c", text: "2O²⁻(l) → O₂(g) + 4e⁻ — oxygen ions are oxidised but do not react with the anode" },
              { id: "d", text: "Al₂O₃(l) → 2Al³⁺(l) + 3O²⁻(l) — alumina dissolves and corrodes the anode" },
            ],
            explanation: "Oxygen gas is produced at the anode (2O²⁻ → O₂ + 4e⁻). At the high temperature of the process (~950°C), this oxygen reacts with the carbon (graphite) anode to form CO₂, gradually consuming the anode.",
          },
        ],
        prompt: "Evaluate the environmental, social and economic impacts of large-scale electrochemical industries from Chapter 10. Cover at least three categories of impact.",
        scaffolds: [
          "Environmental impacts include...",
          "The Hall–Héroult process contributes to CO₂ emissions because...",
          "Battery disposal is a problem because...",
          "Social benefits include...",
          "Economically, aluminium recycling is important because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one impact.",
            keywords: ["energy", "pollution", "co₂", "batteries", "disposal", "aluminium", "environmental"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two categories of impact with brief explanations.",
            keywords: ["co₂", "energy", "battery disposal", "recycle", "economic", "anode", "graphite", "heavy metals"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Environmental, social and economic impacts with reasoning; recycling quantified.",
            keywords: ["95%", "recycling", "mobile phones", "healthcare", "cl₂", "hazardous", "social", "economic", "environmental", "electric vehicle"],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor: "Systemic analysis with quantified evidence; unequal distribution acknowledged; ethical concerns raised.",
            keywords: ["3% global", "coal", "green aluminium", "hydroelectric", "chlor-alkali", "ww1", "180,000 tonnes", "cobalt", "drc", "systemic", "lithium-ion"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the benefits and costs of large-scale electrochemical technology and form an evidence-based position.",
      guided: [
        {
          level: 2,
          body: "'Batteries are useful but bad for the environment.' — A simple opinion without evidence or nuance.",
        },
        {
          level: 4,
          body: "'Electrochemical technology has huge benefits — it powers our devices and extracts metals we need. But it also uses a lot of energy and creates toxic waste. On balance, it has been positive for human society, but needs to become more sustainable.' — Uses evidence from both sides.",
        },
        {
          level: 6,
          body: "A balanced judgement: 'The benefits — lightweight aluminium for transport and aviation, portable batteries for communication and medical devices, hydrogen fuel cells for clean energy — are transformative. The costs — energy intensity (3% of global electricity for aluminium), CO₂ from anode oxidation, heavy metal disposal — are significant. Different stakeholders view this trade-off differently: an engineer in a developing country values affordable aluminium roofing; an environmental scientist highlights the CO₂ footprint. On balance, electrochemical technology has been net positive but only if powered by renewable energy and managed with robust recycling.'",
        },
        {
          level: 8,
          body: "A nuanced judgement weighs short-term vs long-term consequences (short: cheap aluminium and portable power; long: energy demand growth, waste accumulation), addresses distribution of benefits and burdens (wealthy nations benefit most from EVs; cobalt mining burdens DRC communities), considers alternatives (sodium-ion batteries to avoid cobalt; inert anode materials that produce O₂ instead of CO₂ in Hall–Héroult), evaluates uncertainty in lifecycle data, and arrives at a specific calibrated conclusion: 'Electrochemical technology is conditionally beneficial — its net impact depends critically on the energy source and the waste management system in place.'",
        },
      ],
      response: {
        kind: "reflection",
        prompt: "Is large-scale electrochemical technology — batteries, aluminium extraction and metal purification — a net positive or net negative for humanity and the planet? Construct a reasoned, evidence-based judgement.",
        scaffolds: [
          "Evidence supporting electrochemical technology includes...",
          "Evidence against includes...",
          "A key trade-off is...",
          "Different stakeholders view this differently — for example, an EV manufacturer would argue... whereas an environmental scientist might say...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Simple opinion without evidence.",
            keywords: ["good", "bad", "positive", "negative", "useful", "harmful", "beneficial"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One argument from each side with evidence.",
            keywords: ["benefit", "cost", "energy", "aluminium", "battery", "dispose", "evidence", "however", "on balance"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Multiple perspectives; trade-offs identified; reasoned conclusion.",
            keywords: ["trade-off", "stakeholder", "renewable", "recycling", "co₂", "transport", "medical", "sustainable", "engineer", "perspective"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Short vs long-term; distribution of benefits; alternatives considered; uncertainty acknowledged.",
            keywords: ["short-term", "long-term", "cobalt", "drc", "sodium-ion", "inert anode", "lifecycle", "conditional", "calibrated", "energy source", "waste management"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain how a voltaic cell works to a non-specialist using accessible analogies.",
      guided: [
        {
          level: 2,
          body: "Restating definitions with jargon doesn't communicate to a non-specialist: 'A voltaic cell converts chemical energy to electrical energy through spontaneous redox reactions at the anode and cathode, connected by an external circuit and a salt bridge.'",
        },
        {
          level: 4,
          body: "An analogy helps — but needs to connect back to chemistry: 'Think of the zinc electrode as a crowd of people eager to leave a building (lose electrons) and the copper electrode as a place where people want to arrive (gain electrons). The wire is the corridor they travel through.' Good start, but doesn't explain the salt bridge or why only specific metals work.",
        },
        {
          level: 6,
          body: "A clearer explanation: 'Imagine zinc as a very generous person who keeps giving away money (electrons). These electrons flow along a wire to the copper side, where copper ions collect them and settle down (become solid copper). The salt bridge is like a connecting door that keeps the electrical balance between the two rooms — without it, the flow stops. That's why your zinc–copper grapefruit battery (from the chapter introduction) can power a small LED.' Link explicitly to the observation: blue copper sulfate solution turns colourless as Cu²⁺ is used up.",
        },
        {
          level: 8,
          body: "Excellent communication uses two linked analogies (one for electron flow, one for the salt bridge), explicitly avoids jargon (explains 'anode' as 'the electrode that loses material', 'electrolyte' as 'the conducting solution'), addresses a common misconception ('electricity doesn't flow through the solution — electrons flow through the wire; ions flow through the solution and salt bridge'), and connects to the chapter's opening image: 'NASA's nickel–hydrogen batteries on the ISS work on exactly this principle — one material gives electrons, another receives them, and the energy released powers the station and produces drinking water for astronauts.'",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which statement correctly describes the movement of particles in a voltaic cell?",
            options: [
              { id: "a", text: "Electrons flow through the electrolyte solution from anode to cathode" },
              { id: "b", text: "Electrons flow through the external wire from anode to cathode; ions flow through the electrolyte and salt bridge", correct: true },
              { id: "c", text: "Both electrons and ions flow through the external wire" },
              { id: "d", text: "Ions flow through the external wire and electrons flow through the solution" },
            ],
            explanation: "Electrons cannot flow through a solution — they travel through the metal wire from the anode to the cathode. Electrical neutrality in the solution is maintained by ions migrating through the electrolyte and salt bridge.",
          },
        ],
        prompt: "Explain how a voltaic cell works to a Year 9 student who has never heard of one. Use at least one everyday analogy and connect it to the chapter's grapefruit battery example or the NASA ISS batteries.",
        scaffolds: [
          "Imagine the zinc electrode is like...",
          "The electrons flow from... to... just like...",
          "The salt bridge acts like... — without it...",
          "The grapefruit battery / NASA ISS battery works on exactly this principle because...",
          "A common misconception is that electricity flows through the liquid — actually...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Restates definition using jargon.",
            keywords: ["anode", "cathode", "electrons", "redox", "oxidation", "reduction", "circuit"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Gives an analogy but doesn't fully connect it to the chemistry.",
            keywords: ["analogy", "flow", "wire", "give", "receive", "electrons", "solution"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Analogy linked to chemistry; salt bridge explained; observation mentioned.",
            keywords: ["analogy", "zinc", "copper", "salt bridge", "blue", "colourless", "grapefruit", "flow", "ion", "wire"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Two analogies; jargon explained; misconception addressed; NASA/ISS or grapefruit link made.",
            keywords: ["analogy", "jargon", "misconception", "electrons wire", "ions solution", "nasa", "iss", "grapefruit", "drinking water", "anode loses material"],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
