'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import { AnimatePresence, motion } from 'framer-motion';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { supabase } from '@/utils/supabase';

export default function SidebarHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isLoading, signOut } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const toggleMenu = () => setIsOpen(!isOpen);

  const renderToggleSwitch = () => (
    <motion.div
      className="ml-2 flex items-center cursor-pointer"
      onClick={toggleDarkMode}
      initial={false}
      animate={{ backgroundColor: darkMode ? '#333' : '#ddd' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        width: '50px',
        height: '26px',
        borderRadius: '9999px',
        padding: '4px',
        display: 'flex',
        justifyContent: darkMode ? 'flex-end' : 'flex-start',
      }}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          backgroundColor: darkMode ? '#facc15' : '#1a202c',
        }}
      />
    </motion.div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-transparent">
        <div className="text-xl font-bold text-white">Gameducation</div>
        <button
          onClick={toggleMenu}
          className="block md:hidden text-white text-3xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <nav className="hidden md:flex space-x-6 text-white items-center">
          <Link href="/">Home</Link>
          <Link href="/templates">Templates</Link>
          <Link href="/how-it-works">How It Works</Link>
          {user && (
            <>
              <Link href="/your-games">Your Games</Link>
              <button
                onClick={() => {
                  localStorage.removeItem('gameducation-role');
                  supabase.auth.signOut().then(() => {
                    window.location.href = '/';
                  });
                }}
                className="text-sm text-yellow-300 hover:text-white ml-2"
              >
                ⚙️ Reset Role
              </button>
            </>
          )}

          {!isLoading &&
            (user ? (
              <button onClick={signOut} className="hover:text-yellow-300">
                Sign Out
              </button>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-yellow-300">
                Sign In
              </button>
            ))}
          {renderToggleSwitch()}
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 w-full h-full bg-yellow-400 z-50 flex flex-col p-6 text-black"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={toggleMenu} className="text-3xl">×</button>
            </div>
            <nav className="flex flex-col space-y-6 text-lg">
              <Link href="/" onClick={toggleMenu}>Home</Link>
              <Link href="/templates" onClick={toggleMenu}>Templates</Link>
              <Link href="/how-it-works" onClick={toggleMenu}>How It Works</Link>
              {user && <Link href="/your-games" onClick={toggleMenu}>Your Games</Link>}
              {!isLoading && (user ? (
                <button onClick={() => { signOut(); toggleMenu(); }}>Sign Out</button>
              ) : (
                <button onClick={() => { setIsAuthModalOpen(true); toggleMenu(); }}>Sign In</button>
              ))}
              <div className="mt-4">{renderToggleSwitch()}</div>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
