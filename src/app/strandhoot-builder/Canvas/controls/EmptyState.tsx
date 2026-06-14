'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmptyStateProps {
  isHovering: boolean;
  isDragging: boolean;
  draggedBlock?: any;
  dropPreview: {
    show: boolean;
    blockType?: string;
    blockIcon?: string;
  };
}

export default function EmptyState({ 
  isHovering, 
  isDragging, 
  draggedBlock,
  dropPreview 
}: EmptyStateProps) {
  const getDropZoneMessage = () => {
    if (isDragging) {
      if (isHovering) {
        return {
          icon: dropPreview.blockIcon || '🎯',
          title: 'Perfect! Drop Here!',
          subtitle: `Release to add ${draggedBlock?.label || 'block'} to your canvas`,
          color: 'text-emerald-700',
          bgColor: 'bg-emerald-100',
          borderColor: 'border-emerald-300'
        };
      } else {
        return {
          icon: dropPreview.blockIcon || '📋',
          title: 'Drag Over Canvas',
          subtitle: `Move ${draggedBlock?.label || 'block'} to the drop zone`,
          color: 'text-blue-700',
          bgColor: 'bg-blue-100',
          borderColor: 'border-blue-300'
        };
      }
    }
    return null;
  };

  const message = getDropZoneMessage();

  return (
    <motion.div
      initial={{ opacity: 0.7, scale: 0.98 }}
      animate={{ 
        opacity: isHovering ? 1 : 0.85,
        scale: isHovering ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
      className={`border-3 border-dashed rounded-xl p-12 text-center transition-all duration-300 relative overflow-hidden ${
        isHovering
          ? 'border-emerald-400 bg-emerald-50 shadow-2xl'
          : isDragging
          ? 'border-blue-400 bg-blue-50 shadow-lg'
          : 'border-zinc-300 bg-white shadow-sm'
      }`}
    >
      <div className="space-y-6 relative z-10">
        {message ? (
          <>
            <motion.div 
              className={`text-8xl transition-all duration-500 ${
                isHovering ? 'scale-125' : 'scale-110'
              }`}
              animate={isHovering ? {
                rotate: [0, 5, -5, 0],
                scale: [1.25, 1.3, 1.25]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {message.icon}
            </motion.div>
            
            <div className={`p-4 rounded-xl ${message.bgColor} ${message.borderColor} border-2`}>
              <h3 className={`text-2xl font-bold mb-2 ${message.color}`}>
                {message.title}
              </h3>
              
              <p className={`text-base ${message.color.replace('700', '600')}`}>
                {message.subtitle}
              </p>
            </div>
            
            {/* Enhanced animated drop zone indicator */}
            <AnimatePresence>
              {isHovering && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="mx-auto"
                >
                  <div className="relative">
                    {/* Outer ring */}
                    <motion.div
                      className="w-24 h-24 border-4 border-dashed border-emerald-400 rounded-full flex items-center justify-center mx-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      {/* Inner pulse */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 0.3, 0.7]
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-12 h-12 bg-emerald-400 rounded-full opacity-60"
                      />
                    </motion.div>
                    
                    {/* Preview of the block being dropped */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="bg-white px-3 py-1 rounded-full shadow-lg border-2 border-emerald-300 text-sm font-medium text-emerald-700">
                        {dropPreview.blockIcon} {draggedBlock?.label}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          // Default empty state
          <>
            <motion.div 
              className="text-8xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🚀
            </motion.div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-zinc-700">
                Start Building Your Strandhoot
              </h3>
              <p className="text-lg text-zinc-600 max-w-md mx-auto">
                Drag blocks from the toolbox to create your interactive learning experience
              </p>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-sm text-zinc-500 space-y-3 max-w-lg mx-auto border border-zinc-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💡</span>
                  <span>Start with a <strong className="text-zinc-700">Welcome Block</strong> to set up your strandhoot structure</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <span>Add <strong className="text-zinc-700">Strand Blocks</strong> for interactive learning sections</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">❓</span>
                  <span>Include <strong className="text-zinc-700">Question Blocks</strong> for assessment</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Background decoration for empty state */}
      {!isDragging && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-300 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-300 rounded-full blur-xl"></div>
        </div>
      )}
    </motion.div>
  );
}