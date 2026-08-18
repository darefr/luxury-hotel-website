import { NextResponse } from "next/server"
import { ensureSchema } from "@/lib/schema"
import { getRooms } from "@/lib/bookings"

export const dynamic = "force-dynamic"

export async function GET() {
  const env = {
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    BETTER_AUTH_SECRET: Boolean(process.env.BETTER_AUTH_SECRET),
  }

  if (!env.DATABASE_URL) {
    return NextResponse.json(
      { ok: false, env, error: "DATABASE_URL not available to the runtime." },
      { status: 500 },
    )
  }

  try {
    await ensureSchema()
    const rooms = await getRooms()
    return NextResponse.json({
      ok: true,
      env,
      db: "connected",
      roomCount: rooms.length,
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, env, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
