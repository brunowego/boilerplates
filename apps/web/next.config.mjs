import autoCert from 'anchor-pki/auto-cert/integrations/next'

/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  transpilePackages: ['@acme/ui'],
}

const withAutoCert = autoCert({
  enabledEnv: 'development',
})

export default withAutoCert(nextConfig)
