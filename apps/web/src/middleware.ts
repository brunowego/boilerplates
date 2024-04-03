import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const hostname = req.headers
    .get('host')
    ?.replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)

  const url = req.nextUrl
  const searchParams = req.nextUrl.searchParams.toString()

  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  if (hostname === `api.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(new URL(`/api${path}`, req.url))
  }

  if (hostname === `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/admin${path === '/' ? '' : path}`, req.url),
    )
  }

  if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/app${path === '/' ? '' : path}`, req.url),
    )
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}
