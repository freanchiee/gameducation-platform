// src/app/strandhoot-builder/context/DragDropContext.tsx
'use client';

import React, { createContext, useContext, useRef, useCallback, ReactNode, useState } from 'react';
import type { BlockType } from '@/app/strandhoot-builder/types/strandhoot';

interface DragState {
  isDragging: boolean;
  draggedBlock: BlockType | null;
  dragSource: 'toolbox' | 'canvas' | 'strand' | null;
  dragType: 'react-dnd' | 'html5' | null;
  dropTarget: 'canvas' | 'strand' | null;
  strandId: string | null;
  tabId: string | null;
}

interface DragDropContextType {
  dragState: DragState;
  startDrag: (block: BlockType, source: 'toolbox' | 'canvas' | 'strand', type: 'react-dnd' | 'html5') => void;
  setDropTarget: (target: 'canvas' | 'strand', strandId?: string, tabId?: string) => void;
  clearDropTarget: () => void;
  completeDrop: () => void;
  shouldStrandHandleDrop: (strandId: string) => boolean;
  getDropData: () => BlockType | null;
  setHTML5DragData: (block: BlockType) => void;
  getHTML5DragData: () => BlockType | null;
}

const DragDropContext = createContext<DragDropContextType | undefined>(undefined);

export function DragDropProvider({ children }: { children: ReactNode }) {
  // ✅ Use useState for reactive updates
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedBlock: null,
    dragSource: null,
    dragType: null,
    dropTarget: null,
    strandId: null,
    tabId: null,
  });

  // Keep refs for immediate access
  const html5DragData = useRef<BlockType | null>(null);

  const startDrag = useCallback((block: BlockType, source: 'toolbox' | 'canvas' | 'strand', type: 'react-dnd' | 'html5') => {
    console.log('🎯 DragDropContext: Start drag', {
      block: block.type,
      source,
      type,
      id: block.id.slice(-8)
    });
    
    setDragState({
      isDragging: true,
      draggedBlock: block,
      dragSource: source,
      dragType: type,
      dropTarget: null, // Clear previous drop target
      strandId: null,
      tabId: null,
    });
  }, []);

  const setDropTarget = useCallback((target: 'canvas' | 'strand', strandId?: string, tabId?: string) => {
    setDragState(prev => {
      const newStrandId = strandId || null;
      const newTabId = tabId || null;
      
      // Only update if values actually changed to prevent infinite loops
      if (
        prev.dropTarget === target && 
        prev.strandId === newStrandId && 
        prev.tabId === newTabId
      ) {
        return prev; // No change, return same state
      }
      
      console.log('🎯 DragDropContext: Setting drop target', {
        target,
        strandId: newStrandId?.slice(-8) || null,
        tabId: newTabId?.slice(-8) || null,
        previousTarget: prev.dropTarget,
        previousStrandId: prev.strandId?.slice(-8) || null
      });
      
      return {
        ...prev,
        dropTarget: target,
        strandId: newStrandId,
        tabId: newTabId,
      };
    });
  }, []);

  const clearDropTarget = useCallback((force = false) => {
    setDragState(prev => {
      // Only clear if not currently dragging, or if forced
      if ((prev.dropTarget !== null) && (!prev.isDragging || force)) {
        console.log('🎯 DragDropContext: Clearing drop target', {
          previousTarget: prev.dropTarget,
          previousStrandId: prev.strandId?.slice(-8) || null,
          isDragging: prev.isDragging,
          forced: force
        });
        return {
          ...prev,
          dropTarget: null,
          strandId: null,
          tabId: null,
        };
      }
      return prev;
    });
  }, []);

  const completeDrop = useCallback(() => {
    console.log('🎯 DragDropContext: Complete drop', {
      wasDragging: dragState.isDragging,
      draggedBlock: dragState.draggedBlock?.type,
      dropTarget: dragState.dropTarget,
      strandId: dragState.strandId?.slice(-8) || null,
      tabId: dragState.tabId?.slice(-8) || null
    });
    
    if (dragState.isDragging) {
      // Reset all drag state
      setDragState({
        isDragging: false,
        draggedBlock: null,
        dragSource: null,
        dragType: null,
        dropTarget: null,
        strandId: null,
        tabId: null,
      });
      
      html5DragData.current = null;
      
      console.log('✅ DragDropContext: Drop completed and state reset');
    } else {
      console.warn('⚠️ DragDropContext: Complete drop called but not dragging');
    }
  }, [dragState]);

  // ✅ SIMPLIFIED: shouldStrandHandleDrop logic
  const shouldStrandHandleDrop = useCallback((strandId: string) => {
    const should = 
      dragState.isDragging && 
      dragState.dropTarget === 'strand' && 
      (dragState.strandId === strandId || dragState.strandId === null);
    
    console.log('🤔 DragDropContext: Should strand handle drop?', {
      should,
      strandId: strandId.slice(-8),
      dragState: {
        isDragging: dragState.isDragging,
        dropTarget: dragState.dropTarget,
        targetStrandId: dragState.strandId?.slice(-8) || null,
        match: dragState.strandId === strandId,
        isNull: dragState.strandId === null
      }
    });
    
    return should;
  }, [dragState]);

  const getDropData = useCallback(() => {
    return dragState.draggedBlock;
  }, [dragState.draggedBlock]);

  const setHTML5DragData = useCallback((block: BlockType) => {
    html5DragData.current = block;
    console.log('🎯 DragDropContext: Set HTML5 drag data', block.type);
  }, []);

  const getHTML5DragData = useCallback(() => {
    return html5DragData.current;
  }, []);

  const contextValue: DragDropContextType = {
    dragState,
    startDrag,
    setDropTarget,
    clearDropTarget,
    completeDrop,
    shouldStrandHandleDrop,
    getDropData,
    setHTML5DragData,
    getHTML5DragData,
  };

  return (
    <DragDropContext.Provider value={contextValue}>
      {/* Debug info overlay in development */}
      {process.env.NODE_ENV === 'development' && dragState.isDragging && (
        <div className="fixed top-4 right-4 z-50 bg-black bg-opacity-80 text-white p-3 rounded-lg text-xs font-mono">
          <div className="font-bold mb-2">🎯 Drag Debug</div>
          <div>Block: {dragState.draggedBlock?.type}</div>
          <div>Source: {dragState.dragSource}</div>
          <div>Type: {dragState.dragType}</div>
          <div>Target: {dragState.dropTarget || 'None'}</div>
          <div>Strand: {dragState.strandId?.slice(-8) || 'None'}</div>
          <div>Tab: {dragState.tabId?.slice(-8) || 'None'}</div>
        </div>
      )}
      {children}
    </DragDropContext.Provider>
  );
}

export function useDragDrop() {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider');
  }
  return context;
}