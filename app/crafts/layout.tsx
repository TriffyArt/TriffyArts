import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crafts',
  description:
    'Handmade artisan keycaps, keychains, and hippers by Capora Crafts. Browse the gallery and order custom pieces directly through Facebook.',
  keywords: [
    'Capora Crafts',
    'artisan keycap',
    'keychain',
    'hippers',
    'handmade crafts Philippines',
    'custom keycap Philippines',
    'Legazpi crafts',
  ],
  alternates: {
    canonical: 'https://triffyarts.vercel.app/crafts',
  },
  openGraph: {
    type: 'website',
    url: 'https://triffyarts.vercel.app/crafts',
    title: 'Crafts | Capora Crafts',
    description:
      'Handmade artisan keycaps, keychains, and hippers by Capora Crafts. Order custom pieces directly through Facebook.',
    images: [
      {
        url: '/CoverPhoto.jpg',
        width: 1200,
        height: 630,
        alt: 'Capora Crafts handmade artisan keycaps and keychains',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crafts | Capora Crafts',
    description: 'Handmade artisan keycaps, keychains, and hippers. Order through Facebook.',
    images: ['/CoverPhoto.jpg'],
  },
}

export default function CraftsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
