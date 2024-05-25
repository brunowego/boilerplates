'use client'

import { type JSX, useState, useEffect } from 'react'

import { ChevronLeft } from '@acme/ui/components/icon'

import type { Category } from '@/types'
import { categories } from '@/data'

export default function SectionTemplates(): JSX.Element {
  const [position, setPosition] = useState<number[]>([])
  const [parentTitle, setParentTitle] = useState<string>('')
  const [currentData, setCurrentData] = useState<Category[]>(categories)
  const [children, setChildren] = useState<Category['children']>([])

  useEffect(() => {
    if (position.length > 0) {
      const data = categories[position[position.length - 1] || 0]

      setParentTitle(data?.title ?? '')
      setChildren(data?.children ?? [])
      setCurrentData([])
    } else {
      setParentTitle('')
      setChildren([])
      setCurrentData(categories)
    }
  }, [position])

  const handleBackwardClicked = () => {
    setPosition((prev) => {
      prev.pop()

      return [...prev]
    })
  }

  const handleForwardClicked = (position: number) => {
    setPosition((prev) => {
      prev.push(position)

      return [...prev]
    })
  }

  return (
    <>
      <div className='p-4'>
        <h2 className='font-medium leading-8'>Section templates</h2>
      </div>

      <div className='p-4'>
        <nav className='-mt-2 mb-2 flex flex-col space-y-1'>
          {position.length > 0 ? (
            <button
              className='-mx-3 flex items-center space-x-3 rounded-sm px-3 text-start leading-10'
              onClick={() => handleBackwardClicked()}
              type='button'
            >
              <ChevronLeft className='size-4 text-muted-foreground' />

              <span>{parentTitle}</span>
            </button>
          ) : null}

          {currentData.map(({ title }, index) => (
            <button
              className='-mx-3 flex items-center justify-between rounded-sm px-3 text-start leading-10 hover:bg-secondary'
              // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
              key={index}
              onClick={() => handleForwardClicked(index)}
              type='button'
            >
              {title}
            </button>
          ))}
        </nav>

        <div className='space-y-2'>
          {children.map(({ title, href }, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a static list
            <img alt={title} key={index} src={href} />
          ))}

          {/* <div className='space-y-4 text-muted-foreground text-sm'>
            <p>You don't have any saved sections yet.</p>

            <p>
              Save your section to reuse it on other pages.{' '}
              <a
                className='text-foreground underline underline-offset-4'
                href='/'
              >
                Learn how to save
              </a>{' '}
              your section.
            </p>
          </div> */}
        </div>
      </div>
    </>
  )
}
