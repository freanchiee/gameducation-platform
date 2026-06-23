import type { StrandhootPack } from "../engine/types"

export const balanceCritD: StrandhootPack = {
  slug: "balance-crit-d",
  title: "The Haber Process & Finite Resources",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Chemistry, food security & sustainability",
  accent: "#27ae60",
  icon: "🌾",
  statementOfInquiry: "Imbalanced relationships affect finite resources, both locally and globally.",
  estMinutes: 25,
  intro:
    "Fritz Haber's synthesis of ammonia feeds over half the world's population — yet the same chemistry powered explosives in WWI and contributes to ecological collapse today. Reflect on what it means to balance finite resources, competing demands, and the responsibilities of science.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Science Voice", icon: "📢", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Haber process context", blurb: "Ammonia synthesis, food security, and sustainability", icon: "🏭" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain the applications of the Haber process and ammonia chemistry.",
      guided: [
        { level: 2, body: "Ammonia (NH₃) produced by the Haber process is mainly used to make fertilizers that increase crop yields. Fritz Haber won the Nobel Prize in Chemistry in 1918 for this discovery." },
        { level: 4, body: "Ammonia is converted into: fertilizers (ammonium nitrate NH₄NO₃, ammonium sulfate (NH₄)₂SO₄, urea NH₂CONH₂), nitric acid HNO₃ (for explosives and industrial chemicals), and cleaning products. Global production exceeds 150 million tonnes NH₃ per year." },
        { level: 6, body: "The Green Revolution (mid-20th century) used nitrogen fertilizers from the Haber process to transform global food production — enabling yields to feed a rapidly growing population. Without synthetic nitrogen, the world could not feed its current 8 billion people. The same NH₃ chemistry also provided Germany with explosives in WWI — the dual-use nature of chemistry at its most extreme." },
        { level: 8, body: "Quantified scale: the Haber process enables food production for an estimated 4 billion additional people. Annual production >150 million tonnes NH₃ consumes 1–2% of global energy supply. Downstream products: HNO₃ (Ostwald process), NH₄NO₃ (fertilizer and explosive), urea (slow-release fertilizer for rice). The same molecule that feeds and kills — through fertilizers, explosives, and WWI munitions — illustrates chemistry's inseparable dual-use dimension and the ethical burden it places on scientists." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which molecule is the primary product of the Haber process?",
            options: [
              { id: "a", text: "Urea (NH₂CONH₂)" },
              { id: "b", text: "Ammonia (NH₃)", correct: true },
              { id: "c", text: "Nitric acid (HNO₃)" },
              { id: "d", text: "Ammonium nitrate (NH₄NO₃)" },
            ],
            explanation: "The Haber process directly produces ammonia from nitrogen and hydrogen. Ammonia is then converted into many other products including urea and ammonium nitrate.",
          },
          {
            id: "s2",
            prompt: "Why was synthetic nitrogen fixation so important in the early 20th century?",
            options: [
              { id: "a", text: "Nitrogen gas was running out and needed to be conserved" },
              { id: "b", text: "It enabled large-scale fertilizer production to feed a growing world population", correct: true },
              { id: "c", text: "It discovered a new element in the periodic table" },
              { id: "d", text: "It replaced all previous industrial chemical processes" },
            ],
            explanation: "Before Haber, fixed nitrogen came only from guano and limited mineral deposits. Artificial nitrogen fixation enabled large-scale fertilizer production, transforming global food security.",
          },
        ],
        prompt: "Describe the applications of ammonia from the Haber process. Consider multiple sectors — agriculture, industry, food security — and their global significance.",
        scaffolds: [
          "Ammonia is used to manufacture...",
          "This is globally important because...",
          "The Green Revolution used...",
          "Without synthetic nitrogen fertilizers, the global population...",
          "A less obvious application is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one application.", keywords: ["fertilizer", "ammonia", "crops", "nitrogen", "food"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more applications with brief explanations.", keywords: ["fertilizer", "nitric acid", "urea", "explosives", "crops", "food security"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple applications across sectors; Green Revolution named.", keywords: ["green revolution", "food security", "population", "fertilizer", "nitric acid", "urea", "explosives", "dual", "ww1", "nitrogen"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified impacts; dual-use dimension discussed; geopolitical context.", keywords: ["4 billion", "150 million", "1-2%", "ww1", "explosives", "ostwald", "dual-use", "geopolitical", "8 billion", "ethical"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the environmental, social and economic impacts of large-scale fertilizer production and use.",
      guided: [
        { level: 2, body: "Fertilizer use can cause environmental problems. When fertilizer washes into rivers and lakes, algae grow rapidly — a problem called eutrophication." },
        { level: 4, body: "Environmental: (1) Eutrophication — excess nitrogen in waterways causes algal blooms; decomposing algae deplete oxygen, killing aquatic life. (2) CO₂ emissions — the Haber process burns natural gas to produce H₂. Economic: fertilizers increase crop yields and farm profits, but are energy-intensive and sensitive to fossil fuel costs." },
        { level: 6, body: "Multilevel impacts: Environmental — eutrophication causes biodiversity loss; N₂O released from fertilised soils is a potent greenhouse gas (298× CO₂ over 100 yr); CO₂ from the Haber process. Social — colony collapse disorder (CCD) linked to neonicotinoid pesticides (e.g. imidacloprid) threatens honey bees that pollinate 30% of global food crops. Economic — fertilizers underpin global food prices; their energy-intensive production ties them to fossil fuel markets." },
        { level: 8, body: "Systemic analysis: the 'nitrogen cascade' — fixed N moves through soils, water, atmosphere, and food chains causing compounding effects: eutrophication → oxygen depletion → dead zones (e.g. Gulf of Mexico dead zone, ~22 000 km²); soil N₂O → climate feedback; ammonia volatilisation → acid rain. The European Food Safety Authority (2013) declared neonicotinoids an 'unacceptably high risk' to bees. These systemic environmental costs must be weighed against feeding 4 billion extra people — and the benefits and harms are not equally distributed." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What environmental problem occurs when nitrogen-rich fertilizer washes into rivers and lakes?",
            options: [
              { id: "a", text: "Acid rain" },
              { id: "b", text: "Ozone depletion" },
              { id: "c", text: "Eutrophication", correct: true },
              { id: "d", text: "Radioactive contamination" },
            ],
            explanation: "Excess nitrogen causes rapid algal growth (algal bloom). When the algae die, bacteria decompose them and consume oxygen — creating dead zones where aquatic life cannot survive.",
          },
        ],
        prompt: "Evaluate the environmental, social, and economic impacts of large-scale fertilizer production and use. Cover at least three categories of impact.",
        scaffolds: [
          "Environmental impacts include...",
          "The Haber process contributes to CO₂ emissions because...",
          "Eutrophication occurs when...",
          "Colony collapse disorder (CCD) is linked to... which affects...",
          "Economically, fertilizers...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one impact.", keywords: ["environment", "pollution", "algae", "co2", "eutrophication", "fertilizer"], minKeywords: 1 },
          { level: 4, descriptor: "Two categories of impact with brief explanations.", keywords: ["eutrophication", "co2", "algal bloom", "biodiversity", "economic", "food prices", "energy"], minKeywords: 2 },
          { level: 6, descriptor: "Environmental, social and economic impacts with reasoning.", keywords: ["eutrophication", "n2o", "greenhouse", "ccd", "bees", "pollination", "food prices", "biodiversity", "social", "economic", "environmental"], minKeywords: 4 },
          { level: 8, descriptor: "Systemic analysis with quantified evidence; unequal distribution acknowledged.", keywords: ["nitrogen cascade", "dead zones", "gulf of mexico", "efsa", "2013", "neonicotinoid", "imidacloprid", "systemic", "unequal", "compounding", "22000"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the benefits and costs of the Haber process and form an evidence-based position.",
      guided: [
        { level: 2, body: "'The Haber process is good because it feeds people, but bad for the environment.' — A simple opinion without evidence or nuance." },
        { level: 4, body: "'The Haber process enabled the Green Revolution, feeding billions. However, it also causes eutrophication and CO₂ emissions. On balance, it has been positive for food security, but needs to become more sustainable.' — Uses evidence from both sides." },
        { level: 6, body: "A balanced judgement: 'The benefits — feeding ~4 billion additional people and transforming food security — are enormous. The costs — eutrophication, CO₂, N₂O, threats to pollinators — are significant but potentially manageable with green chemistry approaches. Different stakeholders (farmers in developing nations, environmental scientists, beekeepers) view this trade-off differently. On balance, the process has been a net positive, but only if its environmental impacts are actively managed.'" },
        { level: 8, body: "A nuanced judgement: weighs short-term vs long-term consequences (short: feeds people now; long: destabilises ecosystems), addresses distribution of benefits and burdens (wealthy nations can afford precision agriculture; food-insecure nations cannot), considers alternatives (N-fixing legumes, green Haber using renewable H₂, precision fertilisation), evaluates uncertainty in impact data, and arrives at a specific calibrated conclusion with stated caveats." },
      ],
      response: {
        kind: "reflection",
        prompt: "Is the Haber process a net positive or net negative for humanity and the planet? Construct a reasoned, evidence-based judgement that weighs the trade-offs.",
        scaffolds: [
          "Evidence supporting the Haber process includes...",
          "Evidence against includes...",
          "A key trade-off is...",
          "Different stakeholders view this differently — for example, a farmer in a food-insecure region would say... whereas an environmental scientist might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["good", "bad", "positive", "negative", "beneficial", "harmful", "haber"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence.", keywords: ["food security", "eutrophication", "benefit", "cost", "evidence", "however", "on balance"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; trade-offs identified; reasoned conclusion.", keywords: ["trade-off", "stakeholder", "farmer", "environmental", "4 billion", "eutrophication", "co2", "sustainable", "green chemistry", "perspective"], minKeywords: 3 },
          { level: 8, descriptor: "Short vs long-term; distribution of benefits; alternatives considered; uncertainty acknowledged.", keywords: ["short-term", "long-term", "distribution", "developing", "precision", "legumes", "green haber", "uncertainty", "calibrated", "caveats", "ecosystem"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain Le Chatelier's principle to a non-specialist using an accessible analogy.",
      guided: [
        { level: 2, body: "Restating the definition with jargon doesn't communicate to a non-specialist: 'Le Chatelier's principle states that if a system at equilibrium is disturbed by changing the conditions, the equilibrium shifts to counteract the change.'" },
        { level: 4, body: "An analogy helps — but needs to connect back to chemistry: 'Think of a seesaw — if one side gets too heavy, the other goes up to balance. In chemistry, adding more reactant shifts the reaction to balance by making more product.' Good start, but doesn't explain the Haber process or why this matters." },
        { level: 6, body: "A clear analogy linked to the Haber process: 'Imagine a crowded room where people flow between two sections. At equilibrium, flow is balanced. If you push more people in one side (add reactant), the crowd moves to the less-crowded side (shift right → more product). In the Haber process, increasing pressure is like squeezing the room — the system shifts toward the side that takes up less space (fewer gas molecules, producing more NH₃).'" },
        { level: 8, body: "Excellent communication uses two linked analogies (one for concentration, one for pressure/temperature), explicitly connects each to the Haber process, avoids jargon (explains 'exothermic' as 'gives off heat', 'equilibrium' as 'a balance that constantly adjusts'), addresses a likely misconception ('the reaction doesn't stop — it adjusts'), and explains industrial relevance ('Haber's genius was understanding this adjustable balance and finding the best conditions for the factory').'" },
      ],
      response: {
        kind: "reflection",
        prompt: "Explain Le Chatelier's principle to a Year 9 student who has never heard of it. Use at least one everyday analogy and connect it to the Haber process.",
        scaffolds: [
          "Imagine a system that is always trying to stay balanced...",
          "If you disturb the balance by..., the system responds by...",
          "In the Haber process, this means...",
          "This is why industrial chemists use...",
          "A common misconception is that the reaction stops — actually...",
        ],
        rubric: [
          { level: 2, descriptor: "Restates definition using jargon.", keywords: ["equilibrium", "system", "shift", "oppose", "change", "balance"], minKeywords: 1 },
          { level: 4, descriptor: "Gives an analogy but doesn't link it to chemistry.", keywords: ["seesaw", "balance", "room", "crowd", "side", "analogy"], minKeywords: 1 },
          { level: 6, descriptor: "Analogy linked to chemistry; Haber process mentioned.", keywords: ["analogy", "haber", "ammonia", "pressure", "shift", "equilibrium", "reactant", "product", "explains", "molecules"], minKeywords: 3 },
          { level: 8, descriptor: "Two analogies; jargon explained; misconception addressed; industrial relevance.", keywords: ["analogy", "jargon", "misconception", "doesn't stop", "adjusts", "exothermic", "heat", "factory", "industrial", "clear"], minKeywords: 3 },
        ],
      },
    },
  ],
}
