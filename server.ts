import express from 'express'
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware'
// import Jimp from 'jimp'

const app = express()

const simpleRequestLogger = (proxyServer) => {
  proxyServer.on('proxyReq', (_, req) => {
    console.log(`[HPM] [${req.method}] ${req.url}`)
  })
}

app.use(
  '/:hostname/*',
  createProxyMiddleware({
    router: async (req) => {
      // @ts-ignore
      const hostname = req.params.hostname

      console.log(`https://${hostname}/${req.params[0]}`)

      // @ts-ignore
      return `https://${hostname}/${req.params[0]}`
    },
    changeOrigin: true,
    selfHandleResponse: true,
    plugins: [simpleRequestLogger],
    on: {
      proxyRes: responseInterceptor(
        async (responseBuffer, proxyRes, req, res) => {
          // const imageTypes = [
          //   'image/png',
          //   'image/jpg',
          //   'image/jpeg',
          //   'image/gif',
          // ]

          // if (imageTypes.includes(proxyRes.headers['content-type'])) {
          //   try {
          //     const image = await Jimp.read(responseBuffer)
          //     image.flip(true, false).sepia().pixelate(5)
          //     return image.getBufferAsync(Jimp.AUTO)
          //   } catch (err) {
          //     console.log('image processing error: ', err)
          //     return responseBuffer
          //   }
          // }

          // set headers manually
          res.setHeader('Access-Control-Allow-Origin', '*')

          return responseBuffer
        },
      ),
    },
  }),
)

app.listen(13000, () => {
  console.log('Server listening at http://localhost:13000')
})
