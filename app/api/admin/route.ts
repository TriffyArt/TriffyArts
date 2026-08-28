import { NextRequest, NextResponse } from "next/server"
import {
  clearAdminCookie,
  createAdminToken,
  isAdminAuthenticated,
  setAdminCookie,
} from "@/lib/portfolio-auth"

export async function GET() {
  return NextResponse.json({ authenticated: isAdminAuthenticated() })
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 })
  }

  const { password } = (await request.json()) as { password?: string }
  if (!password || !process.env.PORTFOLIO_ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  if (password !== process.env.PORTFOLIO_ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  setAdminCookie(createAdminToken())
  return NextResponse.json({ authenticated: true })
}

export async function DELETE() {
  clearAdminCookie()
  return NextResponse.json({ authenticated: false })
}
