'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import type { BlockType } from '@/app/strandhoot-builder/types/strandhoot';
import StrandProgressBarGroup from './StrandProgressBarGroup';
import EditableStrandTitle from './EditableStrandTitle';
import StrandBadgeList from './StrandBadgeList';
import ConfigureEvaluationModal from '../modals/ConfigureEvaluationModal';
import { evaluateStrand } from '../utils/evaluateStrand';
import MCQBlock from './MCQBlock';
import ShortAnswerBlock from './ShortAnswerBlock';
import ExtendedResponseBlock from './ExtendedResponseBlock';
import FillInTheBlankBlock from './FillInTheBlankBlock';
import TipBlock from './TipBlock';
import EvaluationBoxBlock from './EvaluationBoxBlock';
import MultimediaEmbedBlock from './MultimediaEmbedBlock';
import RichEditorBlock from './RichEditorBlock';
import TabBlock from './TabBlock';
import isEqual from 'lodash.isequal';

// Available blocks for the Add Block button
const availableBlocks: Omit<BlockType, 'id'>[] = [
  {
    type: 'rich',
    label: 'Tab Block (Rich Editor)',
    icon: '📝',
    content: {},
  },
  {
    type: 'mcq',
    label: 'MCQ Block',
    icon: '❓',
    content: {},
  },
  {
    type: 'short',
    label: 'Short Answer Block',
    icon: '✍️',
    content: {},
  },
  {
    type: 'extended',
    label: 'Extended Response Block',
    icon: '📖',
    content: {},
  },
  {
    type: 'fill',
    label: 'Fill in the Blank Block',
    icon: '📝',
    content: {},
  },
  {
    type: 'tip',
    label: 'Tip Block',
    icon: '💡',
    content: {},
  },
  {
    type: 'evaluation',
    label: 'Evaluation Block',
    icon: '📈',
    content: {},
  },
  {
    type: 'embed',
    label: 'Embed Media Block',
    icon: '🎥',
    content: {},
  },
];

