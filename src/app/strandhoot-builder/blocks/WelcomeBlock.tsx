'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { toast } from 'sonner';
import type { BlockType, WelcomeBlockProps, Badge, ExperimentType, WelcomeFormData } from '@/app/strandhoot-builder/types/strandhoot';
import EnhancedSubjectSelector from './welcome/SubjectSelector';
import GridBadgeEditor from './welcome/BadgeEditor';
import CustomizableExperimentEditor from './welcome/ExperimentEditor';
import EnhancedColorPicker from './welcome/ColorPicker';
import { getStrandsFor } from '../utils/strandMapping';

// Helper function to ensure Badge has required description
const ensureBadgeDescription = (badge: any): Badge => ({
  emoji: badge.emoji || '⭐',
  label: badge.label || 'Badge',
  description: badge.description || 'Badge description'
});

// 🆕 NEW: Emoji options for selectors
const EMOJI_OPTIONS = [
  // Science & Lab
  '🧲', '🧪', '⚗️', '🔬', '🧬', '⚛️', '🌡️', '📊', '📈', '📉',
  // General
  '🎯', '💡', '🚀', '⭐', '✨', '🔥', '💎', '🏆', '🎉', '🎊',
  // Learning
  '📚', '📖', '📝', '✏️', '📋', '📌', '📍', '🎓', '🧠', '💭',
  // Fun
  '🎮', '🎲', '🎪', '🎨', '🎭', '🎬', '🎵', '🎶', '🎸', '🥳',
  // Nature
  '🌟', '🌈', '🌸', '🌺', '🌻', '🌷', '🦋', '🐝', '🌙', '☀️'
];

