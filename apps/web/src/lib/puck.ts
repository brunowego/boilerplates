import type { Config } from '@acme/puck'

import Root from '@/components/root'
import {
  Box,
  Button,
  Column,
  FAQ,
  Form,
  HTML,
  Icon,
  Image,
  Text,
  Row,
  Section,
  Timer,
  Title,
  Video,
} from '@/components/blocks'

export const config: Config = {
  root: {
    defaultProps: {
      title: 'My Page',
      colors: {
        background: '#fff',
        foreground: '#000',
      },
    },
    // @ts-ignore
    render: Root,
  },
  categories: {
    structures: {
      title: 'Structures',
      components: ['Section', 'Row', 'Column', 'Box'],
    },
    elements: {
      title: 'Elements',
      components: [
        'Title',
        'Text',
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
    Text,
    Row,
    Section,
    Timer,
    Title,
    Video,
  },
}

export {
  type Data,
  Puck as default,
  Render,
  usePuck,
  MenuBar,
} from '@acme/puck'
