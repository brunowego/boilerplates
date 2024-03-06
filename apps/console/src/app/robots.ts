import type { MetadataRoute } from 'next'

type Rules = MetadataRoute.Robots['rules']

const rules: Rules = {
  userAgent: '*',
  allow: '/',
  disallow: ['/api/', '/static/'],
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules,
    sitemap: new URL('/sitemap.xml', process.env.NEXT_PUBLIC_BASE_URL).href,
  }
}
