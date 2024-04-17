import type { HTMLAttributes } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Moon,
  Search,
  SortDesc,
  Sun,
} from 'lucide-react'

type IconProps = HTMLAttributes<SVGElement>

export default {
  // Lucide icons
  chevronDown: (props: IconProps) => <ChevronDown {...props} />,
  chevronLeft: (props: IconProps) => <ChevronLeft {...props} />,
  chevronRight: (props: IconProps) => <ChevronRight {...props} />,
  moon: (props: IconProps) => <Moon {...props} />,
  search: (props: IconProps) => <Search {...props} />,
  sortDesc: (props: IconProps) => <SortDesc {...props} />,
  sun: (props: IconProps) => <Sun {...props} />,

  // Custom icons
  sort: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth='1.5'
      {...props}
    >
      <title>Sort</title>
      <path d='M15 18H3M21 6H3M17 12H3' />
    </svg>
  ),
  tick: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth='1.5'
      {...props}
    >
      <title>Tick</title>
      <path d='M20 6L9 17l-5-5' />
    </svg>
  ),
}
