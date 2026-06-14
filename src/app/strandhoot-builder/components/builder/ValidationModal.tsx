'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Card } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  Edit3,
  Save,
  Undo,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';
import type { ValidationError } from '../../constants/validation';
import type { BlockType } from '../../types/strandhoot';

interface ValidationModalProps {
  open: boolean;
  onClose: () => void;
  errors: ValidationError[];
  blocks: BlockType[];
  title: string;
  description: string;
  onFixError: (blockId: string, field: string) => void;
  onUpdateTitle: (newTitle: string) => void;
  onUpdateDescription: (newDescription: string) => void;
  onUpdateBlock: (blockId: string, updates: Partial<BlockType>) => void;
  onPublishAnyway: () => void;
  isPublishing?: boolean;
  canPublishWithErrors?: boolean;
}

interface FieldEdit {
  isEditing: boolean;
  originalValue: string;
  currentValue: string;
  hasChanges: boolean;
}

export default function EnhancedValidationModal({
  open,
  onClose,
  errors,
  blocks,
  title,
  description,
  onFixError,
  onUpdateTitle,
  onUpdateDescription,
  onUpdateBlock,
  onPublishAnyway,
  isPublishing = false,
  canPublishWithErrors = false,
}: ValidationModalProps) {
  // Track editing state for each field
  const [fieldEdits, setFieldEdits] = useState<Record<string, FieldEdit>>({});
  const [showAllErrors, setShowAllErrors] = useState(true);

  // Initialize field edits when modal opens
  useEffect(() => {
    if (open) {
      const initialEdits: Record<string, FieldEdit> = {};
      
      // Add title and description
      initialEdits['title'] = {
        isEditing: false,
        originalValue: title,
        currentValue: title,
        hasChanges: false,
      };
      
      initialEdits['description'] = {
        isEditing: false,
        originalValue: description,
        currentValue: description,
        hasChanges: false,
      };

      // Add block fields that have errors
      errors.forEach(error => {
        if (error.blockId) {
          const block = blocks.find(b => b.id === error.blockId);
          if (block) {
            const fieldKey = `${error.blockId}.${error.field}`;
            const fieldValue = getFieldValue(block, error.field);
            
            initialEdits[fieldKey] = {
              isEditing: false,
              originalValue: fieldValue,
              currentValue: fieldValue,
              hasChanges: false,
            };
          }
        }
      });

      setFieldEdits(initialEdits);
    }
  }, [open, errors, blocks, title, description]);

  const getFieldValue = (block: BlockType, field: string): string => {
    const value = block.content?.[field];
    if (field === 'options' && Array.isArray(value)) {
      return value.map(opt => opt.text || '').join(', ');
    }
    return typeof value === 'string' ? value : '';
  };

  const setFieldValue = (block: BlockType, field: string, value: string): any => {
    if (field === 'options') {
      // Parse comma-separated options back to array format
      const optionTexts = value.split(',').map(s => s.trim()).filter(Boolean);
      return optionTexts.map(text => ({ text }));
    }
    return value;
  };

  const criticalErrors = errors.filter(err => 
    err.field === 'hasWelcomeBlock' || 
    err.field === 'hasAtLeastOneStrand' ||
    err.field === 'title'
  );
  
  const blockErrors = errors.filter(err => err.blockId);
  const formErrors = errors.filter(err => !err.blockId && !criticalErrors.includes(err));

  const getBlockLabel = (blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return 'Unknown Block';
    
    const title = block.content?.title || block.label || `${block.type} Block`;
    return `${title} (${block.type})`;
  };

  const getErrorIcon = (error: ValidationError) => {
    if (criticalErrors.includes(error)) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    return <AlertTriangle className="w-5 h-5 text-orange-500" />;
  };

  const startEdit = (fieldKey: string) => {
    setFieldEdits(prev => ({
      ...prev,
      [fieldKey]: {
        ...prev[fieldKey],
        isEditing: true,
      }
    }));
  };

  const cancelEdit = (fieldKey: string) => {
    setFieldEdits(prev => ({
      ...prev,
      [fieldKey]: {
        ...prev[fieldKey],
        isEditing: false,
        currentValue: prev[fieldKey].originalValue,
        hasChanges: false,
      }
    }));
  };

  const updateFieldValue = (fieldKey: string, newValue: string) => {
    setFieldEdits(prev => ({
      ...prev,
      [fieldKey]: {
        ...prev[fieldKey],
        currentValue: newValue,
        hasChanges: newValue !== prev[fieldKey].originalValue,
      }
    }));
  };

  const saveField = async (fieldKey: string) => {
    const edit = fieldEdits[fieldKey];
    if (!edit || !edit.hasChanges) return;

    try {
      if (fieldKey === 'title') {
        onUpdateTitle(edit.currentValue);
        toast.success('Title updated');
      } else if (fieldKey === 'description') {
        onUpdateDescription(edit.currentValue);
        toast.success('Description updated');
      } else {
        // Block field
        const [blockId, field] = fieldKey.split('.');
        const block = blocks.find(b => b.id === blockId);
        if (block) {
          const newFieldValue = setFieldValue(block, field, edit.currentValue);
          onUpdateBlock(blockId, {
            content: {
              ...block.content,
              [field]: newFieldValue,
            }
          });
          toast.success(`${field} updated`);
        }
      }

      // Update edit state
      setFieldEdits(prev => ({
        ...prev,
        [fieldKey]: {
          ...prev[fieldKey],
          isEditing: false,
          originalValue: edit.currentValue,
          hasChanges: false,
        }
      }));
    } catch (error) {
      toast.error('Failed to save changes');
      console.error('Save error:', error);
    }
  };

  const renderEditableField = (
    fieldKey: string,
    label: string,
    placeholder: string,
    multiline = false,
    required = false
  ) => {
    const edit = fieldEdits[fieldKey];
    if (!edit) return null;

    const InputComponent = multiline ? Textarea : Input;

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <div className="flex items-center gap-1">
            {edit.hasChanges && (
              <span className="text-xs text-orange-600">unsaved</span>
            )}
            {!edit.isEditing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => startEdit(fieldKey)}
                className="h-6 px-2 text-blue-600"
              >
                <Edit3 className="w-3 h-3" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => saveField(fieldKey)}
                  disabled={!edit.hasChanges}
                  className="h-6 px-2 text-green-600"
                >
                  <Save className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => cancelEdit(fieldKey)}
                  className="h-6 px-2 text-gray-600"
                >
                  <Undo className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <InputComponent
          value={edit.currentValue}
          onChange={(e) => updateFieldValue(fieldKey, e.target.value)}
          placeholder={placeholder}
          disabled={!edit.isEditing}
          className={`${!edit.isEditing ? 'bg-gray-50' : ''} ${
            edit.hasChanges ? 'border-orange-300' : ''
          }`}
          rows={multiline ? 3 : undefined}
        />
      </div>
    );
  };

  const groupedBlockErrors = blockErrors.reduce((acc, error) => {
    const blockId = error.blockId!;
    if (!acc[blockId]) acc[blockId] = [];
    acc[blockId].push(error);
    return acc;
  }, {} as Record<string, ValidationError[]>);

  const totalChanges = Object.values(fieldEdits).filter(edit => edit.hasChanges).length;
  const hasUnsavedChanges = totalChanges > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              {isPublishing ? 'Fix Issues Before Publishing' : 'Validation Issues'}
            </span>
            <div className="flex items-center gap-2">
              {hasUnsavedChanges && (
                <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded">
                  {totalChanges} unsaved change{totalChanges !== 1 ? 's' : ''}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllErrors(!showAllErrors)}
                className="text-gray-600"
              >
                {showAllErrors ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showAllErrors ? 'Hide Details' : 'Show All'}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {errors.length === 0 ? (
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">All validations passed!</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your Strandhoot is ready to be published.
              </p>
            </Card>
          ) : (
            <>
              {/* Quick Fix Section */}
              <Card className="p-4 bg-blue-50 border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Quick Fix
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title Field */}
                  {errors.some(e => e.field === 'title') && (
                    <div>
                      {renderEditableField(
                        'title',
                        'Strandhoot Title',
                        'Enter a compelling title...',
                        false,
                        true
                      )}
                    </div>
                  )}
                  
                  {/* Description Field */}
                  {errors.some(e => e.field === 'description') && (
                    <div className="md:col-span-2">
                      {renderEditableField(
                        'description',
                        'Description',
                        'Briefly describe what students will learn...',
                        true,
                        false
                      )}
                    </div>
                  )}
                </div>
              </Card>

              {showAllErrors && (
                <>
                  {/* Critical Errors */}
                  {criticalErrors.length > 0 && (
                    <Card className="p-4 bg-red-50 border-red-200">
                      <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Critical Issues
                      </h3>
                      <p className="text-sm text-red-700 mb-3">
                        These issues must be fixed before publishing:
                      </p>
                      <div className="space-y-2">
                        {criticalErrors.map((error, index) => (
                          <div key={index} className="flex items-start gap-2">
                            {getErrorIcon(error)}
                            <span className="text-sm text-red-700">{error.message}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Form Errors */}
                  {formErrors.length > 0 && (
                    <Card className="p-4 bg-orange-50 border-orange-200">
                      <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Form Issues
                      </h3>
                      <div className="space-y-2">
                        {formErrors.map((error, index) => (
                          <div key={index} className="flex items-start gap-2">
                            {getErrorIcon(error)}
                            <span className="text-sm text-orange-700">{error.message}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {/* Block Errors with Inline Editing */}
                  {Object.keys(groupedBlockErrors).length > 0 && (
                    <Card className="p-4 bg-yellow-50 border-yellow-200">
                      <h3 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                        <Info className="w-5 h-5" />
                        Block Issues
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(groupedBlockErrors).map(([blockId, blockErrors]) => (
                          <div key={blockId} className="border border-yellow-300 rounded-lg p-3 bg-white">
                            <div className="font-medium text-yellow-800 text-sm mb-3">
                              {getBlockLabel(blockId)}
                            </div>
                            <div className="space-y-3">
                              {blockErrors.map((error, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-yellow-700">{error.message}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => onFixError(blockId, error.field)}
                                      className="text-xs text-blue-600 hover:text-blue-800"
                                    >
                                      Go to Block
                                    </Button>
                                  </div>
                                  
                                  {/* Inline editor for common fields */}
                                  {(['title', 'question', 'text', 'url'].includes(error.field)) && (
                                    <div className="ml-4">
                                      {renderEditableField(
                                        `${blockId}.${error.field}`,
                                        error.field.charAt(0).toUpperCase() + error.field.slice(1),
                                        `Enter ${error.field}...`,
                                        error.field === 'text',
                                        true
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </>
              )}

              {/* Summary */}
              <Card className="p-4 bg-gray-50 border-gray-200">
                <div className="text-sm text-gray-700">
                  <strong>Summary:</strong> {errors.length} validation issue{errors.length !== 1 ? 's' : ''} found
                  {criticalErrors.length > 0 && (
                    <span className="text-red-600 ml-2">
                      ({criticalErrors.length} critical)
                    </span>
                  )}
                  {hasUnsavedChanges && (
                    <span className="text-orange-600 ml-2">
                      • {totalChanges} unsaved change{totalChanges !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                {isPublishing && (
                  <p className="text-xs text-gray-600 mt-1">
                    Fix these issues to ensure the best experience for your students.
                  </p>
                )}
              </Card>
            </>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            {hasUnsavedChanges && (
              <span className="text-orange-600">
                Remember to save your changes
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>
              {errors.length === 0 ? 'Close' : 'Cancel'}
            </Button>
            
            {errors.length === 0 ? (
              <Button 
                onClick={onClose} 
                className="bg-green-600 hover:bg-green-700"
                disabled={hasUnsavedChanges}
              >
                Continue Publishing
              </Button>
            ) : (
              <>
                {canPublishWithErrors && criticalErrors.length === 0 && (
                  <Button
                    variant="outline"
                    onClick={onPublishAnyway}
                    disabled={hasUnsavedChanges}
                    className="text-orange-600 border-orange-300 hover:bg-orange-50"
                  >
                    Publish Anyway
                  </Button>
                )}
                <Button 
                  onClick={onClose} 
                  variant="outline"
                  disabled={hasUnsavedChanges}
                >
                  Fix Issues First
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}