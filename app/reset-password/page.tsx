"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import AuthShell from "@/components/auth/AuthShell"
import { AuthInput, AuthButton, AuthError, AuthSuccess } from "@/components/auth/fields"

function ResetPasswordForm() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get("token")
  const tokenError = params.get("error")

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!token) {
      setError("This reset link is invalid or has expired. Please request a new one.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }
    setLoading(true)
    const { error } = await authClient.resetPassword({ newPassword: password, token })
    setLoading(false)
    if (error) {
      setError("We couldn't reset your password. The link may have expired.")
      return
    }
    setDone(true)
    setTimeout(() => router.push("/sign-in"), 1800)
  }

  const invalid = !token || Boolean(tokenError)

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Choose a strong password for your account"
      footer={
        <p className="text-ivory/50 font-sans text-sm">
          <Link href="/sign-in" className="text-copper hover:text-copper-light transition-colors">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit}>
        {error && <AuthError message={error} />}
        {invalid && !done && (
          <AuthError message="This reset link is invalid or has expired. Please request a new one." />
        )}
        {done ? (
          <AuthSuccess message="Your password has been updated. Redirecting you to sign in…" />
        ) : (
          <>
            <AuthInput
              label="New password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              autoComplete="new-password"
              minLength={8}
              disabled={invalid}
            />
            <AuthInput
              label="Confirm password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter your password"
              required
              autoComplete="new-password"
              minLength={8}
              disabled={invalid}
            />
            <AuthButton loading={loading} type="submit" disabled={invalid}>
              Update Password
            </AuthButton>
          </>
        )}
      </form>
    </AuthShell>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  )
}
