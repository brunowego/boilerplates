import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  AxiosError,
  isAxiosError,
} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
} satisfies AxiosRequestConfig)

export { api, axios, AxiosError, isAxiosError }
