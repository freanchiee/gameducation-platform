'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { 
  Globe, 
  ExternalLink, 
  Eye,
  // ✅ Fix: Removed unused EyeOff import
  AlertTriangle,
  CheckCircle,
  Loader2,
  Monitor,
  Smartphone,
  Tablet,
  // ✅ Fix: Removed unused RefreshCw import
  Settings
} from 'lucide-react';
import { toast } from 'sonner';
import type { BlockType } from '@/app/strandhoot-builder/types/strandhoot';

interface IframeBlockProps {
  block: BlockType;
  onUpdate: (updated: BlockType) => void;
  onDelete: () => void;
  readOnly?: boolean;
  questionId?: string; // Add for consistency
}

interface IframeContent {
  url?: string;
  title?: string;
  description?: string;
  width?: string | number;
  height?: string | number;
  allowFullscreen?: boolean;
  sandbox?: string[];
  loading?: 'lazy' | 'eager';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  customCSS?: string;
  responsive?: boolean;
  aspectRatio?: string;
  showBorder?: boolean;
  borderRadius?: number;
}

const COMMON_SITES = [
  { name: 'YouTube', pattern: 'youtube.com', embedTransform: (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }},
  { name: 'Google Forms', pattern: 'docs.google.com/forms', embedTransform: (url: string) => {
    return url.replace('/viewform', '/viewform?embedded=true');
  }},
  { name: 'Google Slides', pattern: 'docs.google.com/presentation', embedTransform: (url: string) => {
    return url.replace('/edit', '/embed');
  }},
  { name: 'Padlet', pattern: 'padlet.com', embedTransform: (url: string) => url },
  { name: 'Canva', pattern: 'canva.com', embedTransform: (url: string) => url },
  { name: 'CodePen', pattern: 'codepen.io', embedTransform: (url: string) => {
    return url.replace('/pen/', '/embed/');
  }},
];

const SANDBOX_OPTIONS = [
  { value: 'allow-forms', label: 'Allow Forms', description: 'Allow form submission' },
  { value: 'allow-scripts', label: 'Allow Scripts', description: 'Allow JavaScript execution' },
  { value: 'allow-same-origin', label: 'Same Origin', description: 'Allow same-origin requests' },
  { value: 'allow-popups', label: 'Allow Popups', description: 'Allow popup windows' },
  { value: 'allow-downloads', label: 'Allow Downloads', description: 'Allow file downloads' },
  { value: 'allow-presentation', label: 'Allow Presentation', description: 'Allow fullscreen presentation' },
];

