import type { HTMLAttributes } from 'react'
import { Loader2, Moon, Sun } from 'lucide-react'

type IconProps = HTMLAttributes<SVGElement>

export default {
  loader2: (props: IconProps) => <Loader2 {...props} />,
  moon: (props: IconProps) => <Moon {...props} />,
  sun: (props: IconProps) => <Sun {...props} />,
}
