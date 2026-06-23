import type { StrandhootPack } from "../engine/types"

export const digestionCritD: StrandhootPack = {
  slug: "digestion-crit-d",
  title: "Nutrition & Global Health",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Malnutrition, obesity and food security",
  accent: "#27ae60",
  icon: "🍎",
  statementOfInquiry:
    "Each component in a system must perform its specific function at the right time and place for the system as a whole to be successful.",
  estMinutes: 25,
  intro:
    "Understanding how the digestive system works gives us the tools to address the world's greatest nutritional challenges. Reflect on clinical applications of digestion, the global burden of malnutrition and obesity, the ethics of food environments, and how to communicate nutrition science to a non-specialist.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Nutrition & global health", blurb: "Clinical nutrition, malnutrition, obesity and food security", icon: "🍎" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain clinical and technological applications of knowledge about digestion and nutrition.",
      guided: [
        {
          level: 2,
          body: "Knowledge of digestion is used in medicine. When a patient cannot eat, doctors can deliver nutrients directly into the bloodstream — this is called parenteral feeding.",
        },
        {
          level: 4,
          body: "Clinical applications: (1) Parenteral (IV) nutrition — bypasses the gut entirely when it is non-functional (e.g. after bowel surgery); nutrients in a sterile solution are delivered through a central vein. (2) Bariatric surgery — gastric bypass reduces stomach size, limits food intake, and changes gut hormone signals to reduce appetite. (3) Probiotics — beneficial bacteria (Lactobacillus) added to food to restore gut microbiome health. (4) Food labelling regulations — governments require nutritional information (protein/fat/carbohydrate/calories) on packaging to enable informed choice.",
        },
        {
          level: 6,
          body: "Parenteral nutrition must supply all macronutrients (glucose, amino acids, lipid emulsion), micronutrients (vitamins, trace minerals), and water in precise ratios — understanding the digestive products (glucose, amino acids, fatty acids) informs exactly what IV solutions must contain. Bariatric surgery (Roux-en-Y gastric bypass) works by: reducing stomach pouch to ~30 mL (mechanical restriction) and bypassing the duodenum and upper jejunum (where bile and pancreatic enzymes act) — so fat absorption is also reduced (malabsorptive component). The gut hormone GLP-1 increases after bypass, suppressing appetite.",
        },
        {
          level: 8,
          body: "Parenteral nutrition engineering: lipid emulsion uses soybean/fish oil in phospholipid micelles (matching chylomicron delivery) — even IV lipid administration mirrors the body's own absorption chemistry. Bariatric surgery outcomes: gastric bypass achieves 60–80% excess weight loss at 10 years, with type 2 diabetes remission in 80% of patients — driven by GLP-1 and PYY hormone changes, not just weight loss. GLP-1 agonists (semaglutide, liraglutide) now replicate this pharmacologically. Faecal microbiota transplant (FMT) restores microbiome diversity in Clostridioides difficile infection — a direct application of understanding gut microbiology.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which enzyme in the mouth begins the digestion of starch?",
            options: [
              { id: "a", text: "Pepsin" },
              { id: "b", text: "Lipase" },
              { id: "c", text: "Salivary amylase", correct: true },
              { id: "d", text: "Trypsin" },
            ],
            explanation: "Salivary amylase is secreted by salivary glands and starts carbohydrate digestion in the mouth by breaking starch into maltose. Pepsin digests protein in the stomach; lipase digests fats in the small intestine.",
          },
          {
            id: "s2",
            prompt: "Where are villi found, and what is their main function?",
            options: [
              { id: "a", text: "In the stomach — to churn and mechanically break down food" },
              { id: "b", text: "In the small intestine — to increase surface area for nutrient absorption", correct: true },
              { id: "c", text: "In the large intestine — to absorb water from undigested food" },
              { id: "d", text: "In the mouth — to begin chemical digestion of proteins" },
            ],
            explanation: "Villi are finger-like projections lining the small intestine. They increase the surface area by ~600 times, allowing efficient absorption of glucose, amino acids, and fatty acids into the blood and lymph.",
          },
        ],
        prompt: "Describe the applications of knowledge about digestion to medicine and food science. Consider parenteral nutrition, bariatric surgery, probiotics and food labelling.",
        scaffolds: [
          "When the gut cannot function, doctors can...",
          "Bariatric surgery works by...",
          "Knowledge of what digestion produces (glucose, amino acids, fatty acids) is important for IV nutrition because...",
          "Probiotics work by...",
          "A less obvious application is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one application of digestion knowledge.", keywords: ["parenteral", "iv", "surgery", "probiotic", "label", "nutrition", "medicine", "application"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more applications with brief explanations.", keywords: ["parenteral", "bariatric", "probiotic", "food labelling", "gut", "surgery", "iv", "microbiome"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple applications; mechanism explained for at least two.", keywords: ["parenteral", "glucose", "amino acids", "lipid emulsion", "bariatric", "stomach pouch", "duodenum", "bypass", "glp-1", "probiotics", "microbiome", "lactobacillus"], minKeywords: 3 },
          { level: 8, descriptor: "Mechanistic depth; GLP-1/semaglutide or FMT mentioned; quantified outcomes.", keywords: ["semaglutide", "liraglutide", "glp-1 agonist", "fmt", "clostridioides", "60-80%", "80%", "diabetes remission", "micelles", "chylomicron", "patchway", "pharmacologically"], minKeywords: 2 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the global impacts of malnutrition, obesity and disordered eating on health and society.",
      guided: [
        {
          level: 2,
          body: "Not eating enough of a nutrient causes deficiency diseases. Kwashiorkor is caused by protein deficiency. Anaemia can result from not enough iron. Obesity is caused by eating more energy than the body uses.",
        },
        {
          level: 4,
          body: "Malnutrition (under-nutrition): kwashiorkor (protein deficiency — fluid accumulation, muscle wasting, swollen belly), anaemia (iron deficiency — fewer red blood cells, fatigue), scurvy (vitamin C deficiency — collagen cannot be made, bleeding gums). ~800 million people globally suffer under-nutrition. Obesity (over-nutrition): 2 billion overweight globally; leads to Type 2 diabetes (insulin resistance), cardiovascular disease (atherosclerosis), and joint damage (osteoarthritis).",
        },
        {
          level: 6,
          body: "Triple burden of malnutrition: under-nutrition, over-nutrition, and micronutrient deficiency can all coexist in the same population or even the same household — a 'hidden hunger'. Disordered eating: anorexia nervosa has the highest mortality of any psychiatric condition (~5–10% lifetime mortality, from cardiac arrest or organ failure due to starvation). Bulimia: repeated binge-purge erodes tooth enamel (acid reflux) and disrupts electrolytes (low potassium → arrhythmia). Type 2 diabetes linked to obesity costs global health systems $966 billion/year.",
        },
        {
          level: 8,
          body: "Mechanistic links: kwashiorkor — protein deficiency → hypoalbuminaemia → loss of oncotic pressure → oedema (fluid in tissues). Iron-deficiency anaemia — iron needed for haem group in haemoglobin; deficiency reduces O₂ transport capacity. Obesity → adipose inflammation → TNF-α and IL-6 release → insulin resistance (impaired GLUT4 trafficking in muscle cells). Anorexia → cortisol rise → muscle catabolism → cardiac muscle loss → arrhythmia. The global food system paradox: 820 million people are undernourished while 2.1 billion are overweight — not a shortage of food but a failure of distribution, access and policy.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What deficiency disease is caused by insufficient protein in the diet, causing fluid accumulation and muscle wasting?",
            options: [
              { id: "a", text: "Scurvy" },
              { id: "b", text: "Anaemia" },
              { id: "c", text: "Rickets" },
              { id: "d", text: "Kwashiorkor", correct: true },
            ],
            explanation: "Kwashiorkor results from severe protein deficiency. Without enough protein, the body cannot maintain oncotic pressure in blood, causing fluid to leak into tissues (oedema) — producing the characteristic swollen belly. Scurvy = vitamin C deficiency; anaemia = iron deficiency; rickets = vitamin D/calcium deficiency.",
          },
        ],
        prompt: "Evaluate the global impacts of malnutrition (under- and over-nutrition) and disordered eating on individuals and society. Use evidence and data to support your answer.",
        scaffolds: [
          "Under-nutrition impacts include...",
          "Over-nutrition (obesity) causes...",
          "Disordered eating is particularly serious because...",
          "The economic cost of obesity is...",
          "A paradox of the global food system is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one form of malnutrition or its effects.", keywords: ["kwashiorkor", "anaemia", "obesity", "protein", "vitamin", "deficiency", "malnutrition"], minKeywords: 1 },
          { level: 4, descriptor: "Two categories of impact with brief explanations.", keywords: ["kwashiorkor", "protein", "anaemia", "iron", "obesity", "diabetes", "cardiovascular", "disease", "deficiency"], minKeywords: 2 },
          { level: 6, descriptor: "Under-nutrition, over-nutrition, and disordered eating covered with data.", keywords: ["800 million", "2 billion", "kwashiorkor", "anaemia", "scurvy", "type 2 diabetes", "anorexia", "highest mortality", "triple burden", "hidden hunger"], minKeywords: 4 },
          { level: 8, descriptor: "Mechanistic links; paradox of global food system; economic cost.", keywords: ["hypoalbuminaemia", "oedema", "oncotic pressure", "tnf-α", "insulin resistance", "glut4", "arrhythmia", "820 million", "2.1 billion", "966 billion", "distribution", "paradox"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Evaluate whether obesity is a personal failure or a systemic problem and form an evidence-based position.",
      guided: [
        {
          level: 2,
          body: "'Obesity is caused by eating too much and not exercising.' — A simple opinion that places all responsibility on the individual.",
        },
        {
          level: 4,
          body: "'Obesity has both personal and environmental causes. People make food choices, but food environments can make healthy choices harder. Evidence from food deserts shows that low-income areas have fewer affordable healthy options.' Uses evidence from both sides.",
        },
        {
          level: 6,
          body: "A balanced judgement: 'Obesity rates have risen globally despite personal responsibility arguments being consistent. This points to systemic drivers: food deserts (low-income areas lack affordable fresh food), ultra-processed food (engineered to override satiety signals), marketing to children (studies show 95% of food ads on children's TV feature unhealthy products), and genetic predisposition (up to 70% heritability). While individual choices matter, the environment shapes those choices — holding only individuals responsible ignores powerful systemic forces.'",
        },
        {
          level: 8,
          body: "A nuanced judgement: considers the SLOTH model (Sedentary behaviour, Low income, Obesogenic environment, Trauma, Heredity) — a systems model of obesity causation. Examines ultra-processed food (hyper-palatability engineered via fat-sugar-salt combinations that activate dopamine reward circuits, bypassing normal satiety). Food company marketing: Coca-Cola spent $4 billion on marketing in 2022. Policy evidence: sugar taxes (Mexico, UK, Chile) reduce consumption; front-of-pack labelling reduces unhealthy purchase. Specific policy: UK Soft Drinks Industry Levy (2018) reduced sugar in drinks by 28.8% before it took effect. Individual responsibility and systemic change are not mutually exclusive — but systemic interventions reach populations that individual behaviour change cannot.",
        },
      ],
      response: {
        kind: "reflection",
        prompt: "Is obesity primarily a personal failure of willpower and lifestyle, or primarily a systemic and environmental problem? Construct a reasoned, evidence-based judgement.",
        scaffolds: [
          "Evidence that obesity is a personal responsibility issue includes...",
          "Evidence that obesity is a systemic/environmental problem includes...",
          "Food deserts affect the choices available to people because...",
          "Ultra-processed food is relevant because...",
          "My judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["personal", "choice", "willpower", "environment", "systemic", "food", "obesity"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side with evidence.", keywords: ["food desert", "marketing", "personal choice", "environment", "genetics", "evidence", "however", "on balance"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; food deserts, marketing, genetics cited; reasoned conclusion.", keywords: ["food deserts", "ultra-processed", "marketing", "children", "genetics", "heritability", "satiety", "systemic", "environment", "70%", "95%", "personal responsibility"], minKeywords: 3 },
          { level: 8, descriptor: "SLOTH or systems model; dopamine reward circuits; sugar tax policy evidence; nuanced conclusion.", keywords: ["sloth", "dopamine", "reward circuit", "sugar tax", "soft drinks levy", "28.8%", "coca-cola", "4 billion", "front-of-pack", "chile", "mexico", "hyper-palatable", "policy"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain why a fast food diet impairs health using nutrient functions, in accessible language for a non-specialist.",
      guided: [
        {
          level: 2,
          body: "Restating the definition with jargon: 'A fast food diet is bad because it lacks nutrients and has too many calories.' — This doesn't explain the mechanisms to a non-specialist.",
        },
        {
          level: 4,
          body: "An analogy helps — but needs to connect back to biology: 'Think of your body like a car. Carbohydrates are the fuel. Proteins repair the body panels. Fats are the insulation and lubricant. Fast food gives you too much of the wrong fuel and not enough of the repair materials.' A good start, but doesn't explain the specific health consequences.",
        },
        {
          level: 6,
          body: "The car analogy linked to specific health consequences: 'Your body is like a car — carbohydrates are the fuel (petrol), proteins are the body panels (repair and replacement), and fats are the insulation and lubricant. A fast food diet floods your car with cheap, low-grade fuel (refined carbs and trans fats), skimps on proteins needed to repair muscles and make enzymes, and gives too little fibre — so the waste system backs up. The result: your engine runs rough (fatigue), panels rust (muscle loss), and the exhaust system clogs (constipation and gut problems).'",
        },
        {
          level: 8,
          body: "Excellent communication uses two linked analogies, avoids jargon with plain language replacements ('enzymes' = 'chemical scissors that cut up food', 'insulin resistance' = 'the door to your cells gets stuck so sugar builds up in the blood'), explains the fast food consequence step-by-step, addresses likely misconceptions ('all fat is bad' — No, omega-3 fats are essential; 'carbs are bad' — No, wholegrain carbs are fine; 'fast food is just calories' — No, ultra-processed food disrupts appetite signals), and includes one surprising fact ('a McDonalds meal often contains less than 2 g of dietary fibre — the gut microbiome needs 25–30 g daily to stay healthy').",
        },
      ],
      response: {
        kind: "reflection",
        prompt: "Explain to a non-specialist (a younger sibling, or someone with no biology background) why a diet based mainly on fast food impairs health. Use the functions of each macronutrient and include at least one everyday analogy.",
        scaffolds: [
          "Imagine your body is like a car...",
          "Carbohydrates are like ___ because they provide...",
          "Proteins are like ___ because the body uses them to...",
          "Fats are like ___ because they...",
          "A diet mainly from fast food means your body is missing..., which causes... because...",
          "A common misconception is that...",
        ],
        rubric: [
          { level: 2, descriptor: "Restates that fast food is unhealthy without explanation.", keywords: ["unhealthy", "bad", "calories", "fat", "sugar", "fast food", "junk"], minKeywords: 1 },
          { level: 4, descriptor: "Gives a car analogy but doesn't link all three macronutrients to consequences.", keywords: ["car", "fuel", "repair", "insulation", "carbohydrate", "protein", "fat", "analogy"], minKeywords: 2 },
          { level: 6, descriptor: "All three macronutrients linked to specific functions and health consequences; analogy used.", keywords: ["carbohydrate", "fuel", "protein", "repair", "muscle", "fat", "insulation", "fibre", "constipation", "enzyme", "fast food", "consequence", "analogy"], minKeywords: 4 },
          { level: 8, descriptor: "Plain language; misconception corrected; specific fibre figure; gut microbiome mentioned.", keywords: ["misconception", "omega-3", "wholegrain", "appetite", "ultra-processed", "microbiome", "25 g", "30 g", "2 g", "fibre", "insulin", "plain language", "jargon", "chemical scissors"], minKeywords: 3 },
        ],
      },
    },
  ],
}
