import {
  BrowserMultiFormatReader,
  DecodeHintType,
  Result,
} from '@zxing/library'
import { useRef, useMemo, useEffect } from 'react'

interface ZxingOptions {
  hints?: Map<DecodeHintType, any>
  constraints?: MediaStreamConstraints
  timeBetweenDecodingAttempts?: number
  // eslint-disable-next-line no-unused-vars
  onResult?: (result: Result) => void
  // eslint-disable-next-line no-unused-vars
  onError?: (error: Error) => void
}

export const useZxing = ({
  constraints = {
    audio: false,
    video: {
      facingMode: 'environment',
    },
  },
  hints,
  timeBetweenDecodingAttempts = 300,
  onResult = () => {},
  onError = () => {},
}: ZxingOptions = {}) => {
  const ref = useRef<HTMLVideoElement>(null)

  const reader = useMemo<BrowserMultiFormatReader>(() => {
    const instance = new BrowserMultiFormatReader(hints)

    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts

    return instance
  }, [hints, timeBetweenDecodingAttempts])

  useEffect(() => {
    if (!ref.current) return

    reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
      if (result) onResult(result)

      if (error) onError(error)
    })

    return () => {
      reader.reset()
    }
  }, [ref, reader])

  return { ref }
}
