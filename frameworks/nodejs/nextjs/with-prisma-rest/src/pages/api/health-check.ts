import { NextApiRequest, NextApiResponse } from 'next'

const HealthCheck = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'OK',
      timestamp: Date.now(),
      uptime: Math.floor(process.uptime()),
    })
  }

  return res.status(405).json({
    message: 'Method Not Allowed',
  })
}

export default HealthCheck
