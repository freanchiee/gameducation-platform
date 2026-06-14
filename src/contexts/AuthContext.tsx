'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AuthError} from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  role: 'teacher' | 'student' | null;
  isLoading: boolean;
  signIn: (email: string) => Promise<{ error: AuthError | null }>;
  signInWithProvider: (provider: 'google') => Promise<void>;
  signOut: () => Promise<void>;
  resetRole: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'teacher' | 'student' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const signInWithProvider = async (provider: 'google') => {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setIsLoading(false);
  };

  const signIn = async (email: string) => {
    setIsLoading(true);
    const result = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setIsLoading(false);
    return { error: result.error };
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        if (event === 'SIGNED_IN' && session?.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if ((!data || error || !data.role) && typeof window !== 'undefined') {
            const savedRole = localStorage.getItem('gameducation-role') as 'teacher' | 'student' | null;

            if (savedRole) {
              await supabase.from('profiles').upsert(
                { id: session.user.id, role: savedRole },
                { onConflict: 'id' }
              );
              setRole(savedRole);
              toast.success(`🎉 Logged in as ${savedRole.toUpperCase()}`);
              localStorage.removeItem('gameducation-role');
            } else {
              console.warn('No role found in Supabase or localStorage');
              window.location.href = '/choose-role';
              return;
            }
          } else {
            setRole((data?.role as "teacher" | "student" | null) ?? null);
          }

          // Optional redirect
          if (window.location.pathname === '/') {
            router.push('/dashboard');
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    const loadRole = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('❌ Failed to fetch role after refresh:', error.message);
        } else {
          console.log('✅ Role loaded after refresh:', data?.role);
          setRole((data?.role as "teacher" | "student" | null) ?? null);
        }
      }
    };

    loadRole();
  }, [user]);

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setIsLoading(false);
    window.location.href = '/';
  };

  const resetRole = () => {
    localStorage.removeItem('gameducation-role');
    setRole(null);
    if (user) {
      void supabase.from('profiles').delete().eq('id', user.id);
    }
    window.location.href = '/choose-role';
  };

  const value = {
    user,
    session,
    role,
    isLoading,
    signIn,
    signInWithProvider,
    signOut,
    resetRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
