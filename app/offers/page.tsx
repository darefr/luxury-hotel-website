import PageShell, { PageHeader } from "@/components/layout/PageShell"
import SpecialOffers from "@/components/sections/SpecialOffers"

export const metadata = {
  title: "Special Offers",
  description: "Seasonal packages and special rates at Hotel Sonam, Pokhara.",
}

export default function OffersPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Value"
        title="Special Offers"
        subtitle="Make the most of your stay with our seasonal packages and exclusive rates."
      />
      <SpecialOffers />
    </PageShell>
  )
}
