'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/app/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const DashboardNav = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full bg-gameducation-white dark:bg-gray-800 text-gameducation-navy dark:text-white py-3 px-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + Brand */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/logo.png" // ✅ No `/public` prefix
            alt="Gameducation Logo"
            width={30}
            height={30}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="text-xl font-bold">Gameducation</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard">
            <span className="hover:text-black dark:hover:text-gameducation-cream transition">
              Home
            </span>
          </Link>
          <Link href="/templates">
            <span className="hover:text-black dark:hover:text-gameducation-cream transition">
              Templates
            </span>
          </Link>
          <Link href="/how-it-works">
            <span className="hover:text-black dark:hover:text-gameducation-cream transition">
              How It Works
            </span>
          </Link>
          <Link href="/your-games">
            <span className="hover:text-black dark:hover:text-gameducation-cream transition">
              Your Games
            </span>
          </Link>
          <Link href="/create-new">
            <span className="bg-yellow-500 text-gameducation-navy font-medium px-4 py-1 rounded hover:bg-yellow-400 transition">
              Create New
            </span>
          </Link>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="border border-black/20 dark:border-white/20"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-white" />
            ) : (
              <Moon size={18} className="text-gameducation-navy" />
            )}
          </Button>

          {/* Sign Out */}
          <Link href="/">
            <span className="ml-4 hover:text-black dark:hover:text-gameducation-cream transition">
              Sign Out
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
