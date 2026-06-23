'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { motion, AnimatePresence } from 'framer-motion';

type Participant = {
  student_id: string;
  player_name: string;
  avatar_svg?: string;
  role?: string;
};

type Props = {
  sessionCode: string;
};

export default function ParticipantList({ sessionCode }: Props) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const { data } = await supabase
        .from('strandhoot_participants')
        .select('*')
        .eq('session_code', sessionCode)
        .order('joined_at', { ascending: true }); // optional: sort by join time

      if (data) setParticipants(data.filter((p) => p.role !== 'teacher'));
    };

    // 🧨 Nuclear Option: poll every 2 seconds
    fetchParticipants(); // initial load
    const interval = setInterval(fetchParticipants, 2000);

    return () => clearInterval(interval);
  }, [sessionCode]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
      <AnimatePresence>
        {participants.map((p) => (
          <motion.div
            key={p.student_id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-3 flex flex-col items-center justify-center border border-gray-300"
          >
            <div
              className="w-14 h-14 mb-2 rounded-full overflow-hidden"
              dangerouslySetInnerHTML={{ __html: p.avatar_svg || '👤' }}
            />
            <p className="text-sm font-semibold text-[#1f3674] text-center">
              {p.player_name || 'Player'}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
