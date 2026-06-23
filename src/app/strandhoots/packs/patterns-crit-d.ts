import type { StrandhootPack } from "../engine/types"

export const patternsCritD: StrandhootPack = {
  slug: "patterns-crit-d",
  title: "Chemistry, Patterns & Society",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Applications of periodic trends — halogens, acid rain & snowflake science",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry:
    "Chemists look for patterns in the periodic table in order to discover relationships and trends that help them to predict physical and chemical properties.",
  estMinutes: 28,
  intro:
    "The patterns of the periodic table reach far beyond the laboratory. This pack explores four real-world threads from Chapter 11: the use of halogens in water treatment and photography, the environmental impact of acid rain from non-metal oxides, the judgement about whether patterns-based chemistry is responsible science, and communicating periodic trends to a non-specialist audience.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Science Voice", icon: "📢", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Patterns in society", blurb: "Halogens, acid rain, and the responsibilities of pattern-based chemistry", icon: "🌿" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain real-world applications of halogen chemistry and periodic trends.",
      guided: [
        {
          level: 2,
          body: "Halogens (group 17) have important applications based on their reactivity. Chlorine is used to disinfect drinking water and swimming pools. Iodine is used as an antiseptic. Fluorine compounds are used in toothpaste (fluoride ions strengthen tooth enamel).",
        },
        {
          level: 4,
          body: "Chlorine reacts with water to form hypochlorous acid (HOCl), which kills bacteria: Cl₂(aq) + H₂O(l) → HOCl(aq) + HCl(aq). Silver halide salts are used in traditional photography because they are sensitive to light — a direct application of halide chemistry (Ag⁺(aq) + X⁻(aq) → AgX(s)). Bromine compounds (methyl bromide) were used as agricultural fumigants before being banned for destroying the ozone layer.",
        },
        {
          level: 6,
          body: "The periodic trend in halogen reactivity (F > Cl > Br > I) determines their applications. More reactive halogens (Cl) are used in water treatment where rapid disinfection is needed. Less reactive halogens (I) are preferred in antiseptics because they are gentler on human tissue. Dobereiner's triads (1829) — groups of three similar elements where the middle one had properties intermediate between the other two — were an early application of periodic patterns to predict properties before Mendeleev's table.",
        },
        {
          level: 8,
          body: "Quantified applications: global chlorine production exceeds 60 million tonnes per year — used in PVC (plastic pipes and windows), pharmaceuticals (over 50% of medicines contain a C–Cl bond), and water treatment. The displacement reaction trend F > Cl > Br > I is directly applied in halide testing: adding AgNO₃ solution to an unknown halide gives a white precipitate (Cl⁻), cream precipitate (Br⁻) or yellow precipitate (I⁻) — solubility reflects the lattice energy trend down the group. These solubility differences allow forensic identification of halide salts without elemental analysis.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which halogen is most commonly used to disinfect drinking water?",
            options: [
              { id: "a", text: "Fluorine (F₂)" },
              { id: "b", text: "Chlorine (Cl₂)", correct: true },
              { id: "c", text: "Bromine (Br₂)" },
              { id: "d", text: "Iodine (I₂)" },
            ],
            explanation: "Chlorine is used to disinfect drinking water and swimming pools. It reacts with water to form hypochlorous acid (HOCl), which kills bacteria. Fluorine is too reactive and dangerous; bromine and iodine are less effective at typical doses.",
          },
          {
            id: "s2",
            prompt: "When silver nitrate (AgNO₃) solution is added to three unknown halide solutions, the precipitates formed are: white, cream, yellow. What is the correct identity of the three halide ions?",
            options: [
              { id: "a", text: "Cl⁻ (white), Br⁻ (cream), I⁻ (yellow)", correct: true },
              { id: "b", text: "F⁻ (white), Cl⁻ (cream), Br⁻ (yellow)" },
              { id: "c", text: "I⁻ (white), Br⁻ (cream), Cl⁻ (yellow)" },
              { id: "d", text: "Br⁻ (white), Cl⁻ (cream), I⁻ (yellow)" },
            ],
            explanation: "AgCl is white, AgBr is cream/pale yellow, AgI is yellow. This solubility trend down group 17 reflects increasing lattice energy — a direct application of periodic trends.",
          },
        ],
        prompt: "Describe at least three real-world applications of halogen chemistry or periodic table patterns. Explain how the periodic trend in reactivity or properties determines where each halogen is best used.",
        scaffolds: [
          "Chlorine is used for...",
          "Iodine is used for...",
          "The reactivity trend (F > Cl > Br > I) determines these uses because...",
          "Silver halide salts are used in... because...",
          "Dobereiner's triads were an early application of periodic patterns to...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one halogen application.", keywords: ["chlorine", "water", "disinfect", "iodine", "antiseptic", "fluoride", "toothpaste", "halogen"], minKeywords: 1 },
          { level: 4, descriptor: "Two applications with brief explanations.", keywords: ["chlorine", "disinfect", "iodine", "antiseptic", "silver", "photography", "hocl", "bacteria", "agcl"], minKeywords: 2 },
          { level: 6, descriptor: "Three applications; reactivity trend linked to suitability.", keywords: ["f > cl > br > i", "reactivity", "water treatment", "gentle", "tissue", "dobereiner", "triads", "prediction", "trend", "displacement"], minKeywords: 3 },
          { level: 8, descriptor: "Quantified; pharmaceutical and forensic applications; lattice energy trend noted.", keywords: ["60 million", "pvc", "pharmaceutical", "c-cl bond", "agno3", "white", "cream", "yellow", "lattice energy", "forensic", "identify", "solubility"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the environmental, health and social impacts of non-metal oxide pollution and acid rain.",
      guided: [
        {
          level: 2,
          body: "Burning fossil fuels releases sulfur dioxide (SO₂) into the atmosphere. SO₂ dissolves in rainwater to form acid rain. Acid rain can damage buildings, forests and aquatic ecosystems.",
        },
        {
          level: 4,
          body: "Non-metal oxides are acidic (period 3 pattern). SO₂(g) + H₂O(l) → H₂SO₃(aq) and SO₃(g) + H₂O(l) → H₂SO₄(aq). NO₂ also contributes: 3NO₂(g) + H₂O(l) → 2HNO₃(aq) + NO(g). Normal rainwater has pH ≈ 5.6 (weak carbonic acid). Acid rain typically has pH 4–5 or lower. Environmental impacts: aquatic life is killed below pH 5; limestone buildings dissolve; soil nutrients are leached.",
        },
        {
          level: 6,
          body: "Multilevel impacts: Environmental — forests in Germany and Scandinavia suffered extensive 'Waldsterben' (forest death) in the 1970s–80s from acid rain originating largely from UK and German coal-burning power stations. Aquatic — freshwater lakes in Norway dropped below pH 5, killing fish populations. Economic — limestone and marble heritage buildings erode: the Parthenon in Athens and Westminster Abbey have required restoration costing millions. Social — the Clean Air Act (UK, 1956; US, 1970) were legislated responses; EU Gothenburg Protocol (1999) set emission ceilings for SO₂ and NOₓ.",
        },
        {
          level: 8,
          body: "Systemic analysis: acid rain is a transboundary pollutant — emissions in one country cause damage in another, creating geopolitical tensions (UK–Scandinavia in the 1970s). The chemical mechanism links directly to the period 3 oxide acid–base pattern: sulfur (group 16, non-metal) forms acidic SO₃; nitrogen (group 15, non-metal) forms acidic NO₂. Both are acid anhydrides. Quantified: at pH 4.5, Al³⁺ ions are leached from soil — toxic to roots and to fish gill membranes. Global SO₂ emissions peaked in the 1970s at ~150 Tg yr⁻¹ and have declined with desulfurisation technology and the shift to gas and renewables — but Asian industrial growth is reversing the trend.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which pair of gases is primarily responsible for acid rain?",
            options: [
              { id: "a", text: "CO₂ and CH₄" },
              { id: "b", text: "SO₂ and NO₂", correct: true },
              { id: "c", text: "O₃ and Cl₂" },
              { id: "d", text: "H₂S and HCl" },
            ],
            explanation: "Sulfur dioxide (SO₂) from burning sulfur-rich fossil fuels and nitrogen dioxide (NO₂) from high-temperature combustion dissolve in rainwater to form sulfurous/sulfuric acid and nitric acid, causing acid rain.",
          },
        ],
        prompt: "Evaluate the environmental, health, social and economic impacts of acid rain. Link the chemistry to the period 3 oxide acid–base pattern studied in Chapter 11.",
        scaffolds: [
          "Burning sulfur-rich fuels produces SO₂, which...",
          "This is an example of the period 3 acid–base pattern because...",
          "Environmental impacts include...",
          "Economic impacts include...",
          "Legislation such as the Clean Air Act responded to acid rain by...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one impact of acid rain.", keywords: ["environment", "pollution", "forest", "buildings", "aquatic", "lakes", "ph"], minKeywords: 1 },
          { level: 4, descriptor: "Two categories of impact with brief explanations.", keywords: ["forests", "limestone", "aquatic", "ph 5", "so2", "no2", "buildings", "dissolve", "fish"], minKeywords: 2 },
          { level: 6, descriptor: "Environmental, economic and social impacts; period 3 link made.", keywords: ["waldsterben", "norway", "fish", "limestone", "parthenon", "clean air act", "legislation", "period 3", "non-metal oxide", "acidic"], minKeywords: 4 },
          { level: 8, descriptor: "Transboundary; quantified; Al³⁺ mechanism; trend reversal noted.", keywords: ["transboundary", "uk-scandinavia", "al3+", "toxic", "150 tg", "desulfurisation", "asia", "gothenburg", "peak", "systemic", "acid anhydride"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the benefits and risks of using the periodic table to predict properties — especially for new elements.",
      guided: [
        {
          level: 2,
          body: "'Using the periodic table to predict properties is useful because scientists can find patterns.' — A simple opinion without evidence or nuance.",
        },
        {
          level: 4,
          body: "'The periodic table is useful because Mendeleev used it to predict elements before they were discovered — gallium and germanium matched his predictions exactly. However, anomalies like copper (irregular electron configuration) and the f-block elements show that the patterns have limits.' Uses evidence from both sides.",
        },
        {
          level: 6,
          body: "A balanced judgement: 'Pattern-based prediction has been transformative — from Mendeleev's predictions to Dobereiner's triads to modern drug design using functional group patterns. The benefits are enormous: understanding which elements will be reactive, acidic, or electrically conductive without synthesising every compound. The risks: over-reliance on patterns can obscure anomalies (Cu, Cr electron configurations) and mislead drug design when a slightly different structural pattern produces an unsafe molecule. Scientists must test predictions experimentally, not simply trust the pattern.' ",
        },
        {
          level: 8,
          body: "A nuanced judgement: considers the history of the periodic table as a tool for prediction, with Mendeleev's 1869 predictions (eka-aluminium/gallium, eka-silicon/germanium) quantitatively validated. Weighs the value of predictive models against their failure modes (transition metal anomalies; lanthanide/actinide chemistry not well-predicted by simple models). Addresses who benefits from pattern-based drug discovery (wealthy nations who can afford synthesis and testing of predicted drug analogues) versus who bears the costs (regions where untested compounds have caused harm, e.g., thalidomide — a case where the 'pattern' of chirality was missed). Arrives at a calibrated conclusion: patterns are essential tools, but not substitutes for experiment, and must be used with rigorous uncertainty analysis.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Mendeleev used patterns in the early periodic table to predict the existence of gallium (which he called 'eka-aluminium') before it was discovered. What does this show about the power of periodic patterns?",
            options: [
              { id: "a", text: "That all properties of undiscovered elements can be calculated exactly" },
              { id: "b", text: "That periodic patterns can be used to make successful, testable predictions about unknown elements", correct: true },
              { id: "c", text: "That the periodic table was already complete in 1869" },
              { id: "d", text: "That patterns are only useful for group 13 elements" },
            ],
            explanation: "Mendeleev's prediction of 'eka-aluminium' with specific properties (atomic mass ≈68, density ≈5.9 g cm⁻³) was confirmed when gallium was discovered in 1875 with almost identical properties — a powerful demonstration of pattern-based prediction.",
          },
        ],
        prompt: "Is using patterns in the periodic table a reliable way to make predictions in chemistry? Construct a reasoned judgement that acknowledges both the power and the limits of pattern-based reasoning.",
        scaffolds: [
          "Evidence supporting pattern-based prediction includes...",
          "Evidence that patterns have limits includes...",
          "A key trade-off is...",
          "A chemist using patterns to design a new drug would need to be cautious because...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion — patterns are useful or not.", keywords: ["useful", "predict", "pattern", "periodic table", "elements", "properties"], minKeywords: 1 },
          { level: 4, descriptor: "One argument each side with evidence.", keywords: ["mendeleev", "gallium", "germanium", "anomalies", "copper", "limits", "evidence", "however", "on balance"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; anomalies and drug design discussed.", keywords: ["dobereiner", "triads", "drug design", "anomaly", "copper", "chromium", "functional group", "test experimentally", "limits", "pattern"], minKeywords: 3 },
          { level: 8, descriptor: "Thalidomide or chirality noted; quantified predictions; uncertainty discussed.", keywords: ["thalidomide", "chirality", "1869", "eka-aluminium", "quantitative", "calibrated", "uncertainty", "who benefits", "wealthy", "untested", "rigorous"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain the periodic table's group and period trends to a non-specialist using accessible analogies.",
      guided: [
        {
          level: 2,
          body: "Restating the definition with jargon doesn't communicate to a non-specialist: 'The first ionisation energy decreases down a group because shielding increases and effective nuclear charge on the valence electrons decreases.'",
        },
        {
          level: 4,
          body: "An analogy helps: 'Think of the nucleus as a magnet and the outer electrons as small iron filings. The closer the filings are to the magnet, the harder they are to pull away. Going down a group, extra shells of electrons block the magnet — the outer electrons feel less pull and are easier to remove.' This is a reasonable analogy but doesn't yet link to real-world consequences.",
        },
        {
          level: 6,
          body: "A clear analogy linked to a real application: 'Imagine the nucleus as a campfire and the electrons as people sitting in rows around it. People in the front row (inner shells) feel all the heat. People in the back row (valence electrons) feel little warmth because those in front shield the fire. Going down group 1 — adding another row of people — means each new outer row feels the fire even less, so they leave (ionise) more easily. This is why caesium metal is far more reactive with water than lithium: its outer electron is barely held at all.'",
        },
        {
          level: 8,
          body: "Excellent communication uses two linked analogies (one for groups/shielding, one for periods/effective nuclear charge), explicitly connects each to a real consequence (alkali metal reactivity; halogen water treatment), avoids jargon (explains 'ionisation energy' as 'how firmly the nucleus grips its outer electron', 'shielding' as 'inner electrons blocking the grip'), addresses a likely misconception ('going down a group doesn't mean the nucleus is weaker — it has more protons; the outer electron is shielded more, so the grip through all those layers is weaker'), and explains why this matters ('understanding the grip on electrons lets chemists predict which metals corrode, which halogens disinfect water most effectively, and why fluoride protects teeth').",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "A friend says: 'Potassium reacts more violently with water than lithium because potassium has more protons, so its nucleus is stronger.' What is wrong with this reasoning?",
            options: [
              { id: "a", text: "Nothing is wrong — more protons always means more reactivity" },
              { id: "b", text: "Potassium has more protons, but its outer electron is more shielded by inner shells, so the effective pull on it is weaker — making it easier to remove and thus more reactive", correct: true },
              { id: "c", text: "Potassium has fewer protons than lithium" },
              { id: "d", text: "Reactivity decreases down group 1" },
            ],
            explanation: "More protons increase the nucleus's positive charge, but additional inner shells also increase shielding. The net effect down group 1 is a decrease in effective nuclear charge on the valence electron — it is held less tightly, and reactivity increases.",
          },
        ],
        prompt: "Explain the periodic trend in group 1 reactivity (or group 17 reactivity) to a Year 9 student who has never heard of ionisation energy. Use at least one everyday analogy and connect it to a real-world application.",
        scaffolds: [
          "Think of the nucleus as...",
          "The inner electron shells act like...",
          "Going down the group, the outer electron...",
          "This is why in real life...",
          "A common misconception is... but actually...",
        ],
        rubric: [
          { level: 2, descriptor: "Restates definition with some jargon.", keywords: ["nucleus", "electron", "shielding", "group", "ionisation", "holds", "removes"], minKeywords: 1 },
          { level: 4, descriptor: "Analogy used; no direct chemistry link.", keywords: ["magnet", "campfire", "blocks", "rows", "front", "back", "analogy", "shielded"], minKeywords: 1 },
          { level: 6, descriptor: "Analogy linked to real application; shielding explained.", keywords: ["analogy", "caesium", "lithium", "water", "reactive", "shielding", "grip", "inner shells", "campfire", "application"], minKeywords: 3 },
          { level: 8, descriptor: "Two analogies; jargon translated; misconception addressed; real-world relevance.", keywords: ["two", "analogy", "misconception", "more protons", "shielded", "fluoride", "teeth", "halogen", "water treatment", "corrode", "explains why", "jargon"], minKeywords: 3 },
        ],
      },
    },
  ],
}
