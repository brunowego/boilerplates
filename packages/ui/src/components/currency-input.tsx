import CurrencyInput, {
  type CurrencyInputProps,
} from 'react-currency-input-field'

import { inputVariants } from './input'
import cn from '../utils/cn'

export default function _CurrencyInput({
  className,
  ...props
}: CurrencyInputProps): JSX.Element {
  return (
    <CurrencyInput
      allowNegativeValue={false}
      className={cn('text-right', inputVariants({ className }))}
      decimalsLimit={2}
      intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
      step={1}
      {...props}
    />
  )
}
