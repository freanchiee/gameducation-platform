"use client";

export interface CellbookSession {
  studentId: string;
  classId: string;
  worldId: string;
  displayName: string;
}

const SESSION_KEY = "learnbook:cellbook:session";

export function getCellbookSession(): CellbookSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CellbookSession;
  } catch {
    return null;
  }
}

export function setCellbookSession(session: CellbookSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearCellbookSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
