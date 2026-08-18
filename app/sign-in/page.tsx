"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "@/lib/auth-client"
import AuthShell from "@/components/auth/AuthShell"
import { AuthInput, AuthButton, AuthError } from "@/components/auth/fields"

function SignInForm() {
  const router = useRouter()
  const params = useSearchParams()
  const redirectTo = params.get("redirect") || "/account"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn.email({ email: email.trim(), password })
    setLoading(false)
    if (error) {
      setError("Invalid email or password. Please try again.")
      return
    }
    router.push(redirectTo)
    router.refresh()
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your reservations"
      footer={
        <p className="text-ivory/50 font-sans text-sm">
          New guest?{" "}
          <Link href="/sign-up" className="text-copper hover:text-copper-light transition-colors">
            Create an account
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit}>
        {error && <AuthError message={error} />}
        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
        <div className="flex justify-end -mt-2 mb-2">
          <Link
            href="/forgot-password"
            className="label-luxury text-[0.55rem] text-ivory/50 hover:text-copper transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <AuthButton loading={loading} type="submit">
          Sign In
        </AuthButton>
      </form>
    </AuthShell>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  )
}
