// src/app/strandhoot-builder/hooks/builder/useStrandhootOperations.ts
'use client';

import { useCallback, useRef } from 'react';
import { toast } from 'sonner';
import type { BlockType } from '../../types/strandhoot';
import { getStrandsFor } from '../../utils/strandMapping';
import { generateStrandsForCriteria } from '../../utils/generateStrandsForCriteria';

export interface StrandhootOperationsHook {
  // Block CRUD operations
  handleDrop: (block: BlockType) => void;
  handleUpdate: (index: number, updated: BlockType) => void;
  handleDelete: (index: number) => void;
  handleDuplicate: (index: number) => void;
  handleMove: (fromIndex: number, toIndex: number) => void;
  handleConfigure: (index: number) => void;
  handleClearAll: () => void;
  
  // Structure operations
  handleStructureConfirmed: (structure: {
    subject: string;
    criteria: string;
    mypYear: string;
  }) => void;
  handleGenerateSkeleton: (structure: {
    subject: string;
    criteria: string;
    mypYear: string;
  }) => void;
  
  // Utility
  builderId: string;
}

interface UseStrandhootOperationsParams {
  blocks: BlockType[];
  updateBlocks: (blocks: BlockType[]) => void;
  selectedBlockIndex: number | null;
  setSelectedBlockIndex: (index: number | null) => void;
}

