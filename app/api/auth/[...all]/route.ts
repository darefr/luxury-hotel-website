import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"
import { ensureSchema } from "@/lib/schema"

const handlers = toNextJsHandler(auth)

export async function GET(req: Request) {
  await ensureSchema()
  return handlers.GET(req)
}

export async function POST(req: Request) {
  await ensureSchema()
  return handlers.POST(req)
}
