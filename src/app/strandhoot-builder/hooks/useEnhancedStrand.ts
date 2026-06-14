// hooks/useEnhancedStrand.ts
import { useState, useEffect, useCallback } from 'react';
import { StrandService, type StrandData, type EvaluationResult } from '@/app/strandhoot-builder/services/strandService';
import { debounce } from 'lodash';

interface UseEnhancedStrandProps {
  strandId: string;
  studentId?: string;
  sessionCode?: string;
  autoSaveDelay?: number;
  enableRealTimeEvaluation?: boolean;
}

export function useEnhancedStrand({
  strandId,
  studentId,
  sessionCode,
  autoSaveDelay = 2000,
  enableRealTimeEvaluation = true,
}: UseEnhancedStrandProps) {
  
  const [strand, setStrand] = useState<StrandData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentLevel, setCurrentLevel] = useState(0);

  // Load initial strand data
  useEffect(() => {
    loadStrand();
  }, [strandId]);

  const loadStrand = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { strand: loadedStrand, error: loadError } = await StrandService.loadStrand(strandId);
      
      if (loadError) {
        setError(loadError);
      } else if (loadedStrand) {
        setStrand(loadedStrand);
        setCurrentLevel(loadedStrand.level);
      }
    } catch (_err) {
      setError('Failed to load strand');
    } finally {
      setLoading(false);
    }
  };

  // Debounced auto-save function
  const debouncedAutoSave = useCallback(
    debounce(async (strandData: StrandData) => {
      if (!strandData) return;
      
      const { success } = await StrandService.saveStrand(strandData);
      if (success) {
        setHasUnsavedChanges(false);
        setLastSaved(new Date());
      }
    }, autoSaveDelay),
    [autoSaveDelay]
  );

  // Update strand data
  const updateStrand = useCallback((updates: Partial<StrandData>) => {
    if (!strand) return;
    
    const updatedStrand = { ...strand, ...updates, lastUpdated: new Date() };
    setStrand(updatedStrand);
    setHasUnsavedChanges(true);
    
    // Auto-save
    debouncedAutoSave(updatedStrand);
  }, [strand, debouncedAutoSave]);

  // Save strand manually
  const saveStrand = async (): Promise<boolean> => {
    if (!strand) return false;
    
    const { success, error: saveError } = await StrandService.saveStrand(strand);
    
    if (success) {
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      return true;
    } else {
      setError(saveError || 'Save failed');
      return false;
    }
  };

  // Evaluate strand manually
  const evaluateStrand = async (): Promise<EvaluationResult | null> => {
    if (!strand || isEvaluating) return null;
    
    setIsEvaluating(true);
    setError(null);
    
    try {
      const yourWorkTab = strand.tabs.find(tab => 
        tab.title.toLowerCase().includes('your') || tab.id === 'your-work'
      );
      
      if (!yourWorkTab?.content) {
        setError('No content to evaluate');
        return null;
      }
      
      const { result, error: evalError } = await StrandService.evaluateStrand(
        yourWorkTab.content,
        'distance', // This should be determined from context
        `strand-${strand.title}`,
        strand.evaluationConfig
      );
      
      if (evalError) {
        setError(evalError);
        return null;
      }
      
      if (result) {
        setCurrentLevel(result.level);
        updateStrand({ level: result.level });
        return result;
      }
      
      return null;
    } catch (_err) {
      setError('Evaluation failed');
      return null;
    } finally {
      setIsEvaluating(false);
    }
  };

  // Tab management functions
  const addTab = useCallback((title: string, content = '') => {
    if (!strand) return;
    
    const newTab = {
      id: `tab-${Date.now()}`,
      title,
      content,
      order: strand.tabs.length,
    };
    
    updateStrand({
      tabs: [...strand.tabs, newTab],
    });
  }, [strand, updateStrand]);

  const removeTab = useCallback((tabId: string) => {
    if (!strand || strand.tabs.length <= 2) return;
    
    updateStrand({
      tabs: strand.tabs.filter(tab => tab.id !== tabId),
    });
  }, [strand, updateStrand]);

  const updateTab = useCallback((tabId: string, updates: { title?: string; content?: string }) => {
    if (!strand) return;
    
    updateStrand({
      tabs: strand.tabs.map(tab =>
        tab.id === tabId ? { ...tab, ...updates } : tab
      ),
    });
  }, [strand, updateStrand]);

  return {
    strand,
    loading,
    error,
    hasUnsavedChanges,
    isEvaluating,
    lastSaved,
    currentLevel,
    updateStrand,
    saveStrand,
    evaluateStrand,
    addTab,
    removeTab,
    updateTab,
  };
}