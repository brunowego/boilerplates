declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: This is a Facebook Pixel function.
    fbq: any
  }
}

export const pageview = () => {
  window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
  window.fbq('track', name, options)
}

export const pagevisit = (path: string) => {
  window.fbq('track', 'ViewContent', { content_name: path })
}
