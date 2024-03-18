import type { HTMLAttributes } from 'react'
import { Command, Loader2, Moon, Sun } from 'lucide-react'

type IconProps = HTMLAttributes<SVGElement>

export const Icon = {
  command: (props: IconProps) => <Command {...props} />,
  loader2: (props: IconProps) => <Loader2 {...props} />,
  moon: (props: IconProps) => <Moon {...props} />,
  sun: (props: IconProps) => <Sun {...props} />,
}
