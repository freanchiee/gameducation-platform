import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // ✅ Fix: Import Next.js Image component
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

type Option = {
  text: string;
  imageUrl?: string;
};

// ✅ Fix: Define proper evaluation type instead of any
type EvaluationConfig = {
  correctIndex?: number;
  keywords?: string[];
  concepts?: string[];
  exemplar?: string;
  suggestions?: string[];
  [key: string]: unknown; // Allow additional properties
};

// ✅ Fix: Define proper content type instead of any
type BlockContent = {
  question?: string;
  questionImage?: string;
  options?: Option[];
  correctIndex?: number;
  evaluation?: EvaluationConfig;
  [key: string]: unknown; // Allow additional properties
};

type MCQBlockProps = {
  block: {
    id: string;
    type: string;
    content: BlockContent; // ✅ Fix: Use proper type instead of any
  };
  questionId?: string;
  onConfigure?: () => void;
  readOnly?: boolean; // This determines Edit vs Preview mode
  onUpdate?: (updatedContent: BlockContent) => void; // ✅ Fix: Use proper type instead of any
};

export default function MCQBlock({ 
  block, 
  questionId, 
  onConfigure, 
  readOnly = false,
  onUpdate 
}: MCQBlockProps) {
  const [question, setQuestion] = useState<string>(
    block.content?.question || ''
  );
  const [questionImage, setQuestionImage] = useState<string>(
    block.content?.questionImage || ''
  );
  const [options, setOptions] = useState<Option[]>(
    block.content?.options || [
      { text: 'Option A' },
      { text: 'Option B' },
    ]
  );
  const [correctIndex, setCorrectIndex] = useState<number>(
    block.content?.correctIndex ?? 0
  );
  
  // Student's selected answer (only for preview mode)
  const [studentAnswer, setStudentAnswer] = useState<number | null>(null);
  // ✅ Fix: Removed unused showConfigModal variable

  // Update parent when content changes (only in edit mode)
  useEffect(() => {
    if (!readOnly && onUpdate) {
      onUpdate({
        question,
        questionImage,
        options,
        correctIndex,
      });
    }
  }, [question, questionImage, options, correctIndex, readOnly, onUpdate]);

  const handleOptionChange = (index: number, newText: string) => {
    const updated = [...options];
    updated[index] = { ...updated[index], text: newText };
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, { text: `Option ${String.fromCharCode(65 + options.length)}` }]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const updated = [...options];
      updated.splice(index, 1);
      setOptions(updated);
      
      // Adjust correctIndex if needed
      if (correctIndex >= index && correctIndex > 0) {
        setCorrectIndex(correctIndex - 1);
      }
    }
  };

  if (readOnly) {
    // PREVIEW MODE - What students see
    return (
      <Card className="p-4 bg-white border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-blue-600">{questionId}</span>
          <span className="text-xs text-gray-400">Multiple Choice</span>
        </div>

        {/* Question Display */}
        {question && (
          <div className="mb-4">
            <div className="text-base font-medium text-gray-800 mb-2">
              {question}
            </div>
            {questionImage && (
              <div className="relative w-full max-w-md">
                {/* ✅ Fix: Replace <img> with Next.js Image */}
                <Image
                  src={questionImage}
                  alt="Question"
                  width={400}
                  height={200}
                  className="max-w-full h-auto rounded border object-contain"
                  style={{ maxHeight: '200px' }}
                />
              </div>
            )}
          </div>
        )}

        {/* Student Answer Options */}
        <div className="space-y-3">
          {options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                studentAnswer === index
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              }`}
            >
              <input
                type="radio"
                name={`mcq-${block.id}`}
                value={index}
                checked={studentAnswer === index}
                onChange={() => setStudentAnswer(index)}
                className="w-4 h-4 text-blue-600 accent-blue-600"
              />
              <span className="font-semibold text-gray-700 min-w-[20px]">
                {String.fromCharCode(65 + index)}.
              </span>
              <div className="flex-1">
                <span className="text-gray-800">{option.text}</span>
                {option.imageUrl && (
                  <div className="mt-2 relative w-full max-w-[200px]">
                    {/* ✅ Fix: Replace <img> with Next.js Image */}
                    <Image
                      src={option.imageUrl}
                      alt={`Option ${String.fromCharCode(65 + index)}`}
                      width={200}
                      height={150}
                      className="max-w-[200px] h-auto rounded border object-contain"
                    />
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>

        {/* Student Feedback */}
        {studentAnswer !== null && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              ✓ Answer selected: Option {String.fromCharCode(65 + studentAnswer)}
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
        <span className="text-xs text-gray-400">MCQ Block - Edit Mode</span>
      </div>

      {/* Question Input */}
      <div className="space-y-3 mb-4">
        <Label className="font-semibold text-sm">Question</Label>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here"
          className="text-base"
        />
      </div>

      {/* Question Image */}
      <div className="space-y-2 mb-4">
        <Label className="text-sm text-gray-600">Question Image (optional)</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // Simulate image upload
              const reader = new FileReader();
              reader.onload = () => {
                setQuestionImage(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="text-sm"
        />
        {questionImage && (
          <div className="relative w-full max-w-md">
            {/* ✅ Fix: Replace <img> with Next.js Image */}
            <Image
              src={questionImage}
              alt="Question preview"
              width={400}
              height={160}
              className="max-w-full h-auto rounded border object-contain"
              style={{ maxHeight: '160px' }}
            />
            <button
              onClick={() => setQuestionImage('')}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 mb-4">
        <Label className="font-semibold text-sm">Answer Options</Label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
            <input
              type="radio"
              checked={index === correctIndex}
              onChange={() => setCorrectIndex(index)}
              className="w-4 h-4 text-green-600 accent-green-600"
              title="Mark as correct answer"
            />
            <span className="font-semibold text-gray-700 min-w-[20px]">
              {String.fromCharCode(65 + index)}.
            </span>
            <Input
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
              className="flex-1"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const updated = [...options];
                    updated[index] = { ...updated[index], imageUrl: reader.result as string };
                    setOptions(updated);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-32 text-xs"
              title="Add image to this option"
            />
            <button
              onClick={() => removeOption(index)}
              disabled={options.length <= 2}
              className="text-red-500 hover:text-red-700 disabled:text-gray-400 px-2 py-1 text-sm"
              title="Remove option"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add Option Button */}
      <Button
        onClick={addOption}
        variant="outline"
        className="mb-4 text-sm"
      >
        ➕ Add Option
      </Button>

      {/* Correct Answer Indicator */}
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
        <p className="text-sm text-green-800">
          <strong>Correct Answer:</strong> Option {String.fromCharCode(65 + correctIndex)} - {options[correctIndex]?.text}
        </p>
      </div>

      {/* Configure Evaluation */}
      {onConfigure && (
        <div className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={onConfigure}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          >
            ⚙️ Configure Evaluation
          </Button>
        </div>
      )}
    </Card>
  );
}