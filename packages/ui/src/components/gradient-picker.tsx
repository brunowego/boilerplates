'use client'

import { type JSX, useMemo } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from './popover'
import Button from './button'
import cn from '../utils/cn'
import { Paintbrush } from './icon'
import Input from './input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

type GradientPickerProps = {
  className?: string
  background: string
  setBackground: (background: string) => void
}

export default function GradientPicker({
  className,
  background,
  setBackground,
}: GradientPickerProps): JSX.Element {
  const solids = [
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
  ]

  const gradients = [
    'linear-gradient(to top left, #accbee, #e7f0fd)',
    'linear-gradient(to top left, #d5d4d0, #d5d4d0, #eeeeec)',
    'linear-gradient(to top left, #000000, #434343)',
    'linear-gradient(to top left, #09203f, #537895)',
    'linear-gradient(to top left, #AC32E4, #7918F2, #4801FF)',
    'linear-gradient(to top left, #f953c6, #b91d73)',
    'linear-gradient(to top left, #ee0979, #ff6a00)',
    'linear-gradient(to top left, #F00000, #DC281E)',
    'linear-gradient(to top left, #00c6ff, #0072ff)',
    'linear-gradient(to top left, #4facfe, #00f2fe)',
    'linear-gradient(to top left, #0ba360, #3cba92)',
    'linear-gradient(to top left, #FDFC47, #24FE41)',
    'linear-gradient(to top left, #8a2be2, #0000cd, #228b22, #ccff00)',
    'linear-gradient(to top left, #40E0D0, #FF8C00, #FF0080)',
    'linear-gradient(to top left, #fcc5e4, #fda34b, #ff7882, #c8699e, #7046aa, #0c1db8, #020f75)',
    'linear-gradient(to top left, #ff75c3, #ffa647, #ffe83f, #9fff5b, #70e2ff, #cd93ff)',
  ]

  // const images = [
  //   'url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
  //   'url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90',
  //   'url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
  //   'url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)',
  // ]

  const defaultTab = useMemo(() => {
    // if (background.includes('url')) {
    //   return 'image'
    // }

    if (background.includes('gradient')) {
      return 'gradient'
    }

    return 'solid'
  }, [background])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'text-left font-normal',
            !background && 'text-muted-foreground',
            className,
          )}
          variant='outline'
        >
          <div className='flex w-full items-center gap-2'>
            {background ? (
              <div
                className='!bg-center !bg-cover size-4 rounded transition-all'
                style={{ background }}
              />
            ) : (
              <Paintbrush className='size-4' />
            )}

            <div className='flex-1 truncate'>
              {background ? background : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-64'>
        <Tabs defaultValue={defaultTab} className='w-full'>
          <TabsList className='mb-4 w-full'>
            <TabsTrigger className='flex-1' value='solid'>
              Solid
            </TabsTrigger>

            <TabsTrigger className='flex-1' value='gradient'>
              Gradient
            </TabsTrigger>

            {/* <TabsTrigger className='flex-1' value='image'>
              Image
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value='solid' className='mt-0 flex flex-wrap gap-1'>
            {solids.map((s) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <div
                className='size-6 cursor-pointer rounded-md active:scale-105'
                key={s}
                onClick={() => setBackground(s)}
                style={{ background: s }}
              />
            ))}
          </TabsContent>

          <TabsContent value='gradient' className='mt-0'>
            <div className='mb-2 flex flex-wrap gap-1'>
              {gradients.map((s) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <div
                  className='size-6 cursor-pointer rounded-md active:scale-105'
                  key={s}
                  onClick={() => setBackground(s)}
                  style={{ background: s }}
                />
              ))}
            </div>
          </TabsContent>

          {/* <TabsContent value='image' className='mt-0'>
            <div className='mb-2 grid grid-cols-2 gap-1'>
              {images.map((s) => (
                // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                <div
                  className='h-12 w-full cursor-pointer rounded-md bg-center bg-cover active:scale-105'
                  key={s}
                  onClick={() => setBackground(s)}
                  style={{ backgroundImage: s }}
                />
              ))}
            </div>
          </TabsContent> */}
        </Tabs>

        <Input
          className='col-span-2 mt-4 h-8'
          id='custom'
          onChange={(e) => setBackground(e.currentTarget.value)}
          value={background}
        />
      </PopoverContent>
    </Popover>
  )
}
