import type { HTMLAttributes } from 'react'
import { Command, Loader2, Sun, Moon } from 'lucide-react'

import { cn } from '../../lib/utils'

type IconProps = HTMLAttributes<SVGElement>

export const Icon = {
  command: (props: IconProps) => <Command {...props} />,
  loader2: ({ className, ...props }: IconProps) => (
    <Loader2 className={cn('animate-spin', className)} {...props} />
  ),
  moon: (props: IconProps) => <Moon {...props} />,
  sun: (props: IconProps) => <Sun {...props} />,
}
