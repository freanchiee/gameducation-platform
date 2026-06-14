// src/app/strandhoot-builder/utils/strandhootSerialization.ts
import type { BlockType } from '../types/strandhoot';

export interface StrandhootData {
  id: string;
  title: string;
  description?: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    email?: string;
  };
  metadata: {
    subject?: string;
    criteria?: string;
    mypYear?: string;
    estimatedTime?: number;
    tags?: string[];
  };
  blocks: BlockType[];
  settings: {
    theme?: string;
    allowAnonymous?: boolean;
    showProgress?: boolean;
    enableHints?: boolean;
  };
}

export interface ExportOptions {
  includeMediaAsBase64?: boolean;
  minify?: boolean;
  format?: 'json' | 'strandhoot';
}

export class StrandhootSerializer {
  private static readonly CURRENT_VERSION = '1.0.0';

  /**
   * Export a Strandhoot to JSON format
   */
  static export(
    blocks: BlockType[],
    title: string,
    metadata: Partial<StrandhootData['metadata']> = {},
    options: ExportOptions = {}
  ): string {
    const strandhoootData: StrandhootData = {
      id: crypto.randomUUID(),
      title,
      version: this.CURRENT_VERSION,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        name: 'Teacher', // This should come from auth context
      },
      metadata: {
        subject: metadata.subject,
        criteria: metadata.criteria,
        mypYear: metadata.mypYear,
        estimatedTime: metadata.estimatedTime || 40,
        tags: metadata.tags || [],
      },
      blocks: this.sanitizeBlocks(blocks, options),
      settings: {
        theme: 'default',
        allowAnonymous: true,
        showProgress: true,
        enableHints: true,
      },
    };

    const jsonString = options.minify 
      ? JSON.stringify(strandhoootData)
      : JSON.stringify(strandhoootData, null, 2);

    return jsonString;
  }

  /**
   * Import a Strandhoot from JSON
   */
  static import(jsonString: string): {
    success: boolean;
    data?: StrandhootData;
    error?: string;
  } {
    try {
      const data = JSON.parse(jsonString) as StrandhootData;
      
      // Validate structure
      const validationResult = this.validateStrandhootData(data);
      if (!validationResult.valid) {
        return {
          success: false,
          error: validationResult.error,
        };
      }

      // Migrate if necessary
      const migratedData = this.migrateVersion(data);

      return {
        success: true,
        data: migratedData,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: `Invalid JSON format: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Clean and prepare blocks for export
   */
  private static sanitizeBlocks(blocks: BlockType[], options: ExportOptions): BlockType[] {
    return blocks.map(block => {
      const sanitizedBlock = { ...block };
      
      // Remove temporary/runtime properties
      delete sanitizedBlock.content?.dragging;
      delete sanitizedBlock.content?.isSelected;
      delete sanitizedBlock.content?.tempId;

      // Handle media files
      if (options.includeMediaAsBase64) {
        this.embedMediaAsBase64(sanitizedBlock);
      } else {
        this.convertMediaToReferences(sanitizedBlock);
      }

      return sanitizedBlock;
    });
  }

  /**
   * Convert media URLs to base64 (for self-contained exports)
   */
  private static embedMediaAsBase64(block: BlockType): void {
    // This would need to fetch actual media and convert to base64
    // Implementation depends on your media storage system
    if (block.content?.questionImage && typeof block.content.questionImage === 'string') {
      // Convert to base64 if it's a URL
      // block.content.questionImage = await this.urlToBase64(block.content.questionImage);
    }
  }

  /**
   * Convert media to references (for smaller exports)
   */
  private static convertMediaToReferences(block: BlockType): void {
    // Convert base64 images to references or URLs
    if (block.content?.questionImage && typeof block.content.questionImage === 'string') {
      if (block.content.questionImage.startsWith('data:')) {
        // This is base64, we might want to upload it and store a reference
        // For now, we'll keep it as is
      }
    }
  }

  /**
   * Validate Strandhoot data structure
   */
  private static validateStrandhootData(data: any): { valid: boolean; error?: string } {
    if (!data.id || !data.title || !data.version) {
      return {
        valid: false,
        error: 'Missing required fields: id, title, or version',
      };
    }

    if (!Array.isArray(data.blocks)) {
      return {
        valid: false,
        error: 'Blocks must be an array',
      };
    }

    // Validate each block
    for (let i = 0; i < data.blocks.length; i++) {
      const block = data.blocks[i];
      if (!block.id || !block.type) {
        return {
          valid: false,
          error: `Block at index ${i} is missing required fields: id or type`,
        };
      }
    }

    return { valid: true };
  }

  /**
   * Handle version migration
   */
  private static migrateVersion(data: StrandhootData): StrandhootData {
    // Handle migrations between versions
    switch (data.version) {
      case '0.9.0':
        // Migrate from 0.9.0 to 1.0.0
        return this.migrateFrom090(data);
      default:
        return data;
    }
  }

  private static migrateFrom090(data: any): StrandhootData {
    // Example migration logic
    return {
      ...data,
      version: this.CURRENT_VERSION,
      settings: data.settings || {
        theme: 'default',
        allowAnonymous: true,
        showProgress: true,
        enableHints: true,
      },
    };
  }

  /**
   * Generate a preview/summary of the Strandhoot
   */
  static generatePreview(data: StrandhootData): {
    title: string;
    description: string;
    blockCount: number;
    questionCount: number;
    estimatedTime: number;
    subjects: string[];
  } {
    const questionBlocks = data.blocks.filter(block => 
      ['mcq', 'short', 'extended', 'fill'].includes(block.type)
    );

    return {
      title: data.title,
      description: data.description || 'No description provided',
      blockCount: data.blocks.length,
      questionCount: questionBlocks.length,
      estimatedTime: data.metadata.estimatedTime || 40,
      subjects: data.metadata.subject ? [data.metadata.subject] : [],
    };
  }

  /**
   * Create a shareable link format
   */
  static createShareableLink(data: StrandhootData, baseUrl: string): string {
    // Compress and encode the data for URL sharing
    const compressed = this.compressData(data);
    const encoded = btoa(compressed);
    return `${baseUrl}/play/${data.id}?data=${encoded}`;
  }

  private static compressData(data: StrandhootData): string {
    // This would use a compression library like pako
    // For now, just return JSON string
    return JSON.stringify(data);
  }
}

// Utility functions for file handling
export class StrandhootFileManager {
  /**
   * Save Strandhoot to local file
   */
  static async saveToFile(
    blocks: BlockType[],
    title: string,
    metadata: Partial<StrandhootData['metadata']> = {}
  ): Promise<void> {
    const data = StrandhootSerializer.export(blocks, title, metadata);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_')}.strandhoot.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Load Strandhoot from file
   */
  static async loadFromFile(): Promise<{
    success: boolean;
    data?: StrandhootData;
    error?: string;
  }> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json,.strandhoot.json';
      
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
          resolve({ success: false, error: 'No file selected' });
          return;
        }

        try {
          const text = await file.text();
          const result = StrandhootSerializer.import(text);
          resolve(result);
        } catch (error: unknown) {
          resolve({ 
            success: false, 
            error: `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}` 
          });
        }
      };

      input.click();
    });
  }
}