'use client';

import dynamic from 'next/dynamic';
import { DragDropProvider } from './context/DragDropContext';
// ❌ REMOVED: DndProviderClient - this was blocking the inner DndProvider
// import DndProviderClient from '@/app/components/providers/DndProviderClient';

// Dynamically import the builder page to avoid SSR issues
const StrandhootBuilderPage = dynamic(
  () => import('./StrandhootBuilderPage'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#fdf8e6] flex items-center justify-center">
        <div className="text-lg">Loading Builder...</div>
      </div>
    )
  }
);

export default function StrandhootBuilderRoute() {
  return (
    // ✅ FIXED: Only use DragDropProvider, let StrandhootBuilderPage handle React DnD
    <DragDropProvider>
      <StrandhootBuilderPage />
    </DragDropProvider>
  );
}