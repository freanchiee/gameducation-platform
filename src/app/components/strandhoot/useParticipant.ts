import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';

export function useParticipant(sessionCode: string) {
  const [hasJoined, setHasJoined] = useState(false);

  // 🎯 Join logic
  const joinSession = async (name: string, avatar_svg: string) => {
    let student_id = localStorage.getItem('student_id');
    if (!student_id) {
      student_id = uuidv4();
      localStorage.setItem('student_id', student_id);
    }

    // strandhoot_participants PK is (session_code, student_id) — upsert merges.
    const { error } = await supabase.from('strandhoot_participants').upsert(
      {
        student_id,
        session_code: sessionCode,
        player_name: name,
        avatar_svg,
        role: 'student',
        joined_at: new Date().toISOString(),
      },
      { onConflict: 'session_code,student_id' },
    );

    if (!error) {
      console.log(`✅ Joined session ${sessionCode} as ${name}`);
      setHasJoined(true);
    } else {
      console.error('❌ Error joining session:', error.message);
    }
  };

  return {
    joinSession,
    hasJoined,
  };
}
