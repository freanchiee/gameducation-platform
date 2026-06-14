'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import type { BlockType } from '@/app/strandhoot-builder/types/strandhoot';

interface StrandhootTemplate {
  id: string;
  title: string;
  description: string;
  criteria: string;
  subject: string;
  myp_year: string;
  context: Record<string, any>;
  is_public: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface PreviewSession {
  sessionCode: string;
  studentId: string;
  currentStrand: number;
  strandProgress: number[];
  userInputs: Record<string, Record<string, string>>;
  completedStrands: boolean[];
  startedAt: string;
}

interface PreviewContextType {
  strandhoot: StrandhootTemplate;
  session: PreviewSession;
  blocks: BlockType[];
  currentStrand: number;
  canNavigateToStrand: (strandIndex: number) => boolean;
  navigateToStrand: (strandIndex: number) => void;
  updateStrandProgress: (strandIndex: number, level: number) => void;
  updateUserInput: (strandKey: string, inputKey: string, value: string) => void;
  getUserInput: (strandKey: string, inputKey: string) => string;
  markStrandCompleted: (strandIndex: number) => void;
  resetSession: () => void;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

interface PreviewProviderProps {
  children: ReactNode;
  strandhootId: string;
  userId: string;
  strandhootData: StrandhootTemplate;
}

export default function PreviewProvider({ 
  children, 
  strandhootId, 
  userId, 
  strandhootData 
}: PreviewProviderProps) {
  const [session, setSession] = useState<PreviewSession | null>(null);
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const getStorageKey = () => `preview-session-${userId}-${strandhootId}`;

  // ✅ Create session function with proper dependency on blocks
  const createNewSession = useCallback((currentBlocks: BlockType[]) => {
    console.log('🆕 Creating new preview session with blocks:', currentBlocks.length);
    
    const strandBlocks = currentBlocks.filter(block => block.type === 'strand');
    const strandCount = strandBlocks.length || 3; // Default to 3 if no strands found
    
    console.log('📊 Strand count for new session:', strandCount);

    const newSession: PreviewSession = {
      sessionCode: `preview-${userId}-${strandhootId}`,
      studentId: `preview-student-${userId}`,
      currentStrand: 0, // Start with welcome block (strand 0)
      strandProgress: new Array(strandCount).fill(0),
      userInputs: {},
      completedStrands: new Array(strandCount).fill(false),
      startedAt: new Date().toISOString(),
    };

    // Initialize user inputs for each strand
    for (let i = 1; i <= strandCount; i++) {
      newSession.userInputs[`strand${i}`] = {
        level2: '',
        level4: '',
        level6: '',
        level8: '',
      };
    }

    console.log('✅ Created new session:', newSession);
    setSession(newSession);
    setIsInitialized(true);
  }, [userId, strandhootId]);

  // ✅ Load blocks first, then initialize session
  useEffect(() => {
    console.log('🔄 PreviewProvider initializing...');
    console.log('📦 Strandhoot data:', strandhootData);
    
    // Load blocks from strandhoot context
    let loadedBlocks: BlockType[] = [];
    
    if (strandhootData.context?.blocks && Array.isArray(strandhootData.context.blocks)) {
      loadedBlocks = strandhootData.context.blocks;
      console.log('✅ Loaded blocks from strandhoot context:', loadedBlocks.length);
    } else {
      console.log('⚠️ No blocks found in strandhoot context, creating empty array');
      loadedBlocks = [];
    }
    
    setBlocks(loadedBlocks);

    // Now initialize session with the loaded blocks
    const storageKey = getStorageKey();
    const savedSession = localStorage.getItem(storageKey);

    if (savedSession) {
      try {
        const parsedSession = JSON.parse(savedSession) as PreviewSession;
        console.log('💾 Found saved session:', parsedSession);
        
        // Validate session has proper structure
        if (parsedSession.sessionCode && Array.isArray(parsedSession.strandProgress)) {
          setSession(parsedSession);
          setIsInitialized(true);
          return;
        } else {
          console.log('⚠️ Saved session invalid, creating new one');
        }
      } catch (error) {
        console.error('❌ Failed to parse saved session:', error);
      }
    }

    // Create new session with loaded blocks
    createNewSession(loadedBlocks);
  }, [strandhootData, createNewSession, getStorageKey]);

  // ✅ Save session to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (session && isInitialized) {
      const storageKey = getStorageKey();
      try {
        localStorage.setItem(storageKey, JSON.stringify(session));
        console.log('💾 Saved session to localStorage');
      } catch (error) {
        console.error('❌ Failed to save session:', error);
      }
    }
  }, [session, isInitialized, getStorageKey]);

  const canNavigateToStrand = (strandIndex: number) => {
    if (!session) return false;
    
    // Can always go to welcome (strand 0)
    if (strandIndex === 0) return true;
    
    // Can navigate to a strand if it's the current one or previous strands are completed
    return strandIndex <= session.currentStrand || 
           (strandIndex > 0 && session.completedStrands[strandIndex - 1]);
  };

  const navigateToStrand = (strandIndex: number) => {
    if (!session || !canNavigateToStrand(strandIndex)) {
      console.log('❌ Cannot navigate to strand:', strandIndex);
      return;
    }
    
    console.log('🧭 Navigating to strand:', strandIndex);
    setSession(prev => prev ? {
      ...prev,
      currentStrand: strandIndex
    } : null);
  };

  const updateStrandProgress = (strandIndex: number, level: number) => {
    if (!session || strandIndex < 0 || strandIndex >= session.strandProgress.length) {
      console.log('❌ Cannot update strand progress:', { strandIndex, level });
      return;
    }
    
    console.log('📈 Updating strand progress:', { strandIndex, level });
    setSession(prev => {
      if (!prev) return null;
      
      const newProgress = [...prev.strandProgress];
      newProgress[strandIndex] = Math.max(0, Math.min(8, level)); // Clamp between 0-8
      
      return {
        ...prev,
        strandProgress: newProgress
      };
    });
  };

  const updateUserInput = (strandKey: string, inputKey: string, value: string) => {
    if (!session) return;
    
    console.log('✏️ Updating user input:', { strandKey, inputKey, valueLength: value.length });
    setSession(prev => {
      if (!prev) return null;
      
      const newUserInputs = {
        ...prev.userInputs,
        [strandKey]: {
          ...prev.userInputs[strandKey],
          [inputKey]: value
        }
      };
      
      return {
        ...prev,
        userInputs: newUserInputs
      };
    });
  };

  const getUserInput = (strandKey: string, inputKey: string): string => {
    if (!session) return '';
    return session.userInputs[strandKey]?.[inputKey] || '';
  };

  const markStrandCompleted = (strandIndex: number) => {
    if (!session || strandIndex < 0 || strandIndex >= session.completedStrands.length) {
      console.log('❌ Cannot mark strand completed:', strandIndex);
      return;
    }
    
    console.log('✅ Marking strand completed:', strandIndex);
    setSession(prev => {
      if (!prev) return null;
      
      const newCompletedStrands = [...prev.completedStrands];
      newCompletedStrands[strandIndex] = true;
      
      // Auto-advance to next strand if not at the end
      const nextStrand = strandIndex + 1;
      const shouldAdvance = nextStrand < prev.strandProgress.length;
      
      return {
        ...prev,
        completedStrands: newCompletedStrands,
        currentStrand: shouldAdvance ? Math.max(prev.currentStrand, nextStrand) : prev.currentStrand
      };
    });
  };

  const resetSession = () => {
    console.log('🔄 Resetting preview session');
    try {
      const storageKey = getStorageKey();
      localStorage.removeItem(storageKey);
      createNewSession(blocks);
    } catch (error) {
      console.error('❌ Failed to reset session:', error);
    }
  };

  // ✅ Show loading until session is properly initialized
  if (!session || !isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing preview session...</p>
          <p className="text-gray-400 text-sm mt-2">
            Blocks: {blocks.length} | Session: {session ? 'Created' : 'Creating'}
          </p>
        </div>
      </div>
    );
  }

  const contextValue: PreviewContextType = {
    strandhoot: strandhootData,
    session,
    blocks,
    currentStrand: session.currentStrand,
    canNavigateToStrand,
    navigateToStrand,
    updateStrandProgress,
    updateUserInput,
    getUserInput,
    markStrandCompleted,
    resetSession,
  };

  return (
    <PreviewContext.Provider value={contextValue}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreviewContext(): PreviewContextType {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error('usePreviewContext must be used within a PreviewProvider');
  }
  return context;
}