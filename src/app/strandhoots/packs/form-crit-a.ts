import type { StrandhootPack } from "../engine/types"

export const formCritA: StrandhootPack = {
  slug: "form-crit-a",
  title: "States, Mixtures & Separation",
  subject: "MYP Chemistry",
  criterion: "A",
  topic: "States of matter, mixtures and separation techniques",
  accent: "#1b7888",
  icon: "🧪",
  statementOfInquiry:
    "Observing and describing the properties of a substance helps us to understand its identity and how it interacts with the environment.",
  estMinutes: 28,
  intro:
    "From the three states of matter to solutions, colloids and suspensions — and the separation techniques that pull them apart — this pack targets the core knowledge of Chapter 6: Form. Each strand levels up from recall to analysis.",
  badges: [
    {
      id: "states",
      label: "State Spotter",
      icon: "🧊",
      description: "Reach Level 8 on States of matter",
      strandId: "states",
      atLevel: 8,
    },
    {
      id: "enthalpies",
      label: "Energy Accountant",
      icon: "🔥",
      description: "Reach Level 8 on Enthalpy changes of state",
      strandId: "enthalpies",
      atLevel: 8,
    },
    {
      id: "mixtures",
      label: "Mixture Master",
      icon: "🫧",
      description: "Reach Level 8 on Solutions, colloids and suspensions",
      strandId: "mixtures",
      atLevel: 8,
    },
    {
      id: "separation",
      label: "Separation Expert",
      icon: "🔬",
      description: "Reach Level 8 on Separation techniques",
      strandId: "separation",
      atLevel: 8,
    },
    {
      id: "master",
      label: "Form Champion",
      icon: "🏆",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Chapter 6: Form",
      blurb: "States of matter, mixtures, and how to separate them",
      icon: "🧪",
    },
  ],
  strands: [
    {
      id: "states",
      name: "States of matter",
      descriptor: "Describe and compare the macroscopic and microscopic properties of solids, liquids and gases.",
      guided: [
        {
          level: 2,
          body: "Matter exists in three states: solid, liquid and gas. A solid has a fixed shape and volume. A liquid has a fixed volume but takes the shape of its container. A gas has neither a fixed shape nor volume — it expands to fill the available space.",
        },
        {
          level: 4,
          body: "At the microscopic level: in a solid, strong attractive forces hold particles in close-packed, fixed positions — they can only vibrate. In a liquid, forces are weaker, and particles can vibrate, rotate and translate (move around). In a gas, forces are negligible and particles vibrate, rotate and translate faster than in a liquid. Only gases can be compressed significantly.",
        },
        {
          level: 6,
          body: "A pure substance has a fixed melting and boiling point. When a solid is heated to its melting point, particles gain enough kinetic energy to overcome the intermolecular forces that hold the lattice together and can move — but temperature stays constant at 0°C (for water) during melting because all added energy goes into breaking intermolecular forces, not raising temperature. The heating curve shows horizontal plateaus at melting and boiling points.",
        },
        {
          level: 8,
          body: "Water is anomalous: liquid water is denser than ice because in the liquid state molecules interact via hydrogen bonds and pack more closely. Ice has a more open lattice structure, making it less dense (917 kg m⁻³ vs ~1000 kg m⁻³ for liquid water at 4°C). This is why ice floats and icebergs do not sink. In contrast, for most substances the liquid is slightly less dense than the solid — water is one of very few exceptions due to its hydrogen-bonding network.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "st-l2",
            level: 2,
            prompt: "Which statement correctly describes a gas?",
            options: [
              { id: "a", text: "Fixed shape and fixed volume" },
              { id: "b", text: "Fixed volume but no fixed shape" },
              { id: "c", text: "No fixed shape and no fixed volume; expands to fill its container", correct: true },
              { id: "d", text: "Fixed shape but no fixed volume" },
            ],
            explanation:
              "A gas has no fixed shape and no fixed volume — the particles are far apart and move rapidly, so the gas expands to occupy whatever space is available.",
          },
          {
            type: "fill",
            id: "st-l4",
            level: 4,
            prompt:
              "In a solid, particles are held in fixed positions by strong ▁ forces and can only vibrate.",
            answers: ["intermolecular", "attractive", "interparticle"],
            explanation:
              "Strong attractive (intermolecular) forces in a solid lock particles into a close-packed lattice, restricting their motion to vibration only.",
          },
          {
            type: "short",
            id: "st-l6",
            level: 6,
            prompt:
              "A heating curve for water shows a horizontal plateau at 0°C. Explain why the temperature does not rise during melting, even though heat is continuously being added.",
            keywords: ["intermolecular", "forces", "energy", "break", "kinetic", "lattice", "constant", "melting", "enthalpy", "fusion"],
            minKeywords: 3,
            sample:
              "During melting, all the energy supplied goes into breaking the intermolecular forces (hydrogen bonds) that hold water molecules in the ice lattice. None of the energy increases the kinetic energy of the particles, so the temperature remains constant at 0°C. This energy is called the enthalpy of fusion (latent heat of fusion).",
          },
          {
            type: "short",
            id: "st-l8",
            level: 8,
            prompt:
              "Explain why ice is less dense than liquid water, and why this anomalous property is important. Most substances are denser as solids than as liquids — why is water different?",
            keywords: ["hydrogen bond", "lattice", "open", "denser", "liquid", "ice", "float", "917", "1000", "anomalous", "close"],
            minKeywords: 3,
            sample:
              "Water forms a hydrogen-bonded lattice in ice, which is more open and less compact than the arrangement of molecules in liquid water. As a result, ice has a lower density (~917 kg m⁻³) than liquid water (~1000 kg m⁻³ at 4°C). This is anomalous — for most substances the solid is denser. Because ice is less dense, it floats on liquid water, which insulates aquatic organisms in winter and prevents lakes from freezing solid.",
          },
        ],
      },
    },
    {
      id: "enthalpies",
      name: "Enthalpy changes of state",
      descriptor: "Define enthalpy of fusion and vaporization and apply them to energy calculations.",
      guided: [
        {
          level: 2,
          body: "Energy is needed to melt a solid or boil a liquid. The enthalpy of fusion (ΔHfusion) is the energy needed to melt 1 g of a substance at its melting point. The enthalpy of vaporization (ΔHvaporization) is the energy needed to boil 1 g at its boiling point. Both are endothermic — the positive sign means heat is absorbed from the surroundings.",
        },
        {
          level: 4,
          body: "Water: ΔHfusion = +334 J g⁻¹; ΔHvaporization = +2260 J g⁻¹. Lead: ΔHfusion = +22.4 J g⁻¹; ΔHvaporization = +871 J g⁻¹. To melt 1.5 kg of water: energy = 1500 g × 334 J g⁻¹ = 501 000 J = 501 kJ. The vaporization value is much larger than fusion because more energy is needed to fully separate particles from a liquid into a gas than to just allow them to move past each other (liquid).",
        },
        {
          level: 6,
          body: "The reverse processes — condensation and freezing — are exothermic: ΔHvaporization = −ΔHcondensation and ΔHfusion = −ΔHfreezing. Steam burns are far more severe than boiling-water burns because when steam condenses on skin, it releases +2260 J g⁻¹ of energy (the enthalpy of condensation) in addition to the thermal energy. Carbon dioxide sublimates at −78.5°C (dry ice) — it goes directly from solid to gas, bypassing the liquid phase entirely.",
        },
        {
          level: 8,
          body: "The large difference between ΔHfusion and ΔHvaporization reflects the microscopic energy landscape: melting only requires enough energy to disorder the lattice and allow particles to slide past each other — intermolecular forces are weakened, not broken. Vaporization requires complete separation of particles against all intermolecular attractions. For water, the network of hydrogen bonds (about 20 kJ mol⁻¹ each) makes ΔHvaporization exceptionally high compared to non-polar molecules of similar molar mass — this is why water has a uniquely high boiling point (100°C) compared to H₂S (−61°C) despite H₂S being heavier.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "en-l2",
            level: 2,
            prompt: "What does a positive enthalpy of fusion (+334 J g⁻¹ for water) indicate?",
            options: [
              { id: "a", text: "Energy is released by the surroundings as the ice melts" },
              { id: "b", text: "Heat is absorbed from the surroundings — melting is endothermic", correct: true },
              { id: "c", text: "The ice has a negative temperature" },
              { id: "d", text: "The melting point of water is 334°C" },
            ],
            explanation:
              "A positive enthalpy value means the system absorbs heat from its surroundings — this is an endothermic process. Melting ice requires energy input to break intermolecular forces.",
          },
          {
            type: "fill",
            id: "en-l4",
            level: 4,
            prompt:
              "To melt 1.5 kg of ice at 0°C, using ΔHfusion = 334 J g⁻¹, the energy required is ▁ kJ.",
            answers: ["501", "501 kJ", "501000 J", "501,000"],
            explanation:
              "Energy = mass × ΔHfusion = 1500 g × 334 J g⁻¹ = 501 000 J = 501 kJ. Multiply grams by J g⁻¹.",
          },
          {
            type: "short",
            id: "en-l6",
            level: 6,
            prompt:
              "Explain why a steam burn at 100°C is more dangerous than a burn from boiling water at 100°C, using the concept of enthalpy of condensation.",
            keywords: ["condensation", "enthalpy", "releases", "2260", "exothermic", "steam", "energy", "skin", "additional", "boiling water"],
            minKeywords: 3,
            sample:
              "Both boiling water and steam are at 100°C, but steam releases an additional +2260 J g⁻¹ when it condenses on the skin (the enthalpy of condensation is the reverse of vaporization — it is exothermic). This extra energy is released directly onto the skin, causing far more severe burns than boiling water alone, which only transfers its thermal energy.",
          },
          {
            type: "short",
            id: "en-l8",
            level: 8,
            prompt:
              "The enthalpy of vaporization of water (+2260 J g⁻¹) is about 6.7 times greater than its enthalpy of fusion (+334 J g⁻¹). Explain this difference in terms of what happens to intermolecular forces during melting versus boiling.",
            keywords: ["intermolecular", "broken", "weakened", "disorder", "lattice", "separated", "hydrogen bond", "vaporization", "fusion", "particles"],
            minKeywords: 3,
            sample:
              "During melting, the lattice is disordered but intermolecular forces are only weakened — particles can slide past each other but remain close together. During boiling, all intermolecular forces must be completely overcome to fully separate particles into the gas phase. For water, the extensive hydrogen-bond network means a very large energy input is needed for vaporization. Therefore ΔHvaporization >> ΔHfusion: fusion disrupts order; vaporization eliminates all intermolecular interactions.",
          },
        ],
      },
    },
    {
      id: "mixtures",
      name: "Solutions, colloids and suspensions",
      descriptor: "Classify mixtures by particle size and explain the differences between solutions, colloids and suspensions.",
      guided: [
        {
          level: 2,
          body: "A mixture contains two or more substances that are physically combined but not chemically bonded. Mixtures can be homogeneous (same composition throughout — e.g. salt dissolved in water) or heterogeneous (variable composition — e.g. sand in water). The three main types are solutions, colloids and suspensions.",
        },
        {
          level: 4,
          body: "A solution is a homogeneous mixture in which the solute particles are so small they cannot be seen under any microscope. A suspension is a heterogeneous mixture with larger particles that settle on standing and can be separated by filtration (e.g. soil in water). A colloid has intermediate particle size — the particles don't settle but can be separated by centrifuge and seen by electron microscope. Examples: aerosol spray (colloid), milk (colloid), salt water (solution), dust in air (suspension).",
        },
        {
          level: 6,
          body: "Particle size is the key distinguishing feature: solutions < colloids < suspensions. Colloid particles show Brownian motion — random zigzag movement caused by collision with fluid molecules — observable with a microscope using a smoke cell. An emulsion is a type of colloid made of two immiscible liquids (e.g. oil and water shaken together). When oil and water are shaken they form an opaque mixture of tiny oil droplets in water; they do not dissolve. A phase is a homogeneous part of a system; immiscible liquids exist in separate phases with a visible boundary layer.",
        },
        {
          level: 8,
          body: "The distinction between solution, colloid and suspension maps onto particle size and separation behaviour: solution particles (<1 nm) pass through filter paper and semipermeable membranes; colloid particles (1–1000 nm) pass filter paper but are retained by semipermeable membranes and sediment under centrifugation; suspension particles (>1000 nm) are retained by filter paper and sediment under gravity. Brownian motion in colloids is direct evidence for the kinetic molecular theory — particles move without stopping because the collisions with the surrounding fluid are random and unequal. A double-replacement reaction can produce an insoluble precipitate from two soluble salts — e.g. Fe(NO₃)₃(aq) + Na₂CO₃(aq) → FeCO₃(s) + 2NaNO₃(aq) — creating a suspension that can be separated by filtration.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "mx-l2",
            level: 2,
            prompt: "Which of the following is a homogeneous mixture?",
            options: [
              { id: "a", text: "Sand and water" },
              { id: "b", text: "Fruit salad" },
              { id: "c", text: "Salt dissolved in water", correct: true },
              { id: "d", text: "Soil in water" },
            ],
            explanation:
              "Salt dissolved in water is a homogeneous mixture (solution) — any sample taken has the same composition. Sand, soil in water, and fruit salad are heterogeneous (variable composition).",
          },
          {
            type: "fill",
            id: "mx-l4",
            level: 4,
            prompt:
              "A ▁ is a type of colloid made of two immiscible liquids, such as oil droplets dispersed in water.",
            answers: ["emulsion"],
            explanation:
              "An emulsion is a colloid of two immiscible liquids — tiny droplets of one liquid are dispersed in another. Oil and water shaken together form an emulsion. Mayonnaise and milk are everyday examples.",
          },
          {
            type: "short",
            id: "mx-l6",
            level: 6,
            prompt:
              "Describe the key differences between a solution, a colloid and a suspension. Include particle size, whether particles settle, and one example of each.",
            keywords: ["solution", "colloid", "suspension", "particle size", "settle", "filter paper", "brownian", "microscope", "homogeneous", "heterogeneous"],
            minKeywords: 4,
            sample:
              "A solution has the smallest particles (< 1 nm) — they are invisible even under electron microscope, the mixture is homogeneous, and particles do not settle. Example: salt water. A colloid has intermediate particles (1–1000 nm) that do not settle and pass through filter paper but can be seen with an electron microscope and show Brownian motion. Example: milk. A suspension has the largest particles (> 1000 nm) that are visible, settle on standing and are retained by filter paper. Example: soil in water.",
          },
          {
            type: "mcq",
            id: "mx-l8",
            level: 8,
            prompt: "Iron(III) nitrate solution is mixed with sodium carbonate solution, forming a brown precipitate. Which technique would best separate the precipitate from the filtrate, and which type of mixture does the product represent before separation?",
            options: [
              { id: "a", text: "Fractional distillation; the product is a colloid" },
              { id: "b", text: "Filtration; the product is a suspension of insoluble iron(III) carbonate", correct: true },
              { id: "c", text: "Evaporation; the product is a homogeneous solution" },
              { id: "d", text: "Centrifugation only; the precipitate is too large for filtration" },
            ],
            explanation:
              "The double-replacement reaction produces insoluble iron(III) carbonate as a precipitate — a suspension of solid particles larger than colloid size. Filtration is the appropriate technique: the precipitate (residue) is retained by the filter paper and the soluble NaNO₃(aq) passes through as the filtrate.",
          },
        ],
      },
    },
    {
      id: "separation",
      name: "Separation techniques",
      descriptor: "Select and justify appropriate separation techniques for different types of mixtures.",
      guided: [
        {
          level: 2,
          body: "Mixtures can be separated because their components have different physical properties. Filtration separates insoluble solids from liquids. Evaporation separates a dissolved solid from a solvent. A separating funnel separates immiscible liquids (e.g. oil and water). Fractional distillation separates miscible liquids with different boiling points.",
        },
        {
          level: 4,
          body: "Filtration uses a fluted filter paper in a funnel — the liquid (filtrate) passes through; the solid (residue) stays behind. Fractional distillation separates crude oil into fractions (e.g. refinery gas, gasoline, kerosene, diesel, fuel oil, bitumen) using their different boiling points — volatile fractions boil first and are collected at lower temperatures. In the lab: fractions are collected at room temperature to 100°C, 100–150°C, 150–200°C, 200–250°C.",
        },
        {
          level: 6,
          body: "The choice of technique depends on the physical properties of the mixture: size of particles → filtration or centrifuge; boiling points → distillation or fractional distillation; density/immiscibility of liquids → separating funnel. In crude oil fractional distillation, the mixture is heated until volatile fractions reach their boiling points and vaporise — differences in boiling point allow fractions to be identified and categorised. A separating funnel works because immiscible liquids form two separate phases with a clear boundary; the denser liquid forms the lower layer and is run off first.",
        },
        {
          level: 8,
          body: "For each technique, the underlying principle is a difference in a physical property — not chemical composition. Fractional distillation of crude oil relies on the direct relationship between carbon chain length and boiling point: longer chains have greater Van der Waals (London dispersion) forces between molecules, requiring more energy to vaporise, so they emerge at higher temperatures. Short-chain fractions (refinery gas, gasoline) are more volatile, less viscous, lighter in colour, and more flammable. Filtration works because the filter paper has pores smaller than the solid particles but larger than solvent molecules, acting as a physical sieve. Fluted filter paper increases surface area and rate of filtration. The correct matching of technique to mixture type — based on particle size, miscibility, and boiling point differences — is the foundation of analytical chemistry.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "sep-l2",
            level: 2,
            prompt: "Which technique is used to separate two immiscible liquids, such as oil and water?",
            options: [
              { id: "a", text: "Filtration" },
              { id: "b", text: "Evaporation" },
              { id: "c", text: "Separating funnel", correct: true },
              { id: "d", text: "Fractional distillation" },
            ],
            explanation:
              "A separating funnel is used for immiscible liquids — they settle into two distinct layers due to their different densities. The tap is opened to drain the denser lower layer, separating the two liquids.",
          },
          {
            type: "fill",
            id: "sep-l4",
            level: 4,
            prompt:
              "In filtration, the liquid that passes through the filter paper is called the ▁, while the solid that remains is called the residue.",
            answers: ["filtrate"],
            explanation:
              "Filtrate = the liquid that passes through the filter paper (the pores are smaller than the solid particles but larger than solvent molecules). Residue = the solid collected on the filter paper.",
          },
          {
            type: "short",
            id: "sep-l6",
            level: 6,
            prompt:
              "Explain why fractional distillation is used to separate crude oil rather than simple distillation. What property of crude oil makes this necessary?",
            keywords: ["boiling point", "fractions", "different", "hydrocarbons", "mixture", "volatile", "temperature", "gasoline", "kerosene", "diesel"],
            minKeywords: 3,
            sample:
              "Crude oil is a heterogeneous mixture of many different hydrocarbons, each with a different boiling point. Simple distillation would only separate one fraction at a time. Fractional distillation uses the range of boiling points to collect different fractions at different temperature ranges — for example, gasoline (room temperature to 100°C), kerosene (100–150°C), diesel (150–200°C) and heavier fractions at higher temperatures. The more volatile (shorter carbon chain) fractions boil first.",
          },
          {
            type: "short",
            id: "sep-l8",
            level: 8,
            prompt:
              "Compare filtration and fractional distillation as separation techniques. For each, identify the physical property exploited, the type of mixture it can separate, and one real-world application.",
            keywords: ["particle size", "boiling point", "filtration", "fractional distillation", "insoluble", "crude oil", "fractions", "filter paper", "pores", "volatile"],
            minKeywords: 4,
            sample:
              "Filtration exploits differences in particle size: the filter paper has pores large enough for solvent molecules (and dissolved ions) but small enough to retain suspended solid particles. Used to separate insoluble precipitates from solution (e.g. iron carbonate from sodium nitrate after a double-replacement reaction). Fractional distillation exploits differences in boiling point: as the mixture is heated, fractions vaporise at their respective boiling points and are condensed and collected separately. Used industrially to separate crude oil into fractions (refinery gas, gasoline, kerosene, diesel, fuel oil, bitumen), each useful for different applications.",
          },
        ],
      },
    },
  ],
}
