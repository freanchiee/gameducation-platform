import type { StrandhootPack } from "../engine/types"
import { kinematicsCritA } from "./kinematics-crit-a"
import { pendulumCritB } from "./pendulum-crit-b"
import { halfLifeCritC } from "./half-life-crit-c"
import { energyResourcesCritD } from "./energy-resources-crit-d"
import { forcesCritA } from "./forces-crit-a"
import { circuitsCritA } from "./circuits-crit-a"
import { wavesCritA } from "./waves-crit-a"
import { tirCriteriaA } from "./tir-criteria-a"
import { labReportCriteriaB } from "./lab-report-criteria-b"
import { wireResistanceCritB } from "./wire-resistance-crit-b"
import { coolingCritB } from "./cooling-crit-b"
import { hookesLawCritB } from "./hookes-law-crit-b"
import { magnetismCritC } from "./magnetism-crit-c"
import { accelerationCritC } from "./acceleration-crit-c"
import { shcCritC } from "./shc-crit-c"
import { boylesLawCritC } from "./boyles-law-crit-c"
import { nuclearSocietyCritD } from "./nuclear-society-crit-d"
import { climateCritD } from "./climate-crit-d"
import { emSpectrumCritD } from "./em-spectrum-crit-d"
import { transportSafetyCritD } from "./transport-safety-crit-d"
import { balanceCritA } from "./balance-crit-a"
import { balanceCritB } from "./balance-crit-b"
import { balanceCritC } from "./balance-crit-c"
import { balanceCritD } from "./balance-crit-d"
// Chemistry ch2–12
import { evidenceCritA } from "./evidence-crit-a"
import { evidenceCritB } from "./evidence-crit-b"
import { evidenceCritC } from "./evidence-crit-c"
import { evidenceCritD } from "./evidence-crit-d"
import { consequencesCritA } from "./consequences-crit-a"
import { consequencesCritB } from "./consequences-crit-b"
import { consequencesCritC } from "./consequences-crit-c"
import { consequencesCritD } from "./consequences-crit-d"
import { energyCritA } from "./energy-crit-a"
import { energyCritB } from "./energy-crit-b"
import { energyCritC } from "./energy-crit-c"
import { energyCritD } from "./energy-crit-d"
import { conditionsCritA } from "./conditions-crit-a"
import { conditionsCritB } from "./conditions-crit-b"
import { conditionsCritC } from "./conditions-crit-c"
import { conditionsCritD } from "./conditions-crit-d"
import { formCritA } from "./form-crit-a"
import { formCritB } from "./form-crit-b"
import { formCritC } from "./form-crit-c"
import { formCritD } from "./form-crit-d"
import { functionCritA } from "./function-crit-a"
import { functionCritB } from "./function-crit-b"
import { functionCritC } from "./function-crit-c"
import { functionCritD } from "./function-crit-d"
import { interactionCritA } from "./interaction-crit-a"
import { interactionCritB } from "./interaction-crit-b"
import { interactionCritC } from "./interaction-crit-c"
import { interactionCritD } from "./interaction-crit-d"
import { modelsCritA } from "./models-crit-a"
import { modelsCritB } from "./models-crit-b"
import { modelsCritC } from "./models-crit-c"
import { modelsCritD } from "./models-crit-d"
import { movementCritA } from "./movement-crit-a"
import { movementCritB } from "./movement-crit-b"
import { movementCritC } from "./movement-crit-c"
import { movementCritD } from "./movement-crit-d"
import { patternsCritA } from "./patterns-crit-a"
import { patternsCritB } from "./patterns-crit-b"
import { patternsCritC } from "./patterns-crit-c"
import { patternsCritD } from "./patterns-crit-d"
import { transferCritA } from "./transfer-crit-a"
import { transferCritB } from "./transfer-crit-b"
import { transferCritC } from "./transfer-crit-c"
import { transferCritD } from "./transfer-crit-d"
// Biology ch1–ch12
import { respirationCritA } from "./respiration-crit-a"
import { respirationCritB } from "./respiration-crit-b"
import { respirationCritC } from "./respiration-crit-c"
import { respirationCritD } from "./respiration-crit-d"
import { enzymesCritA } from "./enzymes-crit-a"
import { enzymesCritB } from "./enzymes-crit-b"
import { enzymesCritC } from "./enzymes-crit-c"
import { enzymesCritD } from "./enzymes-crit-d"
import { cellStructureCritA } from "./cell-structure-crit-a"
import { cellStructureCritB } from "./cell-structure-crit-b"
import { cellStructureCritC } from "./cell-structure-crit-c"
import { cellStructureCritD } from "./cell-structure-crit-d"
import { digestionCritA } from "./digestion-crit-a"
import { digestionCritB } from "./digestion-crit-b"
import { digestionCritC } from "./digestion-crit-c"
import { digestionCritD } from "./digestion-crit-d"
import { osmosisCritA } from "./osmosis-crit-a"
import { osmosisCritB } from "./osmosis-crit-b"
import { osmosisCritC } from "./osmosis-crit-c"
import { osmosisCritD } from "./osmosis-crit-d"
import { pathogensCritA } from "./pathogens-crit-a"
import { pathogensCritB } from "./pathogens-crit-b"
import { pathogensCritC } from "./pathogens-crit-c"
import { pathogensCritD } from "./pathogens-crit-d"
import { homeostasisCritA } from "./homeostasis-crit-a"
import { homeostasisCritB } from "./homeostasis-crit-b"
import { homeostasisCritC } from "./homeostasis-crit-c"
import { homeostasisCritD } from "./homeostasis-crit-d"
import { habitatCritA } from "./habitat-crit-a"
import { habitatCritB } from "./habitat-crit-b"
import { habitatCritC } from "./habitat-crit-c"
import { habitatCritD } from "./habitat-crit-d"
import { geneticsCritA } from "./genetics-crit-a"
import { geneticsCritB } from "./genetics-crit-b"
import { geneticsCritC } from "./genetics-crit-c"
import { geneticsCritD } from "./genetics-crit-d"
import { evolutionCritA } from "./evolution-crit-a"
import { evolutionCritB } from "./evolution-crit-b"
import { evolutionCritC } from "./evolution-crit-c"
import { evolutionCritD } from "./evolution-crit-d"
import { healthCritA } from "./health-crit-a"
import { healthCritB } from "./health-crit-b"
import { healthCritC } from "./health-crit-c"
import { healthCritD } from "./health-crit-d"
import { conservationCritA } from "./conservation-crit-a"
import { conservationCritB } from "./conservation-crit-b"
import { conservationCritC } from "./conservation-crit-c"
import { conservationCritD } from "./conservation-crit-d"

