'use client';

import { useState } from 'react';
import type { BlockType } from '@/app/strandhoot-builder/types/strandhoot';
import ConfigureEvaluationBox from './ConfigureEvaluationBox';

// Define evaluation config type locally since it's not in the main types
export interface EvaluationConfig {
  keywords?: string[];
  concepts?: string[];
  exemplars?: string[];
  suggestions?: string[];
  correctAnswer?: string;
}

type Props = {
  block: BlockType;
  questionId?: string;
  onConfigure?: () => void; // Simplified - just a callback, no params needed
};

export default function RichEditorBlock({ block, questionId, onConfigure }: Props) {
  const [showConfig, setShowConfig] = useState(false);
  const evaluation = block.content?.evaluation || {};

  const handleConfigureClick = () => {
    // Create a sample configuration
    const config: EvaluationConfig = {
      keywords: ['field', 'trend'],
      concepts: ['relationship', 'pattern'],
      exemplars: ['clear inverse relation'],
      suggestions: ['Consider labeling axes'],
    };
    
    // Update the block content directly
    if (!block.content) block.content = {};
    block.content.evaluation = config;
    
    // Call the optional configure callback
    onConfigure?.();
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-zinc-600">{questionId}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setShowConfig((prev) => !prev)}
            className="text-xs text-blue-600 hover:underline"
          >
            {showConfig ? 'Hide' : 'Configure Evaluation'}
          </button>
          <button
            onClick={handleConfigureClick}
            className="text-xs text-blue-600 hover:underline"
          >
            Quick Configure
          </button>
        </div>
      </div>

      <div className="bg-white p-4 border rounded shadow-sm text-sm text-zinc-600">
        [Rich Text Editor Placeholder]
      </div>

      {showConfig && (
        <ConfigureEvaluationBox
          blockType="rich"
          initialConfig={evaluation as EvaluationConfig}
          onUpdate={(config: EvaluationConfig) => {
            if (!block.content) block.content = {};
            block.content.evaluation = config;
          }}
        />
      )}
    </div>
  );
}