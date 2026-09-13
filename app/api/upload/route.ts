import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/portfolio-auth"
import { getSupabaseServerClient, PORTFOLIO_BUCKET } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin || !isAdminAuthenticated()) {
    return NextResponse.json({ error: "Admin authentication required" }, { status: 401 })
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Storage is not configured: Please set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY environment variables." }, { status: 500 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG, GIF, and WebP images are allowed" }, { status: 400 })
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Images must be 10 MB or smaller" }, { status: 400 })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-")
    const path = `assets/${Date.now()}-${safeName}`

    const supabase = getSupabaseServerClient()
    const { error } = await supabase.storage.from(PORTFOLIO_BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    })
    if (error) throw error

    const { data } = supabase.storage.from(PORTFOLIO_BUCKET).getPublicUrl(path)

    return NextResponse.json({
      url: data.publicUrl,
      success: true,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? `Upload failed: ${error.message}` : "Upload failed" },
      { status: 500 }
    )
  }
}