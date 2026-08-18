"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  BedDouble,
  Calendar,
  Users,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  ArrowLeft,
} from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { submitBooking } from "@/app/actions/booking"

export type RoomOption = {
  id: number
  name: string
  slug: string
  price: number
  capacity: number
  image: string | null
}

type Prefill = {
  checkIn: string
  checkOut: string
  guests: number
  roomId: number | null // null => "Any Room"
}

const HOTEL_PHONE = "+9779851019065"
const HOTEL_WHATSAPP = "9779851019065"

function nights(checkIn: string, checkOut: string) {
  const a = new Date(checkIn + "T00:00:00Z").getTime()
  const b = new Date(checkOut + "T00:00:00Z").getTime()
  return Math.max(0, Math.round((b - a) / 86400000))
}

function formatDate(d: string) {
  if (!d) return ""
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function BookingModal({
  open,
  onClose,
  rooms,
  prefill,
}: {
  open: boolean
  onClose: () => void
  rooms: RoomOption[]
  prefill: Prefill
}) {
  const { data: session } = useSession()
  const [roomId, setRoomId] = useState<number | null>(prefill.roomId)
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [guestPhone, setGuestPhone] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState<any | null>(null)

  // Reset transient state and apply prefill each time the modal opens.
  useEffect(() => {
    if (open) {
      setRoomId(prefill.roomId)
      setError(null)
      setConfirmation(null)
      setLoading(false)
    }
  }, [open, prefill.roomId])

  // Prefill guest details from the signed-in session.
  useEffect(() => {
    if (session?.user) {
      setGuestName((n) => n || session.user.name || "")
      setGuestEmail((e) => e || session.user.email || "")
    }
  }, [session])

  const nightCount = nights(prefill.checkIn, prefill.checkOut)

  const selectableRooms = useMemo(
    () => rooms.filter((r) => r.capacity >= prefill.guests),
    [rooms, prefill.guests],
  )

  const selectedRoom = useMemo(() => {
    if (roomId) return rooms.find((r) => r.id === roomId) ?? null
    return selectableRooms[0] ?? rooms[0] ?? null
  }, [roomId, rooms, selectableRooms])

  const estTotal = selectedRoom ? selectedRoom.price * nightCount : 0

  async function handleConfirm() {
    setError(null)
    if (!selectedRoom) {
      setError("Please select a room.")
      return
    }
    if (!guestName.trim()) {
      setError("Please enter the guest name.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail.trim())) {
      setError("Please enter a valid email address.")
      return
    }
    setLoading(true)
    // Safety timeout so the UI never spins forever.
    const timeout = new Promise<{ ok: false; error: string }>((resolve) =>
      setTimeout(() => resolve({ ok: false, error: "The request timed out. Please try again." }), 20000),
    )
    try {
      const result = (await Promise.race([
        submitBooking({
          roomId: selectedRoom.id,
          checkIn: prefill.checkIn,
          checkOut: prefill.checkOut,
          guests: prefill.guests,
          guestName: guestName.trim(),
          guestEmail: guestEmail.trim(),
          guestPhone: guestPhone.trim(),
          specialRequests: specialRequests.trim(),
        }),
        timeout,
      ])) as Awaited<ReturnType<typeof submitBooking>>

      if (result.ok) {
        setConfirmation(result.booking)
      } else {
        setError(result.error)
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="bm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-midnight/90 backdrop-blur-sm"
            onClick={loading ? undefined : onClose}
          />
          <motion.div
            key="bm-panel"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 z-[61] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2
                       bg-midnight-2 border border-copper/20 shadow-2xl overflow-y-auto max-h-[90vh]"
            style={{ borderRadius: "6px" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
          >
            <button
              onClick={onClose}
              disabled={loading}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center glass border border-ivory/15
                         text-ivory/70 hover:text-copper transition-colors disabled:opacity-40"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {confirmation ? (
              <ConfirmationView booking={confirmation} onClose={onClose} />
            ) : (
              <div className="p-6 md:p-8">
                <p className="label-luxury text-copper mb-1">Complete your reservation</p>
                <h2 id="booking-modal-title" className="font-serif text-3xl font-light text-ivory mb-6">
                  Guest Details
                </h2>

                {/* Stay summary */}
                <div className="grid grid-cols-2 gap-px bg-copper/10 mb-6" style={{ borderRadius: "4px" }}>
                  <SummaryCell icon={<Calendar size={12} />} label="Check In" value={formatDate(prefill.checkIn)} />
                  <SummaryCell icon={<Calendar size={12} />} label="Check Out" value={formatDate(prefill.checkOut)} />
                  <SummaryCell icon={<Users size={12} />} label="Guests" value={`${prefill.guests}`} />
                  <SummaryCell
                    icon={<BedDouble size={12} />}
                    label="Nights"
                    value={`${nightCount} ${nightCount === 1 ? "night" : "nights"}`}
                  />
                </div>

                {/* Room selection */}
                <label className="label-luxury text-[0.55rem] text-ivory/40 block mb-1.5">Room</label>
                <select
                  value={selectedRoom?.id ?? ""}
                  onChange={(e) => setRoomId(Number(e.target.value))}
                  className="w-full bg-midnight-3 border border-copper/15 text-ivory font-sans text-sm px-4 py-3 mb-4 focus:outline-none focus:border-copper/40"
                  style={{ colorScheme: "dark", borderRadius: "4px" }}
                >
                  {(selectableRooms.length ? selectableRooms : rooms).map((r) => (
                    <option key={r.id} value={r.id} className="bg-midnight-3">
                      {r.name} — ${r.price}/night
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-1 gap-4">
                  <Field label="Full name" value={guestName} onChange={setGuestName} placeholder="e.g. Aayush Gurung" />
                  <Field
                    label="Email"
                    type="email"
                    value={guestEmail}
                    onChange={setGuestEmail}
                    placeholder="you@example.com"
                  />
                  <Field
                    label="Phone / WhatsApp"
                    value={guestPhone}
                    onChange={setGuestPhone}
                    placeholder="+977 ..."
                  />
                  <div>
                    <label className="label-luxury text-[0.55rem] text-ivory/40 block mb-1.5">
                      Special requests (optional)
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={2}
                      className="w-full bg-midnight-3 border border-copper/15 text-ivory font-sans text-sm px-4 py-3 focus:outline-none focus:border-copper/40 resize-none"
                      style={{ borderRadius: "4px" }}
                      placeholder="Early check-in, airport shuttle, dietary needs…"
                    />
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-copper/10">
                  <div>
                    <p className="label-luxury text-[0.55rem] text-ivory/40">Estimated total</p>
                    <p className="text-ivory/40 font-sans text-[0.65rem]">
                      ${selectedRoom?.price ?? 0} × {nightCount} {nightCount === 1 ? "night" : "nights"} · Pay at hotel
                    </p>
                  </div>
                  <span className="font-serif text-3xl text-ivory">${estTotal.toFixed(0)}</span>
                </div>

                {error && (
                  <div
                    className="mt-4 flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3"
                    style={{ borderRadius: "4px" }}
                    role="alert"
                  >
                    <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                    <span className="font-sans text-xs leading-relaxed">{error}</span>
                  </div>
                )}

                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="mt-6 w-full flex items-center justify-center gap-2.5 py-4 bg-copper hover:bg-copper-light
                             text-midnight font-sans text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Confirming…
                    </>
                  ) : (
                    "Confirm Reservation"
                  )}
                </button>
                <p className="text-center text-ivory/30 font-sans text-[0.65rem] mt-3">
                  Free cancellation · No card required · Pay at the hotel
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ConfirmationView({ booking, onClose }: { booking: any; onClose: () => void }) {
  const waText = encodeURIComponent(
    `Hello Hotel Sonam, I have a booking. Reference: ${booking.booking_reference}. Name: ${booking.guest_name}.`,
  )
  return (
    <div className="p-6 md:p-8 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="mx-auto w-16 h-16 rounded-full bg-copper/15 border border-copper/30 flex items-center justify-center mb-5"
      >
        <CheckCircle2 size={30} className="text-copper" />
      </motion.div>
      <p className="label-luxury text-copper mb-1">Reservation Confirmed</p>
      <h2 className="font-serif text-3xl font-light text-ivory mb-1">Hotel Sonam</h2>
      <p className="text-ivory/50 font-sans text-sm mb-6">
        Thank you, {booking.guest_name}. We look forward to welcoming you.
      </p>

      <div
        className="text-left bg-midnight-3/60 border border-copper/15 divide-y divide-copper/10 mb-6"
        style={{ borderRadius: "6px" }}
      >
        <Row label="Booking reference" value={booking.booking_reference} highlight />
        <Row label="Room" value={booking.room_name} />
        <Row label="Check-in" value={formatDate(booking.check_in)} />
        <Row label="Check-out" value={formatDate(booking.check_out)} />
        <Row label="Guests" value={String(booking.guests)} />
        <Row label="Total price" value={`$${Number(booking.total_price).toFixed(0)} (Pay at hotel)`} />
        <Row label="Booking status" value={booking.status} />
        <Row label="Payment status" value={booking.payment_status} />
        {booking.special_requests && <Row label="Special requests" value={booking.special_requests} />}
        <Row label="Booked on" value={formatDate(String(booking.created_at).slice(0, 10))} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={onClose}
          className="flex items-center justify-center gap-2 py-3 border border-copper/25 text-ivory/80 hover:text-copper
                     hover:border-copper/50 transition-colors font-sans text-[0.65rem] tracking-widest uppercase"
          style={{ borderRadius: "4px" }}
        >
          <ArrowLeft size={13} /> Back to hotel
        </button>
        <a
          href={`tel:${HOTEL_PHONE}`}
          className="flex items-center justify-center gap-2 py-3 border border-copper/25 text-ivory/80 hover:text-copper
                     hover:border-copper/50 transition-colors font-sans text-[0.65rem] tracking-widest uppercase"
          style={{ borderRadius: "4px" }}
        >
          <Phone size={13} /> Contact hotel
        </a>
        <a
          href={`https://wa.me/${HOTEL_WHATSAPP}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 bg-copper text-midnight hover:bg-copper-light
                     transition-colors font-sans text-[0.65rem] tracking-widest uppercase"
          style={{ borderRadius: "4px" }}
        >
          <MessageCircle size={13} /> WhatsApp
        </a>
      </div>
    </div>
  )
}

function SummaryCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-midnight-3 px-4 py-3">
      <span className="label-luxury text-[0.5rem] text-ivory/40 flex items-center gap-1.5">
        <span className="text-copper">{icon}</span>
        {label}
      </span>
      <p className="font-sans text-sm text-ivory mt-1">{value}</p>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="label-luxury text-[0.55rem] text-ivory/40 block mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-midnight-3 border border-copper/15 text-ivory font-sans text-sm px-4 py-3
                   focus:outline-none focus:border-copper/40 placeholder:text-ivory/25"
        style={{ borderRadius: "4px" }}
      />
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="label-luxury text-[0.55rem] text-ivory/40">{label}</span>
      <span
        className={`font-sans text-sm text-right ${
          highlight ? "text-copper font-medium tracking-wide" : "text-ivory/80"
        }`}
      >
        {value}
      </span>
    </div>
  )
}
