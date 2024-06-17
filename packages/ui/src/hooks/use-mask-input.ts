import { withMask as _withMask } from 'use-mask-input'

export const withMask = (mask: string[]) =>
  _withMask(mask, {
    placeholder: '0',
    autoUnmask: true,
    showMaskOnHover: false,
  })
