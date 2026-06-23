import type { StrandhootPack } from "../engine/types"

export const patternsCritA: StrandhootPack = {
  slug: "patterns-crit-a",
  title: "Periodic Patterns — Knowledge",
  subject: "MYP Chemistry",
  criterion: "A",
  topic: "Periodic trends — groups, periods, atomic structure, acids & bases",
  accent: "#1b7888",
  icon: "⚛️",
  statementOfInquiry:
    "Chemists look for patterns in the periodic table in order to discover relationships and trends that help them to predict physical and chemical properties.",
  estMinutes: 28,
  intro:
    "Unlock the logic of the periodic table — from electron configurations and valence electrons to ionization energy trends and the acid–base pattern across a period. Each strand targets a core concept from Chapter 11: Patterns, levelling up from recall to analysis.",
  badges: [
    { id: "electron-config", label: "Configuration Expert", icon: "🧬", description: "Reach Level 8 on Electronic configuration", strandId: "electron-config", atLevel: 8 },
    { id: "ionisation", label: "Ionisation Insight", icon: "⚡", description: "Reach Level 8 on First ionisation energy trends", strandId: "ionisation", atLevel: 8 },
    { id: "group-trends", label: "Group Guru", icon: "🔢", description: "Reach Level 8 on Periodic trends in groups", strandId: "group-trends", atLevel: 8 },
    { id: "acid-base", label: "Oxide Oracle", icon: "🧪", description: "Reach Level 8 on Acid and base characteristics of oxides", strandId: "acid-base", atLevel: 8 },
    { id: "master", label: "Patterns Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Chapter 11: Patterns", blurb: "Electron configuration, ionisation energy, periodic trends and oxide chemistry", icon: "⚛️" }],
  strands: [
    {
      id: "electron-config",
      name: "Electronic configuration & valency",
      descriptor: "Write full electronic configurations using s, p, d notation and identify valence electrons.",
      guided: [
        {
          level: 2,
          body: "Electrons fill energy levels (orbitals) starting from the lowest. The main types of orbital are s, p, d and f. The number of valence electrons equals the group number for main-group elements: sodium (group 1) has 1 valence electron.",
        },
        {
          level: 4,
          body: "Electrons fill sublevels in order of increasing energy: 1s → 2s → 2p → 3s → 3p → 4s → 3d. Each s orbital holds 2 electrons, each p sublevel holds 6, each d sublevel holds 10. Fluorine (Z = 9) gives 1s²2s²2p⁵. Calcium (Z = 20) gives 1s²2s²2p⁶3s²3p⁶4s² — note 4s fills before 3d.",
        },
        {
          level: 6,
          body: "Check the configuration by summing superscripts. For chlorine (Z = 17): 1s²2s²2p⁶3s²3p⁵ (2+2+6+2+5 = 17 ✓). To form Cl⁻, one electron is added to complete the 3p sublevel: 1s²2s²2p⁶3s²3p⁶ — a noble-gas configuration. The periodic table is divided into four blocks based on which sublevel is being filled: the s block (groups 1–2), p block (groups 13–18), d block (groups 3–12) and f block.",
        },
        {
          level: 8,
          body: "Copper (Z = 29) should give 1s²2s²2p⁶3s²3p⁶4s²3d⁹ but the actual configuration is 1s²2s²2p⁶3s²3p⁶4s¹3d¹⁰ — a half-filled 4s and fully filled 3d — because a completely full d sublevel is especially stable. This 'anomalous' configuration explains why copper can form both Cu⁺ (losing the 4s¹ electron) and Cu²⁺ (losing 4s¹ and one 3d electron). The configuration encodes both the position on the periodic table and the ion charges an element can form.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "ec-l2",
            level: 2,
            prompt: "How many valence electrons does a sodium atom (group 1) have?",
            options: [
              { id: "a", text: "11" },
              { id: "b", text: "3" },
              { id: "c", text: "1", correct: true },
              { id: "d", text: "2" },
            ],
            explanation: "Sodium is in group 1, so it has 1 valence electron in its outermost shell (3s¹). The group number equals the number of valence electrons for main-group elements.",
          },
          {
            type: "fill",
            id: "ec-l4",
            level: 4,
            prompt: "The full electronic configuration of fluorine (Z = 9) is 1s²2s²▁.",
            answers: ["2p5", "2p⁵"],
            explanation: "Fluorine has 9 electrons: 2 in 1s, 2 in 2s, and 5 in 2p → 1s²2s²2p⁵. Summing the superscripts: 2+2+5 = 9 ✓.",
          },
          {
            type: "short",
            id: "ec-l6",
            level: 6,
            prompt: "Write the full electronic configuration for chlorine (Z = 17) and for the chloride ion Cl⁻. Explain what happens to the electron arrangement when chlorine forms a Cl⁻ ion.",
            keywords: ["1s2", "2s2", "2p6", "3s2", "3p5", "3p6", "noble gas", "electron", "gains", "outermost", "17", "18"],
            minKeywords: 3,
            sample: "Chlorine (Z = 17): 1s²2s²2p⁶3s²3p⁵. When chlorine gains one electron to form Cl⁻, the extra electron fills the 3p sublevel: Cl⁻ = 1s²2s²2p⁶3s²3p⁶ — the same noble-gas configuration as argon. The outermost shell is now complete with 8 electrons.",
          },
          {
            type: "short",
            id: "ec-l8",
            level: 8,
            prompt: "The expected configuration of copper (Z = 29) is 1s²2s²2p⁶3s²3p⁶4s²3d⁹, but the actual configuration is 1s²2s²2p⁶3s²3p⁶4s¹3d¹⁰. Explain why, and how this relates to the two ionic charges copper can form.",
            keywords: ["stable", "full", "3d10", "4s1", "cu+", "cu2+", "anomalous", "completely filled", "energy", "loses"],
            minKeywords: 3,
            sample: "A completely filled 3d subshell (3d¹⁰) is extra stable, so copper 'borrows' one electron from 4s to complete 3d — giving [Ar] 4s¹3d¹⁰ instead of 4s²3d⁹. Cu⁺ forms by losing the single 4s¹ electron, leaving the stable 3d¹⁰ intact. Cu²⁺ forms by losing 4s¹ and one 3d electron, giving a 3d⁹ configuration. The anomalous configuration directly explains the two possible ionic charges.",
          },
        ],
      },
    },
    {
      id: "ionisation",
      name: "First ionisation energy trends",
      descriptor: "Explain and predict trends in first ionisation energy across a period and down a group.",
      guided: [
        {
          level: 2,
          body: "First ionisation energy (IE₁) is the minimum energy needed to remove one electron from a neutral gaseous atom: X(g) → X⁺(g) + e⁻. A higher IE₁ means the electron is harder to remove. Metals tend to have low IE₁; non-metals tend to have high IE₁.",
        },
        {
          level: 4,
          body: "Down a group (e.g. group 1: Li → Na → K → Rb): IE₁ decreases. Each successive element has an extra filled inner shell — this shielding reduces the effective nuclear charge felt by the valence electron, so it is held less tightly. Across a period (e.g. period 3: Na → Mg → Al → … → Cl → Ar): IE₁ generally increases. The shielding is roughly constant, but the nuclear charge increases, pulling valence electrons closer.",
        },
        {
          level: 6,
          body: "Period 3 data (kJ mol⁻¹): Na 496, Mg 738, Al 578, Si 786, P 1012, S 1000, Cl 1251, Ar 1520. The general increase is interrupted twice: Al (578) is lower than Mg (738) because Al's 3p electron is easier to remove than Mg's 3s²; S (1000) is slightly lower than P (1012) because in S the paired electron in one 3p orbital is repelled and easier to remove. These dips are explained by subshell structure.",
        },
        {
          level: 8,
          body: "Fluorine has the highest effective nuclear charge in group 17 — with only two inner electrons shielding nine protons, the valence electrons are pulled very strongly. However, F has a lower electron affinity than Cl: the small atomic radius of F means incoming electrons experience significant electron-electron repulsion in the cramped 2p orbitals. Comparing IE₁ values for the first 20 elements reveals the four blocks: the s block (groups 1–2) has generally lower IE₁ than the p block (groups 13–18), reflecting the greater penetration of s orbitals toward the nucleus.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "ie-l2",
            level: 2,
            prompt: "What does 'first ionisation energy' measure?",
            options: [
              { id: "a", text: "The energy released when an atom gains an electron" },
              { id: "b", text: "The minimum energy to remove one electron from a neutral gaseous atom", correct: true },
              { id: "c", text: "The total energy of all electrons in an atom" },
              { id: "d", text: "The energy needed to melt a metal" },
            ],
            explanation: "First ionisation energy (IE₁) = minimum energy to remove the outermost electron from X(g) to form X⁺(g) + e⁻. It measures how tightly the nucleus holds its outermost electron.",
          },
          {
            type: "fill",
            id: "ie-l4",
            level: 4,
            prompt: "Down a group in the periodic table, the first ionisation energy ▁ because shielding by inner electron shells increases.",
            answers: ["decreases", "decreases (gets lower)", "gets lower"],
            explanation: "Going down a group adds complete inner shells. These shield the valence electron from the nucleus, reducing its effective nuclear charge and making it easier to remove — so IE₁ decreases.",
          },
          {
            type: "short",
            id: "ie-l6",
            level: 6,
            prompt: "Period 3 ionisation energies show two unexpected dips: Al (578 kJ mol⁻¹) is lower than Mg (738), and S (1000 kJ mol⁻¹) is lower than P (1012). Explain each dip in terms of electron subshell structure.",
            keywords: ["3p", "3s", "subshell", "paired", "repulsion", "easier", "aluminium", "sulfur", "p orbital", "2p", "shielding", "general trend"],
            minKeywords: 3,
            sample: "Al dip: Mg has a full 3s² sublevel; Al has one 3p¹ electron in a higher-energy orbital that is easier to remove than 3s², so Al's IE₁ is lower than Mg's. S dip: in P (3p³), each 3p electron is in a separate orbital. In S (3p⁴), one orbital has a paired electron — the electron–electron repulsion makes it easier to remove, giving S a slightly lower IE₁ than P.",
          },
          {
            type: "short",
            id: "ie-l8",
            level: 8,
            prompt: "First ionisation energies of the first 20 elements (kJ mol⁻¹): H 1312, He 2372, Li 520, Be 900, B 801, C 1086, N 1402, O 1314, F 1681, Ne 2081. Identify and explain two features of this data that reflect the block structure of the periodic table.",
            keywords: ["s block", "p block", "noble gas", "helium", "neon", "maximum", "high", "shielding", "subshell", "full", "effective nuclear charge", "trend", "dip"],
            minKeywords: 3,
            sample: "Feature 1: Noble gases (He, Ne) have the highest IE₁ values — their completely filled subshells create a very high effective nuclear charge with no unpaired electrons. This marks the end of each period. Feature 2: The general increase from Li (520) to F (1681) reflects increasing nuclear charge across the period with roughly constant shielding — classic p-block trend. The dips at B and O (explained by subshell structure) mark the transition from filling the first to second 2p orbital.",
          },
        ],
      },
    },
    {
      id: "group-trends",
      name: "Periodic trends in groups",
      descriptor: "Describe and explain the physical and chemical property trends down groups 1 and 17.",
      guided: [
        {
          level: 2,
          body: "Elements in the same group have the same number of valence electrons. The alkali metals (group 1) all have one valence electron and react with water. The halogens (group 17) have seven valence electrons and react with metals to form salts. Properties change in a predictable pattern down each group.",
        },
        {
          level: 4,
          body: "Group 1 (alkali metals): going down from Li → Na → K → Rb, atomic radius increases, ionisation energy decreases, and reactivity with water increases — the outer electron is farther from the nucleus and more shielded, so it is lost more easily. Group 17 (halogens): going down from F → Cl → Br → I, atomic radius increases, reactivity decreases (it is harder to gain an extra electron), and the state at room temperature changes from gas (Cl₂) to liquid (Br₂) to solid (I₂).",
        },
        {
          level: 6,
          body: "Halogen displacement reactions show the reactivity trend. Chlorine water displaces bromide: Cl₂(aq) + 2KBr(aq) → 2KCl(aq) + Br₂(aq). Chlorine water also displaces iodide. Bromine water displaces iodide but not chloride. Iodine cannot displace chloride or bromide. This confirms that reactivity decreases F > Cl > Br > I. Reactions with iron also show the trend: Cl₂ → FeCl₃ (iron(III)); Br₂ → FeBr₃ (iron(III)); I₂ → FeI₂ (iron(II)) — iodine is less oxidising and can only form Fe²⁺.",
        },
        {
          level: 8,
          body: "The reactivity decrease down group 17 is caused by declining effective nuclear charge on the outermost shell: additional filled inner shells provide greater shielding, reducing the nucleus's ability to attract an incoming electron. The contrast between NaCl and its constituent elements is stark: sodium (highly reactive with water and air, stored under oil) and chlorine (toxic yellow-green gas) combine exothermically to form a stable ionic solid: 2Na(s) + Cl₂(g) → 2NaCl(s). Products can have radically different properties from their constituent elements — a key reason why systematic chemical classification requires more than just examining individual elements.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "gt-l2",
            level: 2,
            prompt: "Which statement about group 1 alkali metals is correct?",
            options: [
              { id: "a", text: "They all have 8 valence electrons" },
              { id: "b", text: "Their reactivity decreases going down the group" },
              { id: "c", text: "They all have 1 valence electron and form 1+ ions", correct: true },
              { id: "d", text: "They are all gases at room temperature" },
            ],
            explanation: "All group 1 metals have one valence electron, which they lose to form 1+ cations. Reactivity increases down the group as the valence electron becomes easier to remove.",
          },
          {
            type: "fill",
            id: "gt-l4",
            level: 4,
            prompt: "Going down group 17 (the halogens), reactivity ▁ because the effective nuclear charge on the outer shell decreases as shielding increases.",
            answers: ["decreases", "decreases (gets lower)", "gets lower"],
            explanation: "Going down group 17, each successive halogen has more filled inner shells. These inner electrons shield the nucleus, reducing the effective nuclear charge and making it harder to gain the extra electron needed for reaction.",
          },
          {
            type: "short",
            id: "gt-l6",
            level: 6,
            prompt: "Describe the displacement reactions between halogens and halide ions. Use specific examples (including chlorine, bromine and iodide) to show the reactivity order F > Cl > Br > I.",
            keywords: ["chlorine", "displaces", "bromide", "iodide", "bromine", "iodine", "cannot", "more reactive", "cl2", "br2", "i2", "kbr", "ki", "kcl"],
            minKeywords: 3,
            sample: "Chlorine water displaces bromide: Cl₂(aq) + 2KBr(aq) → 2KCl(aq) + Br₂(aq) — brown colour appears. Chlorine also displaces iodide. Bromine displaces iodide but not chloride — it is less reactive than Cl but more reactive than I. Iodine displaces neither chloride nor bromide. This gives the reactivity order Cl > Br > I, consistent with F > Cl > Br > I overall.",
          },
          {
            type: "short",
            id: "gt-l8",
            level: 8,
            prompt: "Sodium is stored under oil and chlorine is a toxic gas, yet the product sodium chloride is a safe, stable solid. Explain this contrast using the concept of effective nuclear charge, and write the balanced equation for the reaction.",
            keywords: ["effective nuclear charge", "ionic", "2nacl", "2na", "cl2", "exothermic", "stable", "properties", "different", "shielding", "contrast"],
            minKeywords: 3,
            sample: "2Na(s) + Cl₂(g) → 2NaCl(s). Sodium has a very low effective nuclear charge on its outer electron (shielded by two complete inner shells), making it highly reactive. Chlorine has a very high effective nuclear charge, strongly attracting electrons. When they react, Na loses its outer electron and Cl gains one — forming a stable ionic lattice with very different properties from both elements. Compounds can be radically different from their constituent elements.",
          },
        ],
      },
    },
    {
      id: "acid-base",
      name: "Acid and base characteristics of oxides",
      descriptor: "Explain the pattern of acid–base properties of period 3 element oxides.",
      guided: [
        {
          level: 2,
          body: "Metal oxides are basic: they react with water to form alkaline (pH > 7) solutions. Non-metal oxides are acidic: they react with water to form acidic (pH < 7) solutions. Sodium oxide is basic; sulfur trioxide is acidic.",
        },
        {
          level: 4,
          body: "Period 3 acid–base pattern: Na₂O (pH > 7, basic) → MgO (basic) → Al₂O₃ (amphoteric — reacts with both acids and bases) → SiO₂ (weakly acidic) → P₂O₅ (acidic) → SO₃ (strongly acidic) → Cl₂O₇ (very strongly acidic). The pattern shifts from basic on the left (metals) to acidic on the right (non-metals), with aluminium oxide as the amphoteric transition point. Na₂O(s) + H₂O(l) → 2NaOH(aq); CaO(s) + H₂O(l) → Ca(OH)₂(aq).",
        },
        {
          level: 6,
          body: "Amphoteric substances react with both acids and bases. Aluminium oxide is amphoteric: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O (acts as a base), and Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O (acts as an acid). The Brønsted–Lowry definition: an acid donates protons (H⁺) and a base accepts protons. Water itself is amphoteric — it can donate H⁺ to form OH⁻ or accept H⁺ to form H₃O⁺.",
        },
        {
          level: 8,
          body: "The acid–base character of an oxide is determined by the oxidation state of the central element and the polarity of the E–O bond. In Na₂O, Na is strongly electropositive — the O²⁻ ion is a strong base that abstracts H⁺ from water to form OH⁻. In SO₃, the highly electronegative sulfur draws electrons from the S–O bond, making the O atom available to bond with water and release H⁺ as sulfuric acid. Acid rain (pH ≈ 4–5) results from combustion of sulfur-rich fuels releasing SO₂/SO₃, which dissolve in rainwater. This real-world impact directly follows from the period 3 oxide acid–base pattern.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "ab-l2",
            level: 2,
            prompt: "Which type of oxide reacts with water to form an alkaline solution?",
            options: [
              { id: "a", text: "Non-metal oxides" },
              { id: "b", text: "Metal oxides", correct: true },
              { id: "c", text: "Noble gas oxides" },
              { id: "d", text: "Transition metal oxides only" },
            ],
            explanation: "Metal oxides are basic — they react with water to give solutions with pH > 7. Non-metal oxides are acidic, forming solutions with pH < 7.",
          },
          {
            type: "fill",
            id: "ab-l4",
            level: 4,
            prompt: "Aluminium oxide is described as ▁ because it can react with both acids and bases.",
            answers: ["amphoteric"],
            explanation: "Amphoteric substances behave as both an acid and a base. Al₂O₃ reacts with HCl (acting as a base) and with NaOH (acting as an acid) — it sits at the transition point between metallic and non-metallic oxides in period 3.",
          },
          {
            type: "short",
            id: "ab-l6",
            level: 6,
            prompt: "Describe the pattern in acid–base properties of the oxides of period 3 elements from Na to Cl. Give specific examples and include the equation for the reaction of sodium oxide with water.",
            keywords: ["basic", "acidic", "amphoteric", "aluminium oxide", "sodium oxide", "naoh", "na2o", "h2o", "metal", "non-metal", "pattern", "left to right"],
            minKeywords: 3,
            sample: "Going left to right across period 3, oxide character changes from basic (Na₂O, MgO — metals) through amphoteric (Al₂O₃) to acidic (SiO₂, P₂O₅, SO₃ — non-metals). Na₂O(s) + H₂O(l) → 2NaOH(aq) — the product is alkaline. Al₂O₃ is amphoteric: it reacts with both HCl and NaOH. SO₃ dissolves to form sulfuric acid, an acidic solution.",
          },
          {
            type: "short",
            id: "ab-l8",
            level: 8,
            prompt: "Explain how the combustion of sulfur-rich fuels produces acid rain, linking the chemical reaction to the period 3 oxide acid–base pattern. Include the relevant equations.",
            keywords: ["so2", "so3", "sulfuric acid", "h2so4", "acidic", "non-metal oxide", "combustion", "ph", "rainwater", "acid rain", "period 3", "electronegativity"],
            minKeywords: 3,
            sample: "Combustion of sulfur-rich coal or oil: S(s) + O₂(g) → SO₂(g). SO₂ is further oxidised to SO₃. Both are non-metal oxides — consistent with the period 3 pattern of acidic oxides on the right side. SO₃(g) + H₂O(l) → H₂SO₄(aq) — sulfuric acid. This dissolves in rainwater, lowering pH to 4–5. The strongly electronegative S draws electron density from the S–O bond, making the O available to react with water and release H⁺, consistent with non-metal oxide acid character.",
          },
        ],
      },
    },
  ],
}
