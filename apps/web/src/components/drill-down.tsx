'use client'

import { type JSX, useState, useEffect } from 'react'

import { ChevronLeft, ChevronRight } from '@acme/ui/components/icon'

export type Row = {
  name: string
  children: Row[]
}

type DrillDownProps = {
  rows: Row[]
}

export default function DrillDown({ rows }: DrillDownProps): JSX.Element {
  const [position, setPosition] = useState<number[]>([])
  const [parentName, setParentName] = useState<string>('')
  const [currentData, setCurrentData] = useState<Row[]>([])

  useEffect(() => {
    let data = rows
    let name = ''

    // biome-ignore lint/complexity/noForEach: <explanation>
    position.forEach((pos) => {
      if (data[pos]) {
        name = data[pos]?.name
        data = data[pos]?.children
      }
    })

    setParentName(name)
    setCurrentData(data)
  }, [position, rows])

  const handleForwardClicked = (position: number) => {
    setPosition((prev) => {
      prev.push(position)

      return [...prev]
    })
  }

  const handleBackwardClicked = () => {
    setPosition((prev) => {
      prev.pop()

      return [...prev]
    })
  }

  return (
    <div className='flex max-w-xs flex-col space-y-1 text-sm'>
      {position.length > 0 ? (
        <button
          className='flex items-center space-x-2 rounded-sm px-3 text-start leading-10'
          onClick={() => handleBackwardClicked()}
          type='button'
        >
          <ChevronLeft className='size-4 text-muted-foreground' />

          <span>{parentName}</span>
        </button>
      ) : null}

      {currentData.map(({ name, children }, index) => {
        return (
          <button
            className='flex items-center justify-between rounded-sm bg-secondary px-3 text-start leading-10'
            // biome-ignore lint/suspicious/noArrayIndexKey: This is a simple list of items
            key={index}
            onClick={() => handleForwardClicked(index)}
            type='button'
          >
            <span>{name}</span>

            {children.length > 0 ? (
              <ChevronRight className='size-4 text-muted-foreground' />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
