'use client';

import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { supabase } from '@/utils/supabase';
import { computeSessionStats } from '@/utils/computeSessionStats';

interface Props {
  sessionCode: string;
}

export default function StrandhootSnapshot({ sessionCode }: Props) {
  const [loading, setLoading] = useState(true);
  const [avgLevel, setAvgLevel] = useState<number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [joined, setJoined] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);
  const [percentComplete, setPercentComplete] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('responses')
        .select('*')
        .eq('session_code', sessionCode);

      if (!error && data && data.length > 0) {
        const levels = data.map((r) => r.level).filter((l) => typeof l === 'number');
        const avg = levels.reduce((a, b) => a + b, 0) / levels.length;
        setAvgLevel(parseFloat(avg.toFixed(2)));

        const stats = computeSessionStats(data);
        setJoined(stats.joined);
        setCompleted(stats.completed);
        setPercentComplete(stats.percentComplete);

        setUpdatedAt(data[0].updated_at ?? new Date().toISOString());
      }

      setLoading(false);
    };

    fetchData();
  }, [sessionCode]);

  if (loading) return <p className="text-sm text-gray-500 px-4 py-2">Loading snapshot...</p>;

  return (
    <div className="text-sm space-y-2">
      <p>
        <strong>📊 Avg Level:</strong>{' '}
        <span className="font-mono text-blue-700">{avgLevel ?? '-'}</span>
      </p>
      <p>
        <strong>👥 Joined:</strong> {joined} students
      </p>
      <p>
        <strong>✅ Completed:</strong> {completed} ({percentComplete}%)
      </p>
      <p>
        <strong>⏱️ Last Updated:</strong>{' '}
        <span className="text-gray-600">
          {updatedAt ? formatDistanceToNow(new Date(updatedAt), { addSuffix: true }) : '-'}
        </span>
      </p>
      <p>
        <strong>🔗 View Dashboard:</strong>{' '}
        <a
          href={`/dashboard/${sessionCode}`}
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          Open →
        </a>
      </p>
    </div>
  );
}
