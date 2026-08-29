import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/portfolio-auth"

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin || !isAdminAuthenticated()) {
    return NextResponse.json({ error: "Admin authentication required" }, { status: 401 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    return NextResponse.json({ error: "Blob storage is not configured" }, { status: 500 })
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
    const blob = await put(`portfolio/assets/${Date.now()}-${safeName}`, file, {
      access: "public",
    })

    return NextResponse.json({
      url: blob.url,
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