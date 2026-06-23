import type { StrandhootPack } from "../engine/types"

export const habitatCritD: StrandhootPack = {
  slug: "habitat-crit-d",
  title: "Environment & Human Impact",
  subject: "MYP Biology",
  criterion: "D",
  topic: "Conservation, cultural connection and sustainability",
  accent: "#27ae60",
  icon: "🌍",
  statementOfInquiry: "Environments provide aesthetic benefits and influence human cultural expression, but human induced changes undermine these benefits.",
  estMinutes: 25,
  intro:
    "From national parks to coral reefs, from the Amazon to the rivet hypothesis — reflect on what it means to live alongside biodiversity, and what is at stake when we lose it. Each strand moves from recalling facts to weighing evidence, making judgements, and communicating complex science to a non-specialist audience.",
  badges: [
    { id: "applicator", label: "Real World Link", icon: "🌍", description: "Reach Level 8 on Applications", strandId: "applications", atLevel: 8 },
    { id: "critic", label: "Impact Analyst", icon: "⚠️", description: "Reach Level 8 on Implications & impacts", strandId: "impacts", atLevel: 8 },
    { id: "judge", label: "Evidence Judge", icon: "⚖️", description: "Reach Level 8 on Making a judgement", strandId: "judgement", atLevel: 8 },
    { id: "communicator", label: "Biology Master", icon: "📢", description: "Reach Level 6+ on all strands", atLevel: 6 },
  ],
  paths: [{ id: "default", label: "Environment & impact", blurb: "Conservation, deforestation, coral bleaching and the rivet hypothesis", icon: "🌍" }],
  strands: [
    {
      id: "applications",
      name: "Applications",
      descriptor: "Identify and explain strategies used to conserve biodiversity.",
      guided: [
        { level: 2, body: "Conservation strategies protect biodiversity. National parks and biosphere reserves protect large areas of habitat from development. Captive breeding programmes breed endangered species in zoos or reserves and then reintroduce them to the wild." },
        { level: 4, body: "Protected areas: the 30×30 target aims to protect 30% of Earth's land and oceans by 2030. Wildlife corridors connect fragmented habitat patches, allowing animals to move between them and maintain genetic diversity. Captive breeding example: Arabian oryx was declared extinct in the wild in 1972; zoo breeding and reintroduction programmes restored wild populations from 1980. Eco-tourism (e.g. mountain gorilla tourism in Rwanda) generates income that funds conservation." },
        { level: 6, body: "Conservation genetics: captive breeding can lead to inbreeding depression (reduced fitness due to loss of genetic diversity). Gene banking (storing frozen sperm, eggs or DNA) and managed breeding programmes (using studbooks to pair unrelated individuals) preserve genetic diversity. Wildlife corridors address the species-area problem — by linking fragments they effectively increase functional habitat area, raising the species-area curve and supporting more species. Eco-tourism provides an economic argument for habitat protection: mountain gorilla permits generate ~USD 14 million per year for Rwanda." },
        { level: 8, body: "The 30×30 target faces implementation challenges: many proposed protected areas are 'paper parks' — legally designated but without enforcement or funding. Conservation genetics increasingly uses de-extinction approaches (e.g. CRISPR editing to restore woolly mammoth traits into Asian elephants), raising ethical questions about resource allocation vs protecting existing species. Eco-tourism generates a biodiversity-economy feedback loop, but is vulnerable to geopolitical instability. The Arabian oryx recovery demonstrates that reintroduction can succeed (global population now >1 000) but requires sustained international cooperation, habitat restoration, and anti-poaching enforcement over decades." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What does the 30×30 conservation target aim to achieve?",
            options: [
              { id: "a", text: "Reduce CO₂ emissions by 30% by 2030" },
              { id: "b", text: "Protect 30% of Earth's land and oceans by 2030", correct: true },
              { id: "c", text: "Increase global forest cover by 30 million km² by 2030" },
              { id: "d", text: "Ensure 30 species are removed from the endangered list by 2030" },
            ],
            explanation: "The 30×30 target, agreed at COP15 in 2022, commits nations to protecting 30% of land and 30% of ocean by 2030 — a major scale-up of the current ~17% of land currently protected.",
          },
          {
            id: "s2",
            prompt: "What does a wildlife corridor do?",
            options: [
              { id: "a", text: "Provides a route for tourists to observe wildlife safely" },
              { id: "b", text: "Connects fragmented habitat patches, allowing animals to move and maintain genetic diversity", correct: true },
              { id: "c", text: "Separates domesticated animals from wild ones" },
              { id: "d", text: "Creates a buffer zone between farmland and protected parks" },
            ],
            explanation: "Wildlife corridors link isolated habitat fragments, enabling animals to disperse, find mates, and maintain gene flow — countering the species-area problem caused by habitat fragmentation.",
          },
        ],
        prompt: "Describe the strategies used to conserve biodiversity. Consider protected areas, wildlife corridors, captive breeding, conservation genetics and eco-tourism — and the global significance of each.",
        scaffolds: [
          "Protected areas such as national parks work by...",
          "Wildlife corridors help biodiversity by...",
          "Captive breeding programmes such as... successfully...",
          "Eco-tourism generates conservation funding because...",
          "A limitation of these approaches is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one conservation strategy.", keywords: ["national park", "captive breeding", "corridor", "protect", "eco-tourism", "reserve"], minKeywords: 1 },
          { level: 4, descriptor: "Two strategies explained with examples.", keywords: ["30×30", "wildlife corridor", "captive breeding", "arabian oryx", "eco-tourism", "rwanda", "gorilla", "genetic"], minKeywords: 2 },
          { level: 6, descriptor: "Multiple strategies; mechanism explained; inbreeding or fragmentation addressed.", keywords: ["inbreeding", "genetic diversity", "studbook", "functional area", "species-area", "30×30", "corridor", "eco-tourism", "14 million", "oryx"], minKeywords: 3 },
          { level: 8, descriptor: "Implementation challenges; 30×30 critique; de-extinction or gene banking; sustained cooperation needed.", keywords: ["paper parks", "enforcement", "de-extinction", "crispr", "mammoth", "gene bank", "geopolitical", "1000 oryx", "studbook", "feedback", "ethical"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "impacts",
      name: "Implications & impacts",
      descriptor: "Evaluate the environmental and social impacts of human-induced habitat change.",
      guided: [
        { level: 2, body: "Human activities are causing rapid environmental change. Amazon deforestation destroys habitat and threatens species. Coral bleaching occurs when sea temperatures rise and symbiotic algae (zooxanthellae) leave coral tissue, causing the coral to turn white. Microplastic pollution is now found in the guts of many marine animals." },
        { level: 4, body: "Amazon deforestation: 17% of the original Amazon has been cleared; approximately 1 species is lost per day in the Amazon basin. Local rainfall is disrupted because trees recycle moisture through transpiration — large-scale deforestation reduces regional rainfall. Coral bleaching: just 1°C above the seasonal maximum temperature causes zooxanthellae expulsion; if bleaching is prolonged (>4–6 weeks) the coral dies. Microplastics: found in the gut of ~90% of seabirds; also found in human blood." },
        { level: 6, body: "Systemic impacts: Amazon deforestation displaces indigenous communities who depend on the forest for food, medicine and cultural identity — loss of indigenous ecological knowledge is permanent. Coral reefs cover 0.1% of the ocean floor but support 25% of all marine species. Reef destruction causes cascading losses to fishing communities (>500 million people depend on coral reef fisheries). Microplastic bioaccumulation: plastic fragments concentrate in the gut and can carry persistent organic pollutants (POPs) that disrupt endocrine systems in birds and mammals, including humans." },
        { level: 8, body: "Tipping points: the Amazon deforestation–rainfall feedback suggests a tipping point at approximately 20–25% deforestation, beyond which regional rainfall decline triggers widespread savannification — a self-reinforcing regime shift. Current deforestation (17%) is approaching this threshold. Coral reefs already experienced mass bleaching events in 1998, 2010, and 2016 (Great Barrier Reef). IPCC models project that at 1.5°C global warming, 70–90% of coral reefs will be lost; at 2°C, >99%. Microplastics have now been found in human placentas, suggesting transgenerational exposure. The cumulative impacts of deforestation, bleaching and plastic pollution on indigenous communities and small-island states are disproportionately borne by those least responsible for global emissions." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What causes coral bleaching?",
            options: [
              { id: "a", text: "Coral is painted white by pollution" },
              { id: "b", text: "Rising sea temperatures cause corals to expel their symbiotic zooxanthellae algae", correct: true },
              { id: "c", text: "Ocean acidification dissolves the calcium carbonate skeleton" },
              { id: "d", text: "Increased UV radiation kills the coral tissue" },
            ],
            explanation: "Coral bleaching occurs when water temperature rises just 1°C above the seasonal maximum. Stressed corals expel the symbiotic algae (zooxanthellae) that live in their tissue and provide them with up to 90% of their energy via photosynthesis. Without the algae, coral appears white ('bleached') and can die if conditions persist.",
          },
        ],
        prompt: "Evaluate the environmental, social and cultural impacts of Amazon deforestation, coral bleaching and microplastic pollution. Cover at least three categories of impact.",
        scaffolds: [
          "Amazon deforestation impacts include...",
          "This affects local communities because...",
          "Coral bleaching is caused by... and leads to...",
          "Microplastics affect organisms because...",
          "The social/cultural impact of these losses is...",
        ],
        rubric: [
          { level: 2, descriptor: "Names one environmental impact.", keywords: ["deforestation", "coral", "bleaching", "microplastic", "species", "habitat", "pollution"], minKeywords: 1 },
          { level: 4, descriptor: "Two impacts described with basic explanation.", keywords: ["1°c", "zooxanthellae", "17%", "1 species per day", "seabirds", "90%", "rainfall", "fishing"], minKeywords: 2 },
          { level: 6, descriptor: "Social and environmental impacts; indigenous knowledge; fisheries; endocrine disruption.", keywords: ["indigenous", "knowledge", "fishing", "25%", "endocrine", "pops", "bioaccumulation", "rainfall", "cultural", "500 million"], minKeywords: 3 },
          { level: 8, descriptor: "Tipping points; mass bleaching years; IPCC projections; disproportionate burden noted.", keywords: ["tipping point", "20%", "25%", "savannification", "1998", "2016", "1.5°c", "70%", "placenta", "disproportionate", "regime shift", "ipcc"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "judgement",
      name: "Making a judgement",
      descriptor: "Weigh the rights of local communities to economic development against global responsibility to protect biodiversity hotspots.",
      guided: [
        { level: 2, body: "'Deforestation is bad because it destroys habitats and animals die.' — A simple opinion about one side of the argument." },
        { level: 4, body: "'Halting economic development in biodiversity hotspots is difficult because local communities depend on farming and logging for income. However, the biodiversity lost is irreplaceable and services like rainfall regulation benefit millions. There is no easy answer.' — Considers both sides with evidence." },
        { level: 6, body: "A balanced judgement: 'Local communities have legitimate rights to economic development — many are already poor and should not bear the full cost of conservation that benefits the whole world. However, biodiversity hotspots like the Amazon are globally irreplaceable; once species are extinct, they are gone forever. The key question is: who pays? International mechanisms such as REDD+ (paying developing nations to protect forests) attempt to distribute the cost more fairly, but funding has been insufficient. On balance, a rights-based approach that compensates communities for conservation is more ethical and more likely to succeed than top-down restrictions.'" },
        { level: 8, body: "A nuanced judgement considers: (1) scale — a 'biodiversity hotspot' contains >1 500 endemic vascular plant species in ≤0.5% of land area (Myers et al., 2000); extinction is irreversible. (2) distribution of costs and benefits — local communities face immediate economic costs; global benefits (climate regulation, biodiversity) accrue to wealthy nations that already over-consumed their own forests. (3) alternatives to the false binary — agroforestry, sustainable forest management, REDD+, debt-for-nature swaps. (4) epistemic humility — we do not yet know how many species exist, or what services they provide. A judgement based on all four considerations is inherently uncertain but favours compensated, community-led conservation over either pure development or pure preservation." },
      ],
      response: {
        kind: "reflection",
        prompt: "Should economic development be halted in biodiversity hotspots to protect species? Construct a reasoned, evidence-based judgement that weighs the rights of local communities against global responsibility.",
        scaffolds: [
          "The case for protecting biodiversity hotspots includes...",
          "However, local communities have the right to... because...",
          "A key trade-off is...",
          "The question of who pays is important because...",
          "On balance, my judgement is..., with the caveat that...",
        ],
        rubric: [
          { level: 2, descriptor: "Simple opinion on one side only.", keywords: ["deforestation", "bad", "protect", "develop", "species", "right", "should"], minKeywords: 1 },
          { level: 4, descriptor: "Both sides of argument given with basic evidence.", keywords: ["local", "community", "income", "irreplaceable", "extinct", "development", "protect", "however"], minKeywords: 2 },
          { level: 6, descriptor: "Rights-based framing; REDD+ or international mechanism named; reasoned conclusion.", keywords: ["rights", "redd+", "compensate", "irreplaceable", "global", "local", "cost", "balance", "ethical", "development"], minKeywords: 3 },
          { level: 8, descriptor: "Myers hotspot definition; false binary rejected; alternatives listed; epistemic humility.", keywords: ["hotspot", "1500", "endemic", "agroforestry", "debt-for-nature", "epistemic", "irreversible", "binary", "community-led", "myers", "uncertai"], minKeywords: 3 },
        ],
      },
    },
    {
      id: "communicate",
      name: "Communicating the science",
      descriptor: "Explain why biodiversity matters using the rivet hypothesis as an accessible analogy.",
      guided: [
        { level: 2, body: "Biodiversity matters because many species are important. Losing species is dangerous for ecosystems." },
        { level: 4, body: "The rivet hypothesis (Paul Ehrlich, 1981): each species in an ecosystem is like a rivet holding an aircraft wing together. Removing a few rivets (losing a few species) seems safe — the wing holds. But each rivet you remove increases the risk of catastrophic failure." },
        { level: 6, body: "The rivet analogy communicates two key ideas: (1) redundancy — some species can be lost before the ecosystem collapses, just as a few rivets can be removed. (2) threshold — there is a point beyond which the next species lost causes ecosystem collapse, just as the last rivet fails catastrophically. The ecosystem services a functional ecosystem provides (clean water, pollination, climate regulation, food) are the 'flight' that the rivets keep possible — losing them is catastrophic for humans as well as wildlife." },
        { level: 8, body: "The rivet hypothesis communicates that ecosystem function depends on biodiversity, but has limits as an analogy: (1) unlike rivets, species are not interchangeable — a keystone species (e.g. sea otters maintaining kelp forest ecosystems by controlling sea urchins) plays a disproportionately large role, while others may be redundant. (2) ecological cascades are non-linear — losing one keystone species can trigger collapse that losing ten redundant species would not. To a non-specialist audience, the rivet analogy is powerful precisely because it makes the abstract concept of 'ecosystem services' concrete: we are in the aircraft, and we are removing the rivets." },
      ],
      response: {
        kind: "reflection",
        scenarios: [
          {
            id: "s1",
            prompt: "What does 'biodiversity' mean?",
            options: [
              { id: "a", text: "The total mass of all living organisms in an ecosystem" },
              { id: "b", text: "The variety of life — including genetic diversity, species diversity and ecosystem diversity", correct: true },
              { id: "c", text: "The number of endangered species in a region" },
              { id: "d", text: "The rate at which new species evolve" },
            ],
            explanation: "Biodiversity encompasses three levels: genetic diversity (variation within species), species diversity (number and evenness of species), and ecosystem diversity (variety of different habitats and ecological communities). All three are declining due to human activity.",
          },
          {
            id: "s2",
            prompt: "Which type of sampling uses a line across a habitat to record species at regular intervals?",
            options: [
              { id: "a", text: "Random quadrat sampling" },
              { id: "b", text: "Mark-recapture" },
              { id: "c", text: "Transect sampling", correct: true },
              { id: "d", text: "Simpson's diversity index" },
            ],
            explanation: "A transect is a line (or belt) laid across a habitat. Species are recorded at regular intervals along the transect (line transect) or within strips on either side (belt transect). Transects are particularly useful for showing zonation — how species composition changes across an environmental gradient.",
          },
        ],
        prompt: "Explain why biodiversity matters to a Year 8 student who thinks nature is 'just background'. Use the rivet hypothesis analogy and connect it to real ecosystem services that affect everyday life.",
        scaffolds: [
          "Imagine an aircraft in flight — each rivet holds the wing together...",
          "In an ecosystem, each species is like a rivet because...",
          "Removing a few species seems safe, but...",
          "The services we get from a healthy ecosystem include...",
          "A limitation of the rivet analogy is that not all species are equal — for example...",
        ],
        rubric: [
          { level: 2, descriptor: "States that biodiversity is important or species matter.", keywords: ["biodiversity", "species", "important", "matter", "nature", "ecosystem"], minKeywords: 1 },
          { level: 4, descriptor: "Rivet analogy described with wing/rivet metaphor.", keywords: ["rivet", "wing", "aircraft", "remove", "safe", "fail", "analogy", "ehrlich"], minKeywords: 2 },
          { level: 6, descriptor: "Rivet analogy linked to ecosystem services; threshold concept explained.", keywords: ["ecosystem services", "threshold", "collapse", "pollination", "clean water", "food", "analogy", "redundancy", "flight"], minKeywords: 3 },
          { level: 8, descriptor: "Analogy limitations addressed; keystone species; non-linear cascade; human stakes clear.", keywords: ["keystone", "sea otter", "kelp", "non-linear", "cascade", "redundant", "interchangeable", "limit", "analogy", "catastrophic", "human"], minKeywords: 3 },
        ],
      },
    },
  ],
}
