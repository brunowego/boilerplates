import type { HTMLAttributes } from 'react'
import { Moon, Sun } from 'lucide-react'

type IconProps = HTMLAttributes<SVGElement>

export const Icon = {
  moon: (props: IconProps) => <Moon {...props} />,
  sun: (props: IconProps) => <Sun {...props} />,
  whatsApp: (props: IconProps) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <title className='sr-only'>WhatsApp</title>
      <path d='M12 2C6.486 2 2 6.486 2 12c0 1.94.556 3.81 1.612 5.435L2.054 21.07a.666.666 0 0 0 .875.875l3.636-1.559A9.9 9.9 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2m5.133 13.58s-.832 1.066-1.432 1.315c-1.528.632-3.684 0-6.14-2.455-2.456-2.457-3.089-4.613-2.456-6.14.25-.602 1.316-1.433 1.316-1.433a.78.78 0 0 1 .997.062l1.206 1.206c.26.26.26.684 0 .943l-.757.757s-.306.92 1.535 2.763c1.842 1.842 2.763 1.535 2.763 1.535l.757-.757a.67.67 0 0 1 .943 0l1.206 1.206c.26.26.287.708.062.997' />
    </svg>
  ),
}
