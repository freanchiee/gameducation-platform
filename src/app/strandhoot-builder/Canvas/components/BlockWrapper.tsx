'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { BlockType } from '../../types/strandhoot';

interface BlockWrapperProps {
  children: React.ReactNode;
  block: BlockType;
  index: number;
  isSelected?: boolean;
  readOnly?: boolean;
  onSelect?: () => void;
  onConfigure?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export default function BlockWrapper({
  children,
  block,
  index,
  isSelected = false,
  readOnly = false,
  onSelect,
  onConfigure,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
}: BlockWrapperProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (!readOnly && onSelect) {
      e.stopPropagation();
      onSelect();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`relative ${isSelected ? 'ring-2 ring-blue-400 ring-offset-2 rounded-lg' : ''}`}
      onClick={handleClick}
    >
      <div className={`${
        readOnly 
          ? '' 
          : 'bg-white p-6 rounded-xl shadow-md border border-zinc-200 hover:shadow-lg transition-all duration-200'
      } relative group`}>
        
        {/* Selection indicator */}
        {isSelected && !readOnly && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none bg-blue-50/20"
          />
        )}
        
        {/* Control buttons */}
        {!readOnly && (
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex gap-1 bg-white rounded-lg shadow-lg border p-1">
              {onConfigure && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfigure();
                  }}
                  title="Configure block"
                  className="w-8 h-8 rounded-md bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 flex items-center justify-center transition-all duration-200 text-xs hover:scale-110"
                >
                  ⚙️
                </button>
              )}
              
              {onDuplicate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicate();
                  }}
                  title="Duplicate block"
                  className="w-8 h-8 rounded-md bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 flex items-center justify-center transition-all duration-200 text-xs hover:scale-110"
                >
                  📋
                </button>
              )}

              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  title="Delete block"
                  className="w-8 h-8 rounded-md bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 flex items-center justify-center transition-all duration-200 text-xs font-bold hover:scale-110"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        )}

        {/* Drag handle */}
        {!readOnly && (
          <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-8 h-8 rounded-md bg-white shadow-lg border flex items-center justify-center cursor-move text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
              </svg>
            </div>
          </div>
        )}

        {/* Block Content */}
        {children}
      </div>

      {/* Move handles */}
      {!readOnly && onMoveUp && canMoveUp && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-t from-gray-600 to-gray-500 text-white hover:from-gray-700 hover:to-gray-600 flex items-center justify-center text-xs shadow-lg border-2 border-white"
          title="Move up"
        >
          ↑
        </motion.button>
      )}
      
      {!readOnly && onMoveDown && canMoveDown && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-b from-gray-600 to-gray-500 text-white hover:from-gray-700 hover:to-gray-600 flex items-center justify-center text-xs shadow-lg border-2 border-white"
          title="Move down"
        >
          ↓
        </motion.button>
      )}
    </motion.div>
  );
}