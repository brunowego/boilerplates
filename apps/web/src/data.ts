import type Icon from '@acme/ui/components/icon'

export const structures = [
  {
    title: 'Section',
    icon: 'GalleryVertical',
  },
  {
    title: 'Row',
    icon: 'Rows2',
  },
  {
    title: 'Column',
    icon: 'Columns2',
  },
  {
    title: 'Box',
    icon: 'Square',
  },
] as { title: string; icon: keyof typeof Icon }[]

export const elements = [
  {
    title: 'Title',
    icon: 'Type',
  },
  {
    title: 'Paragraph',
    icon: 'Pilcrow',
  },
  {
    title: 'Button',
    icon: 'SquareMinus',
  },
  {
    title: 'Form',
    icon: 'Text',
  },
  {
    title: 'Image',
    icon: 'Image',
  },
  {
    title: 'Video',
    icon: 'Video',
  },
  {
    title: 'HTML',
    icon: 'CodeXml',
  },
  {
    title: 'Icon',
    icon: 'Smile',
  },
  {
    title: 'Timer',
    icon: 'Timer',
  },
  {
    title: 'FAQ',
    icon: 'SquareMenu',
  },
] as { title: string; icon: keyof typeof Icon }[]

export const categories = [
  {
    title: 'Saved sections',
    templates: [
      {
        title: 'Hero',
        preview: 'https://placehold.co/279x200/png',
      },
    ],
  },
  {
    title: 'About',
    templates: [],
  },
  {
    title: 'Bonus',
    templates: [],
  },
  {
    title: 'Capture',
    templates: [],
  },
  {
    title: 'Content',
    templates: [],
  },
  {
    title: 'CTA',
    templates: [],
  },
  {
    title: 'FAQ',
    templates: [],
  },
  {
    title: 'Footer',
    templates: [],
  },
  {
    title: 'Guarantee',
    templates: [],
  },
  {
    title: 'Header',
    templates: [],
  },
  {
    title: 'Link in bio',
    templates: [],
  },
  {
    title: 'List',
    templates: [],
  },
  {
    title: 'Product Display',
    templates: [],
  },
  {
    title: 'Testimonials',
    templates: [],
  },
  {
    title: 'Thank you',
    templates: [],
  },
  {
    title: 'Videos',
    templates: [],
  },
] as { title: string; templates: { title: string; preview: string }[] }[]

export const settings = [
  {
    title: 'Page address',
  },
  {
    title: 'Site information (SEO)',
  },
  {
    title: 'Chat support',
  },
  {
    title: 'Facebook integration',
  },
  {
    title: 'Scripts',
  },
  {
    title: 'URL parameters',
  },
]