// All native (engine-rendered) strandhoot content packs, keyed by slug.
export const PACKS: Record<string, StrandhootPack> = {
  [kinematicsCritA.slug]: kinematicsCritA,
  [pendulumCritB.slug]: pendulumCritB,
  [halfLifeCritC.slug]: halfLifeCritC,
  [energyResourcesCritD.slug]: energyResourcesCritD,
  [forcesCritA.slug]: forcesCritA,
  [circuitsCritA.slug]: circuitsCritA,
  [wavesCritA.slug]: wavesCritA,
  [tirCriteriaA.slug]: tirCriteriaA,
  [labReportCriteriaB.slug]: labReportCriteriaB,
  [wireResistanceCritB.slug]: wireResistanceCritB,
  [coolingCritB.slug]: coolingCritB,
  [hookesLawCritB.slug]: hookesLawCritB,
  [magnetismCritC.slug]: magnetismCritC,
  [accelerationCritC.slug]: accelerationCritC,
  [shcCritC.slug]: shcCritC,
  [boylesLawCritC.slug]: boylesLawCritC,
  [nuclearSocietyCritD.slug]: nuclearSocietyCritD,
  [climateCritD.slug]: climateCritD,
  [emSpectrumCritD.slug]: emSpectrumCritD,
  [transportSafetyCritD.slug]: transportSafetyCritD,
  [balanceCritA.slug]: balanceCritA,
  [balanceCritB.slug]: balanceCritB,
  [balanceCritC.slug]: balanceCritC,
  [balanceCritD.slug]: balanceCritD,
  // Chemistry ch2–12
  [evidenceCritA.slug]: evidenceCritA,
  [evidenceCritB.slug]: evidenceCritB,
  [evidenceCritC.slug]: evidenceCritC,
  [evidenceCritD.slug]: evidenceCritD,
  [consequencesCritA.slug]: consequencesCritA,
  [consequencesCritB.slug]: consequencesCritB,
  [consequencesCritC.slug]: consequencesCritC,
  [consequencesCritD.slug]: consequencesCritD,
  [energyCritA.slug]: energyCritA,
  [energyCritB.slug]: energyCritB,
  [energyCritC.slug]: energyCritC,
  [energyCritD.slug]: energyCritD,
  [conditionsCritA.slug]: conditionsCritA,
  [conditionsCritB.slug]: conditionsCritB,
  [conditionsCritC.slug]: conditionsCritC,
  [conditionsCritD.slug]: conditionsCritD,
  [formCritA.slug]: formCritA,
  [formCritB.slug]: formCritB,
  [formCritC.slug]: formCritC,
  [formCritD.slug]: formCritD,
  [functionCritA.slug]: functionCritA,
  [functionCritB.slug]: functionCritB,
  [functionCritC.slug]: functionCritC,
  [functionCritD.slug]: functionCritD,
  [interactionCritA.slug]: interactionCritA,
  [interactionCritB.slug]: interactionCritB,
  [interactionCritC.slug]: interactionCritC,
  [interactionCritD.slug]: interactionCritD,
  [modelsCritA.slug]: modelsCritA,
  [modelsCritB.slug]: modelsCritB,
  [modelsCritC.slug]: modelsCritC,
  [modelsCritD.slug]: modelsCritD,
  [movementCritA.slug]: movementCritA,
  [movementCritB.slug]: movementCritB,
  [movementCritC.slug]: movementCritC,
  [movementCritD.slug]: movementCritD,
  [patternsCritA.slug]: patternsCritA,
  [patternsCritB.slug]: patternsCritB,
  [patternsCritC.slug]: patternsCritC,
  [patternsCritD.slug]: patternsCritD,
  [transferCritA.slug]: transferCritA,
  [transferCritB.slug]: transferCritB,
  [transferCritC.slug]: transferCritC,
  [transferCritD.slug]: transferCritD,
  // Biology ch1–ch12
  [respirationCritA.slug]: respirationCritA,
  [respirationCritB.slug]: respirationCritB,
  [respirationCritC.slug]: respirationCritC,
  [respirationCritD.slug]: respirationCritD,
  [enzymesCritA.slug]: enzymesCritA,
  [enzymesCritB.slug]: enzymesCritB,
  [enzymesCritC.slug]: enzymesCritC,
  [enzymesCritD.slug]: enzymesCritD,
  [cellStructureCritA.slug]: cellStructureCritA,
  [cellStructureCritB.slug]: cellStructureCritB,
  [cellStructureCritC.slug]: cellStructureCritC,
  [cellStructureCritD.slug]: cellStructureCritD,
  [digestionCritA.slug]: digestionCritA,
  [digestionCritB.slug]: digestionCritB,
  [digestionCritC.slug]: digestionCritC,
  [digestionCritD.slug]: digestionCritD,
  [osmosisCritA.slug]: osmosisCritA,
  [osmosisCritB.slug]: osmosisCritB,
  [osmosisCritC.slug]: osmosisCritC,
  [osmosisCritD.slug]: osmosisCritD,
  [pathogensCritA.slug]: pathogensCritA,
  [pathogensCritB.slug]: pathogensCritB,
  [pathogensCritC.slug]: pathogensCritC,
  [pathogensCritD.slug]: pathogensCritD,
  [homeostasisCritA.slug]: homeostasisCritA,
  [homeostasisCritB.slug]: homeostasisCritB,
  [homeostasisCritC.slug]: homeostasisCritC,
  [homeostasisCritD.slug]: homeostasisCritD,
  [habitatCritA.slug]: habitatCritA,
  [habitatCritB.slug]: habitatCritB,
  [habitatCritC.slug]: habitatCritC,
  [habitatCritD.slug]: habitatCritD,
  [geneticsCritA.slug]: geneticsCritA,
  [geneticsCritB.slug]: geneticsCritB,
  [geneticsCritC.slug]: geneticsCritC,
  [geneticsCritD.slug]: geneticsCritD,
  [evolutionCritA.slug]: evolutionCritA,
  [evolutionCritB.slug]: evolutionCritB,
  [evolutionCritC.slug]: evolutionCritC,
  [evolutionCritD.slug]: evolutionCritD,
  [healthCritA.slug]: healthCritA,
  [healthCritB.slug]: healthCritB,
  [healthCritC.slug]: healthCritC,
  [healthCritD.slug]: healthCritD,
  [conservationCritA.slug]: conservationCritA,
  [conservationCritB.slug]: conservationCritB,
  [conservationCritC.slug]: conservationCritC,
  [conservationCritD.slug]: conservationCritD,
}

export function getPack(slug: string): StrandhootPack | undefined {
  return PACKS[slug]
}
