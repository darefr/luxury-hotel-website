import { pool } from "@/lib/db"

/**
 * Idempotent, additive schema bootstrap.
 *
 * Creates the Better Auth core tables (user/session/account/verification) plus
 * the hotel's rooms and bookings tables, then seeds the room catalogue. Every
 * statement uses IF NOT EXISTS / ON CONFLICT DO NOTHING so it is safe to run on
 * every cold start and never drops or resets existing data.
 */

const DDL = `
-- ---------- Better Auth core tables (camelCase columns, quoted) ----------
CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL DEFAULT false,
  "image" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "session" (
  "id" text PRIMARY KEY,
  "expiresAt" timestamptz NOT NULL,
  "token" text NOT NULL UNIQUE,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
  "id" text PRIMARY KEY,
  "issuer" text,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  "scope" text,
  "password" text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "verification" (
  "id" text PRIMARY KEY,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expiresAt" timestamptz NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

-- 'issuer' was added in newer Better Auth; ensure it exists on older DBs.
ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "issuer" text;

-- ---------- Hotel domain tables ----------
CREATE TABLE IF NOT EXISTS rooms (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  capacity integer NOT NULL DEFAULT 2,
  total_units integer NOT NULL DEFAULT 1,
  image text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id serial PRIMARY KEY,
  booking_reference text NOT NULL UNIQUE,
  user_id text REFERENCES "user"("id") ON DELETE SET NULL,
  guest_name text NOT NULL,
  guest_email text NOT NULL,
  guest_phone text,
  room_id integer NOT NULL REFERENCES rooms(id),
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL DEFAULT 1,
  price numeric(10,2) NOT NULL DEFAULT 0,
  total_price numeric(10,2) NOT NULL DEFAULT 0,
  special_requests text,
  status text NOT NULL DEFAULT 'PENDING',
  payment_status text NOT NULL DEFAULT 'UNPAID',
  payment_method text NOT NULL DEFAULT 'PAY_AT_HOTEL',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS bookings_room_dates_idx ON bookings (room_id, check_in, check_out);
CREATE INDEX IF NOT EXISTS bookings_user_idx ON bookings (user_id);
`

const SEED_ROOMS: Array<{
  name: string
  slug: string
  description: string
  price: number
  capacity: number
  total_units: number
  image: string
}> = [
  {
    name: "Double Room",
    slug: "double-room",
    description:
      "Comfortable stay for two with a private balcony, air conditioning, flat-screen TV with satellite channels and a non-smoking environment.",
    price: 23,
    capacity: 2,
    total_units: 8,
    image: "/images/double-room.png",
  },
  {
    name: "Family Room",
    slug: "family-room",
    description:
      "Extra space for the whole family with multiple beds, a private balcony, air conditioning and a flat-screen TV with satellite channels.",
    price: 40,
    capacity: 4,
    total_units: 4,
    image: "/images/family-room.png",
  },
]

let initPromise: Promise<void> | null = null

async function runInit(): Promise<void> {
  await pool.query(DDL)
  for (const r of SEED_ROOMS) {
    await pool.query(
      `INSERT INTO rooms (name, slug, description, price, capacity, total_units, image)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (slug) DO NOTHING`,
      [r.name, r.slug, r.description, r.price, r.capacity, r.total_units, r.image],
    )
  }
}

/** Ensure the schema exists. Runs once per process (cached promise). */
export function ensureSchema(): Promise<void> {
  if (!initPromise) {
    initPromise = runInit().catch((err) => {
      // Reset so a later request can retry after a transient failure.
      initPromise = null
      throw err
    })
  }
  return initPromise
}
