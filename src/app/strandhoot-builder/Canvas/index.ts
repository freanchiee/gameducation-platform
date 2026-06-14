// Main exports for the Canvas module

// Components
export { default as CanvasPreview } from './CanvasPreview';
export { default as BlockRenderer } from './components/BlockRenderer';
export { default as DropZone } from './components/DropZone';
export { default as BlockWrapper } from './components/BlockWrapper';
export { default as EmptyState } from './controls/EmptyState';
export { default as DragIndicator } from './controls/DragIndicator';
export { default as SkeletonGenerator, useSkeletonGenerator } from './controls/SkeletonGenerator';

// Hooks
export { useBlockOperations } from './hooks/useBlockOperations';
export { useCanvasDrop } from './hooks/useCanvasDrop';
export { useSkeletonGeneration } from './hooks/useSkeletonGeneration';

// Utilities
export { 
  getDropZoneStyles, 
  getBlockIcon, 
  colorSchemes,
  blockTypeIcons 
} from './utils/canvasStyles';

export {
  isResponseBlock,
  generateBlockId,
  createBlock,
  duplicateBlock,
  extractBadgesFromWelcomeBlock,
  getStrandBlocks,
  getQuestionCount,
  validateBlock,
  sanitizeBlockContent,
  moveBlock,
  getNextQuestionNumber,
  normalizeQuestionIds,
  hasContentProperty
} from './utils/blockHelpers';