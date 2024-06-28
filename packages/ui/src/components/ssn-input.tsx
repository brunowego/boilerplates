import { withMask } from '../hooks/use-mask-input'
import Input, { type InputProps } from './input'

type SSNInputProps = InputProps

export default function SSNInput({ ...props }: SSNInputProps): JSX.Element {
  const ssnRef = withMask(['999.999.999-99'], {
    placeholder: ' ',
    autoUnmask: true,
    showMaskOnHover: false,
  })

  return <Input {...props} ref={ssnRef} />
}
