import type { StrandhootPack } from "../engine/types"

export const geneticsCritD: StrandhootPack = {
  slug: "genetics-crit-d",
  title: "Genetic Patterns & Society",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Genome sequencing and personalised medicine",
  accent: "#27ae60",
  icon: "🧬",
  statementOfInquiry: "Observing patterns allows scientists to propose new theories that explain how the living world works.",
  estMinutes: 25,
  intro:
    "The human genome took 13 years and $3 billion to sequence in 2003. Today it costs $100 and takes a few hours. Reflect on what this power to read the pattern of life means for medicine, identity, privacy, and justice — and how we communicate the science responsibly.",
  badges: [
    { id: "applicator", label: "Genome Mapper", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Science Voice", icon: "📢", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Genome sequencing context", blurb: "Personalised medicine, genetic privacy, and societal impacts", icon: "🧬" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain the applications of genome sequencing in medicine, forensics, and ancestry.",
      guided: [
        { level: 2, body: "The human genome project sequenced all 3.2 billion base pairs of human DNA. Completed in 2003, it cost $3 billion and took 13 years. Scientists can now use this information to understand genetic diseases and develop new medicines." },
        { level: 4, body: "Applications of genome sequencing: (1) Genome-wide association studies (GWAS) — scan thousands of genomes to find single nucleotide polymorphisms (SNPs) linked to disease risk. (2) Pharmacogenomics — tailor drug doses to a patient's genotype (e.g. CYP450 enzymes metabolise many drugs; certain variants cause adverse reactions). (3) Forensic DNA profiling — short tandem repeat (STR) analysis identifies individuals with >99.9% accuracy. (4) Direct-to-consumer ancestry testing — 23andMe, AncestryDNA. By 2024, sequencing a human genome costs approximately $100." },
        { level: 6, body: "The Human Genome Project (HGP, completed 2003) produced a reference sequence for all 20,000–25,000 human genes. This enabled GWAS — identifying genetic variants (SNPs) associated with complex diseases like type 2 diabetes, schizophrenia, and Alzheimer's. Pharmacogenomics uses a patient's CYP450 genotype to predict how quickly they metabolise drugs — a rapid metaboliser of codeine may get no pain relief, while a poor metaboliser risks overdose on the standard dose. Forensic STR analysis compares 13–20 STR loci between a crime scene sample and a suspect — the probability of a random match is less than 1 in 1 trillion." },
        { level: 8, body: "The HGP cost $3 billion (1990–2003); Moore's law equivalent in sequencing has driven the cost to ~$100 by 2024 — a 30-million-fold reduction, outpacing all other technologies. GWAS have identified >100,000 disease-associated SNPs but most have small effect sizes (odds ratios 1.1–1.5). Pharmacogenomics is clinically implemented for warfarin (VKORC1/CYP2C9 genotype predicts dose), clopidogrel (CYP2C19 poor metabolisers gain no benefit — risk of heart attack), and oncology (BRCA1/2, KRAS for targeted therapy). The HGP also revealed that >95% of the genome is non-coding — much of it regulatory — overturning the assumption that only protein-coding sequences matter." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What are the complementary base pairs in DNA?",
            options: [
              { id: "a", text: "A–C and T–G" },
              { id: "b", text: "A–G and C–T" },
              { id: "c", text: "A–T and C–G", correct: true },
              { id: "d", text: "A–U and C–G" },
            ],
            explanation: "In DNA, adenine (A) pairs with thymine (T) via two hydrogen bonds, and cytosine (C) pairs with guanine (G) via three hydrogen bonds. (A–U pairing occurs in RNA, not DNA.)",
          },
          {
            id: "s2",
            prompt: "What is the primary purpose of meiosis?",
            options: [
              { id: "a", text: "To repair damaged DNA in somatic cells" },
              { id: "b", text: "To produce genetically identical diploid cells for growth" },
              { id: "c", text: "To produce four genetically unique haploid gametes", correct: true },
              { id: "d", text: "To replicate the genome before cell division" },
            ],
            explanation: "Meiosis produces four genetically unique haploid (n) gametes from a diploid (2n) cell. Genetic variation arises from crossing over in Prophase I and independent assortment in Metaphase I.",
          },
        ],
        prompt: "Describe the applications of genome sequencing. Consider medicine, forensics, and ancestry — and their global significance.",
        scaffolds: [
          "The Human Genome Project produced...",
          "GWAS (genome-wide association studies) are used to...",
          "Pharmacogenomics helps personalise treatment by...",
          "Forensic DNA profiling uses... to...",
          "Direct-to-consumer tests such as 23andMe allow...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one application of genome sequencing.", keywords: ["medicine", "dna", "genome", "disease", "forensic", "ancestry", "sequencing"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more applications with brief explanations.", keywords: ["gwas", "pharmacogenomics", "forensic", "str", "ancestry", "23andme", "snp", "drug"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple applications across sectors; mechanism explained for at least one.", keywords: ["gwas", "snp", "cyp450", "pharmacogenomics", "str", "forensic", "1 in 1 trillion", "hgp", "codeine", "genotype"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified impacts; pharmacogenomic drug examples cited; non-coding genome significance mentioned.", keywords: ["$100", "2024", "30 million", "vkorc1", "clopidogrel", "warfarin", "brca", "non-coding", "regulatory", "95%", "odds ratio"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the ethical, social, and privacy implications of genome sequencing.",
      guided: [
        { level: 2, body: "Knowing your genetic information can be useful — but it also comes with risks. People might worry about discovering they have a higher risk of developing a disease. Employers or insurance companies might treat people differently based on their genes." },
        { level: 4, body: "Key implications: (1) BRCA1/BRCA2 testing — women with these mutations have up to 85% lifetime risk of breast cancer; knowledge enables preventive surgery (prophylactic mastectomy). The 'Angelina Jolie effect' — her 2013 public disclosure led to a 64% increase in BRCA testing. (2) Genetic discrimination — life insurers and employers may use genetic information to deny cover or refuse employment, outlawed in some countries (GINA Act, US). (3) Data privacy — genetic databases can be hacked or subpoenaed; re-identification of anonymised data is possible." },
        { level: 6, body: "Multilevel impacts: Medical — BRCA testing enables risk-reducing surgery (reduces breast cancer risk by ~90%) but imposes psychological burden of a positive result; cascade testing in families raises consent issues. Social — Angelina Jolie effect shows celebrities influence health behaviour at population scale; genetic determinism fallacy (genes alone do not determine outcomes — environment, epigenetics, behaviour all matter). Economic — expensive pharmacogenomics (e.g. $200 CYP450 genotype test) mainly available in wealthy healthcare systems; unequal access deepens health disparities. Privacy — genealogy databases (GEDmatch) used by law enforcement to identify suspects via distant relatives — raises issues of consent of relatives who never submitted their DNA." },
        { level: 8, body: "Systemic analysis: direct-to-consumer genetic databases now hold DNA from >30 million people (23andMe, AncestryDNA combined), creating risk of unprecedented data breaches. In 2019, the Golden State Killer was identified via GEDmatch, demonstrating that even non-criminal individuals' data can implicate relatives. Genetic discrimination is outlawed in the US (GINA Act, 2008) for health insurance and employment, but not for life or disability insurance. The genetic determinism fallacy — that genes fully determine traits — ignores epigenetics, gene–environment interactions, and developmental plasticity. A BRCA1 mutation raises average lifetime breast cancer risk to 72% (Antoniou et al.), not 100% — environment modifies penetrance. Benefits and risks are inequitably distributed across socioeconomic and geographic boundaries." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "The 'Angelina Jolie effect' refers to which public health phenomenon?",
            options: [
              { id: "a", text: "The increase in breast cancer rates after her films were released" },
              { id: "b", text: "The 64% increase in BRCA genetic testing after her public disclosure of her preventive surgery", correct: true },
              { id: "c", text: "The invention of a new BRCA gene therapy" },
              { id: "d", text: "A government policy to offer free genetic testing to all women" },
            ],
            explanation: "After Angelina Jolie publicly disclosed in 2013 that she had tested positive for BRCA1 and undergone preventive mastectomy, uptake of BRCA genetic testing increased by approximately 64% — a striking example of celebrity influence on public health behaviour.",
          },
        ],
        prompt: "Evaluate the ethical, social, and privacy implications of widespread genome sequencing. Cover at least three distinct types of impact.",
        scaffolds: [
          "A medical implication is... This has positive effects because... but also risks because...",
          "Genetic discrimination means...",
          "Data privacy is a concern because...",
          "The genetic determinism fallacy suggests... but in reality...",
          "Access to genome sequencing is unequal because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one implication of genome sequencing.", keywords: ["privacy", "discrimination", "insurance", "risk", "disease", "brca", "data"], minKeywords: 1 },
          { level: 4, descriptor: "Two categories of implication with brief explanations.", keywords: ["brca", "discrimination", "privacy", "insurance", "gina", "data", "employer", "angelina jolie"], minKeywords: 2 },
          { level: 6, descriptor: "Medical, social, and privacy implications with reasoning.", keywords: ["brca", "angelina jolie effect", "64%", "discrimination", "gina", "privacy", "gedmatch", "determinism", "epigenetics", "access", "unequal"], minKeywords: 4 },
          { level: 8, descriptor: "Systemic analysis; quantified evidence; inequitable distribution acknowledged; golden state killer cited.", keywords: ["30 million", "golden state killer", "gedmatch", "gina", "2008", "life insurance", "determinism", "epigenetics", "penetrance", "72%", "inequitable", "socioeconomic"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the benefits and costs of routine newborn genome sequencing and form an evidence-based position.",
      guided: [
        { level: 2, body: "'Genome sequencing for all newborns is a good idea because it would help doctors find diseases early.' — A simple opinion without evidence or nuance." },
        { level: 4, body: "'Routine newborn sequencing could enable early treatment of genetic diseases, potentially saving many lives. However, it raises privacy concerns — babies cannot consent, and genetic data could be misused. On balance it could be beneficial if privacy is protected.' — Uses evidence from both sides." },
        { level: 6, body: "A balanced judgement: 'Benefits: early detection of treatable genetic conditions (e.g. PKU, congenital hypothyroidism, cystic fibrosis) allows intervention before irreversible damage. Genomic data could be used throughout life for personalised medicine. Costs: parents may face psychological burden from discovering risk of incurable adult-onset conditions in their baby; data storage and security costs are enormous; parental autonomy — the right to choose not to know; not all healthcare systems could interpret and act on genomic results. Different stakeholders (parents, health economists, oncologists, privacy advocates) view this trade-off differently.'" },
        { level: 8, body: "A nuanced judgement: newborn sequencing could be net positive IF limited to actionable childhood-onset conditions (where intervention before symptom onset has proven benefit) — analogous to existing newborn bloodspot screening (Guthrie test, now covering >9 conditions in the UK). Expanding to adult-onset disease risk raises the 'right not to know' principle — a baby cannot consent, and discovering BRCA1 status at birth imposes that information without consent. Health economic analyses (e.g. Bick et al., 2019 NHGRI study) suggest genomic newborn screening is cost-effective for selected conditions but may not be for whole-genome interpretation given current clinical readiness. Recommendation: start with a panel of actionable childhood conditions, with opt-in expansion for adult-onset risk as counselling infrastructure matures." },
      ],
      response: {
        kind: "reflection",
        prompt: "Should routine genome sequencing be offered to all newborns by national health services? Weigh the disease prevention benefits against parental autonomy, data privacy, psychological burden, and system preparedness.",
        scaffolds: [
          "Evidence supporting routine newborn sequencing includes...",
          "Evidence against includes...",
          "A key trade-off is... because...",
          "Different stakeholders view this differently — for example, a parent of a child with a genetic disease might say... whereas a privacy advocate might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["good", "bad", "positive", "negative", "beneficial", "harmful", "sequencing"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence.", keywords: ["early detection", "privacy", "consent", "benefit", "cost", "evidence", "however", "on balance"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; trade-offs identified; reasoned conclusion.", keywords: ["trade-off", "stakeholder", "parent", "privacy advocate", "right not to know", "cost-effective", "psychological burden", "actionable", "autonomy", "pku"], minKeywords: 3 },
          { level: 8, descriptor: "Short vs long-term; right not to know; economic analysis cited; specific recommendation with caveats.", keywords: ["right not to know", "actionable", "guthrie", "childhood-onset", "adult-onset", "bick", "nhgri", "cost-effective", "counselling", "opt-in", "recommendation", "consent"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain genome sequencing and how it reveals patterns that support new theories, using an accessible analogy.",
      guided: [
        { level: 2, body: "Restating technical definitions doesn't communicate to a non-specialist: 'Genome sequencing reads all 3.2 billion base pairs of your DNA.' — True, but what does it mean to a non-scientist?" },
        { level: 4, body: "The recipe book analogy helps: 'Your genome is like a recipe book with 20,000 recipes (genes). Each recipe tells your cells how to make a specific protein. Genome sequencing is like reading the entire book.' Good start, but doesn't explain what patterns reveal or what scientists discovered from them." },
        { level: 6, body: "An extended analogy: 'Imagine your genome is an enormous recipe book — 20,000 recipes, written in a 4-letter alphabet (A, T, C, G). Reading it doesn't tell you exactly what every cell will make, because which recipes are used depends on the environment too (like a chef's mood, available ingredients, and kitchen equipment). But scanning the book does reveal patterns — certain recipe variations predict a higher risk of allergies or intolerances. Spotting these patterns has allowed scientists to build entirely new theories about how diseases develop, like the theory that cancer is fundamentally a disease of mutated DNA, not just bad luck.'" },
        { level: 8, body: "Excellent communication: uses the recipe book analogy for the genome, extends it to explain how comparing thousands of recipe books (GWAS) reveals rare variants shared by people with the same disease, leading to new theories about disease mechanisms. Avoids genetic determinism: 'The book predicts tendencies, not certainties — the chef still decides what to cook (epigenetics and environment). A recipe book for a soufflé (high-risk BRCA1 variant) just means you need to be more careful with the oven temperature (lifestyle choices and surveillance). Scientists use patterns in the book to develop new theories: spotting that everyone with Alzheimer's shares the same misspelling on page 1,462 proposed that protein folding was the key — a theory that led to new drug targets.' Address a misconception: genes do not determine identity — you are not your genome, any more than a book is what a chef will cook tonight." },
      ],
      response: {
        kind: "reflection",
        prompt: "Explain genome sequencing to a Year 9 student using the recipe book analogy. Show how reading the genome reveals patterns that have led scientists to propose new theories about how diseases develop.",
        scaffolds: [
          "Your genome is like a recipe book with 20,000 recipes (genes)...",
          "Genome sequencing is like reading the entire book — all 3.2 billion letters...",
          "Finding patterns in thousands of books (comparing genomes from many people) revealed...",
          "This led scientists to propose a new theory that...",
          "A common misconception is that your genes determine everything — actually...",
        ],
        rubric: [
          { level: 2, descriptor: "Restates technical definition.", keywords: ["base pairs", "sequencing", "dna", "3.2 billion", "genes", "code"], minKeywords: 1 },
          { level: 4, descriptor: "Recipe book analogy used without explaining patterns or theories.", keywords: ["recipe book", "20000 recipes", "read", "genome", "analogy"], minKeywords: 1 },
          { level: 6, descriptor: "Analogy extended to explain patterns and how they lead to theories; one example given.", keywords: ["recipe book", "pattern", "theory", "gwas", "cancer", "mutation", "brca", "disease", "chef", "environment"], minKeywords: 3 },
          { level: 8, descriptor: "Analogy extended with epigenetics/environment; specific new theory cited; misconception addressed.", keywords: ["recipe book", "epigenetics", "environment", "chef", "soufflé", "misconception", "not determined", "alzheimer", "brca", "theory", "drug target", "identity"], minKeywords: 3 },
        ],
      },
    },
  ],
}
