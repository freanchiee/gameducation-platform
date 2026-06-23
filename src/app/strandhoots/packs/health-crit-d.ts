import type { StrandhootPack } from "../engine/types"

export const healthCritD: StrandhootPack = {
  slug: "health-crit-d",
  title: "Health, Evidence & Society",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Vaccine hesitancy, global inequity and lifestyle disease",
  accent: "#27ae60",
  icon: "💉",
  statementOfInquiry: "Healthy lifestyles can be based on evidence of relationships between types of behaviour and risks of disease.",
  estMinutes: 25,
  intro:
    "From the Wakefield MMR fraud to COVID-19 vaccine inequity, public health sits at the intersection of biology, politics, and ethics. Reflect on how scientific evidence should shape health policy — and what happens when it is ignored, weaponised, or unequally distributed.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Biology Master", icon: "🏆", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Health & society context", blurb: "Vaccination, equity, lifestyle disease and the ethics of public health", icon: "💉" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify real-world applications of epidemiology, vaccination programmes, and evidence-based health interventions.",
      guided: [
        { level: 2, body: "Vaccination programmes protect whole populations. The WHO Expanded Programme on Immunization (EPI), launched in 1974, now includes 14 vaccines in the routine childhood schedule — including measles, polio, diphtheria, and hepatitis B." },
        { level: 4, body: "Applications of health evidence include: cancer screening programmes (cervical smear tests every 3 years for women aged 25–64; mammography every 2 years for women aged 50–70); sugar taxes (Mexico introduced a 10% sugar tax in 2014, leading to a 12% reduction in sugary drink sales); NICE (National Institute for Health and Care Excellence) guidelines which translate evidence into standardised clinical recommendations across the UK's NHS." },
        { level: 6, body: "Pharmacogenomics applies genetic knowledge to prescribing: variations in the CYP2D6 enzyme gene mean that the same drug dose can be either toxic or ineffective in different patients — pharmacogenomic testing reduces adverse drug reactions. EPI has reduced vaccine-preventable deaths by an estimated 4–5 million per year since 1974. Sugar taxes have now been adopted in over 45 countries; the UK Soft Drinks Industry Levy (2018) was associated with a 30% reduction in sugar per serving as manufacturers reformulated products." },
        { level: 8, body: "Evidence-based interventions operate at multiple levels of the socioecological model: individual (cervical smear, pharmacogenomics), community (herd immunity from vaccination), policy/structural (sugar tax, clean air legislation, food labelling regulation). The EPI vaccination schedule represents one of the highest return-on-investment public health interventions in history — estimated $44 saved in health costs for every $1 invested (WHO, 2019). Precision medicine (using genomics to tailor treatment) is now extending this evidence-based approach from populations to individuals, but creates new equity challenges as genetic testing is not equally accessible globally." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What was the effect of Mexico's 10% sugar tax introduced in 2014?",
            options: [
              { id: "a", text: "A 5% reduction in obesity rates" },
              { id: "b", text: "A 12% reduction in sugary drink sales", correct: true },
              { id: "c", text: "A 30% reduction in sugar content per serving" },
              { id: "d", text: "Manufacturers stopped selling sugary drinks" },
            ],
            explanation: "Mexico's 10% sugar tax (2014) led to a 12% reduction in sugary drink sales — demonstrating that fiscal policy can influence consumer behaviour at a population level. The UK's Sugar Levy (2018) prompted manufacturers to reformulate products, reducing sugar per serving by ~30%.",
          },
          {
            id: "s2",
            prompt: "What is the purpose of NICE guidelines in the UK?",
            options: [
              { id: "a", text: "To regulate the price of medicines" },
              { id: "b", text: "To translate scientific evidence into standardised clinical recommendations for the NHS", correct: true },
              { id: "c", text: "To license new vaccines for use in schools" },
              { id: "d", text: "To fund pharmacogenomic research" },
            ],
            explanation: "NICE (National Institute for Health and Care Excellence) evaluates clinical and cost-effectiveness evidence and produces guidelines that standardise treatment across the NHS — reducing variation in care quality between regions.",
          },
        ],
        prompt: "Describe the real-world applications of epidemiological evidence and vaccination programmes. Consider interventions at the individual, community, and policy levels.",
        scaffolds: [
          "The WHO Expanded Programme on Immunization...",
          "Cancer screening programmes such as...",
          "Sugar taxes demonstrate that...",
          "NICE guidelines ensure that...",
          "Pharmacogenomics applies... to reduce...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one application.", keywords: ["vaccination", "epi", "screening", "sugar tax", "nice", "cancer", "measles"], minKeywords: 1 },
          { level: 4, descriptor: "Two or more applications with brief explanations.", keywords: ["epi", "screening", "mammography", "cervical", "sugar tax", "nice", "pharmacogenomics", "guidelines"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple applications across levels; sugar tax data cited; epi impact quantified.", keywords: ["epi", "4-5 million", "sugar tax", "12%", "30%", "pharmacogenomics", "cyp2d6", "nice", "socioecological", "cervical", "mammography"], minKeywords: 3 },
          { level: 8, descriptor: "Socioecological model applied; cost-effectiveness cited; precision medicine equity challenge raised.", keywords: ["socioecological", "$44", "return on investment", "1974", "45 countries", "precision medicine", "genomics", "equity", "individual", "structural", "policy"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the social, ethical and global implications of vaccine hesitancy and health inequity.",
      guided: [
        { level: 2, body: "Anti-vaccination movements have caused measles outbreaks. Andrew Wakefield's 1998 paper claimed a link between the MMR vaccine and autism — this claim has since been proven false and the paper was retracted." },
        { level: 4, body: "The Wakefield 1998 paper was published in The Lancet and caused a dramatic drop in MMR vaccination rates in the UK and Ireland. The paper was retracted in 2010 after investigation showed the data were fabricated; Wakefield lost his medical licence. The resulting anti-vaccination movement contributed to a measles resurgence in Europe in 2018–2019 with over 83,000 cases. COVID-19 vaccine inequity: wealthy nations purchased four times their population's needs in advance, while COVAX distributed only 8% of its doses to low-income countries by mid-2021." },
        { level: 6, body: "Social determinants of health (SDOH) — the conditions in which people are born, grow, work, and age — account for more variation in health outcomes than healthcare access alone. Poverty leads to poor nutrition, which causes childhood stunting and lifelong increased risk of chronic disease. Postcode (area of residence) predicts life expectancy: in London, moving one Tube station east from Westminster to Waterloo reduces average life expectancy by nearly one year. Antibiotic resistance arises from overprescription and agricultural use — projections estimate 10 million deaths per year by 2050 if resistance continues to increase." },
        { level: 8, body: "Systemic analysis of vaccine inequity: the TRIPS Agreement on intellectual property rights prevented low-income countries from manufacturing generic COVID-19 vaccines during the pandemic. COVAX (the WHO/GAVI/CEPI global vaccine sharing initiative) was underfunded and outcompeted by bilateral deals between wealthy nations and manufacturers. The result was a vaccine apartheid — wealthy nations achieved 70%+ coverage by mid-2022 while many low-income countries had <10%. This is not just an ethical failure: low-coverage populations are incubators for variant emergence (Delta and Omicron both emerged from populations with low vaccination coverage). Wakefield's fabricated research demonstrates how a single fraudulent paper, amplified by social media, can cause thousands of preventable deaths — illustrating the life-or-death consequences of scientific integrity." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What happened to Andrew Wakefield's 1998 paper claiming a link between the MMR vaccine and autism?",
            options: [
              { id: "a", text: "It was confirmed by further studies and remains influential" },
              { id: "b", text: "It was retracted in 2010 after the data were shown to be fabricated, and Wakefield lost his medical licence", correct: true },
              { id: "c", text: "It was never widely published and had no impact" },
              { id: "d", text: "It was retracted because the methodology was flawed, but the findings were later confirmed" },
            ],
            explanation: "Wakefield's paper was retracted by The Lancet in 2010 after a General Medical Council investigation found the data had been fabricated and ethical violations had occurred. Wakefield was struck off the medical register. The paper caused lasting damage: MMR uptake fell and measles resurged across Europe.",
          },
          {
            id: "s2",
            prompt: "What does it mean that 'postcode predicts life expectancy'?",
            options: [
              { id: "a", text: "Wealthier postcodes have faster postal delivery, improving healthcare access" },
              { id: "b", text: "Where you live — shaped by socioeconomic conditions — is a strong predictor of how long you will live", correct: true },
              { id: "c", text: "Postcode databases are used by the NHS to track disease prevalence" },
              { id: "d", text: "Rural postcodes always have worse health outcomes than urban ones" },
            ],
            explanation: "Postcode is a proxy for socioeconomic conditions — housing quality, air pollution, access to healthy food, stress, and access to healthcare. In London, life expectancy varies by up to 15 years between the richest and poorest boroughs — illustrating the powerful impact of social determinants of health.",
          },
        ],
        prompt: "Evaluate the social, ethical and global implications of vaccine hesitancy and global health inequity. Consider the Wakefield case, COVID-19 vaccine distribution, and social determinants of health.",
        scaffolds: [
          "The Wakefield 1998 paper caused...",
          "This is an example of how scientific fraud can...",
          "COVID-19 vaccine inequity meant that...",
          "Social determinants of health include... and affect health outcomes by...",
          "Antibiotic resistance is a systemic problem because...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one impact or event.", keywords: ["wakefield", "mmr", "autism", "anti-vaccination", "inequity", "covid", "social determinants"], minKeywords: 1 },
          { level: 4, descriptor: "Wakefield explained; vaccine inequity or SDOH mentioned.", keywords: ["wakefield", "retracted", "2010", "lancet", "fabricated", "mmr", "measles", "covax", "8%", "poverty", "nutrition"], minKeywords: 2 },
          { level: 6, descriptor: "Three categories of impact; resurgence quantified; postcode inequality named.", keywords: ["83000", "europe", "2018", "2019", "covax", "8%", "social determinants", "poverty", "stunting", "postcode", "antibiotic resistance"], minKeywords: 3 },
          { level: 8, descriptor: "TRIPS, variant emergence, and systemic analysis; scientific integrity consequences.", keywords: ["trips", "intellectual property", "generic", "variant", "delta", "omicron", "vaccine apartheid", "scientific integrity", "fraud", "social media", "preventable deaths", "incubator"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the arguments for and against mandatory childhood vaccination in a liberal democracy.",
      guided: [
        { level: 2, body: "'Vaccination should be compulsory because it protects everyone, including babies too young to be vaccinated.' — A simple opinion without acknowledging the counter-argument." },
        { level: 4, body: "'Mandatory vaccination would protect the most vulnerable — newborns, the immunocompromised — by ensuring herd immunity is maintained. However, it overrides parental autonomy and the principle of informed consent, which are central to medical ethics in liberal democracies.' — Acknowledges both sides." },
        { level: 6, body: "A balanced judgement: 'Compulsory vaccination raises a genuine tension between two values: protecting vulnerable third parties who cannot vaccinate themselves (the utilitarian case) versus respecting individual and parental autonomy (the liberal case). Evidence from countries that have introduced mandates (Italy 2017, Germany 2020) shows measles vaccination rates rose above the 93% threshold without large-scale non-compliance. However, enforcement mechanisms are coercive and may increase mistrust of health authorities — reducing long-term vaccine acceptance. On balance, strong nudge policies (easy access, default opt-in, GP conversations) may achieve comparable coverage without coercion.'" },
        { level: 8, body: "A nuanced judgement weighs: (1) empirical evidence — Italy achieved 94.8% MMR coverage under mandates (2018), above the 93% herd immunity threshold; (2) philosophical tensions — JS Mill's harm principle (the state may restrict liberty only to prevent harm to others) arguably justifies mandates for measles given R₀ = 15; (3) practical risks — mandatory policies can backfire, increasing anti-vaccination sentiment (France 2017 mandatory policy associated with short-term resistance spike before coverage recovered); (4) equity — mandates disproportionately burden communities with less social trust in government; (5) alternatives — school attendance requirements with medical/philosophical exemptions (US state model) achieve high coverage without universal mandates. A calibrated conclusion states the author's position with caveats." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "Which argument SUPPORTS making childhood vaccination compulsory?",
            options: [
              { id: "a", text: "All parents have an absolute right to make medical decisions for their children" },
              { id: "b", text: "Vaccines sometimes cause side effects" },
              { id: "c", text: "Herd immunity protects immunocompromised individuals who cannot be vaccinated", correct: true },
              { id: "d", text: "Religious beliefs should always override public health requirements" },
            ],
            explanation: "Herd immunity is the primary public health argument for high vaccination coverage: when enough people are vaccinated, those who cannot receive vaccines (newborns, immunocompromised patients, those with severe allergies) are protected because the pathogen cannot spread through the population.",
          },
          {
            id: "s2",
            prompt: "Which ethical principle is most clearly CHALLENGED by mandatory vaccination?",
            options: [
              { id: "a", text: "Beneficence (doing good for others)" },
              { id: "b", text: "Autonomy (the right to make decisions about your own body)", correct: true },
              { id: "c", text: "Justice (fair distribution of health benefits)" },
              { id: "d", text: "Non-maleficence (avoiding harm)" },
            ],
            explanation: "Mandatory vaccination directly challenges the principle of autonomy — including parental autonomy to make medical decisions for their children. Medical ethics requires informed consent, which is undermined when a treatment is compulsory.",
          },
        ],
        prompt: "Should childhood vaccination be legally compulsory in a liberal democracy? Construct a reasoned, evidence-based judgement that weighs the arguments on both sides.",
        scaffolds: [
          "The case FOR compulsory vaccination includes...",
          "The case AGAINST includes...",
          "Evidence from countries with mandatory policies shows...",
          "A key philosophical tension is... because...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion without evidence.", keywords: ["yes", "no", "compulsory", "vaccination", "protect", "rights", "good", "bad"], minKeywords: 1 },
          { level: 4, descriptor: "One argument from each side.", keywords: ["herd immunity", "autonomy", "parental", "consent", "vulnerable", "benefit", "however", "on balance"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple perspectives; real-world evidence cited; nuanced conclusion.", keywords: ["italy", "germany", "threshold", "93%", "coercive", "mistrust", "nudge", "enforcement", "opt-in", "utilitarian", "liberal"], minKeywords: 3 },
          { level: 8, descriptor: "Mill's harm principle; empirical evidence; backfire risk; equity; calibrated conclusion.", keywords: ["mill", "harm principle", "r0", "15", "94.8%", "france", "backfire", "equity", "exemptions", "us state", "calibrated", "caveats", "resistance spike"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain herd immunity using the firebreak analogy and communicate to a non-specialist audience.",
      guided: [
        { level: 2, body: "Restating the definition with jargon doesn't communicate to a non-specialist: 'Herd immunity occurs when a sufficient proportion of a population has become immune to an infection, thereby reducing the likelihood of infection for individuals who lack immunity.'" },
        { level: 4, body: "An analogy helps — but needs to be connected back to the science: 'Think of a wildfire spreading through a forest — if enough trees are fire-resistant, the fire runs out of fuel and stops. In vaccination, immune people are the fire-resistant trees — the pathogen runs out of susceptible people to spread to.' Good start, but doesn't explain the threshold or R₀." },
        { level: 6, body: "A strong explanation uses the firebreak analogy fully: 'Imagine a pandemic as a wildfire spreading between trees. Each infected tree (person) lights the trees around it on fire. If you protect a high enough proportion of trees by cutting firebreaks (vaccination), the fire cannot jump from one susceptible tree to the next — even the unprotected trees are safe because the fire never reaches them. For measles (R₀ = 15), each infected person would normally spread it to 15 others — so you need to protect 93% of trees to create a firebreak the virus cannot jump.'" },
        { level: 8, body: "Excellent communication: uses the firebreak analogy to explain both the mechanism and the threshold; explicitly connects R₀ to the threshold number (higher R₀ = denser firebreak needed); explains the vulnerable populations who rely on herd immunity (newborns, chemotherapy patients, people with allergies to vaccine components); avoids jargon (explains 'R₀' as 'the number of people one sick person would normally spread the illness to without any immunity in the population'); addresses the misconception that herd immunity is 'someone else's problem'; and closes with a call to action rooted in evidence." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What is the difference between active and passive immunity?",
            options: [
              { id: "a", text: "Active immunity is fast; passive immunity is slow" },
              { id: "b", text: "Active immunity results from your own immune response producing memory cells; passive immunity involves receiving ready-made antibodies from another source", correct: true },
              { id: "c", text: "Active immunity lasts only a few months; passive immunity is permanent" },
              { id: "d", text: "Active immunity is only gained through infection; passive immunity is only from vaccines" },
            ],
            explanation: "Active immunity (from infection or vaccination) triggers your own immune system to produce antibodies and memory cells — it is long-lasting. Passive immunity (maternal antibodies, antivenom, immunoglobulin) involves receiving ready-made antibodies — it is immediate but temporary because no memory cells are produced.",
          },
          {
            id: "s2",
            prompt: "Using the formula: herd immunity threshold = 1 − 1/R₀, what percentage vaccination coverage is needed to achieve herd immunity for measles (R₀ = 15)?",
            options: [
              { id: "a", text: "67% (two-thirds of the population)" },
              { id: "b", text: "75% (three-quarters of the population)" },
              { id: "c", text: "93% (roughly 14 out of every 15 people)", correct: true },
              { id: "d", text: "99% (virtually the entire population)" },
            ],
            explanation: "Herd immunity threshold = 1 − 1/R₀ = 1 − 1/15 = 14/15 = 0.933 = 93.3%. Measles is extremely contagious (R₀ = 15), so the firebreak of immunity must cover 93% of the population before the virus runs out of susceptible hosts.",
          },
        ],
        prompt: "Explain herd immunity to a Year 9 student using the firebreak analogy. Connect R₀ to the threshold percentage and explain who relies most on herd immunity.",
        scaffolds: [
          "Imagine a pandemic as a wildfire spreading through a forest...",
          "Each infected person spreads the illness to... others (this number is called R₀)...",
          "Vaccination creates a firebreak by...",
          "For measles (R₀ = 15), we need ___% coverage because...",
          "The people who rely most on herd immunity are... because...",
          "A common misconception is that...",
        ],
        rubric: [
          { level: 2, descriptor: "Restates definition using jargon.", keywords: ["herd immunity", "proportion", "immune", "population", "spread", "infection"], minKeywords: 1 },
          { level: 4, descriptor: "Gives firebreak analogy but doesn't connect to threshold.", keywords: ["wildfire", "forest", "trees", "firebreak", "susceptible", "fuel", "analogy"], minKeywords: 1 },
          { level: 6, descriptor: "Analogy linked to measles; threshold and R₀ explained; vulnerable groups mentioned.", keywords: ["firebreak", "r0", "15", "93%", "measles", "newborns", "immunocompromised", "threshold", "susceptible", "jump"], minKeywords: 3 },
          { level: 8, descriptor: "R₀ defined in plain language; misconception addressed; call to action; clear to non-specialist.", keywords: ["r0 defined", "15 others", "firebreak", "93%", "chemotherapy", "allergy", "misconception", "someone else", "call to action", "plain language", "evidence"], minKeywords: 3 },
        ],
      },
    },
  ],
}
