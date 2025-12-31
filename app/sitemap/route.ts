import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://triffyarts.vercel.app',
      lastModified: new Date('2025-12-30'),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://triffyarts.vercel.app/about',
      lastModified: new Date('2025-12-30'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://triffyarts.vercel.app/projects',
      lastModified: new Date('2025-12-30'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://triffyarts.vercel.app/arts',
      lastModified: new Date('2025-12-30'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://triffyarts.vercel.app/contact',
      lastModified: new Date('2025-12-30'),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
  ]
}
