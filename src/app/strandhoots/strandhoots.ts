// Catalog of strandhoots (gamified MYP assessments).
//
// Two kinds, distinguished by `mode`:
//  • "native"  — rendered by the data-driven Strandhoot Engine from a typed
//                content pack in ./packs (no per-app build, no iframe). This is
//                the path forward for all new strandhoots.
//  • "iframe"  — a legacy self-hosted Vite SPA vendored under /strandhoots/<slug>
//                and built to public/strandhoots/<slug>/, embedded via iframe.
//
// All strandhoots read `studentId` / `sessionCode` from the URL and persist to
// the shared `responses` table (strand1..5 + strand1..5_level) — see the play
// route and engine/sync.ts.
import { MYP_CRITERIA } from "./engine/types"
import { PACKS } from "./packs"

export interface Strandhoot {
  slug: string
  title: string
  subject: string
  criteria: string
  blurb: string
  accent: string
  icon: string
  /** How the play route renders this strandhoot. */
  mode: "native" | "iframe"
  /** iframe-mode only: path the play route iframes (static build under /public). */
  embed?: string
  /** Optional link to original source (shown in the play header). */
  source?: string
}

// Short hub blurbs for the native packs (the pack `intro` is the longer welcome copy).
const NATIVE_BLURBS: Record<string, string> = {
  "kinematics-crit-a":
    "Show what you know about motion — define quantities, read distance–time and velocity–time graphs, and apply the equations of motion, with an interactive motion lab.",
  "pendulum-crit-b":
    "Design a fair pendulum investigation — research question, hypothesis, variables and method — using a pendulum bench to gather pilot data, with live criterion feedback.",
  "half-life-crit-c":
    "Process a real radioactive-decay dataset — tabulate, plot, linearise with ln, and read off the half-life — then conclude and evaluate with level-based feedback.",
  "energy-resources-crit-d":
    "Reflect on how we power the world — build a national energy mix, weigh the CO₂/cost/reliability trade-offs, and judge and communicate a sustainable choice.",
  // Criterion A packs
  "forces-crit-a":
    "Demonstrate knowledge of forces — identify contact and non-contact forces, apply Newton's laws, and solve resultant-force problems with an interactive force diagram tool.",
  "circuits-crit-a":
    "Recall and apply circuit theory — Ohm's law, series vs. parallel rules, and power calculations — with an interactive virtual circuit builder.",
  "waves-crit-a":
    "Define and calculate wave properties — frequency, wavelength, amplitude and wave speed — and identify transverse vs. longitudinal waves using an interactive oscilloscope.",
  "tir-criteria-a":
    "Explore total internal reflection — investigate the critical angle, apply Snell's law, and explain fibre-optic applications with an interactive TIR simulation.",
  // Criterion B packs
  "lab-report-criteria-b":
    "Plan a magnetism investigation — write a focused research question, quantitative hypothesis, full variable list and step-by-step method with safety considerations.",
  "wire-resistance-crit-b":
    "Design an experiment into how wire length or thickness affects resistance — craft your question, hypothesis, variable table and method with criterion-aligned feedback.",
  "cooling-crit-b":
    "Plan a Newton's Law of Cooling investigation — state a testable prediction, identify controlled variables, and write a repeatable method for recording temperature vs. time.",
  "hookes-law-crit-b":
    "Design a Hooke's Law experiment — predict how load affects spring extension, list your variables, and write a safe, repeatable method to test the elastic limit.",
  // Criterion C packs
  "magnetism-crit-c":
    "Process magnetism lab data — tabulate results, plot a scatter graph, fit a trendline, and evaluate reliability and sources of error with level-based feedback.",
  "acceleration-crit-c":
    "Analyse a trolley-on-ramp dataset — calculate acceleration from velocity–time data, evaluate your conclusion against F = ma, and identify systematic errors.",
  "shc-crit-c":
    "Process specific heat capacity data — calculate c from Q = mcΔT, compare to the accepted value, and evaluate percentage error and experimental limitations.",
  "boyles-law-crit-c":
    "Process a pressure–volume dataset — plot P vs. 1/V to linearise Boyle's Law, calculate the constant k, and evaluate sources of uncertainty.",
  // Criterion D packs
  "nuclear-society-crit-d":
    "Evaluate the role of nuclear power in society — weigh safety, waste, carbon footprint and public perception, then construct and communicate a reasoned judgement.",
  "climate-crit-d":
    "Reflect on climate change and the greenhouse effect — interpret temperature anomaly data, evaluate human and natural factors, and justify evidence-based action.",
  "em-spectrum-crit-d":
    "Discuss uses and hazards of the electromagnetic spectrum — connect ionising radiation risks to real-world applications and evaluate the science behind safety guidelines.",
  "transport-safety-crit-d":
    "Examine the physics of road safety — analyse how stopping distance, crumple zones and seatbelts relate to force, momentum and energy, and evaluate design trade-offs.",
  // Chemistry: Chapter 1 — Balance
  "balance-crit-a":
    "Test your knowledge of chemical balance — read formulae and state symbols, balance equations using conservation of mass, and apply Le Chatelier's principle to equilibrium systems.",
  "balance-crit-b":
    "Design a Haber process investigation — write a sharp research question, a justified hypothesis, a full variable table, and a safe step-by-step method for making ammonium sulfate fertilizer.",
  "balance-crit-c":
    "Process a real Kc vs temperature dataset — linearise with the van't Hoff transform (ln Kc vs 1/T), calculate ΔH/R from the gradient, and evaluate the method with level-based feedback.",
  "balance-crit-d":
    "Reflect on the Haber process and finite resources — weigh food security benefits against eutrophication and ecological harm, form an evidence-based judgement, and communicate Le Chatelier's principle to a non-specialist.",
  // Chemistry ch2 — Evidence
  "evidence-crit-a":
    "Test your knowledge of metals, transition elements, noble gases, organic compounds and atmospheric composition through levelled questions drawn directly from Chapter 2.",
  "evidence-crit-b":
    "Design a full investigation into the catalytic cracking of liquid paraffin — crafting a research question, hypothesis, variable table and step-by-step safe method.",
  "evidence-crit-c":
    "Process and analyse the Mauna Loa atmospheric CO₂ dataset (2006–2018), calculate the annual rate of increase, test for acceleration, then draw a conclusion and evaluate the method.",
  "evidence-crit-d":
    "Reflect on how fractional distillation, spectroscopy and satellite monitoring have transformed evidence-gathering, weigh the impacts of fossil fuel dependence, and communicate the science to a non-specialist.",
  // Chemistry ch3 — Consequences
  "consequences-crit-a":
    "Test and apply knowledge of acids, bases, pH, neutralisation reactions and the reactivity series from Chapter 3.",
  "consequences-crit-b":
    "Design a complete investigation simulating acid rain formation by burning sulfur — from research question through to a safe numbered method.",
  "consequences-crit-c":
    "Plot [H⁺] vs pH data from nine common substances, linearise with ln([H⁺]), conclude on the logarithmic pH scale and evaluate the acid rain impacts.",
  "consequences-crit-d":
    "Reflect on the real-world applications, environmental impacts and ethical trade-offs of acid deposition from fossil fuel combustion.",
  // Chemistry ch4 — Energy
  "energy-crit-a":
    "Test your knowledge of exothermic and endothermic reactions, bond energies, the q = mcΔT equation, and state changes — levelling up from recall to analysis.",
  "energy-crit-b":
    "Design a rigorous investigation into the energy density of four alcohols — craft a research question, hypothesis, variable list, and step-by-step method.",
  "energy-crit-c":
    "Process real alcohol combustion data from Chapter 4 — plot, linearise, calculate gradients, and critique the experiment's weaknesses.",
  "energy-crit-d":
    "Reflect on how fuel choices, hydrogen technology and the AMOC connect chemistry to global climate — then communicate the science to a non-specialist.",
  // Chemistry ch5 — Conditions
  "conditions-crit-a":
    "Test your knowledge of collision theory, activation energy, measuring reaction rate, and the four factors that control how fast a reaction proceeds.",
  "conditions-crit-b":
    "Design a full disappearing-cross investigation into temperature and reaction rate — from a sharp research question and hypothesis through to a safe, step-by-step method.",
  "conditions-crit-c":
    "Plot and analyse the textbook CaCO₃ + HCl gas-volume dataset, calculate initial rates from tangents, write a conclusion, and critically evaluate the collection method.",
  "conditions-crit-d":
    "Reflect on the real-world impacts of controlling reaction conditions — from catalysts powering 90% of industry to CFCs accidentally destroying the ozone layer.",
  // Chemistry ch6 — Form
  "form-crit-a":
    "Answer questions at escalating depth about states of matter, enthalpies of fusion and vaporisation, the three types of mixture, and choosing the right separation technique.",
  "form-crit-b":
    "Design a complete investigation into how the concentration of sodium carbonate affects the mass of precipitate collected by filtration — from research question to safe numbered method.",
  "form-crit-c":
    "Use the real boiling-point-vs-altitude dataset from Chapter 6 to plot, calculate the gradient, conclude about atmospheric pressure, and evaluate the method's weaknesses.",
  "form-crit-d":
    "Reflect on how the physical and chemical form of substances — from ice density to palm oil saturation — drives real-world applications, health and environmental impacts.",
  // Chemistry ch7 — Function
  "function-crit-a":
    "Recall and apply solubility rules, separation techniques and mole calculations from Chapter 7 — levelling up from definitions to stoichiometric analysis.",
  "function-crit-b":
    "Design the Chapter 7 lead(II) iodide precipitation-and-filtration experiment from research question through hypothesis, variable classification, and a complete safe method.",
  "function-crit-c":
    "Plot and process metal-ion chromatography data — Rf vs molar mass — apply a linearising transform, draw a conclusion, and evaluate the method's weaknesses.",
  "function-crit-d":
    "Reflect on the real-world impacts of separation chemistry — from solar desalination to toxic metal contamination — and form an evidence-based judgement about sustainability.",
  // Chemistry ch8 — Interaction
  "interaction-crit-a":
    "Test and deepen your knowledge of redox reactions, corrosion, combustion of alkanes and the reactivity series through levelled questions from recall to analysis.",
  "interaction-crit-b":
    "Design a rigorous investigation into how metal reactivity affects hydrogen gas production with HCl — craft a research question, hypothesis, variable table, and full safe method.",
  "interaction-crit-c":
    "Analyse real mass-loss data from the magnesium-and-HCl experiment: plot the rate curve, calculate the initial rate, write a quantitative conclusion, and evaluate the method.",
  "interaction-crit-d":
    "Reflect on the global costs of corrosion and combustion pollution, weigh the trade-offs of fossil fuel use, and communicate the chemistry of redox to a non-specialist audience.",
  // Chemistry ch9 — Models
  "models-crit-a":
    "Master ionic and covalent formulae, the criss-cross method, all three bonding types, and alloy structures through levelled questions.",
  "models-crit-b":
    "Design a conductivity investigation — research question, hypothesis, variables and method — grounded in the chapter's real KCl experiment.",
  "models-crit-c":
    "Plot, transform and analyse a KCl conductivity dataset, then write a conclusion and evaluate the method.",
  "models-crit-d":
    "Reflect on the real-world impacts of graphene, aluminium alloys and drug-design modelling, forming an evidence-based judgement about science and equity.",
  // Chemistry ch10 — Movement
  "movement-crit-a":
    "Recall and analyse the core chemistry of Chapter 10 — redox reactions, the reactivity series, electrochemical cells and diffusion — through levelled questions from memory to molecular-level explanation.",
  "movement-crit-b":
    "Design a voltaic cell investigation step by step: write a sharp research question, build an electrochemical-series hypothesis, classify variables, and draft a safe numbered method.",
  "movement-crit-c":
    "Plot, transform and analyse real cell-voltage data for eight metal electrode pairs, calculate the gradient linking series separation to voltage, and evaluate the experimental method.",
  "movement-crit-d":
    "Reflect on the real-world applications, environmental impacts and ethical trade-offs of batteries, aluminium extraction and electroplating — then communicate the science through analogy.",
  // Chemistry ch11 — Patterns
  "patterns-crit-a":
    "Test and apply your knowledge of electronic configuration, ionisation energy trends, group reactivity and oxide acid-base patterns from Chapter 11.",
  "patterns-crit-b":
    "Design the thermal conductivity experiment from Chapter 11 — writing a research question, hypothesis, variable classification and a safe step-by-step method.",
  "patterns-crit-c":
    "Plot, process and conclude from the chapter's real period 3 first ionisation energy data, explaining the two anomalous dips at aluminium and sulfur.",
  "patterns-crit-d":
    "Reflect on how periodic patterns in reactivity and bonding shape medicine, agriculture and materials science — and practise communicating trends to a non-specialist.",
  // Chemistry ch12 — Transfer
  "transfer-crit-a":
    "Recall and apply concentration calculations, the mole concept, titration principles, carboxylic acids and ester formation from Chapter 12.",
  "transfer-crit-b":
    "Design a full acid–base titration investigation — craft a precise research question, a quantitative hypothesis, variable table, and a safe burette-based method.",
  "transfer-crit-c":
    "Process a real titration dataset — plot titre volume vs concentration, calculate the gradient, determine an unknown concentration, and evaluate the method.",
  "transfer-crit-d":
    "Reflect on how titrations, indicators and ester chemistry shape medicine, food science and perfumery — and communicate the science through everyday analogy.",
  // Biology ch1–ch12
  "respiration-crit-a":
    "Test your knowledge of aerobic and anaerobic respiration, ATP, and photosynthesis — from recall to analysis across four key energy strands.",
  "respiration-crit-b":
    "Design a photosynthesis rate investigation using Elodea — craft a research question, hypothesis, variable table and a safe bubble-counting method.",
  "respiration-crit-c":
    "Process a real light intensity vs O₂ bubble rate dataset, linearise with the Lineweaver-Burk transform, and evaluate the photosynthesis experiment.",
  "respiration-crit-d":
    "Reflect on biofuels vs fossil fuels, food chain energy transfer, and the sustainability of human energy choices — then communicate the 10% rule to a non-specialist.",
  "enzymes-crit-a":
    "Test your knowledge of enzyme structure, active sites, temperature and pH effects, and inhibitor types — from definitions to analysis.",
  "enzymes-crit-b":
    "Design an amylase temperature experiment — write a research question, predict denaturation, classify variables, and draft a safe step-by-step starch-iodine method.",
  "enzymes-crit-c":
    "Process a real temperature vs amylase rate dataset, fit ln(rate) vs temperature to reveal the Q10 relationship, and evaluate the experimental limitations.",
  "enzymes-crit-d":
    "Reflect on biotechnology enzyme applications and anti-aging science misrepresentation — form a judgement and communicate denaturation through analogy.",
  "cell-structure-crit-a":
    "Test your knowledge of organelles, prokaryotes vs eukaryotes, levels of organisation, and classification systems — from recall to analysis.",
  "cell-structure-crit-b":
    "Design a microscopy investigation comparing onion and cheek cells — write a research question, hypothesis, variable table and staining method.",
  "cell-structure-crit-c":
    "Process seedling growth data — fit an exponential growth model, calculate the growth rate constant, and evaluate the method's limitations.",
  "cell-structure-crit-d":
    "Reflect on stem cell research ethics, 3D bioprinting applications, and classification debates — then communicate cell specialisation through analogy.",
  "digestion-crit-a":
    "Test your knowledge of digestive organs, enzymes, macronutrients, villi adaptations, and sense receptors — levelling up from recall to analysis.",
  "digestion-crit-b":
    "Design a pepsin activity investigation — write a research question, pH hypothesis, variable table, and a safe turbidity-measurement method.",
  "digestion-crit-c":
    "Process a real pepsin activity vs pH dataset, identify the optimum, and evaluate sources of error with level-based feedback.",
  "digestion-crit-d":
    "Reflect on malnutrition, obesity, and food security — weigh personal responsibility vs systemic factors, and communicate nutrition using a car analogy.",
  "osmosis-crit-a":
    "Test your knowledge of diffusion, osmosis, active transport, gas exchange structures, and the circulatory system — from recall to analysis.",
  "osmosis-crit-b":
    "Design a potato cylinder osmosis investigation — craft a hypothesis about the isotonic point, classify variables, and write a safe massing method.",
  "osmosis-crit-c":
    "Process a real % mass change vs sucrose concentration dataset, identify the isotonic point, and evaluate the potato osmosis experiment.",
  "osmosis-crit-d":
    "Reflect on global water stress, climate justice, and osmosis applications in medicine — communicate osmosis using the grape/raisin analogy.",
  "pathogens-crit-a":
    "Test your knowledge of neurons, pathogen types, the immune response, and ecological interactions — from recall to analysis.",
  "pathogens-crit-b":
    "Design an antibacterial effectiveness experiment — write a research question, hypothesis about zones of inhibition, variable table and agar plate method.",
  "pathogens-crit-c":
    "Process a real disinfectant concentration vs zone of inhibition dataset, apply a √-transform, and evaluate the antibacterial experiment.",
  "pathogens-crit-d":
    "Reflect on antibiotic resistance, vaccine development, and ecological cascades — weigh farming antibiotic use and communicate viral vs bacterial differences.",
  "homeostasis-crit-a":
    "Test your knowledge of thermoregulation, blood glucose control, the carbon cycle and nitrogen cycle — from recall to analysis.",
  "homeostasis-crit-b":
    "Design a blood glucose regulation study — research question, GI hypothesis, variable table and a safe glucometer measurement method.",
  "homeostasis-crit-c":
    "Process a real blood glucose vs time dataset, identify the insulin response pattern, and evaluate the method with level-based feedback.",
  "homeostasis-crit-d":
    "Reflect on diabetes, eutrophication, and biogeochemical cycle disruption — form a judgement on fertilizer restrictions and communicate the carbon cycle.",
  "habitat-crit-a":
    "Test your knowledge of abiotic and biotic factors, biodiversity sampling, ecological succession, and pollution indicators — from recall to analysis.",
  "habitat-crit-b":
    "Design a biodiversity quadrat survey — research question, Simpson's index hypothesis, variable table, and a safe field sampling method.",
  "habitat-crit-c":
    "Process a real species-area relationship dataset, linearise with √area, and evaluate conservation implications of habitat fragmentation.",
  "habitat-crit-d":
    "Reflect on deforestation, coral bleaching, and conservation strategies — weigh development vs biodiversity protection and communicate the rivet hypothesis.",
  "genetics-crit-a":
    "Test your knowledge of DNA structure, mitosis stages, meiosis and genetic variation, and reproduction strategies — from recall to analysis.",
  "genetics-crit-b":
    "Design an onion root tip mitosis investigation — research question, mitotic index hypothesis, variable table, and acid maceration squash method.",
  "genetics-crit-c":
    "Process real DNA gel electrophoresis data — apply ln(size) vs distance linearisation, size an unknown fragment, and evaluate the gel method.",
  "genetics-crit-d":
    "Reflect on genome sequencing, personalised medicine, and genetic data privacy — form a judgement on newborn screening and communicate using the recipe book analogy.",
  "evolution-crit-a":
    "Test your knowledge of Mendelian genetics, natural selection, speciation mechanisms, and genetic modification techniques — from recall to analysis.",
  "evolution-crit-b":
    "Design a fast plant monohybrid cross investigation — write a hypothesis, plan chi-squared analysis, classify variables, and draft a growing method.",
  "evolution-crit-c":
    "Process real allele frequency data under directional selection, apply the 1/q linearisation, and evaluate natural selection dynamics.",
  "evolution-crit-d":
    "Reflect on CRISPR therapy, GMO ethics, and cloning controversies — discuss the He Jiankui case and communicate evolution using dog breeding analogy.",
  "health-crit-a":
    "Test your knowledge of lifestyle risk factors, BMI, the immune response, and vaccination types — from recall to analysis.",
  "health-crit-b":
    "Design an epidemiological study linking physical activity to cardiovascular risk — write a research question, hypothesis, variable table, and sampling method.",
  "health-crit-c":
    "Process real vaccination coverage vs disease incidence data, apply ln(incidence) linearisation, and calculate herd immunity threshold implications.",
  "health-crit-d":
    "Reflect on vaccine hesitancy, global health inequity, and the Wakefield MMR fraud — form a judgement on compulsory vaccination and communicate herd immunity.",
  "conservation-crit-a":
    "Test your knowledge of population growth models, overexploitation, mitigation strategies, and 3D bioprinting — from recall to analysis.",
  "conservation-crit-b":
    "Design a mark-recapture population study using the Lincoln-Petersen formula — hypothesis, assumptions, variable table, and woodlice sampling method.",
  "conservation-crit-c":
    "Process real humpback whale population recovery data, apply ln(N) linearisation, calculate growth rate, and evaluate conservation model assumptions.",
  "conservation-crit-d":
    "Reflect on sustainable fishing, de-extinction ethics, and 3D organ printing — tackle conservation triage and communicate sustainability through the bank account model.",
}

// Native catalog entries derived from the packs (single source of truth).
const NATIVE: Strandhoot[] = Object.values(PACKS).map((p) => ({
  slug: p.slug,
  title: p.title,
  subject: p.subject,
  criteria: MYP_CRITERIA[p.criterion],
  blurb: NATIVE_BLURBS[p.slug] ?? p.intro,
  accent: p.accent,
  icon: p.icon,
  mode: "native" as const,
}))

// Legacy iframed exemplars (kept working; to be re-authored as native packs in Phase 2).
// Note: tir-criteria-a, lab-report-criteria-b, and magnetism-crit-c have been
// re-authored as native packs and removed from LEGACY to avoid duplicates.
const LEGACY: Strandhoot[] = []

export const STRANDHOOTS: Strandhoot[] = [...NATIVE, ...LEGACY]

export function getStrandhoot(slug: string): Strandhoot | undefined {
  return STRANDHOOTS.find((s) => s.slug === slug)
}
