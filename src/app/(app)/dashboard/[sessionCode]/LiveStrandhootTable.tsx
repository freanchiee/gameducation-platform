'use client';

import React from 'react';
import { motion } from 'framer-motion';

type ResponseRecord = {
  student_id: string;
  player_name: string;
  is_typing?: boolean;
  strand1_level?: number;
  strand2_level?: number;
  strand3_level?: number;
  strand4_level?: number;
  strand5_level?: number;
  participants?: {
    avatar_svg?: string;
  };
};

type Props = {
  responses: ResponseRecord[];
  onStrandClick: (studentId: string, strand: number) => void;
};

const getLevelColor = (level: number) => {
  if (level >= 7) return 'bg-green-300';
  if (level >= 5) return 'bg-blue-300';
  if (level >= 3) return 'bg-yellow-300';
  if (level >= 1) return 'bg-red-300';
  return 'bg-gray-100';
};

export default function LiveStrandhootTable({ responses, onStrandClick }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left bg-white/70 rounded-xl shadow-lg border border-[#1f3674]/10 backdrop-blur-md overflow-hidden">
        <thead className="bg-yellow-100 text-[#1f3674]">
          <tr>
            <th className="px-4 py-2 border-b border-[#1f3674]/10">Name</th>
            {Array.from({ length: 5 }).map((_, i) => (
              <th key={i} className="px-4 py-2 border-b border-[#1f3674]/10">{`Strand ${i + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {responses.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No student responses found.
              </td>
            </tr>
          ) : (
            responses.map((r, index) => (
              <motion.tr
                key={index}
                className="transition"
                animate={
                  r.is_typing
                    ? { backgroundColor: '#e0f7fa' }
                    : { backgroundColor: '#ffffff' }
                }
                transition={{ duration: 0.3 }}
              >
                <td className="px-4 py-2 font-medium flex items-center gap-2">
                  {r.participants?.avatar_svg ? (
                    <span
                      className="w-6 h-6"
                      dangerouslySetInnerHTML={{ __html: r.participants.avatar_svg }}
                    />
                  ) : (
                    <span className="text-gray-400">👤</span>
                  )}
                  <span className="flex items-center gap-1">
                    {r.player_name || 'Unknown'}
                    {r.is_typing && (
                      <span className="text-blue-600 text-xs animate-pulse ml-1">✍️ typing...</span>
                    )}
                  </span>
                </td>

                {Array.from({ length: 5 }).map((_, i) => {
                  const strandKey = `strand${i + 1}_level` as keyof ResponseRecord;
                  const rawLevel = r[strandKey];
                  const level = typeof rawLevel === 'number' ? rawLevel : 0;

                  return (
                    <td
                      key={i}
                      onClick={() => onStrandClick(r.student_id, i + 1)}
                      className={`px-4 py-2 text-center cursor-pointer border-t border-[#1f3674]/10 ${i === 4 ? 'rounded-r-xl' : ''}`}
                    >
                      {level > 0 ? (
                        <div className="w-full bg-white/60 border border-white/40 rounded h-3 relative">
                          <div
                            className={`h-3 rounded ${getLevelColor(level)}`}
                            style={{ width: `${(level / 8) * 100}%` }}
                          ></div>
                          <span className="absolute inset-0 text-xs flex items-center justify-center font-semibold text-[#1f3674]">
                            {level} / 8
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  );
                })}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
