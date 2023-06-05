import nextConfig from 'next/config'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const { apiURL } = nextConfig().publicRuntimeConfig

const ready = async (_: NextApiRequest, res: NextApiResponse) => {
  const apiStatus = await axios
    .get(`${apiURL}/_heartbeat`)
    .then(() => 'OK')
    .catch(() => 'ERROR')

  res.status(apiStatus == 'OK' ? 200 : 500).send(apiStatus)
}

export default ready
