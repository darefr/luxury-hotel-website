import PageShell, { PageHeader } from "@/components/layout/PageShell"
import Dining from "@/components/sections/Dining"

export const metadata = {
  title: "Dining",
  description: "On-site restaurant serving Nepali and international cuisine at Hotel Sonam, Pokhara.",
}

export default function DiningPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Restaurant"
        title="Dining"
        subtitle="Savour authentic Nepali flavours and international favourites at our on-site restaurant."
      />
      <Dining />
    </PageShell>
  )
}
