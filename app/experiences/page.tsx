import PageShell, { PageHeader } from "@/components/layout/PageShell"
import Experiences from "@/components/sections/Experiences"

export const metadata = {
  title: "Experiences",
  description: "Discover Pokhara — Phewa Lake, Sarangkot sunrise, paragliding and more with Hotel Sonam.",
}

export default function ExperiencesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Explore Pokhara"
        title="Experiences"
        subtitle="From lakeside mornings to mountain sunrises, discover the very best of Pokhara during your stay."
      />
      <Experiences />
    </PageShell>
  )
}
