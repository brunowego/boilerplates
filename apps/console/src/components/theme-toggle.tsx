'use client'

import { useTheme } from 'next-themes'

import Button from '@acme/ui/components/button'
import { Sun, Moon } from '@acme/ui/components/icon'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size='icon'
      variant='ghost'
    >
      <Sun className='h-[1.5rem] w-[1.3rem] dark:hidden' />
      <Moon className='hidden h-5 w-5 dark:block' />

      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
