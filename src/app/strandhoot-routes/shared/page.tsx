'use client';

import { useEffect, useState } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import { useAuth } from '@/contexts/AuthContext';
import DashboardNav from '@/app/components/DashboardNav';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import { supabase } from '@/utils/supabase';
import StrandhootSnapshot from './StrandhootSnapshot';
import { CalendarDays, Code2, FileText } from 'lucide-react';

interface SessionRow {
  id: string;
  strandhoot_title: string | null;
  session_code: string;
  created_at: string;
}

export default function StrandhootsSharedPage() {
  const { user } = useAuth();
  const { collapsed } = useSidebar();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('sessions')
        .select('id, strandhoot_title, session_code, created_at')
        .eq('created_by', user.id);

      if (!error && data) {
        const sorted = data.sort((a, b) =>
          sortAsc
            ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setSessions(sorted);
      }

      setLoading(false);
    };

    fetchSessions();
  }, [user?.id, sortAsc]);

  const toggleRow = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#fffde7] flex flex-col">
      <DashboardNav />

      <div className="flex flex-1 h-[calc(100vh-64px)]">
        <DashboardSidebar />

        <main
          className="flex-1 px-6 py-8 overflow-y-auto transition-all duration-300"
          style={{ marginLeft: collapsed ? '6px' : '6px' }}
        >
          <h1 className="text-2xl font-bold text-[#1f3674] mb-6 flex items-center gap-2">
            📚 Strandhoots Shared
          </h1>

          {loading ? (
            <p className="text-sm text-gray-600">Loading sessions...</p>
          ) : sessions.length === 0 ? (
            <p className="text-sm text-gray-500">You haven’t shared any Strandhoots yet.</p>
          ) : (
            <div className="rounded-lg overflow-hidden shadow-sm border bg-white">
              {/* Table Header */}
              <div className="grid grid-cols-3 text-sm font-semibold text-[#1f3674] bg-[#e0f2f1] px-4 py-2">
                <span className="flex items-center gap-1">
                  <FileText size={16} /> Title
                </span>
                <span className="flex items-center gap-1">
                  <Code2 size={16} /> Code
                </span>
                <button
                  onClick={() => setSortAsc((prev) => !prev)}
                  className="flex items-center gap-1 hover:underline"
                >
                  <CalendarDays size={16} />
                  Date {sortAsc ? '▲' : '▼'}
                </button>
              </div>

              {/* Table Rows */}
              {sessions.map((session) => (
                <div key={session.id} className="hover:bg-[#fdfae6] transition">
                  <button
                    type="button"
                    className="grid grid-cols-3 text-sm px-4 py-2 w-full text-left border-t border-[#fffde7]"
                    onClick={() => toggleRow(session.id)}
                  >
                    <span className="font-medium">{session.strandhoot_title || 'Untitled'}</span>
                    <span className="text-blue-700 font-mono">{session.session_code}</span>
                    <span>{new Date(session.created_at).toLocaleDateString()}</span>
                  </button>

                  {/* Expand Snapshot */}
                  {expandedRow === session.id && (
                    <div className="bg-[#fdfde7] px-6 py-4 border-t border-[#fffde7]">
                      <StrandhootSnapshot sessionCode={session.session_code} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
