'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { useState } from 'react';

type EvalLogic = {
  keywords?: string[];
  concepts?: string[];
  exemplars?: string[];
  suggestions?: string[];
  correctIndex?: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  initial?: EvalLogic;
  onSave: (logic: EvalLogic) => void;
  mode?: 'open' | 'mcq';
  options?: { text: string; imageUrl?: string }[]; // required for MCQ
  questionId?: string;
};

export default function ConfigureEvaluationModal({
  open,
  onClose,
  initial,
  onSave,
  mode = 'open',
  options = [],
  questionId,
}: Props) {
  const [keywords, setKeywords] = useState<string[]>(initial?.keywords || []);
  const [concepts, setConcepts] = useState<string[]>(initial?.concepts || []);
  const [exemplars, setExemplars] = useState<string[]>(initial?.exemplars || []);
  const [suggestions, setSuggestions] = useState<string[]>(initial?.suggestions || []);
  const [correctIndex, setCorrectIndex] = useState<number | null>(initial?.correctIndex ?? null);

  const handleListChange = (index: number, list: string[], setList: (v: string[]) => void, value: string) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const handleAdd = (list: string[], setList: (v: string[]) => void) => {
    setList([...list, '']);
  };

  const handleRemove = (index: number, list: string[], setList: (v: string[]) => void) => {
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  const save = () => {
    if (mode === 'mcq' && correctIndex !== null) {
      onSave({ correctIndex });
    } else {
      onSave({ keywords, concepts, exemplars, suggestions });
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Configure Evaluation {questionId ? `: Q${questionId}` : ''}
          </DialogTitle>
        </DialogHeader>

        {mode === 'mcq' ? (
          <RadioGroup value={correctIndex?.toString()} onValueChange={(v) => setCorrectIndex(Number(v))} className="space-y-3 mt-4">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-3">
                <RadioGroupItem value={i.toString()} id={`opt-${i}`} />
                <label htmlFor={`opt-${i}`} className="text-sm font-medium">
                  {opt.text || <span className="italic text-muted-foreground">Image Option {i + 1}</span>}
                </label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-4">
            {[
             { label: 'Keywords', state: keywords, set: setKeywords },
             { label: 'Concepts', state: concepts, set: setConcepts },
             { label: 'Exemplars', state: exemplars, set: setExemplars },
             { label: 'Suggestions', state: suggestions, set: setSuggestions },
            ].map(({ label, state, set }) => (
              <div key={label}>
                <h3 className="text-sm font-semibold">{label}</h3>
                {state.map((item, i) => (
                  <div key={i} className="flex gap-2 items-center mb-2">
                    <Input
                      value={item}
                      onChange={(e) => handleListChange(i, state, set, e.target.value)}
                      placeholder={`Enter ${label.toLowerCase()} ${i + 1}`}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemove(i, state, set)}
                      className="text-red-500"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAdd(state, set)}
                  className="mt-1"
                >
                  ➕ Add {label}
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={mode === 'mcq' && correctIndex === null}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
