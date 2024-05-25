import { type ReactNode, useEffect, useMemo, useState } from 'react'

import {
  Monitor,
  Tablet,
  Smartphone,
  ZoomIn,
  ZoomOut,
} from '@acme/ui/components/icon'

import { IconButton } from '../IconButton'
import { useAppContext } from '../Puck/context'
import { getClassNameFactory } from '../../lib'
import styles from './styles.module.css'
import type { Viewport } from '../../types/Viewports'

const icons = {
  Smartphone: <Smartphone className='size-4' />,
  Tablet: <Tablet className='size-4' />,
  Monitor: <Monitor className='size-4' />,
}

const getClassName = getClassNameFactory('ViewportControls', styles)
const getClassNameButton = getClassNameFactory('ViewportButton', styles)

const ViewportButton = ({
  children,
  height = 'auto',
  title,
  width,
  onClick,
}: {
  children: ReactNode
  height?: number | 'auto'
  title: string
  width: number
  onClick: (viewport: Viewport) => void
}) => {
  const { state } = useAppContext()

  const [isActive, setIsActive] = useState(false)

  // We use an effect so this doesn't cause hydration warnings with SSR
  useEffect(() => {
    setIsActive(width === state.ui.viewports.current.width)
  }, [width, state.ui.viewports.current.width])

  return (
    <span className={getClassNameButton({ isActive })}>
      <IconButton
        title={title}
        disabled={isActive}
        onClick={(e) => {
          e.stopPropagation()
          onClick({ width, height })
        }}
      >
        <span className={getClassNameButton('inner')}>{children}</span>
      </IconButton>
    </span>
  )
}

// Based on Chrome dev tools
const defaultZoomOptions = [
  { label: '25%', value: 0.25 },
  { label: '50%', value: 0.5 },
  { label: '75%', value: 0.75 },
  { label: '100%', value: 1 },
  { label: '125%', value: 1.25 },
  { label: '150%', value: 1.5 },
  { label: '200%', value: 2 },
]

export const ViewportControls = ({
  autoZoom,
  zoom,
  onViewportChange,
  onZoom,
}: {
  autoZoom: number
  zoom: number
  onViewportChange: (viewport: Viewport) => void
  onZoom: (zoom: number) => void
}) => {
  const { viewports } = useAppContext()

  const defaultsContainAutoZoom = defaultZoomOptions.find(
    (option) => option.value === autoZoom,
  )

  const zoomOptions = useMemo(
    () =>
      [
        ...defaultZoomOptions,
        ...(defaultsContainAutoZoom
          ? []
          : [
              {
                value: autoZoom,
                label: `${(autoZoom * 100).toFixed(0)}% (Auto)`,
              },
            ]),
      ]
        .filter((a) => a.value <= autoZoom)
        .sort((a, b) => (a.value > b.value ? 1 : -1)),
    [autoZoom],
  )

  return (
    <div className={getClassName()}>
      {viewports.map((viewport, index) => (
        <ViewportButton
          height={viewport.height}
          // biome-ignore lint/suspicious/noArrayIndexKey: TBD
          key={index}
          onClick={onViewportChange}
          title={
            viewport.label
              ? `Switch to ${viewport.label} viewport`
              : 'Switch viewport'
          }
          width={viewport.width}
        >
          {typeof viewport.icon === 'string'
            ? // @ts-ignore
              icons[viewport.icon] || viewport.icon
            : viewport.icon || icons.Smartphone}
        </ViewportButton>
      ))}
      <div className={getClassName('divider')} />
      <IconButton
        title='Zoom viewport out'
        // @ts-ignore
        disabled={zoom <= zoomOptions[0]?.value}
        onClick={(e) => {
          e.stopPropagation()
          onZoom(
            // @ts-ignore
            zoomOptions[
              Math.max(
                zoomOptions.findIndex((option) => option.value === zoom) - 1,
                0,
              )
            ].value,
          )
        }}
      >
        <ZoomOut className='size-4' />
      </IconButton>

      <IconButton
        title='Zoom viewport in'
        // @ts-ignore
        disabled={zoom >= zoomOptions[zoomOptions.length - 1]?.value}
        onClick={(e) => {
          e.stopPropagation()

          onZoom(
            // @ts-ignore
            zoomOptions[
              Math.min(
                zoomOptions.findIndex((option) => option.value === zoom) + 1,
                zoomOptions.length - 1,
              )
            ].value,
          )
        }}
      >
        <ZoomIn className='size-4' />
      </IconButton>

      <div className={getClassName('divider')} />

      <select
        className={getClassName('zoomSelect')}
        onChange={(e) => {
          onZoom(Number.parseFloat(e.currentTarget.value))
        }}
        value={zoom.toString()}
      >
        {zoomOptions.map((option) => (
          <option
            key={option.label}
            label={option.label}
            value={option.value}
          />
        ))}
      </select>
    </div>
  )
}
