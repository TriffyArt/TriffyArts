"use client"

import { useEffect, useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, FileImage, Filter, FolderOpen, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const designWorks = [
  {
    id: 1,
    type: "Graphic Design" as const,
    title: "Pinoy Vanilla Rust 2X",
    description:
      "A bold promotional graphic created for a public-facing campaign, combining illustrated character work with strong display typography.",
    image: "/GD1.png",
    category: "Public Materials",
    year: "2025",
    tags: ["Illustration", "Typography", "Campaign"],
  },
  {
    id: 2,
    title: "Event Announcement Post",
    description:
      "A sample social announcement design from the same event campaign.",
    image: "/GD1.png",
    category: "Public Materials",
    year: "2025",
    tags: ["Social Media", "Announcement"],
  },
  {
    id: 3,
    title: "Event Information Print",
    description:
      "A sample print-ready information layout included in the campaign folder.",
    image: "/GD1.png",
    category: "Public Materials",
    year: "2025",
    tags: ["Print", "Information Design"],
  },
]

const socialMediaWorks = [
  {
    id: 4,
    title: "Event Launch Post",
    description:
      "A square social media graphic announcing the launch of a community event.",
    image: "/GD1.png",
    category: "Social Media",
    year: "2025",
    tags: ["Instagram", "Announcement"],
  },
  {
    id: 5,
    title: "Event Reminder Story",
    description:
      "A vertical story layout reminding followers about the event schedule.",
    image: "/GD1.png",
    category: "Social Media",
    year: "2025",
    tags: ["Instagram Story", "Promotion"],
  },
]

const designFolders = [
  {
    id: 1,
    type: "Graphic Design" as const,
    title: "Rust Server Event Campaign",
    description:
      "A compiled collection of promotional graphics created for the Pinoy Vanilla Rust 2X event.",
    preview: "/GD1.png",
    category: "Public Materials",
    year: "2025",
    items: designWorks,
  },
  {
    id: 2,
    title: "Community Event Social Kit",
    description:
      "A sample social media package with launch and reminder graphics for a community event.",
    preview: "/GD1.png",
    category: "Social Media",
    year: "2025",
    items: socialMediaWorks,
  },
]

const categories = ["All", "Social Media", "Public Materials", "Prints"]

export default function GraphicDesignPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [folders, setFolders] = useState(designFolders)
  const [selectedFolder, setSelectedFolder] = useState<(typeof designFolders)[number] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  useEffect(() => {
    fetch("/api/portfolio", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data?.folders?.length) {
          setFolders(data.folders.filter((folder: { type?: string }) => !folder.type || folder.type === "Graphic Design"))
        }
      })
      .catch(() => undefined)
  }, [])

  const openFolder = (folder: (typeof designFolders)[number]) => {
    setSelectedFolder(folder)
    setSelectedItemIndex(0)
    setDialogOpen(true)
  }

  const closeFolder = () => {
    setDialogOpen(false)
  }

  const filteredFolders =
    selectedCategory === "All"
      ? folders
      : folders.filter((folder) => folder.category === selectedCategory)

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
            Graphic <span className="text-primary">Design</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Visual work made for social media, public materials, and print.
          </p>
        </section>

        <section className="mb-12 animate-slide-up">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Sort by type:</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        <section className="animate-slide-up">
          {filteredFolders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFolders.map((folder, index) => (
                <Card
                  key={folder.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ animationDelay: `${index * 100}ms` }}
                  role="button"
                  tabIndex={0}
                  onClick={() => openFolder(folder)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      openFolder(folder)
                    }
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-muted/30">
                    <img
                      src={folder.preview}
                      alt={`${folder.title} preview`}
                      className="w-full h-full object-contain transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/90 px-3 py-2 text-sm font-medium">
                      <FolderOpen className="h-4 w-4 text-primary" />
                      Project folder
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {folder.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {folder.year}
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{folder.title}</h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {folder.description}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                      <FileImage className="h-4 w-4" />
                      {folder.items.length} {folder.items.length === 1 ? "design" : "designs"}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border py-16 text-center">
              <h2 className="text-xl font-semibold mb-2">More work coming soon</h2>
              <p className="text-muted-foreground">
                There are no {selectedCategory.toLowerCase()} pieces in the channel yet.
              </p>
            </div>
          )}
        </section>
      </div>
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open && window.innerWidth < 640) {
            closeFolder()
          }
        }}
      >
        {selectedFolder && (
          <DialogContent
            showCloseButton={false}
            className="h-[min(90vh,680px)] overflow-hidden p-0 sm:max-w-3xl"
            onPointerDownOutside={(event) => {
              if (window.innerWidth >= 640) {
                event.preventDefault()
              }
            }}
            onEscapeKeyDown={(event) => event.preventDefault()}
            onAnimationEnd={(event) => {
              if (!dialogOpen && event.target === event.currentTarget) {
                setSelectedFolder(null)
              }
            }}
          >
            <div className="grid h-full min-w-0 overflow-hidden md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <div className="relative flex h-64 min-h-0 items-center justify-center bg-muted/30 md:h-full">
                <img
                  src={selectedFolder.items[selectedItemIndex].image}
                  alt={selectedFolder.items[selectedItemIndex].title}
                  className="h-full w-full object-contain"
                />
                {selectedFolder.items.length > 1 && (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      aria-label="Previous design"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full shadow-md"
                      onClick={() =>
                        setSelectedItemIndex((index) =>
                          index === 0 ? selectedFolder.items.length - 1 : index - 1,
                        )
                      }
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      aria-label="Next design"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full shadow-md"
                      onClick={() =>
                        setSelectedItemIndex((index) =>
                          index === selectedFolder.items.length - 1 ? 0 : index + 1,
                        )
                      }
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-background/80 px-3 py-2">
                      {selectedFolder.items.map((item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          aria-label={`View design ${index + 1}: ${item.title}`}
                          aria-current={selectedItemIndex === index ? "true" : undefined}
                          className={`h-2 w-2 rounded-full transition-colors ${selectedItemIndex === index ? "bg-primary" : "bg-muted-foreground/50"}`}
                          onClick={() => setSelectedItemIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="relative min-h-0 min-w-0 overflow-y-auto p-6 sm:p-8">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close project folder"
                  className="absolute right-4 top-4"
                  onClick={closeFolder}
                >
                  <X className="h-5 w-5" />
                </Button>
                <DialogHeader className="pr-10 text-left">
                  <div className="mb-3 flex items-center gap-2 text-sm text-primary">
                    <FolderOpen className="h-4 w-4" />
                    Project folder
                  </div>
                  <DialogTitle className="text-2xl leading-tight sm:text-3xl">
                    {selectedFolder.title}
                  </DialogTitle>
                  <DialogDescription className="pt-2 leading-relaxed">
                    {selectedFolder.items[selectedItemIndex].description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedFolder.category}</Badge>
                  <Badge variant="outline">{selectedFolder.year}</Badge>
                  <Badge variant="outline">
                    {selectedFolder.items.length} {selectedFolder.items.length === 1 ? "design" : "designs"}
                  </Badge>
                </div>
                <div className="mt-8 border-t border-border pt-6">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Included work
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectedFolder.items.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        className={`flex min-w-0 items-center gap-3 border p-3 text-left transition-colors ${selectedItemIndex === index ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                        onClick={() => setSelectedItemIndex(index)}
                        aria-label={`View ${item.title}`}
                      >
                        <img
                          src={item.image}
                          alt=""
                          className="h-12 w-12 shrink-0 object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
