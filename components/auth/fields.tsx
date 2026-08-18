"use client"

import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"

export function AuthInput({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-4">
      <label className="label-luxury text-[0.55rem] text-ivory/50 block mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full bg-midnight-3 border border-copper/15 text-ivory font-sans text-sm px-4 py-3
                   focus:outline-none focus:border-copper/40 placeholder:text-ivory/25 transition-colors"
        style={{ borderRadius: "4px", colorScheme: "dark" }}
      />
    </div>
  )
}

export function AuthButton({
  loading,
  children,
  ...props
}: { loading?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="w-full flex items-center justify-center gap-2 py-3.5 bg-copper hover:bg-copper-light text-midnight
                 font-sans text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300
                 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      style={{ borderRadius: "4px" }}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  )
}

export function AuthError({ message }: { message: string }) {
  return (
    <div
      className="mb-4 flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3"
      style={{ borderRadius: "4px" }}
      role="alert"
    >
      <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
      <span className="font-sans text-xs leading-relaxed">{message}</span>
    </div>
  )
}

export function AuthSuccess({ message }: { message: string }) {
  return (
    <div
      className="mb-4 flex items-start gap-2 bg-copper/10 border border-copper/30 text-copper px-4 py-3"
      style={{ borderRadius: "4px" }}
      role="status"
    >
      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" />
      <span className="font-sans text-xs leading-relaxed">{message}</span>
    </div>
  )
}
