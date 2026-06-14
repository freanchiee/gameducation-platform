"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GraduationCap, Presentation } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"

const ROLES = [
  {
    role: "teacher" as const,
    label: "Teacher",
    description: "Build activities, run live sessions, assess students.",
    icon: Presentation,
  },
  {
    role: "student" as const,
    label: "Student",
    description: "Join sessions, build profiles, play and learn.",
    icon: GraduationCap,
  },
]

export function RolePicker({ userId }: { userId: string }) {
  const router = useRouter()
  const [pending, setPending] = useState<string | null>(null)
  const [error, setError] = useState("")

  async function choose(role: "teacher" | "student") {
    setPending(role)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.from("profiles").upsert({ id: userId, role })
    if (error) {
      setPending(null)
      setError(error.message)
      return
    }
    // Converge identity: students also get a linked Learnbook `students` row.
    if (role === "student") {
      await supabase.rpc("ensure_current_student", {})
    }
    router.replace("/dashboard")
    router.refresh()
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {ROLES.map(({ role, label, description, icon: Icon }) => (
          <Card
            key={role}
            role="button"
            tabIndex={0}
            onClick={() => pending === null && choose(role)}
            className={`cursor-pointer transition-colors hover:border-primary ${
              pending === role ? "opacity-60" : ""
            }`}
          >
            <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
              <Icon className="size-10 text-primary" />
              <div className="text-lg font-semibold">{label}</div>
              <p className="text-sm text-muted-foreground">{description}</p>
              {pending === role && (
                <span className="text-xs text-muted-foreground">Saving…</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {error && <p className="text-center text-sm text-destructive">{error}</p>}
    </div>
  )
}
