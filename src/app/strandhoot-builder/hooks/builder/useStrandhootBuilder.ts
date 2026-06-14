// src/app/strandhoot-builder/hooks/builder/useStrandhootBuilder.ts
'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext'; // ✅ ADD: Auth import
import type { BlockType } from '../../types/strandhoot';
import { strandhootSaveService, type ValidationResult } from '../../services/strandhootSaveService';

// ✅ Extract interfaces from main component
export interface BuilderState {
  blocks: BlockType[];
  title: string;
  description: string;
  unsavedChanges: boolean;
  lastSaved: Date | null;
  currentId?: string;
  isPublished?: boolean;
}

export interface BuilderStats {
  totalBlocks: number;
  questionBlocks: number;
  strandBlocks: number;
  welcomeBlocks: number;
}

export type ViewMode = 'manager' | 'builder';

export interface StrandhootBuilderHook {
  // State
  builderState: BuilderState;
  viewMode: ViewMode;
  isPreviewMode: boolean;
  selectedBlockIndex: number | null;
  isLoading: boolean;
  isSaving: boolean;
  isPublishing: boolean;
  validation: ValidationResult | null;
  showValidation: boolean;
  stats: BuilderStats;
  
  // State setters
  setViewMode: (mode: ViewMode) => void;
  setIsPreviewMode: (preview: boolean) => void;
  setSelectedBlockIndex: (index: number | null) => void;
  setShowValidation: (show: boolean) => void;
  
  // State updaters
  updateBuilderState: (updates: Partial<BuilderState>) => void;
  
  // Navigation
  handleCreateNew: () => void;
  handleEditStrandhoot: (id: string) => void;
  handleBackToManager: () => void;
  
  // Save operations
  handleSave: () => Promise<void>;
  handleValidate: () => void;
  handlePublish: () => Promise<void>;
  handleExport: () => void;
  
  // Load operations
  loadStrandhoot: (id: string) => Promise<void>;
  
  // Utility
  builderId: string;
}