export default function WelcomeBlock({
  block,
  onDelete,
  onUpdate,
  readOnly = false,
  onStructureConfirmed,
  onGenerateSkeleton,
}: WelcomeBlockProps) {
  // 🔧 FIX: Initialize state from block.content only once
  const initialFormData = useMemo<WelcomeFormData>(() => ({
    mainTitle: (block.content?.mainTitle as string) || 'Scientific Lab Report Guide: MYP Criteria C',
    tagline: (block.content?.tagline as string) || 'Learn how to write a compelling analysis and evaluation',
    explorerEmoji: (block.content?.explorerEmoji as string) || '🧲',
    explorerTitle: (block.content?.explorerTitle as string) || 'Magnetism Lab Explorer',
    timeEstimate: (block.content?.timeEstimate as string) || '40 minutes',
    description: (block.content?.description as string) || 'In this Criteria C activity, you\'ll focus on data analysis, hypothesis evaluation, method critique, and suggesting improvements. Master the skills needed to score higher in your science lab reports.',
    subject: (block.content?.subject as string) || '',
    criteria: (block.content?.criteria as string) || '',
    mypYear: (block.content?.myp_year as string) || '',
    badgesSectionEmoji: (block.content?.badgesSectionEmoji as string) || '🏅',
    badgesSectionTitle: (block.content?.badgesSectionTitle as string) || 'Available Badges',
    experimentsSectionEmoji: (block.content?.experimentsSectionEmoji as string) || '🧪',
    experimentsSectionTitle: (block.content?.experimentsSectionTitle as string) || 'Choose Your Experiment',
    badges: Array.isArray(block.content?.badges) 
      ? (block.content.badges as any[]).map(ensureBadgeDescription)
      : [
          { emoji: '📊', label: 'Data Dynamo', description: 'Accurate tables and clear graphs' },
          { emoji: '🧠', label: 'Ace Analyzer', description: 'Data trend + concept match' },
          { emoji: '🎯', label: 'Hypothesis Hero', description: 'Strong hypothesis evaluation' },
          { emoji: '✅', label: 'Method Master', description: 'Clear + safe procedure' },
          { emoji: '💡', label: 'Innovation Innovator', description: 'Smart improvement suggestions' }
        ] as Badge[],
    experiments: Array.isArray(block.content?.experiments) ? block.content.experiments as ExperimentType[] : [
      { 
        title: 'Distance\'s Effect on Magnetic Strength', 
        subtitle: 'How does distance affect a magnet\'s strength?' 
      },
      { 
        title: 'Multiple Magnets\' Effect on Strength', 
        subtitle: 'How does using multiple magnets affect magnetic strength?' 
      }
    ],
    color: (block.content?.color as string) || 'orange',
  }), [block.content]); // Only depend on block.content, not formData

  const [formData, setFormData] = useState<WelcomeFormData>(initialFormData);
  
  // Track if skeleton has been generated to prevent multiple generations
  const hasSkeletonGenerated = useRef(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUpdatingRef = useRef(false); // 🔧 FIX: Prevent recursive updates

  // Check if ready to build
  const readyToBuild = Boolean(formData.subject && formData.criteria && formData.mypYear);

  // 🔧 FIX: Completely rewrite the update logic to prevent loops
  const handleUpdate = useCallback((newFormData: WelcomeFormData) => {
    // Prevent recursive updates
    if (isUpdatingRef.current) return;
    
    // Clear any existing timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    // Debounce the update
    updateTimeoutRef.current = setTimeout(() => {
      isUpdatingRef.current = true;
      
      try {
        const updatedBlock: BlockType = {
          ...block,
          content: {
            ...block.content,
            ...newFormData,
          },
        };
        onUpdate(updatedBlock);
      } catch (error) {
        console.error('Error updating block:', error);
      } finally {
        isUpdatingRef.current = false;
      }
    }, 300); // Increased debounce time
  }, [block, onUpdate]);

  // 🔧 FIX: Only update when formData actually changes
  const prevFormDataRef = useRef<WelcomeFormData>(initialFormData);
  useEffect(() => {
    // Deep compare to prevent unnecessary updates
    const hasChanged = JSON.stringify(prevFormDataRef.current) !== JSON.stringify(formData);
    
    if (hasChanged && !isUpdatingRef.current) {
      prevFormDataRef.current = formData;
      handleUpdate(formData);
    }
    
    // Cleanup on unmount
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [formData, handleUpdate]);

  // 🔧 FIX: Memoize structure values with stable reference
  const structureValues = useMemo(() => ({
    subject: formData.subject,
    criteria: formData.criteria,
    mypYear: formData.mypYear,
  }), [formData.subject, formData.criteria, formData.mypYear]);

  // Calculate strand count from mapping
  const strandCount = useMemo(() => {
    if (!formData.subject || !formData.criteria) return 0;
    const strands = getStrandsFor(formData.subject, formData.criteria);
    return strands.length;
  }, [formData.subject, formData.criteria]);

  // 🔧 FIX: Only confirm structure when ready to build changes
  const hasConfirmedRef = useRef(false);
  useEffect(() => {
    if (readyToBuild && onStructureConfirmed && !hasConfirmedRef.current) {
      hasConfirmedRef.current = true;
      console.log('🔍 WelcomeBlock: Confirming structure:', structureValues);
      onStructureConfirmed(structureValues);
    }
    
    // Reset confirmation flag when not ready to build
    if (!readyToBuild) {
      hasConfirmedRef.current = false;
    }
  }, [readyToBuild, onStructureConfirmed, structureValues]);

  // 🔧 FIX: Stable updateField function
  const updateField = useCallback((field: keyof WelcomeFormData, value: any) => {
    setFormData(prev => {
      // Only update if value actually changed
      if (prev[field] === value) return prev;
      return { ...prev, [field]: value };
    });
  }, []);

  // Handle badge updates with proper type checking
  const handleBadgesChange = useCallback((badges: Badge[]) => {
    const safeBadges = badges.map(ensureBadgeDescription);
    updateField('badges', safeBadges);
  }, [updateField]);

  // 🚀 FIX: Enhanced skeleton generation with proper error handling and logging
  const handleGenerateSkeleton = useCallback(() => {
    console.log('🚀 WelcomeBlock: Generate skeleton clicked');
    console.log('🔍 Current state:', {
      readyToBuild,
      hasSkeletonGenerated: hasSkeletonGenerated.current,
      onGenerateSkeleton: !!onGenerateSkeleton,
      structureValues
    });

    if (!readyToBuild) {
      console.warn('❌ Not ready to build - missing required fields');
      toast.error('Please fill in Subject, Criteria, and MYP Year first');
      return;
    }

    if (hasSkeletonGenerated.current) {
      console.warn('❌ Skeleton already generated');
      toast.warning('Skeleton has already been generated');
      return;
    }

    if (!onGenerateSkeleton) {
      console.error('❌ onGenerateSkeleton callback not provided');
      toast.error('Generation callback not available');
      return;
    }

    try {
      const strands = getStrandsFor(formData.subject, formData.criteria);
      console.log('📊 Found strands:', strands);
      
      if (strands.length === 0) {
        const errorMsg = `No strands found for ${formData.subject} Criterion ${formData.criteria}`;
        console.error('❌', errorMsg);
        toast.error(errorMsg);
        return;
      }
      
      console.log('✅ Calling onGenerateSkeleton with:', structureValues);
      onGenerateSkeleton(structureValues);
      hasSkeletonGenerated.current = true;
      
      const successMsg = `Generated ${strands.length} ${formData.subject} Criterion ${formData.criteria} strand pages!`;
      console.log('✅', successMsg);
      
      toast.success(successMsg, {
        description: strands.map(s => `• ${s.heading}`).join('\n'),
        duration: 5000,
      });
    } catch (error) {
      console.error('💥 Error generating skeleton:', error);
      toast.error('Failed to generate skeleton. Please try again.');
    }
  }, [readyToBuild, onGenerateSkeleton, structureValues, formData.subject, formData.criteria]);

  // Memoize color classes
  const colorClasses = useMemo(() => {
    const colorMap = {
      orange: { bg: 'bg-gradient-to-br from-orange-500 to-orange-600', accent: 'bg-orange-100 text-orange-800' },
      blue: { bg: 'bg-gradient-to-br from-blue-500 to-blue-600', accent: 'bg-blue-100 text-blue-800' },
      green: { bg: 'bg-gradient-to-br from-green-500 to-green-600', accent: 'bg-green-100 text-green-800' },
      purple: { bg: 'bg-gradient-to-br from-purple-500 to-purple-600', accent: 'bg-purple-100 text-purple-800' },
      red: { bg: 'bg-gradient-to-br from-red-500 to-red-600', accent: 'bg-red-100 text-red-800' },
      teal: { bg: 'bg-gradient-to-br from-teal-500 to-teal-600', accent: 'bg-teal-100 text-teal-800' },
      indigo: { bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600', accent: 'bg-indigo-100 text-indigo-800' },
      pink: { bg: 'bg-gradient-to-br from-pink-500 to-pink-600', accent: 'bg-pink-100 text-pink-800' },
    };
    return colorMap[formData.color as keyof typeof colorMap] || colorMap.orange;
  }, [formData.color]);

  // 🔧 FIX: Add cleanup effect for timeouts
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className={`${colorClasses.bg} text-white p-6 text-center`}>
        {!readOnly ? (
          <>
            <Input
              value={formData.mainTitle}
              onChange={(e) => updateField('mainTitle', e.target.value)}
              className="text-2xl font-bold text-center bg-transparent border-none text-white placeholder:text-white/70 mb-2"
              placeholder="Main Title"
            />
            <Input
              value={formData.tagline}
              onChange={(e) => updateField('tagline', e.target.value)}
              className="text-lg text-center bg-transparent border-none text-white/90 placeholder:text-white/60"
              placeholder="Tagline"
            />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">{formData.mainTitle}</h1>
            <p className="text-lg text-white/90">{formData.tagline}</p>
          </>
        )}
      </div>

      {/* Main Content Card */}
      <div className="flex-1 bg-gradient-to-b from-orange-100 to-amber-100 p-6">
        <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
          
          {/* Explorer Title Section */}
          <div className="p-8 text-center border-b">
            <div className="flex items-center justify-center gap-3 mb-4">
              {!readOnly ? (
                <>
                  {/* 🆕 NEW: Explorer Emoji with Selector */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="w-16 h-16 text-2xl p-0 hover:bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all"
                        title="Click to change emoji"
                      >
                        {formData.explorerEmoji}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-3">
                      <div className="text-sm font-medium text-gray-700 mb-3">Choose Explorer Emoji:</div>
                      <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
                        {EMOJI_OPTIONS.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => updateField('explorerEmoji', emoji)}
                            className="text-2xl hover:bg-blue-100 rounded p-2 transition-colors"
                            title={`Select ${emoji}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    value={formData.explorerTitle}
                    onChange={(e) => updateField('explorerTitle', e.target.value)}
                    className="text-3xl font-bold text-center border-none bg-transparent text-gray-800"
                    placeholder="Lab Explorer Title"
                  />
                </>
              ) : (
                <>
                  <span className="text-2xl">{formData.explorerEmoji}</span>
                  <h2 className="text-3xl font-bold text-gray-800">{formData.explorerTitle}</h2>
                </>
              )}
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-gray-600">⏱️</span>
              <strong className="text-gray-700">Estimated Completion Time:</strong>
              {!readOnly ? (
                <Input
                  value={formData.timeEstimate}
                  onChange={(e) => updateField('timeEstimate', e.target.value)}
                  className="w-24 text-center border-none bg-transparent text-gray-700"
                  placeholder="40 minutes"
                />
              ) : (
                <span className="text-gray-700">{formData.timeEstimate}</span>
              )}
            </div>

            {!readOnly ? (
              <Textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="text-center text-gray-600 border-none bg-transparent resize-none"
                placeholder="Description of the activity..."
                rows={3}
              />
            ) : (
              <p className="text-gray-600 max-w-3xl mx-auto">{formData.description}</p>
            )}
          </div>

          {/* Badges Section */}
          <div className="p-8 border-b">
            <div className="flex items-center gap-2 mb-6">
              {!readOnly ? (
                <>
                  {/* 🆕 NEW: Badge Section Emoji with Selector */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="w-12 h-12 text-xl p-0 hover:bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all"
                        title="Click to change emoji"
                      >
                        {formData.badgesSectionEmoji}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-3">
                      <div className="text-sm font-medium text-gray-700 mb-3">Choose Badges Section Emoji:</div>
                      <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
                        {EMOJI_OPTIONS.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => updateField('badgesSectionEmoji', emoji)}
                            className="text-xl hover:bg-blue-100 rounded p-2 transition-colors"
                            title={`Select ${emoji}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    value={formData.badgesSectionTitle}
                    onChange={(e) => updateField('badgesSectionTitle', e.target.value)}
                    className="text-xl font-semibold border-none bg-transparent text-gray-800"
                    placeholder="Section Title"
                  />
                </>
              ) : (
                <h3 className="text-xl font-semibold text-gray-800">
                  {formData.badgesSectionEmoji} {formData.badgesSectionTitle}
                </h3>
              )}
            </div>
            
            <GridBadgeEditor
              badges={formData.badges}
              onBadgesChange={handleBadgesChange}
              readOnly={readOnly}
            />
          </div>

          {/* Subject Selection */}
          <div className="p-8 border-b bg-gray-50">
            <EnhancedSubjectSelector
              subject={formData.subject}
              criteria={formData.criteria}
              mypYear={formData.mypYear}
              onSubjectChange={(subject) => updateField('subject', subject)}
              onCriteriaChange={(criteria) => updateField('criteria', criteria)}
              onMypYearChange={(mypYear) => updateField('mypYear', mypYear)}
              readOnly={readOnly}
            />
          </div>

          {/* Experiments Section */}
          <div className="p-8 border-b">
            <CustomizableExperimentEditor
              sectionEmoji={formData.experimentsSectionEmoji}
              sectionTitle={formData.experimentsSectionTitle}
              experiments={formData.experiments}
              onSectionEmojiChange={(emoji) => updateField('experimentsSectionEmoji', emoji)}
              onSectionTitleChange={(title) => updateField('experimentsSectionTitle', title)}
              onExperimentsChange={(experiments) => updateField('experiments', experiments)}
              readOnly={readOnly}
            />
          </div>

          {/* Color Picker */}
          <div className="p-6 bg-gray-50">
            <EnhancedColorPicker
              selectedColor={formData.color}
              onColorChange={(color) => updateField('color', color)}
              readOnly={readOnly}
            />
          </div>

          {/* 🆕 MANUAL: Generate Skeleton CTA - Only on Button Click */}
          {readyToBuild && onGenerateSkeleton && !readOnly && !hasSkeletonGenerated.current && (
            <div className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-t">
              <div className="text-center">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800">🎉 Ready to Build!</h3>
                  <p className="text-gray-600 mt-2">
                    <strong>{formData.subject}</strong> • Criterion <strong>{formData.criteria}</strong> • MYP <strong>{formData.mypYear}</strong>
                  </p>
                  {strandCount > 0 && (
                    <div className="mt-3 p-3 bg-white/70 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">
                        Will create <span className="text-blue-600 font-bold">{strandCount} strand pages</span>
                      </p>
                      <div className="mt-2 flex flex-wrap justify-center gap-1 text-xs">
                        {getStrandsFor(formData.subject, formData.criteria).map((strand, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {strand.heading}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        👆 Click the button below to generate these strand pages
                      </p>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleGenerateSkeleton}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all"
                  disabled={!readyToBuild || hasSkeletonGenerated.current}
                >
                  🚀 Click to Generate {strandCount > 0 ? `${strandCount} ` : ''}Strand Pages
                </Button>
              </div>
            </div>
          )}

          {/* Show skeleton generated status */}
          {hasSkeletonGenerated.current && (
            <div className="p-4 bg-green-50 border-t text-center">
              <p className="text-green-800 font-medium">✅ Strandhoot skeleton generated successfully!</p>
              <p className="text-sm text-green-600 mt-1">
                Created {strandCount} strand pages for {formData.subject} Criterion {formData.criteria}
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}