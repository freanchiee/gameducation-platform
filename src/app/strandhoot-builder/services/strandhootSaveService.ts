// src/app/strandhoot-builder/services/strandhootSaveService.ts
'use client';

import { supabase } from '@/utils/supabase';
import type { BlockType } from '../types/strandhoot';

export interface ValidationResult {
  isValid: boolean;
  score: number;
  errors: string[];
  warnings: string[];
}

export interface StrandhootData {
  id: string;
  title: string;
  description?: string;
  criteria?: string;
  subject?: string;
  myp_year?: number;
  context?: string;
  simulation_link?: string;
  research_material_link?: string;
  strands: BlockType[];
  created_by: string;
  creator_name?: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  tags?: string[];
  version?: number;
  thumbnail_url?: string;
}

export interface SaveResult {
  success: boolean;
  id?: string;
  error?: string;
  details?: any;
}

export interface LoadResult {
  success: boolean;
  data?: StrandhootData;
  error?: string;
}

// A stored strandhoot template row. Alias of StrandhootData, which mirrors
// the strandhoot_templates table schema.
export type StrandhootTemplate = StrandhootData;

export interface ListResult {
  success: boolean;
  data?: StrandhootTemplate[];
  error?: string;
}

interface SaveDraftParams {
  title: string;
  blocks: BlockType[];
  metadata: {
    description: string;
    subject: string;
    criteria: string;
    mypYear: string;
    context?: string;
    simulationLink?: string;
    tags?: string[];
  };
  creatorId: string;
  creatorName: string;
}

class StrandhootSaveService {
  private readonly SAVE_TIMEOUT = 15000; // Reduced to 15 seconds
  private readonly MAX_RETRIES = 2; // Reduced retries

  // ✅ Enhanced validation with detailed feedback
  validateStrandhoot(blocks: BlockType[]): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let score = 0;

    console.log('🔍 Validating strandhoot with blocks:', blocks.length);

    // Basic validation
    if (!blocks || blocks.length === 0) {
      errors.push('Strandhoot must contain at least one block');
      return { isValid: false, score: 0, errors, warnings };
    }

    // Check for welcome block
    const welcomeBlocks = blocks.filter(b => b.type === 'welcome');
    if (welcomeBlocks.length === 0) {
      errors.push('Strandhoot must have a Welcome block');
    } else if (welcomeBlocks.length > 1) {
      warnings.push('Multiple Welcome blocks found - only one is recommended');
    } else {
      score += 20;
    }

    // Check for strand blocks
    const strandBlocks = blocks.filter(b => b.type === 'strand');
    if (strandBlocks.length === 0) {
      warnings.push('No Strand blocks found - consider adding learning content');
    } else {
      score += Math.min(30, strandBlocks.length * 10);
    }

    // Check for question blocks
    const questionBlocks = blocks.filter(b => ['mcq', 'short', 'extended', 'fill'].includes(b.type));
    if (questionBlocks.length === 0) {
      warnings.push('No question blocks found - consider adding assessments');
    } else {
      score += Math.min(30, questionBlocks.length * 5);
    }

    // Validate block structure
    blocks.forEach((block, index) => {
      if (!block.id || typeof block.id !== 'string') {
        errors.push(`Block ${index + 1} missing valid ID`);
      }
      if (!block.type || typeof block.type !== 'string') {
        errors.push(`Block ${index + 1} missing valid type`);
      }
      if (!block.content || typeof block.content !== 'object') {
        warnings.push(`Block ${index + 1} has empty content`);
      }
    });

    const isValid = errors.length === 0;
    console.log('✅ Validation complete:', { isValid, score, errors: errors.length, warnings: warnings.length });

