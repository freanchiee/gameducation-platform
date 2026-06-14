// src/contexts/SidebarContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed') === 'true';
    setCollapsed(stored);
  }, []);

  const update = (val: boolean) => {
    localStorage.setItem('sidebar-collapsed', String(val));
    setCollapsed(val);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed: update }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used inside SidebarProvider');
  return ctx;
};
