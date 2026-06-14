'use client';

import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';

type FilterTriggerProps = {
  onOpen: () => void;
};

export default function FilterTrigger({ onOpen }: FilterTriggerProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onOpen}
      className="p-2 bg-[#1f3674] text-white rounded-full shadow hover:bg-[#2a478e]"
      aria-label="Open Filter Wheel"
    >
      <FaFilter size={20} />
    </motion.button>
  );
}
