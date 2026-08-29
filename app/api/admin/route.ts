import { NextRequest, NextResponse } from "next/server"
import { timingSafeEqual } from "crypto"
import {
  clearAdminCookie,
  createAdminToken,
  isAdminAuthenticated,
  isLoginRateLimited,
  setAdminCookie,
} from "@/lib/portfolio-auth"

function passwordsMatch(input: string, expected: string) {
  const inputBuffer = Buffer.from(input)
  const expectedBuffer = Buffer.from(expected)
  if (inputBuffer.length !== expectedBuffer.length) return false
  return timingSafeEqual(inputBuffer, expectedBuffer)
}

export async function GET() {
  return NextResponse.json({ authenticated: isAdminAuthenticated() })
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 })
  }

  const clientKey = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown"
  if (isLoginRateLimited(clientKey)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 })
  }

  const { password } = (await request.json()) as { password?: string }
  if (!password || !process.env.PORTFOLIO_ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  if (!passwordsMatch(password, process.env.PORTFOLIO_ADMIN_PASSWORD)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  setAdminCookie(createAdminToken())
  return NextResponse.json({ authenticated: true })
}

export async function DELETE() {
  clearAdminCookie()
  return NextResponse.json({ authenticated: false })
}
