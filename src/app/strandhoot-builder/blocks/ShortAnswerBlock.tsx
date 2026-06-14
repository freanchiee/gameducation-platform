import React, { useState, useEffect } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

type ShortAnswerBlockProps = {
  block: {
    id: string;
    type: string;
    content: {
      question?: string;
      questionHtml?: string;
      evaluation?: any;
      maxLength?: number;
    };
  };
  questionId?: string;
  onConfigure?: () => void;
  readOnly?: boolean;
  onUpdate?: (updatedContent: any) => void;
};

export default function ShortAnswerBlock({
  block,
  questionId,
  onConfigure,
  readOnly = false,
  onUpdate,
}: ShortAnswerBlockProps) {
  const [questionHtml, setQuestionHtml] = useState<string>(
    block.content?.questionHtml || ''
  );
  const [maxLength, setMaxLength] = useState<number>(
    block.content?.maxLength || 100
  );
  
  // Student's answer (only for preview mode)
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [, setShowConfigModal] = useState(false);

  // Update parent when content changes (only in edit mode)
  useEffect(() => {
    if (!readOnly && onUpdate) {
      onUpdate({
        questionHtml,
        maxLength,
      });
    }
  }, [questionHtml, maxLength, readOnly, onUpdate]);

  if (readOnly) {
    // PREVIEW MODE - What students see
    return (
      <Card className="p-4 bg-white border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-blue-600">{questionId}</span>
          <span className="text-xs text-gray-400">Short Answer</span>
        </div>

        {/* Question Display */}
        {questionHtml && (
          <div className="mb-4">
            <div
              className="prose prose-sm max-w-none text-gray-800 mb-3"
              dangerouslySetInnerHTML={{ __html: questionHtml }}
            />
          </div>
        )}

        {/* Student Response Area */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Your Answer:</Label>
          <Input
            value={studentAnswer}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setStudentAnswer(e.target.value);
              }
            }}
            placeholder="Type your short answer here..."
            className="text-base p-3"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Maximum {maxLength} characters</span>
            <span
              className={`${
                studentAnswer.length > maxLength * 0.8
                  ? studentAnswer.length >= maxLength
                    ? 'text-red-500'
                    : 'text-orange-500'
                  : 'text-gray-500'
              }`}
            >
              {studentAnswer.length}/{maxLength}
            </span>
          </div>
        </div>

        {/* Student Feedback */}
        {studentAnswer.trim() && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              ✓ Answer saved: &quot;{studentAnswer.slice(0, 50)}{studentAnswer.length > 50 ? '...' : ''}&quot;
            </p>
          </div>
        )}
      </Card>
    );
  }

  // EDIT MODE - What teachers see
  return (
    <Card className="p-4 bg-white border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-700">{questionId}</span>
        <span className="text-xs text-gray-400">Short Answer Block - Edit Mode</span>
      </div>

      {/* Rich Text Question Editor */}
      <div className="space-y-3 mb-4">
        <Label className="font-semibold text-sm">Question (Rich Text)</Label>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {/* Rich Text Toolbar */}
          <div className="bg-gray-100 px-3 py-2 border-b border-gray-300 flex flex-wrap gap-2 items-center text-sm">
            <button
              type="button"
              className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
              onClick={() => {
                // Add bold formatting
                const selection = window.getSelection();
                if (selection && selection.toString()) {
                  const bold = `<strong>${selection.toString()}</strong>`;
                  setQuestionHtml(questionHtml.replace(selection.toString(), bold));
                }
              }}
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              <em>I</em>
            </button>
            <button
              type="button"
              className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              • List
            </button>
            <button
              type="button"
              className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              📷 Image
            </button>
            <button
              type="button"
              className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              📊 Table
            </button>
            <button
              type="button"
              className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              📈 Graph
            </button>
          </div>

          {/* Content Editor */}
          <textarea
            value={questionHtml}
            onChange={(e) => setQuestionHtml(e.target.value)}
            className="w-full p-3 min-h-[120px] border-none outline-none resize-none"
            placeholder="Type your question here. You can use HTML tags like <strong>bold</strong>, <em>italic</em>, <img src='url' alt='description'>, etc."
          />
        </div>

        {/* Preview */}
        {questionHtml && (
          <div className="p-3 border border-gray-200 rounded bg-gray-50">
            <Label className="text-xs text-gray-600 block mb-2">Preview:</Label>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: questionHtml }}
            />
          </div>
        )}
      </div>

      {/* Answer Configuration */}
      <div className="space-y-3 mb-4">
        <Label className="font-semibold text-sm">Answer Settings</Label>
        <div className="flex items-center gap-3">
          <Label className="text-sm text-gray-600">Maximum Length:</Label>
          <Input
            type="number"
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.target.value))}
            min={10}
            max={1000}
            className="w-24"
          />
          <span className="text-sm text-gray-500">characters</span>
        </div>
      </div>

      {/* Preview Student View */}
      <div className="mb-4 p-3 border border-blue-200 rounded bg-blue-50">
        <Label className="text-sm font-semibold text-blue-800 block mb-2">
          Student View Preview:
        </Label>
        <div className="bg-white p-3 rounded border">
          {questionHtml && (
            <div
              className="prose prose-sm max-w-none text-gray-800 mb-3"
              dangerouslySetInnerHTML={{ __html: questionHtml }}
            />
          )}
          <Input
            placeholder="Type your short answer here..."
            className="text-base"
            disabled
          />
          <div className="text-xs text-gray-500 mt-1">
            Maximum {maxLength} characters
          </div>
        </div>
      </div>

      {/* Configure Evaluation */}
      {onConfigure && (
        <div className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowConfigModal(true)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          >
            ⚙️ Configure Evaluation
          </Button>
        </div>
      )}
    </Card>
  );
}