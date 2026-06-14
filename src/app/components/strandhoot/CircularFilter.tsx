'use client';

import React from 'react';
import { motion } from 'framer-motion';

type FilterType = 'criteria' | 'subject' | 'grade';

type CircularFilterProps = {
  type: FilterType;
  selected: string | null;
  onSelect: (value: string) => void;
};

const subjectOptions = ['Physics', 'Chemistry', 'Biology', 'Maths', 'English', 'Geography', 'History', 'ICT'];
const gradeOptions = ['MYP1', 'MYP2', 'MYP3', 'MYP4', 'MYP5'];
const criteriaOptions = ['A', 'B', 'C', 'D'];

export default function CircularFilter({ type, selected, onSelect }: CircularFilterProps) {
  const options =
    type === 'criteria' ? criteriaOptions :
    type === 'subject' ? subjectOptions :
    gradeOptions;

  const colors = {
    criteria: '#1f3674',
    subject: '#c3282d',
    grade: '#547ca4'
  };

  return (
    <div className="text-center">
      <p className="mb-1 font-semibold">{type.toUpperCase()}</p>
      <div
        className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center flex-wrap p-2"
        style={{
          backgroundColor: '#f8efc6',
          border: `2px solid ${colors[type]}`,
          borderRadius: '50%',
        }}
      >
        {options.map((option, idx) => (
          <motion.button
            key={option}
            onClick={() => onSelect(option)}
            className={`text-xs md:text-sm font-medium m-1 px-2 py-1 rounded-full border ${
              selected === option ? 'bg-[#1f3674] text-white' : 'bg-white text-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }} // ✅ using idx
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
