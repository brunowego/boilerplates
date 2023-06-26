import LanguageProvider from '@/providers/LanguageProvider'
import { ColorScheme, ColorSchemeProvider, Container, MantineProvider } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'
import type { AppProps } from 'next/app'
import nextConfig from 'next/config'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import { SettingContext } from '../hooks/setting.hook'
import usePreferences from '../hooks/usePreferences'
import { UserContext } from '../hooks/user.hook'
import authService from '../services/auth.service'
import settingService from '../services/setting.service'
import userService from '../services/user.service'
import GlobalStyle from '../styles/global.style'
import globalStyle from '../styles/mantine.style'
import Setting from '../types/setting.type'
import { CurrentUser } from '../types/user.type'

const excludeDefaultLayoutRoutes = ['/admin/setting/[category]']

function App({ Component, pageProps }: AppProps) {
  const systemTheme = useColorScheme(pageProps.colorScheme)
  const router = useRouter()

  const [colorScheme, setColorScheme] = useState<ColorScheme>(systemTheme)
  const preferences = usePreferences()

  const [user, setUser] = useState<CurrentUser | null>(pageProps.user)
  const [route, setRoute] = useState<string>(pageProps.route)

  const [settingVariables, setSettingVariables] = useState<Setting[]>(pageProps.settingVariables)

  useEffect(() => {
    setRoute(router.pathname)
  }, [router.pathname])

  useEffect(() => {
    setInterval(async () => await authService.refreshAccessToken(), 30 * 1000)
  }, [])

  useEffect(() => {
    const colorScheme =
      preferences.get('colorScheme') == 'system' ? systemTheme : preferences.get('colorScheme')

    toggleColorScheme(colorScheme)
  }, [systemTheme])

  const toggleColorScheme = (value: ColorScheme) => {
    setColorScheme(value ?? 'light')

    setCookie('mantine-color-scheme', value ?? 'light', {
      sameSite: 'lax',
    })
  }

  return (
    <LanguageProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme, ...globalStyle }}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <GlobalStyle />

          <Notifications />

          <ModalsProvider>
            <SettingContext.Provider
              value={{
                settingVariables,
                refresh: async () => {
                  setSettingVariables(await settingService.list())
                },
              }}
            >
              <UserContext.Provider
                value={{
                  user,
                  refreshUser: async () => {
                    const user = await userService.getCurrentUser()

                    setUser(user)

                    return user
                  },
                }}
              >
                {excludeDefaultLayoutRoutes.includes(route) ? (
                  <Component {...pageProps} />
                ) : (
                  <>
                    <Header />

                    <Container>
                      <Component {...pageProps} />
                    </Container>
                  </>
                )}
              </UserContext.Provider>
            </SettingContext.Provider>
          </ModalsProvider>
        </ColorSchemeProvider>
      </MantineProvider>
    </LanguageProvider>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => {
  const { apiURL } = nextConfig().serverRuntimeConfig

  let pageProps: {
    user?: CurrentUser
    settingVariables?: Setting[]
    route?: string
    colorScheme: ColorScheme
  } = {
    route: ctx.resolvedUrl,
    colorScheme: (getCookie('mantine-color-scheme', ctx) as ColorScheme) ?? 'light',
  }

  if (ctx.req) {
    const cookieHeader = ctx.req.headers.cookie

    pageProps.user = await axios(`${apiURL}/api/users/me`, {
      headers: { cookie: cookieHeader },
    })
      .then((res) => res.data)
      .catch(() => null)

    pageProps.settingVariables = (await axios(`${apiURL}/api/settings`)).data

    pageProps.route = ctx.req.url
  }

  return { pageProps }
}

export default App
