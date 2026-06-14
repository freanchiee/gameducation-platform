// src/app/strandhoot-builder/hooks/useKeyboardShortcuts.ts

import { useEffect, useCallback } from 'react';
import { KEYBOARD_SHORTCUTS, matchesShortcut } from '../constants/shortcut';

interface KeyboardShortcutsConfig {
  onSave?: () => void;
  onPreview?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onSelectAll?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onEscape?: () => void;
  onHelp?: () => void;
  onToggleToolbox?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onZoomReset?: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onSave,
  onPreview,
  onDuplicate,
  onDelete,
  onUndo,
  onRedo,
  onSelectAll,
  onMoveUp,
  onMoveDown,
  onEscape,
  onHelp,
  onToggleToolbox,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  enabled = true,
}: KeyboardShortcutsConfig) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true' ||
      target.closest('[contenteditable="true"]')
    ) {
      // Only allow certain shortcuts in input fields
      if (matchesShortcut(event, KEYBOARD_SHORTCUTS.SAVE) && onSave) {
        event.preventDefault();
        onSave();
      }
      return;
    }

    // Handle shortcuts
    if (matchesShortcut(event, KEYBOARD_SHORTCUTS.SAVE) && onSave) {
      event.preventDefault();
      onSave();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.PREVIEW) && onPreview) {
      event.preventDefault();
      onPreview();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.DUPLICATE) && onDuplicate) {
      event.preventDefault();
      onDuplicate();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.DELETE) && onDelete) {
      event.preventDefault();
      onDelete();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.DELETE_BACKSPACE) && onDelete) {
      event.preventDefault();
      onDelete();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.UNDO) && onUndo) {
      event.preventDefault();
      onUndo();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.REDO) && onRedo) {
      event.preventDefault();
      onRedo();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.SELECT_ALL) && onSelectAll) {
      event.preventDefault();
      onSelectAll();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.MOVE_UP) && onMoveUp) {
      event.preventDefault();
      onMoveUp();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.MOVE_DOWN) && onMoveDown) {
      event.preventDefault();
      onMoveDown();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.ESCAPE) && onEscape) {
      event.preventDefault();
      onEscape();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.HELP) && onHelp) {
      event.preventDefault();
      onHelp();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.TOGGLE_TOOLBOX) && onToggleToolbox) {
      event.preventDefault();
      onToggleToolbox();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.ZOOM_IN) && onZoomIn) {
      event.preventDefault();
      onZoomIn();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.ZOOM_OUT) && onZoomOut) {
      event.preventDefault();
      onZoomOut();
    } else if (matchesShortcut(event, KEYBOARD_SHORTCUTS.ZOOM_RESET) && onZoomReset) {
      event.preventDefault();
      onZoomReset();
    }
  }, [
    enabled,
    onSave,
    onPreview,
    onDuplicate,
    onDelete,
    onUndo,
    onRedo,
    onSelectAll,
    onMoveUp,
    onMoveDown,
    onEscape,
    onHelp,
    onToggleToolbox,
    onZoomIn,
    onZoomOut,
    onZoomReset,
  ]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);

  return {
    shortcuts: KEYBOARD_SHORTCUTS,
    enabled,
  };
}