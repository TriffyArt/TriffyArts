import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Palette, Code, Camera, Sparkles, Figma, HandMetal, LucideBrush, Crop } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Psalm Salcedo\'s portfolio. Creative artist and designer crafting beautiful digital experiences through art, design, and creative storytelling.',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 animate-float">
              <Palette className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-balance mb-6">
              Creative <span className="text-primary">Artist</span>
              <br />& Designer
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto mb-8">
              Crafting beautiful digital experiences through art, design, and creative storytelling
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="group">
              <Link href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-primary/60 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse delay-700" />
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What I Create</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Bringing ideas to life through various creative mediums and digital platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: Palette,
                title: "Digital Art",
                description: "Original artwork and illustrations created with passion and attention to detail",
                color: "text-green-500",
              },
              {
                icon: Figma,
                title: "UI/UX Design",
                description: "Intuitive and engaging user interfaces for web and mobile applications",
                color: "text-blue-500",
              },
              {
                icon: Crop,
                title: "Graphic Design",
                description: "Creative visual content and branding solutions for businesses and individuals",
                color: "text-blue-500",
              },
              {
                icon: LucideBrush,
                title: "Clay Arts",
                description: "Handcrafted polymer clay keychains and artisan pieces made with care",
                color: "text-purple-500",
              },
            ].map((service, index) => (
              <Card
                key={service.title}
                className="p-6 hover:shadow-lg transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-balance">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              A glimpse into my latest creative projects and artistic endeavors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Welcome2025.gif",
                title: "Welcome 2025",
                category: "Pixel Art",
                artId: 1,
              },
              {
                image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Pizza.gif",
                title: "Cheesy Pizza",
                category: "Pixel Art",
                artId: 2,
              },
              {
                image: "https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/robotik.gif",
                title: "Robotik",
                category: "Pixel Art",
                artId: 3,
              },
            ].map((project, index) => (
              <Link href={`/arts?id=${project.artId}`} key={project.title}>
                <Card
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.category} • 2024</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="group bg-transparent">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Let's Create Something Amazing</h2>
          <p className="text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Ready to bring your creative vision to life? I'd love to collaborate with you on your next project.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              Start a Project
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
