"use client"

import { useEffect, useState } from "react"
import { Loader2, LogOut, Upload, X } from "lucide-react"

type Folder = {
  id: string
  type: "Graphic Design" | "Arts" | "Projects" | "Crafts"
  title: string
  description: string
  preview: string
  category: string
  year: string
  client?: string
  projectType?: string
  link?: string
  items: { id: string; title: string; description: string; image: string; category: string; year: string; tags: string[]; featured?: boolean }[]
}

const portfolioTypes = ["Graphic Design", "Arts", "Projects", "Crafts"] as const
const categoriesByType: Record<(typeof portfolioTypes)[number], string[]> = {
  "Graphic Design": ["Social Media", "Public Materials", "Prints"],
  Arts: ["Pixel Art", "Digital Art", "Illustration", "Product Designs"],
  Projects: ["Web Development", "Web Design", "App Design", "UI/UX"],
  Crafts: ["Artisan Keycap", "Keychain", "Hippers"],
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [folders, setFolders] = useState<Folder[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<(typeof portfolioTypes)[number]>(portfolioTypes[0])
  const [category, setCategory] = useState(categoriesByType[portfolioTypes[0]][0])
  const [year, setYear] = useState(String(new Date().getFullYear()))
  const [tags, setTags] = useState("")
  const [client, setClient] = useState("")
  const [projectType, setProjectType] = useState("")
  const [link, setLink] = useState("")
  const [featured, setFeatured] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [busy, setBusy] = useState(false)

  const loadFolders = async () => {
    const response = await fetch("/api/portfolio", { cache: "no-store" })
    if (response.ok) setFolders((await response.json()).folders)
  }

  useEffect(() => {
    fetch("/api/admin")
      .then((response) => response.json())
      .then(async (data) => {
        setAuthenticated(data.authenticated)
        if (data.authenticated) await loadFolders()
      })
  }, [])

  useEffect(() => {
    const previews = files.map((file) => URL.createObjectURL(file))
    setFilePreviews(previews)
    return () => previews.forEach((preview) => URL.revokeObjectURL(preview))
  }, [files])

  const login = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })
    setBusy(false)
    if (response.ok) {
      setAuthenticated(true)
      setPassword("")
      await loadFolders()
    } else setMessage("Incorrect password")
  }

  const createFolder = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!files.length) {
      setMessage("Choose at least one image")
      return
    }
    setBusy(true)
    setMessage(type === "Graphic Design" ? "Uploading images..." : "Uploading image...")

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData()
          formData.append("file", file)
          const response = await fetch("/api/upload", { method: "POST", body: formData })
          if (!response.ok) {
            const error = (await response.json().catch(() => null)) as { error?: string } | null
            throw new Error(error?.error ?? "Image upload failed")
          }
          return (await response.json()).url as string
        }),
      )
      const folderId = `${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
      const normalizedTags = tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      const items = uploaded.map((image, index) => ({
        id: `${folderId}-${index + 1}`,
        title: type === "Graphic Design" ? files[index].name.replace(/\.[^/.]+$/, "") : title,
        description,
        image,
        category,
        year,
        tags: normalizedTags,
        featured,
      }))
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: folderId, title, description, preview: uploaded[0], category, year, type, client, projectType, link, items }),
      })
      if (!response.ok) throw new Error("Post upload failed")
      setTitle("")
      setDescription("")
      setType(portfolioTypes[0])
      setCategory(categoriesByType[portfolioTypes[0]][0])
      setTags("")
      setClient("")
      setProjectType("")
      setLink("")
      setFiles([])
      setFilePreviews([])
      setFeatured(false)
      setMessage("Post published")
      await loadFolders()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not publish post")
    } finally {
      setBusy(false)
    }
  }

  const logout = async () => {
    await fetch("/api/admin", { method: "DELETE" })
    setAuthenticated(false)
    setFolders([])
  }

  if (!authenticated) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md items-center px-4 py-16">
        <form onSubmit={login} className="w-full space-y-5 border border-border p-6 sm:p-8">
          <div>
            <h1 className="text-2xl font-semibold">Portfolio Admin</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your assets.</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Admin password"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            required
          />
          <button disabled={busy} className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm text-primary-foreground disabled:opacity-50">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>
          {message && <p className="text-sm text-destructive">{message}</p>}
        </form>
      </main>
    )
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Portfolio Admin</h1>
          <p className="mt-2 text-muted-foreground">Upload posts for Arts, Projects, Graphic Design, and Crafts.</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>

      <form onSubmit={createFolder} className="grid gap-4 border border-border p-5 sm:grid-cols-2 sm:p-8">
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" className="h-10 rounded-md border border-input bg-background px-3 text-sm sm:col-span-2" required />
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Post description" className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm sm:col-span-2" />
        <select
            value={type}
            onChange={(event) => {
              const nextType = event.target.value as (typeof portfolioTypes)[number]
              setType(nextType)
              setCategory(categoriesByType[nextType][0])
              setFiles((current) => nextType === "Graphic Design" ? current : current.slice(0, 1))
            }}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm sm:col-span-2"
            aria-label="Portfolio section"
          >
          {portfolioTypes.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            {categoriesByType[type].map((item) => <option key={item}>{item}</option>)}
        </select>
        <input value={year} onChange={(event) => setYear(event.target.value)} placeholder="Year" className="h-10 rounded-md border border-input bg-background px-3 text-sm" required />
          <input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="Tags, separated by commas" className="h-10 rounded-md border border-input bg-background px-3 text-sm sm:col-span-2" />
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} className="h-4 w-4 rounded border-input" />
          Feature on homepage
        </label>
        {type === "Projects" && (
          <>
            <input value={client} onChange={(event) => setClient(event.target.value)} placeholder="Client" className="h-10 rounded-md border border-input bg-background px-3 text-sm" required />
            <input value={projectType} onChange={(event) => setProjectType(event.target.value)} placeholder="Project type" className="h-10 rounded-md border border-input bg-background px-3 text-sm" required />
            <input type="url" value={link} onChange={(event) => setLink(event.target.value)} placeholder="Project link (optional)" className="h-10 rounded-md border border-input bg-background px-3 text-sm sm:col-span-2" />
          </>
        )}
        <label className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border p-4 text-center text-sm text-muted-foreground sm:col-span-2">
          <Upload className="h-4 w-4" />
          {files.length ? `${files.length} image${files.length === 1 ? "" : "s"} selected` : type === "Graphic Design" ? "Choose multiple images" : "Choose one preview image"}
          <input
            type="file"
            accept="image/*"
            multiple={type === "Graphic Design"}
            onChange={(event) => {
              const selectedFiles = Array.from(event.target.files ?? [])
              setFiles(type === "Graphic Design" ? selectedFiles : selectedFiles.slice(0, 1))
            }}
            className="sr-only"
          />
        </label>
        {files.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-3 lg:grid-cols-4">
            {files.map((file, index) => (
              <div key={`${file.name}-${file.lastModified}`} className="group relative min-w-0 border border-border bg-muted/20 p-2">
                <img src={filePreviews[index]} alt={`Selected preview ${index + 1}`} className="aspect-square w-full object-contain" />
                <p className="truncate pt-2 text-xs text-muted-foreground">{file.name}</p>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))}
                  className="absolute right-1 top-1 rounded-full bg-background/90 p-1 text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100 focus:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <button disabled={busy} className="flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm text-primary-foreground disabled:opacity-50 sm:col-span-2">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Upload post
        </button>
        {message && <p className="text-sm text-muted-foreground sm:col-span-2">{message}</p>}
      </form>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">Published posts</h2>
        <p className="text-sm text-muted-foreground">Posts can be removed from your Vercel Blob dashboard only.</p>
        {folders.map((folder) => (
          <div key={folder.id} className="flex items-center justify-between gap-4 border border-border p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{folder.title}</p>
              <p className="text-sm text-muted-foreground">{folder.type} · {folder.items.length} designs · {folder.category}</p>
            </div>
            {folder.items.some((item) => item.featured) && (
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Featured</span>
            )}
          </div>
        ))}
      </section>
    </main>
  )
}
