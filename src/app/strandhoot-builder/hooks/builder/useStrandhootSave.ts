// src/app/strandhoot-builder/hooks/builder/useStrandhootSave.ts
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext'; // ✅ ADD: Auth import
import type { BlockType } from '../../types/strandhoot';
import { strandhootSaveService, type ValidationResult } from '../../services/strandhootSaveService';

export interface StrandhootSaveHook {
  // Save states
  isSaving: boolean;
  isPublishing: boolean;
  isLoading: boolean;
  validation: ValidationResult | null;
  showValidation: boolean;
  
  // Save operations
  handleSave: () => Promise<void>;
  handleAutoSave: () => Promise<void>;
  handleValidate: () => void;
  handlePublish: () => Promise<void>;
  handleExport: () => void;
  handleLoad: () => Promise<void>;
  
  // Load operations
  loadStrandhoot: (id: string) => Promise<void>;
  
  // State setters
  setShowValidation: (show: boolean) => void;
  
  // Utility
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
}

interface UseStrandhootSaveParams {
  // Current strandhoot data
  title: string;
  description: string;
  blocks: BlockType[];
  currentId?: string;
  isPublished?: boolean;
  
  // State updaters
  onStateUpdate: (updates: {
    unsavedChanges?: boolean;
    lastSaved?: Date | null;
    currentId?: string;
    isPublished?: boolean;
    title?: string;
    description?: string;
    blocks?: BlockType[];
  }) => void;
  
  // Auto-save config
  autoSaveEnabled?: boolean;
  autoSaveInterval?: number; // in milliseconds
}

