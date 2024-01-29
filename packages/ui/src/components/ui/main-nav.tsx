import { useTranslation } from 'next-i18next'

import { cn } from '../../lib/utils'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { t } = useTranslation('translation')

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <a
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        {t('nav.overview')}
      </a>
      <a
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t('nav.customers')}
      </a>
      <a
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t('nav.analytics')}
      </a>
      <a
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {t('nav.settings')}
      </a>
    </nav>
  )
}
