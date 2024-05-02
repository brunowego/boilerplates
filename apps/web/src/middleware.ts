import { type NextRequest, NextResponse } from 'next/server'

import { hasSubdomain } from './utils/domain'

export const parse = (req: NextRequest) => {
  let domain = req.headers.get('host') as string
  domain = domain.replace('www.', '')

  if (domain.endsWith('.vercel.app')) {
    domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN as string
  }

  const path = req.nextUrl.pathname

  const searchParams = req.nextUrl.searchParams.toString()
  const fullPath = `${path}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  return { domain, path, fullPath }
}

export default async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)
  // requestHeaders.set('Access-Control-Allow-Credentials', 'true')
  requestHeaders.set('Access-Control-Allow-Origin', '*')
  // requestHeaders.set(
  //   'Access-Control-Allow-Methods',
  //   'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  // )
  requestHeaders.set(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, Next-Router-Prefetch, Next-Router-State-Tree, Next-Url, RSC',
  )

  // if ('OPTIONS' === req.method) {
  //   return new Response(null, {
  //     status: 200,
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers':
  //         'Next-Router-Prefetch, Next-Router-State-Tree, Next-Url, RSC',
  //     },
  //   })
  // }

  const { domain, path } = parse(req)

  if (hasSubdomain('api', domain)) {
    return NextResponse.rewrite(new URL(`/api${path}`, req.url), {
      headers: requestHeaders,
    })
  }

  if (hasSubdomain('auth', domain)) {
    return NextResponse.rewrite(
      new URL(`/auth${path === '/' ? '' : path}`, req.url),
      {
        headers: requestHeaders,
      },
    )
  }

  if (hasSubdomain('app', domain)) {
    return NextResponse.rewrite(
      new URL(`/app${path === '/' ? '' : path}`, req.url),
      {
        headers: requestHeaders,
      },
    )
  }

  if (hasSubdomain('admin', domain)) {
    return NextResponse.rewrite(
      new URL(`/admin${path === '/' ? '' : path}`, req.url),
      {
        headers: requestHeaders,
      },
    )
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
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
