import type { StrandhootPack } from "../engine/types"

export const respirationCritD: StrandhootPack = {
  slug: "respiration-crit-d",
  title: "Energy Sources & Ecosystems",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Biofuels, food chains & sustainability",
  accent: "#27ae60",
  icon: "🌿",
  statementOfInquiry: "Humans need to find sources of energy that do not cause harmful and irreversible changes to ecosystems and the environment.",
  estMinutes: 25,
  intro:
    "Every food chain is an energy chain, and every biofuel is a form of stored photosynthesis. Reflect on how humans extract energy from ecosystems — the applications, the trade-offs, the judgements, and how to communicate them to people who have never heard of the 10% rule.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Energy sources context", blurb: "Biofuels, food chains, and sustainable energy in ecosystems", icon: "🌿" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain the applications of biofuels and the 10% energy transfer rule in food chains.",
      guided: [
        { level: 2, body: "Biofuels are fuels made from biological materials. Bioethanol is made by fermenting sugar cane (yeast converts sugars to ethanol). Biodiesel is made from rapeseed oil. Food chains transfer energy from producers (plants) to consumers: grass → cow → human." },
        { level: 4, body: "Biofuels: biodiesel (from rapeseed oil — lipids esterified with methanol) and bioethanol (from sugar cane via anaerobic fermentation: glucose → ethanol + CO₂, catalysed by yeast). Food chains: producers (plants via photosynthesis) → primary consumer → secondary consumer → tertiary consumer. At each step, only about 10% of the energy is passed on — the rest is lost as heat, movement and excretion." },
        { level: 6, body: "The 10% rule means only 10% of the energy at each trophic level is available to the next. Example: 10 000 kJ in grass → 1 000 kJ in rabbits → 100 kJ in foxes. This explains why food chains are usually no longer than 4–5 links — not enough energy remains. Biofuels from sugar cane capture CO₂ during plant growth, potentially making them carbon neutral. Bioethanol fermentation equation: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (anaerobic, by yeast)." },
        { level: 8, body: "Quantified energy cascade: if 10 000 kJ enters a 4-step food chain, only 10 kJ reaches the top consumer (10⁴ → 10³ → 10² → 10 kJ). This means 99.9% of the original energy is lost. Biofuels differ: bioethanol yields ~27 MJ L⁻¹ (vs petrol ~34 MJ L⁻¹); the energy ratio (energy out/energy in for production) is approximately 1.4–8 for sugar cane, depending on region and farming method. Fermentation pathway: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (net 2 ATP from glycolysis — same anaerobic pathway as studied in cell respiration). Food chain efficiency is relevant to human nutrition: to produce 1 kg of beef protein requires approximately 7–10 kg of plant protein." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What percentage of energy is typically transferred from one trophic level to the next in a food chain?",
            options: [
              { id: "a", text: "50%" },
              { id: "b", text: "10%", correct: true },
              { id: "c", text: "90%" },
              { id: "d", text: "1%" },
            ],
            explanation: "Only about 10% of the energy at each trophic level passes to the next. The remaining 90% is lost as heat, used for movement, or excreted. This is why food chains rarely have more than 4–5 links.",
          },
          {
            id: "s2",
            prompt: "Which process is used by yeast to make bioethanol from sugar cane?",
            options: [
              { id: "a", text: "Aerobic respiration" },
              { id: "b", text: "Photosynthesis" },
              { id: "c", text: "Anaerobic fermentation", correct: true },
              { id: "d", text: "Active transport" },
            ],
            explanation: "Yeast converts glucose to ethanol and CO₂ by anaerobic fermentation (a type of anaerobic respiration): C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. This is the same pathway studied in cell respiration.",
          },
        ],
        prompt: "Describe the applications of biofuels and explain the 10% energy transfer rule in food chains. Consider multiple sectors — energy production, food security, farming efficiency.",
        scaffolds: [
          "Bioethanol is produced from... via the process of...",
          "Biodiesel is produced from...",
          "In a food chain, only 10% of energy is transferred because...",
          "The 10% rule means that a food chain with 4 links starting with 10 000 kJ has... kJ at the top consumer.",
          "This has implications for human food production because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one biofuel or describes a food chain.", keywords: ["biofuel", "bioethanol", "biodiesel", "food chain", "producer", "consumer", "10%"], minKeywords: 1 },
          { level: 4, descriptor: "Names two biofuels with sources; 10% rule stated.", keywords: ["bioethanol", "sugar cane", "biodiesel", "rapeseed", "10%", "trophic", "energy transfer", "heat", "fermentation"], minKeywords: 2 },
          { level: 6, descriptor: "10% rule applied numerically; food chain efficiency linked to food security.", keywords: ["10 000", "1000", "100", "10", "trophic level", "fermentation", "c6h12o6", "ethanol", "co2", "carbon neutral", "food chain"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified cascade; energy ratio for bioethanol; food chain protein efficiency named.", keywords: ["99.9%", "27 mj", "34 mj", "energy ratio", "1.4", "glycolysis", "2 atp", "7-10 kg", "beef protein", "10000 kj", "cascade"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the environmental, social and economic implications of biofuel production and energy transfer efficiency.",
      guided: [
        { level: 2, body: "Growing biofuel crops uses land that could be used for food. When forests are cleared for palm oil, animals lose their habitat — for example, orang-utans in Borneo are threatened by palm oil deforestation." },
        { level: 4, body: "Environmental: biofuel crops compete with food crops for land (food vs fuel debate). Palm oil plantations in Malaysia and Indonesia have caused massive deforestation and orang-utan habitat loss. Social: rising biofuel demand increases food prices in developing countries. Economic: biofuels can provide local energy security and income for farmers. CO₂ released by all organisms during aerobic respiration contributes to atmospheric CO₂ levels." },
        { level: 6, body: "Multi-level impacts: (1) Land use — biofuel expansion displaces food crops, raising food prices; life-cycle analysis often shows net CO₂ savings only if grown on previously degraded land. (2) Biodiversity — palm oil deforestation drives orang-utan, Sumatran tiger and pygmy elephant habitat loss; monocultures reduce biodiversity and soil health. (3) Carbon neutrality claim — burning bioethanol releases CO₂, but the plant grew by absorbing CO₂ via photosynthesis. However, production energy costs (fertilizer, transport, refining) often add significant net CO₂. (4) Water use — sugar cane irrigation is water-intensive, competing with local water supplies." },
        { level: 8, body: "Systemic analysis: the indirect land use change (ILUC) problem — biofuel expansion may not replace deforested land directly, but pushes food production elsewhere, clearing new forest (indirect deforestation). The EU Renewable Energy Directive caps palm oil biofuels from 2030 due to high ILUC risk. Carbon payback times: clearing tropical forest for palm oil takes 86 years to offset the CO₂ released. The 10% energy transfer rule means that a diet rich in animal products has a far larger land and CO₂ footprint than a plant-based diet — this links food chain efficiency directly to climate impact. These benefits and harms are unevenly distributed: bioethanol profits may benefit large landowners in Brazil while displacing subsistence farmers." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which of the following best describes the 'food vs fuel' debate?",
            options: [
              { id: "a", text: "Whether humans should eat more food than fuel" },
              { id: "b", text: "The competition between growing crops for food and growing crops for biofuels", correct: true },
              { id: "c", text: "Whether fuel is more expensive than food" },
              { id: "d", text: "A debate about whether plants use photosynthesis for food or fuel" },
            ],
            explanation: "The 'food vs fuel' debate concerns whether agricultural land should be used to grow crops for human food or to produce biofuels. Expanding biofuel production can reduce land available for food, potentially increasing food prices.",
          },
        ],
        prompt: "Evaluate the environmental, social and economic impacts of biofuel production and the energy transfer efficiency of food chains. Cover at least three categories of impact.",
        scaffolds: [
          "Environmental impacts of biofuels include...",
          "The claim that biofuels are carbon neutral is complicated by...",
          "Socially, expanding biofuel production can...",
          "Economically, biofuels...",
          "The 10% energy transfer rule implies that a meat-heavy diet...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one impact.", keywords: ["deforestation", "habitat", "orang-utan", "food prices", "land", "carbon", "co2", "palm oil"], minKeywords: 1 },
          { level: 4, descriptor: "Two categories of impact with brief explanations.", keywords: ["food vs fuel", "deforestation", "orang-utan", "carbon neutral", "food prices", "biodiversity", "land use", "economic"], minKeywords: 2 },
          { level: 6, descriptor: "Environmental, social and economic impacts with reasoning; carbon neutrality questioned.", keywords: ["land use", "monoculture", "biodiversity", "carbon neutral", "production energy", "water", "food prices", "developing", "life-cycle", "palm oil"], minKeywords: 4 },
          { level: 8, descriptor: "ILUC problem explained; carbon payback time; uneven distribution of harms noted; diet linked to food chain efficiency.", keywords: ["iluc", "indirect land use", "carbon payback", "86 years", "eu directive", "2030", "subsistence", "10% rule", "plant-based", "unevenly distributed", "brazil"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the benefits and costs of biofuels and form an evidence-based position.",
      guided: [
        { level: 2, body: "'Biofuels are good because they are renewable, but bad because they use land.' — A simple opinion without evidence or nuance." },
        { level: 4, body: "'Biofuels are beneficial because they are renewable and can reduce net CO₂ compared with fossil fuels. However, they compete with food crops for land and may not always be carbon neutral when production costs are considered. On balance, some biofuels are worthwhile but not all.' — Uses evidence from both sides." },
        { level: 6, body: "A balanced judgement: 'The benefits — renewable energy, local energy security, and potentially lower net CO₂ than fossil fuels — are real. The harms — land use competition, deforestation (especially palm oil), rising food prices, water use, and uncertain carbon neutrality — are significant. Different stakeholders view this differently: a subsistence farmer in Southeast Asia losing land sees only harm; a Brazilian sugarcane farmer benefits economically. On balance, sugar cane bioethanol has a strong case in Brazil, but palm oil biodiesel does not justify deforestation. The 10% rule also supports reducing meat consumption as more land-efficient than biofuels.'" },
        { level: 8, body: "A nuanced judgement: weighs short-term (energy security, farmer income, renewable energy targets) vs long-term (ecosystem degradation, ILUC, climate feedback from deforestation) consequences. Distinguishes between different biofuels by context (sugar cane in Brazil vs palm oil in Indonesia). Notes that the 10% rule makes plant-based diets far more energy-efficient than meat-based diets — dietary shifts are a more powerful lever than biofuels for reducing land use. Addresses uncertainty: life-cycle analyses vary widely in their assumptions. Arrives at a specific calibrated conclusion: supports second-generation biofuels (from waste biomass, not food crops) as the most defensible option." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "A farmer claims his sugar cane bioethanol is 'carbon neutral'. Which of the following is the most accurate assessment?",
            options: [
              { id: "a", text: "Completely true — burning bioethanol releases no CO₂ at all" },
              { id: "b", text: "Partially true — the plant absorbed CO₂ as it grew, but production energy costs add net emissions", correct: true },
              { id: "c", text: "Completely false — bioethanol is worse for the climate than petrol" },
              { id: "d", text: "True only if the sugar cane is grown in Brazil" },
            ],
            explanation: "The 'carbon neutral' claim is partly correct — burning bioethanol releases CO₂ previously absorbed during plant growth. However, fertilizer production, irrigation, harvesting and refining all add net CO₂ emissions, making full carbon neutrality difficult to achieve in practice.",
          },
        ],
        prompt: "Is large-scale biofuel production a net positive or net negative for the environment and society? Construct a reasoned, evidence-based judgement that weighs the trade-offs.",
        scaffolds: [
          "Evidence supporting biofuels includes...",
          "Evidence against includes...",
          "A key trade-off is...",
          "Different stakeholders view this differently — for example, a subsistence farmer in Southeast Asia would say... whereas a Brazilian sugar cane farmer might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["good", "bad", "renewable", "harmful", "beneficial", "biofuel"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence.", keywords: ["renewable", "land use", "carbon neutral", "food prices", "deforestation", "however", "on balance", "evidence"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; trade-offs identified; reasoned conclusion; 10% rule mentioned.", keywords: ["trade-off", "stakeholder", "farmer", "subsistence", "carbon neutral", "deforestation", "10% rule", "meat", "plant-based", "perspective", "sugar cane"], minKeywords: 3 },
          { level: 8, descriptor: "Short vs long-term; ILUC; second-generation biofuels; dietary shift; uncertainty acknowledged.", keywords: ["short-term", "long-term", "iluc", "second-generation", "waste biomass", "dietary shift", "life-cycle", "uncertainty", "calibrated", "brazil vs indonesia", "ecosystem"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain the 10% energy transfer rule to a non-specialist using a simple food chain.",
      guided: [
        { level: 2, body: "Restating the definition with jargon does not communicate to a non-specialist: 'The 10% rule states that only 10% of energy is transferred between trophic levels in a food chain.'" },
        { level: 4, body: "A simple example helps: 'Imagine grass growing in a field. Rabbits eat the grass. Only about 10% of the energy in the grass ends up in the rabbit — the rest is lost as heat, movement and droppings. Then a fox eats the rabbit, keeping only 10% of that.'" },
        { level: 6, body: "A clear numerical example: 'A field of grass contains 10 000 kJ of energy. Rabbits eat it, but only 1 000 kJ becomes rabbit biomass (the other 9 000 kJ is lost as body heat and movement). A fox eats rabbits and keeps only 100 kJ — just 1% of what was in the grass. This is why we need enormous amounts of land to feed meat-eating animals, and why growing crops for human food directly is far more efficient than using them to feed livestock.'" },
        { level: 8, body: "Excellent communication links the 10% rule explicitly to a real-world implication the audience cares about: 'To produce 1 kg of beef, a cow must eat roughly 7–10 kg of plant matter. That means 70–90% of the farmland used to grow that beef is \"lost\" in the conversion. If humans ate the plant protein directly, we could feed the same number of people using 7–10× less land. This is not about being vegetarian — it is about understanding how energy works in ecosystems. Every link in the food chain costs you 90% of your energy.'" },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "A food chain is: Grass → Rabbit → Fox. If the grass contains 10 000 kJ of energy, approximately how much energy (kJ) reaches the fox?",
            options: [
              { id: "a", text: "5 000 kJ" },
              { id: "b", text: "1 000 kJ" },
              { id: "c", text: "100 kJ", correct: true },
              { id: "d", text: "10 000 kJ" },
            ],
            explanation: "Using the 10% rule: 10 000 kJ → 1 000 kJ (rabbit) → 100 kJ (fox). Only 1% of the original grass energy reaches the fox — 99% is lost as heat, movement and excretion at each transfer.",
          },
          {
            id: "s2",
            prompt: "Why do humans need approximately 7–10 kg of plant protein to produce 1 kg of animal protein?",
            options: [
              { id: "a", text: "Animals waste food by eating too much" },
              { id: "b", text: "Because only about 10% of the energy at each trophic level is transferred to the next", correct: true },
              { id: "c", text: "Because plants have more vitamins than animals" },
              { id: "d", text: "Because animals breathe more than plants" },
            ],
            explanation: "The 10% energy transfer rule means that roughly 90% of the energy in plant food is lost as heat, movement and excretion at each trophic level. To gain 1 kg of animal biomass, the animal must consume approximately 7–10 kg of plant material.",
          },
        ],
        prompt: "Explain the 10% energy transfer rule to a Year 8 student who has never heard of it. Use a simple numbered food chain with energy values to show why we need so much more plant biomass than animal biomass to feed the same number of people.",
        scaffolds: [
          "Imagine a simple food chain: Grass → Cow → Human.",
          "Start with 10 000 kJ in the grass...",
          "Only 10% of that energy reaches the cow, which is ___ kJ.",
          "Only 10% of that energy reaches the human, which is ___ kJ.",
          "This means that to feed the same number of humans, we need ___ times more plant biomass than if they ate plants directly.",
          "A common misconception is that food chains waste energy — actually...",
        ],
        rubric: [
          { level: 2, descriptor: "States that only 10% of energy passes between levels.", keywords: ["10%", "energy", "trophic", "food chain", "passes", "transferred"], minKeywords: 1 },
          { level: 4, descriptor: "Simple food chain example with energy values; heat loss mentioned.", keywords: ["grass", "rabbit", "fox", "10 000", "1 000", "100", "heat", "loss", "10%"], minKeywords: 2 },
          { level: 6, descriptor: "Numerical example with 3 trophic levels; implication for land use or diet stated.", keywords: ["10 000", "1 000", "100", "trophic level", "heat", "movement", "excretion", "land", "plant", "animal", "10%"], minKeywords: 3 },
          { level: 8, descriptor: "7–10 kg plant protein per 1 kg animal protein; misconception addressed; real-world implication clearly explained.", keywords: ["7", "10 kg", "plant protein", "animal protein", "misconception", "directly", "7-10 times", "land use", "biomass", "clear", "implication"], minKeywords: 3 },
        ],
      },
    },
  ],
}
