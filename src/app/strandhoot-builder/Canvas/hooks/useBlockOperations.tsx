'use client';

import { useCallback } from 'react';
import type { BlockType, Badge } from '../../types/strandhoot';

interface UseBlockOperationsProps {
  blocks: BlockType[];
  selectedIndex?: number | null;
  onSelectBlock?: (index: number | null) => void;
  onConfigure?: (index: number) => void;
  onDuplicate?: (index: number) => void;
  onDelete: (index: number) => void;
  onMove?: (fromIndex: number, toIndex: number) => void;
}

export function useBlockOperations({
  blocks,
  selectedIndex,
  onSelectBlock,
  onConfigure,
  onDuplicate,
  onDelete,
  onMove,
}: UseBlockOperationsProps) {
  
  // Helper function to extract badges from welcome block for strand blocks
  const getStrandBadges = useCallback((): Badge[] => {
    const welcomeBlock = blocks.find(b => b.type === 'welcome');
    if (welcomeBlock?.content?.badges && Array.isArray(welcomeBlock.content.badges)) {
      return (welcomeBlock.content.badges as Badge[]).map(badge => ({
        emoji: badge.emoji || '⭐',
        label: badge.label || 'Badge',
        description: badge.description || 'Badge description'
      }));
    }
    return [];
  }, [blocks]);

  const handleBlockSelect = useCallback((index: number) => {
    if (onSelectBlock) {
      const newSelection = selectedIndex === index ? null : index;
      onSelectBlock(newSelection);
    }
  }, [selectedIndex, onSelectBlock]);

  const handleBlockConfigure = useCallback((index: number) => {
    if (onConfigure) {
      onConfigure(index);
    }
  }, [onConfigure]);

  const handleBlockDuplicate = useCallback((index: number) => {
    if (onDuplicate) {
      onDuplicate(index);
    }
  }, [onDuplicate]);

  const handleBlockDelete = useCallback((index: number) => {
    // Clear selection if deleting selected block
    if (selectedIndex === index && onSelectBlock) {
      onSelectBlock(null);
    }
    onDelete(index);
  }, [selectedIndex, onSelectBlock, onDelete]);

  const handleBlockMove = useCallback((fromIndex: number, toIndex: number) => {
    if (onMove && toIndex >= 0 && toIndex < blocks.length && fromIndex !== toIndex) {
      // Update selection to follow the moved block
      if (selectedIndex === fromIndex && onSelectBlock) {
        onSelectBlock(toIndex);
      } else if (selectedIndex !== null && selectedIndex !== undefined && onSelectBlock) {
        // Adjust selection index if other blocks are moving around it
        if (fromIndex < selectedIndex && toIndex >= selectedIndex) {
          onSelectBlock(selectedIndex - 1);
        } else if (fromIndex > selectedIndex && toIndex <= selectedIndex) {
          onSelectBlock(selectedIndex + 1);
        }
      }
      
      onMove(fromIndex, toIndex);
    }
  }, [blocks.length, selectedIndex, onSelectBlock, onMove]);

  return {
    getStrandBadges,
    handleBlockSelect,
    handleBlockConfigure,
    handleBlockDuplicate,
    handleBlockDelete,
    handleBlockMove,
  };
}