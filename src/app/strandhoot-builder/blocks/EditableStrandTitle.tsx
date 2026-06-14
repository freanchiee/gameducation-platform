'use client';
import { Input } from '@/app/components/ui/input';

type Props = {
  title: string;
  readOnly: boolean;
  onChange: (value: string) => void;
};

export default function EditableStrandTitle({ title, readOnly, onChange }: Props) {
  return (
    <div className="mb-4">
      {readOnly ? (
        <h2 className="text-xl font-bold">{title}</h2>
      ) : (
        <Input
          value={title}
          onChange={(e) => onChange(e.target.value)}
          className="text-xl font-bold"
        />
      )}
    </div>
  );
}