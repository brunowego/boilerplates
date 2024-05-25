import type { JSX } from 'react'
import Sketch, { type SketchProps } from '@uiw/react-color-sketch'

type ColorPickerProps = SketchProps

const presetColors = [
  '#4d4d4d',
  '#999999',
  '#ffffff',
  '#f44e3b',
  '#fe9200',
  '#fcdc00',
  '#dbdf00',
  '#a4dd00',
  '#68ccca',
  '#73d8ff',
  '#aea1ff',
  '#fda1ff',
  '#333333',
  '#808080',
  '#cccccc',
  '#d33115',
  '#e27300',
  '#fcc400',
  '#b0bc00',
  '#68bc00',
  '#16a5a5',
  '#009ce0',
  '#7b64ff',
  '#fa28ff',
  '#000000',
  '#666666',
  '#b3b3b3',
  '#9f0500',
  '#c45100',
  '#fb9e00',
  '#808900',
  '#194d33',
  '#0c797d',
  '#0062b1',
  '#653294',
  '#ab149e',
]

export default function ColorPicker({
  editableDisable = false,
  ...props
}: ColorPickerProps): JSX.Element {
  return (
    <Sketch
      style={{ width: 370 }}
      disableAlpha={editableDisable}
      editableDisable={editableDisable}
      presetColors={presetColors}
      {...props}
    />
  )
}
