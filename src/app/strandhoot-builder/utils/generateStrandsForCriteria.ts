import { v4 as uuid } from 'uuid';
import type { BlockType } from '../types/strandhoot';
import { getStrandsFor } from './strandMapping'; // ✅ Import the mapping function

export function generateStrandsForCriteria(input: {
  subject: string;
  criteria: string;
  mypYear: string;
}): BlockType[] {
  const { subject, criteria } = input;

  // ✅ Use the actual strand mapping data instead of hardcoded counts
  const strandData = getStrandsFor(subject, criteria);
  
  console.log('🔍 generateStrandsForCriteria: Found strand data:', strandData);

  if (strandData.length === 0) {
    console.warn(`❌ No strands found for ${subject} Criterion ${criteria}`);
    return [];
  }

  // ✅ Dynamic icons based on criteria
  const getIconForCriteria = (criteria: string): string => {
    const iconMap: Record<string, string> = {
      A: '🧠', // Knowledge/Understanding
      B: '🔬', // Investigating/Inquiry
      C: '📊', // Processing/Evaluating  
      D: '🌍', // Reflection/Application
    };
    return iconMap[criteria] || '🧪';
  };

  // ✅ Generate blocks with proper titles and descriptions from mapping
  return strandData.map((strand, i) => ({
    id: uuid(),
    type: 'strand' as const,
    label: strand.heading, // ✅ Use the actual heading from mapping
    icon: getIconForCriteria(criteria), // ✅ Dynamic icon based on criteria
    content: {
      title: strand.heading, // ✅ Use actual strand heading
      description: strand.description, // ✅ Use actual strand description
      strandId: `${criteria}.${strand.strand}`, // ✅ Proper strand ID (e.g., "A.i")
      subject,
      criteria,
      mypYear: input.mypYear,
      tabs: [
        { title: 'Resources', content: '' },
        { title: 'Your Work', content: '' },
      ],
      droppedBlocks: [],
      addedBlocks: [], // ✅ Initialize empty blocks array
    },
  }));
}

// ✅ Keep as fallback, but now it's not the primary source
function getStrandCount(subject: string, criteria: string): number {
  const map: Record<string, Record<string, number>> = {
    Sciences: { A: 3, B: 4, C: 5, D: 3 }, // ✅ Fixed: A should be 3, not 2
    'Language and Literature': { A: 4, B: 4, C: 4, D: 4 },
    'Language Acquisition': { A: 3, B: 3, C: 3, D: 3 },
    'Individuals and Societies': { A: 3, B: 4, C: 4, D: 3 },
    'Arts': { A: 3, B: 3, C: 3, D: 3 },
    'Design & Technology': { A: 4, B: 3, C: 3, D: 3 },
  };

  return map[subject]?.[criteria] ?? 4;
}