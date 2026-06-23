import type { StrandhootPack } from "../engine/types"

export const enzymesCritD: StrandhootPack = {
  slug: "enzymes-crit-d",
  title: "Enzymes & Biotechnology",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Industrial enzymes and anti-aging science",
  accent: "#27ae60",
  icon: "🔬",
  statementOfInquiry: "Science is applied to mitigate the transformations associated with aging but sometimes anti-aging science is misrepresented.",
  estMinutes: 25,
  intro:
    "Enzymes power industries from laundry powder to cheese-making, and fuel a multi-billion-dollar anti-aging supplement market. Reflect on which applications are backed by rigorous science — and where the science is being misrepresented. Each strand asks you to move from recall to reasoned judgement.",
  badges: [
    { id: "applicator", label: "Biotech Linker", icon: "🏭", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "master", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Enzymes in industry & society", blurb: "Industrial enzymes, anti-aging science, and communicating biochemistry", icon: "🔬" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain the industrial and medical applications of enzymes.",
      guided: [
        { level: 2, body: "Enzymes are used in many industries. Biological washing powders contain enzymes that break down stains. Cheese-making uses enzymes to curdle milk. These are practical applications of enzyme specificity and efficiency." },
        { level: 4, body: "Biological washing powders contain proteases (digest protein stains like blood and sweat) and lipases (digest fat/oil stains). They work effectively at lower temperatures than non-biological powders, saving energy. Rennet (or chymosin from GMO yeast) is used in cheese-making to curdle milk proteins. Amylases are used in brewing to convert starch into glucose for fermentation by yeast." },
        { level: 6, body: "Industrial enzyme applications span multiple sectors: food and drink (amylase in brewing, chymosin in cheese, glucose isomerase converts glucose to fructose for sweeteners); textiles (cellulase softens denim); pharmaceuticals (streptokinase dissolves blood clots in stroke patients; lactase is sold as a supplement for lactose intolerance); biosensors (glucose oxidase in blood glucose monitors for diabetes management). Each application exploits enzyme specificity and efficiency." },
        { level: 8, body: "Quantified significance: the global industrial enzyme market exceeds $6 billion per year. Immobilised enzyme technology locks enzymes onto beads or membranes — enzyme is not lost to the product, making large-scale continuous production economical (e.g. production of high-fructose corn syrup using immobilised glucose isomerase). Genetic engineering has enabled production of human-identical proteins by recombinant organisms: chymosin from E. coli or yeast now accounts for >90% of global cheese production, replacing animal rennet. Pharmaceutical applications include enzyme replacement therapy (e.g. Gaucher's disease, where patients lack functional glucocerebrosidase)." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which enzyme in biological washing powder digests grease and fat stains?",
            options: [
              { id: "a", text: "Protease" },
              { id: "b", text: "Amylase" },
              { id: "c", text: "Lipase", correct: true },
              { id: "d", text: "Cellulase" },
            ],
            explanation: "Lipase specifically breaks down lipids (fats and oils) into fatty acids and glycerol. Protease breaks down protein stains; amylase breaks down starch stains; cellulase softens fabric fibres.",
          },
          {
            id: "s2",
            prompt: "Why are biological washing powders more environmentally friendly than non-biological powders?",
            options: [
              { id: "a", text: "They contain no chemicals at all" },
              { id: "b", text: "They work effectively at lower temperatures, saving energy", correct: true },
              { id: "c", text: "They use more water to rinse" },
              { id: "d", text: "They only work with cold water" },
            ],
            explanation: "Enzymes in biological powders break down stains at 30–40°C instead of 60–90°C. Lower wash temperatures consume significantly less energy, reducing CO₂ emissions from the electricity or gas used.",
          },
          {
            id: "s3",
            prompt: "In brewing, why is amylase added to grain mash?",
            options: [
              { id: "a", text: "To digest protein, improving flavour" },
              { id: "b", text: "To convert starch into glucose, which yeast can ferment into alcohol", correct: true },
              { id: "c", text: "To digest cellulose in barley husks" },
              { id: "d", text: "To kill bacteria in the mash" },
            ],
            explanation: "Yeast cannot ferment starch directly — it can only ferment simple sugars such as glucose and maltose. Amylase breaks down the starch (a polysaccharide) into glucose molecules that yeast can then ferment to produce ethanol and CO₂.",
          },
        ],
        prompt: "Describe the industrial and medical applications of enzymes. Cover at least three sectors (e.g. food, pharmaceuticals, textiles, biosensors) and explain how enzyme specificity makes each application possible.",
        scaffolds: [
          "In the food and drink industry, enzymes are used for...",
          "Biological washing powders contain ___ which digests ___ stains, and ___ which digests ___ stains...",
          "In medicine, streptokinase is used to...",
          "A glucose oxidase biosensor is used by diabetic patients to...",
          "Immobilised enzymes are used in industry because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one or two enzyme applications.", keywords: ["washing powder", "cheese", "brewing", "protease", "lipase", "enzyme", "application"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more sectors covered with brief explanations.", keywords: ["protease", "lipase", "amylase", "cheese", "brewing", "washing", "temperature", "low", "glucose"], minKeywords: 2 },
          { level: 6, descriptor: "Three+ sectors; enzyme specificity linked to each application.", keywords: ["specificity", "streptokinase", "glucose oxidase", "lactase", "biosensor", "pharmaceutical", "brewing", "lipase", "chymosin", "food"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified scale; immobilised enzymes; genetic engineering and recombinant production discussed.", keywords: ["immobilised", "glucose isomerase", "recombinant", "chymosin", "e. coli", "90%", "6 billion", "enzyme replacement", "gaucher", "hfcs"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the social, economic and ethical implications of enzyme biotechnology and the anti-aging supplement industry.",
      guided: [
        { level: 2, body: "Enzyme supplements claiming to slow aging are sold in health food stores. Some of these products may not work as advertised. Genetic engineering of enzyme-producing organisms raises ethical questions." },
        { level: 4, body: "The anti-aging enzyme supplement industry is worth billions of dollars. Many products claim that taking enzyme supplements orally will replace declining enzyme activity associated with aging. However, most enzymes taken orally are digested in the stomach and small intestine — they never reach target cells intact. This is a significant mismatch between marketing claims and how enzymes actually work in the body." },
        { level: 6, body: "Key implications: economic — the global anti-aging market exceeds $60 billion; consumers often pay premium prices for products with little or no clinical evidence. Social — vulnerable populations (elderly, chronically ill) are disproportionately targeted. Ethical — scientists and pharmaceutical companies have a responsibility to communicate evidence clearly. Positive implications: genetic engineering of enzyme-producing organisms (insulin from E. coli, chymosin from yeast) has reduced costs and improved supply of life-saving products. Cold chain storage requirements for industrial enzyme products have environmental costs." },
        { level: 8, body: "Systemic analysis: (1) Regulatory gap — in many countries, dietary enzyme supplements are classified as food, not medicine, so they escape rigorous clinical trial requirements. (2) Evidence base — most anti-aging enzyme studies are small, short-term, industry-funded, or conducted in vitro. Systematic reviews consistently find insufficient evidence for oral enzyme supplementation improving clinical outcomes. (3) Science communication failure — mechanisms are misrepresented (enzymes are proteins; they are digested just like dietary proteins). (4) Benefits and burdens are unevenly distributed — low-income consumers pay significant amounts for unproven products, while companies profit without being accountable for clinical outcomes." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Why do most enzyme supplements taken orally not reach their claimed target tissues?",
            options: [
              { id: "a", text: "Enzymes are too large to be absorbed from the gut" },
              { id: "b", text: "Enzymes are proteins and are digested by proteases in the stomach and small intestine before reaching target cells", correct: true },
              { id: "c", text: "Enzymes are excreted immediately by the kidneys" },
              { id: "d", text: "Enzymes cannot survive the alkaline pH of the large intestine" },
            ],
            explanation: "Enzymes are proteins. When ingested, they face the same fate as any dietary protein — denaturation by stomach acid (low pH) and digestion by proteases (pepsin in the stomach, trypsin and chymotrypsin in the small intestine). They are broken down into amino acids, not absorbed as functional enzymes.",
          },
        ],
        prompt: "Evaluate the social, economic and ethical implications of the anti-aging enzyme supplement industry. Also consider the genuine benefits and risks of enzyme biotechnology more broadly.",
        scaffolds: [
          "Economic implications include...",
          "Social implications include... (who is most affected by misleading marketing?)",
          "The anti-aging enzyme supplement claims are problematic because...",
          "In contrast, genuine enzyme biotechnology (e.g. insulin production) has benefited society by...",
          "An ethical concern about genetically engineered enzyme-producing organisms is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one implication.", keywords: ["money", "cost", "ethical", "supplement", "anti-aging", "enzyme", "benefit", "risk"], minKeywords: 1 },
          { level: 4, descriptor: "Two categories of implication with brief explanation.", keywords: ["economic", "social", "ethical", "digested", "protein", "evidence", "marketing", "insulin", "elderly"], minKeywords: 2 },
          { level: 6, descriptor: "Anti-aging industry critique; regulatory context; contrast with beneficial biotechnology.", keywords: ["digested", "stomach", "proteases", "no evidence", "regulatory", "food classification", "vulnerable", "insulin", "chymosin", "clinical"], minKeywords: 3 },
          { level: 8, descriptor: "Systemic analysis; regulatory gap; evidence-base critique; unequal burden distribution.", keywords: ["regulatory gap", "food not medicine", "clinical trial", "systematic review", "in vitro", "science communication", "unequal", "low-income", "industry-funded", "mechanism"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh legitimate enzyme research against exaggerated anti-aging marketing claims and form an evidence-based position.",
      guided: [
        { level: 2, body: "'Enzyme supplements probably don't work because the body digests enzymes.' — A simple opinion identifying one issue, but no evidence or nuance." },
        { level: 4, body: "'The anti-aging enzyme supplement industry may be misrepresenting science. Most oral enzyme supplements are digested before reaching target cells, so claims that they replace aging enzymes are physiologically implausible. However, some topical enzyme products (applied to skin) may have scientific support.' — Uses evidence from both sides." },
        { level: 6, body: "A balanced judgement: 'The industry is largely misrepresenting science. The mechanism proposed — that oral enzymes replace declining enzyme activity — is physiologically implausible because enzymes are digested as dietary proteins. The evidence base for most anti-aging enzyme supplements is weak (small studies, industry-funded, in vitro). However, consumers have a right to spend their money as they choose, and the placebo effect may provide genuine benefit. Legitimate enzyme biotechnology (e.g. pharmaceutical enzymes) should not be conflated with supplement marketing.'" },
        { level: 8, body: "A nuanced judgement: weighs the plausibility of proposed mechanisms against actual evidence; distinguishes between different types of enzyme products (oral supplements vs topical vs pharmaceutical); addresses the ethics of placebo, the rights of consumers vs duty of companies to be honest, and the role of regulatory bodies in protecting consumers without overly restricting the market. Considers the perspective of: scientists (mechanism implausible, evidence poor), consumers (right to try, placebo benefit), companies (legal, profitable), regulators (duty to protect). Arrives at a calibrated conclusion: supplement industry is misrepresenting science, but the solution is better science communication and regulation, not prohibition." },
      ],
      response: {
        kind: "reflection",
        prompt: "Is the anti-aging enzyme supplement industry misrepresenting science? Construct a reasoned, evidence-based judgement that weighs the trade-offs between consumer freedom, commercial interests, and scientific integrity.",
        scaffolds: [
          "Evidence that the industry is misrepresenting science includes...",
          "A counterargument is...",
          "The key scientific issue is that enzymes taken orally...",
          "Different stakeholders view this differently — a scientist would say... whereas a consumer might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["misrepresenting", "doesn't work", "good", "bad", "supplement", "anti-aging", "opinion"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence.", keywords: ["digested", "mechanism", "implausible", "consumer", "right", "evidence", "placebo", "however"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; mechanism critique; evidence base discussed.", keywords: ["mechanism", "physiologically implausible", "evidence base", "industry-funded", "in vitro", "placebo", "pharmaceutical", "stakeholder", "legitimate"], minKeywords: 3 },
          { level: 8, descriptor: "Nuanced: distinguishes product types; ethics of placebo; regulatory solution proposed; calibrated conclusion.", keywords: ["topical", "oral", "pharmaceutical", "placebo ethics", "regulatory", "science communication", "prohibition", "calibrated", "consumer rights", "commercial"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain enzyme denaturation using an accessible analogy for a non-specialist audience.",
      guided: [
        { level: 2, body: "Restating the definition with jargon doesn't communicate to a non-specialist: 'Denaturation occurs when the tertiary structure of the enzyme's active site is disrupted by high temperature or extreme pH, causing the substrate to no longer fit.'" },
        { level: 4, body: "An analogy helps — the key-and-lock: 'Imagine an enzyme as a special key for a lock — the substrate is the lock. When the enzyme is heated too much, the key gets bent out of shape. The key still exists, but it no longer fits the lock, so the door won't open. This is denaturation.' Good start, but doesn't explain why it's permanent or why it matters." },
        { level: 6, body: "A clear analogy with permanence explained: 'Think of the enzyme as a carefully folded piece of origami paper — its precise folds give it the right shape to bind the substrate (like a carefully shaped hand holding an egg). Heat unfolds the origami: the shape is destroyed, and the paper just crumples. Unlike a simple metal key, which you could straighten, origami paper cannot easily be re-folded to its original shape — the folds are lost. This is why denaturation is irreversible: the protein chain cannot spontaneously refold to its original shape.' Link to anti-aging: 'This is why enzyme supplements taken orally cannot replace aging enzymes — the acid in the stomach unfolds (denatures) the supplement enzyme before it reaches its target.'" },
        { level: 8, body: "Excellent communication uses two linked analogies (one for how the active site works, one for denaturation), explicitly addresses the anti-aging supplement misrepresentation, avoids jargon (explains 'protein' as 'a chain of building blocks that folds into a precise shape', 'tertiary structure' not needed), addresses a likely misconception ('denatured doesn't mean destroyed — the molecule is still there, just the wrong shape — like a crumpled key, not a melted one'), and explains why body temperature (37°C) is the optimum — 'just warm enough for fast reactions, not so hot that enzymes unfold.' Closes by connecting to the SOI: science IS being used legitimately (pharmaceutical enzymes) but misrepresented (oral supplements)." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which analogy best explains why enzyme denaturation is IRREVERSIBLE?",
            options: [
              { id: "a", text: "A metal key bent out of shape — you could bend it back" },
              { id: "b", text: "An ice cube melting — the water is still there, just in a different form" },
              { id: "c", text: "A carefully folded origami figure unfolded and crumpled — the precise folds are permanently lost", correct: true },
              { id: "d", text: "A light bulb that switches off — it can switch back on" },
            ],
            explanation: "The origami analogy captures irreversibility: once the precise folds are lost, the paper cannot spontaneously re-form the same shape. Similarly, a denatured protein cannot spontaneously refold to its original active site conformation (in the absence of chaperone proteins and correct conditions).",
          },
          {
            id: "s2",
            prompt: "A classmate says 'Denaturation destroys the enzyme.' What is the most accurate correction?",
            options: [
              { id: "a", text: "Denaturation does destroy the enzyme — it no longer exists after heating" },
              { id: "b", text: "Denaturation changes the shape of the active site but the protein molecule still exists — it just cannot function", correct: true },
              { id: "c", text: "Denaturation only happens at very extreme temperatures, not in biology" },
              { id: "d", text: "Denaturation is reversible if you cool the enzyme back down" },
            ],
            explanation: "Denaturation does not destroy the protein — the amino acid chains still exist. What changes is the 3D shape (tertiary structure) of the active site. The protein is like a crumpled key: still there, but no longer functional. This is also why 'denatured' alcohol (ethanol with additives) still exists chemically but is no longer drinkable.",
          },
          {
            id: "s3",
            prompt: "Why do anti-aging enzyme supplements taken as pills generally not work as advertised?",
            options: [
              { id: "a", text: "The enzymes are excreted unchanged by the kidneys" },
              { id: "b", text: "The stomach is too cold for the enzymes to work" },
              { id: "c", text: "The enzymes are denatured by stomach acid and digested by proteases before reaching target tissues", correct: true },
              { id: "d", text: "The supplement enzymes are a different shape from human enzymes and cannot enter cells" },
            ],
            explanation: "Enzymes are proteins. Stomach acid (pH 1–2) denatures most enzymes, and proteases (pepsin, trypsin) digest the denatured protein into amino acids. The amino acids are absorbed — not the intact enzyme. This is the core scientific misrepresentation in the oral enzyme supplement industry.",
          },
        ],
        prompt: "Explain enzyme denaturation to a non-specialist (a Year 9 student or a family member who has never studied biology). Use at least one everyday analogy, explain why it is irreversible, and connect it to the anti-aging enzyme supplement debate.",
        scaffolds: [
          "An enzyme works like... [analogy for active site specificity]",
          "When an enzyme is heated too much, it is like...",
          "This is called denaturation. The enzyme is not destroyed — instead...",
          "This is irreversible because...",
          "This is why anti-aging enzyme supplements taken as pills...",
          "A common misconception is that denaturation 'destroys' the enzyme — actually...",
        ],
        rubric: [
          { level: 2, descriptor: "Restates definition using jargon.", keywords: ["active site", "shape", "denature", "protein", "temperature", "substrate"], minKeywords: 1 },
          { level: 4, descriptor: "Gives an analogy but doesn't link to supplements or irreversibility.", keywords: ["key", "lock", "bent", "shape", "analogy", "crumpled"], minKeywords: 1 },
          { level: 6, descriptor: "Analogy with irreversibility explained; supplement link made.", keywords: ["analogy", "irreversible", "cannot refold", "origami", "crumpled", "supplement", "digested", "stomach", "still exists"], minKeywords: 3 },
          { level: 8, descriptor: "Two analogies; misconception addressed; supplement misrepresentation; SOI connection.", keywords: ["two analogies", "misconception", "not destroyed", "crumpled key", "origami", "supplement", "digested protease", "anti-aging", "misrepresented", "37°c"], minKeywords: 3 },
        ],
      },
    },
  ],
}
