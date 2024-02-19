import type { StaticImageData } from 'next/image'

import ErrorImg from '@/assets/img/errors.png'
import BackendValidationImg from '@/assets/img/backend-validation.png'
import ShareImg from '@/assets/img/share.png'
import VisualizationImg from '@/assets/img/visualization.png'

export const welcomeSteps = [
  {
    title: 'Welcome to OTelBin',
    description:
      'OTelBin is a free editing, visualization and validation tool for OpenTelemetry collector configurations.',
    image: VisualizationImg,
  },
  {
    title: 'Code editor with syntax highlighting & code completion',
    description:
      'Craft your configuration seamlessly in the editor with real-time syntax and schema validation.',
    image: ErrorImg,
  },
  {
    title: 'Validate against your distribution',
    description:
      'Go beyond schema checks through validation in a backend against actual distribution binaries.',
    image: BackendValidationImg,
  },
  {
    title: 'Collaborate with others',
    description:
      'The OpenTelemetry collector configuration is persisted within the URL so that you can always share what you are working on.',
    image: ShareImg,
  },
] satisfies Array<{
  title: string
  description: string
  image: StaticImageData
}>
