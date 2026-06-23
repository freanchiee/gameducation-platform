import type { StrandhootPack } from "../engine/types"

export const energyCritA: StrandhootPack = {
  slug: "energy-crit-a",
  title: "Energy in Chemical Reactions",
  subject: "MYP Chemistry",
  criterion: "A",
  topic: "Exothermic & endothermic reactions, heat, states of matter",
  accent: "#1b7888",
  icon: "🔥",
  statementOfInquiry:
    "Scientific and technological advances can enable functional energy transformations within, and between, systems.",
  estMinutes: 27,
  intro:
    "Explore the energy changes that drive every chemical reaction — from the warmth of a hand-warmer to the explosive thermite reaction used to weld railway tracks. Each strand levels up from basic recall to careful analysis of bond energies, heat calculations, and state changes.",
  badges: [
    {
      id: "exo-endo",
      label: "Exo/Endo Expert",
      icon: "🌡️",
      description: "Reach Level 8 on Exothermic & endothermic reactions",
      strandId: "exoendo",
      atLevel: 8,
    },
    {
      id: "bond-energy",
      label: "Bond Breaker",
      icon: "⚡",
      description: "Reach Level 8 on Bond breaking & bond making",
      strandId: "bonds",
      atLevel: 8,
    },
    {
      id: "heat-calc",
      label: "Heat Calculator",
      icon: "🧮",
      description: "Reach Level 8 on Specific heat capacity",
      strandId: "shc",
      atLevel: 8,
    },
    {
      id: "states",
      label: "State Changer",
      icon: "🧊",
      description: "Reach Level 8 on States of matter & energy",
      strandId: "states",
      atLevel: 8,
    },
    {
      id: "master",
      label: "Energy Master",
      icon: "🏆",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Chapter 4: Energy",
      blurb: "Exothermic & endothermic reactions, heat capacity, states of matter",
      icon: "🔥",
    },
  ],
  strands: [
    {
      id: "exoendo",
      name: "Exothermic & endothermic reactions",
      descriptor: "Define, distinguish and give examples of exothermic and endothermic reactions.",
      guided: [
        {
          level: 2,
          body: "All chemical reactions involve an energy change. Reactions that release energy into the surroundings are exothermic — the surroundings get warmer. Reactions that absorb energy from the surroundings are endothermic — the surroundings get cooler.",
        },
        {
          level: 4,
          body: "Exothermic examples: combustion of fuels, neutralisation of acids by alkalis, respiration, thermite reaction (iron(III) oxide + aluminium). Endothermic examples: dissolving ammonium nitrate in water (used in cold packs), the reaction between barium hydroxide and ammonium chloride (temperature drops from 21°C to −23°C). The hot compress contains magnesium sulfate (exothermic when dissolved); the cold compress contains ammonium nitrate (endothermic).",
        },
        {
          level: 6,
          body: "In an exothermic reaction, the energy of the products is lower than the energy of the reactants — the difference is released as heat. In an endothermic reaction, the energy of the products is higher. The reaction profile (energy diagram) shows a peak called the activation energy — the energy needed to start breaking bonds. An exothermic reaction has a lower product energy level; an endothermic reaction has a higher product energy level.",
        },
        {
          level: 8,
          body: "The thermite reaction (Fe₂O₃(s) + 2Al(s) → Al₂O₃(s) + 2Fe(l)) is strongly exothermic — it generates enough heat to melt iron (melting point 1 540°C). It is used commercially since the 1930s to weld railway tracks. By contrast, dissolving ammonium nitrate is endothermic and used in instant cold packs — the system absorbs heat from the surroundings (your skin) without any combustion. Comparing these two reactions illustrates how the direction of energy flow determines practical applications.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "ee-l2",
            level: 2,
            prompt: "A student places her hand on the outside of a beaker in which a reaction is occurring and notices it feels cold. What type of reaction is taking place?",
            options: [
              { id: "a", text: "Exothermic — energy is being released" },
              { id: "b", text: "Endothermic — energy is being absorbed from the surroundings", correct: true },
              { id: "c", text: "Exothermic — energy is being absorbed" },
              { id: "d", text: "Endothermic — energy is being released" },
            ],
            explanation:
              "An endothermic reaction absorbs heat from the surroundings, making the container feel cold. An exothermic reaction releases heat, making the container feel warm.",
          },
          {
            type: "fill",
            id: "ee-l4",
            level: 4,
            prompt:
              "The instant cold compress used in sports medicine contains ammonium nitrate. When squeezed, it dissolves in water and the pack gets cold. This shows that dissolving ammonium nitrate is ▁.",
            answers: ["endothermic", "an endothermic reaction", "endothermic reaction"],
            explanation:
              "The pack gets cold because heat is absorbed from the surroundings — this is the definition of an endothermic process. By contrast, the hot compress contains magnesium sulfate, which dissolves exothermically.",
          },
          {
            type: "short",
            id: "ee-l6",
            level: 6,
            prompt:
              "Sketch and describe the energy profile for an exothermic reaction. Label the activation energy, energy of reactants, and energy of products. Explain what the diagram tells you about the overall energy change.",
            keywords: [
              "activation energy",
              "reactants",
              "products",
              "lower",
              "released",
              "peak",
              "exothermic",
              "heat",
              "diagram",
              "energy",
            ],
            minKeywords: 4,
            sample:
              "The energy profile starts at the energy level of the reactants, rises to a peak (activation energy — the energy needed to break bonds and start the reaction), then falls to the energy level of the products, which is lower than the reactants. The difference in height between reactants and products is the energy released as heat. Because the products have less energy than the reactants, the reaction is exothermic.",
          },
          {
            type: "short",
            id: "ee-l8",
            level: 8,
            prompt:
              "Compare the thermite reaction and the dissolving of ammonium nitrate in water. For each: state whether it is exothermic or endothermic, describe the observable evidence, and explain one practical application.",
            keywords: [
              "thermite",
              "exothermic",
              "iron",
              "aluminium",
              "weld",
              "railway",
              "ammonium nitrate",
              "endothermic",
              "cold",
              "absorbs",
              "sports",
              "application",
            ],
            minKeywords: 5,
            sample:
              "The thermite reaction (Fe₂O₃ + 2Al → Al₂O₃ + 2Fe) is strongly exothermic — it releases so much heat that iron forms as a liquid (melting point 1 540°C). This is used to weld railway tracks by melting iron to fill gaps. Dissolving ammonium nitrate in water is endothermic — heat is absorbed from the surroundings, causing a large temperature drop. This is used in instant cold packs in sports medicine to cool injuries without ice.",
          },
        ],
      },
    },
    {
      id: "bonds",
      name: "Bond breaking & bond making",
      descriptor: "Explain why reactions are exothermic or endothermic in terms of bond energies.",
      guided: [
        {
          level: 2,
          body: "Chemical reactions involve breaking bonds in the reactants and forming new bonds in the products. Breaking bonds requires energy from the surroundings (endothermic step). Forming bonds releases energy into the surroundings (exothermic step).",
        },
        {
          level: 4,
          body: "The balance between bond breaking and bond making determines whether the overall reaction is exothermic or endothermic. If more energy is released making new bonds than is absorbed breaking old bonds, the reaction is overall exothermic. If more energy is absorbed breaking bonds than is released making new bonds, the reaction is overall endothermic.",
        },
        {
          level: 6,
          body: "For the combustion of methane: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g). Bond breaking: 4 C–H bonds + 2 O=O bonds (energy absorbed). Bond making: 2 C=O bonds + 4 O–H bonds (energy released). Because the new bonds in CO₂ and H₂O are stronger than those broken in CH₄ and O₂, more energy is released than absorbed — the reaction is exothermic. The activation energy is the minimum energy needed to start breaking reactant bonds.",
        },
        {
          level: 8,
          body: "The reaction profile diagram shows the activation energy as the peak — this is the energy needed to break bonds and initiate the reaction. For an exothermic reaction (energy of products < energy of reactants), ΔH is negative. For an endothermic reaction (energy of products > energy of reactants), ΔH is positive. A catalyst lowers the activation energy by providing an alternative reaction pathway — it does not change ΔH (the overall energy difference between reactants and products). This is why a catalyst speeds up the reaction without changing how much energy is released or absorbed.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "bd-l2",
            level: 2,
            prompt: "When bonds form between atoms, what happens to energy?",
            options: [
              { id: "a", text: "Energy is absorbed from the surroundings" },
              { id: "b", text: "Energy is released into the surroundings", correct: true },
              { id: "c", text: "No energy change occurs" },
              { id: "d", text: "The temperature of the surroundings decreases" },
            ],
            explanation:
              "Bond formation releases energy — the new bond is a lower-energy state. Bond breaking absorbs energy. This is the fundamental reason reactions can be exothermic or endothermic.",
          },
          {
            type: "fill",
            id: "bd-l4",
            level: 4,
            prompt:
              "If the energy released making new bonds is greater than the energy absorbed breaking old bonds, the overall reaction is ▁.",
            answers: ["exothermic", "exothermic overall"],
            explanation:
              "When bond-making releases more energy than bond-breaking absorbs, there is a net release of energy to the surroundings — the reaction is exothermic and the temperature of the surroundings increases.",
          },
          {
            type: "short",
            id: "bd-l6",
            level: 6,
            prompt:
              "Methane (CH₄) burns in oxygen: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g). Explain why this reaction is exothermic in terms of bond breaking and bond making.",
            keywords: [
              "bond breaking",
              "bond making",
              "c-h",
              "o=o",
              "c=o",
              "o-h",
              "stronger",
              "more energy released",
              "exothermic",
              "absorb",
              "release",
            ],
            minKeywords: 4,
            sample:
              "Bond breaking: 4 C–H bonds and 2 O=O bonds must be broken, absorbing energy. Bond making: 2 C=O bonds (in CO₂) and 4 O–H bonds (in 2H₂O) are formed, releasing energy. The bonds formed in CO₂ and H₂O are stronger than those broken in CH₄ and O₂, so more energy is released than absorbed — the reaction is overall exothermic.",
          },
          {
            type: "short",
            id: "bd-l8",
            level: 8,
            prompt:
              "Explain how an energy profile diagram shows the role of activation energy, and how a catalyst changes the diagram. What does a catalyst NOT change, and why?",
            keywords: [
              "activation energy",
              "catalyst",
              "lower",
              "pathway",
              "delta h",
              "products",
              "reactants",
              "unchanged",
              "speed",
              "peak",
              "enthalpy",
            ],
            minKeywords: 4,
            sample:
              "The energy profile shows a peak — the activation energy — representing the minimum energy needed to break bonds and start the reaction. A catalyst provides an alternative reaction pathway with a lower activation energy peak, so more reactant molecules have enough energy to react, increasing the reaction rate. However, a catalyst does NOT change ΔH — the energy difference between reactants and products remains the same. The catalyst lowers the hill but not the start or finish line, so the same amount of heat is released or absorbed.",
          },
        ],
      },
    },
    {
      id: "shc",
      name: "Specific heat capacity & q = mcΔT",
      descriptor: "Use the equation q = mcΔT to calculate heat energy transferred in reactions.",
      guided: [
        {
          level: 2,
          body: "When you heat an object, the rise in temperature depends on its mass, the amount of energy supplied, and its composition. Specific heat capacity (c) is the amount of heat (in joules) needed to raise 1 kg of a substance by 1°C (or 1 K). Water has a specific heat capacity of 4,200 J kg⁻¹ K⁻¹.",
        },
        {
          level: 4,
          body: "The equation linking these quantities is: q = mcΔT, where q = heat energy transferred (J), m = mass (kg), c = specific heat capacity (J kg⁻¹ K⁻¹), ΔT = change in temperature (K or °C). A temperature change in °C is numerically the same as a temperature change in K.",
        },
        {
          level: 6,
          body: "Worked example: Magnesium reacts with hydrochloric acid in a boiling tube containing 10 cm³ of 1 mol dm⁻³ HCl (density ≈ 1 g cm⁻³, so mass = 0.010 kg). The temperature rises from 21°C to 54°C, so ΔT = 33°C = 33 K. q = 0.010 × 4200 × 33 = 1386 J ≈ 1.39 kJ. This is an exothermic reaction — magnesium reacts vigorously with HCl, releasing heat and producing hydrogen gas.",
        },
        {
          level: 8,
          body: "The copper(II) sulfate + zinc experiment (Chapter 4 data): 50 cm³ of 0.20 mol dm⁻³ CuSO₄ (mass of solution = 57.6 g = 0.0576 kg), initial T = 22.0°C, final T = 52.4°C, ΔT = 30.4°C. q = 0.0576 × 4200 × 30.4 = 7349 J ≈ 7.35 kJ. This is likely an underestimate: heat is lost to the coffee cup, the thermometer, and the surroundings. To reduce heat loss: use a polystyrene cup (insulator), add a lid, and take the maximum temperature reading quickly. The specific heat capacity of the solution is assumed to equal that of water — a further source of error.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "shc-l2",
            level: 2,
            prompt: "The specific heat capacity of water is 4,200 J kg⁻¹ K⁻¹. What does this value mean?",
            options: [
              { id: "a", text: "Water boils at 4,200°C" },
              { id: "b", text: "It takes 4,200 J to raise 1 kg of water by 1°C (or 1 K)", correct: true },
              { id: "c", text: "Water releases 4,200 J when it freezes" },
              { id: "d", text: "1 kg of water contains 4,200 joules of energy" },
            ],
            explanation:
              "Specific heat capacity is defined as the energy (in joules) needed to raise 1 kg of a substance by 1°C or 1 K. Water's high value (4,200 J kg⁻¹ K⁻¹) means it resists temperature changes, making it an excellent coolant.",
          },
          {
            type: "fill",
            id: "shc-l4",
            level: 4,
            prompt:
              "The equation for heat energy transferred is q = ▁, where m is mass in kg, c is specific heat capacity, and ΔT is the temperature change.",
            answers: ["mcΔT", "mc ΔT", "m × c × ΔT", "mcδt"],
            explanation:
              "q = mcΔT. All three quantities must use consistent units: mass in kg, c in J kg⁻¹ K⁻¹, and ΔT in K (or °C — they are numerically equal for a temperature change).",
          },
          {
            type: "short",
            id: "shc-l6",
            level: 6,
            prompt:
              "In the magnesium + hydrochloric acid experiment, 10 cm³ of HCl solution heats from 21°C to 54°C. Assume the density of the solution is 1 g cm⁻³ and c = 4,200 J kg⁻¹ K⁻¹. Calculate q in joules. Show your working clearly.",
            keywords: [
              "0.010",
              "4200",
              "33",
              "1386",
              "joules",
              "kg",
              "delta t",
              "q = mcδt",
              "0.01",
              "exothermic",
            ],
            minKeywords: 3,
            sample:
              "m = 10 cm³ × 1 g cm⁻³ = 10 g = 0.010 kg. ΔT = 54 − 21 = 33°C = 33 K. q = mcΔT = 0.010 × 4200 × 33 = 1386 J ≈ 1.39 kJ. The positive ΔT confirms this is an exothermic reaction — heat is released into the surroundings.",
          },
          {
            type: "short",
            id: "shc-l8",
            level: 8,
            prompt:
              "In the copper(II) sulfate + zinc experiment: mass of solution = 57.6 g, initial T = 22.0°C, final T = 52.4°C, c = 4,200 J kg⁻¹ K⁻¹. Calculate q. Then explain why this value is likely an underestimate of the true heat released, and suggest two improvements.",
            keywords: [
              "0.0576",
              "30.4",
              "7349",
              "7.35",
              "underestimate",
              "heat loss",
              "polystyrene",
              "insulator",
              "surroundings",
              "lid",
              "assumption",
            ],
            minKeywords: 4,
            sample:
              "m = 57.6 g = 0.0576 kg. ΔT = 52.4 − 22.0 = 30.4°C. q = 0.0576 × 4200 × 30.4 = 7349 J ≈ 7.35 kJ. This is likely an underestimate because: (1) heat is lost to the cup, thermometer, and surroundings — not all energy heats the solution; (2) the specific heat capacity of the CuSO₄ solution is assumed to equal that of water, but it is slightly different. Improvements: use a polystyrene cup (insulator) and a lid to reduce heat loss; use a more accurate digital temperature probe to record the maximum temperature.",
          },
        ],
      },
    },
    {
      id: "states",
      name: "States of matter & energy changes",
      descriptor: "Explain state changes in terms of particle energy and distinguish heat from temperature.",
      guided: [
        {
          level: 2,
          body: "Matter exists as solid, liquid or gas. A solid has a fixed shape and volume — its particles are closely packed and vibrate about fixed positions. A liquid has a fixed volume but takes the shape of its container. A gas fills its container — particles spread out and move freely.",
        },
        {
          level: 4,
          body: "When a solid is heated, particles gain energy and vibrate more vigorously. At the melting point, they have enough energy to break away from fixed positions — the solid becomes a liquid. Further heating causes particles to break free entirely — at the boiling point, the liquid becomes a gas. These changes are reversible by cooling (freezing, condensing). Heat and temperature are not the same: heat is a measure of total thermal energy (measured in joules, J); temperature is a measure of how hot something is (measured in °C or K).",
        },
        {
          level: 6,
          body: "The Celsius and Kelvin scales are related by: T(K) = T(°C) + 273. Absolute zero (0 K, −273°C) is the lowest possible temperature, where all particle motion theoretically stops. A temperature change of 1°C = a change of 1 K. This means that ΔT in °C and ΔT in K are always numerically equal — essential for using q = mcΔT. Melting point and boiling point vary enormously between substances: water melts at 0°C/boils at 100°C, while iron (formed in the thermite reaction) melts at 1,540°C and boils at 2,900°C.",
        },
        {
          level: 8,
          body: "On a heating curve (temperature vs energy added), the flat plateaus at the melting point and boiling point occur because added energy is breaking intermolecular bonds (changing state) rather than increasing kinetic energy — the temperature stays constant during a state change. This is called latent heat. The higher the boiling point, the stronger the intermolecular forces. Comparing the halogens: chlorine (Cl₂, gas at room T), bromine (Br₂, liquid), and iodine (I₂, solid) illustrate increasing intermolecular force strength down the group, requiring more energy to overcome and change state.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "st-l2",
            level: 2,
            prompt: "Which statement correctly describes the particles in a liquid?",
            options: [
              { id: "a", text: "Particles are in fixed positions and can only vibrate" },
              { id: "b", text: "Particles are spread far apart and fill any container" },
              { id: "c", text: "Particles are close together and can move around each other", correct: true },
              { id: "d", text: "Particles are close together and cannot move at all" },
            ],
            explanation:
              "In a liquid, particles are close together (fixed volume) but can move around each other — this is why liquids flow and take the shape of their container. Solids have particles in fixed positions; gases have particles spread out and moving freely.",
          },
          {
            type: "fill",
            id: "st-l4",
            level: 4,
            prompt:
              "To convert a temperature from degrees Celsius to kelvin, you add ▁ to the Celsius value.",
            answers: ["273", "273 K", "+273"],
            explanation:
              "T(K) = T(°C) + 273. Absolute zero is −273°C = 0 K. The advantage of the Kelvin scale is that it has no negative values, making it useful for calculations in chemistry and physics.",
          },
          {
            type: "short",
            id: "st-l6",
            level: 6,
            prompt:
              "Explain the difference between heat and temperature, using units in your answer. Why is the distinction important when using q = mcΔT?",
            keywords: [
              "heat",
              "joules",
              "temperature",
              "celsius",
              "kelvin",
              "thermal energy",
              "measure",
              "hot",
              "delta t",
              "numerically equal",
            ],
            minKeywords: 4,
            sample:
              "Heat is a measure of the total thermal energy of a substance — it is measured in joules (J). Temperature is a measure of how hot something is — measured in degrees Celsius (°C) or kelvin (K). A large, cold object can have more total heat energy than a small, hot object. In q = mcΔT, ΔT must be in kelvin or °C — a change of 1°C equals a change of 1 K, so they give the same numerical answer for ΔT.",
          },
          {
            type: "short",
            id: "st-l8",
            level: 8,
            prompt:
              "Describe what happens on a heating curve when a substance is being melted. Why does the temperature stay constant during melting, even though energy is being added? Use the concept of latent heat and intermolecular forces in your answer.",
            keywords: [
              "latent heat",
              "plateau",
              "melting point",
              "intermolecular",
              "bonds",
              "kinetic energy",
              "constant",
              "break",
              "state change",
              "energy",
            ],
            minKeywords: 4,
            sample:
              "On a heating curve, there is a flat plateau at the melting point — temperature does not rise even though energy is being added. This is because the added energy (latent heat of fusion) is used to break the intermolecular bonds holding the particles in their fixed solid positions, converting the solid into a liquid. Until all the bonds are broken (the substance is fully melted), the kinetic energy of the particles — and thus the temperature — does not increase. Only once the substance is fully liquid does adding more energy increase the temperature again.",
          },
        ],
      },
    },
  ],
}
