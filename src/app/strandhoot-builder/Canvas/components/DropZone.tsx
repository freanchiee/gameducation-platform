'use client';

import React, { useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragDrop } from '../../context/DragDropContext';
import EmptyState from '../controls/EmptyState';
import DragIndicator from '../controls/DragIndicator';
import { getDropZoneStyles } from '../utils/canvasStyles';

interface DropZoneProps {
  children: React.ReactNode;
  onDrop: (block: any) => void;
  isEmpty: boolean;
  readOnly?: boolean;
  className?: string;
}

const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(({
  children,
  onDrop,
  isEmpty,
  readOnly = false,
  className = '',
}, ref) => {
  const { dragState, completeDrop, setDropTarget, clearDropTarget, getHTML5DragData } = useDragDrop();
  const [isHoveringCanvas, setIsHoveringCanvas] = React.useState(false);
  const [dragEnterCounter, setDragEnterCounter] = React.useState(0);
  const [dropPreview, setDropPreview] = React.useState<{ 
    show: boolean; 
    blockType?: string; 
    blockIcon?: string 
  }>({ show: false });

  const dropRef = useRef<HTMLDivElement>(null);

  // Combine refs
  React.useImperativeHandle(ref, () => dropRef.current as HTMLDivElement);

  // Enhanced HTML5 drag handlers
  React.useEffect(() => {
    const element = dropRef.current;
    if (!element || readOnly) return;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      setDragEnterCounter(prev => prev + 1);
      
      if (!isHoveringCanvas) {
        console.log('🎯 DropZone: Drag enter');
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
          console.log('🎯 DropZone: Drag leave');
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
      
      console.log('🎯 DropZone: Drop received');
      
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
              console.log(`✅ DropZone: Got block data from ${format}:`, blockData?.type);
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
          const newBlock = {
            ...blockData,
            id: `block-${timestamp}-${random}`,
            content: JSON.parse(JSON.stringify(blockData.content || {})),
          };

          console.log('✅ DropZone: Creating new block', newBlock.type, newBlock.id);
          onDrop(newBlock);
          completeDrop();
        } catch (error) {
          console.error('❌ DropZone: Error creating block:', error);
        }
      } else {
        console.error('❌ DropZone: No block data found in drop');
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
  }, [
    isHoveringCanvas, 
    setDropTarget, 
    dragState.draggedBlock, 
    dropPreview.show, 
    clearDropTarget, 
    getHTML5DragData, 
    onDrop, 
    completeDrop, 
    readOnly
  ]);

  const dropZoneStyles = getDropZoneStyles({
    readOnly,
    isDragging: dragState.isDragging,
    dragSource: dragState.dragSource || null,
    isHovering: isHoveringCanvas
  });

  return (
    <div
      ref={dropRef}
      data-canvas-drop-zone={!readOnly ? "true" : undefined}
      className={`w-full max-w-5xl p-6 mx-auto space-y-6 transition-all duration-500 ease-out ${dropZoneStyles} ${className}`}
    >
      {/* Animated background effects */}
      {dragState.isDragging && !readOnly && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          {/* Floating particles effect */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-4 h-4 rounded-full ${
                isHoveringCanvas ? 'bg-emerald-300' : 'bg-blue-300'
              } opacity-30`}
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
            />
          ))}
          
          {/* Ripple effect when hovering */}
          {isHoveringCanvas && (
            <motion.div
              className="absolute inset-0 border-4 border-emerald-400 rounded-lg opacity-20"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}
        </div>
      )}

      {/* Empty state */}
      {isEmpty && !readOnly && (
        <EmptyState 
          isHovering={isHoveringCanvas}
          isDragging={dragState.isDragging}
          draggedBlock={dragState.draggedBlock}
          dropPreview={dropPreview}
        />
      )}

      {/* Content */}
      {children}

      {/* Global drag indicators */}
      <DragIndicator 
        isHovering={isHoveringCanvas}
        dragState={dragState}
        dropPreview={dropPreview}
        showFloating={dragState.isDragging && !isEmpty}
        showGlobal={dragState.isDragging && !readOnly}
      />
    </div>
  );
});

DropZone.displayName = 'DropZone';

export default DropZone;