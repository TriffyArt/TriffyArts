import { createClient } from "@supabase/supabase-js"

export const PORTFOLIO_BUCKET = "portfolio"

let cachedClient: ReturnType<typeof createClient> | null = null

// Server-only client using the service role key (bypasses RLS) — never import this in client components.
export function getSupabaseServerClient() {
  if (cachedClient) return cachedClient

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    throw new Error("Supabase is not configured: set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY")
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  })
  return cachedClient
}
