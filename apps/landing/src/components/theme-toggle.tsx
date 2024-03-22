'use client'

import { useTheme } from 'next-themes'

import { Button, Icon } from '@acme/ui'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size='icon'
      variant='ghost'
    >
      <Icon.sun className='dark:hidden h-[1.5rem] w-[1.3rem]' />
      <Icon.moon className='hidden w-5 h-5 dark:block' />

      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
