import { Doc } from '@/types/doc'
import type { NextApiResponse } from 'next'
import { StatusCodes } from 'http-status-codes'

const staticDocs: Doc[] = [
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
]

export default async function handler({}, res: NextApiResponse) {
  res.status(StatusCodes.OK).json(staticDocs)
}
