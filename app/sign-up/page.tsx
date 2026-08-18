"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/auth-client"
import AuthShell from "@/components/auth/AuthShell"
import { AuthInput, AuthButton, AuthError } from "@/components/auth/fields"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }
    setLoading(true)
    const { error } = await signUp.email({ name: name.trim(), email: email.trim(), password })
    setLoading(false)
    if (error) {
      setError(
        error.message?.toLowerCase().includes("exist")
          ? "An account with this email may already exist. Try signing in."
          : "We couldn't create your account. Please try again.",
      )
      return
    }
    router.push("/account")
    router.refresh()
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Save your details for faster booking"
      footer={
        <p className="text-ivory/50 font-sans text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-copper hover:text-copper-light transition-colors">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit}>
        {error && <AuthError message={error} />}
        <AuthInput
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Aayush Gurung"
          required
          autoComplete="name"
        />
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
          placeholder="At least 8 characters"
          required
          autoComplete="new-password"
          minLength={8}
        />
        <AuthButton loading={loading} type="submit">
          Create Account
        </AuthButton>
      </form>
    </AuthShell>
  )
}
