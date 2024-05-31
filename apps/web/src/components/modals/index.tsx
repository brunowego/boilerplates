export const Modals = {
  RAW_ELEMENTS: 'raw-elements',
  SECTION_TEMPLATES: 'section-templates',
  PAGE_STRUCTURE: 'page-structure',
  IMAGES: 'images',
  SETTINGS: 'settings',

  // Settings
  PAGE_ADDRESS: 'page-address',
  SEO: 'seo',
  FACEBOOK_INTEGRATION: 'facebook-integration',
  URL_PARAMETERS: 'url-parameters',
} as const

export type Modal = (typeof Modals)[keyof typeof Modals]
