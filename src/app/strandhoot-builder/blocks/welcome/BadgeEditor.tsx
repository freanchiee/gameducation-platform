// FIXED: src/app/strandhoot-builder/blocks/welcome/BadgeEditor.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { X, Edit3 } from 'lucide-react';
// FIXED: Import Badge from unified types
import type { Badge } from '@/app/strandhoot-builder/types/strandhoot';

// Educational emoji categories
const EMOJI_CATEGORIES = {
  'Achievement': ['🏆', '🥇', '⭐', '🌟', '💫', '🎯', '🎖️', '🏅'],
  'Subject': ['📊', '🔬', '🧪', '📈', '🎨', '🌍', '💻', '🧮'],
  'Activity': ['✍️', '🎭', '🎵', '⚽', '🏃', '🤝', '💡', '🔍'],
  'General': ['😊', '👍', '🎉', '🔥', '💪', '🚀', '✨', '💎'],
};

interface Props {
  badges: Badge[];  // Using unified Badge type
  onBadgesChange: (badges: Badge[]) => void;
  readOnly?: boolean;
}

export default function GridBadgeEditor({
  badges = [],
  onBadgesChange,
  readOnly = false,
}: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null);

  // FIXED: Ensure badges is always an array with proper Badge structure
  const safeBadges: Badge[] = Array.isArray(badges) ? badges.map(badge => ({
    emoji: badge.emoji || '⭐',
    label: badge.label || 'Badge',
    description: badge.description || 'Badge description'  // Always ensure description exists
  })) : [];

  const handleUpdate = (index: number, field: keyof Badge, value: string) => {
    const updated = [...safeBadges];
    updated[index] = { ...updated[index], [field]: value };
    onBadgesChange(updated);
  };

  const handleAdd = () => {
    const newBadge: Badge = { 
      emoji: '⭐', 
      label: 'New Badge', 
      description: 'Badge description' 
    };
    onBadgesChange([...safeBadges, newBadge]);
  };

  const handleRemove = (index: number) => {
    const updated = [...safeBadges];
    updated.splice(index, 1);
    onBadgesChange(updated);
  };

  const selectEmoji = (index: number, emoji: string) => {
    handleUpdate(index, 'emoji', emoji);
    setShowEmojiPicker(null);
  };

  return (
    <div className="space-y-6">
      {/* Badge Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {safeBadges.map((badge, i) => (
          <Card 
            key={i} 
            className={`p-4 border rounded-lg transition-all hover:shadow-md relative group ${
              editingIndex === i ? 'ring-2 ring-blue-400 bg-blue-50' : 'bg-gray-50'
            }`}
          >
            {/* Edit/Delete buttons for non-readonly mode */}
            {!readOnly && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={() => setEditingIndex(editingIndex === i ? null : i)}
                  className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition"
                  title="Edit badge"
                >
                  <Edit3 size={12} />
                </button>
                <button
                  onClick={() => handleRemove(i)}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                  title="Remove badge"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Badge Content */}
            <div className="flex items-start gap-3">
              {/* Emoji */}
              <div className="relative">
                {editingIndex === i && !readOnly ? (
                  <button
                    onClick={() => setShowEmojiPicker(showEmojiPicker === i ? null : i)}
                    className="w-12 h-12 text-2xl bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 transition"
                  >
                    {badge.emoji}
                  </button>
                ) : (
                  <div className="w-12 h-12 text-2xl flex items-center justify-center">
                    {badge.emoji}
                  </div>
                )}
                
                {/* Emoji Picker Popup */}
                {showEmojiPicker === i && (
                  <div className="absolute top-14 left-0 z-50 bg-white rounded-lg shadow-xl border p-3 w-64">
                    {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
                      <div key={category} className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-600 mb-1">
                          {category}
                        </h4>
                        <div className="grid grid-cols-8 gap-1">
                          {emojis.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => selectEmoji(i, emoji)}
                              className="w-7 h-7 text-lg hover:bg-gray-100 rounded flex items-center justify-center transition"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => setShowEmojiPicker(null)}
                      className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              {/* Badge Info */}
              <div className="flex-1 min-w-0">
                {editingIndex === i && !readOnly ? (
                  <div className="space-y-2">
                    <Input
                      value={badge.label}
                      onChange={(e) => handleUpdate(i, 'label', e.target.value)}
                      className="font-medium"
                      placeholder="Badge name"
                    />
                    <Textarea
                      value={badge.description}
                      onChange={(e) => handleUpdate(i, 'description', e.target.value)}
                      className="text-sm resize-none"
                      placeholder="Badge description"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setEditingIndex(null)}
                        className="text-xs"
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="font-medium text-gray-900 mb-1">
                      {badge.label}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {badge.description}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}

        {/* Add Badge Card */}
        {!readOnly && (
          <Card 
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50"
            onClick={handleAdd}
          >
            <div className="flex flex-col items-center justify-center h-full min-h-[100px] text-gray-500 hover:text-blue-600 transition">
              <div className="text-3xl mb-2">➕</div>
              <div className="text-sm font-medium">Add Badge</div>
            </div>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      {!readOnly && safeBadges.length > 0 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditingIndex(null)}
            className="text-xs"
          >
            {editingIndex !== null ? 'Finish Editing' : 'Edit Mode'}
          </Button>
        </div>
      )}
    </div>
  );
}