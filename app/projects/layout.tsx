import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse through my portfolio of web development, UI/UX design, and digital art projects. Including inventory management systems, app designs, and creative digital artworks.',
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
