// StrandhootBuilderPage.tsx - Complete version with Auth Integration
'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

// ✅ Import both Auth and User contexts
import { useAuth } from '@/contexts/AuthContext';
import { useUser } from '@/contexts/UserContext';

// ✅ Import AuthModal
import AuthModal from '@/app/components/AuthModal';

// Import Supabase
import { supabase } from '@/utils/supabase';

import DatabaseTest from './components/DatabaseTest';

// ✅ Dashboard Components
import { DashboardModal } from './components/dashboard/DashboardModal';

// Components
import StrandhootHeader from './components/builder/StrandhootHeader';
import EmptyState from './components/builder/EmptyState';
import ValidationModal from './components/builder/ValidationModal';
import ShortcutsModal from './components/builder/ShortcutsModal';
import SettingsModal from './components/builder/SettingsModal';
import CanvasPreview from './Canvas/CanvasPreview';
import ComponentToolbox from './GoogleSitesToolbox';
import { generateStrandsForCriteria } from './utils/generateStrandsForCriteria';

// Hooks and utilities
import { useStrandhootBuilder } from './hooks/builder/useStrandhootBuilder';
import { useStrandhootOperations } from './hooks/builder/useStrandhootOperations';
import { DEFAULT_STRANDHOOT, TOAST_MESSAGES, BuilderSettings, validateStrandhoot, validateForPublishing } from './constants/builder';

// Types
import type { BlockType } from './types/strandhoot';

// Utils
import { toast } from 'sonner';
// UI
import { Button } from '../components/ui/button';

// 🚀 NEW IMPORTS for Smart Preview
import PreviewButton from './components/PreviewButton';
import { usePreviewCleanup } from './hooks/usePreviewCleanup';

// Debug helpers
const log = (message: string, data?: any) => {
  console.log(`🔍 [STRANDHOOT BUILDER] ${message}`, data || '');
};

const logError = (message: string, error?: any) => {
  console.error(`❌ [STRANDHOOT BUILDER] ${message}`, error || '');
};

const logSuccess = (message: string, data?: any) => {
  console.log(`✅ [STRANDHOOT BUILDER] ${message}`, data || '');
};

// Define ValidationError type
interface ValidationError {
  blockId?: string;
  field: string;
  message: string;
  type?: string;
}

// Define error types for better TypeScript support
interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

interface DebugInfo {
  supabaseError?: SupabaseError;
  supabaseConnected?: boolean;
  totalStrandhoots?: number | null;
  connectionError?: string;
  loadError?: string;
  loadedSuccessfully?: boolean;
  loadFunctionError?: string;
  loadFunctionMissing?: boolean;
  testError?: string;
  urlParams?: {
    edit: string | null;
    id: string | null;
    all: Record<string, string>;
    fullUrl: string;
  };
  builderState?: {
    currentId: string | null | undefined;
    title: string;
    description: string;
    blocksCount: number;
    lastSaved: Date | null;
    unsavedChanges: boolean;
    isLoading: boolean;
    isSaving: boolean;
    isPublishing: boolean;
  };
  hookInfo?: {
    loadStrandhoot: string;
    handleSave: string;
    updateBuilderState: string;
    hookHandleDrop: string;
  };
  authInfo?: {
    supabaseUser: string | null;
    supabaseRole: string | null;
    supabaseIsLoading: boolean;
    contextUserId: string | null;
    contextUserRole: string | null;
    contextIsLoading: boolean;
    isAuthenticated: boolean;
    needsAuth: boolean;
    authCheckComplete: boolean;
    showAuthModal: boolean;
  };
}

