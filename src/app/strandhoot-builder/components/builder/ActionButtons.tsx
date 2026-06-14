'use client';

import { Button } from '@/app/components/ui/button';
import { 
  Undo2, 
  Redo2, 
  Copy, 
  Trash2, 
  Move, 
  Keyboard,
  Grid3X3,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
} from 'lucide-react';
import type { BlockType } from '../../types/strandhoot';

interface ActionButtonsProps {
  selectedBlocks: BlockType[];
  canUndo: boolean;
  canRedo: boolean;
  showGrid: boolean;
  showToolbox: boolean;
  zoomLevel: number;
  onUndo: () => void;
  onRedo: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
  onToggleGrid: () => void;
  onToggleToolbox: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  onShowShortcuts: () => void;
  readOnly?: boolean;
}

export default function ActionButtons({
  selectedBlocks,
  canUndo,
  canRedo,
  showGrid,
  showToolbox,
  zoomLevel,
  onUndo,
  onRedo,
  onDuplicate,
  onDelete,
  onMove,
  onToggleGrid,
  onToggleToolbox,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  onShowShortcuts,
  readOnly = false,
}: ActionButtonsProps) {
  const hasSelection = selectedBlocks.length > 0;
  const hasMultipleSelection = selectedBlocks.length > 1;

  return (
    <div className="sticky top-20 z-40 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-6 py-2">
        {/* Left side - Edit actions */}
        <div className="flex items-center gap-2">
          {!readOnly && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={onUndo}
                disabled={!canUndo}
                title="Undo (Ctrl+Z)"
              >
                <Undo2 size={16} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onRedo}
                disabled={!canRedo}
                title="Redo (Ctrl+Y)"
              >
                <Redo2 size={16} />
              </Button>

              <div className="w-px h-6 bg-gray-300 mx-2" />

              <Button
                variant="ghost"
                size="sm"
                onClick={onDuplicate}
                disabled={!hasSelection}
                title="Duplicate (Ctrl+D)"
              >
                <Copy size={16} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                disabled={!hasSelection}
                title="Delete (Del)"
              >
                <Trash2 size={16} />
              </Button>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMove('up')}
                  disabled={!hasSelection}
                  title="Move Up (Ctrl+↑)"
                >
                  <Move size={16} className="rotate-180" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMove('down')}
                  disabled={!hasSelection}
                  title="Move Down (Ctrl+↓)"
                >
                  <Move size={16} />
                </Button>
              </div>
            </>
          )}

          {hasSelection && (
            <div className="ml-2 text-sm text-gray-600">
              {selectedBlocks.length} block{selectedBlocks.length !== 1 ? 's' : ''} selected
              {hasMultipleSelection && (
                <span className="ml-2 text-xs text-blue-600">
                  Multi-select actions available
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right side - View controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleGrid}
            title="Toggle Grid"
            className={showGrid ? 'bg-blue-100' : ''}
          >
            <Grid3X3 size={16} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleToolbox}
            title="Toggle Toolbox (Ctrl+T)"
            className={showToolbox ? 'bg-blue-100' : ''}
          >
            {showToolbox ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>

          <div className="w-px h-6 bg-gray-300 mx-2" />

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onZoomOut}
              disabled={zoomLevel <= 0.5}
              title="Zoom Out (Ctrl+-)"
            >
              <ZoomOut size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onZoomReset}
              title="Reset Zoom (Ctrl+0)"
              className="min-w-[60px] text-xs"
            >
              {Math.round(zoomLevel * 100)}%
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onZoomIn}
              disabled={zoomLevel >= 2}
              title="Zoom In (Ctrl+=)"
            >
              <ZoomIn size={16} />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShowShortcuts}
            title="Keyboard Shortcuts (F1)"
          >
            <Keyboard size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}