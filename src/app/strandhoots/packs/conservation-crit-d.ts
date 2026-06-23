import type { StrandhootPack } from "../engine/types"

export const conservationCritD: StrandhootPack = {
  slug: "conservation-crit-d",
  title: "Conservation Models & Ethics",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Sustainable fishing, bioprinting and de-extinction",
  accent: "#27ae60",
  icon: "🐋",
  statementOfInquiry: "Methods of achieving sustainability can be developed using models that explore differences between systems.",
  estMinutes: 25,
  intro:
    "From the fishing quota that saves a cod stock to the CRISPR lab recreating a woolly mammoth, conservation biology generates some of the sharpest ethical dilemmas in modern science. Reflect on real-world applications, competing stakeholder interests, and the communication skills science demands.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Conservation ethics context", blurb: "Sustainable fishing, bioprinting and de-extinction decisions", icon: "🐋" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain the applications of conservation models and biotechnology in sustainability.",
      guided: [
        { level: 2, body: "Conservation science has produced several practical tools: sustainable fishing labels (like the MSC blue tick), seed banks (Svalbard), and new biotechnologies like 3D bioprinting and lab-grown meat." },
        { level: 4, body: "MSC (Marine Stewardship Council) sustainable fishing: 11% of global seafood is now MSC-certified; consumer choice in supermarkets drives demand for certified fish and incentivises fishing companies to operate sustainably. Svalbard Global Seed Vault: holds 1.3 million seed accessions from 98% of countries; deposits are free; withdrawals are also free — Syria withdrew seed samples during 2015–2019 to maintain their national programme during the civil war." },
        { level: 6, body: "3D bioprinted ear cartilage entered clinical trials successfully in 2022. Lab-grown (cultivated) chicken was approved for commercial sale in the USA and Singapore in 2023 — marking the first regulatory approval of cultivated meat for human consumption. Rewilding as carbon sequestration: reforested and rewilded grassland can sequester 10–50× more carbon per hectare than managed commercial forests, making it one of the most cost-effective climate mitigation strategies." },
        { level: 8, body: "Quantified application scale: MSC certification covers ~11% of global marine catch but its reach is uneven — large industrial fisheries in developed nations dominate certification, while small-scale artisanal fisheries in the Global South (which supply most protein to coastal communities) are underrepresented. Svalbard's Syria withdrawal illustrates the vault's value: 130,000 seed samples were withdrawn to support Aleppo's International Centre for Agricultural Research in the Dry Areas (ICARDA) after its Syrian site was damaged. Cultivated meat's market share is <0.01% of global meat sales in 2025, but its projected trajectory mirrors solar energy cost curves — rapid cost fall driven by economies of scale and bioprocess optimisation." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What does the formula N = MC/R represent in population ecology?",
            options: [
              { id: "a", text: "The logistic growth equation for population at carrying capacity" },
              { id: "b", text: "The Lincoln-Petersen mark-recapture population estimate", correct: true },
              { id: "c", text: "The maximum sustainable yield calculation for fisheries" },
              { id: "d", text: "The exponential growth rate formula" },
            ],
            explanation: "N = MC/R is the Lincoln-Petersen mark-recapture formula: N = estimated population size; M = number marked in first capture; C = total caught in second capture; R = number recaptured with mark.",
          },
          {
            id: "s2",
            prompt: "What did the International Whaling Commission (IWC) moratorium of 1986 prohibit?",
            options: [
              { id: "a", text: "All types of fishing in international waters" },
              { id: "b", text: "The export of whale products between countries" },
              { id: "c", text: "Commercial whaling of large whale species globally", correct: true },
              { id: "d", text: "The use of sonar technology near whale migration routes" },
            ],
            explanation: "The 1986 IWC moratorium banned commercial whaling of large whale species. It allowed continued indigenous subsistence whaling. The moratorium enabled the humpback whale population recovery seen in South Atlantic data — from ~4,500 in 1990 to ~27,900 by 2025.",
          },
        ],
        prompt: "Describe the real-world applications of conservation science and biotechnology in addressing biodiversity loss and sustainability. Consider multiple sectors — fisheries, seed conservation, and emerging technology.",
        scaffolds: [
          "MSC certification works by...",
          "This is globally important because...",
          "The Svalbard Global Seed Vault protects biodiversity by...",
          "An example of its importance was when...",
          "A novel biotechnological application is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one application.", keywords: ["msc", "svalbard", "seed vault", "bioprinting", "lab-grown", "fishing", "cultivated"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more applications with brief explanations.", keywords: ["msc", "11%", "svalbard", "1.3 million", "certified", "consumer", "seed", "withdrawal"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple applications across sectors; quantified examples given.", keywords: ["msc", "11%", "svalbard", "syria", "2015", "clinical trials", "cultivated chicken", "2023", "rewilding", "carbon", "sequestration"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified with limitations; historical context; projected trajectories.", keywords: ["small-scale", "artisanal", "global south", "icarda", "aleppo", "0.01%", "cost curve", "solar", "economies of scale", "uneven", "underrepresented"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the social, economic and ethical implications of conservation decisions.",
      guided: [
        { level: 2, body: "Conservation decisions affect people as well as wildlife. Fishing quotas can save fish stocks but also cost fishermen their livelihoods. De-extinction projects spend money that could be used to protect living species." },
        { level: 4, body: "Fishing quota disputes: scientists recommend a 50% cut in North Sea cod quotas to allow stock recovery; fishing industry lobbying has prevented implementation. Scottish fishermen's livelihoods depend on the current quota. Indigenous fishing rights vs conservation: Māori customary fishing rights are legally protected in New Zealand, but salmon harvest restrictions create tension with conservation goals." },
        { level: 6, body: "De-extinction resources argument: the $15 million woolly mammoth de-extinction project (Colossal Biosciences) could alternatively protect approximately 1,500 km² of habitat for 50 living endangered species. 3D organ printing access: printed organs could eventually eliminate transplant waiting lists, but access equity is a concern — will printed organs be available only to the wealthy? Organ trafficking could be reduced if printed organs become accessible, but allocation ethics remain. These questions require bioethics frameworks, not just biological knowledge." },
        { level: 8, body: "Systemic analysis: fishing quota politics illustrate a recurring pattern in conservation — the science recommends action, but political and economic interests delay it (as seen with Atlantic cod in the 1980s, leading to the 1992 collapse). The Māori customary fishing rights case illustrates that indigenous communities often have multi-generational knowledge of sustainable harvest rates that predate scientific fisheries management — co-management approaches that integrate indigenous knowledge with stock assessment science show better outcomes than top-down government quota systems. The organ printing dilemma parallels HIV antiretroviral access in the 1990s: patented technology that could save lives was initially available only in wealthy nations — the ethical framework that eventually prevailed (compulsory licensing, tiered pricing) offers a model for future biotech access governance." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What is the main ethical argument against investing $15 million in the woolly mammoth de-extinction project?",
            options: [
              { id: "a", text: "The mammoth's genome has not yet been fully sequenced" },
              { id: "b", text: "The same funding could protect habitat for many more living endangered species", correct: true },
              { id: "c", text: "CRISPR technology is not precise enough for this purpose" },
              { id: "d", text: "The woolly mammoth was not important to ecosystems" },
            ],
            explanation: "The opportunity cost argument: $15 million could fund approximately 1,500 km² of habitat protection for 50+ living species. This is a triage ethics question — when resources are limited, should scarce conservation funding prioritise proven strategies for living species, or speculative technology for extinct ones?",
          },
        ],
        prompt: "Evaluate the social, economic and ethical implications of conservation decisions. Consider at least two different stakeholder perspectives and an ethical dilemma involving trade-offs.",
        scaffolds: [
          "Fishing quotas affect stakeholders differently — a Scottish fisherman would say... whereas a conservation scientist would argue...",
          "The Māori customary fishing rights case shows...",
          "An ethical dilemma in biotechnology is...",
          "The opportunity cost of de-extinction is...",
          "A possible resolution that balances these interests is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one implication.", keywords: ["livelihoods", "fishing", "quota", "de-extinction", "jobs", "endangered", "ethical"], minKeywords: 1 },
          { level: 4, descriptor: "Two perspectives or impacts with brief explanations.", keywords: ["fisherman", "quota", "scientist", "de-extinction", "15 million", "habitat", "trade-off", "indigenous"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; ethical dilemma; evidence used.", keywords: ["scottish fishermen", "māori", "50% cut", "15 million", "1500 km", "organ", "access", "equity", "allocation", "de-extinction"], minKeywords: 3 },
          { level: 8, descriptor: "Systemic analysis; historical parallel; co-management or governance model proposed.", keywords: ["co-management", "indigenous knowledge", "stock assessment", "compulsory licensing", "tiered pricing", "hiv", "1990s", "systemic", "pattern", "top-down", "governance"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh competing conservation priorities and form an evidence-based position on triage ethics.",
      guided: [
        { level: 2, body: "'We should save all species.' — A simple opinion without engaging with the reality that resources are limited and choices must be made." },
        { level: 4, body: "'With limited conservation funding, it makes more sense to protect living endangered species than to try to bring back extinct ones, because the science is more reliable and more species are helped.' — Uses evidence and reaches a directional position." },
        { level: 6, body: "A balanced judgement: 'Conservation triage is necessary because funding is finite. The scientific consensus prioritises preventing current extinctions over de-extinction, since: (a) extinct species have left ecological niches that have been filled by other species; (b) the technology is unproven and expensive; (c) $15M in habitat protection has a known, measurable outcome. However, de-extinction research also advances gene-editing tools that may have broader conservation applications (e.g. genetically rescuing critically small populations from inbreeding). On balance, the evidence supports prioritising living species, but not at the expense of all biotechnology research.'" },
        { level: 8, body: "A nuanced position: engages with the uncertainty in both approaches — habitat protection has its own risk (political instability, climate change may make current reserves unsuitable); de-extinction's costs are falling as the technology matures. Addresses the meta-question: who decides? Conservation prioritisation is not a purely scientific question — it involves values (does an extinct species have moral status?), politics (which nations' species are prioritised?), and economics (who funds conservation?). A calibrated position with caveats: 'Based on current evidence and costs, living-species prioritisation is preferable, but this judgement should be revisited as de-extinction technology costs fall and as we better understand the ecosystem role of candidate species.'" },
      ],
      response: {
        kind: "reflection",
        prompt: "With limited conservation funding, should scarce resources be prioritised for preventing living species extinctions, or for de-extinction of lost species? Construct a reasoned, evidence-based judgement that uses triage ethics to weigh the trade-offs.",
        scaffolds: [
          "Evidence supporting prioritising living species includes...",
          "Evidence supporting de-extinction investment includes...",
          "A key trade-off is...",
          "Different stakeholders view this differently — for example, a conservation biologist would say... whereas a biotechnology investor might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence or nuance.", keywords: ["save", "living", "extinct", "species", "protect", "money", "funding"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence.", keywords: ["living species", "de-extinction", "habitat", "unproven", "technology", "cost", "evidence", "however", "on balance"], minKeywords: 2 },
          { level: 6, descriptor: "Triage ethics engaged; multiple arguments; reasoned conclusion.", keywords: ["triage", "finite", "habitat protection", "gene editing", "inbreeding", "scientific consensus", "quantified", "15 million", "niche", "filled", "balance"], minKeywords: 3 },
          { level: 8, descriptor: "Uncertainty in both; meta-question of who decides; calibrated position with caveats.", keywords: ["climate change", "reserves unsuitable", "moral status", "who decides", "values", "politics", "calibrated", "revisit", "costs falling", "de-extinction", "caveats"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain sustainable yield to a non-specialist using the bank account analogy.",
      guided: [
        { level: 2, body: "Restating the definition with jargon: 'Maximum sustainable yield is the largest harvest that can be taken without reducing the future productivity of the stock.' — Accurate but inaccessible to a non-specialist." },
        { level: 4, body: "An analogy helps: 'Think of a fish population like a savings account — if you take out less than the interest earned, your account grows; if you take out the interest, it stays the same; if you take out more, the account shrinks.' Good start, but needs to connect back to fisheries data and consequences of collapse." },
        { level: 6, body: "A clear analogy linked to the science: 'Your fish population is like a savings account. The fish born each year are the interest. If you only catch the interest — the new fish — you don't reduce the number of breeding adults (your capital). But if you catch more than the interest — more than the population can replace — you eat into the capital. Each year the capital is smaller, so the interest is smaller too. Eventually the account empties — this is what happened to the Grand Banks cod in 1992. MSY keeps you taking only the interest, at the point when the population is at K/2 and growing fastest.'" },
        { level: 8, body: "Excellent communication: uses the bank account analogy for the concept, then a second analogy (a forest where only fallen trees are harvested = sustainable; clear-cutting = capital destruction) for the ecosystem context, explicitly connects each to real conservation examples (cod collapse, MSC certification), avoids jargon (explains 'carrying capacity' as 'the maximum crowd the habitat can feed'), addresses a likely misconception ('fishing doesn't destroy fish — it just removes them... but if you remove them faster than they can reproduce, there are none left to breed'), and explains how models help managers set quotas: 'Scientists use population models to calculate exactly how many fish can be caught each year — just like a bank calculates how much interest you can withdraw without touching your savings.'" },
      ],
      response: {
        kind: "reflection",
        prompt: "Explain the concept of sustainable yield to a non-specialist using the bank account model. Connect your explanation to a real fishery example and explain how scientists use population models to set fishing quotas.",
        scaffolds: [
          "Imagine your fish population is like a savings account...",
          "The fish born each year are like the interest — and you can withdraw up to the interest without touching the capital...",
          "But if you withdraw more than the interest...",
          "This is exactly what happened in [name a real fishery] in [year]...",
          "Scientists prevent this by using population models to calculate...",
        ],
        rubric: [
          { level: 2, descriptor: "Restates definition with some jargon.", keywords: ["sustainable", "yield", "harvest", "stock", "population", "fishing", "reproduce"], minKeywords: 1 },
          { level: 4, descriptor: "Bank account analogy used but not connected to real fisheries.", keywords: ["savings account", "interest", "capital", "withdraw", "fish", "analogy"], minKeywords: 2 },
          { level: 6, descriptor: "Analogy linked to real fishery; K/2 explained; collapse consequence stated.", keywords: ["savings account", "interest", "capital", "cod", "grand banks", "1992", "collapse", "msy", "k/2", "breeding", "model"], minKeywords: 3 },
          { level: 8, descriptor: "Two analogies; jargon explained; misconception addressed; models linked to quotas.", keywords: ["analogy", "jargon", "carrying capacity", "misconception", "faster than reproduce", "quota", "model", "calculate", "msc", "certified", "bank", "harvest"], minKeywords: 3 },
        ],
      },
    },
  ],
}
