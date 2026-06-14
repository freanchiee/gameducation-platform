'use client';

import { useState } from 'react';
import type { Editor } from '@tiptap/react';

type Props = {
  editor: Editor;
  onClose: () => void;
  onInsert: (img: string) => void;
};

export default function GraphFromTablePopup({ onInsert, onClose }: Props) {
  const [title, setTitle] = useState('Graph Title');
  const [xLabel, setXLabel] = useState('X Axis');
  const [yLabel, setYLabel] = useState('Y Axis');

  const insertGraph = () => {
    // This is a placeholder path for simulated graph insertion
    const dummyGraph = '/graph-placeholder.png';
    onInsert(dummyGraph);
  };

  return (
    <div className="bg-white rounded p-4 w-full max-w-md shadow-md">
      <h2 className="text-lg font-bold mb-2">Insert Graph</h2>

      <label className="block mb-2">
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input w-full"
        />
      </label>

      <label className="block mb-2">
        X Label
        <input
          value={xLabel}
          onChange={(e) => setXLabel(e.target.value)}
          className="input w-full"
        />
      </label>

      <label className="block mb-4">
        Y Label
        <input
          value={yLabel}
          onChange={(e) => setYLabel(e.target.value)}
          className="input w-full"
        />
      </label>

      <div className="flex gap-2 justify-end">
        <button onClick={insertGraph} className="btn btn-primary">
          Insert
        </button>
        <button onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
}
