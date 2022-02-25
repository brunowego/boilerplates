import boxfeed from '@/assets/images/logos/boxfeed.svg'
import cloken from '@/assets/images/logos/cloken.svg'
import puklin from '@/assets/images/logos/puklin.svg'
import henkiz from '@/assets/images/logos/henkiz.svg'

export interface Project {
  name: string
  description: string
  website: string
  logo: StaticImageData
}

export type PROJECT_NAMES = 'boxfeed' | 'cloken' | 'puklin' | 'henkiz'

export const PROJECT_LOGOS: Record<PROJECT_NAMES, StaticImageData> = {
  boxfeed: boxfeed,
  cloken: cloken,
  puklin: puklin,
  henkiz: henkiz,
}

export const PROJECTS: Array<Project> = [
  {
    name: 'Boxfeed',
    description: 'Enhance the sale of your products by delivering them in the original box.',
    website: 'https://boxfeed.co',
    logo: boxfeed,
  },
  {
    name: 'Cloken',
    description: 'Cloken mission is to create a better, user-owned, decentralized internet.',
    website: 'https://cloken.com',
    logo: cloken,
  },
  {
    name: 'Puklin',
    description: "Rental of children's toys. Save up to 80% by renting toys for your kids.",
    website: 'https://puklin.com',
    logo: puklin,
  },
  {
    name: 'Henkiz',
    description: 'We accelerate startups that have growth potential.',
    website: 'https://henkiz.com',
    logo: henkiz,
  },
]
