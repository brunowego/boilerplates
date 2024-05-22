import type { Config } from '@measured/puck'

import {
  ButtonGroup,
  Card,
  Columns,
  Flex,
  Heading,
  Hero,
  Paragraph,
  VerticalSpace,
} from './components/blocks'

export const config: Config = {
  components: {
    ButtonGroup,
    Card,
    Columns,
    Flex,
    Heading,
    Hero,
    Paragraph,
    VerticalSpace,
  },
}

export { type Data, Puck as default, Render } from '@measured/puck'
export { default as CustomPuck } from './components/custom-puck'
