"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Boxes,
  Gamepad2,
  LayoutDashboard,
  LineChart,
  LogOut,
  PencilRuler,
  Radio,
  Users,
} from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type NavItem = {
  label: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  soon?: string
}

const COMMON: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
]

const STUDENT: NavItem[] = [
  { label: "Worlds", href: "/cellbook", icon: Boxes },
  { label: "Games", href: "/your-games", icon: Gamepad2 },
  { label: "Desmos studio", href: "/desmos", icon: LineChart },
  { label: "Join a session", href: "/desmos/join", icon: Radio },
]

const TEACHER: NavItem[] = [
  { label: "Worlds & classes", href: "/teacher/classes", icon: Boxes },
  { label: "Strandhoot builder", href: "/strandhoot-builder", icon: PencilRuler },
  { label: "Games", href: "/your-games", icon: Gamepad2 },
  { label: "Live sessions", href: "/strandhoot-routes/shared", icon: Radio },
  { label: "Desmos studio", href: "/desmos/dashboard", icon: LineChart },
  { label: "Students", href: "/teacher/classes", icon: Users },
]

export function AppShell({
  email,
  role,
  children,
}: {
  email: string
  role: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [supabase] = useState(() => createClient())
  const isTeacher = role === "teacher"
  const items = [...COMMON, ...(isTeacher ? TEACHER : STUDENT)]

  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <BookOpen className="size-5 text-primary" />
          <span className="font-semibold">LearnBook</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {items.map((item) => {
            const active = item.href && pathname === item.href
            const content = (
              <span
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : item.href
                      ? "hover:bg-sidebar-accent/60"
                      : "cursor-default text-muted-foreground",
                )}
              >
                <item.icon className="size-4" />
                <span className="flex-1">{item.label}</span>
                {item.soon && (
                  <Badge variant="secondary" className="text-[10px]">
                    {item.soon}
                  </Badge>
                )}
              </span>
            )
            return item.href ? (
              <Link key={item.label} href={item.href}>
                {content}
              </Link>
            ) : (
              <div key={item.label} title="Coming soon">
                {content}
              </div>
            )
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2 md:hidden">
            <BookOpen className="size-5 text-primary" />
            <span className="font-semibold">LearnBook</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Badge variant="outline" className="capitalize">
              {role}
            </Badge>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {email}
            </span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
