/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // options: {
  //   sourcemaps: 'development',
  // },
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  i18n: {
    locales: ['en', 'br'],
    defaultLocale: 'en',
  },
}

export default nextConfig
