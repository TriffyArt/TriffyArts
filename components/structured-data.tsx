'use client'

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Psalm Salcedo',
    url: 'https://triffyarts.vercel.app',
    image: 'https://triffyarts.vercel.app/CoverPhoto.jpg',
    description: 'Digital artist and creative designer from Legazpi, Albay',
    jobTitle: ['Digital Artist', 'Web Designer', 'UI/UX Designer'],
    location: {
      '@type': 'Place',
      name: 'Legazpi, Albay, Philippines',
    },
    sameAs: [
      'https://twitter.com/psalmsalcedo',
      'https://instagram.com/psalmsalcedo',
      'https://github.com/psalmsalcedo',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
