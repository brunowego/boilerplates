import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { jobSchema } from '../validations'
import { sendFormSubmission } from '..'
import { FormError } from './FormError'

interface Props {
  company: string
  location: string
  title: string
  link: string
  type: 'full' | 'part' | 'summer' | 'other'
  description: string
  deadline: Date
}

export default function JobForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(jobSchema),
  })

  const submitForm = (data: Props) => {
    setIsSubmitting(true)
    sendFormSubmission<Props>(data, 'https://formcarry.com/s/ijbLcQxS4IC', setSubmitted, setError)
  }

  const resetForm = () => {
    setSubmitted(false)
    setIsSubmitting(false)
    setError(false)
    reset({ company: getValues('company'), location: getValues('location') })
  }

  if (submitted)
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="mb-3 text-3xl font-bold">Thanks!</h1>

          <p>We will post the job position immediately!</p>

          <div className="py-6">
            <button
              onClick={resetForm}
              className="w-full px-6 py-3 font-medium text-white bg-indigo-800 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Send new
            </button>
          </div>
        </div>
      </div>
    )

  if (error) return <FormError />

  return (
    <div className="p-4 sm:p-8 lg:p-24">
      <div className="max-w-xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl">Post a job</h2>

          <p className="text-lg leading-6 text-gray-500">
            Fill out the form below to submit an open position at your company.
          </p>
        </div>

        <form onSubmit={handleSubmit(submitForm)}>
          <div className="mb-6">
            <h3 className="text-lg font-medium leading-6">Job information</h3>
          </div>

          <div className="grid grid-cols-1 mb-8 gap-y-6 gap-x-4 sm:grid-cols-3">
            <div className="sm:col-span-3">
              <label htmlFor="company" className="block mb-1 text-sm font-medium text-gray-700">
                Company
                {errors.company && (
                  <span className="float-right text-xs text-red-500">{errors.company.message}</span>
                )}
              </label>

              <input
                type="text"
                {...register('company', { required: true })}
                id="company"
                className="block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="location" className="block mb-1 text-sm font-medium text-gray-700">
                Location
                {errors.location && (
                  <span className="float-right text-xs text-red-500">
                    {errors.location.message}
                  </span>
                )}
              </label>

              <input
                type="text"
                {...register('location', { required: true })}
                id="location"
                className="block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">
                Job title
                {errors.title && (
                  <span className="float-right text-xs text-red-500">{errors.title.message}</span>
                )}
              </label>

              <input
                type="text"
                {...register('title', { required: true })}
                id="title"
                className="block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">
                Description
                {errors.description && (
                  <span className="float-right text-xs text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </label>

              <p className="mb-1 text-sm text-gray-500">
                A few lines with a description of the position.
              </p>

              <textarea
                rows={4}
                cols={25}
                {...register('description', { required: true })}
                id="description"
                className="block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="link" className="block mb-1 text-sm font-medium text-gray-700">
                Link to position
                {errors.link && (
                  <span className="float-right text-xs text-red-500">{errors.link.message}</span>
                )}
              </label>

              <input
                type="text"
                {...register('link', { required: true })}
                id="link"
                className="block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="type" className="block mb-1 text-sm font-medium text-gray-700">
                Job type
                {errors.type && (
                  <span className="float-right text-xs text-red-500">{errors.type.message}</span>
                )}
              </label>
              <select
                id="type"
                className="block w-full py-2 pl-3 pr-10 border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...register('type', { required: true })}
              >
                <option value="full">Full time</option>
                <option value="part">Part time</option>
                <option value="summer">Summer job</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="deadline" className="block mb-1 text-sm font-medium text-gray-700">
                Deadline
                {errors.deadline && (
                  <span className="float-right text-xs text-red-500">
                    {errors.deadline.message}
                  </span>
                )}
              </label>

              <p className="mb-1 text-sm text-gray-500">
                If it is a full-time position, you can ignore the deadline.
              </p>

              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                min="2021-08-01"
                max="2022-12-12"
                {...register('deadline')}
                id="title"
                className="block w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <button
            className="w-full px-6 py-3 font-medium text-white bg-indigo-800 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            type="submit"
          >
            {isSubmitting ? 'Sending the form...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
