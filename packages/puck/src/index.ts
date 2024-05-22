import type { Config } from '@measured/puck'

import { BackgroundImage } from '@acme/puck-background-image'

import {
  // ButtonGroup,
  // Card,
  Columns,
  // Flex,
  Heading,
  // Hero,
  Paragraph,
  VerticalSpace,
} from './components/blocks'

export const config: Config = {
  categories: {
    Layouting: { components: ['Flex'] },
    Input: { components: ['Input'] },
  },
  components: {
    // ButtonGroup,
    // Card,
    Columns,
    // Flex,
    Heading,
    // Hero,
    BackgroundImage,
    Paragraph,
    VerticalSpace,
  },
}

export { type Data, Puck as default, Render } from '@measured/puck'
export { default as CustomPuck } from './components/custom-puck'
