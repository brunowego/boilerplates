'use client'

import { useState, type ElementType } from 'react'

import cn from '../utils/cn'
import toast from '../lib/toast'
import Icon, { Check } from './icon'

type CopyButtonProps = {
  icon?: keyof typeof Icon
  className?: string
  value: string
}

export default function CopyButton({
  icon = 'Copy',
  className,
  value,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const Ikon = Icon[icon] as ElementType

  return (
    <button
      className={cn('group', className)}
      onClick={(e) => {
        e.stopPropagation()

        setCopied(true)

        navigator.clipboard.writeText(value).then(() => {
          toast.success('Copied to clipboard!')
        })

        setTimeout(() => setCopied(false), 3000)
      }}
      type='button'
    >
      {copied ? <Check /> : <Ikon />}

      <span className='sr-only'>Copy</span>
    </button>
  )
}