export default function IframeBlock({ 
  block, 
  onUpdate, 
  onDelete, 
  readOnly = false 
}: IframeBlockProps) {
  const content = (block.content as IframeContent) || {};
  
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | 'unknown'>('unknown');
  const [previewMode, setPreviewMode] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const validateUrl = useCallback(async (url: string) => {
    if (!url) return;
    
    setIsValidating(true);
    try {
      // Basic URL validation
      new URL(url);
      
      // Check if it's a known embeddable site or has proper headers
      const _response = await fetch(url, { method: 'HEAD', mode: 'no-cors' }); // ✅ Fix: Prefixed with underscore
      setValidationStatus('valid');
    } catch (_error) { // ✅ Fix: Prefixed with underscore
      try {
        // If CORS fails, just validate the URL format
        new URL(url);
        setValidationStatus('valid');
      } catch {
        setValidationStatus('invalid');
        toast.error('Invalid URL format');
      }
    } finally {
      setIsValidating(false);
    }
  }, []); // ✅ Fix: Added useCallback to prevent recreating function

  // Validate URL when it changes
  useEffect(() => {
    if (content.url) {
      validateUrl(content.url);
    }
  }, [content.url, validateUrl]); // ✅ Fix: Added validateUrl to dependencies

  // ✅ Fix: Memoize updateContent to prevent infinite loops
  const updateContent = useCallback((updates: Partial<IframeContent>) => {
    const updatedBlock: BlockType = {
      ...block,
      content: {
        ...content,
        ...updates,
        _updatedAt: new Date().toISOString(),
      }
    };
    onUpdate(updatedBlock);
  }, [block, content, onUpdate]);

  const getOptimizedUrl = useCallback((url: string): string => {
    if (!url) return '';
    
    // Check if URL needs transformation for embedding
    const site = COMMON_SITES.find(site => url.includes(site.pattern));
    if (site) {
      return site.embedTransform(url);
    }
    
    return url;
  }, []);

  const getDeviceStyles = useCallback(() => {
    switch (devicePreview) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { 
          width: content.width || '100%', 
          height: content.height || '500px' 
        };
    }
  }, [devicePreview, content.width, content.height]);

  // ✅ Fix: Updated useEffect with proper dependencies and memoized functions
  useEffect(() => {
    const updatedBlock: BlockType = {
      ...block,
      content: {
        ...content,
        _updatedAt: new Date().toISOString(),
      }
    };
    onUpdate(updatedBlock);
  }, [content.url, content.title, content.description, content.width, content.height, block, content, onUpdate]);

  const renderIframe = useCallback(() => {
    if (!content.url) return null;

    const optimizedUrl = getOptimizedUrl(content.url);
    const sandboxValue = content.sandbox?.join(' ') || '';
    const deviceStyles = getDeviceStyles();
    
    const iframeProps = {
      src: optimizedUrl,
      title: content.title || 'Embedded Content',
      width: content.responsive ? '100%' : deviceStyles.width,
      height: deviceStyles.height,
      allowFullScreen: content.allowFullscreen,
      loading: content.loading || 'lazy' as const,
      referrerPolicy: (content.referrerPolicy || 'strict-origin-when-cross-origin') as React.HTMLAttributeReferrerPolicy,
      sandbox: sandboxValue || undefined,
      className: `border-0 ${content.showBorder ? 'border border-gray-300' : ''}`,
      style: {
        borderRadius: content.borderRadius ? `${content.borderRadius}px` : undefined,
        aspectRatio: content.aspectRatio || undefined,
      }
    };

    return (
      <div className={`${content.responsive ? 'w-full' : ''} ${devicePreview !== 'desktop' ? 'mx-auto' : ''}`}>
        <iframe {...iframeProps} />
        {content.customCSS && (
          <style dangerouslySetInnerHTML={{ __html: content.customCSS }} />
        )}
      </div>
    );
  }, [content, devicePreview, getOptimizedUrl, getDeviceStyles]);

  if (readOnly || previewMode) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <span className="font-medium">
              {content.title || 'Embedded Content'}
            </span>
          </div>
          {!readOnly && (
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setDevicePreview('desktop')}
                  className={`p-1 rounded ${devicePreview === 'desktop' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Monitor size={16} />
                </button>
                <button
                  onClick={() => setDevicePreview('tablet')}
                  className={`p-1 rounded ${devicePreview === 'tablet' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Tablet size={16} />
                </button>
                <button
                  onClick={() => setDevicePreview('mobile')}
                  className={`p-1 rounded ${devicePreview === 'mobile' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Smartphone size={16} />
                </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewMode(false)}
                className="gap-1"
              >
                <Eye size={16} />
                Edit
              </Button>
            </div>
          )}
        </div>
        
        {content.description && (
          <p className="text-gray-600 mb-4">{content.description}</p>
        )}
        
        <div className="overflow-auto">
          {renderIframe()}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold">Iframe Embed Block</h3>
        </div>
        <div className="flex items-center gap-2">
          {content.url && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode(true)}
              className="gap-1"
            >
              <Eye size={16} />
              Preview
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* URL Input */}
        <div>
          <Label className="text-sm font-medium">Website URL</Label>
          <div className="flex gap-2 mt-1">
            <Input
              placeholder="https://example.com"
              value={content.url || ''}
              onChange={(e) => updateContent({ url: e.target.value })}
              className="flex-1"
            />
            {content.url && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="gap-1"
              >
                <a href={content.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Open
                </a>
              </Button>
            )}
            {isValidating && (
              <div className="flex items-center px-2">
                <Loader2 size={16} className="animate-spin text-gray-400" />
              </div>
            )}
            {validationStatus === 'valid' && (
              <div className="flex items-center px-2">
                <CheckCircle size={16} className="text-green-600" />
              </div>
            )}
            {validationStatus === 'invalid' && (
              <div className="flex items-center px-2">
                <AlertTriangle size={16} className="text-red-600" />
              </div>
            )}
          </div>
          
          {/* Quick embed suggestions */}
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-2">Popular embeddable sites:</p>
            <div className="flex flex-wrap gap-1">
              {COMMON_SITES.map((site) => (
                <span
                  key={site.name}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {site.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Basic Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Title</Label>
            <Input
              placeholder="Embedded Content Title"
              value={content.title || ''}
              onChange={(e) => updateContent({ title: e.target.value })}
            />
          </div>
          
          <div className="flex items-center gap-4 pt-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={content.responsive || false}
                onChange={(e) => updateContent({ responsive: e.target.checked })}
                className="rounded"
              />
              Responsive
            </label>
            
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={content.allowFullscreen || false}
                onChange={(e) => updateContent({ allowFullscreen: e.target.checked })}
                className="rounded"
              />
              Allow Fullscreen
            </label>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Description (Optional)</Label>
          <Textarea
            placeholder="Brief description of the embedded content..."
            value={content.description || ''}
            onChange={(e) => updateContent({ description: e.target.value })}
            rows={3}
          />
        </div>

        {/* Dimensions */}
        {!content.responsive && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Width</Label>
              <Input
                placeholder="100% or 800px"
                value={content.width || ''}
                onChange={(e) => updateContent({ width: e.target.value })}
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">Height</Label>
              <Input
                placeholder="500px"
                value={content.height || ''}
                onChange={(e) => updateContent({ height: e.target.value })}
              />
            </div>
          </div>
        )}

        {content.responsive && (
          <div>
            <Label className="text-sm font-medium">Aspect Ratio</Label>
            <select
              value={content.aspectRatio || ''}
              onChange={(e) => updateContent({ aspectRatio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Auto</option>
              <option value="16/9">16:9 (Widescreen)</option>
              <option value="4/3">4:3 (Standard)</option>
              <option value="1/1">1:1 (Square)</option>
              <option value="21/9">21:9 (Ultrawide)</option>
            </select>
          </div>
        )}

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
                <Label className="text-sm font-medium">Loading Behavior</Label>
                <select
                  value={content.loading || 'lazy'}
                  onChange={(e) => updateContent({ loading: e.target.value as 'lazy' | 'eager' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="lazy">Lazy (Load when visible)</option>
                  <option value="eager">Eager (Load immediately)</option>
                </select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Referrer Policy</Label>
                <select
                  value={content.referrerPolicy || 'strict-origin-when-cross-origin'}
                  onChange={(e) => updateContent({ referrerPolicy: e.target.value as React.HTMLAttributeReferrerPolicy })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="strict-origin-when-cross-origin">Strict Origin (Default)</option>
                  <option value="no-referrer">No Referrer</option>
                  <option value="origin">Origin Only</option>
                  <option value="same-origin">Same Origin</option>
                </select>
              </div>
            </div>

            {/* Sandbox Settings */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Sandbox Permissions</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {SANDBOX_OPTIONS.map((option) => (
                  <label key={option.value} className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={content.sandbox?.includes(option.value) || false}
                      onChange={(e) => {
                        const currentSandbox = content.sandbox || [];
                        if (e.target.checked) {
                          updateContent({ 
                            sandbox: [...currentSandbox, option.value] 
                          });
                        } else {
                          updateContent({ 
                            sandbox: currentSandbox.filter(s => s !== option.value) 
                          });
                        }
                      }}
                      className="rounded mt-0.5"
                    />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Styling Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={content.showBorder || false}
                    onChange={(e) => updateContent({ showBorder: e.target.checked })}
                    className="rounded"
                  />
                  Show Border
                </label>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Border Radius (px)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  max="50"
                  value={content.borderRadius || 0}
                  onChange={(e) => updateContent({ borderRadius: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            {/* Custom CSS */}
            <div>
              <Label className="text-sm font-medium">Custom CSS (Advanced)</Label>
              <Textarea
                placeholder="/* Custom styles for the iframe container */
.iframe-container {
  /* Your CSS here */
}"
                value={content.customCSS || ''}
                onChange={(e) => updateContent({ customCSS: e.target.value })}
                rows={4}
                className="font-mono text-xs"
              />
              <p className="text-xs text-gray-500 mt-1">
                CSS will be applied to the iframe container. Use with caution.
              </p>
            </div>
          </div>
        )}

        {/* Preview */}
        {content.url && validationStatus === 'valid' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Preview</Label>
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setDevicePreview('desktop')}
                  className={`p-1 rounded ${devicePreview === 'desktop' ? 'bg-white shadow-sm' : ''}`}
                  title="Desktop View"
                >
                  <Monitor size={16} />
                </button>
                <button
                  onClick={() => setDevicePreview('tablet')}
                  className={`p-1 rounded ${devicePreview === 'tablet' ? 'bg-white shadow-sm' : ''}`}
                  title="Tablet View"
                >
                  <Tablet size={16} />
                </button>
                <button
                  onClick={() => setDevicePreview('mobile')}
                  className={`p-1 rounded ${devicePreview === 'mobile' ? 'bg-white shadow-sm' : ''}`}
                  title="Mobile View"
                >
                  <Smartphone size={16} />
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-gray-50 overflow-auto">
              {renderIframe()}
            </div>
            
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-4">
              <span>Preview Mode: {devicePreview}</span>
              {devicePreview !== 'desktop' && (
                <span>Dimensions: {getDeviceStyles().width} × {getDeviceStyles().height}</span>
              )}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Tips for Embedding</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• YouTube: Use regular video URLs, they&apos;ll be auto-converted to embed format</li> {/* ✅ Fix: Escaped apostrophe */}
            <li>• Google Forms: Make sure the form allows embedding in its settings</li>
            <li>• Some sites block embedding for security reasons (X-Frame-Options)</li>
            <li>• Test your embed in preview mode before publishing</li>
            <li>• Use sandbox permissions carefully - restrict what the iframe can do</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}