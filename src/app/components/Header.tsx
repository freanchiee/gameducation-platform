// src/app/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isLoading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <nav className="sticky top-0 z-10 p-1 bg-cream shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="Gameducation Logo" 
              width={160} 
              height={40} 
              priority
            />
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-navy hover:text-mint transition-colors">
                Home
              </Link>
              
              {user && (
                <Link href="/your-games" className="text-navy hover:text-mint transition-colors">
                  Your Games
                </Link>
              )}
              
              <Link href="/templates" className="text-navy hover:text-mint transition-colors">
                Templates
              </Link>
              
              <Link href="/how-it-works" className="text-navy hover:text-mint transition-colors">
                How It Works
              </Link>
            </div>
            
            {!isLoading && (
              user ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm hidden md:block text-navy">
                    {user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="py-2 px-4 rounded bg-navy text-black text-sm font-medium hover:bg-opacity-90 transition"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="py-2 px-4 rounded bg-navy text-black text-sm font-medium hover:bg-opacity-90 transition"
                >
                  Sign In
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}