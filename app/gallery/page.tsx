import PageShell, { PageHeader } from "@/components/layout/PageShell"
import Gallery from "@/components/sections/Gallery"

export const metadata = {
  title: "Gallery",
  description: "A visual tour of Hotel Sonam, Pokhara — rooms, restaurant, rooftop and surroundings.",
}

export default function GalleryPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Moments"
        title="Gallery"
        subtitle="A glimpse of Hotel Sonam and the beauty that surrounds us in Pokhara."
      />
      <Gallery />
    </PageShell>
  )
}
