import PageShell, { PageHeader } from "@/components/layout/PageShell"
import Contact from "@/components/sections/Contact"
import Location from "@/components/sections/Location"

export const metadata = {
  title: "Contact",
  description: "Get in touch with Hotel Sonam, Simalchaur, Pokhara — phone, WhatsApp and location.",
}

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact"
        subtitle="We're here to help plan your stay. Reach out by phone, WhatsApp or email."
      />
      <Contact />
      <Location />
    </PageShell>
  )
}
