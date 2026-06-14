'use client';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import GraphFromTablePopup from '@/app/strandhoot-builder/blocks/GraphFromTablePopup';
import '@/app/strandhoot-builder/blocks/RichEditor.css';
import { useStrandSync } from '@/app/strandhoot-builder/hooks/useStrandSync';

type Props = {
  initialContent: string;
  onChange: (value: string) => void;
  currentStudentId: string;
  strandKey: string;
  experimentChoice: 'distance' | 'magnets';
  sessionCode?: string | null;
  readOnly?: boolean;
};

export default function StrandRichEditor({
  initialContent,
  onChange,
  currentStudentId,
  strandKey,
  experimentChoice,
  sessionCode = null,
  readOnly = false,
}: Props) {
  const [showTablePopup, setShowTablePopup] = useState(false);
  const [showGraphPopup, setShowGraphPopup] = useState(false);
  const [tableRows, setTableRows] = useState(2);
  const [tableCols, setTableCols] = useState(2);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent,
    editable: !readOnly,
    editorProps: {
      attributes: {
        class: 'prose max-w-none editor-content bg-white p-4 border rounded min-h-[300px]',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useStrandSync({
    studentId: currentStudentId,
    experiment: experimentChoice,
    sessionCode,
    strandKey, // ✅ already used
    levelKey: strandKey.replace('_input', '_level'), // You may need this if you haven't included it
    content: initialContent,
    evaluatedLevel: null, // You may need to track level separately or leave null
    onLoad: (saved) => {
      if (editor && editor.isEmpty && saved) {
        editor.commands.setContent(saved[strandKey] as string);
      }
    },
  });
  

  const addImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      editor?.chain().focus().insertContent('<p></p>').setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  const insertTable = () => {
    editor?.chain().focus().insertTable({
      rows: tableRows,
      cols: tableCols,
      withHeaderRow: true,
    }).run();
    setShowTablePopup(false);
  };

  if (!editor) return null;

  return (
    <div className="editor-wrapper">
      {!readOnly && (
        <div className="editor-toolbar">
          <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
          <button onClick={() => setShowTablePopup(true)}>➕ Table</button>
          <button onClick={() => editor.chain().focus().addColumnBefore().run()}>↤ Col</button>
          <button onClick={() => editor.chain().focus().addColumnAfter().run()}>Col ↦</button>
          <button onClick={() => editor.chain().focus().addRowBefore().run()}>↑ Row</button>
          <button onClick={() => editor.chain().focus().addRowAfter().run()}>↓ Row</button>
          <button onClick={() => editor.chain().focus().deleteColumn().run()}>❌ Col</button>
          <button onClick={() => editor.chain().focus().deleteRow().run()}>❌ Row</button>
          <button onClick={() => editor.chain().focus().deleteTable().run()}>🗑️ Table</button>
          <label className="upload-label">
            📷 Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && addImage(e.target.files[0])}
            />
          </label>
          <button onClick={() => setShowGraphPopup(true)}>📈 Graph</button>
        </div>
      )}

      {showTablePopup && (
        <div className="popup">
          <h4>Insert Table</h4>
          <label>
            Rows:
            <input
              type="number"
              min={1}
              value={tableRows}
              onChange={(e) => setTableRows(Number(e.target.value))}
            />
          </label>
          <label>
            Columns:
            <input
              type="number"
              min={1}
              value={tableCols}
              onChange={(e) => setTableCols(Number(e.target.value))}
            />
          </label>
          <div className="popup-buttons">
            <button onClick={insertTable}>Insert</button>
            <button onClick={() => setShowTablePopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showGraphPopup &&
        ReactDOM.createPortal(
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setShowGraphPopup(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto">
              <GraphFromTablePopup
                editor={editor}
                onClose={() => setShowGraphPopup(false)}
                onInsert={(img) => {
                  editor.chain().focus().insertContent('<p></p>').setImage({ src: img }).run();
                  setShowGraphPopup(false);
                }}
              />
            </div>
          </>,
          document.body
        )}

      <EditorContent editor={editor} />
    </div>
  );
}
