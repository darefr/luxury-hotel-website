import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ScrollProgress, BackToTop, WhatsAppFAB } from "@/components/layout/FloatingUI"

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <WhatsAppFAB />
      <Navbar />
      <main id="main-content" className="bg-midnight">
        {children}
      </main>
      <Footer />
    </>
  )
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <header className="relative pt-36 pb-14 md:pt-44 md:pb-20 text-center overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #b87333 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <p className="label-luxury mb-4">{eyebrow}</p>
        <h1 className="font-serif text-5xl md:text-6xl font-light text-ivory text-balance">{title}</h1>
        {subtitle && (
          <p className="text-ivory/50 font-sans text-sm max-w-md mx-auto leading-relaxed mt-5 text-pretty">
            {subtitle}
          </p>
        )}
        <div className="divider-copper w-16 mx-auto mt-6 opacity-60" />
      </div>
    </header>
  )
}
