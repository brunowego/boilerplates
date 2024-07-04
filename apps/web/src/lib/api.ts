import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
} satisfies AxiosRequestConfig)

export { api as default, axios, type AxiosResponse, isAxiosError }

export type FetchResponse<T> = {
  next: string | null
  results: T[]
}
