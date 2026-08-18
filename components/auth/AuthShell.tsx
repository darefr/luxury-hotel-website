import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-midnight flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div
        className="absolute -top-40 -right-20 w-96 h-96 rounded-full pointer-events-none opacity-5"
        style={{ background: "radial-gradient(circle, #b87333 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="w-full max-w-md relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-ivory/50 hover:text-copper transition-colors mb-8 label-luxury text-[0.6rem]"
        >
          <ArrowLeft size={13} /> Back to Hotel Sonam
        </Link>

        <div
          className="glass border border-copper/15 shadow-2xl p-8 md:p-10"
          style={{ borderRadius: "6px" }}
        >
          <div className="text-center mb-8">
            <span
              className="text-2xl font-light tracking-[0.18em] text-ivory block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              HOTEL SONAM
            </span>
            <span className="label-luxury text-[0.5rem] tracking-[0.3em] opacity-60">
              Simalchaur · Pokhara
            </span>
          </div>

          <h1 className="font-serif text-3xl font-light text-ivory text-center mb-1">{title}</h1>
          {subtitle && <p className="text-ivory/50 font-sans text-sm text-center mb-7">{subtitle}</p>}

          {children}
        </div>

        {footer && <div className="text-center mt-6">{footer}</div>}
      </div>
    </main>
  )
}
