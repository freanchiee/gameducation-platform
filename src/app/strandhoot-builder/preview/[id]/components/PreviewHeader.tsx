'use client';

import { useState } from 'react';
import { ArrowLeft, Eye, RotateCcw, Menu, X } from 'lucide-react';
import { usePreviewContext } from './PreviewProvider';

interface PreviewHeaderProps {
  title: string;
  onBackToBuilder: () => void;
}

export default function PreviewHeader({ title, onBackToBuilder }: PreviewHeaderProps) {
  const { session, resetSession } = usePreviewContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleResetSession = () => {
    if (confirm('Are you sure you want to reset the preview session? All progress will be lost.')) {
      resetSession();
      setMobileMenuOpen(false);
    }
  };

  const formatSessionInfo = () => {
    const completedCount = session.completedStrands.filter(Boolean).length;
    const totalStrands = session.completedStrands.length;
    return `${completedCount}/${totalStrands} strands completed`;
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Back button and title */}
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <button
              onClick={onBackToBuilder}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to Builder</span>
              <span className="sm:hidden">Back</span>
            </button>
            
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {title}
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                Preview Mode
              </p>
            </div>
          </div>

          {/* Center section - Progress info (hidden on mobile) */}
          <div className="hidden md:flex items-center px-4">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900">
                {formatSessionInfo()}
              </div>
              <div className="text-xs text-gray-500">
                Current: Strand {session.currentStrand === 0 ? 'Welcome' : session.currentStrand}
              </div>
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center space-x-3">
            {/* Desktop actions */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="flex items-center text-sm text-gray-500">
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </div>
              
              <button
                onClick={handleResetSession}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            {/* Progress info on mobile */}
            <div className="text-center py-2 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">
                {formatSessionInfo()}
              </div>
              <div className="text-xs text-gray-500">
                Current: Strand {session.currentStrand === 0 ? 'Welcome' : session.currentStrand}
              </div>
            </div>

            {/* Preview indicator */}
            <div className="flex items-center justify-center text-sm text-gray-500 py-2">
              <Eye className="h-4 w-4 mr-2" />
              Preview Mode
            </div>

            {/* Reset button */}
            <button
              onClick={handleResetSession}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
}