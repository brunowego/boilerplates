import { Poppins as FontSans } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
})
