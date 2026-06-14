// Block utility functions

import type { BlockType, Badge } from '../../types/strandhoot';

/**
 * Determines if a block type requires a question ID
 */
export function isResponseBlock(blockType: string): boolean {
  return ['rich', 'short', 'extended', 'mcq', 'fill'].includes(blockType);
}

/**
 * Generates a unique block ID
 */
export function generateBlockId(prefix: string = 'block'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Creates a new block with proper defaults
 */
export function createBlock(blockData: Partial<BlockType>): BlockType {
  return {
    id: generateBlockId(),
    type: 'rich',
    label: 'New Block',
    icon: '📦',
    content: {},
    ...blockData,
  };
}

/**
 * Safely clones a block with a new ID
 */
export function duplicateBlock(originalBlock: BlockType): BlockType {
  return {
    ...originalBlock,
    id: generateBlockId(originalBlock.type),
    content: JSON.parse(JSON.stringify(originalBlock.content || {})),
  };
}

/**
 * Extracts badges from welcome block
 */
export function extractBadgesFromWelcomeBlock(blocks: BlockType[]): Badge[] {
  const welcomeBlock = blocks.find(b => b.type === 'welcome');
  if (welcomeBlock?.content?.badges && Array.isArray(welcomeBlock.content.badges)) {
    return (welcomeBlock.content.badges as Badge[]).map(badge => ({
      emoji: badge.emoji || '⭐',
      label: badge.label || 'Badge',
      description: badge.description || 'Badge description'
    }));
  }
  return [];
}

/**
 * Gets all strand blocks from a block list
 */
export function getStrandBlocks(blocks: BlockType[]): BlockType[] {
  return blocks.filter(block => block.type === 'strand');
}

/**
 * Gets the total number of questions across all blocks
 */
export function getQuestionCount(blocks: BlockType[]): number {
  return blocks.filter(block => isResponseBlock(block.type)).length;
}

/**
 * Validates block data structure
 */
export function validateBlock(block: any): block is BlockType {
  return (
    typeof block === 'object' &&
    block !== null &&
    typeof block.id === 'string' &&
    typeof block.type === 'string' &&
    (block.content === undefined || typeof block.content === 'object')
  );
}

/**
 * Sanitizes block content to prevent XSS
 */
export function sanitizeBlockContent(content: any): any {
  if (typeof content === 'string') {
    // Basic XSS prevention - in production you'd want a proper sanitizer
    return content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  }
  
  if (Array.isArray(content)) {
    return content.map(sanitizeBlockContent);
  }
  
  if (typeof content === 'object' && content !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(content)) {
      sanitized[key] = sanitizeBlockContent(value);
    }
    return sanitized;
  }
  
  return content;
}

/**
 * Moves a block from one index to another in an array
 */
export function moveBlock<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex) return array;
  if (fromIndex < 0 || fromIndex >= array.length) return array;
  if (toIndex < 0 || toIndex >= array.length) return array;
  
  const newArray = [...array];
  const [movedItem] = newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, movedItem);
  return newArray;
}

/**
 * Gets the next available question number
 */
export function getNextQuestionNumber(blocks: BlockType[]): number {
  let maxNumber = 0;
  
  blocks.forEach(block => {
    if (isResponseBlock(block.type)) {
      const questionId = block.content?.questionId as string;
      if (questionId && questionId.startsWith('Q')) {
        const num = parseInt(questionId.slice(1), 10);
        if (!isNaN(num) && num > maxNumber) {
          maxNumber = num;
        }
      }
    }
  });
  
  return maxNumber + 1;
}

/**
 * Updates question IDs to be sequential
 */
export function normalizeQuestionIds(blocks: BlockType[]): BlockType[] {
  let questionCounter = 1;
  
  return blocks.map(block => {
    if (isResponseBlock(block.type)) {
      return {
        ...block,
        content: {
          ...block.content,
          questionId: `Q${questionCounter++}`
        }
      };
    }
    return block;
  });
}

/**
 * Type guard to check if content has a specific property
 */
export function hasContentProperty<T extends keyof any>(
  content: any, 
  property: T
): content is Record<T, any> {
  return content && typeof content === 'object' && property in content;
}