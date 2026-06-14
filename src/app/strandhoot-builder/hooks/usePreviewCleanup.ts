'use client';

import { useEffect } from 'react';
import { cleanupExpiredDemoSessions } from '../utils/demoSession';

export function usePreviewCleanup() {
  useEffect(() => {
    // Cleanup expired sessions when user visits builder
    cleanupExpiredDemoSessions();
    
    // Set up periodic cleanup every 10 minutes
    const interval = setInterval(() => {
      cleanupExpiredDemoSessions();
    }, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
}