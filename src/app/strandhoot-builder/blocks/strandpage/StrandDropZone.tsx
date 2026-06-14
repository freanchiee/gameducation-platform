// src/app/strandhoot-builder/blocks/strandpage/StrandDropZone.tsx
'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDragDrop } from '@/app/strandhoot-builder/context/DragDropContext';
import { Button } from '@/app/components/ui/button';
import { X, Grip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import block components
import MCQBlock from '../MCQBlock';
import ShortAnswerBlock from '../ShortAnswerBlock';
import ExtendedResponseBlock from '../ExtendedResponseBlock';
import FillInTheBlankBlock from '../FillInTheBlankBlock';
import TipBlock from '../TipBlock';
import MultimediaEmbedBlock from '../MultimediaEmbedBlock';
import RichEditorBlock from '../RichEditorBlock';
import EvaluationBoxBlock from '../EvaluationBoxBlock';

import type { BlockType } from '@/app/strandhoot-builder/types/strandhoot';

interface Props {
  strandId: string;
  tabId: string;
  droppedBlocks: BlockType[];
  onBlockAdd: (block: BlockType) => void;
  onBlockUpdate: (blockId: string, updatedBlock: BlockType) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockReorder: (dragIndex: number, dropIndex: number) => void;
  readOnly?: boolean;
  greedy?: boolean;
}

interface DropState {
  hasDropped: boolean;
  hasDroppedOnChild: boolean;
}

export default function StrandDropZone({
  strandId,
  tabId,
  droppedBlocks,
  onBlockAdd,
  onBlockUpdate,
  onBlockDelete,
  onBlockReorder,
  readOnly = false,
  greedy = false,
}: Props) {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { getHTML5DragData } = useDragDrop();
  
  // ✅ Following the exact Dustbin pattern
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

  // ✅ EXACT React DnD Dustbin pattern implementation
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: 'BLOCK',
      drop: (item: BlockType, monitor) => {
        console.log('🎯 StrandDropZone: Drop triggered', {
          item: item.type,
          strandId: strandId.slice(-8),
          tabId: tabId.slice(-8),
          didDrop: monitor.didDrop(),
          greedy
        });
        
        // ✅ EXACT Dustbin pattern logic
        const didDrop = monitor.didDrop();
        if (didDrop && !greedy) {
          console.log('🚫 StrandDropZone: Child handled drop, returning early (non-greedy)');
          return;
        }

        console.log('✅ StrandDropZone: Processing drop', item.type);
        
        // Set drop state following Dustbin pattern
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
        
        // Create new block
        const newBlock: BlockType = {
          ...item,
          id: `strand-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          questionId: `Q${droppedBlocks.length + 1}`,
          content: { ...item.content },
        };
        
        // Add block to current tab
        onBlockAdd(newBlock);
        
        // Return drop result
        return {
          handled: true,
          target: 'strand-drop-zone',
          strandId,
          tabId,
        };
      },
      // ✅ EXACT Dustbin collect pattern - pure function, no side effects
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [greedy, setHasDropped, setHasDroppedOnChild, strandId, tabId, droppedBlocks.length, onBlockAdd]
  );

  // Connect the drop ref
  useEffect(() => {
    if (dropZoneRef.current) {
      drop(dropZoneRef.current);
    }
  }, [drop]);

  // ✅ HTML5 fallback handlers (simplified)
  const handleHTML5DragOver = useCallback((e: React.DragEvent) => {
    if (readOnly) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }, [readOnly]);

  const handleHTML5Drop = useCallback((e: React.DragEvent) => {
    if (readOnly) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🎯 StrandDropZone: HTML5 drop fallback');
    
    // Try to get block data
    let blockData = getHTML5DragData();
    
    if (!blockData) {
      try {
        const jsonData = e.dataTransfer.getData('application/json');
        if (jsonData && jsonData !== '[object Object]') {
          blockData = JSON.parse(jsonData);
        }
      } catch (error) {
        console.error('Failed to parse HTML5 drop data:', error);
        return;
      }
    }
    
    if (blockData && blockData.type) {
      console.log('✅ StrandDropZone: Processing HTML5 drop', blockData.type);
      
      const newBlock: BlockType = {
        ...blockData,
        id: `strand-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        questionId: `Q${droppedBlocks.length + 1}`,
        content: { ...blockData.content },
      };
      
      onBlockAdd(newBlock);
      setHasDropped(true);
      setHasDroppedOnChild(false);
    }
  }, [readOnly, getHTML5DragData, droppedBlocks.length, onBlockAdd]);

  // ✅ Following Dustbin styling pattern
  const getDropZoneStyle = () => {
    let backgroundColor = 'bg-white';
    let borderColor = 'border-blue-300';
    
    if (isOverCurrent || (isOver && greedy)) {
      backgroundColor = 'bg-green-100';
      borderColor = 'border-green-500';
    } else if (isOver) {
      backgroundColor = 'bg-blue-50';
      borderColor = 'border-blue-400';
    }
    
    return `min-h-[200px] border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${backgroundColor} ${borderColor}`;
  };

  const text = greedy ? 'greedy' : 'not greedy';

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      {/* Drop Zone Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-lg mr-2">🧩</span>
          <h4 className="font-semibold text-blue-800">Interactive Components</h4>
          <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
            {text}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            {droppedBlocks.length} components
          </span>
          {hasDropped && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              dropped {hasDroppedOnChild && 'on child'}
            </span>
          )}
        </div>
      </div>

      {/* ✅ Drop Zone Area */}
      <div
        ref={dropZoneRef}
        data-strand-drop-zone="true"
        data-strand-id={strandId}
        data-tab-id={tabId}
        onDragOver={handleHTML5DragOver}
        onDrop={handleHTML5Drop}
        className={getDropZoneStyle()}
      >
        {/* Drop Zone Indicator */}
        {!readOnly && (
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">
              {isOverCurrent || (isOver && greedy) ? '🎯' : '📦'}
            </div>
            <p className="font-medium text-gray-600">
              {isOverCurrent || (isOver && greedy) 
                ? 'Drop your component here!' 
                : 'Drag & Drop Components'
              }
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {text} • MCQ • Short Answer • Extended Response • Tips
            </p>
            
            {/* Debug info */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 text-xs text-gray-400 font-mono">
                <div>isOver: {isOver ? '✅' : '❌'} | isOverCurrent: {isOverCurrent ? '✅' : '❌'}</div>
                <div>Strand: {strandId.slice(-8)} | Tab: {tabId.slice(-8)}</div>
              </div>
            )}
          </div>
        )}

        {/* Render Dropped Blocks */}
        <AnimatePresence>
          <div className="space-y-4">
            {droppedBlocks.map((block, index) => {
              const onConfigure = () => {
                console.log('🛠️ Configure evaluation for:', block.questionId);
              };

              const handleBlockUpdate = (updatedBlock: BlockType) => {
                onBlockUpdate(block.id, updatedBlock);
              };

              const handleBlockDelete = () => {
                onBlockDelete(block.id);
              };

              const commonProps = {
                block,
                questionId: block.questionId,
                onConfigure,
              };

              const BlockWrapper = ({ children }: { children: React.ReactNode }) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                    {/* Block Header */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        {!readOnly && (
                          <div className="cursor-grab active:cursor-grabbing">
                            <Grip size={16} className="text-gray-400" />
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {block.questionId || `Block ${index + 1}`}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                          {block.type.toUpperCase()}
                        </span>
                      </div>
                      
                      {!readOnly && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={onConfigure}
                            className="h-6 w-6 p-0 text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                            title="Configure block"
                          >
                            ⚙️
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBlockDelete}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            title="Delete block"
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Block Content */}
                    <div className="p-4">
                      {children}
                    </div>
                  </div>
                </motion.div>
              );

              // Render specific block type
              switch (block.type) {
                case 'mcq':
                  return (
                    <BlockWrapper key={block.id}>
                      <MCQBlock {...commonProps} />
                    </BlockWrapper>
                  );
                case 'short':
                  return (
                    <BlockWrapper key={block.id}>
                      <ShortAnswerBlock {...commonProps} />
                    </BlockWrapper>
                  );
                case 'extended':
                  return (
                    <BlockWrapper key={block.id}>
                      <ExtendedResponseBlock {...commonProps} />
                    </BlockWrapper>
                  );
                case 'fill':
                  return (
                    <BlockWrapper key={block.id}>
                      <FillInTheBlankBlock {...commonProps} />
                    </BlockWrapper>
                  );
                case 'tip':
                  return (
                    <BlockWrapper key={block.id}>
                      <TipBlock />
                    </BlockWrapper>
                  );
                case 'embed':
                  return (
                    <BlockWrapper key={block.id}>
                      <MultimediaEmbedBlock />
                    </BlockWrapper>
                  );
                case 'rich':
                  return (
                    <BlockWrapper key={block.id}>
                      <RichEditorBlock {...commonProps} />
                    </BlockWrapper>
                  );
                case 'evaluation':
                  return (
                    <BlockWrapper key={block.id}>
                      <EvaluationBoxBlock />
                    </BlockWrapper>
                  );
                default:
                  return (
                    <BlockWrapper key={block.id}>
                      <div className="text-center py-8">
                        <div className="text-3xl mb-3">🧩</div>
                        <p className="font-medium text-gray-700">
                          {block.type.toUpperCase()} Block
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Block ID: {block.id}
                        </p>
                      </div>
                    </BlockWrapper>
                  );
              }
            })}
          </div>
        </AnimatePresence>

        {/* Empty State */}
        {droppedBlocks.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-3">📦</div>
            <p className="font-medium">
              {readOnly ? 'No components added' : 'No components yet'}
            </p>
            <p className="text-sm mt-1">
              {readOnly 
                ? 'This tab does not contain any interactive components'
                : 'Drag components from the toolbox to get started'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}