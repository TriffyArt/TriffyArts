"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Briefcase, Palette, Coffee, Calendar } from "lucide-react"
import { useState } from "react"

const services = [
	{
		icon: Palette,
		title: "Digital Art & Illustration",
		description: "Custom digital artworks, character design, and illustrations",
		price: "Starting at ₱500",
	},
	{
		icon: Palette,
		title: "Artisan Crafts & Handmade Goods",
		description: "Unique handmade items, custom orders, and craft workshops",
		price: "Starting at ₱300",
	},
	{
		icon: MessageCircle,
		title: "Figma Web Design & UI/UX",
		description: "Website design, user interface, and user experience design",
		price: "Starting at $30",
	},
	{
		icon: Coffee,
		title: "Creative Consultation",
		description: "Art direction, creative strategy, and design consultation",
		price: "free initial consultation",
	},
]

const faqs = [
	{
		question: "What's your typical project timeline?",
		answer:
			"Project timelines vary depending on scope and complexity. Simple illustrations take 1-2 weeks, while comprehensive brand identity projects can take 4-6 weeks.",
	},
	{
		question: "Do you offer revisions?",
		answer:
			"Yes! I include 2-3 rounds of revisions in all projects to ensure the final result meets your vision and expectations.",
	},
	{
		question: "What file formats do you provide?",
		answer:
			"I provide high-resolution files in various formats including PNG, JPG, SVG, and source files (PSD, AI) depending on the project requirements.",
	},
	{
		question: "Do you work with international clients?",
		answer:
			"I work with clients worldwide and am comfortable with remote collaboration through video calls and digital communication.",
	},
]

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
		projectType: "",
		budget: "",
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)
	const [submitCount, setSubmitCount] = useState<number>(0)
	const [honeypot, setHoneypot] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
		setErrorMessage("") // Clear error on input change
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage("")
		setSuccessMessage("")

		// Anti-spam checks
		const currentTime = Date.now()
		const timeSinceLastSubmit = currentTime - lastSubmitTime

		// Honeypot check (bot trap)
		if (honeypot) {
			console.log("Spam detected: honeypot filled")
			return
		}

		// Rate limiting: prevent multiple submissions within 30 seconds
		if (timeSinceLastSubmit < 30000 && lastSubmitTime > 0) {
			setErrorMessage("Please wait at least 30 seconds before submitting again.")
			return
		}

		// Check for too many submissions in short time (5 submissions per hour)
		if (submitCount >= 5) {
			setErrorMessage("You've reached the maximum number of submissions. Please try again later.")
			return
		}

		// Basic spam detection: check for excessive links or suspicious patterns
		const messageText = `${formData.name} ${formData.email} ${formData.subject} ${formData.message}`
		const linkCount = (messageText.match(/https?:\/\//g) || []).length
		if (linkCount > 2) {
			setErrorMessage("Your message contains too many links. Please remove some and try again.")
			return
		}

		// Check minimum message length
		if (formData.message.length < 10) {
			setErrorMessage("Please provide a more detailed message (at least 10 characters).")
			return
		}

		setIsSubmitting(true)

		try {
			const response = await fetch("https://	formspree.io/f/xpwkzzww", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				setSuccessMessage("Message sent successfully! I'll get back to you soon.")
				setLastSubmitTime(currentTime)
				setSubmitCount(submitCount + 1)
				
				// Reset form
				setFormData({
					name: "",
					email: "",
					subject: "",
					message: "",
					projectType: "",
					budget: "",
				})
			}
		} catch (error) {
			console.error("Error submitting form:", error)
		}

		setIsSubmitting(false)
	}

	return (
		<div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<section className="text-center mb-16 animate-fade-in">
					<div className="flex items-center justify-center gap-2 mb-4">
						<MessageCircle className="h-8 w-8 text-primary" />
						<Send className="h-6 w-6 text-primary animate-pulse" />
					</div>
					<h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
						Let's <span className="text-primary">Connect</span>
					</h1>
					<p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
						Ready to bring your creative vision to life? I'd love to hear about your project and discuss how we can work
						together to create something amazing.
					</p>
				</section>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Contact Form */}
					<div className="lg:col-span-2 animate-slide-up">
						<Card className="p-8">
							<div className="flex items-center gap-2 mb-6">
								<Send className="h-5 w-5 text-primary" />
								<h2 className="text-2xl font-bold">Send Me a Message</h2>
							</div>

							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Honeypot field - hidden from users, only bots will fill it */}
								<input
									type="text"
									name="website"
									value={honeypot}
									onChange={(e) => setHoneypot(e.target.value)}
									style={{ display: 'none' }}
									tabIndex={-1}
									autoComplete="off"
								/>

								{/* Error Message */}
								{errorMessage && (
									<div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
										{errorMessage}
									</div>
								)}

								{/* Success Message */}
								{successMessage && (
									<div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 text-sm">
										{successMessage}
									</div>
								)}

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label htmlFor="name" className="block text-sm font-medium mb-2">
											Full Name *
										</label>
										<Input
											id="name"
											name="name"
											type="text"
											required
											value={formData.name}
											onChange={handleInputChange}
											placeholder="Your full name"
											className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
										/>
									</div>
									<div>
										<label htmlFor="email" className="block text-sm font-medium mb-2">
											Email Address *
										</label>
										<Input
											id="email"
											name="email"
											type="email"
											required
											value={formData.email}
											onChange={handleInputChange}
											placeholder="your.email@example.com"
											className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label htmlFor="projectType" className="block text-sm font-medium mb-2">
											Project Type
										</label>
										<select
											id="projectType"
											name="projectType"
											value={formData.projectType}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
										>
											<option value="">Select project type</option>
											<option value="digital-art">Digital Art & Illustration</option>
											<option value="branding">Artisan Crafts & Handmade Goods</option>
											<option value="web-design">Web Design & UI/UX</option>
											<option value="consultation">Creative Consultation</option>
											<option value="other">Other</option>
										</select>
									</div>
									<div>
										<label htmlFor="budget" className="block text-sm font-medium mb-2">
											Budget Range
										</label>
										<Input
											id="budget"
											name="budget"
											type="text"
											value={formData.budget}
											onChange={handleInputChange}
											placeholder="e.g., $500 - $1,000 or ₱5,000 - ₱10,000"
											className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
										/>
									</div>
								</div>

								<div>
									<label htmlFor="subject" className="block text-sm font-medium mb-2">
										Subject *
									</label>
									<Input
										id="subject"
										name="subject"
										type="text"
										required
										value={formData.subject}
										onChange={handleInputChange}
										placeholder="Brief description of your project"
										className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
									/>
								</div>

								<div>
									<label htmlFor="message" className="block text-sm font-medium mb-2">
										Message *
									</label>
									<Textarea
										id="message"
										name="message"
										required
										value={formData.message}
										onChange={handleInputChange}
										placeholder="Tell me more about your project, goals, timeline, and any specific requirements..."
										rows={6}
										className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
									/>
								</div>

								<Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
											Sending Message...
										</>
									) : (
										<>
											Send Message
											<Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</>
									)}
								</Button>
							</form>
						</Card>
					</div>

					{/* Contact Info & Services */}
					<div className="space-y-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
						{/* Contact Information */}
						<Card className="p-6">
							<h3 className="text-xl font-bold mb-6">Get in Touch</h3>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
										<Mail className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="font-medium">Email</p>
										<p className="text-sm text-muted-foreground">businesspsalmsalcedo@gmail.com</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
										<Phone className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="font-medium">Phone</p>
										<p className="text-sm text-muted-foreground">+63 956 345 7045 </p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
										<MapPin className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="font-medium">Location</p>
										<p className="text-sm text-muted-foreground">Daraga, Albay 4501  Philippines</p>
									</div>
								</div>

								<div className="flex items-center gap-3">
									<div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
										<Clock className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="font-medium">Response Time</p>
										<p className="text-sm text-muted-foreground">Within 24 hours</p>
									</div>
								</div>
							</div>
						</Card>

						{/* Services */}
						<Card className="p-6">
							<h3 className="text-xl font-bold mb-6">Services & Pricing</h3>
							<div className="space-y-4">
								{services.map((service, index) => (
									<div
										key={index}
										className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
									>
										<div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
											<service.icon className="h-4 w-4 text-primary" />
										</div>
										<div className="flex-1">
											<p className="font-medium text-sm">{service.title}</p>
											<p className="text-xs text-muted-foreground mb-1">{service.description}</p>
											<Badge variant="secondary" className="text-xs">
												{service.price}
											</Badge>
										</div>
									</div>
								))}
							</div>
						</Card>

						{/* Availability */}
						<Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
							<div className="flex items-center gap-2 mb-4">
								<Calendar className="h-5 w-5 text-primary" />
								<h3 className="text-lg font-bold">Current Availability</h3>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm">New Projects</span>
									<Badge className="bg-green-100 text-green-800 border-green-200">Available</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Rush Projects</span>
									<Badge variant="secondary">Limited</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm">Next Opening</span>
									<span className="text-sm text-muted-foreground">December 2025</span>
								</div>
							</div>
						</Card>
					</div>
				</div>

				{/* FAQ Section */}
				<section className="mt-20 animate-slide-up">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
						<p className="text-muted-foreground text-balance max-w-2xl mx-auto">
							Here are some common questions about working with me. Don't see your question? Feel free to ask!
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{faqs.map((faq, index) => (
							<Card key={index} className="p-6 hover:shadow-lg transition-shadow">
								<h3 className="font-semibold mb-3 text-balance">{faq.question}</h3>
								<p className="text-sm text-muted-foreground text-balance leading-relaxed">{faq.answer}</p>
							</Card>
						))}
					</div>
				</section>

				{/* Call to Action */}
				{/*<section className="mt-20 text-center animate-slide-up">
          <Card className="p-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Coffee className="h-6 w-6 text-primary" />
              <MessageCircle className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Let's Grab a Virtual Coffee</h2>
            <p className="text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
              Prefer to chat before diving into a project? I'm always up for a friendly conversation about your ideas,
              creative challenges, or just to say hello!
            </p>
            <Button size="lg" variant="outline" className="group bg-transparent">
              Schedule a Call
              <Calendar className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
            </Button>
          </Card>
        </section> */}
			</div>
		</div>
	)
}
