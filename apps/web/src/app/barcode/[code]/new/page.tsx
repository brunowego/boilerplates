'use client'

import { type JSX, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export default function Page(): JSX.Element {
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  // console.log(errors)

  useEffect(() => {
    setValue('title', 'Test')
    setValue('description', 'Test')
  }, [])

  return (
    <main>
      <h1>New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder='Title' type='text' {...register('title', { required: true })} />
        </div>

        <div>
          <textarea {...register('description', { required: true })} />
        </div>

        <input type='submit' />
      </form>
    </main>
  )
}
