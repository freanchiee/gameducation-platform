import type { StrandhootPack } from "../engine/types"

export const energyCritD: StrandhootPack = {
  slug: "energy-crit-d",
  title: "Energy, Fuels & the Global Climate",
  subject: "MYP Chemistry",
  criterion: "D",
  topic: "Fuels, energy transformation, climate & global energy systems",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry:
    "Scientific and technological advances can enable functional energy transformations within, and between, systems.",
  estMinutes: 26,
  intro:
    "From the hydrogen fuel cell bus in London to the Atlantic Meridional Overturning Circulation, Chapter 4 places chemistry at the centre of our global energy story. Reflect on real applications, weigh up environmental impacts, form an evidence-based judgement, and explain the science to someone who has never studied it.",
  badges: [
    {
      id: "applicator",
      label: "Energy Transformer",
      icon: "⚡",
      description: "Reach Level 8 on Applications",
      strandId: "applications",
      atLevel: 8,
    },
    {
      id: "critic",
      label: "Impact Analyst",
      icon: "⚠️",
      description: "Reach Level 8 on Implications & impacts",
      strandId: "impacts",
      atLevel: 8,
    },
    {
      id: "judge",
      label: "Evidence Judge",
      icon: "⚖️",
      description: "Reach Level 8 on Making a judgement",
      strandId: "judgement",
      atLevel: 8,
    },
    {
      id: "communicator",
      label: "Science Voice",
      icon: "📢",
      description: "Reach Level 6+ on all strands",
      atLevel: 6,
    },
  ],
  paths: [
    {
      id: "default",
      label: "Energy transformations & their impacts",
      blurb: "Fuels, hydrogen technology, fossil fuels, and global energy redistribution",
      icon: "🌍",
    },
  ],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor:
        "Identify and explain real-world applications of exothermic energy transformations in fuels and technology.",
      guided: [
        {
          level: 2,
          body: "Combustion of fuels is an exothermic reaction that releases heat energy. We use this energy for cooking, heating homes, and powering vehicles. Different fuels have different energy densities — the amount of energy stored per kilogram of fuel.",
        },
        {
          level: 4,
          body: "Energy density (MJ kg⁻¹) varies significantly between fuels: wood ≈ 15 MJ kg⁻¹; coal ≈ 24 MJ kg⁻¹; ethanol ≈ 30 MJ kg⁻¹; biodiesel ≈ 37 MJ kg⁻¹; gasoline ≈ 46 MJ kg⁻¹; natural gas ≈ 54 MJ kg⁻¹. Hydrogen fuel cells are an alternative technology: they convert chemical energy directly into electrical energy (a flow of electrons), producing only water as a by-product. They have been used since space exploration capsules in the 1960s.",
        },
        {
          level: 6,
          body: "Hydrogen fuel cells convert chemical energy → electrical energy efficiently, without combustion. The cell combines H₂ and O₂ to produce water and electricity: 2H₂(g) + O₂(g) → 2H₂O(l). Hydrogen-powered buses (e.g. the London H₂ bus fleet) produce zero tailpipe emissions. Brazil's sugarcane biofuel industry converts solar energy → chemical energy (photosynthesis in sugarcane) → thermal energy (ethanol combustion in engines) → mechanical energy. This illustrates a chain of energy transformations linked to the statement of inquiry.",
        },
        {
          level: 8,
          body: "Quantified applications: natural gas has the highest energy density of common fuels (~54 MJ kg⁻¹), but combustion releases CO₂ (~490 tCO₂e/GWh). By contrast, solar PV emits ~50 tCO₂e/GWh and wind ~15 tCO₂e/GWh (lifecycle). The thermite reaction (Fe₂O₃ + 2Al → Al₂O₃ + 2Fe) has been used since the 1930s to weld railway tracks without external power — a self-contained exothermic energy transformation. Hydrogen fuel cells have advanced from the 1960s space programme to public transport, reducing emissions by eliminating combustion entirely. Each application represents a technological advance enabling a specific energy transformation.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "Which fuel has the highest energy density according to the bar chart in Chapter 4?",
            options: [
              { id: "a", text: "Wood" },
              { id: "b", text: "Gasoline" },
              { id: "c", text: "Natural gas", correct: true },
              { id: "d", text: "Coal" },
            ],
            explanation:
              "Natural gas has the highest energy density (~54 MJ kg⁻¹) of the fuels shown in the Chapter 4 bar chart. Wood has the lowest (~15 MJ kg⁻¹). This is why natural gas is widely used for heating and cooking despite its CO₂ emissions.",
          },
          {
            id: "s2",
            prompt: "What is the only chemical by-product produced by a hydrogen fuel cell?",
            options: [
              { id: "a", text: "Carbon dioxide" },
              { id: "b", text: "Carbon monoxide" },
              { id: "c", text: "Water", correct: true },
              { id: "d", text: "Nitrogen oxides" },
            ],
            explanation:
              "In a hydrogen fuel cell, H₂ and O₂ combine to produce only water (2H₂ + O₂ → 2H₂O) and electricity. This is why hydrogen vehicles have zero tailpipe emissions.",
          },
        ],
        prompt:
          "Describe at least three real-world applications of energy transformations from Chapter 4. For each, explain what type of energy is being transformed into what, and why the technology is significant.",
        scaffolds: [
          "Application 1: Combustion of fuels is used for..., transforming ___ energy into ___ energy...",
          "Application 2: Hydrogen fuel cells convert ___ energy into ___ energy. They are significant because...",
          "Application 3: The thermite reaction transforms ___ energy into ___ energy and is used to...",
          "A key advantage of higher energy density fuels is...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one application involving energy transformation.",
            keywords: ["fuel", "energy", "combustion", "heat", "electricity", "hydrogen"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Two applications with energy type transformation stated.",
            keywords: [
              "chemical energy",
              "electrical energy",
              "thermal energy",
              "fuel cell",
              "combustion",
              "hydrogen",
              "thermite",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Three applications with transformation chain; energy density concept used; significance explained.",
            keywords: [
              "energy density",
              "fuel cell",
              "h2o",
              "thermite",
              "railway",
              "sugarcane",
              "brazil",
              "solar",
              "chemical",
              "transformation chain",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Quantified energy densities; CO₂ comparisons; thermite history; hydrogen tech development cited.",
            keywords: [
              "54 mj",
              "15 mj",
              "490",
              "50",
              "wind",
              "1930s",
              "1960s",
              "space",
              "lifecycle",
              "tco2e",
              "photosynthesis",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor:
        "Evaluate the environmental, social, and economic impacts of fossil fuel combustion and increasing global energy demand.",
      guided: [
        {
          level: 2,
          body: "Burning fossil fuels releases carbon dioxide, a greenhouse gas. The majority of global carbon-based emissions come from combustion of carbon-based fuels. An increase in CO₂ in the atmosphere contributes to global warming.",
        },
        {
          level: 4,
          body: "Environmental: combustion of fossil fuels adds CO₂ and other greenhouse gases to the atmosphere. The US consumes petroleum (~35 quadrillion BTU) and natural gas (~29 BTU) as its largest energy sources; China accounts for over 20% of total world energy consumption, mainly from coal (65%+). Economic: fossil fuels drive industrial output (the largest US sector) but are non-renewable — supply is finite. Social: 195 countries signed the Paris Agreement (2015) to limit temperature rise to below 2°C by 2030.",
        },
        {
          level: 6,
          body: "Multilevel impacts: Environmental — combustion of coal (lignite ~1060 tCO₂e/GWh) emits far more greenhouse gas per unit energy than nuclear (~12 tCO₂e/GWh) or wind (~15 tCO₂e/GWh). Social — rising sea levels and extreme weather disproportionately affect lower-income nations that contribute little to emissions. The AMOC (Atlantic Meridional Overturning Circulation) redistributes heat globally; scientific models suggest it may collapse if greenhouse gas emissions continue — potentially dropping northern European temperatures by up to 7°C. Economic — switching to renewables requires massive capital investment but reduces long-term fuel cost volatility.",
        },
        {
          level: 8,
          body: "Systemic analysis: the US industrial sector consumes ~30 quadrillion BTU — the largest sector. Lignite emits ~1060 tCO₂e/GWh vs solar PV ~50 tCO₂e/GWh — a 21-fold difference. AMOC collapse modelling (Scripps, 2017) predicts 300 years after CO₂ doubles its 1990 level of 355 ppm: North Atlantic temperatures drop 2.4°C, northwest Europe air temperatures drop up to 7°C, tropical rain belts shift. These compounding effects show energy choices create feedback loops: fossil fuel combustion → CO₂ increase → climate change → AMOC disruption → regional temperature shifts → further disruption of energy and food systems. Benefits and costs are unequally distributed across nations.",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "According to the greenhouse gas emissions bar chart in Chapter 4, which energy source has the lowest average greenhouse gas emissions?",
            options: [
              { id: "a", text: "Natural gas" },
              { id: "b", text: "Biomass" },
              { id: "c", text: "Solar PV" },
              { id: "d", text: "Wind", correct: true },
            ],
            explanation:
              "Wind energy has the lowest average greenhouse gas emissions (~15 tCO₂e/GWh) of all sources shown. Lignite (brown coal) has the highest (~1060 tCO₂e/GWh). This ~70-fold difference illustrates why the energy transition matters for climate change.",
          },
        ],
        prompt:
          "Evaluate the environmental, social, and economic impacts of increasing global energy demand and reliance on fossil fuels. Use data from Chapter 4 and the AMOC case study in your answer.",
        scaffolds: [
          "Environmental impacts include... because...",
          "The greenhouse gas emissions from coal (~___ tCO₂e/GWh) compare to solar PV (~___ tCO₂e/GWh), which shows...",
          "Socially, the Paris Agreement of 2015 aimed to... However...",
          "The AMOC case study shows that climate change could cause..., affecting...",
          "Economic impacts include...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Names one environmental or social impact.",
            keywords: ["co2", "greenhouse", "global warming", "pollution", "climate", "fossil fuel"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Environmental and economic impacts with explanation.",
            keywords: [
              "greenhouse gas",
              "co2",
              "non-renewable",
              "economic",
              "paris agreement",
              "china",
              "coal",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Three categories of impact; AMOC mentioned; greenhouse gas comparison used.",
            keywords: [
              "amoc",
              "1060",
              "15",
              "wind",
              "social",
              "economic",
              "environmental",
              "sea level",
              "paris",
              "2°c",
            ],
            minKeywords: 4,
          },
          {
            level: 8,
            descriptor:
              "Systemic analysis; 300-year AMOC timeline; 355 ppm CO₂ cited; unequal distribution; feedback loops.",
            keywords: [
              "300 years",
              "355 ppm",
              "1990",
              "7°c",
              "2.4°c",
              "scripps",
              "feedback",
              "unequal",
              "compounding",
              "tropical rain",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor:
        "Weigh the costs and benefits of fossil fuels versus renewable energy and form an evidence-based position.",
      guided: [
        {
          level: 2,
          body: "'Fossil fuels are bad because they cause pollution, but renewables are good.' — A simple opinion without evidence.",
        },
        {
          level: 4,
          body: "'Fossil fuels provide high energy density and have powered industrial growth, but they emit greenhouse gases. Renewables like solar and wind emit far less CO₂ but require large capital investment and land area. On balance, the transition to renewables is necessary for long-term sustainability.' — Uses evidence from both sides.",
        },
        {
          level: 6,
          body: "A balanced judgement: 'Fossil fuels have enabled economic development and currently supply the majority of US energy (coal + natural gas + petroleum ≈ 75 quadrillion BTU). However, lignite emits ~1060 tCO₂e/GWh vs wind ~15 — a 70-fold difference. The Paris Agreement commits 195 nations to limiting warming to 2°C. Different stakeholders hold different positions: industrialised nations with coal reserves argue for a slower transition; low-lying island nations facing submergence demand immediate action. A measured judgement must weigh energy security today against climate stability for future generations.'",
        },
        {
          level: 8,
          body: "A nuanced judgement: addresses short-term (energy security, economic output) vs long-term (AMOC stability, sea level, temperature shifts), distinguishes between lifecycle emissions (nuclear ~12, wind ~15, coal ~900 tCO₂e/GWh), notes that China — the largest consumer — is simultaneously the world's largest investor in renewables (addressing distribution and uncertainty), considers whether the Paris Agreement targets are achievable given current trends, evaluates the role of technology (hydrogen fuel cells, smart grids) in bridging the gap, and arrives at a specific calibrated conclusion with stated caveats about data uncertainty.",
        },
      ],
      response: {
        kind: "reflection",
        prompt:
          "Is the continued use of fossil fuels as the world's dominant energy source justifiable? Construct a reasoned, evidence-based judgement that weighs short-term and long-term trade-offs.",
        scaffolds: [
          "Evidence supporting continued fossil fuel use includes...",
          "Evidence against includes...",
          "A key trade-off is...",
          "Different stakeholders see this differently — for example, a government of a coal-dependent economy might argue... whereas a climate scientist might say...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Simple opinion without evidence.",
            keywords: ["good", "bad", "fossil fuel", "renewable", "climate", "clean"],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "One argument on each side with evidence.",
            keywords: [
              "energy density",
              "greenhouse gas",
              "paris agreement",
              "renewable",
              "economic",
              "however",
              "on balance",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Multiple perspectives; Paris Agreement; greenhouse gas data used; reasoned conclusion.",
            keywords: [
              "paris agreement",
              "195",
              "1060",
              "wind",
              "stakeholder",
              "industrial",
              "island",
              "trade-off",
              "70-fold",
              "security",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Short vs long-term; lifecycle emissions; China paradox; alternatives evaluated; uncertainty acknowledged.",
            keywords: [
              "short-term",
              "long-term",
              "lifecycle",
              "nuclear",
              "12",
              "china",
              "investor",
              "hydrogen",
              "amoc",
              "calibrated",
              "uncertainty",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor:
        "Explain how energy transformations within and between systems drive both technology and global climate, to a non-specialist audience.",
      guided: [
        {
          level: 2,
          body: "Restating technical terms without explanation doesn't communicate to a non-specialist: 'Exothermic reactions release energy and endothermic reactions absorb energy, which affects the enthalpy of the system.' — jargon-heavy and inaccessible.",
        },
        {
          level: 4,
          body: "A simple analogy helps: 'Think of a reaction like a bank account — exothermic reactions pay out energy (the surroundings get richer/warmer) and endothermic reactions withdraw energy (the surroundings get poorer/colder). Fossil fuels are like a savings account built up over millions of years — we are spending it very quickly.'",
        },
        {
          level: 6,
          body: "Linking analogy to real systems: 'Energy is like water flowing downhill — it always moves from where there is more (hot) to where there is less (cold). The Gulf Stream is a giant river of warm water that flows north, releasing heat to western Europe and keeping it warmer than it should be for its latitude. If we burn too much fossil fuel, extra CO₂ warms the atmosphere, melting Greenland ice — this adds cold fresh water and disrupts the Gulf Stream's 'engine', potentially cooling northern Europe dramatically.'",
        },
        {
          level: 8,
          body: "Excellent communication uses two linked analogies (one for exothermic reactions at the laboratory scale, one for global energy redistribution), explicitly avoids jargon (explains 'exothermic' as 'energy-releasing', 'AMOC' as 'the ocean's central heating system'), addresses a misconception ('more CO₂ doesn't just make things warmer everywhere — it can actually cool some regions by disrupting ocean currents'), and connects the chemistry lesson directly to a global challenge: 'Understanding bond energies in fuels isn't just a school exercise — it is the foundation of every decision about which energy source to build next.'",
        },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt:
              "The Atlantic Meridional Overturning Circulation (AMOC) keeps western Europe warmer than expected. What drives its flow of warm water northward?",
            options: [
              { id: "a", text: "It is pumped by tidal forces from the Moon" },
              {
                id: "b",
                text: "Differences in temperature and salinity cause dense, cold water to sink, driving the circulation",
                correct: true,
              },
              { id: "c", text: "Solar panels on the ocean surface heat the water" },
              { id: "d", text: "Volcanic activity on the ocean floor provides the energy" },
            ],
            explanation:
              "The AMOC is driven by thermohaline circulation: warm, salty surface water flows north, releases heat to the atmosphere, becomes cooler and denser, and sinks — pulling more warm water behind it. Climate change threatens this by adding cold fresh water from melting ice, reducing the density difference.",
          },
        ],
        prompt:
          "Explain to a Year 9 student who has never studied chemistry: (1) what an exothermic reaction is and why we rely on them for energy, and (2) how burning fossil fuels might affect the AMOC and European climate. Use at least one everyday analogy and avoid unexplained jargon.",
        scaffolds: [
          "An exothermic reaction is like...",
          "We rely on these reactions for energy because...",
          "Burning fossil fuels releases CO₂, which...",
          "The AMOC works like a giant... It keeps Europe warm by...",
          "If CO₂ levels keep rising, the AMOC could..., which means...",
          "A misconception many people have is that more CO₂ means everywhere gets warmer. Actually...",
        ],
        rubric: [
          {
            level: 2,
            descriptor: "Explains exothermic in simple terms.",
            keywords: [
              "heat",
              "releases",
              "energy",
              "warm",
              "surroundings",
              "exothermic",
            ],
            minKeywords: 1,
          },
          {
            level: 4,
            descriptor: "Analogy given; fossil fuels linked to CO₂; some jargon explained.",
            keywords: [
              "analogy",
              "co2",
              "fossil fuel",
              "savings",
              "bank",
              "warm",
              "surroundings",
            ],
            minKeywords: 2,
          },
          {
            level: 6,
            descriptor:
              "Analogy linked to AMOC; Europe climate explained; misconception addressed.",
            keywords: [
              "amoc",
              "gulf stream",
              "europe",
              "warm",
              "co2",
              "misconception",
              "cool",
              "current",
              "analogy",
              "explains",
            ],
            minKeywords: 3,
          },
          {
            level: 8,
            descriptor:
              "Two linked analogies; jargon consistently explained; misconception addressed; global challenge connected to classroom chemistry.",
            keywords: [
              "two analogies",
              "central heating",
              "bond energy",
              "jargon",
              "misconception",
              "doesn't just warm",
              "disrupts",
              "decision",
              "foundation",
              "clear",
            ],
            minKeywords: 3,
          },
        ],
      },
    },
  ],
}
