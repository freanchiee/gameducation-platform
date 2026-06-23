import type { StrandhootPack } from "../engine/types"

export const pathogensCritD: StrandhootPack = {
  slug: "pathogens-crit-d",
  title: "Interactions & Society",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Antibiotic resistance and ecological cascades",
  accent: "#27ae60",
  icon: "🦠",
  statementOfInquiry: "When two or more individuals interact, they form relationships that, over time, impact and contribute to their identity.",
  estMinutes: 25,
  intro:
    "Antibiotic resistance kills 1.27 million people per year. Wolf reintroduction changed the course of rivers. Vaccines have eradicated smallpox. Reflect on the real-world impact of biological interactions — from the molecular level to the ecosystem — and consider the responsibilities they place on science and society.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Biology Master", icon: "📢", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Pathogens & ecology context", blurb: "Antibiotic resistance, vaccines, biological control and trophic cascades", icon: "🦠" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain applications of immunology, antimicrobial medicine and ecological biology.",
      guided: [
        { level: 2, body: "Vaccines protect people from diseases by training the immune system. Antibiotics kill or stop bacteria from reproducing. Biological pest control uses living organisms to manage pests rather than chemicals." },
        { level: 4, body: "Vaccines exist in different forms: MMR (measles-mumps-rubella) is a live attenuated vaccine; the flu vaccine is inactivated (killed virus); hepatitis B vaccine is a subunit vaccine (just the surface protein); COVID-19 mRNA vaccines instruct cells to make the spike protein. Antibiotics are grouped by class: beta-lactams (penicillin) disrupt cell wall synthesis; macrolides (erythromycin) inhibit ribosomes; tetracyclines block protein synthesis." },
        { level: 6, body: "Biological pest control: Bacillus thuringiensis (Bt) produces a protein toxic to caterpillar larvae, used as a spray on crops; ladybirds (Coccinella) are released to control aphid populations. Mutualistic applications in agriculture: Rhizobium bacteria in legume root nodules fix atmospheric N₂ into ammonium ions, reducing the need for synthetic nitrogen fertiliser — a sustainable alternative to the Haber process. These applications demonstrate how understanding biological interactions directly enables practical human benefits." },
        { level: 8, body: "Vaccine mechanisms in detail: live attenuated vaccines (MMR) generate strong cellular and humoral immunity with long-lasting memory, but cannot be given to immunocompromised individuals. Inactivated vaccines (flu) are safer but require boosters. Subunit vaccines (hepatitis B) use just one pathogen protein — highly targeted but may produce weaker immunity. mRNA vaccines (COVID-19: BNT162b2, mRNA-1273) have the advantage of rapid design (the spike protein sequence was published in January 2020; vaccine in clinical trial by March 2020), but require ultra-cold storage. Bt crops (Bt cotton, Bt maize) are genetically modified to express the Bt toxin constitutively, reducing insecticide use by up to 50% in adoption regions. Rhizobium inoculation of legume seeds is estimated to provide ~50–70 kg N/ha/year without fossil fuels." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which type of pathogen can be treated with antibiotics?",
            options: [
              { id: "a", text: "Viruses" },
              { id: "b", text: "Bacteria", correct: true },
              { id: "c", text: "Fungi (always)" },
              { id: "d", text: "Prions" },
            ],
            explanation: "Antibiotics target bacterial structures such as cell walls (beta-lactams) and ribosomes (macrolides). Viruses are not cells and have no cell wall or bacterial ribosomes, so antibiotics have no target to act on. Some antifungal drugs exist, but these are not antibiotics.",
          },
          {
            id: "s2",
            prompt: "Which vaccine type uses mRNA to instruct cells to make a viral protein, triggering an immune response?",
            options: [
              { id: "a", text: "Live attenuated vaccine (e.g. MMR)" },
              { id: "b", text: "Inactivated vaccine (e.g. flu)" },
              { id: "c", text: "Subunit vaccine (e.g. hepatitis B)" },
              { id: "d", text: "mRNA vaccine (e.g. COVID-19 BNT162b2)", correct: true },
            ],
            explanation: "mRNA vaccines (such as the Pfizer-BioNTech BNT162b2 COVID-19 vaccine) deliver mRNA instructions that the body's own cells translate into a viral surface protein. The immune system responds to this protein and generates memory — without any live virus being present.",
          },
        ],
        prompt: "Describe the applications of vaccines, antibiotics and biological control in managing disease and pests. Consider how biological interactions underpin each technology.",
        scaffolds: [
          "Vaccines work by...",
          "Different vaccine types include... (give examples for each)",
          "Antibiotics are grouped into classes such as..., which target...",
          "Biological control examples include...",
          "Rhizobium in legume roots is an application of... which reduces the need for...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one application.", keywords: ["vaccine", "antibiotic", "bacteria", "pest", "control", "immune"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more applications with brief explanations.", keywords: ["vaccine", "antibiotic", "mmr", "flu", "penicillin", "biological control", "pest", "rhizobium"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple applications across vaccines, antibiotics and biocontrol; mechanisms described.", keywords: ["live attenuated", "inactivated", "subunit", "mrna", "beta-lactam", "bt", "ladybird", "rhizobium", "nitrogen", "mechanism"], minKeywords: 3 },
          { level: 8, descriptor: "Detailed mechanisms; vaccine type trade-offs; Bt quantification; Rhizobium N estimate.", keywords: ["immunocompromised", "boosters", "mrna", "spike protein", "2020", "bt cotton", "50%", "rhizobium", "50-70 kg", "cold storage", "quantified"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the social, environmental and ethical implications of antibiotic resistance and ecological cascades.",
      guided: [
        { level: 2, body: "Antibiotic resistance is when bacteria are no longer killed by antibiotics. This is a problem because infections that were once easy to treat can become dangerous. Removing predators from ecosystems can have unexpected consequences for other species." },
        { level: 4, body: "Antibiotic resistance kills approximately 1.27 million people per year globally (WHO/Lancet, 2019 data). MRSA (methicillin-resistant Staphylococcus aureus) is a serious hospital pathogen that resists many common antibiotics. Overuse of antibiotics — including the fact that about 70% of global antibiotic use is in livestock farming — accelerates resistance by applying selective pressure on bacterial populations." },
        { level: 6, body: "Trophic cascade: when wolves were exterminated from Yellowstone in the 1920s, deer overgrazed riparian vegetation; rivers eroded and biodiversity collapsed. Wolf reintroduction (1995–97) reduced deer numbers and altered their behaviour (deer avoided open riverbanks); vegetation recovered; rivers stabilised; songbird and beaver populations rebounded. Zoonotic spillover: approximately 60–75% of new infectious diseases are zoonotic (originate in animals). Deforestation and wildlife trade increase contact between humans and wildlife, raising pandemic risk (e.g. SARS-CoV-2, Ebola, HIV all have animal origins)." },
        { level: 8, body: "AMR systemic analysis: selective pressure from antibiotic overuse (agricultural, medical, aquacultural) drives resistance evolution in bacterial populations. Horizontal gene transfer (plasmids) spreads resistance genes between species — including between animal pathogens and human pathogens. The WHO projects AMR could kill 10 million people/year by 2050, exceeding cancer deaths. The social impact is asymmetric: low-income countries with least regulatory capacity bear the highest AMR burden (limited diagnostics, cheaper antibiotic generics). Ecological cascade impacts similarly show asymmetry: wealthy nations fund rewilding; biodiversity loss disproportionately affects food-insecure communities dependent on ecosystem services." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What is the main mechanism by which antibiotic resistance spreads between different bacterial species?",
            options: [
              { id: "a", text: "Mutation in the host's DNA" },
              { id: "b", text: "Horizontal gene transfer via plasmids", correct: true },
              { id: "c", text: "Viral infection of bacteria" },
              { id: "d", text: "Absorption of antibiotics into bacterial membranes" },
            ],
            explanation: "Horizontal gene transfer (HGT) via plasmids allows resistance genes to spread between bacteria, including across species. This is more rapid than waiting for individual mutations and explains why resistance can spread quickly across different pathogens.",
          },
        ],
        prompt: "Evaluate the implications of antibiotic resistance and trophic cascades. Cover social, environmental and ethical dimensions for at least two examples.",
        scaffolds: [
          "Antibiotic resistance kills approximately... people per year because...",
          "MRSA is a concern because...",
          "70% of antibiotic use in livestock farming is problematic because...",
          "The Yellowstone wolf example shows that removing predators...",
          "Zoonotic spillover is linked to AMR by the shared factor of...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one implication.", keywords: ["resistance", "antibiotic", "bacteria", "predator", "ecosystem", "cascade", "impact"], minKeywords: 1 },
          { level: 4, descriptor: "Two implications with brief explanations.", keywords: ["mrsa", "resistance", "livestock", "70%", "yellowstone", "wolf", "deer", "trophic", "zoonotic"], minKeywords: 2 },
          { level: 6, descriptor: "Social, environmental and ethical dimensions; Yellowstone and AMR covered.", keywords: ["1.27 million", "mrsa", "livestock", "selective pressure", "yellowstone", "biodiversity", "zoonotic", "spillover", "pandemic", "ethical"], minKeywords: 4 },
          { level: 8, descriptor: "Systemic analysis; horizontal gene transfer; 10 million projection; asymmetric burden; ecosystem services.", keywords: ["horizontal gene transfer", "plasmid", "10 million", "2050", "asymmetric", "low-income", "ecosystem services", "rewilding", "cancer", "aquaculture", "systemic"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the evidence and form a reasoned position on prophylactic antibiotic use in livestock farming.",
      guided: [
        { level: 2, body: "'Giving antibiotics to farm animals is bad because it causes resistance.' — A simple opinion without evidence or stakeholder nuance." },
        { level: 4, body: "'Prophylactic antibiotic use in livestock keeps animals healthy and food production efficient, but it accelerates the development of antibiotic-resistant bacteria. On balance, the risk to human medicine outweighs the farming benefit.' — Uses evidence from both sides." },
        { level: 6, body: "A balanced judgement: 'Prophylactic antibiotics in livestock increase animal growth rates and prevent disease spread in crowded conditions, reducing costs. However, 70% of global antibiotic use in farming creates enormous selective pressure for resistant bacteria, which can transfer resistance genes to human pathogens via horizontal gene transfer. The WHO and many national governments recommend banning prophylactic use. The EU banned it in 2006; Denmark reduced livestock antibiotic use by 50% without significant production losses — evidence that alternatives (vaccination, better husbandry) are viable.'" },
        { level: 8, body: "A nuanced, evidence-based judgement: weighs short-term economic gain (animal welfare, food cost, food security in developing nations) vs long-term AMR crisis (projected 10 million deaths/year by 2050); addresses distribution of burdens (low-income countries use more antibiotics per animal due to poor husbandry alternatives); evaluates alternatives (vaccines, probiotics, phage therapy, improved biosecurity); acknowledges uncertainty (causal link between livestock AMR and human clinical AMR is strong but not perfectly established for all organisms); arrives at a specific, calibrated position with stated conditions and caveats." },
      ],
      response: {
        kind: "reflection",
        prompt: "Should prophylactic antibiotic use in livestock farming be banned globally? Construct an evidence-based judgement weighing the benefits against the risks of antibiotic resistance.",
        scaffolds: [
          "Evidence supporting continued use includes...",
          "Evidence for banning includes...",
          "The Denmark case study shows that...",
          "Stakeholders with different perspectives include — a livestock farmer in a low-income country would say... whereas a public health doctor might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["ban", "good", "bad", "resistance", "antibiotic", "farming", "livestock"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence.", keywords: ["welfare", "growth rate", "resistance", "selective pressure", "70%", "evidence", "however", "on balance"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; Denmark case used; trade-offs identified; reasoned conclusion.", keywords: ["denmark", "eu", "50%", "trade-off", "stakeholder", "farmer", "who", "horizontal gene transfer", "alternatives", "viable", "perspective"], minKeywords: 3 },
          { level: 8, descriptor: "Short vs long-term; distribution of burdens; uncertainty acknowledged; alternatives evaluated; calibrated position.", keywords: ["10 million", "2050", "low-income", "phage therapy", "probiotics", "biosecurity", "uncertainty", "causal", "calibrated", "caveats", "developing"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain why antibiotics do not work on viruses using an accessible analogy.",
      guided: [
        { level: 2, body: "Restating a fact without explanation: 'Antibiotics kill bacteria but not viruses.' — True, but gives a non-specialist no understanding of why." },
        { level: 4, body: "An analogy helps: 'An antibiotic is like a key designed to fit one specific lock — the bacterial cell wall. A virus doesn't have that lock, so the key doesn't work.' A good start, but doesn't explain what the different 'lock' on a virus is or why it can't be targeted in the same way." },
        { level: 6, body: "A clear, layered explanation: 'Think of an antibiotic as a specialised tool designed to dismantle a very specific machine — the bacterial cell wall, or its protein-making machinery. Bacteria are living cells; they have cell walls and ribosomes that antibiotics can attack. Viruses are completely different — they are not cells at all. They are just a packet of genetic instructions wrapped in a protein coat. There is no cell wall to break, no independent machinery to block. The antibiotic tool has nothing to grip. This is why doctors say \"finish your antibiotics\" — they only target bacteria, and stopping early allows resistant bacteria to survive.'" },
        { level: 8, body: "Excellent communication: uses two linked analogies (pathogen identity: antibiotic = a key for a bacterial lock; virus has a completely different lock that no antibiotic key fits); explicitly connects to biological mechanism (antibiotics target peptidoglycan cell walls or prokaryotic 70S ribosomes — viruses have neither); addresses a likely misconception ('antibiotics will help my cold' — explaining that the common cold is viral, not bacterial); explains the danger of demanding antibiotics for viral illness (encourages resistance without providing any benefit); and frames the communication appropriately for a lay audience." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "A patient has influenza (flu). Their doctor does NOT prescribe antibiotics. What is the correct explanation for this decision?",
            options: [
              { id: "a", text: "Influenza bacteria are too large for antibiotics to penetrate" },
              { id: "b", text: "Influenza is caused by a virus; antibiotics only target bacterial structures and have no effect on viruses", correct: true },
              { id: "c", text: "The patient is not sick enough to need antibiotics" },
              { id: "d", text: "Antibiotics would make the flu worse by killing good bacteria" },
            ],
            explanation: "Influenza is caused by an influenza virus — not a bacterium. Viruses are not cells; they have no cell wall or bacterial ribosomes for antibiotics to target. Prescribing antibiotics for viral infections provides no benefit and contributes to antibiotic resistance.",
          },
          {
            id: "s2",
            prompt: "Which cells in the human immune system produce antibodies?",
            options: [
              { id: "a", text: "Neutrophils" },
              { id: "b", text: "T-helper lymphocytes" },
              { id: "c", text: "B-lymphocytes (plasma cells)", correct: true },
              { id: "d", text: "Macrophages" },
            ],
            explanation: "B-lymphocytes, when activated by T-helper cells and exposed to an antigen, differentiate into plasma cells that secrete large quantities of antibodies specific to that antigen. Each antibody is complementary in shape to one antigen.",
          },
        ],
        prompt: "Explain to a Year 9 student why antibiotics do not work on viruses. Use at least one everyday analogy and address the most common misconception about antibiotics and viral illness.",
        scaffolds: [
          "Bacteria are living cells — they have a cell wall and their own protein-making machinery...",
          "Viruses are completely different — they are not cells. They are...",
          "An antibiotic is like a [KEY] designed to fit [LOCK]...",
          "A virus has a completely different [LOCK], so the [KEY] cannot...",
          "The most common misconception is that people take antibiotics for colds. This is wrong because...",
          "Taking antibiotics when you don't need them is dangerous because...",
        ],
        rubric: [
          { level: 2, descriptor: "States antibiotics work on bacteria but not viruses.", keywords: ["bacteria", "virus", "antibiotic", "doesn't work", "not effective", "cells"], minKeywords: 1 },
          { level: 4, descriptor: "Gives an analogy without connecting back to biology.", keywords: ["key", "lock", "tool", "machine", "analogy", "fit", "different"], minKeywords: 1 },
          { level: 6, descriptor: "Analogy linked to biology (cell wall/ribosome vs virus structure); misconception addressed.", keywords: ["cell wall", "ribosome", "protein coat", "not a cell", "analogy", "cold", "misconception", "viral", "explains", "genetic"], minKeywords: 3 },
          { level: 8, descriptor: "Two analogies; mechanism explicit; misconception addressed with consequence; resistance risk explained.", keywords: ["peptidoglycan", "70s ribosome", "protein coat", "key and lock", "analogy", "misconception", "cold", "resistance", "no benefit", "dangerous", "lay audience"], minKeywords: 3 },
        ],
      },
    },
  ],
}
