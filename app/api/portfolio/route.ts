import { del, list, put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/portfolio-auth"

const FOLDER_PREFIX = "portfolio/folders/"

type FolderItem = {
  id: string
  title: string
  description: string
  image: string
  category: string
  year: string
  tags: string[]
}

type DesignFolder = {
  id: string
  title: string
  description: string
  preview: string
  category: string
  year: string
  items: FolderItem[]
}

async function readFolders(): Promise<DesignFolder[]> {
  const { blobs } = await list({ prefix: FOLDER_PREFIX })
  const folders = await Promise.all(
    blobs.map(async (blob) => {
      const response = await fetch(blob.url, { cache: "no-store" })
      return (await response.json()) as DesignFolder
    }),
  )
  return folders.sort((first, second) => first.title.localeCompare(second.title))
}

function unauthorized() {
  return NextResponse.json({ error: "Admin authentication required" }, { status: 401 })
}

export async function GET() {
  try {
    return NextResponse.json({ folders: await readFolders() }, { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("Portfolio read error:", error)
    return NextResponse.json({ error: "Could not load portfolio data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated()) return unauthorized()

  try {
    const folder = (await request.json()) as DesignFolder
    if (!folder.id || !folder.title || !folder.category || !Array.isArray(folder.items)) {
      return NextResponse.json({ error: "Folder id, title, category, and items are required" }, { status: 400 })
    }

    const pathname = `${FOLDER_PREFIX}${folder.id}.json`
    const blob = await put(pathname, JSON.stringify(folder), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    })
    return NextResponse.json({ folder, url: blob.url }, { status: 201 })
  } catch (error) {
    console.error("Portfolio write error:", error)
    return NextResponse.json({ error: "Could not save portfolio folder" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminAuthenticated()) return unauthorized()

  try {
    const { id } = (await request.json()) as { id?: string }
    if (!id) return NextResponse.json({ error: "Folder id is required" }, { status: 400 })

    const { blobs } = await list({ prefix: `${FOLDER_PREFIX}${id}.json` })
    await Promise.all(blobs.map((blob) => del(blob.url)))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Portfolio delete error:", error)
    return NextResponse.json({ error: "Could not delete portfolio folder" }, { status: 500 })
  }
}
