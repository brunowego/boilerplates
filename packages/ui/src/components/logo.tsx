import type { HTMLAttributes } from 'react'

type LogoProps = HTMLAttributes<SVGElement>

const LogoMark = (props: LogoProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 32 28'
    fill='currentColor'
    {...props}
  >
    <title>Acme</title>
    <path d='m8.21 13.74 3.944 6.828.005.01 3.937 6.82a.174.174 0 0 1-.15.26v.001H.174a.175.175 0 0 1-.145-.272l3.937-6.819.005-.009L7.91 13.74a.174.174 0 0 1 .302 0M16.584.27l7.672 13.288.009.016.008.014.002.004 7.654 13.257a.538.538 0 0 1-.431.807l-.037.003h-8.023a.2.2 0 0 1-.184-.118L17.476 17.53l-.006-.011-.001-.002.001.002c-1.58-3.194-4.006-6.93-5.835-10.095a.2.2 0 0 1 .007-.213l4.006-6.94a.54.54 0 0 1 .934-.003zm.887 17.248' />
  </svg>
)

const TailwindCSS = (props: LogoProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <title>TailwindCSS</title>
    <path
      fill='#2298BD'
      d='M12 6q-4 0-5 4 1.5-2 3.5-1.5c.76.19 1.305.742 1.906 1.353C13.386 10.848 14.521 12 17 12q4 0 5-4-1.5 2-3.5 1.5c-.76-.19-1.305-.742-1.906-1.353C15.614 7.152 14.478 6 12 6m-5 6q-4 0-5 4 1.5-2 3.5-1.5c.76.19 1.304.742 1.906 1.353C8.386 16.848 9.521 18 12 18q4 0 5-4-1.5 2-3.5 1.5c-.76-.19-1.305-.742-1.906-1.353C10.614 13.152 9.479 12 7 12'
    />
  </svg>
)

export { LogoMark, TailwindCSS }
