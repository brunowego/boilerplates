import { NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'
import nextConfig from 'next/config'

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}

const { apiURL } = nextConfig().serverRuntimeConfig

const all = (req: NextApiRequest, res: NextApiResponse) => {
  return httpProxyMiddleware(req, res, {
    headers: {
      'X-Forwarded-For': req.socket?.remoteAddress ?? '',
    },
    target: apiURL,
  })
}

export default all
