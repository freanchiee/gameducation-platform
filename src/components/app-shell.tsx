"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Boxes,
  Gamepad2,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  PencilRuler,
  Radio,
  Users,
  X,
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
  { label: "Worlds", href: "/worlds", icon: Boxes },
  { label: "Games", href: "/your-games", icon: Gamepad2 },
  { label: "Desmos studio", href: "/desmos", icon: LineChart },
  { label: "Join a session", href: "/desmos/join", icon: Radio },
]

const TEACHER: NavItem[] = [
  { label: "Worlds", href: "/worlds", icon: Boxes },
  { label: "Strandhoot builder", href: "/strandhoot-builder", icon: PencilRuler },
  { label: "Games", href: "/your-games", icon: Gamepad2 },
  { label: "Live sessions", href: "/strandhoot-routes/shared", icon: Radio },
  { label: "Desmos studio", href: "/desmos/dashboard", icon: LineChart },
  { label: "Students", href: "/teacher/classes", icon: Users },
]

const COLLAPSE_KEY = "sidebar-collapsed"

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
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isTeacher = role === "teacher"
  const items = [...COMMON, ...(isTeacher ? TEACHER : STUDENT)]

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSE_KEY) === "1")
    } catch {
      /* ignore */
    }
  }, [])

  // Close the mobile drawer on navigation.
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const toggleCollapsed = () => {
    setCollapsed((c) => {
      const next = !c
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0")
      } catch {
        /* ignore */
      }
      return next
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-sidebar text-sidebar-foreground transition-[transform,width] duration-200 md:static md:z-auto md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed && "md:w-16",
        )}
      >
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <BookOpen className={cn("size-5 shrink-0 text-primary", collapsed && "md:hidden")} />
          <span className={cn("font-semibold", collapsed && "md:hidden")} style={{ fontFamily: "var(--font-display)" }}>
            LearnBook
          </span>
          {/* Desktop collapse toggle */}
          <button
            onClick={toggleCollapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "hidden rounded-md p-1.5 text-muted-foreground transition hover:bg-sidebar-accent hover:text-foreground md:inline-flex",
              collapsed ? "md:mx-auto" : "ml-auto",
            )}
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent md:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {items.map((item) => {
            const active = item.href && pathname === item.href
            const content = (
              <span
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                  collapsed && "md:justify-center md:px-0",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : item.href
                      ? "hover:bg-sidebar-accent/60"
                      : "cursor-default text-muted-foreground",
                )}
              >
                <item.icon className="size-4 shrink-0" />
                <span className={cn("flex-1", collapsed && "md:hidden")}>{item.label}</span>
                {item.soon && !collapsed && (
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
          <div className="flex items-center gap-2">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <div className="flex items-center gap-2 md:hidden">
              <BookOpen className="size-5 text-primary" />
              <span className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                LearnBook
              </span>
            </div>
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
