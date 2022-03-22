import { Doc } from '@/types/doc'
import { rest } from 'msw'
import { API } from '@/utils/path'

const mockedDocs: Doc[] = [
  {
    title: 'Documentation',
    link: 'https://nextjs.org/docs',
    description: 'Find in-depth information about Next.js features and API.',
  },
  {
    title: 'Learn',
    link: 'https://nextjs.org/learn',
    description: 'Learn about Next.js in an interactive course with quizzes!',
  },
  {
    title: 'Examples',
    link: 'https://github.com/vercel/next.js/tree/canary/examples',
    description: 'Discover and deploy boilerplate example Next.js projects.',
  },
  {
    title: 'Deploy',
    link: 'https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
    description: 'Instantly deploy your Next.js site to a public URL with Vercel.',
  },
]

export const docHandlers = [
  rest.get(API.docs, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedDocs))
  }),
]
