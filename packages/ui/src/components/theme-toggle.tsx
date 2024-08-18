'use client'

import type { JSX } from 'react'

import useTheme from '../hooks/use-theme'
import Button from './button'
import { Sun, Moon } from './icon'

type ThemeToggleProps = {
  className?: string
}

export default function ThemeToggle({
  className,
}: ThemeToggleProps): JSX.Element {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      className={className}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size='icon'
      variant='ghost'
    >
      <Sun className='size-5 dark:hidden' />
      <Moon className='hidden size-5 dark:block' />

      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
