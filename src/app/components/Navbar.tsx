'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  useAuth();

  return (
    <nav className="w-full px-6 py-4 shadow-sm bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* 🔷 Logo */}
        <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Gameducation"
          width={40}
          height={40}
          className="w-10 h-10"
        />
          <span className="text-2xl font-bold text-gameducation-navy dark:text-white">Gameducation</span>
        </Link>

        {/* 🌐 Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gameducation-navy dark:text-white hover:underline">Home</Link>
          <Link href="/templates" className="text-gameducation-navy dark:text-white hover:underline">Templates</Link>
          <Link href="/how-it-works" className="text-gameducation-navy dark:text-white hover:underline">How It Works</Link>

          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="text-gameducation-navy dark:text-white"
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>

          <Button
            onClick={() => setAuthModalOpen(true)}
            className="bg-gameducation-navy text-black hover:bg-gameducation-navy/90"
          >
            Login
          </Button>
        </div>

        {/* 📱 Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <Button onClick={toggleTheme} size="icon" variant="ghost">
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
          <Button onClick={() => setMenuOpen(!menuOpen)} size="icon" variant="ghost">
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-white dark:bg-gray-800 shadow">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-gameducation-navy dark:text-white" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/templates" className="text-gameducation-navy dark:text-white" onClick={() => setMenuOpen(false)}>Templates</Link>
            <Link href="/how-it-works" className="text-gameducation-navy dark:text-white" onClick={() => setMenuOpen(false)}>How It Works</Link>
            <Button
              onClick={() => {
                setMenuOpen(false);
                setAuthModalOpen(true);
              }}
              className="bg-gameducation-navy text-white w-full"
            >
              Login
            </Button>
          </div>
        </div>
      )}

      {/* 🔐 Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
