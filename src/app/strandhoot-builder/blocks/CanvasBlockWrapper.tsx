'use client';

import { ReactNode } from 'react';

export default function CanvasBlockWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-zinc-200 hover:shadow-lg transition">
      {children}
    </div>
  );
}
