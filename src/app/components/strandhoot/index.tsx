// /src/app/strandhoot/page.tsx (SOLO launcher)
'use client';

import { useEffect, useState } from 'react';
import { fetchStrandhoots } from '@/utils/fetchStrandhoots';
import Image from 'next/image';

interface Strandhoot {
  slug: string;
  name: string;
  description: string;
  url: string;
  thumbnail?: string;
}

export default function SoloStrandhootLauncher() {
  const [strandhoots, setStrandhoots] = useState<Strandhoot[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchStrandhoots();
      setStrandhoots(data);
    };
    load();
  }, []);

  const handleLaunch = async (slug: string, url: string) => {
    const name = prompt('Enter your name to start 🧪');
    if (!name) return;

    const launchUrl = new URL(url);
    launchUrl.searchParams.set('name', name);
    launchUrl.searchParams.set('strandhoot', slug);

    window.location.href = launchUrl.toString();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#1f3674]">🧪 Choose a Strandhoot</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strandhoots.map((game) => (
          <div key={game.slug} className="border rounded-lg shadow-sm p-4 bg-white">
            <div className="relative w-full h-40 mb-3 rounded overflow-hidden">
              <Image
                src={game.thumbnail || '/images/default-thumb.png'}
                alt={game.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h2 className="text-lg font-semibold">{game.name}</h2>
            <p className="text-sm text-gray-600 mb-3">{game.description}</p>
            <button
              onClick={() => handleLaunch(game.slug, game.url)}
              className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700"
            >
              🚀 Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

