'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';

type EvaluationConfig = {
  keywords?: string[];
  concepts?: string[];
  exemplar?: string;
  suggestions?: string[];
  correctAnswer?: string;
};

type Props = {
  blockType: string;
  initialConfig?: EvaluationConfig;
  onUpdate: (config: EvaluationConfig) => void;
};

export default function ConfigureEvaluationBox({
  blockType,
  initialConfig = {},
  onUpdate,
}: Props) {
  const [keywords, setKeywords] = useState<string[]>(initialConfig.keywords ?? []);
  const [concepts, setConcepts] = useState<string[]>(initialConfig.concepts ?? []);
  const [exemplar, setExemplar] = useState<string>(initialConfig.exemplar ?? '');
  const [suggestions, setSuggestions] = useState<string[]>(initialConfig.suggestions ?? []);
  const [correctAnswer, setCorrectAnswer] = useState<string>(initialConfig.correctAnswer ?? '');
  
  // Track if component has been initialized
  const isInitialized = useRef(false);
  // Keep a stable reference to the last sent config
  const lastConfigRef = useRef<EvaluationConfig>({});

  // Memoize the config creation
  const createConfig = useCallback((): EvaluationConfig => {
    const config: EvaluationConfig = {};

    if (['rich', 'extended', 'short', 'strand'].includes(blockType)) {
      config.keywords = keywords;
      config.concepts = concepts;
      config.exemplar = exemplar;
    }
    if (['rich', 'extended', 'strand'].includes(blockType)) {
      config.suggestions = suggestions;
    }
    if (['mcq', 'fill'].includes(blockType)) {
      config.correctAnswer = correctAnswer;
    }

    return config;
  }, [keywords, concepts, exemplar, suggestions, correctAnswer, blockType]);

  // Update parent only when config actually changes and after initialization
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return; // Skip the first render to prevent initial unnecessary update
    }

    const newConfig = createConfig();
    const configString = JSON.stringify(newConfig);
    const lastConfigString = JSON.stringify(lastConfigRef.current);

    // Only update if config has actually changed
    if (configString !== lastConfigString) {
      lastConfigRef.current = newConfig;
      // Debounce the update to prevent rapid fire updates
      const timer = setTimeout(() => {
        onUpdate(newConfig);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [createConfig, onUpdate]); // ✅ Fixed: Added onUpdate to dependency array

  // Update state when initialConfig changes (e.g., when switching between blocks)
  useEffect(() => {
    setKeywords(initialConfig.keywords ?? []);
    setConcepts(initialConfig.concepts ?? []);
    setExemplar(initialConfig.exemplar ?? '');
    setSuggestions(initialConfig.suggestions ?? []);
    setCorrectAnswer(initialConfig.correctAnswer ?? '');
    
    // Reset initialization flag when initialConfig changes
    isInitialized.current = false;
    lastConfigRef.current = initialConfig;
  }, [initialConfig]);

  const handleListInput = useCallback((value: string): string[] =>
    value.split(',').map((v) => v.trim()).filter(Boolean), []
  );

  return (
    <Card className="p-4 bg-white border mt-4 space-y-4">
      <h4 className="text-sm font-semibold text-zinc-700 mb-1">🛠 Configure Evaluation</h4>

      {['rich', 'extended', 'short', 'strand'].includes(blockType) && (
        <div className="space-y-2">
          <Label>Keywords (comma-separated)</Label>
          <Input
            value={keywords.join(', ')}
            onChange={(e) => setKeywords(handleListInput(e.target.value))}
            placeholder="e.g. magnetic field, distance"
          />

          <Label>Concepts (comma-separated)</Label>
          <Input
            value={concepts.join(', ')}
            onChange={(e) => setConcepts(handleListInput(e.target.value))}
            placeholder="e.g. inverse relationship, field strength"
          />

          <Label>Exemplar Answer</Label>
          <Textarea
            value={exemplar}
            onChange={(e) => setExemplar(e.target.value)}
            placeholder="Write a model answer for reference"
            rows={3}
          />
        </div>
      )}

      {['rich', 'extended', 'strand'].includes(blockType) && (
        <div className="space-y-2">
          <Label>Suggestions (comma-separated)</Label>
          <Input
            value={suggestions.join(', ')}
            onChange={(e) => setSuggestions(handleListInput(e.target.value))}
            placeholder="e.g. add diagram, compare both setups"
          />
        </div>
      )}

      {['mcq', 'fill'].includes(blockType) && (
        <div className="space-y-2">
          <Label>Correct Answer</Label>
          <Input
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="e.g. Option B or 3.5"
          />
        </div>
      )}

      {/* Debug info - remove in production */}
      <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-50 rounded">
        <p>Block Type: {blockType}</p>
        <p>Config: {JSON.stringify(createConfig(), null, 2)}</p>
      </div>
    </Card>
  );
}