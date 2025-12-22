"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Filter } from "lucide-react"
import { useState } from "react"

const projects = [
	{
		id: 1,
		title: "Inventory Management System",
		description:
			"A comprehensive web application designed to streamline inventory tracking and management for small to medium-sized businesses. Features include real-time stock updates, order processing, and reporting tools. with multiple warehouses support.",
		image: "/InvenTrack.png",
		category: "Web Development",
		tags: ["Web Design", "UI/UX", "React.js", "Inventory System"],
		year: "2024",
    	client: "Self-Initiated",
    	ProjectType: "School Project",
		link: "https://github.com/TriffyArt/Inventory-Management-System",
		github: "https://github.com/TriffyArt/Inventory-Management-System",
	},
	{
		id: 2,
		title: "FoodPanda Clone UI/UX Design",
		description:
			"A user-friendly and visually appealing UI/UX design for a food delivery application, inspired by FoodPanda. The design focuses on intuitive navigation, vibrant visuals, and seamless user interactions to enhance the overall user experience.",
		image: "/FPclone.png",
		category: "App Design",
		tags: ["Web Design", "UI/UX", "React.js", "Inventory System"],
		year: "2024",
    	client: "Self-Initiated",
    	ProjectType: "Self Project",
		link: "https://www.figma.com/community/file/1572867449289424978/foodpanda-ui-ux-design",
	},
]

const categories = [
	"All",
	"Branding",
	"Web Design",
	"App Design",
	"Digital Art",
	"Packaging",
	"Web Development",
]

export default function ProjectsPage() {
	const [selectedCategory, setSelectedCategory] = useState("All")

	const filteredProjects =
		selectedCategory === "All"
			? projects
			: projects.filter((project) => project.category === selectedCategory)

	return (
		<div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<section className="text-center mb-16 animate-fade-in">
					<h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
						My <span className="text-primary">Projects</span>
					</h1>
					<p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
						A collection of creative projects spanning branding, web design,
						digital art, and more. Each project represents a unique challenge
						and creative solution.
					</p>
				</section>

				{/* Filter Tabs */}
				<section className="mb-12 animate-slide-up">
					<div className="flex items-center justify-center mb-8">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Filter className="h-4 w-4" />
							<span>Filter by category:</span>
						</div>
					</div>
					<div className="flex flex-wrap justify-center gap-2">
						{categories.map((category) => (
							<Button
								key={category}
								variant={
									selectedCategory === category ? "default" : "outline"
								}
								size="sm"
								onClick={() => setSelectedCategory(category)}
								className="transition-all duration-200"
							>
								{category}
							</Button>
						))}
					</div>
				</section>

				{/* Projects Grid */}
				<section className="animate-slide-up">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredProjects.map((project, index) => (
							<Card
								key={project.id}
								className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								{/* Project Image */}
								<div className="aspect-[4/3] overflow-hidden relative">
									<img
										src={project.image || "/placeholder.svg"}
										alt={project.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

									{/* Overlay Actions */}
									<div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="flex gap-2">
											{project.link && (
												<Button
													size="sm"
													asChild
													className="bg-white/90 text-black hover:bg-white"
												>
													<a
														href={project.link}
														target="_blank"
														rel="noopener noreferrer"
													>
														<ExternalLink className="h-4 w-4 mr-1" />
														View
													</a>
												</Button>
											)}
											{project.github && (
												<Button
													size="sm"
													asChild
													variant="outline"
													className="bg-white/10 border-white/20 text-white hover:bg-white/20"
												>
													<a
														href={project.github}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Github className="h-4 w-4 mr-1" />
														Code
													</a>
												</Button>
											)}
										</div>
									</div>
								</div>

								{/* Project Info */}
								<div className="p-6">
									<div className="flex items-center justify-between mb-3">
										<Badge variant="secondary" className="text-xs">
											{project.category}
										</Badge>
										<div className="flex items-center gap-1 text-xs text-muted-foreground">
											<Calendar className="h-3 w-3" />
											{project.year}
										</div>
									</div>

									<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
										{project.title}
									</h3>

									<p className="text-muted-foreground text-sm text-balance mb-4 leading-relaxed">
										{project.description}
									</p>

									<div className="flex items-center justify-between">
										<div className="flex flex-wrap gap-1">
											{project.tags.slice(0, 2).map((tag) => (
												<Badge key={tag} variant="outline" className="text-xs">
													{tag}
												</Badge>
											))}
											{project.tags.length > 2 && (
												<Badge variant="outline" className="text-xs">
													+{project.tags.length - 2}
												</Badge>
											)}
										</div>
									</div>

									<div className="mt-4 pt-4 border-t border-border">
										<p className="text-xs text-muted-foreground">
											<span className="font-medium">Client:</span> {project.client}
										</p>
									</div>
                  <div className="mt-4 pt-4 border-t border-border">
										<p className="text-xs text-muted-foreground">
                      <span className="font-medium">Project:</span> {project.ProjectType}
										</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				</section>

				{/* Call to Action */}
				<section className="mt-20 text-center animate-slide-up">
					<Card className="p-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
						<h2 className="text-3xl font-bold mb-4">Have a Project in Mind?</h2>
						<p className="text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
							I'm always excited to work on new creative challenges. Let's discuss
							how we can bring your vision to life.
						</p>
						<Button size="lg" className="group">
							<a href="/contact">Start Your Project</a>
						</Button>
					</Card>
				</section>
			</div>
		</div>
	)
}
