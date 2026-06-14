'use client';

import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';

interface Props {
  title: string;
  subtitle: string;
  onTitleChange: (title: string) => void;
  onSubtitleChange: (subtitle: string) => void;
  readOnly?: boolean;
}

export default function WelcomeTitleBlock({
  title,
  subtitle,
  onTitleChange,
  onSubtitleChange,
  readOnly = false,
}: Props) {
  return (
    <div className="space-y-4 mb-6">
      <Input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Main Title"
        className="text-white placeholder:text-white/60 bg-white/10 border-white/20"
        disabled={readOnly}
      />
      <Textarea
        value={subtitle}
        onChange={(e) => onSubtitleChange(e.target.value)}
        placeholder="Subtitle"
        className="text-white placeholder:text-white/60 bg-white/10 border-white/20"
        disabled={readOnly}
      />
    </div>
  );
}