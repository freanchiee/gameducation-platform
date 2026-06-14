'use client';

import { useMemo } from 'react';
import { usePreviewContext } from './PreviewProvider';
import WelcomeBlock from '@/app/strandhoot-builder/blocks/WelcomeBlock';
import StrandPageBlock from '@/app/strandhoot-builder/blocks/StrandPageBlock';
import StrandProgressBarGroup from '@/app/strandhoot-builder/blocks/StrandProgressBarGroup';
import { Button } from '@/app/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import type { BlockType } from '@/app/strandhoot-builder/types/strandhoot';

export default function PreviewContainer() {
  const {
    strandhoot,
    session,
    blocks,
    currentStrand,
    canNavigateToStrand,
    navigateToStrand,
    updateStrandProgress,
    updateUserInput,
    getUserInput,
    markStrandCompleted,
  } = usePreviewContext();

  // Filter and organize blocks
  const { welcomeBlock, strandBlocks } = useMemo(() => {
    const welcome = blocks.find(block => block.type === 'welcome');
    const strands = blocks.filter(block => block.type === 'strand');
    
    return {
      welcomeBlock: welcome,
      strandBlocks: strands,
    };
  }, [blocks]);

  // Current block to render
  const currentBlock = useMemo(() => {
    if (currentStrand === 0) {
      return welcomeBlock;
    } else {
      return strandBlocks[currentStrand - 1];
    }
  }, [currentStrand, welcomeBlock, strandBlocks]);

  // Navigation helpers
  const canGoBack = currentStrand > 0;
  const canGoNext = currentStrand < strandBlocks.length && canNavigateToStrand(currentStrand + 1);
  const isLastStrand = currentStrand === strandBlocks.length;

  const handlePrevious = () => {
    if (canGoBack) {
      navigateToStrand(currentStrand - 1);
    }
  };

  const handleNext = () => {
    if (currentStrand === 0) {
      // From welcome to first strand
      navigateToStrand(1);
    } else if (canGoNext) {
      // Mark current strand as completed and move to next
      markStrandCompleted(currentStrand - 1);
      navigateToStrand(currentStrand + 1);
    }
  };

  const handleFinish = () => {
    // Mark final strand as completed
    if (currentStrand > 0) {
      markStrandCompleted(currentStrand - 1);
    }
    // Could show completion modal or redirect
    alert('Strandhoot completed! In a real session, this would show results.');
  };

  // Create preview-specific props for blocks
  const getWelcomeBlockProps = (block: BlockType) => ({
    block: {
      ...block,
      content: {
        ...block.content,
        // Simulate experiment choice for evaluation system
        subject: strandhoot.subject,
        criteria: strandhoot.criteria,
        myp_year: strandhoot.myp_year,
      }
    },
    onUpdate: (updated: BlockType) => {
      // No-op for preview - could implement if needed
      console.log('Welcome block updated in preview:', updated);
    },
    onDelete: () => {
      // No-op for preview
      console.log('Delete called in preview mode');
    },
    readOnly: true,
    onStructureConfirmed: (details: { subject: string; criteria: string; mypYear: string }) => {
      // No-op for preview
      console.log('Structure confirmed in preview:', details);
    },
    onGenerateSkeleton: (structure: { subject: string; criteria: string; mypYear: string }) => {
      // No-op for preview
      console.log('Generate skeleton called in preview:', structure);
    },
  });

  const getStrandBlockProps = (block: BlockType) => {
    const strandIndex = currentStrand - 1;
    return {
      block: {
        ...block,
        content: {
          ...block.content,
          studentId: session.studentId,
          sessionCode: session.sessionCode,
          experimentChoice: 'distance', // Default for preview
        }
      },
      strandIndex,
      totalStrands: strandBlocks.length,
      allStrandBlocks: strandBlocks,
      badges: [], // Could populate from strandhoot data
      onNext: handleNext,
      onFinish: handleFinish,
      onUpdate: (updated: BlockType) => {
        // No-op for preview - could implement if needed
        console.log('Strand block updated in preview:', updated);
      },
      onDelete: () => {
        // No-op for preview
        console.log('Delete called in preview mode');
      },
      readOnly: false, // Allow interaction for preview
    };
  };

  if (!currentBlock) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-yellow-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Content Found</h2>
          <p className="text-gray-600 mb-6">
            This strandhoot appears to be empty or missing blocks.
          </p>
          <p className="text-sm text-gray-500">
            Please return to the builder and add some content blocks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Progress Bar - Only show for strand blocks */}
        {currentStrand > 0 && (
          <div className="mb-6">
            <StrandProgressBarGroup
              strandIndex={currentStrand - 1}
              totalStrands={strandBlocks.length}
              allStrandBlocks={strandBlocks}
              level={session.strandProgress[currentStrand - 1] || 0}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Block Content */}
          <div className="p-6 sm:p-8">
            {currentBlock.type === 'welcome' && (
              <WelcomeBlock {...getWelcomeBlockProps(currentBlock)} />
            )}
            
            {currentBlock.type === 'strand' && (
              <StrandPageBlock {...getStrandBlockProps(currentBlock)} />
            )}
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 px-6 py-4 sm:px-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              {/* Left - Previous button */}
              <div className="flex-1">
                {canGoBack ? (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="inline-flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>

              {/* Center - Current position indicator */}
              <div className="flex-1 text-center">
                <span className="text-sm text-gray-500">
                  {currentStrand === 0 
                    ? 'Welcome' 
                    : `Strand ${currentStrand} of ${strandBlocks.length}`
                  }
                </span>
              </div>

              {/* Right - Next/Finish button */}
              <div className="flex-1 flex justify-end">
                {isLastStrand ? (
                  <Button
                    onClick={handleFinish}
                    className="inline-flex items-center bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Finish
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!canGoNext && currentStrand > 0}
                    className="inline-flex items-center"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Progress indicator dots (mobile-friendly) */}
            <div className="mt-4 flex justify-center space-x-2 sm:hidden">
              {/* Welcome dot */}
              <div 
                className={`h-2 w-2 rounded-full ${
                  currentStrand === 0 ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
              
              {/* Strand dots */}
              {strandBlocks.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    currentStrand === index + 1 
                      ? 'bg-blue-600' 
                      : session.completedStrands[index]
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Session Info (Development/Debug) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Preview Session Info</h3>
            <div className="text-xs text-yellow-700 space-y-1">
              <div>Session: {session.sessionCode}</div>
              <div>Student ID: {session.studentId}</div>
              <div>Current Strand: {currentStrand}</div>
              <div>Progress: [{session.strandProgress.join(', ')}]</div>
              <div>Completed: [{session.completedStrands.map(c => c ? '✓' : '✗').join(', ')}]</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}