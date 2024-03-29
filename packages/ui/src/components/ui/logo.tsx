import type { HTMLAttributes } from 'react'
import { Github } from 'lucide-react'

type LogoProps = HTMLAttributes<SVGElement>

export const Logo = {
  gitHub: (props: LogoProps) => <Github {...props} />,
  google: (props: LogoProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <title>Google</title>
      <path d='M2 12C2 6.486 6.486 2 12 2c2.227 0 4.335.716 6.096 2.072l-2.324 3.019A6.13 6.13 0 0 0 12 5.81 6.2 6.2 0 0 0 5.81 12 6.2 6.2 0 0 0 12 18.19a6.2 6.2 0 0 0 5.89-4.285H12v-3.81h10V12c0 5.514-4.486 10-10 10S2 17.514 2 12' />
    </svg>
  ),
}
