import type { ReactNode } from 'react'

interface MenuIconProps {
  icon: ReactNode
  text: string
}

export default function MenuIcon({ icon, text }: MenuIconProps) {
  return (
    <div className='flex items-center justify-start space-x-2 truncate'>
      {icon}

      <p className='truncate text-sm'>{text}</p>
    </div>
  )
}
