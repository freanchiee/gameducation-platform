'use client';
import { Progress } from '@/app/components/ui/progress';

type StrandBlockType = {
  content?: {
    title?: string;
  };
  label?: string;
  icon?: string;
};

type Props = {
  strandIndex: number;
  totalStrands: number;
  allStrandBlocks: StrandBlockType[];
  level: number;
};

export default function StrandProgressBarGroup({
  strandIndex,
  totalStrands,
  allStrandBlocks,
  level,
}: Props) {
  const percent = Math.min(100, Math.round((level / 8) * 100));

  return (
    <div className="flex gap-3 overflow-x-auto mb-6">
      {Array.from({ length: totalStrands }).map((_, i) => {
        // Safe access to strand with fallback
        const strand = allStrandBlocks?.[i] || {};
        const name = strand?.content?.title || strand?.label || `Strand ${i + 1}`;
        const emoji = strand?.icon || '🧪';
        const isCurrent = i === strandIndex;

        return (
          <div
            key={i}
            className={`min-w-[180px] p-3 rounded-lg border transition ${
              isCurrent ? 'bg-blue-50 border-blue-400 shadow-sm' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between text-sm font-semibold text-gray-800 mb-1">
              <span>
                {emoji} {name}
              </span>
              <span>{isCurrent ? `${percent}%` : '0%'}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">Level {isCurrent ? level : 0}</div>
            <Progress value={isCurrent ? percent : 0} className="h-2" />
          </div>
        );
      })}
    </div>
  );
}