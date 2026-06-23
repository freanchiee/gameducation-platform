import type { StrandhootPack } from "../engine/types"

export const cellStructureCritD: StrandhootPack = {
  slug: "cell-structure-crit-d",
  title: "Form & Biotechnology",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Stem cells, classification and diversity",
  accent: "#27ae60",
  icon: "🔬",
  statementOfInquiry: "Relationships between organisms are revealed by similarities and differences between the myriad of forms.",
  estMinutes: 25,
  intro:
    "From stem cell therapy to the ethics of embryo research, and from classifying new species to explaining DNA to a classmate — this criterion asks you to reflect on how biology knowledge shapes decisions and society. Each strand takes you from application to judgement to communication.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Ethics Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Form & biotechnology context", blurb: "Stem cells, ethics, classification, and scientific communication", icon: "🔬" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain applications of stem cell biology and cell specialisation research.",
      guided: [
        { level: 2, body: "Stem cells are unspecialised cells that can divide and become different cell types. Embryonic stem cells come from early embryos; adult stem cells are found in tissues like bone marrow. Stem cells are used in medicine because they can potentially replace damaged cells." },
        { level: 4, body: "Embryonic stem cells are pluripotent — they can become any cell type in the body. Adult stem cells are multipotent — they can become a limited range of cell types (e.g. bone marrow stem cells → red blood cells, white blood cells, platelets). Application: bone marrow transplants treat leukaemia by replacing cancerous blood stem cells with healthy donor cells." },
        { level: 6, body: "Applications include: (1) Stem cell therapy for leukaemia — bone marrow transplant replaces faulty blood stem cells; (2) Parkinson's disease research — dopamine-producing neurons derived from stem cells; (3) Induced pluripotent stem cells (iPSCs) — adult skin cells reprogrammed by adding four transcription factors (Yamanaka factors: Oct4, Sox2, Klf4, c-Myc) to become pluripotent again, avoiding embryo use; (4) 3D bioprinting — stem cells seeded onto biodegradable scaffolds, printed into tissue shapes for organ repair." },
        { level: 8, body: "Cutting-edge applications: (1) Organoids — mini-organs (brain, gut, kidney organoids) grown from iPSCs in culture to model disease and test drugs without patients; (2) Corneal stem cell therapy — limbal stem cells from a healthy eye transplanted to restore sight in the damaged eye (single-eye treatment now licensed in Europe); (3) CAR-T cell therapy — immune T cells genetically engineered to target cancer antigens, essentially creating specialised 'cell medicine'; (4) Tissue engineering for heart muscle patches after myocardial infarction. Each application exploits the fundamental biology of cell differentiation — the same DNA, different genes expressed — making Form the conceptual foundation of this entire biotechnology field." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which organelle is found in plant cells but NOT in animal cells?",
            options: [
              { id: "a", text: "Ribosome" },
              { id: "b", text: "Mitochondria" },
              { id: "c", text: "Chloroplast", correct: true },
              { id: "d", text: "Cell membrane" },
            ],
            explanation: "Chloroplasts are found only in plant cells (and algae). They contain chlorophyll and carry out photosynthesis. Animal cells have mitochondria, ribosomes, and a cell membrane — but no chloroplasts, cell wall, or large central vacuole.",
          },
          {
            id: "s2",
            prompt: "What is the key difference between embryonic stem cells and adult stem cells?",
            options: [
              { id: "a", text: "Embryonic stem cells are found in bone marrow; adult stem cells are found in embryos" },
              { id: "b", text: "Embryonic stem cells are pluripotent (can become any cell type); adult stem cells are multipotent (limited range)", correct: true },
              { id: "c", text: "Adult stem cells can only be used in adults; embryonic stem cells can only be used in children" },
              { id: "d", text: "Embryonic stem cells contain DNA; adult stem cells do not" },
            ],
            explanation: "The key distinction is potential: embryonic stem cells are pluripotent — they can differentiate into any cell type in the body. Adult stem cells are multipotent — they can only become a limited set of related cell types (e.g. blood stem cells give rise to blood cell types only).",
          },
        ],
        prompt: "Describe the applications of stem cell biology. Cover at least three specific uses across medicine and biotechnology, explaining the biological basis of each application.",
        scaffolds: [
          "Stem cells can be used to treat...",
          "This works because stem cells are...",
          "An example from medicine is...",
          "iPSCs are different from embryonic stem cells because...",
          "3D bioprinting uses stem cells by...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one application of stem cells.", keywords: ["stem cell", "therapy", "medicine", "transplant", "leukaemia", "bone marrow", "treat"], minKeywords: 1 },
          { level: 4, descriptor: "Two applications explained with pluripotent/multipotent distinction.", keywords: ["pluripotent", "multipotent", "embryonic", "adult", "bone marrow", "leukaemia", "parkinson", "differentiate"], minKeywords: 2 },
          { level: 6, descriptor: "Three or more applications with biological basis; iPSCs mentioned.", keywords: ["ipsc", "pluripotent", "yamanaka", "3d bioprinting", "scaffold", "parkinson", "dopamine", "leukaemia", "bone marrow", "reprogrammed"], minKeywords: 3 },
          { level: 8, descriptor: "Cutting-edge applications cited; gene expression link made; applications grounded in cell biology.", keywords: ["organoid", "car-t", "corneal", "limbal", "tissue engineering", "heart", "drug testing", "differential gene expression", "same dna", "differentiation"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the ethical, social, and access-related implications of stem cell research.",
      guided: [
        { level: 2, body: "Stem cell research raises ethical questions. Using embryos in research is controversial because it destroys the embryo. Some people believe the embryo is a human life from the moment of fertilisation." },
        { level: 4, body: "Embryonic stem cells: the embryo (blastocyst) is destroyed to harvest inner cell mass cells. Ethical objections: religious groups (Catholic Church, some evangelical groups) believe this is equivalent to taking a human life. Counter-argument: the embryos used are often surplus IVF embryos that would otherwise be discarded. iPSCs (induced pluripotent stem cells) were developed partly to avoid this ethical issue." },
        { level: 6, body: "Multiple implications: (1) Ethical — destruction of embryos; when does personhood begin?; different religious and cultural perspectives (Buddhist and Jewish traditions often more permissive than Catholic); IVF surplus embryo argument. (2) Social — unproven stem cell clinics globally exploit vulnerable patients (e.g. clinics in Mexico, Thailand charging $50,000+ for unvalidated treatments with serious risks). (3) Access and inequality — approved therapies are expensive; only high-income countries can fund them; developing nations may lack access. (4) Regulatory — different countries have different rules on embryo research, creating 'stem cell tourism' to countries with permissive laws." },
        { level: 8, body: "Systemic analysis: the 2006 Yamanaka iPSC breakthrough was partly driven by ethical pressure to find an alternative to embryonic stem cells — science responding to societal concerns. Regulatory frameworks vary dramatically: UK (HFEA) permits research on embryos up to 14 days; USA policy has shifted with administrations. Unproven clinics represent a $3.5 billion global industry (Nature Medicine, 2019) with documented patient deaths. Access inequality: CAR-T cell therapy (Kymriah) costs ~$475,000 per treatment in the USA. Distributive justice question: should expensive cell therapies be rationed by price or need? The debate mirrors broader healthcare ethics — and is inseparable from the underlying science of what stem cells can and cannot do." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What is the main ethical advantage of induced pluripotent stem cells (iPSCs) over embryonic stem cells?",
            options: [
              { id: "a", text: "iPSCs are more powerful and can become more cell types than embryonic stem cells" },
              { id: "b", text: "iPSCs do not require the destruction of an embryo, avoiding the associated ethical objections", correct: true },
              { id: "c", text: "iPSCs are cheaper to produce and more widely available" },
              { id: "d", text: "iPSCs come from the patient's own body so there is no risk of infection" },
            ],
            explanation: "The key ethical advantage of iPSCs is that they are made by reprogramming adult cells (e.g. skin cells) — no embryo is required or destroyed. This was the major motivation behind Shinya Yamanaka's Nobel-Prize-winning research.",
          },
        ],
        prompt: "Evaluate the ethical, social, and economic implications of stem cell research and therapy. Cover at least three different types of implication.",
        scaffolds: [
          "Ethical implications include...",
          "Different religious and cultural perspectives on embryo research include...",
          "A social concern is that unproven clinics...",
          "Access and inequality is a concern because...",
          "Regulatory implications include...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one implication.", keywords: ["ethical", "embryo", "destroy", "life", "controversial", "religious"], minKeywords: 1 },
          { level: 4, descriptor: "Two types of implication with brief explanations.", keywords: ["embryo", "religious", "ipsc", "unproven", "access", "expensive", "inequality", "ethical", "social"], minKeywords: 2 },
          { level: 6, descriptor: "Three types of implication with reasoning; iPSC ethical advantage noted; unproven clinics mentioned.", keywords: ["embryo", "religious", "ipsc", "clinics", "expensive", "access", "inequality", "regulatory", "personhood", "exploitation"], minKeywords: 4 },
          { level: 8, descriptor: "Systemic analysis with data; yamanaka motivation; cost figures; distributive justice framed.", keywords: ["yamanaka", "hfea", "14 days", "$475,000", "kymriah", "$3.5 billion", "nature medicine", "distributive justice", "rationing", "stem cell tourism", "patient deaths"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the evidence and form a reasoned position on embryonic stem cell research.",
      guided: [
        { level: 2, body: "'Embryonic stem cell research should be allowed because it saves lives' — or — 'It should be banned because embryos are human lives.' A simple opinion without weighing of evidence or acknowledgement of complexity." },
        { level: 4, body: "'Embryonic stem cell research should be regulated but permitted. The potential to cure degenerative diseases like Parkinson's outweighs the ethical cost when surplus IVF embryos — which would otherwise be discarded — are used. However, strong oversight is needed to prevent misuse.' — Uses evidence from both sides and reaches a conditional conclusion." },
        { level: 6, body: "A balanced judgement: 'The case for permitting regulated embryonic research rests on: (a) potential to treat currently incurable diseases affecting millions; (b) the embryos used are 5-day-old blastocysts with no nervous system or sentience; (c) the IVF surplus argument. The case against rests on: (a) the moral status of the embryo at the moment of fertilisation; (b) iPSCs now provide an alternative. On balance, regulated use of surplus IVF embryos is justifiable, with strict 14-day limits, on the condition that iPSC alternatives are prioritised wherever possible.'" },
        { level: 8, body: "A nuanced judgement: acknowledges uncertainty about when morally relevant personhood begins; distinguishes between potential and current utility of iPSCs (iPSCs are not yet equivalent for all applications, e.g. some disease models); weighs the asymmetry of harms (certain destruction of embryo vs uncertain future benefit vs the IVF embryo counterfactual — the embryo would be discarded anyway); considers temporal dimension (the 14-day rule reflects scientific consensus on when neurodevelopment begins); addresses procedural justice (international oversight body needed to prevent regulatory arbitrage); arrives at a calibrated conditional conclusion with stated assumptions and caveats." },
      ],
      response: {
        kind: "reflection",
        prompt: "Should embryonic stem cell research be permitted? Construct a reasoned, evidence-based judgement that weighs the ethical arguments on both sides.",
        scaffolds: [
          "Evidence supporting permission for embryonic stem cell research includes...",
          "Evidence against permission includes...",
          "A key trade-off is between...",
          "The iPSC alternative changes the argument because...",
          "Different stakeholders — a patient with Parkinson's disease, a religious leader, an IVF clinic — would view this differently because...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["should", "allowed", "banned", "good", "bad", "embryo", "saves lives"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence; conditional conclusion.", keywords: ["parkinson", "leukaemia", "embryo", "destroy", "surplus ivf", "however", "regulated", "on balance", "evidence"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; trade-offs identified; iPSC alternative considered; reasoned conclusion.", keywords: ["blastocyst", "sentience", "nervous system", "ipsc", "14-day", "stakeholder", "patient", "religious", "ivf surplus", "balanced"], minKeywords: 3 },
          { level: 8, descriptor: "Uncertainty about personhood; iPSC limitations noted; asymmetry of harms; procedural justice; calibrated conclusion.", keywords: ["personhood", "uncertainty", "ipsc limitations", "asymmetry", "counterfactual", "14-day rule", "neurodevelopment", "procedural justice", "regulatory arbitrage", "calibrated"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain cell specialisation using the DNA blueprint analogy to a non-specialist.",
      guided: [
        { level: 2, body: "Restating the definition using jargon doesn't communicate to a non-specialist: 'Cell specialisation means cells differentiate by differential gene expression — specific genes are activated or repressed by transcription factors depending on the cell's developmental fate.'" },
        { level: 4, body: "An analogy helps: 'Think of DNA as a blueprint for a house. Every room in the house has the same blueprint, but each room is built differently — the kitchen has an oven, the bedroom has a bed. Similarly, all cells have the same DNA, but different cells use different parts of it.' Good start, but doesn't explain the mechanism of which genes are switched on/off or why." },
        { level: 6, body: "A clear analogy linked to the biology: 'Every cell in your body contains the same complete set of DNA — the full blueprint. But just as building a hospital needs different teams following different sections of the plan (electrical engineers read the wiring diagrams; plumbers read the pipework), different cells switch on only the genes they need. A muscle cell switches on genes for actin and myosin proteins; a red blood cell switches on genes for haemoglobin. The other genes are still there — just not being read.'" },
        { level: 8, body: "Excellent communication uses two linked analogies (one for the concept of identical DNA, one for gene switching), explicitly connects to a real cell type (red blood cell, muscle, neuron), avoids jargon (explains 'gene expression' as 'which parts of the instruction manual are read'), addresses a common misconception ('cells don't lose their DNA — they just ignore most of it'), explains the stem cell connection ('stem cells haven't yet decided which room to build — they have all possibilities open'), and ends with real-world relevance ('this is exactly why stem cells are so powerful in medicine — they can still become any cell type, because no genes have been permanently switched off')." },
      ],
      response: {
        kind: "reflection",
        prompt: "Explain the concept of cell specialisation to a Year 9 student who has never heard of it. Use the DNA blueprint analogy and explain why all cells have the same DNA but look and behave differently.",
        scaffolds: [
          "Imagine DNA is like a blueprint — all cells have the same blueprint because...",
          "But just like a builder only reads certain sections of the blueprint...",
          "For example, a red blood cell...",
          "A muscle cell uses different parts of the DNA because...",
          "A common misconception is that cells have different DNA — actually...",
          "This is why stem cells are special — they...",
        ],
        rubric: [
          { level: 2, descriptor: "Restates definition using jargon.", keywords: ["dna", "gene", "specialised", "cell", "different", "function"], minKeywords: 1 },
          { level: 4, descriptor: "Blueprint analogy used; same DNA point made.", keywords: ["blueprint", "same dna", "different", "analogy", "all cells", "room", "plan"], minKeywords: 2 },
          { level: 6, descriptor: "Analogy linked to specific cell types; gene switching explained accessibly.", keywords: ["blueprint", "same dna", "red blood cell", "muscle", "haemoglobin", "switch on", "only reads", "genes", "clear", "accessible"], minKeywords: 3 },
          { level: 8, descriptor: "Two analogies; misconception addressed; stem cell link; jargon explained; real-world relevance.", keywords: ["analogy", "misconception", "same dna", "stem cell", "all possibilities", "instruction manual", "expression", "doesn't lose", "medicine", "powerful"], minKeywords: 3 },
        ],
      },
    },
  ],
}
