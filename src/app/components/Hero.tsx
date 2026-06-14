'use client';

import { useState } from 'react';
import TypewriterEffect from './TypewriterEffect';
import { Button } from '../components/ui/button';
import AuthModal from './AuthModal';

const Hero = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <section className="bg-[#fefde7] dark:bg-gray-900 py-24 px-6 text-center relative">
      <h1 className="text-4xl md:text-5xl font-bold text-gameducation-navy dark:text-white mb-6">
        Engage Students with <br /> Interactive Learning
      </h1>

      <p className="text-lg text-gray-800 dark:text-gray-200 mb-4 max-w-2xl mx-auto">
        Create live learning sessions that inspire and educate. Your only partner in{' '}
        <span className="font-semibold text-green-600">
          <TypewriterEffect
            words={['Gamification', 'Game-Based Learning', 'Criterion Assist', 'Strandhoot']}
            colors={['#34a853', '#1f3674', '#c3282d', '#547ca4']}
          />
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <Button
          variant="outline"
          className="text-gameducation-navy dark:text-white text-lg px-6 py-4"
          onClick={() => setAuthModalOpen(true)}
        >
          Get Started / Login
        </Button>

        <Button
          variant="outline"
          className="text-gameducation-navy dark:text-white text-lg px-6 py-4"
        >
          Watch Demo
        </Button>
      </div>

      {/* 🔐 Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </section>
  );
};

export default Hero;
