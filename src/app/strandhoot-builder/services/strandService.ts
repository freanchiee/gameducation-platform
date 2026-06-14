// services/strandService.ts
import { supabase } from '@/utils/supabase';

export interface StrandData {
  id: string;
  title: string;
  content: Record<string, any>;
  level: number;
  tabs: Tab[];
  droppedBlocks: BlockType[];
  evaluationConfig?: EvaluationConfig;
  lastUpdated: Date;
  createdBy: string;
  sessionCode?: string;
}

export interface Tab {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface BlockType {
  id: string;
  type: string;
  content: any;
  questionId?: string;
  order: number;
}

export interface EvaluationConfig {
  keywords: string[];
  concepts: string[];
  exemplars: string[];
  suggestions: string[];
  customRubric?: any;
}

export interface EvaluationResult {
  level: number;
  matchedKeywords: string[];
  matchedConcepts: string[];
  suggestions: string[];
  feedback: string;
  confidence: number;
}

export class StrandService {
  /**
   * Save strand data to database
   */
  static async saveStrand(strandData: StrandData): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('strands')
        .upsert({
          id: strandData.id,
          title: strandData.title,
          content: strandData.content,
          level: strandData.level,
          tabs: strandData.tabs,
          dropped_blocks: strandData.droppedBlocks,
          evaluation_config: strandData.evaluationConfig,
          updated_at: new Date().toISOString(),
          created_by: strandData.createdBy,
          session_code: strandData.sessionCode,
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving strand:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error saving strand:', error);
      return { success: false, error: 'Failed to save strand' };
    }
  }

  /**
   * Load strand data from database
   */
  static async loadStrand(strandId: string): Promise<{ strand?: StrandData; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('strands')
        .select('*')
        .eq('id', strandId)
        .single();

      if (error) {
        console.error('Error loading strand:', error);
        return { error: error.message };
      }

      const strand: StrandData = {
        id: data.id,
        title: data.title,
        content: data.content || {},
        level: data.level || 0,
        tabs: data.tabs || [],
        droppedBlocks: data.dropped_blocks || [],
        evaluationConfig: data.evaluation_config,
        lastUpdated: new Date(data.updated_at),
        createdBy: data.created_by,
        sessionCode: data.session_code,
      };

      return { strand };
    } catch (error) {
      console.error('Unexpected error loading strand:', error);
      return { error: 'Failed to load strand' };
    }
  }

  /**
   * Evaluate strand content
   */
  static async evaluateStrand(
    content: string,
    experiment: 'distance' | 'magnets',
    strandKey: string,
    evaluationConfig?: EvaluationConfig
  ): Promise<{ result?: EvaluationResult; error?: string }> {
    try {
      // Mock evaluation - replace with actual AI service
      const mockResult: EvaluationResult = {
        level: Math.floor(Math.random() * 8) + 1,
        matchedKeywords: this.extractKeywords(content, evaluationConfig?.keywords || []),
        matchedConcepts: this.extractConcepts(content, evaluationConfig?.concepts || []),
        suggestions: this.generateSuggestions(content, strandKey),
        feedback: this.generateFeedback(content),
        confidence: Math.random() * 0.3 + 0.7,
      };

      return { result: mockResult };
    } catch (error) {
      console.error('Error evaluating strand:', error);
      return { error: 'Failed to evaluate strand' };
    }
  }

  private static extractKeywords(content: string, keywords: string[]): string[] {
    const lowerContent = content.toLowerCase();
    return keywords.filter(keyword => 
      lowerContent.includes(keyword.toLowerCase())
    );
  }

  private static extractConcepts(content: string, concepts: string[]): string[] {
    const lowerContent = content.toLowerCase();
    return concepts.filter(concept => 
      lowerContent.includes(concept.toLowerCase())
    );
  }

  private static generateSuggestions(content: string, strandKey: string): string[] {
    const suggestions: string[] = [];
    
    if (content.length < 100) {
      suggestions.push('Consider adding more detailed explanations');
    }
    
    switch (strandKey) {
      case 'strand1':
        if (!content.includes('table') && !content.includes('graph')) {
          suggestions.push('Include data tables and graphs to support your analysis');
        }
        break;
      case 'strand2':
        if (!content.includes('trend') && !content.includes('pattern')) {
          suggestions.push('Describe the trends and patterns you observe in your data');
        }
        break;
    }
    
    return suggestions;
  }

  private static generateFeedback(content: string): string {
    if (content.length > 300) {
      return 'Excellent detail! Your response shows strong understanding.';
    } else if (content.length > 150) {
      return 'Good progress! Consider adding more specific examples.';
    } else {
      return 'Good start! Please provide more detailed explanations.';
    }
  }
}