import type { NextApiRequest, NextApiResponse } from 'next'

const live = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    res.status(200).json({ status: 'OK' })
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}

export default live
