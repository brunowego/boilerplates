import type { MetadataRoute } from 'next'

type Page = MetadataRoute.Sitemap[number]

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/customers', '/products', '/settings'].map(
    (route): Page => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }),
  )

  return [...routes]
}
