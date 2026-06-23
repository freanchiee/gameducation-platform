import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Rekhachitra – Live Math Classroom",
    template: "%s | Rekhachitra",
  },
  description:
    "Interactive math classroom platform for IB MYP teachers. Create graph-based activities, run live sessions, see instant student responses.",
}

// Nested layout for the /desmos subtree (Rekhachitra).
// The root <html>/<body> live in the app root layout; this only scopes
// Rekhachitra's design tokens via the `desmos-scope` class.
export default function DesmosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="desmos-scope">{children}</div>
}
