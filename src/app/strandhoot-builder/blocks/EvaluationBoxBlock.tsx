'use client';
import { Card } from '@/app/components/ui/card';

export default function EvaluationBoxBlock() {
  return (
    <Card className="bg-green-50 p-4 border-l-4 border-green-400 text-green-800">
      ✅ Evaluation Summary:
      <ul className="list-disc ml-5 mt-2">
        <li>Level: 6</li>
        <li>Keywords Matched: magnetic, distance</li>
        <li>Concepts Matched: inverse relationship</li>
      </ul>
    </Card>
  );
}
