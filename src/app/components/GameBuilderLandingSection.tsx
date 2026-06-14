'use client';

import { Button } from './ui/button';

interface GameBuilderSectionProps {
  spreadsheetUrl: string;
  setSpreadsheetUrl: (value: string) => void;
  gameType: string;
  setGameType: (type: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
}

export default function GameBuilderSection({
  spreadsheetUrl,
  setSpreadsheetUrl,
  gameType,
  setGameType,
  handleSubmit,
  error,
}: GameBuilderSectionProps) {
  return (
    <div className="bg-gameducation-cream dark:bg-gray-900 p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gameducation-navy dark:text-white mb-4">
        Create a Game from Your Google Sheet
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Google Spreadsheet URL
          </label>
          <input
            type="url"
            value={spreadsheetUrl}
            onChange={(e) => setSpreadsheetUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/..."
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Choose Game Type
          </label>
          <select
            value={gameType}
            onChange={(e) => setGameType(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="flashcards">📚 Flashcards</option>
            <option value="quiz">❓ Quiz</option>
            <option value="match">🧩 Matching Game</option>
          </select>
        </div>

        <Button type="submit" className="w-full bg-gameducation-navy text-white hover:bg-gameducation-navy/90">
          Create Game
        </Button>
      </form>
    </div>
  );
}
