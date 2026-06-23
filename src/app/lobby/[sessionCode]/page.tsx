'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Copy, Check } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => { setOrigin(window.location.origin); }, []);

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
          .from('strandhoot_participants')
          .select('*')
          .eq('session_code', sessionCode as string)
          .eq('name', user.email)
          .maybeSingle();

        if (data) {
          setCurrentParticipant({
            id: data.student_id,
            player_name: data.player_name,
            role: data.role ?? 'student',
            avatar_svg: data.avatar_svg ?? undefined,
          });
          if (!data.player_name || !data.avatar_svg) setShowIdentityModal(true);
        } else {
          setShowIdentityModal(true);
        }
      }
    };

    fetchSelf();
  }, [user, role, sessionCode]);

  // ✅ Students: poll session status; when the teacher starts, launch the
  // internal native engine (or legacy embed) for the session's strandhoot.
  useEffect(() => {
    if (!sessionCode || role !== 'student' || !currentParticipant?.player_name || !currentParticipant?.id) return;

    let stop = false;
    const check = async () => {
      const { data } = await supabase
        .from('strandhoot_sessions')
        .select('status, strandhoot')
        .eq('session_code', sessionCode as string)
        .maybeSingle();

      if (!stop && data?.status === 'started' && data.strandhoot && !hasStartedRef.current) {
        hasStartedRef.current = true;
        const url = new URL(`/strandhoots/play/${data.strandhoot}`, window.location.origin);
        url.searchParams.set('sessionCode', sessionCode as string);
        url.searchParams.set('studentId', currentParticipant.id);
        url.searchParams.set('name', currentParticipant.player_name);
        router.push(url.pathname + url.search);
      }
    };

    check();
    const interval = setInterval(check, 2500);
    return () => {
      stop = true;
      clearInterval(interval);
    };
  }, [sessionCode, role, currentParticipant?.player_name, currentParticipant?.id, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8efc6] to-[#ffe29a] p-6 flex flex-col items-center relative">
      {/* 🎵 Music Toggle */}
      <button
        onClick={toggleMusic}
        className="absolute top-4 right-4 text-sm bg-white px-3 py-1 rounded shadow text-[#1f3674] hover:bg-yellow-200"
      >
        {audioPlaying ? '🔊 Mute Music' : '🔈 Play Music'}
      </button>

      {/* Main lobby card */}
      <div className="w-full max-w-2xl">
        {role === 'teacher' ? (
          /* ── Teacher view: Kahoot-style join instructions ── */
          <div className="rounded-3xl bg-white shadow-2xl overflow-hidden">
            {/* Join URL banner */}
            <div className="bg-[#1f3674] px-8 py-5 text-center">
              <p className="text-white/70 text-sm font-medium mb-1">Students go to</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-white text-2xl font-bold tracking-tight">
                  {origin ? `${origin}/join` : '/join'}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${origin}/join`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="ml-1 text-white/60 hover:text-white transition"
                  title="Copy join URL"
                >
                  {copied ? <Check className="size-5 text-green-400" /> : <Copy className="size-4" />}
                </button>
              </div>
            </div>

            {/* Code + start */}
            <div className="px-8 py-6 text-center">
              <p className="text-slate-500 text-sm mb-2">Game PIN</p>
              <p className="text-6xl font-mono font-extrabold text-[#c3282d] tracking-[0.15em]">
                {sessionCode}
              </p>

              <button
                className="mt-8 w-full bg-green-600 text-white px-6 py-4 rounded-2xl text-lg font-bold hover:bg-green-700 active:scale-95 transition"
                onClick={async () => {
                  if (hasStartedRef.current) return;
                  hasStartedRef.current = true;
                  const { error } = await supabase
                    .from('strandhoot_sessions')
                    .update({ status: 'started' })
                    .eq('session_code', sessionCode as string);
                  if (error) {
                    hasStartedRef.current = false;
                    console.error('❌ Failed to start session:', error.message);
                    alert('Something went wrong starting the session.');
                    return;
                  }
                  router.push(`/dashboard/${sessionCode}`);
                }}
              >
                🚀 Start — all students locked in
              </button>
            </div>
          </div>
        ) : (
          /* ── Student view ── */
          <div className="rounded-3xl bg-white shadow-xl px-8 py-6 text-center">
            <p className="text-4xl mb-2">👋</p>
            <h2 className="text-2xl font-extrabold text-[#1f3674]">
              {currentParticipant?.player_name || 'Joining…'}
            </h2>
            <p className="mt-1 text-slate-500">Waiting for your teacher to start</p>
            <button
              onClick={() => setShowIdentityModal(true)}
              className="mt-3 text-sm text-blue-600 underline"
            >
              ✏️ Change name or avatar
            </button>
            <div className="mt-4 rounded-xl bg-slate-50 py-3 px-4">
              <p className="text-xs text-slate-400">Session code</p>
              <p className="font-mono text-2xl font-bold text-[#c3282d] tracking-widest">{sessionCode}</p>
            </div>
          </div>
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
