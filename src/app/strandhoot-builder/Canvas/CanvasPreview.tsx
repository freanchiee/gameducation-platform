'use client';

import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import type { BlockType, Badge } from '../types/strandhoot';
import DropZone from './components/DropZone';
import BlockWrapper from './components/BlockWrapper';
import BlockRenderer from './components/BlockRenderer';
import { useSkeletonGenerator } from './controls/SkeletonGenerator';
import { useBlockOperations } from './hooks/useBlockOperations';

interface CanvasPreviewProps {
  blocks: BlockType[];
  onDrop: (block: BlockType) => void;
  onUpdate: (index: number, updated: BlockType) => void;
  onDelete: (index: number) => void;
  onConfigure?: (index: number) => void;
  onDuplicate?: (index: number) => void;
  onMove?: (fromIndex: number, toIndex: number) => void;
  onStructureConfirmed?: (params: {
    subject: string;
    criteria: string;
    mypYear: string;
  }) => void;
  onGenerateSkeleton?: (structure: {  // ✅ Added this missing prop
    subject: string;
    criteria: string;
    mypYear: string;
  }) => void;
  selectedIndex?: number | null;
  onSelectBlock?: (index: number | null) => void;
  readOnly?: boolean;
}

export default function CanvasPreview({
  blocks,
  onDrop,
  onUpdate,
  onDelete,
  onConfigure,
  onDuplicate,
  onMove,
  onStructureConfirmed,
  onGenerateSkeleton,  // ✅ Added this to destructuring
  selectedIndex,
  onSelectBlock,
  readOnly = false,
}: CanvasPreviewProps) {
  console.log('🔍 CanvasPreview RENDERED with blocks:', blocks.length, 'readOnly:', readOnly);

  // 🚀 FIXED: Proper skeleton generation that adds blocks to the canvas
  const handleAddBlocks = useCallback((newBlocks: BlockType[]) => {
    console.log('🚀 CanvasPreview: handleAddBlocks called with:', newBlocks.length, 'blocks');
    console.log('📊 CanvasPreview: Block details:', newBlocks.map(b => ({ id: b.id, type: b.type, label: b.label })));
    
    // Add each block individually with slight delay for visual effect
    newBlocks.forEach((block, index) => {
      setTimeout(() => {
        console.log(`🔗 CanvasPreview: Adding block ${index + 1}/${newBlocks.length}:`, block.type, block.id);
        onDrop(block);
      }, index * 150); // Stagger the additions
    });
  }, [onDrop]);

  const { generateSkeleton } = useSkeletonGenerator({ onAddBlocks: handleAddBlocks });

  // Block operations
  const {
    getStrandBadges,
    handleBlockSelect,
    handleBlockConfigure,
    handleBlockDuplicate,
    handleBlockDelete,
    handleBlockMove,
  } = useBlockOperations({
    blocks,
    selectedIndex,
    onSelectBlock,
    onConfigure,
    onDuplicate,
    onDelete,
    onMove,
  });

  // 🚀 FIXED: Enhanced skeleton generation handler that actually creates blocks
  const handleGenerateSkeleton = useCallback((structure: {
    subject: string;
    criteria: string;
    mypYear: string;
  }) => {
    console.log('🚀 CanvasPreview: Received skeleton generation request:', structure);
    
    try {
      // ✅ If parent provided onGenerateSkeleton, use it instead of internal logic
      if (onGenerateSkeleton) {
        console.log('🔄 CanvasPreview: Using parent onGenerateSkeleton handler');
        onGenerateSkeleton(structure);
        return;
      }
      
      // Otherwise, use internal skeleton generation
      generateSkeleton(structure);
      console.log('✅ CanvasPreview: Internal skeleton generation initiated successfully');
    } catch (error) {
      console.error('💥 CanvasPreview: Skeleton generation failed:', error);
    }
  }, [generateSkeleton, onGenerateSkeleton]);

  return (
    <DropZone
      onDrop={onDrop}
      isEmpty={blocks.length === 0}
      readOnly={readOnly}
    >
      {blocks.map((block, index) => {
        const isResponseBlock = ['rich', 'short', 'extended', 'mcq', 'fill'].includes(block.type);
        
        // Calculate question counter dynamically without state
        const responseBlocksBefore = blocks.slice(0, index).filter(b => 
          ['rich', 'short', 'extended', 'mcq', 'fill'].includes(b.type)
        ).length;
        const questionId = isResponseBlock ? `Q${responseBlocksBefore + 1}` : undefined;

        // Inject questionId into block content if needed
        if (isResponseBlock && !block.content?.questionId) {
          if (!block.content) block.content = {};
          block.content.questionId = questionId;
        }

        // ✅ FIX: Calculate correct strand index by filtering out non-strand blocks
        const strandBlocks = blocks.filter(b => b.type === 'strand');
        const currentStrandIndex = block.type === 'strand' 
          ? strandBlocks.findIndex(sb => sb.id === block.id)
          : 0;

        const isSelected = selectedIndex === index && !readOnly;

        return (
          <BlockWrapper
            key={block.id}
            block={block}
            index={index}
            isSelected={isSelected}
            readOnly={readOnly}
            onSelect={() => handleBlockSelect(index)}
            onConfigure={() => handleBlockConfigure(index)}
            onDuplicate={() => handleBlockDuplicate(index)}
            onDelete={() => handleBlockDelete(index)}
            onMoveUp={() => handleBlockMove(index, index - 1)}
            onMoveDown={() => handleBlockMove(index, index + 1)}
            canMoveUp={index > 0}
            canMoveDown={index < blocks.length - 1}
          >
            <BlockRenderer
              block={block}
              index={index}
              questionId={questionId}
              readOnly={readOnly}
              onUpdate={(updated: BlockType) => onUpdate(index, updated)}
              onDelete={() => onDelete(index)}
              onConfigure={() => onConfigure?.(index)}
              strandIndex={currentStrandIndex} // ✅ Pass the correct strand index
              totalStrands={strandBlocks.length} // ✅ Count only strand blocks
              allStrandBlocks={strandBlocks} // ✅ Pass only strand blocks
              badges={getStrandBadges()}
              onNext={() => {}}
              onFinish={() => {}}
              onStructureConfirmed={onStructureConfirmed}
              onGenerateSkeleton={handleGenerateSkeleton}
            />
          </BlockWrapper>
        );
      })}

      {/* Add Section Button */}
      {blocks.length > 0 && !readOnly && (
        <div className="flex justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const timestamp = Date.now();
              const newStrandBlock: BlockType = {
                type: 'strand' as const,
                id: `temp-${timestamp}`,
                label: 'New Strand',
                icon: '🧱',
                content: {},
              };
              onDrop(newStrandBlock);
            }}
            className="group flex items-center gap-2 text-sm text-zinc-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full border-2 border-dashed border-zinc-300 hover:border-blue-400 bg-white shadow-sm hover:shadow-md transition-all duration-200"
          >
            <motion.span
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg group-hover:scale-110 transition-transform"
            >
              ➕
            </motion.span>
            <span className="font-medium">Add Section</span>
          </motion.button>
        </div>
      )}
    </DropZone>
  );
}