export function useStrandhootBuilder(): StrandhootBuilderHook {
  // ✅ ADD: Get authenticated user
  const { user, role } = useAuth();
  
  // ✅ URL parameter handling
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  
  // ✅ Core state management
  const [viewMode, setViewMode] = useState<ViewMode>(editId ? 'builder' : 'manager');
  
  const [builderState, setBuilderState] = useState<BuilderState>({
    blocks: [],
    title: 'Untitled Strandhoot',
    description: '',
    unsavedChanges: false,
    lastSaved: null,
    currentId: editId || undefined,
    isPublished: false,
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ Save/publish states
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  // ✅ Refs for performance
  const lastAutoSave = useRef<NodeJS.Timeout>();
  const builderId = useRef(`builder-${Date.now()}`);

  // ✅ Calculate stats with useMemo
  const stats: BuilderStats = useMemo(() => ({
    totalBlocks: builderState.blocks.length,
    questionBlocks: builderState.blocks.filter(b => ['mcq', 'short', 'extended', 'fill'].includes(b.type)).length,
    strandBlocks: builderState.blocks.filter(b => b.type === 'strand').length,
    welcomeBlocks: builderState.blocks.filter(b => b.type === 'welcome').length,
  }), [builderState.blocks]);

  // ✅ Enhanced state updater with validation
  const updateBuilderState = useCallback((updates: Partial<BuilderState>) => {
    setBuilderState(prev => {
      const newState = { 
        ...prev, 
        ...updates, 
        unsavedChanges: true 
      };

      // Validate blocks array
      if (updates.blocks) {
        newState.blocks = updates.blocks.filter(block => 
          block && 
          block.id && 
          block.type && 
          typeof block.id === 'string' && 
          typeof block.type === 'string'
        );
      }

      return newState;
    });
  }, []);

  // ✅ Load strandhoot if editing
  useEffect(() => {
    if (editId && viewMode === 'builder') {
      loadStrandhoot(editId);
    }
  }, [editId, viewMode]);

  // ✅ Auto-save functionality
  useEffect(() => {
    if (builderState.unsavedChanges && builderState.currentId) {
      // Clear existing timeout
      if (lastAutoSave.current) {
        clearTimeout(lastAutoSave.current);
      }

      // Set new auto-save timeout (10 seconds for server saves)
      lastAutoSave.current = setTimeout(async () => {
        await handleAutoSave();
      }, 10000);
    }

    return () => {
      if (lastAutoSave.current) {
        clearTimeout(lastAutoSave.current);
      }
    };
  }, [builderState.unsavedChanges, builderState.currentId]);

  // ✅ Load strandhoot function
  const loadStrandhoot = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const result = await strandhootSaveService.loadStrandhoot(id);
      if (result.success && result.data) {
        setBuilderState(prev => ({
          ...prev,
          title: result.data!.title,
          description: result.data!.description || '',
          blocks: result.data!.strands || [],
          currentId: id,
          isPublished: result.data!.is_public,
          unsavedChanges: false,
          lastSaved: new Date(result.data!.updated_at || result.data!.created_at || new Date()),
        }));
        toast.success('Strandhoot loaded successfully');
      } else {
        toast.error(result.error || 'Failed to load strandhoot');
        setViewMode('manager');
      }
    } catch (error) {
      toast.error('Error loading strandhoot');
      console.error('Load error:', error);
      setViewMode('manager');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Auto-save handler
  const handleAutoSave = useCallback(async () => {
    if (!builderState.currentId) return; // Only auto-save existing strandhoots
    
    try {
      // Use localStorage for auto-save as backup
      const data = {
        id: builderState.currentId,
        title: builderState.title,
        blocks: builderState.blocks,
        autoSavedAt: new Date().toISOString(),
      };

      localStorage.setItem('strandhoot-autosave', JSON.stringify(data));
      
      setBuilderState(prev => ({ 
        ...prev,
        unsavedChanges: false, 
        lastSaved: new Date() 
      }));

      console.log('💾 Auto-saved at', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('❌ Auto-save error:', error);
    }
  }, [builderState]);

  // ✅ Navigation handlers
  const handleCreateNew = useCallback(() => {
    // Reset state for new strandhoot
    setBuilderState({
      blocks: [],
      title: 'Untitled Strandhoot',
      description: '',
      unsavedChanges: false,
      lastSaved: null,
      currentId: undefined,
      isPublished: false,
    });
    setSelectedBlockIndex(null);
    setIsPreviewMode(false);
    setViewMode('builder');
    
    // Update URL without the edit parameter
    const url = new URL(window.location.href);
    url.searchParams.delete('edit');
    window.history.replaceState({}, '', url.toString());
  }, []);

  const handleEditStrandhoot = useCallback((id: string) => {
    // Update URL with edit parameter
    const url = new URL(window.location.href);
    url.searchParams.set('edit', id);
    window.history.pushState({}, '', url.toString());
    
    setViewMode('builder');
    loadStrandhoot(id);
  }, [loadStrandhoot]);

  const handleBackToManager = useCallback(() => {
    setViewMode('manager');
    setIsPreviewMode(false);
    // Clear URL parameters
    const url = new URL(window.location.href);
    url.searchParams.delete('edit');
    window.history.pushState({}, '', url.toString());
  }, []);

  // ✅ FIXED: Save operations with real user data
  const handleSave = useCallback(async () => {
    // ✅ ADD: Check if user is authenticated and is a teacher
    if (!user || role !== 'teacher') {
      toast.error('You must be logged in as a teacher to save Strandhoots');
      return;
    }

    try {
      setIsSaving(true);
      
      // Extract metadata from welcome block
      const welcomeBlock = builderState.blocks.find(b => b.type === 'welcome');
      const metadata = {
        description: builderState.description,
        subject: (welcomeBlock?.content?.subject as string) || '',
        criteria: (welcomeBlock?.content?.criteria as string) || '',
        mypYear: (welcomeBlock?.content?.myp_year as string) || '',
        context: (welcomeBlock?.content?.context as string) || '',
        simulationLink: (welcomeBlock?.content?.simulationLink as string) || '',
        tags: (welcomeBlock?.content?.tags as string[]) || [],
      };

      // ✅ FIXED: Use real user data instead of 'demo-user'
      const result = await strandhootSaveService.saveDraft({
        title: builderState.title,
        blocks: builderState.blocks,
        metadata,
        creatorId: user.id, // ✅ Real UUID from authenticated user
        creatorName: user.email || user.user_metadata?.name || 'Unknown Teacher' // ✅ Real name
      }, builderState.currentId);
      
      if (result.success) {
        setBuilderState(prev => ({ 
          ...prev,
          unsavedChanges: false, 
          lastSaved: new Date(),
          currentId: result.id
        }));

        // Update URL with the saved ID
        if (result.id && !builderState.currentId) {
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
  }, [builderState, stats, user, role]); // ✅ ADD: user and role to dependencies

  // ✅ Validation handler
  const handleValidate = useCallback(() => {
    const validationResult = strandhootSaveService.validateStrandhoot(builderState.blocks);
    setValidation(validationResult);
    setShowValidation(true);
  }, [builderState.blocks]);

  // ✅ Publish handler
  const handlePublish = useCallback(async () => {
    if (!builderState.currentId) {
      toast.error('Please save the strandhoot first');
      return;
    }

    // Validate first
    const validationResult = strandhootSaveService.validateStrandhoot(builderState.blocks);
    if (!validationResult.isValid) {
      setValidation(validationResult);
      setShowValidation(true);
      toast.error('Cannot publish: Please fix validation errors first');
      return;
    }

    setIsPublishing(true);
    
    try {
      const result = await strandhootSaveService.publishStrandhoot(builderState.currentId);
      
      if (result.success) {
        setBuilderState(prev => ({ ...prev, isPublished: true }));
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
  }, [builderState.currentId, builderState.blocks]);

  // ✅ Export handler
  const handleExport = useCallback(() => {
    try {
      const data = {
        title: builderState.title,
        description: builderState.description,
        blocks: builderState.blocks,
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
        stats,
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${builderState.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Strandhoot exported successfully');
    } catch (error) {
      console.error('❌ Export error:', error);
      toast.error('Failed to export Strandhoot');
    }
  }, [builderState, stats]);

  return {
    // State
    builderState,
    viewMode,
    isPreviewMode,
    selectedBlockIndex,
    isLoading,
    isSaving,
    isPublishing,
    validation,
    showValidation,
    stats,
    
    // State setters
    setViewMode,
    setIsPreviewMode,
    setSelectedBlockIndex,
    setShowValidation,
    
    // State updaters
    updateBuilderState,
    
    // Navigation
    handleCreateNew,
    handleEditStrandhoot,
    handleBackToManager,
    
    // Save operations
    handleSave,
    handleValidate,
    handlePublish,
    handleExport,
    
    // Load operations
    loadStrandhoot,
    
    // Utility
    builderId: builderId.current,
  };
}