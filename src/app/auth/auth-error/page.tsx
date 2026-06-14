import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-bold">Sign-in link didn&apos;t work</h1>
      <p className="max-w-md text-muted-foreground">
        The link may have expired or already been used. Request a fresh one and
        try again.
      </p>
      <Button asChild>
        <Link href="/login">Back to sign in</Link>
      </Button>
    </main>
  )
}