// Add Block Button Component
function AddBlockButton({ 
  onAddBlock, 
  existingBlockCount 
}: { 
  onAddBlock: (block: BlockType) => void;
  existingBlockCount: number;
}) {
  const [showMenu, setShowMenu] = useState(false);

  const handleAddBlock = (blockType: Omit<BlockType, 'id'>) => {
    const newBlock: BlockType = {
      ...blockType,
      id: uuidv4(),
      questionId: `Q${existingBlockCount + 1}`,
    };
    
    console.log('🎯 Adding new block:', newBlock);
    onAddBlock(newBlock);
    setShowMenu(false);
  };

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-full py-3 px-4 border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 transition-colors rounded-md bg-white text-gray-700 font-medium flex items-center justify-center"
      >
        <span className="mr-2">+</span>
        Add Block
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Block Menu */}
          <div className="absolute top-full left-0 right-0 mt-2 p-4 shadow-lg z-50 bg-white border rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm text-gray-700">Choose a block to add:</h3>
              <button
                onClick={() => setShowMenu(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-lg">×</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {availableBlocks.map((block, index) => (
                <button
                  key={index}
                  onClick={() => handleAddBlock(block)}
                  className="flex items-center gap-3 p-3 rounded-md border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
                >
                  <span className="text-lg">{block.icon}</span>
                  <div>
                    <div className="font-medium text-sm text-gray-800">{block.label}</div>
                    <div className="text-xs text-gray-500">{block.type}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

interface Props {
  block: BlockType;
  strandIndex: number;
  totalStrands: number;
  allStrandBlocks: BlockType[];
  badges: { emoji: string; label: string }[];
  onNext: () => void;
  onFinish: () => void;
  onUpdate: (updated: BlockType) => void;
  onDelete: () => void;
  readOnly?: boolean;
}

interface EvaluationLogic {
  keywords: string[];
  concepts: string[];
  exemplars?: string[];
  suggestions?: string[];
}

function isEvaluationLogic(obj: unknown): obj is EvaluationLogic {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Array.isArray((obj as Record<string, unknown>).keywords) &&
    Array.isArray((obj as Record<string, unknown>).concepts)
  );
}

export default function StrandPageBlock({
  block,
  strandIndex,
  totalStrands,
  allStrandBlocks,
  badges,
  onNext,
  onFinish,
  onUpdate,
  onDelete,
  readOnly = false,
}: Props) {
  const content = block.content ?? {};

  const strandId: string =
    typeof content.strandId === 'string' ? content.strandId : `strand-${strandIndex}`;

  const [title, setTitle] = useState<string>(
    typeof content.title === 'string' ? content.title : `Strand ${strandIndex + 1}`
  );

  const [showConfigModal, setShowConfigModal] = useState(false);

  // State for added blocks
  const [addedBlocks, setAddedBlocks] = useState<BlockType[]>(
    Array.isArray(content.addedBlocks) ? (content.addedBlocks as BlockType[]) : []
  );

  const evaluation = evaluateStrand(
    '', // No content to evaluate at strand level now
    strandId,
    isEvaluationLogic(content.evaluationLogic) ? content.evaluationLogic : undefined
  );
  const level = evaluation.level;
  const matchedKeywords = evaluation.keywords || [];
  const matchedConcepts = evaluation.concepts || [];

  // Add block handler
  const handleAddBlock = (newBlock: BlockType) => {
    console.log('🎯 StrandPageBlock: Received new block:', newBlock);
    setAddedBlocks((prev) => {
      const updated = [...prev, newBlock];
      console.log('🎯 StrandPageBlock: Updated addedBlocks:', updated);
      return updated;
    });
  };

  // Remove block handler
  const handleRemoveBlock = (blockId: string) => {
    console.log('🗑️ StrandPageBlock: Removing block:', blockId);
    setAddedBlocks((prev) => prev.filter(block => block.id !== blockId));
  };

  // Update block handler
  const handleUpdateBlock = (blockId: string, updatedContent: any) => {
    setAddedBlocks((prev) => prev.map(block => 
      block.id === blockId 
        ? { ...block, content: { ...block.content, ...updatedContent } }
        : block
    ));
  };

  // Use ref to track last sent data to prevent infinite loops
  const lastSentData = useRef<string>('');

  useEffect(() => {
    const newData = JSON.stringify({ title, addedBlocks });
    
    if (lastSentData.current !== newData) {
      lastSentData.current = newData;
      onUpdate({
        ...block,
        content: {
          ...content,
          title,
          addedBlocks,
        },
      });
    }
  }, [title, addedBlocks, block, content, onUpdate]);

  // Render individual block
  const renderBlock = (blockItem: BlockType) => {
    const onConfigure = () => {
      console.log('🛠️ Configure evaluation for:', blockItem.questionId);
    };

    const blockWrapper = (children: React.ReactNode) => (
      <div className="relative mb-4 group">
        {!readOnly && (
          <button
            onClick={() => handleRemoveBlock(blockItem.id)}
            className="absolute top-2 right-2 z-10 text-red-500 hover:text-red-700 bg-white rounded-full w-7 h-7 flex items-center justify-center text-sm border border-red-200 hover:border-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove block"
          >
            ✕
          </button>
        )}
        {children}
      </div>
    );

    switch (blockItem.type) {
      case 'rich':
        return blockWrapper(
          <TabBlock 
            key={blockItem.id}
            block={blockItem}
            readOnly={readOnly}
            onUpdate={readOnly ? undefined : (updatedContent) => handleUpdateBlock(blockItem.id, updatedContent)}
          />
        );
      case 'mcq':
        return blockWrapper(
          <MCQBlock 
            key={blockItem.id}
            block={blockItem} 
            questionId={blockItem.questionId} 
            onConfigure={readOnly ? undefined : onConfigure}
          />
        );
      case 'short':
        return blockWrapper(
          <ShortAnswerBlock 
            key={blockItem.id}
            block={blockItem} 
            questionId={blockItem.questionId} 
            onConfigure={readOnly ? undefined : onConfigure}
          />
        );
      case 'extended':
        return blockWrapper(
          <ExtendedResponseBlock 
            key={blockItem.id}
            block={blockItem} 
            questionId={blockItem.questionId} 
            onConfigure={readOnly ? undefined : onConfigure}
          />
        );
      case 'fill':
        return blockWrapper(
          <FillInTheBlankBlock 
            key={blockItem.id}
            block={blockItem} 
            questionId={blockItem.questionId} 
            onConfigure={readOnly ? undefined : onConfigure}
          />
        );
      case 'tip':
        return blockWrapper(<TipBlock key={blockItem.id} />);
      case 'evaluation':
        return blockWrapper(<EvaluationBoxBlock key={blockItem.id} />);
      case 'embed':
        return blockWrapper(<MultimediaEmbedBlock key={blockItem.id} />);
      default:
        return blockWrapper(
          <div key={blockItem.id} className="p-4 bg-red-50 border border-red-200 rounded">
            <span className="text-red-600 font-semibold">Unknown block type: {blockItem.type}</span>
          </div>
        );
    }
  };

  return (
    <Card id={`strand-${strandIndex}`} className="w-full p-6 bg-white shadow relative">
      <StrandProgressBarGroup
        strandIndex={strandIndex}
        totalStrands={totalStrands}
        allStrandBlocks={allStrandBlocks}
        level={level}
      />

      <div className="flex items-center justify-between mb-4">
        <EditableStrandTitle title={title} readOnly={readOnly} onChange={setTitle} />
        {!readOnly && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowConfigModal(true)}
            className="text-xs"
          >
            ⚙️ Configure Evaluation
          </Button>
        )}
      </div>

      <StrandBadgeList badges={badges} />

      {/* Add Block Button - Only in edit mode */}
      {!readOnly && (
        <AddBlockButton 
          onAddBlock={handleAddBlock} 
          existingBlockCount={addedBlocks.length}
        />
      )}

      {/* Render Added Blocks */}
      <div className="space-y-4">
        {addedBlocks.length === 0 && readOnly && (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-sm">No content added to this strand yet.</p>
          </div>
        )}
        
        {addedBlocks.length === 0 && !readOnly && (
          <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-sm">Use the &quot;Add Block&quot; button above to start building this strand.</p>
          </div>
        )}

        {addedBlocks.map((blockItem) => (
          <div key={blockItem.id}>
            {renderBlock(blockItem)}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {!readOnly && (
        <div className="flex justify-end mt-6 gap-2">
          {strandIndex < totalStrands - 1 ? (
            <Button onClick={onNext} className="bg-blue-600 text-white">
              Next Strand →
            </Button>
          ) : (
            <Button onClick={onFinish} className="bg-green-600 text-white">
              ✅ Finish
            </Button>
          )}
          <Button variant="ghost" onClick={onDelete} className="text-red-500">
            Delete Strand
          </Button>
        </div>
      )}

      <ConfigureEvaluationModal
        open={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        initial={
          typeof content.evaluationLogic === 'object' && content.evaluationLogic !== null
            ? content.evaluationLogic as EvaluationLogic | undefined
            : undefined
        }
        onSave={(logic) => {
          const updated = {
            ...block,
            content: {
              ...block.content,
              evaluationLogic: logic,
            },
          };
          onUpdate(updated);
        }}
      />
    </Card>
  );
}