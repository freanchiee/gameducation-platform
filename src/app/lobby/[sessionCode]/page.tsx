'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthContext';
import PlayerIdentityModal from '@/app/components/strandhoot/PlayerIdentityModal';
import ParticipantList from '@/app/components/strandhoot/ParticipantList';

type Participant = {
  id: string;
  player_name: string;
  role: string;
  avatar_svg?: string;
};

export default function LobbyPage() {
  const { sessionCode } = useParams();
  const router = useRouter();
  const { role, user } = useAuth();
  const [showIdentityModal, setShowIdentityModal] = useState(false);
  const [currentParticipant, setCurrentParticipant] = useState<Participant | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);

  // 🎵 Autoplay music
  useEffect(() => {
    audioRef.current = new Audio('/audio/lobby-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    if (audioPlaying) {
      audioRef.current.play().catch(() => {
        console.warn('Autoplay blocked');
      });
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [audioPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  // 🧠 Load current participant
  useEffect(() => {
    const fetchSelf = async () => {
      if (role === 'student' && user && sessionCode) {
        const { data } = await supabase
          .from('participants')
          .select('*')
          .eq('session_code', sessionCode as string)
          .eq('name', user.email)
          .maybeSingle();

        if (data) {
          setCurrentParticipant(data);
          console.log('👤 Student ID:', data.id); // ✅ log student ID
          if (!data.player_name || !data.avatar_svg) {
            setShowIdentityModal(true);
          }
        } else {
          setShowIdentityModal(true);
        }
      }
    };

    fetchSelf();
  }, [user, role, sessionCode]);

  // ✅ Redirect once if session is started (Students only)
  useEffect(() => {
    const checkAndRedirect = async () => {
      if (!sessionCode || role !== 'student' || !currentParticipant?.player_name || !currentParticipant?.id) return;

      const { data } = await supabase
        .from('sessions')
        .select('status, strandhoot')
        .eq('session_code', sessionCode)
        .single();

      if (data?.status === 'started') {
        const gameUrl = new URL('https://makersapien.github.io/magnetism-crit-c/');
        gameUrl.searchParams.set('sessionCode', sessionCode as string);
        gameUrl.searchParams.set('strandhoot', data.strandhoot ?? 'crit-c-magnetism');
        gameUrl.searchParams.set('name', currentParticipant.player_name);
        gameUrl.searchParams.set('studentId', currentParticipant.id); // ✅ include student ID

        window.open(gameUrl.toString(), '_blank');
      }
    };

    checkAndRedirect();
  }, [sessionCode, role, currentParticipant?.player_name, currentParticipant?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8efc6] to-[#ffe29a] p-6 flex flex-col items-center relative">
      {/* 🎵 Music Toggle */}
      <button
        onClick={toggleMusic}
        className="absolute top-4 right-4 text-sm bg-white px-3 py-1 rounded shadow text-[#1f3674] hover:bg-yellow-200"
      >
        {audioPlaying ? '🔊 Mute Music' : '🔈 Play Music'}
      </button>

      {/* 🔗 Code Display */}
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-[#1f3674] mb-2">🎯 Session Code</h1>
        <p className="text-2xl font-mono text-[#c3282d] bg-white px-4 py-2 rounded shadow inline-block">
          {sessionCode}
        </p>

        {role === 'teacher' ? (
          <p className="mt-2 text-[#1f3674] text-lg">Share this code with your students!</p>
        ) : (
          <>
            <p className="mt-2 text-[#1f3674] text-lg">
              Welcome,{' '}
              <span className="font-bold text-blue-800">
                {currentParticipant?.player_name || 'Friend'} 👋
              </span>
            </p>
            <button
              onClick={() => setShowIdentityModal(true)}
              className="mt-1 text-sm text-blue-600 underline"
            >
              ✏️ Change Name or Avatar
            </button>
          </>
        )}

        {/* Teacher Launch Button */}
        {role === 'teacher' && (
          <button
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            onClick={async () => {
              if (hasStartedRef.current) return;
              hasStartedRef.current = true;

              const { error } = await supabase
                .from('sessions')
                .update({ status: 'started' })
                .eq('session_code', sessionCode as string);

              if (error) {
                console.error('❌ Failed to start session:', error.message);
                alert('Something went wrong starting the session.');
                return;
              }

              router.push(`/dashboard/${sessionCode}`);
            }}
          >
            🚀 Start Session
          </button>
        )}
      </div>

      {/* 🎮 Player Identity Modal */}
      <PlayerIdentityModal
        isOpen={showIdentityModal}
        onClose={() => setShowIdentityModal(false)}
        sessionCode={sessionCode as string}
        onJoinSuccess={(updated) => {
          setCurrentParticipant(updated);
          setShowIdentityModal(false);
        }}
      />

      {/* 👥 Participant List */}
      <div className="mt-12 w-full max-w-4xl">
        <ParticipantList sessionCode={sessionCode as string} />
      </div>
    </div>
  );
}
