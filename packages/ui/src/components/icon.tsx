import type { HTMLAttributes } from 'react'
import {
  CheckCircle,
  ChevronRight,
  Globe,
  Loader2,
  Moon,
  Sun,
  X,
} from 'lucide-react'

type IconProps = HTMLAttributes<SVGElement>

export default {
  checkCircle: (props: IconProps) => <CheckCircle {...props} />,
  chevronRight: (props: IconProps) => <ChevronRight {...props} />,
  globe: (props: IconProps) => <Globe {...props} />,
  loader2: (props: IconProps) => <Loader2 {...props} />,
  moon: (props: IconProps) => <Moon {...props} />,
  sun: (props: IconProps) => <Sun {...props} />,
  x: (props: IconProps) => <X {...props} />,
}
