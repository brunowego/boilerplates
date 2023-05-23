import { authOptions } from '@/lib/auth-options'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { setCookies } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'
import { Session, getServerSession } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { useState } from 'react'

export default function App(
  props: AppProps & { colorScheme: ColorScheme; session: Session | null }
) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)

    setCookies('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <SessionProvider session={props.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(req, res, authOptions),
    },
  }
}
