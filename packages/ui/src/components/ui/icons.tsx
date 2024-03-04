import type { HTMLAttributes } from 'react'
import { Moon, Sun } from 'lucide-react'

type IconProps = HTMLAttributes<SVGElement>

export const Icons = {
  moon: (props: IconProps) => <Moon {...props} />,
  sun: (props: IconProps) => <Sun {...props} />,
}
