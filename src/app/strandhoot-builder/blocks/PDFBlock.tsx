'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { 
  FileText, 
  Upload, 
  ExternalLink, 
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import type { BlockType } from '@/app/strandhoot-builder/types/strandhoot';
import { uploadToSupabase } from '@/app/strandhoot-builder/utils/supbaseUploader';

interface PDFBlockProps {
  block: BlockType;
  onUpdate: (updated: BlockType) => void;
  onDelete: () => void;
  readOnly?: boolean;
}

interface PDFContent {
  url?: string;
  title?: string;
  description?: string;
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
  displayMode?: 'embedded' | 'link' | 'download';
  height?: number;
  allowFullscreen?: boolean;
  showControls?: boolean;
  questionId?: string;
}

export default function PDFBlock({ 
  block, 
  onUpdate, 
  onDelete, 
  readOnly = false 
}: PDFBlockProps) {
  const content = (block.content as PDFContent) || {};
  
  const [isUploading, setIsUploading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | 'unknown'>('unknown');
  const [previewMode, setPreviewMode] = useState(false);

  // Validate PDF URL when it changes
  useEffect(() => {
    if (content.url) {
      validatePDFUrl(content.url);
    }
  }, [content.url]);

  const validatePDFUrl = async (url: string) => {
    if (!url) return;
    
    setIsValidating(true);
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      
      if (response.ok && contentType?.includes('application/pdf')) {
        setValidationStatus('valid');
      } else {
        setValidationStatus('invalid');
        toast.error('URL does not point to a valid PDF file');
      }
    } catch (error) {
      setValidationStatus('invalid');
      toast.error('Failed to validate PDF URL');
    } finally {
      setIsValidating(false);
    }
  };

  const updateContent = (updates: Partial<PDFContent>) => {
    const updatedBlock: BlockType = {
      ...block,
      content: {
        ...content,
        ...updates,
        _updatedAt: new Date().toISOString(),
      }
    };
    onUpdate(updatedBlock);
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    
    try {
      const result = await uploadToSupabase(file);
      
      if (result.success && result.url) {
        updateContent({
          url: result.url,
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          uploadedAt: new Date().toISOString(),
          title: content.title || file.name.replace('.pdf', ''),
        });
        
        toast.success('PDF uploaded successfully!');
        setValidationStatus('valid');
      } else {
        toast.error('Failed to upload PDF');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading PDF');
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getEmbedUrl = (url: string): string => {
    // Convert various PDF URL formats to embeddable format
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
    }
    return url;
  };
  useEffect(() => {
    if (onUpdate) {
      const updatedBlock: BlockType = {
        ...block,
        content: {
          ...content,
          _updatedAt: new Date().toISOString(),
        }
      };
      onUpdate(updatedBlock);
    }
  }, [content.url, content.title, content.description, content.displayMode]);
  
  const renderPDFPreview = () => {
    if (!content.url) return null;

    const embedUrl = getEmbedUrl(content.url);
    const height = content.height || 600;

    switch (content.displayMode) {
      case 'embedded':
        return (
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            <iframe
              src={embedUrl}
              width="100%"
              height={height}
              title={content.title || 'PDF Document'}
              className="border-0"
              allow="autoplay"
              allowFullScreen={content.allowFullscreen}
            />
          </div>
        );

      case 'link':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {content.title || 'PDF Document'}
            </h3>
            {content.description && (
              <p className="text-gray-600 mb-4">{content.description}</p>
            )}
            <Button asChild>
              <a 
                href={content.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLink size={16} />
                Open PDF
              </a>
            </Button>
          </div>
        );

      case 'download':
        return (
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-blue-50">
            <Download className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {content.title || 'PDF Document'}
            </h3>
            {content.description && (
              <p className="text-gray-600 mb-4">{content.description}</p>
            )}
            <div className="flex flex-col items-center gap-2">
              {content.fileName && (
                <span className="text-sm text-gray-500">{content.fileName}</span>
              )}
              {content.fileSize && (
                <span className="text-sm text-gray-500">Size: {content.fileSize}</span>
              )}
              <Button asChild className="mt-2">
                <a 
                  href={content.url} 
                  download={content.fileName}
                  className="inline-flex items-center gap-2"
                >
                  <Download size={16} />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            <iframe
              src={embedUrl}
              width="100%"
              height={height}
              title={content.title || 'PDF Document'}
              className="border-0"
            />
          </div>
        );
    }
  };

  if (readOnly || previewMode) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-medium">
              {content.title || 'PDF Document'}
            </span>
          </div>
          {!readOnly && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreviewMode(false)}
              className="gap-1"
            >
              <Eye size={16} />
              Edit
            </Button>
          )}
        </div>
        
        {content.description && (
          <p className="text-gray-600 mb-4">{content.description}</p>
        )}
        
        {renderPDFPreview()}
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold">PDF Document Block</h3>
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
        {/* Upload Section */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Upload PDF File</Label>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <FileText className="mx-auto h-8 w-8 text-gray-400 mb-3" />
              <div className="flex flex-col items-center gap-2">
                <Label 
                  htmlFor="pdf-upload" 
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {isUploading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Choose PDF File
                    </>
                  )}
                </Label>
                <input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                  disabled={isUploading}
                />
                <span className="text-sm text-gray-500">
                  Or drag and drop a PDF file here
                </span>
                <span className="text-xs text-gray-400">
                  Maximum file size: 10MB
                </span>
              </div>
            </div>
          </div>

          {/* URL Input Alternative */}
          <div className="relative">
            <Label className="text-sm font-medium">Or enter PDF URL</Label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="https://example.com/document.pdf"
                value={content.url || ''}
                onChange={(e) => updateContent({ url: e.target.value })}
                className="flex-1"
              />
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
          </div>
        </div>

        {/* Configuration */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Title</Label>
              <Input
                placeholder="PDF Document Title"
                value={content.title || ''}
                onChange={(e) => updateContent({ title: e.target.value })}
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium">Display Mode</Label>
              <select
                value={content.displayMode || 'embedded'}
                onChange={(e) => updateContent({ 
                  displayMode: e.target.value as 'embedded' | 'link' | 'download' 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="embedded">Embedded Viewer</option>
                <option value="link">Open Link</option>
                <option value="download">Download Button</option>
              </select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Description (Optional)</Label>
            <Textarea
              placeholder="Brief description of the PDF content..."
              value={content.description || ''}
              onChange={(e) => updateContent({ description: e.target.value })}
              rows={3}
            />
          </div>

          {content.displayMode === 'embedded' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Height (pixels)</Label>
                <Input
                  type="number"
                  placeholder="600"
                  min="300"
                  max="1200"
                  value={content.height || 600}
                  onChange={(e) => updateContent({ height: parseInt(e.target.value) || 600 })}
                />
              </div>
              
              <div className="flex items-center gap-4 pt-6">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={content.allowFullscreen || false}
                    onChange={(e) => updateContent({ allowFullscreen: e.target.checked })}
                    className="rounded"
                  />
                  Allow Fullscreen
                </label>
                
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={content.showControls !== false}
                    onChange={(e) => updateContent({ showControls: e.target.checked })}
                    className="rounded"
                  />
                  Show Controls
                </label>
              </div>
            </div>
          )}
        </div>

        {/* File Info */}
        {(content.fileName || content.fileSize || content.uploadedAt) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">File Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
              {content.fileName && (
                <div>
                  <span className="font-medium">File:</span> {content.fileName}
                </div>
              )}
              {content.fileSize && (
                <div>
                  <span className="font-medium">Size:</span> {content.fileSize}
                </div>
              )}
              {content.uploadedAt && (
                <div>
                  <span className="font-medium">Uploaded:</span>{' '}
                  {new Date(content.uploadedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview */}
        {content.url && validationStatus === 'valid' && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Preview</Label>
            {renderPDFPreview()}
          </div>
        )}
      </div>
    </Card>
  );
}