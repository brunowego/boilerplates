import axios, {
  AxiosInstance,
  type AxiosRequestConfig,
  AxiosError,
  isAxiosError,
} from 'axios'

import { publicEnv as env } from '@/env/client'

const api: AxiosInstance = axios.create({
  baseURL: `${env.NEXT_PUBLIC_BASE_URL}/api`,
} satisfies AxiosRequestConfig)

export { api, AxiosError, isAxiosError }
