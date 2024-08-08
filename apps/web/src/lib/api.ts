import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  AxiosError,
  isAxiosError,
} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: '/api',
} satisfies AxiosRequestConfig)

export { api as default, axios, AxiosError, isAxiosError }
