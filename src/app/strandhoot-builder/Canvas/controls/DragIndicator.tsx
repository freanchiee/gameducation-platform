'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DragIndicatorProps {
  isHovering: boolean;
  dragState: {
    isDragging: boolean;
    dragSource?: string | null;
    draggedBlock?: {
      label?: string;
      icon?: string;
      type?: string;
    } | null;
  };
  dropPreview: {
    show: boolean;
    blockIcon?: string;
  };
  showFloating?: boolean;
  showGlobal?: boolean;
}

export default function DragIndicator({
  isHovering,
  dragState,
  dropPreview,
  showFloating = false,
  showGlobal = false,
}: DragIndicatorProps) {
  return (
    <>
      {/* Floating drop indicator for non-empty canvas */}
      {showFloating && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: isHovering ? 1.1 : 1
          }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div className={`px-8 py-6 rounded-3xl shadow-2xl flex items-center gap-4 font-semibold text-lg transition-all duration-300 backdrop-blur-sm ${
            isHovering 
              ? 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white scale-110 shadow-emerald-400/50' 
              : 'bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 text-white shadow-blue-400/50'
          }`}>
            <motion.div 
              className="w-4 h-4 bg-white rounded-full"
              animate={{ 
                scale: isHovering ? [1, 1.5, 1] : [1, 1.2, 1],
                opacity: [1, 0.3, 1] 
              }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <span>
              {isHovering 
                ? `Drop ${dragState.draggedBlock?.label || 'block'} here!`
                : `Dragging ${dragState.draggedBlock?.label || 'block'}`
              }
            </span>
            <motion.div 
              className={`text-3xl transition-transform duration-300 ${
                isHovering ? 'scale-125' : ''
              }`}
              animate={isHovering ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {isHovering ? '🎯' : (dropPreview.blockIcon || '📋')}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Global drag status indicator */}
      <AnimatePresence>
        {showGlobal && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 px-8 py-4 rounded-3xl shadow-2xl transition-all duration-300 backdrop-blur-md ${
              isHovering
                ? 'bg-gradient-to-r from-emerald-500/90 via-green-500/90 to-teal-500/90 text-white scale-110 shadow-emerald-400/50'
                : 'bg-gradient-to-r from-blue-500/90 via-cyan-500/90 to-sky-500/90 text-white shadow-blue-400/50'
            }`}
          >
            <div className="flex items-center gap-4 text-sm font-semibold">
              <motion.div 
                className="w-3 h-3 rounded-full bg-white"
                animate={{ 
                  scale: isHovering ? [1, 1.5, 1] : [1, 1.2, 1],
                  opacity: [1, 0.3, 1] 
                }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
              <span className="text-base">
                {isHovering 
                  ? `Drop ${dragState.draggedBlock?.label || 'block'} to add to canvas!` 
                  : `Dragging ${dragState.draggedBlock?.label || 'block'} from ${dragState.dragSource || 'unknown'}`
                }
              </span>
              <motion.span 
                className={`text-2xl transition-transform duration-300 ${
                  isHovering ? 'scale-125' : ''
                }`}
                animate={isHovering ? { 
                  rotate: [0, 15, -15, 0],
                  scale: [1.25, 1.4, 1.25]
                } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                {isHovering ? '🎯' : (dropPreview.blockIcon || '📋')}
              </motion.span>
            </div>
            
            {/* Enhanced progress indicator */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/40 rounded-full overflow-hidden"
              initial={{ width: '0%' }}
              animate={{ width: isHovering ? '100%' : '60%' }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="h-full bg-white rounded-full"
                animate={isHovering ? {
                  x: ['-100%', '100%'],
                  opacity: [0.7, 1, 0.7]
                } : {}}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Status indicator dots */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    isHovering ? 'bg-emerald-300' : 'bg-blue-300'
                  }`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}