import type { JSX, ElementType } from 'react'

import Icon from './icon'

type DynamicIconProps = {
  icon: keyof typeof Icon
  className?: string
}

export default function DynamicIcon({
  icon,
  className,
}: DynamicIconProps): JSX.Element | null {
  const Ikon = Icon[icon] as ElementType

  return <Ikon className={className} />
}
