import { list, put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/portfolio-auth"
import { z } from "zod"

const FOLDER_PREFIX = "portfolio/folders/"

const folderItemSchema = z.object({
  id: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  image: z.string().url(),
  category: z.string().min(1).max(80),
  year: z.string().regex(/^\d{4}$/),
  tags: z.array(z.string().min(1).max(80)).max(20),
}).strict()

const folderSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/).max(200),
  type: z.enum(["Graphic Design", "Arts", "Projects"]),
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  preview: z.string().url(),
  category: z.string().min(1).max(80),
  year: z.string().regex(/^\d{4}$/),
  client: z.string().max(200).optional(),
  projectType: z.string().max(200).optional(),
  link: z.string().url().optional().or(z.literal("")),
  items: z.array(folderItemSchema).min(1).max(100),
}).strict()

type DesignFolder = z.infer<typeof folderSchema>

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin")
  return origin === request.nextUrl.origin
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

