"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Download, Share2, Eye, Palette, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { title } from "process"
import { Description } from "@radix-ui/react-toast"
import { useSearchParams } from "next/navigation"

const artworks = [
	{
		id: 1,
		title: "Welcome 2025",
		description:
			"Pixel Art piece symbolizing the dawn of a new year, blending vibrant colors and abstract forms to evoke a sense of hope and renewal.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Welcome2025.gif",
		category: "Pixel Art",
		medium: "Digital Pixel Art",
		dimensions: "960x560px",
		year: "2025",
		tags: ["Pixel Art", "New Year", "Abstract"],
		featured: true,
	},
	{
		id: 2,
		title: "Cheesy Pizza",
		description:
			"A fun and colorful pixel art illustration of a delicious cheesy pizza slice, capturing the gooey texture and vibrant toppings in a playful style.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Pizza.gif",
		category: "Pixel Art",
		medium: "Digital Pixel Art Illustration",
		dimensions: "672x672px",
		year: "2024",
		tags: ["Pixel Art", "Food", "Fun"],
		featured: true,
	},
	{
		id: 3,
		title: "Robotik",
		description:
			"just a robotik Pixel Artwork exploring isometric Features within a character design.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/robotik.gif",
		category: "Pixel Art",
		medium: "Digital Pixel Art",
		dimensions: "2500x3500px",
		year: "2024",
		tags: ["Robot", "Isometric", "Character Design"],
		featured: true,
	},
	{
		id: 4,
		title: "Back to School",
		description:
			"back to school themed artwork featuring geometric shapes and a vibrant color palette, for pixil art competition.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/BacktoSchoolEntry.png",
		category: "Pixel Art",
		medium: "pixel art",
		dimensions: "3680x1790px",
		year: "2024",
		tags: ["School", "Geometric", "Vibrant"],
		featured: false,
	},
	{
		id: 5,
		title: "Scepter",
		description:
			"Scepter symbolizing mystical power and authority.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Scepter.png",
		category: "Pixel Art",
		medium: "pixel art",
		dimensions: "756x1368px",
		year: "2024",
		tags: ["Mystical", "Power", "Authority"],
		featured: false,
	},
	{
		id: 6,
		title: "Darkmode Shadows #1",
		description:
			"Phone wallpaper pixel artwork showcasing dark shadows colors.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Darkmode1.png",
		category: "Pixel Art",
		medium: "Pixel Art",
		dimensions: "1120x1750px",
		year: "2024",
		tags: ["pixel art", "phome wallpaper", "dark mode"],
		featured: false,
	},
	{
		id: 7,
		title: "Darkmode Shadows #2",
		description:
			"Phone wallpaper pixel artwork showcasing dark shadows colors.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Darkmode2.png",
		category: "Pixel Art",
		medium: "Pixel Art",
		dimensions: "1120x1750px",
		year: "2024",
		tags: ["pixel art", "phome wallpaper", "dark mode"],
		featured: false,
	},
	{
		id: 8,
		title: "Darkmode Shadows #3",
		description:
			"Phone wallpaper pixel artwork showcasing dark shadows colors.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Darkmode3.png",
		category: "Pixel Art",
		medium: "Pixel Art",
		dimensions: "1120x1750px",
		year: "2024",
		tags: ["pixel art", "phome wallpaper", "dark mode"],
		featured: false,
	},
	{
		id: 9,
		title: "Darkmode Shadows #4",
		description:
			"Phone wallpaper pixel artwork showcasing dark shadows colors.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Darkmode4.png",
		category: "Pixel Art",
		medium: "Pixel Art",
		dimensions: "1120x1750px",
		year: "2024",
		tags: ["pixel art", "phome wallpaper", "dark mode"],
		featured: false,
	},
	{
		id: 10,
		title: "Darkmode Shadows #5",
		description:
			"Phone wallpaper pixel artwork showcasing dark shadows colors.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Darkmode5.png",
		category: "Pixel Art",
		medium: "Pixel Art",
		dimensions: "1120x1750px",
		year: "2024",
		tags: ["pixel art", "phome wallpaper", "dark mode"],
		featured: false,
	},
	{
		id: 11,
		title: "Darkmode Shadows #6",
		description:
			"Phone wallpaper pixel artwork showcasing dark shadows colors.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Darkmode6.png",
		category: "Pixel Art",
		medium: "Pixel Art",
		dimensions: "1120x1750px",
		year: "2024",
		tags: ["pixel art", "phome wallpaper", "dark mode"],
		featured: false,
	},
	{
		id: 12,
		title: "Darkmode Shadows #7",
		description:
			"Phone wallpaper pixel artwork showcasing dark shadows colors.",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Darkmode7.png",
		category: "Pixel Art",
		medium: "Pixel Art",
		dimensions: "1120x1750px",
		year: "2024",
		tags: ["pixel art", "phome wallpaper", "dark mode"],
		featured: false,
	},
	{
		id: 13,
		title: "Rust Server Poster",
		Description:
			"Rust Game Server poster banner for social media advertisement",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/GD1.png",
		category: "Graphic Design",
		medium: "Digital art",
		dimension:"940x788px",
		year: "2025",
		tags: ["Graphic Design", "Game Poster", "Social Media Poster"],
		featured: false,
	},
	{
		id: 14,
		title: "Rust Character Full White out kit",
		Description: 
			"Rust Game Character Wearing a full white out kit, used in discord sticker and vector asset",
		image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/DG1.png",
		category: "Digital Art",
		medium: "Digital Art",
		dimension: "960x540px",
		year: "2025",
		tags: ["Digital Art","Game Character Art","Vector Asset"],
		featured: false,
	},
]

