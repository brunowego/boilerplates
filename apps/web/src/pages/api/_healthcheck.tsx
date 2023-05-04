import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConfig from 'next/config'

const { apiURL } = nextConfig().serverRuntimeConfig

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const apiStatus = await axios
    .get(`${apiURL}/api/settings`)
    .then(() => 'OK')
    .catch(() => 'ERROR')

  res.status(apiStatus == 'OK' ? 200 : 500).send(apiStatus)
}
