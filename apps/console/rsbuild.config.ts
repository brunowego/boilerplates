import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  html: {
    title: 'Acme',
  },
  output: {
    legalComments: 'none',
  },
  plugins: [pluginReact()],
})
