// src/app/strandhoot-builder/components/PreviewButton.tsx
// Updated to work with your existing route structure

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Eye, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { createDemoSession } from '../utils/demoSession';
import { toast } from 'sonner';

interface PreviewButtonProps {
  strandhootId: string;
  disabled?: boolean;
  fallbackUrl?: string;
  useExternalLauncher?: boolean; // New option for your GitHub Pages setup
}

export default function PreviewButton({ 
  strandhootId, 
  disabled = false,
  fallbackUrl,
  useExternalLauncher = true // Default to true for your setup
}: PreviewButtonProps) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleSmartPreview = async () => {
    setIsCreating(true);
    
    try {
      // Create demo session and participant
      const sessionCode = await createDemoSession({
        strandhootId,
        userId: `preview-${Date.now()}`,
        cleanupAfterMinutes: 30
      });

      if (useExternalLauncher) {
        // Option 1: Use your existing launcher route (recommended for your setup)
        const launcherUrl = `/strandhoot/${sessionCode}?preview=true&name=Preview%20User&studentId=preview-user`;
        
        toast.success('Preview session created! Opening launcher...');
        
        // Open in new tab so teacher can go back to editing easily
        window.open(launcherUrl, '_blank');
        
      } else {
        // Option 2: Direct link to your GitHub Pages (alternative)
        const directUrl = new URL('https://your-username.github.io/strandhoot-crit-c/');
        directUrl.searchParams.set('name', 'Preview User');
        directUrl.searchParams.set('sessionCode', sessionCode);
        directUrl.searchParams.set('studentId', 'preview-user');
        directUrl.searchParams.set('preview', 'true');
        
        toast.success('Preview session created! Opening student experience...');
        window.open(directUrl.toString(), '_blank');
      }
      
    } catch (error) {
      console.error('Smart preview failed:', error);
      toast.error('Smart preview failed, trying simple preview...');
      
      // Fallback to simple preview
      if (fallbackUrl) {
        router.push(fallbackUrl);
      } else {
        // Create a simple direct link as ultimate fallback
        const fallbackUrl = new URL('https://your-username.github.io/strandhoot-crit-c/');
        fallbackUrl.searchParams.set('name', 'Preview User');
        fallbackUrl.searchParams.set('sessionCode', 'DEMO-FALLBACK');
        window.open(fallbackUrl.toString(), '_blank');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleSimplePreview = () => {
    // Simple preview that goes directly to your GitHub Pages
    const url = new URL('https://your-username.github.io/strandhoot-crit-c/');
    url.searchParams.set('name', 'Preview User');
    url.searchParams.set('sessionCode', 'DEMO-SIMPLE');
    window.open(url.toString(), '_blank');
    
    toast.info('Opened simple preview (no database session)');
  };

  return (
    <div className="flex items-center gap-2">
      {/* Smart Preview Button */}
      <Button 
        variant="outline" 
        className="gap-2 text-sm"
        onClick={handleSmartPreview}
        disabled={disabled || isCreating}
      >
        {isCreating ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Eye size={16} />
            Smart Preview
          </>
        )}
      </Button>

      {/* Simple Preview Button (fallback option) */}
      <Button 
        variant="ghost" 
        size="sm"
        className="gap-1 text-xs text-gray-500 hover:text-gray-700"
        onClick={handleSimplePreview}
        disabled={disabled}
        title="Quick preview without database session"
      >
        <ExternalLink size={14} />
        Simple
      </Button>
    </div>
  );
}

// Alternative: Dropdown Preview Button with multiple options
export function DropdownPreviewButton({ strandhootId, disabled = false }: { strandhootId: string; disabled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleSmartPreview = async () => {
    setIsCreating(true);
    try {
      const sessionCode = await createDemoSession({
        strandhootId,
        userId: `preview-${Date.now()}`,
        cleanupAfterMinutes: 30
      });

      const launcherUrl = `/strandhoot/${sessionCode}?preview=true&name=Preview%20User&studentId=preview-user`;
      window.open(launcherUrl, '_blank');
      toast.success('Smart preview opened!');
    } catch (error) {
      toast.error('Preview failed');
    } finally {
      setIsCreating(false);
      setIsOpen(false);
    }
  };

  const handleDirectPreview = () => {
    const url = new URL('https://your-username.github.io/strandhoot-crit-c/');
    url.searchParams.set('name', 'Preview User');
    url.searchParams.set('sessionCode', 'DEMO-DIRECT');
    window.open(url.toString(), '_blank');
    setIsOpen(false);
    toast.info('Direct preview opened');
  };

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="gap-2 text-sm"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isCreating}
      >
        <Eye size={16} />
        Preview
        <span className="ml-1">▼</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 bg-white border rounded-md shadow-lg z-50 min-w-[200px]">
          <button
            onClick={handleSmartPreview}
            disabled={isCreating}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
          >
            {isCreating ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Eye size={14} />
            )}
            Smart Preview
            <span className="text-xs text-gray-500 ml-auto">Recommended</span>
          </button>
          
          <button
            onClick={handleDirectPreview}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
          >
            <ExternalLink size={14} />
            Direct Preview
            <span className="text-xs text-gray-500 ml-auto">Quick</span>
          </button>
          
          <div className="border-t px-4 py-2 text-xs text-gray-500">
            Smart preview creates a real session. Direct preview skips database.
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}