'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TypewriterEffect from '../components/TypewriterEffect';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="oblique-hero min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-6 py-32 gap-6 relative">
        <div className="parallax-bg">
          <svg className="circle" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="50" fill="white" />
          </svg>
          <svg className="zigzag" viewBox="0 0 150 20" fill="none">
            <path d="M0 10 L20 0 L40 20 L60 0 L80 20 L100 0 L120 20 L140 0 L150 10" stroke="white" strokeWidth="4" />
          </svg>
        </div>

        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="glass-box space-y-4">
          <h1 className="text-5xl font-bold" style={{ fontFamily: 'VT323, monospace' }}>Game Based Learning</h1>
          <TypewriterEffect
            words={[
              'Flashcards from Google Sheets',
              'Roulette Pickers',
              'Kahoot Quizzes',
              'Hangman & Memory Cards',
            ]}
            colors={['#FFD700', '#87CEFA', '#DDA0DD']}
            typingSpeed={90}
            deletingSpeed={45}
            pauseTime={1500}
          />
          <p className="text-lg text-white/90 max-w-md">Build your own game in under 2 minutes using just a Google Sheet.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="glass-box space-y-4 text-right">
          <h1 className="text-5xl font-bold" style={{ fontFamily: 'VT323, monospace' }}>Gamified Assessment</h1>
          <TypewriterEffect
            words={[
              'Explore Criteria A · B · C · D',
              'Level Based Evaluation',
              'AI Feedback & Badges',
              'Lab Report Gamification',
            ]}
            colors={['#98FB98', '#FFA07A', '#00CED1']}
            typingSpeed={90}
            deletingSpeed={45}
            pauseTime={1500}
          />
          <p className="text-lg text-white/90 max-w-md ml-auto">Write your experiment. Get feedback. Level up with color-coded insights.</p>
        </motion.div>
      </section>
    </main>
  );
}