export default function StrandhootBuilderPage() {
  log('Component rendered/re-rendered');

  // ✅ Use both Auth and User contexts
  const { 
    user: supabaseUser, 
    role: supabaseRole, 
    isLoading: authLoading,
    session
  } = useAuth();

  const { 
    userId, 
    userEmail, 
    userName, 
    userRole, 
    isAuthenticated, 
    isLoading: userLoading,
    setUser,
    refreshUser 
  } = useUser();

  // ✅ Auth Modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  // ✅ Use the real builder hook
  const {
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
    setViewMode,
    setIsPreviewMode,
    setSelectedBlockIndex,
    setShowValidation,
    updateBuilderState,
    handleCreateNew,
    handleEditStrandhoot,
    handleBackToManager,
    handleSave,
    handleValidate,
    handlePublish,
    handleExport,
    loadStrandhoot,
  } = useStrandhootBuilder();

  log('Builder hook initialized', {
    currentId: builderState.currentId,
    title: builderState.title,
    blocksCount: builderState.blocks.length,
    isLoading,
    isSaving,
    userId,
    userAuthenticated: isAuthenticated,
    supabaseUser: supabaseUser?.id,
    supabaseRole
  });

  // ✅ Use the real operations hook for block management
  const {
    handleDrop: hookHandleDrop,
    handleUpdate: hookHandleUpdate,
    handleDelete: hookHandleDelete,
    handleDuplicate,
    handleMove,
    handleConfigure,
    handleClearAll,
    handleStructureConfirmed: hookHandleStructureConfirmed,
    handleGenerateSkeleton: hookHandleGenerateSkeleton,
  } = useStrandhootOperations({
    blocks: builderState.blocks,
    updateBlocks: (blocks: BlockType[]) => updateBuilderState({ blocks }),
    selectedBlockIndex,
    setSelectedBlockIndex,
  });

  // ✅ Local UI state
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({});

  // UI state
  const [zoomLevel] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const [showToolbox, setShowToolbox] = useState(true);

  // Settings state
  const [settings, setSettings] = useState<BuilderSettings>({
    title: builderState.title,
    description: builderState.description,
    autoSave: true,
    autoSaveInterval: 30000,
    showGrid,
    snapToGrid: false,
    showToolbox,
    theme: 'light',
  });

  // =============================================================================
  // ✅ AUTHENTICATION CHECKING LOGIC (FIXED)
  // =============================================================================

  // ✅ Check if user needs authentication
  const checkAuthenticationStatus = useCallback(() => {
    log('🔐 Checking authentication status', {
      supabaseUser: supabaseUser?.id,
      session: !!session,
      userId,
      isAuthenticated,
      userRole,
      supabaseRole
    });
    
    // ✅ Key Fix: Don't check for loading states here, handle them separately
    
    // 1. Check if we have a valid Supabase user (most reliable)
    if (supabaseUser && session) {
      log('✅ User authenticated via Supabase:', {
        userId: supabaseUser.id,
        email: supabaseUser.email,
        role: supabaseRole
      });
      
      // Update UserContext if it doesn't have the Supabase user data
      if (userId !== supabaseUser.id) {
        setUser(
          supabaseUser.id, 
          supabaseUser.email || undefined, 
          supabaseUser.user_metadata?.full_name || undefined,
          supabaseRole || undefined
        );
      }
      
      return { needsAuth: false, isAuthenticated: true };
    }

    // 2. Check if we have a valid user from UserContext
    if (isAuthenticated && userId && userId !== 'current-user') {
      log('✅ User authenticated via UserContext:', {
        userId,
        email: userEmail,
        role: userRole
      });
      return { needsAuth: false, isAuthenticated: true };
    }

    // 3. Check URL for guest access patterns
    const urlParams = new URLSearchParams(window.location.search);
    const guestAccess = urlParams.get('guest') === 'true' || 
                       urlParams.get('demo') === 'true' ||
                       urlParams.get('preview') === 'true';
    
    if (guestAccess) {
      log('✅ Guest access detected, allowing without auth');
      return { needsAuth: false, isAuthenticated: false };
    }

    // 4. Check if we're in a demo or preview context
    const pathname = window.location.pathname;
    if (pathname.includes('/preview/') || pathname.includes('/demo/')) {
      log('✅ Preview/demo mode detected, allowing without auth');
      return { needsAuth: false, isAuthenticated: false };
    }

    log('❌ No valid authentication found, needs auth');
    return { needsAuth: true, isAuthenticated: false };
  }, [
    supabaseUser, 
    session, 
    supabaseRole,
    isAuthenticated, 
    userId, 
    userEmail, 
    userRole,
    setUser
  ]);

  // ✅ Fixed: Authentication check effect that doesn't get stuck in loops
  useEffect(() => {
    // ✅ Add detailed logging for troubleshooting
    log('🔍 Auth check effect triggered', {
      authLoading,
      userLoading,
      supabaseUser: supabaseUser?.id,
      supabaseRole,
      userId,
      userRole,
      isAuthenticated,
      session: !!session
    });

    // Wait for both contexts to finish loading
    if (authLoading || userLoading) {
      log('⏳ Waiting for auth contexts to finish loading...', {
        authLoading,
        userLoading,
        supabaseUserExists: !!supabaseUser,
        sessionExists: !!session,
        userIdFromContext: userId
      });
      return;
    }

    // ✅ Key Fix: Force auth check completion if we have valid Supabase user but userLoading is stuck
    if (supabaseUser && session && userLoading) {
      log('🔧 Force completing auth check - Supabase user exists but userLoading stuck', {
        supabaseUserId: supabaseUser.id,
        userLoading,
        forceUpdate: true
      });
      
      // Update UserContext manually if it's stuck loading
      if (userId !== supabaseUser.id) {
        setUser(
          supabaseUser.id, 
          supabaseUser.email || undefined, 
          supabaseUser.user_metadata?.full_name || undefined,
          supabaseRole || undefined
        );
      }
      
      // Force auth check to complete
      setAuthCheckComplete(true);
      return;
    }

    const { needsAuth, isAuthenticated: userIsAuthenticated } = checkAuthenticationStatus();
    
    // ✅ Add logging for auth check results
    log('🔍 Auth check completed', {
      needsAuth,
      userIsAuthenticated,
      authCheckComplete,
      showAuthModal,
      supabaseUserPresent: !!supabaseUser,
      contextUserPresent: !!userId
    });
    
    setAuthCheckComplete(true);

    if (needsAuth && !showAuthModal) {
      log('🔓 Showing auth modal');
      setShowAuthModal(true);
    } else if (!needsAuth && showAuthModal) {
      log('🔒 Hiding auth modal - user is authenticated or has guest access');
      setShowAuthModal(false);
    }

    // Update debug info
    setDebugInfo(prev => ({
      ...prev,
      authInfo: {
        supabaseUser: supabaseUser?.id || null,
        supabaseRole,
        supabaseIsLoading: authLoading,
        contextUserId: userId,
        contextUserRole: userRole,
        contextIsLoading: userLoading,
        isAuthenticated: userIsAuthenticated,
        needsAuth,
        authCheckComplete: true,
        showAuthModal
      }
    }));

  }, [
    authLoading, 
    checkAuthenticationStatus, 
    showAuthModal,
    supabaseUser?.id,
    supabaseRole,
    userRole
  ]);

  // =============================================================================
  // ✅ USER MANAGEMENT FUNCTIONS
  // =============================================================================

  const getCurrentUserId = useCallback(() => {
    // Prefer Supabase user ID
    if (supabaseUser?.id) {
      return supabaseUser.id;
    }
    
    // Fallback to UserContext
    if (userId && userId !== 'current-user') {
      return userId;
    }
    
    // Last resort fallback
    return 'current-user';
  }, [supabaseUser?.id, userId]);

  const getUserDisplayInfo = useCallback(() => {
    return {
      id: getCurrentUserId(),
      email: supabaseUser?.email || userEmail,
      name: supabaseUser?.user_metadata?.full_name || userName,
      role: supabaseRole || userRole,
      isAuthenticated: !!supabaseUser || isAuthenticated,
      isLoading: authLoading || userLoading,
      source: supabaseUser ? 'supabase' : isAuthenticated ? 'context' : 'none'
    };
  }, [
    getCurrentUserId, 
    supabaseUser, 
    userEmail, 
    userName, 
    supabaseRole, 
    userRole, 
    isAuthenticated, 
    authLoading, 
    userLoading
  ]);

  // =============================================================================
  // ✅ AUTH MODAL HANDLERS
  // =============================================================================

  const handleAuthSuccess = useCallback(() => {
    log('🎉 Authentication successful');
    setShowAuthModal(false);
    toast.success('Welcome! You are now authenticated.');
    
    // Don't refresh user context - it's already handling Supabase auth changes
    // refreshUser(); // Removed to prevent loops
  }, []);

  const handleAuthModalClose = useCallback(() => {
    log('🚪 Auth modal closed by user');
    
    // Check if we can allow guest access
    const urlParams = new URLSearchParams(window.location.search);
    const allowGuest = urlParams.get('guest') === 'true' || 
                      urlParams.get('demo') === 'true';
    
    if (allowGuest) {
      log('✅ Allowing guest access');
      setShowAuthModal(false);
      // Set a temporary guest user
      setUser('guest-user', undefined, 'Guest User', undefined);
    } else {
      log('❌ Guest access not allowed, keeping modal open');
      toast.error('Authentication is required to use the Strandhoot Builder.');
      // Keep modal open by not calling setShowAuthModal(false)
    }
  }, [setUser]);

  // =============================================================================
  // ✅ DASHBOARD FUNCTIONS
  // =============================================================================

  const handleOpenDashboard = useCallback(() => {
    log('Opening dashboard modal');
    setShowDashboard(true);
  }, []);

  const handleCloseDashboard = useCallback(() => {
    log('Closing dashboard modal');
    setShowDashboard(false);
  }, []);

  const handleEditFromDashboard = useCallback(async (strandhootId: string) => {
    log('Loading strandhoot from dashboard', { strandhootId });
    try {
      await loadStrandhoot(strandhootId);
      setShowDashboard(false);
      toast.success('Strandhoot loaded successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logError('Failed to load strandhoot from dashboard', error);
      toast.error(`Failed to load strandhoot: ${errorMessage}`);
    }
  }, [loadStrandhoot]);

  const handleCreateNewFromDashboard = useCallback(() => {
    log('Creating new strandhoot from dashboard');
    handleCreateNew();
    setShowDashboard(false);
    toast.success('New strandhoot created!');
  }, [handleCreateNew]);

  // =============================================================================
  // DEBUG FUNCTIONS (ENHANCED WITH AUTH INFO)
  // =============================================================================

  const testSupabaseConnection = async () => {
    log('Testing Supabase connection...');
    try {
      if (!supabase) {
        logError('Supabase client is null/undefined');
        alert('❌ Supabase client not found');
        return;
      }

      logSuccess('Supabase client found, testing query...');

      const { data, error, count } = await supabase
        .from('strandhoot_templates')
        .select('id, title', { count: 'exact' })
        .limit(5);

      if (error) {
        logError('Supabase query failed', error);
        alert(`❌ Supabase query error: ${error.message}`);
        setDebugInfo((prev: DebugInfo) => ({ ...prev, supabaseError: error as SupabaseError }));
      } else {
        logSuccess('Supabase query successful', { count, data });
        alert(`✅ Supabase connected! Found ${count} strandhoot templates.`);
        setDebugInfo((prev: DebugInfo) => ({ ...prev, supabaseConnected: true, totalStrandhoots: count || null }));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logError('Error testing Supabase connection', error);
      alert(`❌ Connection error: ${errorMessage}`);
      setDebugInfo((prev: DebugInfo) => ({ ...prev, connectionError: errorMessage }));
    }
  };

  const testLoadSpecificStrandhoot = async () => {
    const testId = 'd1b7d7c5-c0f8-46fb-a231-65d6dd6c429d';
    log(`Testing load of strandhoot: ${testId}`);
    
    try {
      logSuccess('Querying strandhoot from database...');
      const { data, error } = await supabase
        .from('strandhoot_templates')
        .select('*')
        .eq('id', testId)
        .single();
      
      if (error) {
        logError('Failed to load strandhoot from database', error);
        alert(`❌ Database error: ${error.message}`);
        setDebugInfo((prev: DebugInfo) => ({ ...prev, loadError: error.message }));
      } else {
        logSuccess('Strandhoot found in database', {
          id: data.id,
          title: data.title,
          blocksCount: data.context?.blocks?.length || 0
        });
        
        alert(`✅ Found strandhoot: "${data.title}" with ${data.context?.blocks?.length || 0} blocks`);
        
        if (typeof loadStrandhoot === 'function') {
          log('Testing loadStrandhoot function...');
          try {
            await loadStrandhoot(testId);
            logSuccess('loadStrandhoot function completed');
            alert('✅ Strandhoot loaded into builder!');
            setDebugInfo((prev: DebugInfo) => ({ ...prev, loadedSuccessfully: true }));
          } catch (loadError) {
            const errorMessage = loadError instanceof Error ? loadError.message : 'Unknown load error';
            logError('loadStrandhoot function failed', loadError);
            alert(`❌ Load function error: ${errorMessage}`);
            setDebugInfo((prev: DebugInfo) => ({ ...prev, loadFunctionError: errorMessage }));
          }
        } else {
          logError('loadStrandhoot is not a function', typeof loadStrandhoot);
          alert('❌ loadStrandhoot function not available');
          setDebugInfo((prev: DebugInfo) => ({ ...prev, loadFunctionMissing: true }));
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logError('Error in testLoadSpecificStrandhoot', error);
      alert(`❌ Test error: ${errorMessage}`);
      setDebugInfo((prev: DebugInfo) => ({ ...prev, testError: errorMessage }));
    }
  };

  const checkUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {
      edit: urlParams.get('edit'),
      id: urlParams.get('id'),
      all: Object.fromEntries(urlParams.entries()),
      fullUrl: window.location.href
    };
    
    log('URL Parameters checked', params);
    alert(`URL params: ${JSON.stringify(params, null, 2)}`);
    setDebugInfo((prev: DebugInfo) => ({ ...prev, urlParams: params }));
    
    return params;
  };

  const logCurrentState = () => {
    const userInfo = getUserDisplayInfo();
    const { needsAuth } = checkAuthenticationStatus();
    
    const state = {
      currentId: builderState.currentId,
      title: builderState.title,
      description: builderState.description,
      blocksCount: builderState.blocks.length,
      lastSaved: builderState.lastSaved,
      unsavedChanges: builderState.unsavedChanges,
      isLoading,
      isSaving,
      isPublishing
    };
    
    const authInfo = {
      supabaseUser: supabaseUser?.id || null,
      supabaseRole,
      supabaseIsLoading: authLoading,
      contextUserId: userId,
      contextUserRole: userRole,
      contextIsLoading: userLoading,
      isAuthenticated: userInfo.isAuthenticated,
      needsAuth,
      showAuthModal,
      authCheckComplete
    };
    
    log('Current builder state', state);
    log('Current user info', userInfo);
    log('Current auth info', authInfo);
    
    alert(`Builder state: ${JSON.stringify(state, null, 2)}\n\nUser info: ${JSON.stringify(userInfo, null, 2)}\n\nAuth info: ${JSON.stringify(authInfo, null, 2)}`);
    
    setDebugInfo((prev: DebugInfo) => ({ 
      ...prev, 
      builderState: state,
      authInfo
    }));
    
    return { state, userInfo, authInfo };
  };

  const runComprehensiveDebug = async () => {
    log('🧪 STARTING COMPREHENSIVE DEBUG WITH AUTH');
    alert('🧪 Starting comprehensive debug with auth - check console for details');
    
    try {
      // 1. Check authentication status
      log('Step 1: Checking authentication status');
      const authStatus = checkAuthenticationStatus();
      log('Auth status result:', authStatus);
      
      // 2. Check current state and user info
      log('Step 2: Checking current builder state and auth info');
      const { state, userInfo, authInfo } = logCurrentState();
      
      // 3. Test Supabase connection
      log('Step 3: Testing Supabase connection');
      await testSupabaseConnection();
      
      // 4. Test loading specific strandhoot
      log('Step 4: Testing strandhoot loading');
      await testLoadSpecificStrandhoot();
      
      // 5. Check hooks
      log('Step 5: Checking available functions');
      const hookInfo = {
        loadStrandhoot: typeof loadStrandhoot,
        handleSave: typeof handleSave,
        updateBuilderState: typeof updateBuilderState,
        hookHandleDrop: typeof hookHandleDrop
      };
      log('Hook functions available', hookInfo);
      setDebugInfo((prev: DebugInfo) => ({ ...prev, hookInfo }));
      
      logSuccess('🧪 COMPREHENSIVE DEBUG WITH AUTH COMPLETED');
      alert('✅ Debug completed! Check console for full details.');
      
    } catch (error) {
      logError('🧪 COMPREHENSIVE DEBUG FAILED', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`❌ Debug failed: ${errorMessage}`);
    }
  };

  // =============================================================================
  // URL PARAMETER LOADING EFFECT (AFTER AUTH CHECK)
  // =============================================================================

  useEffect(() => {
    log('🔄 URL loading effect triggered');
    
    // Wait for auth check to complete
    if (!authCheckComplete) {
      log('Waiting for auth check to complete...');
      return;
    }
    
    // If auth modal is showing, don't load strandhoot yet
    if (showAuthModal) {
      log('Auth modal is showing, waiting for authentication...');
      return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    const id = urlParams.get('id');
    
    log('URL search params detected', {
      fullSearch: window.location.search,
      editId,
      id,
      currentBuilderStateId: builderState.currentId,
      currentBlocksCount: builderState.blocks.length,
      authCheckComplete,
      showAuthModal
    });

    const strandhootId = editId || id;
    
    if (strandhootId && strandhootId !== builderState.currentId) {
      log(`🔄 Attempting to load strandhoot with ID: ${strandhootId}`);
      
      if (typeof loadStrandhoot === 'function') {
        log('loadStrandhoot function is available, calling it...');
        
        loadStrandhoot(strandhootId)
          .then(() => {
            logSuccess('Strandhoot loaded successfully via URL parameter');
          })
          .catch((error: unknown) => {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logError('Failed to load strandhoot via URL parameter', error);
            toast.error(`Failed to load strandhoot: ${errorMessage}`);
          });
      } else {
        logError('loadStrandhoot function is not available', typeof loadStrandhoot);
        toast.error('Load function not available');
      }
    }
  }, [authCheckComplete, showAuthModal, builderState.currentId, loadStrandhoot]);

  // =============================================================================
  // REGULAR FUNCTIONS
  // =============================================================================

  const handleUpdateTitle = useCallback((newTitle: string) => {
    log('Title update requested', newTitle);
    updateBuilderState({ title: newTitle });
  }, [updateBuilderState]);

  const handleUpdateDescription = useCallback((newDescription: string) => {
    log('Description update requested', newDescription);
    updateBuilderState({ description: newDescription });
  }, [updateBuilderState]);

  const handleUpdateBlock = useCallback((blockId: string, updates: Partial<BlockType>) => {
    log('Block update requested', { blockId, updates });
    const updatedBlocks = builderState.blocks.map(block => 
      block.id === blockId 
        ? { ...block, ...updates }
        : block
    );
    updateBuilderState({ blocks: updatedBlocks });
  }, [builderState.blocks, updateBuilderState]);

  const validateStrandhootData = () => {
    log('Validating strandhoot data');
    const errors = validateStrandhoot(builderState.title, builderState.description, builderState.blocks);
    const typedErrors: ValidationError[] = Array.isArray(errors) 
      ? errors.map(error => ({
          blockId: error.blockId,
          field: error.field || 'unknown',
          message: error.message || 'Validation error',
          type: error.type
        }))
      : [];
    setValidationErrors(typedErrors);
    log('Validation completed', { errorCount: typedErrors.length });
    return typedErrors;
  };

  const validateForPublish = () => {
    log('Validating for publish');
    const errors = validateForPublishing(builderState.title, builderState.description, builderState.blocks);
    const typedErrors: ValidationError[] = Array.isArray(errors)
      ? errors.map(error => ({
          blockId: error.blockId,
          field: error.field || 'unknown',
          message: error.message || 'Validation error',
          type: error.type
        }))
      : [];
    setValidationErrors(typedErrors);
    log('Publish validation completed', { errorCount: typedErrors.length });
    return typedErrors;
  };

  const handleSaveWithValidation = async () => {
    log('Save with validation requested');
    const errors = validateStrandhootData();
    if (errors.length > 0) {
      log('Validation errors found, showing validation modal');
      setShowValidation(true);
      return;
    }

    log('No validation errors, proceeding with save');
    await handleSave();
  };

  const handlePublishWithValidation = async () => {
    log('Publish with validation requested');
    const errors = validateForPublish();
    if (errors.length > 0) {
      log('Publish validation errors found, showing validation modal');
      setShowValidation(true);
      return;
    }

    log('No publish validation errors, proceeding with publish');
    await handlePublish();
  };

  const handlePreview = () => {
    log('Preview button clicked', {
      currentId: builderState.currentId,
      title: builderState.title,
      blocksCount: builderState.blocks.length
    });

    if (!builderState.blocks.length) {
      logError('No blocks found for preview');
      toast.error('Please add some blocks before previewing');
      return;
    }

    let previewId = builderState.currentId;
    
    if (!previewId) {
      previewId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      log('No saved ID found, using temporary ID', previewId);
    }

    const tempStrandhootData = {
      id: previewId,
      title: builderState.title || 'Untitled Strandhoot',
      description: builderState.description || '',
      criteria: 'A',
      subject: 'Sciences',
      myp_year: '3',
      context: {
        blocks: builderState.blocks
      },
      blocks: builderState.blocks,
      is_public: false,
      created_by: getCurrentUserId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const tempKey = `strandhoot-temp-${previewId}`;
    log('Storing preview data', { key: tempKey, dataSize: JSON.stringify(tempStrandhootData).length });
    
    try {
      localStorage.setItem(tempKey, JSON.stringify(tempStrandhootData));
      logSuccess('Preview data stored in localStorage');
    } catch (error) {
      logError('Failed to store preview data', error);
      toast.error('Failed to prepare preview data');
      return;
    }

    const previewData = {
      title: builderState.title,
      blocks: builderState.blocks,
      description: builderState.description,
      timestamp: Date.now()
    };
    
    try {
      sessionStorage.setItem('strandhoot-preview', JSON.stringify(previewData));
      logSuccess('Backup preview data stored in sessionStorage');
    } catch (error) {
      logError('Failed to store backup preview data', error);
    }
    
    const previewUrl = `/strandhoot-builder/preview/${previewId}`;
    log('Opening preview', { url: previewUrl, fullUrl: window.location.origin + previewUrl });
    
    const newWindow = window.open(previewUrl, '_blank');
    
    if (newWindow) {
      logSuccess('Preview window opened successfully');
      toast.success('Preview opened in new tab!');
    } else {
      logError('Failed to open preview window (popup blocked?)');
      toast.error('Failed to open preview. Please check if popups are blocked.');
    }
  };

  const handleExportLocal = () => {
    log('Export requested');
    const dataStr = JSON.stringify({
      title: builderState.title,
      description: builderState.description,
      blocks: builderState.blocks,
      exportedAt: new Date().toISOString(),
      exportedBy: getCurrentUserId(),
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${builderState.title || 'strandhoot'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    logSuccess('Export completed');
    toast.success('📁 Strandhoot exported successfully!');
  };

  // Auto-cleanup expired demo sessions
  usePreviewCleanup();

  const handleDrop = (block: BlockType) => {
    log('Block dropped', { type: block.type, id: block.id });
    hookHandleDrop(block);
  };

  const handleUpdate = (index: number, updated: BlockType) => {
    log('Block updated', { index, type: updated.type, id: updated.id });
    hookHandleUpdate(index, updated);
  };

  const handleDelete = (index: number) => {
    log('Block deleted', { index });
    hookHandleDelete(index);
  };

  const handleStructureConfirmed = (structure: {
    subject: string;
    criteria: string;
    mypYear: string;
  }) => {
    log('Structure confirmed', structure);
    hookHandleStructureConfirmed(structure);
  };

  const handleGenerateSkeleton = (structure: {
    subject: string;
    criteria: string;
    mypYear: string;
  }) => {
    log('Skeleton generation requested', structure);
    
    try {
      const newStrands = generateStrandsForCriteria(structure);
      log('Generated strands', { count: newStrands.length });
      
      if (newStrands.length === 0) {
        logError('No strands found for criteria');
        toast.error(`No strands found for ${structure.subject} Criterion ${structure.criteria}`);
        return;
      }
      
      newStrands.forEach((strandBlock, index) => {
        setTimeout(() => {
          const enhancedBlock = {
            ...strandBlock,
            id: `strand-${Date.now()}-${index}`,
            icon: '🧱',
            content: {
              ...strandBlock.content,
              subject: structure.subject,
              criteria: structure.criteria,
              mypYear: structure.mypYear,
            } as any
          };
          
          log(`Adding strand ${index + 1}/${newStrands.length}`, enhancedBlock.content?.title || enhancedBlock.label);
          
          updateBuilderState({ 
            blocks: [...builderState.blocks, enhancedBlock] 
          });
        }, index * 200);
      });
      
      setTimeout(() => {
        logSuccess(`Generated ${newStrands.length} strand pages`);
        toast.success(`✅ Generated ${newStrands.length} strand pages for ${structure.subject} Criterion ${structure.criteria}!`);
      }, newStrands.length * 200 + 100);
      
    } catch (error) {
      logError('Error generating skeleton', error);
      toast.error('Failed to generate skeleton. Please try again.');
    }
  };
  
  const handleFixValidationError = (blockId: string, _field: string) => {
    log('Fix validation error requested', { blockId });
    const blockElement = document.querySelector(`[data-block-id="${blockId}"]`);
    if (blockElement) {
      blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      blockElement.classList.add('validation-error-highlight');
      setTimeout(() => {
        blockElement.classList.remove('validation-error-highlight');
      }, 3000);
    }
    setShowValidation(false);
  };

  const addWelcomeBlock = () => {
    log('Adding welcome block');
    const welcomeBlock: BlockType = {
      id: `welcome-${Date.now()}`,
      type: 'welcome',
      label: 'Welcome Block',
      icon: '👋',
      content: {
        title: '',
        subtitle: '',
        color: 'orange',
      },
    };
    updateBuilderState({ blocks: [welcomeBlock] });
  };

  const handleTitleChange = (newTitle: string) => {
    log('Title change requested', newTitle);
    updateBuilderState({ title: newTitle });
  };

  const saveState = isSaving ? 'saving' : 
                   isPublishing ? 'saving' : 
                   builderState.lastSaved ? 'saved' : 'idle';

  // Generate a unique strandhoot ID for this session
  const strandhootId = `strandhoot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // ✅ Show loading state while auth is being checked
  if (!authCheckComplete || authLoading) {
  

    return (
      <div className="min-h-screen bg-[#fdf8e6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {!authCheckComplete ? 'Checking authentication...' : 'Loading user information...'}
          </p>
          {/* ✅ Debug info for troubleshooting */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 text-xs text-gray-500">
              <div>Auth Loading: {authLoading ? '🔄' : '✅'}</div>
              <div>User Loading: {userLoading ? '🔄' : '✅'}</div>
              <div>Auth Complete: {authCheckComplete ? '✅' : '🔄'}</div>
              <div>Supabase User: {supabaseUser ? '✅' : '❌'}</div>
              <div>Session: {session ? '✅' : '❌'}</div>
              
            </div>
          )}
        </div>
      </div>
    );
  }

  // ✅ Show auth modal if authentication is required
  if (showAuthModal) {
    return (
      <>
        <div className="min-h-screen bg-[#fdf8e6] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Authentication Required</h1>
            <p className="text-gray-600 mb-4">
              Please sign in to access the Strandhoot Builder and save your work.
            </p>
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign In
            </Button>
          </div>
        </div>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={handleAuthModalClose}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf8e6] flex flex-col text-zinc-800 font-sans">
      {/* Debug Panel (ENHANCED WITH AUTH INFO) */}
      <div className="bg-yellow-100 border-b-4 border-yellow-500 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-yellow-800">🔧 Debug Panel</h3>
              <p className="text-xs text-yellow-700">
                URL: {window.location.search} | ID: {builderState.currentId || 'None'} | Blocks: {builderState.blocks.length}
              </p>
              {/* ✅ Enhanced auth info display */}
              <div className="text-xs text-yellow-700 mt-1">
                🔐 Auth: 
                <code className="bg-yellow-200 px-1 rounded ml-1">
                  {supabaseUser ? `Supabase(${supabaseUser.id.slice(0, 8)}...)` : 
                   isAuthenticated ? `Context(${userId?.slice(0, 8)}...)` : 'None'}
                </code>
                {(supabaseRole || userRole) && <span> [{supabaseRole || userRole}]</span>}
                <span className="ml-2">Modal: {showAuthModal ? '🔓' : '🔒'}</span>
                <span className="ml-2">Check: {authCheckComplete ? '✅' : '🔄'}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={checkUrlParams}
                size="sm"
                variant="outline" 
                className="bg-blue-200 hover:bg-blue-300 text-blue-800"
              >
                📋 Check URL
              </Button>
              <Button
                onClick={logCurrentState}
                size="sm"
                variant="outline"
                className="bg-green-200 hover:bg-green-300 text-green-800"
              >
                📊 Log State
              </Button>
              <Button 
                onClick={testSupabaseConnection}
                size="sm"
                variant="outline" 
                className="bg-purple-200 hover:bg-purple-300 text-purple-800"
              >
                🔌 Test DB
              </Button>
              <Button 
                onClick={testLoadSpecificStrandhoot}
                size="sm"
                variant="outline" 
                className="bg-orange-200 hover:bg-orange-300 text-orange-800"
              >
                🧪 Test Load
              </Button>
              <Button 
                onClick={runComprehensiveDebug}
                size="sm"
                variant="outline" 
                className="bg-red-200 hover:bg-red-300 text-red-800 font-bold"
              >
                🚀 Full Debug
              </Button>
              <Button 
                onClick={handleOpenDashboard}
                size="sm"
                variant="outline" 
                className="bg-cyan-200 hover:bg-cyan-300 text-cyan-800"
              >
                📂 Dashboard
              </Button>
              <Button 
                onClick={() => setShowAuthModal(true)}
                size="sm"
                variant="outline" 
                className="bg-purple-200 hover:bg-purple-300 text-purple-800"
              >
                🔓 Show Auth
              </Button>
              <Button 
                onClick={refreshUser}
                size="sm"
                variant="outline" 
                className="bg-indigo-200 hover:bg-indigo-300 text-indigo-800"
              >
                🔄 Refresh User
              </Button>
            </div>
          </div>
          
          {/* Debug Info Display */}
          {Object.keys(debugInfo).length > 0 && (
            <details className="mt-2">
              <summary className="text-xs text-yellow-700 cursor-pointer">Debug Results</summary>
              <pre className="text-xs bg-yellow-50 p-2 rounded mt-1 overflow-auto max-h-32">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>

      {/* Header */}
      <StrandhootHeader
        title={builderState.title}
        onTitleChange={handleTitleChange}
        saveState={saveState}
        viewMode="builder"
        onPreview={handlePreview}
        onSave={handleSaveWithValidation}
        onPublish={handlePublishWithValidation}
        onSettings={() => setShowSettingsModal(true)}
        onBackToManager={handleBackToManager}
        onExport={handleExportLocal}
        onOpenDashboard={handleOpenDashboard}
        hasUnsavedChanges={builderState.unsavedChanges}
        canPublish={builderState.blocks.length > 0}
        strandhootId={strandhootId}
        blocksCount={builderState.blocks.length}
      />
        
      {process.env.NODE_ENV === 'development' && <DatabaseTest />}

      {/* Main Builder Layout */}
      <main className="flex flex-1">
        {/* Builder Canvas */}
        <div className="flex-1 flex justify-center px-6 py-6 overflow-auto">
          <motion.div
            className="w-full max-w-5xl"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {builderState.blocks.length === 0 ? (
              <EmptyState
                isOver={false}
                onAddWelcomeBlock={addWelcomeBlock}
                onShowTemplates={() => toast.info('Templates coming soon!')}
                onDrop={handleDrop}
              />
            ) : (
              <CanvasPreview
                blocks={builderState.blocks}
                onDrop={handleDrop}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onStructureConfirmed={handleStructureConfirmed}
                onGenerateSkeleton={handleGenerateSkeleton}
              />
            )}
          </motion.div>
        </div>

        {/* Toolbox Sidebar */}
        {showToolbox && (
          <aside className="w-64 bg-[#f9f4da] border-l shadow-inner overflow-y-auto">
            <ComponentToolbox />
          </aside>
        )}
      </main>

      {/* Modals */}
      <ValidationModal
        open={showValidation}
        onClose={() => setShowValidation(false)}
        errors={validationErrors}
        blocks={builderState.blocks}
        title={builderState.title}
        description={builderState.description}
        onFixError={handleFixValidationError}
        onUpdateTitle={handleUpdateTitle}
        onUpdateDescription={handleUpdateDescription}
        onUpdateBlock={handleUpdateBlock}
        onPublishAnyway={handlePublishWithValidation}
        isPublishing={isPublishing}
        canPublishWithErrors={true}
      />

      <ShortcutsModal
        open={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />

      <SettingsModal
        open={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        settings={settings}
        onUpdateSettings={(updatedSettings: Partial<BuilderSettings>) => {
          setSettings((prev: BuilderSettings) => ({ ...prev, ...updatedSettings }));
          if (updatedSettings.title !== undefined) {
            updateBuilderState({ title: updatedSettings.title });
          }
          if (updatedSettings.description !== undefined) {
            updateBuilderState({ description: updatedSettings.description });
          }
          if (updatedSettings.showGrid !== undefined) setShowGrid(updatedSettings.showGrid);
          if (updatedSettings.showToolbox !== undefined) setShowToolbox(updatedSettings.showToolbox);
        }}
      />

      {/* ✅ Dashboard Modal */}
      <DashboardModal
        open={showDashboard}
        onClose={handleCloseDashboard}
        onEditStrandhoot={handleEditFromDashboard}
        onCreateNew={handleCreateNewFromDashboard}
        userId={getCurrentUserId()}
      />

      {/* ✅ Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleAuthModalClose}
        onSuccess={handleAuthSuccess}
      />

      {/* Grid overlay */}
      {showGrid && (
        <div
          className="fixed inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      )}

      {/* Debug Info Panel (Development) - ENHANCED WITH AUTH INFO */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-3 rounded text-xs max-w-sm opacity-90 hover:opacity-100 transition-opacity z-50">
          <div className="font-bold mb-2 text-green-400">🔧 Live Debug Info</div>
          <div className="space-y-1">
            <div>🆔 ID: {builderState.currentId || '❌ None'}</div>
            <div>📝 Title: {builderState.title || '❌ None'}</div>
            <div>🧱 Blocks: {builderState.blocks.length}</div>
            <div>💾 Unsaved: {builderState.unsavedChanges ? '⚠️ Yes' : '✅ No'}</div>
            <div>⏳ Saving: {isSaving ? '🔄 Yes' : '✅ No'}</div>
            <div>🚀 Publishing: {isPublishing ? '🔄 Yes' : '✅ No'}</div>
            <div>📅 Last Saved: {builderState.lastSaved?.toLocaleTimeString() || '❌ Never'}</div>
            <div>🌍 Published: {builderState.isPublished ? '✅ Yes' : '🔒 No'}</div>
            <div>🔗 URL: {window.location.search || '❌ None'}</div>
          </div>
          
          {/* ✅ Enhanced auth info section */}
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className="text-cyan-400 font-bold">Auth Status:</div>
            <div>🔐 Supabase: {supabaseUser ? '✅' : '❌'}</div>
            <div>👤 Context: {isAuthenticated ? '✅' : '❌'}</div>
            <div>🔓 Modal: {showAuthModal ? '📂' : '📁'}</div>
            <div>✅ Check: {authCheckComplete ? '✅' : '🔄'}</div>
            <div>⏳ Loading: {(authLoading || userLoading) ? '🔄' : '✅'}</div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className="text-yellow-400 font-bold">User Info:</div>
            <div>👤 ID: {getCurrentUserId()?.slice(0, 8) || '❌'}...</div>
            <div>📧 Email: {(supabaseUser?.email || userEmail)?.slice(0, 10) || '❌'}...</div>
            <div>🎭 Role: {supabaseRole || userRole || '❌'}</div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className="text-yellow-400 font-bold">Hook Status:</div>
            <div>loadStrandhoot: {typeof loadStrandhoot}</div>
            <div>handleSave: {typeof handleSave}</div>
            <div>updateBuilderState: {typeof updateBuilderState}</div>
          </div>
          
          {Object.keys(debugInfo).length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-600">
              <div className="text-blue-400 font-bold">Debug Results:</div>
              <div className="text-xs">
                {debugInfo.supabaseConnected && '✅ DB Connected'}
                {debugInfo.loadedSuccessfully && ' | ✅ Loaded'}
                {debugInfo.supabaseError && ' | ❌ DB Error'}
                {debugInfo.loadError && ' | ❌ Load Error'}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Additional Features */}
      
      {/* Auto-save indicator */}
      {settings.autoSave && builderState.unsavedChanges && (
        <div className="fixed top-20 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs animate-pulse z-40">
          💾 Auto-saving...
        </div>
      )}

      {/* Block count indicator */}
      {builderState.blocks.length > 0 && (
        <div className="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs shadow-lg z-40">
          <div className="flex items-center gap-2">
            <span className="font-medium">📊 Blocks:</span>
            <span className="font-bold text-blue-600">{builderState.blocks.length}</span>
            {builderState.blocks.filter(b => b.type === 'welcome').length > 0 && (
              <span className="text-orange-600">👋</span>
            )}
            {builderState.blocks.filter(b => b.type === 'strand').length > 0 && (
              <span className="text-purple-600">🧬×{builderState.blocks.filter(b => b.type === 'strand').length}</span>
            )}
            {builderState.blocks.filter(b => ['mcq', 'short', 'extended', 'fill'].includes(b.type)).length > 0 && (
              <span className="text-green-600">❓×{builderState.blocks.filter(b => ['mcq', 'short', 'extended', 'fill'].includes(b.type)).length}</span>
            )}
          </div>
        </div>
      )}

      {/* Keyboard shortcuts hint */}
      {builderState.blocks.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <button
            onClick={() => setShowShortcutsModal(true)}
            className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs hover:bg-gray-700 transition-colors"
          >
            ⌨️ Shortcuts (?)
          </button>
        </div>
      )}

      {/* Connection status indicator */}
      {debugInfo.supabaseConnected !== undefined && (
        <div className="fixed top-20 left-4 z-40">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            debugInfo.supabaseConnected 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {debugInfo.supabaseConnected ? '🟢 Online' : '🔴 Offline'}
          </div>
        </div>
      )}

      {/* ✅ Enhanced User status indicator */}
      <div className="fixed top-20 left-20 z-40">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          (supabaseUser || isAuthenticated)
            ? 'bg-blue-100 text-blue-800 border border-blue-300' 
            : 'bg-gray-100 text-gray-800 border border-gray-300'
        }`}>
          👤 {supabaseUser ? 'Supabase' : isAuthenticated ? 'Context' : 'Guest'}
        </div>
      </div>

      {/* Version info */}
      <div className="fixed bottom-1 right-1 text-xs text-gray-400 z-30">
        v2.3.0-complete-auth
      </div>
    </div>
  );
}