    return {
      isValid,
      score: Math.min(100, score),
      errors,
      warnings,
    };
  }

  // ✅ Enhanced save with your actual table schema
  async saveDraft(params: SaveDraftParams, existingId?: string): Promise<SaveResult> {
    const { title, blocks, metadata, creatorId, creatorName } = params;
    
    console.log('🔄 Starting save process...', {
      title,
      blocksCount: blocks.length,
      existingId,
      creatorId,
      metadata: {
        subject: metadata.subject,
        criteria: metadata.criteria,
        mypYear: metadata.mypYear,
      }
    });

    // Validate input
    if (!title?.trim()) {
      const error = 'Title is required';
      console.error('❌ Validation failed:', error);
      return { success: false, error };
    }

    if (!blocks || blocks.length === 0) {
      const error = 'At least one block is required';
      console.error('❌ Validation failed:', error);
      return { success: false, error };
    }

    if (!creatorId?.trim()) {
      const error = 'Creator ID is required';
      console.error('❌ Validation failed:', error);
      return { success: false, error };
    }

    // Check authentication before proceeding
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      const error = 'Authentication required to save strandhoots';
      console.error('❌ Auth check failed:', authError?.message || 'No user');
      return { success: false, error };
    }

    // Prepare data for your actual table structure
    const now = new Date().toISOString();
    const dbData = {
      title: title.trim(),
      description: metadata.description || null,
      criteria: metadata.criteria || null,
      subject: metadata.subject || null,
      myp_year: metadata.mypYear ? parseInt(metadata.mypYear) : null,
      context: metadata.context || null,
      simulation_link: metadata.simulationLink || null,
      research_material_link: null, // Add if you have this
      strands: blocks,
      created_by: user.id, // Use authenticated user's UUID
      creator_name: creatorName || user.email || 'Unknown',
      is_public: false,
      tags: metadata.tags || null,
      version: 1,
      thumbnail_url: null,
      updated_at: now,
    };

    console.log('📦 Prepared data for save:', {
      title: dbData.title,
      subject: dbData.subject,
      criteria: dbData.criteria,
      strandsCount: dbData.strands.length,
      created_by: dbData.created_by,
    });

    // Attempt save with timeout
    try {
      if (existingId) {
        console.log('🔄 Updating existing strandhoot:', existingId);
        return await this.updateStrandhoot(existingId, dbData);
      } else {
        console.log('➕ Creating new strandhoot');
        return await this.createStrandhoot({ ...dbData, created_at: now });
      }
    } catch (error: any) {
      console.error('❌ Save operation failed:', error);
      return {
        success: false,
        error: `Save failed: ${error.message}`,
        details: error
      };
    }
  }

  // ✅ Create new strandhoot with enhanced error handling
  private async createStrandhoot(data: any): Promise<SaveResult> {
    try {
      console.log('💾 Inserting into strandhoot_templates...');
      
      // Use a shorter timeout for the actual database operation
      const insertPromise = supabase
        .from('strandhoot_templates')
        .insert([data])
        .select('id')
        .single();

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Database operation timed out')), 10000)
      );

      const result = await Promise.race([insertPromise, timeoutPromise]);

      if (result.error) {
        console.error('❌ Database insert failed:', result.error);
        
        // Provide specific error messages
        if (result.error.message.includes('row-level security')) {
          return {
            success: false,
            error: 'Permission denied. Make sure you are logged in as a teacher.',
            details: result.error
          };
        }
        
        if (result.error.message.includes('violates not-null constraint')) {
          return {
            success: false,
            error: 'Missing required fields. Please check all required information is filled.',
            details: result.error
          };
        }

        return {
          success: false,
          error: `Database error: ${result.error.message}`,
          details: result.error
        };
      }

      if (!result.data?.id) {
        console.error('❌ No ID returned from insert');
        return {
          success: false,
          error: 'No ID returned from database'
        };
      }

      console.log('✅ Strandhoot created successfully:', result.data.id);
      return {
        success: true,
        id: result.data.id
      };

    } catch (error: any) {
      console.error('❌ Unexpected error during create:', error);
      
      if (error.message.includes('timed out')) {
        return {
          success: false,
          error: 'Database connection timed out. Please try again.',
        };
      }
      
      return {
        success: false,
        error: `Unexpected error: ${error.message || 'Unknown error'}`,
        details: error
      };
    }
  }

  // ✅ Update existing strandhoot
  private async updateStrandhoot(id: string, data: any): Promise<SaveResult> {
    try {
      console.log('💾 Updating strandhoot_templates...', id);

      const updatePromise = supabase
        .from('strandhoot_templates')
        .update(data)
        .eq('id', id)
        .select('id')
        .single();

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Database operation timed out')), 10000)
      );

      const result = await Promise.race([updatePromise, timeoutPromise]);

      if (result.error) {
        console.error('❌ Database update failed:', result.error);
        return {
          success: false,
          error: `Failed to update strandhoot: ${result.error.message}`,
          details: result.error
        };
      }

      console.log('✅ Strandhoot updated successfully:', id);
      return {
        success: true,
        id: id
      };

    } catch (error: any) {
      console.error('❌ Unexpected error during update:', error);
      
      if (error.message.includes('timed out')) {
        return {
          success: false,
          error: 'Database connection timed out. Please try again.',
        };
      }
      
      return {
        success: false,
        error: `Unexpected error: ${error.message || 'Unknown error'}`,
        details: error
      };
    }
  }

  // ✅ Load strandhoot with better error handling
  async loadStrandhoot(id: string): Promise<LoadResult> {
    try {
      console.log('📖 Loading strandhoot:', id);

      if (!id || typeof id !== 'string') {
        return {
          success: false,
          error: 'Invalid strandhoot ID'
        };
      }

      const { data, error } = await supabase
        .from('strandhoot_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('❌ Failed to load strandhoot:', error);
        return {
          success: false,
          error: `Failed to load strandhoot: ${error.message}`
        };
      }

      if (!data) {
        return {
          success: false,
          error: 'Strandhoot not found'
        };
      }

      console.log('✅ Strandhoot loaded successfully');
      return {
        success: true,
        data: data as StrandhootData
      };

    } catch (error: any) {
      console.error('❌ Unexpected error loading strandhoot:', error);
      return {
        success: false,
        error: `Unexpected error: ${error.message || 'Unknown error'}`
      };
    }
  }

  // ✅ List strandhoots for a creator (optionally public only)
  async listStrandhoots(creatorId: string, publicOnly = false): Promise<ListResult> {
    try {
      console.log('📋 Listing strandhoots:', { creatorId, publicOnly });

      let query = supabase
        .from('strandhoot_templates')
        .select('*')
        .order('updated_at', { ascending: false });

      if (publicOnly) {
        query = query.eq('is_public', true);
      } else if (creatorId) {
        query = query.eq('created_by', creatorId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Failed to list strandhoots:', error);
        return {
          success: false,
          error: `Failed to list strandhoots: ${error.message}`
        };
      }

      console.log('✅ Strandhoots listed successfully:', data?.length ?? 0);
      return {
        success: true,
        data: (data ?? []) as StrandhootTemplate[]
      };

    } catch (error: any) {
      console.error('❌ Unexpected error listing strandhoots:', error);
      return {
        success: false,
        error: `Unexpected error: ${error.message || 'Unknown error'}`
      };
    }
  }

  // ✅ Duplicate an existing strandhoot under a new title
  async duplicateStrandhoot(
    sourceId: string,
    newTitle: string,
    creatorId: string
  ): Promise<SaveResult> {
    try {
      console.log('📑 Duplicating strandhoot:', { sourceId, newTitle, creatorId });

      const loadResult = await this.loadStrandhoot(sourceId);
      if (!loadResult.success || !loadResult.data) {
        return {
          success: false,
          error: loadResult.error || 'Failed to load source strandhoot'
        };
      }

      const source = loadResult.data;
      return await this.saveDraft({
        title: newTitle,
        blocks: source.strands,
        metadata: {
          description: source.description || '',
          subject: source.subject || '',
          criteria: source.criteria || '',
          mypYear: source.myp_year != null ? String(source.myp_year) : '',
          context: source.context,
          simulationLink: source.simulation_link,
          tags: source.tags,
        },
        creatorId,
        creatorName: source.creator_name || '',
      });

    } catch (error: any) {
      console.error('❌ Unexpected error duplicating strandhoot:', error);
      return {
        success: false,
        error: `Unexpected error: ${error.message || 'Unknown error'}`
      };
    }
  }

  // ✅ Publish strandhoot
  async publishStrandhoot(id: string): Promise<SaveResult> {
    try {
      console.log('📢 Publishing strandhoot:', id);

      const { data, error } = await supabase
        .from('strandhoot_templates')
        .update({ 
          is_public: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select('id')
        .single();

      if (error) {
        console.error('❌ Failed to publish strandhoot:', error);
        return {
          success: false,
          error: `Failed to publish: ${error.message}`
        };
      }

      console.log('✅ Strandhoot published successfully');
      return {
        success: true,
        id: id
      };

    } catch (error: any) {
      console.error('❌ Unexpected error publishing strandhoot:', error);
      return {
        success: false,
        error: `Unexpected error: ${error.message || 'Unknown error'}`
      };
    }
  }

  // ✅ Test database connection
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔍 Testing database connection...');
      
      const connectionTest = supabase
        .from('strandhoot_templates')
        .select('count')
        .limit(1);

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout after 10 seconds')), 10000)
      );

      const result = await Promise.race([connectionTest, timeoutPromise]);

      if (result && 'error' in result && result.error) {
        console.error('❌ Connection test failed:', result.error);
        return {
          success: false,
          error: result.error.message
        };
      }

      console.log('✅ Database connection successful');
      return { success: true };

    } catch (error: any) {
      console.error('❌ Connection test error:', error);
      return {
        success: false,
        error: error.message || 'Unknown connection error'
      };
    }
  }
}

// Export singleton instance
export const strandhootSaveService = new StrandhootSaveService();