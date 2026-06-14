"use client"

import { useState } from "react"
import { Mail } from "lucide-react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Status = "idle" | "sending" | "sent" | "error"

export default function LoginPage() {
  const [supabase] = useState(() => createClient())
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    setError("")
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setStatus("error")
      setError(error.message)
    } else {
      setStatus("sent")
    }
  }

  async function signInWithGoogle() {
    setError("")
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    // Only set on error; success navigates away.
    if (error) setError(error.message)
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in to LearnBook</CardTitle>
          <CardDescription>
            {status === "sent"
              ? "Check your inbox for a magic link."
              : "We'll email you a magic link — no password needed."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "sent" ? (
            <div className="rounded-md border bg-muted/40 p-4 text-sm text-muted-foreground">
              A sign-in link is on its way to{" "}
              <span className="font-medium text-foreground">{email}</span>. Open
              it on this device to continue.
            </div>
          ) : (
            <form onSubmit={sendMagicLink} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={status === "sending"}
              >
                <Mail className="size-4" />
                {status === "sending" ? "Sending…" : "Email me a magic link"}
              </Button>
            </form>
          )}

          {status !== "sent" && (
            <>
              <div className="relative text-center">
                <span className="relative z-10 bg-card px-2 text-xs text-muted-foreground">
                  or
                </span>
                <span className="absolute inset-x-0 top-1/2 -z-0 border-t" />
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={signInWithGoogle}
              >
                Continue with Google
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Google sign-in requires the provider to be enabled in Supabase.
              </p>
            </>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>
    </main>
  )
}
