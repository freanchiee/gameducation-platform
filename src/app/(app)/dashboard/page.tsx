import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getUserAndProfile } from "@/lib/supabase/auth"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const AREAS = [
  {
    title: "Strandhoot builder",
    description: "Visual block editor for interactive strandhoots.",
    href: "/strandhoot-builder",
    roles: ["teacher"],
  },
  {
    title: "Games",
    description: "Flashcards and sheet-built games.",
    href: "/your-games",
    roles: ["teacher", "student"],
  },
  {
    title: "Live sessions",
    description: "Run and join strandhoot sessions by code.",
    href: "/strandhoot-routes/shared",
    roles: ["teacher", "student"],
  },
  {
    title: "Worlds",
    description: "Hosted interactive mini-apps — open and play them in-app.",
    href: "/worlds",
    roles: ["teacher", "student"],
  },
  {
    title: "AI assessment",
    description: "Rubric scoring, feedback, leaderboards.",
    href: "/cellbook/assessment",
    roles: ["teacher"],
  },
  {
    title: "Desmos studio",
    description: "Live physics teaching with interactive graphs.",
    href: "/desmos",
    roles: ["teacher", "student"],
  },
]

export default async function DashboardPage() {
  const { user, profile } = await getUserAndProfile()
  const role = profile?.role ?? "student"
  const areas = AREAS.filter((a) => a.roles.includes(role))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome{user?.email ? `, ${user.email.split("@")[0]}` : ""}
        </h1>
        <p className="text-muted-foreground">
          You&apos;re signed in as a{" "}
          <span className="font-medium capitalize text-foreground">{role}</span>.
          Jump into any area below.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <Link key={area.title} href={area.href} className="group">
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{area.title}</CardTitle>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
