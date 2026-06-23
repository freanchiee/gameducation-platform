import type { StrandhootPack } from "../engine/types"

export const functionCritD: StrandhootPack = {
  slug: "function-crit-d",
  title: "Separation Science & Sustainability",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Real-world applications and impacts of separation techniques and the mole concept",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry:
    "The way in which matter functions is dependent on its properties and the relationship of the different systems within the environment.",
  estMinutes: 27,
  intro:
    "Separation chemistry underpins food safety, forensic science, water purification, and sustainable agriculture. Reflect on how the properties of matter — solubility, boiling point, molar mass — drive real-world technologies and how those technologies affect the environment, society, and our global relationships with finite resources.",
  badges: [
    {
      id: "applicator-d",
      label: "Real World Link",
      icon: "🌏",
      description: "Reach Level 8 on Applications",
      strandId: "applications-d",
      atLevel: 8,
    },
    {
      id: "critic-d",
      label: "Impact Analyst",
      icon: "⚠️",
      description: "Reach Level 8 on Implications & impacts",
      strandId: "impacts-d",
      atLevel: 8,
    },
    {
      id: "judge-d",
      label: "Evidence Judge",
      icon: "⚖️",
      description: "Reach Level 8 on Making a judgement",
      strandId: "judgement-d",
      atLevel: 8,
    },
    {
      id: "communicator-d",
      label: "Science Voice",
      icon: "📢",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Separation science context",
      blurb: "Desalination, forensics, water quality and sustainable chemistry",
      icon: "💧",
    },
  ],
  strands: [
    {
      id: "applications-d",
      name: "Applications",
      descriptor:
        "Identify and explain the real-world applications of separation techniques and the mole concept from Chapter 7.",
      guided: [
        {
          level: 2,
          body: "Separation techniques are used everywhere in science and industry. Filtration separates solids from liquids in water treatment. Distillation is used to purify ethanol in the drinks industry. Chromatography is used in forensic science to analyse inks, dyes, and drugs.",
        },
        {
          level: 4,
          body: "Key applications from Chapter 7: (1) Water purification — filtration removes insoluble particles; the mole concept is used to calculate the correct amounts of disinfecting chemicals. (2) Desalination — separating sodium chloride from water; simple distillation evaporates water and collects it as the distillate, leaving NaCl behind. (3) Forensics — HPLC and GC-MS identify substances by their unique retention times; paper chromatography identifies forged documents by matching ink pigments. (4) Food safety — chromatography tests food colorings for banned dyes. (5) Environmental monitoring — chromatography detects toxic metal ions (Cu²⁺, Cd²⁺, Hg²⁺) in waste water samples.",
        },
        {
          level: 6,
          body: "The Sundrop Farms case study in Chapter 7 illustrates desalination at industrial scale: 23,000 mirrors focus solar energy onto a tower to power a desalination unit drawing seawater from Spencer Gulf, South Australia — producing up to 1 million litres of fresh water per day to grow 15,000 tonnes of tomatoes per year. This exploits the difference in boiling point between water (bp 100°C) and the ionic solute NaCl (bp 1413°C) — the water evaporates, is condensed, and collected; NaCl remains. The mole concept underpins calculation of how much NaCl is in a given volume of seawater (seawater is approximately 3.5% NaCl by mass).",
        },
        {
          level: 8,
          body: "Quantified scale: Sundrop Farms' $150 million facility uses 23,000 heliostat mirrors and produces >1 million litres of fresh water daily and >15,000 tonnes of tomatoes annually. The mole concept allows industrial chemists to calculate: 1 litre of seawater (density ≈ 1.025 g cm⁻³, 3.5% NaCl by mass) contains ≈ 35.9 g NaCl per 100 cm³. Using n = m/Mr: in 1 dm³ seawater, n(NaCl) = 359 / 58.44 = 6.14 mol. These calculations inform how much energy and membrane capacity are needed for reverse osmosis desalination. Chapter 7 notes that most industrial desalination uses reverse osmosis (not distillation) because it is more energy-efficient — illustrating how chemistry functions within environmental and economic systems.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1-d",
            prompt:
              "Which separation technique does the Sundrop Farms facility in South Australia use to produce fresh water from seawater?",
            options: [
              { id: "a", text: "Chromatography" },
              { id: "b", text: "Filtration" },
              { id: "c", text: "Distillation (solar-powered desalination)", correct: true },
              { id: "d", text: "Precipitation" },
            ],
            explanation:
              "Sundrop Farms focuses solar energy to evaporate water from seawater (like distillation) — the water vapour condenses into fresh water. The technique exploits the difference in boiling point between water (100°C) and the ionic salt NaCl (bp 1413°C).",
          },
          {
            id: "s2-d",
            prompt:
              "Forensic scientists identify a suspected dye on a banknote using paper chromatography. A spot has Rf = 0.60. What else is needed, beyond Rf, to confirm the identity of the dye?",
            options: [
              { id: "a", text: "The molar mass of the dye alone is enough" },
              { id: "b", text: "Comparison with a reference standard of known Rf AND colour under the same solvent conditions", correct: true },
              { id: "c", text: "The boiling point of the dye" },
              { id: "d", text: "The density of the dye" },
            ],
            explanation:
              "Rf alone is not enough to confirm identity — different substances can share the same Rf under different conditions. A reference standard of the suspected dye must be run simultaneously under identical solvent conditions and both Rf value AND spot colour must match. GC-MS is used for definitive confirmation.",
          },
        ],
        prompt:
          "Describe the applications of separation techniques from Chapter 7 across multiple sectors: water, food, forensics, and environment. Use specific examples and link each to the physical property being exploited.",
        scaffolds: [
          "In water purification / desalination, the technique used is... because...",
          "In forensic science, chromatography works by...",
          "Environmental monitoring uses chromatography to...",
          "The Sundrop Farms facility shows how chemistry functions within...",
          "The mole concept is applied industrially because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one application.",
            keywords: ["forensic", "water", "food", "distillation", "filtration", "chromatography"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two or more applications with brief links to physical properties.",
            keywords: [
              "forensic",
              "desalination",
              "boiling point",
              "solubility",
              "food colouring",
              "waste water",
              "mole",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Multiple sectors; Sundrop Farms named; property-technique link explained.",
            keywords: [
              "sundrop farms",
              "solar",
              "spencer gulf",
              "1 million litres",
              "boiling point",
              "nacl",
              "hplc",
              "gc-ms",
              "forensic",
              "identity",
              "mole",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Quantified data; mole calculation applied to seawater; reverse osmosis vs distillation comparison; environmental/economic context.",
            keywords: [
              "6.14 mol",
              "58.44",
              "359",
              "3.5%",
              "reverse osmosis",
              "energy-efficient",
              "150 million",
              "23000 mirrors",
              "15000 tonnes",
              "calculation",
              "economic",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "impacts-d",
      name: "Implications & impacts",
      descriptor:
        "Evaluate the environmental, social, and economic impacts of desalination and heavy-metal contamination of water.",
      guided: [
        {
          level: 2,
          body: "Using chemistry to purify water can have positive effects (clean water for drinking) but also negative effects. Heavy metal ions like mercury (Hg²⁺) and cadmium (Cd²⁺) in waste water are toxic to aquatic life and humans.",
        },
        {
          level: 4,
          body: "Environmental: (1) Heavy metal contamination of water — toxic Hg²⁺, Cd²⁺ and Cu²⁺ are identified in waste water using chromatography (Chapter 7 data question). These metals accumulate in food chains (bioaccumulation). (2) Desalination — the Sundrop Farms facility uses solar energy (reducing CO₂), but the reverse osmosis process (used industrially) is energy-intensive. Social: access to clean water through desalination benefits water-stressed regions. Economic: desalination facilities cost hundreds of millions of dollars — only available in wealthy or energy-rich regions.",
        },
        {
          level: 6,
          body: "Multilevel impacts: Environmental — brine discharge from desalination plants (concentrated saltwater pumped back to sea) raises local salinity, harming marine ecosystems. Heavy metal ions like Hg²⁺ and Cd²⁺ in industrial waste water (detected by chromatography in Chapter 7) are persistent and cannot be biodegraded — they accumulate in fish, shellfish, and humans (Minamata disease: 2,000+ deaths from industrial mercury discharge in Japan, 1950s). Social — water stress affects 40% of the world's population; desalination could address this but is largely inaccessible to the poorest communities. Economic — solar desalination ($150 million at Sundrop Farms) is expensive; critics in New Scientist note it is 'like using a sledgehammer to crack a nut' for growing tomatoes in Australia where rainfall is available.",
        },
        {
          level: 8,
          body: "Systemic analysis: The same chapter that explains separation techniques also reveals how industrial systems use and contaminate water. The waste water chromatography data shows simultaneous presence of Ni²⁺, Co²⁺, Cu²⁺, Cd²⁺, and Hg²⁺ — a cocktail of toxic metals from industrial effluent. Without chromatographic monitoring, these contaminants would be invisible. Desalination at scale: most global desalination is reverse osmosis (not distillation) — Saudi Arabia produces ~18% of global desalinated water using fossil-fuel-powered RO plants, generating ~76 million tonnes of CO₂ equivalents annually. The brine discharge problem is unsolved at large scale. The tradeoff: millions gain access to clean water, but environmental costs are concentrated in coastal marine ecosystems. These costs and benefits are unequally distributed — wealthy, coastal, and arid nations benefit most.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s3-d",
            prompt:
              "A factory discharges waste water containing Hg²⁺ ions into a river. Paper chromatography detects Rf = 0.95 (brown-black spot). Which ion does this correspond to, and why is it particularly dangerous in a river ecosystem?",
            options: [
              {
                id: "a",
                text: "Cu²⁺ — dangerous because it is highly soluble",
              },
              {
                id: "b",
                text: "Hg²⁺ (mercury) — dangerous because it bioaccumulates through the food chain",
                correct: true,
              },
              {
                id: "c",
                text: "Co²⁺ — dangerous because it is radioactive",
              },
              {
                id: "d",
                text: "Cd²⁺ — dangerous only if ingested directly",
              },
            ],
            explanation:
              "Rf = 0.95 (brown-black) matches Hg²⁺ (mercury, molar mass 200.6 g mol⁻¹) from the Chapter 7 reference table. Mercury bioaccumulates — fish absorb it from water and cannot excrete it, so each level of the food chain contains higher concentrations. Large predatory fish (tuna, swordfish) can contain mercury levels 1 million times higher than the surrounding water.",
          },
        ],
        prompt:
          "Evaluate the environmental, social, and economic impacts of (a) heavy metal contamination of water detected by chromatography, and (b) solar desalination as used by Sundrop Farms. Cover at least three categories of impact.",
        scaffolds: [
          "Environmental impacts of heavy metal contamination include...",
          "Bioaccumulation occurs when...",
          "Desalination benefits society by... but has environmental costs including...",
          "Economically, the Sundrop Farms approach...",
          "The social impact is unequal because...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one impact.",
            keywords: [
              "toxic",
              "mercury",
              "pollution",
              "water",
              "desalination",
              "contamination",
              "environment",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two categories of impact with brief explanations.",
            keywords: [
              "bioaccumulation",
              "food chain",
              "brine",
              "salinity",
              "economic",
              "solar",
              "co2",
              "clean water",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Environmental, social and economic impacts; Minamata disease or brine discharge named.",
            keywords: [
              "minamata",
              "bioaccumulation",
              "brine",
              "salinity",
              "ecosystem",
              "social",
              "access",
              "water stress",
              "expensive",
              "150 million",
              "critic",
            ],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor:
              "Systemic analysis; Saudi Arabia / RO scale; 76 million tonnes CO₂; unequal distribution of costs and benefits.",
            keywords: [
              "reverse osmosis",
              "saudi arabia",
              "76 million",
              "co2",
              "coastal",
              "marine",
              "unequal",
              "distribution",
              "systemic",
              "brine discharge",
              "unsolved",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "judgement-d",
      name: "Making a judgement",
      descriptor:
        "Weigh the benefits and costs of solar desalination technology and form an evidence-based position.",
      guided: [
        {
          level: 2,
          body: "'Solar desalination is good because it makes clean water and uses solar power, but it is expensive.' — A simple opinion without evidence or nuance.",
        },
        {
          level: 4,
          body: "'Sundrop Farms uses solar power to desalinate seawater, which is positive because it avoids fossil fuels and provides clean water for growing crops. However, it costs $150 million and produces only tomatoes — a luxury crop — rather than addressing global water poverty. On balance, it demonstrates useful technology but has limited immediate benefit for water-stressed populations.'",
        },
        {
          level: 6,
          body: "A balanced judgement: 'The benefits — solar-powered water supply, CO₂-free operation, demonstrating proof-of-concept for desert agriculture — are real. The costs — $150 million capital cost, brine discharge, and growing a premium crop (tomatoes) rather than staple food — limit the global impact. Stakeholders view this differently: an Australian investor values the commercial returns; an environmental scientist questions brine disposal; a farmer in a water-stressed developing nation cannot afford this technology. On balance, the technology is promising but not yet equitable.'",
        },
        {
          level: 8,
          body: "A nuanced judgement distinguishes short-term vs long-term: in the short term, solar desalination is expensive and limited to wealthy regions. Long-term, as solar panel costs fall and fresh water scarcity grows (climate change), solar-powered RO could become cost-competitive. The New Scientist critic argues it is inefficient for Australia (where other water sources exist) but this misses the point that the technology needs to be demonstrated in a commercial setting before it can be deployed where it is most needed. Alternatives: genetic modification of crops to tolerate salt water, fog collection in coastal deserts, and precision irrigation require far less capital. A calibrated judgement: solar desalination is a net positive for R&D and proof-of-concept, but current deployment should prioritise regions facing genuine water crisis over profitable crops in middle-income countries.",
        },
      ],
      response: {
        kind: "reflection",
        prompt:
          "Is solar desalination — as demonstrated by Sundrop Farms — a net positive or net negative for humanity and the environment? Construct a reasoned, evidence-based judgement that weighs the trade-offs.",
        scaffolds: [
          "Evidence in favour of solar desalination includes...",
          "Evidence against includes...",
          "A key trade-off is...",
          "Different stakeholders view this differently — for example, a farmer in a water-stressed region would say... whereas an environmental scientist might argue...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Simple opinion without evidence.",
            keywords: ["good", "bad", "positive", "negative", "solar", "desalination"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One argument from each side with evidence.",
            keywords: [
              "solar",
              "co2",
              "expensive",
              "150 million",
              "water",
              "brine",
              "tomatoes",
              "on balance",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor: "Multiple perspectives; trade-offs identified; stakeholders named.",
            keywords: [
              "stakeholder",
              "investor",
              "environmental",
              "developing",
              "trade-off",
              "brine",
              "equitable",
              "expensive",
              "proof-of-concept",
              "water-stressed",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Short vs long-term; alternatives considered; R&D value vs deployment equity; calibrated conclusion with caveats.",
            keywords: [
              "long-term",
              "short-term",
              "r&d",
              "genetic modification",
              "precision irrigation",
              "fog collection",
              "cost-competitive",
              "climate change",
              "calibrated",
              "caveats",
              "equity",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "communicate-d",
      name: "Communicating the science",
      descriptor:
        "Explain how 'like dissolves like' and the mole concept connect to real-world problems, using accessible language for a non-specialist.",
      guided: [
        {
          level: 2,
          body: "Restating the definition without making it accessible: 'Polar solvents dissolve polar solutes and the mole is defined as 6.02 × 10²³ particles.' This uses jargon that a non-chemist would not understand.",
        },
        {
          level: 4,
          body: "An analogy for 'like dissolves like': 'Imagine people at a party — extroverts (polar) mingle with other extroverts (polar solvents dissolve polar solutes), and introverts (non-polar) stick to other introverts. Oil and water don't mix because oil molecules are 'introverts' and water molecules are 'extroverts'.' Good start — but doesn't link to why this matters for real problems.",
        },
        {
          level: 6,
          body: "Linked analogy: 'Like dissolves like — water is polar, so it dissolves salt (an ionic, polar compound), but not oil (non-polar). This is why we can remove salt from seawater by evaporation (distillation) but cannot simply 'wash out' an oil spill with water. The mole is a chemist's dozen: just as a baker counts eggs in dozens (12), chemists count atoms in moles (6.02 × 10²³). This lets us figure out exactly how much chemical to add to a water treatment plant — too little and the water is unsafe, too much wastes resources.'",
        },
        {
          level: 8,
          body: "Excellent communication connects two concepts with two everyday analogies, explains why both matter globally, addresses a likely misconception, and avoids jargon. For 'like dissolves like': the oil-spill analogy explains why oil floats on seawater and why polar detergents (surfactants) are used to disperse spills — they have a polar head (attracted to water) and non-polar tail (attracted to oil), breaking the 'like-likes-like' rule. For the mole: the 'baker's dozen' analogy extended — 'a mole of water molecules fits in 18 cm³ (about a tablespoon), yet contains more molecules than there are stars in the observable universe.' Misconception: 'A mole isn't just a big number — it's the specific number that connects the atomic scale (grams of atoms) to the human scale (spoonfuls of liquid). Without it, we could not design any industrial chemical process.'",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s4-d",
            prompt:
              "Oil has spilled into the ocean. A student says 'just add lots of water to wash it away.' Why is this incorrect, based on the principle 'like dissolves like'?",
            options: [
              {
                id: "a",
                text: "Water is too cold to dissolve oil",
              },
              {
                id: "b",
                text: "Oil is non-polar and water is polar — non-polar substances do not dissolve in polar solvents",
                correct: true,
              },
              {
                id: "c",
                text: "Oil is a solid and filtration would be needed",
              },
              {
                id: "d",
                text: "Water reacts chemically with oil to form a new compound",
              },
            ],
            explanation:
              "'Like dissolves like' — water is polar, so it dissolves polar/ionic compounds (like NaCl) but NOT non-polar compounds (like oil). Adding water to an oil spill does not dissolve the oil; it simply spreads it. Surfactant detergents work because they have both a polar head (water-soluble) and a non-polar tail (oil-soluble), bridging the two phases.",
          },
        ],
        prompt:
          "Explain 'like dissolves like' and the mole concept to a Year 9 student who has never studied chemistry. Use at least one everyday analogy for each concept and connect them to a real global problem.",
        scaffolds: [
          "Imagine you are at a party where people behave like molecules...",
          "This is why oil and water don't mix — and why an oil spill cannot be washed away with water...",
          "A mole is like a chemist's dozen — instead of 12 eggs, a mole is...",
          "This matters globally because... (e.g. water treatment, desalination, oil spills)...",
          "A common misconception is... Actually...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Restates definition using jargon.",
            keywords: ["polar", "non-polar", "mole", "6.02", "dissolves", "solute"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Gives an analogy but doesn't link to a real problem.",
            keywords: ["analogy", "party", "dozen", "oil", "water", "extrovert", "introvert"],
            minKeywords: 1,
          },
          {
            level: 6,
            descriptor: "Both analogies linked to a real global problem; jargon explained.",
            keywords: [
              "analogy",
              "oil spill",
              "desalination",
              "water treatment",
              "tablespoon",
              "dozen",
              "18 cm",
              "explains",
              "global",
              "non-polar",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Two linked analogies; misconception addressed; detergent/surfactant explained; industrial relevance.",
            keywords: [
              "analogy",
              "misconception",
              "surfactant",
              "detergent",
              "polar head",
              "non-polar tail",
              "observable universe",
              "industrial",
              "atomic scale",
              "human scale",
              "clear",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
