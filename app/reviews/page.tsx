import PageShell, { PageHeader } from "@/components/layout/PageShell"
import Testimonials from "@/components/sections/Testimonials"

export const metadata = {
  title: "Reviews",
  description: "What our guests say about their stay at Hotel Sonam, Pokhara.",
}

export default function ReviewsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Guest Stories"
        title="Reviews"
        subtitle="Hear from the guests who have made Hotel Sonam their home in Pokhara."
      />
      <Testimonials />
    </PageShell>
  )
}
