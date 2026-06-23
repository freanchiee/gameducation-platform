import type { StrandhootPack } from "../engine/types"

export const conditionsCritA: StrandhootPack = {
  slug: "conditions-crit-a",
  title: "Chemical Kinetics & Collision Theory",
  subject: "MYP Chemistry",
  criterion: "A",
  topic: "Rate of reaction & factors affecting it",
  accent: "#1b7888",
  icon: "💥",
  statementOfInquiry:
    "Scientific innovations advance a scientist's ability to monitor changes in conditions and the effect they have on the rate of a chemical reaction.",
  estMinutes: 28,
  intro:
    "Explore the science behind how fast reactions happen — from the collision theory model to the four key factors that control reaction rate. Each strand targets a core concept from Chapter 5: Conditions, levelling up from recall to analysis.",
  badges: [
    {
      id: "collider",
      label: "Collision Expert",
      icon: "💥",
      description: "Reach Level 8 on Collision theory",
      strandId: "collision",
      atLevel: 8,
    },
    {
      id: "ratemeasure",
      label: "Rate Watcher",
      icon: "⏱️",
      description: "Reach Level 8 on Measuring rate",
      strandId: "rate",
      atLevel: 8,
    },
    {
      id: "factors",
      label: "Factor Four",
      icon: "🎛️",
      description: "Reach Level 8 on Factors affecting rate",
      strandId: "factors",
      atLevel: 8,
    },
    {
      id: "master",
      label: "Kinetics Master",
      icon: "🏆",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Chapter 5: Conditions",
      blurb: "Collision theory, measuring rate, activation energy, and the four factors",
      icon: "⚗️",
    },
  ],
  strands: [
    {
      id: "collision",
      name: "Collision theory",
      descriptor: "State and apply the three conditions a collision must meet for a reaction to occur.",
      guided: [
        {
          level: 2,
          body: "The collision theory explains what happens at the atomic level when reacting particles collide. For a reaction to occur: (1) the reacting particles must collide with each other, (2) the colliding particles must have the correct orientation, and (3) the particles must have the minimum kinetic energy required — called the activation energy.",
        },
        {
          level: 4,
          body: "Most collisions are unsuccessful — particles simply bounce off each other. For a collision to be successful, all three conditions of the collision theory must be met simultaneously. Only a small proportion of collisions in any reaction mixture are successful. Activation energy (Ea) is the minimum energy required to break bonds in the reactants and initiate the reaction.",
        },
        {
          level: 6,
          body: "The collision theory explains why reaction rate increases with temperature: raising the temperature increases the average kinetic energy of particles, so a greater proportion of collisions exceed the activation energy threshold (visible as the shaded area under a Maxwell–Boltzmann distribution curve). At 100°C vs 0°C, the tail of the distribution shifts significantly to higher energies — far more molecules can overcome Ea.",
        },
        {
          level: 8,
          body: "A catalyst provides an alternative reaction pathway of lower activation energy. This means a larger proportion of the reactant particles have sufficient energy to overcome the new, lower Ea at the same temperature — shown as a larger shaded area under the Maxwell–Boltzmann distribution. The catalyst is not consumed; a small amount of chlorine from CFC decomposition can catalyse the destruction of vast quantities of ozone in the stratosphere for this very reason.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "ct-l2",
            level: 2,
            prompt:
              "According to the collision theory, which of the following is NOT required for a successful collision between reactant particles?",
            options: [
              { id: "a", text: "The particles must collide with each other" },
              { id: "b", text: "The particles must have the minimum kinetic energy (activation energy)", },
              { id: "c", text: "The particles must have the correct orientation" },
              { id: "d", text: "The particles must be the same size", correct: true },
            ],
            explanation:
              "The collision theory has three conditions: collision must occur, orientation must be correct, and minimum kinetic energy (activation energy) must be met. Particle size is not a condition.",
          },
          {
            type: "fill",
            id: "ct-l4",
            level: 4,
            prompt:
              "The minimum amount of energy that colliding particles need in order for a reaction to occur is called the ▁.",
            answers: ["activation energy", "activation energy (Ea)", "Ea"],
            explanation:
              "Activation energy is the minimum energy barrier that reactant particles must overcome to transform into products. Reactions with low Ea proceed more readily at a given temperature.",
          },
          {
            type: "short",
            id: "ct-l6",
            level: 6,
            prompt:
              "Explain, using the Maxwell–Boltzmann distribution, why increasing the temperature increases the rate of a chemical reaction.",
            keywords: [
              "kinetic energy",
              "maxwell",
              "boltzmann",
              "activation energy",
              "proportion",
              "distribution",
              "temperature",
              "frequency",
              "successful",
              "collisions",
            ],
            minKeywords: 4,
            sample:
              "Increasing the temperature raises the average kinetic energy of the particles. On a Maxwell–Boltzmann distribution, the curve shifts to the right, meaning a greater proportion of molecules now have energy equal to or greater than the activation energy. This increases the frequency of successful collisions and therefore the rate of reaction.",
          },
          {
            type: "short",
            id: "ct-l8",
            level: 8,
            prompt:
              "Explain how a catalyst increases the rate of a reaction without being consumed. Use the concept of activation energy and a distribution curve in your answer.",
            keywords: [
              "alternative pathway",
              "lower activation energy",
              "proportion",
              "catalyst",
              "not consumed",
              "maxwell",
              "boltzmann",
              "shaded area",
              "same temperature",
              "more molecules",
            ],
            minKeywords: 4,
            sample:
              "A catalyst provides an alternative reaction pathway with a lower activation energy. At the same temperature, the Maxwell–Boltzmann distribution is unchanged, but the lower Ea means the shaded area (representing molecules with sufficient energy) is larger. A greater proportion of collisions are now successful, increasing the rate. The catalyst itself is not consumed — it is regenerated — so a tiny amount can catalyse many reaction cycles.",
          },
        ],
      },
    },
    {
      id: "rate",
      name: "Measuring rate of reaction",
      descriptor: "Define rate of reaction and describe how it is measured using gas volume or mass loss.",
      guided: [
        {
          level: 2,
          body: "The rate of reaction is defined as the change in amount of either reactants or products per unit time: Rate = change in amount of reactant or product ÷ time taken. When a gas is produced, rate can be measured in cm³ s⁻¹ by collecting the gas in a syringe.",
        },
        {
          level: 4,
          body: "For the reaction CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g) + H₂O(l), two common monitoring methods are: (1) collecting CO₂ gas in a syringe to measure volume produced over time, or (2) placing the flask on a balance and measuring the loss of mass as CO₂ escapes. Both give the same shape of curve — rapid rise followed by a plateau when all reactant is consumed.",
        },
        {
          level: 6,
          body: "The initial rate of reaction is found by drawing a tangent to the volume–time curve at t = 0 s and calculating its gradient (Δy/Δx). The gradient of the tangent decreases as the reaction proceeds because reactant concentration falls, leading to fewer successful collisions per second. When the curve becomes horizontal (gradient = 0), the reaction has finished. Units for rate when measuring gas volume: cm³ s⁻¹.",
        },
        {
          level: 8,
          body: "Using the dataset from the textbook experiment (CaCO₃ + HCl, data collected over 10 minutes): the initial rate is steepest in the first 1–2 minutes (gradient ≈ 14 cm³ min⁻¹ at t=1 min) and flattens toward t=10 min (78 cm³, plateau approaching). The total volume of CO₂ produced is determined solely by the amount of limiting reagent — all curves with different chip sizes or acid concentrations finish at the same total volume, confirming conservation of mass and constant moles of reactant.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "rm-l2",
            level: 2,
            prompt:
              "A student monitors the reaction between calcium carbonate chips and hydrochloric acid. Which gas is produced that can be collected to measure the rate?",
            options: [
              { id: "a", text: "Hydrogen" },
              { id: "b", text: "Oxygen" },
              { id: "c", text: "Carbon dioxide", correct: true },
              { id: "d", text: "Chlorine" },
            ],
            explanation:
              "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g) + H₂O(l). Carbon dioxide is the gas product and can be collected in a syringe to track the progress of the reaction.",
          },
          {
            type: "fill",
            id: "rm-l4",
            level: 4,
            prompt:
              "When a gas escapes from a reaction flask placed on a balance, the mass of the flask ▁ over time, and this can be used to monitor the rate of reaction.",
            answers: ["decreases", "decreases over time", "falls", "reduces"],
            explanation:
              "As CO₂ gas escapes from the open system, the total mass of the flask and its contents decreases. Plotting mass loss against time gives a curve that reveals how the rate changes over the course of the reaction.",
          },
          {
            type: "short",
            id: "rm-l6",
            level: 6,
            prompt:
              "Explain how to calculate the initial rate of reaction from a volume of gas vs time graph. Why does the rate decrease as the reaction proceeds?",
            keywords: [
              "tangent",
              "t=0",
              "gradient",
              "initial rate",
              "delta y",
              "delta x",
              "concentration",
              "decreases",
              "fewer collisions",
              "cm3",
            ],
            minKeywords: 4,
            sample:
              "Draw a tangent to the curve at t = 0 s. The initial rate equals the gradient of this tangent: Δy/Δx (cm³ s⁻¹). As the reaction proceeds, the reactant concentration falls — there are fewer reactant particles per unit volume, so the frequency of successful collisions decreases. The gradient of the tangent therefore decreases over time until it reaches zero when the reaction is complete.",
          },
          {
            type: "short",
            id: "rm-l8",
            level: 8,
            prompt:
              "In the CaCO₃ + HCl experiment, three curves (A, B, C) with the same total volume but different initial gradients are obtained using different acid concentrations. Explain what the identical final volume tells you, and why curve A (steepest) represents the highest concentration.",
            keywords: [
              "limiting reagent",
              "conservation of mass",
              "same amount",
              "moles",
              "concentration",
              "frequency",
              "collision",
              "steeper",
              "faster",
              "total volume",
            ],
            minKeywords: 4,
            sample:
              "The identical final volume shows that the same amount (moles) of CaCO₃ was used in all three experiments — the total CO₂ produced is determined by the limiting reagent (CaCO₃), not the acid concentration. Curve A has the steepest initial gradient because a higher concentration of HCl means more H⁺ ions per unit volume, increasing the frequency of successful collisions with CaCO₃ surfaces. More successful collisions per second = faster initial rate.",
          },
        ],
      },
    },
    {
      id: "factors",
      name: "Factors affecting rate of reaction",
      descriptor: "Explain how temperature, concentration, surface area and catalysts each change reaction rate.",
      guided: [
        {
          level: 2,
          body: "Four main factors affect the rate of a chemical reaction: (1) temperature — increasing temperature increases rate; (2) concentration — increasing concentration increases rate; (3) surface area — increasing surface area increases rate; (4) catalysts — adding a catalyst increases rate.",
        },
        {
          level: 4,
          body: "Each factor links to the collision theory: temperature increases the average kinetic energy of particles (more exceed Ea); higher concentration means more particles in the same volume (more frequent collisions); greater surface area exposes more particles to collisions (similar to increasing concentration but moles unchanged); a catalyst lowers the activation energy so more collisions are successful at the same temperature.",
        },
        {
          level: 6,
          body: "Surface area vs concentration compared: increasing surface area exposes more particles on the reactant surface, increasing the number available to collide — but the total amount (moles) of reactant does not change, so the final amount of product is the same. In contrast, increasing concentration adds more moles of reactant, which can change the total amount of product if the other reagent is in excess. Mechanically grinding solids to fine powders exploits the surface-area effect cheaply, with no extra reagents.",
        },
        {
          level: 8,
          body: "Industrial context from the textbook: in 2008, combustible sugar dust caused a fatal explosion — finely divided sugar has an enormously larger surface area than granular sugar, so the oxidation reaction proceeds at explosive speed. This is an industrial hazard in sugar and flour refineries, which extract and filter air to prevent dust clouds. The same principle applies to coal dust and metal powders. Recognising the surface-area effect is essential for both accelerating desired reactions and preventing dangerous uncontrolled ones.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "fa-l2",
            level: 2,
            prompt:
              "A student adds powdered calcium carbonate instead of marble chips to hydrochloric acid. What effect does this have on the rate of reaction?",
            options: [
              { id: "a", text: "The rate decreases because the powder dissolves" },
              { id: "b", text: "The rate increases because the surface area increases", correct: true },
              { id: "c", text: "The rate stays the same because the mass is the same" },
              { id: "d", text: "The rate increases because the concentration increases" },
            ],
            explanation:
              "Powdering the calcium carbonate greatly increases the surface area exposed to the acid, so more CaCO₃ particles are available for collisions per second. The mass (and moles) of CaCO₃ is unchanged.",
          },
          {
            type: "fill",
            id: "fa-l4",
            level: 4,
            prompt:
              "In the sodium thiosulfate and hydrochloric acid experiment, the ▁ of the reaction mixture is the independent variable that is changed to study how it affects the rate.",
            answers: ["temperature", "temperature of the reaction mixture"],
            explanation:
              "In the textbook experiment, water baths at 25°C, 35°C, 45°C, 55°C, and 65°C are used to set the temperature of the sodium thiosulfate solution before adding HCl. Temperature is the independent variable.",
          },
          {
            type: "short",
            id: "fa-l6",
            level: 6,
            prompt:
              "Using the collision theory, explain why increasing the concentration of sodium thiosulfate increases the rate of the disappearing-cross reaction with hydrochloric acid.",
            keywords: [
              "concentration",
              "more particles",
              "frequency",
              "collision",
              "activation energy",
              "successful",
              "rate",
              "per unit volume",
              "thiosulfate",
              "sulfur",
            ],
            minKeywords: 4,
            sample:
              "Increasing the concentration of sodium thiosulfate means more thiosulfate ions are present per unit volume of solution. This increases the frequency with which thiosulfate ions collide with hydrogen ions from HCl. More frequent collisions means more collisions per second that meet all three conditions of the collision theory (correct orientation, sufficient energy ≥ Ea). The rate of sulfur formation — measured by the disappearing cross — increases.",
          },
          {
            type: "short",
            id: "fa-l8",
            level: 8,
            prompt:
              "In 2008, a fatal explosion occurred in a sugar refinery caused by combustible sugar dust. Explain why powdered sugar reacts with oxygen so much faster than granular sugar, and link this to an industrial safety precaution.",
            keywords: [
              "surface area",
              "powder",
              "more particles",
              "exposed",
              "frequency",
              "collision",
              "explosive",
              "dust",
              "air",
              "filter",
              "refinery",
              "moles unchanged",
            ],
            minKeywords: 4,
            sample:
              "Powdered sugar has a vastly greater surface area than granular sugar — the same mass of sugar is divided into millions of tiny particles, exposing far more molecules to oxygen in the air. This dramatically increases the frequency of successful collisions between sugar molecules and oxygen, so the combustion reaction proceeds at an explosive rate. The total amount of reactant (moles of sugar) is unchanged, but the rate is orders of magnitude higher. Sugar and flour refineries extract and filter the air to prevent explosive dust clouds from forming.",
          },
        ],
      },
    },
    {
      id: "activation",
      name: "Activation energy & the Arrhenius relationship",
      descriptor: "Describe activation energy and explain how temperature and catalysts change it.",
      guided: [
        {
          level: 2,
          body: "Activation energy (Ea) is the minimum energy that colliding particles must have for a reaction to proceed. It is measured in kJ mol⁻¹. Reactions with low Ea proceed quickly at room temperature; reactions with large Ea require significant heating.",
        },
        {
          level: 4,
          body: "An energy profile diagram shows reactants at one energy level and products at a lower level (for an exothermic reaction). The hump between them is the transition state — the highest energy point along the reaction pathway. The height of the hump from the reactant level is the activation energy Ea. ΔH is the energy difference between reactants and products.",
        },
        {
          level: 6,
          body: "Increasing temperature does not lower Ea — it raises the average kinetic energy of the particles so that a larger fraction can overcome the fixed Ea barrier. A catalyst lowers Ea by providing an alternative reaction pathway (shown as a lower hump on the energy profile diagram). Both effects increase reaction rate, but by different mechanisms. Only a catalyst changes Ea; temperature changes the energy distribution of the molecules.",
        },
        {
          level: 8,
          body: "From the textbook Arrhenius experiment: thiosulfate + HCl at 10°C takes 250 s; at 21°C it takes 87.3 s; at 37°C it takes 31.2 s; at 42°C it takes 25.9 s. Rate ≈ 1/time. A plot of rate vs temperature is a curve; a linearised plot of 1/T (K⁻¹) vs ln(rate) gives a straight line — the Arrhenius relationship. The gradient of this line equals −Ea/R, allowing Ea to be calculated. The SI unit of Ea is kJ mol⁻¹ and the activation energy is temperature-independent.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "ae-l2",
            level: 2,
            prompt:
              "What does the activation energy (Ea) of a reaction represent?",
            options: [
              { id: "a", text: "The energy released when products form" },
              { id: "b", text: "The minimum energy colliding particles must have for a reaction to occur", correct: true },
              { id: "c", text: "The total energy of all particles in the mixture" },
              { id: "d", text: "The difference in energy between reactants and products" },
            ],
            explanation:
              "Activation energy is the minimum energy barrier that must be overcome for a reaction to proceed. Only collisions where both particles have kinetic energy ≥ Ea are successful.",
          },
          {
            type: "fill",
            id: "ae-l4",
            level: 4,
            prompt:
              "On an energy profile diagram for an exothermic reaction, the activation energy is represented by the height of the ▁ above the reactants' energy level.",
            answers: [
              "transition state",
              "hump",
              "peak",
              "transition state (hump)",
            ],
            explanation:
              "The transition state is the highest-energy point on the reaction pathway. The height from the reactants' energy level to the transition state is the activation energy Ea.",
          },
          {
            type: "short",
            id: "ae-l6",
            level: 6,
            prompt:
              "Explain the difference between how temperature and a catalyst each increase the rate of a reaction. Which one changes the activation energy?",
            keywords: [
              "temperature",
              "kinetic energy",
              "fraction",
              "distribution",
              "catalyst",
              "alternative pathway",
              "lower activation energy",
              "same ea",
              "ea unchanged",
              "more molecules",
            ],
            minKeywords: 4,
            sample:
              "Temperature increases the average kinetic energy of particles, shifting the Maxwell–Boltzmann distribution so that a larger fraction of molecules have energy ≥ Ea. Ea itself is unchanged. A catalyst provides an alternative reaction pathway with a lower activation energy — so at the same temperature, more molecules can overcome the new, lower Ea. Only a catalyst changes the activation energy; temperature only changes the energy distribution of molecules.",
          },
          {
            type: "short",
            id: "ae-l8",
            level: 8,
            prompt:
              "In the Arrhenius experiment, the sodium thiosulfate + HCl reaction took 250 s at 10°C and 25.9 s at 42°C. Calculate the approximate rate (s⁻¹) at each temperature, and explain why a plot of 1/T (K⁻¹) versus ln(rate) gives a straight line rather than a curve.",
            keywords: [
              "0.004",
              "0.0386",
              "1/time",
              "rate",
              "1/t",
              "kelvin",
              "ln",
              "linear",
              "arrhenius",
              "gradient",
              "ea/r",
            ],
            minKeywords: 4,
            sample:
              "Rate at 10°C = 1/250 = 0.00400 s⁻¹; rate at 42°C = 1/25.9 = 0.0386 s⁻¹. The Arrhenius equation is k = A·e^(−Ea/RT). Taking the natural log: ln(k) = ln(A) − Ea/R × (1/T). This is of the form y = mx + c, so a plot of ln(rate) vs 1/T gives a straight line with gradient −Ea/R. A curve arises when plotting rate vs T directly because the relationship is exponential; the logarithmic transformation linearises it, making the gradient easy to calculate.",
          },
        ],
      },
    },
  ],
}
