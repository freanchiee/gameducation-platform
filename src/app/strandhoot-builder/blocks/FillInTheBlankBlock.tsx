import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

type BlankItem = {
  id: string;
  correctAnswer: string;
  acceptableAnswers: string[];
  caseSensitive: boolean;
  suggestions?: string[];
};

// ✅ Fix: Define proper evaluation type instead of any
type EvaluationConfig = {
  keywords?: string[];
  concepts?: string[];
  exemplar?: string;
  suggestions?: string[];
  correctAnswer?: string;
  [key: string]: unknown; // Allow additional properties
};

// ✅ Fix: Define proper content type instead of any
type BlockContent = {
  questionText?: string;
  blanks?: BlankItem[];
  blankPattern?: string;
  evaluation?: EvaluationConfig;
  [key: string]: unknown; // Allow additional properties
};

type FillBlankBlockProps = {
  block: {
    id: string;
    type: string;
    content: BlockContent; // ✅ Fix: Use proper type instead of any
  };
  questionId?: string;
  // ✅ Fix: Remove unused onConfigure parameter
  readOnly?: boolean;
  onConfigure?: () => void; // ✅ Fix: Added back onConfigure parameter
  onUpdate?: (updatedContent: BlockContent) => void; // ✅ Fix: Use proper type instead of any
};

