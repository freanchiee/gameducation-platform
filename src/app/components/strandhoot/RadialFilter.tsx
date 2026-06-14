'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RadialLeaf from './RadialLeaf';

const criteria = ['A', 'B', 'C', 'D'];
const years = ['MYP 1', 'MYP 2', 'MYP 3', 'MYP 4', 'MYP 5'];
const subjects = ['Physics', 'Chemistry', 'Biology', 'Maths', 'English', 'Design', 'Humanities'];

type RadialFilterProps = {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: { criteria?: string; year?: string; subject?: string }) => void;
};

export default function RadialFilter({ isOpen, onClose, onApplyFilters }: RadialFilterProps) {
  const [step, setStep] = useState<'criteria' | 'year' | 'subject'>('criteria');
  const [selectedCriteria, setSelectedCriteria] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep('criteria');
      setSelectedCriteria(null);
      setSelectedYear(null);
      setSelectedSubject(null);
    }
  }, [isOpen]);

  const handleApply = () => {
    onApplyFilters({
      criteria: selectedCriteria || undefined,
      year: selectedYear || undefined,
      subject: selectedSubject || undefined,
    });
    onClose();
  };

  const radius = 120;

  const renderLeaves = () => {
    if (step === 'criteria') {
      return criteria.map((c, i) => (
        <RadialLeaf
            key={c}
            label={`Criteria ${c}`}
            index={i}
            total={criteria.length}
            fanStart={0}
            fanSweep={360}
            radius={radius}
            selected={selectedCriteria === `Criteria ${c}`}
            onClick={() => {
                setSelectedCriteria(`Criteria ${c}`);
                setStep('year');
            }}
        />

      ));
    }

    if (step === 'year') {
      return years.map((y, i) => (
        <RadialLeaf
          key={y}
          label={y}
          index={i}
          total={years.length}
          fanStart={-60}
          fanSweep={120}
          radius={radius}
          selected={selectedYear === y}
          onClick={() => {
            setSelectedYear(y);
            setStep('subject');
          }}
        />
      ));
    }

    return subjects.map((s, i) => (
      <RadialLeaf
        key={s}
        label={s}
        index={i}
        total={subjects.length}
        fanStart={-90}
        fanSweep={180}
        radius={radius}
        selected={selectedSubject === s}
        onClick={() => setSelectedSubject(s)}
      />
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-[#f8efc6] rounded-full w-[400px] h-[400px] shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            {renderLeaves()}

            {/* Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-xl font-bold text-[#1f3674] mb-1">Filter</div>
              <div className="text-sm text-gray-700">
                {selectedCriteria || 'Pick Criteria'}
                {selectedYear && ` → ${selectedYear}`}
                {selectedSubject && ` → ${selectedSubject}`}
              </div>

              {selectedSubject && (
                <button
                  onClick={handleApply}
                  className="mt-4 px-4 py-2 bg-[#1f3674] text-white rounded hover:bg-[#2a478e]"
                >
                  ✅ Apply Filters
                </button>
              )}

              <button onClick={onClose} className="text-sm text-gray-500 mt-2 underline">
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
