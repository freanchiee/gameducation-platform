'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/contexts/AuthContext';

const themeColors = {
  cream: '#f8efc6',
  mint: '#aaefcc',
  navy: '#1f3674',
  red: '#c3282d',
  blue: '#547ca4',
  darkBlue: '#274e68'
};

const cardColors = [
  { bg: '#aaefcc', text: '#1f3674' },
  { bg: '#547ca4', text: 'white' },
  { bg: '#c3282d', text: 'white' },
  { bg: '#1f3674', text: 'white' },
  { bg: '#f8efc6', text: '#1f3674' }
];

const getRandomColor = () => cardColors[Math.floor(Math.random() * cardColors.length)];

type Game = {
  id: string;
  title: string;
  type: string;
  spreadsheet_id: string;
  created_at: string;
  color?: { bg: string; text: string };
};

export default function YourGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [gameType, setGameType] = useState('flashcards');

  useEffect(() => {
    if (!user) return;
    const userId = user.id;
  
    async function fetchUserGames() {
      setIsLoading(true);
  
      const { data: games, error } = await supabase
        .from('games')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
  
      if (error) {
        console.error('Error fetching games:', error);
      } else if (games) {
        const gamesWithColors = games.map((game) => ({
          ...game,
          color: getRandomColor()
        }));
        setGames(gamesWithColors);
      }
  
      setIsLoading(false);
    }
  
    fetchUserGames();
  }, [user, refreshKey]);
  
  const handleDeleteGame = async (gameId: string) => {
    if (!user) return;
    const userId = user.id;
    setIsLoading(true);

    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', gameId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting game:', error);
    } else {
      setGames(games.filter(game => game.id !== gameId));
      setConfirmDelete(null);
    }

    setIsLoading(false);
  };

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !spreadsheetId.trim()) return;
    const userId = user.id;

    setIsLoading(true);

    const { error } = await supabase
      .from('games')
      .insert({
        user_id: userId,
        title,
        type: gameType,
        spreadsheet_id: spreadsheetId
      });

    if (error) {
      console.error('Error creating game:', error.message);
    } else {
      setTitle('');
      setSpreadsheetId('');
      setGameType('flashcards');
      setRefreshKey(prev => prev + 1);
    }

    setIsLoading(false);
  };

  const gameTypeIcons = {
    flashcards: '📚',
    quiz: '❓',
    matching: '🔄'
  };

  if (!user) return null;

  return (
    <div className="bg-cream py-12" style={{ backgroundColor: themeColors.cream }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-center" style={{ fontFamily: 'VT323, monospace', color: themeColors.navy }}>
            Your Games
          </h2>
          <button
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="px-3 py-1 bg-navy text-white rounded text-sm hover:bg-opacity-90 flex items-center"
            style={{ backgroundColor: themeColors.navy }}
          >
            {isLoading ? 'Loading...' : '↻ Refresh'}
          </button>
        </div>

        {/* 📤 If loading */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-navy"></div>
            <p className="mt-2">Loading your games...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-xl mx-auto">
            <h3 className="text-xl font-bold mb-3">No Games Yet</h3>
            <p className="mb-4">Create your first interactive game from a Google Sheet!</p>

            <form onSubmit={handleCreateGame} className="space-y-4 text-left">
              <input
                type="text"
                placeholder="Game Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Google Sheet ID"
                value={spreadsheetId}
                onChange={(e) => setSpreadsheetId(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <select
                value={gameType}
                onChange={(e) => setGameType(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="flashcards">Flashcards</option>
                <option value="quiz">Quiz</option>
                <option value="matching">Matching</option>
              </select>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#1f3674] text-white rounded font-semibold hover:bg-[#2a478e]"
              >
                Create Game
              </button>
            </form>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {games.map((game) => (
              <div key={game.id} className="rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-1 hover:shadow-lg">
                <div className="h-40 flex items-center justify-center text-5xl" style={{ backgroundColor: game.color?.bg }}>
                  {gameTypeIcons[game.type as keyof typeof gameTypeIcons] || '🎮'}
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'VT323, monospace' }}>
                    {game.title || `${game.type.charAt(0).toUpperCase() + game.type.slice(1)} Game`}
                  </h3>
                  <div className="mb-4 text-gray-500 text-sm">
                    {new Date(game.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex justify-between space-x-2">
                    <Link
                      href={`/game/${game.spreadsheet_id}?type=${game.type}`}
                      className="inline-block py-2 px-4 rounded text-white font-medium text-sm"
                      style={{ backgroundColor: themeColors.navy }}
                    >
                      Play Game
                    </Link>
                    {confirmDelete === game.id ? (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleDeleteGame(game.id)}
                          className="py-2 px-3 rounded bg-red-600 text-white text-sm"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="py-2 px-2 rounded bg-gray-300 text-gray-700 text-sm"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(game.id)}
                        className="py-2 px-3 rounded bg-gray-200 text-gray-700 text-sm hover:bg-gray-300"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
 