export function useStrandhootSave({
  title,
  description,
  blocks,
  currentId,
  isPublished = false,
  onStateUpdate,
  autoSaveEnabled = true,
  autoSaveInterval = 10000, // 10 seconds
}: UseStrandhootSaveParams): StrandhootSaveHook {
  
  // ✅ ADD: Get authenticated user
  const { user, role } = useAuth();
  
  // ✅ Save-specific states
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // ✅ Auto-save management
  const autoSaveTimer = useRef<NodeJS.Timeout>();
  const lastAutoSaveContent = useRef<string>('');
  
  // ✅ Track unsaved changes
  useEffect(() => {
    const currentContent = JSON.stringify({ title, description, blocks });
    const hasChanges = currentContent !== lastAutoSaveContent.current && lastAutoSaveContent.current !== '';
    
    if (hasChanges !== hasUnsavedChanges) {
      setHasUnsavedChanges(hasChanges);
    }
  }, [title, description, blocks, hasUnsavedChanges]);
  
  // ✅ Auto-save functionality
  useEffect(() => {
    if (!autoSaveEnabled || !hasUnsavedChanges || !currentId) return;
    
    // Clear existing timer
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }
    
    // Set new auto-save timer
    autoSaveTimer.current = setTimeout(() => {
      handleAutoSave();
    }, autoSaveInterval);
    
    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, [hasUnsavedChanges, currentId, autoSaveEnabled, autoSaveInterval]);
  
  // ✅ Extract metadata from welcome block helper
  const extractMetadata = useCallback(() => {
    const welcomeBlock = blocks.find(b => b.type === 'welcome');
    return {
      description,
      subject: (welcomeBlock?.content?.subject as string) || '',
      criteria: (welcomeBlock?.content?.criteria as string) || '',
      mypYear: (welcomeBlock?.content?.myp_year as string) || '',
      context: (welcomeBlock?.content?.context as string) || '',
      simulationLink: (welcomeBlock?.content?.simulationLink as string) || '',
      // ❌ REMOVED: researchMate to fix database error
      // researchMate: (welcomeBlock?.content?.researchMate as string) || '',
      tags: (welcomeBlock?.content?.tags as string[]) || [],
    };
  }, [blocks, description]);
  
  // ✅ FIXED: Main save handler with real user data
  const handleSave = useCallback(async () => {
    if (isSaving) return; // Prevent double-saving
    
    // ✅ ADD: Check authentication
    if (!user || role !== 'teacher') {
      toast.error('You must be logged in as a teacher to save Strandhoots');
      return;
    }
    
    try {
      setIsSaving(true);
      
      const metadata = extractMetadata();
      const stats = {
        totalBlocks: blocks.length,
        questionBlocks: blocks.filter(b => ['mcq', 'short', 'extended', 'fill'].includes(b.type)).length,
        strandBlocks: blocks.filter(b => b.type === 'strand').length,
        welcomeBlocks: blocks.filter(b => b.type === 'welcome').length,
      };

      // ✅ FIXED: Use real user data instead of 'demo-user'
      const result = await strandhootSaveService.saveDraft({
        title,
        blocks,
        metadata,
        creatorId: user.id, // ✅ Real UUID from authenticated user
        creatorName: user.email || user.user_metadata?.name || 'Unknown Teacher' // ✅ Real name
      }, currentId);
      
      if (result.success) {
        const now = new Date();
        setLastSaved(now);
        setHasUnsavedChanges(false);
        lastAutoSaveContent.current = JSON.stringify({ title, description, blocks });
        
        onStateUpdate({ 
          unsavedChanges: false, 
          lastSaved: now,
          currentId: result.id
        });

        // Update URL with the saved ID if it's a new strandhoot
        if (result.id && !currentId) {
          const url = new URL(window.location.href);
          url.searchParams.set('edit', result.id);
          window.history.replaceState({}, '', url.toString());
        }

        toast.success('Strandhoot saved successfully!', {
          description: `${stats.totalBlocks} blocks saved to database`,
        });
      } else {
        toast.error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('❌ Save error:', error);
      toast.error('Failed to save Strandhoot');
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, title, description, blocks, currentId, extractMetadata, onStateUpdate, user, role]); // ✅ ADD: user, role

  // ✅ Auto-save handler (silent save)
  const handleAutoSave = useCallback(async () => {
    if (!currentId || isSaving) return; // Only auto-save existing strandhoots
    
    try {
      // Use localStorage for auto-save as backup
      const data = {
        id: currentId,
        title,
        description,
        blocks,
        autoSavedAt: new Date().toISOString(),
      };

      localStorage.setItem('strandhoot-autosave', JSON.stringify(data));
      
      const now = new Date();
      setLastSaved(now);
      setHasUnsavedChanges(false);
      lastAutoSaveContent.current = JSON.stringify({ title, description, blocks });
      
      onStateUpdate({ 
        unsavedChanges: false, 
        lastSaved: now 
      });

      console.log('💾 Auto-saved at', now.toLocaleTimeString());
    } catch (error) {
      console.error('❌ Auto-save error:', error);
    }
  }, [currentId, isSaving, title, description, blocks, onStateUpdate]);

  // ✅ Validation handler
  const handleValidate = useCallback(() => {
    const validationResult = strandhootSaveService.validateStrandhoot(blocks);
    setValidation(validationResult);
    setShowValidation(true);
    
    // Log validation results for debugging
    console.log('🔍 Validation results:', {
      isValid: validationResult.isValid,
      score: validationResult.score,
      errors: validationResult.errors,
      warnings: validationResult.warnings,
    });
  }, [blocks]);

  // ✅ Publish handler
  const handlePublish = useCallback(async () => {
    if (!currentId) {
      toast.error('Please save the strandhoot first');
      return;
    }

    if (isPublishing) return; // Prevent double-publishing

    // Validate first
    const validationResult = strandhootSaveService.validateStrandhoot(blocks);
    if (!validationResult.isValid) {
      setValidation(validationResult);
      setShowValidation(true);
      toast.error('Cannot publish: Please fix validation errors first');
      return;
    }

    setIsPublishing(true);
    
    try {
      const result = await strandhootSaveService.publishStrandhoot(currentId);
      
      if (result.success) {
        onStateUpdate({ isPublished: true });
        toast.success('Strandhoot published successfully!', {
          description: 'It is now available for teachers to use in sessions',
        });
      } else {
        toast.error(result.error || 'Failed to publish');
      }
    } catch (error) {
      toast.error('An error occurred while publishing');
      console.error('Publish error:', error);
    } finally {
      setIsPublishing(false);
    }
  }, [currentId, isPublishing, blocks, onStateUpdate]);

  // ✅ Export handler
  const handleExport = useCallback(() => {
    try {
      const stats = {
        totalBlocks: blocks.length,
        questionBlocks: blocks.filter(b => ['mcq', 'short', 'extended', 'fill'].includes(b.type)).length,
        strandBlocks: blocks.filter(b => b.type === 'strand').length,
        welcomeBlocks: blocks.filter(b => b.type === 'welcome').length,
      };

      const exportData = {
        title,
        description,
        blocks,
        metadata: extractMetadata(),
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
        stats,
        currentId,
        isPublished,
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Strandhoot exported successfully', {
        description: `${stats.totalBlocks} blocks exported`,
      });
    } catch (error) {
      console.error('❌ Export error:', error);
      toast.error('Failed to export Strandhoot');
    }
  }, [title, description, blocks, extractMetadata, currentId, isPublished]);

  // ✅ Load from localStorage handler
  const handleLoad = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Try to load auto-save first
      let saved = localStorage.getItem('strandhoot-autosave');
      let source = 'auto-save';
      
      // If no auto-save, try main save
      if (!saved) {
        saved = localStorage.getItem('strandhoot-draft');
        source = 'local storage';
      }

      if (saved) {
        const data = JSON.parse(saved);
        
        onStateUpdate({
          title: data.title || 'Untitled Strandhoot',
          description: data.description || '',
          blocks: data.blocks || [],
          currentId: data.id,
          unsavedChanges: false,
          lastSaved: data.updatedAt ? new Date(data.updatedAt) : null,
        });

        setLastSaved(data.updatedAt ? new Date(data.updatedAt) : null);
        setHasUnsavedChanges(false);
        lastAutoSaveContent.current = JSON.stringify({ 
          title: data.title, 
          description: data.description, 
          blocks: data.blocks 
        });

        toast.success(`Loaded from ${source}`, {
          description: `${data.blocks?.length || 0} blocks restored`,
        });
      } else {
        toast.error('No saved data found');
      }
    } catch (error) {
      console.error('❌ Load error:', error);
      toast.error('Failed to load saved data');
    } finally {
      setIsLoading(false);
    }
  }, [onStateUpdate]);

  // ✅ Load strandhoot from database
  const loadStrandhoot = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const result = await strandhootSaveService.loadStrandhoot(id);
      if (result.success && result.data) {
        const now = new Date(result.data.updated_at || result.data.created_at || new Date());
        
        onStateUpdate({
          title: result.data.title,
          description: result.data.description || '',
          blocks: result.data.strands || [],
          currentId: id,
          isPublished: result.data.is_public,
          unsavedChanges: false,
          lastSaved: now,
        });

        setLastSaved(now);
        setHasUnsavedChanges(false);
        lastAutoSaveContent.current = JSON.stringify({ 
          title: result.data.title, 
          description: result.data.description, 
          blocks: result.data.strands 
        });

        toast.success('Strandhoot loaded successfully');
      } else {
        toast.error(result.error || 'Failed to load strandhoot');
        throw new Error(result.error || 'Load failed');
      }
    } catch (error) {
      toast.error('Error loading strandhoot');
      console.error('Load error:', error);
      throw error; // Re-throw so caller can handle
    } finally {
      setIsLoading(false);
    }
  }, [onStateUpdate]);

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, []);

  return {
    // Save states
    isSaving,
    isPublishing,
    isLoading,
    validation,
    showValidation,
    
    // Save operations
    handleSave,
    handleAutoSave,
    handleValidate,
    handlePublish,
    handleExport,
    handleLoad,
    
    // Load operations
    loadStrandhoot,
    
    // State setters
    setShowValidation,
    
    // Utility
    hasUnsavedChanges,
    lastSaved,
  };
}