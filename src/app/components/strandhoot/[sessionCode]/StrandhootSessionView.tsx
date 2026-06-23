// src/app/strandhoot/[sessionCode]/page.tsx
// Updated to support Smart Preview while maintaining your existing launcher logic

'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/utils/supabase';
import PreviewHeader from '@/app/strandhoot-builder/components/PreviewHeader';
import { cleanupDemoSession } from '@/app/strandhoot-builder/utils/demoSession';

interface SessionData {
  session_code: string;
  strandhoot_template_id: string;
  status: string;
  is_demo: boolean;
  settings: any;
}

export default function StrandhootLauncher() {
  const { sessionCode } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  // Check if this is preview mode
  const isPreview = searchParams.get('preview') === 'true';
  const previewName = searchParams.get('name') || 'Preview User';
  const previewStudentId = searchParams.get('studentId') || 'preview-user';

  // State management
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [launching, setLaunching] = useState(false);

  // Load session data and validate
  useEffect(() => {
    const loadSession = async () => {
      if (!sessionCode) {
        setError('No session code provided');
        setLoading(false);
        return;
      }

      try {
        // Handle both string and string array, ensure we have a valid string
        const code = Array.isArray(sessionCode) ? sessionCode[0] : sessionCode;
        
        if (!code || typeof code !== 'string') {
          throw new Error('Invalid session code format');
        }
        
        const { data: session, error: sessionError } = await supabase
          .from('strandhoot_sessions')
          .select('*')
          .eq('session_code', code)
          .single();

        if (sessionError) {
          throw new Error(`Session not found: ${sessionError.message}`);
        }

        if (session.status !== 'active') {
          throw new Error('Session is not active');
        }

        // Additional validation for demo sessions
        if (isPreview && !session.is_demo) {
          console.warn('Preview mode requested but session is not marked as demo');
        }

        setSessionData(session);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load session:', err);
        setError(err instanceof Error ? err.message : 'Failed to load session');
        setLoading(false);
      }
    };

    loadSession();
  }, [sessionCode, isPreview]);

  // Auto-cleanup preview session on unmount
  useEffect(() => {
    if (!isPreview || !sessionData?.is_demo) return;

    const handleBeforeUnload = () => {
      if (sessionData?.session_code) {
        cleanupDemoSession(sessionData.session_code);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && sessionData?.session_code) {
        cleanupDemoSession(sessionData.session_code);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Cleanup on component unmount
      if (sessionData?.is_demo && sessionData?.session_code) {
        cleanupDemoSession(sessionData.session_code);
      }
    };
  }, [isPreview, sessionData]);

  // Launch the strandhoot game
  useEffect(() => {
    if (!sessionData || launching || !sessionCode) return;

    const launchGame = async () => {
      setLaunching(true);

      try {
        let name = '';
        const code = Array.isArray(sessionCode) ? sessionCode[0] : sessionCode;
        
        if (!code || typeof code !== 'string') {
          throw new Error('Invalid session code');
        }

        if (isPreview) {
          // For preview mode, use the preview name
          name = previewName;
        } else {
          // Original logic for regular sessions
          if (user?.email) {
            const { data } = await supabase
              .from('participants')
              .select('player_name')
              .eq('session_code', code)
              .eq('name', user.email)
              .maybeSingle();

            name = data?.player_name ?? '';
          }

          if (!name) {
            name = prompt('Enter your name') || '';
            if (!name) {
              setError('Name is required to join the session');
              setLaunching(false);
              return;
            }
          }
        }

        // Build the URL for your GitHub Pages site
        const url = new URL('https://your-username.github.io/strandhoot-crit-c/');
        url.searchParams.set('name', name);
        url.searchParams.set('sessionCode', code);
        
        // Add student ID for preview mode
        if (isPreview) {
          url.searchParams.set('studentId', previewStudentId);
        }

        // For preview mode, open in same tab so preview header works
        // For regular mode, open in new tab as before
        if (isPreview) {
          window.location.href = url.toString();
        } else {
          window.open(url.toString(), '_blank');
          // Optionally close this launcher tab for regular users
          // window.close();
        }

      } catch (err) {
        console.error('Failed to launch game:', err);
        setError('Failed to launch the strandhoot activity');
        setLaunching(false);
      }
    };

    // Add a small delay to ensure session data is fully loaded
    const timer = setTimeout(launchGame, 500);
    return () => clearTimeout(timer);
  }, [sessionData, sessionCode, user, isPreview, previewName, previewStudentId, launching]);

  // Handle preview exit
  const handlePreviewExit = async () => {
    if (sessionData?.is_demo && sessionData?.session_code) {
      await cleanupDemoSession(sessionData.session_code);
    }
    router.push('/strandhoot-builder');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-400">
        {/* Preview Header */}
        {isPreview && sessionData?.is_demo && sessionData?.session_code && (
          <PreviewHeader 
            sessionCode={sessionData.session_code}
            onExit={handlePreviewExit}
          />
        )}
        
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-orange-800 font-medium text-lg">
              {isPreview ? '🔍 Setting up preview...' : '🔁 Loading session...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-100 to-red-400">
        {/* Preview Header (even for errors) */}
        {isPreview && (
          <PreviewHeader 
            sessionCode={(() => {
              const code = Array.isArray(sessionCode) ? sessionCode[0] : sessionCode;
              return code || 'unknown';
            })()}
            onExit={handlePreviewExit}
          />
        )}
        
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-4">
            <h1 className="text-xl font-bold text-red-800 mb-4">
              {isPreview ? 'Preview Error' : 'Session Error'}
            </h1>
            <p className="text-red-700 mb-4">{error}</p>
            <div className="flex gap-2">
              <button
                onClick={() => router.push('/')}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Go Home
              </button>
              {isPreview && (
                <button
                  onClick={handlePreviewExit}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Back to Builder
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Launching state
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-400">
      {/* Preview Header */}
      {isPreview && sessionData?.is_demo && sessionData?.session_code && (
        <PreviewHeader 
          sessionCode={sessionData.session_code}
          onExit={handlePreviewExit}
        />
      )}
      
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-pulse text-6xl mb-4">🚀</div>
          <p className="text-orange-800 font-medium text-lg mb-2">
            {isPreview ? '🔍 Launching Preview...' : '🔁 Launching your Strandhoot activity...'}
          </p>
          {isPreview && (
            <p className="text-orange-600 text-sm">
              You'll see exactly what students experience
            </p>
          )}
        </div>
      </div>

      {/* Preview Mode Indicator */}
      {isPreview && (
        <div className="fixed bottom-4 right-4 z-40">
          <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg opacity-75">
            🔍 Preview Mode
          </div>
        </div>
      )}
    </div>
  );
}

// Alternative: If you want to keep your external launcher but add preview support
// You can create a separate component for the enhanced functionality:

// src/app/strandhoot/[sessionCode]/EnhancedLauncher.tsx
export function EnhancedStrandhootLauncher() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // Type-safe sessionCode extraction
  const sessionCode = params?.sessionCode;
  const isPreview = searchParams.get('preview') === 'true';
  const previewName = searchParams.get('name') || 'Preview User';

  useEffect(() => {
    const launchGame = async () => {
      if (!sessionCode) {
        console.error('No session code provided');
        return;
      }

      let name = '';
      const code = Array.isArray(sessionCode) ? sessionCode[0] : sessionCode;
      
      if (!code || typeof code !== 'string') {
        console.error('Invalid session code format');
        return;
      }

      if (isPreview) {
        name = previewName;
      } else {
        // Your original logic
        if (user?.email) {
          const { data } = await supabase
            .from('participants')
            .select('player_name')
            .eq('session_code', code)
            .eq('name', user.email)
            .maybeSingle();

          name = data?.player_name ?? '';
        } else {
          name = prompt('Enter your name') || '';
        }
      }

      if (!name) {
        console.error('Name is required');
        return;
      }

      const url = new URL('https://your-username.github.io/strandhoot-crit-c/');
      url.searchParams.set('name', name);
      url.searchParams.set('sessionCode', code);

      // For preview, add preview parameters
      if (isPreview) {
        url.searchParams.set('preview', 'true');
        url.searchParams.set('studentId', searchParams.get('studentId') || 'preview-user');
      }

      // Open appropriately based on mode
      if (isPreview) {
        window.location.href = url.toString(); // Same tab for preview
      } else {
        window.open(url.toString(), '_blank'); // New tab for regular
      }
    };

    launchGame();
  }, [sessionCode, user, isPreview, previewName, searchParams]);

  return (
    <div className="p-6 text-center text-lg">
      {isPreview ? '🔍 Launching Preview...' : '🔁 Launching your Strandhoot activity...'}
    </div>
  );
}