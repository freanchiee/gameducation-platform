'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';

type StrandDetail = {
  title: string;
  icon: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (details: StrandDetail[]) => void;
};

const EMOJI_OPTIONS = [
  '🧪', '📊', '🎯', '📚', '🧠', '🧬', '📈', '🔬', '💡', '🧵',
  '📌', '🧲', '📝', '🧰', '🎓', '⚗️', '🔍', '📦', '🗂', '🧯',
  '🚀', '🌡️', '🧹', '🧺', '🧼', '💥', '🎮', '🪐', '📡', '🧿'
];

export default function StrandDetailsModal({ open, onClose, onConfirm }: Props) {
  const [count, setCount] = useState(3);
  const [details, setDetails] = useState<StrandDetail[]>([
    { title: '', icon: '📌' },
    { title: '', icon: '📌' },
    { title: '', icon: '📌' },
  ]);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = Math.max(1, Math.min(6, parseInt(e.target.value) || 1));
    setCount(newCount);
    const updated = [...details];
    while (updated.length < newCount) updated.push({ title: '', icon: '📌' });
    if (updated.length > newCount) updated.splice(newCount);
    setDetails(updated);
  };

  const handleTitleChange = (index: number, value: string) => {
    const updated = [...details];
    updated[index].title = value;
    setDetails(updated);
  };

  const handleIconSelect = (index: number, emoji: string) => {
    const updated = [...details];
    updated[index].icon = emoji;
    setDetails(updated);
  };

  const handleSubmit = () => {
    const filled = details.map((d, i) => ({
      title: d.title || `Strand ${i + 1}`,
      icon: d.icon || '🧪',
    }));
    onConfirm(filled);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Strand Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              How many strands?
            </label>
            <Input
              type="number"
              min={1}
              max={6}
              value={count}
              onChange={handleCountChange}
            />
          </div>

          <div className="space-y-3">
            {details.slice(0, count).map((strand, i) => (
              <div key={i} className="flex items-center gap-3">
                <Input
                  placeholder={`Strand ${i + 1} Title`}
                  value={strand.title}
                  onChange={(e) => handleTitleChange(i, e.target.value)}
                  className="flex-1"
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="w-10 text-xl px-0" variant="outline">
                      {strand.icon}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 max-h-[200px] overflow-y-auto grid grid-cols-6 gap-2 p-2">
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleIconSelect(i, emoji)}
                        className="text-lg hover:bg-gray-100 p-1 rounded"
                      >
                        {emoji}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-orange-500 text-white hover:bg-orange-600">
              Create Strands
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}