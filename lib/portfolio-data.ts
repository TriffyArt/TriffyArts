import { list } from "@vercel/blob"
import { z } from "zod"

export const FOLDER_PREFIX = "portfolio/folders/"

export const folderItemSchema = z.object({
  id: z.string().min(1).max(200),
  title: z.string().min(1).max(200),
  description: z.string().max(2000),
  image: z.string().url(),
  category: z.string().min(1).max(80),
  year: z.string().regex(/^\d{4}$/),
  tags: z.array(z.string().min(1).max(80)).max(20),
  featured: z.boolean().optional().default(false),
}).strict()

export const folderSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/).max(200),
  type: z.enum(["Graphic Design", "Arts", "Projects", "Crafts"]),
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

export type DesignFolder = z.infer<typeof folderSchema>
export type DesignFolderItem = z.infer<typeof folderItemSchema>

export async function readPortfolioFolders(): Promise<DesignFolder[]> {
  const { blobs } = await list({ prefix: FOLDER_PREFIX })
  const folders = await Promise.all(
    blobs.map(async (blob) => {
      const response = await fetch(blob.url, { cache: "no-store" })
      return (await response.json()) as DesignFolder
    }),
  )
  return folders.sort((first, second) => first.title.localeCompare(second.title))
}

const TYPE_TO_SLUG: Record<DesignFolder["type"], string> = {
  Arts: "arts",
  "Graphic Design": "graphic-design",
  Projects: "projects",
  Crafts: "crafts",
}

export type FeaturedWork = {
  id: string
  title: string
  category: string
  image: string
  href: string
}

// Surfaces featured works across all folders, newest first (folder ids are timestamp-prefixed).
// For "Graphic Design" folders the featured card represents the whole folder (preview image,
// folder title). For other types each featured item is shown individually.
export function getFeaturedWorks(folders: DesignFolder[], limit = 3): FeaturedWork[] {
  return folders
    .slice()
    .sort((first, second) => second.id.localeCompare(first.id))
    .flatMap((folder) => {
      // Graphic Design items live inside a folder — feature the folder itself.
      if (folder.type === "Graphic Design") {
        const hasFeatured = folder.items.some((item) => item.featured)
        if (!hasFeatured) return []
        return [
          {
            id: folder.id,
            title: folder.title,
            category: folder.category,
            image: folder.preview,
            href: `/${TYPE_TO_SLUG[folder.type]}`,
          },
        ]
      }

      // Arts, Projects, Crafts — feature individual items as before.
      return folder.items
        .filter((item) => item.featured)
        .map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          image: item.image,
          href: folder.type === "Arts" ? `/arts?id=${item.id}` : `/${TYPE_TO_SLUG[folder.type]}`,
        }))
    })
    .slice(0, limit)
}
