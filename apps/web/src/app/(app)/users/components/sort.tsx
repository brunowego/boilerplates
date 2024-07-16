import { type JSX, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

import Popover from '@acme/ui/components/popover'
import Icon from '@acme/ui/components/icon'
import MenuIcon from '@acme/ui/components/menu-icon'
import cn from '@acme/ui/utils/cn'

import useRouterStuff from '@/hooks/use-router-stuff'

const sortByOptions = [
  {
    display: 'Date added',
    slug: 'createdAt',
  },
  {
    display: 'First name',
    slug: 'firstName',
  },
  {
    display: 'Last name',
    slug: 'lastName',
  },
]

export default function Sort(): JSX.Element {
  const searchParams = useSearchParams()
  const sortBy = searchParams?.get('sortBy')
  const { queryParams } = useRouterStuff()
  const [openPopover, setOpenPopover] = useState(false)

  const selectedSort = useMemo(() => {
    return sortByOptions.find((s) => s.slug === sortBy) || sortByOptions[0]
  }, [sortBy])

  return (
    <Popover
      content={
        <div className='w-full p-2 md:w-48'>
          {sortByOptions.map(({ display, slug }) => (
            <button
              className='flex w-full items-center justify-between space-x-2 rounded-md px-1 py-2 hover:bg-zinc-100 active:bg-zinc-200 dark:active:bg-zinc-600 dark:hover:bg-zinc-700'
              key={slug}
              onClick={() => {
                queryParams({
                  set: {
                    sortBy: slug,
                  },
                })
                setOpenPopover(false)
              }}
              type='button'
            >
              <MenuIcon
                text={display}
                icon={<Icon.sortDesc className='size-4' />}
              />

              {selectedSort?.slug === slug && (
                <Icon.tick className='size-4' aria-hidden='true' />
              )}
            </button>
          ))}
        </div>
      }
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <button
        className='flex w-48 items-center justify-between space-x-2 rounded-md bg-secondary px-3 py-2.5 shadow-sm transition-all duration-75 hover:shadow-md'
        onClick={() => setOpenPopover(!openPopover)}
        type='button'
      >
        <MenuIcon
          text={sortBy && selectedSort ? selectedSort.display : 'Sort by'}
          icon={
            sortBy ? (
              <Icon.sortDesc className='size-4' />
            ) : (
              <Icon.sort className='size-4 shrink-0' />
            )
          }
        />

        <Icon.chevronDown
          className={cn(
            'size-5 text-gray-400 transition-all duration-75',
            openPopover ? 'rotate-180 transform' : null,
          )}
        />
      </button>
    </Popover>
  )
}
