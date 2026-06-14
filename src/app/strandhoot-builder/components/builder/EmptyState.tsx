'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Plus, BookOpen, Lightbulb, MousePointer } from 'lucide-react';
import { useRef, useEffect, useCallback, useState } from 'react';
import { useDragDrop } from '../../context/DragDropContext';
import type { BlockType } from '../../types/strandhoot';

interface EmptyStateProps {
  isOver?: boolean;
  onAddWelcomeBlock: () => void;
  onShowTemplates?: () => void;
  showQuickStart?: boolean;
  onDrop?: (block: BlockType) => void; // ✅ Add onDrop prop
}

export default function EmptyState({
  isOver: propIsOver = false,
  onAddWelcomeBlock,
  onShowTemplates,
  showQuickStart = true,
  onDrop, // ✅ Accept onDrop from parent
}: EmptyStateProps) {
  console.log('🔍 EmptyState RENDERED with onDrop:', !!onDrop); // ✅ Debug log

  const { dragState, completeDrop, setDropTarget, clearDropTarget, getHTML5DragData } = useDragDrop();
  
  // ✅ Local hover state for HTML5 drag feedback
  const [isHoveringEmpty, setIsHoveringEmpty] = useState(false);
  const [dragEnterCounter, setDragEnterCounter] = useState(0);
  const [dropPreview, setDropPreview] = useState<{ show: boolean; blockType?: string; blockIcon?: string }>({
    show: false
  });
  const dropRef = useRef<HTMLDivElement>(null);

  // ✅ HTML5 drag handlers - same pattern as CanvasPreview
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragEnterCounter(prev => prev + 1);
    
    if (!isHoveringEmpty) {
      console.log('🎯 EmptyState HTML5: Drag enter');
      setIsHoveringEmpty(true);
      setDropTarget('canvas');
      
      // Show drop preview with block info
      setDropPreview({
        show: true,
        blockType: dragState.draggedBlock?.type || 'block',
        blockIcon: dragState.draggedBlock?.icon || '📦'
      });
    }
  }, [isHoveringEmpty, setDropTarget, dragState.draggedBlock]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    
    // Keep the drop preview active
    if (!dropPreview.show && isHoveringEmpty) {
      setDropPreview({
        show: true,
        blockType: dragState.draggedBlock?.type || 'block',
        blockIcon: dragState.draggedBlock?.icon || '📦'
      });
    }
  }, [isHoveringEmpty, dropPreview.show, dragState.draggedBlock]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragEnterCounter(prev => {
      const newCount = prev - 1;
      if (newCount <= 0) {
        console.log('🎯 EmptyState HTML5: Drag leave');
        setIsHoveringEmpty(false);
        setDropPreview({ show: false });
        clearDropTarget();
        return 0;
      }
      return newCount;
    });
  }, [clearDropTarget]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🎯 EmptyState HTML5: Drop received');
    
    setIsHoveringEmpty(false);
    setDragEnterCounter(0);
    setDropPreview({ show: false });
    
    // Try multiple ways to get the block data - same as CanvasPreview
    let blockData: BlockType | null = null;
    
    // Method 1: From our context (for toolbox drags)
    blockData = getHTML5DragData();
    
    // Method 2: From dataTransfer (fallback)
    if (!blockData) {
      const formats = ['application/x-strandhoot-block', 'application/json', 'text/x-block-data', 'text/plain'];
      
      for (const format of formats) {
        try {
          const data = e.dataTransfer.getData(format);
          if (data) {
            blockData = JSON.parse(data);
            console.log(`✅ EmptyState: Got block data from ${format}:`, blockData?.type);
            break;
          }
        } catch (error) {
          console.warn(`Failed to parse data from ${format}:`, error);
        }
      }
    }
    
    if (blockData && onDrop) {
      try {
        // Create new block with unique ID - same as CanvasPreview
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        const newBlock: BlockType = {
          ...blockData,
          id: `block-${timestamp}-${random}`,
          content: JSON.parse(JSON.stringify(blockData.content || {})),
        };

        console.log('✅ EmptyState: Creating new block', newBlock.type, newBlock.id);
        onDrop(newBlock);
        completeDrop();
      } catch (error) {
        console.error('❌ EmptyState: Error creating block:', error);
      }
    } else {
      console.error('❌ EmptyState: No block data found in drop or no onDrop handler');
    }
  }, [onDrop, completeDrop, getHTML5DragData]);

  // ✅ Connect HTML5 drag events to the ref - same as CanvasPreview
  useEffect(() => {
    const element = dropRef.current;
    if (!element) return;

    element.addEventListener('dragenter', handleDragEnter as any);
    element.addEventListener('dragover', handleDragOver as any);
    element.addEventListener('dragleave', handleDragLeave as any);
    element.addEventListener('drop', handleDrop as any);

    return () => {
      element.removeEventListener('dragenter', handleDragEnter as any);
      element.removeEventListener('dragover', handleDragOver as any);
      element.removeEventListener('dragleave', handleDragLeave as any);
      element.removeEventListener('drop', handleDrop as any);
    };
  }, [handleDragEnter, handleDragOver, handleDragLeave, handleDrop]);

  // ✅ Determine final isOver state (prop override or local hover)
  const isOver = propIsOver || isHoveringEmpty;
  const isDraggingFromToolbox = dragState.isDragging && dragState.dragSource === 'toolbox';

  // ✅ Enhanced drop zone styles with better visual feedback
  const getDropZoneStyles = () => {
    if (isDraggingFromToolbox) {
      if (isOver) {
        return `
          border-emerald-400 bg-emerald-50 scale-105
          ring-4 ring-emerald-200 ring-opacity-50
          shadow-2xl
        `;
      } else {
        return `
          border-blue-400 bg-blue-50 scale-102
          ring-2 ring-blue-200 ring-opacity-30
          shadow-lg
        `;
      }
    }
    
    return 'border-zinc-300 bg-white hover:border-zinc-400 hover:bg-zinc-50';
  };

  return (
    <div 
      ref={dropRef}
      data-empty-drop-zone="true"
      className="w-full max-w-5xl p-6 mx-auto space-y-6"
    >
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ 
          opacity: isOver ? 1 : (isDraggingFromToolbox ? 0.8 : 0.6),
          scale: isOver ? 1.02 : (isDraggingFromToolbox ? 1.01 : 1)
        }}
        transition={{ duration: 0.3 }}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 relative overflow-hidden ${getDropZoneStyles()}`}
      >
        {/* ✅ Enhanced animated background effects when dragging */}
        {isDraggingFromToolbox && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            {/* Floating particles effect */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-3 h-3 rounded-full ${
                  isOver ? 'bg-emerald-300' : 'bg-blue-300'
                } opacity-40`}
                animate={{
                  x: [0, 60, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                style={{
                  left: `${30 + i * 20}%`,
                  top: `${40 + (i % 2) * 20}%`,
                }}
              />
            ))}
            
            {/* Ripple effect when hovering */}
            {isOver && (
              <motion.div
                className="absolute inset-0 border-2 border-emerald-400 rounded-lg opacity-30"
                animate={{
                  scale: [1, 1.03, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            )}
          </div>
        )}

        <div className="flex flex-col items-center space-y-6 relative z-10">
          {/* Icon with enhanced states */}
          <motion.div 
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOver 
                ? 'bg-emerald-100 scale-110' 
                : isDraggingFromToolbox 
                ? 'bg-blue-100' 
                : 'bg-zinc-100'
            }`}
            animate={isOver ? { 
              scale: [1.1, 1.2, 1.1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {isDraggingFromToolbox ? (
              <motion.div
                className={`text-3xl ${isOver ? 'animate-bounce' : ''}`}
                animate={isOver ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {isOver ? '🎯' : (dropPreview.blockIcon || '📋')}
              </motion.div>
            ) : (
              <MousePointer className={`w-8 h-8 ${isOver ? 'text-emerald-600' : 'text-zinc-400'}`} />
            )}
          </motion.div>

          {/* Title and Description with dynamic content */}
          <div className="space-y-2">
            <h3 className={`text-xl font-semibold transition-colors ${
              isOver 
                ? 'text-emerald-800' 
                : isDraggingFromToolbox 
                ? 'text-blue-800' 
                : 'text-zinc-700'
            }`}>
              {isDraggingFromToolbox ? (
                isOver ? (
                  <>Perfect! Drop {dragState.draggedBlock?.label || 'block'} here!</>
                ) : (
                  <>Drag {dragState.draggedBlock?.label || 'block'} over to drop</>
                )
              ) : (
                'Start Building Your Strandhoot'
              )}
            </h3>
            <p className={`max-w-md transition-colors ${
              isOver 
                ? 'text-emerald-600' 
                : isDraggingFromToolbox 
                ? 'text-blue-600' 
                : 'text-zinc-500'
            }`}>
              {isDraggingFromToolbox ? (
                isOver 
                  ? `Release to add ${dragState.draggedBlock?.label || 'the block'} to your Strandhoot`
                  : `Move ${dragState.draggedBlock?.label || 'the block'} to the drop zone`
              ) : (
                'Drag blocks from the toolbox to build your interactive learning experience, or get started with a template.'
              )}
            </p>
          </div>

          {/* Enhanced drop zone indicator when hovering */}
          <AnimatePresence>
            {isOver && isDraggingFromToolbox && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="mx-auto"
              >
                <div className="relative">
                  {/* Animated drop target */}
                  <motion.div
                    className="w-20 h-20 border-4 border-dashed border-emerald-400 rounded-full flex items-center justify-center mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.3, 0.7]
                      }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="w-10 h-10 bg-emerald-400 rounded-full opacity-60"
                    />
                  </motion.div>
                  
                  {/* Preview of the block being dropped */}
                  <motion.div
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="bg-white px-3 py-1 rounded-full shadow-lg border-2 border-emerald-300 text-sm font-medium text-emerald-700">
                      {dropPreview.blockIcon} {dragState.draggedBlock?.label}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions - only show when not dragging */}
          {!isDraggingFromToolbox && (
            <motion.div 
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              <Button onClick={onAddWelcomeBlock} className="gap-2">
                <Plus size={16} />
                Add Welcome Block
              </Button>
              {onShowTemplates && (
                <Button variant="outline" onClick={onShowTemplates} className="gap-2">
                  <BookOpen size={16} />
                  Browse Templates
                </Button>
              )}
            </motion.div>
          )}
        </div>

        {/* Background decoration */}
        {!isDraggingFromToolbox && (
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-8 left-8 w-16 h-16 bg-blue-300 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 right-8 w-24 h-24 bg-purple-300 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-green-300 rounded-full blur-xl"></div>
          </div>
        )}
      </motion.div>

      {/* Quick Start Guide - hide when dragging */}
      <AnimatePresence>
        {showQuickStart && !isDraggingFromToolbox && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-orange-800">Quick Start Tips</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Start with a <strong>Welcome Block</strong> to set up your subject and criteria</li>
                    <li>• Add <strong>Strand Blocks</strong> for each learning objective</li>
                    <li>• Use <strong>Question Blocks</strong> (MCQ, Short Answer, etc.) for assessment</li>
                    <li>• Include <strong>Tip Blocks</strong> to guide students through activities</li>
                  </ul>
                  <div className="pt-2">
                    <Button variant="ghost" size="sm" className="text-orange-600 hover:bg-orange-100">
                      View Full Tutorial →
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Hint - hide when dragging */}
      <AnimatePresence>
        {!isDraggingFromToolbox && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-4 bg-zinc-50 border-zinc-200">
              <div className="text-center text-sm text-zinc-600">
                <span className="font-medium">Pro tip:</span> Press <kbd className="px-2 py-1 bg-white border rounded text-xs">F1</kbd> to see keyboard shortcuts
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Enhanced floating drag status indicator */}
      <AnimatePresence>
        {isDraggingFromToolbox && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-2xl transition-all duration-300 backdrop-blur-md ${
              isOver
                ? 'bg-gradient-to-r from-emerald-500/90 via-green-500/90 to-teal-500/90 text-white scale-110'
                : 'bg-gradient-to-r from-blue-500/90 via-cyan-500/90 to-sky-500/90 text-white'
            }`}
          >
            <div className="flex items-center gap-3 text-sm font-semibold">
              <motion.div 
                className="w-2 h-2 rounded-full bg-white"
                animate={{ 
                  scale: isOver ? [1, 1.5, 1] : [1, 1.2, 1],
                  opacity: [1, 0.3, 1] 
                }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
              <span>
                {isOver 
                  ? `Drop ${dragState.draggedBlock?.label || 'block'} to add it!`
                  : `Drag ${dragState.draggedBlock?.label || 'block'} to the empty canvas`
                }
              </span>
              <motion.span 
                className={`text-lg transition-transform duration-300 ${
                  isOver ? 'scale-125' : ''
                }`}
                animate={isOver ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                {isOver ? '🎯' : (dropPreview.blockIcon || '📋')}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}