export default function FillBlankBlock({
  block,
  questionId,
  readOnly = false,
  onUpdate,
}: FillBlankBlockProps) {
  const [questionText, setQuestionText] = useState<string>(
    block.content?.questionText || 'The _______ is affected by _______.'
  );
  const [blankPattern, setBlankPattern] = useState<string>(
    block.content?.blankPattern || '_______'
  );
  const [blanks, setBlanks] = useState<BlankItem[]>(
    block.content?.blanks || []
  );
  
  // Student's answers (only for preview mode)
  const [studentAnswers, setStudentAnswers] = useState<{ [key: string]: string }>({});

  // Helper function to escape special regex characters
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // ✅ Fix: Stable update function with proper typing
  const stableOnUpdate = useCallback((data: BlockContent) => {
    if (onUpdate && !readOnly) {
      onUpdate(data);
    }
  }, [onUpdate, readOnly]);

  // Update blanks array when question text or pattern changes (only in edit mode)
  useEffect(() => {
    if (!readOnly && blankPattern) {
      // Count how many times the pattern appears in the question text
      const blankCount = (questionText.match(new RegExp(escapeRegExp(blankPattern), 'g')) || []).length;
      
      setBlanks(prevBlanks => {
        // If the count matches, don't change anything
        if (prevBlanks.length === blankCount) {
          return prevBlanks; // Return the same array reference to prevent re-renders
        }
        
        const currentBlanks = [...prevBlanks];
        
        // Add missing blanks
        while (currentBlanks.length < blankCount) {
          currentBlanks.push({
            id: (currentBlanks.length + 1).toString(),
            correctAnswer: '',
            acceptableAnswers: [],
            caseSensitive: false,
            suggestions: [],
          });
        }
        
        // Remove extra blanks
        if (currentBlanks.length > blankCount) {
          currentBlanks.splice(blankCount);
        }
        
        return currentBlanks;
      });
    }
  }, [questionText, blankPattern, readOnly]);

  // Update parent when content changes (only in edit mode) - with proper debouncing
  useEffect(() => {
    if (!readOnly) {
      const timeoutId = setTimeout(() => {
        stableOnUpdate({
          questionText,
          blankPattern,
          blanks,
        });
      }, 100); // Small debounce to prevent excessive updates

      return () => clearTimeout(timeoutId);
    }
  }, [questionText, blankPattern, blanks, readOnly, stableOnUpdate]);

  // Parse question text to find blanks and render
  const renderQuestionWithBlanks = (isStudentView: boolean = false) => {
    if (!blankPattern) return <div className="text-gray-500">No blank pattern set</div>;
    
    // Use regex to split and preserve the pattern positions
    const regex = new RegExp(`(${escapeRegExp(blankPattern)})`, 'g');
    const parts = questionText.split(regex);
    const elements: JSX.Element[] = [];
    let blankIndex = 0;

    parts.forEach((part, index) => {
      if (part === blankPattern) {
        // This is a blank placeholder
        const blankId = (blankIndex + 1).toString();
        
        elements.push(
          <span key={`blank-${blankIndex}`} className="inline-block mx-1">
            {isStudentView ? (
              <Input
                value={studentAnswers[blankId] || ''}
                onChange={(e) => {
                  setStudentAnswers(prev => ({
                    ...prev,
                    [blankId]: e.target.value
                  }));
                }}
                className="inline-block w-32 h-8 text-center border-b-2 border-blue-400 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:bg-blue-50"
                placeholder={`Blank ${blankIndex + 1}`}
              />
            ) : (
              <span className="inline-block w-32 h-8 border-b-2 border-gray-400 border-dashed bg-gray-100 text-center leading-8 text-gray-500 text-sm">
                Blank {blankIndex + 1}
              </span>
            )}
          </span>
        );
        blankIndex++;
      } else if (part) {
        // This is regular text
        elements.push(
          <span key={`text-${index}`} className="text-gray-800">
            {part}
          </span>
        );
      }
    });

    return <div className="text-base leading-relaxed">{elements}</div>;
  };

  const updateBlank = useCallback((index: number, field: keyof BlankItem, value: string | boolean | string[]) => {
    setBlanks(prevBlanks => {
      const updated = [...prevBlanks];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const addAcceptableAnswer = useCallback((blankIndex: number, answer: string) => {
    if (answer.trim()) {
      setBlanks(prevBlanks => {
        const updated = [...prevBlanks];
        updated[blankIndex] = {
          ...updated[blankIndex],
          acceptableAnswers: [...updated[blankIndex].acceptableAnswers, answer.trim()]
        };
        return updated;
      });
    }
  }, []);

  const removeAcceptableAnswer = useCallback((blankIndex: number, answerIndex: number) => {
    setBlanks(prevBlanks => {
      const updated = [...prevBlanks];
      updated[blankIndex] = {
        ...updated[blankIndex],
        acceptableAnswers: updated[blankIndex].acceptableAnswers.filter((_, i) => i !== answerIndex)
      };
      return updated;
    });
  }, []);

  const addSuggestion = useCallback((blankIndex: number, suggestion: string) => {
    if (suggestion.trim()) {
      setBlanks(prevBlanks => {
        const updated = [...prevBlanks];
        updated[blankIndex] = {
          ...updated[blankIndex],
          suggestions: [...(updated[blankIndex].suggestions || []), suggestion.trim()]
        };
        return updated;
      });
    }
  }, []);

  const removeSuggestion = useCallback((blankIndex: number, suggestionIndex: number) => {
    setBlanks(prevBlanks => {
      const updated = [...prevBlanks];
      if (updated[blankIndex].suggestions) {
        updated[blankIndex] = {
          ...updated[blankIndex],
          suggestions: updated[blankIndex].suggestions!.filter((_, i) => i !== suggestionIndex)
        };
      }
      return updated;
    });
  }, []);

  // Check if student answer is correct
  const isAnswerCorrect = (blankIndex: number, answer: string) => {
    const blank = blanks[blankIndex];
    if (!blank || !answer.trim()) return false;
    
    const checkAnswer = blank.caseSensitive ? answer : answer.toLowerCase();
    const correctAnswer = blank.caseSensitive ? blank.correctAnswer : blank.correctAnswer.toLowerCase();
    
    if (checkAnswer === correctAnswer) return true;
    
    return blank.acceptableAnswers.some(acceptable => {
      const acceptableAnswer = blank.caseSensitive ? acceptable : acceptable.toLowerCase();
      return checkAnswer === acceptableAnswer;
    });
  };

  if (readOnly) {
    // PREVIEW MODE - MINIMAL - Only the fill-in-the-blank question
    return (
      <Card className="p-6 bg-white border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-blue-600">{questionId}</span>
          <span className="text-xs text-gray-400">Fill in the Blanks</span>
        </div>
        
        <Label className="text-sm font-medium text-gray-700 block mb-4">
          Complete the sentence by filling in the blanks:
        </Label>
        
        <div className="mb-6">
          {renderQuestionWithBlanks(true)}
        </div>

        {/* Student feedback section */}
        {Object.keys(studentAnswers).length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800 font-medium mb-2">Your Answers:</p>
            <div className="space-y-1">
              {Object.entries(studentAnswers).map(([blankId, answer]) => {
                const blankIndex = parseInt(blankId) - 1;
                const isCorrect = isAnswerCorrect(blankIndex, answer);
                return (
                  <div key={blankId} className="text-sm">
                    <span className="font-medium">Blank {blankId}:</span>{' '}
                    <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {answer || '(empty)'}
                    </span>
                    {isCorrect ? ' ✓' : ' ✗'}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    );
  }

  // EDIT MODE - What teachers see
  return (
    <Card className="p-6 bg-white border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">{questionId}</span>
          <span className="text-xs text-gray-400">Fill in the Blanks - Edit Mode</span>
        </div>
      </div>

      {/* Question Text Editor */}
      <div className="space-y-3 mb-6">
        <Label className="font-semibold text-sm">Question Text</Label>
        <Input
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Use your chosen pattern to create blanks. Example: The _______ is affected by _______."
          className="text-base"
        />
      </div>

      {/* Blank Pattern Configuration */}
      <div className="space-y-3 mb-6">
        <Label className="font-semibold text-sm">Blank Pattern</Label>
        <Input
          value={blankPattern}
          onChange={(e) => setBlankPattern(e.target.value)}
          placeholder="Pattern to identify blanks (e.g., _______, ___, [blank])"
          className="text-base"
        />
        <p className="text-xs text-gray-500">
          💡 Use any pattern you want. Each occurrence of this pattern in the question text becomes a fillable blank.
        </p>
      </div>

      {/* Preview */}
      <div className="mb-6 p-4 border border-gray-200 rounded bg-gray-50">
        <Label className="text-xs text-gray-600 block mb-3">Preview:</Label>
        {renderQuestionWithBlanks(false)}
        <p className="text-xs text-gray-500 mt-3">
          Detected {blanks.length} blank(s) in the question.
        </p>
      </div>

      {/* Blank Configuration */}
      {blanks.length > 0 && (
        <div className="space-y-4 mb-6">
          <Label className="font-semibold text-sm">Configure Answers for Each Blank</Label>
          {blanks.map((blank, index) => (
            <div key={blank.id} className="p-4 border border-gray-200 rounded bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <Label className="font-medium text-sm">Blank {index + 1}</Label>
                <div className="flex items-center gap-2">
                  <Label className="text-xs text-gray-600">Case Sensitive:</Label>
                  <input
                    type="checkbox"
                    checked={blank.caseSensitive}
                    onChange={(e) => updateBlank(index, 'caseSensitive', e.target.checked)}
                    className="w-4 h-4 text-blue-600 accent-blue-600"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600">Primary Correct Answer:</Label>
                  <Input
                    value={blank.correctAnswer}
                    onChange={(e) => updateBlank(index, 'correctAnswer', e.target.value)}
                    placeholder="Main correct answer"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label className="text-sm text-gray-600">Additional Acceptable Answers:</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Add alternative answer"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addAcceptableAnswer(index, e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                        if (input && input.value.trim()) {
                          addAcceptableAnswer(index, input.value);
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  
                  {blank.acceptableAnswers.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {blank.acceptableAnswers.map((answer, answerIndex) => (
                        <span
                          key={answerIndex}
                          className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                        >
                          {answer}
                          <button
                            onClick={() => removeAcceptableAnswer(index, answerIndex)}
                            className="text-blue-600 hover:text-blue-800 ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-sm text-gray-600">Hints/Suggestions (for incorrect answers):</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Add hint for students"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addSuggestion(index, e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement;
                        if (input && input.value.trim()) {
                          addSuggestion(index, input.value);
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  
                  {blank.suggestions && blank.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {blank.suggestions.map((suggestion, suggestionIndex) => (
                        <span
                          key={suggestionIndex}
                          className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs"
                        >
                          {suggestion}
                          <button
                            onClick={() => removeSuggestion(index, suggestionIndex)}
                            className="text-yellow-600 hover:text-yellow-800 ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}