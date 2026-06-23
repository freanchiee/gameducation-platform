"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"

export default function JoinPage() {
  const [code, setCode] = useState("")
  const router = useRouter()

  const join = (e: React.FormEvent) => {
    e.preventDefault()
    const c = code.trim().toUpperCase()
    if (c.length === 6) router.push(`/lobby/${c}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1f306d] to-[#2a4494] flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        {/* Logo / brand */}
        <div className="mb-8">
          <div className="mx-auto mb-3 grid size-20 place-items-center rounded-3xl bg-[#f8efc6] text-4xl shadow-lg">
            🎯
          </div>
          <h1 className="text-3xl font-extrabold text-white">Join a Strandhoot</h1>
          <p className="mt-1 text-white/70">Enter the code from your teacher</p>
        </div>

        {/* Code form */}
        <form onSubmit={join} className="rounded-3xl bg-white p-8 shadow-2xl">
          <input
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))}
            placeholder="ABC123"
            maxLength={6}
            autoFocus
            autoComplete="off"
            className="w-full rounded-xl border-2 border-slate-200 py-4 text-center font-mono text-3xl font-extrabold uppercase tracking-[0.3em] text-[#1f306d] focus:border-[#1f306d] focus:outline-none"
          />
          <button
            type="submit"
            disabled={code.trim().length !== 6}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f306d] py-3.5 text-lg font-bold text-white transition hover:opacity-90 disabled:opacity-40"
          >
            Join session <ArrowRight className="size-5" />
          </button>
        </form>

        <p className="mt-6 text-sm text-white/50">
          Teacher?{" "}
          <a href="/strandhoots" className="text-white/80 underline hover:text-white">
            Host a live session →
          </a>
        </p>
      </div>
    </main>
  )
}
