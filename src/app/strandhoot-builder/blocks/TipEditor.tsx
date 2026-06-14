'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/app/components/ui/textarea';

type Props = {
  initial: string;
  onChange: (text: string) => void;
  readOnly?: boolean;
};

export default function TipEditor({ initial, onChange, readOnly = false }: Props) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]); // ✅ ESLint-safe dependency list

  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1 text-yellow-800">💡 Tip</label>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={readOnly}
        className="bg-yellow-50 border text-sm"
      />
    </div>
  );
}
