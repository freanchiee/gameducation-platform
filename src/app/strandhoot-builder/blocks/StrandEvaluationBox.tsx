'use client';

type Props = {
  level: number;
  keywords: string[];
  concepts: string[];
};

export default function StrandEvaluationBox({ level, keywords, concepts }: Props) {
  return (
    <div className="mt-4 bg-gray-50 border rounded p-3 text-sm">
      <div className="font-medium text-gray-800 mb-1">📊 Live Evaluation</div>
      <p>Level: <strong>{level}</strong></p>
      <p className="mt-1 text-gray-700">
        <strong>Keywords matched:</strong> {keywords.join(', ') || 'None'}
      </p>
      <p className="text-gray-700">
        <strong>Concepts matched:</strong> {concepts.join(', ') || 'None'}
      </p>
    </div>
  );
}