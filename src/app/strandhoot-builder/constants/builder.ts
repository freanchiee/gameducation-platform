// src/app/strandhoot-builder/constants/builder.ts

import type { BlockType } from '../types/strandhoot';

export interface BuilderSettings {
  title: string;
  description: string;
  autoSave: boolean;
  autoSaveInterval: number;
  showGrid: boolean;
  snapToGrid: boolean;
  showToolbox: boolean;
  theme: 'light' | 'dark' | 'auto';
}

// ✅ Add ValidationError type definition
export interface ValidationError {
  id: string;
  type: 'error' | 'warning';
  message: string;
  field?: string;
  blockId?: string;
}

export const DEFAULT_STRANDHOOT = {
  title: 'Untitled Strandhoot' as string,  // ✅ Added type annotation to fix inference
  description: '' as string,               // ✅ Added type annotation to fix inference
  subject: '',
  criteria: '',
  mypYear: '',
} as const;

export const BLOCK_ICONS = {
  welcome: '👋',
  strand: '📚',
  tip: '💡',
  rich: '📝',
  evaluation: '📈',
  embed: '🎥',
  mcq: '❓',
  short: '✍️',
  extended: '📖',
  fill: '📝',
  iframe: '🖼️',
  pdf: '📄',
} as const;

export const BLOCK_LABELS = {
  welcome: 'Welcome Block',
  strand: 'Strand Page Block',
  tip: 'Tip Block',
  rich: 'Rich Text Block',
  evaluation: 'Evaluation Block',
  embed: 'Embed Media Block',
  mcq: 'MCQ Block',
  short: 'Short Answer Block',
  extended: 'Extended Response Block',
  fill: 'Fill in the Blank Block',
  iframe: 'Iframe Block',
  pdf: 'PDF Block',
} as const;

export const CRITERIA_ICONS: Record<string, string> = {
  A: '🧠',
  B: '🔬',
  C: '📊',
  D: '🌍',
} as const;

export const VIEW_MODES = {
  MANAGER: 'manager',
  BUILDER: 'builder',
} as const;

export const SAVE_STATES = {
  IDLE: 'idle',
  SAVING: 'saving',
  SAVED: 'saved',
  ERROR: 'error',
} as const;

export type SaveState = typeof SAVE_STATES[keyof typeof SAVE_STATES];

export const VALIDATION_RULES = {
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_BLOCKS: 50,
} as const;

export const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export const DRAG_TYPES = {
  BLOCK: 'BLOCK',
  COMPONENT: 'COMPONENT',
} as const;

export const TOAST_MESSAGES = {
  SAVE_SUCCESS: '✅ Strandhoot saved successfully!',
  SAVE_ERROR: '❌ Failed to save Strandhoot',
  PUBLISH_SUCCESS: '🚀 Strandhoot published successfully!',
  PUBLISH_ERROR: '❌ Failed to publish Strandhoot',
  DELETE_SUCCESS: '🗑️ Block deleted successfully',        // ✅ Added missing constant
  DUPLICATE_SUCCESS: '📋 Block duplicated successfully',
  VALIDATION_ERROR: '⚠️ Please fix validation errors before saving',
  STRUCTURE_CONFIRMED: '✅ Strands loaded from subject & criteria',
  SKELETON_GENERATED: '✅ Skeleton generated successfully',
} as const;

export function validateStrandhoot(
    title: string,
    description: string,
    blocks: BlockType[]
  ): ValidationError[] {
    const errors: ValidationError[] = [];
  
    // Title validation
    if (!title.trim()) {
      errors.push({
        id: 'title-empty',
        type: 'error',
        message: 'Title is required',
        field: 'title',
      });
    }
  
    // Description validation
    if (!description.trim()) {
      errors.push({
        id: 'description-empty',
        type: 'warning',
        message: 'Description is recommended',
        field: 'description',
      });
    }
  
    // Blocks validation
    if (blocks.length === 0) {
      errors.push({
        id: 'no-blocks',
        type: 'error',
        message: 'At least one block is required',
      });
    }
  
    // Validate individual blocks
    blocks.forEach((block, index) => {
      if (!block.id) {
        errors.push({
          id: `block-${index}-no-id`,
          type: 'error',
          message: `Block ${index + 1} is missing an ID`,
          blockId: block.id,
        });
      }
  
      if (!block.type) {
        errors.push({
          id: `block-${index}-no-type`,
          type: 'error',
          message: `Block ${index + 1} is missing a type`,
          blockId: block.id,
        });
      }
  
      // Type-specific validations
      switch (block.type) {
        case 'welcome':
          if (!block.content?.title) {
            errors.push({
              id: `block-${index}-welcome-no-title`,
              type: 'warning',
              message: 'Welcome block should have a title',
              blockId: block.id,
              field: 'title',
            });
          }
          break;
  
        case 'mcq':
          if (!block.content?.question) {
            errors.push({
              id: `block-${index}-mcq-no-question`,
              type: 'error',
              message: 'MCQ block requires a question',
              blockId: block.id,
              field: 'question',
            });
          }
          if (!Array.isArray(block.content?.options) || block.content.options.length < 2) {
            errors.push({
              id: `block-${index}-mcq-insufficient-options`,
              type: 'error',
              message: 'MCQ block needs at least 2 options',
              blockId: block.id,
              field: 'options',
            });
          }
          break;
  
        case 'rich':
        case 'short':
        case 'extended':
          if (!block.content?.question && !block.content?.content) {
            errors.push({
              id: `block-${index}-${block.type}-no-content`,
              type: 'warning',
              message: `${block.type} block should have content or a question`,
              blockId: block.id,
              field: 'content',
            });
          }
          break;
      }
    });
  
    return errors;
  }
  
  export function validateForPublishing(
    title: string,
    description: string,
    blocks: BlockType[]
  ): ValidationError[] {
    const errors = validateStrandhoot(title, description, blocks);
  
    // Additional publishing requirements
    if (!description.trim()) {
      errors.push({
        id: 'publish-description-required',
        type: 'error',
        message: 'Description is required for publishing',
        field: 'description',
      });
    }
  
    // Check for at least one content block
    const contentBlocks = blocks.filter(b => 
      ['rich', 'mcq', 'short', 'extended', 'strand'].includes(b.type)
    );
    
    if (contentBlocks.length === 0) {
      errors.push({
        id: 'publish-no-content-blocks',
        type: 'error',
        message: 'At least one content block is required for publishing',
      });
    }
  
    return errors;
  }

export const DEFAULT_BLOCK_CONTENT = {
  welcome: {
    title: '',
    subtitle: '',
    color: 'orange',
    badges: [],
    experiments: [],
  },
  strand: {
    title: 'New Strand',
    tabs: [
      { title: 'Resources', content: '' },
      { title: 'Your Work', content: '' },
    ],
    droppedBlocks: [],
  },
  tip: {
    text: 'Add a helpful hint for the student here.',
  },
  rich: {
    content: '',
  },
  evaluation: {
    level: 0,
    keywords: [],
    concepts: [],
  },
  embed: {
    url: '',
    type: 'youtube',
  },
  mcq: {
    question: '',
    options: [
      { text: 'Option A' },
      { text: 'Option B' },
    ],
    correctIndex: 0,
  },
  short: {
    question: '',
    placeholder: 'Student short answer...',
  },
  extended: {
    question: '',
    placeholder: 'Student extended response...',
  },
  fill: {
    question: '',
    placeholder: 'Student response...',
  },
  iframe: {
    url: '',
    title: 'Embedded Content',
    width: '100%',
    height: '400px',
  },
  pdf: {
    url: '',
    title: 'PDF Document',
  },
} as const;