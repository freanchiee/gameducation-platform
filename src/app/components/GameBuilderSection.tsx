'use client';
import { motion } from 'framer-motion';
import React from 'react';

type GameBuilderProps = {
  spreadsheetUrl: string;
  setSpreadsheetUrl: (val: string) => void;
  gameType: string;
  setGameType: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
};

const gameTypes = [
  { id: 'flashcards', name: 'Flashcards', icon: '📚' },
  { id: 'quiz', name: 'Quiz', icon: '❓' },
  { id: 'match', name: 'Matching Game', icon: '🧩' },
];

export default function GameBuilderSection({
  spreadsheetUrl,
  setSpreadsheetUrl,
  gameType,
  setGameType,
  handleSubmit,
  error,
}: GameBuilderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-cream dark:bg-[#2a2a2a] p-6 rounded-lg shadow-md"
    >
      <h3
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: 'VT323, monospace', color: '#1f3674' }}
      >
        Game-Based from Google Sheets
      </h3>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Create flashcards, matching games, MCQs, and more using Google Sheets.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="spreadsheetUrl" className="block text-gray-700 dark:text-gray-300 mb-1">
            Google Sheet URL or ID
          </label>
          <input
            type="text"
            id="spreadsheetUrl"
            className="w-full p-3 border rounded"
            value={spreadsheetUrl}
            onChange={(e) => setSpreadsheetUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Game Type</label>
          <div className="grid grid-cols-3 gap-2">
            {gameTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setGameType(type.id)}
                className={`cursor-pointer text-center p-4 rounded border-2 transition-colors ${
                  gameType === type.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-gray-700'
                    : 'border-gray-200 hover:border-blue-300 dark:border-gray-500'
                }`}
              >
                <div className="text-3xl mb-2">{type.icon}</div>
                <div>{type.name}</div>
              </div>
            ))}
          </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <button
          type="submit"
          className="w-full py-3 px-4 rounded text-white font-bold text-lg"
          style={{ backgroundColor: '#1f3674' }}
        >
          Create Game
        </button>
      </form>
    </motion.div>
  );
}
