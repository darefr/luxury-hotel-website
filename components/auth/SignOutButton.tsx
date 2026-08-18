"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Loader2 } from "lucide-react"
import { signOut } from "@/lib/auth-client"

export default function SignOutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)
    await signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2.5 border border-copper/25 text-ivory/80 hover:text-copper
                 hover:border-copper/50 transition-colors font-sans text-[0.65rem] tracking-widest uppercase disabled:opacity-50"
      style={{ borderRadius: "4px" }}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
      Sign out
    </button>
  )
}
