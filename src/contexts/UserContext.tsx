// src/contexts/UserContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '@/utils/supabase';

interface UserContextType {
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  userRole: 'teacher' | 'student' | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (userId: string, email?: string, name?: string, role?: 'teacher' | 'student') => void;
  clearUser: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'teacher' | 'student' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Prevent re-initialization cycles
  const hasInitialized = useRef(false);
  const isInitializing = useRef(false);

  // Get user from Supabase auth
  const getUserFromSupabase = async () => {
    try {
      // getSession() returns null without throwing when signed out; only then
      // call getUser() — avoids the noisy AuthSessionMissingError on public pages.
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error getting user from Supabase:', error);
        return null;
      }
      
      if (user) {
        // Try to get additional profile info
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        return {
          id: user.id,
          email: user.email || null,
          name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          role: profile?.role || null
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error in getUserFromSupabase:', error);
      return null;
    }
  };

  // Initialize user from various sources
  const initializeUser = async () => {
    // Prevent multiple simultaneous initializations
    if (isInitializing.current) {
      console.log('🔄 Already initializing, skipping...');
      return;
    }

    // If already initialized and we have a user, don't re-initialize
    if (hasInitialized.current && userId) {
      console.log('✅ Already initialized with user:', userId);
      return;
    }

    isInitializing.current = true;
    setIsLoading(true);
    
    try {
      console.log('🚀 Initializing user context...');

      // 1. Try to get from Supabase auth first (most reliable)
      const supabaseUser = await getUserFromSupabase();
      
      if (supabaseUser) {
        console.log('✅ User found via Supabase auth:', supabaseUser.id);
        setUserId(supabaseUser.id);
        setUserEmail(supabaseUser.email);
        setUserName(supabaseUser.name);
        setUserRole(supabaseUser.role as "teacher" | "student" | null);
        
        // Store in localStorage for faster access
        localStorage.setItem('currentUserId', supabaseUser.id);
        if (supabaseUser.email) localStorage.setItem('userEmail', supabaseUser.email);
        if (supabaseUser.name) localStorage.setItem('userName', supabaseUser.name);
        if (supabaseUser.role) localStorage.setItem('userRole', supabaseUser.role);
        
        hasInitialized.current = true;
        
        // Ensure loading is set to false
        setTimeout(() => setIsLoading(false), 0);
        isInitializing.current = false;
        console.log('🏁 UserContext initialization complete, setting loading to false');
        return;
      }
      
      // 2. Check URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const userIdFromUrl = urlParams.get('userId') || 
                           urlParams.get('studentId') || 
                           urlParams.get('user') || 
                           urlParams.get('id');
      
      if (userIdFromUrl && userIdFromUrl !== 'current-user') {
        console.log('✅ User ID found in URL:', userIdFromUrl);
        setUserId(userIdFromUrl);
        
        // Try to get additional info from URL
        const nameFromUrl = urlParams.get('name') || urlParams.get('userName');
        const emailFromUrl = urlParams.get('email');
        const roleFromUrl = urlParams.get('role') as 'teacher' | 'student' | null;
        
        if (nameFromUrl) setUserName(nameFromUrl);
        if (emailFromUrl) setUserEmail(emailFromUrl);
        if (roleFromUrl) setUserRole(roleFromUrl);
        
        // Store for persistence
        localStorage.setItem('currentUserId', userIdFromUrl);
        
        hasInitialized.current = true;
        setIsLoading(false);
        isInitializing.current = false;
        return;
      }
      
      // 3. Check localStorage/sessionStorage
      const userIdFromStorage = localStorage.getItem('currentUserId') || 
                               sessionStorage.getItem('currentUserId') ||
                               localStorage.getItem('studentId') ||
                               sessionStorage.getItem('studentId');
      
      if (userIdFromStorage && userIdFromStorage !== 'current-user') {
        console.log('✅ User ID found in storage:', userIdFromStorage);
        setUserId(userIdFromStorage);
        
        // Get additional stored info
        const storedEmail = localStorage.getItem('userEmail');
        const storedName = localStorage.getItem('userName');
        const storedRole = localStorage.getItem('userRole') as 'teacher' | 'student' | null;
        
        if (storedEmail) setUserEmail(storedEmail);
        if (storedName) setUserName(storedName);
        if (storedRole) setUserRole(storedRole);
        
        hasInitialized.current = true;
        setIsLoading(false);
        isInitializing.current = false;
        return;
      }
      
      // 4. Check URL path for user ID patterns
      const pathSegments = window.location.pathname.split('/');
      const userIndex = pathSegments.findIndex(segment => 
        ['user', 'student', 'profile', 'edit'].includes(segment.toLowerCase())
      );
      
      if (userIndex > -1 && pathSegments[userIndex + 1]) {
        const userIdFromPath = pathSegments[userIndex + 1];
        console.log('✅ User ID found in path:', userIdFromPath);
        setUserId(userIdFromPath);
        localStorage.setItem('currentUserId', userIdFromPath);
        
        hasInitialized.current = true;
        setIsLoading(false);
        isInitializing.current = false;
        return;
      }
      
      console.warn('⚠️ No valid user ID found from any source');
      hasInitialized.current = true; // Mark as initialized even if no user found
      
    } catch (error) {
      console.error('❌ Error initializing user:', error);
    } finally {
      console.log('🏁 UserContext initialization finished, ensuring loading is false');
      setIsLoading(false);
      isInitializing.current = false;
    }
  };

  // Refresh user data (only when explicitly called)
  const refreshUser = async () => {
    console.log('🔄 Manually refreshing user...');
    hasInitialized.current = false; // Allow re-initialization
    await initializeUser();
  };

  // Set user manually
  const setUser = (newUserId: string, email?: string, name?: string, role?: 'teacher' | 'student') => {
    console.log('🔧 Setting user manually:', { newUserId, email, name, role });
    
    setUserId(newUserId);
    setUserEmail(email || null);
    setUserName(name || null);
    setUserRole(role || null);
    
    // Persist to storage
    localStorage.setItem('currentUserId', newUserId);
    if (email) localStorage.setItem('userEmail', email);
    if (name) localStorage.setItem('userName', name);
    if (role) localStorage.setItem('userRole', role);
    
    hasInitialized.current = true; // Mark as initialized
  };

  // Clear user data
  const clearUser = () => {
    console.log('🧹 Clearing user data');
    
    setUserId(null);
    setUserEmail(null);
    setUserName(null);
    setUserRole(null);
    
    // Clear storage
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    sessionStorage.removeItem('currentUserId');
    sessionStorage.removeItem('studentId');
    
    hasInitialized.current = false; // Allow re-initialization
  };

  // Initialize ONLY on mount (once)
  useEffect(() => {
    if (!hasInitialized.current) {
      initializeUser();
    }
  }, []); // Empty dependency array - only run once on mount

  // Listen for Supabase auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.id);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // User signed in - update context but don't trigger full re-initialization
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          setUserId(session.user.id);
          setUserEmail(session.user.email || null);
          setUserName(session.user.user_metadata?.full_name || session.user.user_metadata?.name || null);
          setUserRole((profile?.role as "teacher" | "student" | null) || null);
          
          // Persist to storage
          localStorage.setItem('currentUserId', session.user.id);
          if (session.user.email) localStorage.setItem('userEmail', session.user.email);
          
          hasInitialized.current = true;
          setIsLoading(false);
          
        } else if (event === 'SIGNED_OUT') {
          // User signed out, clear our context
          clearUser();
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Debug logging (only when state actually changes)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 [USER CONTEXT] State updated:', {
        userId: userId ? userId.substring(0, 8) + '...' : null,
        userEmail,
        userName,
        userRole,
        isAuthenticated: !!userId && userId !== 'current-user',
        isLoading,
        hasInitialized: hasInitialized.current,
        isInitializing: isInitializing.current
      });
    }
  }, [userId, userEmail, userName, userRole, isLoading]);

  const value: UserContextType = {
    userId,
    userEmail,
    userName,
    userRole,
    isAuthenticated: !!userId && userId !== 'current-user',
    isLoading,
    setUser,
    clearUser,
    refreshUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Optional: Hook that combines both auth and user contexts
export const useCurrentUser = () => {
  const userContext = useUser();
  
  return {
    ...userContext,
    // You could merge auth context here if needed
  };
};