'use client';

import { useCallback } from 'react';
import { generateStrandsForCriteria } from '../../utils/generateStrandsForCriteria';
import { getStrandsFor } from '../../utils/strandMapping';
import type { BlockType } from '../../types/strandhoot';

interface StructureParams {
  subject: string;
  criteria: string;
  mypYear: string;
}

interface UseSkeletonGenerationProps {
  onAddBlocks: (blocks: BlockType[]) => void;
  onError?: (error: Error) => void;
  onSuccess?: (blocksCount: number) => void;
}

export function useSkeletonGeneration({ 
  onAddBlocks, 
  onError,
  onSuccess 
}: UseSkeletonGenerationProps) {
  
  const validateStructure = useCallback((structure: StructureParams): boolean => {
    if (!structure.subject || !structure.criteria || !structure.mypYear) {
      throw new Error('Missing required fields: subject, criteria, or mypYear');
    }
    
    // Check if we have strands for this combination
    const availableStrands = getStrandsFor(structure.subject, structure.criteria);
    if (availableStrands.length === 0) {
      throw new Error(`No strands found for ${structure.subject} Criterion ${structure.criteria}`);
    }
    
    return true;
  }, []);

  const generateSkeleton = useCallback(async (structure: StructureParams) => {
    console.log('🚀 useSkeletonGeneration: Starting generation for:', structure);
    
    try {
      // Validate input
      validateStructure(structure);
      
      // Generate strand blocks using the utility function
      const newStrands = generateStrandsForCriteria(structure);
      console.log('📊 useSkeletonGeneration: Generated raw strands:', newStrands);

      if (newStrands.length === 0) {
        throw new Error('No strands were generated');
      }

      // Enhance blocks with proper metadata
      const enhancedBlocks: BlockType[] = newStrands.map((strandBlock, index) => {
        const baseBlock: BlockType = {
          ...strandBlock,
          icon: '📚',
          label: `${structure.subject} - Strand ${index + 1}`,
          content: {
            ...strandBlock.content,
            // Add strand-specific metadata
            strandId: `${structure.criteria}.${index + 1}`,
            subject: structure.subject,
            criteria: structure.criteria,
            mypYear: structure.mypYear,
            strandIndex: index,
            // Add default student context (can be overridden later)
            studentId: 'demo-student',
            sessionCode: 'demo-session',
            experimentChoice: 'distance',
            // Ensure the block has proper structure
            title: strandBlock.content?.title || `Strand ${index + 1}`,
            description: strandBlock.content?.description || `Learning strand for ${structure.subject} Criterion ${structure.criteria}`,
          },
        };

        return baseBlock;
      });

      console.log('✅ useSkeletonGeneration: Enhanced blocks ready:', enhancedBlocks);

      // Add blocks to canvas
      onAddBlocks(enhancedBlocks);
      
      // Notify success
      onSuccess?.(enhancedBlocks.length);
      
      console.log(`✅ useSkeletonGeneration: Successfully generated ${enhancedBlocks.length} strand blocks`);
      
      return enhancedBlocks;
      
    } catch (error) {
      console.error('💥 useSkeletonGeneration: Generation failed:', error);
      
      const enhancedError = error instanceof Error 
        ? error 
        : new Error('Unknown error during skeleton generation');
      
      onError?.(enhancedError);
      throw enhancedError;
    }
  }, [validateStructure, onAddBlocks, onError, onSuccess]);

  const canGenerate = useCallback((structure: StructureParams): boolean => {
    try {
      return validateStructure(structure);
    } catch {
      return false;
    }
  }, [validateStructure]);

  const getStrandCount = useCallback((structure: StructureParams): number => {
    try {
      if (!structure.subject || !structure.criteria) return 0;
      const strands = getStrandsFor(structure.subject, structure.criteria);
      return strands.length;
    } catch {
      return 0;
    }
  }, []);

  return {
    generateSkeleton,
    canGenerate,
    getStrandCount,
  };
}