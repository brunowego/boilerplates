import type { AppProps } from 'next/app'
import { useColorScheme } from '@mantine/hooks'
import { useState, useEffect } from 'react'
import { ColorScheme, MantineProvider, ColorSchemeProvider, Container } from '@mantine/core'
import { setCookie } from 'cookies-next'
import mantineStyle from '../styles/mantine.style'
import GlobalStyle from '../styles/global.style'
import Header from '../components/Header'

export default function App({ Component, pageProps }: AppProps) {
  const systemTheme = useColorScheme(pageProps.colorScheme)
  const [colorScheme, setColorScheme] = useState<ColorScheme>(systemTheme)

  useEffect(() => {
    toggleColorScheme(systemTheme)
  }, [systemTheme])

  const toggleColorScheme = (value: ColorScheme) => {
    setColorScheme(value ?? 'light')

    setCookie('mantine-color-scheme', value ?? 'light', {
      sameSite: 'lax',
    })
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme, ...mantineStyle }}>
      <ColorSchemeProvider colorScheme={systemTheme} toggleColorScheme={toggleColorScheme}>
        <GlobalStyle />

        <Header />

        <Container>
          <Component {...pageProps} />
        </Container>
      </ColorSchemeProvider>
    </MantineProvider>
  )
}
