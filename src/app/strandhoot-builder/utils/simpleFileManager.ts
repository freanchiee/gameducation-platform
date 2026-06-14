// src/app/strandhoot-builder/utils/simpleFileManager.ts
import type { BlockType } from '../types/strandhoot';

export interface SimpleStrandhootData {
  title: string;
  blocks: BlockType[];
  createdAt: string;
  version: string;
}

export class SimpleFileManager {
  /**
   * Save Strandhoot to local file
   */
  static async saveToFile(blocks: BlockType[], title: string): Promise<void> {
    const data: SimpleStrandhootData = {
      title,
      blocks,
      createdAt: new Date().toISOString(),
      version: '1.0.0',
    };
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
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
    data?: SimpleStrandhootData;
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
          const data = JSON.parse(text) as SimpleStrandhootData;
          
          // Basic validation
          if (!data.title || !Array.isArray(data.blocks)) {
            resolve({ 
              success: false, 
              error: 'Invalid file format - missing title or blocks' 
            });
            return;
          }
          
          resolve({ success: true, data });
        } catch (error) {
          resolve({ 
            success: false, 
            error: `Failed to parse file: ${error instanceof Error ? error.message : 'Unknown error'}` 
          });
        }
      };

      input.click();
    });
  }
}