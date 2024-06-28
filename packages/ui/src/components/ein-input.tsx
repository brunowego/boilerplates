import { withMask } from '../hooks/use-mask-input'
import Input, { type InputProps } from './input'

type EINInputProps = InputProps

export default function EINInput({ ...props }: EINInputProps): JSX.Element {
  const einRef = withMask(['99.999.999/9999-99'], {
    placeholder: ' ',
    autoUnmask: true,
    showMaskOnHover: false,
  })

  return <Input {...props} ref={einRef} />
}