const categories = ["All","Pixel Art", "Digital Art", "Graphic Design", "Illustration","Product Designs"]

export default function ArtsPage() {
	const [selectedCategory, setSelectedCategory] = useState("All")
	const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry")

	const searchParams = useSearchParams()

	// Lightbox state (index-based)
	const [modalOpen, setModalOpen] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	const openModalByIndex = (index: number) => {
		if (index < 0) return
		setSelectedIndex(index)
		setModalOpen(true)
	}

	// Open modal from URL parameter
	useEffect(() => {
		const artId = searchParams?.get('id')
		if (artId) {
			const index = artworks.findIndex(art => art.id === parseInt(artId))
			if (index !== -1) {
				openModalByIndex(index)
			}
		}
	}, [searchParams])

	const closeModal = () => {
		setModalOpen(false)
		setSelectedIndex(null)
	}

	const showPrev = () => {
		if (selectedIndex === null) return
		setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + artworks.length) % artworks.length))
	}

	const showNext = () => {
		if (selectedIndex === null) return
		setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % artworks.length))
	}

	// Keyboard navigation
	useEffect(() => {
		if (!modalOpen) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal()
			if (e.key === "ArrowLeft") showPrev()
			if (e.key === "ArrowRight") showNext()
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [modalOpen, selectedIndex])

	const selectedArtwork = selectedIndex !== null ? artworks[selectedIndex] : null

	const filteredArtworks =
		selectedCategory === "All" ? artworks : artworks.filter((artwork) => artwork.category === selectedCategory)

	const featuredArtworks = artworks.filter((artwork) => artwork.featured)

	return (
		<div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<section className="text-center mb-16 animate-fade-in">
					<div className="flex items-center justify-center gap-2 mb-4">
						<Palette className="h-8 w-8 text-primary" />
						<Sparkles className="h-6 w-6 text-primary animate-pulse" />
					</div>
					<h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
						Art <span className="text-primary">Gallery</span>
					</h1>
					<p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
						A curated collection of my digital artworks, illustrations, and creative explorations. Each piece tells a
						unique story through color, form, and imagination.
					</p>
				</section>

				{/* Featured Artworks */}
				<section className="mb-16 animate-slide-up">
					<div className="flex items-center gap-2 mb-8">
						<Sparkles className="h-5 w-5 text-primary" />
						<h2 className="text-2xl font-bold">Featured Artworks</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{featuredArtworks.slice(0, 3).map((artwork, index) => (
							<Card
								key={artwork.id}
								className="group overflow-hidden hover:shadow-2xl transition-all duration-500 animate-slide-up"
								style={{ animationDelay: `${index * 150}ms` }}
							>
								<div className="aspect-[3/4] overflow-hidden relative">
									<img
										src={
											artwork.image ||
											"/placeholder.svg?height=400&width=300&query=featured digital artwork"
										}
										alt={artwork.title}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-zoom-in"
										onClick={() => {
											const globalIndex = artworks.findIndex((a) => a.id === artwork.id)
											if (globalIndex !== -1) openModalByIndex(globalIndex)
										}}
										role="button"
										tabIndex={0}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												const globalIndex = artworks.findIndex((a) => a.id === artwork.id)
												if (globalIndex !== -1) openModalByIndex(globalIndex)
											}
										}}
									/>
									{/* gradient overlay should not block clicks on the image */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

									{/* Overlay Info */}
									{/* info overlay should not block clicks either (non-interactive) */}
									<div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
										<h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
										<p className="text-sm text-white/90 mb-4 text-balance">{artwork.description}</p>
										<div className="flex items-center justify-between">
										</div>
									</div>
								</div>
							</Card>
						))}
					</div>
				</section>

				{/* Filter Controls */}
				<section className="mb-12 animate-slide-up">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
						<div className="flex flex-wrap justify-center sm:justify-start gap-2">
							{categories.map((category) => (
								<Button
									key={category}
									variant={selectedCategory === category ? "default" : "outline"}
									size="sm"
									onClick={() => setSelectedCategory(category)}
									className="transition-all duration-200"
								>
									{category}
								</Button>
							))}
						</div>

						<div className="flex items-center gap-2">
							<span className="text-sm text-muted-foreground">View:</span>
							<Button
								variant={viewMode === "grid" ? "default" : "outline"}
								size="sm"
								onClick={() => setViewMode("grid")}
							>
								Grid
							</Button>
							<Button
								variant={viewMode === "masonry" ? "default" : "outline"}
								size="sm"
								onClick={() => setViewMode("masonry")}
							>
								Masonry
							</Button>
						</div>
					</div>
				</section>

				{/* Artworks Gallery */}
				<section className="animate-slide-up">
					<div
						className={`${
							viewMode === "grid"
								? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
								: "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
						}`}
					>
						{filteredArtworks.map((artwork, index) => (
							<Card
								key={artwork.id}
								className={`group overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up ${
									viewMode === "masonry" ? "break-inside-avoid mb-6" : ""
								}`}
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<div className={`overflow-hidden relative ${viewMode === "grid" ? "aspect-[3/4]" : ""}`}>
									<img
										src={artwork.image || "/placeholder.svg?height=400&width=300&query=digital artwork"}
										alt={artwork.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										onClick={() => openModalByIndex(index)}
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

									{/* Quick Actions */}
									{/* allow clicks on the image; buttons inside need pointer-events enabled */}
									<div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
										<div className="flex gap-2">
											<Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white pointer-events-auto">
												<Heart className="h-4 w-4" />
											</Button>
											<Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white pointer-events-auto">
												<Share2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</div>

								<div className="p-4">
									<div className="flex items-center justify-between mb-2">
										<Badge variant="secondary" className="text-xs">
											{artwork.category}
										</Badge>
										<span className="text-xs text-muted-foreground">{artwork.year}</span>
									</div>

									<h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
										{artwork.title}
									</h3>

									<p className="text-sm text-muted-foreground text-balance mb-3 leading-relaxed">
										{artwork.description}
									</p>

									<div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
										<span>{artwork.medium}</span>
										<span>{artwork.dimensions}</span>
									</div>

									<div className="flex flex-wrap gap-1 mb-3">
										{artwork.tags.map((tag) => (
											<Badge key={tag} variant="outline" className="text-xs">
												{tag}
											</Badge>
										))}
									</div>

									<div className="flex items-center justify-between pt-3 border-t border-border">
										<Button size="sm" variant="ghost" className="text-xs" onClick={() => openModalByIndex(artworks.findIndex((a) => a.id === artwork.id))}>
											View Artwork
										</Button>
									</div>
								</div>
							</Card>
						))}
					</div>
				</section>

				{/* Lightbox Modal */}
				{modalOpen && selectedArtwork && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
						role="dialog"
						aria-modal="true"
						onClick={closeModal}
					>
						<div
							className="relative max-w-[95%] max-h-[95%] bg-transparent"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								className="absolute top-2 right-2 z-50 rounded bg-black/50 p-2 text-white hover:bg-black/70"
								onClick={closeModal}
								aria-label="Close"
							>
								✕
							</button>
							<img
								src={selectedArtwork.image}
								alt={selectedArtwork.title}
								className="max-h-[80vh] w-auto max-w-full object-contain rounded shadow-2xl"
							/>
							<div className="mt-4 text-center text-white">
								<h3 className="text-lg font-semibold">{selectedArtwork.title}</h3>
								{selectedArtwork.description && (
									<p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
										{selectedArtwork.description}
									</p>
								)}
							</div>
						</div>
					</div>
				)}

				{/* Call to Action */}
				<section className="mt-20 text-center animate-slide-up">
					<Card className="p-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
						<div className="flex items-center justify-center gap-2 mb-4">
							<Palette className="h-6 w-6 text-primary" />
							<Sparkles className="h-5 w-5 text-primary animate-pulse" />
						</div>
						<h2 className="text-3xl font-bold mb-4">Commission Custom Artwork</h2>
						<p className="text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
							Interested in a custom piece? I create personalized digital artworks tailored to your vision and style
							preferences.
						</p>
						<Button size="lg" className="group">
							<a href="/contact">
								Request Commission
							</a>
						</Button>
					</Card>
				</section>
			</div>
		</div>
	)
}
