import React, { useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { AlertCircle, Lightbulb, Target, TrendingUp } from 'lucide-react';
import ConfigureEvaluationBox from '../ConfigureEvaluationBox';
import RichEditorBlock from '../RichEditorBlock';

// Import the actual types from your project
import type { BlockType, EvaluationConfig } from '@/app/strandhoot-builder/types/strandhoot';

interface Props {
  block: BlockType;
  strandIndex: number;
  onUpdate: (updated: BlockType) => void;
}

export default function StrandYourWorkPanel({ block, strandIndex, onUpdate }: Props) {
  const content = useMemo(() => block.content ?? {}, [block]);
  
  // Mock evaluation results - replace with actual evaluateStrand function
  const evaluationResults = useMemo(() => ({
    level: 6,
    matchedKeywords: ['data analysis', 'graph interpretation'],
    matchedConcepts: ['correlation', 'trend analysis'],
    suggestions: [
      'Add more detailed explanations of your methodology',
      'Include statistical analysis of your results',
      'Consider discussing potential sources of error'
    ],
    feedback: 'Good progress! Your analysis shows understanding of key concepts.'
  }), []);

  const handleEvalUpdate = (updatedConfig: EvaluationConfig) => {
    onUpdate({
      ...block,
      content: {
        ...content,
        evaluation: updatedConfig,
      },
    });
  };

  const getLevelColor = (level: number) => {
    if (level >= 7) return 'border-green-500 bg-green-50';
    if (level >= 5) return 'border-blue-500 bg-blue-50';
    if (level >= 3) return 'border-yellow-500 bg-yellow-50';
    return 'border-gray-500 bg-gray-50';
  };

  const getLevelIcon = (level: number) => {
    if (level >= 7) return <Target className="w-5 h-5 text-green-600" />;
    if (level >= 5) return <TrendingUp className="w-5 h-5 text-blue-600" />;
    if (level >= 3) return <Lightbulb className="w-5 h-5 text-yellow-600" />;
    return <AlertCircle className="w-5 h-5 text-gray-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Instructional Tip */}
      {typeof content.tip === 'string' && (
        <Card className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-orange-900 mb-1">💡 Learning Tip</h4>
              <p className="text-orange-800 text-sm">{content.tip}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Rich Text Editor Area */}
      <Card className="p-4">
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">
            📝 Your Response - Strand {strandIndex + 1}
          </h4>
          <p className="text-sm text-gray-600">
            Use the rich text editor below to craft your response. You can add tables, images, graphs, and formatted text.
          </p>
        </div>

        <RichEditorBlock
          block={block}
          questionId={`S${strandIndex + 1}`}
          onConfigure={() => {
            // Handle configuration - you can open a modal or trigger evaluation
            console.log('Configure evaluation for strand', strandIndex + 1);
          }}
        />
      </Card>

      {/* Live Evaluation Feedback */}
      <Card className={`p-4 border-2 ${getLevelColor(evaluationResults.level)}`}>
        <div className="flex items-center gap-3 mb-3">
          {getLevelIcon(evaluationResults.level)}
          <div>
            <h4 className="font-semibold text-gray-900">
              🔍 Live Evaluation - Level {evaluationResults.level}/8
            </h4>
            <p className="text-sm text-gray-600">{evaluationResults.feedback}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* Matched Keywords */}
          <div>
            <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
              🔑 Keywords Found
            </h5>
            <div className="flex flex-wrap gap-1">
              {evaluationResults.matchedKeywords.map((keyword, i) => (
                <span 
                  key={i}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Matched Concepts */}
          <div>
            <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
              🧠 Concepts Identified
            </h5>
            <div className="flex flex-wrap gap-1">
              {evaluationResults.matchedConcepts.map((concept, i) => (
                <span 
                  key={i}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        {evaluationResults.suggestions.length > 0 && (
          <div className="mt-4 p-3 bg-white rounded border">
            <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
              💬 Suggestions for Improvement
            </h5>
            <ul className="space-y-1">
              {evaluationResults.suggestions.map((suggestion, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Evaluation Configuration */}
   {/* Evaluation Configuration */}
<Card className="p-4 bg-gray-50">
  <div className="flex items-center justify-between mb-3">
    <h4 className="font-semibold text-gray-900">⚙️ Evaluation Settings</h4>
    <Button 
      variant="outline" 
      size="sm"
      className="text-xs"
    >
      Configure Rubric
    </Button>
  </div>
  
  <ConfigureEvaluationBox
    blockType={block.type}
    initialConfig={{
      keywords: (content.evaluation as any)?.keywords || [],
      concepts: (content.evaluation as any)?.concepts || [],
      exemplar: (content.evaluation as any)?.exemplar || '',
      suggestions: (content.evaluation as any)?.suggestions || [],
    }}
    onUpdate={handleEvalUpdate}
  />
</Card>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl mb-1">
            {evaluationResults.level >= 7 ? '🏆' : 
             evaluationResults.level >= 5 ? '🥉' : 
             evaluationResults.level >= 3 ? '📈' : '📊'}
          </div>
          <p className="text-sm font-medium text-gray-700">
            Current Level: {evaluationResults.level}/8
          </p>
          <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(evaluationResults.level / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}