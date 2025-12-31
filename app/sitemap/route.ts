import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://triffyarts.vercel.app',
      lastModified: new Date('2025-12-30T13:25:34.669Z'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://triffyarts.vercel.app/about',
      lastModified: new Date('2025-12-30T13:25:34.669Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://triffyarts.vercel.app/projects',
      lastModified: new Date('2025-12-30T13:25:34.669Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://triffyarts.vercel.app/arts',
      lastModified: new Date('2025-12-30T13:25:34.669Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://triffyarts.vercel.app/contact',
      lastModified: new Date('2025-12-30T13:25:34.669Z'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]
}
