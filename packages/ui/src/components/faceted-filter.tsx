import type { JSX } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import type { Column } from '@tanstack/react-table'

import cn from '../lib/cn'
import Badge from './badge'
import Button from './button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import Separator from './separator'
import { CirclePlus } from './icon'

interface FacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export default function FacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: FacetedFilterProps<TData, TValue>): JSX.Element {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='border-dashed' variant='outline'>
          <CirclePlus className='mr-2 size-4' />

          {title}

          {selectedValues?.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />

              <Badge
                className='rounded-sm px-1 font-normal lg:hidden'
                variant='secondary'
              >
                {selectedValues.size}
              </Badge>

              <div className='hidden space-x-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge
                    className='rounded-sm px-1 font-normal'
                    variant='secondary'
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        className='rounded-sm px-1 font-normal'
                        key={option.value}
                        variant='secondary'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value)
                      } else {
                        selectedValues.add(option.value)
                      }

                      const filterValues = Array.from(selectedValues)

                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      )
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex size-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('size-4')} />
                    </div>

                    {option.icon && (
                      <option.icon className='mr-2 size-4 text-muted-foreground' />
                    )}

                    <span>{option.label}</span>

                    {facets?.get(option.value) && (
                      <span className='ml-auto flex size-4 items-center justify-center font-mono text-xs'>
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>

            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />

                <CommandGroup>
                  <CommandItem
                    className='justify-center text-center'
                    onSelect={() => column?.setFilterValue(undefined)}
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
