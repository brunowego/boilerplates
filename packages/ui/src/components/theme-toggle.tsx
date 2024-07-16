'use client'

import useTheme from '@acme/ui/hooks/use-theme'
import Button from '@acme/ui/components/button'
import Icon from '@acme/ui/components/icon'

type ThemeToggleProps = {
  className?: string
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      className={className}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size='icon'
      variant='ghost'
    >
      <Icon.sun className='size-5 dark:hidden' />
      <Icon.moon className='hidden size-5 dark:block' />

      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
