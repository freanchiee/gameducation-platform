'use client';

import { useState } from 'react';
import AuthModal from './AuthModal';
import TypewriterEffect from './TypewriterEffect';
import { useAuth } from '@/contexts/AuthContext';

const modules = [
  {
    title: "Distance's Effect on Magnetic Strength",
    icon: '🧲',
  },
  {
    title: 'Criteria B',
    icon: '🧠',
  },
  {
    title: 'Criteria C',
    icon: '⚛️',
  },
  {
    title: 'Strandhoot Quizzes',
    icon: '🧪',
  },
];

// Same palette used in TypewriterEffect
const cardColors = ['#34a853', '#ea4335', '#1f3674', '#c3282d', '#aaefcc', '#547ca4'];

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const handleCardClick = () => {
    if (!user) setShowModal(true);
    // else you could route to actual module page
  };

  return (
    <section className="w-full min-h-screen bg-[#f8efc6] px-6 py-20 flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-[#1f3674] mb-4">Welcome to Gameducation</h1>

      <p className="text-lg text-[#1f3674] mb-3">Your ultimate partner in</p>

      <div className="text-xl font-bold mb-6">
        <TypewriterEffect
          words={['Gamification', 'Game Based Learning', 'Criterion Assist', 'Strandhoot']}
          colors={cardColors}
        />
      </div>

      {!user && (
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#1f3674] text-white px-6 py-3 rounded-lg font-semibold mb-12"
        >
          Login
        </button>
      )}

      {/* 🔳 Module Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full px-4">
        {modules.map((mod, idx) => (
          <button
            key={mod.title}
            onClick={handleCardClick}
            className="rounded-lg text-white font-semibold p-6 text-lg flex flex-col items-center shadow-md hover:scale-105 transition"
            style={{ backgroundColor: cardColors[idx % cardColors.length] }}
          >
            <div className="text-4xl mb-3">{mod.icon}</div>
            {mod.title}
          </button>
        ))}
      </div>

      {/* 🔐 Auth Modal */}
      {showModal && <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </section>
  );
}
