import type { Config } from '@measured/puck'

import {
  Box,
  Button,
  Column,
  FAQ,
  Form,
  HTML,
  Icon,
  Image,
  Paragraph,
  Row,
  Section,
  Timer,
  Title,
  Video,
} from '@/components/blocks'

export const config: Config = {
  categories: {
    structures: {
      title: 'Structures',
      components: ['Section', 'Row', 'Column', 'Box'],
    },
    elements: {
      title: 'Elements',
      components: [
        'Title',
        'Paragraph',
        'Button',
        'Form',
        'Image',
        'Video',
        'HTML',
        'Icon',
        'Timer',
        'FAQ',
      ],
    },
  },
  components: {
    Box,
    Button,
    Column,
    FAQ,
    Form,
    HTML,
    Icon,
    Image,
    Paragraph,
    Row,
    Section,
    Timer,
    Title,
    Video,
  },
}

export { type Data, Puck as default, Render, usePuck } from '@measured/puck'
