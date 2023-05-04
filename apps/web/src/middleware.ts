import jwtDecode from 'jwt-decode'
import { NextRequest, NextResponse } from 'next/server'
import settingService from './services/setting.service'

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}

export async function middleware(request: NextRequest) {
  const routes = {
    unauthenticated: new Routes(['/auth/*', '/']),
    public: new Routes(['/share/*', '/upload/*']),
    admin: new Routes(['/admin/*']),
    account: new Routes(['/account*']),
    disabled: new Routes([]),
  }

  const settings = await (await fetch(`${request.nextUrl.origin}/api/settings`)).json()

  const getSetting = (key: string) => {
    return settingService.get(key, settings)
  }

  const route = request.nextUrl.pathname

  let user: { isAdmin: boolean } | null = null

  const accessToken = request.cookies.get('access_token')?.value

  try {
    const claims = jwtDecode<{ exp: number; isAdmin: boolean }>(accessToken as string)

    if (claims.exp * 1000 > Date.now()) {
      user = claims
    }
  } catch {
    user = null
  }

  if (!getSetting('share.allowRegistration')) {
    routes.disabled.routes.push('/auth/signup')
  }

  if (getSetting('share.allowUnauthenticatedShares')) {
    routes.public.routes = ['*']
  }

  if (!getSetting('smtp.enabled')) {
    routes.disabled.routes.push('/auth/reset-password*')
  }

  // prettier-ignore
  const rules = [
    {
      condition: routes.disabled.contains(route),
      path: "/",
    },
     {
      condition: user && routes.unauthenticated.contains(route) && !getSetting("share.allowUnauthenticatedShares"),
      path: "/upload",
    },
    {
      condition: !user && !routes.public.contains(route) && !routes.unauthenticated.contains(route),
      path: "/auth/signin",
    },
    {
      condition: !user && routes.account.contains(route),
      path: "/upload",
    },
    {
      condition: routes.admin.contains(route) && !user?.isAdmin,
      path: "/upload",
    },
    {
      condition: (!getSetting("general.showHomePage") || user) && route == "/",
      path: "/upload",
    },
  ];

  for (const rule of rules) {
    if (rule.condition) {
      let { path } = rule

      if (path == '/auth/signin') {
        path = path + '?redirect=' + encodeURIComponent(route)
      }

      return NextResponse.redirect(new URL(path, request.url))
    }
  }
}

class Routes {
  // eslint-disable-next-line no-unused-vars
  constructor(public routes: string[]) {}

  contains(_route: string) {
    for (const route of this.routes) {
      if (new RegExp('^' + route.replace(/\*/g, '.*') + '$').test(_route)) return true
    }

    return false
  }
}
