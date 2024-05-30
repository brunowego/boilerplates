// import { default as Images } from './images'
// import { default as PageStructure } from './page-structure'
// import { default as RawElements } from './raw-elements'
// import { default as SectionTemplates } from './section-templates'
// import { default as Settings } from './settings'

export const Panels = {
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

export type Panel = (typeof Panels)[keyof typeof Panels]

// export const panel = (name: string) => {
//   switch (name) {
//     case null:
//       return (
//         <p>
//           leftSideBar.viewName is null but the sidebar is open - make sure you
//           are setting the view name when you open the sidebar
//         </p>
//       )
//     case Panels.RAW_ELEMENTS:
//       return <RawElements />
//     case Panels.SECTION_TEMPLATES:
//       return <SectionTemplates />
//     case Panels.PAGE_STRUCTURE:
//       return <PageStructure />
//     case Panels.IMAGES:
//       return <Images />
//     case Panels.SETTINGS:
//       return <Settings />
//   }
// }
