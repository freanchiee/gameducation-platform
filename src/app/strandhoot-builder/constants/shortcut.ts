// src/app/strandhoot-builder/constants/shortcuts.ts

export interface KeyboardShortcut {
    key: string;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    description: string;
    action: string;
  }
  
  export const KEYBOARD_SHORTCUTS: Record<string, KeyboardShortcut> = {
    SAVE: {
      key: 's',
      ctrlKey: true,
      description: 'Save Strandhoot',
      action: 'save',
    },
    PREVIEW: {
      key: 'p',
      ctrlKey: true,
      description: 'Preview Strandhoot',
      action: 'preview',
    },
    DUPLICATE: {
      key: 'd',
      ctrlKey: true,
      description: 'Duplicate selected block',
      action: 'duplicate',
    },
    DELETE: {
      key: 'Delete',
      description: 'Delete selected block',
      action: 'delete',
    },
    DELETE_BACKSPACE: {
      key: 'Backspace',
      description: 'Delete selected block',
      action: 'delete',
    },
    UNDO: {
      key: 'z',
      ctrlKey: true,
      description: 'Undo last action',
      action: 'undo',
    },
    REDO: {
      key: 'y',
      ctrlKey: true,
      description: 'Redo last action',
      action: 'redo',
    },
    SELECT_ALL: {
      key: 'a',
      ctrlKey: true,
      description: 'Select all blocks',
      action: 'selectAll',
    },
    MOVE_UP: {
      key: 'ArrowUp',
      ctrlKey: true,
      description: 'Move selected block up',
      action: 'moveUp',
    },
    MOVE_DOWN: {
      key: 'ArrowDown',
      ctrlKey: true,
      description: 'Move selected block down',
      action: 'moveDown',
    },
    ESCAPE: {
      key: 'Escape',
      description: 'Clear selection / Close modals',
      action: 'escape',
    },
    HELP: {
      key: 'F1',
      description: 'Show keyboard shortcuts',
      action: 'help',
    },
    TOGGLE_TOOLBOX: {
      key: 't',
      ctrlKey: true,
      description: 'Toggle toolbox visibility',
      action: 'toggleToolbox',
    },
    ZOOM_IN: {
      key: '=',
      ctrlKey: true,
      description: 'Zoom in canvas',
      action: 'zoomIn',
    },
    ZOOM_OUT: {
      key: '-',
      ctrlKey: true,
      description: 'Zoom out canvas',
      action: 'zoomOut',
    },
    ZOOM_RESET: {
      key: '0',
      ctrlKey: true,
      description: 'Reset canvas zoom',
      action: 'zoomReset',
    },
  } as const;
  
  export const SHORTCUT_GROUPS = {
    GENERAL: ['SAVE', 'PREVIEW', 'HELP', 'ESCAPE'],
    EDITING: ['DUPLICATE', 'DELETE', 'DELETE_BACKSPACE', 'UNDO', 'REDO'],
    SELECTION: ['SELECT_ALL', 'MOVE_UP', 'MOVE_DOWN'],
    VIEW: ['TOGGLE_TOOLBOX', 'ZOOM_IN', 'ZOOM_OUT', 'ZOOM_RESET'],
  } as const;
  
  export const getShortcutString = (shortcut: KeyboardShortcut): string => {
    const parts: string[] = [];
    
    if (shortcut.ctrlKey) parts.push('Ctrl');
    if (shortcut.shiftKey) parts.push('Shift');
    if (shortcut.altKey) parts.push('Alt');
    
    // Handle special key names
    const keyName = shortcut.key === ' ' ? 'Space' : shortcut.key;
    parts.push(keyName);
    
    return parts.join(' + ');
  };
  
  export const matchesShortcut = (
    event: KeyboardEvent,
    shortcut: KeyboardShortcut
  ): boolean => {
    return (
      event.key === shortcut.key &&
      !!event.ctrlKey === !!shortcut.ctrlKey &&
      !!event.shiftKey === !!shortcut.shiftKey &&
      !!event.altKey === !!shortcut.altKey
    );
  };