export function useStrandhootOperations({
  blocks,
  updateBlocks,
  selectedBlockIndex,
  setSelectedBlockIndex,
}: UseStrandhootOperationsParams): StrandhootOperationsHook {
  
  // ✅ Builder ID for tracking
  const builderId = useRef(`builder-${Date.now()}`);

  // ✅ Enhanced drop handler with better error handling
  const handleDrop = useCallback((block: BlockType) => {
    try {
      console.log('🔥 StrandhootOperations: Dropping block:', block.type, block.id);

      // Validate the incoming block
      if (!block || !block.type) {
        console.error('❌ Invalid block data:', block);
        toast.error('Invalid block data');
        return;
      }

      // Generate unique ID with better entropy
      const timestamp = Date.now();
      const random = Math.random().toString(36).substr(2, 9);
      const entropy = Math.random().toString(36).substr(2, 5);
      
      const newBlock: BlockType = {
        ...block,
        id: `${block.type}-${timestamp}-${random}-${entropy}`,
        type: block.type,
        label: block.label || `${block.type.charAt(0).toUpperCase()}${block.type.slice(1)} Block`,
        icon: block.icon || '📦',
        content: JSON.parse(JSON.stringify(block.content || {})),
      };

      // Add metadata
      if (!newBlock.content) newBlock.content = {};
      newBlock.content._createdAt = new Date().toISOString();
      newBlock.content._builderId = builderId.current;
      
      console.log('✅ StrandhootOperations: Created new block:', newBlock.id);
      
      updateBlocks([...blocks, newBlock]);
      
      toast.success(`Added ${newBlock.label}`, {
        description: `Block ID: ${newBlock.id.slice(-8)}`,
        duration: 2000,
      });

      // Select the new block
      setSelectedBlockIndex(blocks.length);

    } catch (error) {
      console.error('❌ StrandhootOperations: Error in handleDrop:', error);
      toast.error('Failed to add block');
    }
  }, [blocks, updateBlocks, setSelectedBlockIndex]);

  // ✅ Enhanced update handler
  const handleUpdate = useCallback((index: number, updated: BlockType) => {
    try {
      if (index < 0 || index >= blocks.length) {
        console.error('❌ Invalid block index:', index);
        return;
      }

      console.log('🔄 StrandhootOperations: Updating block at index:', index, updated.type);

      const newBlocks = [...blocks];
      newBlocks[index] = {
        ...updated,
        content: {
          ...updated.content,
          _updatedAt: new Date().toISOString(),
        }
      };

      updateBlocks(newBlocks);
    } catch (error) {
      console.error('❌ StrandhootOperations: Error in handleUpdate:', error);
      toast.error('Failed to update block');
    }
  }, [blocks, updateBlocks]);

  // ✅ Enhanced delete handler
  const handleDelete = useCallback((index: number) => {
    try {
      if (index < 0 || index >= blocks.length) {
        console.error('❌ Invalid block index for deletion:', index);
        return;
      }

      const blockToDelete = blocks[index];
      const newBlocks = blocks.filter((_, i) => i !== index);
      
      updateBlocks(newBlocks);
      
      // Clear selection if deleted block was selected
      if (selectedBlockIndex === index) {
        setSelectedBlockIndex(null);
      } else if (selectedBlockIndex !== null && selectedBlockIndex > index) {
        setSelectedBlockIndex(selectedBlockIndex - 1);
      }

      toast.success(`Deleted ${blockToDelete.label || blockToDelete.type}`, {
        description: `Block removed from position ${index + 1}`,
        duration: 2000,
      });
    } catch (error) {
      console.error('❌ StrandhootOperations: Error in handleDelete:', error);
      toast.error('Failed to delete block');
    }
  }, [blocks, updateBlocks, selectedBlockIndex, setSelectedBlockIndex]);

  // ✅ Duplicate handler
  const handleDuplicate = useCallback((index: number) => {
    try {
      const blockToDupe = blocks[index];
      if (!blockToDupe) return;

      const timestamp = Date.now();
      const random = Math.random().toString(36).substr(2, 9);
      
      const newBlock: BlockType = {
        ...blockToDupe,
        id: `${blockToDupe.type}-${timestamp}-${random}-copy`,
        label: `${blockToDupe.label || blockToDupe.type} (Copy)`,
        content: {
          ...JSON.parse(JSON.stringify(blockToDupe.content)), // Deep clone
          _createdAt: new Date().toISOString(),
          _builderId: builderId.current,
          _copiedFrom: blockToDupe.id,
        },
      };

      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, newBlock); // Insert after original
      
      updateBlocks(newBlocks);
      setSelectedBlockIndex(index + 1);

      toast.success(`Duplicated ${blockToDupe.label || blockToDupe.type}`);
    } catch (error) {
      console.error('❌ Error duplicating block:', error);
      toast.error('Failed to duplicate block');
    }
  }, [blocks, updateBlocks, setSelectedBlockIndex]);

  // ✅ Move handler
  const handleMove = useCallback((fromIndex: number, toIndex: number) => {
    try {
      if (fromIndex === toIndex) return;
      
      const newBlocks = [...blocks];
      const [moved] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, moved);
      
      updateBlocks(newBlocks);
      
      // Update selection
      if (selectedBlockIndex === fromIndex) {
        setSelectedBlockIndex(toIndex);
      } else if (selectedBlockIndex !== null) {
        if (selectedBlockIndex > fromIndex && selectedBlockIndex <= toIndex) {
          setSelectedBlockIndex(selectedBlockIndex - 1);
        } else if (selectedBlockIndex < fromIndex && selectedBlockIndex >= toIndex) {
          setSelectedBlockIndex(selectedBlockIndex + 1);
        }
      }

      toast.success('Block moved');
    } catch (error) {
      console.error('❌ Error moving block:', error);
      toast.error('Failed to move block');
    }
  }, [blocks, updateBlocks, selectedBlockIndex, setSelectedBlockIndex]);

  // ✅ Configure handler
  const handleConfigure = useCallback((index: number) => {
    console.log('🛠️ Configure block at index:', index);
    setSelectedBlockIndex(index);
    // TODO: Open configuration modal in future iterations
  }, [setSelectedBlockIndex]);

  // ✅ Clear all handler
  const handleClearAll = useCallback(() => {
    if (blocks.length === 0) {
      toast.info('Canvas is already empty');
      return;
    }

    if (confirm(`Are you sure you want to delete all ${blocks.length} blocks? This cannot be undone.`)) {
      updateBlocks([]);
      setSelectedBlockIndex(null);
      toast.success('Canvas cleared');
    }
  }, [blocks.length, updateBlocks, setSelectedBlockIndex]);

  // ✅ Enhanced structure confirmation handler
  const handleStructureConfirmed = useCallback(({
    subject,
    criteria,
    mypYear,
  }: {
    subject: string;
    criteria: string;
    mypYear: string;
  }) => {
    try {
      console.log('🏗️ StrandhootOperations: Structure confirmed:', { subject, criteria, mypYear });

      const strands = getStrandsFor(subject, criteria);
      if (!strands.length) {
        toast.error(`No strands found for ${subject} Criterion ${criteria}`, {
          description: 'Please check the subject and criterion combination',
        });
        return;
      }

      const iconMap: Record<string, string> = {
        A: '🧠', B: '🔬', C: '📊', D: '🌍',
      };

      const strandBlocks: BlockType[] = strands.map((s, i) => ({
        type: 'strand' as const,
        id: `strand-${criteria}-${i}-${Date.now()}`,
        label: s.heading,
        icon: iconMap[criteria] ?? '📘',
        content: {
          title: s.heading,
          strandId: `${criteria}.${s.strand}`,
          description: s.description,
          subject,
          criteria,
          mypYear,
          strandIndex: i,
          totalStrands: strands.length,
          _createdAt: new Date().toISOString(),
          _builderId: builderId.current,
        },
      }));

      updateBlocks([...blocks, ...strandBlocks]);
      
      toast.success(`Added ${strands.length} strands`, {
        description: `${subject} Criterion ${criteria} structure created`,
        duration: 3000,
      });

    } catch (error) {
      console.error('❌ Error in structure confirmation:', error);
      toast.error('Failed to create strand structure');
    }
  }, [blocks, updateBlocks]);

  // ✅ Enhanced skeleton generation handler
  const handleGenerateSkeleton = useCallback((structure: {
    subject: string;
    criteria: string;
    mypYear: string;
  }) => {
    try {
      console.log('🏗️ StrandhootOperations: Generating skeleton for:', structure);
      
      const newStrands = generateStrandsForCriteria(structure);
      
      if (!newStrands || newStrands.length === 0) {
        toast.error('No skeleton structure available for this configuration');
        return;
      }

      const welcomeIndex = blocks.findIndex((b) => b.type === 'welcome');
      
      if (welcomeIndex >= 0) {
        const getIconForCriteria = (criteria: string): string => {
          const iconMap: Record<string, string> = {
            A: '🧠', B: '🔬', C: '📊', D: '🌍',
          };
          return iconMap[criteria] ?? '📘';
        };

        const strandBlocks: BlockType[] = newStrands.map((strand, index) => ({
          ...strand,
          id: `skeleton-${Date.now()}-${index}`,
          type: 'strand' as const,
          icon: getIconForCriteria(structure.criteria),
          content: {
            ...strand.content,
            strandIndex: index,
            totalStrands: newStrands.length,
            subject: structure.subject,
            criteria: structure.criteria,
            mypYear: structure.mypYear,
            _createdAt: new Date().toISOString(),
            _builderId: builderId.current,
            _isSkeletonGenerated: true,
          }
        }));
        
        const updatedBlocks = [
          ...blocks.slice(0, welcomeIndex + 1),
          ...strandBlocks,
          ...blocks.slice(welcomeIndex + 1),
        ];
        
        updateBlocks(updatedBlocks);
        
        toast.success(`Generated ${strandBlocks.length} strand pages`, {
          description: `Skeleton for ${structure.subject} Criteria ${structure.criteria}`,
          duration: 3000,
        });

      } else {
        toast.error('Add a Welcome block first', {
          description: 'Skeleton generation requires a Welcome block to be present',
        });
      }
    } catch (error) {
      console.error('❌ Error generating skeleton:', error);
      toast.error('Error generating skeleton structure');
    }
  }, [blocks, updateBlocks]);

  return {
    // Block CRUD operations
    handleDrop,
    handleUpdate,
    handleDelete,
    handleDuplicate,
    handleMove,
    handleConfigure,
    handleClearAll,
    
    // Structure operations
    handleStructureConfirmed,
    handleGenerateSkeleton,
    
    // Utility
    builderId: builderId.current,
  };
}