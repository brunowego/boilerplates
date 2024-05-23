import type Icon from '@acme/ui/components/icon'

import type { Category, Setting } from './types'
import PageAddress from './components/settings/page-address'
import SEO from './components/settings/seo'
import FacebookIntegration from './components/settings/facebook-integration'
import UrlParameters from './components/settings/url-parameters'

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
  // {
  //   title: 'Saved sections',
  //   children: [],
  // },
  {
    title: 'About',
    children: [
      {
        title: 'Hero',
        href: 'https://placehold.co/279x200/png',
      },
      {
        title: 'Hero',
        href: 'https://placehold.co/279x200/png',
      },
      {
        title: 'Hero',
        href: 'https://placehold.co/279x200/png',
      },
    ],
  },
  {
    title: 'Bonus',
    children: [],
  },
  {
    title: 'Capture',
    children: [],
  },
  {
    title: 'Content',
    children: [],
  },
  {
    title: 'CTA',
    children: [],
  },
  {
    title: 'FAQ',
    children: [],
  },
  {
    title: 'Footer',
    children: [],
  },
  {
    title: 'Guarantee',
    children: [],
  },
  {
    title: 'Header',
    children: [],
  },
  {
    title: 'Link in bio',
    children: [],
  },
  {
    title: 'List',
    children: [],
  },
  {
    title: 'Product Display',
    children: [],
  },
  {
    title: 'Testimonials',
    children: [],
  },
  {
    title: 'Thank you',
    children: [],
  },
  {
    title: 'Videos',
    children: [],
  },
] as Category[]

export const settings = [
  {
    title: 'Page address',
    children: <PageAddress />,
  },
  {
    title: 'Site information (SEO)',
    children: <SEO />,
  },
  {
    title: 'Chat support',
    locked: true,
  },
  {
    title: 'Facebook integration',
    children: <FacebookIntegration />,
  },
  {
    title: 'Scripts',
    locked: true,
  },
  {
    title: 'URL parameters',
    children: <UrlParameters />,
  },
] as Setting[]
