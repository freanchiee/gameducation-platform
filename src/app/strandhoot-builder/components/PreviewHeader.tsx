'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, X, AlertTriangle } from 'lucide-react';
import { cleanupDemoSession } from '../utils/demoSession';

interface PreviewHeaderProps {
  sessionCode: string;
  onExit?: () => void;
}

export default function PreviewHeader({ sessionCode, onExit }: PreviewHeaderProps) {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleExit = async () => {
    setIsExiting(true);
    
    try {
      // Cleanup demo session
      await cleanupDemoSession(sessionCode);
      
      // Navigate back to builder
      if (onExit) {
        onExit();
      } else {
        router.push('/strandhoot-builder');
      }
    } catch (error) {
      console.error('Error during preview exit:', error);
      // Still navigate back even if cleanup fails
      router.push('/strandhoot-builder');
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-orange-600 text-white px-4 py-2 border-b shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full">
            <AlertTriangle size={16} />
            <span className="text-sm font-medium">PREVIEW MODE</span>
          </div>
          <span className="text-sm opacity-90">
            You're seeing exactly what students will experience
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-75 hidden sm:block">
            Session: {sessionCode}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExit}
            disabled={isExiting}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30"
          >
            {isExiting ? (
              <>
                <ArrowLeft size={16} className="mr-1" />
                Exiting...
              </>
            ) : (
              <>
                <X size={16} className="mr-1" />
                Exit Preview
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
