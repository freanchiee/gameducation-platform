'use client';

import { useState, useRef, useEffect } from 'react';
import { useDragDrop } from '../../context/DragDropContext';
import type { BlockType } from '../../types/strandhoot';

interface UseCanvasDropProps {
  onDrop: (block: BlockType) => void;
  readOnly?: boolean;
}

export function useCanvasDrop({ onDrop, readOnly = false }: UseCanvasDropProps) {
  const { dragState, completeDrop, setDropTarget, clearDropTarget, getHTML5DragData } = useDragDrop();
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);
  const [dragEnterCounter, setDragEnterCounter] = useState(0);
  const [dropPreview, setDropPreview] = useState<{ 
    show: boolean; 
    blockType?: string; 
    blockIcon?: string 
  }>({ show: false });

  const setupDropHandlers = (element: HTMLElement | null) => {
    if (!element || readOnly) return;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      setDragEnterCounter(prev => prev + 1);
      
      if (!isHoveringCanvas) {
        console.log('🎯 useCanvasDrop: Drag enter');
        setIsHoveringCanvas(true);
        setDropTarget('canvas');
        
        setDropPreview({
          show: true,
          blockType: dragState.draggedBlock?.type || 'block',
          blockIcon: dragState.draggedBlock?.icon || '📦'
        });
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer!.dropEffect = 'copy';
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      setDragEnterCounter(prev => {
        const newCount = prev - 1;
        if (newCount <= 0) {
          console.log('🎯 useCanvasDrop: Drag leave');
          setIsHoveringCanvas(false);
          setDropPreview({ show: false });
          clearDropTarget();
          return 0;
        }
        return newCount;
      });
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🎯 useCanvasDrop: Drop received');
      
      setIsHoveringCanvas(false);
      setDragEnterCounter(0);
      setDropPreview({ show: false });
      
      // Try multiple ways to get the block data
      let blockData: any = null;
      
      // Method 1: From our context (for toolbox drags)
      blockData = getHTML5DragData();
      
      // Method 2: From dataTransfer (fallback)
      if (!blockData) {
        const formats = [
          'application/x-strandhoot-block', 
          'application/json', 
          'text/x-block-data', 
          'text/plain'
        ];
        
        for (const format of formats) {
          try {
            const data = e.dataTransfer!.getData(format);
            if (data) {
              blockData = JSON.parse(data);
              console.log(`✅ useCanvasDrop: Got block data from ${format}:`, blockData?.type);
              break;
            }
          } catch (error) {
            console.warn(`Failed to parse data from ${format}:`, error);
          }
        }
      }
      
      if (blockData) {
        try {
          // Create new block with unique ID
          const timestamp = Date.now();
          const random = Math.random().toString(36).substr(2, 9);
          const newBlock: BlockType = {
            ...blockData,
            id: `block-${timestamp}-${random}`,
            content: JSON.parse(JSON.stringify(blockData.content || {})),
          };

          console.log('✅ useCanvasDrop: Creating new block', newBlock.type, newBlock.id);
          onDrop(newBlock);
          completeDrop();
        } catch (error) {
          console.error('❌ useCanvasDrop: Error creating block:', error);
        }
      } else {
        console.error('❌ useCanvasDrop: No block data found in drop');
      }
    };

    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('drop', handleDrop);

    return () => {
      element.removeEventListener('dragenter', handleDragEnter);
      element.removeEventListener('dragover', handleDragOver);
      element.removeEventListener('dragleave', handleDragLeave);
      element.removeEventListener('drop', handleDrop);
    };
  };

  return {
    isHoveringCanvas,
    dragEnterCounter,
    dropPreview,
    setupDropHandlers,
    dragState,
  };
}