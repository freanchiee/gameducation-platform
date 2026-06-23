import type { StrandhootPack } from "../engine/types"

export const movementCritA: StrandhootPack = {
  slug: "movement-crit-a",
  title: "Redox, Electrochemistry & Diffusion",
  subject: "MYP Chemistry",
  criterion: "A",
  topic: "Redox reactions, electrochemical cells & diffusion",
  accent: "#1b7888",
  icon: "⚡",
  statementOfInquiry:
    "The changes we observe in a chemical system can help us to infer information about the movement of molecules and their properties.",
  estMinutes: 28,
  intro:
    "Electrons and ions are in constant motion — and their movement drives everything from batteries to metal extraction. Each strand targets a core topic from Chapter 10: Movement, levelling up from recall to analysis across redox reactions, the reactivity series, electrochemical cells and diffusion.",
  badges: [
    {
      id: "redox-expert",
      label: "Redox Expert",
      icon: "🔁",
      description: "Reach Level 8 on Redox reactions",
      strandId: "redox",
      atLevel: 8,
    },
    {
      id: "series-master",
      label: "Reactivity Ranker",
      icon: "📊",
      description: "Reach Level 8 on Reactivity series",
      strandId: "reactivity",
      atLevel: 8,
    },
    {
      id: "cell-builder",
      label: "Cell Builder",
      icon: "🔋",
      description: "Reach Level 8 on Electrochemical cells",
      strandId: "cells",
      atLevel: 8,
    },
    {
      id: "diffusion-ace",
      label: "Diffusion Ace",
      icon: "💨",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Chapter 10: Movement",
      blurb: "Redox reactions, reactivity series, electrochemical cells and diffusion",
      icon: "⚡",
    },
  ],
  strands: [
    {
      id: "redox",
      name: "Redox reactions",
      descriptor: "Define oxidation and reduction in terms of electron transfer and identify oxidising/reducing agents.",
      guided: [
        {
          level: 2,
          body: "A redox reaction involves the transfer of electrons. Oxidation is the loss of electrons; reduction is the gain of electrons. The mnemonic OIL RIG helps: Oxidation Is Loss, Reduction Is Gain. When zinc metal is placed in copper(II) sulfate solution, the blue solution turns colourless and a red-brown copper solid forms.",
        },
        {
          level: 4,
          body: "In the zinc–copper(II) sulfate reaction, the net ionic equation removes spectator ions (sulfate): Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s). The two half-equations are: oxidation — Zn(s) → Zn²⁺(aq) + 2e⁻; reduction — Cu²⁺(aq) + 2e⁻ → Cu(s). These cannot occur separately; each requires the other.",
        },
        {
          level: 6,
          body: "Zinc is the reducing agent — it donates electrons to reduce Cu²⁺ ions, and is itself oxidised to Zn²⁺. Copper(II) ions are the oxidising agent — they accept electrons from zinc. At the surface of the zinc metal, electrons cannot move through the solution so they stay on the zinc surface, attracting Cu²⁺ ions which migrate through the solution, accept electrons and deposit as solid copper.",
        },
        {
          level: 8,
          body: "In any redox reaction, the species that is higher in the reactivity (or electrochemical) series is oxidised. In Zn + Cu²⁺ → Zn²⁺ + Cu, zinc (higher in the series) is oxidised; Cu²⁺ (lower in the series, stronger tendency to be reduced) acts as the oxidising agent. The change at the molecular level — electron movement from the zinc surface to copper ions in solution — explains both the colour change of the solution (Cu²⁺ is blue; Zn²⁺ is colourless) and the formation of red-brown copper solid. Oxidation state of zinc changes from 0 to +2; copper changes from +2 to 0.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "redox-l2",
            level: 2,
            prompt: "When zinc is placed in copper(II) sulfate solution, which observation confirms that a redox reaction has occurred?",
            options: [
              { id: "a", text: "The solution remains blue and no solid forms" },
              { id: "b", text: "A red-brown solid forms and the blue solution gradually turns colourless", correct: true },
              { id: "c", text: "The zinc gains mass and the solution darkens" },
              { id: "d", text: "Bubbles of gas are produced at the zinc surface" },
            ],
            explanation: "Copper ions (blue) are reduced to copper metal (red-brown solid) at the zinc surface. As Cu²⁺ is removed from solution, the blue colour fades to colourless.",
          },
          {
            type: "fill",
            id: "redox-l4",
            level: 4,
            prompt: "In the half-equation Zn(s) → Zn²⁺(aq) + 2e⁻, zinc undergoes ▁.",
            answers: ["oxidation", "oxidised"],
            explanation: "Zinc loses two electrons (OIL — Oxidation Is Loss), so it is oxidised. Its oxidation state changes from 0 to +2.",
          },
          {
            type: "short",
            id: "redox-l6",
            level: 6,
            prompt: "In the reaction Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s), identify the oxidising agent and the reducing agent. Explain each role.",
            keywords: ["oxidising agent", "reducing agent", "zinc", "copper", "electrons", "donates", "accepts", "oxidised", "reduced"],
            minKeywords: 3,
            sample: "Zinc is the reducing agent — it donates two electrons to copper(II) ions, causing them to be reduced to copper metal. Copper(II) ions are the oxidising agent — they accept electrons from zinc, causing zinc to be oxidised to Zn²⁺. The reducing agent is itself oxidised; the oxidising agent is itself reduced.",
          },
          {
            type: "short",
            id: "redox-l8",
            level: 8,
            prompt: "Explain, at the molecular level, why the colour of the copper sulfate solution changes during the zinc–copper(II) sulfate reaction. Include oxidation states and half-equations in your answer.",
            keywords: ["cu²⁺", "zn²⁺", "blue", "colourless", "oxidation state", "electrons", "half-equation", "surface", "reduction", "oxidation"],
            minKeywords: 4,
            sample: "Cu²⁺(aq) ions are responsible for the blue colour. As the reaction proceeds, Cu²⁺ ions migrate through the solution to the zinc surface, accept 2 electrons each (Cu²⁺ + 2e⁻ → Cu), and are deposited as red-brown solid copper. Their oxidation state changes from +2 to 0. As Cu²⁺ concentration falls, the blue colour fades to colourless. Simultaneously, zinc is oxidised (Zn → Zn²⁺ + 2e⁻, ox. state 0 → +2) and Zn²⁺ ions enter solution colourlessly.",
          },
        ],
      },
    },
    {
      id: "reactivity",
      name: "Reactivity series",
      descriptor: "Use the reactivity series to predict whether displacement reactions will occur.",
      guided: [
        {
          level: 2,
          body: "The reactivity series orders metals from most reactive (lithium at the top) to least reactive (gold at the bottom). A metal higher in the series will displace a metal ion lower in the series from its solution. Gold and silver are found native in nature because they are so unreactive.",
        },
        {
          level: 4,
          body: "Order (most to least reactive): Li, K, Na, Mg, Al, Mn, Zn, Fe, Ni, Sn, Pb, (H), Cu, Ag, Hg, Au. A metal higher in the series will displace the positive ions of a metal lower in the series from a compound, forcing those ions to be reduced. For example, zinc is above copper, so zinc displaces Cu²⁺ from copper sulfate solution.",
        },
        {
          level: 6,
          body: "The reactivity series reflects ease of oxidation — how readily a metal loses its valence electrons. Highly reactive metals (K, Na) lose electrons very easily and are found as compounds in nature (e.g. NaCl, KNO₃). Unreactive metals (Cu, Ag, Au) are found as native elements. In a displacement reaction, the more reactive metal is oxidised (loses electrons) and the less reactive metal ion is reduced (gains electrons). Hydrogen is included as a reference — metals above hydrogen react with acids; those below do not.",
        },
        {
          level: 8,
          body: "The reactivity series and the electrochemical series encode the same information: position reflects standard electrode potential. The higher a metal in the series, the more negative its standard electrode potential, the stronger its tendency to be oxidised (donate electrons). In the summative assessment data table, Mg reacted with Cu(NO₃)₂, Pb(NO₃)₂ and Zn(NO₃)₂ solutions but not MgSO₄ (can't displace itself); Zn reacted with Cu(NO₃)₂ and Pb(NO₃)₂ but not Zn(NO₃)₂ or MgSO₄ — consistent with the order Mg > Zn > Pb > Cu. No reaction occurs when a metal is placed in a solution of its own ions or in a solution of a more reactive metal's ions.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "react-l2",
            level: 2,
            prompt: "Which of the following reactions will proceed spontaneously, based on the reactivity series?",
            options: [
              { id: "a", text: "Copper + magnesium sulfate → copper sulfate + magnesium" },
              { id: "b", text: "Magnesium + copper(II) sulfate → magnesium sulfate + copper", correct: true },
              { id: "c", text: "Zinc + zinc sulfate → no reaction expected" },
              { id: "d", text: "Silver + zinc sulfate → silver sulfate + zinc" },
            ],
            explanation: "Magnesium is above copper in the reactivity series, so magnesium can displace Cu²⁺ ions from solution. Copper cannot displace Mg²⁺ (copper is below magnesium).",
          },
          {
            type: "fill",
            id: "react-l4",
            level: 4,
            prompt: "Gold is found in nature as a pure element rather than as a compound because it is ▁ in the reactivity series.",
            answers: ["very low", "low", "at the bottom", "unreactive", "very unreactive"],
            explanation: "Gold is at the bottom of the reactivity series — it does not readily lose electrons to form ions, so it remains as a native element rather than as a metal oxide or other compound.",
          },
          {
            type: "short",
            id: "react-l6",
            level: 6,
            prompt: "Explain why aluminium reacts with iron(III) oxide (thermite reaction: Al + Fe₂O₃ → Al₂O₃ + Fe), but iron does not react with aluminium oxide. Use the reactivity series in your answer.",
            keywords: ["reactivity series", "aluminium", "iron", "higher", "lower", "displace", "oxidised", "reduced", "electrons", "reactive"],
            minKeywords: 3,
            sample: "Aluminium is higher in the reactivity series than iron, so aluminium is more readily oxidised. Aluminium displaces iron ions from iron(III) oxide: aluminium is oxidised (Al → Al³⁺ + 3e⁻) and iron is reduced (Fe³⁺ + 3e⁻ → Fe). Iron cannot displace aluminium from aluminium oxide because iron is lower in the reactivity series and less easily oxidised than aluminium — the reaction would not be spontaneous.",
          },
          {
            type: "short",
            id: "react-l8",
            level: 8,
            prompt: "A student places strips of copper, zinc, lead and magnesium into solutions of their respective nitrates and records colour changes. The results show Mg reacts with all three other nitrate solutions, Zn reacts with Cu(NO₃)₂ and Pb(NO₃)₂ only, Pb reacts with Cu(NO₃)₂ only, and Cu reacts with none. Deduce the order of reactivity and explain your reasoning.",
            keywords: ["mg", "zn", "pb", "cu", "order", "reactivity", "displace", "oxidised", "higher", "series", "electrons", "consistent"],
            minKeywords: 4,
            sample: "The order from most to least reactive is Mg > Zn > Pb > Cu. Mg displaces all three others because it is the most reactive and highest in the series. Zn displaces Pb²⁺ and Cu²⁺ but not Mg²⁺ — placing Zn below Mg but above Pb. Pb displaces only Cu²⁺ — placing Pb below Zn but above Cu. Cu displaces none — it is lowest in the series. Each displacement confirms the more reactive metal is oxidised (loses electrons) and the less reactive metal ion is reduced.",
          },
        ],
      },
    },
    {
      id: "cells",
      name: "Electrochemical cells",
      descriptor: "Describe the components and operation of voltaic and electrolytic cells.",
      guided: [
        {
          level: 2,
          body: "A voltaic (galvanic) cell converts chemical energy into electrical energy through a spontaneous redox reaction. An electrolytic cell does the opposite — it uses electrical energy to drive a non-spontaneous chemical reaction. In both cells, oxidation occurs at the anode and reduction occurs at the cathode (AnOx RedCat).",
        },
        {
          level: 4,
          body: "In a simple Zn–Cu voltaic cell: the zinc electrode (anode) is in 1.0 mol dm⁻³ ZnSO₄ and the copper electrode (cathode) is in 1.0 mol dm⁻³ CuSO₄. A salt bridge (filter paper soaked in KNO₃ solution) completes the circuit by allowing ion movement between the half-cells. Electrons flow through the external wire from anode (Zn, −) to cathode (Cu, +). Half-equations: Zn(s) → Zn²⁺(aq) + 2e⁻ (oxidation); Cu²⁺(aq) + 2e⁻ → Cu(s) (reduction).",
        },
        {
          level: 6,
          body: "The salt bridge serves a crucial role: as electrons leave the anode half-cell, positive charge builds up (Zn²⁺ entering solution); anions from the salt bridge migrate into the anode half-cell to restore charge balance. In the cathode half-cell, Cu²⁺ is removed from solution, so cations from the salt bridge migrate in to restore balance. Without the salt bridge, charge would build up and current would stop. The electrochemical series predicts which metal will be oxidised: the one higher in the series (greater tendency to lose electrons) will be the anode.",
        },
        {
          level: 8,
          body: "In electrolysis of molten zinc chloride (a non-spontaneous process requiring an external power supply): at the cathode (negative electrode), Zn²⁺ ions are reduced — Zn²⁺(l) + 2e⁻ → Zn(l); at the anode (positive electrode), Cl⁻ ions are oxidised — 2Cl⁻(l) → Cl₂(g) + 2e⁻. The solid ZnCl₂ must be molten (ions locked in lattice cannot move in solid state) or dissolved for ions to be free to carry charge. Electrolytic cells differ from voltaic cells in electrode polarity: in voltaic cells the anode is negative (source of electrons); in electrolytic cells the anode is positive (connected to the + terminal of the external supply). The mnemonic AnOx RedCat applies to both.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "cell-l2",
            level: 2,
            prompt: "In any electrochemical cell, oxidation always takes place at the:",
            options: [
              { id: "a", text: "Cathode" },
              { id: "b", text: "Salt bridge" },
              { id: "c", text: "Anode", correct: true },
              { id: "d", text: "Electrolyte" },
            ],
            explanation: "AnOx RedCat — oxidation at the Anode, reduction at the Cathode. This applies to both voltaic and electrolytic cells.",
          },
          {
            type: "fill",
            id: "cell-l4",
            level: 4,
            prompt: "In a Zn–Cu voltaic cell, electrons flow through the external wire from the ▁ electrode to the copper electrode.",
            answers: ["zinc", "anode", "zinc anode"],
            explanation: "Zinc is oxidised at the anode, releasing electrons. These electrons flow through the external circuit from the zinc anode to the copper cathode, where Cu²⁺ is reduced.",
          },
          {
            type: "short",
            id: "cell-l6",
            level: 6,
            prompt: "Explain the role of the salt bridge in a voltaic cell. What would happen to the cell if the salt bridge were removed?",
            keywords: ["salt bridge", "ions", "charge", "balance", "anions", "cations", "anode", "cathode", "current", "circuit", "stop"],
            minKeywords: 3,
            sample: "The salt bridge maintains electrical neutrality in both half-cells. At the anode, Zn²⁺ ions enter solution — the salt bridge supplies anions (e.g. NO₃⁻) to balance this positive charge. At the cathode, Cu²⁺ is removed from solution — the salt bridge supplies cations to replace them. Without the salt bridge, charge imbalance would build up rapidly, stopping ion and electron movement and halting the current.",
          },
          {
            type: "short",
            id: "cell-l8",
            level: 8,
            prompt: "Compare a voltaic cell and an electrolytic cell. Use the electrolysis of molten zinc chloride as your electrolytic example — write the half-equations and explain why the zinc chloride must be molten rather than solid.",
            keywords: ["voltaic", "electrolytic", "spontaneous", "non-spontaneous", "anode", "cathode", "zn²⁺", "cl⁻", "molten", "ions", "lattice", "move"],
            minKeywords: 4,
            sample: "A voltaic cell converts chemical energy to electrical energy via a spontaneous redox reaction (no power supply needed). An electrolytic cell uses electrical energy to drive a non-spontaneous reaction. In molten ZnCl₂ electrolysis: cathode — Zn²⁺(l) + 2e⁻ → Zn(l); anode — 2Cl⁻(l) → Cl₂(g) + 2e⁻. The ZnCl₂ must be molten because in the solid state, ions are locked in a crystalline lattice and cannot move to carry charge between electrodes. Only when molten (or dissolved) are the ions free to migrate.",
          },
        ],
      },
    },
    {
      id: "diffusion",
      name: "Diffusion",
      descriptor: "Explain diffusion in terms of particle movement from high to low concentration.",
      guided: [
        {
          level: 2,
          body: "Diffusion is the spreading or scattering of gaseous or liquid materials from an area of high concentration to an area of low concentration. Everyday examples include smelling food cooking or perfume across a room, and the colour of a tea bag spreading through hot water without stirring.",
        },
        {
          level: 4,
          body: "Diffusion occurs because particles are in constant random motion (kinetic theory). Gases diffuse faster than liquids because gas molecules have more kinetic energy and move more freely with larger spaces between them. In the HCl–ammonia demonstration, HCl gas and NH₃ gas diffuse from opposite ends of a glass tube and react where they meet to form white ammonium chloride: HCl(g) + NH₃(g) → NH₄Cl(s). The white ring forms closer to the HCl end because NH₃ (Mr = 17) diffuses faster than HCl (Mr = 36.5).",
        },
        {
          level: 6,
          body: "Graham's law of diffusion states that the rate of diffusion is inversely proportional to the square root of the molar mass. NH₃ (Mr = 17) diffuses faster than HCl (Mr = 36.5) — their rate ratio is √(36.5/17) ≈ 1.47, so NH₃ diffuses about 1.5 times faster. This explains why the white NH₄Cl ring forms closer to the HCl end: the faster-moving NH₃ molecules travel further along the tube before meeting the slower HCl molecules.",
        },
        {
          level: 8,
          body: "The zinc–iodine demonstration shows diffusion involving a redox reaction. Iodine (purple-black solid, Mr = 254) sublimates when heated and the iodine vapour diffuses through air. Adding water to a Zn–I₂ mixture initiates the exothermic redox reaction: Zn(s) + I₂(s) → ZnI₂(s) (zinc iodide, a soluble white salt). Zinc is oxidised (Zn → Zn²⁺ + 2e⁻) and iodine is reduced (I₂ + 2e⁻ → 2I⁻). The heat released drives further iodine sublimation — the purple iodine vapour visible above the reaction mixture demonstrates gaseous diffusion away from the high-concentration reaction site. The much higher Mr of I₂ (254 vs 17 for NH₃) means I₂ vapour diffuses far more slowly than NH₃.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "diff-l2",
            level: 2,
            prompt: "In the hydrochloric acid–ammonia diffusion demonstration, a white solid ring of ammonium chloride forms inside the tube. What does the position of the ring — closer to the HCl end — tell us?",
            options: [
              { id: "a", text: "HCl diffuses faster than ammonia" },
              { id: "b", text: "Ammonia diffuses faster than HCl and travels further along the tube", correct: true },
              { id: "c", text: "Both gases diffuse at exactly the same rate" },
              { id: "d", text: "The ring forms at the midpoint regardless of molar mass" },
            ],
            explanation: "NH₃ (Mr = 17) diffuses faster than HCl (Mr = 36.5) because it is lighter. The NH₃ molecules travel further before meeting HCl molecules, so the white ring forms closer to the HCl cotton wool end.",
          },
          {
            type: "fill",
            id: "diff-l4",
            level: 4,
            prompt: "Diffusion is the movement of particles from an area of ▁ concentration to an area of low concentration.",
            answers: ["high", "higher"],
            explanation: "Particles move down a concentration gradient — from high to low concentration — due to random thermal motion. This net movement continues until the concentration is uniform throughout.",
          },
          {
            type: "short",
            id: "diff-l6",
            level: 6,
            prompt: "Use Graham's law to explain why ammonia diffuses faster than hydrogen chloride gas. Calculate the approximate ratio of their rates of diffusion (Mr of NH₃ = 17; Mr of HCl = 36.5).",
            keywords: ["graham", "molar mass", "square root", "inversely proportional", "nh₃", "hcl", "17", "36.5", "faster", "lighter", "1.5"],
            minKeywords: 3,
            sample: "Graham's law states that the rate of diffusion is inversely proportional to the square root of the molar mass. Rate ratio = √(Mr of HCl / Mr of NH₃) = √(36.5 / 17) = √2.15 ≈ 1.47. So NH₃ diffuses approximately 1.5 times faster than HCl. NH₃ is lighter (Mr = 17) so its molecules have higher average speed at the same temperature.",
          },
          {
            type: "short",
            id: "diff-l8",
            level: 8,
            prompt: "In the zinc–iodine demonstration, water is added to a Zn and I₂ mixture and a purple vapour is observed diffusing away. Write the overall redox equation, identify the oxidising and reducing agents, and explain why the iodine vapour diffuses slowly compared with ammonia gas.",
            keywords: ["zni₂", "zinc iodide", "zn²⁺", "i⁻", "oxidised", "reduced", "oxidising agent", "reducing agent", "molar mass", "254", "sublimation", "slowly", "graham"],
            minKeywords: 4,
            sample: "Overall equation: Zn(s) + I₂(s) → ZnI₂(s). Zinc is oxidised (Zn → Zn²⁺ + 2e⁻) — it is the reducing agent. Iodine is reduced (I₂ + 2e⁻ → 2I⁻) — it is the oxidising agent. The purple iodine vapour (I₂ gas, Mr = 254) diffuses very slowly compared with NH₃ (Mr = 17) because by Graham's law, rate of diffusion ∝ 1/√Mr. I₂ vapour is √(254/17) ≈ 3.9 times slower than NH₃. The exothermic reaction generates heat that causes further sublimation of solid iodine, producing the purple gas seen diffusing away from the reaction site.",
          },
        ],
      },
    },
  ],
}
