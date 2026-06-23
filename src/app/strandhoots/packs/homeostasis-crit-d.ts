import type { StrandhootPack } from "../engine/types"

export const homeostasisCritD: StrandhootPack = {
  slug: "homeostasis-crit-d",
  title: "Balance & Sustainability",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Diabetes, eutrophication and biogeochemical disruption",
  accent: "#27ae60",
  icon: "⚖️",
  statementOfInquiry: "Development is only sustainable if systems remain in balance.",
  estMinutes: 25,
  intro:
    "From insulin pumps to nitrogen runoff, from carbon bank accounts to eutrophication dead zones — human intervention can restore or disrupt the body's and the biosphere's balance. Reflect on what it means to keep systems in equilibrium when development keeps pushing them to the edge.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Chapter 7: Balance", blurb: "Diabetes, eutrophication, carbon cycles and sustainability", icon: "⚖️" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain real-world applications of knowledge about homeostasis and biogeochemical cycles.",
      guided: [
        { level: 2, body: "Knowledge about blood glucose regulation has been used to develop treatments for diabetes. People with Type 1 diabetes must inject insulin because their bodies cannot produce it." },
        { level: 4, body: "Applications of blood glucose regulation: insulin therapy (subcutaneous injection or insulin pump for Type 1 diabetes), continuous glucose monitors (CGM — measure blood glucose every 5 min via sensor under the skin), artificial pancreas (closed-loop system combining CGM with insulin pump). Applications of nitrogen cycle knowledge: nitrogen fertilizers from the Haber process have enabled crop yields to feed billions; rewilding and reforestation help restore carbon sinks." },
        { level: 6, body: "The artificial pancreas (closed-loop insulin delivery system) uses an algorithm to automatically adjust insulin delivery based on CGM readings — mimicking the normal negative feedback of the pancreas. This technology is transforming care for Type 1 diabetes, reducing dangerous episodes of hypoglycaemia and hyperglycaemia. In agriculture, precision fertilisation (applying the right amount of nitrogen in the right place at the right time) aims to maintain soil nitrogen balance and minimise runoff. Peatland restoration restores a key carbon sink that stores carbon for thousands of years." },
        { level: 8, body: "The artificial pancreas represents a technologically engineered homeostatic system — using sensors, algorithms, and effectors to replace a biological feedback loop. Clinical trials show it reduces time in hyperglycaemia by ~40% and reduces HbA1c (glycated haemoglobin, a marker of long-term blood glucose control) by 0.5–1.0%. In biogeochemistry: the Haber process was the enabling technology that allowed world population to grow from 1.6 billion to 8 billion — it currently supports the nutrition of an estimated 4 billion people. Rewilding projects (e.g. UK peatland restoration) aim to recreate the slow-cycle carbon sinks destroyed by drainage and combustion; 1 hectare of restored peatland can store up to 10 tonnes of CO₂ per year, but takes decades to reach full capacity." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which hormone is used in the treatment of Type 1 diabetes, and why must it be injected rather than swallowed as a tablet?",
            options: [
              { id: "a", text: "Glucagon; because it is produced in the liver" },
              { id: "b", text: "Insulin; because it is a protein that would be digested in the stomach if taken orally", correct: true },
              { id: "c", text: "Insulin; because it must be cooled to work" },
              { id: "d", text: "Adrenaline; because it raises blood glucose in emergencies" },
            ],
            explanation: "Insulin is a peptide hormone — if swallowed, proteases in the digestive system would break it down before it could enter the bloodstream. Injection delivers it directly into subcutaneous tissue for absorption into the blood.",
          },
          {
            id: "s2",
            prompt: "Which organ produces both insulin and glucagon?",
            options: [
              { id: "a", text: "Liver" },
              { id: "b", text: "Kidney" },
              { id: "c", text: "Pancreas", correct: true },
              { id: "d", text: "Adrenal gland" },
            ],
            explanation: "The pancreas contains the islets of Langerhans: β-cells produce insulin and α-cells produce glucagon. Both hormones are released directly into the bloodstream to regulate blood glucose concentration.",
          },
        ],
        prompt: "Describe the applications of knowledge about homeostasis and biogeochemical cycles. Consider medical applications (diabetes management) and environmental applications (carbon sinks, fertilisers), and explain their global significance.",
        scaffolds: [
          "Type 1 diabetes is treated using...",
          "The artificial pancreas works by...",
          "In agriculture, knowledge of the nitrogen cycle has led to...",
          "Peatland restoration is important because...",
          "Without the Haber process...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one application.", keywords: ["insulin", "diabetes", "fertilizer", "injection", "glucometer", "nitrogen", "treatment"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more applications with brief explanations.", keywords: ["insulin pump", "cgm", "glucometer", "fertilizer", "haber process", "carbon sink", "rewilding", "peatland"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple applications across sectors; artificial pancreas or precision fertilisation explained.", keywords: ["artificial pancreas", "closed-loop", "cgm", "negative feedback", "precision fertilisation", "peatland", "carbon sink", "nitrogen", "hypoglycaemia", "algorithm"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified impacts; artificial pancreas clinical data; 4 billion people fed; peatland storage rates.", keywords: ["hba1c", "40%", "4 billion", "0.5-1.0%", "10 tonnes", "hectare", "peatland", "decades", "hyperglycaemia", "homeostatic system", "feedback loop", "algorithm"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the environmental, social and economic impacts of disrupted homeostasis and biogeochemical cycles.",
      guided: [
        { level: 2, body: "Disrupting natural balances causes problems. Type 2 diabetes affects millions of people worldwide. Excess fertilizer washes into rivers and causes problems for aquatic life." },
        { level: 4, body: "Health impacts: the global Type 2 diabetes epidemic (500 million people, linked to obesity, processed food, and sedentary lifestyle) costs over $1 trillion per year in healthcare. Environmental impacts: eutrophication — excess NO₃⁻ from fertilizer runoff triggers algal blooms, which decompose and deplete oxygen, creating dead zones in rivers and lakes (e.g. the Gulf of Mexico dead zone). Deforestation releases stored carbon and removes a major carbon sink, amplifying climate change." },
        { level: 6, body: "Interconnected impacts: (1) Type 2 diabetes epidemic — 500 million globally, projected to reach 700 million by 2045; disproportionately affects low-income populations with poor access to healthy food (food deserts) or healthcare. (2) Eutrophication cascade: NO₃⁻ runoff → algal bloom → decomposer bacteria consume O₂ → hypoxia → fish kills → loss of biodiversity; affects fisheries and livelihoods. (3) Carbon cycle disruption: deforestation + combustion adds ~10 Gt C/year to the atmosphere; forest removal also reduces evapotranspiration, affecting regional rainfall patterns — a disruption to the water cycle that compounds drought risk." },
        { level: 8, body: "Systemic analysis: the nitrogen cascade — fixed N leaches from soil into rivers, enters coastal zones, causing dead zones (Gulf of Mexico: ~22 000 km²; Baltic Sea dead zone expands annually). Excess N₂O from fertilised soils (a greenhouse gas 298× more potent than CO₂) contributes to both climate change and ozone depletion. The 'planetary boundaries' framework identifies nitrogen as one of the already-breached boundaries (along with biodiversity loss and climate change). Type 2 diabetes creates a health inequality divide: wealthy nations can afford medication and lifestyle interventions; low-income nations face rising costs with fewer resources — a case where a biological imbalance amplifies social imbalance. These systemic costs must be weighed against the food security gains that enabled population growth." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What sequence of events causes a 'dead zone' in a lake after nitrogen-rich fertilizer runs off into it?",
            options: [
              { id: "a", text: "Fertilizer → fish death → algal bloom → oxygen increase" },
              { id: "b", text: "Fertilizer → algal bloom → decomposer bacteria consume oxygen → hypoxia → aquatic organisms die", correct: true },
              { id: "c", text: "Fertilizer → acid rain → pH drop → chemical toxicity" },
              { id: "d", text: "Fertilizer → nitrite poisoning → direct toxicity to fish" },
            ],
            explanation: "Eutrophication: excess nitrogen causes rapid algal growth (algal bloom). When the algae die, decomposing bacteria consume dissolved oxygen, creating hypoxic (low-oxygen) conditions where most aquatic organisms cannot survive — a dead zone.",
          },
        ],
        prompt: "Evaluate the environmental, social, and economic impacts of disrupted homeostasis and biogeochemical cycles. Cover the Type 2 diabetes epidemic, eutrophication, and carbon cycle disruption — including at least three categories of impact.",
        scaffolds: [
          "The global Type 2 diabetes epidemic affects... and costs...",
          "This is caused by... and disproportionately affects...",
          "Eutrophication occurs when... leading to...",
          "Carbon cycle disruption is caused by... and leads to...",
          "These impacts are interconnected because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one impact.", keywords: ["diabetes", "eutrophication", "deforestation", "algae", "co2", "dead zone", "fertilizer"], minKeywords: 1 },
          { level: 4, descriptor: "Two categories of impact with brief explanations.", keywords: ["type 2 diabetes", "500 million", "eutrophication", "algal bloom", "deforestation", "co2", "economic", "fisheries", "dead zone"], minKeywords: 2 },
          { level: 6, descriptor: "Environmental, social and economic impacts with reasoning; food deserts or healthcare access mentioned.", keywords: ["eutrophication", "hypoxia", "fish kill", "type 2 diabetes", "food desert", "low-income", "healthcare", "deforestation", "carbon", "700 million", "social", "economic", "environmental"], minKeywords: 4 },
          { level: 8, descriptor: "Systemic analysis with quantified evidence; planetary boundaries; nitrogen cascade; N₂O; health inequality.", keywords: ["nitrogen cascade", "dead zones", "gulf of mexico", "22000", "n2o", "298", "planetary boundaries", "ozone", "health inequality", "systemic", "compounding", "baltic sea", "700 million", "breached"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the costs and benefits of nitrogen fertilizer use and form an evidence-based position.",
      guided: [
        { level: 2, body: "'Nitrogen fertilizers are bad because they cause eutrophication.' — A simple opinion without weighing benefits." },
        { level: 4, body: "'Nitrogen fertilizers have enabled massive crop yields that feed billions of people, but they also cause eutrophication and water pollution. On balance, they have been positive for food security, but need to be used more carefully.' — Uses evidence from both sides." },
        { level: 6, body: "A balanced judgement: 'The benefits of nitrogen fertilizer — enabling food production for ~4 billion additional people and preventing mass starvation — are enormous. The costs — eutrophication of rivers and coastal zones, N₂O emissions as a greenhouse gas, and nitrogen cascade effects — are significant but potentially manageable with precision agriculture, cover crops, and buffer zones near waterways. The key question is whether food security for billions is worth the ecological damage to rivers, fisheries, and biodiversity. Different stakeholders (subsistence farmers in low-income countries, ecologists, fishing communities, governments) view this trade-off very differently.'" },
        { level: 8, body: "A nuanced judgement considers: distribution of benefits (those who gain most from fertilizer — grain-importing nations, supermarkets, agribusiness — are often not those who bear the ecological costs — fishing communities, downstream nations, future generations); time horizons (fertilizer provides food now; eutrophication and climate effects accumulate over decades); alternatives (precision agriculture reduces fertilizer use by 30–50% with same yield; organic farming supports ~70% of conventional yields, insufficient to feed current population without further land conversion); uncertainty (planetary boundary threshold for nitrogen may have already been crossed). A specific, calibrated conclusion should state under what conditions fertilizer use is justified, with what safeguards, and who should bear the cost of mitigation." },
      ],
      response: {
        kind: "reflection",
        prompt: "Should nitrogen fertilizer use be heavily taxed or restricted to prevent eutrophication, even if it raises food prices? Weigh food security for billions against ecological damage to rivers, fisheries, and biodiversity. Construct a reasoned, evidence-based judgement.",
        scaffolds: [
          "Evidence supporting continued fertilizer use includes...",
          "Evidence for restricting fertilizer use includes...",
          "A key trade-off is...",
          "Different stakeholders view this differently — for example, a subsistence farmer would say... whereas a marine ecologist might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["good", "bad", "positive", "negative", "beneficial", "harmful", "fertilizer", "food"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence.", keywords: ["food security", "eutrophication", "benefit", "cost", "evidence", "however", "on balance", "4 billion"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; trade-offs identified; stakeholders named; reasoned conclusion.", keywords: ["trade-off", "stakeholder", "farmer", "ecologist", "fisheries", "4 billion", "eutrophication", "n2o", "precision agriculture", "food security", "low-income"], minKeywords: 3 },
          { level: 8, descriptor: "Distribution of benefits and costs; time horizons; alternatives quantified; uncertainty; calibrated conclusion with conditions.", keywords: ["distribution", "time horizon", "precision agriculture", "30-50%", "organic farming", "70%", "planetary boundary", "future generations", "mitigation", "conditions", "safeguards", "calibrated"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain the carbon cycle to a non-specialist using an accessible analogy.",
      guided: [
        { level: 2, body: "Restating the definition with jargon doesn't communicate to a non-specialist: 'The carbon cycle involves photosynthesis fixing CO₂ and respiration releasing it, with combustion releasing stored carbon from fossil fuels.'" },
        { level: 4, body: "An analogy helps — but needs to connect back to the science: 'Think of carbon like money. Plants deposit it into a bank account by photosynthesising. Animals and decomposers withdraw it through respiration. This keeps the balance roughly even — until we started burning fossil fuels.' Good start, but doesn't explain why this matters." },
        { level: 6, body: "A clear analogy linked to the real problem: 'Imagine the atmosphere as a bank account for carbon. Photosynthesis is like making deposits — plants take CO₂ out of the atmosphere and store it as organic matter. Respiration and decomposition are withdrawals — organisms release CO₂ back. For millions of years, deposits and withdrawals roughly balanced. Burning fossil fuels is like raiding a separate savings account that has been accumulating for millions of years — making huge extra withdrawals without any matching deposits. The balance grows negative — atmospheric CO₂ rises.'" },
        { level: 8, body: "Excellent communication: uses the bank account analogy for all four processes (photosynthesis = deposit; respiration = small regular withdrawal; decomposition = delayed withdrawal when organisms die; combustion of fossil fuels = raiding a locked vault of ancient savings). Explicitly explains why fossil fuels are different from ordinary respiration (timescale: millions of years vs hours to centuries). Addresses a likely misconception: 'Doesn't planting trees fix it?' — explains that trees can absorb carbon but only at a fraction of the rate we are releasing it, and forests can burn or be cut down. Uses quantified comparisons if possible (e.g. burning 1 litre of petrol releases ~2.3 kg CO₂ — a tree takes ~40 years to absorb that much). Explains the consequence: a warming planet, ocean acidification, and disrupted weather, all traceable to this single accounting imbalance." },
      ],
      response: {
        kind: "reflection",
        prompt: "Explain the carbon cycle to a non-specialist (imagine a curious 12-year-old) using a bank account analogy. Make sure you explain why burning fossil fuels is different from ordinary respiration, and address the misconception that 'planting trees will fix it'.",
        scaffolds: [
          "Think of the atmosphere as a bank account for carbon...",
          "Photosynthesis is like making a deposit because...",
          "Respiration and decomposition are like small regular withdrawals because...",
          "Burning fossil fuels is different because...",
          "Some people think planting trees will fix it — actually...",
          "The consequence of withdrawing more than we deposit is...",
        ],
        rubric: [
          { level: 2, descriptor: "Restates definition using jargon.", keywords: ["photosynthesis", "respiration", "co2", "carbon", "cycle", "fossil fuels"], minKeywords: 1 },
          { level: 4, descriptor: "Gives a bank account analogy but doesn't fully link it to the science.", keywords: ["bank account", "deposit", "withdraw", "carbon", "money", "balance"], minKeywords: 1 },
          { level: 6, descriptor: "Analogy linked to all four cycle processes; fossil fuels distinguished; misconception of 'just plant trees' addressed.", keywords: ["deposit", "withdrawal", "fossil fuels", "ancient", "millions of years", "planting trees", "too slow", "vault", "fraction", "rate", "co2", "rising"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified comparison; ocean acidification consequence mentioned; full misconception addressed; accessible language throughout.", keywords: ["2.3 kg", "40 years", "ocean acidification", "warming", "timescale", "misconception", "accessible", "fraction", "vault", "ancient savings", "accounting", "imbalance", "consequence"], minKeywords: 3 },
        ],
      },
    },
  ],
}
