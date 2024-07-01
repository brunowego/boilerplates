import { withMask } from '../hooks/use-mask-input'
import Input, { type InputProps } from './input'

type ZipCodeInputProps = InputProps

export default function ZipCodeInput({
  ...props
}: ZipCodeInputProps): JSX.Element {
  const zipCodeRef = withMask(['99.999-999'], {
    placeholder: ' ',
    autoUnmask: true,
    showMaskOnHover: false,
  })

  return <Input {...props} ref={zipCodeRef} />
}
