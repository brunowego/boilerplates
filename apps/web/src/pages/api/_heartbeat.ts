import type { NextApiRequest, NextApiResponse } from 'next'

export default function heartBeat(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET' || req.method === 'HEAD') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.status(200).end('.')
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
