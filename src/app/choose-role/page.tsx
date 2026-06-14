import { redirect } from "next/navigation"

import { getUserAndProfile } from "@/lib/supabase/auth"
import { RolePicker } from "./role-picker"

export default async function ChooseRolePage() {
  const { user, profile } = await getUserAndProfile()
  if (!user) redirect("/login")
  if (profile) redirect("/dashboard")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to LearnBook</h1>
        <p className="mt-2 text-muted-foreground">How will you use the platform?</p>
      </div>
      <RolePicker userId={user.id} />
    </main>
  )
}
