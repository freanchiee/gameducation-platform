'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface StrandhootCardProps {
  title: string;
  subject: string;
  criteria?: string; // made optional if not always passed
  url: string;
  thumbnail?: string;
  code: string;
  /** Strandhoot slug stored on the session so the lobby can launch it. */
  slug?: string;
}

function generateSessionCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default function StrandhootCard({ title, subject, criteria, url, slug }: StrandhootCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartSession = async () => {
    if (!user) {
      alert('🔒 You must be signed in to start a session.');
      console.warn('⚠️ No user found in context');
      return;
    }

    setLoading(true);
    const sessionCode = generateSessionCode();
    console.log('🔧 Attempting to create session with code:', sessionCode);

    const { error } = await supabase.from('strandhoot_sessions').insert([
      {
        session_code: sessionCode,
        created_by: user.id,
        strandhoot: slug ?? url.split('/').filter(Boolean).pop() ?? '',
        strandhoot_title: title,
        status: 'lobby',
      }
    ]);

    setLoading(false);

    if (error) {
      console.error('❌ Error creating session:', error.message);
      alert('Failed to create session. Please try again.');
      return;
    }

    console.log('✅ Session created! Redirecting to /lobby/', sessionCode);
    router.push(`/lobby/${sessionCode}`);
  };

  return (
    <div
      onClick={handleStartSession}
      className="bg-white hover:bg-[#f8efc6] border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer transition duration-200 relative"
    >
      <h3 className="text-lg font-semibold text-[#1f3674] mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-1">📘 {subject}</p>
      {criteria && <p className="text-sm text-gray-600 mb-1">🎯 {criteria}</p>}
      {loading && (
        <div className="absolute bottom-2 left-4 text-xs text-gray-400 italic">
          Creating session...
        </div>
      )}
    </div>
  );
}
