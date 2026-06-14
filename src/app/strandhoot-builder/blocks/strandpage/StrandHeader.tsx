'use client';

import React from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { 
  Settings, 
  BookOpen, 
  TrendingUp, 
  Target,
  Award,
  Clock
} from 'lucide-react';

interface Props {
  strandIndex: number;
  strandName: string;
  strandLevel?: number;
  strandDescription?: string;
  estimatedTime?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  onRename: (newTitle: string) => void;
  onEvaluate?: () => void;
  onConfigure?: () => void;
  readOnly?: boolean;
  isEvaluating?: boolean;
}

export default function EnhancedStrandHeader({
  strandIndex,
  strandName,
  strandLevel = 0,
  strandDescription,
  estimatedTime,
  difficulty = 'intermediate',
  onRename,
  onEvaluate,
  onConfigure,
  readOnly = false,
  isEvaluating = false,
}: Props) {
  const progressPercent = Math.min(100, (strandLevel / 8) * 100);
  
  const getLevelColor = (level: number) => {
    if (level >= 7) return 'text-green-600';
    if (level >= 5) return 'text-blue-600';
    if (level >= 3) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getLevelBadgeColor = (level: number) => {
    if (level >= 7) return 'bg-green-100 text-green-800 border-green-200';
    if (level >= 5) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (level >= 3) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelIcon = (level: number) => {
    if (level >= 7) return <Award className="w-4 h-4" />;
    if (level >= 5) return <Target className="w-4 h-4" />;
    if (level >= 3) return <TrendingUp className="w-4 h-4" />;
    return <BookOpen className="w-4 h-4" />;
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-lg border border-blue-100 shadow-sm">
      {/* Main Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 mr-4">
          {readOnly ? (
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {strandName}
            </h1>
          ) : (
            <Input
              className="text-2xl font-bold border-none shadow-none p-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400"
              value={strandName}
              onChange={(e) => onRename(e.target.value)}
              placeholder="Enter strand title..."
            />
          )}
          
          {strandDescription && (
            <p className="text-gray-600 text-sm mt-1 max-w-2xl">
              {strandDescription}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {!readOnly && (
          <div className="flex gap-2">
            {onEvaluate && (
              <Button
                onClick={onEvaluate}
                disabled={isEvaluating}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isEvaluating ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Evaluating...
                  </>
                ) : (
                  <>
                    <TrendingUp size={16} className="mr-1" />
                    Evaluate
                  </>
                )}
              </Button>
            )}
            
            {onConfigure && (
              <Button
                onClick={onConfigure}
                variant="outline"
                size="sm"
              >
                <Settings size={16} className="mr-1" />
                Configure
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Metadata Row */}
      <div className="flex items-center gap-4 mb-4">
        <Badge variant="outline" className="text-xs">
          Strand {strandIndex + 1}
        </Badge>
        
        <Badge className={getDifficultyColor(difficulty)}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Badge>
        
        {estimatedTime && (
          <Badge variant="outline" className="text-xs">
            <Clock size={12} className="mr-1" />
            {estimatedTime}
          </Badge>
        )}
        
        <Badge className={getLevelBadgeColor(strandLevel)}>
          {getLevelIcon(strandLevel)}
          <span className="ml-1">
            Level {strandLevel}/8
          </span>
        </Badge>
      </div>

      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-700">
            Progress
          </span>
          <span className={`font-semibold ${getLevelColor(strandLevel)}`}>
            {Math.round(progressPercent)}%
          </span>
        </div>
        
        <Progress 
          value={progressPercent} 
          className="h-3 bg-gray-200"
        />
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>Basic (1-2)</span>
          <span>Developing (3-4)</span>
          <span>Proficient (5-6)</span>
          <span>Mastery (7-8)</span>
        </div>
      </div>

      {/* Achievement Indicators */}
      {strandLevel >= 7 && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center gap-2 text-green-800 text-sm">
            <Award size={16} />
            <span className="font-medium">🎉 Mastery Level Achieved!</span>
          </div>
        </div>
      )}
    </div>
  );
}