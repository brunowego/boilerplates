'use client'

import { useTheme } from 'next-themes'

import { Button, Icons } from '@acme/ui'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size='icon'
      variant='ghost'
    >
      <Icons.sun className='dark:hidden h-[1.5rem] w-[1.3rem]' />
      <Icons.moon className='hidden w-5 h-5 dark:block' />

      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
