import type { HTMLAttributes } from 'react'
import { Languages } from 'lucide-react'

type IconProps = HTMLAttributes<SVGElement>

export const Icons = {
  languages: (props: IconProps) => <Languages {...props} />,
}
