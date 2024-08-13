import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  isAxiosError,
} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: '/api',
} satisfies AxiosRequestConfig)

export { api as default, axios, isAxiosError }
