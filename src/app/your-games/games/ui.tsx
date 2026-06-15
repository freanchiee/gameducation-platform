"use client"

// Small shared chrome for activities so every game looks consistent.
import type { ReactNode } from "react"
import { RotateCcw } from "lucide-react"

/** Centered board wrapper with a title and an optional "play again" button. */
export function GameFrame({
  title,
  accent,
  onRestart,
  toolbar,
  children,
}: {
  title: string
  accent: string
  onRestart?: () => void
  toolbar?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold" style={{ color: accent, fontFamily: "var(--font-display)" }}>
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {toolbar}
          {onRestart && (
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <RotateCcw className="size-4" />
              Restart
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

/** Pill button used inside activities. */
export function PlayButton({
  children,
  onClick,
  accent,
  disabled,
  className = "",
}: {
  children: ReactNode
  onClick?: () => void
  accent: string
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      style={{ backgroundColor: accent }}
    >
      {children}
    </button>
  )
}
