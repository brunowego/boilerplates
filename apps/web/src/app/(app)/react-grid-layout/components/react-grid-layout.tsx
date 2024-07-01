'use client'

import { type JSX, useState } from 'react'
import GridLayout, { type Layout } from 'react-grid-layout'

import cn from '@acme/ui/utils/cn'

export default function ReactGridLayout(): JSX.Element {
  const [layout, setLayout] = useState([
    {
      i: 'a',
      x: 0,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      i: 'b',
      x: 1,
      y: 2,
      w: 2,
      h: 1,
    },
    {
      i: 'c',
      x: 2,
      y: 1,
      w: 1,
      h: 2,
    },
    {
      i: 'd',
      x: 3,
      y: 0,
      w: 1,
      h: 1,
    },
    {
      i: 'e',
      x: 4,
      y: 0,
      w: 1,
      h: 1,
    },
  ])

  const [draggingItem, setDraggingItem] = useState<string | null>(null)

  const handleDrag = (
    _layout: Layout[],
    // oldItem: Layout,
    newItem: Layout,
    // placeholder: Layout,
    // event: MouseEvent | TouchEvent,
    // element: HTMLElement,
  ) => {
    setLayout((prevLayout) => {
      const updatedLayout = prevLayout.map((item) => {
        if (item.i === newItem.i) {
          return {
            ...item,
            x: newItem.x,
            y: newItem.y,
          }
        }

        return item
      })

      // console.log(updatedLayout)

      return updatedLayout
    })
  }

  const handleDragStart = (key: string) => {
    setDraggingItem(key)
  }

  const handleDragStop = () => {
    setDraggingItem(null)
  }

  // const handleDragStart = () => {}

  // const handleDragStop = () => {}

  return (
    <div className='relative'>
      <GridLayout
        className='mx-auto *:cursor-grab *:rounded-sm *:border'
        cols={5}
        // compactType='horizontal'
        layout={layout}
        onDrag={handleDrag}
        onDragStart={(_layout, _oldItem, newItem) => handleDragStart(newItem.i)}
        onDragStop={() => handleDragStop()}
        margin={[8, 8]}
        maxRows={2}
        rowHeight={148}
        useCSSTransforms={false}
        verticalCompact={true}
        width={1080}
      >
        {layout?.map((item) => (
          <div
            className={cn(
              'z-10',
              draggingItem === item.i ? 'bg-background' : '',
            )}
            key={item.i}
          >
            {item.i}
          </div>
        ))}
      </GridLayout>
    </div>
  )
}
