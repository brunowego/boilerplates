import type { JSX, ElementType } from 'react'

import Icon from '@acme/ui/components/icon'

type DynamicIconProps = {
  icon: keyof typeof Icon
  className?: string
}

export default function DynamicIcon({
  icon,
  className,
}: DynamicIconProps): JSX.Element {
  const Ikon = Icon[icon] as ElementType

  console.log('Ikon', icon)
  console.log('Ikon', Ikon)

  return <Ikon className={className} />
}
