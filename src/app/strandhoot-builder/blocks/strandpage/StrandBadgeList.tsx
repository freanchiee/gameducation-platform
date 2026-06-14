import React from 'react';
import { motion } from 'framer-motion';

type Badge = {
  emoji: string;
  label: string;
  earned?: boolean;
  description?: string;
};

interface Props {
  badges: Badge[];
  showDescription?: boolean;
}

export default function StrandBadgeList({ badges, showDescription = false }: Props) {
  if (!Array.isArray(badges) || badges.length === 0) return null;

  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        🏅 Achievement Badges
        <span className="text-xs text-gray-500">
          ({badges.filter(b => b.earned).length}/{badges.length} earned)
        </span>
      </h4>
      
      <div className="flex flex-wrap gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`
              relative flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-200
              ${badge.earned 
                ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400 shadow-md' 
                : 'bg-gray-50 border-gray-300 opacity-60'
              }
            `}
            whileHover={{ scale: 1.02 }}
          >
            {/* Badge Icon */}
            <div className={`
              text-2xl flex-shrink-0 transition-transform duration-200
              ${badge.earned ? 'animate-pulse' : 'grayscale'}
            `}>
              {badge.emoji}
            </div>
            
            {/* Badge Content */}
            <div className="flex-1 min-w-0">
              <div className={`
                font-medium text-sm
                ${badge.earned ? 'text-orange-900' : 'text-gray-600'}
              `}>
                {badge.label}
              </div>
              
              {showDescription && badge.description && (
                <div className={`
                  text-xs mt-1
                  ${badge.earned ? 'text-orange-700' : 'text-gray-500'}
                `}>
                  {badge.description}
                </div>
              )}
            </div>
            
            {/* Earned Indicator */}
            {badge.earned && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white text-xs">✓</span>
              </motion.div>
            )}
            
            {/* Lock Indicator for Unearned Badges */}
            {!badge.earned && (
              <div className="text-gray-400 text-sm">
                🔒
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Progress Summary */}
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${(badges.filter(b => b.earned).length / badges.length) * 100}%` 
            }}
          />
        </div>
        <span className="text-xs font-medium">
          {Math.round((badges.filter(b => b.earned).length / badges.length) * 100)}% Complete
        </span>
      </div>
    </div>
  );
}