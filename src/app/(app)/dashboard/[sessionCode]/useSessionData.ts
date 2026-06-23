'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import type { ResponseRecord } from '@/app/strandhoot-builder/types/strandhoot';

// Live session feed for the teacher dashboard. `responses` has no FK to
// participants on student_id, so we can't use a PostgREST embed — instead we
// fetch both tables and merge by student_id. Every student who has joined shows
// up (even before they answer), with their chosen name + avatar. Updates arrive
// via Supabase Realtime, with a polling fallback in case Realtime isn't enabled.
export default function useSessionData(sessionCode: string) {
  const [responses, setResponses] = useState<ResponseRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    const [participantsRes, responsesRes] = await Promise.all([
      supabase.from('strandhoot_participants').select('*').eq('session_code', sessionCode),
      supabase.from('responses').select('*').eq('session_code', sessionCode),
    ]);

    if (responsesRes.error) {
      console.error('❌ Supabase fetch error:', responsesRes.error.message);
      setError(responsesRes.error.message);
      setLoading(false);
      return;
    }

    const participants = (participantsRes.data ?? []).filter((p) => p.role !== 'teacher');
    const byStudent = new Map<string, Record<string, unknown>>();
    for (const r of responsesRes.data ?? []) byStudent.set(r.student_id as string, r);

    // One row per joined student, merged with their response (if any).
    const rows: ResponseRecord[] = participants.map((p) => {
      const r = byStudent.get(p.student_id) ?? {};
      byStudent.delete(p.student_id);
      return {
        ...r, // strand levels + text (if a response exists)
        id: (r.id as string) ?? p.student_id,
        session_code: sessionCode,
        student_id: p.student_id,
        player_name: p.player_name ?? (r.player_name as string) ?? 'Player',
        is_typing: (r.is_typing as boolean) ?? false,
        participants: { avatar_svg: p.avatar_svg ?? undefined },
      } as unknown as ResponseRecord;
    });

    // Any responses from non-participants (e.g. solo) still get a row.
    for (const r of byStudent.values()) {
      rows.push({ ...(r as ResponseRecord), participants: { avatar_svg: undefined } });
    }

    setResponses(rows);
    setError(null);
    setLoading(false);
  }, [sessionCode]);

  useEffect(() => {
    if (!sessionCode) return;
    fetchData();

    // Realtime: refetch on any change to this session's responses/participants.
    const channel = supabase
      .channel(`session-${sessionCode}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'responses', filter: `session_code=eq.${sessionCode}` }, () => fetchData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'strandhoot_participants', filter: `session_code=eq.${sessionCode}` }, () => fetchData())
      .subscribe();

    // Polling fallback (covers environments where Realtime isn't enabled).
    const interval = setInterval(fetchData, 4000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [sessionCode, fetchData]);

  return { responses, loading, error };
}
