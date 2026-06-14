'use client';

import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';

interface StrandhootBuilderContextType {
  content: Record<string, any>;
  setContentValue: (key: string, value: any) => void;
  updateField: (field: string, value: unknown) => void;
  readyToBuild: boolean;
  selectedStructure: {
    subject: string;
    criteria: string;
    mypYear: string;
  } | null;
}

const StrandhootBuilderContext = createContext<StrandhootBuilderContextType | undefined>(undefined);

interface Props {
  initialContent: Record<string, unknown>;
  onContentChange: (updated: Record<string, unknown>) => void;
  children: ReactNode;
}

export function StrandhootBuilderProvider({ initialContent, onContentChange, children }: Props) {
  const [content, setContent] = useState<Record<string, any>>(initialContent);
  const [readyToBuild, setReadyToBuild] = useState(false);

  // Memoize selectedStructure to prevent unnecessary re-renders
  const selectedStructure = useMemo(() => {
    const isValidString = (value: unknown) => typeof value === 'string' && value.trim().length > 0;
    
    if (
      isValidString(content.subject) &&
      isValidString(content.criteria) &&
      isValidString(content.myp_year)
    ) {
      return {
        subject: content.subject,
        criteria: content.criteria,
        mypYear: content.myp_year,
      };
    }
    return null;
  }, [content.subject, content.criteria, content.myp_year]);

  // Update readyToBuild state when selectedStructure changes
  useEffect(() => {
    const newReadyState = selectedStructure !== null;
    if (newReadyState !== readyToBuild) {
      setReadyToBuild(newReadyState);
    }
  }, [selectedStructure, readyToBuild]);

  const setContentValue = useCallback((key: string, value: any) => {
    setContent(prev => {
      const updated = { ...prev, [key]: value };
      onContentChange(updated);
      return updated;
    });
  }, [onContentChange]);

  const updateField = useCallback((field: string, value: unknown) => {
    setContent(prev => {
      const updated = { ...prev, [field]: value };
      onContentChange(updated);
      return updated;
    });
  }, [onContentChange]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    content,
    setContentValue,
    updateField,
    readyToBuild,
    selectedStructure,
  }), [content, setContentValue, updateField, readyToBuild, selectedStructure]);

  return (
    <StrandhootBuilderContext.Provider value={contextValue}>
      {children}
    </StrandhootBuilderContext.Provider>
  );
}

export function useStrandhootBuilderContext(): StrandhootBuilderContextType {
  const context = useContext(StrandhootBuilderContext);
  if (!context) {
    throw new Error('useStrandhootBuilderContext must be used within a StrandhootBuilderProvider');
  }
  return context;
}