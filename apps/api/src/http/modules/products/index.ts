import { eq } from 'drizzle-orm'
import { type Elysia, t } from 'elysia'

import { db } from '@/db'
import { product } from '@/db/schemas'
import { HttpException } from '@/http/exceptions/http'
import {
  type AxiosInstance,
  axios,
  type AxiosRequestConfig,
  AxiosError,
} from '@/lib/axios'

const productSchema = t.Object({
  title: t.String(),
  description: t.String(),
  category: t.Union([t.String(), t.Null()]),
  images: t.Union([t.Array(t.String()), t.Null()]),
  brand: t.String(),
  model: t.Union([t.String(), t.Null()]),
  dimension: t.Union([t.String(), t.Null()]),
  weight: t.Union([t.String(), t.Null()]),
  ean: t.String(),
  upc: t.String(),
  gtin: t.Union([t.String(), t.Null()]),
  asin: t.Union([t.String(), t.Null()]),
})

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.upcitemdb.com',
} satisfies AxiosRequestConfig)

const fetchProductLookup = async ({ upc }: { upc: string }) => {
  return await api.get(`/prod/trial/lookup?upc=${upc}`).then((res) => res.data)
}

const addProduct = async ({ upc }: { upc: string }) => {
  try {
    const { items } = await fetchProductLookup({ upc })

    if (items[0] === undefined) return

    const p = items[0]

    const result = db.insert(product).values({
      title: p.title,
      description: p.description,
      category: p.category,
      images: p.images,
      brand: p.brand,
      model: p.model,
      dimension: p.dimension,
      weight: p.weight,
      ean: p.ean,
      upc,
      gtin: p.gtin,
      asin: p.asin,
    })

    return result
  } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 429)
      console.log(err.response.data)
  }
}

export const initProductRoutes = (app: Elysia) =>
  app.get(
    '/lookup',
    async ({ query }) => {
      const result = await db.query.product.findFirst({
        where: eq(product.upc, query.upc),
        columns: {
          title: true,
          description: true,
          category: true,
          images: true,
          brand: true,
          model: true,
          dimension: true,
          weight: true,
          ean: true,
          upc: true,
          gtin: true,
          asin: true,
        },
      })

      if (!result) addProduct({ upc: query.upc })

      if (!result) throw new HttpException('Product not found', 404)

      return result
    },
    {
      query: t.Object({
        upc: t.String(),
      }),
      response: productSchema,
    },
  )
