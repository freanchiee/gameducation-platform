"use client";

import React, { useState } from 'react';
import Image from 'next/image'; // ✅ Next.js Image optimization

interface Card {
  front: string;
  back: string;
  image: string | null;
}

interface FlashcardsProps {
  gameData: {
    title: string;
    cards: Card[];
  };
}

export default function Flashcards({ gameData }: FlashcardsProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);

  const { title, cards } = gameData;
  const currentCard = cards[currentCardIndex];

  const flipCard = () => setIsFlipped((prev) => !prev);

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) =>
      prev === 0 ? cards.length - 1 : prev - 1
    );
  };

  const markAsCompleted = () => {
    if (!completed.includes(currentCardIndex)) {
      setCompleted((prev) => [...prev, currentCardIndex]);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
      <div className="flex justify-between mb-4 text-sm text-gray-600">
        <span>Card {currentCardIndex + 1} of {cards.length}</span>
        <span>{completed.length} completed</span>
      </div>

      {/* Card Flip Section */}
      <div
        className="h-64 w-full flex items-center justify-center border rounded-lg shadow-md cursor-pointer bg-white mb-4 p-4 transition-transform duration-300"
        onClick={flipCard}
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front Side */}
        {!isFlipped && (
          <div className="text-center p-4 w-full">
            {currentCard.image && (
              <div className="max-h-32 relative w-full h-32 mb-4">
                <Image
                  src={currentCard.image}
                  alt={`Flashcard front image`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                />
              </div>
            )}
            <p className="text-xl">{currentCard.front}</p>
          </div>
        )}

        {/* Back Side */}
        {isFlipped && (
          <div className="text-center p-4 w-full" style={{ transform: 'rotateY(180deg)' }}>
            <p className="text-xl">{currentCard.back}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevCard}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Previous
        </button>

        <button
          onClick={markAsCompleted}
          className={`px-4 py-2 rounded ${
            completed.includes(currentCardIndex)
              ? 'bg-green-200 hover:bg-green-300'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {completed.includes(currentCardIndex) ? 'Completed' : 'Mark Complete'}
        </button>

        <button
          onClick={nextCard}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
