import type { StrandhootPack } from "../engine/types"

export const evolutionCritD: StrandhootPack = {
  slug: "evolution-crit-d",
  title: "Genetic Innovation & Ethics",
  subject: "MYP Biology",
  criterion: "D",
  topic: "CRISPR, GMOs and cloning controversy",
  accent: "#27ae60",
  icon: "🦕",
  statementOfInquiry: "Scientific and technical innovations can change the impacts that we have on the world.",
  estMinutes: 25,
  intro:
    "CRISPR, golden rice, cloned ferrets, and the first gene-edited babies — genetic innovations are reshaping what is possible and who decides. Reflect on applications, impacts, ethical dilemmas, and how to communicate the science of evolution and genetic change clearly.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Genetic innovation context", blurb: "CRISPR therapies, GMOs, cloning and the ethics of genetic change", icon: "🧬" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain the real-world applications of CRISPR, GMOs and cloning.",
      guided: [
        { level: 2, body: "Genetic technologies have many applications. CRISPR is a gene editing tool used to treat diseases. GM crops are genetically modified to grow better. Cloning can be used to copy animals with valuable traits." },
        { level: 4, body: "CRISPR-Cas9: used to treat genetic diseases by cutting and correcting faulty DNA. GMO examples: golden rice (engineered with genes for provitamin A to address Vitamin A deficiency), Bt crops (carry a gene from the soil bacterium Bacillus thuringiensis producing a toxin that kills insect pests). Cloning: Dolly the sheep (1996) — first mammal cloned from an adult cell. Conservation cloning: the black-footed ferret was cloned from cells frozen in 1987." },
        { level: 6, body: "Casgevy (approved in the UK in 2023) is the first CRISPR-based medicine: it treats sickle cell disease and beta-thalassaemia by editing patients' own stem cells to reactivate fetal haemoglobin production, bypassing the faulty beta-globin gene. Golden rice produces provitamin A (beta-carotene) in rice endosperm — traditional rice has none — targeting the 250 million children at risk of Vitamin A deficiency blindness. Bt maize produces insect-resistance toxin, reducing pesticide applications. Conservation cloning has produced the black-footed ferret (2020, from 1987 frozen cells) and the Przewalski's horse (2020)." },
        { level: 8, body: "Quantified applications: Casgevy costs $2.2 million per patient — potentially curative for sickle cell disease affecting ~100 000 people in the USA. Golden rice: 250 million children at risk of Vitamin A deficiency blindness; after 20 years of regulatory delays (partly due to GMO opposition), varieties approved in the Philippines (2021) and Bangladesh (2023). Bt maize adoption: reduces pesticide use by ~14% and mycotoxin contamination (from fungal infection through insect damage) — a food safety benefit often overlooked. Conservation cloning: Przewalski's horse was functionally extinct in the wild; cloning from cryopreserved cells introduces genetic diversity from the 1980s gene bank into current conservation breeding programs, potentially preventing inbreeding depression." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What is the expected phenotype ratio of offspring from a monohybrid cross between two heterozygotes (Aa × Aa)?",
            options: [
              { id: "a", text: "1 dominant : 1 recessive" },
              { id: "b", text: "3 dominant : 1 recessive", correct: true },
              { id: "c", text: "1 dominant : 3 recessive" },
              { id: "d", text: "All offspring show the dominant phenotype" },
            ],
            explanation: "A Punnett square for Aa × Aa gives 1 AA : 2 Aa : 1 aa. The three genotypes with at least one A allele all express the dominant phenotype, giving a 3:1 ratio.",
          },
          {
            id: "s2",
            prompt: "What enzyme does CRISPR-Cas9 use to cut DNA at the target sequence?",
            options: [
              { id: "a", text: "DNA ligase" },
              { id: "b", text: "Restriction enzyme" },
              { id: "c", text: "Cas9 endonuclease", correct: true },
              { id: "d", text: "RNA polymerase" },
            ],
            explanation: "Cas9 is an endonuclease (a protein that cuts DNA). It is guided to the correct location in the genome by the guide RNA (gRNA), which matches the target DNA sequence. Cas9 then cuts both strands of DNA.",
          },
        ],
        prompt: "Describe the applications of CRISPR, GMOs and cloning. Cover at least three real-world examples and explain their significance.",
        scaffolds: [
          "CRISPR is used to treat...",
          "Golden rice was developed to...",
          "Bt crops work by...",
          "Conservation cloning was used to...",
          "These applications are significant because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one application with basic description.", keywords: ["crispr", "golden rice", "bt", "cloning", "gmo", "sickle cell", "ferret", "insulin"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more applications with brief explanations.", keywords: ["crispr", "sickle cell", "golden rice", "vitamin a", "bt maize", "cloning", "ferret", "dolly"], minKeywords: 2 },
          { level: 6, descriptor: "Three applications explained with significance; Casgevy or conservation cloning named.", keywords: ["casgevy", "fetal haemoglobin", "golden rice", "beta-carotene", "bt maize", "pesticide", "conservation cloning", "black-footed ferret", "przewalski"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified impacts; regulatory context; overlooked benefits noted.", keywords: ["$2.2 million", "250 million", "philippines", "2021", "2023", "mycotoxin", "inbreeding depression", "gene bank", "regulatory", "food safety"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the ethical, ecological, social and economic implications of genetic technologies.",
      guided: [
        { level: 2, body: "Genetic technologies can have negative as well as positive impacts. For example, people worry that GM crops could harm the environment, or that gene editing could be misused." },
        { level: 4, body: "Ecological: GM crops could transfer genes to wild relatives through cross-pollination ('gene flow'), potentially creating herbicide-resistant 'superweeds'. Social: the He Jiankui case (2018) caused international alarm — a scientist illegally edited human embryos using CRISPR, producing the first gene-edited babies. Economic: GM seeds are patented by companies like Monsanto (now Bayer), creating dependency for smallholder farmers." },
        { level: 6, body: "He Jiankui (2018): edited CCR5 gene in human embryos to confer HIV resistance; the twins were born healthy but off-target effects are unknown and cannot be reversed in their germline. He was sentenced to 3 years in prison. This case triggered international calls for a moratorium on human germline editing. Corporate control: Bayer/Monsanto's patented GM seeds mean farmers cannot save seeds, creating debt cycles in food-insecure regions. Animal welfare in cloning: Dolly required 277 attempts; cloned animals show high rates of developmental abnormalities, premature aging, and organ failure." },
        { level: 8, body: "Systemic analysis: designer baby concern — even if individual gene edits are beneficial (eliminating cystic fibrosis), the technology creates a slippery slope to enhancement (intelligence, height, athletic ability), where access is determined by wealth, deepening inequality. Gene flow from GM crops: field studies show herbicide-resistant genes in canola (Brassica napus) have spread to wild mustard populations within 10 years of commercial cultivation. Cloning failure rates remain high (success rate <5% in most species) — each failed attempt involves the suffering or death of a cloned animal. The asymmetry of impacts: the benefits of golden rice and Casgevy are real but concentrated in specific diseases/populations; the ecological risks of GMOs are diffuse and long-term — this makes cost-benefit analysis genuinely difficult." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "He Jiankui edited the CCR5 gene in human embryos to try to confer HIV resistance. Which of the following best describes a unique ethical concern about editing germline cells (embryos) compared to editing somatic (body) cells?",
            options: [
              { id: "a", text: "Germline edits are always more expensive than somatic cell therapy" },
              { id: "b", text: "Germline edits are passed to all future offspring, affecting generations who cannot consent", correct: true },
              { id: "c", text: "Germline edits cannot be used to treat genetic diseases" },
              { id: "d", text: "Germline cells do not contain DNA" },
            ],
            explanation: "Editing germline cells (sperm, eggs, or early embryos) means the edit is inherited by every cell in the body AND passed to all future children — permanently altering the heritable genome without the consent of the future person or their descendants.",
          },
        ],
        prompt: "Evaluate the implications of genetic technologies. Consider ecological, social, ethical and economic dimensions. Cover at least three categories.",
        scaffolds: [
          "Ecological implications include...",
          "The He Jiankui case (2018) raises ethical concerns because...",
          "Corporate control of GM seed patents creates economic impacts because...",
          "Animal welfare in cloning is a concern because...",
          "These impacts are distributed unevenly because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one negative impact.", keywords: ["environment", "ethical", "superweeds", "patent", "cloning", "germline", "animal welfare"], minKeywords: 1 },
          { level: 4, descriptor: "Two categories of impact with brief explanations.", keywords: ["gene flow", "superweeds", "he jiankui", "germline", "patent", "monsanto", "bayer", "animal welfare", "failure"], minKeywords: 2 },
          { level: 6, descriptor: "Three categories of impact with reasoning; He Jiankui named.", keywords: ["he jiankui", "ccr5", "germline", "prison", "consent", "superweeds", "patent", "smallholder", "dolly", "abnormalities", "premature aging"], minKeywords: 4 },
          { level: 8, descriptor: "Systemic analysis; slippery slope; gene flow evidence; asymmetry of impacts.", keywords: ["designer babies", "slippery slope", "enhancement", "inequality", "canola", "brassica", "10 years", "failure rate", "5%", "asymmetry", "diffuse", "long-term"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the evidence and form a reasoned position on whether human germline CRISPR editing should ever be permitted.",
      guided: [
        { level: 2, body: "'CRISPR editing of human embryos is wrong because it is playing God.' — A simple opinion without evidence." },
        { level: 4, body: "'Human germline CRISPR editing could eliminate inherited diseases like Huntington's, which causes severe suffering. However, it raises concerns about unintended off-target effects and the consent of the future child. Overall, more research is needed before permitting clinical use.' — Uses evidence from both sides." },
        { level: 6, body: "A balanced judgement: 'Germline CRISPR editing could eliminate heritable diseases that cause immense suffering (Huntington's disease — 100% penetrant, fatal; cystic fibrosis). The technology is increasingly precise, with off-target effects declining with improved guide RNA design. However, the consent problem is fundamental — the future person cannot consent to permanent heritable changes. There is a genuine risk of a slippery slope to enhancement. A justifiable position: permit germline editing only for severe, high-penetrance diseases with no alternative treatment, under strict regulatory oversight, with a global moratorium on enhancement editing.'" },
        { level: 8, body: "A nuanced position considering: (1) the nature and severity of the disease (Huntington's — 100% penetrant, fatal at 40–50 years vs a predisposition allele with 20% penetrance); (2) the availability of alternatives (pre-implantation genetic diagnosis — PGD — screens embryos before implantation without editing; viable for many conditions); (3) consent and autonomy of the future child; (4) equity of access ($2.2 million for Casgevy somatic therapy vs potentially cheaper germline editing); (5) uncertainty in off-target effects (large genome, unknown long-term consequences). A calibrated conclusion: germline editing for single-gene, fully penetrant, severe diseases (Huntington's) may be justified if: off-target effects are near-zero, PGD is not viable, the edit is restorative not enhancing, and it is subject to international independent oversight. Enhancement editing should remain prohibited." },
      ],
      response: {
        kind: "reflection",
        prompt: "Should human germline CRISPR editing ever be permitted? Construct a reasoned, evidence-based judgement. Consider the type of disease, consent, alternatives, equity and the slippery slope argument.",
        scaffolds: [
          "Arguments for permitting germline editing include...",
          "Arguments against include...",
          "A key distinction is between editing for disease treatment versus enhancement...",
          "The consent problem is that...",
          "On balance, my judgement is..., with the condition that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["wrong", "right", "good", "bad", "disease", "crispr", "ethical", "editing"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence.", keywords: ["huntington", "cystic fibrosis", "consent", "off-target", "benefit", "risk", "evidence", "however"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; consent and slippery slope addressed; conditional position.", keywords: ["consent", "slippery slope", "enhancement", "huntington", "penetrant", "pgd", "moratorium", "oversight", "severe", "global"], minKeywords: 3 },
          { level: 8, descriptor: "Penetrance distinction; PGD as alternative; equity; off-target uncertainty; calibrated conclusion.", keywords: ["penetrance", "pgd", "pre-implantation", "equity", "$2.2 million", "off-target", "restorative", "enhancement", "independent oversight", "calibrated"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain natural selection vs artificial selection using dog breeding as an analogy, and connect it to why CRISPR matters.",
      guided: [
        { level: 2, body: "Natural selection and artificial selection are both ways that traits change over generations. In natural selection, the environment decides which organisms survive. In artificial selection, humans choose which organisms breed." },
        { level: 4, body: "Artificial selection: humans bred wolves into dogs over ~15 000 years by selecting individuals with desired traits (tameness, herding ability, size). Different breeds arose from selecting extreme traits — chihuahuas were bred for small size, greyhounds for speed. Natural selection uses survival and reproduction as the 'selection pressure' instead of human preference." },
        { level: 6, body: "Dog breeding analogy: over ~15 000 years of artificial selection, the wolf (Canis lupus) has become over 340 recognised breeds — from the Great Dane (70 kg) to the chihuahua (3 kg). Bulldogs' flat faces cause severe breathing problems — a product of selecting an extreme trait without regard for animal welfare. Natural selection operates on variation that aids survival and reproduction; artificial selection operates on variation that suits human preference. Both change allele frequencies, but on very different timescales and with very different selection pressures." },
        { level: 8, body: "Full analogy with CRISPR connection: dog breeding took 15 000 years to produce extreme phenotypes by selecting allele combinations that arose by chance through mutation and recombination. CRISPR compresses this to a single generation: instead of waiting for a beneficial mutation to appear and selecting for it, we directly edit the DNA sequence. This is why CRISPR is a paradigm shift — artificial selection works with existing variation; CRISPR creates new variation on demand. The ethical parallel: dog breeders shaped genomes for human preference (sometimes causing animal suffering — brachycephalic dogs, hip dysplasia in German shepherds); CRISPR could shape human genomes for human preference. The same moral questions arise: who decides what counts as a beneficial trait, and at whose cost?" },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "How does artificial selection (e.g. dog breeding) differ from natural selection in terms of what acts as the 'selection pressure'?",
            options: [
              { id: "a", text: "Artificial selection uses random mutations while natural selection uses human choice" },
              { id: "b", text: "Artificial selection uses human preference as the selection pressure; natural selection uses survival and reproductive success", correct: true },
              { id: "c", text: "Artificial selection only occurs in plants; natural selection only occurs in animals" },
              { id: "d", text: "Natural selection is faster than artificial selection" },
            ],
            explanation: "In artificial selection, humans choose which individuals breed based on desired traits (human preference = selection pressure). In natural selection, the selection pressure is the environment — individuals with traits that aid survival and reproduction pass on more alleles.",
          },
          {
            id: "s2",
            prompt: "Why is CRISPR considered a paradigm shift compared to conventional artificial selection (breeding)?",
            options: [
              { id: "a", text: "CRISPR can only be used in bacteria, not in animals or humans" },
              { id: "b", text: "CRISPR takes hundreds of years to produce new traits in organisms" },
              { id: "c", text: "CRISPR creates new genetic variation directly in a single generation, rather than selecting from existing variation over many generations", correct: true },
              { id: "d", text: "CRISPR only works on dominant alleles" },
            ],
            explanation: "Conventional breeding selects from naturally occurring genetic variation and takes many generations. CRISPR directly edits DNA to create a specific desired change in a single generation — it is not waiting for the right mutation to arise by chance.",
          },
        ],
        prompt: "Explain natural selection vs artificial selection to a non-specialist using dog breeding as your main analogy. Then connect to why CRISPR is a paradigm shift, and draw the ethical parallel between dog breeding and editing human genomes.",
        scaffolds: [
          "In natural selection, the 'selection pressure' is...",
          "In artificial selection (e.g. dog breeding), humans act as the selection pressure by...",
          "Over 15 000 years of breeding, wolves became...",
          "CRISPR differs from conventional breeding because...",
          "The ethical parallel is that — just as dog breeders shaped genomes based on human preference...",
        ],
        rubric: [
          { level: 2, descriptor: "Distinguishes natural and artificial selection with a basic example.", keywords: ["natural", "artificial", "selection", "human", "environment", "dog", "breed", "survive"], minKeywords: 1 },
          { level: 4, descriptor: "Dog breeding used as analogy; selection pressure concept applied.", keywords: ["dog", "wolf", "breed", "human preference", "selection pressure", "survive", "reproduce", "artificial"], minKeywords: 2 },
          { level: 6, descriptor: "Analogy developed; timescale contrasted; CRISPR link made.", keywords: ["15000 years", "chihuahua", "great dane", "allele", "timescale", "crispr", "single generation", "paradigm", "existing variation", "new variation"], minKeywords: 3 },
          { level: 8, descriptor: "Ethical parallel drawn; animal welfare in breeding mentioned; consent and 'who decides' posed.", keywords: ["brachycephalic", "hip dysplasia", "animal welfare", "human preference", "ethical parallel", "who decides", "beneficial trait", "human genome", "cost", "paradigm shift"], minKeywords: 3 },
        ],
      },
    },
  ],
}
