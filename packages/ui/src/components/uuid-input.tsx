import { withMask } from '../hooks/use-mask-input'
import Input, { type InputProps } from './input'

type UUIDInputProps = InputProps

export default function UUIDInput({ ...props }: UUIDInputProps): JSX.Element {
  const uuidRef = withMask(['********-****-****-****-************'], {
    placeholder: ' ',
    autoUnmask: true,
    showMaskOnHover: false,
  })

  return <Input {...props} ref={uuidRef} />
}
