'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { 
  Eye, 
  Save, 
  Share2, 
  Settings, 
  ArrowLeft, 
  FileText,
  Undo2,
  Redo2,
  Copy,
  Trash2,
  Move,
  Keyboard,
  Grid3X3,
  ZoomIn,
  ZoomOut,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  FolderOpen
} from 'lucide-react';
import { SAVE_STATES, SaveState } from '../../constants/builder';
import type { BlockType } from '../../types/strandhoot';
import PreviewButton from '../PreviewButton'; 

interface StrandhootHeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  saveState: SaveState;
  viewMode: 'manager' | 'builder';
  onPreview: () => void;
  onSave: () => void;
  onPublish: () => void;
  onSettings: () => void;
  onBackToManager: () => void;
  onExport: () => void;
  onOpenDashboard?: () => void;  // ✅ NEW: Dashboard modal trigger
  readOnly?: boolean;
  canPublish?: boolean;
  hasUnsavedChanges?: boolean;
  strandhootId?: string;
  blocksCount?: number;
  
  // ✅ Consolidated ActionButtons props
  selectedBlocks?: BlockType[];
  canUndo?: boolean;
  canRedo?: boolean;
  showGrid?: boolean;
  showToolbox?: boolean;
  zoomLevel?: number;
  onUndo?: () => void;
  onRedo?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onMove?: (direction: 'up' | 'down') => void;
  onToggleGrid?: () => void;
  onToggleToolbox?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
  onShowShortcuts?: () => void;
  lastSavedAt?: Date;
}

