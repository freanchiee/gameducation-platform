// src/app/strandhoot-builder/constants/validation.ts

import type { BlockType } from '../types/strandhoot';

export interface ValidationRule {
  field: string;
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: string | number;
  message: string;
  validator?: (value: unknown) => boolean;
}

export interface ValidationError {
  field: string;
  message: string;
  blockId?: string;
}

export const STRANDHOOT_VALIDATION_RULES: ValidationRule[] = [
  {
    field: 'title',
    type: 'required',
    message: 'Title is required',
  },
  {
    field: 'title',
    type: 'minLength',
    value: 3,
    message: 'Title must be at least 3 characters long',
  },
  {
    field: 'title',
    type: 'maxLength',
    value: 100,
    message: 'Title must be less than 100 characters',
  },
  // ✅ FIXED: Make description validation conditional
  {
    field: 'description',
    type: 'custom',
    message: 'Description must be at least 10 characters long when provided',
    validator: (value: unknown) => {
      // If no description provided, that's OK (optional field)
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return true;
      }
      // If description is provided, it must be at least 10 characters
      return typeof value === 'string' && value.trim().length >= 10;
    }
  },
  {
    field: 'description',
    type: 'maxLength',
    value: 500,
    message: 'Description must be less than 500 characters',
  },
] as const;

export const BLOCK_VALIDATION_RULES = {
  welcome: [
    {
      field: 'title',
      type: 'required' as const,
      message: 'Welcome title is required',
    },
    {
      field: 'subject',
      type: 'required' as const,
      message: 'Subject must be selected',
    },
    {
      field: 'criteria',
      type: 'required' as const,
      message: 'Criteria must be selected',
    },
    {
      field: 'mypYear',
      type: 'required' as const,
      message: 'MYP Year must be selected',
    },
  ],
  strand: [
    {
      field: 'title',
      type: 'required' as const,
      message: 'Strand title is required',
    },
    {
      field: 'title',
      type: 'minLength' as const,
      value: 2,
      message: 'Strand title must be at least 2 characters',
    },
  ],
  tip: [
    {
      field: 'text',
      type: 'required' as const,
      message: 'Tip text is required',
    },
    {
      field: 'text',
      type: 'minLength' as const,
      value: 5,
      message: 'Tip must be at least 5 characters',
    },
  ],
  rich: [
    {
      field: 'content',
      type: 'required' as const,
      message: 'Rich text content is required',
    },
  ],
  evaluation: [],
  embed: [
    {
      field: 'url',
      type: 'required' as const,
      message: 'Embed URL is required',
    },
    {
      field: 'url',
      type: 'pattern' as const,
      value: '^https?://',
      message: 'URL must be a valid web address',
    },
  ],
  mcq: [
    {
      field: 'question',
      type: 'required' as const,
      message: 'MCQ question is required',
    },
    {
      field: 'options',
      type: 'custom' as const,
      message: 'At least 2 options are required',
      validator: (value: unknown) => Array.isArray(value) && value.length >= 2,
    },
    {
      field: 'options',
      type: 'custom' as const,
      message: 'All options must have text',
      validator: (value: unknown) => 
        Array.isArray(value) && 
        value.every((opt: any) => opt.text && opt.text.trim().length > 0),
    },
  ],
  short: [
    {
      field: 'question',
      type: 'required' as const,
      message: 'Short answer question is required',
    },
  ],
  extended: [
    {
      field: 'question',
      type: 'required' as const,
      message: 'Extended response question is required',
    },
  ],
  fill: [
    {
      field: 'question',
      type: 'required' as const,
      message: 'Fill in the blank question is required',
    },
  ],
  iframe: [
    {
      field: 'url',
      type: 'required' as const,
      message: 'Iframe URL is required',
    },
    {
      field: 'url',
      type: 'pattern' as const,
      value: '^https?://',
      message: 'URL must be a valid web address',
    },
  ],
  pdf: [
    {
      field: 'url',
      type: 'required' as const,
      message: 'PDF URL is required',
    },
    {
      field: 'url',
      type: 'pattern' as const,
      value: '^https?://',
      message: 'URL must be a valid PDF address',
    },
  ],
  tab: [
    {
      field: 'title',
      type: 'required' as const,
      message: 'Tab title is required',
    },
    {
      field: 'title',
      type: 'minLength' as const,
      value: 1,
      message: 'Tab title must not be empty',
    },
  ],
} as const;

export const PUBLISHING_VALIDATION_RULES: ValidationRule[] = [
  {
    field: 'hasWelcomeBlock',
    type: 'custom',
    message: 'Strandhoot must have a Welcome block',
    validator: (blocks: unknown) => 
      Array.isArray(blocks) && blocks.some((block: any) => block.type === 'welcome'),
  },
  {
    field: 'hasAtLeastOneStrand',
    type: 'custom',
    message: 'Strandhoot must have at least one Strand block',
    validator: (blocks: unknown) => 
      Array.isArray(blocks) && blocks.some((block: any) => block.type === 'strand'),
  },
  {
    field: 'allBlocksValid',
    type: 'custom',
    message: 'All blocks must be properly configured',
    validator: () => true, // This will be checked separately for each block
  },
] as const;

export const validateField = (
  value: unknown,
  rules: ValidationRule[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors.push({ field: rule.field, message: rule.message });
        }
        break;

      case 'minLength':
        if (typeof value === 'string' && value.length < (rule.value as number)) {
          errors.push({ field: rule.field, message: rule.message });
        }
        break;

      case 'maxLength':
        if (typeof value === 'string' && value.length > (rule.value as number)) {
          errors.push({ field: rule.field, message: rule.message });
        }
        break;

      case 'pattern':
        if (typeof value === 'string' && !new RegExp(rule.value as string).test(value)) {
          errors.push({ field: rule.field, message: rule.message });
        }
        break;

      case 'custom':
        if (rule.validator && !rule.validator(value)) {
          errors.push({ field: rule.field, message: rule.message });
        }
        break;
    }
  }

  return errors;
};

export const validateBlock = (block: BlockType): ValidationError[] => {
  const blockType = block.type;
  const rules = BLOCK_VALIDATION_RULES[blockType] || [];
  const errors: ValidationError[] = [];

  for (const rule of rules) {
    const fieldValue = block.content?.[rule.field];
    const fieldErrors = validateField(fieldValue, [rule]);
    
    errors.push(...fieldErrors.map(error => ({
      ...error,
      blockId: block.id,
    })));
  }

  return errors;
};

export const validateStrandhoot = (
  title: string,
  description: string,
  blocks: BlockType[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validate basic strandhoot fields
  errors.push(...validateField(title, STRANDHOOT_VALIDATION_RULES.filter(r => r.field === 'title')));
  errors.push(...validateField(description, STRANDHOOT_VALIDATION_RULES.filter(r => r.field === 'description')));

  // Validate each block
  for (const block of blocks) {
    errors.push(...validateBlock(block));
  }

  return errors;
};

export const validateForPublishing = (
  title: string,
  description: string,
  blocks: BlockType[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // First run standard validation
  errors.push(...validateStrandhoot(title, description, blocks));

  // Then run publishing-specific validation
  for (const rule of PUBLISHING_VALIDATION_RULES) {
    const ruleErrors = validateField(blocks, [rule]);
    errors.push(...ruleErrors);
  }

  return errors;
};