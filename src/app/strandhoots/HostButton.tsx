"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Radio } from "lucide-react"
import { supabase } from "@/utils/supabase"
import { useAuth } from "@/contexts/AuthContext"

function generateSessionCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = ""
  for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length))
  return code
}

/** Teacher "Host a live session" — creates a strandhoot_sessions row carrying
 *  the slug, then routes to the lobby. */
export default function HostButton({
  slug,
  title,
  accent,
}: {
  slug: string
  title: string
  accent: string
}) {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const host = async () => {
    if (!user) {
      alert("🔒 Sign in to host a live session.")
      return
    }
    setLoading(true)
    const sessionCode = generateSessionCode()
    try {
      const { error } = await supabase.from("strandhoot_sessions").insert({
        session_code: sessionCode,
        created_by: user.id,
        strandhoot: slug,
        strandhoot_title: title,
        status: "lobby",
      })
      if (error) {
        console.error("❌ Failed to create session:", error.message)
        alert("Could not create the session. Please try again.")
        return
      }
      router.push(`/lobby/${sessionCode}`)
    } catch (e) {
      console.error("❌ Session insert threw:", e)
      alert("Could not create the session. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={host}
      disabled={loading}
      className="inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition hover:bg-black/5 disabled:opacity-50"
      style={{ borderColor: `${accent}55`, color: accent }}
    >
      <Radio className="size-4" /> {loading ? "Creating…" : "Host live session"}
    </button>
  )
}
