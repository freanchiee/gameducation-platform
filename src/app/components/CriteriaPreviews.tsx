'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type CriteriaPreviewsProps = {
  role?: 'teacher' | 'student';
};

type CriteriaCard = {
  title: string;
  emoji: string;
  description: string;
  href: string;
};

const criteriaCards: CriteriaCard[] = [
  {
    title: 'Criteria B',
    emoji: '🧠',
    description: 'Analyze and Interpret Results',
    href: '/criteria-b-lab',
  },
  {
    title: 'Criteria C',
    emoji: '📊',
    description: 'Explain Patterns and Evaluate',
    href: '/criteria-c-lab',
  },
];

export default function CriteriaPreviews({ role = 'student' }: CriteriaPreviewsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {criteriaCards.map((card, index) => (
        <motion.div
          key={card.title}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border hover:shadow-xl transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div>
            <h3 className="text-xl font-bold text-[#1f3674] flex items-center gap-2 mb-2">
              <span>{card.emoji}</span>
              {card.title}
            </h3>
            <p className="text-gray-600">{card.description}</p>
          </div>

          <div className="mt-6">
            <Link
              href={card.href}
              className={`inline-block px-4 py-2 rounded-lg font-medium text-white ${
                role === 'teacher'
                  ? 'bg-blue-700 hover:bg-blue-800'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {role === 'teacher' ? '👁️ Preview as Student' : '🚀 Learn Independently'}
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
