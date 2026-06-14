'use client';

import { motion } from 'framer-motion';

type RadialLeafProps = {
  label: string;
  index: number;
  total: number;
  fanStart: number;
  fanSweep: number;
  radius: number;
  selected: boolean;
  onClick: () => void;
};

export default function RadialLeaf({
  label,
  index,
  total,
  fanStart,
  fanSweep,
  radius,
  selected,
  onClick,
}: RadialLeafProps) {
  // 🔄 Compute angle based on index and fan sweep
  const angle = fanStart + (fanSweep / Math.max(1, total - 1)) * index;
  const radians = (angle * Math.PI) / 180;
  const x = Math.cos(radians) * radius;
  const y = Math.sin(radians) * radius;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-full border font-semibold text-sm ${
        selected ? 'bg-[#1f3674] text-white' : 'bg-white text-[#1f3674]'
      }`}
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
    >
      {label}
    </motion.button>
  );
}
