'use client';

import { useCallback } from 'react';
import { generateStrandsForCriteria } from '../../utils/generateStrandsForCriteria';
import type { BlockType } from '../../types/strandhoot';

interface SkeletonGeneratorProps {
  onAddBlocks: (blocks: BlockType[]) => void;
}

interface StructureParams {
  subject: string;
  criteria: string;
  mypYear: string;
}

export function useSkeletonGenerator({ onAddBlocks }: SkeletonGeneratorProps) {
  const generateSkeleton = useCallback((structure: StructureParams) => {
    console.log('🚀 SkeletonGenerator: Starting skeleton generation for:', structure);
    
    try {
      // Generate strand blocks using the utility function
      const newStrands = generateStrandsForCriteria(structure);
      console.log('📊 SkeletonGenerator: Generated strand blocks:', newStrands);

      if (newStrands.length === 0) {
        console.warn('⚠️ SkeletonGenerator: No strands generated');
        return;
      }

      // ✅ FIX: Don't override the good data! Only add minimal required fields
      const strandBlocks: BlockType[] = newStrands.map((strandBlock) => ({
        ...strandBlock, // ✅ Keep all the good data from generateStrandsForCriteria
        content: {
          ...strandBlock.content, // ✅ Keep the proper title, description, strandId
          // Only add additional metadata, don't override existing data
          studentId: 'demo-student',
          sessionCode: 'demo-session',
          experimentChoice: 'distance' as const,
        },
      }));

      console.log('✅ SkeletonGenerator: Final strand blocks prepared:', strandBlocks);
      console.log('🔍 First strand details:', {
        id: strandBlocks[0]?.id,
        type: strandBlocks[0]?.type,
        label: strandBlocks[0]?.label,
        icon: strandBlocks[0]?.icon,
        title: strandBlocks[0]?.content?.title,
        description: strandBlocks[0]?.content?.description,
        strandId: strandBlocks[0]?.content?.strandId,
      });

      // Add all blocks at once for better performance
      onAddBlocks(strandBlocks);

      console.log(`✅ SkeletonGenerator: Successfully added ${strandBlocks.length} strand blocks`);
      
    } catch (error) {
      console.error('💥 SkeletonGenerator: Error generating skeleton:', error);
      throw error; // Re-throw so parent can handle it
    }
  }, [onAddBlocks]);

  return { generateSkeleton };
}

// Component version if you need a React component wrapper
export default function SkeletonGenerator({ onAddBlocks }: SkeletonGeneratorProps) {
  const { generateSkeleton } = useSkeletonGenerator({ onAddBlocks });
  
  // This component doesn't render anything, it just provides the generation function
  // You can expose the generateSkeleton function through a ref or context if needed
  return null;
}