'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthContext';
import FilterTrigger from './FilterTrigger';
import RadialFilter from './RadialFilter';

type Strandhoot = {
  slug: string;
  name: string;
  subject?: string;
  description?: string;
  url: string;
  thumbnail?: string;
};

type StrandhootModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function StrandhootModal({ isOpen, onClose }: StrandhootModalProps) {
  const [search, setSearch] = useState('');
  const [showWheel, setShowWheel] = useState(false);
  const [strandhoots, setStrandhoots] = useState<Strandhoot[]>([]);
  const [launchingSlug, setLaunchingSlug] = useState<string | null>(null);

  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const fetchStrandhoots = async () => {
      const { data, error } = await supabase.from('strandhoots').select('*');
      if (error) console.error('❌ Failed to load strandhoots:', error.message);
      if (data) setStrandhoots(data);
    };
    fetchStrandhoots();
  }, []);

  const launchStrandhootSession = async (strandhoot: Strandhoot) => {
    // Block launch if auth is still loading or user is not ready
    if (isLoading) {
      console.log('⏳ Waiting for user session...');
      return;
    }

    if (!user) {
      console.warn('⚠️ No user found — session launch blocked');
      return;
    }

    setLaunchingSlug(strandhoot.slug);
    const sessionCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    try {
      const { error } = await supabase.from('strandhoot_sessions').insert({
        session_code: sessionCode,
        strandhoot: strandhoot.slug,
        strandhoot_title: strandhoot.name,
        created_by: user.id,
        status: 'lobby',
      });

      if (error) {
        console.error('❌ Error creating session:', error.message);
        return;
      }

      onClose();
      router.push(`/lobby/${sessionCode}`);
    } catch (err) {
      console.error('❌ Failed to launch session:', err);
    }
  };

  const filtered = strandhoots.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-[90%] max-w-[1100px] h-[90vh] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-bold">🎯 Choose a Strandhoot</h2>
              <button onClick={onClose} className="text-2xl">×</button>
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-4 px-6 pt-4">
              <input
                type="text"
                placeholder="Search Strandhoots..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow px-4 py-2 border rounded"
              />
              <FilterTrigger onOpen={() => setShowWheel(true)} />
            </div>

            <RadialFilter
              isOpen={showWheel}
              onClose={() => setShowWheel(false)}
              onApplyFilters={() => setShowWheel(false)}
            />

            {/* Cards */}
            <div className="flex-1 overflow-y-auto p-6 grid md:grid-cols-2 gap-6">
              {isLoading ? (
                <div className="col-span-2 text-center text-sm text-gray-500">
                  Loading your session...
                </div>
              ) : (
                filtered.map((s) => (
                  <div
                    key={s.slug}
                    onClick={() => !isLoading && user && launchStrandhootSession(s)}
                    className={`cursor-pointer transition border rounded-xl p-4 shadow-sm hover:shadow-md ${
                      launchingSlug === s.slug ? 'bg-yellow-100' : 'bg-white'
                    }`}
                  >
                    <h3 className="text-lg font-bold text-[#1f3674] mb-1">{s.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">📘 {s.subject || 'Unknown'}</p>
                    <p className="text-xs text-gray-400 italic">
                      {launchingSlug === s.slug ? 'Creating session...' : 'Click to launch'}
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
