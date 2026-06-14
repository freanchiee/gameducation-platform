'use client';

type Props = {
  tip: string;
};

export default function StrandTipEditor({ tip }: Props) {
  return (
    <div className="p-3 mb-3 bg-yellow-50 border text-sm text-yellow-900 rounded">
      💡 {tip}
    </div>
  );
}