import { createCanvas } from 'canvas'

type MeasureTextProps = {
  text: string
  fontSize: number
  fontWeight?: number
  fontFamily?: string
}

export const measureText = ({
  text,
  fontSize,
  fontWeight = 400,
  fontFamily = 'Arial',
}: MeasureTextProps) => {
  const canvas = createCanvas(1, 1)
  const ctx = canvas.getContext('2d')

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`

  return ctx.measureText(text)
}
