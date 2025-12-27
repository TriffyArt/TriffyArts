import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { FloatingSocial } from "@/components/floating-social"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  metadataBase: new URL('https://triffyarts.vercel.app'),
  title: {
    default: 'Psalm Salcedo - Creative Artist & Designer | Portfolio',
    template: '%s | Psalm Salcedo'
  },
  description: "Digital artist and creative designer from Legazpi, Albay. Specializing in digital art, web design, UI/UX design, and creative storytelling. Explore my portfolio of projects and artwork.",
  keywords: ['Psalm Salcedo', 'digital artist', 'creative designer', 'web design', 'UI/UX design', 'digital art', 'portfolio', 'Legazpi', 'Albay', 'Philippines', 'graphic design'],
  authors: [{ name: 'Psalm Salcedo' }],
  creator: 'Psalm Salcedo',
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://triffyarts.vercel.app',
    siteName: 'Psalm Salcedo Portfolio',
    title: 'Psalm Salcedo - Creative Artist & Designer',
    description: 'Digital artist and creative designer specializing in digital art, web design, and UI/UX design.',
    images: [
      {
        url: '/CoverPhoto.jpg',
        width: 1200,
        height: 630,
        alt: 'Psalm Salcedo Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Psalm Salcedo - Creative Artist & Designer',
    description: 'Digital artist and creative designer specializing in digital art, web design, and UI/UX design.',
    images: ['/CoverPhoto.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-PH" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>
            <Navigation />
            <FloatingSocial />
          </Suspense>
          <main className="pt-16">{children}</main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}