export default function StrandhootHeader({
  title,
  onTitleChange,
  saveState,
  viewMode,
  onPreview,
  onSave,
  onPublish,
  onSettings,
  onBackToManager,
  onExport,
  onOpenDashboard,  // ✅ NEW: Dashboard prop
  readOnly = false,
  canPublish = true,
  hasUnsavedChanges = false,
  strandhootId,
  blocksCount = 0,
  
  // ✅ ActionButtons props with defaults
  selectedBlocks = [],
  canUndo = false,
  canRedo = false,
  showGrid = false,
  showToolbox = true,
  zoomLevel = 1,
  onUndo = () => {},
  onRedo = () => {},
  onDuplicate = () => {},
  onDelete = () => {},
  onMove = () => {},
  onToggleGrid = () => {},
  onToggleToolbox = () => {},
  onZoomIn = () => {},
  onZoomOut = () => {},
  onZoomReset = () => {},
  onShowShortcuts = () => {},
  lastSavedAt,
}: StrandhootHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleTitleSubmit = () => {
    onTitleChange(tempTitle);
    setIsEditing(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setTempTitle(title);
      setIsEditing(false);
    }
  };

  const getSaveButtonText = () => {
    switch (saveState) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      case 'error':
        return 'Save Failed';
      default:
        return hasUnsavedChanges ? 'Save*' : 'Save';
    }
  };

  const getSaveButtonVariant = (): "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" => {
    switch (saveState) {
      case 'saving':
        return 'secondary';
      case 'saved':
        return 'outline';
      case 'error':
        return 'destructive';
      default:
        return hasUnsavedChanges ? 'default' : 'outline';
    }
  };

  const getSaveIcon = () => {
    switch (saveState) {
      case 'saving':
        return <Loader2 size={16} className="animate-spin" />;
      case 'saved':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-600" />;
      default:
        return <Save size={16} />;
    }
  };

  const hasSelection = selectedBlocks.length > 0;
  const hasMultipleSelection = selectedBlocks.length > 1;

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-lg">
      {/* ✅ Main Header Row */}
      <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-white to-gray-50">
        {/* Left side - Logo, Back, Title */}
        <div className="flex items-center gap-4">
          {/* ✅ Gameducation Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-gray-800">Gameducation</div>
              <div className="text-xs text-gray-500">Strandhoot Builder</div>
            </div>
          </div>

          {/* Separator */}
          <div className="w-px h-8 bg-gray-300" />

          {/* Back button */}
          {viewMode === 'builder' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToManager}
              className="gap-2 hover:bg-gray-100"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </Button>
          )}

          {/* Title */}
          <div className="flex items-center gap-2">
            {isEditing && !readOnly ? (
              <Input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={handleTitleKeyDown}
                className="w-[320px] font-semibold text-lg bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                autoFocus
              />
            ) : (
              <h1
                className={`font-semibold text-lg cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-md transition-colors ${
                  readOnly ? 'cursor-default' : ''
                }`}
                onClick={() => !readOnly && setIsEditing(true)}
                title={readOnly ? undefined : 'Click to edit title'}
              >
                {title || 'Untitled Strandhoot'}
              </h1>
            )}

            {/* Save status indicator */}
            <div className="flex items-center gap-2 text-xs">
              {hasUnsavedChanges && (
                <span className="flex items-center gap-1 text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  Unsaved
                </span>
              )}
              
              {lastSavedAt && saveState === 'saved' && (
                <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <Clock size={12} />
                  Saved {formatLastSaved(lastSavedAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center gap-2">
          {/* ✅ NEW: Dashboard Button - Only show in builder mode */}
          {viewMode === 'builder' && onOpenDashboard && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenDashboard}
              className="gap-2 hover:bg-gray-50 hover:border-blue-300 transition-colors"
              title="View all your strandhoots"
            >
              <BookOpen size={16} />
              <span className="hidden sm:inline">My Strandhoots</span>
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            className="gap-2 hover:bg-gray-50"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">Preview</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="gap-2 hover:bg-gray-50"
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Export</span>
          </Button>

          {!readOnly && (
            <>
              <Button
                variant={getSaveButtonVariant()}
                size="sm"
                onClick={onSave}
                disabled={saveState === 'saving'}
                className="gap-2 transition-all hover:scale-105"
              >
                {getSaveIcon()}
                <span className="hidden sm:inline">{getSaveButtonText()}</span>
              </Button>

              {canPublish && (
                <Button
                  size="sm"
                  onClick={onPublish}
                  className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all hover:scale-105 shadow-sm"
                >
                  <Share2 size={16} />
                  <span className="hidden sm:inline">Publish</span>
                </Button>
              )}
            </>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onSettings}
            className="gap-2 hover:bg-gray-100"
          >
            <Settings size={16} />
          </Button>
        </div>
      </div>

      {/* ✅ Builder Tools Row - Only show in builder mode */}
      {viewMode === 'builder' && (
        <div className="flex items-center justify-between px-6 py-2 bg-gray-50 border-t">
          {/* Left side - Edit actions */}
          <div className="flex items-center gap-1">
            {!readOnly && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onUndo}
                  disabled={!canUndo}
                  title="Undo (Ctrl+Z)"
                  className="h-8 px-2 hover:bg-white hover:shadow-sm"
                >
                  <Undo2 size={14} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRedo}
                  disabled={!canRedo}
                  title="Redo (Ctrl+Y)"
                  className="h-8 px-2 hover:bg-white hover:shadow-sm"
                >
                  <Redo2 size={14} />
                </Button>

                <div className="w-px h-5 bg-gray-300 mx-2" />

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDuplicate}
                  disabled={!hasSelection}
                  title="Duplicate (Ctrl+D)"
                  className="h-8 px-2 hover:bg-white hover:shadow-sm"
                >
                  <Copy size={14} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  disabled={!hasSelection}
                  title="Delete (Del)"
                  className="h-8 px-2 hover:bg-white hover:shadow-sm hover:text-red-600"
                >
                  <Trash2 size={14} />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMove('up')}
                  disabled={!hasSelection}
                  title="Move Up (Ctrl+↑)"
                  className="h-8 px-2 hover:bg-white hover:shadow-sm"
                >
                  <Move size={14} className="rotate-180" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMove('down')}
                  disabled={!hasSelection}
                  title="Move Down (Ctrl+↓)"
                  className="h-8 px-2 hover:bg-white hover:shadow-sm"
                >
                  <Move size={14} />
                </Button>
              </>
            )}

            {/* Selection indicator */}
            {hasSelection && (
              <div className="ml-3 flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">
                  {selectedBlocks.length} block{selectedBlocks.length !== 1 ? 's' : ''} selected
                </span>
                {hasMultipleSelection && (
                  <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    Multi-select
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Right side - View controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleGrid}
              title="Toggle Grid (Ctrl+G)"
              className={`h-8 px-2 hover:bg-white hover:shadow-sm ${
                showGrid ? 'bg-blue-100 text-blue-700' : ''
              }`}
            >
              <Grid3X3 size={14} />
            </Button>
            {strandhootId && (
          <PreviewButton
            strandhootId={strandhootId}
            disabled={blocksCount === 0}
            fallbackUrl="/strandhoot-builder/preview/simple"
          />
        )}

        {/* Simple Preview Button (fallback) */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={onPreview}
          disabled={blocksCount === 0}
          className="gap-1 text-sm"
        >
          <Eye size={16} />
          Simple Preview
        </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleToolbox}
              title="Toggle Toolbox (Ctrl+T)"
              className={`h-8 px-2 hover:bg-white hover:shadow-sm ${
                showToolbox ? 'bg-blue-100 text-blue-700' : ''
              }`}
            >
              {showToolbox ? <EyeOff size={14} /> : <Eye size={14} />}
            </Button>

            <div className="w-px h-5 bg-gray-300 mx-2" />

            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-white rounded-md border px-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onZoomOut}
                disabled={zoomLevel <= 0.5}
                title="Zoom Out (Ctrl+-)"
                className="h-7 px-2"
              >
                <ZoomOut size={12} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onZoomReset}
                title="Reset Zoom (Ctrl+0)"
                className="h-7 px-2 min-w-[50px] text-xs font-mono hover:bg-gray-50"
              >
                {Math.round(zoomLevel * 100)}%
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onZoomIn}
                disabled={zoomLevel >= 2}
                title="Zoom In (Ctrl+=)"
                className="h-7 px-2"
              >
                <ZoomIn size={12} />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onShowShortcuts}
              title="Keyboard Shortcuts (F1)"
              className="h-8 px-2 hover:bg-white hover:shadow-sm"
            >
              <Keyboard size={14} />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}