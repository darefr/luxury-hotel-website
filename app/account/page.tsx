import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CalendarCheck, Clock, History, BedDouble } from "lucide-react"
import { auth } from "@/lib/auth"
import { getBookingsForUser, type Booking } from "@/lib/bookings"
import SignOutButton from "@/components/auth/SignOutButton"

export const metadata = { title: "My Account" }
export const dynamic = "force-dynamic"

function fmt(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function statusColor(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "text-emerald-300 border-emerald-400/30 bg-emerald-400/10"
    case "CANCELLED":
      return "text-red-300 border-red-400/30 bg-red-400/10"
    case "COMPLETED":
      return "text-ivory/70 border-ivory/20 bg-ivory/5"
    default:
      return "text-copper border-copper/30 bg-copper/10"
  }
}

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/sign-in?redirect=/account")

  const bookings = await getBookingsForUser(session.user.id)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const isPast = (b: Booking) => new Date(b.check_out + "T00:00:00") < today
  const isCurrent = (b: Booking) =>
    new Date(b.check_in + "T00:00:00") <= today && new Date(b.check_out + "T00:00:00") >= today

  const current = bookings.filter((b) => isCurrent(b) && b.status !== "CANCELLED")
  const upcoming = bookings.filter((b) => !isCurrent(b) && !isPast(b) && b.status !== "CANCELLED")
  const past = bookings.filter((b) => isPast(b) || b.status === "CANCELLED")

  return (
    <main className="min-h-screen bg-midnight text-ivory">
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-ivory/50 hover:text-copper transition-colors mb-8 label-luxury text-[0.6rem]"
        >
          <ArrowLeft size={13} /> Back to Hotel Sonam
        </Link>

        {/* Profile header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-copper/15 pb-8 mb-10">
          <div>
            <p className="label-luxury text-copper mb-2">My Account</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light">{session.user.name}</h1>
            <p className="text-ivory/50 font-sans text-sm mt-2">{session.user.email}</p>
          </div>
          <SignOutButton />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-copper/10 mb-12" style={{ borderRadius: "6px" }}>
          <Stat label="Upcoming" value={upcoming.length + current.length} />
          <Stat label="Completed" value={past.filter((b) => b.status !== "CANCELLED").length} />
          <Stat label="Total stays" value={bookings.length} />
        </div>

        {bookings.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-12">
            {current.length > 0 && (
              <BookingGroup title="Current stay" icon={<Clock size={15} />} bookings={current} />
            )}
            {upcoming.length > 0 && (
              <BookingGroup title="Upcoming bookings" icon={<CalendarCheck size={15} />} bookings={upcoming} />
            )}
            {past.length > 0 && (
              <BookingGroup title="Past & cancelled" icon={<History size={15} />} bookings={past} />
            )}
          </div>
        )}
      </div>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-midnight-2 px-6 py-5 text-center">
      <p className="font-serif text-3xl font-light text-ivory">{value}</p>
      <p className="label-luxury text-[0.55rem] text-ivory/40 mt-1">{label}</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16 border border-copper/15" style={{ borderRadius: "6px" }}>
      <BedDouble size={32} className="text-copper/60 mx-auto mb-4" />
      <h2 className="font-serif text-2xl font-light text-ivory mb-2">No bookings yet</h2>
      <p className="text-ivory/50 font-sans text-sm mb-6">Your reservations will appear here once you book a stay.</p>
      <Link
        href="/#booking"
        className="inline-block px-6 py-3 bg-copper text-midnight font-sans text-xs tracking-widest uppercase hover:bg-copper-light transition-colors"
        style={{ borderRadius: "4px" }}
      >
        Book a room
      </Link>
    </div>
  )
}

function BookingGroup({
  title,
  icon,
  bookings,
}: {
  title: string
  icon: React.ReactNode
  bookings: Booking[]
}) {
  return (
    <section>
      <h2 className="flex items-center gap-2 label-luxury text-ivory/60 mb-5">
        <span className="text-copper">{icon}</span>
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {bookings.map((b) => (
          <BookingCard key={b.id} booking={b} />
        ))}
      </div>
    </section>
  )
}

function BookingCard({ booking: b }: { booking: Booking }) {
  return (
    <article
      className="flex flex-col sm:flex-row gap-5 bg-midnight-2 border border-copper/12 p-5"
      style={{ borderRadius: "6px" }}
    >
      <div className="relative w-full sm:w-40 h-32 flex-shrink-0 overflow-hidden" style={{ borderRadius: "4px" }}>
        <Image
          src={b.room_image || "/placeholder.svg"}
          alt={b.room_name || "Room"}
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-serif text-xl font-light text-ivory">{b.room_name}</h3>
            <p className="label-luxury text-[0.55rem] text-copper mt-1">Ref · {b.booking_reference}</p>
          </div>
          <span
            className={`shrink-0 label-luxury text-[0.5rem] px-2.5 py-1 border ${statusColor(b.status)}`}
            style={{ borderRadius: "3px" }}
          >
            {b.status}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <Detail label="Check-in" value={fmt(b.check_in)} />
          <Detail label="Check-out" value={fmt(b.check_out)} />
          <Detail label="Guests" value={String(b.guests)} />
          <Detail label="Total" value={`$${b.total_price.toFixed(0)}`} />
        </div>
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-copper/10">
          <span className="label-luxury text-[0.5rem] text-ivory/40">Payment</span>
          <span className="font-sans text-xs text-ivory/70">
            {b.payment_status} · {b.payment_method.replace(/_/g, " ")}
          </span>
        </div>
        {b.special_requests && (
          <p className="text-ivory/50 font-sans text-xs mt-2 italic">“{b.special_requests}”</p>
        )}
      </div>
    </article>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label-luxury text-[0.5rem] text-ivory/40">{label}</p>
      <p className="font-sans text-ivory/85 mt-0.5">{value}</p>
    </div>
  )
}
