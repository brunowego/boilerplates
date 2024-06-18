import { withMask } from '../hooks/use-mask-input'
import Input, { type InputProps } from './input'

type SSNInputProps = InputProps

export default function SSNInput({ ...props }: SSNInputProps): JSX.Element {
  const ssnRef = withMask(['999.999.999-99'])

  return <Input type='text' {...props} ref={ssnRef} />
}
