import React from 'react';
import { Button } from '@/app/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Trash2, 
  Save,
  Eye,
  Settings
} from 'lucide-react';

interface Props {
  strandIndex: number;
  totalStrands: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onFinish?: () => void;
  onDelete: () => void;
  onSave?: () => void;
  onPreview?: () => void;
  onConfigure?: () => void;
  hasUnsavedChanges?: boolean;
}

export default function StrandNavigationButtons({
  strandIndex,
  totalStrands,
  onNext,
  onPrevious,
  onFinish,
  onDelete,
  onSave,
  onPreview,
  onConfigure,
  hasUnsavedChanges = false,
}: Props) {
  
  const isFirst = strandIndex === 0;
  const isLast = strandIndex === totalStrands - 1;
  
  const getFinishButtonText = () => {
    if (totalStrands === 1) return 'Complete Strandhoot';
    return 'Finish & Publish';
  };

  const getNextButtonText = () => {
    if (isLast) return getFinishButtonText();
    return `Next Strand (${strandIndex + 2}/${totalStrands})`;
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      {/* Top Row - Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {onSave && (
            <Button
              onClick={onSave}
              variant="outline"
              size="sm"
              className={hasUnsavedChanges ? 'border-orange-500 text-orange-600' : ''}
            >
              <Save className="w-4 h-4 mr-1" />
              {hasUnsavedChanges ? 'Save Changes' : 'Saved'}
            </Button>
          )}
          
          {onPreview && (
            <Button
              onClick={onPreview}
              variant="outline"
              size="sm"
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
          )}
          
          {onConfigure && (
            <Button
              onClick={onConfigure}
              variant="outline"
              size="sm"
            >
              <Settings className="w-4 h-4 mr-1" />
              Configure
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Strand {strandIndex + 1} of {totalStrands}
          </span>
          
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete Strand
          </Button>
        </div>
      </div>

      {/* Bottom Row - Navigation Buttons */}
      <div className="flex justify-between items-center">
        {/* Previous Button */}
        <div>
          {!isFirst && onPrevious ? (
            <Button
              onClick={onPrevious}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous Strand
            </Button>
          ) : (
            <div className="w-32" /> // Spacer to maintain layout
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalStrands }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === strandIndex
                  ? 'bg-blue-500'
                  : index < strandIndex
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
              title={`Strand ${index + 1}`}
            />
          ))}
        </div>

        {/* Next/Finish Button */}
        <div>
          {isLast ? (
            <Button
              onClick={onFinish}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="w-4 h-4 mr-1" />
              {getFinishButtonText()}
            </Button>
          ) : onNext ? (
            <Button
              onClick={onNext}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {getNextButtonText()}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <div className="w-32" /> // Spacer to maintain layout
          )}
        </div>
      </div>

      {/* Status Messages */}
      {hasUnsavedChanges && (
        <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-sm text-orange-700 text-center">
          ⚠️ You have unsaved changes
        </div>
      )}
    </div>
  );
}