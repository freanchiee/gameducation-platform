'use client';

import { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface BuilderLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  showSidebar?: boolean;
  sidebarWidth?: number;
  className?: string;
}

export default function BuilderLayout({
  children,
  sidebar,
  showSidebar = true,
  sidebarWidth = 280,
  className = '',
}: BuilderLayoutProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen bg-[#fdf8e6] flex flex-col text-zinc-800 font-sans ${className}`}>
        {/* Main Builder Layout */}
        <main className="flex flex-1 overflow-hidden">
          {/* Builder Canvas */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>

          {/* Toolbox Sidebar */}
          {showSidebar && sidebar && (
            <aside 
              className="bg-[#f9f4da] border-l shadow-inner overflow-y-auto"
              style={{ width: sidebarWidth }}
            >
              {sidebar}
            </aside>
          )}
        </main>
      </div>
    </DndProvider>
  );
}