'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { 
  Save, 
  Upload,
  Share2,
  Copy,
  CheckCircle,
  AlertTriangle,
  Clock,
  Globe,
  Lock,
  Eye,
  Settings,
  Tag,
  FileText} from 'lucide-react';
import { toast } from 'sonner';
import type { BlockType } from '@/app/strandhoot-builder/types/strandhoot';

interface SavePublishPanelProps {
  blocks: BlockType[];
  title: string;
  description: string;
  onSave: (data: SaveData) => Promise<{ success: boolean; id?: string; error?: string }>;
  onPublish: (id: string) => Promise<{ success: boolean; error?: string }>;
  onValidate: () => ValidationResult;
  currentId?: string;
  isPublished?: boolean;
  lastSaved?: Date | null;
  unsavedChanges?: boolean;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

interface SaveData {
  title: string;
  description: string;
  blocks: BlockType[];
  metadata: {
    subject?: string;
    criteria?: string;
    mypYear?: string;
    tags?: string[];
    estimatedDuration?: number;
    targetAudience?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    category?: string;
  };
  settings: {
    visibility: 'private' | 'public' | 'unlisted';
    allowComments?: boolean;
    allowRating?: boolean;
    allowCopying?: boolean;
    requireLogin?: boolean;
  };
}

interface ValidationResult {
  isValid: boolean;
  score: number;
  errors: string[];
  warnings: string[];
}

export default function SavePublishPanel({
  blocks,
  title,
  description,
  onSave,
  onPublish,
  onValidate,
  currentId,
  isPublished = false,
  lastSaved,
  unsavedChanges = false,
  onTitleChange,
  onDescriptionChange,
}: SavePublishPanelProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Metadata state
  const [tags, setTags] = useState<string[]>([]);
  const [estimatedDuration, setEstimatedDuration] = useState<number>(30);
  const [targetAudience, setTargetAudience] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [category, setCategory] = useState<string>('');
  
  // Settings state
  const [visibility, setVisibility] = useState<'private' | 'public' | 'unlisted'>('private');
  const [allowComments, setAllowComments] = useState(true);
  const [allowRating, setAllowRating] = useState(true);
  const [allowCopying, setAllowCopying] = useState(false);
  const [requireLogin, setRequireLogin] = useState(false);
  
  // Auto-validation on blocks change
  useEffect(() => {
    if (blocks.length > 0) {
      const result = onValidate();
      setValidation(result);
    }
  }, [blocks, onValidate]);

  // Extract metadata from welcome block
  const welcomeBlock = blocks.find(b => b.type === 'welcome');
  const subject = (welcomeBlock?.content?.subject as string) || '';
  const criteria = (welcomeBlock?.content?.criteria as string) || '';
  const mypYear = (welcomeBlock?.content?.myp_year as string) || '';

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    setIsSaving(true);
    
    try {
      const saveData: SaveData = {
        title: title.trim(),
        description: description.trim(),
        blocks,
        metadata: {
          subject,
          criteria,
          mypYear,
          tags,
          estimatedDuration,
          targetAudience,
          difficulty,
          category,
        },
        settings: {
          visibility,
          allowComments,
          allowRating,
          allowCopying,
          requireLogin,
        }
      };

      const result = await onSave(saveData);
      
      if (result.success) {
        toast.success('Strandhoot saved successfully!', {
          description: `Saved with ${blocks.length} blocks`,
        });
      } else {
        toast.error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('An error occurred while saving');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!currentId) {
      toast.error('Please save the strandhoot first');
      return;
    }

    // Validate before publishing
    const validationResult = onValidate();
    if (!validationResult.isValid) {
      toast.error('Cannot publish: Please fix validation errors first');
      setValidation(validationResult);
      return;
    }

    setIsPublishing(true);
    
    try {
      const result = await onPublish(currentId);
      
      if (result.success) {
        toast.success('Strandhoot published successfully!', {
          description: 'It is now available for teachers to use',
        });
      } else {
        toast.error(result.error || 'Failed to publish');
      }
    } catch (error) {
      console.error('Publish error:', error);
      toast.error('An error occurred while publishing');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const generateShareUrl = () => {
    if (!currentId) return '';
    const baseUrl = window.location.origin;
    return `${baseUrl}/strandhoot/${currentId}`;
  };

  const copyShareUrl = () => {
    const url = generateShareUrl();
    navigator.clipboard.writeText(url);
    toast.success('Share URL copied to clipboard!');
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQualityBadge = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Save className="h-5 w-5 text-blue-600" />
          Save & Publish
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {unsavedChanges && (
            <span className="flex items-center gap-1 text-orange-600">
              <Clock size={14} />
              Unsaved changes
            </span>
          )}
          {lastSaved && (
            <span className="flex items-center gap-1">
              <CheckCircle size={14} />
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Title *</Label>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter strandhoot title..."
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Description</Label>
          <Textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Brief description of what students will learn (recommended)..."
            rows={3}
            className="mt-1"
          />
        </div>
      </div>

      {/* Validation Status */}
      {validation && (
        <div className={`p-4 rounded-lg border ${
          validation.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium flex items-center gap-2">
              {validation.isValid ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              Quality Check
            </h4>
            <span className={`px-2 py-1 rounded text-white text-sm ${getQualityBadge(validation.score)}`}>
              {validation.score}/100
            </span>
          </div>
          
          {validation.errors.length > 0 && (
            <div className="mb-2">
              <p className="text-sm font-medium text-red-600 mb-1">Errors:</p>
              <ul className="text-sm text-red-600 list-disc list-inside space-y-1">
                {validation.errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {validation.warnings.length > 0 && (
            <div>
              <p className="text-sm font-medium text-yellow-600 mb-1">Suggestions:</p>
              <ul className="text-sm text-yellow-600 list-disc list-inside space-y-1">
                {validation.warnings.map((warning, i) => (
                  <li key={i}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Auto-detected Metadata */}
      {(subject || criteria || mypYear) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Detected Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            {subject && (
              <div>
                <span className="font-medium text-blue-700">Subject:</span> {subject}
              </div>
            )}
            {criteria && (
              <div>
                <span className="font-medium text-blue-700">Criteria:</span> {criteria}
              </div>
            )}
            {mypYear && (
              <div>
                <span className="font-medium text-blue-700">Year:</span> MYP {mypYear}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      <div>
        <Label className="text-sm font-medium">Tags</Label>
        <div className="mt-1">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm"
              >
                <Tag size={12} />
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <Input
            placeholder="Add tags (press Enter)..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            className="text-sm"
          />
        </div>
      </div>

      {/* Quick Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Estimated Duration (minutes)</Label>
          <Input
            type="number"
            value={estimatedDuration}
            onChange={(e) => setEstimatedDuration(parseInt(e.target.value) || 30)}
            min="5"
            max="180"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label className="text-sm font-medium">Visibility</Label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as 'private' | 'public' | 'unlisted')}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="private">🔒 Private (Only you)</option>
            <option value="unlisted">🔗 Unlisted (Link only)</option>
            <option value="public">🌍 Public (Everyone)</option>
          </select>
        </div>
      </div>

      {/* Advanced Settings */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="gap-1 text-gray-600"
        >
          <Settings size={16} />
          {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
        </Button>
      </div>

      {showAdvanced && (
        <div className="space-y-4 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Target Audience</Label>
              <Input
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., MYP 3 Students, Grade 9"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">Difficulty Level</Label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="beginner">🟢 Beginner</option>
                <option value="intermediate">🟡 Intermediate</option>
                <option value="advanced">🔴 Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Category</Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Science, Mathematics, Language Arts"
              className="mt-1"
            />
          </div>

          {/* Permissions */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Permissions</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={allowComments}
                  onChange={(e) => setAllowComments(e.target.checked)}
                  className="rounded"
                />
                Allow comments and feedback
              </label>
              
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={allowRating}
                  onChange={(e) => setAllowRating(e.target.checked)}
                  className="rounded"
                />
                Allow rating and reviews
              </label>
              
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={allowCopying}
                  onChange={(e) => setAllowCopying(e.target.checked)}
                  className="rounded"
                />
                Allow others to copy and modify
              </label>
              
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={requireLogin}
                  onChange={(e) => setRequireLogin(e.target.checked)}
                  className="rounded"
                />
                Require login to access
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-4 border-t">
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            className="flex-1 gap-2"
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          
          <Button
            onClick={handlePublish}
            disabled={isPublishing || !currentId || !validation?.isValid}
            variant={isPublished ? "outline" : "default"}
            className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Upload size={16} />
            {isPublishing ? 'Publishing...' : isPublished ? 'Update Public' : 'Publish'}
          </Button>
        </div>

        {/* Status and Share */}
        {currentId && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {isPublished ? (
                <span className="flex items-center gap-1 text-green-600">
                  <Globe size={14} />
                  Published
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-500">
                  <Lock size={14} />
                  Draft
                </span>
              )}
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{blocks.length} blocks</span>
            </div>
            
            {isPublished && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="gap-1"
              >
                <Share2 size={14} />
                Share
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Share Options */}
      {showShareOptions && isPublished && currentId && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-gray-700 flex items-center gap-2">
            <Share2 size={16} />
            Share Options
          </h4>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                value={generateShareUrl()}
                readOnly
                className="flex-1 bg-white text-sm"
              />
              <Button
                size="sm"
                onClick={copyShareUrl}
                className="gap-1"
              >
                <Copy size={14} />
                Copy
              </Button>
            </div>
            
            <div className="flex gap-2 text-xs">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-1"
              >
                <a
                  href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
                    `Check out this interactive learning experience: ${generateShareUrl()}`
                  )}`}
                >
                  📧 Email
                </a>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-1"
              >
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `Check out this interactive learning experience: ${title}`
                  )}&url=${encodeURIComponent(generateShareUrl())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🐦 Twitter
                </a>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-1"
              >
                <a
                  href={generateShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye size={14} />
                  Preview
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
          <FileText size={16} />
          Content Summary
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{blocks.length}</div>
            <div className="text-blue-700">Total Blocks</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {blocks.filter(b => ['mcq', 'short', 'extended', 'fill'].includes(b.type)).length}
            </div>
            <div className="text-blue-700">Questions</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {blocks.filter(b => b.type === 'strand').length}
            </div>
            <div className="text-blue-700">Strands</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{estimatedDuration}</div>
            <div className="text-blue-700">Minutes</div>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>💾 Save Draft:</strong> Saves your work privately. You can continue editing anytime.</p>
        <p><strong>🌍 Publish:</strong> Makes your strandhoot available for teachers to use in their sessions.</p>
        <p><strong>📊 Quality Score:</strong> Based on content completeness, structure, and educational value.</p>
      </div>
    </Card>
  );
}