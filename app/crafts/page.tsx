"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Hammer, ShoppingBag, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const ORDER_LINK = "https://www.facebook.com/CaporaCrafts"

const categories = ["All", "Artisan Keycap", "Keychain", "Hippers"]

type Craft = {
	id: string
	title: string
	description: string
	image: string
	category: string
	year: string
	tags: string[]
}

export default function CraftsPage() {
	const [selectedCategory, setSelectedCategory] = useState("All")
	const [crafts, setCrafts] = useState<Craft[]>([])
	const [selectedCraft, setSelectedCraft] = useState<Craft | null>(null)

	useEffect(() => {
		fetch("/api/portfolio", { cache: "no-store" })
			.then((response) => (response.ok ? response.json() : null))
			.then((data) => {
				type PortfolioFolder = {
					type?: string
					items: { id: string; title: string; description: string; image: string; category: string; year: string; tags: string[] }[]
				}
				const folders = (data?.folders ?? []) as PortfolioFolder[]
				const remoteCrafts: Craft[] = folders
					.filter((folder) => folder.type === "Crafts")
					.flatMap((folder) => folder.items.map((item) => ({ ...item })))
				setCrafts(remoteCrafts)
			})
			.catch(() => undefined)
	}, [])

	const filteredCrafts =
		selectedCategory === "All" ? crafts : crafts.filter((craft) => craft.category === selectedCategory)

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Store",
		name: "Capora Crafts",
		description:
			"Handmade artisan keycaps, keychains, and hippers crafted to order by Psalm Salcedo.",
		url: "https://triffyarts.vercel.app/crafts",
		image: crafts[0]?.image,
		sameAs: [ORDER_LINK],
		areaServed: "PH",
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Crafts",
			itemListElement: crafts.map((craft) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "Product",
					name: craft.title,
					description: craft.description,
					image: craft.image,
					category: craft.category,
				},
			})),
		},
	}

	return (
		<div className="mission-page min-h-screen py-12 px-4 sm:px-6 lg:px-8">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<div className="max-w-7xl mx-auto">
				<section className="text-center mb-16 animate-fade-in">
					<div className="flex items-center justify-center gap-2 mb-4">
						<Hammer className="h-8 w-8 text-primary" />
						<Sparkles className="h-6 w-6 text-primary animate-pulse" />
					</div>
					<h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
						Handmade <span className="text-primary">Crafts</span>
					</h1>
					<p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
						Artisan keycaps, keychains, hippers, and other handcrafted pieces made to order.
					</p>
					<Button size="lg" className="group" asChild>
						<a href={ORDER_LINK} target="_blank" rel="noopener noreferrer">
							<ShoppingBag className="h-4 w-4 mr-2" />
							Order Here
						</a>
					</Button>
				</section>

				<section className="mb-12 animate-slide-up">
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
					{filteredCrafts.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{filteredCrafts.map((craft, index) => (
								<Card
									key={craft.id}
									className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up cursor-pointer"
									style={{ animationDelay: `${index * 100}ms` }}
									onClick={() => setSelectedCraft(craft)}
								>
									<div className="aspect-square overflow-hidden relative bg-muted/30">
										<img
											src={craft.image}
											alt={craft.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
									<div className="p-4">
										<div className="flex items-center justify-between mb-2">
											<Badge variant="secondary" className="text-xs">
												{craft.category}
											</Badge>
											<span className="text-xs text-muted-foreground">{craft.year}</span>
										</div>
										<h3 className="font-semibold group-hover:text-primary transition-colors">{craft.title}</h3>
									</div>
								</Card>
							))}
						</div>
					) : (
						<div className="border border-dashed border-border py-16 text-center">
							<h2 className="text-xl font-semibold mb-2">More crafts coming soon</h2>
							<p className="text-muted-foreground">
								There are no {selectedCategory.toLowerCase()} pieces posted yet.
							</p>
						</div>
					)}
				</section>

				{selectedCraft && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
						role="dialog"
						aria-modal="true"
						onClick={() => setSelectedCraft(null)}
					>
						<div className="relative max-w-[95%] max-h-[95%] bg-transparent" onClick={(event) => event.stopPropagation()}>
							<button
								className="absolute top-2 right-2 z-50 rounded bg-black/50 p-2 text-white hover:bg-black/70"
								onClick={() => setSelectedCraft(null)}
								aria-label="Close"
							>
								✕
							</button>
							<img
								src={selectedCraft.image}
								alt={selectedCraft.title}
								className="max-h-[80vh] w-auto max-w-full object-contain rounded shadow-2xl"
							/>
							<div className="mt-4 text-center text-white">
								<h3 className="text-lg font-semibold">{selectedCraft.title}</h3>
								{selectedCraft.description && (
									<p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">{selectedCraft.description}</p>
								)}
								<Button size="lg" className="group mt-4" asChild>
									<a href={ORDER_LINK} target="_blank" rel="noopener noreferrer">
										<ShoppingBag className="h-4 w-4 mr-2" />
										Order Here
									</a>
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
