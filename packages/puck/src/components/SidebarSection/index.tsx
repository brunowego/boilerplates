import type { ReactNode } from 'react'

import { ChevronRight, Loader2 } from '@acme/ui/components/icon'

import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'
import { Heading } from '../Heading'
import { useBreadcrumbs } from '../../lib/use-breadcrumbs'
import { useAppContext } from '../Puck/context'

const getClassName = getClassNameFactory('SidebarSection', styles)

export const SidebarSection = ({
  children,
  title,
  background,
  showBreadcrumbs,
  noBorderTop,
  noPadding,
  isLoading,
}: {
  children: ReactNode
  title: ReactNode
  background?: string
  showBreadcrumbs?: boolean
  noBorderTop?: boolean
  noPadding?: boolean
  isLoading?: boolean | null
}) => {
  const { setUi } = useAppContext()
  const breadcrumbs = useBreadcrumbs(1)

  return (
    <div
      className={getClassName({ noBorderTop, noPadding })}
      style={{ background }}
    >
      <div className={getClassName('title')}>
        <div className={getClassName('breadcrumbs')}>
          {showBreadcrumbs
            ? breadcrumbs.map((breadcrumb, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
                <div key={index} className={getClassName('breadcrumb')}>
                  <button
                    className={getClassName('breadcrumbLabel')}
                    onClick={() => setUi({ itemSelector: breadcrumb.selector })}
                    type='button'
                  >
                    {breadcrumb.label}
                  </button>

                  <ChevronRight className='size-4' />
                </div>
              ))
            : null}

          <div className={getClassName('heading')}>
            <Heading rank={2} size='xs'>
              {title}
            </Heading>
          </div>
        </div>
      </div>

      <div className={getClassName('content')}>{children}</div>

      {isLoading && <Loader2 className='size-4 animate-spin' />}
    </div>
  )
}
