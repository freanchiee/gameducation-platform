'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { micah } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';

type Participant = {
  id: string;
  session_code: string;
  name: string;
  player_name: string;
  avatar_svg: string;
  role: string;
  joined_at: string;
};

type PlayerIdentityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  sessionCode: string;
  onJoinSuccess?: (participant: Participant) => void;
};

export default function PlayerIdentityModal({
  isOpen,
  onClose,
  sessionCode,
  onJoinSuccess,
}: PlayerIdentityModalProps) {
  const { user } = useAuth();
  const [playerName, setPlayerName] = useState('');
  const [avatarSvg, setAvatarSvg] = useState('');
  const [loading, setLoading] = useState(false);

  const generateAvatar = () => {
    const svg = createAvatar(micah, {
      seed: uuidv4(),
      backgroundColor: ['f8efc6'],
    }).toString();

    setAvatarSvg(svg);
    setPlayerName(`Player${Math.floor(Math.random() * 900 + 100)}`);
  };

  useEffect(() => {
    if (isOpen) generateAvatar();
  }, [isOpen]);

  const handleJoin = async () => {
    if (!user?.email || !playerName.trim()) return;
    setLoading(true);

    try {
      // Stable per-browser student id (a real UUID — responses.student_id is uuid).
      const storedId = localStorage.getItem('student_id');
      const student_id = storedId && /^[0-9a-f-]{36}$/i.test(storedId) ? storedId : uuidv4();
      if (student_id !== storedId) localStorage.setItem('student_id', student_id);

      // strandhoot_participants PK is (session_code, student_id) — upsert merges.
      const { error: upsertError } = await supabase.from('strandhoot_participants').upsert(
        {
          session_code: sessionCode,
          student_id,
          name: user.email ?? '',
          player_name: playerName,
          avatar_svg: avatarSvg,
          role: 'student',
        },
        { onConflict: 'session_code,student_id' },
      );

      if (upsertError) throw upsertError;

      onJoinSuccess?.({
        id: student_id,
        session_code: sessionCode,
        name: user.email ?? '',
        player_name: playerName,
        avatar_svg: avatarSvg,
        role: 'student',
        joined_at: new Date().toISOString(),
      });

      setLoading(false);
      onClose();
    } catch (err) {
      console.error('❌ Failed to join/update participant:', err);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-center rounded-xl p-6 max-w-md w-full shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1f3674]">
            🎮 Choose Your Identity
          </DialogTitle>
          <DialogDescription className="text-gray-700 text-sm">
            Pick a name and avatar for this session
          </DialogDescription>
        </DialogHeader>

        {/* Avatar Preview */}
        <div
          className="w-24 h-24 mx-auto my-4 rounded-full border shadow-inner overflow-hidden"
          dangerouslySetInnerHTML={{ __html: avatarSvg }}
        />

        {/* Name Input */}
        <Input
          type="text"
          placeholder="Enter your player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="text-center"
        />

        <button
          onClick={generateAvatar}
          disabled={loading}
          className="text-sm text-blue-600 hover:underline mt-2"
        >
          🔁 Randomize Avatar
        </button>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            className="bg-[#1f3674] text-white hover:bg-[#2a478e]"
            onClick={handleJoin}
            disabled={loading}
          >
            {loading ? 'Joining...' : 'Join Lobby'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
