'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import StrandhootCard from './StrandhootCard';

type Strandhoot = {
  slug: string;
  name: string;
  description?: string;
  subject?: string;
  url: string;
  thumbnail?: string;
};

export default function StudentStrandhoots() {
  const [strandhoots, setStrandhoots] = useState<Strandhoot[]>([]);

  useEffect(() => {
    const fetchStrandhoots = async () => {
      const { data, error } = await supabase.from('strandhoots').select('*');
      if (error) {
        console.error('❌ Error loading strandhoots:', error.message);
        return;
      }
      setStrandhoots(data || []);
    };

    fetchStrandhoots();
  }, []);

  if (!strandhoots.length) {
    return (
      <p className="text-sm text-gray-500 mb-4">
        No standalone strandhoots available right now.
      </p>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-[#1f3674]">
        Learn Independently
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {strandhoots.map((s) => (
          <StrandhootCard
            key={s.slug}
            title={s.name}
            subject={s.subject || 'General'}
            url={s.url} // ✅ passes url safely
            code={s.slug.toUpperCase()}
            slug={s.slug}
            thumbnail={s.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}
