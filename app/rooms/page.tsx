import PageShell, { PageHeader } from "@/components/layout/PageShell"
import BookingBar from "@/components/sections/BookingBar"
import Rooms from "@/components/sections/Rooms"
import { getRooms } from "@/lib/bookings"

export const metadata = {
  title: "Rooms & Suites",
  description: "Comfortable rooms with private balconies, air conditioning and flat-screen TVs at Hotel Sonam, Pokhara.",
}
export const dynamic = "force-dynamic"

async function loadRooms() {
  try {
    return (await getRooms()).map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      price: r.price,
      capacity: r.capacity,
      image: r.image,
    }))
  } catch (err) {
    console.error("[v0] Failed to load rooms:", err)
    return []
  }
}

export default async function RoomsPage() {
  const rooms = await loadRooms()

  return (
    <PageShell>
      <PageHeader
        eyebrow="Accommodations"
        title="Rooms & Suites"
        subtitle="Clean, comfortable rooms with private balconies — the perfect base for exploring Pokhara. Check availability and reserve in seconds."
      />
      <BookingBar rooms={rooms} />
      <Rooms />
    </PageShell>
  )
}
