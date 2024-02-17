import type { HTMLAttributes } from 'react'
import { Sun, Moon } from 'lucide-react'

type IconProps = HTMLAttributes<SVGElement>

export const Icons = {
  sun: (props: IconProps) => <Sun {...props} />,
  moon: (props: IconProps) => <Moon {...props} />,
}
