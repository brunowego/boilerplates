import type { JSX } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

import { inputVariants } from '@acme/ui/components/input'
import Icon from '@acme/ui/components/icon'
import cn from '@acme/ui/lib/cn'

// import useUsers from '@/hooks/api/use-users'

import useRouterStuff from '@/hooks/use-router-stuff'

type SearchProps = {
  // biome-ignore lint/suspicious/noExplicitAny: any is used here because the type of searchInputRef is not known
  searchInputRef: any
  placeholder?: string
  className?: string
}

export default function Search({
  searchInputRef,
  placeholder,
  className,
}: SearchProps): JSX.Element {
  const { queryParams } = useRouterStuff()
  const searchParams = useSearchParams()
  // const { isValidating } = useUsers()

  const debounced = useDebouncedCallback((value) => {
    queryParams({
      set: {
        search: value,
      },
    })
  }, 500)

  return (
    <div className={cn('relative w-full shrink-0', className)}>
      <div className='pointer-events-none absolute inset-y-0 left-3 flex'>
        <Icon.search className='size-4 self-center text-muted-foreground' />
      </div>

      <input
        className={inputVariants({ className: 'pl-10' })}
        defaultValue={searchParams?.get('search') || ''}
        onChange={(e) => {
          debounced(e.target.value)
        }}
        placeholder={placeholder}
        ref={searchInputRef}
        type='text'
      />
    </div>
  )
}
