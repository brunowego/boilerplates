'use client'

import { type JSX, useState } from 'react'

import Popover from './popover'
import cn from '../utils/cn'
import Input from './input'

const tailwindColors = {
  monoNames: ['black', 'white'],
  colorNames: [
    'slate',
    'zinc',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ],
  colorVariants: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
}

interface ColorPickerProps {
  className?: string
  value?: string
  // onChange?: (html: string) => void
  setStateValue: (value: string) => void
}

export default function ColorPicker({
  className,
  value = 'white',
  setStateValue,
}: ColorPickerProps): JSX.Element {
  const [color, setColor] = useState<string>(value)

  const handleColorClick = (event: any) => {
    setColor(event?.target?.value)
    setStateValue(event?.target?.value)
  }

  return (
    <Popover>
      <Popover.Trigger asChild>
        <div className='relative'>
          <div
            className={cn(
              'absolute inset-2 size-6 cursor-pointer rounded-sm',
              value ? `bg-${value}` : null,
            )}
          />

          <Input
            className={cn('pl-10', className)}
            defaultValue={value}
            value={value}
          />
        </div>
      </Popover.Trigger>

      <Popover.Content align='start' className='flex w-auto flex-col gap-1'>
        <div className='flex gap-1'>
          <button
            className='size-6 bg-white'
            onClick={handleColorClick}
            type='button'
            value='white'
          />

          <button
            className='size-6 bg-black'
            onClick={handleColorClick}
            type='button'
            value='black'
          />
        </div>

        {tailwindColors.colorNames.map((colorName) => (
          <div className='flex gap-1' key={colorName}>
            {tailwindColors.colorVariants.map((variant) => (
              <button
                className={cn('size-6 shrink-0', `bg-${colorName}-${variant}`)}
                key={colorName + variant}
                onClick={handleColorClick}
                type='button'
                value={`${colorName}-${variant}`}
              />
            ))}
          </div>
        ))}
      </Popover.Content>
    </Popover>
  )
}
