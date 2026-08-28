import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

const COOKIE_NAME = "portfolio_admin"
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7

function getSecret() {
  return process.env.PORTFOLIO_ADMIN_SECRET
}

function sign(value: string) {
  const secret = getSecret()
  if (!secret) throw new Error("PORTFOLIO_ADMIN_SECRET is not configured")
  return createHmac("sha256", secret).update(value).digest("hex")
}

export function createAdminToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS
  const value = String(expiresAt)
  return `${value}.${sign(value)}`
}

export function isAdminAuthenticated() {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return false

  const [expiresAt, signature] = token.split(".")
  if (!expiresAt || !signature || Number(expiresAt) < Math.floor(Date.now() / 1000)) return false

  const expected = sign(expiresAt)
  if (signature.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}

export function setAdminCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: TOKEN_TTL_SECONDS,
  })
}

export function clearAdminCookie() {
  cookies().set(COOKIE_NAME, "", { httpOnly: true, expires: new Date(0), path: "/" })
}
