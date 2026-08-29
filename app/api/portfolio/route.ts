import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/portfolio-auth"
import { FOLDER_PREFIX, folderSchema, readPortfolioFolders } from "@/lib/portfolio-data"

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin")
  return origin === request.nextUrl.origin
}

function unauthorized() {
  return NextResponse.json({ error: "Admin authentication required" }, { status: 401 })
}

export async function GET() {
  try {
    return NextResponse.json({ folders: await readPortfolioFolders() }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("Portfolio read error:", error)
    return NextResponse.json({ error: "Could not load portfolio data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request) || !isAdminAuthenticated()) return unauthorized()

  try {
    const parsed = folderSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid portfolio data" }, { status: 400 })
    }
    const savedFolder = parsed.data

    const pathname = `${FOLDER_PREFIX}${savedFolder.id}.json`
    const blob = await put(pathname, JSON.stringify(savedFolder), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    })
    return NextResponse.json({ folder: savedFolder, url: blob.url }, { status: 201 })
  } catch (error) {
    console.error("Portfolio write error:", error)
    return NextResponse.json({ error: "Could not save portfolio folder" }, { status: 500 })
  }
}

