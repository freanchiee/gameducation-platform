import React, { useState, useEffect } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';

type ExtendedResponseBlockProps = {
  block: {
    id: string;
    type: string;
    content: {
      question?: string;
      questionHtml?: string;
      evaluation?: any;
      minWords?: number;
      maxWords?: number;
      showWordCount?: boolean;
      allowImages?: boolean;
      allowTables?: boolean;
      showLiveEval?: boolean;
    };
  };
  questionId?: string;
  onConfigure?: () => void;
  readOnly?: boolean;
  onUpdate?: (updatedContent: any) => void;
};

export default function ExtendedResponseBlock({
  block,
  questionId,
  onConfigure,
  readOnly = false,
  onUpdate,
}: ExtendedResponseBlockProps) {
  const [questionHtml, setQuestionHtml] = useState<string>(
    block.content?.questionHtml || ''
  );
  const [minWords, setMinWords] = useState<number>(
    block.content?.minWords || 50
  );
  const [maxWords, setMaxWords] = useState<number>(
    block.content?.maxWords || 500
  );
  const [showWordCount, setShowWordCount] = useState<boolean>(
    block.content?.showWordCount ?? true
  );
  const [allowImages, setAllowImages] = useState<boolean>(
    block.content?.allowImages ?? true
  );
  const [allowTables, setAllowTables] = useState<boolean>(
    block.content?.allowTables ?? true
  );
  const [showLiveEval, setShowLiveEval] = useState<boolean>(
    block.content?.showLiveEval ?? true
  );
  
  // Student's answer (only for preview mode)
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [, setShowConfigModal] = useState(false);

  // Calculate word count
  const wordCount = studentAnswer.trim() ? studentAnswer.trim().split(/\s+/).length : 0;

  // Update parent when content changes (only in edit mode)
  useEffect(() => {
    if (!readOnly && onUpdate) {
      onUpdate({
        questionHtml,
        minWords,
        maxWords,
        showWordCount,
        allowImages,
        allowTables,
        showLiveEval,
      });
    }
  }, [questionHtml, minWords, maxWords, showWordCount, allowImages, allowTables, showLiveEval, readOnly, onUpdate]);

  if (readOnly) {
    // PREVIEW MODE - What students see
    return (
      <Card className="p-4 bg-white border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-blue-600">{questionId}</span>
          <span className="text-xs text-gray-400">Extended Response</span>
        </div>

        {/* Question Display */}
        {questionHtml && (
          <div className="mb-4">
            <div
              className="prose prose-sm max-w-none text-gray-800 mb-4"
              dangerouslySetInnerHTML={{ __html: questionHtml }}
            />
          </div>
        )}

        {/* Student Response Area */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Your Response:</Label>
          
          {/* Rich Text Editor for Students */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Simple Toolbar for Students */}
            <div className="bg-gray-100 px-3 py-2 border-b border-gray-300 flex flex-wrap gap-2 items-center text-sm">
              <button
                type="button"
                className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
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
              {allowTables && (
                <button
                  type="button"
                  className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                >
                  📊 Table
                </button>
              )}
              {allowImages && (
                <button
                  type="button"
                  className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                >
                  📷 Image
                </button>
              )}
              <button
                type="button"
                className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
              >
                📈 Graph
              </button>
            </div>

            {/* Response Textarea */}
            <textarea
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              className="w-full p-4 min-h-[200px] border-none outline-none resize-none"
              placeholder="Write your detailed response here. You can include explanations, examples, and reasoning..."
            />
          </div>

          {/* Word Count and Guidelines */}
          {showWordCount && (
            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-600">
                Recommended: {minWords}-{maxWords} words
              </div>
              <div
                className={`font-medium ${
                  wordCount < minWords
                    ? 'text-orange-500'
                    : wordCount > maxWords
                    ? 'text-red-500'
                    : 'text-green-600'
                }`}
              >
                {wordCount} words
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          {showWordCount && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  wordCount < minWords
                    ? 'bg-orange-400'
                    : wordCount > maxWords
                    ? 'bg-red-400'
                    : 'bg-green-500'
                }`}
                style={{
                  width: `${Math.min(100, (wordCount / maxWords) * 100)}%`,
                }}
              />
            </div>
          )}

          {/* Feedback Messages */}
          {wordCount > 0 && showWordCount && (
            <div
              className={`p-3 rounded border ${
                wordCount < minWords
                  ? 'bg-orange-50 border-orange-200 text-orange-800'
                  : wordCount > maxWords
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-green-50 border-green-200 text-green-800'
              }`}
            >
              {wordCount < minWords && (
                <p className="text-sm">
                  💡 Consider adding more detail. You need {minWords - wordCount} more words to reach the minimum.
                </p>
              )}
              {wordCount >= minWords && wordCount <= maxWords && (
                <p className="text-sm">
                  ✓ Great! Your response length is within the recommended range.
                </p>
              )}
              {wordCount > maxWords && (
                <p className="text-sm">
                  ⚠️ Your response is {wordCount - maxWords} words over the limit. Consider being more concise.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Live Evaluation (Optional) */}
        {studentAnswer.trim() && showLiveEval && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">🔍 Live Evaluation</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Level:</strong> 5 / 8</p>
              <p><strong>Keywords found:</strong> <span className="bg-green-100 px-1 rounded">analysis</span>, <span className="bg-green-100 px-1 rounded">evidence</span></p>
              <p><strong>Suggestions:</strong> Try adding more scientific terminology and explain the relationship clearly.</p>
            </div>
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
        <span className="text-xs text-gray-400">Extended Response Block - Edit Mode</span>
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
              onClick={() => {
                const selection = window.getSelection();
                if (selection && selection.toString()) {
                  const italic = `<em>${selection.toString()}</em>`;
                  setQuestionHtml(questionHtml.replace(selection.toString(), italic));
                }
              }}
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
            <button
              type="button"
              className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              🔗 Link
            </button>
          </div>

          {/* Content Editor */}
          <textarea
            value={questionHtml}
            onChange={(e) => setQuestionHtml(e.target.value)}
            className="w-full p-3 min-h-[150px] border-none outline-none resize-none"
            placeholder="Type your question here. You can use HTML tags like <strong>bold</strong>, <em>italic</em>, <img src='url' alt='description'>, <table>, etc."
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

      {/* Response Configuration */}
      <div className="space-y-4 mb-4">
        <Label className="font-semibold text-sm">Response Settings</Label>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Minimum Words:</Label>
            <Input
              type="number"
              value={minWords}
              onChange={(e) => setMinWords(Number(e.target.value))}
              min={10}
              max={1000}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Maximum Words:</Label>
            <Input
              type="number"
              value={maxWords}
              onChange={(e) => setMaxWords(Number(e.target.value))}
              min={minWords + 10}
              max={2000}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Show Word Count:</Label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={showWordCount}
                onChange={(e) => setShowWordCount(e.target.checked)}
                className="w-4 h-4 text-blue-600 accent-blue-600"
              />
              <span className="text-sm text-gray-700">
                Display word counter to students
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="space-y-3 mb-4">
        <Label className="font-semibold text-sm">Student Editor Options</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="allowImages"
              checked={allowImages}
              onChange={(e) => setAllowImages(e.target.checked)}
              className="w-4 h-4 text-blue-600 accent-blue-600"
            />
            <Label htmlFor="allowImages" className="text-sm text-gray-700">
              Allow students to upload images
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="allowTables"
              checked={allowTables}
              onChange={(e) => setAllowTables(e.target.checked)}
              className="w-4 h-4 text-blue-600 accent-blue-600"
            />
            <Label htmlFor="allowTables" className="text-sm text-gray-700">
              Allow students to insert tables
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showLiveEval"
              checked={showLiveEval}
              onChange={(e) => setShowLiveEval(e.target.checked)}
              className="w-4 h-4 text-blue-600 accent-blue-600"
            />
            <Label htmlFor="showLiveEval" className="text-sm text-gray-700">
              Show live evaluation feedback
            </Label>
          </div>
        </div>
      </div>

      {/* Preview Student View */}
      <div className="mb-4 p-3 border border-blue-200 rounded bg-blue-50">
        <Label className="text-sm font-semibold text-blue-800 block mb-2">
          Student View Preview:
        </Label>
        <div className="bg-white p-3 rounded border space-y-3">
          {questionHtml && (
            <div
              className="prose prose-sm max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: questionHtml }}
            />
          )}
          
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 border-b border-gray-300 flex gap-2 text-sm">
              <span className="px-2 py-1 bg-white border rounded"><strong>B</strong></span>
              <span className="px-2 py-1 bg-white border rounded"><em>I</em></span>
              <span className="px-2 py-1 bg-white border rounded">• List</span>
              {allowTables && <span className="px-2 py-1 bg-white border rounded">📊 Table</span>}
              {allowImages && <span className="px-2 py-1 bg-white border rounded">📷 Image</span>}
              <span className="px-2 py-1 bg-white border rounded">📈 Graph</span>
            </div>
            <textarea
              placeholder="Write your detailed response here..."
              className="w-full p-4 min-h-[120px] border-none outline-none resize-none"
              disabled
            />
          </div>
          
          {showWordCount && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Recommended: {minWords}-{maxWords} words</span>
              <span>0 words</span>
            </div>
          )}
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