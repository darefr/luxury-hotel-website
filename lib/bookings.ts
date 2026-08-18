import "server-only"
import { pool, query } from "@/lib/db"
import { ensureSchema } from "@/lib/schema"

export const HOTEL_NAME = "Hotel Sonam"

export type Room = {
  id: number
  name: string
  slug: string
  description: string | null
  price: number
  capacity: number
  total_units: number
  image: string | null
}

export type Booking = {
  id: number
  booking_reference: string
  user_id: string | null
  guest_name: string
  guest_email: string
  guest_phone: string | null
  room_id: number
  room_name?: string
  room_image?: string | null
  check_in: string
  check_out: string
  guests: number
  price: number
  total_price: number
  special_requests: string | null
  status: string
  payment_status: string
  payment_method: string
  created_at: string
  updated_at: string
}

function normalizeRoom(r: any): Room {
  return { ...r, price: Number(r.price) }
}

export async function getRooms(): Promise<Room[]> {
  await ensureSchema()
  const rows = await query<any>(`SELECT * FROM rooms ORDER BY price ASC`)
  return rows.map(normalizeRoom)
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  await ensureSchema()
  const rows = await query<any>(`SELECT * FROM rooms WHERE slug = $1`, [slug])
  return rows[0] ? normalizeRoom(rows[0]) : null
}

export async function getRoomById(id: number): Promise<Room | null> {
  await ensureSchema()
  const rows = await query<any>(`SELECT * FROM rooms WHERE id = $1`, [id])
  return rows[0] ? normalizeRoom(rows[0]) : null
}

/** Number of room-units already reserved for a date range (pending/confirmed). */
export async function bookedUnits(roomId: number, checkIn: string, checkOut: string): Promise<number> {
  const rows = await query<{ booked: string }>(
    `SELECT COUNT(*)::int AS booked
       FROM bookings
      WHERE room_id = $1
        AND status IN ('PENDING','CONFIRMED')
        AND check_in < $3
        AND check_out > $2`,
    [roomId, checkIn, checkOut],
  )
  return Number(rows[0]?.booked ?? 0)
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = new Date(checkIn + "T00:00:00Z").getTime()
  const b = new Date(checkOut + "T00:00:00Z").getTime()
  return Math.round((b - a) / (1000 * 60 * 60 * 24))
}

function makeReference(): string {
  const year = new Date().getFullYear()
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let suffix = ""
  for (let i = 0; i < 6; i++) suffix += alphabet[Math.floor(Math.random() * alphabet.length)]
  return `SONAM-${year}-${suffix}`
}

export type CreateBookingInput = {
  roomId: number
  checkIn: string
  checkOut: string
  guests: number
  guestName: string
  guestEmail: string
  guestPhone?: string
  specialRequests?: string
  userId?: string | null
}

export type CreateBookingResult =
  | { ok: true; booking: Booking }
  | { ok: false; error: string }

/**
 * Server-authoritative booking creation. Validates dates, capacity and real
 * availability from Neon, computes the price on the server, prevents double
 * booking, and inserts the row with a unique reference.
 */
export async function createBooking(input: CreateBookingInput): Promise<CreateBookingResult> {
  await ensureSchema()

  const { roomId, checkIn, checkOut, guests } = input
  const guestName = (input.guestName ?? "").trim()
  const guestEmail = (input.guestEmail ?? "").trim().toLowerCase()

  // 1. Basic validation.
  if (!roomId || !checkIn || !checkOut) return { ok: false, error: "Please choose a room and your dates." }
  if (!guestName) return { ok: false, error: "Please enter the guest name." }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) return { ok: false, error: "Please enter a valid email address." }

  const dateRe = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRe.test(checkIn) || !dateRe.test(checkOut)) return { ok: false, error: "Invalid dates supplied." }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const inDate = new Date(checkIn + "T00:00:00")
  if (inDate < today) return { ok: false, error: "Check-in date cannot be in the past." }

  // 2. Check-out after check-in.
  const nights = nightsBetween(checkIn, checkOut)
  if (nights <= 0) return { ok: false, error: "Check-out must be after check-in." }
  if (nights > 60) return { ok: false, error: "Maximum stay is 60 nights." }

  const numGuests = Number(guests)
  if (!Number.isInteger(numGuests) || numGuests < 1) return { ok: false, error: "Invalid number of guests." }

  // 3. Load room + capacity.
  const room = await getRoomById(roomId)
  if (!room) return { ok: false, error: "Selected room could not be found." }
  if (numGuests > room.capacity) {
    return { ok: false, error: `The ${room.name} accommodates up to ${room.capacity} guests.` }
  }

  // 4 + 5 + 6. Availability: prevent overlapping bookings beyond unit count.
  const alreadyBooked = await bookedUnits(roomId, checkIn, checkOut)
  const availableUnits = room.total_units - alreadyBooked
  if (availableUnits <= 0) {
    return { ok: false, error: `The ${room.name} is fully booked for the selected dates.` }
  }

  // 7. Server-side price (never trust the client).
  const totalPrice = Number((room.price * nights).toFixed(2))

  // 8. Insert with a unique reference (retry a few times on collision).
  const client = await pool.connect()
  try {
    for (let attempt = 0; attempt < 5; attempt++) {
      const reference = makeReference()
      try {
        const rows = await client.query(
          `INSERT INTO bookings
             (booking_reference, user_id, guest_name, guest_email, guest_phone,
              room_id, check_in, check_out, guests, price, total_price,
              special_requests, status, payment_status, payment_method)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'PENDING','UNPAID','PAY_AT_HOTEL')
           RETURNING *`,
          [
            reference,
            input.userId ?? null,
            guestName,
            guestEmail,
            input.guestPhone?.trim() || null,
            roomId,
            checkIn,
            checkOut,
            numGuests,
            room.price,
            totalPrice,
            input.specialRequests?.trim() || null,
          ],
        )
        const booking = rows.rows[0]
        return {
          ok: true,
          booking: {
            ...booking,
            price: Number(booking.price),
            total_price: Number(booking.total_price),
            room_name: room.name,
            room_image: room.image,
          },
        }
      } catch (err: any) {
        // 23505 = unique_violation on booking_reference -> retry with new ref.
        if (err?.code === "23505" && attempt < 4) continue
        throw err
      }
    }
    return { ok: false, error: "Could not generate a unique booking reference. Please try again." }
  } finally {
    client.release()
  }
}

export async function getBookingsForUser(userId: string): Promise<Booking[]> {
  await ensureSchema()
  const rows = await query<any>(
    `SELECT b.*, r.name AS room_name, r.image AS room_image
       FROM bookings b
       JOIN rooms r ON r.id = b.room_id
      WHERE b.user_id = $1
      ORDER BY b.check_in DESC`,
    [userId],
  )
  return rows.map((b) => ({ ...b, price: Number(b.price), total_price: Number(b.total_price) }))
}

export async function getBookingByReference(reference: string): Promise<Booking | null> {
  await ensureSchema()
  const rows = await query<any>(
    `SELECT b.*, r.name AS room_name, r.image AS room_image
       FROM bookings b
       JOIN rooms r ON r.id = b.room_id
      WHERE b.booking_reference = $1`,
    [reference],
  )
  const b = rows[0]
  return b ? { ...b, price: Number(b.price), total_price: Number(b.total_price) } : null
}
