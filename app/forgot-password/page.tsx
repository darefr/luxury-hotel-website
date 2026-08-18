"use client"

import { useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import AuthShell from "@/components/auth/AuthShell"
import { AuthInput, AuthButton, AuthError, AuthSuccess } from "@/components/auth/fields"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await authClient.forgetPassword({
      email: email.trim(),
      redirectTo: "/reset-password",
    })
    setLoading(false)
    if (error) {
      setError("We couldn't process that request. Please try again.")
      return
    }
    // Always show success to avoid leaking whether an email is registered.
    setSent(true)
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send a secure reset link to your email"
      footer={
        <p className="text-ivory/50 font-sans text-sm">
          Remembered it?{" "}
          <Link href="/sign-in" className="text-copper hover:text-copper-light transition-colors">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit}>
        {error && <AuthError message={error} />}
        {sent ? (
          <AuthSuccess message="If an account exists for that email, a password reset link is on its way. Please check your inbox." />
        ) : (
          <>
            <AuthInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            <AuthButton loading={loading} type="submit">
              Send Reset Link
            </AuthButton>
          </>
        )}
      </form>
    </AuthShell>
  )
}
