'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // ✅ Added success callback
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'teacher' | 'student' | null>(null);
  const [loading, setLoading] = useState(false);
  
  // ✅ Use auth context to detect successful authentication
  const { user, session, isLoading: authLoading } = useAuth();

  // ✅ Handle successful authentication
  useEffect(() => {
    if (user && session && !authLoading) {
      console.log('✅ User authenticated in AuthModal:', user.id);
      toast.success('🎉 Successfully authenticated!');
      
      // Call success callback if provided
      onSuccess?.();
     
    }
  }, [user, session, authLoading, onSuccess, onClose]);

  // ✅ Guest access handler
  const handleGuestAccess = () => {
    console.log('🚪 User chose guest access');
    toast.success('📝 Continuing as guest. Note: Your work may not be saved.');
    
    // Add guest parameter to URL for easier detection
    const url = new URL(window.location.href);
    url.searchParams.set('guest', 'true');
    window.history.replaceState({}, '', url.toString());
    
    onClose();
  };

  const handleMagicLinkLogin = async () => {
    if (!email || !role) {
      toast.error('Please enter email and select a role.');
      return;
    }

    localStorage.setItem('gameducation-role', role);
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`📬 Magic link sent! Check your email and return here. Logging in as ${role.toUpperCase()}`);
      // Note: Don't close modal here, wait for successful auth
    }
  };

  const handleGoogleLogin = async () => {
    if (!role) {
      toast.error('Please select a role first.');
      return;
    }

    localStorage.setItem('gameducation-role', role);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }
      // Note: Don't set loading to false here if successful, 
      // as the page will redirect
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to initiate Google login');
      setLoading(false);
    }
  };

  // ✅ Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setRole(null);
      setLoading(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#fffde7] rounded-xl shadow-xl w-full max-w-sm">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <Image src="/logo-icon.png" alt="Logo" width={50} height={50} />
          </div>
          <DialogTitle className="text-center text-[#1f3674] text-xl font-bold">
            Welcome to Gameducation
          </DialogTitle>
          <DialogDescription className="text-center text-gray-700 text-sm">
            Sign in to save progress and access all features, or continue as guest.
          </DialogDescription>
        </DialogHeader>

        {/* ✅ Show loading state if auth is in progress */}
        {authLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Authenticating...</span>
          </div>
        )}

        {/* ✅ Show form if not loading */}
        {!authLoading && (
          <>
            <Input
              type="email"
              placeholder="Enter your email"
              className="mt-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            {/* Role selection */}
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant={role === 'teacher' ? 'default' : 'outline'}
                className={`border-[#1f3674] ${role === 'teacher' ? 'bg-[#1f3674] text-white' : 'text-[#1f3674]'}`}
                onClick={() => setRole('teacher')}
                disabled={loading}
              >
                🧑‍🏫 Teacher
              </Button>
              <Button
                variant={role === 'student' ? 'default' : 'outline'}
                className={`border-[#c3282d] ${role === 'student' ? 'bg-[#c3282d] text-white' : 'text-[#c3282d]'}`}
                onClick={() => setRole('student')}
                disabled={loading}
              >
                👨‍🎓 Student
              </Button>
            </div>

            {/* Magic Link Login */}
            <Button
              onClick={handleMagicLinkLogin}
              disabled={loading || !email || !role}
              className="mt-4 w-full bg-[#1f3674] text-white hover:bg-opacity-90 disabled:opacity-50"
            >
              {loading ? 'Sending...' : '📧 Send Magic Link'}
            </Button>

            <div className="text-center text-sm text-gray-400 my-2">or</div>

            {/* Google Login */}
            <Button
              onClick={handleGoogleLogin}
              disabled={loading || !role}
              variant="outline"
              className="w-full border text-gray-800 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
              {loading ? 'Redirecting...' : '🔗 Continue with Google'}
            </Button>

            {/* ✅ Guest Access Option */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button
                onClick={handleGuestAccess}
                variant="ghost"
                className="w-full text-sm text-gray-600 hover:text-gray-800"
                disabled={loading}
              >
                📝 Continue as Guest
              </Button>
              <p className="text-xs text-gray-500 text-center mt-1">
                Note: Your work may not be saved without an account
              </p>
            </div>

            <Button
              onClick={onClose}
              variant="ghost"
              className="mt-3 w-full text-sm text-gray-600 hover:text-gray-800"
              disabled={loading}
            >
              Cancel
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}