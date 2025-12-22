"use client"

import { Github, Coffee, Facebook, Instagram, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/TriffyArt",
    icon: Github,
    color: "hover:text-gray-900 dark:hover:text-gray-100",
    hoverBg: "hover:bg-gray-100 dark:hover:bg-gray-800",
  },
  {
    name: "Ko-fi",
    href: "https://ko-fi.com/triffyart",
    icon: Coffee,
    color: "hover:text-orange-500",
    hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-950",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/triffyArts",
    icon: Facebook,
    color: "hover:text-blue-600",
    hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-950",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/Triffy_22",
    icon: Instagram,
    color: "hover:text-pink-600",
    hoverBg: "hover:bg-pink-50 dark:hover:bg-pink-950",
  },
]

export function FloatingSocial() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
      }`}
    >
      <div className="flex flex-col space-y-2 bg-card/90 backdrop-blur-md border border-border/50 rounded-2xl p-3 shadow-xl animate-float">
        {/* Collapse/Expand Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-10 h-8 p-0 transition-all duration-200 hover:bg-primary/10"
          aria-label={isCollapsed ? "Expand social links" : "Collapse social links"}
        >
          {isCollapsed ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>

        {/* Social Links */}
        <div
          className={`flex flex-col space-y-2 transition-all duration-300 overflow-hidden ${
            isCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
          }`}
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <Button
                key={social.name}
                variant="ghost"
                size="sm"
                asChild
                className={`w-10 h-10 p-0 transition-all duration-200 ${social.color} ${social.hoverBg} group relative`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="relative"
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />

                  {/* Tooltip */}
                  <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {social.name}
                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-foreground"></div>
                  </div>
                </a>
              </Button>
            )
          })}
        </div>

        {/* Decorative Element */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Small indicator dot */}
        <div className="flex justify-center">
          <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}
