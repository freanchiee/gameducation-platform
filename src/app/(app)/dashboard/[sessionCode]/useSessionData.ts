'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/utils/supabase';
import type { ResponseRecord } from '@/app/strandhoot-builder/types/strandhoot';

export default function useSessionData(sessionCode: string) {
  const [responses, setResponses] = useState<ResponseRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    const { data, error } = await supabase
      .from('responses')
      .select('*, participants:student_id(avatar_svg)')
      .eq('session_code', sessionCode);

    if (error) {
      console.error('❌ Supabase fetch error:', error.message);
      setError(error.message);
      setResponses([]);
    } else if (data) {
      console.log(`✅ Fetched ${data.length} responses for session ${sessionCode}`);
      setResponses(data as ResponseRecord[]);
    }

    setLoading(false);
  }, [sessionCode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    responses,
    loading,
    error,
  };
}
