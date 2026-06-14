'use client';

import React from 'react';

interface ResponseEntry {
  student_id: string;
  [key: string]: string | number | boolean | object | null | undefined;
}

interface StrandPreviewPanelProps {
  studentId: string;
  strand: number;
  responses: ResponseEntry[];

}

export default function StrandPreviewPanel({
  studentId,
  strand,
  responses,
}: StrandPreviewPanelProps) {
  const r = responses.find(
    (entry) =>
      entry.student_id?.trim().toLowerCase() === studentId?.trim().toLowerCase()
  );

  const html = r?.[`strand${strand}`];
  const level = r?.[`strand${strand}_level`] as number | undefined;

  if (!studentId || !html) return null;

  return (
    <div className="w-72 bg-white p-4 rounded shadow border text-sm text-gray-800">
      <h3 className="text-base font-bold mb-2 text-[#1f3674]">
        {studentId} – Strand {strand}
      </h3>

      <p className="text-xs font-semibold text-gray-600 mb-1">
        Level: {level ?? '?'} / 8
      </p>

      <div className="mb-3 border h-2 rounded bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-green-600 transition-all duration-700"
          style={{ width: `${((level ?? 0) / 8) * 100}%` }}
        />
      </div>

      <div
        className="prose prose-sm max-w-none bg-gray-50 p-2 border rounded"
        dangerouslySetInnerHTML={{
          __html: typeof html === 'string' ? html : '',
        }}
      />
    </div>
  );
}
