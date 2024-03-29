import type { FieldError } from 'react-hook-form'

type FormErrorMessageProps = {
  error?: FieldError
}

export default function FormErrorMessage({ error }: FormErrorMessageProps) {
  return (
    error && (
      <div className='text-sm text-gray-500 dark:text-gray-400'>
        {error.message}
      </div>
    )
  )
}
