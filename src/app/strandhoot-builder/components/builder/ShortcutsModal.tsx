'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { KEYBOARD_SHORTCUTS, SHORTCUT_GROUPS, getShortcutString } from '../../constants/shortcut';

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  const groupTitles = {
    GENERAL: 'General',
    EDITING: 'Editing',
    SELECTION: 'Selection & Movement',
    VIEW: 'View Controls',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {Object.entries(SHORTCUT_GROUPS).map(([groupKey, shortcuts]) => (
            <Card key={groupKey} className="p-4">
              <h3 className="font-semibold text-lg mb-3 text-zinc-800">
                {groupTitles[groupKey as keyof typeof groupTitles]}
              </h3>
              
              <div className="space-y-2">
                {shortcuts.map((shortcutKey) => {
                  const shortcut = KEYBOARD_SHORTCUTS[shortcutKey];
                  return (
                    <div key={shortcutKey} className="flex items-center justify-between py-2">
                      <span className="text-sm text-zinc-700">{shortcut.description}</span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {getShortcutString(shortcut)}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}

          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Tips</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Hold <kbd className="px-1 bg-white border rounded">Shift</kbd> to select multiple blocks</li>
              <li>• Use arrow keys with <kbd className="px-1 bg-white border rounded">Ctrl</kbd> to move blocks precisely</li>
              <li>• Press <kbd className="px-1 bg-white border rounded">Esc</kbd> to clear selection or close dialogs</li>
              <li>• Most shortcuts work when blocks are selected</li>
            </ul>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}