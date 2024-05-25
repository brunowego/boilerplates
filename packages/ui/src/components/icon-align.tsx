import type { IconProps } from './icon'

const AlignLeft = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <title>Align Left</title>
    <path d='M4 4V20' />
    <path d='M18 9H10C8.89543 9 8 9.89543 8 11V13C8 14.1046 8.89543 15 10 15H18C19.1046 15 20 14.1046 20 13V11C20 9.89543 19.1046 9 18 9Z' />
  </svg>
)

const AlignHorizontalCenter = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <title>Align Horizontal Center</title>
    <path d='M12 15V20M12 4V9V4Z' />
    <path d='M16 9H8C6.89543 9 6 9.89543 6 11V13C6 14.1046 6.89543 15 8 15H16C17.1046 15 18 14.1046 18 13V11C18 9.89543 17.1046 9 16 9Z' />
  </svg>
)

const AlignRight = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <title>Align Right</title>
    <path d='M20 4V20' />
    <path d='M14 9H6C4.89543 9 4 9.89543 4 11V13C4 14.1046 4.89543 15 6 15H14C15.1046 15 16 14.1046 16 13V11C16 9.89543 15.1046 9 14 9Z' />
  </svg>
)

const AlignTop = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <title>Align Top</title>
    <path d='M4 4H20' />
    <path d='M13 8H11C9.89543 8 9 8.89543 9 10V18C9 19.1046 9.89543 20 11 20H13C14.1046 20 15 19.1046 15 18V10C15 8.89543 14.1046 8 13 8Z' />
  </svg>
)

const AlignVerticalCenter = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <title>Align Vertical Center</title>
    <path d='M15 12H20M4 12H9H4Z' />
    <path d='M13 6H11C9.89543 6 9 6.89543 9 8V16C9 17.1046 9.89543 18 11 18H13C14.1046 18 15 17.1046 15 16V8C15 6.89543 14.1046 6 13 6Z' />
  </svg>
)

const AlignBottom = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <title>Align Bottom</title>
    <path d='M4 20H20' />
    <path d='M13 4H11C9.89543 4 9 4.89543 9 6V14C9 15.1046 9.89543 16 11 16H13C14.1046 16 15 15.1046 15 14V6C15 4.89543 14.1046 4 13 4Z' />
  </svg>
)

export {
  AlignLeft,
  AlignHorizontalCenter,
  AlignRight,
  AlignTop,
  AlignVerticalCenter,
  AlignBottom,
}
