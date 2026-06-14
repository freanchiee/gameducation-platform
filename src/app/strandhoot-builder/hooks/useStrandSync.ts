'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

interface StrandSyncParams {
  studentId: string | null;
  sessionCode: string | null;
  experiment: string | null;
  strandKey: string;
  levelKey: string;
  content: string;
  evaluatedLevel: number | null;
  onLoad?: (data: Record<string, unknown>) => void;
}

export function useStrandSync({
  studentId,
  sessionCode,
  experiment,
  strandKey,
  levelKey,
  content,
  evaluatedLevel,
  onLoad,
}: StrandSyncParams) {
  const [isTyping, setIsTyping] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    if (!studentId || !sessionCode || !experiment) return;

    const updateTyping = async () => {
      await supabase
        .from('responses')
        .update({ is_typing: true })
        .eq('student_id', studentId)
        .eq('session_code', sessionCode)
        .eq('experiment', experiment);
    };

    updateTyping();
    setIsTyping(true);

    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [content, studentId, sessionCode, experiment]);

  useEffect(() => {
    if (!studentId || !experiment || !sessionCode) return;
    if (!studentId.match(/^[0-9a-fA-F-]{36}$/)) {
      console.warn('❌ Invalid UUID for studentId in upsert:', studentId);
      return;
    }

    const timer = setTimeout(async () => {
      setSyncStatus('saving');

      const { error } = await supabase.from('responses').upsert(
        {
          student_id: studentId,
          experiment,
          session_code: sessionCode,
          [strandKey]: content,
          [levelKey]: evaluatedLevel ?? null,
          is_typing: false,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'student_id,session_code,experiment',
        }
      );

      if (error) {
        console.error('❌ Error saving to Supabase:', error.message);
        setSyncStatus('idle');
      } else {
        setSyncStatus('saved');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [content, evaluatedLevel, strandKey, levelKey, studentId, experiment, sessionCode]);

  useEffect(() => {
    if (!studentId || !sessionCode || !experiment || !onLoad) return;

    const loadInitial = async () => {
      const { data, error } = await supabase
        .from('responses')
        .select(`${strandKey}, ${levelKey}`)
        .eq('student_id', studentId)
        .eq('session_code', sessionCode)
        .eq('experiment', experiment)
        .single();

      if (error) {
        console.warn('⚠️ No existing response found:', error.message);
      } else {
        onLoad(data as unknown as Record<string, unknown>);
      }
    };

    loadInitial();
  }, [studentId, sessionCode, experiment, strandKey, levelKey, onLoad]);

  return {
    isTyping,
    syncStatus,
  };
}
