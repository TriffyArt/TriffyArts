"use client"

import { useEffect, useState } from "react"
import { Loader2, LogOut, Trash2, Upload } from "lucide-react"

type Folder = {
  id: string
  title: string
  description: string
  preview: string
  category: string
  year: string
  items: { id: string; title: string; description: string; image: string; category: string; year: string; tags: string[] }[]
}

const categories = ["Social Media", "Public Materials", "Prints"]

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [folders, setFolders] = useState<Folder[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [year, setYear] = useState(String(new Date().getFullYear()))
  const [files, setFiles] = useState<File[]>([])
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
    setMessage("Uploading images...")

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData()
          formData.append("file", file)
          const response = await fetch("/api/upload", { method: "POST", body: formData })
          if (!response.ok) throw new Error("Image upload failed")
          return (await response.json()).url as string
        }),
      )
      const folderId = `${Date.now()}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
      const items = uploaded.map((image, index) => ({
        id: `${folderId}-${index + 1}`,
        title: files[index].name.replace(/\.[^/.]+$/, ""),
        description: "",
        image,
        category,
        year,
        tags: [],
      }))
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: folderId, title, description, preview: uploaded[0], category, year, items }),
      })
      if (!response.ok) throw new Error("Folder save failed")
      setTitle("")
      setDescription("")
      setFiles([])
      setMessage("Folder saved")
      await loadFolders()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save folder")
    } finally {
      setBusy(false)
    }
  }

  const deleteFolder = async (id: string) => {
    if (!window.confirm("Delete this folder?")) return
    setBusy(true)
    await fetch("/api/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    await loadFolders()
    setBusy(false)
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
          <p className="mt-2 text-muted-foreground">Create folders and upload multiple designs at once.</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>

      <form onSubmit={createFolder} className="grid gap-4 border border-border p-5 sm:grid-cols-2 sm:p-8">
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Folder title" className="h-10 rounded-md border border-input bg-background px-3 text-sm sm:col-span-2" required />
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Folder description" className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm sm:col-span-2" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <input value={year} onChange={(event) => setYear(event.target.value)} placeholder="Year" className="h-10 rounded-md border border-input bg-background px-3 text-sm" required />
        <label className="flex min-h-24 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border p-4 text-center text-sm text-muted-foreground sm:col-span-2">
          <Upload className="h-4 w-4" />
          {files.length ? `${files.length} image${files.length === 1 ? "" : "s"} selected` : "Choose multiple images"}
          <input type="file" accept="image/*" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} className="sr-only" />
        </label>
        <button disabled={busy} className="flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm text-primary-foreground disabled:opacity-50 sm:col-span-2">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Save folder
        </button>
        {message && <p className="text-sm text-muted-foreground sm:col-span-2">{message}</p>}
      </form>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">Saved folders</h2>
        {folders.map((folder) => (
          <div key={folder.id} className="flex items-center justify-between gap-4 border border-border p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{folder.title}</p>
              <p className="text-sm text-muted-foreground">{folder.items.length} designs · {folder.category}</p>
            </div>
            <button onClick={() => deleteFolder(folder.id)} aria-label={`Delete ${folder.title}`} className="shrink-0 text-destructive hover:opacity-70">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </section>
    </main>
  )
}
