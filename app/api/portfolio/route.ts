import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/portfolio-auth"
import { FOLDER_PREFIX, folderSchema, readPortfolioFolders } from "@/lib/portfolio-data"
import { getSupabaseServerClient, PORTFOLIO_BUCKET } from "@/lib/supabase"

const FOLDER_ID_PATTERN = /^[a-z0-9-]+$/

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

    const path = `${FOLDER_PREFIX}${savedFolder.id}.json`
    const supabase = getSupabaseServerClient()
    const { error } = await supabase.storage
      .from(PORTFOLIO_BUCKET)
      .upload(path, JSON.stringify(savedFolder), {
        contentType: "application/json",
        upsert: true,
      })
    if (error) throw error

    const { data } = supabase.storage.from(PORTFOLIO_BUCKET).getPublicUrl(path)
    return NextResponse.json({ folder: savedFolder, url: data.publicUrl }, { status: 201 })
  } catch (error) {
    console.error("Portfolio write error:", error)
    return NextResponse.json({ error: "Could not save portfolio folder" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!isSameOrigin(request) || !isAdminAuthenticated()) return unauthorized()

  try {
    const { ids } = (await request.json()) as { ids?: unknown }
    if (!Array.isArray(ids) || ids.length === 0 || ids.length > 50 || !ids.every((id) => typeof id === "string" && FOLDER_ID_PATTERN.test(id))) {
      return NextResponse.json({ error: "Invalid post ids" }, { status: 400 })
    }

    const supabase = getSupabaseServerClient()
    const { error } = await supabase.storage
      .from(PORTFOLIO_BUCKET)
      .remove(ids.map((id) => `${FOLDER_PREFIX}${id}.json`))
    if (error) throw error
    return NextResponse.json({ deleted: ids })
  } catch (error) {
    console.error("Portfolio delete error:", error)
    return NextResponse.json({ error: "Could not delete portfolio folder(s)" }, { status: 500 })
  }
}

