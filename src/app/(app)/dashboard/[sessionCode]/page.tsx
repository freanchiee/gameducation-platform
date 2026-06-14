'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import useSessionData from './useSessionData'; // ✅ Corrected import
import LiveStrandhootTable from './LiveStrandhootTable';
import StrandPreviewPanel from './StrandPreviewPanel';
import { FiMenu } from 'react-icons/fi';
import DashboardNav from '@/app/components/DashboardNav';
import LiveDashboardSidebar from './LiveDashboardSidebar';

export default function LiveSessionDashboard() {
  const { sessionCode } = useParams();
  const [selected, setSelected] = useState<{ studentId: string; strand: number } | null>(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { responses } = useSessionData(sessionCode as string);

 
  return (
    <div className="min-h-screen bg-[#fffde7] flex flex-col">
      <DashboardNav />

      <div className="flex flex-1 h-[calc(100vh-64px)]">
        <LiveDashboardSidebar />

        <button
          className="md:hidden fixed top-[72px] left-4 z-50 bg-white p-2 rounded shadow"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>

        <main className="flex-1 px-6 py-8 overflow-y-auto transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#1f3674] flex items-center gap-2">
              📊 Live Session Dashboard
            </h1>
            <button
              onClick={() => setShowCodeModal(true)}
              className="bg-white px-4 py-2 rounded shadow text-[#1f3674] border font-mono hover:bg-yellow-100 transition"
            >
              {sessionCode}
              <span className="ml-2">🔍</span>
            </button>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-6 items-start">
            <LiveStrandhootTable
              responses={responses}
              onStrandClick={(studentId, strand) => setSelected({ studentId, strand })}
            />
            {selected && (
              <StrandPreviewPanel
                studentId={selected.studentId}
                strand={selected.strand}
                responses={responses}
              />
            )}
          </div>
        </main>
      </div>

      {showCodeModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-50"
            onClick={() => setShowCodeModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white px-8 py-6 rounded-lg shadow-lg border text-center space-y-4">
              <h2 className="text-xl font-bold text-[#1f3674]">🔑 Join Code</h2>
              <p className="text-4xl font-mono bg-yellow-100 px-6 py-3 rounded text-[#c3282d] shadow">
                {sessionCode}
              </p>
              <button
                className="mt-2 text-sm text-blue-600 underline"
                onClick={() => setShowCodeModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
