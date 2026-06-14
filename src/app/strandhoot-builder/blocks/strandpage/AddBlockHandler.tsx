// src/app/strandhoot-builder/components/AddBlockHandler.tsx
'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define BlockType locally to avoid import issues
type BlockType = {
  id: string;
  type: 'welcome' | 'strand' | 'tip' | 'rich' | 'evaluation' | 'embed' | 'mcq' | 'short' | 'extended' | 'fill';
  label?: string;
  icon?: string;
  content: Record<string, unknown>;
  questionId?: string;
};

const availableBlocks: Omit<BlockType, 'id'>[] = [
  {
    type: 'tip',
    label: 'Tip Block',
    icon: '💡',
    content: {},
  },
  {
    type: 'rich',
    label: 'Rich Text Block',
    icon: '📝',
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
];

interface AddBlockHandlerProps {
  onAddBlock: (block: BlockType) => void;
  existingBlockCount: number;
}

// Add Block Button Component
export function AddBlockButton({ onAddBlock, existingBlockCount }: AddBlockHandlerProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleAddBlock = (blockType: Omit<BlockType, 'id'>) => {
    const newBlock: BlockType = {
      ...blockType,
      id: uuidv4(),
      questionId: `Q${existingBlockCount + 1}`,
    };
    
    console.log('🎯 AddBlockButton: Creating new block:', newBlock);
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

// Block Renderer Component
export function BlockRenderer({ 
  blocks, 
  onRemoveBlock 
}: { 
  blocks: BlockType[];
  onRemoveBlock: (blockId: string) => void;
}) {
  const renderSingleBlock = (block: BlockType) => {
    const blockWrapper = (children: React.ReactNode) => (
      <div className="relative mb-4 p-4 border-2 border-blue-200 rounded-lg bg-white shadow-sm">
        <button
          onClick={() => onRemoveBlock(block.id)}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full w-7 h-7 flex items-center justify-center text-sm border border-red-200 hover:border-red-400 transition-colors z-10"
          title="Remove block"
        >
          ✕
        </button>
        <div className="pr-10">
          {children}
        </div>
      </div>
    );

    switch (block.type) {
      case 'tip':
        return blockWrapper(
          <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400 text-yellow-900">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">💡</span>
              <span className="font-semibold">Tip Block</span>
              <span className="text-xs bg-yellow-200 px-2 py-1 rounded">{block.questionId}</span>
            </div>
            <input 
              type="text" 
              placeholder="Enter your tip here..."
              className="w-full p-2 bg-yellow-100 border border-yellow-300 rounded text-sm"
            />
          </div>
        );

      case 'mcq':
        return blockWrapper(
          <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">❓</span>
              <span className="font-semibold">MCQ Block</span>
              <span className="text-xs bg-blue-200 px-2 py-1 rounded">{block.questionId}</span>
            </div>
            <input 
              type="text" 
              placeholder="Enter your question..."
              className="w-full p-2 mb-3 border border-blue-300 rounded text-sm"
            />
            <div className="space-y-2">
              {['A', 'B', 'C', 'D'].map(option => (
                <div key={option} className="flex items-center gap-2">
                  <input type="radio" name={`mcq-${block.id}`} />
                  <span className="font-semibold">{option}:</span>
                  <input 
                    type="text" 
                    placeholder={`Option ${option}`}
                    className="flex-1 p-1 border border-blue-300 rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'short':
        return blockWrapper(
          <div className="bg-green-50 p-4 rounded border-l-4 border-green-400">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">✍️</span>
              <span className="font-semibold">Short Answer Block</span>
              <span className="text-xs bg-green-200 px-2 py-1 rounded">{block.questionId}</span>
            </div>
            <input 
              type="text" 
              placeholder="Enter your question..."
              className="w-full p-2 mb-3 border border-green-300 rounded text-sm"
            />
            <input 
              type="text" 
              placeholder="Student will type their short answer here..."
              className="w-full p-2 border border-green-300 rounded text-sm bg-white"
              disabled
            />
          </div>
        );

      case 'extended':
        return blockWrapper(
          <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-400">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📖</span>
              <span className="font-semibold">Extended Response Block</span>
              <span className="text-xs bg-purple-200 px-2 py-1 rounded">{block.questionId}</span>
            </div>
            <input 
              type="text" 
              placeholder="Enter your question..."
              className="w-full p-2 mb-3 border border-purple-300 rounded text-sm"
            />
            <textarea 
              placeholder="Student will write their extended response here..."
              className="w-full p-2 border border-purple-300 rounded text-sm bg-white h-24 resize-none"
              disabled
            />
          </div>
        );

      case 'fill':
        return blockWrapper(
          <div className="bg-orange-50 p-4 rounded border-l-4 border-orange-400">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📝</span>
              <span className="font-semibold">Fill in the Blank</span>
              <span className="text-xs bg-orange-200 px-2 py-1 rounded">{block.questionId}</span>
            </div>
            <input 
              type="text" 
              placeholder="The _______ is affected by _______."
              className="w-full p-2 border border-orange-300 rounded text-sm"
            />
          </div>
        );

      case 'evaluation':
        return blockWrapper(
          <div className="bg-green-50 p-4 rounded border-l-4 border-green-400 text-green-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✅</span>
              <span className="font-semibold">Evaluation Summary</span>
            </div>
            <ul className="list-disc ml-5 mt-2 text-sm">
              <li>Level: 6</li>
              <li>Keywords Matched: magnetic, distance</li>
              <li>Concepts Matched: inverse relationship</li>
            </ul>
          </div>
        );

      case 'embed':
        return blockWrapper(
          <div className="bg-gray-100 p-6 rounded text-center border-2 border-dashed border-gray-300">
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">🎥</span>
              <span className="font-semibold">Media Embed Block</span>
              <input 
                type="text" 
                placeholder="Enter video URL or upload media..."
                className="w-full max-w-sm p-2 border border-gray-400 rounded text-sm"
              />
            </div>
          </div>
        );

      case 'rich':
        return blockWrapper(
          <div className="bg-white p-4 border rounded shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📝</span>
              <span className="font-semibold text-sm text-gray-700">Rich Text Editor</span>
            </div>
            <div className="min-h-[100px] p-3 border border-gray-200 rounded bg-gray-50 text-sm text-gray-600">
              [Rich text editor would appear here - students can format text, add images, tables, etc.]
            </div>
          </div>
        );

      default:
        return blockWrapper(
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <span className="text-red-600 font-semibold">Unknown block type: {block.type}</span>
          </div>
        );
    }
  };

  if (blocks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-sm">No blocks added yet. Use the &quot;Add Block&quot; button above to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">Added Blocks ({blocks.length})</h4>
        <span className="text-xs text-gray-500">Click ✕ to remove blocks</span>
      </div>
      {blocks.map((block) => (
        <div key={block.id}>
          {renderSingleBlock(block)}
        </div>
      ))}
    </div>
  );
}

export type { BlockType };