import type { RefObject } from 'react'
import type { FieldError, UseFormSetValue } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'

import FormErrorMessage from './form-error-message'

type CaptchaProps = {
  // biome-ignore lint/suspicious/noExplicitAny: any is used here to avoid circular dependencies
  setValue: UseFormSetValue<any>
  error?: FieldError
  recaptchaRef: RefObject<ReCAPTCHA>
}

export default function Captcha({
  setValue,
  error,
  recaptchaRef,
}: CaptchaProps) {
  const handleRecaptchaChange = (value: string | null) => {
    setValue('recaptcha', value || '')
  }

  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        ref={recaptchaRef}
        onChange={handleRecaptchaChange}
        theme='dark'
      />

      <FormErrorMessage error={error} />
    </div>
  )
}
