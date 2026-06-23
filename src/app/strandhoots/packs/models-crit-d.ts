import type { StrandhootPack } from "../engine/types"

export const modelsCritD: StrandhootPack = {
  slug: "models-crit-d",
  title: "Models, Materials & Society",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Chemistry of materials: impacts and applications",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry:
    "Molecular modelling is used for the visualization of chemical structures, displaying their orientation in space and time.",
  estMinutes: 27,
  intro:
    "Molecular models don't just sit in textbooks — they drive drug design, materials engineering, water technology and ethical decision-making. Reflect on how understanding chemical structures at the atomic level translates into real-world technologies, and what responsibilities come with that knowledge.",
  badges: [
    { id: "applicator-d", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications-d", atLevel: 8 },
    { id: "critic-d", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts-d", atLevel: 8 },
    { id: "judge-d", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement-d", atLevel: 8 },
    { id: "communicator-d", label: "Science Voice", icon: "📢", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Models in context", blurb: "Graphene, drug design, alloys and the ethics of molecular modelling", icon: "🌍" }],
  strands: [
    {
      id: "applications-d",
      name: "Applications",
      descriptor: "Identify and explain the real-world applications of molecular modelling and bonding science from Chapter 9.",
      guided: [
        {
          level: 2,
          body: "Molecular models are used to visualize chemical structures. The pharmaceutical industry uses 3D molecular models and computer simulations to design new drugs — by modelling the shape of a drug and its protein target, researchers can test interactions before making the drug in a lab.",
        },
        {
          level: 4,
          body: "Applications include: (1) Drug design — 3D modelling of protein targets (e.g. Alzheimer's disease protein fibrils) allows researchers to design molecules that fit precisely. (2) Alloys — understanding metallic bonding models allows engineers to design stronger, lighter materials (e.g. aluminium alloys for aircraft wings). (3) Graphene — modelling the carbon lattice led to its discovery and explains its extraordinary properties: 300 times stronger than steel, harder than diamond, excellent conductor.",
        },
        {
          level: 6,
          body: "Graphene was discovered in 2004 by Geim and Novoselov (Nobel Prize in Physics). It is a single-atom-thick layer of carbon. Understanding its bonding — each carbon forms three covalent bonds, leaving one delocalized electron per atom (metallic-like conductivity) — explains its electrical conductivity, strength and flexibility. Applications: graphene-based inks for wearable electronics, batteries that charge ten times faster, LED lighting, corrosion-resistant paints, and graphene sieves for desalination. Computer modelling is the main reason new alloys and materials like graphene can be developed so quickly.",
        },
        {
          level: 8,
          body: "Quantified scale of applications: graphene is 300× stronger than steel, harder than diamond; graphene processors operate at 100 GHz vs 2.9 GHz for silicon. Graphene aerogel is the lightest solid known. In drug design, 3D protein modelling has cut the typical drug development timeline significantly — the chapter's example shows a computer simulation of a drug (red) attacking Alzheimer's protein fibrils. The broader point: models are not just descriptive tools — they are predictive. By encoding the 3D structure of a target molecule, chemists can screen millions of candidate drug shapes computationally before ever running a lab experiment. This is a paradigm shift in chemistry: from empirical trial-and-error to model-driven design.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1-d",
            prompt: "Graphene was discovered in 2004 by two British scientists. What Nobel Prize did they win for this discovery?",
            options: [
              { id: "a", text: "Nobel Prize in Chemistry" },
              { id: "b", text: "Nobel Prize in Physics", correct: true },
              { id: "c", text: "Nobel Prize in Medicine" },
              { id: "d", text: "Nobel Prize in Materials Science" },
            ],
            explanation:
              "Sir Andre Geim and Sir Konstantin Novoselov won the Nobel Prize in Physics in 2010 for their discovery of graphene — a single-atom-thick layer of carbon with extraordinary mechanical and electrical properties.",
          },
          {
            id: "s2-d",
            prompt: "How does the pharmaceutical industry use 3D molecular models in drug design?",
            options: [
              { id: "a", text: "To show students what molecules look like in textbooks" },
              { id: "b", text: "To test and create new drug structures by modelling protein targets computationally, reducing development time and cost", correct: true },
              { id: "c", text: "To replace all laboratory experiments with computer simulations" },
              { id: "d", text: "To prove the existence of atoms to non-scientists" },
            ],
            explanation:
              "3D molecular modelling of protein targets (like those involved in Alzheimer's disease) allows researchers to design, test and modify drug structures computationally — faster and cheaper than purely lab-based approaches.",
          },
        ],
        prompt:
          "Describe the applications of molecular modelling and bonding science from Chapter 9. Cover at least three different fields: medicine, materials and technology.",
        scaffolds: [
          "In medicine, 3D molecular models are used to...",
          "In materials science, understanding metallic bonding allows engineers to...",
          "Graphene's structure — a single layer of carbon atoms — explains its properties because...",
          "A broader application of molecular modelling is...",
          "Without modelling, the development of new materials would be...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one application.",
            keywords: ["drug", "model", "graphene", "alloy", "aluminium", "pharmaceutical", "application"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two or more applications across different fields.",
            keywords: ["drug design", "alloy", "graphene", "alzheimer", "protein", "aircraft", "pharmaceutical", "materials"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Three fields covered; graphene properties linked to structure; Nobel Prize mentioned.",
            keywords: ["graphene", "nobel", "drug design", "protein", "alloy", "aircraft", "delocalized", "conductor", "3d model", "desalination"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Quantified claims; paradigm shift from trial-and-error to model-driven design explained.",
            keywords: ["300 times", "100 ghz", "2.9 ghz", "aerogel", "lightest", "predictive", "paradigm", "computational", "screen", "fibrils", "drug development"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "impacts-d",
      name: "Implications & impacts",
      descriptor: "Evaluate the environmental, social and economic impacts of new materials and molecular modelling technologies.",
      guided: [
        {
          level: 2,
          body: "New materials like graphene and aluminium alloys have environmental, social and economic impacts. For example, graphene could help solve the global water crisis through better desalination membranes.",
        },
        {
          level: 4,
          body: "Environmental: graphene desalination sieves could provide clean water more efficiently, reducing energy use. Economic: graphene currently costs ~$100 per gram — demand exceeds supply. Social: increased air travel enabled by lightweight aluminium alloys increases global connectivity, but also increases CO₂ emissions and the equity question — not everyone can afford to fly.",
        },
        {
          level: 6,
          body: "Multi-level impacts: Environmental — aluminium alloys enable lighter, more fuel-efficient aircraft, reducing emissions per passenger. But increased aircraft numbers means more total emissions. Social — over the past 40 years there have been significant increases in the number of people flying; aluminium alloy production requires large amounts of energy and bauxite mining, which is environmentally destructive in many developing countries. Economic — graphene-based battery technology could transform the economics of electric vehicles and energy storage. The cost of graphene ($100/g) is currently the main barrier.",
        },
        {
          level: 8,
          body: "Systemic analysis: the introduction of new materials creates winner–loser dynamics. Aluminium alloy use in aircraft increases mobility for some populations while the environmental costs (CO₂ from flight, bauxite mining impacts) fall disproportionately on others. Graphene has transformative potential — desalination alone could address water security for billions — but at $100/g, the benefits accrue primarily to wealthy nations and industries that can afford R&D. The ethics of resource use in new material development (carbon being abundant, aluminium being one of the most abundant metals in the crust, but refining costs being high) is a recurring theme. The chapter explicitly raises the equity question: 'Is this a fair and equitable use of the planet's resources if not all people can afford to fly?'",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1-impacts",
            prompt: "Graphene is described as a potential solution to one of the world's biggest challenges. Which challenge?",
            options: [
              { id: "a", text: "Treating Alzheimer's disease" },
              { id: "b", text: "Reducing global CO₂ emissions" },
              { id: "c", text: "Providing sufficient fresh, clean water through improved desalination", correct: true },
              { id: "d", text: "Replacing silicon in all computer processors" },
            ],
            explanation:
              "Graphene used to make superfine sieves for desalination could help address global water scarcity — one of the world's most pressing challenges. Graphene's strength and atomic-scale pore size make it an ideal membrane material.",
          },
        ],
        prompt:
          "Evaluate the environmental, social and economic impacts of new materials (graphene and aluminium alloys) from Chapter 9. Cover at least three categories of impact.",
        scaffolds: [
          "Environmental impacts of aluminium alloy use in aircraft include...",
          "However, lighter aircraft also mean...",
          "Graphene could solve... but currently costs...",
          "The social impact of increased air travel is...",
          "Economically, the development of graphene is limited by...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one impact.",
            keywords: ["environment", "graphene", "aluminium", "cost", "water", "aircraft", "co2", "impact"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two categories of impact with brief explanations.",
            keywords: ["co2", "desalination", "economic", "cost", "social", "air travel", "energy", "water"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Environmental, social and economic impacts with reasoning; equity dimension raised.",
            keywords: ["co2", "bauxite", "desalination", "100 per gram", "equity", "afford", "developing", "fuel efficient", "social", "economic", "environmental"],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor: "Systemic analysis; winner–loser dynamics; equity of access to new materials.",
            keywords: ["winner", "loser", "equity", "systemic", "bauxite mining", "developing countries", "water security", "100 per gram", "co2", "flight", "disproportionately", "fair"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "judgement-d",
      name: "Making a judgement",
      descriptor: "Weigh the benefits and costs of molecular modelling and new materials technologies and form an evidence-based position.",
      guided: [
        {
          level: 2,
          body: "'Molecular modelling is good because it helps make new medicines and materials.' — A simple opinion without evidence or nuance.",
        },
        {
          level: 4,
          body: "'Molecular modelling has led to graphene and faster drug design, benefiting society. However, new materials like graphene are expensive and not yet widely accessible. On balance, the benefits to medicine and technology outweigh the costs.' — Uses evidence from both sides.",
        },
        {
          level: 6,
          body: "A balanced judgement: 'The benefits of molecular modelling — faster drug development, discovery of graphene, stronger alloys — are transformative. The costs — high graphene production costs ($100/g), environmental impact of increased air travel, equity gaps in access to technology — are significant. Different stakeholders (a pharmaceutical researcher, a resident near a bauxite mine, a person in a water-scarce region) view the trade-offs differently. On balance, the development of molecular modelling has been a net positive for chemistry and society, but only if the benefits are distributed more equitably.'",
        },
        {
          level: 8,
          body: "A nuanced judgement considers: short-term costs vs long-term benefits (graphene is expensive now, but could cut water treatment costs globally); distribution of benefits and burdens (wealthier nations dominate graphene R&D; poorer nations bear environmental costs of bauxite mining); the pace of change (computing power doubles roughly every 2 years, meaning modelling becomes cheaper and more accessible over time); and uncertainty in impact estimates. Arrives at a specific, calibrated conclusion with stated caveats — e.g. 'model-driven chemistry is the most significant advance in chemical research methodology of the 20th century, but realising its full societal benefit requires deliberate efforts to make the technology accessible globally.'",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1-judge",
            prompt: "Pure aluminium is soft and malleable. The chapter notes it is used in aircraft wings as an alloy. What concern does the textbook raise about increased air travel enabled by aluminium alloys?",
            options: [
              { id: "a", text: "Aircraft are becoming too heavy due to aluminium use" },
              { id: "b", text: "Whether the increased use of planet resources for air travel is fair and equitable if not everyone can afford to fly", correct: true },
              { id: "c", text: "Aluminium alloys are weaker than steel and therefore unsafe" },
              { id: "d", text: "Aluminium is too rare to meet the demand for aircraft production" },
            ],
            explanation:
              "The textbook explicitly raises the equity question: 'Is this a fair and equitable use of the planet's resources if not all people can afford to fly?' This reflects the global context of 'Orientation in space and time' — who benefits from technology, and who bears the costs?",
          },
        ],
        prompt:
          "Is the development of molecular modelling and new materials (graphene, alloys) a net positive for humanity? Construct a reasoned, evidence-based judgement that weighs the trade-offs.",
        scaffolds: [
          "Evidence supporting molecular modelling and new materials includes...",
          "Evidence against includes...",
          "A key trade-off is...",
          "Different stakeholders view this differently — for example, a pharmaceutical researcher would say... whereas a resident near a bauxite mine might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Simple opinion without evidence.",
            keywords: ["good", "bad", "positive", "negative", "beneficial", "harmful", "graphene", "modelling"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One argument from each side with evidence.",
            keywords: ["drug design", "graphene", "cost", "environment", "benefit", "cost", "evidence", "however", "on balance"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Multiple perspectives; trade-offs identified; stakeholder views included.",
            keywords: ["trade-off", "stakeholder", "researcher", "bauxite", "equity", "water", "100 per gram", "drug", "environment", "accessible"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Short vs long-term; distribution of benefits; computing cost trajectory; uncertainty acknowledged.",
            keywords: ["short-term", "long-term", "distribution", "developing", "computing", "accessible", "equitable", "uncertainty", "calibrated", "caveats", "net positive"],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "communicate-d",
      name: "Communicating the science",
      descriptor: "Explain to a non-specialist why ionic compounds conduct electricity when dissolved in water but not as solids, using an accessible analogy.",
      guided: [
        {
          level: 2,
          body: "Restating with jargon: 'Ionic compounds conduct electricity when dissolved because the ions are free to move and carry charge.' — Technically correct but inaccessible without explanation.",
        },
        {
          level: 4,
          body: "An analogy: 'Think of the ions in a solid like dancers frozen in place — they want to move but can't. When you dissolve the solid in water, it's as if the music starts: the ions break free and start flowing. Flowing charged particles is exactly what electricity is.'",
        },
        {
          level: 6,
          body: "A clear analogy linked to the conductivity investigation: 'Imagine the salt crystal as a very orderly car park — every car (ion) is in a fixed space, nobody can move. Dissolving in water is like removing the barriers: the cars can now drive around freely. In an electrical circuit, these moving ions carry charge, just like electrons in a wire. The more ions (higher concentration of KCl), the more charge carriers, so the conductivity is higher. This is exactly what the conductivity experiment shows.'",
        },
        {
          level: 8,
          body: "Excellent communication uses two linked analogies (one for solid lattice, one for solution), explicitly connects to data from the experiment (e.g. 'at 1.0 mol dm⁻³ KCl the conductivity was about 108 mS cm⁻¹ — double the 0.5 mol dm⁻³ value'), avoids jargon (explains 'electrostatic' as 'attraction between opposite charges', 'delocalized' as 'free to roam'), addresses the misconception ('the salt doesn't disappear — it breaks up into separate ions'), and explains why covalent compounds like sugar don't conduct even when dissolved ('sugar molecules stay whole — no ions form, so no charge carriers').",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1-comm",
            prompt: "A student dissolves sugar in water and tests its conductivity. They then dissolve the same mass of sodium chloride and test again. What result do they observe?",
            options: [
              { id: "a", text: "Both solutions conduct electricity equally well" },
              { id: "b", text: "Neither solution conducts electricity" },
              { id: "c", text: "The sugar solution conducts but the NaCl solution does not" },
              { id: "d", text: "The NaCl solution conducts electricity; the sugar solution does not", correct: true },
            ],
            explanation:
              "NaCl dissolves into Na⁺ and Cl⁻ ions, which carry charge — the solution conducts. Sugar dissolves as neutral molecules with no ions — no charge carriers, so no conductivity. The chapter's investigation confirms this: sugar solution shows 'None' or 'Dull light' in the conductivity test.",
          },
          {
            id: "s2-comm",
            prompt: "Solid sodium chloride does not conduct electricity. Why?",
            options: [
              { id: "a", text: "Solid NaCl has no ions" },
              { id: "b", text: "The ions in solid NaCl are held in fixed positions in the lattice and cannot move to carry charge", correct: true },
              { id: "c", text: "Solid NaCl reacts with the electrodes" },
              { id: "d", text: "Electrons in solid NaCl are delocalized, like in a metal" },
            ],
            explanation:
              "Solid NaCl contains Na⁺ and Cl⁻ ions, but they are held rigidly in the crystalline lattice. They cannot move freely, so they cannot carry electrical charge. When melted or dissolved, the ions become mobile and conductivity rises sharply.",
          },
        ],
        prompt:
          "Explain to a Year 9 student why ionic compounds conduct electricity when dissolved in water but not as solids. Use at least one everyday analogy and connect it to the conductivity experiment results.",
        scaffolds: [
          "Imagine the ions in a solid crystal are like...",
          "When the solid dissolves, the ions...",
          "These moving ions carry charge, just like...",
          "In our experiment, NaCl solution conducted because..., whereas sugar solution did not because...",
          "A common misconception is that the salt disappears — actually...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "States that dissolved ions carry charge.",
            keywords: ["ions", "dissolve", "move", "charge", "conduct", "water", "solution"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Gives an analogy; solid vs dissolved distinction made.",
            keywords: ["analogy", "solid", "fixed", "dissolved", "free", "move", "lattice", "ions"],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Analogy linked to experiment; sugar contrast included.",
            keywords: ["analogy", "nacl", "k+", "cl-", "sugar", "no ions", "charge carriers", "experiment", "concentration", "conductivity"],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor: "Two analogies; jargon explained; misconception addressed; data cited; sugar contrast explained.",
            keywords: ["analogy", "jargon", "misconception", "breaks up", "ions", "sugar molecules", "whole", "108", "0.5 mol", "1.0 mol", "clear", "data"],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
