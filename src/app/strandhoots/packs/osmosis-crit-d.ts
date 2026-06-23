import type { StrandhootPack } from "../engine/types"

export const osmosisCritD: StrandhootPack = {
  slug: "osmosis-crit-d",
  title: "Water Movement & Climate Change",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Water stress, fairness and global impact",
  accent: "#27ae60",
  icon: "💧",
  statementOfInquiry: "The changes in the weather patterns caused by current economic activity may not be fair to future generations.",
  estMinutes: 25,
  intro:
    "Osmosis is not only a laboratory concept — it shapes rehydration therapies, crop survival and global water security. Explore the real-world applications of osmosis, the implications of climate-driven water stress, and the ethical question of who bears the consequences of choices made by others.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "master", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Water, osmosis & climate justice", blurb: "Osmosis in medicine, agriculture and global water equity", icon: "💧" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain the practical applications of osmosis in medicine, agriculture and physiology.",
      guided: [
        { level: 2, body: "Osmosis is used in medicine. Oral rehydration therapy (ORT) is a simple solution of salt and glucose dissolved in water that treats dehydration caused by diarrhoea. Drinking ORT restores the water and electrolyte balance in the body's cells." },
        { level: 4, body: "Applications of osmosis: (1) Oral rehydration therapy (ORT) — salt + glucose solution restores water and electrolyte balance; active transport of glucose carries Na⁺ and water into gut cells. (2) Isotonic sports drinks — match the water potential of blood plasma, allowing rapid uptake. (3) Hospital saline drips — 0.9% NaCl is isotonic to blood; prevents cells from shrinking (hypertonic) or bursting (hypotonic). (4) Crop irrigation — supplying water to soil maintains the turgor pressure that keeps plant stems upright and stomata open for photosynthesis." },
        { level: 6, body: "The kidney uses osmosis extensively in the loop of Henle: the descending limb is permeable to water, so water leaves by osmosis into the increasingly concentrated surrounding medulla tissue. The ascending limb actively transports ions out, making the medulla more concentrated still. Together, they create a concentration gradient that enables the collecting duct to reabsorb water by osmosis — concentrating urine and conserving body water. This process is regulated by ADH (antidiuretic hormone)." },
        { level: 8, body: "Quantified applications: A standard ORT sachet (WHO formula) contains 2.6 g NaCl, 13.5 g glucose, 2.9 g trisodium citrate, 1.5 g KCl per litre — designed to match the ion composition of body fluids. The glucose is not primarily for energy; it activates the Na⁺-glucose co-transporter (SGLT1) in gut epithelium, driving Na⁺ absorption which osmotically pulls water in. ORT prevents an estimated 1–2 million child deaths per year globally. In agriculture, drip irrigation applies water directly to roots with ≥90% efficiency (vs 50–60% for sprinkler systems), reducing soil salinisation that would raise soil solute concentration and prevent water uptake by roots." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What happens to a plant cell placed in a very concentrated sugar solution?",
            options: [
              { id: "a", text: "It absorbs water and becomes turgid" },
              { id: "b", text: "It loses water by osmosis and undergoes plasmolysis", correct: true },
              { id: "c", text: "It bursts because of increased turgor pressure" },
              { id: "d", text: "Nothing — plant cell walls prevent osmosis" },
            ],
            explanation: "A very concentrated external solution has a lower water potential than the cell contents. Water moves by osmosis out of the cell, the vacuole shrinks, and the cell membrane pulls away from the cell wall — this is plasmolysis.",
          },
          {
            id: "s2",
            prompt: "Oral rehydration therapy (ORT) contains glucose alongside salts. Why is glucose included?",
            options: [
              { id: "a", text: "To provide energy for the patient to recover faster" },
              { id: "b", text: "To activate the Na⁺-glucose co-transporter, which drives salt and water absorption in the gut", correct: true },
              { id: "c", text: "To make the drink taste better so the patient drinks enough" },
              { id: "d", text: "To replace glucose lost through diarrhoea" },
            ],
            explanation: "Glucose activates the SGLT1 co-transporter in the gut epithelium, which couples glucose absorption with Na⁺ absorption. The resulting osmotic gradient then draws water into the gut lining cells — this is the core mechanism that makes ORT effective.",
          },
        ],
        prompt: "Describe the applications of osmosis in medicine, agriculture and physiology. Explain how understanding water potential has led to practical solutions in each area.",
        scaffolds: [
          "In medicine, osmosis is applied in...",
          "ORT works because...",
          "Isotonic solutions are important in hospitals because...",
          "In the kidney, the loop of Henle uses osmosis to...",
          "In agriculture, irrigation of crops relies on...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one application.", keywords: ["ort", "osmosis", "rehydration", "drip", "saline", "isotonic", "kidney", "turgor"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more applications with brief explanations.", keywords: ["ort", "isotonic", "saline", "sports drink", "kidney", "agriculture", "irrigation", "blood"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple applications across sectors; loop of Henle or ADH named.", keywords: ["ort", "saline", "isotonic", "loop of henle", "adh", "collecting duct", "urine", "turgor", "agriculture", "water potential"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified impacts; SGLT1 mechanism named; drip irrigation efficiency stated.", keywords: ["sglt1", "co-transporter", "1 million", "2 million", "drip irrigation", "90%", "salinisation", "ort", "who", "glucose", "na+"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate how climate-change-driven water stress affects plant cells, crops and global food security.",
      guided: [
        { level: 2, body: "Climate change is causing reduced rainfall in many parts of the world. When soil dries out, plants cannot absorb enough water and they wilt. Wilting means the plant cells have lost their turgor pressure." },
        { level: 4, body: "At the cellular level: drought raises soil solute concentration (salt builds up as water evaporates). The soil water potential falls below the root cell water potential — water cannot enter by osmosis. Plant cells lose turgor, stomata close (reducing photosynthesis), and leaves wilt. Prolonged drought causes permanent wilting point — cells plasmolyse and cannot recover." },
        { level: 6, body: "At the global scale: 40% of the world's population currently faces water scarcity. Climate change is intensifying droughts in sub-Saharan Africa and South Asia — regions that are among the least responsible for global carbon emissions. Crop failure leads to food insecurity, malnutrition and economic collapse in subsistence farming communities. It is wealthy industrialised nations that generate the majority of the CO₂ driving these droughts, while the consequences fall most heavily on the rural poor in the tropics." },
        { level: 8, body: "Systemic cascade: warming → reduced precipitation → soil drought → elevated soil solute concentration → loss of osmotic gradient for root water uptake → turgor loss → stomatal closure → reduced photosynthesis and yield → crop failure → food insecurity. The UN FAO estimates that climate change could reduce global agricultural yields by up to 25% by 2050. In sub-Saharan Africa, where 60–80% of the population depends on subsistence agriculture, this constitutes an existential threat. Loss and Damage (L&D) is now recognised under the UNFCCC Paris Agreement (COP27, 2022): wealthy nations owe compensation for the harm their emissions inflict on vulnerable nations — an argument grounded in the same water-potential logic that explains wilting." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "A farmer's field becomes very dry and salty due to drought. What happens to the plant roots' ability to absorb water?",
            options: [
              { id: "a", text: "Roots absorb more water because the soil is drier" },
              { id: "b", text: "Roots cannot absorb water because the soil has a lower water potential than the root cells", correct: true },
              { id: "c", text: "Roots use active transport to pull water in against the gradient" },
              { id: "d", text: "Roots absorb water normally because osmosis is unaffected by salt" },
            ],
            explanation: "Water moves by osmosis from high to low water potential. High soil salt concentration lowers the soil water potential below that of root cells, so water cannot enter by osmosis — and may even leave the roots by osmosis, causing wilting.",
          },
        ],
        prompt: "Evaluate the implications of climate-change-driven water stress at the cellular, crop and global levels. Who bears the greatest burden — and why?",
        scaffolds: [
          "At the cellular level, drought affects plant cells because...",
          "At the crop level, prolonged water stress causes...",
          "Globally, water scarcity affects ___ % of the world's population, especially in...",
          "The countries most responsible for CO₂ emissions are..., whereas the countries most affected are...",
          "This is a question of climate justice because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one impact of water stress.", keywords: ["wilt", "drought", "water", "turgor", "soil", "crop failure", "food"], minKeywords: 1 },
          { level: 4, descriptor: "Two levels of impact explained (cell and crop or global).", keywords: ["turgor", "stomata", "photosynthesis", "crop failure", "food insecurity", "water potential", "soil"], minKeywords: 2 },
          { level: 6, descriptor: "All three levels covered; climate justice framed; 40% figure used.", keywords: ["turgor", "plasmolysis", "crop failure", "40%", "sub-saharan", "south asia", "emissions", "wealthy", "climate justice", "food insecurity"], minKeywords: 4 },
          { level: 8, descriptor: "Systemic cascade described; quantified data used; L&D mechanism named.", keywords: ["cascade", "25%", "2050", "fao", "cop27", "loss and damage", "unfccc", "subsistence", "60%", "water potential", "osmotic gradient", "emissions"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Evaluate whether it is fair that countries least responsible for climate change face the greatest water stress.",
      guided: [
        { level: 2, body: "'It is unfair that poor countries suffer the most from climate change that rich countries caused.' — A simple opinion without evidence or engagement with complexity." },
        { level: 4, body: "'Wealthy industrialised nations have emitted far more CO₂ historically than developing nations. Yet developing nations in sub-Saharan Africa and South Asia face the greatest increases in drought and crop failure. This seems unfair.' — Uses evidence from both sides but without depth." },
        { level: 6, body: "A balanced judgement: 'The principle of intergenerational equity and climate justice argues that those responsible for harm should bear its costs. The wealthy nations that built their economies on fossil fuels are most responsible for the greenhouse gases driving drought. Meanwhile, subsistence farmers in Africa and South Asia — who emit far less per capita — face the existential consequences: crop failure, food insecurity, and displacement. The UNFCCC Loss and Damage fund (COP27) is a step toward rectifying this, but funding pledges remain far below what is needed. The injustice is clear and well-evidenced.'" },
        { level: 8, body: "A nuanced judgement addresses: (1) historical vs current emissions (the US and Europe built their wealth on 150 years of fossil fuel use; China and India are now large emitters too — who bears responsibility?); (2) intergenerational equity (current children in dry regions bear costs they did not cause); (3) international law (UNFCCC Loss and Damage is legally non-binding; commitments are voluntary); (4) alternatives (precision irrigation, drought-resistant GM crops, agroforestry — who funds these for subsistence farmers?); arrives at a specific, caveated judgement acknowledging uncertainty." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which term describes the principle that those who cause environmental harm should bear responsibility for its consequences?",
            options: [
              { id: "a", text: "Active transport" },
              { id: "b", text: "Osmotic equilibrium" },
              { id: "c", text: "Climate justice", correct: true },
              { id: "d", text: "Turgor pressure" },
            ],
            explanation: "Climate justice holds that the burden of climate change consequences should fall on those most responsible for causing them — not on those least responsible. This is closely linked to concepts of intergenerational equity and international fairness.",
          },
        ],
        prompt: "Is it fair that the countries least responsible for climate change bear the greatest water stress consequences? Construct a reasoned, evidence-based judgement.",
        scaffolds: [
          "Evidence supporting the claim that this is unfair includes...",
          "A counter-argument might be...",
          "A key concept here is intergenerational equity — this means...",
          "The UNFCCC Loss and Damage fund (COP27) attempts to address this by...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["unfair", "fair", "rich", "poor", "emissions", "climate", "damage"], minKeywords: 1 },
          { level: 4, descriptor: "Evidence from both sides; climate emissions linked to drought.", keywords: ["co2", "emissions", "drought", "sub-saharan", "unfair", "wealthy", "developing", "evidence"], minKeywords: 2 },
          { level: 6, descriptor: "Intergenerational equity and climate justice framed; L&D fund named.", keywords: ["intergenerational equity", "climate justice", "loss and damage", "cop27", "unfccc", "subsistence", "per capita", "crop failure", "evidence"], minKeywords: 3 },
          { level: 8, descriptor: "Historical vs current emissions; legal non-binding nature of L&D; alternatives considered; caveated conclusion.", keywords: ["historical", "current", "non-binding", "voluntary", "gm crops", "agroforestry", "precision irrigation", "china", "india", "us", "europe", "intergenerational", "caveated", "uncertainty"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain osmosis and dehydration using the grape/raisin analogy to a non-specialist.",
      guided: [
        { level: 2, body: "Restating the definition with jargon doesn't communicate to a non-specialist: 'Osmosis is the movement of water across a partially permeable membrane from high water potential to low water potential.' — This means nothing to someone who hasn't studied biology." },
        { level: 4, body: "A visual analogy helps: 'Think of a grape versus a raisin. A grape is full of water — like a turgid plant cell. A raisin has lost its water — like a plasmolysed cell. In the body, when you're dehydrated, your cells look more like raisins: shrunken and unable to function properly.' Good start, but doesn't explain the mechanism of osmosis." },
        { level: 6, body: "Link analogy to mechanism: 'Imagine your cell is like a grape inside a sugar syrup. The syrup outside is more concentrated (lower water potential) than the liquid inside the grape. Water is drawn out of the grape across its skin (the semi-permeable membrane) until the grape shrinks to a raisin. This is exactly what happens in dehydration: water leaves your cells into the blood (which becomes concentrated with salts), making cells shrink and struggle to work. Drinking ORT restores the balance.'" },
        { level: 8, body: "Excellent communication: (1) Uses the grape/raisin analogy for both turgidity and plasmolysis; (2) Explains the membrane as a selective barrier ('the grape skin lets water through but not sugar'); (3) Connects to the lived experience of dehydration ('headache, dark urine, confusion — all caused by shrunken cells'); (4) Explains ORT in simple terms ('a special drink that tricks your gut into pulling water back in — the salt and sugar in ORT switch on a tiny pump in your gut lining that drags water inside'); (5) Avoids jargon or explains every technical word used; (6) Addresses the misconception that drinking pure water is always best ('for severe dehydration, pure water isn't enough — the electrolytes are what activate the recovery mechanism')." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What is the correct scientific term for the movement of water across a partially permeable membrane from high to low water potential?",
            options: [
              { id: "a", text: "Diffusion" },
              { id: "b", text: "Active transport" },
              { id: "c", text: "Osmosis", correct: true },
              { id: "d", text: "Facilitated diffusion" },
            ],
            explanation: "Osmosis is the specific term for the movement of water molecules across a partially permeable membrane, always moving from a region of high water potential (dilute solution) to a region of low water potential (concentrated solution).",
          },
          {
            id: "s2",
            prompt: "In the grape/raisin analogy for osmosis, what does the grape skin represent?",
            options: [
              { id: "a", text: "The cell wall" },
              { id: "b", text: "The partially permeable cell membrane", correct: true },
              { id: "c", text: "The nucleus" },
              { id: "d", text: "The cytoplasm" },
            ],
            explanation: "The grape skin acts like the partially permeable cell membrane — it allows water to pass through but not sugar or other large solutes. This selective permeability is what makes osmosis possible.",
          },
        ],
        prompt: "Explain osmosis and dehydration to a Year 7 student who has never heard of water potential. Use the grape/raisin analogy and link it to what actually happens in your body when you are dehydrated.",
        scaffolds: [
          "Imagine a grape and a raisin. A grape is like a plant cell when...",
          "The grape skin is like the cell membrane because...",
          "When you are dehydrated, your cells start to look more like raisins because...",
          "ORT (oral rehydration therapy) works because...",
          "A common mistake people make is thinking that drinking pure water is always best — actually...",
        ],
        rubric: [
          { level: 2, descriptor: "Restates definition with some jargon.", keywords: ["osmosis", "membrane", "water", "concentration", "high", "low", "move"], minKeywords: 1 },
          { level: 4, descriptor: "Gives an analogy but doesn't fully link it to the mechanism.", keywords: ["grape", "raisin", "water", "shrink", "cell", "dehydration", "analogy"], minKeywords: 1 },
          { level: 6, descriptor: "Analogy linked to mechanism; dehydration explained; ORT mentioned.", keywords: ["grape", "raisin", "membrane", "selective", "dehydration", "ort", "cells shrink", "concentrated", "water potential"], minKeywords: 3 },
          { level: 8, descriptor: "Full analogy; jargon explained; ORT mechanism; misconception addressed; accessible language.", keywords: ["grape skin", "selective", "pure water", "not enough", "electrolytes", "pump", "gut", "headache", "dark urine", "misconception", "accessible", "ort"], minKeywords: 3 },
        ],
      },
    },
  ],
}
