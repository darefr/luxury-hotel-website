import { Pool } from "pg"

/**
 * Shared PostgreSQL connection pool for the Neon database.
 *
 * The connection string is read from DATABASE_URL and never exposed to the
 * client (this module is server-only). Neon requires SSL; the `sslmode=require`
 * flag in the connection string handles that, and we relax cert rejection for
 * the pooled serverless endpoint.
 */
declare global {
  // eslint-disable-next-line no-var
  var __hotelPgPool: Pool | undefined
}

function createPool() {
  // Note: the pool is constructed lazily-at-import but never connects until a
  // query runs, so a missing DATABASE_URL does not break the build. Queries
  // will surface a clear error at request time if the variable is absent.
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5,
  })
}

// Reuse the pool across hot reloads / serverless invocations.
export const pool: Pool = global.__hotelPgPool ?? createPool()
if (process.env.NODE_ENV !== "production") {
  global.__hotelPgPool = pool
}

/** Small helper for parameterized queries. */
export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const res = await pool.query(text, params)
  return res.rows as T[]
}
