'use client';

import React, { useCallback, useMemo } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/app/components/ui/select';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';

const SUBJECTS = [
  'Sciences',
  'Mathematics',
  'Language and Literature',
  'Language Acquisition',
  'Individuals and Societies',
  'Arts',
  'Design & Technology',
];

const YEARS = ['1', '2', '3', '4', '5'];

interface Props {
  subject: string;
  criteria: string;
  mypYear: string;
  onSubjectChange: (subject: string) => void;
  onCriteriaChange: (criteria: string) => void;
  onMypYearChange: (year: string) => void;
  readOnly?: boolean;
}

export default function EnhancedSubjectSelector({
  subject,
  criteria,
  mypYear,
  onSubjectChange,
  onCriteriaChange,
  onMypYearChange,
  readOnly = false,
}: Props) {

  // 🔧 FIX: Memoize handlers to prevent recreation on every render
  const handleSubjectChange = useCallback((value: string) => {
    onSubjectChange(value);
  }, [onSubjectChange]);

  const handleMypYearChange = useCallback((value: string) => {
    onMypYearChange(value);
  }, [onMypYearChange]);

  const handleCriteriaChange = useCallback((criteriaValue: string) => {
    onCriteriaChange(criteriaValue);
  }, [onCriteriaChange]);

  // 🔧 FIX: Memoize values to prevent unnecessary re-renders
  const memoizedSubject = useMemo(() => subject || '', [subject]);
  const memoizedMypYear = useMemo(() => mypYear || '', [mypYear]);
  const memoizedCriteria = useMemo(() => criteria || '', [criteria]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Name</h3>
        <Input
          placeholder="Enter your name"
          className="max-w-md mx-auto text-center text-lg"
          disabled={readOnly}
        />
      </div>

      {/* Subject & Year Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-700 mb-2 block font-medium">Subject</Label>
          <Select 
            value={memoizedSubject} 
            onValueChange={handleSubjectChange} 
            disabled={readOnly}
          >
            <SelectTrigger className="w-full h-12 text-lg">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s} className="text-lg">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-700 mb-2 block font-medium">MYP Year</Label>
          <Select 
            value={memoizedMypYear} 
            onValueChange={handleMypYearChange} 
            disabled={readOnly}
          >
            <SelectTrigger className="w-full h-12 text-lg">
              <SelectValue placeholder="MYP Year" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((y) => (
                <SelectItem key={y} value={y} className="text-lg">
                  MYP {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quadrant Criteria Selector */}
      <div className="text-center">
        <Label className="text-gray-700 mb-4 block font-medium text-lg">
          Assessment Criterion
        </Label>
        
        <div className="flex justify-center mb-4">
          <div className="relative">
            {/* Circular quadrant container */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-200 flex flex-wrap items-center justify-center relative overflow-hidden shadow-lg">
              {/* Quadrant A - Top Left */}
              <CriteriaButton
                criteria="A"
                position="top-left"
                isSelected={memoizedCriteria === 'A'}
                onClick={handleCriteriaChange}
                readOnly={readOnly}
              />

              {/* Quadrant B - Top Right */}
              <CriteriaButton
                criteria="B"
                position="top-right"
                isSelected={memoizedCriteria === 'B'}
                onClick={handleCriteriaChange}
                readOnly={readOnly}
              />

              {/* Quadrant C - Bottom Left */}
              <CriteriaButton
                criteria="C"
                position="bottom-left"
                isSelected={memoizedCriteria === 'C'}
                onClick={handleCriteriaChange}
                readOnly={readOnly}
              />

              {/* Quadrant D - Bottom Right */}
              <CriteriaButton
                criteria="D"
                position="bottom-right"
                isSelected={memoizedCriteria === 'D'}
                onClick={handleCriteriaChange}
                readOnly={readOnly}
              />

              {/* Center circle for visual appeal */}
              <div className="absolute inset-4 rounded-full bg-white/80 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">MYP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected criteria display */}
        {memoizedCriteria && (
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              Selected: Criterion {memoizedCriteria}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// 🔧 FIX: Extracted CriteriaButton to separate component to prevent re-renders
interface CriteriaButtonProps {
  criteria: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  isSelected: boolean;
  onClick: (criteria: string) => void;
  readOnly: boolean;
}

const CriteriaButton = React.memo(function CriteriaButton({
  criteria,
  position,
  isSelected,
  onClick,
  readOnly,
}: CriteriaButtonProps) {
  const handleClick = useCallback(() => {
    if (!readOnly) {
      onClick(criteria);
    }
  }, [onClick, criteria, readOnly]);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'absolute top-0 left-0';
      case 'top-right':
        return 'absolute top-0 right-0';
      case 'bottom-left':
        return 'absolute bottom-0 left-0';
      case 'bottom-right':
        return 'absolute bottom-0 right-0';
    }
  };

  const getBorderRadius = () => {
    switch (position) {
      case 'top-left':
        return { borderRadius: '100% 0 0 0' };
      case 'top-right':
        return { borderRadius: '0 100% 0 0' };
      case 'bottom-left':
        return { borderRadius: '0 0 0 100%' };
      case 'bottom-right':
        return { borderRadius: '0 0 100% 0' };
    }
  };

  const getColorClasses = () => {
    const colorMap = {
      'A': { selected: 'bg-blue-500 text-white shadow-lg z-10', hover: 'text-blue-600 hover:bg-blue-200' },
      'B': { selected: 'bg-green-500 text-white shadow-lg z-10', hover: 'text-green-600 hover:bg-green-200' },
      'C': { selected: 'bg-orange-500 text-white shadow-lg z-10', hover: 'text-orange-600 hover:bg-orange-200' },
      'D': { selected: 'bg-purple-500 text-white shadow-lg z-10', hover: 'text-purple-600 hover:bg-purple-200' },
    };
    return colorMap[criteria as keyof typeof colorMap] || colorMap.A;
  };

  const colors = getColorClasses();

  return (
    <button
      onClick={handleClick}
      disabled={readOnly}
      className={`${getPositionClasses()} w-16 h-16 flex items-center justify-center text-2xl font-bold transition-all duration-200 ${
        isSelected ? colors.selected : colors.hover
      } ${readOnly ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
      style={getBorderRadius()}
    >
      {criteria}
    </button>
  );
});