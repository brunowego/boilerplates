import { cva } from 'class-variance-authority'

const typographyVariants = cva('', {
  variants: {
    variant: {
      muted: 'text-muted-foreground',
    },
  },
})

export { typographyVariants }
