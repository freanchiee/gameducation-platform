import type { WorldSlug } from './registry';

export interface WorldTemplate {
  slug: WorldSlug;
  displayName: string;
  artifactType: string;
  promptLabel: string;
  description: string;
  accentClass: string;
  coverClass: string;
  avatar: string;
  handlePrefix: string;
  statLabels: [string, string, string];
  rubricHints: string[];
}

export const WORLD_TEMPLATES: Record<WorldSlug, WorldTemplate> = {
  cellbook: {
    slug: 'cellbook',
    displayName: 'CellBook',
    artifactType: 'organelle_card',
    promptLabel: 'Organelle profile',
    description: 'Cells, organelles, structures, and functions.',
    accentClass: 'bg-mint text-navy',
    coverClass: 'bg-gradient-to-br from-green to-mint',
    avatar: '🧫',
    handlePrefix: 'cell',
    statLabels: ['Function', 'Location', 'Structure'],
    rubricHints: ['Function accuracy', 'Cellular location', 'Structure-function link'],
  },
  organistagram: {
    slug: 'organistagram',
    displayName: 'Organistagram',
    artifactType: 'ecosystem_profile',
    promptLabel: 'Ecosystem component profile',
    description: 'Ecosystems, organisms, niches, food webs, and interactions.',
    accentClass: 'bg-green text-white',
    coverClass: 'bg-gradient-to-br from-green to-mint',
    avatar: '🌿',
    handlePrefix: 'eco',
    statLabels: ['Role', 'Web', 'Flow'],
    rubricHints: ['Role in ecosystem', 'Interactions', 'Energy/material flow'],
  },
  reactagram: {
    slug: 'reactagram',
    displayName: 'Reactagram',
    artifactType: 'reaction_profile',
    promptLabel: 'Chemical reaction profile',
    description: 'Reactants, products, equations, energy, and evidence of reactions.',
    accentClass: 'bg-red text-white',
    coverClass: 'bg-gradient-to-br from-red-deep to-red',
    avatar: '⚗️',
    handlePrefix: 'rxn',
    statLabels: ['Reactants', 'Products', 'Energy'],
    rubricHints: ['Reactants/products', 'Balanced reasoning', 'Energy or evidence'],
  },
  physigram: {
    slug: 'physigram',
    displayName: 'Physigram',
    artifactType: 'physics_concept_profile',
    promptLabel: 'Physics concept profile',
    description: 'Forces, fields, motion, energy, and real-world physical systems.',
    accentClass: 'bg-blue-band text-white',
    coverClass: 'bg-gradient-to-br from-blue-band to-navy-2',
    avatar: '🧲',
    handlePrefix: 'phys',
    statLabels: ['Model', 'Variables', 'Example'],
    rubricHints: ['Concept definition', 'Variables/relationships', 'Real-world example'],
  },
};
