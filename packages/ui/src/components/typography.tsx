import { cva } from 'class-variance-authority'

export const typographyVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm leading-6',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl leading-8',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    },
    variant: {
      muted: 'text-muted-foreground',
      title: 'text-lg leading-8',
      h1: 'text-3xl leading-10',
      h2: 'text-2xl',
      h3: 'text-xl',
      h4: 'text-lg',
      p: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
  compoundVariants: [
    {
      variant: ['title', 'h1', 'h2', 'h3', 'h4'],
      className: 'font-medium tracking-tight',
    },
  ],
})
