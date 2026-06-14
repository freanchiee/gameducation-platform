'use client';
type Props = {
  badges: { emoji: string; label: string }[];
};

export default function StrandBadgeList({ badges }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {badges.map((badge, i) => (
        <span key={i} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
          {badge.emoji} {badge.label}
        </span>
      ))}
    </div>
  );
}