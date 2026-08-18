"use server"

import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { createBooking, type CreateBookingResult } from "@/lib/bookings"

export type BookingFormValues = {
  roomId: number
  checkIn: string
  checkOut: string
  guests: number
  guestName: string
  guestEmail: string
  guestPhone?: string
  specialRequests?: string
}

/**
 * Public server action used by the booking bar. Availability, capacity and
 * pricing are all re-validated on the server; the client cannot influence the
 * final price. If the guest is signed in, the booking is linked to their id.
 */
export async function submitBooking(values: BookingFormValues): Promise<CreateBookingResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    const result = await createBooking({
      roomId: Number(values.roomId),
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      guests: Number(values.guests),
      guestName: values.guestName,
      guestEmail: values.guestEmail,
      guestPhone: values.guestPhone,
      specialRequests: values.specialRequests,
      userId: session?.user?.id ?? null,
    })
    return result
  } catch (err) {
    console.error("[v0] submitBooking failed:", err)
    return { ok: false, error: "Something went wrong while creating your booking. Please try again." }
  }
}
