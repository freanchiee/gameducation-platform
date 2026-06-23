import type { StrandhootPack } from "../engine/types"

export const digestionCritA: StrandhootPack = {
  slug: "digestion-crit-a",
  title: "Digestion & Nutrition",
  subject: "MYP Biology",
  criterion: "A",
  topic: "Enzymes, nutrients and absorption",
  accent: "#1b7888",
  icon: "🍎",
  statementOfInquiry:
    "Each component in a system must perform its specific function at the right time and place for the system as a whole to be successful.",
  estMinutes: 25,
  intro:
    "Trace a meal from mouth to bloodstream. Each strand zooms in on a different part of the digestive system — organs and enzymes, macronutrients, absorption structures, and sensory receptors — levelling from recall to deep analysis.",
  badges: [
    { id: "organs", label: "Organ Expert", icon: "🫁", description: "Reach Level 8 on Digestive system", strandId: "digestive-system", atLevel: 8 },
    { id: "nutrients", label: "Nutrition Specialist", icon: "🥗", description: "Reach Level 8 on Macronutrients", strandId: "macronutrients", atLevel: 8 },
    { id: "villi", label: "Villi Champion", icon: "🔬", description: "Reach Level 8 on Absorption and villi", strandId: "villi", atLevel: 8 },
    { id: "master", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Chapter 4: Function", blurb: "Digestion, nutrients, absorption and sensory receptors", icon: "🍎" }],
  strands: [
    {
      id: "digestive-system",
      name: "Digestive system",
      descriptor: "Identify the organs and enzymes that break down food from mouth to large intestine.",
      guided: [
        {
          level: 2,
          body: "Digestion starts in the mouth, where salivary amylase breaks starch into maltose. Teeth grind food (mechanical digestion). Food moves to the stomach, where pepsin digests proteins and HCl makes the stomach acidic (pH 2).",
        },
        {
          level: 4,
          body: "In the stomach, churning mixes food with gastric juice (pepsin + HCl). The low pH (2) activates pepsin and kills bacteria. Food passes to the small intestine, where pancreatic lipase breaks fats into fatty acids and glycerol, and trypsin breaks proteins into amino acids. Bile (from the liver, stored in the gallbladder) emulsifies fats — breaking large droplets into smaller ones for lipase to act on.",
        },
        {
          level: 6,
          body: "Each enzyme works best at a specific pH: salivary amylase at neutral pH (mouth), pepsin at pH 2 (stomach), lipase and trypsin at alkaline pH (small intestine). Bile is not an enzyme — it emulsifies fat by reducing droplet size, increasing surface area for lipase. The large intestine reabsorbs water from undigested material, forming faeces. The order of organs matters: starch must be partially digested before acid denaturation of amylase in the stomach.",
        },
        {
          level: 8,
          body: "The digestive system is a cascade of pH-specific enzyme reactions: salivary amylase (pH 6.8, starch→maltose) → pepsin (pH 2, protein→peptides, activated from pepsinogen by HCl) → trypsin (pH 8, peptides→amino acids, secreted by pancreas as trypsinogen — a zymogen) → lipase (pH 8, triglycerides→fatty acids + glycerol). Bile salts (sodium taurocholate) act as detergents: hydrophilic heads face water, hydrophobic tails face fat, forming micelles — increasing surface area ~1000× for lipase. The large intestine houses the microbiome (~38 trillion bacteria) that ferment dietary fibre, producing short-chain fatty acids absorbed through the colon wall.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "ds-l2",
            level: 2,
            prompt: "Which enzyme in the mouth begins the digestion of starch?",
            options: [
              { id: "a", text: "Pepsin" },
              { id: "b", text: "Lipase" },
              { id: "c", text: "Salivary amylase", correct: true },
              { id: "d", text: "Trypsin" },
            ],
            explanation: "Salivary amylase is secreted by salivary glands and breaks starch into maltose — digestion of carbohydrates begins in the mouth, not the stomach.",
          },
          {
            type: "fill",
            id: "ds-l4",
            level: 4,
            prompt: "Bile is produced by the ▁ and stored in the gallbladder. It emulsifies fats but does not digest them chemically.",
            answers: ["liver"],
            explanation: "The liver produces bile salts. Bile is stored in the gallbladder and released into the small intestine. It breaks large fat globules into tiny droplets (emulsification), increasing surface area for lipase — but bile itself is not an enzyme.",
          },
          {
            type: "short",
            id: "ds-l6",
            level: 6,
            prompt: "Explain why the stomach has a pH of 2 and how this affects the enzyme pepsin and the enzyme salivary amylase.",
            keywords: ["hcl", "pepsin", "optimal", "ph 2", "acidic", "amylase", "denatured", "activates", "stomach", "denature"],
            minKeywords: 2,
            sample: "HCl secreted by stomach cells creates pH 2. This activates pepsin (its optimal pH is ~2) which digests proteins into peptides. Salivary amylase from the mouth is denatured in the stomach's acid — its active site changes shape so it can no longer bind starch. The correct pH is essential for each enzyme to function.",
          },
          {
            type: "short",
            id: "ds-l8",
            level: 8,
            prompt: "Pepsin is secreted as the inactive precursor pepsinogen. Explain why this zymogen strategy is used and describe the cascade of enzyme activation from mouth to small intestine, naming enzymes, substrates and products at each stage.",
            keywords: ["pepsinogen", "zymogen", "hcl", "activated", "pepsin", "protein", "peptides", "trypsinogen", "trypsin", "amylase", "starch", "maltose", "lipase", "triglycerides", "fatty acids", "cascade"],
            minKeywords: 3,
            sample: "Pepsinogen (inactive) is stored to prevent self-digestion of stomach cells — HCl converts it to active pepsin. This is the zymogen strategy: store enzyme in inactive form, activate only at the right site. Cascade: mouth — salivary amylase converts starch→maltose (pH 6.8); stomach — pepsin converts protein→peptides (pH 2); small intestine — trypsinogen (from pancreas) activated by enterokinase → trypsin converts peptides→amino acids (pH 8); lipase converts triglycerides→fatty acids+glycerol (pH 8). Each enzyme is pH-specific to its location, ensuring efficient digestion.",
          },
        ],
      },
    },
    {
      id: "macronutrients",
      name: "Macronutrients",
      descriptor: "Compare the structure, functions and dietary sources of carbohydrates, proteins and lipids.",
      guided: [
        {
          level: 2,
          body: "The three macronutrients are carbohydrates, proteins and lipids (fats). Carbohydrates provide energy. Proteins are needed for growth and repair. Lipids store energy. Dietary fibre (cellulose) is indigestible but keeps the gut healthy.",
        },
        {
          level: 4,
          body: "Carbohydrates: made of glucose units; starch (storage in plants), glycogen (storage in liver and muscle). Proteins: made of 20 types of amino acids; functions include enzymes, antibodies, and structural proteins for growth and repair. Lipids: made of glycerol + 3 fatty acids (triglycerides); form cell membranes and hormones; insulate the body. Fibre: indigestible cellulose from plant cell walls; prevents constipation by adding bulk to faeces.",
        },
        {
          level: 6,
          body: "Carbohydrates are the primary energy source: glucose is used in cellular respiration (C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O). Excess glucose is converted to glycogen (glycogenesis) in the liver for short-term storage, or to fat for long-term storage. Proteins provide essential amino acids (8 that cannot be synthesised by the body). Lipids are energy-dense (9 kcal/g vs 4 kcal/g for carbs/proteins); phospholipids form the bilayer of cell membranes; cholesterol is a precursor to steroid hormones (oestrogen, testosterone, cortisol).",
        },
        {
          level: 8,
          body: "Carbohydrate metabolism: glucose enters glycolysis → pyruvate → acetyl-CoA → Krebs cycle. Insulin stimulates glycogen synthesis; glucagon stimulates glycogenolysis. Protein quality is measured by essential amino acid profile — animal proteins are 'complete'; plant proteins may be limiting in lysine or methionine. Lipid function is structural: the fluid mosaic model of the membrane requires both phospholipids (amphipathic: hydrophilic head, hydrophobic tails) and cholesterol (increases membrane fluidity). Dietary fibre acts as a prebiotic — feeding gut microbiome bacteria (Lactobacillus, Bifidobacterium) that produce short-chain fatty acids (butyrate), reducing colorectal cancer risk.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "mn-l2",
            level: 2,
            prompt: "Which macronutrient is mainly used for growth and repair of tissues?",
            options: [
              { id: "a", text: "Carbohydrates" },
              { id: "b", text: "Lipids" },
              { id: "c", text: "Proteins", correct: true },
              { id: "d", text: "Dietary fibre" },
            ],
            explanation: "Proteins are made of amino acids and are the body's main building material — used to repair damaged cells and build new tissues such as muscle.",
          },
          {
            type: "fill",
            id: "mn-l4",
            level: 4,
            prompt: "Excess glucose in the blood is converted to ▁ and stored in the liver and muscle cells.",
            answers: ["glycogen"],
            explanation: "The hormone insulin triggers glycogenesis — the conversion of excess glucose into glycogen for storage. Glycogen can be quickly reconverted to glucose when blood sugar falls.",
          },
          {
            type: "short",
            id: "mn-l6",
            level: 6,
            prompt: "Explain two reasons why lipids are important in the body beyond just energy storage.",
            keywords: ["cell membrane", "phospholipid", "bilayer", "hormone", "cholesterol", "insulation", "steroid", "structural", "function"],
            minKeywords: 2,
            sample: "Lipids form the phospholipid bilayer of every cell membrane — the hydrophobic tails face inward, keeping the cell's contents separate from surroundings. Cholesterol within the membrane regulates fluidity. Additionally, lipids are precursors to steroid hormones (e.g. oestrogen, testosterone, cortisol) that regulate metabolism, reproduction and stress responses — far beyond simple energy storage.",
          },
          {
            type: "short",
            id: "mn-l8",
            level: 8,
            prompt: "A vegan diet lacks several animal-derived proteins. Explain what 'essential amino acids' means, identify which are most likely to be limiting in a plant-based diet, and explain how dietary fibre benefits gut health beyond preventing constipation.",
            keywords: ["essential amino acids", "lysine", "methionine", "cannot synthesise", "complete protein", "fibre", "microbiome", "butyrate", "prebiotic", "colorectal", "gut bacteria", "fermentation"],
            minKeywords: 3,
            sample: "Essential amino acids (8 in adults) cannot be synthesised by the body and must come from food. Plant proteins are often 'incomplete' — limiting in lysine (cereals) or methionine (legumes). Combining grains + legumes provides all essentials. Dietary fibre (indigestible cellulose and pectin) feeds gut microbiome bacteria (Lactobacillus, Bifidobacterium) — a prebiotic effect. These bacteria ferment fibre to produce butyrate (a short-chain fatty acid) that nourishes colon cells and reduces colorectal cancer risk.",
          },
        ],
      },
    },
    {
      id: "villi",
      name: "Absorption and villi",
      descriptor: "Explain how the structure of villi and microvilli maximises absorption in the small intestine.",
      guided: [
        {
          level: 2,
          body: "Villi are tiny finger-like projections lining the small intestine. They increase the surface area for absorption. Glucose and amino acids pass into the blood; fatty acids and glycerol pass into lymph vessels called lacteals.",
        },
        {
          level: 4,
          body: "Villi increase the surface area of the small intestine by ~600 times. Each villus contains: capillaries (absorb glucose and amino acids into blood), lacteals (absorb fatty acids and glycerol as chylomicrons into the lymph system). The villus epithelium is one cell thick (thin wall = short diffusion distance). Microvilli (brush border) on the surface of epithelial cells further increase surface area.",
        },
        {
          level: 6,
          body: "The four structural adaptations of villi for efficient absorption: (1) Large surface area — villi + microvilli increase total area to ~250 m²; (2) Thin epithelium — single layer of cells, ~0.2 μm, reduces diffusion distance; (3) Rich blood supply — capillaries constantly carry absorbed nutrients away, maintaining a steep concentration gradient; (4) Lacteals — carry chylomicrons (triglycerides re-assembled with protein) into the lymphatic system, bypassing the portal blood circulation. Glucose and amino acids move by facilitated diffusion and active transport against concentration gradients.",
        },
        {
          level: 8,
          body: "Glucose absorption uses a sodium-glucose linked transporter (SGLT1) on the apical membrane — sodium's electrochemical gradient drives glucose into cells against its concentration gradient (secondary active transport, using energy from the Na⁺/K⁺ ATPase pump). Glucose then exits the basolateral membrane via GLUT2 (facilitated diffusion). Fatty acids and glycerol are lipophilic — they diffuse directly through the phospholipid membrane, are re-esterified into triglycerides in the smooth ER, packaged with apolipoprotein B into chylomicrons (>200 nm), and exocytosed into lacteals. Chylomicrons are too large for blood capillaries — hence the lymph route. Surface area is maximised by three levels: circular folds (plicae circulares) → villi → microvilli, achieving ~250 m² total.",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "vi-l2",
            level: 2,
            prompt: "Where in the body are villi found and what is their main function?",
            options: [
              { id: "a", text: "In the stomach — to churn food" },
              { id: "b", text: "In the large intestine — to absorb water" },
              { id: "c", text: "In the small intestine — to increase surface area for absorption", correct: true },
              { id: "d", text: "In the mouth — to begin chemical digestion" },
            ],
            explanation: "Villi are finger-like projections in the small intestine. Their main role is to dramatically increase the surface area available for absorbing digested nutrients into the blood and lymph.",
          },
          {
            type: "fill",
            id: "vi-l4",
            level: 4,
            prompt: "Fatty acids and glycerol are absorbed into lymph vessels called ▁ inside the villi.",
            answers: ["lacteals"],
            explanation: "Lacteals are lymph capillaries inside each villus. Fatty acids and glycerol are re-packaged into chylomicrons and taken up by lacteals — they enter the lymphatic system rather than the blood directly.",
          },
          {
            type: "short",
            id: "vi-l6",
            level: 6,
            prompt: "Describe four structural features of villi that make them well adapted for absorption. Explain how each feature helps.",
            keywords: ["surface area", "microvilli", "thin epithelium", "capillaries", "lacteals", "concentration gradient", "diffusion distance", "blood supply", "villi"],
            minKeywords: 2,
            sample: "1. Large surface area — villi and microvilli (brush border) increase total area to ~250 m², allowing more absorption per unit time. 2. Thin epithelium — single cell layer (~0.2 μm) reduces diffusion distance so nutrients cross quickly. 3. Rich capillary blood supply — constantly removes absorbed glucose and amino acids, maintaining a steep concentration gradient. 4. Lacteals — absorb fatty acids and glycerol (as chylomicrons) into the lymphatic system, keeping the lipid pathway separate from blood.",
          },
          {
            type: "short",
            id: "vi-l8",
            level: 8,
            prompt: "Glucose and fatty acids are both absorbed in the small intestine but by very different mechanisms. Compare the transport mechanisms for each, explaining why fatty acids can cross the membrane directly while glucose cannot.",
            keywords: ["sglt1", "sodium", "secondary active transport", "glut2", "facilitated diffusion", "fatty acids", "lipophilic", "phospholipid", "chylomicrons", "apolipoprotein", "lacteal", "glucose", "polar", "active transport"],
            minKeywords: 3,
            sample: "Glucose is polar and cannot cross the hydrophobic phospholipid bilayer unaided. It enters villus epithelial cells via SGLT1 (sodium-glucose cotransporter) — secondary active transport using Na⁺ gradient maintained by Na⁺/K⁺ ATPase. Glucose exits the basolateral membrane via GLUT2 (facilitated diffusion). Fatty acids are nonpolar (lipophilic) and diffuse directly through the bilayer membrane. Inside the cell they are re-esterified into triglycerides, packaged with apolipoprotein B into chylomicrons, and exocytosed into lacteals (too large for blood capillaries).",
          },
        ],
      },
    },
    {
      id: "receptors-senses",
      name: "Receptors and senses",
      descriptor: "Classify sensory receptors and explain how they convert stimuli into nerve impulses.",
      guided: [
        {
          level: 2,
          body: "Receptors detect stimuli from the environment. Photoreceptors detect light (rods and cones in the eye). Mechanoreceptors detect touch and pressure (in skin and ear). Chemoreceptors detect chemicals (taste buds on tongue, olfactory epithelium in nose). Thermoreceptors detect temperature (in skin).",
        },
        {
          level: 4,
          body: "Photoreceptors in the retina: rods — detect light intensity only (monochromatic), work in dim light, spread across the retina; cones — detect colour (red, green, blue), work in bright light, concentrated in the fovea. Mechanoreceptors: Pacinian corpuscles in skin (deep pressure), hair cells in the inner ear (sound vibrations converted to nerve impulses). Chemoreceptors: taste buds detect sweet, sour, salty, bitter, umami; olfactory epithelium in the nasal cavity detects airborne chemicals.",
        },
        {
          level: 6,
          body: "The general sequence: stimulus → receptor → nerve impulse (action potential) → sensory neurone → brain interpretation. Receptors are transducers — they convert one form of energy into electrical energy (nerve impulse). Rods contain rhodopsin (a pigment); light bleaches rhodopsin, generating a nerve impulse. Cones contain photopsins (red, green, blue opsins). The fovea contains only cones — highest visual acuity in bright light. Pacinian corpuscles have onion-like lamellae that deform under deep pressure, opening mechanically-gated ion channels → generator potential → action potential.",
        },
        {
          level: 8,
          body: "Sensory transduction in rods: light isomerises 11-cis-retinal to all-trans-retinal → activates opsin → activates transducin (G-protein) → activates phosphodiesterase → cGMP hydrolysed → cGMP-gated Na⁺ channels close → membrane hyperpolarises → less glutamate released at synapse → bipolar cell depolarises → signal to ganglion cells → optic nerve. Rods have higher sensitivity (single photon can trigger response) due to the amplification cascade. Cones (3 types based on opsin peak absorption: ~420 nm blue, ~530 nm green, ~560 nm red) compare relative activation for colour vision. Olfactory receptors (ORs) are G-protein-coupled receptors — humans have ~400 functional OR genes; olfactory coding is combinatorial (each odour activates a pattern of ORs).",
        },
      ],
      response: {
        kind: "questions",
        questions: [
          {
            type: "mcq",
            id: "rs-l2",
            level: 2,
            prompt: "Which type of photoreceptor is responsible for colour vision and is most concentrated in the fovea?",
            options: [
              { id: "a", text: "Rods" },
              { id: "b", text: "Cones", correct: true },
              { id: "c", text: "Pacinian corpuscles" },
              { id: "d", text: "Chemoreceptors" },
            ],
            explanation: "Cones are colour-sensitive photoreceptors concentrated in the fovea (the central region of the retina). They require bright light to work. Rods are spread across the retina and detect light/dark (monochromatic).",
          },
          {
            type: "fill",
            id: "rs-l4",
            level: 4,
            prompt: "Pacinian corpuscles in the skin are examples of ▁, which detect deep pressure.",
            answers: ["mechanoreceptors", "mechanoreceptor"],
            explanation: "Mechanoreceptors respond to mechanical stimuli such as pressure, touch and vibration. Pacinian corpuscles are deep in the skin and respond to sustained or deep pressure, converting deformation into a nerve impulse.",
          },
          {
            type: "short",
            id: "rs-l6",
            level: 6,
            prompt: "Explain how a receptor acts as a transducer and describe the general pathway from stimulus to brain perception.",
            keywords: ["transducer", "stimulus", "nerve impulse", "action potential", "sensory neurone", "brain", "electrical", "receptor", "energy", "interpretation"],
            minKeywords: 2,
            sample: "A receptor is a transducer — it converts one form of energy (e.g. light, pressure, chemicals) into electrical energy (a nerve impulse/action potential). The pathway is: stimulus → receptor generates action potential → sensory neurone carries the signal → arrives at the brain → brain interprets the signal as a sensation. The type of sensation depends on which brain region receives the impulse, not on the nature of the impulse itself.",
          },
          {
            type: "short",
            id: "rs-l8",
            level: 8,
            prompt: "Compare the sensitivity of rods and cones, explaining why rods can detect a single photon while cones require brighter light. Include reference to the molecular cascade in rods.",
            keywords: ["rhodopsin", "transducin", "cgmp", "phosphodiesterase", "hyperpolarisation", "amplification", "single photon", "rods", "cones", "opsin", "retinal", "cascade", "sensitivity"],
            minKeywords: 3,
            sample: "Rods are more sensitive because their phototransduction involves a molecular amplification cascade: light converts 11-cis-retinal to all-trans-retinal → activates opsin → activates transducin (G-protein) → phosphodiesterase hydrolyses cGMP → Na⁺ channels close → membrane hyperpolarises → reduced glutamate release. Each photon activates hundreds of transducin molecules — massive signal amplification. Cones use the same basic mechanism but their photopsins have lower quantum efficiency and require many photons to generate a signal. Cones provide high acuity colour vision (3 opsin types, peak ~420/530/560 nm) but only in bright light.",
          },
        ],
      },
    },
  ],
}
