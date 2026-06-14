"use client"
import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Flashcards from '../../../app/components/games/Flashcards';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/app/components/Header';
import { supabase } from '@/utils/supabase';
// Add more game components as you develop them
// import Quiz from '../../../components/games/Quiz';
// import Matching from '../../../components/games/Matching';

export default function GamePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'flashcards';
  const id = params.id;
  
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  
  useEffect(() => {
    if (!id || !type) return;
  
    async function fetchGameData() {
      try {
        setLoading(true);
  
        const spreadsheetId = id;
        const range = 'Sheet1!A:C';
  
        const response = await fetch('/api/sheets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            spreadsheetId,
            range,
            gameType: type,
          }),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch game data');
        }
  
        setGameData(result.data);
  
        if (user) {
          try {
            console.log('Saving game from game page directly with Supabase:', user.id);
  
            const { data: authData } = await supabase.auth.getUser();
            console.log('Auth check before saving game:', authData?.user ? 'Authenticated as ' + authData.user.id : 'Not authenticated');
  
            if (!authData?.user) {
              console.log('Skipping game save - authentication issue');
              return;
            }
  
            const { data: existingGame } = await supabase
              .from('games')
              .select('id')
              .eq('user_id', user.id)
              .eq('spreadsheet_id', spreadsheetId)
              .eq('type', type)
              .maybeSingle();
  
            let result;
  
            if (existingGame) {
              console.log('Updating existing game:', existingGame.id);
              result = await supabase
                .from('games')
                .update({
                  title: `${type.charAt(0).toUpperCase() + type.slice(1)} Game`,
                  created_at: new Date().toISOString(),
                })
                .eq('id', existingGame.id);
            } else {
              console.log('Inserting new game for user:', user.id);
              result = await supabase
                .from('games')
                .insert({
                  user_id: user.id,
                  spreadsheet_id: spreadsheetId,
                  type: type,
                  title: `${type.charAt(0).toUpperCase() + type.slice(1)} Game`,
                  created_at: new Date().toISOString(),
                });
            }
  
            if (result.error) {
              console.error('Error saving game to Supabase from game page:', result.error);
              console.log('Error status:', result.status, 'Error details:', result.error.details || 'None');
            } else {
              console.log('Game saved successfully to Supabase from game page');
            }
          } catch (err) {
            console.error('Exception in save game logic from game page:', err);
          }
        } else {
          console.log('User not logged in when playing game, not saving to account');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    }
  
    fetchGameData(); // ✅ ensure this is *inside* the effect
  }, [id, type, user]);


  const renderGame = () => {
    if (loading) return <div>Loading game...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!gameData) return <div>No game data found</div>;
    
    switch (type) {
      case 'flashcards':
        return <Flashcards gameData={gameData} />;
      // Add cases for other game types as you implement them
      // case 'quiz':
      //   return <Quiz gameData={gameData} />;
      // case 'matching':
      //   return <Matching gameData={gameData} />;
      default:
        return <div>Unknown game type: {type}</div>;
    }
  };
  
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        {renderGame()}
      </div>
    </div>
  );
}