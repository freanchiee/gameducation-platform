'use client';

import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Card } from '@/app/components/ui/card';
import { X } from 'lucide-react';

interface Experiment {
  title: string;
  subtitle: string;
}

interface Props {
  sectionEmoji: string;
  sectionTitle: string;
  experiments: Experiment[];
  onSectionEmojiChange: (emoji: string) => void;
  onSectionTitleChange: (title: string) => void;
  onExperimentsChange: (experiments: Experiment[]) => void;
  readOnly?: boolean;
}

export default function CustomizableExperimentEditor({
  sectionEmoji,
  sectionTitle,
  experiments = [],
  onSectionEmojiChange,
  onSectionTitleChange,
  onExperimentsChange,
  readOnly = false,
}: Props) {
  // Ensure experiments is always an array
  const safeExperiments = Array.isArray(experiments) ? experiments : [];

  const handleUpdate = (index: number, field: 'title' | 'subtitle', value: string) => {
    const updated = [...safeExperiments];
    updated[index] = { ...updated[index], [field]: value };
    onExperimentsChange(updated);
  };

  const handleAdd = () => {
    onExperimentsChange([...safeExperiments, { 
      title: 'New Experiment', 
      subtitle: 'Experiment description' 
    }]);
  };

  const handleRemove = (index: number) => {
    const updated = [...safeExperiments];
    updated.splice(index, 1);
    onExperimentsChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Section Header - Editable */}
      <div className="flex items-center gap-3 mb-6">
        {!readOnly ? (
          <>
            <Input
              value={sectionEmoji}
              onChange={(e) => onSectionEmojiChange(e.target.value)}
              className="w-16 text-2xl text-center border-none bg-transparent"
              placeholder="🧪"
            />
            <Input
              value={sectionTitle}
              onChange={(e) => onSectionTitleChange(e.target.value)}
              className="text-xl font-semibold border-none bg-transparent text-gray-800 flex-1"
              placeholder="Section Title"
            />
          </>
        ) : (
          <h3 className="text-xl font-semibold text-gray-800">
            {sectionEmoji} {sectionTitle}
          </h3>
        )}
      </div>

      {/* Experiments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safeExperiments.map((exp, i) => (
          <Card 
            key={i} 
            className="p-6 border rounded-lg hover:shadow-md transition-all relative group bg-white"
          >
            {/* Remove Button */}
            {!readOnly && safeExperiments.length > 1 && (
              <button
                onClick={() => handleRemove(i)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                aria-label="Remove experiment"
              >
                <X size={12} />
              </button>
            )}

            {/* Experiment Content */}
            <div className="space-y-3">
              {!readOnly ? (
                <>
                  <Input
                    value={exp.title}
                    onChange={(e) => handleUpdate(i, 'title', e.target.value)}
                    placeholder="Experiment Title"
                    className="font-bold text-lg"
                  />
                  <Textarea
                    value={exp.subtitle}
                    onChange={(e) => handleUpdate(i, 'subtitle', e.target.value)}
                    placeholder="Experiment description or question"
                    className="text-sm resize-none"
                    rows={3}
                  />
                </>
              ) : (
                <>
                  <h4 className="font-bold text-lg text-gray-800">{exp.title}</h4>
                  <p className="text-sm text-gray-600">{exp.subtitle}</p>
                </>
              )}
            </div>

            {/* Visual Enhancement for Read-only */}
            {readOnly && (
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Available
              </div>
            )}
          </Card>
        ))}

        {/* Add Experiment Card */}
        {!readOnly && (
          <Card 
            className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50"
            onClick={handleAdd}
          >
            <div className="flex flex-col items-center justify-center h-full min-h-[120px] text-gray-500 hover:text-blue-600 transition">
              <div className="text-3xl mb-2">➕</div>
              <div className="text-sm font-medium">Add Experiment</div>
            </div>
          </Card>
        )}
      </div>

      {/* Instructions for Students (Read-only mode) */}
      {readOnly && safeExperiments.length > 0 && (
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 font-medium">
            Select an experiment to begin your scientific investigation
          </p>
        </div>
      )}
    </div>
  );
}