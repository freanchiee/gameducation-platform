import { redirect } from "next/navigation"

import { getUserAndProfile } from "@/lib/supabase/auth"
import { AppShell } from "@/components/app-shell"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, profile } = await getUserAndProfile()
  if (!user) redirect("/login")
  if (!profile) redirect("/choose-role")

  return (
    <AppShell email={user.email ?? ""} role={profile.role}>
      {children}
    </AppShell>
  )
}
