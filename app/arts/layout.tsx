import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arts',
  description: 'Explore my collection of digital art, pixel art, illustrations, and creative artworks. From abstract pieces to character designs and vibrant digital paintings.',
}

export default function ArtsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
