import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, MapPin, Calendar, Award, Heart, Lightbulb } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Psalm Salcedo, a passionate digital artist and creative designer with over 3 years of experience in digital art and web design from Legazpi, Albay.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-20 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
                Hello, I'm <span className="text-primary">Psalm</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance mb-6 leading-relaxed">
                A passionate digital artist and creative designer with over 3 years of experience in digital art and web UI/UX design.
              </p>
              <p className="text-lg text-muted-foreground text-balance mb-8 leading-relaxed">
                Based in Legazpi, Albay, I specialize in digital art and web UI/UX design. 
                My work combines traditional artistic principles within a modern digital 
                techniques to craft unique and captivating visual narratives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="group">
                  <Link href="/contact">
                    Let's Collaborate
                    <Heart className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </Link>
                </Button>
                <Button variant="outline" className="group bg-transparent" asChild>
                  <a href="https://3k8zfxpvjkeu6ios.public.blob.vercel-storage.com/Resume.pdf" download>
                    <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 relative">
                <img
                  src="/my-face.jpg"
                  alt="Alex - Digital Artist"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              {/* Floating info cards */}
              <Card className="absolute -bottom-6 -left-6 p-4 bg-card/90 backdrop-blur-sm animate-float">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary"/>
                  <span className="text-sm font-medium">Legazpi, Albay PH</span>
                </div>
              </Card>
              <Card
                className="absolute -top-6 -right-6 p-4 bg-card/90 backdrop-blur-sm animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">3+ Years</span>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills & Expertise */}
        <section className="mb-20 animate-slide-up">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Art",
                skills: ["Illustration", "Concept Art", "Character Design", "Digital Painting", "Pixel Art"],
                icon: "🎨",
              },
              {
                title: "Design",
                skills: ["UI/UX Design", "Brand Identity", "Typography", "Layout Design", "Color Theory"],
                icon: "✨",
              },
              {
                title: "Technical",
                skills: ["Figma", "Canva", "Web Technologies", "Clip Studio", "Aseprite"],
                icon: "⚡",
              },
            ].map((category, index) => (
              <Card
                key={category.title}
                className="p-6 hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-3xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-20 animate-slide-up">
          <h2 className="text-3xl font-bold mb-12 text-center">My Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              {[
                {
                  year: "present",
                  title: "Custom Clay Artisan Keycaps Maker",
                  company: "Capora (owner)",
                  description: "I make custom clay artisan keycaps for mechanical keyboards.",
                  current: true,
                },
                  {
                  year: "present",
                  title: "Sticker Designer & Digital Artist",
                  company: "bytedance (Capcut Creator Program)",
                  description: "Creating popular sticker packs and digital art assets for Capcut users worldwide.",
                  current: true,
                },
                {
                  year: "present",
                  title: "Ui/UX Designer & Digital Artist",
                  company: "Freelance",
                  description: "Providing design and digital art services to various clients worldwide.",
                  current: true,
                },
                {
                  year: "",
                  title: "Information Technology",
                  company: "Computer arts and Technological College",
                  description: "Currently Taking Bachelor of Science in Information Technology at CAT College. I am graduating in year 2027.",
                  current: true,
                },
                {
                  year: "2022",
                  title: "Freelance Artist & Designer",
                  company: "Independent",
                  description:
                    "Expanded client base working with startups and established brands on various creative projects.",
                },
              ].map((item, index) => (
                <div
                  key={item.year}
                  className="relative flex items-start mb-12 animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold relative z-10">
                    {item.current ? <Award className="h-6 w-6" /> : item.year.slice(-2)}
                  </div>
                  <Card className="ml-6 p-6 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      {item.current && <Badge className="text-xs">Current</Badge>}
                    </div>
                    <p className="text-primary font-medium mb-2">{item.company}</p>
                    <p className="text-muted-foreground text-balance">{item.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-20 animate-slide-up">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-6">My Creative Philosophy</h2>
            <blockquote className="text-xl text-muted-foreground text-balance leading-relaxed italic mb-8">
              "Art is not what you see, but what you make others see. I believe in creating work that not only looks
              beautiful but also tells a story, evokes emotion, and creates meaningful connections between the viewer
              and the message."
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Storytelling",
                  description: "Every piece should tell a compelling story that resonates with the audience.",
                },
                {
                  title: "Innovation",
                  description: "Pushing creative boundaries while maintaining timeless design principles.",
                },
                {
                  title: "Collaboration",
                  description: "The best work comes from understanding and working closely with clients.",
                },
              ].map((principle, index) => (
                <div key={principle.title} className="animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <h3 className="text-lg font-semibold mb-3">{principle.title}</h3>
                  <p className="text-muted-foreground text-balance">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center animate-slide-up">
          <Card className="p-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Together?</h2>
            <p className="text-lg text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and collaborate with passionate people. Let's discuss how we
              can bring your creative vision to life.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/contact">
                Get In Touch
                <Heart className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
              </Link>
            </Button>
          </Card>
        </section>
      </div>
    </div>
  )
}



